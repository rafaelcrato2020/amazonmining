"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ProfitCalculator } from "@/components/dashboard/profit-calculator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, TrendingUp, PiggyBank } from "lucide-react"

export default function CalculatorPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Calculadora de Rentabilidade</h1>
          <p className="text-slate-400 mt-1">Simule seus ganhos e planeje seus investimentos</p>
        </div>

        <ProfitCalculator />

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Dicas de Investimento</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Reinvestimento</h3>
                  <p className="text-slate-400">
                    Reinvestir parte dos seus lucros diários pode aumentar significativamente seus ganhos a longo prazo
                    através do poder dos juros compostos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <PiggyBank className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Diversificação</h3>
                  <p className="text-slate-400">
                    Considere diversificar seus investimentos entre diferentes planos e estratégias para otimizar seus
                    retornos e minimizar riscos.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/10">
                  <Calculator className="h-5 w-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Planejamento</h3>
                  <p className="text-slate-400">
                    Use esta calculadora para planejar seus objetivos financeiros e criar uma estratégia de investimento
                    que se alinhe com suas metas de longo prazo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-white">Perguntas Frequentes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-white">Como é calculada a rentabilidade?</h3>
                <p className="text-slate-400 mt-1">
                  A rentabilidade é calculada com base na taxa diária fixa de 4,5% sobre o valor investido, com
                  pagamentos de segunda a sábado por até 100 dias.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white">O que é reinvestimento?</h3>
                <p className="text-slate-400 mt-1">
                  Reinvestimento é quando você utiliza parte dos seus lucros diários para aumentar seu capital
                  investido, potencializando seus ganhos futuros através de juros compostos.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white">Qual é a melhor estratégia?</h3>
                <p className="text-slate-400 mt-1">
                  A melhor estratégia depende dos seus objetivos financeiros. Para crescimento a longo prazo, um alto
                  percentual de reinvestimento pode ser ideal. Para renda passiva imediata, um baixo percentual de
                  reinvestimento é mais adequado.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
