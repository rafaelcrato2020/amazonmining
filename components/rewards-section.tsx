"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Percent } from "lucide-react"

export function RewardsSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-slate-950 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-300 to-cyan-300">
            Planos de Recompensa
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Como divulgador da Amazon Mining, você pode ganhar recompensas através das suas indicações e bônus
            residuais.
          </p>
        </motion.div>

        <Tabs defaultValue="referrals" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 bg-slate-900 rounded-lg p-1 mb-8">
            <TabsTrigger
              value="referrals"
              className="rounded-md py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              Comissões de Indicação
            </TabsTrigger>
            <TabsTrigger
              value="residual"
              className="rounded-md py-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white"
            >
              <Percent className="mr-2 h-4 w-4" />
              Bônus Residual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="referrals" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white text-xl">Plano V1</span>
                      <span className="text-xs bg-slate-800 text-slate-300 py-1 px-2 rounded-full">Iniciante</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Níveis de comissão:</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">10%</div>
                          <div className="text-xs text-slate-500">Nível 1</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 2</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 3</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-slate-500 mr-2" />
                        <span className="text-sm text-slate-400">Sem requisitos mínimos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white text-xl">Plano V2</span>
                      <span className="text-xs bg-emerald-900/50 text-emerald-400 py-1 px-2 rounded-full">
                        Intermediário
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Níveis de comissão:</div>
                      <div className="grid grid-cols-4 gap-2">
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">10%</div>
                          <div className="text-xs text-slate-500">Nível 1</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 2</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 3</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 4</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-sm text-slate-400">5 indicados ativos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white text-xl">Plano V3</span>
                      <span className="text-xs bg-cyan-900/50 text-cyan-400 py-1 px-2 rounded-full">Avançado</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Níveis de comissão:</div>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">10%</div>
                          <div className="text-xs text-slate-500">Nível 1</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 2</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 3</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 4</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-2 text-center">
                          <div className="text-emerald-400 font-bold">5%</div>
                          <div className="text-xs text-slate-500">Nível 5</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-sm text-slate-400">10 indicados ativos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="residual" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white text-xl">Plano V1</span>
                      <span className="text-xs bg-slate-800 text-slate-300 py-1 px-2 rounded-full">Iniciante</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Bônus Residual:</div>
                      <div className="bg-slate-800 rounded-lg p-4 text-center">
                        <div className="text-slate-400 font-bold text-xl">Não disponível</div>
                        <div className="text-xs text-slate-500 mt-1">Atualize para V2 ou V3</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-slate-500 mr-2" />
                        <span className="text-sm text-slate-400">Sem requisitos mínimos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white text-xl">Plano V2</span>
                      <span className="text-xs bg-emerald-900/50 text-emerald-400 py-1 px-2 rounded-full">
                        Intermediário
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Bônus Residual:</div>
                      <div className="bg-slate-800 rounded-lg p-4 text-center">
                        <div className="text-emerald-400 font-bold text-xl">10%</div>
                        <div className="text-xs text-slate-500 mt-1">No primeiro nível</div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-emerald-500 mr-2" />
                        <span className="text-sm text-slate-400">5 indicados ativos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <Card className="bg-slate-900 border-slate-800 overflow-hidden">
                  <div className="h-2 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="text-white text-xl">Plano V3</span>
                      <span className="text-xs bg-cyan-900/50 text-cyan-400 py-1 px-2 rounded-full">Avançado</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-sm text-slate-400">Bônus Residual:</div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-slate-800 rounded-lg p-3 text-center">
                          <div className="text-cyan-400 font-bold text-xl">1%</div>
                          <div className="text-xs text-slate-500 mt-1">Primeiro nível</div>
                        </div>
                        <div className="bg-slate-800 rounded-lg p-3 text-center">
                          <div className="text-cyan-400 font-bold text-xl">10%</div>
                          <div className="text-xs text-slate-500 mt-1">Segundo nível</div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-slate-800">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-cyan-500 mr-2" />
                        <span className="text-sm text-slate-400">10 indicados ativos</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 max-w-3xl mx-auto"
            >
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/10 rounded-full p-3">
                  <Percent className="h-6 w-6 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">O que é o Bônus Residual?</h3>
                  <p className="text-slate-400">
                    O Bônus Residual é um benefício adicional que você recebe com base no seu nível de plano. Este bônus
                    é calculado sobre os rendimentos dos seus indicados, proporcionando uma fonte adicional de renda
                    passiva. Quanto mais alto o seu nível, maiores são os benefícios.
                  </p>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">Rentabilidade</h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            A rentabilidade é fixa em 4,5% até completar 100 dias, com pagamentos realizados de segunda a sábado.
          </p>

          <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-emerald-400 text-3xl font-bold">4.5%</div>
                <div className="text-slate-400 mt-2">Rentabilidade fixa</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 text-3xl font-bold">100</div>
                <div className="text-slate-400 mt-2">Dias de contrato</div>
              </div>
              <div className="text-center">
                <div className="text-emerald-400 text-3xl font-bold">6%</div>
                <div className="text-slate-400 mt-2">Taxa de saque</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
