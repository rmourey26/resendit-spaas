"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Zap, Shield, BarChart3, Recycle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

export function SpaasHeroSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-background via-green-900/5 to-background">
      <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[120px] opacity-40 dark:opacity-20 animate-pulse"></div>
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
              <Badge
                variant="outline"
                className="py-1.5 px-4 border-green-600/60 text-green-600 bg-green-600/10 text-sm"
              >
                <Package className="w-4 h-4 mr-2" />
                Smart Packaging as a Service - Now Available
              </Badge>
            </motion.div>
            <motion.h1
              variants={fadeIn}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl !leading-tight"
            >
              <span className="block">Smart Packaging</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                as a Service
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="max-w-2xl text-lg text-muted-foreground md:text-xl">
              Revolutionary packaging solution with IoT sensors, AI optimization, and blockchain verification. Reduce
              costs by up to 40%, track real-time sustainability metrics, and optimize your entire supply chain with our
              intelligent packaging platform.
            </motion.p>

            <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">40%</div>
                <div className="text-sm text-muted-foreground">Cost Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">200+</div>
                <div className="text-sm text-muted-foreground">Reuse Cycles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">75%</div>
                <div className="text-sm text-muted-foreground">CO₂ Reduction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-muted-foreground">IoT Monitoring</div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                asChild
                className="bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/30 hover:shadow-green-600/40 transition-shadow"
              >
                <Link href="#get-started">
                  Start Your SPaaS Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#api-integration">View API Documentation</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 0.4 } }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <div className="relative aspect-[4/3] bg-card p-1.5 rounded-xl shadow-2xl overflow-hidden">
              <Image
                src="/images/landing/smart-packaging-service.png"
                alt="Smart Packaging as a Service - IoT enabled reusable packaging"
                fill
                className="object-cover rounded-lg"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-bold">SPaaS Platform</h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm opacity-90">
                  <span className="flex items-center">
                    <Zap className="w-4 h-4 mr-1.5 text-green-400" /> IoT Sensors
                  </span>
                  <span className="flex items-center">
                    <Shield className="w-4 h-4 mr-1.5 text-green-400" /> Blockchain Verified
                  </span>
                  <span className="flex items-center">
                    <BarChart3 className="w-4 h-4 mr-1.5 text-green-400" /> AI Optimized
                  </span>
                  <span className="flex items-center">
                    <Recycle className="w-4 h-4 mr-1.5 text-green-400" /> Sustainable
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
