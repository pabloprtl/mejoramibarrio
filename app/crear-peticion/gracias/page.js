import Link from 'next/link'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import QRCode from 'qrcode'
import { Wordmark } from '@/app/components/Logo'

export const metadata = {
  title: 'Petición publicada — MejoraMiBarrio',
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function GraciasPage({ searchParams }) {
  const { slug, session_id } = await searchParams
  const petitionUrl = `https://mejoramibarrio.es/${slug}`

  // Verify payment and activate petition
  if (session_id && slug) {
    try {
      const session = await stripe.checkout.sessions.retrieve(session_id)
      if (session.payment_status === 'paid' && session.metadata?.slug === slug) {
        await supabaseAdmin
          .from('petitions')
          .update({ status: 'active' })
          .eq('slug', slug)
          .eq('status', 'pending')
      }
    } catch {
      // If verification fails, the webhook will still activate it
    }
  }

  const qrDataUrl = slug
    ? await QRCode.toDataURL(petitionUrl, {
        width: 256,
        margin: 2,
        color: { dark: '#1B3A5C', light: '#FFFFFF' },
      })
    : null

  const whatsappText = encodeURIComponent(
    `He publicado una petición ciudadana en MejoraMiBarrio.\n¡Firma y comparte con tus vecinos! 👇\n${petitionUrl}`
  )

  return (
    <div className="min-h-screen bg-bg">

      {/* Nav */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <Link href="/"><Wordmark className="text-base sm:text-lg" /></Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-16">

        {/* Success header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-text mb-2">
            ¡Tu petición ya está activa!
          </h1>
          <p className="text-base text-muted leading-relaxed">
            Comparte con tus vecinos para empezar a recoger firmas.
          </p>
        </div>

        <div className="space-y-4">

          {/* WhatsApp share */}
          <div className="bg-surface rounded-2xl border border-border p-4 sm:p-6">
            <p className="text-sm font-semibold text-text mb-1">Compartir por WhatsApp</p>
            <p className="text-sm text-muted mb-4">
              Envíalo a tus grupos de vecinos para empezar a recoger firmas.
            </p>
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fba58] text-white font-semibold rounded-xl py-4 text-base transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Compartir por WhatsApp
            </a>
          </div>

          {/* QR code */}
          {qrDataUrl && (
            <div className="bg-surface rounded-2xl border border-border p-4 sm:p-6">
              <p className="text-sm font-semibold text-text mb-1">Código QR de tu petición</p>
              <p className="text-sm text-muted mb-4">
                Imprímelo y pégalo en el barrio, o comparte la imagen directamente.
              </p>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={qrDataUrl}
                  alt="QR de la petición"
                  className="w-44 h-44 rounded-xl border border-border"
                />
                <a
                  href={qrDataUrl}
                  download={`qr-${slug}.png`}
                  className="w-full text-center bg-surface border border-border text-brand font-semibold rounded-xl py-3.5 text-sm transition-colors hover:border-brand"
                >
                  Descargar QR
                </a>
              </div>
            </div>
          )}

          {/* View petition */}
          {slug && (
            <Link
              href={`/${slug}`}
              className="flex items-center justify-center w-full bg-cta hover:bg-cta-hover text-white font-semibold rounded-[10px] h-[52px] transition-colors"
            >
              Ver mi petición →
            </Link>
          )}

        </div>
      </div>
    </div>
  )
}
