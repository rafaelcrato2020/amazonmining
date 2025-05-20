import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { PageHeader } from "../../../components/dashboard/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"

export default function ResidualBonusPage() {
  // Dados mockados para o bônus residual
  const bonusData = {
    totalEarned: 1250.75,
    currentPlan: "V2",
    activeReferrals: 7,
    level1Bonus: 10,
    level2Bonus: 0,
    recentBonuses: [
      {
        id: 1,
        date: "2023-05-18",
        amount: 45.5,
        from: "Carlos Silva",
        level: 1,
      },
      {
        id: 2,
        date: "2023-05-17",
        amount: 32.25,
        from: "Maria Oliveira",
        level: 1,
      },
      {
        id: 3,
        date: "2023-05-15",
        amount: 28.75,
        from: "João Santos",
        level: 1,
      },
    ],
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <PageHeader
          title="Bônus Residual"
          description="Acompanhe seus ganhos residuais provenientes dos rendimentos dos seus indicados."
        />

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Ganho</CardTitle>
              <CardDescription>Bônus residual acumulado</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-500">${bonusData.totalEarned.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Plano Atual</CardTitle>
              <CardDescription>Seu plano de bônus residual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-500">{bonusData.currentPlan}</div>
              <p className="text-sm text-slate-400 mt-1">
                {bonusData.currentPlan === "V1"
                  ? "Sem bônus residual"
                  : bonusData.currentPlan === "V2"
                    ? "10% no primeiro nível"
                    : "1% no primeiro nível, 10% no segundo nível"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Indicados Ativos</CardTitle>
              <CardDescription>Indicados gerando bônus</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-500">{bonusData.activeReferrals}</div>
            </CardContent>
          </Card>
        </div>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Como funciona o Bônus Residual?</AlertTitle>
          <AlertDescription>
            O bônus residual é uma porcentagem do rendimento diário dos seus indicados que você recebe automaticamente.
            Quanto maior seu plano, maiores são seus ganhos residuais.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="recent">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="recent">Bônus Recentes</TabsTrigger>
            <TabsTrigger value="plans">Planos Disponíveis</TabsTrigger>
          </TabsList>
          <TabsContent value="recent">
            <Card>
              <CardHeader>
                <CardTitle>Bônus Recentes</CardTitle>
                <CardDescription>Seus últimos ganhos de bônus residual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-700">
                  <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                      <thead className="[&_tr]:border-b border-slate-700">
                        <tr className="border-b border-slate-700 transition-colors hover:bg-slate-800/50">
                          <th className="h-12 px-4 text-left align-middle font-medium text-slate-400">Data</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-slate-400">Valor</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-slate-400">Indicado</th>
                          <th className="h-12 px-4 text-left align-middle font-medium text-slate-400">Nível</th>
                        </tr>
                      </thead>
                      <tbody className="[&_tr:last-child]:border-0">
                        {bonusData.recentBonuses.map((bonus) => (
                          <tr
                            key={bonus.id}
                            className="border-b border-slate-700 transition-colors hover:bg-slate-800/50"
                          >
                            <td className="p-4 align-middle">{bonus.date}</td>
                            <td className="p-4 align-middle font-medium text-emerald-500">
                              ${bonus.amount.toFixed(2)}
                            </td>
                            <td className="p-4 align-middle">{bonus.from}</td>
                            <td className="p-4 align-middle">Nível {bonus.level}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="plans">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Plano V1 */}
              <Card>
                <CardHeader>
                  <CardTitle>Plano V1</CardTitle>
                  <CardDescription>Plano Básico</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-slate-500 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                      </svg>
                      <span className="text-slate-400">Sem bônus residual</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-slate-300">Comissões de indicação direta</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plano V2 */}
              <Card className={bonusData.currentPlan === "V2" ? "border-cyan-500/50" : ""}>
                <CardHeader>
                  <CardTitle>Plano V2</CardTitle>
                  <CardDescription>Plano Avançado</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-cyan-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-white">
                        <strong className="text-cyan-400">10%</strong> de bônus no primeiro nível
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-cyan-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-white">5 indicados ativos necessários</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Plano V3 */}
              <Card className={bonusData.currentPlan === "V3" ? "border-emerald-500/50" : ""}>
                <CardHeader>
                  <CardTitle>Plano V3</CardTitle>
                  <CardDescription>Plano Premium</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-white">
                        <strong className="text-emerald-400">1%</strong> de bônus no primeiro nível
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-white">
                        <strong className="text-emerald-400">10%</strong> de bônus no segundo nível
                      </span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-emerald-400 mr-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                      <span className="text-white">10 indicados ativos necessários</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
