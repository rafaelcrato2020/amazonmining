"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface RegisterFormProps {
  setOpen: (open: boolean) => void
}

export function RegisterForm({ setOpen }: RegisterFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulando registro
    setTimeout(() => {
      setIsLoading(false)
      setOpen(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="first-name">Nome</Label>
          <Input id="first-name" placeholder="João" required className="bg-slate-800 border-slate-700" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-name">Sobrenome</Label>
          <Input id="last-name" placeholder="Silva" required className="bg-slate-800 border-slate-700" />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="seu@email.com" required className="bg-slate-800 border-slate-700" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Senha</Label>
        <Input id="password" type="password" required className="bg-slate-800 border-slate-700" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirmar Senha</Label>
        <Input id="confirm-password" type="password" required className="bg-slate-800 border-slate-700" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" required />
        <Label htmlFor="terms" className="text-sm text-slate-400">
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
        disabled={isLoading}
      >
        {isLoading ? "Criando conta..." : "Criar conta"}
      </Button>
    </form>
  )
}
