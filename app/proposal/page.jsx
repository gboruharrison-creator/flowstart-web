import Link from 'next/link'

export const metadata = {
  title: 'Proposta Beta Partner | Flowstart AI',
  robots: { index: false, follow: false },
}

const PACKAGES = {
  'agenda-zero': {
    name: 'AGENDA ZERO',
    tagline: 'Il tuo agente vocale lavora mentre tu sei in sala',
    bullets: [
      'Risponde alle chiamate 24/7 — anche dopo le 18:00, nei weekend e durante le ferie',
      'Prenota appuntamenti direttamente nel tuo calendario senza intervento umano',
      'Qualifica il paziente prima della visita e invia reminder automatici via SMS/email',
    ],
  },
  'intake-machina': {
    name: 'INTAKE MACHINA',
    tagline: 'Ogni lead qualificato, documentato e pronto prima del primo contatto',
    bullets: [
      'Qualifica ogni lead in entrata in tempo reale, 24 ore su 24, 7 giorni su 7',
      'Raccoglie dati, documenti e preferenze del cliente prima del primo appuntamento',
      'Notifica il team soltanto per i casi che richiedono attenzione umana',
    ],
  },
}

export default async function ProposalPage({ searchParams }) {
  const params = await searchParams

  const name        = params?.name     || 'il vostro Studio'
  const pkgKey      = params?.package  || 'agenda-zero'
  const calls       = Number(params?.calls)   || 20
  const ticket      = Number(params?.ticket)  || 200
  const setup       = Number(params?.setup)   || 500
  const monthly     = Number(params?.monthly) || 189

  const pkg         = PACKAGES[pkgKey] ?? PACKAGES['agenda-zero']
  const recovery    = Math.round(calls * ticket * 0.20)
  const roiMonths   = monthly > 0 ? Math.ceil(setup / Math.max(recovery - monthly, 1)) : '—'
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/flowstartai/new-meeting'

  const today = new Date().toLocaleDateString('it-IT', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  const mailSubject = encodeURIComponent(`Accetto la proposta Beta Partner — ${name}`)
  const mailBody    = encodeURIComponent(
    `Salve team Flowstart AI,\n\nVorrei procedere con la proposta Beta Partner per ${name}.\n\nPacchetto: ${pkg.name}\nInvestimento: Setup €${setup} + €${monthly}/mese\n\nIn attesa di vostre istruzioni per i prossimi passi.\n\nGrazie`
  )

  return (
    <>
      {/* Print + base styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        @page { margin: 1.2cm; }
      `}</style>

      <div className="min-h-screen bg-[#0f172a] text-white">
        <div className="max-w-3xl mx-auto px-6 py-12 print:py-6">

          {/* ── HEADER ─────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-12 print:mb-8">
            <Link href="/" className="flex items-baseline gap-0.5 no-print">
              <span className="text-2xl font-black tracking-tighter italic">FLOWSTART</span>
              <span className="text-2xl font-black text-emerald-500">.it</span>
            </Link>
            {/* Print-only wordmark */}
            <div className="hidden print:flex items-baseline gap-0.5">
              <span className="text-xl font-black tracking-tighter italic">FLOWSTART</span>
              <span className="text-xl font-black text-emerald-500">.it</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/40 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.25em]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Proposta Riservata
              </span>
              <span className="text-slate-600 text-xs font-mono">{today}</span>
            </div>
          </div>

          {/* ── HERO ───────────────────────────────────────── */}
          <div className="mb-12 pb-10 border-b border-slate-800 print:mb-8 print:pb-6">
            <p className="text-emerald-500 text-xs font-mono uppercase tracking-[0.3em] mb-3">
              Beta Partner Program · 5 posti disponibili
            </p>
            <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-[0.95] mb-4">
              Proposta Beta&nbsp;Partner
            </h1>
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-emerald-400 leading-tight mb-6">
              {name}
            </h2>
            <p className="text-slate-400 text-sm font-mono max-w-xl leading-relaxed">
              Questa proposta è valida 7 giorni dalla data di emissione e riservata
              esclusivamente a {name}. Non condivisibile.
            </p>
          </div>

          {/* ── PACKAGE ────────────────────────────────────── */}
          <div className="mb-10 print:mb-8">
            <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.25em] mb-4">
              Soluzione raccomandata
            </p>
            <div className="p-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/5 print:p-6">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-emerald-400 mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-slate-400 text-sm font-mono">{pkg.tagline}</p>
                </div>
                <div className="shrink-0 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
                  AI Agent
                </div>
              </div>
              <ul className="space-y-3">
                {pkg.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <span className="text-emerald-500 font-black mt-0.5 shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── ROI ────────────────────────────────────────── */}
          <div className="mb-10 print:mb-8">
            <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.25em] mb-4">
              Stima recupero fatturato mensile
            </p>
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 print:p-6">
              <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-2xl font-black text-white">{calls}</div>
                  <div className="text-slate-500 text-xs font-mono mt-1 leading-snug">
                    chiamate<br />perse/mese
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-2xl font-black text-white">€{ticket}</div>
                  <div className="text-slate-500 text-xs font-mono mt-1 leading-snug">
                    valore<br />medio ticket
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/60">
                  <div className="text-2xl font-black text-white">20%</div>
                  <div className="text-slate-500 text-xs font-mono mt-1 leading-snug">
                    tasso<br />conversione
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5">
                <div>
                  <div className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-1">
                    Recupero stimato / mese
                  </div>
                  <div className="text-slate-500 text-xs font-mono">
                    {calls} × €{ticket} × 20% = <span className="text-emerald-400">€{recovery}/mese</span>
                  </div>
                </div>
                <div className="text-4xl font-black text-emerald-400">
                  €{recovery}
                </div>
              </div>

              <p className="text-slate-600 text-xs font-mono mt-3">
                * Stima conservativa basata su dati medi di settore. I risultati effettivi possono variare.
              </p>
            </div>
          </div>

          {/* ── INVESTMENT ─────────────────────────────────── */}
          <div className="mb-10 print:mb-8">
            <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.25em] mb-4">
              Investimento
            </p>
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-900/40 print:p-6">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="p-5 rounded-xl bg-slate-800/60">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">
                    Setup una tantum
                  </div>
                  <div className="text-3xl font-black text-white">
                    €{setup}
                  </div>
                  <div className="text-slate-600 text-xs font-mono mt-1">
                    configurazione agente + onboarding
                  </div>
                </div>
                <div className="p-5 rounded-xl bg-slate-800/60">
                  <div className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">
                    Canone mensile
                  </div>
                  <div className="text-3xl font-black text-white">
                    €{monthly}<span className="text-base text-slate-500 font-normal">/mese</span>
                  </div>
                  <div className="text-slate-600 text-xs font-mono mt-1">
                    agente attivo 24/7 + supporto
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-700 bg-slate-800/30">
                <span className="text-slate-400 text-sm font-mono">
                  Breakeven stimato
                </span>
                <span className="text-white font-black">
                  {typeof roiMonths === 'number' ? `${roiMonths} ${roiMonths === 1 ? 'mese' : 'mesi'}` : roiMonths}
                </span>
              </div>
            </div>
          </div>

          {/* ── NEXT STEPS ─────────────────────────────────── */}
          <div className="mb-12 print:mb-8">
            <p className="text-slate-500 text-xs font-mono uppercase tracking-[0.25em] mb-4">
              Cosa succede adesso
            </p>
            <div className="space-y-3">
              {[
                {
                  n: '01',
                  title: 'Chiamata di allineamento',
                  body: 'Prenotate 30 minuti con il nostro team per definire flussi, integrazioni e messaggi del vostro agente.',
                },
                {
                  n: '02',
                  title: 'Setup e configurazione',
                  body: "In 5–7 giorni lavorativi configuriamo l'agente, lo colleghiamo al vostro calendario e testiamo ogni scenario.",
                },
                {
                  n: '03',
                  title: 'Go live — agente attivo',
                  body: 'Il vostro agente risponde alle prime chiamate reali. Monitoriamo insieme i risultati nelle prime 2 settimane.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5 p-6 rounded-2xl border border-slate-800 bg-slate-900/30 print:p-4">
                  <div className="text-emerald-500 font-black font-mono text-sm shrink-0 pt-0.5">{n}</div>
                  <div>
                    <div className="text-white font-bold text-sm mb-1">{title}</div>
                    <div className="text-slate-400 text-sm leading-relaxed">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CTA ────────────────────────────────────────── */}
          <div className="no-print mb-12">
            <div className="p-8 rounded-2xl border border-slate-700 bg-slate-900/40">
              <h3 className="text-white font-black text-lg italic uppercase tracking-tighter mb-6">
                Pronti a procedere?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-4 px-6 bg-emerald-500 text-slate-950 font-black rounded-xl uppercase text-xs tracking-widest hover:bg-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                >
                  Prenota la chiamata →
                </a>
                <a
                  href={`mailto:hello@flowstart.it?subject=${mailSubject}&body=${mailBody}`}
                  className="flex-1 text-center py-4 px-6 border border-slate-700 text-slate-300 font-black rounded-xl uppercase text-xs tracking-widest hover:border-emerald-500 hover:text-white transition-all"
                >
                  Accetta proposta via email
                </a>
              </div>
            </div>
          </div>

          {/* ── PRINT CTA (shown only when printing) ───────── */}
          <div className="hidden print:block mb-8 p-6 rounded-2xl border border-slate-700">
            <p className="text-slate-300 text-sm font-mono mb-2">Per procedere:</p>
            <p className="text-emerald-400 text-sm font-mono font-bold mb-1">
              Prenota → {calendlyUrl}
            </p>
            <p className="text-slate-400 text-sm font-mono">
              Email → hello@flowstart.it
            </p>
          </div>

          {/* ── FOOTER ─────────────────────────────────────── */}
          <div className="border-t border-slate-800 pt-8 flex items-center justify-between">
            <p className="text-slate-600 text-xs font-mono">
              © 2026 Flowstart AI · hello@flowstart.it · flowstart.it
            </p>
            <Link
              href="/"
              className="text-slate-700 hover:text-emerald-500 text-xs font-mono transition-colors no-print"
            >
              ← home
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
