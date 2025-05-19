import type { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verificar se a requisição é POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" })
  }

  // Verificar a chave de API
  const apiKey = req.headers["x-api-key"]
  if (apiKey !== process.env.JOBS_API_SECRET_KEY) {
    return res.status(401).json({ error: "Não autorizado" })
  }

  const supabase = createServerSupabaseClient({ req, res })

  try {
    // Buscar todos os perfis sem código de referência
    const { data: profiles, error: fetchError } = await supabase
      .from("profiles")
      .select("id, username")
      .is("referral_code", null)

    if (fetchError) throw fetchError

    if (!profiles || profiles.length === 0) {
      return res.status(200).json({ message: "Nenhum perfil sem código de referência encontrado" })
    }

    // Atualizar cada perfil com um código de referência único
    const updates = profiles.map(async (profile) => {
      const referralCode = generateReferralCode(profile.username || profile.id)

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ referral_code: referralCode })
        .eq("id", profile.id)

      if (updateError) throw updateError

      return { id: profile.id, referralCode }
    })

    const results = await Promise.all(updates)

    return res.status(200).json({
      message: `${results.length} perfis atualizados com códigos de referência`,
      updatedProfiles: results,
    })
  } catch (error) {
    console.error("Erro ao configurar códigos de referência:", error)
    return res.status(500).json({ error: "Erro ao configurar códigos de referência" })
  }
}

// Função para gerar um código de referência único
function generateReferralCode(base: string): string {
  // Remover caracteres especiais e espaços
  const cleanBase = base.replace(/[^a-zA-Z0-9]/g, "")

  // Pegar os primeiros 8 caracteres ou preencher se for menor
  const prefix = cleanBase.substring(0, 8).padEnd(8, "0")

  // Adicionar 4 caracteres aleatórios para garantir unicidade
  const randomChars = Math.random().toString(36).substring(2, 6)

  return `${prefix}${randomChars}`.toLowerCase()
}
