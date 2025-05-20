"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface TelegramBannerProps {
  className?: string
  telegramLink?: string
}

export function TelegramBanner({ className = "", telegramLink = "https://t.me/amazonmining" }: TelegramBannerProps) {
  const iconRef = useRef<HTMLDivElement>(null)

  // Efeito de flutuação
  useEffect(() => {
    if (!iconRef.current) return

    let animationFrameId: number
    const startTime = Date.now()

    const animate = () => {
      const currentTime = Date.now()
      const elapsed = (currentTime - startTime) / 1000

      // Movimento suave de flutuação
      const translateY = Math.sin(elapsed) * 10
      const rotate = Math.sin(elapsed / 2) * 5

      if (iconRef.current) {
        iconRef.current.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className={`bg-gradient-to-r from-blue-600 to-blue-400 py-4 px-6 ${className}`}>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div ref={iconRef} className="relative w-16 h-16 md:w-20 md:h-20 transition-transform duration-300">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download.jpg-ywIP30GCApVL5V3f0TDefZz13HGcUL.jpeg"
              alt="Telegram"
              width={80}
              height={80}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl">PRÉ-LANÇAMENTO</h3>
            <p className="text-white/90 text-sm md:text-base">
              A revolução começa ao participar do canal do grande pré-lançamento
            </p>
          </div>
        </div>
        <Link href={telegramLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-6 py-2 rounded-full shadow-lg">
            Participar Agora
          </Button>
        </Link>
      </div>
    </div>
  )
}
