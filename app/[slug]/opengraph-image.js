import { ImageResponse } from 'next/og'
import { supabase } from '@/lib/supabase'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({ params }) {
  const { slug } = params
  const { data: petition } = await supabase
    .from('petitions')
    .select('title, location')
    .eq('slug', slug)
    .single()

  const title = petition?.title || 'Petición ciudadana'
  const location = petition?.location || 'España'

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#FFFBF5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Top accent bar */}
        <div style={{ width: 80, height: 6, background: '#B45309', borderRadius: 3, marginBottom: 48 }} />

        {/* Location */}
        <p style={{ color: '#B45309', fontSize: 26, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 4, marginBottom: 28, margin: '0 0 28px 0' }}>
          {location}
        </p>

        {/* Petition title */}
        <p style={{ color: '#111827', fontSize: 60, fontWeight: 900, lineHeight: 1.15, margin: '0 0 60px 0', maxWidth: 900 }}>
          {title}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#C2410C' }} />
          <p style={{ color: '#6B7280', fontSize: 28, margin: 0, fontWeight: 600 }}>
            mejoramibarrio.es
          </p>
        </div>
      </div>
    ),
    { ...size }
  )
}
