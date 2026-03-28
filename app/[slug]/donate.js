'use server'

import Stripe from 'stripe'
import { redirect } from 'next/navigation'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function createCheckoutSession(formData) {
  const amount = parseInt(formData.get('amount'))
  const slug = formData.get('slug')
  const email = formData.get('email') || undefined
  const name = formData.get('name') || undefined
  const phone = formData.get('phone') || undefined
  const postal_code = formData.get('postal_code') || undefined
  const dni = formData.get('dni') || undefined

  const validAmounts = [1, 5, 20, 100]
  if (!validAmounts.includes(amount)) return

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: email,
    metadata: {
      slug,
      ...(name && { name }),
      ...(phone && { phone }),
      ...(postal_code && { postal_code }),
      ...(dni && { dni }),
    },
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'Apoya esta petición',
            description: 'Tu donación se usará para atraer más firmantes y presionar al ayuntamiento.',
          },
          unit_amount: amount * 100,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/${slug}?donated=true`,
    cancel_url: `${baseUrl}/${slug}?donated=cancelled`,
  })

  redirect(session.url)
}
