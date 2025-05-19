"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { createClientComponentClient } from "@/lib/supabase"

export default function RegisterPage() {
  const router = useRouter()
  const { ref } = router.query
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError("As senhas não coincidem")
      setLoading(false)
      return
    }

    try {
      // Registrar usuário
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            referral_code: ref as string,
          },
        },
      })

      if (signUpError) {
        throw signUpError
      }

      // Criar perfil
      if (data.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: data.user.email,
          username: data.user.email?.split("@")[0],
          referral_code: generateReferralCode(),
          referred_by: ref ? await getReferrerId(ref as string) : null,
        })

        if (profileError) {
          console.error("Erro ao criar perfil:", profileError)
        }
      }

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Erro ao registrar")
    } finally {
      setLoading(false)
    }
  }

  // Gerar código de referral aleatório
  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase()
  }

  // Buscar ID do usuário que indicou
  const getReferrerId = async (referralCode: string) => {
    const { data } = await supabase.from("profiles").select("id").eq("referral_code", referralCode).single()

    return data?.id
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Amazon Mining</h1>
          <p className="text-slate-400 mt-2">Crie sua conta para começar a investir</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8">
          {ref && (
            <div className="bg-emerald-500/10 border border-emerald-500 text-emerald-500 rounded p-3 mb-4">
              Você foi convidado por um amigo! Código: {ref}
            </div>
          )}

          {error && <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4">{error}</div>}

          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1">
                Confirmar Senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Registrando..." : "Registrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Já tem uma conta?{" "}
              <Link href="/login" className="text-emerald-500 hover:text-emerald-400">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
