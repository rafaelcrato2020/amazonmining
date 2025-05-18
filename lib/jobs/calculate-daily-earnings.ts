import { createServerComponentClient } from "@/lib/supabase"
import type { Job, JobContext, JobResult } from "./types"

export const calculateDailyEarningsJob: Job = {
  name: "calculate-daily-earnings",
  description: "Calcula os rendimentos diários para todos os investimentos ativos",
  execute: async (context: JobContext): Promise<JobResult> => {
    const supabase = createServerComponentClient()
    const { date, dryRun = false } = context

    const today = new Date(date)
    today.setHours(0, 0, 0, 0)

    const errors: any[] = []
    const processedInvestments: string[] = []
    let totalEarnings = 0

    try {
      // Verificar se já foram calculados rendimentos para hoje
      const todayStart = today.toISOString()
      const todayEnd = new Date(today)
      todayEnd.setHours(23, 59, 59, 999)
      const todayEndStr = todayEnd.toISOString()

      const { data: existingEarnings } = await supabase
        .from("earnings")
        .select("id")
        .gte("created_at", todayStart)
        .lte("created_at", todayEndStr)
        .limit(1)

      if (existingEarnings && existingEarnings.length > 0) {
        return {
          success: false,
          message: "Os rendimentos já foram calculados para hoje",
          errors: [{ code: "ALREADY_PROCESSED", message: "Os rendimentos já foram calculados para hoje" }],
        }
      }

      // Buscar todos os investimentos ativos
      const { data: activeInvestments, error: investmentsError } = await supabase
        .from("investments")
        .select("*")
        .eq("status", "active")
        .gt("days_remaining", 0)

      if (investmentsError) {
        return {
          success: false,
          message: "Erro ao buscar investimentos ativos",
          errors: [investmentsError],
        }
      }

      if (!activeInvestments || activeInvestments.length === 0) {
        return {
          success: true,
          message: "Nenhum investimento ativo encontrado para processar",
          data: { processedCount: 0 },
        }
      }

      // Processar cada investimento
      for (const investment of activeInvestments) {
        try {
          // Calcular rendimento diário
          const dailyEarning = Number(investment.amount) * (Number(investment.daily_rate) / 100)
          const dayNumber = Number(investment.days_total) - Number(investment.days_remaining) + 1

          if (!dryRun) {
            // Registrar rendimento
            const { data: earning, error: earningError } = await supabase
              .from("earnings")
              .insert({
                user_id: investment.user_id,
                investment_id: investment.id,
                amount: dailyEarning,
                day_number: dayNumber,
              })
              .select()
              .single()

            if (earningError) {
              errors.push({
                investment_id: investment.id,
                error: earningError,
              })
              continue
            }

            // Atualizar saldo do usuário
            const { data: profile, error: profileError } = await supabase
              .from("profiles")
              .select("balance")
              .eq("id", investment.user_id)
              .single()

            if (profileError) {
              errors.push({
                investment_id: investment.id,
                error: profileError,
              })
              continue
            }

            const newBalance = Number(profile.balance) + dailyEarning

            const { error: updateError } = await supabase
              .from("profiles")
              .update({ balance: newBalance })
              .eq("id", investment.user_id)

            if (updateError) {
              errors.push({
                investment_id: investment.id,
                error: updateError,
              })
              continue
            }

            // Registrar transação
            const { error: transactionError } = await supabase.from("transactions").insert({
              user_id: investment.user_id,
              type: "earning",
              amount: dailyEarning,
              reference_id: earning.id,
              description: `Rendimento diário (${dayNumber}/${investment.days_total}): $${dailyEarning.toFixed(2)}`,
            })

            if (transactionError) {
              errors.push({
                investment_id: investment.id,
                error: transactionError,
              })
              continue
            }

            // Atualizar dias restantes do investimento
            const { error: updateInvestmentError } = await supabase
              .from("investments")
              .update({
                days_remaining: Number(investment.days_remaining) - 1,
                status: Number(investment.days_remaining) <= 1 ? "completed" : "active",
              })
              .eq("id", investment.id)

            if (updateInvestmentError) {
              errors.push({
                investment_id: investment.id,
                error: updateInvestmentError,
              })
              continue
            }

            // Processar comissões de indicação
            await processReferralCommissions(supabase, investment.user_id, dailyEarning)
          }

          processedInvestments.push(investment.id)
          totalEarnings += dailyEarning
        } catch (error) {
          errors.push({
            investment_id: investment.id,
            error,
          })
        }
      }

      return {
        success: errors.length === 0,
        message: `Processados ${processedInvestments.length} investimentos com total de $${totalEarnings.toFixed(2)} em rendimentos${dryRun ? " (simulação)" : ""}`,
        data: {
          processedCount: processedInvestments.length,
          totalEarnings,
          date: today.toISOString(),
        },
        errors: errors.length > 0 ? errors : undefined,
      }
    } catch (error) {
      return {
        success: false,
        message: "Erro ao processar rendimentos diários",
        errors: [error],
      }
    }
  },
}

