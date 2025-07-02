import type { Metadata } from "next"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section"
import { RoiSustainabilityFocusSection } from "@/components/landing/roi-sustainability-focus-section"
import { EcosystemShowcase } from "@/components/landing/landing-feature-showcase"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { DeveloperApiSection } from "@/components/landing/developer-api-section"
import { CtaSection } from "@/components/landing/cta-section"
import { AppInstallBanner } from "@/components/app-install-banner"
import { PWARegister } from "@/components/pwa-register"

export const metadata: Metadata = {
  title: "Resend-It Ecosystem: Ecommerce's Evolutionary Leap with Verifiable ROI & Sustainability",
  description:
    "Revolutionize any industry with the Resend-It Ecosystem, powered by AetherNet (Secure AI Agents) and AetherChain (Rust Blockchain). Optimize operations, track verifiable sustainability for reusable packaging, and engage customers.",
}

export default function EcosystemPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <HeroSection />
        <ProblemSolutionSection />
        <RoiSustainabilityFocusSection />
        <EcosystemShowcase />
        <HowItWorksSection />
        <DeveloperApiSection />
        <CtaSection />
      </main>

      <AppInstallBanner />
      <PWARegister />
    </div>
  )
}
