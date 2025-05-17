"use client"

import type React from "react"

import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { SidebarProvider, useSidebar } from "@/contexts/sidebar-context"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { isVisible } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <DashboardSidebar />
      <div className={`transition-all duration-300 ${isVisible ? "ml-64" : "ml-0"}`}>{children}</div>
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DashboardContent>{children}</DashboardContent>
    </SidebarProvider>
  )
}
