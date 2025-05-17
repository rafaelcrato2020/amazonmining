"use client"

import { motion } from "framer-motion"
import { Server, Cloud, TrendingUp, Shield } from "lucide-react"

export function FeaturesSection() {
  const features = [
    {
      icon: <Server className="w-10 h-10 text-emerald-400" />,
      title: "Mineração em Rigs",
      description: "Hardware de última geração para maximizar seus ganhos com mineração de criptomoedas.",
    },
    {
      icon: <Cloud className="w-10 h-10 text-emerald-400" />,
      title: "Mineração em Nuvem",
      description: "Solução sem complicações para minerar sem precisar de equipamento físico.",
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-emerald-400" />,
      title: "Alta Rentabilidade",
      description: "Rentabilidade fixa de 4,5% até completar 100 dias, com pagamentos de segunda a sábado.",
    },
    {
      icon: <Shield className="w-10 h-10 text-emerald-400" />,
      title: "Segurança Garantida",
      description: "Sua mineração protegida por tecnologia de ponta e equipe especializada.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-300">
          Por que escolher a Amazon Mining?
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto">
          Nossa plataforma oferece soluções completas para mineração de criptomoedas, com tecnologia de ponta e
          rentabilidade garantida.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-900/50 backdrop-blur-sm border border-emerald-500/10 rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="bg-emerald-500/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative rounded-xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
            <img
              src="/images/technician.jpeg"
              alt="Técnico da Amazon Mining monitorando equipamentos"
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
              <p className="text-white font-medium text-lg">Monitoramento térmico avançado</p>
              <p className="text-slate-300 text-sm">Nossos técnicos garantem o funcionamento ideal dos equipamentos</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
