"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, MessageSquare, Mail, Phone, Send, Loader2, Check } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function SupportPage() {
  const { isOpen } = useSidebar()
  const [isLoading, setIsLoading] = useState(false)
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando o envio da mensagem
    setTimeout(() => {
      setIsLoading(false)
      setIsSent(true)
      setTimeout(() => setIsSent(false), 3000)
    }, 1500)
  }

  const faqItems = [
    {
      question: "Como funciona a mineração de criptomoedas?",
      answer:
        "A Amazon Mining utiliza equipamentos de última geração para minerar criptomoedas. Oferecemos tanto mineração em rigs físicos quanto em nuvem. Nossos especialistas monitoram o processo 24/7 para garantir a máxima eficiência e rentabilidade para nossos investidores.",
    },
    {
      question: "Qual é a rentabilidade dos investimentos?",
      answer:
        "Oferecemos uma rentabilidade fixa de 4,5% ao dia por um período de 100 dias. Os pagamentos são realizados de segunda a sábado, diretamente em sua conta na plataforma.",
    },
    {
      question: "Como funciona o programa de recompensas?",
      answer:
        "Nosso programa de recompensas possui três níveis (V1, V2 e V3) com diferentes taxas de comissão. No plano V1, você ganha em 3 níveis (10%, 5% e 5%). No V2, em 4 níveis (10%, 5%, 5% e 5%). E no V3, em 5 níveis (10%, 5%, 5%, 5% e 5%). Para desbloquear o V2, você precisa ter 5 indicados ativos, e para o V3, 10 cadastros ativos.",
    },
    {
      question: "Qual é o valor mínimo para depósito?",
      answer:
        "O valor mínimo para depósito é de $10 USDT. Aceitamos apenas depósitos na rede BEP20 (Binance Smart Chain).",
    },
    {
      question: "Como faço para sacar meus rendimentos?",
      answer:
        "Para sacar seus rendimentos, acesse a seção 'Saque' no painel. O valor mínimo para saque é de $10 USDT e há uma taxa de 6% sobre o valor do saque. Os saques são processados em até 24 horas.",
    },
    {
      question: "O que é o plano de carreira?",
      answer:
        "O plano de carreira oferece recompensas exclusivas baseadas nos seus ganhos acumulados por indicações diretas. Ao atingir $500, você recebe um kit com mineradora portátil. Com $1000, um PS5. Com $2000, um iPhone 16. Com $3000, uma Scooter. E com $5000, uma viagem para conhecer nossa operação no Brasil e no Paraguai, incluindo um setup para minerar no valor de $5000.",
    },
    {
      question: "Como funciona o reinvestimento?",
      answer:
        "O reinvestimento permite que você aplique seu saldo disponível em um novo ciclo de mineração. Não há taxas para reinvestimento e o processo é instantâneo. Você pode escolher reinvestir qualquer valor do seu saldo disponível.",
    },
    {
      question: "Posso ter mais de um investimento ativo?",
      answer:
        "Sim, você pode ter múltiplos investimentos ativos simultaneamente. Cada investimento terá seu próprio ciclo de 100 dias e rentabilidade independente.",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar />
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-20")}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Suporte</h1>
            <p className="text-slate-400">Tire suas dúvidas ou entre em contato com nossa equipe de suporte.</p>
          </div>

          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="faq">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contato
              </TabsTrigger>
              <TabsTrigger value="channels">
                <Mail className="mr-2 h-4 w-4" />
                Canais de Atendimento
              </TabsTrigger>
            </TabsList>

            {/* Aba de FAQ */}
            <TabsContent value="faq" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Perguntas Frequentes</CardTitle>
                  <CardDescription>
                    Encontre respostas para as dúvidas mais comuns sobre a Amazon Mining.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`} className="border-slate-800">
                        <AccordionTrigger className="text-white hover:text-emerald-400">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-400">{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Contato */}
            <TabsContent value="contact" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Fale Conosco</CardTitle>
                  <CardDescription>Envie sua mensagem e nossa equipe responderá em até 24 horas.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" placeholder="Seu nome" className="bg-slate-800 border-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          className="bg-slate-800 border-slate-700"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input id="subject" placeholder="Assunto da mensagem" className="bg-slate-800 border-slate-700" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        placeholder="Descreva sua dúvida ou problema em detalhes..."
                        className="bg-slate-800 border-slate-700 min-h-[150px]"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : isSent ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Mensagem enviada!
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Enviar Mensagem
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Aba de Canais de Atendimento */}
            <TabsContent value="channels" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Canais de Atendimento</CardTitle>
                    <CardDescription>Escolha a melhor forma de entrar em contato conosco.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Mail className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Email</h3>
                          <p className="text-slate-400 text-sm mb-2">Resposta em até 24 horas</p>
                          <a href="mailto:suporte@amazonmining.com" className="text-emerald-400 hover:underline">
                            suporte@amazonmining.com
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Chat Online</h3>
                          <p className="text-slate-400 text-sm mb-2">Disponível de segunda a sexta, das 9h às 18h</p>
                          <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500">
                            Iniciar Chat
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <Phone className="h-5 w-5 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Telefone</h3>
                          <p className="text-slate-400 text-sm mb-2">Atendimento de segunda a sexta, das 9h às 18h</p>
                          <a href="tel:+551199999999" className="text-emerald-400 hover:underline">
                            +55 11 9999-9999
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Horário de Atendimento</CardTitle>
                    <CardDescription>Nossos horários de disponibilidade para atendimento.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-slate-800 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Suporte por Email</h3>
                        <p className="text-slate-400 text-sm">24 horas por dia, 7 dias por semana</p>
                        <p className="text-slate-400 text-sm">Tempo de resposta: até 24 horas</p>
                      </div>

                      <div className="bg-slate-800 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Chat Online</h3>
                        <p className="text-slate-400 text-sm">Segunda a Sexta: 9h às 18h</p>
                        <p className="text-slate-400 text-sm">Sábado: 9h às 13h</p>
                        <p className="text-slate-400 text-sm">Domingo e Feriados: Fechado</p>
                      </div>

                      <div className="bg-slate-800 rounded-lg p-4">
                        <h3 className="text-white font-medium mb-2">Atendimento Telefônico</h3>
                        <p className="text-slate-400 text-sm">Segunda a Sexta: 9h às 18h</p>
                        <p className="text-slate-400 text-sm">Sábado, Domingo e Feriados: Fechado</p>
                      </div>
                    </div>

                    <div className="mt-6 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                      <h3 className="text-emerald-400 font-medium mb-2 flex items-center">
                        <HelpCircle className="mr-2 h-4 w-4" />
                        Precisa de ajuda urgente?
                      </h3>
                      <p className="text-slate-400 text-sm mb-3">
                        Para questões urgentes relacionadas a saques ou depósitos, utilize nosso chat online durante o
                        horário comercial.
                      </p>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500">
                        Suporte Prioritário
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
