"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Award, Copy, Check, Share2, Users, Lock } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function RewardsPage() {
  const { isOpen } = useSidebar()
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("v1")
  const referralLinkRef = useRef<HTMLInputElement>(null)

  const referralLink = "https://amazonmining.com/ref/joaosilva123"

  const copyToClipboard = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select()
      document.execCommand("copy")
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareReferralLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Junte-se à Amazon Mining",
        text: "Comece a minerar criptomoedas e ganhe recompensas!",
        url: referralLink,
      })
    }
  }

  const rewardPlans = [
    {
      id: "v1",
      name: "V1",
      levels: 3,
      rates: [10, 5, 5],
      requirement: "Sem requisito mínimo",
      active: true,
      color: "from-emerald-600 to-cyan-600",
    },
    {
      id: "v2",
      name: "V2",
      levels: 4,
      rates: [10, 5, 5, 5],
      requirement: "5 indicados ativos",
      active: false,
      color: "from-blue-600 to-indigo-600",
    },
    {
      id: "v3",
      name: "V3",
      levels: 5,
      rates: [10, 5, 5, 5, 5],
      requirement: "10 cadastros ativos",
      active: false,
      color: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar />
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-20")}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Planos de Recompensa</h1>
            <p className="text-slate-400">
              Indique amigos e ganhe comissões em múltiplos níveis. Quanto mais indicações, maiores suas recompensas.
            </p>
          </div>

          {/* Link de Indicação */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <CardTitle className="text-white">Seu Link de Indicação</CardTitle>
              <CardDescription>
                Compartilhe este link com seus amigos e ganhe comissões quando eles se cadastrarem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Input
                    ref={referralLinkRef}
                    value={referralLink}
                    readOnly
                    className="pr-10 bg-slate-800 border-slate-700 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={copyToClipboard}
                    variant="outline"
                    className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                  >
                    {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                    {copied ? "Copiado!" : "Copiar"}
                  </Button>
                  <Button
                    onClick={shareReferralLink}
                    className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Planos de Recompensa */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              {rewardPlans.map((plan) => (
                <TabsTrigger key={plan.id} value={plan.id} disabled={!plan.active && plan.id !== "v1"}>
                  {plan.name}
                  {!plan.active && plan.id !== "v1" && <Lock className="ml-2 h-3 w-3" />}
                </TabsTrigger>
              ))}
            </TabsList>

            {rewardPlans.map((plan) => (
              <TabsContent key={plan.id} value={plan.id} className="mt-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          Plano {plan.name}{" "}
                          {plan.active ? (
                            <Badge className="bg-emerald-500 text-white">Ativo</Badge>
                          ) : (
                            <Badge variant="outline" className="border-slate-700 text-slate-400">
                              Bloqueado
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {plan.active
                            ? `Você está recebendo comissões em ${plan.levels} níveis.`
                            : `Requisito: ${plan.requirement}`}
                        </CardDescription>
                      </div>
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                      >
                        <Award className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Níveis de Recompensa */}
                      <div>
                        <h3 className="text-sm font-medium text-white mb-3">Níveis de Recompensa</h3>
                        <div className="grid grid-cols-5 gap-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 rounded-full ${
                                i < plan.levels ? `bg-gradient-to-r ${plan.color}` : "bg-slate-800"
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>

                      {/* Taxas por Nível */}
                      <div>
                        <h3 className="text-sm font-medium text-white mb-3">Taxas por Nível</h3>
                        <div className="space-y-2">
                          {plan.rates.map((rate, i) => (
                            <div key={i} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-6 h-6 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-xs font-medium text-white`}
                                >
                                  {i + 1}
                                </div>
                                <span className="text-slate-300">Nível {i + 1}</span>
                              </div>
                              <span className="font-medium text-white">{rate}%</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requisitos */}
                      {!plan.active && plan.id !== "v1" && (
                        <div className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <Users className="h-5 w-5 text-emerald-400" />
                            <h3 className="text-sm font-medium text-white">Como desbloquear</h3>
                          </div>
                          <p className="text-sm text-slate-400">
                            {plan.id === "v2"
                              ? "Você precisa ter 5 indicados ativos para desbloquear este plano."
                              : "Você precisa ter 10 cadastros ativos para desbloquear este plano."}
                          </p>
                          <div className="mt-3 flex items-center gap-2">
                            <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full bg-gradient-to-r ${plan.color}`}
                                style={{ width: plan.id === "v2" ? "40%" : "20%" }}
                              ></div>
                            </div>
                            <span className="text-xs text-slate-400">
                              {plan.id === "v2" ? "2/5 indicados" : "2/10 cadastros"}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Estatísticas de Indicação */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Total de Indicados</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">24</div>
                      <p className="text-xs text-emerald-400 mt-1">+3 nos últimos 7 dias</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Indicados Ativos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">18</div>
                      <p className="text-xs text-slate-400 mt-1">75% de taxa de ativação</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-slate-400">Ganhos com Indicações</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-white">$345.67</div>
                      <p className="text-xs text-emerald-400 mt-1">+$42.50 esta semana</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
      </div>
    </div>
  )
}
