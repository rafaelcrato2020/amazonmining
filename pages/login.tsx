"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"
import { createClientComponentClient } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Amazon Mining</h1>
          <p className="text-slate-400 mt-2">Faça login para acessar sua conta</p>
        </div>

        <div className="bg-slate-800 rounded-lg p-8">
          {error && <div className="bg-red-500/10 border border-red-500 text-red-500 rounded p-3 mb-4">{error}</div>}

          <form onSubmit={handleLogin}>
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

            <div className="mb-6">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400">
              Não tem uma conta?{" "}
              <Link href="/register" className="text-emerald-500 hover:text-emerald-400">
                Registre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
