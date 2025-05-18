import { createServerComponentClient } from "@/lib/supabase"
import type { Job, JobContext, JobResult } from "./types"

export const updateReferralPlansJob: Job = {
  name: "update-referral-plans",
  description: "Atualiza os planos de referral dos usuários com base no número de indicações ativas",
  execute: async (context: JobContext): Promise<JobResult> => {
    const supabase = createServerComponentClient()
    const { dryRun = false } = context

    const errors: any[] = []
    const updatedUsers: string[] = []

    try {
      // Buscar todos os usuários
      const { data: users, error: usersError } = await supabase.from("profiles").select("id, plan_level")

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
          // Contar indicações ativas
          const { count, error: countError } = await supabase
            .from("profiles")
            .select("id", { count: "exact" })
            .eq("referred_by", user.id)
            .gt("active_investment", 0)

          if (countError) {
            errors.push({
              user_id: user.id,
              error: countError,
            })
            continue
          }

          // Determinar o nível do plano
          let newPlanLevel = "V1"

          if (count >= 10) {
            newPlanLevel = "V3"
          } else if (count >= 5) {
            newPlanLevel = "V2"
          }

          // Atualizar plano se necessário
          if (!dryRun && newPlanLevel !== user.plan_level) {
            const { error: updateError } = await supabase
              .from("profiles")
              .update({ plan_level: newPlanLevel })
              .eq("id", user.id)

            if (updateError) {
              errors.push({
                user_id: user.id,
                error: updateError,
              })
              continue
            }

            updatedUsers.push(user.id)
          }
        } catch (error) {
          errors.push({
            user_id: user.id,
            error,
          })
        }
      }

      return {
        success: errors.length === 0,
        message: `Atualizados ${updatedUsers.length} usuários para novos planos de referral${dryRun ? " (simulação)" : ""}`,
        data: {
          processedCount: updatedUsers.length,
        },
        errors: errors.length > 0 ? errors : undefined,
      }
    } catch (error) {
      return {
        success: false,
        message: "Erro ao processar planos de referral",
        errors: [error],
      }
    }
  },
}
