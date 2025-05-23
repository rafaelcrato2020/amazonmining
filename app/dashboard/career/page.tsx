"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DollarSign, Gift, Share2 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { useState } from "react"

export default function CareerPage() {
  // Dados do usuário (simulados)
  const userEarnings = 0
  const [imageLoading, setImageLoading] = useState({
    "amazon-kit.jpeg": true,
    "ps5.jpeg": true,
    "iphone16.jpeg": true,
    "scooter.webp": true,
    "mining-farm.jpeg": true,
  })

  const handleImageLoad = (imageName: string) => {
    setImageLoading((prev) => ({
      ...prev,
      [imageName]: false,
    }))
  }

  const careerRewards = [
    {
      value: 500,
      title: "Kit Mineradora",
      description: "Kit com mineradora portátil, camisa, boné e adesivo",
      image: "/images/amazon-kit.jpeg",
      imageName: "amazon-kit.jpeg",
      achieved: userEarnings >= 500,
    },
    {
      value: 1000,
      title: "PlayStation 5",
      description: "Console PlayStation 5 com controle",
      image: "/images/ps5.jpeg",
      imageName: "ps5.jpeg",
      achieved: userEarnings >= 1000,
    },
    {
      value: 2000,
      title: "iPhone 16",
      description: "Smartphone Apple iPhone 16",
      image: "/images/iphone16.jpeg",
      imageName: "iphone16.jpeg",
      achieved: userEarnings >= 2000,
    },
    {
      value: 3000,
      title: "Scooter Elétrica",
      description: "Scooter elétrica para mobilidade urbana",
      image: "/images/scooter.webp",
      imageName: "scooter.webp",
      achieved: userEarnings >= 3000,
    },
    {
      value: 5000,
      title: "Viagem + Setup",
      description:
        "Viagem para conhecer nossa operação no Brasil e no Paraguai, incluindo um setup para minerar no valor de $5000",
      image: "/images/mining-farm.jpeg",
      imageName: "mining-farm.jpeg",
      achieved: userEarnings >= 5000,
    },
  ]

  const nextReward = careerRewards.find((reward) => !reward.achieved) || careerRewards[careerRewards.length - 1]
  const progress = (userEarnings / nextReward.value) * 100

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white mb-2">Plano de Carreira</h1>
          <p className="text-slate-400">
            Ganhe recompensas exclusivas baseadas nos seus ganhos acumulados por indicações diretas.
          </p>
        </div>

        {/* Progresso do Plano de Carreira */}
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

        {/* Lista de Recompensas - Versão Melhorada */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {careerRewards.map((reward, index) => (
            <Card key={index} className="bg-slate-900 border-slate-800 overflow-hidden flex flex-col h-full">
              <div className="relative pt-[56.25%] bg-slate-800 overflow-hidden">
                {imageLoading[reward.imageName] && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <Image
                  src={reward.image || "/placeholder.svg"}
                  alt={reward.title}
                  fill
                  className={`object-cover transition-opacity duration-300 ${imageLoading[reward.imageName] ? "opacity-0" : "opacity-100"}`}
                  onLoad={() => handleImageLoad(reward.imageName)}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 2}
                />
                {reward.achieved && (
                  <Badge className="absolute top-2 right-2 bg-emerald-500 text-white z-10">Conquistado</Badge>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold text-white">{reward.title}</h3>
                  <div className="bg-slate-800 px-3 py-1 rounded-full">
                    <span className="text-emerald-400 font-bold">${reward.value}</span>
                  </div>
                </div>

                <p className="text-slate-400 mb-4 flex-grow">{reward.description}</p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <Gift className="h-4 w-4 text-emerald-400 mr-1" />
                      <span className="text-sm text-slate-400">
                        {reward.achieved
                          ? "Disponível para resgate"
                          : `Faltam $${Math.max(0, reward.value - userEarnings)}`}
                      </span>
                    </div>
                  </div>

                  <Button
                    variant={reward.achieved ? "default" : "outline"}
                    className={`w-full ${
                      reward.achieved
                        ? "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                        : "border-slate-700 text-slate-400"
                    }`}
                    disabled={!reward.achieved}
                  >
                    {reward.achieved ? "Resgatar Prêmio" : "Bloqueado"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
