"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Gift, Gamepad2, Smartphone, Bike, Plane } from "lucide-react"

export function CareerSection() {
  const careerLevels = [
    {
      value: 500,
      icon: <Gift className="w-6 h-6 text-emerald-400" />,
      title: "Kit Mineradora",
      description: "Kit com mineradora portátil, camisa, boné e adesivo",
    },
    {
      value: 1000,
      icon: <Gamepad2 className="w-6 h-6 text-emerald-400" />,
      title: "PS5",
      description: "Console PlayStation 5",
    },
    {
      value: 2000,
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      title: "iPhone 16",
      description: "Smartphone Apple iPhone 16",
    },
    {
      value: 3000,
      icon: <Bike className="w-6 h-6 text-emerald-400" />,
      title: "Scooter",
      description: "Scooter elétrica",
    },
    {
      value: 5000,
      icon: <Plane className="w-6 h-6 text-emerald-400" />,
      title: "Viagem + Setup",
      description:
        "Viagem para conhecer nossa operação no Brasil e no Paraguai, incluindo um setup para minerar no valor de $5000",
    },
  ]

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1 border-emerald-500/50 text-emerald-400">
            Plano de Carreira
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-300">
            Ganhos acumulados por indicações diretas
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Quanto mais você indicar, maiores serão suas recompensas. Conheça nosso plano de carreira exclusivo para
            divulgadores.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img src="/images/mining-farm.jpeg" alt="Fazenda de mineração da Amazon Mining" className="w-full h-auto" />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <p className="text-white font-bold text-xl">Nossa infraestrutura</p>
              <p className="text-slate-300">
                Conheça pessoalmente nossas operações no Brasil e no Paraguai ao atingir $5000 em indicações
              </p>
            </div>
          </motion.div>

          <div className="space-y-6">
            {careerLevels.slice(0, 3).map((level, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900/80 border-slate-800 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="bg-slate-800 p-6 flex items-center justify-center md:w-48">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-6 h-6 text-emerald-400" />
                          <span className="text-2xl font-bold text-white">${level.value}</span>
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex items-center">
                        <div className="mr-6">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            {level.icon}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-1">{level.title}</h3>
                          <p className="text-slate-300">{level.description}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {careerLevels.slice(3).map((level, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-900/80 border-slate-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="bg-slate-800 p-6 flex items-center justify-center md:w-48">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-6 h-6 text-emerald-400" />
                        <span className="text-2xl font-bold text-white">${level.value}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex items-center">
                      <div className="mr-6">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
                          {level.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{level.title}</h3>
                        <p className="text-slate-300">{level.description}</p>
                      </div>
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
