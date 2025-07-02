"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AIModelsList } from "@/components/ai-suite/ai-models-list"
import { AIAgentsList } from "@/components/ai-suite/ai-agents-list"
import { AIWorkflowsList } from "@/components/ai-suite/ai-workflows-list"
import { AIWorkflowExample } from "@/components/ai-suite/ai-workflow-example"
import { AIChat } from "@/components/ai-suite/ai-chat"
import { AICodeGenerator } from "@/components/ai-suite/ai-code-generator"
import { AISupplyChainOptimizer } from "@/components/ai-suite/ai-supply-chain-optimizer"
import type { AIModel } from "@/lib/types/database"
import { Database, MessageSquare, Code, Truck, Cpu, GitBranch, BarChart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AISuiteClientProps {
  user: any
  aiModels: AIModel[]
  aiAgents: any[]
  workflows: any[]
}

export function AISuiteClient({ user, aiModels, aiAgents, workflows }: AISuiteClientProps) {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="space-y-8">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        orientation="vertical"
        className="w-full flex flex-col md:flex-row items-start justify-center gap-2"
      >
        {/* Desktop tabs - vertical layout */}
        <TabsList className="hidden md:grid grid-cols-1 h-auto w-fit p-0 divide-y border shrink-0">
          <TabsTrigger value="chat" className="flex items-center justify-start">
            <MessageSquare className="h-4 w-4 mr-2" />
            <span>AI Chat</span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center justify-start">
            <Code className="h-4 w-4 mr-2" />
            <span>Code Generator</span>
          </TabsTrigger>
          <TabsTrigger value="supply-chain" className="flex items-center justify-start">
            <Truck className="h-4 w-4 mr-2" />
            <span>Supply Chain</span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center justify-start">
            <Cpu className="h-4 w-4 mr-2" />
            <span>AI Models</span>
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex items-center justify-start">
            <BarChart className="h-4 w-4 mr-2" />
            <span>AI Agents</span>
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex items-center justify-start">
            <GitBranch className="h-4 w-4 mr-2" />
            <span>Workflows</span>
          </TabsTrigger>
          <TabsTrigger value="embeddings" className="flex items-center justify-start">
            <Database className="h-4 w-4 mr-2" />
            <span>Embeddings</span>
          </TabsTrigger>
        </TabsList>

        {/* Mobile tabs - horizontal layout */}
        <TabsList className="md:hidden flex flex-row w-full overflow-x-auto p-1 border rounded-lg mb-4">
          <TabsTrigger value="chat" className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]">
            <MessageSquare className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
          <TabsTrigger value="code" className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]">
            <Code className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
          <TabsTrigger
            value="supply-chain"
            className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]"
          >
            <Truck className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
          <TabsTrigger value="models" className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]">
            <Cpu className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
          <TabsTrigger value="agents" className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]">
            <BarChart className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
          <TabsTrigger value="workflows" className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]">
            <GitBranch className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
          <TabsTrigger value="embeddings" className="flex flex-col items-center justify-center p-2 flex-1 min-w-[50px]">
            <Database className="h-5 w-5 mb-1" />
            <span className="text-[0.6rem]"></span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="py-4 flex-1 w-full">
          <AIChat user={user} aiModels={aiModels} />
        </TabsContent>

        <TabsContent value="code" className="py-4 flex-1 w-full">
          <AICodeGenerator user={user} aiModels={aiModels} />
        </TabsContent>

        <TabsContent value="supply-chain" className="py-4 flex-1 w-full">
          <AISupplyChainOptimizer user={user} aiModels={aiModels} />
        </TabsContent>

        <TabsContent value="models" className="py-4 flex-1 w-full">
          <AIModelsList models={aiModels} />
        </TabsContent>

        <TabsContent value="agents" className="py-4 flex-1 w-full">
          <AIAgentsList agents={aiAgents} user={user} aiModels={aiModels} />
        </TabsContent>

        <TabsContent value="workflows" className="py-4 flex-1 w-full">
          <div className="space-y-6">
            <AIWorkflowExample />
            <AIWorkflowsList workflows={workflows} user={user} />
          </div>
        </TabsContent>

        <TabsContent value="embeddings" className="py-4 flex-1 w-full">
          <div className="flex flex-col items-center justify-center p-8 border rounded-lg">
            <Database className="h-12 w-12 mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">Manage Embeddings</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              Upload documents, manage embeddings, and configure RAG settings
            </p>
            <Button asChild>
              <a href="/ai-suite/embeddings">Open Embeddings Manager</a>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
