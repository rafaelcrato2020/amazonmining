export type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  wallet_address: string | null
  balance: number
  referral_code: string | null
  referred_by: string | null
  plan_level: string
  created_at: string
  updated_at: string
}

export type Deposit = {
  id: string
  user_id: string
  amount: number
  status: "pending" | "completed" | "failed"
  tx_hash: string | null
  network: string
  created_at: string
  updated_at: string
}

export type Withdrawal = {
  id: string
  user_id: string
  amount: number
  fee: number
  net_amount: number
  status: "pending" | "processing" | "completed" | "failed"
  tx_hash: string | null
  wallet_address: string
  created_at: string
  updated_at: string
}

export type Investment = {
  id: string
  user_id: string
  amount: number
  daily_rate: number
  days_total: number
  days_remaining: number
  status: "active" | "completed" | "cancelled"
  source: "deposit" | "reinvestment"
  created_at: string
  updated_at: string
}

export type Earning = {
  id: string
  user_id: string
  investment_id: string
  amount: number
  day_number: number
  created_at: string
}

export type ReferralEarning = {
  id: string
  user_id: string
  referred_user_id: string
  amount: number
  level: number
  rate: number
  source_amount: number
  created_at: string
}

export type Transaction = {
  id: string
  user_id: string
  type: "deposit" | "withdrawal" | "earning" | "referral" | "reinvestment"
  amount: number
  reference_id: string | null
  description: string | null
  created_at: string
}

export type CareerReward = {
  id: string
  user_id: string
  reward_type: string
  claimed: boolean
  eligible: boolean
  claimed_at: string | null
}

export type SystemSetting = {
  id: number
  setting_key: string
  setting_value: any
  description: string | null
  updated_at: string
}

export type DashboardData = {
  profile: Profile
  balance: number
  totalInvested: number
  totalEarnings: number
  activeInvestments: Investment[]
  recentEarnings: Earning[]
  recentDeposits: Deposit[]
  recentWithdrawals: Withdrawal[]
  referrals: {
    total: number
    active: number
    earnings: number
    list: Profile[]
  }
}
