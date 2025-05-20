"use client"

import Link from "next/link"
import { useRouter } from "next/router"
import { Home, BarChart3, Wallet, Users, Gift, Settings, HelpCircle, X, Award, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardSidebarProps {
  open: boolean
  onClose: () => void
}

export function DashboardSidebar({ open, onClose }: DashboardSidebarProps) {
  const router = useRouter()

  const isActive = (path: string) => {
    return router.pathname === path || router.pathname.startsWith(`${path}/`)
  }

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Estatísticas", href: "/dashboard/stats", icon: BarChart3 },
    { name: "Carteira", href: "/dashboard/wallet", icon: Wallet },
    { name: "Indicações", href: "/dashboard/referrals", icon: Users },
    { name: "Recompensas", href: "/dashboard/rewards", icon: Gift },
    { name: "Bônus Residual", href: "/dashboard/residual-bonus", icon: Percent }, // Novo item
    { name: "Planos de Recompensa", href: "/dashboard/rewards", icon: Award },
    { name: "Configurações", href: "/dashboard/settings", icon: Settings },
    { name: "Ajuda", href: "/dashboard/help", icon: HelpCircle },
  ]

  return (
    <>
      {/* Overlay para dispositivos móveis */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Barra lateral */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-slate-700">
          <Link href="/dashboard" className="flex items-center">
            <span className="text-xl font-bold text-white">Amazon Mining</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onClose}>
            <X className="h-5 w-5 text-slate-400" />
          </Button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href) ? "bg-slate-700 text-white" : "text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}
