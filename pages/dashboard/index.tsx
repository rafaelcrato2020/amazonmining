"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { createClientComponentClient } from "@/lib/supabase"

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Verificar autenticação
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push("/login")
      }
    }

    checkAuth()
  }, [router, supabase])

  return (
    <DashboardLayout>
      <DashboardOverview />
    </DashboardLayout>
  )
}
