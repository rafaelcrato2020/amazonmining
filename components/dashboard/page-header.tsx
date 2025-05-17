"use client"

import { useSidebar } from "@/contexts/sidebar-context"

interface PageHeaderProps {
  title: string
}

export function PageHeader({ title }: PageHeaderProps) {
  const { isVisible } = useSidebar()

  if (!isVisible) {
    return null
  }

  return (
    <div className="bg-slate-900 border-b border-slate-800 p-4 mb-6 flex items-center justify-between">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
        Amazon Mining
      </div>
    </div>
  )
}
