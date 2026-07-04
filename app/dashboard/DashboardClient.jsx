'use client'
import { useState } from 'react'
import Link from 'next/link'
import Card from '../../components/ui/Card'
import StatCard from '../../components/ui/StatCard'
import Badge from '../../components/ui/Badge'
import EmptyState from '../../components/ui/EmptyState'

export default function DashboardClient({
  user, tenant, callLogs, callStats
}) {
  const agentName   = tenant?.agent_config?.[0]?.agent_name || 'Sofia'
  const plan        = tenant?.plan || 'starter'
  const isActive    = tenant?.agent_config?.[0]?.is_active || false
  const phoneNumber = tenant?.agent_config?.[0]?.phone_number

  const totalCalls  = callStats.length
  const bookedCalls = callStats.filter(c => c.outcome === 'booked').length
  const missedCalls = callStats.filter(c => c.outcome === 'missed').length
  const bookingRate = totalCalls > 0
    ? Math.round((bookedCalls / totalCalls) * 100)
    : 0
  const totalSeconds = callStats.reduce(
    (a, c) => a + (c.duration_seconds || 0), 0
  )
  const hoursSaved = (totalSeconds / 3600).toFixed(1)
  const revenueRecovered = callStats
    .reduce((a, c) => a + Number(c.revenue_recovered || 0), 0)

  const [showSuccess, setShowSuccess] = useState(
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('success') === 'true'
  )

  const outcomeConfig = {
    booked:    { label: 'Prenotato',  variant: 'success' },
    answered:  { label: 'Risposto',   variant: 'info' },
    escalated: { label: 'Escalation', variant: 'warning' },
    missed:    { label: 'Perso',      variant: 'error' },
    voicemail: { label: 'Voicemail',  variant: 'default' },
  }

  return (
    <div className="space-y-6">

      {showSuccess && (
        <div className="rounded-xl border border-emerald-500/20
                        bg-emerald-950/40 px-5 py-4
                        flex items-start justify-between gap-4">
          <div>
            <div className="text-emerald-400 font-semibold text-sm mb-0.5">
              Benvenuto in Flowstart AI
            </div>
            <div className="text-slate-400 text-sm">
              Il tuo piano è attivo. Il team ti contatterà
              entro 24 ore per configurare {agentName}.
            </div>
          </div>
          <button
            onClick={() => setShowSuccess(false)}
            className="text-slate-500 hover:text-slate-300
                       text-xl leading-none mt-0.5 flex-shrink-0">
            ×
          </button>
        </div>
      )}

      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            {new Date().toLocaleDateString('it-IT', {
              weekday: 'long', day: 'numeric',
              month: 'long', year: 'numeric'
            })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${
            isActive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
          }`} />
          <span className="text-slate-400 text-sm">{agentName}</span>
          <Badge variant={isActive ? 'success' : 'default'}>
            {isActive ? 'Attivo' : 'In configurazione'}
          </Badge>
        </div>
      </div>

      {/* Setup warning */}
      {!isActive && (
        <Card variant="ghost" padding="md">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10
                            border border-amber-500/20 flex-shrink-0
                            flex items-center justify-center">
              <svg className="w-4 h-4 text-amber-400"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <div className="text-amber-400 font-medium text-sm">
                Configurazione in corso
              </div>
              <div className="text-slate-400 text-sm mt-0.5">
                Il team Flowstart AI configurerà {agentName} entro 24 ore.{' '}
                {phoneNumber
                  ? `Numero assegnato: ${phoneNumber}`
                  : 'Il numero di telefono sarà assegnato a breve.'
                }
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Chiamate questo mese"
          value={totalCalls}
          sub={`${missedCalls} perse`}
        />
        <StatCard
          label="Tasso prenotazione"
          value={`${bookingRate}%`}
          sub={`${bookedCalls} prenotazioni`}
          accent={bookingRate > 50}
        />
        <StatCard
          label="Ore risparmiate"
          value={`${hoursSaved}h`}
          sub="questo mese"
        />
        <StatCard
          label="Fatturato recuperato"
          value={revenueRecovered.toLocaleString('it-IT', {
            style: 'currency', currency: 'EUR',
            maximumFractionDigits: 0
          })}
          accent={revenueRecovered > 0}
        />
      </div>

      {/* Main content: call log + sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <div className="lg:col-span-2">
          <Card padding="none">
            <div className="flex items-center justify-between
                            px-5 py-4 border-b border-white/[0.06]">
              <h2 className="text-white font-semibold text-sm">
                Ultime chiamate
              </h2>
              <span className="text-slate-500 text-xs">
                {callLogs.length} chiamate
              </span>
            </div>
            {callLogs.length === 0 ? (
              <EmptyState
                title="Nessuna chiamata ancora"
                description={`${agentName} gestirà le chiamate del tuo studio. Le attività appariranno qui in tempo reale.`}
              />
            ) : (
              <div className="divide-y divide-white/[0.04]">
                {callLogs.map(log => {
                  const config = outcomeConfig[log.outcome]
                    || { label: log.outcome, variant: 'default' }
                  return (
                    <div key={log.id}
                      className="flex items-center gap-4
                                 px-5 py-3.5 hover:bg-white/[0.02]
                                 transition-colors">
                      <div className="w-8 h-8 rounded-lg
                                      bg-slate-800/80 border
                                      border-white/[0.06] flex-shrink-0
                                      flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-slate-500"
                          fill="none" viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path strokeLinecap="round"
                            strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white text-sm font-medium truncate">
                          {log.caller_number || 'Numero privato'}
                        </div>
                        <div className="text-slate-500 text-xs truncate mt-0.5">
                          {log.intent_detected || 'Chiamata gestita'}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <Badge variant={config.variant} size="xs">
                          {config.label}
                        </Badge>
                        <span className="text-slate-600 text-xs">
                          {log.duration_seconds}s ·{' '}
                          {new Date(log.created_at).toLocaleDateString('it-IT', {
                            day: '2-digit', month: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-3">

          <Card padding="md">
            <h3 className="text-white font-semibold text-sm mb-4">
              Il tuo agente
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Nome</span>
                <span className="text-white text-sm font-medium">
                  {agentName}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Stato</span>
                <Badge variant={isActive ? 'success' : 'warning'}>
                  {isActive ? 'Attivo' : 'In config.'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-xs">Piano</span>
                <span className="text-white text-sm capitalize font-medium">
                  {plan}
                </span>
              </div>
              {phoneNumber && (
                <div className="pt-2 border-t border-white/[0.06]">
                  <div className="text-slate-400 text-xs mb-1">
                    Numero dedicato
                  </div>
                  <div className="text-white text-sm font-mono font-medium">
                    {phoneNumber}
                  </div>
                  <div className="text-slate-500 text-xs mt-1">
                    Condividi questo numero con i tuoi clienti
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card padding="md">
            <h3 className="text-white font-semibold text-sm mb-3">
              Azioni rapide
            </h3>
            <div className="space-y-2">
              <Link href="/dashboard/settings"
                className="flex items-center justify-between
                           w-full px-3 py-2.5 rounded-lg
                           bg-slate-800/60 hover:bg-slate-800
                           border border-white/[0.06]
                           hover:border-white/[0.12]
                           transition-all group">
                <span className="text-slate-300 text-sm">
                  Impostazioni brand
                </span>
                <span className="text-slate-600 group-hover:text-slate-400
                                 transition-colors text-xs">
                  →
                </span>
              </Link>
              <a href="mailto:hello@flowstart.it"
                className="flex items-center justify-between
                           w-full px-3 py-2.5 rounded-lg
                           bg-slate-800/60 hover:bg-slate-800
                           border border-white/[0.06]
                           hover:border-white/[0.12]
                           transition-all group">
                <span className="text-slate-300 text-sm">
                  Contatta il supporto
                </span>
                <span className="text-slate-600 group-hover:text-slate-400
                                 transition-colors text-xs">
                  →
                </span>
              </a>
            </div>
          </Card>

          <div className="text-center pt-1">
            <p className="text-slate-700 text-xs">{user?.email}</p>
          </div>

        </div>
      </div>
    </div>
  )
}