// Função auxiliar para processar comissões de indicação
async function processReferralCommissions(supabase: any, userId: string, sourceAmount: number) {
  try {
    // Buscar usuário
    const { data: user } = await supabase.from("profiles").select("referred_by").eq("id", userId).single()

    if (!user?.referred_by) {
      return // Usuário não tem indicador
    }

    // Buscar configurações de comissão
    const { data: settings } = await supabase
      .from("system_settings")
      .select("setting_value")
      .eq("setting_key", "referral_rates")
      .single()

    if (!settings) {
      return // Configurações não encontradas
    }

    // Buscar cadeia de indicadores (até 5 níveis)
    let currentUserId = user.referred_by
    let level = 1

    while (currentUserId && level <= 5) {
      // Buscar usuário atual
      const { data: currentUser } = await supabase
        .from("profiles")
        .select("plan_level, referred_by")
        .eq("id", currentUserId)
        .single()

      if (!currentUser) break

      // Verificar plano do usuário
      const planLevel = currentUser.plan_level || "V1"
      const planRates = settings.setting_value[planLevel]

      if (!planRates || !planRates.levels || level > planRates.levels.length) {
        // Usuário não tem comissão neste nível ou plano não encontrado
        currentUserId = currentUser.referred_by
        level++
        continue
      }

      // Verificar se o usuário tem indicações ativas suficientes
      if (planRates.min_active > 0) {
        const { count } = await supabase
          .from("profiles")
          .select("id", { count: "exact" })
          .eq("referred_by", currentUserId)
          .gt("active_investment", 0)

        if (count < planRates.min_active) {
          // Usuário não tem indicações ativas suficientes
          currentUserId = currentUser.referred_by
          level++
          continue
        }
      }

      // Calcular comissão
      const rate = planRates.levels[level - 1]
      const commissionAmount = sourceAmount * (rate / 100)

      // Registrar comissão
      const { data: commission, error } = await supabase
        .from("referral_earnings")
        .insert({
          user_id: currentUserId,
          referred_user_id: userId,
          amount: commissionAmount,
          level,
          rate,
          source_amount: sourceAmount,
        })
        .select()
        .single()

      if (error) {
        console.error("Erro ao registrar comissão:", error)
        currentUserId = currentUser.referred_by
        level++
        continue
      }

      // Atualizar saldo do usuário
      const { data: profile } = await supabase.from("profiles").select("balance").eq("id", currentUserId).single()

      if (profile) {
        await supabase
          .from("profiles")
          .update({ balance: Number(profile.balance) + commissionAmount })
          .eq("id", currentUserId)

        // Registrar transação
        await supabase.from("transactions").insert({
          user_id: currentUserId,
          type: "referral",
          amount: commissionAmount,
          reference_id: commission.id,
          description: `Comissão de indicação nível ${level} (${rate}%): $${commissionAmount.toFixed(2)}`,
        })
      }

      // Avançar para o próximo nível
      currentUserId = currentUser.referred_by
      level++
    }
  } catch (error) {
    console.error("Erro ao processar comissões:", error)
  }
}
