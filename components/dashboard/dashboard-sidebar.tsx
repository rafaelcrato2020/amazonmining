"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Award,
  Settings,
  HelpCircle,
  Gift,
  DollarSign,
  PlusCircle,
  FileText,
  RefreshCw,
  Percent,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/contexts/sidebar-context"

export function DashboardSidebar() {
  const pathname = usePathname()
  const { isVisible, toggleSidebar } = useSidebar()

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

  // Botão de Bônus Residual separado para aplicar cores especiais
  const residualBonusItem = {
    title: "Bônus Residual",
    icon: Percent,
    href: "/dashboard/residual-bonus",
  }

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-all duration-300 ${
        isVisible ? "w-64" : "w-0 -translate-x-full"
      }`}
    >
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex justify-center">
          <Image
            src="/images/amazon-mining-logo.png"
            alt="Amazon Mining Logo"
            width={40}
            height={40}
            className="rounded-full border-2 border-emerald-500"
          />
        </div>

        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-slate-400 hover:text-white">
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Fechar menu</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href))

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-slate-400 hover:text-white hover:bg-slate-800",
                    )}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              )
            })}

            {/* Botão de Bônus Residual com cores especiais */}
            <li>
              <Link
                href={residualBonusItem.href}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md transition-colors",
                  pathname === residualBonusItem.href || pathname?.startsWith(residualBonusItem.href)
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300"
                    : "text-cyan-400 hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-emerald-500/10 hover:text-cyan-300",
                )}
              >
                <residualBonusItem.icon className="h-5 w-5 mr-3 text-cyan-400" />
                <span className="font-medium">{residualBonusItem.title}</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
