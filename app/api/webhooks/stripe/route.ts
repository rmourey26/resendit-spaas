import { stripe } from "@/lib/stripe"
import { createAdminSupabaseClient } from "@/lib/supabase/admin"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

const relevantEvents = new Set([
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])

const toDateTime = (secs: number) => {
  const t = new Date("1970-01-01T00:00:00Z")
  t.setSeconds(secs)
  return t
}

const manageSubscriptionStatusChange = async (subscriptionId: string, customerId: string, createAction = false) => {
  const supabaseAdmin = createAdminSupabaseClient()
  const { data: profile } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single()

  if (!profile) {
    // If profile not found, it might be a new customer from the webhook.
    // We can't link without a user ID, so we log and exit.
    // The user ID should be in the checkout session metadata.
    console.warn(`Webhook Error: No profile found for customer ID: ${customerId}`)
    return
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  })

  const subscriptionData = {
    id: subscription.id,
    user_id: profile.id,
    metadata: subscription.metadata,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
    quantity: subscription.items.data[0].quantity,
    cancel_at_period_end: subscription.cancel_at_period_end,
    cancel_at: subscription.cancel_at ? toDateTime(subscription.cancel_at).toISOString() : null,
    canceled_at: subscription.canceled_at ? toDateTime(subscription.canceled_at).toISOString() : null,
    current_period_start: toDateTime(subscription.current_period_start).toISOString(),
    current_period_end: toDateTime(subscription.current_period_end).toISOString(),
    ended_at: subscription.ended_at ? toDateTime(subscription.ended_at).toISOString() : null,
    trial_start: subscription.trial_start ? toDateTime(subscription.trial_start).toISOString() : null,
    trial_end: subscription.trial_end ? toDateTime(subscription.trial_end).toISOString() : null,
  }

  await supabaseAdmin.from("subscriptions").upsert(subscriptionData)
  console.log(`Inserted/updated subscription [${subscription.id}] for user [${profile.id}]`)
}

export async function POST(req: Request) {
  const body = await req.text()
  const sig = headers().get("Stripe-Signature") as string
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!sig || !webhookSecret) {
      console.error("Webhook secret or signature not found.")
      return new NextResponse("Webhook secret not found.", { status: 400 })
    }
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err: any) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          if (checkoutSession.mode === "subscription") {
            const subscriptionId = checkoutSession.subscription as string
            const customerId = checkoutSession.customer as string
            await manageSubscriptionStatusChange(subscriptionId, customerId, true)
          }
          break
        }
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const subscription = event.data.object as Stripe.Subscription
          await manageSubscriptionStatusChange(subscription.id, subscription.customer as string)
          break
        }
        default:
          throw new Error("Unhandled relevant event!")
      }
    } catch (error) {
      console.error("Webhook handler failed:", error)
      return new NextResponse("Webhook handler failed. View logs.", { status: 400 })
    }
  }

  return NextResponse.json({ received: true })
}
