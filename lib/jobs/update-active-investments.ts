import { createServerAdminClient } from "../supabase"

export async function updateActiveInvestments(dryRun = false) {
  const supabase = createServerAdminClient()
  const results = {
    processedUsers: 0,
    updatedUsers: 0,
    errors: [] as string[],
  }

  try {
    // 1. Buscar todos os usuários
    const { data: users, error: usersError } = await supabase.from("profiles").select("id")

    if (usersError) {
      throw new Error(`Erro ao buscar usuários: ${usersError.message}`)
    }

    console.log(`Processando ${users.length} usuários...`)

    // 2. Para cada usuário, calcular o valor total de investimentos ativos
    for (const user of users) {
      try {
        // Calcular soma dos investimentos ativos
        const { data: investments, error: investmentsError } = await supabase
          .from("investments")
          .select("amount")
          .eq("user_id", user.id)
          .eq("status", "active")
          .gt("days_remaining", 0)

        if (investmentsError) {
          throw new Error(`Erro ao buscar investimentos: ${investmentsError.message}`)
        }

        const activeInvestment = investments.reduce((sum, item) => sum + Number(item.amount), 0)

        // Atualizar o valor de investimento ativo no perfil
        if (!dryRun) {
          const { error: updateError } = await supabase
            .from("profiles")
            .update({ active_investment: activeInvestment })
            .eq("id", user.id)

          if (updateError) {
            throw new Error(`Erro ao atualizar investimento ativo: ${updateError.message}`)
          }
        }

        results.updatedUsers++
        results.processedUsers++
      } catch (error: any) {
        results.errors.push(`Erro ao processar usuário ${user.id}: ${error.message}`)
        console.error(`Erro ao processar usuário ${user.id}:`, error)
      }
    }

    return results
  } catch (error: any) {
    console.error("Erro ao atualizar investimentos ativos:", error)
    throw error
  }
}
