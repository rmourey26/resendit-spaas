"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Code, Database, Zap, Shield, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export function SpaasApiIntegration() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const createOrderCode = `curl -X POST "https://api.resendit.app/v1/packaging/orders" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "order_type": "standard",
    "package_category": "mailer",
    "material_type": "pp_woven",
    "quantity": 100,
    "has_iot_sensors": true,
    "iot_sensor_count": 100,
    "iot_sensor_config": {
      "temperatureSensing": true,
      "locationTracking": true,
      "tamperDetection": true,
      "batteryLife": "extended",
      "reportingFrequency": "hourly"
    },
    "carbon_offset": true,
    "return_program_enrollment": true
  }'`

  const trackPackageCode = `curl -X GET "https://api.resendit.app/v1/packages/{package_id}/tracking" \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response
{
  "package_id": "pkg_123abc",
  "status": "in_transit",
  "current_location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "sensor_readings": {
    "temperature": { "value": 22.5, "unit": "C" },
    "humidity": { "value": 45, "unit": "%" },
    "shock": { "value": 0.2, "unit": "G" }
  },
  "sustainability_metrics": {
    "co2_saved_kg": 0.75,
    "reuse_count": 15,
    "lifecycle_remaining": 185
  }
}`

  const webhookCode = `// Webhook endpoint to receive real-time updates
app.post('/webhooks/spaas', (req, res) => {
  const { event_type, package_id, data } = req.body;
  
  switch(event_type) {
    case 'package.location_updated':
      console.log(\`Package \${package_id} location: \${data.location}\`);
      break;
    case 'package.sensor_alert':
      console.log(\`Alert for \${package_id}: \${data.alert_type}\`);
      // Handle temperature, shock, or tamper alerts
      break;
    case 'package.delivered':
      console.log(\`Package \${package_id} delivered successfully\`);
      break;
  }
  
  res.status(200).send('OK');
});`

  const sdkCode = `// JavaScript SDK Example
import { SpaasClient } from '@resendit/spaas-sdk';

const client = new SpaasClient({
  apiKey: 'your-api-key',
  environment: 'production'
});

// Create a new packaging order
const order = await client.packaging.create({
  orderType: 'standard',
  packageCategory: 'mailer',
  materialType: 'pp_woven',
  quantity: 100,
  iotSensors: {
    enabled: true,
    count: 100,
    features: ['temperature', 'location', 'tamper']
  }
});

// Track package in real-time
const tracking = await client.packages.track('pkg_123abc');
console.log('Current location:', tracking.currentLocation);
console.log('Sensor data:', tracking.sensorReadings);`

  return (
    <section id="api-integration" className="w-full py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge variant="outline" className="mb-4 py-1.5 px-4 border-green-600/60 text-green-600 bg-green-600/10">
              <Code className="w-4 h-4 mr-2" />
              Developer-First API
            </Badge>
            <h2 className="text-3xl font-bold mb-4 sm:text-4xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
                SPaaS API Integration
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Integrate Smart Packaging as a Service into your existing systems with our comprehensive RESTful API,
              SDKs, and real-time webhooks. Get up and running in minutes, not months.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {[
            {
              icon: <Code className="h-8 w-8" />,
              title: "RESTful API",
              description: "Complete REST API with OpenAPI 3.0 specification",
            },
            {
              icon: <Database className="h-8 w-8" />,
              title: "Real-time Data",
              description: "Live sensor data and location tracking via WebSockets",
            },
            {
              icon: <Zap className="h-8 w-8" />,
              title: "Webhooks",
              description: "Real-time notifications for critical events and alerts",
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Secure & Scalable",
              description: "Enterprise-grade security with 99.9% uptime SLA",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-green-600/10 rounded-lg text-green-600 w-fit">{feature.icon}</div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Card className="max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">API Examples</CardTitle>
              <CardDescription>Get started with these code examples for common SPaaS operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="create-order" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="create-order">Create Order</TabsTrigger>
                  <TabsTrigger value="track-package">Track Package</TabsTrigger>
                  <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
                  <TabsTrigger value="sdk">SDK</TabsTrigger>
                </TabsList>

                <TabsContent value="create-order" className="space-y-4">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{createOrderCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => copyToClipboard(createOrderCode, "create-order")}
                    >
                      {copiedCode === "create-order" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Create a new packaging order with IoT sensors, sustainability features, and return program
                    enrollment.
                  </p>
                </TabsContent>

                <TabsContent value="track-package" className="space-y-4">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{trackPackageCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => copyToClipboard(trackPackageCode, "track-package")}
                    >
                      {copiedCode === "track-package" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Get real-time tracking information including location, sensor readings, and sustainability metrics.
                  </p>
                </TabsContent>

                <TabsContent value="webhooks" className="space-y-4">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{webhookCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => copyToClipboard(webhookCode, "webhooks")}
                    >
                      {copiedCode === "webhooks" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Receive real-time notifications for package events, sensor alerts, and delivery confirmations.
                  </p>
                </TabsContent>

                <TabsContent value="sdk" className="space-y-4">
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{sdkCode}</code>
                    </pre>
                    <Button
                      size="sm"
                      variant="outline"
                      className="absolute top-2 right-2 bg-transparent"
                      onClick={() => copyToClipboard(sdkCode, "sdk")}
                    >
                      {copiedCode === "sdk" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use our JavaScript SDK for simplified integration with TypeScript support and built-in error
                    handling.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">API Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Complete API reference with interactive examples</p>
                <Button variant="outline" className="w-full bg-transparent">
                  View Docs
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SDKs & Libraries</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Official SDKs for JavaScript, Python, and more</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Download SDKs
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Developer Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">24/7 developer support and community forum</p>
                <Button variant="outline" className="w-full bg-transparent">
                  Get Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
