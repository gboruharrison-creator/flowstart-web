import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'
import DashboardClient from './DashboardClient'

export const metadata = {
  title: 'Dashboard',
  description: 'Il tuo pannello Flowstart AI'
}

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*, agent_config(*)')
    .eq('owner_id', user.id)
    .single()

  const { data: callLogs } = await supabase
    .from('call_logs')
    .select('*')
    .eq('tenant_id', tenant?.id)
    .order('created_at', { ascending: false })
    .limit(10)

  const { data: callStats } = await supabase
    .from('call_logs')
    .select('outcome, duration_seconds, revenue_recovered')
    .eq('tenant_id', tenant?.id)
    .gte('created_at', new Date(
      new Date().getFullYear(),
      new Date().getMonth(), 1
    ).toISOString())

  return (
    <DashboardClient
      user={user}
      tenant={tenant}
      callLogs={callLogs || []}
      callStats={callStats || []}
    />
  )
}
