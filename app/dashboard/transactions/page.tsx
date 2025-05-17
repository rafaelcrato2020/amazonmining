"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, ArrowDownCircle, ArrowUpCircle, Users, Calendar, Search, Filter } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function TransactionsPage() {
  const { isOpen } = useSidebar()
  const [dateFilter, setDateFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Dados simulados de transações
  /*
  const depositTransactions = [
    {
      id: "dep-001",
      type: "deposit",
      amount: 500,
      date: "14 Mai 2025, 10:25",
      status: "completed",
      network: "BEP20",
      txHash: "0x8f7d...e3a2",
    },
    {
      id: "dep-002",
      type: "deposit",
      amount: 1000,
      date: "05 Mai 2025, 14:30",
      status: "completed",
      network: "BEP20",
      txHash: "0x7a2c...b1f5",
    },
    {
      id: "dep-003",
      type: "deposit",
      amount: 250,
      date: "28 Abr 2025, 09:15",
      status: "completed",
      network: "BEP20",
      txHash: "0x3e9f...c4d7",
    },
  ]

  const withdrawTransactions = [
    {
      id: "wit-001",
      type: "withdraw",
      amount: 150,
      date: "10 Mai 2025, 14:32",
      status: "completed",
      network: "BEP20",
      txHash: "0x6d2e...9f3a",
      fee: 9,
    },
    {
      id: "wit-002",
      type: "withdraw",
      amount: 320,
      date: "28 Abr 2025, 09:15",
      status: "completed",
      network: "BEP20",
      txHash: "0x5b1c...a7d8",
      fee: 19.2,
    },
    {
      id: "wit-003",
      type: "withdraw",
      amount: 75,
      date: "15 Abr 2025, 16:45",
      status: "completed",
      network: "BEP20",
      txHash: "0x2f8e...b6c9",
      fee: 4.5,
    },
  ]

  const rewardsTransactions = [
    {
      id: "rew-001",
      type: "reward",
      amount: 45.5,
      date: "14 Mai 2025, 00:00",
      status: "completed",
      source: "João Silva (Nível 1)",
      plan: "V1",
      rate: "10%",
    },
    {
      id: "rew-002",
      type: "reward",
      amount: 22.75,
      date: "13 Mai 2025, 00:00",
      status: "completed",
      source: "Ana Costa (Nível 2)",
      plan: "V1",
      rate: "5%",
    },
    {
      id: "rew-003",
      type: "reward",
      amount: 11.38,
      date: "12 Mai 2025, 00:00",
      status: "completed",
      source: "Pedro Santos (Nível 3)",
      plan: "V1",
      rate: "5%",
    },
    {
      id: "rew-004",
      type: "reward",
      amount: 30.25,
      date: "11 Mai 2025, 00:00",
      status: "completed",
      source: "Maria Oliveira (Nível 1)",
      plan: "V1",
      rate: "10%",
    },
  ]

  const earningsTransactions = [
    {
      id: "earn-001",
      type: "earning",
      amount: 45,
      date: "14 Mai 2025, 00:00",
      status: "completed",
      rate: "4.5%",
      investment: 1000,
    },
    {
      id: "earn-002",
      type: "earning",
      amount: 45,
      date: "13 Mai 2025, 00:00",
      status: "completed",
      rate: "4.5%",
      investment: 1000,
    },
    {
      id: "earn-003",
      type: "earning",
      amount: 45,
      date: "12 Mai 2025, 00:00",
      status: "completed",
      rate: "4.5%",
      investment: 1000,
    },
    {
      id: "earn-004",
      type: "earning",
      amount: 45,
      date: "11 Mai 2025, 00:00",
      status: "completed",
      rate: "4.5%",
      investment: 1000,
    },
    {
      id: "earn-005",
      type: "earning",
      amount: 45,
      date: "10 Mai 2025, 00:00",
      status: "completed",
      rate: "4.5%",
      investment: 1000,
    },
  ]
  */

  // Função para filtrar transações por data
  const filterTransactionsByDate = (transactions: any[]) => {
    if (dateFilter === "all") return transactions

    const now = new Date()
    const daysAgo = (days: number) => {
      const date = new Date(now)
      date.setDate(date.getDate() - days)
      return date
    }

    const dateFilters: Record<string, Date> = {
      "7days": daysAgo(7),
      "30days": daysAgo(30),
      "90days": daysAgo(90),
    }

    return transactions.filter((transaction) => {
      const transactionDate = new Date(
        transaction.date.replace(/(\d+)\s+(\w+)\s+(\d+),\s+(\d+):(\d+)/, "$2 $1, $3 $4:$5"),
      )
      return transactionDate >= dateFilters[dateFilter]
    })
  }

  // Função para filtrar transações por busca
  const filterTransactionsBySearch = (transactions: any[]) => {
    if (!searchQuery) return transactions

    const query = searchQuery.toLowerCase()
    return transactions.filter((transaction) => {
      return (
        transaction.id.toLowerCase().includes(query) ||
        transaction.date.toLowerCase().includes(query) ||
        (transaction.txHash && transaction.txHash.toLowerCase().includes(query)) ||
        (transaction.source && transaction.source.toLowerCase().includes(query))
      )
    })
  }

  // Aplicar filtros
  const filteredDeposits = filterTransactionsBySearch(filterTransactionsByDate([]))
  const filteredWithdraws = filterTransactionsBySearch(filterTransactionsByDate([]))
  const filteredRewards = filterTransactionsBySearch(filterTransactionsByDate([]))
  const filteredEarnings = filterTransactionsBySearch(filterTransactionsByDate([]))

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar />
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-20")}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Extrato de Transações</h1>
            <p className="text-slate-400">
              Visualize seu histórico completo de transações, depósitos, saques e recompensas.
            </p>
          </div>

          {/* Filtros */}
          <Card className="bg-slate-900 border-slate-800 mb-6">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Buscar</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="search"
                      placeholder="ID, data ou hash da transação..."
                      className="pl-9 bg-slate-800 border-slate-700"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date-filter">Período</Label>
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger id="date-filter" className="bg-slate-800 border-slate-700">
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="7days">Últimos 7 dias</SelectItem>
                      <SelectItem value="30days">Últimos 30 dias</SelectItem>
                      <SelectItem value="90days">Últimos 90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white w-full"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Limpar Filtros
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Abas de Transações */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-800">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="deposits">Depósitos</TabsTrigger>
              <TabsTrigger value="withdrawals">Saques</TabsTrigger>
              <TabsTrigger value="rewards">Comissões</TabsTrigger>
              <TabsTrigger value="earnings">Rendimentos</TabsTrigger>
            </TabsList>

            {/* Todas as Transações */}
            <TabsContent value="all" className="mt-6">
              <div className="space-y-6">
                {/* Resumo */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <ArrowDownCircle className="h-5 w-5 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total Depositado</p>
                        <p className="text-xl font-bold text-white">$0.00</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                        <ArrowUpCircle className="h-5 w-5 text-red-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total Sacado</p>
                        <p className="text-xl font-bold text-white">$0.00</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total Comissões</p>
                        <p className="text-xl font-bold text-white">$0.00</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-400">Total Rendimentos</p>
                        <p className="text-xl font-bold text-white">$0.00</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de Transações Recentes */}
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Transações Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Depósitos */}
                      {filteredDeposits.slice(0, 2).map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <ArrowDownCircle className="h-4 w-4 text-emerald-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Depósito</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-emerald-400 font-medium">+$0.00</p>
                              <p className="text-xs text-slate-400">{transaction.network}</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <span>ID: {transaction.id}</span>
                            <span className="px-1">•</span>
                            <span>Hash: {transaction.txHash}</span>
                          </div>
                        </div>
                      ))}

                      {/* Saques */}
                      {filteredWithdraws.slice(0, 2).map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                <ArrowUpCircle className="h-4 w-4 text-red-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Saque</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-red-400 font-medium">-$0.00</p>
                              <p className="text-xs text-slate-400">Taxa: $0.00</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <span>ID: {transaction.id}</span>
                            <span className="px-1">•</span>
                            <span>Hash: {transaction.txHash}</span>
                          </div>
                        </div>
                      ))}

                      {/* Comissões */}
                      {filteredRewards.slice(0, 2).map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Users className="h-4 w-4 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Comissão</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-blue-400 font-medium">+$0.00</p>
                              <p className="text-xs text-slate-400">
                                Plano {transaction.plan} • {transaction.rate}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            <span>Fonte: {transaction.source}</span>
                          </div>
                        </div>
                      ))}

                      {/* Rendimentos */}
                      {filteredEarnings.slice(0, 2).map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-amber-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Rendimento</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-amber-400 font-medium">+$0.00</p>
                              <p className="text-xs text-slate-400">Taxa: {transaction.rate}</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            <span>Investimento: $0.00</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Depósitos */}
            <TabsContent value="deposits" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Histórico de Depósitos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDeposits.length > 0 ? (
                      filteredDeposits.map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <ArrowDownCircle className="h-4 w-4 text-emerald-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Depósito</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-emerald-400 font-medium">+$0.00</p>
                              <p className="text-xs text-slate-400">{transaction.network}</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <span>ID: {transaction.id}</span>
                            <span className="px-1">•</span>
                            <span>Hash: {transaction.txHash}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <ArrowDownCircle className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">Nenhum depósito encontrado</p>
                        <p className="text-slate-500 text-sm mt-1">Faça seu primeiro depósito para começar a minerar</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saques */}
            <TabsContent value="withdrawals" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Histórico de Saques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredWithdraws.length > 0 ? (
                      filteredWithdraws.map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                                <ArrowUpCircle className="h-4 w-4 text-red-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Saque</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-red-400 font-medium">-$0.00</p>
                              <p className="text-xs text-slate-400">Taxa: $0.00</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500 flex items-center gap-1">
                            <span>ID: {transaction.id}</span>
                            <span className="px-1">•</span>
                            <span>Hash: {transaction.txHash}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <ArrowUpCircle className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">Nenhum saque encontrado</p>
                        <p className="text-slate-500 text-sm mt-1">Seus saques aparecerão aqui</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Comissões */}
            <TabsContent value="rewards" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Comissões de Indicação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredRewards.length > 0 ? (
                      filteredRewards.map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Users className="h-4 w-4 text-blue-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Comissão</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-blue-400 font-medium">+$0.00</p>
                              <p className="text-xs text-slate-400">
                                Plano {transaction.plan} • {transaction.rate}
                              </p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            <span>Fonte: {transaction.source}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Users className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">Nenhuma comissão encontrada</p>
                        <p className="text-slate-500 text-sm mt-1">Indique amigos para ganhar comissões</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rendimentos */}
            <TabsContent value="earnings" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Rendimentos Diários</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEarnings.length > 0 ? (
                      filteredEarnings.map((transaction) => (
                        <div key={transaction.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 text-amber-400" />
                              </div>
                              <div>
                                <p className="text-white font-medium">Rendimento</p>
                                <p className="text-xs text-slate-400">{transaction.date}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-amber-400 font-medium">+$0.00</p>
                              <p className="text-xs text-slate-400">Taxa: {transaction.rate}</p>
                            </div>
                          </div>
                          <div className="text-xs text-slate-500">
                            <span>Investimento: $0.00</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                        <p className="text-slate-400">Nenhum rendimento encontrado</p>
                        <p className="text-slate-500 text-sm mt-1">Faça um depósito para começar a ganhar</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
