"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { NotificationAvatar } from "@/components/dashboard/notification-avatar"
import { SidebarProvider } from "@/contexts/sidebar-context"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-slate-950 text-white flex">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col transition-all duration-300">
          <div className="flex justify-between items-center p-4 bg-slate-900 border-b border-slate-800">
            <h1 className="text-2xl font-bold text-white">Amazon Mining</h1>
            <NotificationAvatar />
          </div>
          <main className="p-6 flex-1">{children}</main>
          <div className="p-4 border-t border-slate-800">
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span>Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
