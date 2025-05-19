"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, Menu } from "lucide-react"
import { createClientComponentClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { MobileMenu } from "./mobile-menu"

export function DashboardHeader() {
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [unreadNotifications, setUnreadNotifications] = useState(3)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-slate-900 px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowMobileMenu(true)}>
          <Menu className="h-6 w-6 text-white" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image src="/images/amazon-mining-logo.png" alt="Amazon Mining" fill className="object-cover" />
          </div>
          <span className="hidden font-bold text-white md:inline-block">Amazon Mining</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5 text-white" />
            {unreadNotifications > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-medium text-white">
                {unreadNotifications}
              </span>
            )}
            <span className="sr-only">Notificações</span>
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="hidden text-white md:inline-flex" onClick={handleSignOut}>
          Sair
        </Button>
      </div>
      <MobileMenu open={showMobileMenu} onClose={() => setShowMobileMenu(false)} />
    </header>
  )
}
