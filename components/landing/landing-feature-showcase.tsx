"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ShieldCheck,
  Cpu,
  Blocks,
  Zap,
  Recycle,
  PackageCheck,
  BarChart3,
  Users,
  Wrench,
  ChevronRight,
  ChevronLeft,
  DollarSign,
  Bot,
  Gift,
  Smartphone,
  Truck,
  Router,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

// Renamed to EcosystemShowcase to better reflect content
// CORRECTED EXPORT NAME HERE
export function EcosystemShowcase() {
  const [activeSection, setActiveSection] = useState(0)
  const sections = [
    "AetherNet: AI Agent Network",
    "AetherChain: Trust Ledger",
    "Business Optimization Engine",
    "Smart Packaging-as-a-Service",
    "Customer Rewards App",
    "Developer Ecosystem",
  ]

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length)
    }, 10000)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [sections.length])

  const resetAutoPlay = () => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    autoPlayRef.current = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length)
    }, 10000)
  }

  const handleSectionChange = (index: number) => {
    setActiveSection(index)
    resetAutoPlay()
  }

  const handleNext = () => {
    setActiveSection((prev) => (prev + 1) % sections.length)
    resetAutoPlay()
  }

  const handlePrev = () => {
    setActiveSection((prev) => (prev - 1 + sections.length) % sections.length)
    resetAutoPlay()
  }

  return (
    <section
      id="ecosystem-showcase"
      className="w-full py-16 md:py-24 bg-black bg-grid-pattern-dark relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="absolute blockchain-node opacity-50"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animation: `float ${6 + Math.random() * 6}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl font-bold text-center mb-4 text-white sm:text-4xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">
            The Resend-It Ecosystem
          </span>
        </h2>
        <p className="text-lg text-center mb-12 text-gray-400 max-w-3xl mx-auto">
          A synergistic suite of foundational technologies and applications designed to unlock universal business
          optimization, verifiable sustainability, and enhanced customer engagement.
        </p>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => handleSectionChange(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black",
                activeSection === index
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700",
              )}
            >
              {section}
            </button>
          ))}
        </div>

        <div className="relative min-h-[620px] md:min-h-[580px] bg-gray-900/70 rounded-2xl p-6 md:p-8 backdrop-blur-md border border-gray-700/50 shadow-2xl">
          <AnimatePresence mode="wait">
            {activeSection === 0 && <AetherNetContent key="aethernet" />}
            {activeSection === 1 && <AetherChainContent key="aetherchain" />}
            {activeSection === 2 && <BusinessOptimizationEngineContent key="bizopt" />}
            {activeSection === 3 && <SmartPackagingContent key="smartpack" />}
            {activeSection === 4 && <CustomerRewardsContent key="rewards" />}
            {activeSection === 5 && <DeveloperEcosystemContent key="deveco" />}
          </AnimatePresence>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors z-20"
            aria-label="Previous feature"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-800/70 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-colors z-20"
            aria-label="Next feature"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSectionChange(index)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                activeSection === index ? "bg-primary scale-125" : "bg-gray-600 hover:bg-gray-500",
              )}
              aria-label={`Go to feature ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const MotionDiv = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
  >
    {children}
  </motion.div>
)

const FeatureText = ({
  title,
  description,
  points,
  launchInfo,
}: {
  title: string
  description: string
  points: { icon: React.ReactNode; title: string; desc: string }[]
  launchInfo?: string
}) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-white">{title}</h3>
    {launchInfo && <p className="text-sm text-primary font-semibold">{launchInfo}</p>}
    <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    <div className="space-y-4 pt-2">
      {points.map((point, i) => (
        <motion.div
          key={point.title}
          className="flex items-start gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
        >
          <div className="mt-1 p-2 bg-primary/20 rounded-lg text-primary flex-shrink-0">{point.icon}</div>
          <div>
            <h4 className="font-semibold text-white">{point.title}</h4>
            <p className="text-sm text-gray-400">{point.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)

const FeatureVisual = ({ imgSrc, altText }: { imgSrc: string; altText: string }) => (
  <motion.div
    className="relative aspect-video bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden shadow-xl"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    <Image src={imgSrc || "/placeholder.svg"} alt={altText} fill className="object-cover" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
  </motion.div>
)

function AetherNetContent() {
  return (
    <MotionDiv>
      <FeatureText
        title="AetherNet: Secure AI Agent Network"
        launchInfo="API v1 Launching in 30 Days"
        description="AetherNet provides a standardized, military-grade secure communication layer for AI agents. It's optimally designed to support networks of smart IoT devices, robotics, autonomous vehicles, drones, and more, enabling intelligent automation and collaboration across diverse systems and industries."
        points={[
          {
            icon: <Router size={20} />,
            title: "IoT & Robotics Orchestration",
            desc: "Seamlessly manage and coordinate complex networks of smart devices, robots, and autonomous systems.",
          },
          {
            icon: <ShieldCheck size={20} />,
            title: "Standardized Secure Communication",
            desc: "Universal protocols ensure encrypted, authenticated interaction between all network participants.",
          },
          {
            icon: <Cpu size={20} />,
            title: "Decentralized AI Workflows",
            desc: "Facilitates distributed intelligence, enhancing resilience and enabling sophisticated automation.",
          },
        ]}
      />
      <FeatureVisual imgSrc="/images/landing/aethernet-iot-robotics.png" altText="AetherNet for IoT and Robotics" />
    </MotionDiv>
  )
}

function AetherChainContent() {
  return (
    <MotionDiv>
      <FeatureVisual imgSrc="/images/landing/aetherchain-secure-ledger.png" altText="AetherChain Secure Ledger" />
      <FeatureText
        title="AetherChain: High-Performance Trust Ledger"
        launchInfo="Launching Q3 2025"
        description="AetherChain is a cutting-edge Rust-based blockchain, engineered for exceptional speed, security, and seamless integration with AetherNet. It provides an immutable ledger for verifiable trust in all transactions and data points."
        points={[
          {
            icon: <Blocks size={20} />,
            title: "Optimized for AI & IoT Data",
            desc: "Designed to handle high-throughput data from AetherNet agents and connected devices efficiently.",
          },
          {
            icon: <Zap size={20} />,
            title: "Rust-Powered Performance & Security",
            desc: "Leverages Rust for superior speed, memory safety, and concurrency in transaction processing.",
          },
          {
            icon: <Recycle size={20} />,
            title: "Verifiable Sustainability & ROI",
            desc: "Enables transparent, auditable tracking of sustainability metrics, ESG compliance, and ROI calculations.",
          },
        ]}
      />
    </MotionDiv>
  )
}

function BusinessOptimizationEngineContent() {
  return (
    <MotionDiv>
      <FeatureText
        title="Business Optimization Engine"
        description="Leveraging the Resend-It v1 foundation, our engine utilizes AetherNet AI agents to analyze data, predict trends, and automate complex decisions, driving efficiency across all business sectors."
        points={[
          {
            icon: <BarChart3 size={20} />,
            title: "Cross-Industry AI Analytics",
            desc: "Tailorable AI models and agents to optimize processes in manufacturing, healthcare, finance, logistics, and more.",
          },
          {
            icon: <Bot size={20} />,
            title: "Intelligent Automation",
            desc: "Automate workflows, resource allocation, and operational decisions with secure AI agents.",
          },
          {
            icon: <DollarSign size={20} />,
            title: "Data-Driven ROI Maximization",
            desc: "Continuously monitor and improve key performance indicators with insights verified by AetherChain.",
          },
        ]}
      />
      <FeatureVisual
        imgSrc="/images/landing/resendit-optimization-engine.png"
        altText="Resend-It Business Optimization Engine"
      />
    </MotionDiv>
  )
}

function SmartPackagingContent() {
  return (
    <MotionDiv>
      <FeatureVisual
        imgSrc="/images/landing/smart-packaging-service.png"
        altText="Smart Reusable Packaging-as-a-Service"
      />
      <FeatureText
        title="Smart Reusable Packaging-as-a-Service"
        description="Our flagship application on the Aether ecosystem. We provide intelligent, IoT-enabled reusable packaging solutions, managed by AetherNet agents and verified on AetherChain, to minimize waste and maximize asset utilization."
        points={[
          {
            icon: <PackageCheck size={20} />,
            title: "IoT-Powered Lifecycle Tracking",
            desc: "Real-time monitoring of package location, condition, and usage cycles via AetherNet.",
          },
          {
            icon: <Recycle size={20} />,
            title: "Verifiable Sustainability Metrics",
            desc: "Track carbon footprint reduction, waste diversion, and reuse rates immutably on AetherChain.",
          },
          {
            icon: <Truck size={20} />,
            title: "Optimized Reverse Logistics",
            desc: "AI agents streamline the return and refurbishment process, reducing costs and environmental impact.",
          },
        ]}
      />
    </MotionDiv>
  )
}

function CustomerRewardsContent() {
  return (
    <MotionDiv>
      <FeatureText
        title="Customer Rewards App"
        description="Engage end-users and incentivize sustainable behaviors through our integrated mobile rewards application, powered by AetherChain for transparent and verifiable reward distribution."
        points={[
          {
            icon: <Smartphone size={20} />,
            title: "Incentivize Sustainable Actions",
            desc: "Reward customers for returning reusable packaging, participating in recycling programs, and more.",
          },
          {
            icon: <Gift size={20} />,
            title: "Blockchain-Verified Rewards",
            desc: "Ensure transparency and trust in reward points and redemptions using AetherChain.",
          },
          {
            icon: <Users size={20} />,
            title: "Enhanced Brand Loyalty",
            desc: "Build stronger customer relationships by aligning your brand with sustainability and tangible rewards.",
          },
        ]}
      />
      <FeatureVisual imgSrc="/images/landing/customer-rewards-app.png" altText="Customer Rewards App Interface" />
    </MotionDiv>
  )
}

function DeveloperEcosystemContent() {
  return (
    <MotionDiv>
      <FeatureVisual imgSrc="/images/landing/developer-ecosystem-unified.png" altText="Aether Developer Ecosystem" />
      <FeatureText
        title="Pioneering Developer Ecosystem"
        description="Build the future on Aether. Our comprehensive APIs, SDKs, and tools empower developers to create custom AI agents for AetherNet, deploy Rust smart contracts on AetherChain, and integrate with the entire Resend-It Ecosystem."
        points={[
          {
            icon: <Wrench size={20} />,
            title: "AetherNet Agent SDK (API v1 Soon)",
            desc: "Develop, deploy, and manage secure AI agents for IoT, robotics, and diverse automation tasks.",
          },
          {
            icon: <Blocks size={20} />,
            title: "AetherChain Smart Contracts (Q3 2025)",
            desc: "Build high-performance Rust-based smart contracts for verifiable business logic and decentralized workflows.",
          },
          {
            icon: <Cpu size={20} />,
            title: "Unified API & Tooling",
            desc: "Seamlessly interact with all layers of the Aether ecosystem through a cohesive developer experience.",
          },
        ]}
      />
    </MotionDiv>
  )
}
