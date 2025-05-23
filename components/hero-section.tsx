"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AuthModal } from "@/components/auth-modal"
import { FloatingLogo } from "./floating-logo"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-4xl mx-auto"
      >
        {/* Logo menor */}
        <div className="mb-8">
          <FloatingLogo size="small" />
        </div>

        <div className="inline-block mb-4 px-4 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="text-emerald-400 font-medium">Mineração de criptomoedas simplificada</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-cyan-300">
          Transforme seu investimento em criptomoedas com a Amazon Mining
        </h1>
        <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Especialistas em mineração de criptomoedas, tanto em rigs quanto em nuvem, proporcionando maiores resultados e
          rentabilidade.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AuthModal type="register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border-0"
            >
              Comece agora
            </Button>
          </AuthModal>
          <Button
            size="lg"
            variant="outline"
            className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
          >
            Saiba mais
          </Button>
          <a
            href="https://t.me/amazonmining"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#0088cc] hover:bg-[#0099dd] text-white font-medium rounded-lg transition-colors"
          >
            <div className="w-6 h-6 relative">
              <Image
                src="/images/telegram-icon.jpeg"
                alt="Telegram"
                width={24}
                height={24}
                className="w-full h-full object-contain rounded"
              />
            </div>
            Canal do Telegram
          </a>
        </div>

        {/* Logo da Amazon Mining com servidores */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 max-w-lg mx-auto"
        >
          <div className="rounded-xl overflow-hidden shadow-2xl shadow-cyan-500/10">
            <img
              src="/images/amazon-mining-logo-servers.jpeg"
              alt="Amazon Mining - Infraestrutura de mineração"
              className="w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Card de rentabilidade */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-16 relative w-full max-w-4xl"
      >
        <div className="bg-black/80 backdrop-blur-md border border-emerald-500/20 rounded-xl p-4 w-full flex justify-between">
          <div className="text-center flex-1">
            <p className="text-emerald-400 text-3xl font-bold">4.5%</p>
            <p className="text-slate-400 text-sm">Rentabilidade fixa</p>
          </div>
          <div className="h-full w-px bg-emerald-500/20"></div>
          <div className="text-center flex-1">
            <p className="text-emerald-400 text-3xl font-bold">100</p>
            <p className="text-slate-400 text-sm">Dias de contrato</p>
          </div>
          <div className="h-full w-px bg-emerald-500/20"></div>
          <div className="text-center flex-1">
            <p className="text-emerald-400 text-3xl font-bold">6</p>
            <p className="text-slate-400 text-sm">Dias de pagamento</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
