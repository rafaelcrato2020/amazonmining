import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RewardsSection } from "@/components/rewards-section"
import { CareerSection } from "@/components/career-section"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-950 to-emerald-950">
      <header className="container mx-auto py-4 md:py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8 md:w-10 md:h-10">
            <Image
              src="/images/amazon-mining-logo.png"
              alt="Amazon Mining Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Amazon Mining
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <Button asChild variant="outline" className="border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/10">
            <Link href="/login">Entrar</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border-0"
          >
            <Link href="/register">Cadastrar</Link>
          </Button>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <RewardsSection />
        <CareerSection />
      </main>

      <Footer />
    </div>
  )
}
