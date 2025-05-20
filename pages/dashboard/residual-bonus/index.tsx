"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout"
import { PageHeader } from "../../../components/dashboard/page-header"
import { Card } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { useUser } from "../../../contexts/user-context"

export default function ResidualBonusPage() {
  const { user } = useUser()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Dados mockados para demonstração
  const residualEarnings = [
    {
      id: 1,
      user: "Carlos Silva",
      level: 1,
      investment: 1000,
      dailyYield: 45,
      commission: 4.5,
      date: "2023-05-15",
    },
    {
      id: 2,
      user: "Maria Oliveira",
      level: 1,
      investment: 2000,
      dailyYield: 90,
      commission: 9,
      date: "2023-05-15",
    },
    {
      id: 3,
      user: "João Santos",
      level: 2,
      investment: 1500,
      dailyYield: 67.5,
      commission: 6.75,
      date: "2023-05-15",
    },
    {
      id: 4,
      user: "Ana Pereira",
      level: 1,
      investment: 3000,
      dailyYield: 135,
      commission: 13.5,
      date: "2023-05-14",
    },
    {
      id: 5,
      user: "Pedro Costa",
      level: 2,
      investment: 500,
      dailyYield: 22.5,
      commission: 2.25,
      date: "2023-05-14",
    },
  ]

  // Calcular totais
  const totalCommission = residualEarnings.reduce((sum, item) => sum + item.commission, 0)
  const totalByLevel = residualEarnings.reduce(
    (acc, item) => {
      if (item.level === 1) {
        acc.level1 += item.commission
      } else if (item.level === 2) {
        acc.level2 += item.commission
      }
      return acc
    },
    { level1: 0, level2: 0 },
  )

  // Determinar o plano do usuário
  const userPlan = user?.referral_plan || "V1"
  const planDetails = {
    V1: { name: "Básico", level1: "0%", level2: "0%" },
    V2: { name: "Avançado", level1: "10%", level2: "0%" },
    V3: { name: "Premium", level1: "1%", level2: "10%" },
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <PageHeader
          title="Bônus Residual"
          description="Acompanhe seus ganhos residuais provenientes do rendimento dos seus indicados."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-medium text-slate-200 mb-2">Plano Atual</h3>
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center justify-center mr-4">
                <span className="text-xl font-bold text-white">{userPlan}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{planDetails[userPlan].name}</p>
                <p className="text-sm text-slate-400">
                  Nível 1: {planDetails[userPlan].level1} • Nível 2: {planDetails[userPlan].level2}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-medium text-slate-200 mb-2">Total Acumulado</h3>
            <p className="text-3xl font-bold text-emerald-400">${totalCommission.toFixed(2)}</p>
            <p className="text-sm text-slate-400 mt-1">Todos os bônus residuais recebidos</p>
          </Card>

          <Card className="p-6 bg-slate-800 border-slate-700">
            <h3 className="text-lg font-medium text-slate-200 mb-2">Distribuição por Nível</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Nível 1</p>
                <p className="text-xl font-bold text-white">${totalByLevel.level1.toFixed(2)}</p>
              </div>
              <div className="h-10 border-r border-slate-700"></div>
              <div>
                <p className="text-sm text-slate-400">Nível 2</p>
                <p className="text-xl font-bold text-white">${totalByLevel.level2.toFixed(2)}</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="bg-slate-800 border-slate-700">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="level1">Nível 1</TabsTrigger>
            <TabsTrigger value="level2">Nível 2</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Card className="bg-slate-800 border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400 font-medium">Usuário</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Nível</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Investimento</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Rendimento Diário</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Comissão</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residualEarnings.map((item) => (
                      <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-750">
                        <td className="p-4 text-white">{item.user}</td>
                        <td className="p-4 text-white">Nível {item.level}</td>
                        <td className="p-4 text-white">${item.investment.toFixed(2)}</td>
                        <td className="p-4 text-white">${item.dailyYield.toFixed(2)}</td>
                        <td className="p-4 text-emerald-400 font-medium">${item.commission.toFixed(2)}</td>
                        <td className="p-4 text-slate-400">{new Date(item.date).toLocaleDateString("pt-BR")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="level1">
            <Card className="bg-slate-800 border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400 font-medium">Usuário</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Investimento</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Rendimento Diário</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Comissão</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residualEarnings
                      .filter((item) => item.level === 1)
                      .map((item) => (
                        <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-750">
                          <td className="p-4 text-white">{item.user}</td>
                          <td className="p-4 text-white">${item.investment.toFixed(2)}</td>
                          <td className="p-4 text-white">${item.dailyYield.toFixed(2)}</td>
                          <td className="p-4 text-emerald-400 font-medium">${item.commission.toFixed(2)}</td>
                          <td className="p-4 text-slate-400">{new Date(item.date).toLocaleDateString("pt-BR")}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
          <TabsContent value="level2">
            <Card className="bg-slate-800 border-slate-700">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left p-4 text-slate-400 font-medium">Usuário</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Investimento</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Rendimento Diário</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Comissão</th>
                      <th className="text-left p-4 text-slate-400 font-medium">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residualEarnings
                      .filter((item) => item.level === 2)
                      .map((item) => (
                        <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-750">
                          <td className="p-4 text-white">{item.user}</td>
                          <td className="p-4 text-white">${item.investment.toFixed(2)}</td>
                          <td className="p-4 text-white">${item.dailyYield.toFixed(2)}</td>
                          <td className="p-4 text-emerald-400 font-medium">${item.commission.toFixed(2)}</td>
                          <td className="p-4 text-slate-400">{new Date(item.date).toLocaleDateString("pt-BR")}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
