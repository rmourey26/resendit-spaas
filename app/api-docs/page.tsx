import type { Metadata } from "next"
import {
  ArrowRight,
  Book,
  Code,
  Coins,
  Database,
  FileJson,
  GitBranch,
  Leaf,
  Lock,
  Server,
  ShoppingCart,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiEndpointExample } from "@/components/api-docs/api-endpoint-example"
import { ApiAuthExample } from "@/components/api-docs/api-auth-example"
import { ApiArchitecture } from "@/components/api-docs/api-architecture"
import { ApiValueProposition } from "@/components/api-docs/api-value-proposition"
import { ApiRoiCalculator } from "@/components/api-docs/api-roi-calculator"
import { ApiWorkflowGuide } from "@/components/api-docs/api-workflow-guide"

export const metadata: Metadata = {
  title: "API Documentation | Resend-It Platform",
  description:
    "Comprehensive API documentation for the Resend-It platform, including e-commerce integrations and sustainability tracking.",
}

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-10 max-w-7xl">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-extrabold tracking-tight lg:text-5xl">Resend-It API</h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive documentation for integrating with the Resend-It platform's e-commerce and sustainability
            features.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-8 py-8">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="reference" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              <span className="hidden md:inline">API Reference</span>
            </TabsTrigger>
            <TabsTrigger value="ecommerce" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden md:inline">E-commerce</span>
            </TabsTrigger>
            <TabsTrigger value="sustainability" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden md:inline">Sustainability</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              <span className="hidden md:inline">Architecture</span>
            </TabsTrigger>
            <TabsTrigger value="value" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              <span className="hidden md:inline">Value Prop</span>
            </TabsTrigger>
            <TabsTrigger value="roi" className="flex items-center gap-2">
              <Coins className="h-4 w-4" />
              <span className="hidden md:inline">ROI</span>
            </TabsTrigger>
            <TabsTrigger value="workflows" className="flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              <span className="hidden md:inline">Workflows</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>Integrate with the Resend-It API</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Our RESTful API allows you to integrate Resend-It's powerful features into your own applications.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-transparent">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>Secure your API requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Learn how to authenticate your API requests using JWT tokens. Our system ensures your data remains
                    secure.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Authentication
                    <Lock className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce Integration</CardTitle>
                  <CardDescription>Connect your Shopify Store</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Seamlessly connect your e-commerce store to leverage AI-powered packaging optimization and more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-transparent">
                    Connect Store
                    <ShoppingCart className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Sustainability API</CardTitle>
                  <CardDescription>Track your Eco-Impact</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Log and retrieve sustainability metrics to monitor and report your environmental impact savings.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Sustainability API
                    <Leaf className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-bold tracking-tight">API Features</h2>
              <p className="text-muted-foreground mt-2">
                The Resend-It API provides access to all platform features through a consistent RESTful interface.
              </p>

              <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">E-commerce Integration</h3>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Connect Shopify stores via OAuth</li>
                    <li>Sync products and orders</li>
                    <li>Receive order updates via webhooks</li>
                    <li>Use AI to optimize packaging for orders</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">Sustainability Tracking</h3>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Log sustainability events (e.g., CO2 saved)</li>
                    <li>Retrieve aggregated sustainability summaries</li>
                    <li>Track impact on a per-shipment basis</li>
                    <li>Prove your commitment to green logistics</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">Shipping & Logistics</h3>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Create and track shipments</li>
                    <li>Manage reusable packaging inventory</li>
                    <li>Access shipping analytics and reports</li>
                    <li>Monitor IoT sensor data for shipments</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">AI Business Suite</h3>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Create and manage AI agents</li>
                    <li>Execute AI workflows</li>
                    <li>Optimize supply chain operations</li>
                    <li>Generate embeddings and perform similarity searches</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">Business Cards & NFTs</h3>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Create and manage digital business cards</li>
                    <li>Mint NFTs from business cards on Sui</li>
                    <li>Manage public profiles and sharing</li>
                    <li>Track card analytics and engagement</li>
                  </ul>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">Developer Tools</h3>
                  <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
                    <li>Manage API Keys</li>
                    <li>Configure Webhooks for real-time events</li>
                    <li>Utilize official SDKs and libraries</li>
                    <li>Understand rate limits for your plan</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reference" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold tracking-tight">API Reference</h2>
              <Button asChild variant="outline" className="flex items-center gap-2 bg-transparent">
                <a href="/api-specifications.yaml" download="resendit-openapi.yaml">
                  <FileJson className="h-4 w-4" />
                  Download OpenAPI Spec
                </a>
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="md:col-span-1 space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold text-lg">Endpoints</h3>
                  <div className="mt-4 space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Authentication
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Profile
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Business Cards
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      NFTs
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      E-commerce
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Shipping
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Packages
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      AI Business Suite
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Sustainability
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      Embeddings
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <ApiAuthExample />
                <ApiEndpointExample
                  title="Optimize Shopify Order Packaging"
                  description="Use AI to get packaging recommendations for a specific Shopify order."
                  method="POST"
                  endpoint="/ai/packaging/optimize/shopify"
                  code={`curl -X POST "https://api.resendit.app/v1/ai/packaging/optimize/shopify" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "shopify_order_id": "gid://shopify/Order/1234567890",
    "connection_id": "your-shopify-connection-id"
  }'`}
                />
                <ApiEndpointExample
                  title="Log Sustainability Event"
                  description="Log an event, like using an optimized package, to track sustainability metrics."
                  method="POST"
                  endpoint="/sustainability/events"
                  code={`curl -X POST "https://api.resendit.app/v1/sustainability/events" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "event_type": "shipment_packaged",
    "entity_id": "shp_123abc",
    "entity_type": "shopify_order",
    "metrics": {
      "package_type_used": "Small Recycled Box A",
      "co2_saved_kg": 0.05
    }
  }'`}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ecommerce">
            {/* Placeholder for E-commerce specific guides */}
            <Card>
              <CardHeader>
                <CardTitle>Shopify Integration Guide</CardTitle>
                <CardDescription>
                  A step-by-step guide to connecting your Shopify store and leveraging our AI tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Coming soon: A detailed walkthrough of the OAuth flow, data synchronization, and using the packaging
                  optimization endpoint.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sustainability">
            {/* Placeholder for Sustainability specific guides */}
            <Card>
              <CardHeader>
                <CardTitle>Sustainability Tracking Guide</CardTitle>
                <CardDescription>
                  Learn how to use our API to track and report on your sustainability efforts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Coming soon: A guide on logging events and interpreting the data from the sustainability summary
                  endpoint.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="architecture" className="space-y-4">
            <ApiArchitecture />
          </TabsContent>

          <TabsContent value="value" className="space-y-4">
            <ApiValueProposition />
          </TabsContent>

          <TabsContent value="roi" className="space-y-4">
            <ApiRoiCalculator />
          </TabsContent>

          <TabsContent value="workflows" className="space-y-4">
            <ApiWorkflowGuide />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
