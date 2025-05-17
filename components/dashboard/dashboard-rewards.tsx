"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Award, ChevronRight } from "lucide-react"

export function DashboardRewards() {
  const referrals = [
    { name: "Usuário 1", level: 1, earnings: 0 },
    { name: "Usuário 2", level: 1, earnings: 0 },
    { name: "Usuário 3", level: 2, earnings: 0 },
    { name: "Usuário 4", level: 3, earnings: 0 },
  ]

  const totalEarnings = 0
  const nextReward = 500 // Próxima recompensa em $500
  const progress = (totalEarnings / nextReward) * 100

  return (
    <Card className="bg-slate-900 border-slate-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-white">Programa de Recompensas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-emerald-400" />
              <span className="text-sm font-medium text-white">Próxima Recompensa: Kit Mineradora</span>
            </div>
            <span className="text-sm text-slate-400">
              ${totalEarnings.toFixed(2)}/${nextReward}
            </span>
          </div>
          <Progress
            value={progress}
            className="h-2 bg-slate-800"
            indicatorClassName="bg-gradient-to-r from-emerald-600 to-cyan-600"
          />
          <p className="text-xs text-slate-400 mt-2">
            Você está {progress.toFixed(0)}% do caminho para sua próxima recompensa
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-white">Indicações Recentes</h4>
            <button className="text-xs text-emerald-400 flex items-center gap-1 hover:text-emerald-300">
              Ver todas <ChevronRight className="h-3 w-3" />
            </button>
          </div>

          <div className="space-y-3">
            {referrals.map((referral, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{referral.name}</p>
                  <p className="text-xs text-slate-400">Nível {referral.level}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-emerald-400">+$0.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
