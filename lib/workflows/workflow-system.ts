import { AgentSystem } from "../ai/agent-system"
import { SupplyChainOptimizer } from "../supply-chain/optimizer"
import { EmbeddingSystem } from "../embeddings/embedding-system"
import { CodeGenerator } from "../developer/code-generator"
import { createClient } from "@supabase/supabase-js"
import type { AIWorkflow, AIWorkflowRun } from "../types/database"

// Define the workflow step interface
export interface WorkflowStep {
  id: string
  type: "agent" | "embedding" | "supply_chain" | "code_generation" | "data_analysis" | "custom"
  name: string
  description?: string
  config: Record<string, any>
  next_steps: string[]
  condition?: {
    field: string
    operator: "==" | "!=" | ">" | "<" | ">=" | "<=" | "contains" | "not_contains"
    value: any
  }
}

// Define the workflow execution context interface
export interface WorkflowContext {
  workflow_id: string
  run_id: string
  user_id: string
  input: Record<string, any>
  results: Record<string, any>
  current_step: string
  completed_steps: string[]
  error?: string
}

// Define the workflow execution result interface
export interface WorkflowExecutionResult {
  workflow_id: string
  run_id: string
  status: "completed" | "failed"
  results: Record<string, any>
  error?: string
  execution_time: number
}

