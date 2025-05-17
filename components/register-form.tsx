"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { createClientComponentClient } from "@/lib/supabase"

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

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

      // Se houver um código de referral, registrar a indicação
      if (referralCode && data.user) {
        const { error: referralError } = await supabase.rpc("register_referral", {
          referrer_code: referralCode,
          referred_id: data.user.id,
        })

        if (referralError) {
          console.error("Erro ao registrar indicação:", referralError)
          // Não interromper o fluxo se houver erro na indicação
        }
      }

      console.log("Registro bem-sucedido:", data)

      // Mostrar mensagem de sucesso
      setSuccess(true)

      // Redirecionar para o dashboard após um breve delay
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000)
    } catch (err: any) {
      console.error("Erro no registro:", err)
      setError(err.message || "Erro ao criar conta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {success ? (
        <div className="bg-emerald-500/10 text-emerald-500 text-sm p-3 rounded-md text-center">
          Conta criada com sucesso! Redirecionando para o dashboard...
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
    </div>
  )
}
