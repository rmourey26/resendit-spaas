"use client"

import { motion } from "framer-motion"
import { Check, Zap, Crown, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function SpaasPricingSection() {
  const plans = [
    {
      name: "Starter",
      icon: <Zap className="h-6 w-6" />,
      price: "$0.25",
      unit: "per package",
      description: "Perfect for small businesses getting started with smart packaging",
      features: [
        "Basic IoT sensors (temperature, location)",
        "Standard reusable materials",
        "Basic analytics dashboard",
        "Email support",
        "Up to 1,000 packages/month",
        "Standard return program",
        "Basic sustainability reporting",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Professional",
      icon: <Crown className="h-6 w-6" />,
      price: "$0.18",
      unit: "per package",
      description: "Advanced features for growing businesses with higher volume needs",
      features: [
        "Advanced IoT sensors (all features)",
        "Premium materials selection",
        "Advanced analytics & AI insights",
        "Priority support",
        "Up to 10,000 packages/month",
        "Enhanced return program",
        "Comprehensive ESG reporting",
        "API access & webhooks",
        "Custom branding options",
      ],
      cta: "Start Professional",
      popular: true,
    },
    {
      name: "Enterprise",
      icon: <Building className="h-6 w-6" />,
      price: "Custom",
      unit: "pricing",
      description: "Tailored solutions for large organizations with complex requirements",
      features: [
        "Full IoT sensor suite + custom sensors",
        "Custom material development",
        "White-label platform access",
        "Dedicated account manager",
        "Unlimited packages",
        "Custom return logistics",
        "Advanced blockchain verification",
        "Full API access & custom integrations",
        "Custom reporting & analytics",
        "SLA guarantees",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the plan that fits your business needs. All plans include our core smart packaging features with no
              hidden fees or long-term contracts.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-600 text-white px-4 py-1">Most Popular</Badge>
                </div>
              )}
              <Card className={`h-full ${plan.popular ? "border-green-600 shadow-lg scale-105" : ""}`}>
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-4 p-3 rounded-lg w-fit ${
                      plan.popular
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.unit}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-xl">Volume Discounts Available</CardTitle>
              <CardDescription>Save more as you scale with our volume-based pricing tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4 text-center">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-600">5%</div>
                  <div className="text-sm">10K+ packages</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-600">10%</div>
                  <div className="text-sm">50K+ packages</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-600">15%</div>
                  <div className="text-sm">100K+ packages</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-lg font-bold text-green-600">20%</div>
                  <div className="text-sm">500K+ packages</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
