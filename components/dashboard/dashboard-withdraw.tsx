"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowRight, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function DashboardWithdraw() {
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const availableBalance = 1234.56
  const fee = amount ? Number.parseFloat(amount) * 0.06 : 0
  const finalAmount = amount ? Number.parseFloat(amount) - fee : 0

  const handleWithdraw = () => {
    if (!amount || Number.parseFloat(amount) < 10) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAmount("")
      // Aqui você adicionaria a lógica para processar o saque
    }, 1500)
  }

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Saque</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white">Saldo Disponível</span>
            </div>
            <span className="text-lg font-bold text-white">${availableBalance.toFixed(2)}</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="amount">Valor do Saque</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-slate-400" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700">
                      <p>Valor mínimo: $10</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-8 bg-slate-800 border-slate-700"
                />
              </div>
            </div>

            <div className="bg-slate-800 rounded-md p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Taxa (6%)</span>
                <span className="text-white">${fee.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Você receberá</span>
                <span className="text-white">${finalAmount.toFixed(2)}</span>
              </div>
            </div>

            <Button
              onClick={handleWithdraw}
              disabled={isLoading || !amount || Number.parseFloat(amount) < 10}
              className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
            >
              {isLoading ? (
                "Processando..."
              ) : (
                <span className="flex items-center gap-2">
                  Sacar Agora <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-white mb-3">Regras de Saque</h4>
          <ul className="space-y-2 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
              <span>Taxa de 6% sobre o valor do saque</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
              <span>Valor mínimo de saque: $10</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
              <span>Saques disponíveis todos os dias</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
              <span>Processamento em até 24 horas</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
