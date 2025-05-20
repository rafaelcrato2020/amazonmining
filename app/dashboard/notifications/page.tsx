"use client"

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Notifications } from "@/components/dashboard/notifications"

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Notificações</h1>
          <p className="text-slate-400 mt-1">Gerencie suas notificações e preferências</p>
        </div>

        <Notifications />
      </div>
    </DashboardLayout>
  )
}
