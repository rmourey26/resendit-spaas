import { createServerSupabaseClient } from "@/lib/supabase/server"
import { HeaderContent } from "@/components/header-content"

export async function SiteHeader() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const mainNavItems = [
    { title: "Home", href: "/" },
    { title: "Features", href: "/#features" },
    { title: "About", href: "/about" },
    { title: "API-Docs", href: "/api-docs" },
  ]

  const authNavItems = user
    ? [
        { title: "Dashboard", href: "/dashboard" },
        { title: "CRM", href: "/admin/crm" },
        { title: "AI Suite", href: "/ai-suite" },
        { title: "Packaging", href: "/packaging" },
        { title: "Shipping", href: "/shipping" },
        { title: "Sustainability", href: "/sustainability" },
        { title: "Demo", href: "/demo" },
      ]
    : [
        { title: "Login", href: "/login" },
        { title: "Sign Up", href: "/signup" },
      ]

  const allNavItems = [...mainNavItems, ...authNavItems]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-500/20">
      <HeaderContent user={user} mainNavItems={mainNavItems} authNavItems={authNavItems} allNavItems={allNavItems} />
    </header>
  )
}
