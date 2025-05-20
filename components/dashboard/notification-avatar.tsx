"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"

export function NotificationAvatar() {
  const [userAvatar, setUserAvatar] = useState<string | null>(null)

  // Efeito para verificar se há uma foto de perfil salva no localStorage
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setUserAvatar(savedAvatar)
    }
  }, [])

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white relative">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-emerald-500 rounded-full"></span>
        <span className="sr-only">Notificações</span>
      </Button>

      <Avatar className="h-10 w-10 border-2 border-emerald-500 ring-2 ring-slate-700 transition-all duration-300 hover:ring-emerald-400">
        <AvatarImage src={userAvatar || "/images/avatar.png"} alt="Usuário" />
        <AvatarFallback className="bg-slate-700 text-emerald-400 text-sm"></AvatarFallback>
      </Avatar>
    </div>
  )
}
