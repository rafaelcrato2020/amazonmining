"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, ChevronRight, Loader2 } from "lucide-react"

type ReferralData = {
  referralCode: string
  referralLink: string
  totalReferrals: number
  activeReferrals: number
  currentPlan: string
  plans: Array<{
    id: number
    name: string
    code: string
    levels: number
    rates: number[]
    requirement: string
    active: boolean
  }>
}

export function DashboardRewards() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ReferralData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReferralData = async () => {
      try {
        const response = await fetch("/api/referral/plans")
        if (!response.ok) {
          throw new Error("Falha ao buscar dados de referral")
        }
        const responseData = await response.json()
        setData(responseData)
      } catch (err) {
        console.error("Erro ao buscar dados de referral:", err)
        setError("Não foi possível carregar os dados de referral")
      } finally {
        setLoading(false)
      }
    }

    fetchReferralData()
  }, [])

  // Dados para exibição quando estiver carregando ou houver erro
  const referrals = [
    { name: "Usuário 1", level: 1, earnings: 0 },
    { name: "Usuário 2", level: 1, earnings: 0 },
    { name: "Usuário 3", level: 2, earnings: 0 },
    { name: "Usuário 4", level: 3, earnings: 0 },
  ]

  const totalEarnings = 0
  const nextReward = 500 // Próxima recompensa em $500
  const progress = (totalEarnings / nextReward) * 100

  if (loading) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-white">Programa de Recompensas</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium text-white">Programa de Recompensas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-400" />
                <span className="text-sm font-medium text-white">Próxima Recompensa: Kit Mineradora</span>
              </div>
              <span className="text-sm text-slate-400">
                ${totalEarnings.toFixed(2)}/${nextReward}
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-slate-800"
              indicatorClassName="bg-gradient-to-r from-emerald-600 to-cyan-600"
            />
            <p className="text-xs text-slate-400 mt-2">
              Você está {progress.toFixed(0)}% do caminho para sua próxima recompensa
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-white">Indicações Recentes</h4>
              <Link
                href="/dashboard/rewards"
                className="text-xs text-emerald-400 flex items-center gap-1 hover:text-emerald-300"
              >
                Ver todas <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {referrals.map((referral, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{referral.name}</p>
                    <p className="text-xs text-slate-400">Nível {referral.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-emerald-400">+$0.00</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Exibir dados reais
  const currentPlan = data?.plans.find((plan) => plan.active) || data?.plans[0]

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Programa de Recompensas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white">Plano Atual: {currentPlan?.name || "V1"}</span>
            </div>
            <span className="text-sm text-slate-400">
              {data?.activeReferrals || 0}/{currentPlan?.id === 1 ? 0 : currentPlan?.id === 2 ? 5 : 10} indicados ativos
            </span>
          </div>
          <Progress
            value={
              data?.activeReferrals
                ? (data.activeReferrals / (currentPlan?.id === 1 ? 1 : currentPlan?.id === 2 ? 5 : 10)) * 100
                : 0
            }
            className="h-2 bg-slate-800"
            indicatorClassName="bg-gradient-to-r from-emerald-600 to-cyan-600"
          />
          <p className="text-xs text-slate-400 mt-2">
            {currentPlan?.id === 1
              ? "Você está no plano básico. Indique 5 amigos ativos para avançar para o próximo nível."
              : currentPlan?.id === 2
                ? "Você está no plano intermediário. Indique mais 5 amigos ativos para avançar para o nível máximo."
                : "Parabéns! Você atingiu o nível máximo do plano de recompensas."}
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white">Taxas de Comissão</h4>
            <Link
              href="/dashboard/rewards"
              className="text-xs text-emerald-400 flex items-center gap-1 hover:text-emerald-300"
            >
              Ver detalhes <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {currentPlan?.rates.map((rate, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">Nível {index + 1}</p>
                  <p className="text-xs text-slate-400">{rate}% de comissão</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-emerald-400">{index === 0 ? "Direto" : "Indireto"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
