"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function FloatingLogo({
  size = "medium",
  static: isStatic = false,
}: {
  size?: "small" | "medium" | "large"
  static?: boolean
}) {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Se for estático, não aplicamos animação
    if (isStatic || !logoRef.current) return

    const logo = logoRef.current

    // Floating animation - suave, sem tremor
    let floatInterval: NodeJS.Timeout
    let floatPosition = 0
    let floatUp = true
    const floatSpeed = 0.1 // Velocidade reduzida para movimento mais suave
    const maxFloat = 8 // Amplitude reduzida

    const floatAnimation = () => {
      if (floatUp) {
        floatPosition += floatSpeed
        if (floatPosition >= maxFloat) floatUp = false
      } else {
        floatPosition -= floatSpeed
        if (floatPosition <= -maxFloat) floatUp = true
      }

      logo.style.transform = `translateY(${floatPosition}px)`
    }

    floatInterval = setInterval(floatAnimation, 50)

    return () => {
      clearInterval(floatInterval)
    }
  }, [isStatic])

  // Definir tamanhos com base no parâmetro size
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
  }

  const imageSizes = {
    small: 150,
    medium: 250,
    large: 350,
  }

  return (
    <div
      ref={logoRef}
      className={`transition-transform duration-300 ease-out mx-auto ${sizeClasses[size]}`}
      style={{ willChange: isStatic ? "auto" : "transform" }}
    >
      <Image
        src="/images/amazon-mining-logo.png"
        alt="Amazon Mining Logo"
        width={imageSizes[size]}
        height={imageSizes[size]}
        className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,200,255,0.5)]"
      />
    </div>
  )
}
