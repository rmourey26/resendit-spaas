"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Cpu,
  BarChart3,
  Recycle,
  Shield,
  Zap,
  Thermometer,
  MapPin,
  AlertTriangle,
  Smartphone,
  ChevronRight,
  ChevronLeft,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function SpaasFeatureShowcase() {
  const [activeFeature, setActiveFeature] = useState(0)
  const features = [
    "IoT Smart Sensors",
    "AI Optimization Engine",
    "Blockchain Verification",
    "Sustainability Tracking",
    "Real-time Analytics",
    "Mobile Integration",
  ]

  const handleNext = () => {
    setActiveFeature((prev) => (prev + 1) % features.length)
  }

  const handlePrev = () => {
    setActiveFeature((prev) => (prev - 1 + features.length) % features.length)
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
              SPaaS Platform Features
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our Smart Packaging as a Service platform combines cutting-edge technology with sustainable practices to
            deliver unprecedented visibility and control over your packaging operations.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2",
                activeFeature === index
                  ? "bg-green-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
              )}
            >
              {feature}
            </button>
          ))}
        </div>

        <div className="relative min-h-[600px] bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-xl border">
          <AnimatePresence mode="wait">
            {activeFeature === 0 && <IoTSensorsContent key="iot" />}
            {activeFeature === 1 && <AIOptimizationContent key="ai" />}
            {activeFeature === 2 && <BlockchainContent key="blockchain" />}
            {activeFeature === 3 && <SustainabilityContent key="sustainability" />}
            {activeFeature === 4 && <AnalyticsContent key="analytics" />}
            {activeFeature === 5 && <MobileContent key="mobile" />}
          </AnimatePresence>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:text-white transition-colors z-20"
            aria-label="Previous feature"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-green-600 hover:text-white transition-colors z-20"
            aria-label="Next feature"
          >
            <ChevronRight size={24} />
          </button>
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
    className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full"
  >
    {children}
  </motion.div>
)

