'use client'
import { createClient } from '../../lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleLogout() {
    setLoading(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="text-slate-500 hover:text-slate-300 text-xs transition-colors disabled:opacity-50">
      {loading ? '...' : 'Esci'}
    </button>
  )
}
