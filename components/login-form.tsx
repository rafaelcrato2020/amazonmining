"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validação básica
    if (!formData.email || !formData.password) {
      setError("Email e senha são obrigatórios")
      return
    }

    setIsLoading(true)

    try {
      // Simulação de login bem-sucedido (sem verificar no banco de dados)
      console.log("Login simulado para:", formData.email)

      // Simular um pequeno atraso para dar feedback visual
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mostrar mensagem de sucesso
      setSuccess(true)

      // Armazenar informações do usuário mockado no localStorage
      localStorage.setItem(
        "mockUser",
        JSON.stringify({
          id: "mock-user-id",
          email: formData.email,
          name: "Usuário Teste",
          isLoggedIn: true,
        }),
      )

      // Redirecionar para o dashboard após um breve delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (err: any) {
      console.error("Erro no login simulado:", err)
      setError("Erro ao processar login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // Função para acesso direto ao dashboard (bypass de autenticação)
  const accessDashboardDirectly = () => {
    localStorage.setItem(
      "mockUser",
      JSON.stringify({
        id: "direct-access-user",
        email: "direct@example.com",
        name: "Acesso Direto",
        isLoggedIn: true,
      }),
    )

    router.push("/dashboard")
  }

  return (
    <div className="space-y-6 py-4 px-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Bem-vindo de volta
        </h1>
        <p className="text-slate-400">Acesse sua conta para gerenciar seus investimentos</p>
      </div>

      {success ? (
        <div className="bg-emerald-500/10 text-emerald-500 text-sm p-3 rounded-md text-center">
          Login bem-sucedido! Redirecionando para o dashboard...
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

      {/* Botão de acesso direto ao dashboard */}
      <div className="mt-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-emerald-400 border-emerald-400/20 hover:bg-emerald-400/10"
          onClick={accessDashboardDirectly}
        >
          Acesso Direto ao Dashboard
        </Button>
      </div>

      <div className="text-center text-sm text-slate-400">
        Não tem uma conta?{" "}
        <Link href="/register" className="text-emerald-400 hover:text-emerald-300">
          Cadastre-se
        </Link>
      </div>
    </div>
  )
}
