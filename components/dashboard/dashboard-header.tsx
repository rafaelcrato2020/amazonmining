"use client"

import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/router"

interface DashboardHeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const router = useRouter()

  const handleLogout = () => {
    // Remover o usuário mockado do localStorage
    localStorage.removeItem("mockUser")

    // Redirecionar para a página inicial
    router.push("/")
  }

  return (
    <header className="h-16 border-b border-slate-700 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5 text-slate-400" />
        </Button>
        <h1 className="text-xl font-bold text-white">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
          <Bell className="h-5 w-5" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-800 border-slate-700 text-white">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-700" />
            <DropdownMenuItem className="hover:bg-slate-700" onClick={() => router.push("/dashboard/settings")}>
              Configurações
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-slate-700" onClick={handleLogout}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
