"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarContextType {
  sidebarOpen: boolean
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType>({
  sidebarOpen: false,
  toggleSidebar: () => {},
})

export const useSidebar = () => useContext(SidebarContext)

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar }}>{children}</SidebarContext.Provider>
}
