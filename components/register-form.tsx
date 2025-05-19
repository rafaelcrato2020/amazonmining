"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createClientComponentClient } from "@/lib/supabase"
import Link from "next/link"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [sessionChecks, setSessionChecks] = useState(0)
  const searchParams = useSearchParams()
  const referralCode = searchParams.get("ref")

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      acceptTerms: checked,
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

  // Verificar sessão após registro bem-sucedido
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
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Todos os campos são obrigatórios")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    if (!formData.acceptTerms) {
      setError("Você deve aceitar os termos de serviço")
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClientComponentClient()

      // Log para debug
      console.log("Iniciando registro para:", formData.email)
      setDebugInfo("Iniciando processo de registro...")

      // Registrar o usuário
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          },
        },
      })

      if (error) {
        throw error
      }

      // Log para debug
      console.log("Registro bem-sucedido:", data)
      setDebugInfo((prev) => `${prev || ""}\nRegistro bem-sucedido. User ID: ${data.user?.id?.slice(0, 8)}...`)

      // Se houver um código de referral, registrar a indicação
      if (referralCode && data.user) {
        try {
          console.log("Registrando referral com código:", referralCode)
          const { error: referralError } = await supabase.rpc("register_referral", {
            referrer_code: referralCode,
            referred_id: data.user.id,
          })

          if (referralError) {
            console.error("Erro ao registrar indicação:", referralError)
            // Não interromper o fluxo se houver erro na indicação
          } else {
            console.log("Referral registrado com sucesso")
          }
        } catch (referralErr) {
          console.error("Exceção ao registrar referral:", referralErr)
        }
      }

      // Mostrar mensagem de sucesso
      setSuccess(true)

      // Verificar sessão imediatamente após registro
      const hasSession = await checkSessionAndRedirect()

      if (!hasSession) {
        setDebugInfo(
          (prev) => `${prev || ""}\nSessão não encontrada imediatamente. Iniciando verificações periódicas...`,
        )
      }
    } catch (err: any) {
      console.error("Erro no registro:", err)
      setError(err.message || "Erro ao criar conta. Tente novamente.")
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
    <div className="space-y-4">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Crie sua conta
        </h1>
        <p className="text-slate-400">Junte-se à Amazon Mining e comece a minerar criptomoedas</p>
      </div>

      {success ? (
        <div className="bg-emerald-500/10 text-emerald-500 text-sm p-3 rounded-md text-center">
          Conta criada com sucesso! Verificando sessão...
          {debugInfo && (
            <div className="mt-2 text-xs opacity-70 text-left whitespace-pre-line bg-black/10 p-2 rounded">
              {debugInfo}
            </div>
          )}
        </div>
      ) : error ? (
        <div className="bg-red-500/10 text-red-500 text-sm p-3 rounded-md">{error}</div>
      ) : null}

      {referralCode && !success && (
        <div className="bg-emerald-500/10 text-emerald-500 text-sm p-3 rounded-md">
          Você foi convidado por um usuário da Amazon Mining!
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nome</Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="João Silva"
                value={formData.fullName}
                onChange={handleChange}
                disabled={isLoading || success}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading || success}
                required
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
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
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading || success}
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={handleCheckboxChange}
              disabled={isLoading || success}
              required
            />
            <Label htmlFor="acceptTerms" className="text-sm text-slate-400">
              Eu concordo com os{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Termos de Serviço
              </a>{" "}
              e{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Política de Privacidade
              </a>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
            disabled={isLoading || success}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : success ? (
              "Conta criada!"
            ) : (
              "Criar conta"
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
        Já tem uma conta?{" "}
        <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
          Faça login
        </Link>
      </div>
    </div>
  )
}
