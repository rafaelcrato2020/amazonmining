"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ReferralLink } from "@/components/dashboard/referral-link"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Users, Lock, Loader2 } from "lucide-react"
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react"

type ReferralPlan = {
  id: number
  name: string
  code: string
  levels: number
  rates: number[]
  requirement: string
  active: boolean
}

type ReferralData = {
  totalReferrals: number
  activeReferrals: number
  currentPlan: string
  plans: ReferralPlan[]
}

// Adicionar esta configuração para desabilitar a pré-renderização estática
export const getServerSideProps = async () => {
  return {
    props: {},
  }
}

export default function RewardsPage() {
  const router = useRouter()
  const { user } = useUser() || { user: null } // Adicionar fallback para user null
  const supabaseClient = useSupabaseClient()
  const [activeTab, setActiveTab] = useState("1")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ReferralData | null>(null)
  const [mounted, setMounted] = useState(false)

  // Adicionar verificação de montagem do componente
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Só executar este efeito no cliente e quando o componente estiver montado
    if (!mounted) return

    if (!user) {
      router.push("/login")
      return
    }

    fetchReferralData()
  }, [user, router, mounted])

  const fetchReferralData = async () => {
    if (!user) return // Não buscar dados se não houver usuário

    setLoading(true)
    try {
      const response = await fetch("/api/referral/plans")
      if (!response.ok) {
        throw new Error("Falha ao buscar dados de referral")
      }
      const responseData = await response.json()
      setData(responseData)

      // Definir a aba ativa com base no plano atual
      const currentPlanId = responseData.plans.find((p) => p.active)?.id.toString() || "1"
      setActiveTab(currentPlanId)
    } catch (error) {
      console.error("Erro ao buscar dados de referral:", error)
    } finally {
      setLoading(false)
    }
  }

  // Renderizar um estado de carregamento inicial até que o componente seja montado no cliente
  if (!mounted) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Planos de Recompensa</h1>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Verificar se o usuário está autenticado
  if (!user) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Planos de Recompensa</h1>
          <div className="flex items-center justify-center h-64">
            <p className="text-white">Redirecionando para a página de login...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-6 text-white">Planos de Recompensa</h1>
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-white">Planos de Recompensa</h1>

        {/* Link de Referral - Usando o novo componente */}
        <ReferralLink className="mb-8" />

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Total de Indicados</h3>
            <p className="text-3xl font-bold text-white">{data?.totalReferrals || 0}</p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Indicados Ativos</h3>
            <p className="text-3xl font-bold text-white">{data?.activeReferrals || 0}</p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Seu Plano Atual</h3>
            <p className="text-3xl font-bold text-white">{data?.currentPlan || "V1"}</p>
          </Card>
          <Card className="bg-slate-900 border-slate-800 p-6">
            <h3 className="text-slate-400 text-sm font-medium mb-2">Níveis de Comissão</h3>
            <p className="text-3xl font-bold text-white">{data?.plans?.find((p) => p.active)?.levels || 3}</p>
          </Card>
        </div>

        {/* Planos de Referral */}
        <h2 className="text-xl font-bold mb-4 text-white">Planos de Referral</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            {data?.plans?.map((plan) => (
              <TabsTrigger key={plan.id} value={plan.id.toString()}>
                {plan.code}
                {!plan.active && plan.id !== 1 && <Lock className="ml-2 h-3 w-3" />}
              </TabsTrigger>
            ))}
          </TabsList>

          {data?.plans?.map((plan) => (
            <TabsContent key={plan.id} value={plan.id.toString()} className="mt-6">
              <Card className="bg-slate-900 border-slate-800 p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {plan.active && <Badge className="bg-emerald-500 text-white">Ativo</Badge>}
                </div>
                <p className="text-white/80 mb-4">Requisito: {plan.requirement}</p>
                <div className="mb-4">
                  <h4 className="text-white/80 text-sm mb-2">Níveis de Comissão:</h4>
                  <div className="flex flex-wrap gap-2">
                    {plan.rates.map((rate, index) => (
                      <Badge key={index} variant="outline" className="bg-slate-800 text-white border-slate-700">
                        Nível {index + 1}: {rate}%
                      </Badge>
                    ))}
                  </div>
                </div>

                {!plan.active && plan.id !== 1 && (
                  <div className="bg-slate-800/50 rounded-lg p-4 mt-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-emerald-400" />
                      <h3 className="text-sm font-medium text-white">Como desbloquear</h3>
                    </div>
                    <p className="text-sm text-slate-400">
                      {plan.id === 2
                        ? "Você precisa ter 5 indicados ativos para desbloquear este plano."
                        : "Você precisa ter 10 cadastros ativos para desbloquear este plano."}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500"
                          style={{
                            width: `${Math.min(
                              100,
                              plan.id === 2 ? (data?.activeReferrals || 0) * 20 : (data?.activeReferrals || 0) * 10,
                            )}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-slate-400">
                        {data?.activeReferrals || 0}/{plan.id === 2 ? 5 : 10} indicados
                      </span>
                    </div>
                  </div>
                )}
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Regras */}
        <Card className="bg-slate-900 border-slate-800 p-6 mt-8">
          <h2 className="text-xl font-bold mb-4 text-white">Regras do Programa</h2>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            <li>As comissões são pagas diariamente junto com os rendimentos.</li>
            <li>Para avançar para o plano V2, você precisa ter pelo menos 5 indicados ativos.</li>
            <li>Para avançar para o plano V3, você precisa ter pelo menos 10 indicados ativos.</li>
            <li>Um indicado é considerado ativo quando possui pelo menos um investimento ativo.</li>
            <li>As comissões são calculadas com base no rendimento diário dos seus indicados.</li>
          </ul>
        </Card>
      </div>
    </DashboardLayout>
  )
}