function IoTSensorsContent() {
  return (
    <MotionDiv>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">IoT Smart Sensors</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Advanced IoT sensors embedded in every package provide real-time monitoring of temperature, humidity,
          location, shock, and tamper detection throughout the entire supply chain journey.
        </p>
        <div className="space-y-4 pt-2">
          {[
            {
              icon: <Thermometer size={20} />,
              title: "Temperature & Humidity",
              desc: "Monitor environmental conditions with ±0.5°C accuracy",
            },
            {
              icon: <MapPin size={20} />,
              title: "GPS Location Tracking",
              desc: "Real-time location updates with 2-5m precision",
            },
            {
              icon: <AlertTriangle size={20} />,
              title: "Shock & Tamper Detection",
              desc: "Instant alerts for impacts and unauthorized access",
            },
            {
              icon: <Zap size={20} />,
              title: "90-Day Battery Life",
              desc: "Extended monitoring with low-power sensor technology",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            >
              <div className="mt-1 p-2 bg-green-600/20 rounded-lg text-green-600 flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image src="/images/spaas/feature-iot-sensors.png" alt="IoT Smart Sensors" fill className="object-cover" />
      </motion.div>
    </MotionDiv>
  )
}

function AIOptimizationContent() {
  return (
    <MotionDiv>
      <motion.div
        className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/images/spaas/feature-ai-optimization.png"
          alt="AI Optimization Engine"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">AI Optimization Engine</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Our AI engine analyzes historical data, product dimensions, and shipping patterns to recommend optimal
          packaging solutions, reducing waste and costs while improving protection.
        </p>
        <div className="space-y-4 pt-2">
          {[
            {
              icon: <Cpu size={20} />,
              title: "Smart Package Selection",
              desc: "AI recommends optimal package size and material for each shipment",
            },
            {
              icon: <BarChart3 size={20} />,
              title: "Predictive Analytics",
              desc: "Forecast demand and optimize inventory levels",
            },
            {
              icon: <Package size={20} />,
              title: "Route Optimization",
              desc: "Minimize shipping costs and delivery times",
            },
            {
              icon: <Recycle size={20} />,
              title: "Sustainability Scoring",
              desc: "Real-time environmental impact assessment",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            >
              <div className="mt-1 p-2 bg-green-600/20 rounded-lg text-green-600 flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionDiv>
  )
}

function BlockchainContent() {
  return (
    <MotionDiv>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Blockchain Verification</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Every package interaction is recorded on our secure blockchain, providing immutable proof of sustainability
          metrics, chain of custody, and compliance with environmental standards.
        </p>
        <div className="space-y-4 pt-2">
          {[
            {
              icon: <Shield size={20} />,
              title: "Immutable Records",
              desc: "Tamper-proof tracking of all package lifecycle events",
            },
            {
              icon: <BarChart3 size={20} />,
              title: "Verified Metrics",
              desc: "Blockchain-verified sustainability and performance data",
            },
            {
              icon: <Package size={20} />,
              title: "Chain of Custody",
              desc: "Complete audit trail from manufacture to disposal",
            },
            {
              icon: <Recycle size={20} />,
              title: "Compliance Proof",
              desc: "Automated compliance reporting for ESG requirements",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            >
              <div className="mt-1 p-2 bg-green-600/20 rounded-lg text-green-600 flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/images/spaas/feature-blockchain-verification.png"
          alt="Blockchain Verification"
          fill
          className="object-cover"
        />
      </motion.div>
    </MotionDiv>
  )
}

function SustainabilityContent() {
  return (
    <MotionDiv>
      <motion.div
        className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/images/spaas/feature-sustainability-tracking.png"
          alt="Sustainability Tracking"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Sustainability Tracking</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Comprehensive tracking of environmental impact with real-time CO₂ reduction calculations, waste diversion
          metrics, and detailed sustainability reporting for ESG compliance.
        </p>
        <div className="space-y-4 pt-2">
          {[
            {
              icon: <Recycle size={20} />,
              title: "CO₂ Reduction Tracking",
              desc: "Real-time calculation of carbon footprint savings",
            },
            {
              icon: <BarChart3 size={20} />,
              title: "Waste Diversion Metrics",
              desc: "Track materials diverted from landfills",
            },
            {
              icon: <Shield size={20} />,
              title: "ESG Compliance",
              desc: "Automated reporting for sustainability standards",
            },
            {
              icon: <Package size={20} />,
              title: "Lifecycle Analysis",
              desc: "Complete environmental impact assessment",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            >
              <div className="mt-1 p-2 bg-green-600/20 rounded-lg text-green-600 flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionDiv>
  )
}

function AnalyticsContent() {
  return (
    <MotionDiv>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Real-time Analytics</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Comprehensive analytics dashboard providing insights into package performance, cost savings, sustainability
          metrics, and operational efficiency across your entire supply chain.
        </p>
        <div className="space-y-4 pt-2">
          {[
            {
              icon: <BarChart3 size={20} />,
              title: "Performance Dashboards",
              desc: "Real-time visibility into package utilization and efficiency",
            },
            {
              icon: <Cpu size={20} />,
              title: "Predictive Insights",
              desc: "AI-powered forecasting for demand and optimization",
            },
            {
              icon: <Package size={20} />,
              title: "Cost Analysis",
              desc: "Detailed breakdown of savings and ROI metrics",
            },
            {
              icon: <Recycle size={20} />,
              title: "Impact Reporting",
              desc: "Comprehensive sustainability and environmental reports",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            >
              <div className="mt-1 p-2 bg-green-600/20 rounded-lg text-green-600 flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/images/spaas/feature-analytics-dashboard.png"
          alt="Real-time Analytics"
          fill
          className="object-cover"
        />
      </motion.div>
    </MotionDiv>
  )
}

function MobileContent() {
  return (
    <MotionDiv>
      <motion.div
        className="relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Image
          src="/images/spaas/feature-mobile-integration.png"
          alt="Mobile Integration"
          fill
          className="object-cover"
        />
      </motion.div>
      <div className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Mobile Integration</h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Native mobile applications for iOS and Android provide field teams with instant access to package status, QR
          code scanning, and real-time notifications for optimal supply chain management.
        </p>
        <div className="space-y-4 pt-2">
          {[
            {
              icon: <Smartphone size={20} />,
              title: "Native Mobile Apps",
              desc: "iOS and Android apps for field team management",
            },
            {
              icon: <Package size={20} />,
              title: "QR Code Scanning",
              desc: "Instant package identification and status updates",
            },
            {
              icon: <AlertTriangle size={20} />,
              title: "Push Notifications",
              desc: "Real-time alerts for critical events and updates",
            },
            {
              icon: <MapPin size={20} />,
              title: "Offline Capability",
              desc: "Continue operations even without internet connectivity",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.4 }}
            >
              <div className="mt-1 p-2 bg-green-600/20 rounded-lg text-green-600 flex-shrink-0">{item.icon}</div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MotionDiv>
  )
}
