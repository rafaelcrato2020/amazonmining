"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@/lib/supabase"

export function DirectAccessButton() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data } = await supabase.auth.getSession()

        setIsAuthenticated(!!data.session)
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading || !isAuthenticated) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => (window.location.href = "/dashboard")}
        className="bg-green-600 hover:bg-green-700 text-white font-bold"
      >
        Acessar Dashboard
      </Button>
    </div>
  )
}
