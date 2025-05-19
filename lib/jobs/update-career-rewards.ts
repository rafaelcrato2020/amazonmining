import { createServerAdminClient } from "../supabase"

export async function updateCareerRewards(dryRun = false) {
  const supabase = createServerAdminClient()
  const results = {
    processedUsers: 0,
    eligibleRewards: 0,
    errors: [] as string[],
  }

  try {
    // 1. Buscar todos os usuários com referrals
    const { data: users, error: usersError } = await supabase
      .from("profiles")
      .select("id")
      .not("referred_by", "is", null)

    if (usersError) {
      throw new Error(`Erro ao buscar usuários: ${usersError.message}`)
    }

    console.log(`Processando ${users.length} usuários...`)

    // 2. Para cada usuário, verificar elegibilidade para recompensas
    for (const user of users) {
      try {
        // Buscar total de comissões do usuário
        const { data: commissions, error: commissionsError } = await supabase
          .from("referral_earnings")
          .select("amount")
          .eq("user_id", user.id)

        if (commissionsError) {
          throw new Error(`Erro ao buscar comissões: ${commissionsError.message}`)
        }

        const totalCommissions = commissions.reduce((sum, item) => sum + Number(item.amount), 0)

        // Verificar elegibilidade para cada nível de recompensa
        const rewardLevels = [
          { amount: 500, type: "kit_mineradora" },
          { amount: 1000, type: "ps5" },
          { amount: 2000, type: "iphone" },
          { amount: 3000, type: "scooter" },
          { amount: 5000, type: "viagem" },
        ]

        for (const reward of rewardLevels) {
          if (totalCommissions >= reward.amount) {
            // Verificar se a recompensa já existe
            const { data: existingReward, error: rewardError } = await supabase
              .from("career_rewards")
              .select("*")
              .eq("user_id", user.id)
              .eq("reward_type", reward.type)
              .single()

            if (rewardError && rewardError.code !== "PGRST116") {
              // PGRST116 é o código para "não encontrado", que é esperado
              throw new Error(`Erro ao verificar recompensa existente: ${rewardError.message}`)
            }

            if (!existingReward) {
              if (!dryRun) {
                // Criar nova recompensa
                const { error: insertError } = await supabase.from("career_rewards").insert({
                  user_id: user.id,
                  reward_type: reward.type,
                  eligible: true,
                  claimed: false,
                })

                if (insertError) {
                  throw new Error(`Erro ao criar recompensa: ${insertError.message}`)
                }
              }

              results.eligibleRewards++
            }
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
    console.error("Erro ao atualizar recompensas de carreira:", error)
    throw error
  }
}
