import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RewardsSection } from "@/components/rewards-section"
import { CareerSection } from "@/components/career-section"
import { Footer } from "@/components/footer"
import { AuthModal } from "@/components/auth-modal"
import { ResidualBonusSection } from "@/components/residual-bonus-section"
import { TelegramPreLaunchBanner } from "@/components/telegram-pre-launch-banner"
import Image from "next/image"

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
          <AuthModal type="login" />
          <AuthModal type="register" />
        </div>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
        <RewardsSection />
        <CareerSection />
        <ResidualBonusSection />
        <TelegramPreLaunchBanner />
      </main>

      <Footer />
    </div>
  )
}
