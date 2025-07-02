"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { AIWorkflowExample } from "./ai-workflow-example"
import { Play, Pause, Settings, Plus, GitBranch, Clock, CheckCircle, MoreHorizontal } from "lucide-react"

interface AIWorkflowsListProps {
  workflows: any[]
  user: any
}

export function AIWorkflowsList({ workflows, user }: AIWorkflowsListProps) {
  const [activeTab, setActiveTab] = useState("my-workflows")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Workflows</h2>
          <p className="text-muted-foreground">Automate complex business processes with AI-powered workflows</p>
        </div>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Mobile-optimized tabs */}
        <div className="w-full overflow-x-auto">
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex h-auto p-1 bg-muted rounded-lg">
            <TabsTrigger
              value="my-workflows"
              className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <GitBranch className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">My Workflows</span>
              <span className="xs:hidden">Mine</span>
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Settings className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Templates</span>
              <span className="xs:hidden">Templates</span>
            </TabsTrigger>
            <TabsTrigger
              value="examples"
              className="text-xs sm:text-sm px-2 sm:px-4 py-2 whitespace-nowrap data-[state=active]:bg-background data-[state=active]:text-foreground"
            >
              <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Examples</span>
              <span className="xs:hidden">Examples</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="my-workflows" className="mt-6">
          {workflows.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No workflows yet</h3>
                <p className="text-muted-foreground mb-4 max-w-md">
                  Create your first AI workflow to automate business processes and save time.
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Workflow
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {workflows.map((workflow) => (
                <Card key={workflow.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{workflow.name}</CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">{workflow.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant={workflow.status === "active" ? "default" : "secondary"}>
                          {workflow.status === "active" ? (
                            <CheckCircle className="h-3 w-3 mr-1" />
                          ) : (
                            <Pause className="h-3 w-3 mr-1" />
                          )}
                          {workflow.status}
                        </Badge>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>Last run: {workflow.last_run || "Never"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-3 w-3" />
                          <span>{workflow.steps?.length || 0} steps</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="flex-1 sm:flex-none bg-transparent">
                          <Settings className="h-3 w-3 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Configure</span>
                          <span className="sm:hidden">Config</span>
                        </Button>
                        <Button size="sm" className="flex-1 sm:flex-none">
                          <Play className="h-3 w-3 mr-1 sm:mr-2" />
                          <span className="hidden sm:inline">Run Now</span>
                          <span className="sm:hidden">Run</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Lead Qualification",
                description: "Automatically qualify and score incoming leads based on predefined criteria",
                category: "Sales",
                steps: 4,
                icon: "🎯",
              },
              {
                name: "Customer Onboarding",
                description: "Streamline new customer setup with automated welcome sequences",
                category: "Customer Success",
                steps: 6,
                icon: "👋",
              },
              {
                name: "Content Generation",
                description: "Generate blog posts, social media content, and marketing materials",
                category: "Marketing",
                steps: 5,
                icon: "✍️",
              },
              {
                name: "Order Processing",
                description: "Automate order validation, inventory checks, and fulfillment",
                category: "Operations",
                steps: 7,
                icon: "📦",
              },
              {
                name: "Support Ticket Routing",
                description: "Intelligently route support tickets to the right team members",
                category: "Support",
                steps: 3,
                icon: "🎫",
              },
              {
                name: "Invoice Generation",
                description: "Automatically generate and send invoices based on completed work",
                category: "Finance",
                steps: 4,
                icon: "💰",
              },
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{template.icon}</div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-base sm:text-lg">{template.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {template.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{template.steps} steps</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{template.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Plus className="h-3 w-3 mr-2" />
                    Use Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="mt-6">
          <AIWorkflowExample />
        </TabsContent>
      </Tabs>
    </div>
  )
}
