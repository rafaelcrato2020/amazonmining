"use client"

import type { ReactNode } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { MobileMenu } from "@/components/dashboard/mobile-menu"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isVisible, isOpen } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardSidebar />

      <div className={cn("transition-all duration-300 ease-in-out", isVisible ? (isOpen ? "ml-64" : "ml-20") : "ml-0")}>
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
