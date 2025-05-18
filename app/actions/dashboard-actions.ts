"use server"

import { createServerComponentClient } from "@/lib/supabase"
import type { DashboardData } from "@/types/database"

/**
 * Obtém todos os dados necessários para a dashboard
 */
export async function getDashboardData(userId: string): Promise<DashboardData> {
  const supabase = createServerComponentClient()

  // Obter perfil do usuário
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

  if (!profile) {
    throw new Error("Perfil não encontrado")
  }

  // Obter investimentos ativos
  const { data: activeInvestments } = await supabase
    .from("investments")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .order("created_at", { ascending: false })

  // Obter rendimentos recentes
  const { data: recentEarnings } = await supabase
    .from("earnings")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30)

  // Obter depósitos recentes
  const { data: recentDeposits } = await supabase
    .from("deposits")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5)

  // Obter saques recentes
  const { data: recentWithdrawals } = await supabase
    .from("withdrawals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(5)

  // Obter indicações
  const { data: referrals } = await supabase.from("profiles").select("*").eq("referred_by", userId)

  // Obter ganhos com indicações
  const { data: referralEarnings } = await supabase.from("referral_earnings").select("amount").eq("user_id", userId)

  // Calcular totais
  const totalInvested = activeInvestments?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0
  const totalEarnings = recentEarnings?.reduce((sum, earn) => sum + Number(earn.amount), 0) || 0
  const totalReferralEarnings = referralEarnings?.reduce((sum, earn) => sum + Number(earn.amount), 0) || 0

  // Contar indicações ativas (com investimentos)
  const activeReferrals = referrals?.filter((ref) => ref.active_investment > 0).length || 0

  return {
    profile,
    balance: Number(profile.balance) || 0,
    totalInvested,
    totalEarnings,
    activeInvestments: activeInvestments || [],
    recentEarnings: recentEarnings || [],
    recentDeposits: recentDeposits || [],
    recentWithdrawals: recentWithdrawals || [],
    referrals: {
      total: referrals?.length || 0,
      active: activeReferrals,
      earnings: totalReferralEarnings,
      list: referrals || [],
    },
  }
}

/**
 * Obtém o histórico de transações do usuário
 */
export async function getTransactionHistory(userId: string, type?: string, page = 1, limit = 10) {
  const supabase = createServerComponentClient()

  let query = supabase.from("transactions").select("*").eq("user_id", userId).order("created_at", { ascending: false })

  if (type) {
    query = query.eq("type", type)
  }

  const { data, error, count } = await query.range((page - 1) * limit, page * limit - 1).limit(limit)

  if (error) {
    throw error
  }

  return {
    data,
    total: count || 0,
    page,
    limit,
  }
}

/**
 * Solicita um novo depósito
 */
