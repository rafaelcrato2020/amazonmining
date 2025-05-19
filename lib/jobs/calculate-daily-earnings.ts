import { createServerAdminClient } from "../supabase"

export async function calculateDailyEarnings(dryRun = false) {
  const supabase = createServerAdminClient()
  const results = {
    processedInvestments: 0,
    totalEarnings: 0,
    referralCommissions: 0,
    errors: [] as string[],
  }

  try {
    // 1. Buscar todos os investimentos ativos
    const { data: activeInvestments, error: investmentsError } = await supabase
      .from("investments")
      .select("id, user_id, amount, daily_rate, days_remaining, days_total")
      .eq("status", "active")
      .gt("days_remaining", 0)

    if (investmentsError) {
      throw new Error(`Erro ao buscar investimentos ativos: ${investmentsError.message}`)
    }

    console.log(`Processando ${activeInvestments.length} investimentos ativos...`)

    // 2. Para cada investimento, calcular o rendimento diário
    for (const investment of activeInvestments) {
      try {
        // Calcular rendimento diário
        const dailyEarning = Number(investment.amount) * (Number(investment.daily_rate) / 100)
        results.totalEarnings += dailyEarning

        if (!dryRun) {
          // Registrar rendimento
          const { error: earningError } = await supabase.from("earnings").insert({
            user_id: investment.user_id,
            investment_id: investment.id,
            amount: dailyEarning,
            day_number: investment.days_total - investment.days_remaining + 1,
          })

          if (earningError) {
            throw new Error(`Erro ao registrar rendimento: ${earningError.message}`)
          }

          // Registrar transação
          const { error: transactionError } = await supabase.from("transactions").insert({
            user_id: investment.user_id,
            type: "interest",
            amount: dailyEarning,
            status: "completed",
            description: `Rendimento diário (${investment.daily_rate}%)`,
          })

          if (transactionError) {
            throw new Error(`Erro ao registrar transação: ${transactionError.message}`)
          }

          // Atualizar saldo do usuário
          const { error: updateError } = await supabase.rpc("add_to_balance", {
            user_id_param: investment.user_id,
            amount_param: dailyEarning,
          })

          if (updateError) {
            throw new Error(`Erro ao atualizar saldo: ${updateError.message}`)
          }

          // Atualizar dias restantes do investimento
          const { error: updateInvestmentError } = await supabase
            .from("investments")
            .update({ days_remaining: investment.days_remaining - 1 })
            .eq("id", investment.id)

          if (updateInvestmentError) {
            throw new Error(`Erro ao atualizar investimento: ${updateInvestmentError.message}`)
          }

          // Processar comissões de indicação
          const referralResult = await processReferralCommissions(supabase, investment.user_id, dailyEarning)
          results.referralCommissions += referralResult.totalCommissions
        }

        results.processedInvestments++
      } catch (error: any) {
        results.errors.push(`Erro ao processar investimento ${investment.id}: ${error.message}`)
        console.error(`Erro ao processar investimento ${investment.id}:`, error)
      }
    }

    return results
  } catch (error: any) {
    console.error("Erro ao calcular rendimentos diários:", error)
    throw error
  }
}

async function processReferralCommissions(supabase: any, userId: string, sourceAmount: number) {
  const result = {
    processedLevels: 0,
    totalCommissions: 0,
    errors: [] as string[],
  }

  try {
    // Buscar a cadeia de indicação (até 5 níveis)
    let currentUserId = userId
    let currentLevel = 0
    const maxLevels = 5

    while (currentLevel < maxLevels) {
      // Buscar quem indicou o usuário atual
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, referred_by, plan_level")
        .eq("id", currentUserId)
        .single()

      if (profileError || !profile || !profile.referred_by) {
        break // Não há mais indicadores na cadeia
      }

      // Buscar o plano do indicador
      const { data: referrerProfile, error: referrerError } = await supabase
        .from("profiles")
        .select("plan_level")
        .eq("id", profile.referred_by)
        .single()

      if (referrerError || !referrerProfile) {
        result.errors.push(`Erro ao buscar perfil do indicador: ${referrerError?.message || "Perfil não encontrado"}`)
        break
      }

      // Buscar as taxas de comissão para o plano do indicador
      const { data: settings, error: settingsError } = await supabase
        .from("system_settings")
        .select("setting_value")
        .eq("setting_key", "referral_rates")
        .single()

      if (settingsError || !settings) {
        result.errors.push(
          `Erro ao buscar configurações de comissão: ${settingsError?.message || "Configurações não encontradas"}`,
        )
        break
      }

      const referralRates = settings.setting_value
      const planRates = referralRates[referrerProfile.plan_level]?.levels || []

      // Verificar se o indicador recebe comissão neste nível
      if (currentLevel < planRates.length) {
        const commissionRate = planRates[currentLevel]
        const commissionAmount = sourceAmount * (commissionRate / 100)

        // Registrar comissão
        const { error: commissionError } = await supabase.from("referral_earnings").insert({
          user_id: profile.referred_by,
          referred_user_id: userId,
          amount: commissionAmount,
          level: currentLevel + 1,
          rate: commissionRate,
          source_amount: sourceAmount,
        })

        if (commissionError) {
          result.errors.push(`Erro ao registrar comissão: ${commissionError.message}`)
        } else {
          // Registrar transação
          const { error: transactionError } = await supabase.from("transactions").insert({
            user_id: profile.referred_by,
            type: "referral_bonus",
            amount: commissionAmount,
            status: "completed",
            description: `Comissão de indicação (Nível ${currentLevel + 1})`,
          })

          if (transactionError) {
            result.errors.push(`Erro ao registrar transação: ${transactionError.message}`)
          } else {
            // Atualizar saldo do indicador
            const { error: updateError } = await supabase.rpc("add_to_balance", {
              user_id_param: profile.referred_by,
              amount_param: commissionAmount,
            })

            if (updateError) {
              result.errors.push(`Erro ao atualizar saldo: ${updateError.message}`)
            } else {
              result.totalCommissions += commissionAmount
              result.processedLevels++
            }
          }
        }
      }

      // Avançar para o próximo nível
      currentUserId = profile.referred_by
      currentLevel++
    }

    return result
  } catch (error: any) {
    console.error("Erro ao processar comissões de indicação:", error)
    result.errors.push(`Erro geral: ${error.message}`)
    return result
  }
}
