"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { TelegramBanner } from "../components/telegram-banner"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para o dashboard ou login após um breve delay
    const timer = setTimeout(() => {
      router.push("/dashboard")
    }, 3000) // 3 segundos para mostrar o banner antes de redirecionar

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex flex-col min-h-screen bg-slate-900">
      <TelegramBanner />
      <div className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white">Amazon Mining</h1>
        <p className="text-slate-400 mt-2">Carregando...</p>
      </div>
    </div>
  )
}
