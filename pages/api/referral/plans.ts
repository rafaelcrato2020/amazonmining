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

    // Verificar se o usuário tem um código de referência
    let referralCode = profile.referral_code

    // Se não tiver um código de referência, gerar um e atualizar o perfil
    if (!referralCode) {
      referralCode = generateReferralCode(profile.username || session.user.id)

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ referral_code: referralCode })
        .eq("id", session.user.id)

      if (updateError) throw updateError
    }

    // Buscar todos os planos de recompensa
    const { data: plans, error: plansError } = await supabase
      .from("referral_plans")
      .select("*")
      .order("min_active_referrals", { ascending: true })

    if (plansError) throw plansError

    // Buscar as taxas de cada plano
    const { data: rates, error: ratesError } = await supabase
      .from("referral_rates")
      .select("*")
      .order("plan_id", { ascending: true })
      .order("level", { ascending: true })

    if (ratesError) throw ratesError

    // Buscar indicados do usuário
    const { count: totalReferrals, error: referralsError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("referred_by", session.user.id)

    if (referralsError) throw referralsError

    // Contar indicados ativos (com investimentos)
    const { count: activeReferrals, error: activeError } = await supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("referred_by", session.user.id)
      .gt("active_investment", 0)

    if (activeError) throw activeError

    // Organizar as taxas por plano
    const ratesByPlan: Record<number, number[]> = {}
    rates?.forEach((rate) => {
      if (!ratesByPlan[rate.plan_id]) {
        ratesByPlan[rate.plan_id] = []
      }
      ratesByPlan[rate.plan_id][rate.level - 1] = rate.rate
    })

    // Determinar o plano atual do usuário com base no número de indicados ativos
    const activeCount = activeReferrals || 0
    let currentPlan = plans?.find((p) => p.min_active_referrals <= activeCount)

    // Se não encontrar um plano adequado, use o plano básico (V1)
    if (!currentPlan && plans?.length) {
      currentPlan = plans[0]
    }

    // Formatar os planos com suas taxas
    const formattedPlans = plans?.map((plan) => ({
      id: plan.id,
      name: plan.name,
      code: plan.code,
      levels: plan.levels,
      rates: ratesByPlan[plan.id] || [],
      requirement:
        plan.min_active_referrals === 0 ? "Sem requisito mínimo" : `${plan.min_active_referrals} indicados ativos`,
      active: currentPlan?.id === plan.id,
    }))

    // Usar o domínio correto para o link de referência
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://amazonmining.vercel.app"

    // Retornar os dados formatados
    return res.status(200).json({
      referralCode: referralCode,
      referralLink: `${siteUrl}/register?ref=${referralCode}`,
      totalReferrals: totalReferrals || 0,
      activeReferrals: activeCount,
      currentPlan: currentPlan?.code || "V1",
      plans: formattedPlans,
    })
  } catch (error) {
    console.error("Erro ao buscar dados de referral:", error)
    return res.status(500).json({ error: "Erro ao buscar dados de referral" })
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
