"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Redirecionar para o dashboard ou login
    router.push("/dashboard")
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Amazon Mining</h1>
        <p className="text-slate-400 mt-2">Carregando...</p>
      </div>
    </div>
  )
}
