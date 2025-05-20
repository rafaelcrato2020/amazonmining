import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Percent } from "lucide-react"

export function ResidualBonusSection() {
  return (
    <section className="py-16 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            BÔNUS RESIDUAL – Ganhe Mesmo Sem Trabalhar!
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Nosso sistema de bônus residual permite que você ganhe dinheiro mesmo quando não está trabalhando.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-red-500/20 text-red-400 p-2 rounded-full">
                  <Percent className="h-5 w-5" />
                </span>
                V1
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">Sem bônus residual. Você não ganha nada com a rede.</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-amber-500/20 text-amber-400 p-2 rounded-full">
                  <Percent className="h-5 w-5" />
                </span>
                V2
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Ganhe 10% de tudo que seu indicado direto investir! Transforme suas conexões em lucro diário!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-800 border-slate-700 hover:border-emerald-500/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-400 p-2 rounded-full">
                  <Percent className="h-5 w-5" />
                </span>
                V3
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-400 mb-4">
                Ganhos em DOBRO! 10% no 1º nível, +10% no 2º nível, +1% no 3º nível. Imagine ganhar enquanto outras
                pessoas trabalham — até 3 níveis abaixo de você!
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-semibold text-emerald-400 mb-4">PRÉ-LANÇAMENTO EM BREVE!</p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-4">
            Essa é a sua chance de entrar no topo e aproveitar os melhores bônus desde o início. Quem entra antes, lucra
            mais. Prepare-se para o maior lançamento do ano!
          </p>
          <p className="text-slate-300">
            Quer ativar seu bônus residual assim que abrir? Fale com o suporte e garanta sua posição AGORA!
          </p>
        </div>
      </div>
    </section>
  )
}
