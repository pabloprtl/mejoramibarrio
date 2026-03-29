import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function GET(request, { params }) {
  const { slug } = await params

  const { data: petition } = await supabase
    .from('petitions')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!petition) return Response.json({ count: 0 })

  const { count } = await supabase
    .from('signatures')
    .select('*', { count: 'exact', head: true })
    .eq('petition_id', petition.id)

  return Response.json({ count: count || 0 }, {
    headers: { 'Cache-Control': 'no-store' },
  })
}