export async function requestDeposit(userId: string, amount: number) {
  const supabase = createServerComponentClient()

  // Verificar valor mínimo
  const { data: settings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "min_deposit")
    .single()

  const minDeposit = settings?.setting_value || 10

  if (amount < minDeposit) {
    throw new Error(`O valor mínimo para depósito é $${minDeposit}`)
  }

  // Criar registro de depósito
  const { data, error } = await supabase
    .from("deposits")
    .insert({
      user_id: userId,
      amount,
      status: "pending",
      network: "BEP20",
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  // Registrar na tabela de transações
  await supabase.from("transactions").insert({
    user_id: userId,
    type: "deposit",
    amount,
    reference_id: data.id,
    description: `Depósito de $${amount} (pendente)`,
  })

  return data
}

/**
 * Solicita um novo saque
 */
export async function requestWithdrawal(userId: string, amount: number, walletAddress: string) {
  const supabase = createServerComponentClient()

  // Verificar saldo disponível
  const { data: profile } = await supabase.from("profiles").select("balance").eq("id", userId).single()

  if (!profile || Number(profile.balance) < amount) {
    throw new Error("Saldo insuficiente")
  }

  // Verificar valor mínimo
  const { data: settings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "min_withdrawal")
    .single()

  const minWithdrawal = settings?.setting_value || 10

  if (amount < minWithdrawal) {
    throw new Error(`O valor mínimo para saque é $${minWithdrawal}`)
  }

  // Calcular taxa
  const { data: feeSettings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "withdrawal_fee")
    .single()

  const feePercentage = feeSettings?.setting_value || 6
  const fee = (amount * Number(feePercentage)) / 100
  const netAmount = amount - fee

  // Criar registro de saque
  const { data, error } = await supabase
    .from("withdrawals")
    .insert({
      user_id: userId,
      amount,
      fee,
      net_amount: netAmount,
      status: "pending",
      wallet_address: walletAddress,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  // Atualizar saldo do usuário
  await supabase
    .from("profiles")
    .update({ balance: Number(profile.balance) - amount })
    .eq("id", userId)

  // Registrar na tabela de transações
  await supabase.from("transactions").insert({
    user_id: userId,
    type: "withdrawal",
    amount: -amount,
    reference_id: data.id,
    description: `Saque de $${amount} (taxa: $${fee})`,
  })

  return data
}

/**
 * Reinveste um valor do saldo disponível
 */
export async function reinvestBalance(userId: string, amount: number) {
  const supabase = createServerComponentClient()

  // Verificar saldo disponível
  const { data: profile } = await supabase.from("profiles").select("balance").eq("id", userId).single()

  if (!profile || Number(profile.balance) < amount) {
    throw new Error("Saldo insuficiente")
  }

  // Obter configurações do sistema
  const { data: rateSettings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "daily_rate")
    .single()

  const { data: daysSettings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "contract_days")
    .single()

  const dailyRate = rateSettings?.setting_value || 4.5
  const contractDays = daysSettings?.setting_value || 100

  // Criar novo investimento
  const { data: investment, error } = await supabase
    .from("investments")
    .insert({
      user_id: userId,
      amount,
      daily_rate: dailyRate,
      days_total: contractDays,
      days_remaining: contractDays,
      status: "active",
      source: "reinvestment",
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  // Atualizar saldo do usuário
  await supabase
    .from("profiles")
    .update({ balance: Number(profile.balance) - amount })
    .eq("id", userId)

  // Registrar na tabela de transações
  await supabase.from("transactions").insert({
    user_id: userId,
    type: "reinvestment",
    amount: -amount,
    reference_id: investment.id,
    description: `Reinvestimento de $${amount}`,
  })

  return investment
}

/**
 * Obtém as configurações do sistema
 */
export async function getSystemSettings() {
  const supabase = createServerComponentClient()

  const { data, error } = await supabase.from("system_settings").select("*")

  if (error) {
    throw error
  }

  // Converter para um objeto mais fácil de usar
  const settings: Record<string, any> = {}

  data?.forEach((setting) => {
    settings[setting.setting_key] = setting.setting_value
  })

  return settings
}

/**
 * Obtém informações do plano de referral do usuário
 */
export async function getReferralPlanInfo(userId: string) {
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

  // Obter configurações de referral
  const { data: settings } = await supabase
    .from("system_settings")
    .select("setting_value")
    .eq("setting_key", "referral_rates")
    .single()

  // Obter indicações
  const { data: referrals, count } = await supabase
    .from("profiles")
    .select("*", { count: "exact" })
    .eq("referred_by", userId)

  // Contar indicações ativas
  const activeReferrals = referrals?.filter((ref) => ref.active_investment > 0).length || 0

  // Obter ganhos com indicações
  const { data: earnings } = await supabase.from("referral_earnings").select("amount, level").eq("user_id", userId)

  // Calcular ganhos por nível
  const earningsByLevel: Record<number, number> = {}

  earnings?.forEach((earning) => {
    earningsByLevel[earning.level] = (earningsByLevel[earning.level] || 0) + Number(earning.amount)
  })

  return {
    planLevel: profile.plan_level,
    referralCode: profile.referral_code,
    referralLink: `${process.env.NEXT_PUBLIC_SITE_URL}/register?ref=${profile.referral_code}`,
    totalReferrals: count || 0,
    activeReferrals,
    rates: settings?.setting_value?.[profile.plan_level]?.levels || [],
    earningsByLevel,
    totalEarnings: earnings?.reduce((sum, earn) => sum + Number(earn.amount), 0) || 0,
    referrals: referrals || [],
  }
}

/**
 * Obtém informações do plano de carreira do usuário
 */
export async function getCareerPlanInfo(userId: string) {
  const supabase = createServerComponentClient()

  // Obter ganhos totais com indicações
  const { data: earnings } = await supabase.from("referral_earnings").select("amount").eq("user_id", userId)

  const totalEarnings = earnings?.reduce((sum, earn) => sum + Number(earn.amount), 0) || 0

  // Obter recompensas do plano de carreira
  const { data: rewards } = await supabase.from("career_rewards").select("*").eq("user_id", userId)

  // Definir níveis de recompensa
  const rewardLevels = [
    { value: 500, title: "Kit Mineradora", description: "Kit com mineradora portátil, camisa, boné e adesivo" },
    { value: 1000, title: "PlayStation 5", description: "Console PlayStation 5" },
    { value: 2000, title: "iPhone 16", description: "Smartphone Apple iPhone 16" },
    { value: 3000, title: "Scooter", description: "Scooter elétrica" },
    {
      value: 5000,
      title: "Viagem + Setup",
      description:
        "Viagem para conhecer nossa operação no Brasil e no Paraguai, incluindo um setup para minerar no valor de $5000",
    },
  ]

  // Mapear recompensas com status
  const rewardsWithStatus = rewardLevels.map((reward) => {
    const existingReward = rewards?.find((r) => r.reward_type === reward.title)

    return {
      ...reward,
      achieved: totalEarnings >= reward.value,
      claimed: existingReward?.claimed || false,
      eligible: existingReward?.eligible || false,
      id: existingReward?.id,
    }
  })

  return {
    totalEarnings,
    rewards: rewardsWithStatus,
    nextReward: rewardsWithStatus.find((r) => !r.achieved) || rewardsWithStatus[rewardsWithStatus.length - 1],
  }
}
