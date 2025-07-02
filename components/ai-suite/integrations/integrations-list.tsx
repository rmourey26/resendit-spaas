"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShopifyIcon, WixIcon } from "@/components/ui/icons"
import { MoreHorizontal, Trash2, RefreshCw, Settings } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { formatDistanceToNow } from "date-fns"
import type { ExternalIntegration } from "@/lib/types/database"

interface IntegrationsListProps {
  integrations: ExternalIntegration[]
}

export function IntegrationsList({ integrations }: IntegrationsListProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "revoked":
      case "error":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getIcon = (provider: string) => {
    switch (provider) {
      case "shopify":
        return <ShopifyIcon className="h-6 w-6" />
      case "wix":
        return <WixIcon className="h-6 w-6" />
      default:
        return null
    }
  }

  if (integrations.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Active Integrations</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground py-8">
          <p>You have no active integrations.</p>
          <p>Connect a platform above to get started.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Integrations</CardTitle>
        <CardDescription>Manage your connected platforms and data sync settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Platform</TableHead>
              <TableHead>Store / Site</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Sync</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {integrations.map((integration) => (
              <TableRow key={integration.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getIcon(integration.provider)}
                    <span className="capitalize">{integration.provider}</span>
                  </div>
                </TableCell>
                <TableCell>{integration.provider_shop_id || integration.provider_site_id}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(integration.status)}>{integration.status}</Badge>
                </TableCell>
                <TableCell>
                  {integration.last_sync_at
                    ? `${formatDistanceToNow(new Date(integration.last_sync_at), { addSuffix: true })} (${integration.sync_status})`
                    : "Never"}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Now
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
