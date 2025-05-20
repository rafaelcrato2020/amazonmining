"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@/lib/supabase"

export function DirectAccessButton() {
  const [hasSession, setHasSession] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data } = await supabase.auth.getSession()
        setHasSession(!!data.session)
      } catch (error) {
        console.error("Erro ao verificar sessão:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [])

  if (isLoading || !hasSession) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => (window.location.href = "/dashboard")}
        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
      >
        Acessar Dashboard
      </Button>
    </div>
  )
}
