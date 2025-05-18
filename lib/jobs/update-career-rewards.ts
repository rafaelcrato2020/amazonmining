import { createServerComponentClient } from "@/lib/supabase"
import type { Job, JobContext, JobResult } from "./types"

export const updateCareerRewardsJob: Job = {
  name: "update-career-rewards",
  description: "Atualiza as recompensas do plano de carreira com base nos ganhos de indicação",
  execute: async (context: JobContext): Promise<JobResult> => {
    const supabase = createServerComponentClient()
    const { dryRun = false } = context

    const errors: any[] = []
    const updatedUsers: string[] = []

    try {
      // Definir níveis de recompensa
      const rewardLevels = [
        { value: 500, type: "Kit Mineradora" },
        { value: 1000, type: "PlayStation 5" },
        { value: 2000, type: "iPhone 16" },
        { value: 3000, type: "Scooter" },
        { value: 5000, type: "Viagem + Setup" },
      ]

      // Buscar todos os usuários
      const { data: users, error: usersError } = await supabase.from("profiles").select("id")

      if (usersError) {
        return {
          success: false,
          message: "Erro ao buscar usuários",
          errors: [usersError],
        }
      }

      if (!users || users.length === 0) {
        return {
          success: true,
          message: "Nenhum usuário encontrado para processar",
          data: { processedCount: 0 },
        }
      }

      // Processar cada usuário
      for (const user of users) {
        try {
          // Calcular ganhos totais com indicações
          const { data: earnings, error: earningsError } = await supabase
            .from("referral_earnings")
            .select("amount")
            .eq("user_id", user.id)

          if (earningsError) {
            errors.push({
              user_id: user.id,
              error: earningsError,
            })
            continue
          }

          const totalEarnings = earnings?.reduce((sum, earn) => sum + Number(earn.amount), 0) || 0

          // Verificar cada nível de recompensa
          for (const reward of rewardLevels) {
            const isEligible = totalEarnings >= reward.value

            // Verificar se já existe um registro para esta recompensa
            const { data: existingReward, error: rewardError } = await supabase
              .from("career_rewards")
              .select("*")
              .eq("user_id", user.id)
              .eq("reward_type", reward.type)
              .maybeSingle()

            if (rewardError) {
              errors.push({
                user_id: user.id,
                reward_type: reward.type,
                error: rewardError,
              })
              continue
            }

            if (!dryRun) {
              if (existingReward) {
                // Atualizar registro existente se necessário
                if (existingReward.eligible !== isEligible) {
                  const { error: updateError } = await supabase
                    .from("career_rewards")
                    .update({ eligible: isEligible })
                    .eq("id", existingReward.id)

                  if (updateError) {
                    errors.push({
                      user_id: user.id,
                      reward_type: reward.type,
                      error: updateError,
                    })
                  }
                }
              } else if (isEligible) {
                // Criar novo registro se elegível
                const { error: insertError } = await supabase.from("career_rewards").insert({
                  user_id: user.id,
                  reward_type: reward.type,
                  eligible: true,
                  claimed: false,
                })

                if (insertError) {
                  errors.push({
                    user_id: user.id,
                    reward_type: reward.type,
                    error: insertError,
                  })
                }
              }
            }
          }

          updatedUsers.push(user.id)
        } catch (error) {
          errors.push({
            user_id: user.id,
            error,
          })
        }
      }

      return {
        success: errors.length === 0,
        message: `Processados ${updatedUsers.length} usuários para atualização de recompensas${dryRun ? " (simulação)" : ""}`,
        data: {
          processedCount: updatedUsers.length,
        },
        errors: errors.length > 0 ? errors : undefined,
      }
    } catch (error) {
      return {
        success: false,
        message: "Erro ao processar recompensas do plano de carreira",
        errors: [error],
      }
    }
  },
}
