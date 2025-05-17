"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, ArrowRight, Info, Copy, Check, RefreshCw, Calculator, Download } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { MobileMenu } from "@/components/dashboard/mobile-menu"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { useSearchParams } from "next/navigation"

// Componentes e lógica existentes...

export default function DepositPage() {
  const { isVisible, isOpen } = useSidebar()
  const [amount, setAmount] = useState("")
  const [copied, setCopied] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("deposit")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["deposit", "reinvest", "calculator"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  // Calculadora de juros compostos
  const [calcAmount, setCalcAmount] = useState("1000")
  const [calcDays, setCalcDays] = useState(100)
  const [calcRate] = useState(4.5) // Taxa fixa de 4.5%

  // Reinvestimento
  const availableBalance = 1234.56
  const [reinvestAmount, setReinvestAmount] = useState(availableBalance.toString())
  const [reinvestPercentage, setReinvestPercentage] = useState(100)

  const walletAddress = "0xcf8b1e6A65d0B9C232BFd35226645cCd6C744F11"
  const minDeposit = 10
  const maxDeposit = 500000

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleConfirmDeposit = () => {
    if (!amount || Number.parseFloat(amount) < minDeposit || Number.parseFloat(amount) > maxDeposit) return
    setShowQRCode(true)
  }

  const handleReinvestPercentageChange = (value: number[]) => {
    const percentage = value[0]
    setReinvestPercentage(percentage)
    setReinvestAmount(((availableBalance * percentage) / 100).toFixed(2))
  }

  const handleReinvestAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setReinvestAmount(value)
    const amount = Number.parseFloat(value)
    if (!isNaN(amount) && amount >= 0 && amount <= availableBalance) {
      setReinvestPercentage(Math.round((amount / availableBalance) * 100))
    }
  }

  // Cálculo de juros compostos
  const calculateCompoundInterest = () => {
    const principal = Number.parseFloat(calcAmount)
    if (isNaN(principal)) return { total: 0, interest: 0, daily: 0, dailyValues: [] }

    const rate = calcRate / 100
    const days = calcDays
    const dailyInitial = principal * rate

    // Cálculo correto de juros compostos diários para qualquer valor inicial
    const dailyValues = []

    // Usando a fórmula de juros compostos: P * (1 + r)^n
    // Onde P é o principal, r é a taxa e n é o número de períodos
    const finalAmount = principal * Math.pow(1 + rate, days)

    // Calculando os valores diários
    for (let i = 0; i < days; i++) {
      // Valor no dia atual
      const currentValue = principal * Math.pow(1 + rate, i)
      // Valor no próximo dia
      const nextDayValue = principal * Math.pow(1 + rate, i + 1)
      // Juros ganhos neste dia
      const dailyInterest = nextDayValue - currentValue

      dailyValues.push({
        day: i + 1,
        value: currentValue,
        interest: dailyInterest,
      })
    }

    return {
      total: finalAmount,
      interest: finalAmount - principal,
      daily: dailyInitial,
      dailyValues: dailyValues,
    }
  }

  const compoundResults = calculateCompoundInterest()

  // Paginação para os resultados diários
  const totalPages = Math.ceil(compoundResults.dailyValues.length / itemsPerPage)
  const paginatedDailyValues = compoundResults.dailyValues.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  // Função para exportar dados para CSV
  const exportToCSV = () => {
    if (!compoundResults.dailyValues.length) return

    const headers = ["Dia", "Valor", "Rendimento Diário"]
    const csvContent = [
      headers.join(","),
      ...compoundResults.dailyValues.map((day) => `${day.day},${day.value.toFixed(2)},${day.interest.toFixed(2)}`),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `simulacao-investimento-${calcAmount}-${calcDays}dias.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Função para formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(value)
      .replace("US$", "$")
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardSidebar />

      <div className={cn("transition-all duration-300 ease-in-out", isVisible ? (isOpen ? "ml-64" : "ml-20") : "ml-0")}>
        <div className="md:hidden">
          <MobileMenu />
        </div>
        <div className="hidden md:block">
          <DashboardHeader />
        </div>
        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Depósito e Reinvestimento</h1>
            <p className="text-slate-400">Deposite USDT para começar a minerar ou reinvista seus ganhos.</p>
          </div>

          <Tabs defaultValue="deposit" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="deposit">Depósito</TabsTrigger>
              <TabsTrigger value="reinvest">Reinvestir</TabsTrigger>
              <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            </TabsList>

            {/* Tab de Depósito */}
            <TabsContent value="deposit" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Novo Depósito</CardTitle>
                    <CardDescription>Deposite USDT (BEP20) para começar a minerar criptomoedas.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="deposit-amount">Valor do Depósito</Label>
                          <div className="flex items-center gap-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-slate-400" />
                                </TooltipTrigger>
                                <TooltipContent className="bg-slate-800 border-slate-700">
                                  <p>
                                    Mínimo: ${minDeposit} | Máximo: ${maxDeposit.toLocaleString()}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                          <Input
                            id="deposit-amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="pl-8 bg-slate-800 border-slate-700"
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 px-1">
                          <span>Min: ${minDeposit}</span>
                          <span>Max: ${maxDeposit.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Rede</Label>
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-md border border-slate-700">
                          <Badge className="bg-amber-500">BEP20</Badge>
                          <span className="text-white">Binance Smart Chain (BSC)</span>
                        </div>
                      </div>

                      <div className="bg-slate-800 rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Rentabilidade diária</span>
                          <span className="text-white">4.5%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Duração do contrato</span>
                          <span className="text-white">100 dias</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Pagamentos</span>
                          <span className="text-white">Segunda a Sábado</span>
                        </div>
                      </div>

                      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
                        <Button
                          onClick={handleConfirmDeposit}
                          disabled={
                            !amount || Number.parseFloat(amount) < minDeposit || Number.parseFloat(amount) > maxDeposit
                          }
                          className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                        >
                          <span className="flex items-center gap-2">
                            Confirmar Depósito <ArrowRight className="h-4 w-4" />
                          </span>
                        </Button>

                        <DialogContent className="bg-slate-900 border-slate-800 w-[95vw] max-w-md mx-auto">
                          <DialogHeader>
                            <DialogTitle className="text-white">Depósito de ${amount} USDT</DialogTitle>
                            <DialogDescription>
                              Escaneie o QR code ou copie o endereço abaixo para realizar o depósito.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="flex flex-col items-center justify-center py-4">
                            <div className="bg-white p-4 rounded-lg mb-4 w-full max-w-[250px] mx-auto">
                              <div className="relative aspect-square w-full">
                                <Image
                                  src="/images/wallet-qrcode.jpeg"
                                  alt="QR Code da carteira"
                                  fill
                                  className="object-contain"
                                  sizes="(max-width: 768px) 100vw, 250px"
                                  priority
                                />
                              </div>
                            </div>

                            <div className="w-full">
                              <Label className="text-slate-400 text-sm">Endereço da Carteira (BEP20)</Label>
                              <div className="flex mt-1">
                                <Input
                                  readOnly
                                  value={walletAddress}
                                  className="bg-slate-800 border-slate-700 text-white text-xs"
                                />
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="ml-2 border-slate-700"
                                  onClick={() => copyToClipboard(walletAddress)}
                                >
                                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>

                            <div className="bg-amber-500/20 border border-amber-500/30 rounded-md p-3 mt-4 text-sm text-amber-300">
                              <p>
                                Importante: Envie apenas USDT na rede BEP20 (BSC). Outras redes não serão reconhecidas.
                              </p>
                            </div>
                          </div>

                          <DialogFooter>
                            <Button
                              variant="outline"
                              className="border-slate-700 text-slate-400"
                              onClick={() => setShowQRCode(false)}
                            >
                              Fechar
                            </Button>
                            <Button
                              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                              onClick={() => {
                                setShowQRCode(false)
                                setAmount("")
                                // Aqui você adicionaria a lógica para confirmar o pagamento
                              }}
                            >
                              Já realizei o pagamento
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white">Instruções de Depósito</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            Como fazer um depósito?
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <ol className="list-decimal pl-5 space-y-2">
                              <li>Insira o valor que deseja depositar (mínimo $10).</li>
                              <li>Clique em "Confirmar Depósito".</li>
                              <li>Escaneie o QR code ou copie o endereço da carteira.</li>
                              <li>Envie o valor exato em USDT na rede BEP20 (BSC).</li>
                              <li>Aguarde a confirmação do depósito (geralmente 5-10 minutos).</li>
                            </ol>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            Qual rede devo usar?
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <p>
                              Utilize <strong>apenas</strong> a rede BEP20 (Binance Smart Chain) para enviar USDT.
                              Depósitos em outras redes como ERC20 ou TRC20 não serão reconhecidos pelo sistema e podem
                              resultar em perda de fundos.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            Quanto tempo leva para confirmar?
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <p>
                              Os depósitos geralmente são confirmados em 5-10 minutos após a transação ser validada na
                              blockchain. Em períodos de congestionamento da rede, pode levar até 30 minutos.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-4" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            Posso cancelar um depósito?
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <p>
                              Não. Uma vez que a transação é enviada para a blockchain, ela não pode ser cancelada ou
                              revertida. Certifique-se de verificar todos os detalhes antes de enviar.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white">Depósitos Recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-white font-medium">$500.00</p>
                              <p className="text-xs text-slate-400">12 Mai 2025, 10:25</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              Confirmado
                            </Badge>
                          </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-white font-medium">$1,000.00</p>
                              <p className="text-xs text-slate-400">5 Mai 2025, 14:30</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                              Confirmado
                            </Badge>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        >
                          Ver Histórico Completo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tab de Reinvestimento */}
            <TabsContent value="reinvest" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Reinvestir Saldo</CardTitle>
                    <CardDescription>Reinvista seus ganhos para aumentar seus rendimentos.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-emerald-400" />
                          <span className="text-sm font-medium text-white">Saldo Disponível</span>
                        </div>
                        <span className="text-lg font-bold text-white">${availableBalance.toFixed(2)}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="reinvest-amount">Valor para Reinvestir</Label>
                          <span className="text-sm text-slate-400">{reinvestPercentage}%</span>
                        </div>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                          <Input
                            id="reinvest-amount"
                            type="number"
                            value={reinvestAmount}
                            onChange={handleReinvestAmountChange}
                            className="pl-8 bg-slate-800 border-slate-700"
                            min="0"
                            max={availableBalance}
                            step="0.01"
                          />
                        </div>
                        <Slider
                          value={[reinvestPercentage]}
                          min={0}
                          max={100}
                          step={1}
                          onValueChange={handleReinvestPercentageChange}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>0%</span>
                          <span>50%</span>
                          <span>100%</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-700 text-slate-400"
                          onClick={() => {
                            setReinvestPercentage(50)
                            setReinvestAmount((availableBalance * 0.5).toFixed(2))
                          }}
                        >
                          50%
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-700 text-slate-400"
                          onClick={() => {
                            setReinvestPercentage(75)
                            setReinvestAmount((availableBalance * 0.75).toFixed(2))
                          }}
                        >
                          75%
                        </Button>
                        <Button
                          variant="outline"
                          className="flex-1 border-slate-700 text-slate-400"
                          onClick={() => {
                            setReinvestPercentage(100)
                            setReinvestAmount(availableBalance.toFixed(2))
                          }}
                        >
                          100%
                        </Button>
                      </div>

                      <div className="bg-slate-800 rounded-md p-4 space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Rentabilidade diária</span>
                          <span className="text-white">4.5%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Duração do contrato</span>
                          <span className="text-white">100 dias</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Ganho estimado</span>
                          <span className="text-emerald-400">
                            ${(Number.parseFloat(reinvestAmount) * 4.5).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                        disabled={!reinvestAmount || Number.parseFloat(reinvestAmount) <= 0}
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Confirmar Reinvestimento
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white">Vantagens do Reinvestimento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-400 font-bold">1</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Crescimento exponencial</h4>
                            <p className="text-slate-400 text-sm">
                              Reinvestir seus ganhos permite que seu capital cresça exponencialmente através do poder
                              dos juros compostos.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-400 font-bold">2</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Sem taxas adicionais</h4>
                            <p className="text-slate-400 text-sm">
                              Reinvestimentos não possuem taxas, diferente dos saques que têm uma taxa de 6%.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald-400 font-bold">3</span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">Processamento instantâneo</h4>
                            <p className="text-slate-400 text-sm">
                              Reinvestimentos são processados instantaneamente, sem necessidade de esperar confirmações
                              na blockchain.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white">Histórico de Reinvestimentos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-white font-medium">$250.00</p>
                              <p className="text-xs text-slate-400">14 Mai 2025, 09:15</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Ativo</Badge>
                          </div>
                        </div>

                        <div className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <p className="text-white font-medium">$500.00</p>
                              <p className="text-xs text-slate-400">1 Mai 2025, 11:30</p>
                            </div>
                            <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Ativo</Badge>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        >
                          Ver Histórico Completo
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Tab da Calculadora */}
            <TabsContent value="calculator" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Calculadora de Juros Compostos</CardTitle>
                    <CardDescription>Calcule seus ganhos potenciais com juros compostos.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="calc-amount">Valor do Investimento</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                          <Input
                            id="calc-amount"
                            type="number"
                            value={calcAmount}
                            onChange={(e) => setCalcAmount(e.target.value)}
                            className="pl-8 bg-slate-800 border-slate-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="calc-days">Período (dias)</Label>
                          <span className="text-sm text-slate-400">{calcDays} dias</span>
                        </div>
                        <Slider
                          id="calc-days"
                          value={[calcDays]}
                          min={1}
                          max={100}
                          step={1}
                          onValueChange={(value) => setCalcDays(value[0])}
                          className="mt-2"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>1 dia</span>
                          <span>50 dias</span>
                          <span>100 dias</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Taxa de Rentabilidade</Label>
                        <div className="flex items-center gap-2 p-3 bg-slate-800 rounded-md border border-slate-700">
                          <span className="text-white font-medium">4.5% ao dia</span>
                          <Badge className="bg-emerald-500 ml-auto">Fixa</Badge>
                        </div>
                      </div>

                      <div className="bg-slate-800 rounded-md p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Investimento inicial</span>
                          <span className="text-white font-medium">
                            {formatCurrency(Number.parseFloat(calcAmount) || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Ganho diário inicial</span>
                          <span className="text-emerald-400 font-medium">{formatCurrency(compoundResults.daily)}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Juros acumulados</span>
                          <span className="text-emerald-400 font-medium">
                            {formatCurrency(compoundResults.interest)}
                          </span>
                        </div>
                        <div className="h-px bg-slate-700 my-1"></div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Total após {calcDays} dias</span>
                          <span className="text-white text-lg font-bold">{formatCurrency(compoundResults.total)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => setActiveTab("deposit")}
                          className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                        >
                          <Calculator className="mr-2 h-4 w-4" />
                          Fazer um Depósito
                        </Button>
                        <Button
                          onClick={exportToCSV}
                          variant="outline"
                          className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Exportar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white">Gráfico de Crescimento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 w-full">
                        <div className="flex h-full items-end gap-1">
                          {compoundResults.dailyValues &&
                            compoundResults.dailyValues.slice(0, 30).map((dayData, i) => {
                              const principal = Number.parseFloat(calcAmount) || 0
                              const height = principal > 0 ? (dayData.value / (principal * 2)) * 100 : 0
                              const displayDay = Math.ceil((i + 1) * (calcDays / Math.min(30, calcDays)))

                              return (
                                <div
                                  key={i}
                                  className="bg-gradient-to-t from-emerald-600 to-cyan-600 rounded-t-sm w-full relative group"
                                  style={{ height: `${Math.min(100, height)}%` }}
                                >
                                  <div className="w-full h-full hover:bg-white/10 transition-colors"></div>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                    Dia {displayDay}: {formatCurrency(dayData.value)}
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>Dia 1</span>
                        <span>Dia {Math.round(calcDays / 2)}</span>
                        <span>Dia {calcDays}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium text-white">Dicas de Investimento</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            O poder dos juros compostos
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <p>
                              Os juros compostos são considerados a "oitava maravilha do mundo". Ao reinvestir seus
                              ganhos, você não apenas ganha sobre o capital inicial, mas também sobre os juros
                              acumulados, criando um efeito exponencial ao longo do tempo.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            Estratégia de reinvestimento
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <p>
                              Uma estratégia eficaz é reinvestir 70-80% dos seus ganhos e sacar apenas 20-30%. Isso
                              permite que seu capital cresça consistentemente enquanto você ainda aproveita parte dos
                              lucros.
                            </p>
                          </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-3" className="border-slate-800">
                          <AccordionTrigger className="text-white hover:text-emerald-400">
                            Diversificação de investimentos
                          </AccordionTrigger>
                          <AccordionContent className="text-slate-400">
                            <p>
                              Considere fazer múltiplos depósitos em momentos diferentes, em vez de um único grande
                              depósito. Isso cria um efeito de "média de custo" e reduz o impacto da volatilidade do
                              mercado.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-900 border-slate-800">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-lg font-medium text-white">Exemplo de Crescimento</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-slate-700 text-slate-400 hover:bg-slate-800"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          Anterior
                        </Button>
                        <span className="text-xs text-slate-400">
                          {currentPage} / {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 border-slate-700 text-slate-400 hover:bg-slate-800"
                          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                          disabled={currentPage === totalPages}
                        >
                          Próxima
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-sm text-slate-400 mb-2">
                          Veja como ${Number.parseFloat(calcAmount).toFixed(2)} cresceria nos 100 dias com
                          reinvestimento diário:
                        </div>
                        <div className="max-h-64 overflow-y-auto pr-2 space-y-2">
                          {paginatedDailyValues.map((day, index) => {
                            const isSpecialDay = day.day === 25 || day.day === 50 || day.day === 75 || day.day === 100
                            const dayIndex = (currentPage - 1) * itemsPerPage + index

                            return (
                              <div
                                key={dayIndex}
                                className={`bg-slate-800/50 rounded-lg p-2 ${
                                  isSpecialDay ? "bg-emerald-900/30 border border-emerald-500/30" : ""
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`text-white ${isSpecialDay ? "font-medium" : ""}`}>
                                    Dia {day.day}
                                  </span>
                                  <span
                                    className={`font-medium ${
                                      isSpecialDay ? "text-emerald-300 text-lg" : "text-emerald-400"
                                    }`}
                                  >
                                    {formatCurrency(day.value)}
                                  </span>
                                </div>
                                <div className="text-xs text-slate-400 mt-1">
                                  +{formatCurrency(day.interest)} de rendimento (4.5%)
                                </div>
                                {day.day === 100 && (
                                  <div className="text-xs text-emerald-300 mt-1 font-medium">
                                    Valor final após 100 dias: {formatCurrency(compoundResults.total)}
                                  </div>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
