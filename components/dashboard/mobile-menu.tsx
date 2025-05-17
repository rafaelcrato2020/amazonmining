"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Award,
  Settings,
  HelpCircle,
  Gift,
  DollarSign,
  PlusCircle,
  FileText,
  LogOut,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export function MobileMenu() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      title: "Depósito",
      icon: PlusCircle,
      href: "/dashboard/deposit",
    },
    {
      title: "Reinvestir",
      icon: RefreshCw,
      href: "/dashboard/deposit?tab=reinvest",
    },
    {
      title: "Saque",
      icon: DollarSign,
      href: "/dashboard/withdraw",
    },
    {
      title: "Planos de Recompensa",
      icon: Award,
      href: "/dashboard/rewards",
    },
    {
      title: "Plano de Carreira",
      icon: Gift,
      href: "/dashboard/career",
    },
    {
      title: "Extrato",
      icon: FileText,
      href: "/dashboard/transactions",
    },
    {
      title: "Configurações",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      title: "Suporte",
      icon: HelpCircle,
      href: "/dashboard/support",
    },
  ]

  const handleLogout = () => {
    // Aqui você adicionaria a lógica para fazer logout
    router.push("/")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full shadow-lg"
        >
          <LayoutDashboard className="h-5 w-5" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-slate-900 border-r border-slate-800 w-64">
        <SheetHeader className="text-left mt-0">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <div className="px-4 pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-emerald-500">
                <AvatarImage src="/images/avatar.png" alt="Usuário" />
                <AvatarFallback className="bg-slate-700 text-emerald-400">AM</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white">Usuário</p>
                <p className="text-xs text-slate-400">usuario@exemplo.com</p>
              </div>
            </div>
          </div>
          <nav className="p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-slate-400 hover:text-white hover:bg-slate-800"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300 absolute bottom-4 left-0"
          onClick={() => {
            handleLogout()
            setOpen(false)
          }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Sair</span>
        </Button>
      </SheetContent>
    </Sheet>
  )
}
