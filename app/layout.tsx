import type React from "react"
import { UserProvider } from "@/contexts/user-context"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
