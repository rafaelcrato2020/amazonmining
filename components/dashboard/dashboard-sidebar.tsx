"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Award,
  Settings,
  HelpCircle,
  ChevronLeft,
  Gift,
  DollarSign,
  PlusCircle,
  FileText,
  LogOut,
  ChevronRight,
  Percent,
} from "lucide-react"
import { FloatingLogo } from "../floating-logo"
import { useSidebar } from "@/contexts/sidebar-context"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const { isVisible, toggleSidebar } = useSidebar()

  // Menu organizado por categorias (removido "Indicações")
  const menuItems = [
    // Categoria: Principal
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
    },

    // Categoria: Financeiro
    {
      title: "Depósito",
      icon: PlusCircle,
      href: "/dashboard/deposit",
    },
    {
      title: "Saque",
      icon: DollarSign,
      href: "/dashboard/withdraw",
    },
    {
      title: "Extrato",
      icon: FileText,
      href: "/dashboard/transactions",
    },

    // Categoria: Programa de Recompensas
    {
      title: "Recompensas",
      icon: Award,
      href: "/dashboard/rewards",
    },
    {
      title: "Plano de Carreira",
      icon: Gift,
      href: "/dashboard/career",
    },
    {
      title: "Bônus Residual",
      icon: Percent,
      href: "/dashboard/residual-bonus",
    },

    // Categoria: Suporte e Configurações
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

  // Se a barra não estiver visível, mostrar apenas o botão para abri-la
  if (!isVisible) {
    return (
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Abrir menu</span>
      </Button>
    )
  }

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out flex flex-col">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <FloatingLogo size="small" />
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-400 hover:text-white">
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Fechar menu</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4">
          {/* Seção Principal */}
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Principal</h3>
            <ul className="mt-2 space-y-1">
              {menuItems.slice(0, 1).map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-800",
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Seção Financeiro */}
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Financeiro</h3>
            <ul className="mt-2 space-y-1">
              {menuItems.slice(1, 4).map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-800",
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Seção Programa de Recompensas */}
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Programa de Recompensas
            </h3>
            <ul className="mt-2 space-y-1">
              {menuItems.slice(4, 7).map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-800",
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Seção Suporte e Configurações */}
          <div>
            <h3 className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Configurações</h3>
            <ul className="mt-2 space-y-1">
              {menuItems.slice(7, 9).map((item) => {
                const isActive = pathname === item.href
                return (
                  <li key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                        isActive
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "text-slate-400 hover:text-white hover:bg-slate-800",
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>
      </div>

      {/* Botão de Sair - removido o card de saldo */}
      <div className="p-4 border-t border-slate-800">
        <Button
          variant="ghost"
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          <span>Sair</span>
        </Button>
      </div>
    </aside>
  )
}
