"use client"

import { LoginForm } from "@/components/login-form"
import { useEffect, useState } from "react"
import { createClientComponentClient } from "@/lib/supabase"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClientComponentClient()
      const { data } = await supabase.auth.getSession()

      if (data.session) {
        setIsAuthenticated(true)
        window.location.href = "/dashboard"
      } else {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Verificando autenticação...</h2>
            <p className="mt-2 text-gray-600">Aguarde um momento.</p>
          </div>
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Redirecionando...</h2>
            <p className="mt-2 text-gray-600">Você já está autenticado.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <LoginForm />
      </div>
    </div>
  )
}
