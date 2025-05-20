"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { useRouter } from "next/router"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)

    // Verificar se o usuário está "logado" (usando localStorage para mock)
    const checkAuth = () => {
      try {
        const mockUser = localStorage.getItem("mockUser")
        if (!mockUser || !JSON.parse(mockUser).isLoggedIn) {
          router.push("/login")
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <DashboardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-slate-900">{children}</main>
      </div>
    </div>
  )
}
