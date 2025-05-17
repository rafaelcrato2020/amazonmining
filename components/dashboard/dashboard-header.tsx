"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useSidebar } from "@/contexts/sidebar-context"
import { Bell, ChevronRight } from "lucide-react"

export function DashboardHeader() {
  const { isVisible, toggleSidebar } = useSidebar()
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  // Efeito para verificar se há uma foto de perfil salva no localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }
  }, [])

  return (
    <header
      className={`bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between transition-all duration-300 ${
        isVisible ? "ml-64" : "ml-0"
      }`}
    >
      {!isVisible && (
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-400 hover:text-white mr-2">
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      )}

      <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
        Amazon Mining
      </h1>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-emerald-500 rounded-full"></span>
          <span className="sr-only">Notificações</span>
        </Button>

        <Avatar className="h-10 w-10 border-2 border-emerald-500 ring-2 ring-slate-700 transition-all duration-300 hover:ring-emerald-400">
          <AvatarImage src={userAvatar || "/images/avatar.png"} alt="Usuário" />
          <AvatarFallback className="bg-slate-700 text-emerald-400 text-sm">AM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
