import { Loader2 } from "lucide-react"

export default function LoginLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-emerald-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
        <p className="text-emerald-400">Carregando...</p>
      </div>
    </div>
  )
}
