"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

export function ProfitCalculator() {
  const [investmentAmount, setInvestmentAmount] = useState(1000)
  const [days, setDays] = useState(100)
  const [reinvestPercentage, setReinvestPercentage] = useState(0)
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Constantes
  const DAILY_RATE = 0.045 // 4.5% ao dia
  const WITHDRAWAL_FEE = 0.06 // 6% taxa de saque

  // Cálculos
  const calculateDailyProfit = (principal: number) => principal * DAILY_RATE

  const calculateResults = () => {
    let principal = investmentAmount
    let totalProfit = 0
    let totalWithdrawn = 0
    const dailyResults = []

    for (let day = 1; day <= days; day++) {
      const dailyProfit = calculateDailyProfit(principal)
      const reinvestAmount = dailyProfit * (reinvestPercentage / 100)
      const withdrawAmount = dailyProfit - reinvestAmount

      // Atualizar principal com reinvestimento
      principal += reinvestAmount

      // Atualizar lucro total e saque total
      totalProfit += dailyProfit
      totalWithdrawn += withdrawAmount

      // Armazenar resultados diários para gráfico
      dailyResults.push({
        day,
        principal,
        dailyProfit,
        reinvestAmount,
        withdrawAmount,
        totalProfit,
        totalWithdrawn,
      })
    }

    // Calcular valor final após taxas
    const netWithdrawn = totalWithdrawn * (1 - WITHDRAWAL_FEE)

    return {
      finalPrincipal: principal,
      totalProfit,
      totalWithdrawn,
      netWithdrawn,
      dailyResults,
      roi: (totalProfit / investmentAmount) * 100,
    }
  }

  const results = calculateResults()

  // Dados para o gráfico simplificado
  const chartData = results.dailyResults.filter(
    (_, index) =>
      index === 0 ||
      index === Math.floor(days / 4) ||
      index === Math.floor(days / 2) ||
      index === Math.floor((days * 3) / 4) ||
      index === days - 1,
  )

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold text-white">Calculadora de Rentabilidade</CardTitle>
        <Calculator className="h-5 w-5 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800">
            <TabsTrigger value="calculator" className="data-[state=active]:bg-slate-700">
              Calculadora
            </TabsTrigger>
            <TabsTrigger value="chart" className="data-[state=active]:bg-slate-700">
              Projeção
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-4 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white">Valor do Investimento</label>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-slate-400">$</span>
                  <Input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="bg-slate-800 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white">Período (dias)</label>
                <div className="mt-1">
                  <Slider
                    value={[days]}
                    min={1}
                    max={365}
                    step={1}
                    onValueChange={(value) => setDays(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>1 dia</span>
                    <span>{days} dias</span>
                    <span>365 dias</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">% de Reinvestimento</label>
                  <span className="text-sm text-slate-400">{reinvestPercentage}%</span>
                </div>
                <div className="mt-1">
                  <Slider
                    value={[reinvestPercentage]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value) => setReinvestPercentage(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full border-slate-700 text-slate-400 hover:bg-slate-800"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                {showAdvanced ? "Ocultar Opções Avançadas" : "Mostrar Opções Avançadas"}
              </Button>

              {showAdvanced && (
                <div className="rounded-lg bg-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Taxa Diária</span>
                    <span className="text-sm text-white">{DAILY_RATE * 100}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Taxa de Saque</span>
                    <span className="text-sm text-white">{WITHDRAWAL_FEE * 100}%</span>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-lg bg-slate-800 p-4 space-y-4">
              <h3 className="text-lg font-medium text-white">Resultados</h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <div className="text-sm text-slate-400">Lucro Total</div>
                  <div className="text-2xl font-bold text-emerald-500">{formatCurrency(results.totalProfit)}</div>
                  <div className="text-xs text-slate-400">ROI: {results.roi.toFixed(2)}%</div>
                </div>

                <div>
                  <div className="text-sm text-slate-400">Valor Final</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(results.finalPrincipal)}</div>
                  <div className="text-xs text-slate-400">Após reinvestimento</div>
                </div>

                <div>
                  <div className="text-sm text-slate-400">Total Disponível para Saque</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(results.totalWithdrawn)}</div>
                </div>

                <div>
                  <div className="text-sm text-slate-400">Valor Líquido (após taxa)</div>
                  <div className="text-2xl font-bold text-white">{formatCurrency(results.netWithdrawn)}</div>
                  <div className="text-xs text-slate-400">Taxa de saque: {WITHDRAWAL_FEE * 100}%</div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chart" className="mt-4">
            <div className="rounded-lg bg-slate-800 p-4 space-y-4">
              <h3 className="text-lg font-medium text-white">Projeção de Crescimento</h3>

              <div className="h-64 w-full">
                <div className="flex h-full flex-col">
                  <div className="flex h-full items-end gap-2">
                    {chartData.map((data, index) => (
                      <div key={index} className="group relative flex h-full w-full flex-col justify-end">
                        <div
                          className="w-full bg-emerald-500/20 transition-all group-hover:bg-emerald-500/30"
                          style={{
                            height: `${(data.finalPrincipal / results.finalPrincipal) * 100}%`,
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 hidden -translate-x-1/2 rounded-md bg-slate-700 px-2 py-1 text-xs text-white group-hover:block">
                            {formatCurrency(data.finalPrincipal)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-slate-400">
                    {chartData.map((data, index) => (
                      <div key={index} className="text-center">
                        Dia {data.day}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Investimento Inicial</span>
                  <span className="text-white">{formatCurrency(investmentAmount)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Valor Final</span>
                  <span className="text-white">{formatCurrency(results.finalPrincipal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Crescimento</span>
                  <span className="text-emerald-500">
                    {((results.finalPrincipal / investmentAmount - 1) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-700/50 p-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span>
                    Com um investimento inicial de {formatCurrency(investmentAmount)} e {reinvestPercentage}% de
                    reinvestimento diário, você terá {formatCurrency(results.finalPrincipal)} após {days} dias.
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
