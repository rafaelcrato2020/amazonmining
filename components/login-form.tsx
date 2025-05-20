"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface LoginFormProps {
  setOpen: (open: boolean) => void
}

export function LoginForm({ setOpen }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando login
    setTimeout(() => {
      setIsLoading(false)
      setOpen(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="seu@email.com" required className="bg-slate-800 border-slate-700" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300">
            Esqueceu a senha?
          </a>
        </div>
        <Input id="password" type="password" required className="bg-slate-800 border-slate-700" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm text-slate-400">
          Lembrar de mim
        </Label>
      </div>
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  )
}
