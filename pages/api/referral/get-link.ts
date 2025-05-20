import type { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res })

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return res.status(401).json({
      error: "Não autorizado",
    })
  }

  try {
    // Buscar o perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id, username, full_name, referral_code")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.error("Erro ao buscar perfil:", profileError)
      throw new Error("Erro ao buscar perfil do usuário")
    }

    // Gerar um código de referência baseado no nome do usuário
    let referralCode = profile.referral_code

    if (!referralCode) {
      // Usar o nome do usuário para gerar o código
      const baseName = profile.username || profile.full_name || session.user.email?.split("@")[0] || session.user.id

      // Limpar o nome para usar como código (remover espaços, caracteres especiais, etc.)
      referralCode = generateReferralCode(baseName)

      // Atualizar o perfil com o novo código
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ referral_code: referralCode })
        .eq("id", session.user.id)

      if (updateError) {
        console.error("Erro ao atualizar código de referência:", updateError)
        throw new Error("Erro ao atualizar código de referência")
      }
    }

    // Usar o domínio correto para o link de referência
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amazonmining.vercel.app"

    // Retornar o link de referência
    return res.status(200).json({
      referralCode,
      referralLink: `${siteUrl}/register?ref=${referralCode}`,
    })
  } catch (error) {
    console.error("Erro ao gerar link de referência:", error)
    return res.status(500).json({ error: "Erro ao gerar link de referência" })
  }
}

// Função para gerar um código de referência único baseado no nome
function generateReferralCode(baseName: string): string {
  // Remover caracteres especiais, espaços e acentos
  const cleanName = baseName
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
