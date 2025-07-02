"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Clock, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export function SpaasGetStarted() {
  const steps = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Consultation",
      description: "Schedule a free consultation to assess your packaging needs",
      duration: "30 minutes",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Custom Design",
      description: "We design smart packaging solutions tailored to your products",
      duration: "1-2 weeks",
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Production & Delivery",
      description: "Your smart packages are manufactured and delivered",
      duration: "2-3 weeks",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Go Live",
      description: "Start using your smart packaging with full API integration",
      duration: "Same day",
    },
  ]

  return (
    <section
      id="get-started"
      className="w-full py-16 md:py-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20"
    >
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
                Get Started with SPaaS
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your packaging operations in just a few weeks. Our team will guide you through every step of the
              process, from initial consultation to full deployment.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Implementation Process</CardTitle>
                <CardDescription>Our proven 4-step process gets you up and running quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {steps.map((step, index) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-lg flex items-center justify-center">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{step.title}</h3>
                          <span className="text-sm text-muted-foreground">{step.duration}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
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
                <CardTitle className="text-2xl">Request a Demo</CardTitle>
                <CardDescription>See SPaaS in action and get a custom quote for your business</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input id="email" type="email" placeholder="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Your Company Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="volume">Monthly Package Volume</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select volume range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1000">0 - 1,000 packages</SelectItem>
                      <SelectItem value="1000-10000">1,000 - 10,000 packages</SelectItem>
                      <SelectItem value="10000-50000">10,000 - 50,000 packages</SelectItem>
                      <SelectItem value="50000+">50,000+ packages</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Tell us about your packaging needs</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your current packaging challenges and what you're looking to achieve..."
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Request Demo & Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Card className="max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                  <div className="text-sm font-medium">Support Available</div>
                  <div className="text-xs text-muted-foreground mt-1">Dedicated support team ready to help</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
                  <div className="text-sm font-medium">Uptime SLA</div>
                  <div className="text-xs text-muted-foreground mt-1">Enterprise-grade reliability guarantee</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600 mb-2">30 Day</div>
                  <div className="text-sm font-medium">Money-Back Guarantee</div>
                  <div className="text-xs text-muted-foreground mt-1">Risk-free trial period</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
