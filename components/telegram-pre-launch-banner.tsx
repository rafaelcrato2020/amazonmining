import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"

export function TelegramPreLaunchBanner() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-900/90" />
        <img
          src="/images/mining-servers-futuristic-blue.jpeg"
          alt="Mining Servers"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            ATENÇÃO
          </h2>

          <p className="text-xl text-white mb-6">
            Uma nova potência está prestes a ser lançada. Amazon Mining chega para transformar a forma como você gera
            renda online.
          </p>

          <ul className="text-left text-slate-300 space-y-2 mb-8 max-w-lg mx-auto">
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              Rendimentos diários reais.
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              Sistema de mineração automatizada.
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              Bônus por indicação com múltiplos níveis.
            </li>
            <li className="flex items-start">
              <span className="text-emerald-400 mr-2">•</span>
              Crescimento escalável e sustentável.
            </li>
          </ul>

          <p className="text-slate-300 mb-6">
            Se você está cansado de promessas vazias, aqui é diferente. Você verá resultados de verdade.
          </p>

          <p className="text-emerald-400 font-semibold mb-2">Pré-lançamento em breve.</p>

          <p className="text-slate-300 mb-8">
            Os primeiros a entrar terão acesso exclusivo às melhores posições e maiores lucros. Acesse o canal oficial
            agora e garanta sua vaga antes da abertura pública. Quem chega primeiro, lucra mais.
          </p>

          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Link
              href="https://t.me/amazommining"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Send className="h-5 w-5" />
              Entrar no Canal do Telegram
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
