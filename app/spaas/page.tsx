import type { Metadata } from "next"
import { SpaasHeroSection } from "@/components/spaas/spaas-hero-section"
import { SpaasFeatureShowcase } from "@/components/spaas/spaas-feature-showcase"
import { SpaasPricingSection } from "@/components/spaas/spaas-pricing-section"
import { SpaasApiIntegration } from "@/components/spaas/spaas-api-integration"
import { SpaasSustainabilityMetrics } from "@/components/spaas/spaas-sustainability-metrics"
import { SpaasGetStarted } from "@/components/spaas/spaas-get-started"
import { AppInstallBanner } from "@/components/app-install-banner"

export const metadata: Metadata = {
  title: "Smart Packaging as a Service (SPaaS) | Resend-It Platform",
  description:
    "Revolutionary Smart Packaging as a Service with IoT sensors, AI optimization, and blockchain verification. Reduce costs, track sustainability, and optimize your supply chain with Resend-It's SPaaS solution.",
  keywords: [
    "smart packaging",
    "packaging as a service",
    "IoT packaging",
    "sustainable packaging",
    "supply chain optimization",
    "packaging API",
    "reusable packaging",
    "packaging analytics",
  ],
}

export default function SpaasPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        <SpaasHeroSection />
        <SpaasFeatureShowcase />
        <SpaasApiIntegration />
        <SpaasSustainabilityMetrics />
        <SpaasPricingSection />
        <SpaasGetStarted />
      </main>
      <AppInstallBanner />
    </div>
  )
}
