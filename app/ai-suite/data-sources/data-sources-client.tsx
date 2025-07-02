"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus, Database, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DatabaseConnectionsList } from "@/components/ai-suite/data-sources/database-connections-list"
import { DatabaseConnectionForm } from "@/components/ai-suite/data-sources/database-connection-form"
import {
  getDatabaseConnections,
  createDbConnection,
  updateDbConnection,
  deleteDbConnection,
  testDbConnection,
} from "@/app/actions/ai-actions"
import { useToast } from "@/hooks/use-toast"
import type {
  DatabaseConnection,
  CreateDatabaseConnectionInput,
  UpdateDatabaseConnectionInput,
} from "@/lib/types/database"
import { ManagedDatabasesClient as UserManagedDatabasesFeatureClient } from "../managed-databases/managed-databases-client" // Renaming for clarity

export function DataSourcesClient() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingConnection, setEditingConnection] = useState<DatabaseConnection | null>(null)
  const [activeTab, setActiveTab] = useState("external_connections") // Default to existing connections
  const { toast } = useToast()
  const queryClient = useQueryClient()

  // Fetch database connections
  const {
    data: connections = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["database-connections"],
    queryFn: getDatabaseConnections,
  })

  // Create connection mutation
  const createMutation = useMutation({
    mutationFn: createDbConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["database-connections"] })
      setIsFormOpen(false)
      toast({
        title: "Success",
        description: "Database connection created successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create database connection",
        variant: "destructive",
      })
    },
  })

  // Update connection mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDatabaseConnectionInput }) =>
      updateDbConnection({ id, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["database-connections"] })
      setEditingConnection(null)
      setIsFormOpen(false)
      toast({
        title: "Success",
        description: "Database connection updated successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update database connection",
        variant: "destructive",
      })
    },
  })

  // Delete connection mutation
  const deleteMutation = useMutation({
    mutationFn: deleteDbConnection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["database-connections"] })
      toast({
        title: "Success",
        description: "Database connection deleted successfully",
      })
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete database connection",
        variant: "destructive",
      })
    },
  })

  // Test connection mutation
  const testMutation = useMutation({
    mutationFn: testDbConnection,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["database-connections"] })
      toast({
        title: result.success ? "Connection Successful" : "Connection Failed",
        description: result.message,
        variant: result.success ? "default" : "destructive",
      })
    },
    onError: (error) => {
      toast({
        title: "Test Failed",
        description: error.message || "Failed to test database connection",
        variant: "destructive",
      })
    },
  })

  const handleCreate = (data: CreateDatabaseConnectionInput) => {
    createMutation.mutate(data)
  }

  const handleUpdate = (id: string, data: UpdateDatabaseConnectionInput) => {
    updateMutation.mutate({ id, data })
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this database connection?")) {
      deleteMutation.mutate(id)
    }
  }

  const handleTest = (id: string) => {
    testMutation.mutate(id)
  }

  const handleEdit = (connection: DatabaseConnection) => {
    setEditingConnection(connection)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingConnection(null)
  }

  const getConnectionStats = () => {
    const total = connections.length
    const active = connections.filter((c) => c.is_active).length
    const successful = connections.filter((c) => c.last_test_status === "success").length
    const failed = connections.filter((c) => c.last_test_status === "failed").length

    return { total, active, successful, failed }
  }

  const stats = getConnectionStats()

  if (error) {
    return (
      <div className="container mx-auto py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Failed to load database connections. Please try again.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Data Sources</h1>
          <p className="text-muted-foreground mt-2">
            Connect external databases or provision new managed databases for your AI workflows.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Tests</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.successful}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="external_connections">External Connections</TabsTrigger>
          <TabsTrigger value="managed_databases">Managed Databases</TabsTrigger>
          <TabsTrigger value="integration">AI Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="external_connections" className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">External Database Connections</h2>
              <p className="text-muted-foreground">Manage your connections to existing external databases.</p>
            </div>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add External Connection
            </Button>
          </div>
          <DatabaseConnectionsList
            connections={connections}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTest={handleTest}
            isTestingId={testMutation.isPending ? testMutation.variables : null}
          />
        </TabsContent>

        <TabsContent value="managed_databases" className="space-y-4">
          <UserManagedDatabasesFeatureClient />
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Integration Options</CardTitle>
              <CardDescription>Configure how your database connections integrate with AI features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  AI integration features are coming soon. You'll be able to:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Generate embeddings from database tables</li>
                    <li>Use database queries in AI workflows</li>
                    <li>Connect AI agents to your data sources</li>
                    <li>Analyze supply chain data with AI</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connection Form Modal/Dialog */}
      {isFormOpen && (
        <DatabaseConnectionForm
          connection={editingConnection}
          onSubmit={editingConnection ? (data) => handleUpdate(editingConnection.id, data) : handleCreate}
          onCancel={handleCloseForm}
          isLoading={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  )
}
