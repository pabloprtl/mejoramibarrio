'use server'

import { supabase } from '@/lib/supabase'

export async function signPetition(prevState, formData) {
  const name = formData.get('name')?.trim()
  const email = formData.get('email')?.trim() || null
  const phone = formData.get('phone')?.trim() || null
  const postal_code = formData.get('postal_code')?.trim() || null
  const dni = formData.get('dni')?.trim() || null
  const source = formData.get('source') || 'direct'
  const slug = formData.get('slug')
  const consent = formData.get('consent') === 'on'

  if (!name) return { error: 'El nombre es obligatorio.' }
  if (!email && !phone) return { error: 'Debes proporcionar un email o un teléfono.' }
  if (!consent) return { error: 'Debes aceptar el consentimiento.' }

  const { data: petition } = await supabase
    .from('petitions')
    .select('id')
    .eq('slug', slug)
    .single()

  if (!petition) return { error: 'Petición no encontrada.' }

  const { error } = await supabase.from('signatures').insert({
    petition_id: petition.id, name, email, phone, postal_code, dni, source, consent,
  })

  if (error) {
    if (error.code === '23514') return { error: 'Debes proporcionar un email o un teléfono.' }
    if (error.code === '23505') return { error: 'Ya has firmado esta petición con ese email o teléfono.' }
    return { error: 'Error al guardar tu firma. Por favor, inténtalo de nuevo.' }
  }

  return { success: true, name, email, phone, postal_code, dni }
}
