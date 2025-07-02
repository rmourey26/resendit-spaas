"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { EmbeddingSystem } from "@/lib/embeddings/embedding-system"

const SHOPIFY_API_VERSION = "2024-04"

// --- Shopify OAuth Actions ---

export async function initiateShopifyAuth(): Promise<{ success: boolean; authUrl?: string; error?: string }> {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "User not authenticated." }
  }

  const shop = "your-dev-store.myshopify.com" // In a real app, you'd get this from the user
  const apiKey = process.env.SHOPIFY_API_KEY
  const scopes = "read_products,read_orders,read_customers"
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/shopify`

  if (!apiKey || !process.env.NEXT_PUBLIC_APP_URL) {
    console.error("Shopify API key or App URL is not configured.")
    return { success: false, error: "Platform configuration error." }
  }

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`

  return { success: true, authUrl }
}

export async function handleShopifyCallback(code: string, shop: string): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.SHOPIFY_API_KEY
  const apiSecret = process.env.SHOPIFY_API_SECRET

  if (!apiKey || !apiSecret) {
    return { success: false, error: "Platform configuration error." }
  }

  try {
    // Exchange authorization code for an access token
    const response = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: apiKey,
        client_secret: apiSecret,
        code,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.json()
      throw new Error(`Failed to get access token: ${JSON.stringify(errorBody)}`)
    }

    const { access_token, scope } = await response.json()

    // Securely store the token and connection details
    const supabase = createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return { success: false, error: "User session expired." }
    }

    // IMPORTANT: Encrypt the access token before storing it.
    // This requires a secure key management system, not implemented here for brevity.
    const encrypted_access_token = Buffer.from(access_token) // Placeholder for actual encryption

    const { error: dbError } = await supabase.from("external_integrations").upsert(
      {
        user_id: user.id,
        provider: "shopify",
        provider_shop_id: shop,
        encrypted_access_token,
        scopes: scope.split(","),
        status: "active",
      },
      { onConflict: "user_id, provider, provider_shop_id" },
    )

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`)
    }

    // Trigger initial data sync in the background
    await triggerShopifyDataSync(user.id, shop)

    return { success: true }
  } catch (error) {
    console.error("Shopify callback error:", error)
    return { success: false, error: error instanceof Error ? error.message : "An unknown error occurred." }
  }
}

// --- Data Sync and Embedding Actions ---

export async function triggerShopifyDataSync(userId: string, shop: string) {
  // In a real app, this would add a job to a background queue (e.g., BullMQ, Supabase Edge Functions).
  // For now, we'll call it directly.
  console.log(`Triggering data sync for Shopify store: ${shop}`)
  await syncAndEmbedShopifyProducts(userId, shop)
  // You would also trigger syncs for orders, customers, etc.
}

async function getShopifyAccessToken(userId: string, shop: string): Promise<string | null> {
  const supabase = createServerSupabaseClient()
  const { data, error } = await supabase
    .from("external_integrations")
    .select("encrypted_access_token")
    .eq("user_id", userId)
    .eq("provider", "shopify")
    .eq("provider_shop_id", shop)
    .single()

  if (error || !data) {
    console.error("Could not find access token for shop:", shop)
    return null
  }

  // IMPORTANT: Decrypt the token here.
  return Buffer.from(data.encrypted_access_token).toString("utf-8") // Placeholder for actual decryption
}

export async function syncAndEmbedShopifyProducts(userId: string, shop: string) {
  const accessToken = await getShopifyAccessToken(userId, shop)
  if (!accessToken) return

  const supabase = createServerSupabaseClient()
  await supabase
    .from("external_integrations")
    .update({ sync_status: "syncing" })
    .eq("user_id", userId)
    .eq("provider_shop_id", shop)

  try {
    // Fetch products from Shopify GraphQL API
    const query = `
      query {
        products(first: 50) {
          edges {
            node {
              id
              title
              descriptionHtml
              handle
              onlineStoreUrl
              featuredImage {
                url
              }
              variants(first: 5) {
                edges {
                  node {
                    price
                    sku
                  }
                }
              }
            }
          }
        }
      }
    `
    const response = await fetch(`https://${shop}/admin/api/${SHOPIFY_API_VERSION}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
      body: JSON.stringify({ query }),
    })

    const { data: shopifyData } = await response.json()
    const products = shopifyData.products.edges.map((edge: any) => edge.node)

    // Prepare documents for our Embedding System
    const documents = products.map((product: any) => ({
      id: product.id,
      content: `Product: ${product.title}. Description: ${product.descriptionHtml.replace(/<[^>]*>?/gm, " ")}`,
      metadata: {
        source: "shopify",
        type: "product",
        shop,
        handle: product.handle,
        url: product.onlineStoreUrl,
        imageUrl: product.featuredImage?.url,
        price: product.variants.edges[0]?.node.price,
      },
    }))

    // Use our existing Embedding System
    const embeddingSystem = new EmbeddingSystem(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    )

    await embeddingSystem.createEmbeddings(
      documents,
      userId,
      `${shop} Products`,
      `Product catalog embeddings for ${shop}`,
    )

    await supabase
      .from("external_integrations")
      .update({ sync_status: "completed", last_sync_at: new Date().toISOString() })
      .eq("user_id", userId)
      .eq("provider_shop_id", shop)
  } catch (error) {
    console.error("Error during Shopify sync:", error)
    await supabase
      .from("external_integrations")
      .update({ sync_status: "failed", sync_error_message: (error as Error).message })
      .eq("user_id", userId)
      .eq("provider_shop_id", shop)
  }
}
