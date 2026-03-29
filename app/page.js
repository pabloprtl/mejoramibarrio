import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { Wordmark } from '@/app/components/Logo'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function LandingPage({ searchParams }) {
  const { source = 'direct' } = await searchParams

  await supabase.from('landing_visits').insert({ source })

  const { data: petitions } = await supabase
    .from('petitions')
    .select('id, slug, title, description, location, goal_signatures')
    .eq('status', 'active')
    .order('created_at', { ascending: false })

  const counts = {}
  if (petitions) {
    for (const p of petitions) {
      const { count } = await supabaseAdmin
        .from('signatures')
        .select('*', { count: 'exact', head: true })
        .eq('petition_id', p.id)
      counts[p.id] = count || 0
    }
  }

  return (
    <main className="min-h-screen bg-bg">

      {/* Nav */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Wordmark className="text-base sm:text-lg" />
          <Link
            href="/crear-peticion"
            className="text-sm font-semibold text-brand border border-brand rounded-lg px-4 h-9 flex items-center hover:bg-brand hover:text-white transition-colors"
          >
            + Crear petición
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-6 sm:py-10">

        {/* Hero */}
        <div className="mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text mb-1.5 leading-tight">
            Peticiones ciudadanas en tu barrio
          </h1>
          <p className="text-sm sm:text-base text-muted">
            Firma, comparte, y presiona a tu ayuntamiento.
          </p>
        </div>

        {/* Petitions grid */}
        {petitions && petitions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {petitions.map(p => {
              const count = counts[p.id]
              const goal = p.goal_signatures || 500
              const pct = Math.min(Math.round((count / goal) * 100), 100)
              return (
                <Link
                  key={p.id}
                  href={`/${p.slug}?source=landing`}
                  className="flex flex-col bg-surface rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
                >
                  <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-2">
                    {p.location || 'España'}
                  </p>
                  <h2 className="text-base font-bold text-text mb-2 leading-snug line-clamp-3">
                    {p.title}
                  </h2>
                  <p className="text-sm text-muted mb-4 flex-1 line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="h-1.5 rounded-full bg-border overflow-hidden">
                      <div
                        className="h-full rounded-full bg-brand"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted mt-1.5">
                      {count} de {goal} firmas
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <span className="text-sm font-semibold text-brand">Firmar →</span>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted mb-6">Todavía no hay peticiones activas.</p>
            <Link
              href="/crear-peticion"
              className="inline-flex items-center bg-cta hover:bg-cta-hover text-white font-semibold rounded-[10px] px-6 h-[52px] transition-colors"
            >
              Crea la primera →
            </Link>
          </div>
        )}


      </div>
    </main>
  )
}
