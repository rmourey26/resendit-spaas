import type { Metadata } from "next"
import { ManagedDatabasesClient } from "./managed-databases-client"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Managed Databases - AI Business Suite",
  description: "Create and manage your dedicated Supabase databases for the Resend-It ecosystem.",
}

export default async function ManagedDatabasesPage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <ManagedDatabasesClient />
}
