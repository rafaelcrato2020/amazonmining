import type { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar se a requisição tem a chave de API correta
  const apiKey = req.headers["x-api-key"]
  if (apiKey !== process.env.JOBS_API_SECRET_KEY) {
    return res.status(401).json({ error: "Não autorizado" })
  }

  const supabase = createServerSupabaseClient({ req, res })

  try {
    // Verificar se a coluna referral_code existe
    const { error: columnCheckError } = await supabase.rpc("check_column_exists", {
      table_name: "profiles",
      column_name: "referral_code",
    })

    // Se a coluna não existir, adicioná-la
    if (columnCheckError) {
      console.log("Adicionando coluna referral_code à tabela profiles")

      // Executar SQL para adicionar a coluna
      const { error: addColumnError } = await supabase.rpc("add_referral_code_column")

      if (addColumnError) {
        throw new Error(`Erro ao adicionar coluna: ${addColumnError.message}`)
      }
    }

    // Buscar todos os perfis sem código de referência
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, username, full_name")
      .is("referral_code", null)

    if (profilesError) {
      throw new Error(`Erro ao buscar perfis: ${profilesError.message}`)
    }

    console.log(`Encontrados ${profiles?.length || 0} perfis sem código de referência`)

    // Atualizar cada perfil com um código de referência
    const updates = profiles?.map((profile) => {
      const baseName = profile.username || profile.full_name || profile.id
      const referralCode = generateReferralCode(baseName)

      return supabase.from("profiles").update({ referral_code: referralCode }).eq("id", profile.id)
    })

    if (updates && updates.length > 0) {
      await Promise.all(updates)
      console.log(`${updates.length} perfis atualizados com códigos de referência`)
    }

    return res.status(200).json({
      success: true,
      message: `${profiles?.length || 0} perfis processados`,
    })
  } catch (error) {
    console.error("Erro ao configurar códigos de referência:", error)
    return res.status(500).json({ error: "Erro ao configurar códigos de referência" })
  }
}

// Função para gerar um código de referência único baseado no nome
function generateReferralCode(baseName: string): string {
  // Remover caracteres especiais, espaços e acentos
  const cleanName = baseName
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-zA-Z0-9]/g, "") // Remove caracteres especiais
    .toLowerCase()

  // Se o nome for muito curto, adicionar caracteres aleatórios
  if (cleanName.length < 4) {
    const randomChars = Math.random().toString(36).substring(2, 6)
    return `${cleanName}${randomChars}`.toLowerCase()
  }

  // Se o nome for longo, pegar os primeiros caracteres
  if (cleanName.length > 10) {
    return cleanName.substring(0, 10).toLowerCase()
  }

  return cleanName.toLowerCase()
}
