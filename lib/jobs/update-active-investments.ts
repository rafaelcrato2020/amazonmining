import { createServerComponentClient } from "@/lib/supabase"
import type { Job, JobContext, JobResult } from "./types"

export const updateActiveInvestmentsJob: Job = {
  name: "update-active-investments",
  description: "Atualiza o valor de investimento ativo dos usuários",
  execute: async (context: JobContext): Promise<JobResult> => {
    const supabase = createServerComponentClient()
    const { dryRun = false } = context

    const errors: any[] = []
    const updatedUsers: string[] = []

    try {
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
          // Calcular investimento ativo total
          const { data: investments, error: investmentsError } = await supabase
            .from("investments")
            .select("amount")
            .eq("user_id", user.id)
            .eq("status", "active")

          if (investmentsError) {
            errors.push({
              user_id: user.id,
              error: investmentsError,
            })
            continue
          }

          const activeInvestment = investments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0

          // Atualizar perfil do usuário
          if (!dryRun) {
            const { error: updateError } = await supabase
              .from("profiles")
              .update({
                active_investment: activeInvestment,
                investment_start_date: activeInvestment > 0 ? new Date().toISOString() : null,
              })
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
        message: `Atualizados ${updatedUsers.length} usuários com valores de investimento ativo${dryRun ? " (simulação)" : ""}`,
        data: {
          processedCount: updatedUsers.length,
        },
        errors: errors.length > 0 ? errors : undefined,
      }
    } catch (error) {
      return {
        success: false,
        message: "Erro ao atualizar investimentos ativos",
        errors: [error],
      }
    }
  },
}
