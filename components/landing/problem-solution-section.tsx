"use client"

import { motion } from "framer-motion"
import { AlertTriangle, NetworkIcon as NetworkOff, ShieldOff, Layers } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const problems = [
  {
    icon: <NetworkOff className="h-8 w-8 text-amber-500" />,
    title: "Siloed Intelligence & Data",
    description:
      "Disconnected systems and proprietary AI hinder true interoperability, limiting optimization potential and creating security gaps.",
  },
  {
    icon: <AlertTriangle className="h-8 w-8 text-destructive" />,
    title: "Lack of Verifiable Performance",
    description:
      "Opaque operations make it difficult to prove ROI, track sustainability accurately, and build genuine stakeholder trust.",
  },
  {
    icon: <ShieldOff className="h-8 w-8 text-blue-500" />,
    title: "Inefficient Resource Management",
    description:
      "Suboptimal asset utilization, especially for physical goods like packaging, leads to increased costs and environmental impact.",
  },
]

const solution = {
  icon: <Layers className="h-10 w-10 text-primary" />,
  title: "The Aether Ecosystem: Unified Intelligence, Verifiable Impact",
  description:
    "The Resend-It Ecosystem, built on AetherNet and AetherChain, provides a unified foundation for any industry. AetherNet's secure AI agents (optimally designed for IoT, robotics, autonomous vehicles, drones) standardize intelligent communication. AetherChain offers an immutable trust layer. Together with our Business Optimization Engine, Smart Reusable Packaging-as-a-Service, and Customer Rewards App, we deliver unprecedented efficiency, measurable ROI, and verifiable sustainability.",
}

export function ProblemSolutionSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
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
        >
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl">
            Transforming Industries with Foundational Technology
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-center max-w-3xl mx-auto">
            Businesses globally face challenges in integrating AI, ensuring trust, and optimizing resources. The Aether
            Ecosystem provides the architectural breakthrough for next-generation enterprise solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="h-full shadow-lg hover:shadow-xl transition-shadow bg-card">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {problem.icon}
                    <CardTitle>{problem.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 bg-card border rounded-xl p-8 md:p-12 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-shrink-0 p-4 bg-primary/10 rounded-full">{solution.icon}</div>
            <div>
              <h3 className="text-2xl font-semibold text-primary">{solution.title}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{solution.description}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
