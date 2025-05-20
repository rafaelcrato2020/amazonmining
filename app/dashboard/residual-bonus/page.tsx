import { PageHeader } from "@/components/dashboard/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, Award } from "lucide-react"

export default function ResidualBonusPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Bônus Residual" description="Ganhe mesmo sem trabalhar com nosso sistema de bônus residual." />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-slate-800 border border-slate-700">
          <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="network" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Minha Rede
          </TabsTrigger>
          <TabsTrigger value="earnings" className="data-[state=active]:bg-slate-700 data-[state=active]:text-cyan-400">
            Ganhos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-300">Plano Atual</CardTitle>
                <Award className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">V1</div>
                <p className="text-xs text-slate-400">Sem bônus residual</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-300">Indicados Ativos</CardTitle>
                <Users className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">0</div>
                <p className="text-xs text-slate-400">Precisa de 5 para V2</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-cyan-300">Ganhos Residuais</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-cyan-400">$0.00</div>
                <p className="text-xs text-slate-400">Acumulado até agora</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300">Regras do Bônus Residual</CardTitle>
              <CardDescription className="text-slate-400">
                Entenda como funciona o sistema de bônus residual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-cyan-400">V1</h3>
                <p className="text-sm text-slate-400">Sem bônus residual. Você não ganha nada com a rede.</p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-cyan-400">V2 (Requer 5 indicados ativos)</h3>
                <p className="text-sm text-slate-400">
                  Ganhe 10% de tudo que seu indicado direto investir! Transforme suas conexões em lucro diário!
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-cyan-400">V3 (Requer 10 indicados ativos)</h3>
                <p className="text-sm text-slate-400">
                  Ganhos em DOBRO! 10% no 1º nível, +10% no 2º nível, +1% no 3º nível. Imagine ganhar enquanto outras
                  pessoas trabalham — até 3 níveis abaixo de você!
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300">Minha Rede</CardTitle>
              <CardDescription className="text-slate-400">
                Visualize sua rede de indicados e seus desempenhos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-slate-400">Você ainda não possui indicados ativos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-cyan-300">Histórico de Ganhos</CardTitle>
              <CardDescription className="text-slate-400">
                Acompanhe seus ganhos residuais ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-slate-400">Você ainda não possui ganhos residuais.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
