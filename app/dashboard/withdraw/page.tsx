"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Wallet, ArrowRight, Info, Copy, Check } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"

export default function WithdrawPage() {
  const { isOpen } = useSidebar()
  const [amount, setAmount] = useState("")
  const [usdtAddress, setUsdtAddress] = useState("")
  const [network] = useState("bep20")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const availableBalance = 1234.56
  const fee = amount ? Number.parseFloat(amount) * 0.06 : 0
  const finalAmount = amount ? Number.parseFloat(amount) - fee : 0
  const minWithdraw = 10

  const handleWithdraw = () => {
    if (!amount || Number.parseFloat(amount) < minWithdraw || !usdtAddress) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setAmount("")
      setUsdtAddress("")
      // Aqui você adicionaria a lógica para processar o saque
      alert("Saque solicitado com sucesso! Seu pedido será processado em até 24 horas.")
    }, 1500)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar />
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-20")}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Saque</h1>
            <p className="text-slate-400">Solicite o saque dos seus ganhos para sua carteira USDT.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Card de Saque */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-white">Solicitar Saque</CardTitle>
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
                              <p>Valor mínimo: ${minWithdraw}</p>
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

                    <div className="space-y-2">
                      <Label htmlFor="network">Rede</Label>
                      <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-md border border-slate-700">
                        <Badge className="bg-amber-500">BEP20</Badge>
                        <span className="text-white">Binance Smart Chain (BSC)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="usdt-address">Endereço USDT ({network.toUpperCase()})</Label>
                      <Input
                        id="usdt-address"
                        value={usdtAddress}
                        onChange={(e) => setUsdtAddress(e.target.value)}
                        placeholder="Cole seu endereço USDT aqui"
                        className="bg-slate-800 border-slate-700"
                      />
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
                      disabled={isLoading || !amount || Number.parseFloat(amount) < minWithdraw || !usdtAddress}
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
              </CardContent>
            </Card>

            {/* Card de Informações */}
            <div className="space-y-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Regras de Saque</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
                      <span>Taxa de 6% sobre o valor do saque</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
                      <span>Valor mínimo de saque: ${minWithdraw}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
                      <span>Saques disponíveis todos os dias</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
                      <span>Processamento em até 24 horas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5"></div>
                      <span>Verifique cuidadosamente seu endereço USDT antes de solicitar o saque</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Histórico de Saques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">$150.00</p>
                          <p className="text-xs text-slate-400">10 Mai 2025, 14:32</p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Concluído</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-slate-400 truncate flex-1">TRC20: TSj...8dF2</p>
                        <button onClick={() => copyToClipboard("TSj8dF2")} className="text-slate-400 hover:text-white">
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-white font-medium">$320.00</p>
                          <p className="text-xs text-slate-400">28 Abr 2025, 09:15</p>
                        </div>
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Concluído</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-xs text-slate-400 truncate flex-1">TRC20: TRx...7yZ9</p>
                        <button onClick={() => copyToClipboard("TRx7yZ9")} className="text-slate-400 hover:text-white">
                          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      Ver Todos os Saques
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
