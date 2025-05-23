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
  // Alterado o estado inicial para false para que a barra lateral comece fechada
  const [isVisible, setIsVisible] = useState(false)

  // Removida a detecção de tamanho de tela que forçava a barra a abrir em desktops
  // Agora a barra sempre começa fechada, independentemente do dispositivo

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
