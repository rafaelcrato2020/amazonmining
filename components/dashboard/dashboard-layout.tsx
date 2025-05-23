"use client"

import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
}

// Este componente agora é apenas um wrapper simples sem barra lateral
export function DashboardLayout({ children }: DashboardLayoutProps) {
  return <div className="w-full">{children}</div>
}
