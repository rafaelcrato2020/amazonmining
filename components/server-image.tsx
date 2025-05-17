"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function ServerImage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Pré-carrega a imagem para obter suas dimensões reais
    const img = new Image()
    img.src = "/images/servers-futuristic.jpeg"
    img.onload = () => {
      setDimensions({
        width: img.width,
        height: img.height,
      })
      setLoading(false)
    }
  }, [])

  return (
    <div className="w-full rounded-xl overflow-hidden border border-emerald-500/20 shadow-2xl shadow-emerald-500/10 bg-black/40">
      {loading ? (
        <div className="w-full h-[400px] flex items-center justify-center bg-slate-900">
          <div className="w-10 h-10 border-4 border-emerald-500/50 border-t-emerald-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <Image
          src="/images/servers-futuristic.jpeg"
          alt="Amazon Mining - Infraestrutura de mineração"
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-auto"
          priority
        />
      )}
    </div>
  )
}
