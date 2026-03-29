import { notFound } from 'next/navigation'
import Link from 'next/link'
import PetitionInteractive from './PetitionInteractive'
import { supabase } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'
import { Wordmark } from '@/app/components/Logo'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export const dynamic = 'force-dynamic'

export default async function PetitionPage({ params, searchParams }) {
  const { slug } = await params
  const { source = 'direct' } = await searchParams

  const { data: petition } = await supabase
    .from('petitions')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'active')
    .single()

  if (!petition) notFound()

  await supabase.from('visits').insert({ petition_id: petition.id, source })

  const { count: signatureCount } = await supabaseAdmin
    .from('signatures')
    .select('*', { count: 'exact', head: true })
    .eq('petition_id', petition.id)

  const count = signatureCount || 0
  const goal = petition.goal_signatures || 500

  return (
    <div className="min-h-screen bg-bg">

      {/* Nav */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-2xl mx-auto px-4 h-12 flex items-center">
          <Link href="/"><Wordmark className="text-base sm:text-lg" /></Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-5 sm:py-8 space-y-5 sm:space-y-8">

        {/* Hero */}
        <div>
          <p className="text-xs font-semibold text-brand uppercase tracking-widest mb-3">
            {petition.location || 'España'}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text leading-tight mb-4 sm:mb-6">
            {petition.title}
          </h1>

          <PetitionInteractive initialCount={count} goal={goal} source={source} slug={slug} />
        </div>

        {/* Description */}
        <div>
          <h2 className="text-lg font-bold text-text mb-2">Por qué importa</h2>
          <p className="text-base text-muted leading-relaxed">{petition.description}</p>
        </div>

        {/* Photos */}
        {petition.images && petition.images.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {petition.images.map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-full aspect-video object-cover rounded-xl border border-border"
              />
            ))}
          </div>
        )}

        {/* Privacy */}
        <p className="text-xs text-muted leading-relaxed pb-8">
          Tus datos (nombre, email o teléfono, y opcionalmente código postal y DNI/NIE) se usarán
          exclusivamente para gestionar esta petición y no se compartirán con terceros.
          Tratamiento basado en tu consentimiento, conforme al RGPD.
        </p>

      </div>
    </div>
  )
}
