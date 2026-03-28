import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function generateSlug(title) {
  const base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .substring(0, 50)
  const suffix = Math.random().toString(36).substring(2, 6)
  return `${base}-${suffix}`
}

export async function POST(request) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  try {
    const formData = await request.formData()

    const title = formData.get('title')?.toString().trim()
    const description = formData.get('description')?.toString().trim()
    const location = formData.get('location')?.toString().trim()
    const creator_email = formData.get('creator_email')?.toString().trim()
    const goal_signatures = parseInt(formData.get('goal_signatures') || '500', 10)

    if (!title || !description || !location || !creator_email) {
      return Response.redirect(
        `${baseUrl}/crear-peticion?error=${encodeURIComponent('Faltan campos obligatorios.')}`,
        302
      )
    }

    // Upload images (max 3) to Supabase Storage
    const imageFiles = formData.getAll('images')
    const imageUrls = []

    for (const file of imageFiles.slice(0, 3)) {
      if (!(file instanceof File) || file.size === 0) continue
      const ext = file.name.split('.').pop() || 'jpg'
      const path = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`
      const buffer = new Uint8Array(await file.arrayBuffer())
      const { error } = await supabaseAdmin.storage
        .from('petition-images')
        .upload(path, buffer, { contentType: file.type })
      if (!error) {
        const { data } = supabaseAdmin.storage
          .from('petition-images')
          .getPublicUrl(path)
        imageUrls.push(data.publicUrl)
      }
    }

    const slug = generateSlug(title)

    const { data: petition, error: insertError } = await supabaseAdmin
      .from('petitions')
      .insert({
        slug,
        title,
        description,
        location,
        creator_email,
        status: 'pending',
        goal_signatures,
        images: imageUrls.length > 0 ? imageUrls : null,
      })
      .select('id')
      .single()

    if (insertError || !petition) {
      return Response.redirect(
        `${baseUrl}/crear-peticion?error=${encodeURIComponent('Error al guardar la petición. Por favor, inténtalo de nuevo.')}`,
        302
      )
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: creator_email,
      metadata: {
        type: 'petition_creation',
        petition_id: petition.id,
        slug,
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Publicar petición en MejoraMiBarrio',
              description: 'Tu petición se publicará inmediatamente después del pago.',
            },
            unit_amount: 4900,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/crear-peticion/gracias?slug=${slug}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/crear-peticion`,
    })

    return Response.redirect(session.url, 302)
  } catch (err) {
    console.error('create-petition error:', err)
    return Response.redirect(
      `${baseUrl}/crear-peticion?error=${encodeURIComponent('Error interno. Por favor, inténtalo de nuevo.')}`,
      302
    )
  }
}
