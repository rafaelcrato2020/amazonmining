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
      .select("id, username, referral_code")
      .eq("id", session.user.id)
      .single()

    if (profileError) {
      console.error("Erro ao buscar perfil:", profileError)
      throw new Error("Erro ao buscar perfil do usuário")
    }

    // Verificar se o usuário tem um código de referência
    let referralCode = profile.referral_code

    // Se não tiver um código de referência, gerar um e atualizar o perfil
    if (!referralCode) {
      // Gerar um código baseado no username ou ID
      referralCode = generateReferralCode(profile.username || session.user.id)

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

// Função para gerar um código de referência único
function generateReferralCode(base: string): string {
  // Remover caracteres especiais e espaços
  const cleanBase = base.replace(/[^a-zA-Z0-9]/g, "")

  // Pegar os primeiros 6 caracteres ou preencher se for menor
  const prefix = cleanBase.substring(0, 6).padEnd(6, "0")

  // Adicionar 4 caracteres aleatórios para garantir unicidade
  const randomChars = Math.random().toString(36).substring(2, 6)

  return `${prefix}${randomChars}`.toLowerCase()
}
