"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Users, Clock, Wallet, Loader2 } from "lucide-react"
import { PageHeader } from "./page-header"
import { getDashboardData } from "@/app/actions/dashboard-actions"
import { useAuth } from "@/contexts/auth-context"
import type { DashboardData } from "@/types/database"
import { formatCurrency } from "@/lib/utils"

export function DashboardOverview() {
  const { user } = useAuth()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("daily")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      if (!user) return

      try {
        setIsLoading(true)
        const data = await getDashboardData(user.id)
        setDashboardData(data)
        setError(null)
      } catch (err: any) {
        console.error("Erro ao carregar dados:", err)
        setError(err.message || "Erro ao carregar dados da dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user])

  if (isLoading) {
    return (
      <div className="p-4 md:p-6 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin mb-4" />
        <p className="text-slate-400">Carregando dados da dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-red-500/10 text-red-500 p-4 rounded-md">
          <p className="font-medium">Erro ao carregar dados:</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!dashboardData) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-amber-500/10 text-amber-500 p-4 rounded-md">
          <p>Nenhum dado disponível. Faça seu primeiro depósito para começar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <PageHeader title="Visão Geral" />

      <h2 className="text-2xl font-bold text-white mb-6">Visão Geral</h2>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <div className="flex items-center justify-between">
          <TabsList className="bg-slate-800">
            <TabsTrigger value="daily">Diário</TabsTrigger>
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensal</TabsTrigger>
          </TabsList>

          <div className="text-sm text-slate-400">Atualizado em: {new Date().toLocaleString()}</div>
        </div>

        <TabsContent value="daily" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card de saldo disponível */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Saldo Disponível</CardTitle>
                <Wallet className="h-5 w-5 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(dashboardData.balance)}</div>
                <p className="text-xs text-slate-400 mt-1">Atualizado hoje</p>
              </CardContent>
            </Card>

            <StatCard
              title="Ganhos Totais"
              value={formatCurrency(dashboardData.totalEarnings)}
              description="Atualizado hoje"
              icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
            />

            <StatCard
              title="Rentabilidade"
              value="4.5%"
              description="Fixa por 100 dias"
              icon={<TrendingUp className="h-5 w-5 text-emerald-400" />}
              additionalContent={
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Saldo Investido:</span>
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(dashboardData.totalInvested)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">Rendimento Diário:</span>
                    <span className="text-sm font-medium text-emerald-400">
                      {formatCurrency(dashboardData.totalInvested * 0.045)}
                    </span>
                  </div>
                </div>
              }
            />

            <StatCard
              title="Indicações"
              value={dashboardData.referrals.total.toString()}
              description={`${dashboardData.referrals.active} ativos`}
              icon={<Users className="h-5 w-5 text-emerald-400" />}
            />

            <StatCard
              title="Dias Restantes"
              value={dashboardData.activeInvestments[0]?.days_remaining.toString() || "0"}
              description={`De ${dashboardData.activeInvestments[0]?.days_total || 100} dias`}
              icon={<Clock className="h-5 w-5 text-emerald-400" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="weekly" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card de saldo disponível */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Saldo Disponível</CardTitle>
                <Wallet className="h-5 w-5 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(dashboardData.balance)}</div>
                <p className="text-xs text-slate-400 mt-1">Atualizado esta semana</p>
              </CardContent>
            </Card>

            <StatCard
              title="Ganhos Totais"
              value={formatCurrency(dashboardData.totalEarnings)}
              description="Atualizado esta semana"
              icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
            />

            <StatCard
              title="Rentabilidade"
              value="4.5%"
              description="Fixa por 100 dias"
              icon={<TrendingUp className="h-5 w-5 text-emerald-400" />}
              additionalContent={
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Saldo Investido:</span>
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(dashboardData.totalInvested)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">Rendimento Semanal:</span>
                    <span className="text-sm font-medium text-emerald-400">
                      {formatCurrency(dashboardData.totalInvested * 0.045 * 7)}
                    </span>
                  </div>
                </div>
              }
            />

            <StatCard
              title="Indicações"
              value={dashboardData.referrals.total.toString()}
              description={`${dashboardData.referrals.active} ativos`}
              icon={<Users className="h-5 w-5 text-emerald-400" />}
            />

            <StatCard
              title="Dias Restantes"
              value={dashboardData.activeInvestments[0]?.days_remaining.toString() || "0"}
              description={`De ${dashboardData.activeInvestments[0]?.days_total || 100} dias`}
              icon={<Clock className="h-5 w-5 text-emerald-400" />}
            />
          </div>
        </TabsContent>

        <TabsContent value="monthly" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {/* Card de saldo disponível */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-slate-400">Saldo Disponível</CardTitle>
                <Wallet className="h-5 w-5 text-emerald-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{formatCurrency(dashboardData.balance)}</div>
                <p className="text-xs text-slate-400 mt-1">Atualizado este mês</p>
              </CardContent>
            </Card>

            <StatCard
              title="Ganhos Totais"
              value={formatCurrency(dashboardData.totalEarnings)}
              description="Atualizado este mês"
              icon={<DollarSign className="h-5 w-5 text-emerald-400" />}
            />

            <StatCard
              title="Rentabilidade"
              value="4.5%"
              description="Fixa por 100 dias"
              icon={<TrendingUp className="h-5 w-5 text-emerald-400" />}
              additionalContent={
                <div className="mt-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Saldo Investido:</span>
                    <span className="text-sm font-medium text-white">
                      {formatCurrency(dashboardData.totalInvested)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-slate-400">Rendimento Mensal:</span>
                    <span className="text-sm font-medium text-emerald-400">
                      {formatCurrency(dashboardData.totalInvested * 0.045 * 30)}
                    </span>
                  </div>
                </div>
              }
            />

            <StatCard
              title="Indicações"
              value={dashboardData.referrals.total.toString()}
              description={`${dashboardData.referrals.active} ativos`}
              icon={<Users className="h-5 w-5 text-emerald-400" />}
            />

            <StatCard
              title="Dias Restantes"
              value={dashboardData.activeInvestments[0]?.days_remaining.toString() || "0"}
              description={`De ${dashboardData.activeInvestments[0]?.days_total || 100} dias`}
              icon={<Clock className="h-5 w-5 text-emerald-400" />}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-medium text-white mb-4">Histórico de Ganhos</h3>
        <div className="h-64 w-full">
          <div className="flex h-full items-end gap-2">
            {dashboardData.recentEarnings.slice(0, 30).map((earning, i) => {
              const height = Math.min(100, (Number(earning.amount) / (dashboardData.totalInvested * 0.045)) * 100)
              return (
                <div
                  key={i}
                  className="bg-gradient-to-t from-emerald-600 to-cyan-600 rounded-t-sm w-full"
                  style={{ height: `${height}%` }}
                >
                  <div className="w-full h-full hover:bg-white/10 transition-colors"></div>
                </div>
              )
            })}

            {/* Preencher com barras vazias se não houver 30 ganhos */}
            {Array.from({ length: Math.max(0, 30 - dashboardData.recentEarnings.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="bg-slate-800 rounded-t-sm w-full" style={{ height: "5%" }}></div>
            ))}
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-slate-400">
          <span>1 Mai</span>
          <span>15 Mai</span>
          <span>30 Mai</span>
        </div>
      </div>

      {/* Amazon Mining Logo with Servers - New Image */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <div className="relative w-full bg-slate-800 rounded-lg overflow-hidden">
            <img
              src="/images/amazon-mining-logo-servers.jpeg"
              alt="Amazon Mining - Infraestrutura de Servidores"
              className="w-full h-auto hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-white mb-2">Infraestrutura de Ponta</h3>
            <p className="text-slate-300">
              Nossa tecnologia de mineração utiliza servidores de última geração, garantindo máxima eficiência e
              rentabilidade para todos os nossos investidores.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
  additionalContent?: React.ReactNode
}

function StatCard({ title, value, description, icon, additionalContent }: StatCardProps) {
  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-white">{value}</div>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
        {additionalContent}
      </CardContent>
    </Card>
  )
}
