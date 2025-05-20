"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type SidebarContextType = {
  isVisible: boolean
  toggleSidebar: () => void
  showSidebar: () => void
  hideSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: ReactNode }) {
  // Definimos o estado inicial como true para que a barra lateral comece visível
  const [isVisible, setIsVisible] = useState(true)

  const toggleSidebar = () => setIsVisible((prev) => !prev)
  const showSidebar = () => setIsVisible(true)
  const hideSidebar = () => setIsVisible(false)

  return (
    <SidebarContext.Provider
      value={{
        isVisible,
        toggleSidebar,
        showSidebar,
        hideSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}
