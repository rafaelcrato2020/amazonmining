import { RegisterForm } from "@/components/register-form"
import { FloatingLogo } from "@/components/floating-logo"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-emerald-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 rounded-lg shadow-xl border border-slate-800 p-6">
        <div className="flex justify-center mb-6">
          <FloatingLogo size="small" static />
        </div>

        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Amazon Mining
        </h1>

        <RegisterForm />

        <div className="mt-6 text-center text-sm text-slate-400">
          Já tem uma conta?{" "}
          <Link href="/login" className="text-emerald-400 hover:text-emerald-300">
            Faça login
          </Link>
        </div>

        <div className="mt-8 flex justify-center">
          <Button asChild variant="ghost" size="sm" className="text-slate-400 hover:text-white">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
