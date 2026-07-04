import { createClient } from '../../lib/supabase/server'
import { redirect } from 'next/navigation'
import { getTenantCSSVars, getTenantMeta } from '../../lib/tenant-theme'
import DashboardNav from '../../components/dashboard/DashboardNav'

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: tenant } = await supabase
    .from('tenants')
    .select('*, agent_config(*)')
    .eq('owner_id', user.id)
    .single()

  const cssVars = getTenantCSSVars(tenant)
  const meta = getTenantMeta(tenant)

  return (
    <div style={{ ...cssVars, background: '#0f172a', minHeight: '100vh' }}>
      <DashboardNav meta={meta} />
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
        {children}
      </div>
    </div>
  )
}
