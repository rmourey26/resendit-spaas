// Environment variables configuration
export const config = {
  // App URLs
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  // Supabase
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",

  // Seeding
  seedUserId: process.env.SEED_USER_ID || "",

  // Network
  suiNetwork: process.env.NEXT_PUBLIC_SUI_NETWORK || "testnet",
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter: string
    github: string
  }
  mainNav: {
    title: string
    href: string
    disabled?: boolean
  }[]
}

export const siteConfig: SiteConfig = {
  name: "Resend-It",
  description: "Smart Packaging as a Service with IoT sensors, AI optimization, and blockchain verification.",
  url: "https://platform.resendit.com",
  ogImage: "https://platform.resendit.com/og.jpg",
  links: {
    twitter: "https://twitter.com/resendit",
    github: "https://github.com/resendit",
  },
  mainNav: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "Ecosystem",
      href: "/ecosystem",
    },
    {
      title: "API Docs",
      href: "/api-docs",
    },
    {
      title: "About",
      href: "/about",
    },
  ],
}

// Helper function to get absolute URLs
export function getAbsoluteUrl(path: string): string {
  return `${config.appUrl}${path.startsWith("/") ? path : `/${path}`}`
}
