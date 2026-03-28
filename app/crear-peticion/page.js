import Link from 'next/link'
import { Wordmark } from '@/app/components/Logo'
import CreatePetitionForm from './CreatePetitionForm'

export const metadata = {
  title: 'Crear petición — MejoraMiBarrio',
}

export default async function CreatePetitionPage({ searchParams }) {
  const { error } = await searchParams

  return (
    <div className="min-h-screen bg-bg">

      {/* Nav */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center gap-2.5">
          <Link href="/"><Wordmark className="text-base sm:text-lg" /></Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-5 sm:py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-text leading-tight mb-2">
            Crea tu petición
          </h1>
          <p className="text-base text-muted leading-relaxed mb-5">
            Publica tu petición ciudadana y empieza a recoger firmas de tus vecinos.
          </p>
          <div className="bg-surface rounded-2xl border border-border p-4 space-y-3">
            <p className="text-sm font-semibold text-text">Qué incluye tras el pago:</p>
            <ul className="space-y-2">
              {[
                'Tu petición publicada inmediatamente',
                'Firmas verificadas por email — más peso ante el Ayuntamiento',
                'Recogida de datos conforme al RGPD — legalmente válida',
                'Código QR único para imprimir y repartir por el barrio',
                'Enlace de WhatsApp listo para compartir con tus vecinos',
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                  <div className="mt-0.5 w-4 h-4 rounded-full bg-success flex-shrink-0 flex items-center justify-center">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form card */}
        <div className="bg-surface rounded-2xl border border-border p-4 sm:p-6">
          {error && (
            <p className="text-sm text-error bg-red-50 rounded-xl px-4 py-3 mb-5">
              {decodeURIComponent(error)}
            </p>
          )}
          <CreatePetitionForm />
        </div>

      </div>
    </div>
  )
}
