import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import { ClientProviders } from "@/components/client-providers"
import { SiteHeader } from "@/components/site-header"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  title: {
    default: "Resend-It Ecosystem",
    template: "%s | Resend-It Ecosystem",
  },
  description:
    "Sustainable, continuous, universal business optimization with unified AI, blockchain, and IoT ecosystem that delivers unprecedented efficiency, measurable ROI, and verifiable sustainability.",
  generator: "platform.resend-it.com",
  manifest: "/manifest.json",
  applicationName: "Resend-It Ecosystem",
  appleWebApp: {
    capable: true,
    title: "Resend-It Ecosystem",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Resend-It Ecosystem",
    title: {
      default: "Resend-It Ecosystem",
      template: "%s | Resend-It Ecosystem",
    },
    description:
      "Sustainable, continuous, universal business optimization with unified AI, blockchain, and IoT ecosystem that delivers unprecedented efficiency, measurable ROI, and verifiable sustainability.",
    url: "https://platform.resend-it.com", // Replace with your actual domain
    images: [
      {
        url: "/images/landing/aether-ecosystem-hero.png",
        width: 1200,
        height: 630,
        alt: "Resend-It Ecosystem - Unified AI, Blockchain, and IoT Platform",
        type: "image/png",
      },
      {
        url: "/images/landing/hero-platform-preview.png",
        width: 1200,
        height: 630,
        alt: "Resend-It Platform Preview - Business Optimization Dashboard",
        type: "image/png",
      },
      {
        url: "/images/landing/feature-ai-agent-network.png",
        width: 1200,
        height: 630,
        alt: "AetherNet - Secure AI Agent Network",
        type: "image/png",
      },
      {
        url: "/images/landing/feature-blockchain-integration.png",
        width: 1200,
        height: 630,
        alt: "AetherChain - High-Performance Rust Blockchain",
        type: "image/png",
      },
      {
        url: "/images/landing/resendit-optimization-engine.png",
        width: 1200,
        height: 630,
        alt: "Business Optimization Engine - ROI and Sustainability Metrics",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "Resend-It Ecosystem",
      template: "%s | Resend-It Ecosystem",
    },
    description:
      "Sustainable, continuous, universal business optimization with unified AI, blockchain, and IoT ecosystem that delivers unprecedented efficiency, measurable ROI, and verifiable sustainability.",
    images: [
      {
        url: "/images/landing/aether-ecosystem-hero.png",
        alt: "Resend-It Ecosystem - Unified AI, Blockchain, and IoT Platform",
      },
    ],
    creator: "@ResenditEco", // Optional: Replace with your actual Twitter handle
    site: "@ResenditEco", // Optional: Replace with your actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/images/resendit-icon.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/images/resendit-icon.png",
    apple: [
      {
        url: "/images/resendit-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  verification: {
    // Optional: Add verification tokens for search engines
    // google: "your-google-verification-token",
    // yandex: "your-yandex-verification-token",
    // yahoo: "your-yahoo-verification-token",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0A" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.variable)}>
        <ClientProviders>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}
