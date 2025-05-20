import { createServerAdminClient } from "../supabase"

export async function updateReferralPlans(dryRun = false) {
  const supabase = createServerAdminClient()
  const results = {
    processedUsers: 0,
    upgradedUsers: 0,
    downgradedUsers: 0,
    errors: [] as string[],
  }

  try {
    // 1. Buscar configurações de planos
    const { data: settings, error: settingsError } = await supabase
      .from("system_settings")
      .select("setting_value")
      .eq("setting_key", "referral_rates")
      .single()

    if (settingsError) {
      throw new Error(`Erro ao buscar configurações de planos: ${settingsError.message}`)
    }

    const referralRates = settings.setting_value
    const planRequirements = {
      V1: referralRates.V1.min_active || 0,
      V2: referralRates.V2.min_active || 5,
      V3: referralRates.V3.min_active || 10,
    }

    // 2. Buscar todos os usuários
    const { data: users, error: usersError } = await supabase.from("profiles").select("id, plan_level")

    if (usersError) {
      throw new Error(`Erro ao buscar usuários: ${usersError.message}`)
    }

    console.log(`Processando ${users.length} usuários...`)

    // 3. Para cada usuário, verificar e atualizar o plano
    for (const user of users) {
      try {
        // Contar indicados ativos
        const { count: activeReferrals, error: countError } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("referred_by", user.id)
          .gt("active_investment", 0)

        if (countError) {
          throw new Error(`Erro ao contar indicados ativos: ${countError.message}`)
        }

        // Determinar o plano correto com base no número de indicados ativos
        let correctPlan = "V1"
        if (activeReferrals >= planRequirements.V3) {
          correctPlan = "V3"
        } else if (activeReferrals >= planRequirements.V2) {
          correctPlan = "V2"
        }

        // Atualizar o plano se necessário
        if (user.plan_level !== correctPlan) {
          if (!dryRun) {
            const { error: updateError } = await supabase
              .from("profiles")
              .update({ plan_level: correctPlan })
              .eq("id", user.id)

            if (updateError) {
              throw new Error(`Erro ao atualizar plano: ${updateError.message}`)
            }
          }

          if (correctPlan > user.plan_level) {
            results.upgradedUsers++
          } else {
            results.downgradedUsers++
          }
        }

        results.processedUsers++
      } catch (error: any) {
        results.errors.push(`Erro ao processar usuário ${user.id}: ${error.message}`)
        console.error(`Erro ao processar usuário ${user.id}:`, error)
      }
    }

    return results
  } catch (error: any) {
    console.error("Erro ao atualizar planos de referral:", error)
    throw error
  }
}
