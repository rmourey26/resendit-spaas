"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Network, ShieldCheck, Gift, PackageCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-background via-emerald-900/5 to-background">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] opacity-40 dark:opacity-20 animate-pulse"></div>
      <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-emerald-500/5 rounded-full blur-[120px] opacity-40 dark:opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
          <motion.div
            className="flex flex-col justify-center space-y-6"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
          >
            <motion.div variants={fadeIn}>
              <Badge variant="outline" className="py-1.5 px-4 border-primary/60 text-primary bg-primary/10 text-sm">
                <Zap className="w-4 h-4 mr-2" />
                AetherNet API v1 (Secure AI Agents) - Sign Up for Enterprise Trial
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl !leading-tight"
            >
              <span className="block">The Resend-It Ecosystem:</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">
                Ecommerce's Evolutionary Leap.
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              Resend-It's secure communication and data exchange backbone for networks of AI agents, mobile
              applications, and Internet of Things (IoT) devices anchored by a post quantum secure blockchain enables a
              new era of possibilities, intelligent ops orchestration, workflow automation, and business intelligence.
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="shadow-lg shadow-primary/30 hover:shadow-primary/40 transition-shadow"
              >
                <Link href="#ecosystem-showcase">
                  Explore The Resend-It Ecosystem <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/api-docs">Developer Portal</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-emerald-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative aspect-[4/3] bg-card p-1.5 rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/images/landing/aether-ecosystem-hero.png"
                alt="Resend-It Ecosystem: AI Agents, Blockchain, IoT, Smart Packaging, Rewards App"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">Resend-It on Aether</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm opacity-90">
                  <span className="flex items-center">
                    <Network className="w-4 h-4 mr-1.5 text-primary" /> Secure AI Agents
                  </span>
                  <span className="flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1.5 text-primary" /> Blockchain Trust
                  </span>
                  <span className="flex items-center">
                    <PackageCheck className="w-4 h-4 mr-1.5 text-primary" /> Smart Packaging
                  </span>
                  <span className="flex items-center">
                    <Gift className="w-4 h-4 mr-1.5 text-primary" /> Customer Rewards
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
