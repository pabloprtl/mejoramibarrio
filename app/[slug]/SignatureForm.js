'use client'

import { useActionState, useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { signPetition } from './actions'
import { createCheckoutSession } from './donate'

export default function SignatureForm({ source, slug }) {
  const [state, formAction, isPending] = useActionState(signPetition, null)
  const submittingRef = useRef(false)
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (!state?.success) return
    router.refresh()
    import('qrcode').then(QRCode => {
      QRCode.toDataURL(`https://mejoramibarrio.es/${slug}`, {
        width: 256,
        margin: 2,
        color: { dark: '#1B3A5C', light: '#FFFFFF' },
      }).then(url => setQrDataUrl(url))
    })
  }, [state?.success, slug])

  function handleSubmit(e) {
    if (submittingRef.current || isPending) {
      e.preventDefault()
      return
    }
    submittingRef.current = true
  }

  if (state?.success) {
    return (
      <div>
        {/* Success message */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-14 h-14 rounded-full bg-success flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text mb-1">¡Gracias por firmar!</h3>
          <p className="text-muted text-sm">Tu firma ha sido registrada.</p>
        </div>

        {/* Share section — primary action */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-text mb-1">
            Comparte con tus vecinos
          </p>
          <p className="text-sm text-muted mb-4">
            Cada firma cuenta. Cuantos más vecinos firmen, más presión tenemos.
          </p>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`He firmado la petición para arreglar los baches de Calle Ana Teresa en Aravaca.\nTú también puedes firmar aquí 👇\nhttps://mejoramibarrio.es/${slug}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1fba58] text-white font-semibold rounded-xl py-4 text-base transition-colors mb-3"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Compartir por WhatsApp
          </a>
          <button
            type="button"
            onClick={() => {
              navigator.clipboard.writeText(`https://mejoramibarrio.es/${slug}`)
                .then(() => {
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                })
                .catch(() => {
                  // fallback for older browsers
                  const el = document.createElement('textarea')
                  el.value = `https://mejoramibarrio.es/${slug}`
                  document.body.appendChild(el)
                  el.select()
                  document.execCommand('copy')
                  document.body.removeChild(el)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                })
            }}
            className="w-full bg-surface border border-border text-brand font-semibold rounded-xl py-3.5 text-sm transition-colors hover:border-brand"
          >
            {copied ? '¡Enlace copiado!' : 'Copiar enlace'}
          </button>
        </div>

        {/* QR code section */}
        {qrDataUrl && (
          <div className="border-t border-border pt-6 mb-6">
            <p className="text-sm font-semibold text-text mb-1">Código QR de la petición</p>
            <p className="text-sm text-muted mb-4">
              Imprímelo o compártelo para que tus vecinos puedan escanear y firmar.
            </p>
            <div className="flex flex-col items-center gap-4">
              <img
                src={qrDataUrl}
                alt="QR de la petición"
                className="w-40 h-40 rounded-xl border border-border"
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

        {/* Donation section — secondary */}
        <div className="border-t border-border pt-6">
          <p className="text-sm font-semibold text-text mb-1">¿Quieres ir más lejos?</p>
          <p className="text-sm text-muted mb-4">
            Tu donación se usará para llegar a más vecinos y presionar al Ayuntamiento.
          </p>
          <div className="grid grid-cols-4 gap-2">
            {[1, 5, 20, 100].map(amount => (
              <form key={amount} action={createCheckoutSession}>
                <input type="hidden" name="amount" value={amount} />
                <input type="hidden" name="slug" value={slug} />
                <input type="hidden" name="email" value={state.email || ''} />
                <input type="hidden" name="name" value={state.name || ''} />
                <input type="hidden" name="phone" value={state.phone || ''} />
                <input type="hidden" name="postal_code" value={state.postal_code || ''} />
                <input type="hidden" name="dni" value={state.dni || ''} />
                <button
                  type="submit"
                  className="w-full border border-border rounded-xl py-3 text-sm font-semibold text-muted hover:border-brand hover:text-brand transition-colors cursor-pointer"
                >
                  {amount}€
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="slug" value={slug} />

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-text mb-1.5">
          Nombre completo <span className="text-error">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Nombre y apellidos"
          className="w-full border border-border rounded-xl px-4 h-12 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="w-full border border-border rounded-xl px-4 h-12 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">Teléfono</label>
          <input
            type="tel"
            name="phone"
            placeholder="600 000 000"
            className="w-full border border-border rounded-xl px-4 h-12 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
          />
        </div>
      </div>
      <p className="text-xs text-muted -mt-2">Al menos uno de los dos es necesario.</p>

      {/* Postal code + DNI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">
            Código postal <span className="text-muted font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            name="postal_code"
            placeholder="28023"
            className="w-full border border-border rounded-xl px-4 h-12 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text mb-1.5">
            DNI / NIE <span className="text-muted font-normal">(opcional)</span>
          </label>
          <input
            type="text"
            name="dni"
            placeholder="12345678A"
            className="w-full border border-border rounded-xl px-4 h-12 text-base text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand bg-surface"
          />
        </div>
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3 pt-1">
        <input
          type="checkbox"
          name="consent"
          id="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-border accent-brand"
        />
        <label htmlFor="consent" className="text-sm text-muted leading-snug">
          Acepto que mis datos se usen para gestionar esta petición. No se compartirán con terceros.
        </label>
      </div>

      {/* Error */}
      {state?.error && (
        <p className="text-sm text-error bg-red-50 rounded-xl px-4 py-3">{state.error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-cta hover:bg-cta-hover disabled:opacity-50 text-white font-semibold rounded-xl h-[52px] text-base transition-colors cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? 'Enviando...' : 'Firmar la petición'}
      </button>

      {/* Trust signal */}
      <p className="text-xs text-muted text-center flex items-center justify-center gap-1">
        <span>🔒</span> Datos protegidos según el RGPD
      </p>
    </form>
  )
}
