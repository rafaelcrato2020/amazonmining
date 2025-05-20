import type { NextApiRequest, NextApiResponse } from "next"
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Criar cliente Supabase com o contexto da requisição
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
      .select("*")
      .eq("id", session.user.id)
      .single()

    if (profileError) throw profileError

    // Buscar indicados do usuário
    const { data: referrals, error: referralsError } = await supabase
      .from("profiles")
      .select("id, username, full_name, avatar_url, created_at")
      .eq("referred_by", session.user.id)

    if (referralsError) throw referralsError

    // Contar indicados ativos (com investimentos)
    const { data: activeReferrals, error: activeError } = await supabase
      .from("profiles")
      .select("id")
      .eq("referred_by", session.user.id)
      .not("active_investment", "is", null)
      .not("active_investment", "eq", 0)

    if (activeError) throw activeError

    // Buscar ganhos com indicações
    const { data: earnings, error: earningsError } = await supabase
      .from("referral_earnings")
      .select("amount, created_at")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (earningsError) throw earningsError

    // Calcular ganhos recentes (últimos 7 dias)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const recentEarnings =
      earnings?.filter((e) => new Date(e.created_at) >= sevenDaysAgo).reduce((sum, e) => sum + Number(e.amount), 0) || 0

    // Retornar os dados formatados
    return res.status(200).json({
      referralCode: profile.referral_code,
      referralLink: `${process.env.NEXT_PUBLIC_SITE_URL}/register?ref=${profile.referral_code}`,
      totalReferrals: referrals?.length || 0,
      activeReferrals: activeReferrals?.length || 0,
      totalEarnings: earnings?.reduce((sum, e) => sum + Number(e.amount), 0) || 0,
      recentEarnings,
    })
  } catch (error) {
    console.error("Erro ao buscar estatísticas de referral:", error)
    return res.status(500).json({ error: "Erro ao buscar estatísticas de referral" })
  }
}
