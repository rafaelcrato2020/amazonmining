"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Percent } from "lucide-react"

export function RewardsSection() {
  const rewardPlans = [
    {
      name: "V1",
      levels: 3,
      rates: [10, 5, 5],
      requirement: "Sem requisito mínimo",
      color: "from-emerald-600 to-cyan-600",
    },
    {
      name: "V2",
      levels: 4,
      rates: [10, 5, 5, 5],
      requirement: "5 indicados ativos",
      color: "from-blue-600 to-indigo-600",
    },
    {
      name: "V3",
      levels: 5,
      rates: [10, 5, 5, 5, 5],
      requirement: "10 cadastros ativos",
      color: "from-purple-600 to-pink-600",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-emerald-500/50 text-emerald-400">
            Programa de Recompensas
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-300">
            Ganhe recompensas com suas indicações
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Como divulgador da Amazon Mining, você pode ganhar recompensas através das suas indicações com nosso
            programa de múltiplos níveis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rewardPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/80 border-slate-800 overflow-hidden">
                <div className={`h-2 w-full bg-gradient-to-r ${plan.color}`}></div>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{plan.requirement}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-emerald-400" />
                      <span className="text-white font-medium">Níveis de recompensa</span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 rounded-full ${
                            i < plan.levels ? `bg-gradient-to-r ${plan.color}` : "bg-slate-800"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Percent className="w-5 h-5 text-emerald-400" />
                      <span className="text-white font-medium">Taxas por nível</span>
                    </div>
                    <div className="space-y-2">
                      {plan.rates.map((rate, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <span className="text-slate-300">Nível {i + 1}</span>
                          <span className="font-medium text-white">{rate}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