// Workflow system class
export class WorkflowSystem {
  private supabase: any
  private agentSystem: AgentSystem
  private supplyChainOptimizer: SupplyChainOptimizer
  private embeddingSystem: EmbeddingSystem
  private codeGenerator: CodeGenerator

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
    this.agentSystem = new AgentSystem(supabaseUrl, supabaseKey)
    this.supplyChainOptimizer = new SupplyChainOptimizer()
    this.embeddingSystem = new EmbeddingSystem(supabaseUrl, supabaseKey)
    this.codeGenerator = new CodeGenerator(process.env.OPENAI_API_KEY || "")
  }

  // Create a new workflow
  async createWorkflow(workflow: Omit<AIWorkflow, "id" | "created_at" | "updated_at">): Promise<AIWorkflow> {
    const { data, error } = await this.supabase.from("ai_workflows").insert(workflow).select()

    if (error) {
      console.error("Error creating workflow:", error)
      throw error
    }

    return data[0]
  }

  // Get a workflow by ID
  async getWorkflow(workflowId: string, userId: string): Promise<AIWorkflow> {
    const { data, error } = await this.supabase
      .from("ai_workflows")
      .select("*")
      .eq("id", workflowId)
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error fetching workflow:", error)
      throw error
    }

    return data
  }

  // Update a workflow
  async updateWorkflow(workflowId: string, userId: string, updates: Partial<AIWorkflow>): Promise<AIWorkflow> {
    const { data, error } = await this.supabase
      .from("ai_workflows")
      .update(updates)
      .eq("id", workflowId)
      .eq("user_id", userId)
      .select()

    if (error) {
      console.error("Error updating workflow:", error)
      throw error
    }

    return data[0]
  }

  // Delete a workflow
  async deleteWorkflow(workflowId: string, userId: string): Promise<void> {
    const { error } = await this.supabase.from("ai_workflows").delete().eq("id", workflowId).eq("user_id", userId)

    if (error) {
      console.error("Error deleting workflow:", error)
      throw error
    }
  }

  // Execute a workflow
  async executeWorkflow(
    workflowId: string,
    userId: string,
    input: Record<string, any> = {},
  ): Promise<WorkflowExecutionResult> {
    const startTime = Date.now()
    let context: WorkflowContext | undefined

    try {
      // Get the workflow
      const workflow = await this.getWorkflow(workflowId, userId)

      // Create a workflow run
      const { data: runData, error: runError } = await this.supabase
        .from("ai_workflow_runs")
        .insert({
          workflow_id: workflowId,
          status: "pending",
          user_id: userId,
        })
        .select()

      if (runError) {
        console.error("Error creating workflow run:", runError)
        throw runError
      }

      const runId = runData[0].id

      // Initialize the workflow context
      context = {
        workflow_id: workflowId,
        run_id: runId,
        user_id: userId,
        input,
        results: {},
        current_step: "",
        completed_steps: [],
      }

      // Get the workflow steps
      const steps = workflow.steps as WorkflowStep[]

      // Find the first step
      const firstStep = steps.find((step) => !steps.some((s) => s.next_steps.includes(step.id)))

      if (!firstStep) {
        throw new Error("No starting step found in the workflow")
      }

      // Update the run status to running
      await this.supabase
        .from("ai_workflow_runs")
        .update({
          status: "running",
          start_time: new Date().toISOString(),
        })
        .eq("id", runId)

      // Execute the workflow
      context.current_step = firstStep.id
      await this.executeWorkflowStep(steps, context)

      // Update the run status to completed
      const { error: updateError } = await this.supabase
        .from("ai_workflow_runs")
        .update({
          status: "completed",
          end_time: new Date().toISOString(),
          results: context.results,
        })
        .eq("id", runId)

      if (updateError) {
        console.error("Error updating workflow run:", updateError)
        throw updateError
      }

      return {
        workflow_id: workflowId,
        run_id: runId,
        status: "completed",
        results: context.results,
        execution_time: Date.now() - startTime,
      }
    } catch (error) {
      console.error("Error executing workflow:", error)

      // Update the run status to failed if we have a context
      if (context?.run_id) {
        await this.supabase
          .from("ai_workflow_runs")
          .update({
            status: "failed",
            end_time: new Date().toISOString(),
            error: error instanceof Error ? error.message : "Unknown error",
          })
          .eq("id", context.run_id)
      }

      return {
        workflow_id: workflowId,
        run_id: context?.run_id || "unknown",
        status: "failed",
        results: context?.results || {},
        error: error instanceof Error ? error.message : "Unknown error",
        execution_time: Date.now() - startTime,
      }
    }
  }

  // Execute a workflow step
  private async executeWorkflowStep(steps: WorkflowStep[], context: WorkflowContext): Promise<void> {
    // Get the current step
    const currentStep = steps.find((step) => step.id === context.current_step)

    if (!currentStep) {
      throw new Error(`Step not found: ${context.current_step}`)
    }

    try {
      // Execute the step based on its type
      let stepResult: any

      switch (currentStep.type) {
        case "agent":
          stepResult = await this.executeAgentStep(currentStep, context)
          break
        case "embedding":
          stepResult = await this.executeEmbeddingStep(currentStep, context)
          break
        case "supply_chain":
          stepResult = await this.executeSupplyChainStep(currentStep, context)
          break
        case "code_generation":
          stepResult = await this.executeCodeGenerationStep(currentStep, context)
          break
        case "data_analysis":
          stepResult = await this.executeDataAnalysisStep(currentStep, context)
          break
        case "custom":
          stepResult = await this.executeCustomStep(currentStep, context)
          break
        default:
          throw new Error(`Unsupported step type: ${currentStep.type}`)
      }

      // Store the step result
      context.results[currentStep.id] = stepResult

      // Mark the step as completed
      context.completed_steps.push(currentStep.id)

      // Find the next step
      const nextStepId = this.findNextStep(currentStep, context)

      if (nextStepId) {
        // Execute the next step
        context.current_step = nextStepId
        await this.executeWorkflowStep(steps, context)
      }
      // If there's no next step, the workflow is complete
    } catch (error) {
      console.error(`Error executing step ${currentStep.id}:`, error)
      context.error = error instanceof Error ? error.message : "Unknown error"
      throw error
    }
  }

  // Find the next step based on conditions
  private findNextStep(currentStep: WorkflowStep, context: WorkflowContext): string | null {
    // If there are no next steps, we're done
    if (currentStep.next_steps.length === 0) {
      return null
    }

    // If there's only one next step and no condition, use it
    if (currentStep.next_steps.length === 1 && !currentStep.condition) {
      return currentStep.next_steps[0]
    }

    // If there's a condition, evaluate it
    if (currentStep.condition) {
      const { field, operator, value } = currentStep.condition

      // Get the field value from the step result
      const fieldValue = context.results[currentStep.id]?.[field]

      // Evaluate the condition
      let conditionMet = false

      switch (operator) {
        case "==":
          conditionMet = fieldValue === value
          break
        case "!=":
          conditionMet = fieldValue !== value
          break
        case ">":
          conditionMet = fieldValue > value
          break
        case "<":
          conditionMet = fieldValue < value
          break
        case ">=":
          conditionMet = fieldValue >= value
          break
        case "<=":
          conditionMet = fieldValue <= value
          break
        case "contains":
          conditionMet = Array.isArray(fieldValue) ? fieldValue.includes(value) : String(fieldValue).includes(value)
          break
        case "not_contains":
          conditionMet = Array.isArray(fieldValue) ? !fieldValue.includes(value) : !String(fieldValue).includes(value)
          break
        default:
          throw new Error(`Unsupported operator: ${operator}`)
      }

      // Return the appropriate next step based on the condition
      return conditionMet ? currentStep.next_steps[0] : currentStep.next_steps[1] || null
    }

    // If there's no condition but multiple next steps, use the first one
    return currentStep.next_steps[0]
  }

  // Execute an agent step
  private async executeAgentStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const { agent_id, query, max_iterations, timeout_ms } = step.config

    // Replace variables in the query
    const processedQuery = this.replaceVariables(query, context)

    // Execute the agent
    const result = await this.agentSystem.executeAgent(agent_id, processedQuery, {
      maxIterations: max_iterations,
      timeoutMs: timeout_ms,
      verbose: false,
    })

    return result
  }

  // Execute an embedding step
  private async executeEmbeddingStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const { operation, documents, query, limit, threshold, name, description } = step.config

    switch (operation) {
      case "create":
        // Replace variables in the documents
        const processedDocuments = Array.isArray(documents)
          ? documents.map((doc) => ({
              ...doc,
              content: this.replaceVariables(doc.content, context),
            }))
          : []

        // Create embeddings
        return this.embeddingSystem.createEmbeddings(
          processedDocuments,
          context.user_id,
          this.replaceVariables(name, context),
          this.replaceVariables(description, context),
        )

      case "search":
        // Replace variables in the query
        const processedQuery = this.replaceVariables(query, context)

        // Search for similar documents
        return this.embeddingSystem.searchSimilarDocuments(processedQuery, context.user_id, limit, threshold)

      default:
        throw new Error(`Unsupported embedding operation: ${operation}`)
    }
  }

  // Execute a supply chain step
  private async executeSupplyChainStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const { operation, items, available_packages, origin, destination, carriers } = step.config

    switch (operation) {
      case "optimize_packaging":
        // Process items and packages
        const processedItems = this.processValue(items, context)
        const processedPackages = this.processValue(available_packages, context)

        // Optimize packaging
        return this.supplyChainOptimizer.optimizePackaging(processedItems, processedPackages)

      case "optimize_shipping_routes":
        // Process origin, destination, and packages
        const processedOrigin = this.processValue(origin, context)
        const processedDestination = this.processValue(destination, context)
        const processedCarriers = this.processValue(carriers, context)

        // Optimize shipping routes
        return this.supplyChainOptimizer.optimizeShippingRoutes(
          processedOrigin,
          processedDestination,
          this.processValue(available_packages, context),
          processedCarriers,
        )

      case "optimize_supply_chain":
        // Process all values
        return this.supplyChainOptimizer.optimizeSupplyChain(
          this.processValue(items, context),
          this.processValue(available_packages, context),
          this.processValue(origin, context),
          this.processValue(destination, context),
          this.processValue(carriers, context),
        )

      default:
        throw new Error(`Unsupported supply chain operation: ${operation}`)
    }
  }

  // Execute a code generation step
  private async executeCodeGenerationStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const { operation, language, description, code, focus } = step.config

    switch (operation) {
      case "generate":
        // Generate code
        return this.codeGenerator.generateCode({
          language,
          description: this.replaceVariables(description, context),
          context: step.config.context ? this.replaceVariables(step.config.context, context) : undefined,
          framework: step.config.framework,
          libraries: step.config.libraries,
          examples: step.config.examples
            ? step.config.examples.map((ex: string) => this.replaceVariables(ex, context))
            : undefined,
        })

      case "review":
        // Review code
        return this.codeGenerator.reviewCode({
          code: this.replaceVariables(code, context),
          language,
          focus,
        })

      default:
        throw new Error(`Unsupported code generation operation: ${operation}`)
    }
  }

  // Execute a data analysis step
  private async executeDataAnalysisStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const { operation, data_source, analysis_type, time_period } = step.config

    // Get the data from the source
    let data: any[] = []

    if (typeof data_source === "string" && data_source.startsWith("context.")) {
      // Get data from context
      const path = data_source.split(".").slice(1)
      data = this.getValueFromPath(context, path)
    } else {
      // Get data from database
      const { data: dbData, error } = await this.supabase.from(data_source).select("*")

      if (error) {
        throw error
      }

      data = dbData
    }

    // Execute the analysis
    switch (operation) {
      case "analyze":
        switch (analysis_type) {
          case "summary":
            return this.agentSystem["generateDataSummary"](data)
          case "trends":
            return this.agentSystem["analyzeDataTrends"](data, time_period)
          case "anomalies":
            return this.agentSystem["detectAnomalies"](data)
          case "forecast":
            return this.agentSystem["generateForecast"](data, time_period)
          default:
            throw new Error(`Unsupported analysis type: ${analysis_type}`)
        }

      default:
        throw new Error(`Unsupported data analysis operation: ${operation}`)
    }
  }

  // Execute a custom step
  private async executeCustomStep(step: WorkflowStep, context: WorkflowContext): Promise<any> {
    const { function_name, parameters } = step.config

    // Process parameters
    const processedParameters = this.processValue(parameters, context)

    // Execute the custom function
    switch (function_name) {
      case "fetch_data":
        return this.fetchData(processedParameters, context)
      case "transform_data":
        return this.transformData(processedParameters, context)
      case "save_data":
        return this.saveData(processedParameters, context)
      default:
        throw new Error(`Unsupported custom function: ${function_name}`)
    }
  }

  // Custom function: Fetch data
  private async fetchData(parameters: any, context: WorkflowContext): Promise<any> {
    const { source, query, filters } = parameters

    if (source === "supabase") {
      let queryBuilder = this.supabase.from(query.table).select(query.select || "*")

      // Apply filters
      if (filters) {
        for (const filter of filters) {
          const { field, operator, value } = filter

          switch (operator) {
            case "eq":
              queryBuilder = queryBuilder.eq(field, value)
              break
            case "neq":
              queryBuilder = queryBuilder.neq(field, value)
              break
            case "gt":
              queryBuilder = queryBuilder.gt(field, value)
              break
            case "lt":
              queryBuilder = queryBuilder.lt(field, value)
              break
            case "gte":
              queryBuilder = queryBuilder.gte(field, value)
              break
            case "lte":
              queryBuilder = queryBuilder.lte(field, value)
              break
            case "like":
              queryBuilder = queryBuilder.like(field, value)
              break
            case "ilike":
              queryBuilder = queryBuilder.ilike(field, value)
              break
            case "in":
              queryBuilder = queryBuilder.in(field, value)
              break
            default:
              throw new Error(`Unsupported filter operator: ${operator}`)
          }
        }
      }

      // Execute the query
      const { data, error } = await queryBuilder

      if (error) {
        throw error
      }

      return data
    } else if (source === "api") {
      // Fetch data from an API
      const response = await fetch(query.url, {
        method: query.method || "GET",
        headers: query.headers || {},
        body: query.body ? JSON.stringify(query.body) : undefined,
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`)
      }

      return response.json()
    } else {
      throw new Error(`Unsupported data source: ${source}`)
    }
  }

  // Custom function: Transform data
  private transformData(parameters: any, context: WorkflowContext): any {
    const { data, transformations } = parameters

    let result = Array.isArray(data) ? [...data] : { ...data }

    for (const transformation of transformations) {
      const { type, config } = transformation

      switch (type) {
        case "filter":
          if (Array.isArray(result)) {
            result = result.filter((item) => {
              const { field, operator, value } = config

              switch (operator) {
                case "==":
                  return item[field] === value
                case "!=":
                  return item[field] !== value
                case ">":
                  return item[field] > value
                case "<":
                  return item[field] < value
                case ">=":
                  return item[field] >= value
                case "<=":
                  return item[field] <= value
                case "contains":
                  return String(item[field]).includes(value)
                case "not_contains":
                  return !String(item[field]).includes(value)
                default:
                  throw new Error(`Unsupported filter operator: ${operator}`)
              }
            })
          }
          break

        case "map":
          if (Array.isArray(result)) {
            result = result.map((item) => {
              const newItem = { ...item }

              for (const [key, value] of Object.entries(config.mapping)) {
                if (typeof value === "string" && value.startsWith("item.")) {
                  const field = value.slice(5)
                  newItem[key] = item[field]
                } else {
                  newItem[key] = value
                }
              }

              return newItem
            })
          }
          break

        case "sort":
          if (Array.isArray(result)) {
            result = result.sort((a, b) => {
              const { field, order } = config

              if (order === "asc") {
                return a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0
              } else {
                return a[field] > b[field] ? -1 : a[field] < b[field] ? 1 : 0
              }
            })
          }
          break

        case "group":
          if (Array.isArray(result)) {
            const { field, aggregations } = config

            const groups: Record<string, any> = {}

            for (const item of result) {
              const key = item[field]

              if (!groups[key]) {
                groups[key] = {
                  [field]: key,
                  items: [],
                }

                for (const agg of aggregations) {
                  groups[key][agg.name] = agg.type === "count" ? 0 : null
                }
              }

              groups[key].items.push(item)

              for (const agg of aggregations) {
                if (agg.type === "count") {
                  groups[key][agg.name]++
                } else if (agg.type === "sum") {
                  groups[key][agg.name] = (groups[key][agg.name] || 0) + item[agg.field]
                } else if (agg.type === "avg") {
                  if (groups[key][agg.name] === null) {
                    groups[key][agg.name] = {
                      sum: item[agg.field],
                      count: 1,
                    }
                  } else {
                    groups[key][agg.name].sum += item[agg.field]
                    groups[key][agg.name].count++
                  }
                } else if (agg.type === "min") {
                  if (groups[key][agg.name] === null || item[agg.field] < groups[key][agg.name]) {
                    groups[key][agg.name] = item[agg.field]
                  }
                } else if (agg.type === "max") {
                  if (groups[key][agg.name] === null || item[agg.field] > groups[key][agg.name]) {
                    groups[key][agg.name] = item[agg.field]
                  }
                }
              }
            }

            // Calculate averages
            for (const group of Object.values(groups)) {
              for (const agg of aggregations) {
                if (agg.type === "avg") {
                  group[agg.name] = group[agg.name].sum / group[agg.name].count
                }
              }
            }

            result = Object.values(groups)
          }
          break

        default:
          throw new Error(`Unsupported transformation type: ${type}`)
      }
    }

    return result
  }

  // Custom function: Save data
  private async saveData(parameters: any, context: WorkflowContext): Promise<any> {
    const { destination, data, operation } = parameters

    if (destination === "supabase") {
      const { table } = parameters

      switch (operation) {
        case "insert":
          const { data: insertData, error: insertError } = await this.supabase.from(table).insert(data).select()

          if (insertError) {
            throw insertError
          }

          return insertData

        case "update":
          const { match_field, match_value } = parameters

          const { data: updateData, error: updateError } = await this.supabase
            .from(table)
            .update(data)
            .eq(match_field, match_value)
            .select()

          if (updateError) {
            throw updateError
          }

          return updateData

        case "upsert":
          const { data: upsertData, error: upsertError } = await this.supabase.from(table).upsert(data).select()

          if (upsertError) {
            throw upsertError
          }

          return upsertData

        case "delete":
          const { match_field: deleteField, match_value: deleteValue } = parameters

          const { data: deleteData, error: deleteError } = await this.supabase
            .from(table)
            .delete()
            .eq(deleteField, deleteValue)
            .select()

          if (deleteError) {
            throw deleteError
          }

          return deleteData

        default:
          throw new Error(`Unsupported database operation: ${operation}`)
      }
    } else if (destination === "file") {
      // In a real implementation, this would save data to a file
      // For this example, we'll just return the data
      return {
        success: true,
        message: "Data saved to file (simulated)",
        data,
      }
    } else {
      throw new Error(`Unsupported data destination: ${destination}`)
    }
  }

  // Helper method to replace variables in a string
  private replaceVariables(text: string, context: WorkflowContext): string {
    if (!text) return text

    return text.replace(/\${([^}]+)}/g, (match, path) => {
      const value = this.getValueFromPath(context, path.split("."))
      return value !== undefined ? String(value) : match
    })
  }

  // Helper method to process a value (replace variables in strings, arrays, and objects)
  private processValue(value: any, context: WorkflowContext): any {
    if (typeof value === "string") {
      return this.replaceVariables(value, context)
    } else if (Array.isArray(value)) {
      return value.map((item) => this.processValue(item, context))
    } else if (value && typeof value === "object") {
      const result: Record<string, any> = {}

      for (const [key, val] of Object.entries(value)) {
        result[key] = this.processValue(val, context)
      }

      return result
    } else {
      return value
    }
  }

  // Helper method to get a value from a path
  private getValueFromPath(obj: any, path: string[]): any {
    let current = obj

    for (const key of path) {
      if (current === undefined || current === null) {
        return undefined
      }

      current = current[key]
    }

    return current
  }

  // Get all workflows for a user
  async getUserWorkflows(userId: string): Promise<AIWorkflow[]> {
    const { data, error } = await this.supabase.from("ai_workflows").select("*").eq("user_id", userId)

    if (error) {
      console.error("Error fetching user workflows:", error)
      throw error
    }

    return data
  }

  // Get all workflow runs for a workflow
  async getWorkflowRuns(workflowId: string, userId: string): Promise<AIWorkflowRun[]> {
    const { data, error } = await this.supabase
      .from("ai_workflow_runs")
      .select("*")
      .eq("workflow_id", workflowId)
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching workflow runs:", error)
      throw error
    }

    return data
  }

  // Get a workflow run by ID
  async getWorkflowRun(runId: string, userId: string): Promise<AIWorkflowRun> {
    const { data, error } = await this.supabase
      .from("ai_workflow_runs")
      .select("*")
      .eq("id", runId)
      .eq("user_id", userId)
      .single()

    if (error) {
      console.error("Error fetching workflow run:", error)
      throw error
    }

    return data
  }

  // Delete a workflow run
  async deleteWorkflowRun(runId: string, userId: string): Promise<void> {
    const { error } = await this.supabase.from("ai_workflow_runs").delete().eq("id", runId).eq("user_id", userId)

    if (error) {
      console.error("Error deleting workflow run:", error)
      throw error
    }
  }
}
