"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function DirectDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("Verificando autenticação...")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const accessDashboard = async () => {
      try {
        setIsLoading(true)
        setMessage("Verificando autenticação...")

        const supabase = createClientComponentClient()

        // Verificar sessão
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        if (data.session) {
          setMessage("Sessão encontrada! Redirecionando para o dashboard...")

          // Redirecionar para o dashboard após um breve delay
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1500)
        } else {
          // Tentar fazer login anônimo para acessar o dashboard
          setMessage("Sessão não encontrada. Tentando acesso alternativo...")

          // Armazenar flag para acesso direto
          localStorage.setItem("direct_dashboard_access", "true")

          // Redirecionar para o dashboard após um breve delay
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1500)
        }
      } catch (err: any) {
        console.error("Erro ao acessar dashboard:", err)
        setError(err.message || "Erro ao acessar dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    accessDashboard()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Acesso ao Dashboard</h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
            <p className="text-gray-300">{message}</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-md mb-4">
            <p className="font-medium">Erro:</p>
            <p>{error}</p>

            <div className="mt-4">
              <Button onClick={() => (window.location.href = "/login")} className="w-full">
                Voltar para Login
              </Button>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded-md">
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  )
}
