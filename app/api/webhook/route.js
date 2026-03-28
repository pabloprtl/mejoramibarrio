import { headers } from 'next/headers'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function POST(request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    return new Response(`Webhook error: ${err.message}`, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const { type } = session.metadata

    if (type === 'petition_creation') {
      // Activate the petition that was created pending payment
      const { petition_id } = session.metadata
      await supabaseAdmin
        .from('petitions')
        .update({ status: 'active', stripe_session_id: session.id })
        .eq('id', petition_id)
    } else {
      // Donation to an existing petition
      const { slug, name, phone, postal_code, dni } = session.metadata
      await supabaseAdmin.from('donations').insert({
        petition_slug: slug,
        amount_eur: session.amount_total / 100,
        stripe_session_id: session.id,
        email: session.customer_details?.email || null,
        name: name || null,
        phone: phone || null,
        postal_code: postal_code || null,
        dni: dni || null,
      })
    }
  }

  return new Response('ok', { status: 200 })
}
