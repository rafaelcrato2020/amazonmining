"use client"

import type { ReactNode } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MobileMenu } from "@/components/dashboard/mobile-menu"

interface DashboardLayoutProps {
  children: ReactNode
}

// Este componente não é mais usado diretamente, mas mantemos para compatibilidade
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div>
        <div className="md:hidden">
          <MobileMenu />
        </div>
        <div className="hidden md:block">
          <DashboardHeader />
        </div>
        <main className="container mx-auto px-4 py-8">{children}</main>
      </div>
    </div>
  )
}
