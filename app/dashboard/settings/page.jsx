import { createClient } from '../../../lib/supabase/server'
import { redirect } from 'next/navigation'
import BrandingSettings from './BrandingSettings'

export const metadata = { title: 'Impostazioni' }

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*')
    .eq('owner_id', user.id)
    .single()

  return <BrandingSettings tenant={tenant} />
}
