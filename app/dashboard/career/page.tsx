"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DollarSign, Gift, Share2 } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function CareerPage() {
  const { isOpen } = useSidebar()

  // Dados do usuário (simulados)
  const userEarnings = 0

  const careerRewards = [
    {
      value: 500,
      title: "Kit Mineradora",
      description: "Kit com mineradora portátil, camisa, boné e adesivo",
      image: "/images/amazon-kit.jpeg",
      achieved: userEarnings >= 500,
    },
    {
      value: 1000,
      title: "PlayStation 5",
      description: "Console PlayStation 5 com controle",
      image: "/images/ps5.jpeg",
      achieved: userEarnings >= 1000,
    },
    {
      value: 2000,
      title: "iPhone 16",
      description: "Smartphone Apple iPhone 16",
      image: "/images/iphone16.jpeg",
      achieved: userEarnings >= 2000,
    },
    {
      value: 3000,
      title: "Scooter Elétrica",
      description: "Scooter elétrica para mobilidade urbana",
      image: "/images/scooter.webp",
      achieved: userEarnings >= 3000,
    },
    {
      value: 5000,
      title: "Viagem + Setup",
      description:
        "Viagem para conhecer nossa operação no Brasil e no Paraguai, incluindo um setup para minerar no valor de $5000",
      image: "/images/mining-farm.jpeg",
      achieved: userEarnings >= 5000,
    },
  ]

  const nextReward = careerRewards.find((reward) => !reward.achieved) || careerRewards[careerRewards.length - 1]
  const progress = (userEarnings / nextReward.value) * 100

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar />
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-20")}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Plano de Carreira</h1>
            <p className="text-slate-400">
              Ganhe recompensas exclusivas baseadas nos seus ganhos acumulados por indicações diretas.
            </p>
          </div>

          {/* Progresso do Plano de Carreira - Versão 13 */}
          <Card className="bg-slate-900 border-slate-800 mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Seu Progresso</CardTitle>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-emerald-400" />
                  <span className="text-xl font-bold text-white">${userEarnings}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-400">Próxima recompensa: {nextReward.title}</span>
                  <span className="text-sm text-slate-400">
                    ${userEarnings}/${nextReward.value}
                  </span>
                </div>
                <Progress
                  value={0}
                  className="h-2 bg-slate-800"
                  indicatorClassName="bg-gradient-to-r from-emerald-600 to-cyan-600"
                />

                <Button className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500">
                  <Share2 className="mr-2 h-4 w-4" />
                  Compartilhar Link de Indicação
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lista de Recompensas - Versão 13 (Simplificada) */}
          <div className="space-y-6">
            {careerRewards.map((reward, index) => (
              <Card key={index} className="bg-slate-900 border-slate-800 overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 h-48 md:h-auto bg-slate-800">
                    <Image src={reward.image || "/placeholder.svg"} alt={reward.title} fill className="object-cover" />
                    {reward.achieved && (
                      <Badge className="absolute top-2 right-2 bg-emerald-500 text-white">Conquistado</Badge>
                    )}
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{reward.title}</h3>
                      <div className="bg-slate-800 px-3 py-1 rounded-full">
                        <span className="text-emerald-400 font-bold">${reward.value}</span>
                      </div>
                    </div>

                    <p className="text-slate-400 mb-4">{reward.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Gift className="h-4 w-4 text-emerald-400 mr-1" />
                        <span className="text-sm text-slate-400">
                          {reward.achieved
                            ? "Disponível para resgate"
                            : `Faltam $${Math.max(0, reward.value - userEarnings)}`}
                        </span>
                      </div>

                      <Button
                        variant={reward.achieved ? "default" : "outline"}
                        className={
                          reward.achieved
                            ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                            : "border-slate-700 text-slate-400"
                        }
                        disabled={!reward.achieved}
                      >
                        {reward.achieved ? "Resgatar Prêmio" : "Bloqueado"}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
