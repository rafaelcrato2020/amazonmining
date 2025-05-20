"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

export function TelegramPreLaunchBanner() {
  const [position, setPosition] = useState({ y: 0, rotate: 0 })
  const [isVisible, setIsVisible] = useState(false)

  // Efeito de entrada com fade in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Efeito de flutuação suave
  useEffect(() => {
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01

      // Movimento suave usando seno
      const newY = Math.sin(time) * 8
      const newRotate = Math.sin(time * 0.5) * 3

      setPosition({ y: newY, rotate: newRotate })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 transition-opacity duration-700 ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{ maxWidth: "420px" }}
    >
      <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 rounded-2xl shadow-2xl overflow-hidden border border-blue-400/30">
        <div className="relative p-6">
          {/* Elemento decorativo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>

          <div className="flex items-start gap-4">
            {/* Ícone do Telegram com animação */}
            <div
              className="relative flex-shrink-0"
              style={{
                transform: `translateY(${position.y}px) rotate(${position.rotate}deg)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download.jpg-VzQcqrDJuOvEKUhaSVaIUVlVneVkUF.jpeg"
                alt="Telegram"
                width={80}
                height={80}
                className="rounded-xl shadow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">
                NOVO
              </div>
            </div>

            <div className="space-y-3">
              {/* Título com efeito de gradiente */}
              <h3 className="text-xl font-extrabold text-white">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                  PRÉ-LANÇAMENTO EXCLUSIVO
                </span>
              </h3>

              {/* Mensagem de pré-lançamento */}
              <p className="text-blue-50 text-sm leading-relaxed">
                Seja pioneiro na revolução da mineração de criptomoedas! Junte-se ao nosso canal oficial do Telegram e
                tenha acesso antecipado a ofertas exclusivas, atualizações em primeira mão e bônus especiais para
                membros iniciais.
              </p>

              {/* Botão de ação */}
              <Link
                href="https://t.me/amazommining"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 transition-colors px-5 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
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

          {/* Botão de fechar */}
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
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
          </button>
        </div>
      </div>
    </div>
  )
}
