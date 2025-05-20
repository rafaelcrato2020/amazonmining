"use client"

import Image from "next/image"
import Link from "next/link"

export function ResidualBonusSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Bônus Residual
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ganhe uma porcentagem do rendimento dos seus indicados e aumente sua renda passiva com nosso programa de
            bônus residual.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Plano V1 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-700 mb-6 mx-auto">
              <span className="text-2xl font-bold text-emerald-400">V1</span>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-4">Plano Básico</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-slate-500 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
                <span className="text-slate-400">Sem bônus residual</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-slate-300">Comissões de indicação direta</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-slate-400 text-sm">Ideal para iniciantes</span>
            </div>
          </div>

          {/* Plano V2 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105">
            <div className="absolute top-0 right-0 bg-cyan-500 text-xs text-white px-3 py-1 rounded-bl-lg rounded-tr-lg font-medium">
              POPULAR
            </div>
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 mb-6 mx-auto">
              <span className="text-2xl font-bold text-white">V2</span>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-4">Plano Avançado</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-white">
                  <strong className="text-cyan-400">10%</strong> de bônus no primeiro nível
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-white">Comissões de indicação direta</span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-cyan-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-white">5 indicados ativos necessários</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-cyan-300 text-sm">Para investidores intermediários</span>
            </div>
          </div>

          {/* Plano V3 */}
          <div className="bg-slate-800 rounded-xl p-6 border border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 mb-6 mx-auto">
              <span className="text-2xl font-bold text-white">V3</span>
            </div>
            <h3 className="text-xl font-bold text-white text-center mb-4">Plano Premium</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-white">
                  <strong className="text-emerald-400">1%</strong> de bônus no primeiro nível
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-white">
                  <strong className="text-emerald-400">10%</strong> de bônus no segundo nível
                </span>
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-emerald-400 mr-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5"></path>
                </svg>
                <span className="text-white">10 indicados ativos necessários</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-emerald-300 text-sm">Para investidores experientes</span>
            </div>
          </div>
        </div>

        {/* Seção do Telegram */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row items-center p-8">
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              <div className="relative">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download.jpg-i5cETwhZLv9mH52dzKGStlpYQ0t7tN.jpeg"
                  alt="Telegram"
                  width={150}
                  height={150}
                  className="telegram-icon"
                />
                <style jsx global>{`
                  @keyframes float {
                    0% {
                      transform: translateY(0px);
                    }
                    50% {
                      transform: translateY(-10px);
                    }
                    100% {
                      transform: translateY(0px);
                    }
                  }
                  .telegram-icon {
                    animation: float 3s ease-in-out infinite;
                    border-radius: 20px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
                  }
                `}</style>
              </div>
            </div>
            <div className="md:w-2/3 text-white">
              <h3 className="text-2xl font-bold mb-4">Junte-se ao Nosso Canal no Telegram</h3>
              <p className="mb-6">
                Fique por dentro das últimas novidades, atualizações e promoções exclusivas. Nosso canal do Telegram é o
                lugar ideal para se conectar com outros investidores e receber informações em primeira mão.
              </p>
              <Link
                href="https://t.me/amazommining"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-colors px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Participar Agora
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m5 12 14 0"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
