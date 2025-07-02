"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShopifyIcon, WixIcon } from "@/components/ui/icons" // Assuming we create these simple icons
import { initiateShopifyAuth } from "@/app/actions/integration-actions"
import { useToast } from "@/components/ui/use-toast"
import { IntegrationsList } from "@/components/ai-suite/integrations/integrations-list"
import type { ExternalIntegration } from "@/lib/types/database" // You'll need to define this type

export function IntegrationsClient({ initialIntegrations }: { initialIntegrations: ExternalIntegration[] }) {
  const [integrations, setIntegrations] = useState(initialIntegrations)
  const [isConnecting, setIsConnecting] = useState(false)
  const { toast } = useToast()

  const handleConnectShopify = async () => {
    setIsConnecting(true)
    try {
      const result = await initiateShopifyAuth()
      if (result.success && result.authUrl) {
        // Redirect the user to the Shopify authorization URL
        window.location.href = result.authUrl
      } else {
        toast({
          title: "Connection Failed",
          description: result.error || "Could not initiate Shopify connection.",
          variant: "destructive",
        })
        setIsConnecting(false)
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "Connection Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
      setIsConnecting(false)
    }
  }

  const handleConnectWix = () => {
    toast({
      title: "Coming Soon!",
      description: "Wix integration is under development.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">External Integrations</h1>
        <p className="text-muted-foreground">
          Connect your platforms to unlock the full power of the AI Business Suite and AetherNet.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connect a New Platform</CardTitle>
          <CardDescription>Select a platform to start syncing your data.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleConnectShopify}
            disabled={isConnecting}
          >
            <ShopifyIcon className="h-8 w-8" />
            <span className="font-semibold">Connect Shopify</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center gap-2"
            onClick={handleConnectWix}
            disabled
          >
            <WixIcon className="h-8 w-8" />
            <span className="font-semibold">Connect Wix (Soon)</span>
          </Button>
        </CardContent>
      </Card>

      <IntegrationsList integrations={integrations} />
    </div>
  )
}
