import type { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar se a requisição é autorizada
  if (req.headers.authorization !== `Bearer ${process.env.JOBS_API_SECRET_KEY}`) {
    return res.status(401).json({ error: "Não autorizado" })
  }

  const supabase = createServerSupabaseClient({ req, res })

  try {
    // Verificar se a coluna active_investment existe na tabela profiles
    const { data: columns, error: columnsError } = await supabase.from("profiles").select("active_investment").limit(1)

    // Se a coluna não existir, vamos criá-la
    if (columnsError && columnsError.message.includes('column "active_investment" does not exist')) {
      // Adicionar a coluna active_investment
      const { error: alterError } = await supabase.rpc("add_active_investment_column")

      if (alterError) {
        throw alterError
      }

      // Criar a função RPC para adicionar a coluna
      const { error: rpcError } = await supabase.rpc("create_add_active_investment_function")

      if (rpcError && !rpcError.message.includes("already exists")) {
        throw rpcError
      }

      // Atualizar os valores da coluna com base nos investimentos ativos
      const { error: updateError } = await supabase.rpc("update_active_investment_values")

      if (updateError) {
        throw updateError
      }
    }

    // Verificar se a tabela referral_earnings existe
    const { data: tables, error: tablesError } = await supabase.from("referral_earnings").select("id").limit(1)

    // Se a tabela não existir, vamos criá-la
    if (tablesError && tablesError.message.includes('relation "referral_earnings" does not exist')) {
      // Criar a tabela referral_earnings
      const { error: createTableError } = await supabase.rpc("create_referral_earnings_table")

      if (createTableError && !createTableError.message.includes("already exists")) {
        throw createTableError
      }
    }

    return res.status(200).json({ success: true, message: "Configuração do banco de dados concluída com sucesso" })
  } catch (error) {
    console.error("Erro ao configurar banco de dados:", error)
    return res.status(500).json({ error: "Erro ao configurar banco de dados" })
  }
}
