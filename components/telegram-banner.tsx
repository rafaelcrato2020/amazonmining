"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function TelegramBanner() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Efeito de flutuação suave
  useEffect(() => {
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01

      // Movimento suave usando seno e cosseno
      const newX = Math.sin(time) * 5
      const newY = Math.cos(time * 0.8) * 5

      setPosition({ x: newX, y: newY })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="bg-gradient-to-r from-blue-900/80 to-cyan-900/80 backdrop-blur-sm py-4 px-6 rounded-lg shadow-lg mb-8 border border-blue-500/20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div
          className="relative"
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download.jpg-ywIP30GCApVL5V3f0TDefZz13HGcUL.jpeg"
            alt="Telegram"
            width={80}
            height={80}
            className="rounded-xl"
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
            Novo
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            A revolução começa ao participar do canal do grande pré-lançamento
          </h3>
          <p className="text-blue-100 text-sm md:text-base">
            Junte-se ao nosso canal oficial do Telegram para receber atualizações exclusivas e ser o primeiro a saber
            das novidades da Amazon Mining.
          </p>
        </div>

        <Link href="https://t.me/amazonmining" target="_blank" rel="noopener noreferrer">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
            Participar Agora
          </Button>
        </Link>
      </div>
    </div>
  )
}
