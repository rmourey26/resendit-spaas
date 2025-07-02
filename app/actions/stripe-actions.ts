"use server"

import { stripe } from "@/lib/stripe"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"

export async function createCheckoutSession(priceId: string) {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single()

  let customerId = profile?.stripe_customer_id

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email!,
      name: user.user_metadata?.full_name,
      metadata: {
        userId: user.id,
      },
    })
    customerId = customer.id
    await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id)
  }

  const origin = headers().get("origin")!
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/ai-suite/billing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/ai-suite/billing`,
      metadata: {
        userId: user.id,
      },
    })

    if (session.url) {
      return redirect(session.url)
    }
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return redirect("/ai-suite/billing?error=true")
  }

  return redirect("/ai-suite/billing?error=true")
}

export async function createStripePortalSession() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("stripe_customer_id").eq("id", user.id).single()

  if (!profile?.stripe_customer_id) {
    console.error("User does not have a billing account.")
    return redirect("/ai-suite/billing?error=no_customer")
  }

  const origin = headers().get("origin")!
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${origin}/ai-suite/billing`,
  })

  if (portalSession.url) {
    return redirect(portalSession.url)
  }

  return redirect("/ai-suite/billing?error=portal_failed")
}
