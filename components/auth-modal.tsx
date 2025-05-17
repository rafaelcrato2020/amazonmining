"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoginForm } from "@/components/login-form"
import { RegisterForm } from "@/components/register-form"
import { FloatingLogo } from "@/components/floating-logo"

interface AuthModalProps {
  type: "login" | "register"
  children?: React.ReactNode
}

export function AuthModal({ type, children }: AuthModalProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button
            variant={type === "login" ? "outline" : "default"}
            className={
              type === "login"
                ? "border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10"
                : "bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border-0"
            }
          >
            {type === "login" ? "Entrar" : "Cadastrar"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 border-slate-800">
        <div className="flex justify-center mb-4">
          <FloatingLogo size="small" static />
        </div>

        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            {type === "login" ? "Bem-vindo de volta" : "Crie sua conta"}
          </DialogTitle>
          <DialogDescription className="text-center text-slate-400">
            {type === "login"
              ? "Acesse sua conta para gerenciar seus investimentos"
              : "Junte-se à Amazon Mining e comece a minerar criptomoedas"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={type} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <LoginForm setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
