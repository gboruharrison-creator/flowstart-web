'use client'
import { useState } from 'react'
import { createClient } from '../../lib/supabase/client'
import Link from 'next/link'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`
      }
    })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <main style={{ background: '#0f172a', minHeight: '100vh' }}
      className="flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-emerald-500
                            flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">
              Flowstart AI
            </span>
          </div>

          {!submitted ? (
            <>
              <h1 className="text-white text-2xl font-semibold
                             tracking-tight mb-2">
                Accedi al pannello
              </h1>
              <p className="text-slate-400 text-sm">
                Inserisci la tua email per ricevere
                un link di accesso istantaneo.
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full
                              bg-emerald-500/10 border
                              border-emerald-500/20 flex items-center
                              justify-center mx-auto mb-4">
                <svg className="w-5 h-5 text-emerald-400"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round"
                    strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-white text-xl font-semibold
                             tracking-tight mb-2">
                Controlla la tua email
              </h1>
              <p className="text-slate-400 text-sm">
                Abbiamo inviato un link di accesso a{' '}
                <span className="text-white font-medium">{email}</span>
              </p>
              <p className="text-slate-600 text-xs mt-3">
                Controlla anche la cartella spam.
              </p>
            </>
          )}
        </div>

        {!submitted && (
          <div className="bg-[#0b1222] border border-white/[0.07]
                          rounded-2xl p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                id="email"
                type="email"
                required
                label="Indirizzo email"
                placeholder="hello@tuostudio.it"
                value={email}
                onChange={e => setEmail(e.target.value)}
                error={error}
              />
              <Button
                type="submit"
                variant="primary"
                size="lg"
                loading={loading}
                className="w-full"
              >
                {loading ? 'Invio in corso...' : 'Invia link di accesso'}
              </Button>
            </form>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/"
            className="text-slate-600 hover:text-slate-400
                       text-xs transition-colors">
            ← Torna a flowstart.it
          </Link>
        </div>

      </div>
    </main>
  )
}
