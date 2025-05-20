"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/contexts/sidebar-context"
import { Menu } from "lucide-react"

export function DashboardHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between">
      {/* Botão para abrir a barra lateral - sempre visível */}
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-400 hover:text-white">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Abrir menu</span>
      </Button>
      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
        Amazon Mining
      </h1>
      <div className="w-10"></div> {/* Espaço para equilibrar o layout */}
    </header>
  )
}
