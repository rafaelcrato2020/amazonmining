"use client"

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"

export default function DashboardPage() {
  return (
    <div className="flex flex-col w-full">
      <DashboardHeader />
      <DashboardOverview />
    </div>
  )
}
