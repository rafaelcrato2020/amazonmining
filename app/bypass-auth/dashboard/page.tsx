"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@/lib/supabase"
import { Loader2 } from "lucide-react"

export default function BypassAuthDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true)
        const supabase = createClientComponentClient()

        // Verificar sessão
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          throw error
        }

        setSessionInfo({
          hasSession: !!data.session,
          user: data.session?.user || null,
          expiresAt: data.session?.expires_at || null,
        })

        // Se tiver sessão, redirecionar após um breve delay
        if (data.session) {
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 2000)
        }
      } catch (err: any) {
        console.error("Erro ao verificar autenticação:", err)
        setError(err.message || "Erro ao verificar autenticação")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const forceRedirect = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Acesso Direto ao Dashboard</h1>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500 mb-4" />
            <p className="text-gray-300">Verificando autenticação...</p>
          </div>
        ) : error ? (
          <div className="bg-red-500/20 text-red-300 p-4 rounded-md mb-4">
            <p className="font-medium">Erro:</p>
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-gray-700 p-4 rounded-md">
              <h2 className="font-medium mb-2">Status da Sessão:</h2>
              <pre className="text-xs bg-gray-900 p-2 rounded overflow-auto">
                {JSON.stringify(sessionInfo, null, 2)}
              </pre>
            </div>

            {sessionInfo?.hasSession ? (
              <div className="bg-emerald-500/20 text-emerald-300 p-4 rounded-md">
                <p>Sessão válida encontrada! Redirecionando para o dashboard...</p>
              </div>
            ) : (
              <div className="bg-yellow-500/20 text-yellow-300 p-4 rounded-md">
                <p>Nenhuma sessão válida encontrada. Você precisa fazer login primeiro.</p>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Button onClick={forceRedirect} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Forçar Acesso ao Dashboard
              </Button>

              <Button variant="outline" onClick={() => (window.location.href = "/login")} className="w-full">
                Voltar para Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
