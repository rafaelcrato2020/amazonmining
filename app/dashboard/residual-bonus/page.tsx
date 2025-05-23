"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Percent, Users, TrendingUp, Info } from "lucide-react"

export default function ResidualBonusPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Bônus Residual</h1>
          <p className="text-slate-400 mt-1">Ganhe bônus adicionais com base no seu nível de plano</p>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-bold text-white">Seu Plano de Bônus Residual</CardTitle>
            <Percent className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
                  <Info className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">O que é o Bônus Residual?</h3>
                </div>
              </div>
              <p className="text-slate-400">
                O Bônus Residual é um benefício adicional que você recebe com base no seu nível de plano (V1, V2 ou V3).
                Este bônus é calculado sobre os rendimentos dos seus indicados, proporcionando uma fonte adicional de
                renda.
              </p>
            </div>

            <Tabs defaultValue="v1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                <TabsTrigger value="v1" className="data-[state=active]:bg-slate-700">
                  Plano V1
                </TabsTrigger>
                <TabsTrigger value="v2" className="data-[state=active]:bg-slate-700">
                  Plano V2
                </TabsTrigger>
                <TabsTrigger value="v3" className="data-[state=active]:bg-slate-700">
                  Plano V3
                </TabsTrigger>
              </TabsList>

              <TabsContent value="v1" className="mt-4 space-y-4">
                <div className="rounded-lg bg-slate-800 p-6 border border-slate-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Plano V1</h3>
                    <span className="rounded-full bg-slate-700 px-2 py-1 text-xs font-medium text-white">
                      Iniciante
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-700">
                        <Percent className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Sem Bônus Residual</h4>
                        <p className="text-slate-400">
                          O plano V1 não inclui bônus residual. Atualize para o plano V2 ou V3 para começar a receber
                          bônus residuais.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-700/50 p-4 border border-slate-600">
                      <p className="text-sm text-slate-400">
                        Para avançar para o plano V2 e começar a receber bônus residuais, você precisa ter pelo menos 5
                        indicados ativos.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="v2" className="mt-4 space-y-4">
                <div className="rounded-lg bg-slate-800 p-6 border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Plano V2</h3>
                    <span className="rounded-full bg-emerald-500/20 px-2 py-1 text-xs font-medium text-emerald-500">
                      Intermediário
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                        <Percent className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">10% no Primeiro Nível</h4>
                        <p className="text-slate-400">
                          Com o plano V2, você recebe 10% de bônus residual sobre os rendimentos dos seus indicados
                          diretos (primeiro nível).
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-700/50 p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-2">Requisitos para o Plano V2:</h5>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-emerald-500" />
                          Ter pelo menos 5 indicados ativos
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-emerald-500/10 p-4 border border-emerald-500/20">
                      <h5 className="font-medium text-white mb-2">Exemplo de Ganhos:</h5>
                      <p className="text-sm text-slate-400">
                        Se seus 5 indicados diretos ganharem $100 cada em rendimentos, você receberá $50 em bônus
                        residual (10% de $500).
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="v3" className="mt-4 space-y-4">
                <div className="rounded-lg bg-slate-800 p-6 border border-cyan-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Plano V3</h3>
                    <span className="rounded-full bg-cyan-500/20 px-2 py-1 text-xs font-medium text-cyan-500">
                      Avançado
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cyan-500/20">
                        <Percent className="h-5 w-5 text-cyan-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium text-white">Bônus em Dois Níveis</h4>
                        <p className="text-slate-400">
                          Com o plano V3, você recebe 1% de bônus residual no primeiro nível e 10% no segundo nível de
                          indicações.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg bg-slate-700/50 p-4 border border-slate-600">
                        <h5 className="font-medium text-white mb-2">Primeiro Nível: 1%</h5>
                        <p className="text-sm text-slate-400">
                          Receba 1% sobre os rendimentos dos seus indicados diretos.
                        </p>
                      </div>

                      <div className="rounded-lg bg-slate-700/50 p-4 border border-slate-600">
                        <h5 className="font-medium text-white mb-2">Segundo Nível: 10%</h5>
                        <p className="text-sm text-slate-400">
                          Receba 10% sobre os rendimentos dos indicados dos seus indicados.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-700/50 p-4 border border-slate-600">
                      <h5 className="font-medium text-white mb-2">Requisitos para o Plano V3:</h5>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-cyan-500" />
                          Ter pelo menos 10 indicados ativos
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-lg bg-cyan-500/10 p-4 border border-cyan-500/20">
                      <h5 className="font-medium text-white mb-2">Exemplo de Ganhos:</h5>
                      <p className="text-sm text-slate-400">
                        Se seus 10 indicados diretos ganharem $100 cada (total $1000), você recebe $10 (1% de $1000). Se
                        cada um dos seus indicados tiver 5 indicados que ganham $50 cada (total $2500), você recebe $250
                        (10% de $2500).
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Como Funciona</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Users className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">1. Indique novos usuários</h3>
                  <p className="text-slate-400">
                    Compartilhe seu link de indicação e convide novos usuários para a plataforma.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">2. Alcance o nível necessário</h3>
                  <p className="text-slate-400">
                    Tenha 5 indicados ativos para o plano V2 ou 10 indicados ativos para o plano V3.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Percent className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">3. Receba bônus residuais</h3>
                  <p className="text-slate-400">
                    Ganhe bônus residuais automaticamente com base nos rendimentos dos seus indicados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Dicas para Maximizar seus Ganhos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-slate-800 p-4">
                <h3 className="text-lg font-medium text-white mb-2">Foque em indicados ativos</h3>
                <p className="text-sm text-slate-400">
                  Indique pessoas que realmente têm interesse em investir na plataforma. Indicados ativos são aqueles
                  que possuem investimentos ativos.
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-4">
                <h3 className="text-lg font-medium text-white mb-2">Construa uma rede de segundo nível</h3>
                <p className="text-sm text-slate-400">
                  No plano V3, o segundo nível oferece 10% de bônus. Incentive seus indicados a também indicarem novos
                  usuários.
                </p>
              </div>

              <div className="rounded-lg bg-slate-800 p-4">
                <h3 className="text-lg font-medium text-white mb-2">Acompanhe seus ganhos</h3>
                <p className="text-sm text-slate-400">
                  Monitore regularmente seus ganhos de bônus residual e identifique oportunidades para aumentar sua
                  rede.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
