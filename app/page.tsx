import { TelegramBanner } from "@/components/telegram-banner"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { RewardsSection } from "@/components/rewards-section"
import { CareerSection } from "@/components/career-section"
import { Footer } from "@/components/footer"
import { FloatingLogo } from "@/components/floating-logo"
import { AuthModal } from "@/components/auth-modal"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <TelegramBanner />
      <HeroSection />
      <FeaturesSection />
      <RewardsSection />
      <CareerSection />
      <Footer />
      <FloatingLogo />
      <AuthModal />
    </main>
  )
}
