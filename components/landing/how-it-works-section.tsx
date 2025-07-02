"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Cpu, BarChart3, ShieldCheck, Bot, Router } from "lucide-react"

const steps = [
  {
    icon: <Router className="h-10 w-10 text-primary" />,
    title: "Integrate & Deploy AI Agents",
    description:
      "Connect your systems, IoT devices, robots, or data sources to AetherNet. Deploy pre-built or custom AI agents to automate tasks, gather intelligence, and optimize operations across any industry.",
    image: "/images/landing/workflow-iot-data-ingestion.png",
    alt: "Businesses connecting IoT devices and deploying AI agents on AetherNet",
  },
  {
    icon: <Cpu className="h-10 w-10 text-primary" />,
    title: "Intelligent Orchestration & Blockchain Verification",
    description:
      "AetherNet agents securely communicate, analyze data, and execute complex workflows. Critical events, transactions, and sustainability metrics are immutably recorded on AetherChain for ultimate trust and transparency.",
    image: "/images/landing/workflow-ai-blockchain-synergy.png",
    alt: "AetherNet AI Agents processing data, verified by AetherChain",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Actionable Insights & Verifiable Impact",
    description:
      "Access real-time analytics, predictive insights, and automated decision support through the Resend-It Business Optimization Engine. Track measurable ROI and sustainability impact (e.g., for smart reusable packaging) with unparalleled accuracy.",
    image: "/images/landing/workflow-roi-sustainability-dashboard.png",
    alt: "Dashboard showing ROI and sustainability insights from the Aether platform",
  },
]

export function HowItWorksSection() {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
            The Aether Ecosystem Workflow: Intelligence, Trust, Impact
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience a seamless flow from data ingestion and AI-driven orchestration to verifiable outcomes and
            maximized business value.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-10 md:gap-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              variants={itemVariants}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-12 p-6 bg-card rounded-xl shadow-lg hover:shadow-primary/10 transition-shadow`}
            >
              <div className="md:w-1/2 relative aspect-video w-full overflow-hidden rounded-lg border">
                <Image src={step.image || "/placeholder.svg"} alt={step.alt} fill className="object-cover" />
              </div>
              <div className="md:w-1/2 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-full">{step.icon}</div>
                  <h3 className="text-2xl font-semibold">{step.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                {index === 0 && (
                  <div className="flex items-center text-sm text-primary pt-2">
                    <Bot className="w-4 h-4 mr-2" /> AetherNet API v1 (Secure AI Agents) - Launching Soon
                  </div>
                )}
                {index === 1 && (
                  <div className="flex items-center text-sm text-primary pt-2">
                    <ShieldCheck className="w-4 h-4 mr-2" /> AetherChain (Trust Layer) - Launching Q3 2025
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
