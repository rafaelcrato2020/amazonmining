"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientComponentClient } from "@/lib/supabase"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

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
      const supabase = createClientComponentClient()

      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      if (error) {
        throw error
      }

      console.log("Login bem-sucedido:", data)

      // Mostrar mensagem de sucesso
      setSuccess(true)

      // Redirecionar para o dashboard após um breve delay
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (err: any) {
      console.error("Erro no login:", err)
      setError(err.message || "Credenciais inválidas. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6 py-4">
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
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="sr-only">{showPassword ? "Esconder senha" : "Mostrar senha"}</span>
              </Button>
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={isLoading || success}>
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
    </div>
  )
}
