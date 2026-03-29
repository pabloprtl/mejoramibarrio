import { supabase } from '@/lib/supabase'

export default async function sitemap() {
  const { data: petitions } = await supabase
    .from('petitions')
    .select('slug, updated_at, created_at')
    .eq('status', 'active')

  const petitionUrls = (petitions || []).map(p => ({
    url: `https://mejoramibarrio.es/${p.slug}`,
    lastModified: p.updated_at || p.created_at,
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  return [
    {
      url: 'https://mejoramibarrio.es',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...petitionUrls,
  ]
}
