"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session, User } from "@supabase/supabase-js"
import { mockUser } from "@/lib/mock-data"

type Profile = {
  id: string
  username: string | null
  full_name: string | null
  avatar_url: string | null
  wallet_address: string | null
  balance: number
}

type AuthContextType = {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkMockAuth = () => {
      setIsLoading(true)

      try {
        // Verificar se há um usuário mockado no localStorage
        const storedUser = localStorage.getItem("mockUser")

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)

          if (parsedUser.isLoggedIn) {
            // Criar um usuário mockado baseado nos dados armazenados
            const mockUserData = {
              id: parsedUser.id || mockUser.id,
              email: parsedUser.email || mockUser.email,
              user_metadata: {
                full_name: parsedUser.name || mockUser.full_name,
              },
            } as User

            setUser(mockUserData)

            // Criar um perfil mockado
            setProfile({
              id: mockUserData.id,
              username: parsedUser.email?.split("@")[0] || mockUser.username,
              full_name: parsedUser.name || mockUser.full_name,
              avatar_url: mockUser.avatar_url,
              wallet_address: mockUser.wallet_address,
              balance: mockUser.balance,
            })

            // Criar uma sessão mockada
            setSession({
              access_token: "mock-token",
              refresh_token: "mock-refresh-token",
              expires_at: Date.now() + 3600,
              user: mockUserData,
            } as Session)
          } else {
            setUser(null)
            setProfile(null)
            setSession(null)
          }
        } else {
          setUser(null)
          setProfile(null)
          setSession(null)
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação mockada:", error)
        setUser(null)
        setProfile(null)
        setSession(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkMockAuth()

    // Adicionar um listener para mudanças no localStorage
    window.addEventListener("storage", checkMockAuth)

    return () => {
      window.removeEventListener("storage", checkMockAuth)
    }
  }, [router])

  const refreshProfile = async () => {
    // No modo mockado, não precisamos fazer nada aqui
    console.log("Refresh profile chamado (modo mockado)")
  }

  const signOut = async () => {
    try {
      // Remover o usuário mockado do localStorage
      localStorage.removeItem("mockUser")

      // Atualizar o estado
      setUser(null)
      setProfile(null)
      setSession(null)

      // Redirecionar para a página inicial
      router.push("/")
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }

  return context
}
