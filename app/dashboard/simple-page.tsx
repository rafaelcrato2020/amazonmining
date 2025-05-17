"use client"

import { useEffect, useState } from "react"
import { createClientComponentClient } from "@/lib/supabase"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default function SimpleDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (!data.session) {
          window.location.href = "/"
          return
        }

        setIsAuthenticated(true)
      } catch (err: any) {
        console.error("Erro ao verificar autenticação:", err)
        setError(err.message || "Erro ao verificar autenticação")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Carregando...</h2>
          <p className="mt-2 text-gray-600">Verificando sua autenticação.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Erro</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Acesso Negado</h2>
          <p className="mt-2 text-gray-600">Você precisa estar autenticado para acessar esta página.</p>
          <button
            onClick={() => (window.location.href = "/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Voltar para a página inicial
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <DashboardOverview />
    </div>
  )
}
