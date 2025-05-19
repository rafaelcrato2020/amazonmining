"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"

export function TelegramBanner({ telegramLink = "https://t.me/amazonmining" }) {
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!iconRef.current) return

    const icon = iconRef.current

    // Configuração da animação flutuante
    let floatInterval: NodeJS.Timeout
    let floatPosition = 0
    let floatUp = true
    const floatSpeed = 0.15
    const maxFloat = 10

    const floatAnimation = () => {
      if (floatUp) {
        floatPosition += floatSpeed
        if (floatPosition >= maxFloat) floatUp = false
      } else {
        floatPosition -= floatSpeed
        if (floatPosition <= -maxFloat) floatUp = true
      }

      icon.style.transform = `translateY(${floatPosition}px)`
    }

    floatInterval = setInterval(floatAnimation, 50)

    return () => {
      clearInterval(floatInterval)
    }
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div ref={iconRef} className="relative w-16 h-16 transition-transform duration-300 ease-out">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/download.jpg-ywIP30GCApVL5V3f0TDefZz13HGcUL.jpeg"
              alt="Canal do Telegram"
              width={64}
              height={64}
              className="rounded-xl drop-shadow-[0_5px_15px_rgba(0,136,255,0.6)]"
            />
          </div>
          <div className="text-white">
            <h3 className="text-xl font-bold">Pré-Lançamento</h3>
            <p className="text-blue-100">A revolução começa ao participar do canal do grande pré-lançamento</p>
          </div>
        </div>
        <Link
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-blue-600 hover:bg-blue-50 transition-colors px-6 py-2 rounded-full font-medium flex items-center gap-2"
        >
          Participar Agora
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
            <path d="m5 12 14 0"></path>
            <path d="m12 5 7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  )
}
