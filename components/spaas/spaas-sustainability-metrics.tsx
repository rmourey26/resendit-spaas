"use client"

import { motion } from "framer-motion"
import { Leaf, BarChart3, Recycle, TrendingUp, Award, Globe } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export function SpaasSustainabilityMetrics() {
  const metrics = [
    {
      title: "CO₂ Reduction",
      value: "75%",
      description: "Average carbon footprint reduction vs traditional packaging",
      icon: <Leaf className="h-6 w-6" />,
      color: "text-green-600",
    },
    {
      title: "Waste Diversion",
      value: "90%",
      description: "Materials diverted from landfills through reuse",
      icon: <Recycle className="h-6 w-6" />,
      color: "text-blue-600",
    },
    {
      title: "Cost Savings",
      value: "40%",
      description: "Average packaging cost reduction over 12 months",
      icon: <TrendingUp className="h-6 w-6" />,
      color: "text-purple-600",
    },
    {
      title: "Reuse Cycles",
      value: "200+",
      description: "Average number of reuse cycles per package",
      icon: <BarChart3 className="h-6 w-6" />,
      color: "text-orange-600",
    },
  ]

  const certifications = [
    { name: "B Corp Certified", icon: <Award className="h-5 w-5" /> },
    { name: "Carbon Neutral", icon: <Leaf className="h-5 w-5" /> },
    { name: "ISO 14001", icon: <Globe className="h-5 w-5" /> },
    { name: "FSC Certified", icon: <Recycle className="h-5 w-5" /> },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 py-1.5 px-4 border-green-600/60 text-green-600 bg-green-600/10">
              <Leaf className="w-4 h-4 mr-2" />
              Verified Sustainability
            </Badge>
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                Measurable Environmental Impact
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our Smart Packaging as a Service platform delivers quantifiable sustainability benefits with
              blockchain-verified metrics and comprehensive ESG reporting.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`mx-auto mb-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg ${metric.color} w-fit`}>
                    {metric.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold">{metric.value}</CardTitle>
                  <CardDescription className="font-medium">{metric.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Sustainability Progress
                </CardTitle>
                <CardDescription>Track your environmental impact in real-time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Carbon Footprint Reduction</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Waste Diversion Rate</span>
                    <span className="font-medium">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Packaging Reuse Rate</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>ESG Compliance Score</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  Certifications & Standards
                </CardTitle>
                <CardDescription>Industry-leading sustainability certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="text-green-600">{cert.icon}</div>
                      <span className="font-medium text-sm">{cert.name}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Blockchain Verification</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    All sustainability metrics are recorded on our immutable blockchain ledger, providing transparent
                    and verifiable proof of environmental impact.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Environmental Impact Calculator</CardTitle>
              <CardDescription>See how much your organization could save with SPaaS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3 text-center">
                <div className="p-6 bg-green-50 dark:bg-green-950/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">2.5 tons</div>
                  <div className="text-sm font-medium mb-1">CO₂ Saved Annually</div>
                  <div className="text-xs text-muted-foreground">Per 1,000 packages</div>
                </div>
                <div className="p-6 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">$15,000</div>
                  <div className="text-sm font-medium mb-1">Cost Savings</div>
                  <div className="text-xs text-muted-foreground">First year ROI</div>
                </div>
                <div className="p-6 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">90%</div>
                  <div className="text-sm font-medium mb-1">Waste Reduction</div>
                  <div className="text-xs text-muted-foreground">Vs traditional packaging</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
