"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Check, Trash2, BellOff } from "lucide-react"
import { createClientComponentClient } from "@/lib/supabase"
import { formatDate } from "@/lib/utils"

type Notification = {
  id: string
  user_id: string
  title: string
  message: string
  type: "transaction" | "system" | "reward" | "referral"
  read: boolean
  created_at: string
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [notificationSettings, setNotificationSettings] = useState({
    email_transactions: true,
    email_rewards: true,
    email_referrals: true,
    email_system: true,
    push_enabled: false,
  })
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (!session) return

        // Buscar notificações
        const { data: notificationsData } = await supabase
          .from("notifications")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false })
          .limit(50)

        if (notificationsData) {
          setNotifications(notificationsData)
        }

        // Buscar configurações de notificação
        const { data: settings } = await supabase
          .from("notification_settings")
          .select("*")
          .eq("user_id", session.user.id)
          .single()

        if (settings) {
          setNotificationSettings(settings)
        }
      } catch (error) {
        console.error("Erro ao buscar notificações:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [supabase])

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").update({ read: true }).eq("id", id)

      if (!error) {
        setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
      }
    } catch (error) {
      console.error("Erro ao marcar notificação como lida:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("user_id", session.user.id)
        .eq("read", false)

      if (!error) {
        setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
      }
    } catch (error) {
      console.error("Erro ao marcar todas notificações como lidas:", error)
    }
  }

  const deleteNotification = async (id: string) => {
    try {
      const { error } = await supabase.from("notifications").delete().eq("id", id)

      if (!error) {
        setNotifications((prev) => prev.filter((notif) => notif.id !== id))
      }
    } catch (error) {
      console.error("Erro ao excluir notificação:", error)
    }
  }

  const updateNotificationSettings = async (setting: string, value: boolean) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) return

      const { error } = await supabase
        .from("notification_settings")
        .update({ [setting]: value })
        .eq("user_id", session.user.id)

      if (!error) {
        setNotificationSettings((prev) => ({
          ...prev,
          [setting]: value,
        }))
      }
    } catch (error) {
      console.error("Erro ao atualizar configurações de notificação:", error)
    }
  }

  const unreadCount = notifications.filter((n) => !n.read).length
  const transactionNotifications = notifications.filter((n) => n.type === "transaction")
  const rewardNotifications = notifications.filter((n) => n.type === "reward")
  const referralNotifications = notifications.filter((n) => n.type === "referral")
  const systemNotifications = notifications.filter((n) => n.type === "system")

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-xl font-bold text-white">Notificações</CardTitle>
          {unreadCount > 0 && (
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-medium text-white">
              {unreadCount}
            </span>
          )}
        </div>
        <Bell className="h-5 w-5 text-emerald-500" />
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid w-full max-w-md grid-cols-5 bg-slate-800">
              <TabsTrigger value="all" className="text-xs data-[state=active]:bg-slate-700">
                Todas
              </TabsTrigger>
              <TabsTrigger value="transactions" className="text-xs data-[state=active]:bg-slate-700">
                Transações
              </TabsTrigger>
              <TabsTrigger value="rewards" className="text-xs data-[state=active]:bg-slate-700">
                Recompensas
              </TabsTrigger>
              <TabsTrigger value="referrals" className="text-xs data-[state=active]:bg-slate-700">
                Indicações
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs data-[state=active]:bg-slate-700">
                Config
              </TabsTrigger>
            </TabsList>

            <Button
              variant="outline"
              size="sm"
              className="ml-2 border-slate-700 bg-slate-800 text-white hover:bg-slate-700"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="mr-1 h-4 w-4" />
              Marcar todas
            </Button>
          </div>

          <TabsContent value="all" className="mt-0">
            {renderNotificationList(notifications, markAsRead, deleteNotification, loading)}
          </TabsContent>

          <TabsContent value="transactions" className="mt-0">
            {renderNotificationList(transactionNotifications, markAsRead, deleteNotification, loading)}
          </TabsContent>

          <TabsContent value="rewards" className="mt-0">
            {renderNotificationList(rewardNotifications, markAsRead, deleteNotification, loading)}
          </TabsContent>

          <TabsContent value="referrals" className="mt-0">
            {renderNotificationList(referralNotifications, markAsRead, deleteNotification, loading)}
          </TabsContent>

          <TabsContent value="settings" className="mt-0">
            <div className="rounded-lg bg-slate-800 p-4">
              <h3 className="text-lg font-medium text-white mb-4">Configurações de Notificação</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Notificações por E-mail</h4>
                    <p className="text-xs text-slate-400">Receba notificações no seu e-mail</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email_transactions}
                        onChange={(e) => updateNotificationSettings("email_transactions", e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500"
                      />
                      <span className="text-xs text-slate-400">Transações</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email_rewards}
                        onChange={(e) => updateNotificationSettings("email_rewards", e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500"
                      />
                      <span className="text-xs text-slate-400">Recompensas</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email_referrals}
                        onChange={(e) => updateNotificationSettings("email_referrals", e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500"
                      />
                      <span className="text-xs text-slate-400">Indicações</span>
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={notificationSettings.email_system}
                        onChange={(e) => updateNotificationSettings("email_system", e.target.checked)}
                        className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500"
                      />
                      <span className="text-xs text-slate-400">Sistema</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-white">Notificações Push</h4>
                    <p className="text-xs text-slate-400">Receba notificações no navegador</p>
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={notificationSettings.push_enabled}
                      onChange={(e) => updateNotificationSettings("push_enabled", e.target.checked)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-emerald-500"
                    />
                    <span className="text-xs text-slate-400">Ativar</span>
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

function renderNotificationList(
  notifications: Notification[],
  markAsRead: (id: string) => void,
  deleteNotification: (id: string) => void,
  loading: boolean,
) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-start justify-between rounded-lg bg-slate-800 p-4">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 animate-pulse rounded-full bg-slate-700"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-slate-700"></div>
                <div className="h-3 w-48 animate-pulse rounded bg-slate-700"></div>
                <div className="h-3 w-24 animate-pulse rounded bg-slate-700"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <BellOff className="h-12 w-12 text-slate-700" />
        <p className="mt-4 text-center text-slate-500">Nenhuma notificação encontrada</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start justify-between rounded-lg ${
            notification.read ? "bg-slate-800" : "bg-slate-800/80 border-l-2 border-emerald-500"
          } p-4`}
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                notification.type === "transaction"
                  ? "bg-emerald-500/20 text-emerald-500"
                  : notification.type === "reward"
                    ? "bg-amber-500/20 text-amber-500"
                    : notification.type === "referral"
                      ? "bg-blue-500/20 text-blue-500"
                      : "bg-slate-500/20 text-slate-500"
              }`}
            >
              {notification.type === "transaction" && <Bell className="h-5 w-5" />}
              {notification.type === "reward" && <Bell className="h-5 w-5" />}
              {notification.type === "referral" && <Bell className="h-5 w-5" />}
              {notification.type === "system" && <Bell className="h-5 w-5" />}
            </div>
            <div>
              <p className="font-medium text-white">{notification.title}</p>
              <p className="text-sm text-slate-400">{notification.message}</p>
              <p className="mt-1 text-xs text-slate-500">{formatDate(notification.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!notification.read && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white"
                onClick={() => markAsRead(notification.id)}
              >
                <Check className="h-4 w-4" />
                <span className="sr-only">Marcar como lida</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-white"
              onClick={() => deleteNotification(notification.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Excluir</span>
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
