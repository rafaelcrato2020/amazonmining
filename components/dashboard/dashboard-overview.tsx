"use client"

import { useState, useEffect } from "react"
import { Wallet, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientComponentClient } from "@/lib/supabase"

export function DashboardOverview() {
  const [stats, setStats] = useState({
    balance: 0,
    activeInvestment: 0,
    totalEarnings: 0,
    referrals: 0,
    daysRemaining: 0,
  })
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        // Buscar perfil do usuário
        const { data: profile } = await supabase
          .from("profiles")
          .select("balance, active_investment, days_remaining")
          .eq("id", session.user.id)
          .single()

        // Buscar total de ganhos
        const { data: earnings } = await supabase
          .from("transactions")
          .select("amount")
          .eq("user_id", session.user.id)
          .in("type", ["interest", "referral_bonus"])

        const totalEarnings = earnings?.reduce((sum, item) => sum + Number(item.amount), 0) || 0

        // Buscar total de indicados
        const { count: referralsCount } = await supabase
          .from("profiles")
          .select("*", { count: "exact", head: true })
          .eq("referred_by", session.user.id)

        setStats({
          balance: profile?.balance || 0,
          activeInvestment: profile?.active_investment || 0,
          totalEarnings,
          referrals: referralsCount || 0,
          daysRemaining: profile?.days_remaining || 0,
        })
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [supabase])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Saldo Disponível</CardTitle>
            <Wallet className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="h-8 w-24 bg-slate-700 animate-pulse rounded"></div>
              ) : (
                `$${stats.balance.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">Disponível para saque ou reinvestimento</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Investimento Ativo</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="h-8 w-24 bg-slate-700 animate-pulse rounded"></div>
              ) : (
                `$${stats.activeInvestment.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">Total investido atualmente</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total de Ganhos</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? (
                <div className="h-8 w-24 bg-slate-700 animate-pulse rounded"></div>
              ) : (
                `$${stats.totalEarnings.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-slate-500 mt-1">Rendimentos + Comissões</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Indicações</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loading ? <div className="h-8 w-24 bg-slate-700 animate-pulse rounded"></div> : stats.referrals}
            </div>
            <p className="text-xs text-slate-500 mt-1">Total de usuários indicados</p>
          </CardContent>
        </Card>
      </div>

      {/* Mais conteúdo do dashboard pode ser adicionado aqui */}
    </div>
  )
}
