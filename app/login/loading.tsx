import { Loader2 } from "lucide-react"

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-emerald-950 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 text-emerald-500 animate-spin" />
        <p className="text-emerald-400 text-lg">Carregando...</p>
      </div>
    </div>
  )
}
