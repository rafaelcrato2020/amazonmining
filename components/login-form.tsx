"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@/lib/supabase"
import Link from "next/link"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [sessionChecks, setSessionChecks] = useState(0)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Função para verificar a sessão e redirecionar
  const checkSessionAndRedirect = async () => {
    try {
      const supabase = createClientComponentClient()
      const { data } = await supabase.auth.getSession()

      setDebugInfo(
        (prev) =>
          `${prev || ""}\nVerificação #${sessionChecks + 1}: ${data.session ? "Sessão encontrada" : "Sem sessão"}`,
      )

      if (data.session) {
        // Sessão encontrada, redirecionar para o dashboard
        setDebugInfo((prev) => `${prev || ""}\nSessão válida encontrada, redirecionando...`)

        // Usar window.location para um redirecionamento completo
        window.location.href = "/dashboard"
        return true
      }

      return false
    } catch (error) {
      console.error("Erro ao verificar sessão:", error)
      setDebugInfo((prev) => `${prev || ""}\nErro ao verificar sessão: ${error}`)
      return false
    }
  }

  // Verificar sessão após login bem-sucedido
  useEffect(() => {
    if (success && sessionChecks < 5) {
      const timer = setTimeout(() => {
        setSessionChecks((prev) => prev + 1)
        checkSessionAndRedirect()
      }, 1000) // Verificar a cada segundo, até 5 tentativas

      return () => clearTimeout(timer)
    }
  }, [success, sessionChecks])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setDebugInfo(null)
    setSessionChecks(0)

    // Validação básica
    if (!formData.email || !formData.password) {
      setError("Email e senha são obrigatórios")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClientComponentClient()

      // Log para debug
      console.log("Iniciando login para:", formData.email)
      setDebugInfo("Iniciando processo de login...")

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      // Log para debug
      console.log("Login bem-sucedido:", data)
      setDebugInfo((prev) => `${prev || ""}\nLogin bem-sucedido. User ID: ${data.user?.id?.slice(0, 8)}...`)

      // Mostrar mensagem de sucesso
      setSuccess(true)

      // Verificar sessão imediatamente após login
      const hasSession = await checkSessionAndRedirect()

      if (!hasSession) {
        setDebugInfo(
          (prev) => `${prev || ""}\nSessão não encontrada imediatamente. Iniciando verificações periódicas...`,
        )
      }
    } catch (err: any) {
      console.error("Erro no login:", err)
      setError(err.message || "Credenciais inválidas. Tente novamente.")
      setDebugInfo(`Erro: ${err.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Função para forçar acesso ao dashboard
  const forceAccessDashboard = () => {
    // Armazenar um flag para indicar que estamos tentando um acesso forçado
    try {
      localStorage.setItem("force_dashboard_access", "true")
      sessionStorage.setItem("force_dashboard_access", "true")
    } catch (e) {
      console.error("Erro ao armazenar flag:", e)
    }

    // Redirecionar para uma rota especial que ignora o middleware
    window.location.href = "/bypass-auth/dashboard"
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Bem-vindo de volta
        </h1>
        <p className="text-slate-400">Acesse sua conta para gerenciar seus investimentos</p>
      </div>

      {success ? (
        <div className="bg-emerald-500/10 text-emerald-500 text-sm p-3 rounded-md text-center">
          Login bem-sucedido! Verificando sessão...
          {debugInfo && (
            <div className="mt-2 text-xs opacity-70 text-left whitespace-pre-line bg-black/10 p-2 rounded">
              {debugInfo}
            </div>
          )}
        </div>
      ) : error ? (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md">{error}</div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading || success}
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading || success}
                required
                className="bg-slate-800 border-slate-700"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading || success}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-slate-400" />
                ) : (
                  <Eye className="h-4 w-4 text-slate-400" />
                )}
                <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
              </Button>
            </div>
            <div className="text-right text-sm">
              <Link href="/forgot-password" className="text-emerald-400 hover:text-emerald-300">
                Esqueceu sua senha?
              </Link>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
            type="submit"
            disabled={isLoading || success}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Entrando...
              </>
            ) : success ? (
              "Login bem-sucedido!"
            ) : (
              "Entrar"
            )}
          </Button>
        </div>
      </form>

      {success && (
        <div className="mt-4 flex flex-col gap-2">
          <Button variant="outline" size="sm" onClick={() => checkSessionAndRedirect()}>
            Verificar Sessão Novamente
          </Button>

          <Button variant="secondary" size="sm" onClick={forceAccessDashboard}>
            Acessar Dashboard (Bypass Auth)
          </Button>
        </div>
      )}

      <div className="text-center text-sm text-slate-400">
        Não tem uma conta?{" "}
        <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
          Cadastre-se
        </Link>
      </div>
    </div>
  )
}
