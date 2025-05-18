"use server"

import { createServerComponentClient } from "@/lib/supabase"

export type ReferralPlan = {
  id: string
  name: string
  levels: number
  rates: number[]
  requirement: string
  active: boolean
  color: string
}

export type ReferralStats = {
  referralCode: string
  referralLink: string
  totalReferrals: number
  activeReferrals: number
  totalEarnings: number
  recentEarnings: number
  currentPlan: string
  plans: ReferralPlan[]
  referrals: {
    id: string
    email: string
    username: string
    fullName: string
    active: boolean
    joinedAt: string
  }[]
}

export async function getReferralStats(userId: string): Promise<ReferralStats> {
  const supabase = createServerComponentClient()

  // Obter perfil do usuário
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan_level, referral_code")
    .eq("id", userId)
    .single()

  if (!profile) {
    throw new Error("Perfil não encontrado")
  }

  // Gerar código de referral se não existir
  let referralCode = profile.referral_code
  if (!referralCode) {
    referralCode = `REF${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    await supabase.from("profiles").update({ referral_code: referralCode }).eq("id", userId)
  }

  // Obter configurações de referral
  const { data: settings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "referral_rates")
    .single()

  // Obter indicações
  const { data: referrals, count } = await supabase
    .from("profiles")
    .select("id, created_at", { count: "exact" })
    .eq("referred_by", userId)

  // Obter emails dos usuários indicados
  const referredUserIds = referrals?.map((ref) => ref.id) || []
  const { data: referredUsers } = await supabase.from("auth.users").select("id, email").in("id", referredUserIds)

  // Mapear IDs para emails
  const idToEmail: Record<string, string> = {}
  referredUsers?.forEach((user) => {
    idToEmail[user.id] = user.email
  })

  // Contar indicações ativas (com investimentos)
  const { data: activeInvestments } = await supabase
    .from("investments")
    .select("user_id")
    .in("user_id", referredUserIds)
    .eq("status", "active")

  const activeUserIds = new Set(activeInvestments?.map((inv) => inv.user_id) || [])
  const activeReferrals = activeUserIds.size

  // Obter ganhos com indicações
  const { data: earnings } = await supabase
    .from("transactions")
    .select("amount, created_at")
    .eq("user_id", userId)
    .eq("type", "referral_bonus")

  const totalEarnings = earnings?.reduce((sum, earn) => sum + Number(earn.amount), 0) || 0

  // Calcular ganhos recentes (últimos 7 dias)
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const recentEarnings =
    earnings?.reduce((sum, earn) => {
      const earnDate = new Date(earn.created_at)
      return earnDate >= sevenDaysAgo ? sum + Number(earn.amount) : sum
    }, 0) || 0

  // Definir planos de recompensa
  const referralRates = settings?.setting_value || {
    V1: { levels: [10, 5, 5], min_active: 0 },
    V2: { levels: [10, 5, 5, 5], min_active: 5 },
    V3: { levels: [10, 5, 5, 5, 5], min_active: 10 },
  }

  const plans: ReferralPlan[] = [
    {
      id: "v1",
      name: "V1",
      levels: referralRates.V1.levels.length,
      rates: referralRates.V1.levels,
      requirement: "Sem requisito mínimo",
      active: true,
      color: "from-emerald-600 to-cyan-600",
    },
    {
      id: "v2",
      name: "V2",
      levels: referralRates.V2.levels.length,
      rates: referralRates.V2.levels,
      requirement: "5 indicados ativos",
      active: activeReferrals >= referralRates.V2.min_active,
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: "v3",
      name: "V3",
      levels: referralRates.V3.levels.length,
      rates: referralRates.V3.levels,
      requirement: "10 cadastros ativos",
      active: activeReferrals >= referralRates.V3.min_active,
      color: "from-purple-600 to-pink-600",
    },
  ]

  // Mapear referrals para o formato esperado
  const mappedReferrals =
    referrals?.map((ref) => ({
      id: ref.id,
      email: idToEmail[ref.id] || "email@example.com",
      username: `user_${ref.id.substring(0, 8)}`,
      fullName: `Usuário ${ref.id.substring(0, 8)}`,
      active: activeUserIds.has(ref.id),
      joinedAt: ref.created_at,
    })) || []

  return {
    referralCode,
    referralLink: `${process.env.NEXT_PUBLIC_SITE_URL || "https://amazonmining.com"}/register?ref=${referralCode}`,
    totalReferrals: count || 0,
    activeReferrals,
    totalEarnings,
    recentEarnings,
    currentPlan: profile.plan_level,
    plans,
    referrals: mappedReferrals,
  }
}
