import type { Metadata } from "next"
import { IntegrationsClient } from "./integrations-client"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "External Integrations - AI Business Suite",
  description: "Connect your e-commerce stores and external platforms to the Resend-It ecosystem.",
}

export default async function IntegrationsPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: integrations, error } = await supabase
    .from("external_integrations")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching integrations:", error)
    // Handle error appropriately, maybe show a toast on the client
  }

  return <IntegrationsClient initialIntegrations={integrations || []} />
}
