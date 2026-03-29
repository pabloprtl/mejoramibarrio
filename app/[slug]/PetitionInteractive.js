'use client'

import { useState, Suspense } from 'react'
import SignatureForm from './SignatureForm'

export default function PetitionInteractive({ initialCount, goal, source, slug }) {
  const [count, setCount] = useState(initialCount)
  const progressPct = Math.min(Math.round((count / goal) * 100), 100)

  return (
    <>
      {/* Social proof + progress */}
      <div className="bg-surface rounded-2xl border border-border p-4 sm:p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <span className="text-3xl font-extrabold text-brand">{count}</span>
            <span className="text-muted text-sm font-medium ml-2">de {goal} firmas</span>
          </div>
          <span className="text-sm font-semibold text-muted">{progressPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-border overflow-hidden">
          <div
            className="h-full rounded-full bg-brand transition-all duration-700"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="text-sm text-muted mt-3">
          {count === 0
            ? 'Sé el primero en firmar.'
            : count < 100
            ? `${count} vecino${count !== 1 ? 's' : ''} ha${count !== 1 ? 'n' : ''} firmado.`
            : `${count} vecinos ya han firmado — ¡ayúdanos a llegar a ${goal}!`}
        </p>
      </div>

      {/* Form */}
      <div id="firma" className="bg-surface rounded-2xl border border-border p-4 sm:p-6">
        <h2 className="text-lg font-bold text-text mb-2">Firma esta petición</h2>
        <p className="text-sm text-muted mb-5">
          Tras firmar recibirás el código QR y el enlace de WhatsApp para compartir con tus vecinos.
        </p>
        <Suspense>
          <SignatureForm source={source} slug={slug} onSigned={() => setCount(c => c + 1)} />
        </Suspense>
      </div>
    </>
  )
}
