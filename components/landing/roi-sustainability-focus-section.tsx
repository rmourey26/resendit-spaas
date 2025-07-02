"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { TrendingUp, Recycle, BarChart2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function RoiSustainabilityFocusSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Measure What Matters: ROI & Verifiable Sustainability
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            In today&apos;s conscious market, proving the value of sustainable initiatives is paramount. The Resend-It
            Ecosystem makes it easy to quantify the ROI of reusable packaging and other green products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl group"
          >
            <Image
              src="/images/landing/workflow-roi-sustainability-dashboard.png"
              alt="Dashboard showing ROI and Sustainability Metrics for Reusable Packaging"
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-xl font-semibold">Verifiable Impact</h3>
              <p className="text-sm opacity-90 mt-1">AetherNet & AetherChain powered insights.</p>
            </div>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                icon: <TrendingUp className="h-7 w-7 text-primary" />,
                title: "Maximize Reusable Packaging ROI",
                description:
                  "Track asset lifecycle, optimize reverse logistics, and quantify cost savings with unparalleled precision using AetherNet's IoT integration and AetherChain's immutable ledger.",
              },
              {
                icon: <Recycle className="h-7 w-7 text-primary" />,
                title: "Verifiable Sustainability Metrics",
                description:
                  "Go beyond estimates. Our platform provides auditable data on CO2 reduction, waste diversion, and resource efficiency, crucial for ESG reporting and brand trust.",
              },
              {
                icon: <BarChart2 className="h-7 w-7 text-primary" />,
                title: "Data-Driven Decision Making",
                description:
                  "Leverage AI-powered analytics to identify optimization opportunities, enhance product design, and demonstrate the tangible benefits of your sustainability investments.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="flex items-start gap-4 p-4 bg-card/50 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex-shrink-0 mt-1">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              variants={cardVariants}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="pt-4"
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact-sales">
                  Learn How to Measure Your Impact <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
