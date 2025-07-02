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

// Helper function to get absolute URLs
export function getAbsoluteUrl(path: string): string {
  return `${config.appUrl}${path.startsWith("/") ? path : `/${path}`}`
}
