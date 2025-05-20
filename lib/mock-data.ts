// Dados mockados para uso enquanto o banco de dados está desativado

export const mockUser = {
  id: "mock-user-id",
  email: "usuario@exemplo.com",
  username: "usuario_exemplo",
  full_name: "Usuário Exemplo",
  avatar_url: null,
  wallet_address: "0x1234...5678",
  balance: 1000,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  referral_code: "usuarioexemplo",
  referrer_id: null,
  total_earned: 2500,
  total_withdrawn: 500,
  active_investment: 5000,
  investment_start_date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  investment_end_date: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000).toISOString(),
  referral_plan: "V1",
  career_level: 0,
  is_admin: false,
}

export const mockReferrals = [
  {
    id: "ref-1",
    username: "referido1",
    full_name: "Referido Um",
    created_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    active_investment: 1000,
    level: 1,
  },
  {
    id: "ref-2",
    username: "referido2",
    full_name: "Referido Dois",
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    active_investment: 2000,
    level: 1,
  },
  {
    id: "ref-3",
    username: "referido3",
    full_name: "Referido Três",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    active_investment: 1500,
    level: 2,
  },
]

export const mockTransactions = [
  {
    id: "tx-1",
    user_id: "mock-user-id",
    amount: 225,
    type: "earning",
    status: "completed",
    description: "Rendimento diário",
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx-2",
    user_id: "mock-user-id",
    amount: 225,
    type: "earning",
    status: "completed",
    description: "Rendimento diário",
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx-3",
    user_id: "mock-user-id",
    amount: 100,
    type: "referral",
    status: "completed",
    description: "Comissão de indicação - Referido Um",
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "tx-4",
    user_id: "mock-user-id",
    amount: 500,
    type: "withdrawal",
    status: "completed",
    description: "Saque para carteira BTC",
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockNotifications = [
  {
    id: "notif-1",
    user_id: "mock-user-id",
    title: "Rendimento creditado",
    message: "Seu rendimento diário de $225 foi creditado com sucesso.",
    read: false,
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-2",
    user_id: "mock-user-id",
    title: "Novo referido",
    message: "Você tem um novo referido! Referido Dois se cadastrou usando seu link.",
    read: true,
    created_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "notif-3",
    user_id: "mock-user-id",
    title: "Saque processado",
    message: "Seu saque de $500 foi processado com sucesso.",
    read: true,
    created_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const mockReferralLink = "https://amazonmining.vercel.app/register?ref=usuarioexemplo"
