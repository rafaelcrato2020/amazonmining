"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, Mail, Lock, Bell, Shield, Camera, Check, Loader2 } from "lucide-react"
import { useSidebar } from "@/contexts/sidebar-context"
import { cn } from "@/lib/utils"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function SettingsPage() {
  const { isOpen } = useSidebar()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Estados para os formulários
  const [profileData, setProfileData] = useState({
    firstName: "Usuário",
    lastName: "",
    email: "usuario@exemplo.com",
    phone: "",
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailDeposits: true,
    emailWithdrawals: true,
    emailRewards: true,
    emailEarnings: false,
    pushDeposits: true,
    pushWithdrawals: true,
    pushRewards: true,
    pushEarnings: true,
  })

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // Carregar avatar do localStorage ao iniciar
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar")
    if (savedAvatar) {
      setAvatarPreview(savedAvatar)
    }
  }, [])

  // Manipuladores de eventos
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setAvatarPreview(result)
        // Salvar no localStorage para persistir entre páginas
        localStorage.setItem("userAvatar", result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSaveProfile = () => {
    setIsLoading(true)
    // Simulando uma chamada de API
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  const handleSavePassword = () => {
    setIsLoading(true)
    // Simulando uma chamada de API
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  const handleSaveNotifications = () => {
    setIsLoading(true)
    // Simulando uma chamada de API
    setTimeout(() => {
      setIsLoading(false)
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 1500)
  }

  const handleRemoveAvatar = () => {
    setAvatarPreview(null)
    localStorage.removeItem("userAvatar")
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <DashboardSidebar />
      <div className={cn("flex-1 transition-all duration-300 ease-in-out", isOpen ? "md:ml-64" : "md:ml-20")}>
        <DashboardHeader />
        <main className="p-4 md:p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white mb-2">Configurações</h1>
            <p className="text-slate-400">Gerencie suas informações pessoais, segurança e preferências.</p>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800">
              <TabsTrigger value="profile">Perfil</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>

            {/* Aba de Perfil */}
            <TabsContent value="profile" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Card de Avatar */}
                <Card className="bg-slate-900 border-slate-800 lg:col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Foto de Perfil</CardTitle>
                    <CardDescription>Sua foto será exibida na dashboard e em seu perfil.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center">
                      <div className="relative w-32 h-32 mb-4 cursor-pointer group" onClick={handleAvatarClick}>
                        <Avatar className="w-32 h-32 border-4 border-slate-800">
                          <AvatarImage src={avatarPreview || "/images/avatar-placeholder.png"} alt="Avatar" />
                          <AvatarFallback className="text-4xl bg-emerald-500/20 text-emerald-400">
                            {profileData.firstName.charAt(0)}
                            {profileData.lastName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                          <Camera className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarChange}
                      />
                      <Button
                        variant="outline"
                        className="w-full border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                        onClick={handleAvatarClick}
                      >
                        Alterar Foto
                      </Button>

                      {avatarPreview && (
                        <Button variant="destructive" className="w-full mt-2" onClick={handleRemoveAvatar}>
                          Remover Foto
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Card de Informações Pessoais */}
                <Card className="bg-slate-900 border-slate-800 lg:col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Informações Pessoais</CardTitle>
                    <CardDescription>Atualize suas informações de contato e perfil.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">Nome</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              id="firstName"
                              name="firstName"
                              value={profileData.firstName}
                              onChange={handleProfileChange}
                              className="pl-9 bg-slate-800 border-slate-700"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Sobrenome</Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            value={profileData.lastName}
                            onChange={handleProfileChange}
                            className="bg-slate-800 border-slate-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            className="pl-9 bg-slate-800 border-slate-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="bg-slate-800 border-slate-700"
                        />
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                        onClick={handleSaveProfile}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Salvando...
                          </>
                        ) : isSaved ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Salvo com sucesso!
                          </>
                        ) : (
                          "Salvar Alterações"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba de Segurança */}
            <TabsContent value="security" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Card de Alteração de Senha */}
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Alterar Senha</CardTitle>
                    <CardDescription>Atualize sua senha para manter sua conta segura.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Senha Atual</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            className="pl-9 bg-slate-800 border-slate-700"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">Nova Senha</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="bg-slate-800 border-slate-700"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="bg-slate-800 border-slate-700"
                        />
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                        onClick={handleSavePassword}
                        disabled={
                          isLoading ||
                          !passwordData.currentPassword ||
                          !passwordData.newPassword ||
                          passwordData.newPassword !== passwordData.confirmPassword
                        }
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Alterando...
                          </>
                        ) : isSaved ? (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Senha alterada!
                          </>
                        ) : (
                          "Alterar Senha"
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Card de Segurança da Conta */}
                <Card className="bg-slate-900 border-slate-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium text-white">Segurança da Conta</CardTitle>
                    <CardDescription>Configure opções adicionais de segurança para sua conta.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-white">Verificação em duas etapas</Label>
                          <p className="text-xs text-slate-400">Adicione uma camada extra de segurança à sua conta.</p>
                        </div>
                        <Switch />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-white">Notificações de login</Label>
                          <p className="text-xs text-slate-400">
                            Receba alertas quando sua conta for acessada em um novo dispositivo.
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label className="text-white">Confirmação para saques</Label>
                          <p className="text-xs text-slate-400">Exigir confirmação por email para todos os saques.</p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="pt-4">
                        <Button
                          variant="outline"
                          className="w-full border-red-800/30 text-red-400 hover:bg-red-900/20 hover:text-red-300"
                        >
                          <Shield className="mr-2 h-4 w-4" />
                          Verificar Dispositivos Conectados
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Aba de Notificações */}
            <TabsContent value="notifications" className="mt-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium text-white">Preferências de Notificação</CardTitle>
                  <CardDescription>Escolha como e quando deseja ser notificado.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-slate-400" />
                        Notificações por Email
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailDeposits" className="flex-1 cursor-pointer">
                            Depósitos confirmados
                          </Label>
                          <Switch
                            id="emailDeposits"
                            checked={notificationSettings.emailDeposits}
                            onCheckedChange={(checked) => handleNotificationChange("emailDeposits", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailWithdrawals" className="flex-1 cursor-pointer">
                            Saques processados
                          </Label>
                          <Switch
                            id="emailWithdrawals"
                            checked={notificationSettings.emailWithdrawals}
                            onCheckedChange={(checked) => handleNotificationChange("emailWithdrawals", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailRewards" className="flex-1 cursor-pointer">
                            Comissões recebidas
                          </Label>
                          <Switch
                            id="emailRewards"
                            checked={notificationSettings.emailRewards}
                            onCheckedChange={(checked) => handleNotificationChange("emailRewards", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailEarnings" className="flex-1 cursor-pointer">
                            Rendimentos diários
                          </Label>
                          <Switch
                            id="emailEarnings"
                            checked={notificationSettings.emailEarnings}
                            onCheckedChange={(checked) => handleNotificationChange("emailEarnings", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-white font-medium mb-3 flex items-center">
                        <Bell className="mr-2 h-4 w-4 text-slate-400" />
                        Notificações Push
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="pushDeposits" className="flex-1 cursor-pointer">
                            Depósitos confirmados
                          </Label>
                          <Switch
                            id="pushDeposits"
                            checked={notificationSettings.pushDeposits}
                            onCheckedChange={(checked) => handleNotificationChange("pushDeposits", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="pushWithdrawals" className="flex-1 cursor-pointer">
                            Saques processados
                          </Label>
                          <Switch
                            id="pushWithdrawals"
                            checked={notificationSettings.pushWithdrawals}
                            onCheckedChange={(checked) => handleNotificationChange("pushWithdrawals", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="pushRewards" className="flex-1 cursor-pointer">
                            Comissões recebidas
                          </Label>
                          <Switch
                            id="pushRewards"
                            checked={notificationSettings.pushRewards}
                            onCheckedChange={(checked) => handleNotificationChange("pushRewards", checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="pushEarnings" className="flex-1 cursor-pointer">
                            Rendimentos diários
                          </Label>
                          <Switch
                            id="pushEarnings"
                            checked={notificationSettings.pushEarnings}
                            onCheckedChange={(checked) => handleNotificationChange("pushEarnings", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500"
                      onClick={handleSaveNotifications}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : isSaved ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Preferências salvas!
                        </>
                      ) : (
                        "Salvar Preferências"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
