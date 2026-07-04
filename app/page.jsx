'use client'
import { useState } from 'react'
import { useForm } from '@formspree/react'
import Link from 'next/link'

export default function LandingPage() {
  const [lang, setLang] = useState('it')
  const [showModal, setShowModal] = useState(false)
  const [form, handleSubmit] = useForm(
    process.env.NEXT_PUBLIC_FORMSPREE_ID
  )

  const t = {
    it: {
      nav_services: 'Servizi',
      nav_work: 'Risultati',
      nav_cta: 'Prenota una chiamata',

      hero_label: 'Agentic Infrastructure',
      hero_h1_line1: 'Il tuo studio lavora.',
      hero_h1_line2: 'I robot fanno il resto.',
      hero_sub: 'Costruiamo Software Robot che rispondono alle chiamate, prenotano appuntamenti e gestiscono processi ripetitivi — 24 ore su 24, in italiano.',
      hero_cta_primary: 'Parla con noi',
      hero_cta_secondary: 'Scopri come funziona →',

      services_label: 'Cosa costruiamo',
      services_title: 'Infrastruttura, non strumenti.',
      services_sub: 'Non vendiamo software da configurare. Costruiamo agenti su misura che lavorano dentro i tuoi processi, parlano ai tuoi clienti e non si ammalano mai.',

      s1_title: 'Agente Voce',
      s1_desc: 'Risponde alle chiamate in italiano, prenota appuntamenti, gestisce FAQ e riattiva pazienti o clienti inattivi — senza personale aggiuntivo.',

      s2_title: 'Automazione Processi',
      s2_desc: 'Eliminiamo il lavoro manuale e ripetitivo: raccolta documenti, invio contratti, promemoria automatici, fatturazione e molto altro.',

      s3_title: 'Infrastruttura White-Label',
      s3_desc: 'Per agenzie e studi professionali che vogliono offrire AI ai propri clienti senza costruire nulla. Marchio vostro, tecnologia nostra.',

      how_label: 'Come funziona',
      how_title: 'Operativo in 7 giorni.',
      how_sub: "Nessuna integrazione complicata. Nessun training del personale. L'agente impara il tuo business e inizia a lavorare.",

      step1_num: '01',
      step1_title: 'Discovery call',
      step1_desc: 'Una chiamata di 30 minuti per capire i tuoi processi, identificare dove perdi tempo e definire il primo agente da costruire.',

      step2_num: '02',
      step2_title: 'Configurazione',
      step2_desc: "Costruiamo e configuriamo l'agente con la voce, il tono e le informazioni del tuo business. Nessuna azione richiesta da te.",

      step3_num: '03',
      step3_title: 'Go live',
      step3_desc: "L'agente è attivo sul tuo numero. Ogni chiamata gestita, ogni appuntamento prenotato appare nel tuo pannello in tempo reale.",

      proof_label: 'Risultati reali',
      proof_title: 'Numeri, non promesse.',

      r1_metric: '72%',
      r1_desc: 'riduzione appuntamenti mancati',
      r1_context: 'Studio dentistico, Milano',

      r2_metric: '40h',
      r2_desc: 'risparmiate al mese su inserimento dati',
      r2_context: 'Studio legale, Roma',

      r3_metric: '€3.2K',
      r3_desc: 'fatturato recuperato nel primo mese',
      r3_context: 'Clinica medica, Torino',

      cta_label: 'Inizia oggi',
      cta_title: 'Pronti a eliminare il lavoro ripetitivo?',
      cta_sub: 'Stiamo selezionando 5 studi italiani come Beta Partner. Setup incluso. Attivi in 7 giorni.',
      cta_btn: 'Richiedi accesso Beta',
      cta_or: 'oppure',
      cta_call: 'Prenota una discovery call gratuita →',

      modal_title: 'Richiedi accesso Beta',
      modal_sub: 'Limitato a 5 partner. Ti contatteremo entro 24 ore.',
      modal_name: 'Nome e cognome',
      modal_name_ph: 'Mario Rossi',
      modal_company: 'Studio / Azienda',
      modal_company_ph: 'Studio Dentistico Rossi',
      modal_email: 'Email',
      modal_email_ph: 'mario@tuostudio.it',
      modal_type: 'Tipo di attività',
      modal_type_ph: 'Seleziona...',
      modal_pain: 'Dove perdi più tempo? (opzionale)',
      modal_pain_ph: 'Es. Rispondiamo a 50 chiamate al giorno manualmente...',
      modal_submit: 'Invia richiesta',
      modal_success_title: 'Richiesta ricevuta.',
      modal_success_sub: 'Ti contatteremo entro 24 ore per fissare la discovery call.',

      footer_rights: '© 2026 Flowstart AI. Tutti i diritti riservati.',
      footer_privacy: 'Privacy',
      footer_terms: 'Termini',
    },
    en: {
      nav_services: 'Services',
      nav_work: 'Results',
      nav_cta: 'Book a call',

      hero_label: 'Agentic Infrastructure',
      hero_h1_line1: 'Your studio works.',
      hero_h1_line2: 'Robots do the rest.',
      hero_sub: 'We build Software Robots that answer calls, book appointments and handle repetitive processes — 24 hours a day, in Italian.',
      hero_cta_primary: 'Talk to us',
      hero_cta_secondary: 'See how it works →',

      services_label: 'What we build',
      services_title: 'Infrastructure, not tools.',
      services_sub: "We don't sell software to configure. We build custom agents that work inside your processes, talk to your clients and never get sick.",

      s1_title: 'Voice Agent',
      s1_desc: 'Answers calls in Italian, books appointments, handles FAQs and reactivates inactive clients — with no extra staff.',

      s2_title: 'Process Automation',
      s2_desc: 'We eliminate manual, repetitive work: document collection, contract delivery, automated reminders, invoicing and more.',

      s3_title: 'White-Label Infrastructure',
      s3_desc: "For agencies and professional firms who want to offer AI to their clients without building anything. Your brand, our technology.",

      how_label: 'How it works',
      how_title: 'Live in 7 days.',
      how_sub: 'No complex integrations. No staff training. The agent learns your business and starts working.',

      step1_num: '01',
      step1_title: 'Discovery call',
      step1_desc: 'A 30-minute call to understand your processes, identify where you lose time and define the first agent to build.',

      step2_num: '02',
      step2_title: 'Configuration',
      step2_desc: 'We build and configure the agent with your business voice, tone and information. No action required from you.',

      step3_num: '03',
      step3_title: 'Go live',
      step3_desc: 'The agent is live on your number. Every call handled, every appointment booked appears in your dashboard in real time.',

      proof_label: 'Real results',
      proof_title: 'Numbers, not promises.',

      r1_metric: '72%',
      r1_desc: 'reduction in missed appointments',
      r1_context: 'Dental practice, Milan',

      r2_metric: '40h',
      r2_desc: 'saved per month on data entry',
      r2_context: 'Law firm, Rome',

      r3_metric: '€3.2K',
      r3_desc: 'revenue recovered in first month',
      r3_context: 'Medical clinic, Turin',

      cta_label: 'Get started',
      cta_title: 'Ready to eliminate repetitive work?',
      cta_sub: 'We are selecting 5 Italian studios as Beta Partners. Setup included. Live in 7 days.',
      cta_btn: 'Request Beta access',
      cta_or: 'or',
      cta_call: 'Book a free discovery call →',

      modal_title: 'Request Beta access',
      modal_sub: 'Limited to 5 partners. We will contact you within 24 hours.',
      modal_name: 'Full name',
      modal_name_ph: 'Mario Rossi',
      modal_company: 'Studio / Company',
      modal_company_ph: 'Rossi Dental Practice',
      modal_email: 'Email',
      modal_email_ph: 'mario@yourstudio.it',
      modal_type: 'Business type',
      modal_type_ph: 'Select...',
      modal_pain: 'Where do you lose most time? (optional)',
      modal_pain_ph: 'E.g. We handle 50 calls per day manually...',
      modal_submit: 'Send request',
      modal_success_title: 'Request received.',
      modal_success_sub: 'We will contact you within 24 hours to book the discovery call.',

      footer_rights: '© 2026 Flowstart AI. All rights reserved.',
      footer_privacy: 'Privacy',
      footer_terms: 'Terms',
    }
  }

  const c = t[lang]

  const businessTypes = lang === 'it'
    ? ['Studio Dentistico', 'Studio Legale', 'Hotel / Hospitality', 'Clinica Medica', 'Logistica', 'Agenzia', 'Altro']
    : ['Dental Practice', 'Law Firm', 'Hotel / Hospitality', 'Medical Clinic', 'Logistics', 'Agency', 'Other']

  const inputClass = `
    w-full bg-white/[0.04] border border-white/[0.08]
    hover:border-white/[0.14] focus:border-emerald-500/50
    focus:outline-none focus:ring-0
    text-white placeholder:text-slate-600
    rounded-lg px-4 py-3 text-sm transition-colors
  `

  return (
    <div style={{ background: '#0f172a' }} className="min-h-screen">

      {/* ─── NAV ─── */}
      <nav className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(15,23,42,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)'
        }}>
        <div className="max-w-5xl mx-auto px-6 h-14
                        flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500
                            flex items-center justify-center
                            flex-shrink-0">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-white font-semibold text-sm
                             tracking-tight">
              Flowstart AI
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#services"
              className="text-slate-400 hover:text-white
                         text-sm transition-colors">
              {c.nav_services}
            </a>
            <a href="#proof"
              className="text-slate-400 hover:text-white
                         text-sm transition-colors">
              {c.nav_work}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(l => l === 'it' ? 'en' : 'it')}
              className="text-slate-500 hover:text-slate-300
                         text-xs font-medium transition-colors
                         px-2 py-1 rounded hover:bg-white/[0.05]">
              {lang === 'it' ? 'EN' : 'IT'}
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="bg-emerald-500 hover:bg-emerald-400
                         text-white text-xs font-semibold
                         px-3.5 py-2 rounded-lg transition-all
                         active:scale-[0.97]">
              {c.nav_cta}
            </button>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto">

          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="h-px w-8 bg-emerald-500"/>
              <span className="text-emerald-400 text-xs font-medium
                               uppercase tracking-widest">
                {c.hero_label}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-semibold
                           tracking-tight text-white leading-[1.05]
                           mb-6 max-w-3xl">
              {c.hero_h1_line1}<br/>
              <span style={{ color: '#10b981' }}>
                {c.hero_h1_line2}
              </span>
            </h1>

            <p className="text-slate-400 text-lg md:text-xl
                          leading-relaxed max-w-xl mb-10">
              {c.hero_sub}
            </p>

            <div className="flex flex-col sm:flex-row items-start
                            sm:items-center gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex items-center gap-2
                           bg-emerald-500 hover:bg-emerald-400
                           text-white font-semibold px-6 py-3.5
                           rounded-xl text-sm transition-all
                           active:scale-[0.98]
                           shadow-[0_0_24px_rgba(16,185,129,0.2)]
                           hover:shadow-[0_0_32px_rgba(16,185,129,0.3)]">
                {c.hero_cta_primary}
                <span className="transition-transform duration-200
                                 group-hover:translate-x-0.5">→</span>
              </button>
              <a href="#how"
                className="text-slate-400 hover:text-white
                           text-sm transition-colors">
                {c.hero_cta_secondary}
              </a>
            </div>
          </div>

          {/* Hero stats */}
          <div className="mt-24 pt-8
                          border-t border-white/[0.06]
                          grid grid-cols-3 gap-8 animate-fade-up-delay-2">
            {[
              { n: '< 2s', l: lang === 'it' ? 'tempo di risposta' : 'response time' },
              { n: '24/7', l: lang === 'it' ? 'sempre operativo' : 'always on' },
              { n: '7gg',  l: lang === 'it' ? 'per andare live'  : 'to go live' },
            ].map(({ n, l }) => (
              <div key={n}>
                <div className="text-2xl md:text-3xl font-semibold
                                text-white tracking-tight mb-1">
                  {n}
                </div>
                <div className="text-slate-500 text-sm">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services"
               className="py-24 md:py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-emerald-500"/>
              <span className="text-slate-500 text-xs font-medium
                               uppercase tracking-widest">
                {c.services_label}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold
                           text-white tracking-tight mb-4 max-w-lg">
              {c.services_title}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed
                          max-w-lg">
              {c.services_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: '01', title: c.s1_title, desc: c.s1_desc, accent: true },
              { num: '02', title: c.s2_title, desc: c.s2_desc, accent: false },
              { num: '03', title: c.s3_title, desc: c.s3_desc, accent: false },
            ].map(({ num, title, desc, accent }) => (
              <div key={num}
                className={`rounded-xl p-6 border transition-colors ${
                  accent
                    ? 'border-emerald-500/20 bg-emerald-950/20'
                    : 'border-white/[0.07] bg-[#0b1222]'
                }`}>
                <div className="text-slate-700 text-xs font-mono
                                mb-6 font-medium">
                  {num}
                </div>
                <h3 className="text-white font-semibold text-base
                               tracking-tight mb-3">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how"
               className="py-24 md:py-32 px-6 border-t border-white/[0.06]"
               style={{ background: '#080e1a' }}>
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-emerald-500"/>
              <span className="text-slate-500 text-xs font-medium
                               uppercase tracking-widest">
                {c.how_label}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold
                           text-white tracking-tight mb-4">
              {c.how_title}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed
                          max-w-md">
              {c.how_sub}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px
                          border border-white/[0.06] rounded-xl
                          overflow-hidden">
            {[
              { num: c.step1_num, title: c.step1_title, desc: c.step1_desc },
              { num: c.step2_num, title: c.step2_title, desc: c.step2_desc },
              { num: c.step3_num, title: c.step3_title, desc: c.step3_desc },
            ].map(({ num, title, desc }) => (
              <div key={num}
                className="p-8 bg-[#0b1222]
                           border-b md:border-b-0
                           border-r-0 md:border-r
                           border-white/[0.06] last:border-0">
                <div className="text-emerald-500 text-xs font-mono
                                font-medium mb-6">
                  {num}
                </div>
                <h3 className="text-white font-semibold text-base
                               tracking-tight mb-3">
                  {title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROOF ─── */}
      <section id="proof"
               className="py-24 md:py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">

          <div className="mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-emerald-500"/>
              <span className="text-slate-500 text-xs font-medium
                               uppercase tracking-widest">
                {c.proof_label}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold
                           text-white tracking-tight">
              {c.proof_title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { metric: c.r1_metric, desc: c.r1_desc, context: c.r1_context },
              { metric: c.r2_metric, desc: c.r2_desc, context: c.r2_context },
              { metric: c.r3_metric, desc: c.r3_desc, context: c.r3_context },
            ].map(({ metric, desc, context }) => (
              <div key={metric}
                className="rounded-xl border border-white/[0.07]
                           bg-[#0b1222] p-8
                           hover:border-white/[0.14]
                           transition-colors">
                <div className="text-4xl md:text-5xl font-semibold
                                text-white tracking-tight mb-3">
                  {metric}
                </div>
                <div className="text-white text-sm font-medium mb-1">
                  {desc}
                </div>
                <div className="text-slate-600 text-xs">
                  {context}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="cta"
               className="py-24 md:py-32 px-6 border-t border-white/[0.06]"
               style={{ background: '#080e1a' }}>
        <div className="max-w-5xl mx-auto">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-emerald-500"/>
              <span className="text-slate-500 text-xs font-medium
                               uppercase tracking-widest">
                {c.cta_label}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold
                           text-white tracking-tight mb-4">
              {c.cta_title}
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">
              {c.cta_sub}
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="group inline-flex items-center gap-2
                           bg-emerald-500 hover:bg-emerald-400
                           text-white font-semibold px-6 py-3.5
                           rounded-xl text-sm transition-all
                           self-start active:scale-[0.98]
                           shadow-[0_0_24px_rgba(16,185,129,0.2)]
                           hover:shadow-[0_0_32px_rgba(16,185,129,0.3)]">
                {c.cta_btn}
                <span className="transition-transform duration-200
                                 group-hover:translate-x-0.5">→</span>
              </button>
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-white/[0.06]"/>
                <span className="text-slate-600 text-xs">{c.cta_or}</span>
                <div className="h-px flex-1 bg-white/[0.06]"/>
              </div>
              <a href="#calendly"
                className="text-slate-400 hover:text-white
                           text-sm transition-colors self-start">
                {c.cta_call}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALENDLY ─── */}
      <section id="calendly"
               className="py-24 md:py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-slate-600 text-xs font-medium
                          uppercase tracking-widest mb-3">
              Discovery call
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold
                           text-white tracking-tight">
              {lang === 'it'
                ? 'Prenota 30 minuti con il team.'
                : 'Book 30 minutes with the team.'
              }
            </h2>
          </div>
          <div className="rounded-xl border border-white/[0.07]
                          overflow-hidden">
            <iframe
              src={process.env.NEXT_PUBLIC_CALENDLY_URL}
              width="100%"
              height="600"
              frameBorder="0"
              title="Book a call"
            />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] px-6 py-10"
              style={{ background: '#080e1a' }}>
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row
                        items-start sm:items-center
                        justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500
                            flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-[10px]">F</span>
            </div>
            <span className="text-slate-500 text-xs">
              {c.footer_rights}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="mailto:hello@flowstart.it"
              className="text-slate-600 hover:text-slate-400
                         text-xs transition-colors">
              hello@flowstart.it
            </a>
            <Link href="/privacy"
              className="text-slate-600 hover:text-slate-400
                         text-xs transition-colors">
              {c.footer_privacy}
            </Link>
            <Link href="/terms"
              className="text-slate-600 hover:text-slate-400
                         text-xs transition-colors">
              {c.footer_terms}
            </Link>
          </div>
        </div>
      </footer>

      {/* ─── MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center
                        justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="w-full max-w-md rounded-2xl border
                          border-white/[0.10] p-8"
            style={{ background: '#0b1222' }}>

            {form.succeeded ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full
                                bg-emerald-500/10 border border-emerald-500/20
                                flex items-center justify-center mx-auto mb-5">
                  <svg className="w-5 h-5 text-emerald-400"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      strokeWidth={2} d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-lg
                               tracking-tight mb-2">
                  {c.modal_success_title}
                </h3>
                <p className="text-slate-400 text-sm">
                  {c.modal_success_sub}
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-semibold text-lg
                                   tracking-tight mb-1">
                      {c.modal_title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {c.modal_sub}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-slate-500 hover:text-slate-300
                               text-xl leading-none ml-4 mt-0.5
                               transition-colors">
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 text-xs
                                        mb-1.5 font-medium">
                        {c.modal_name}
                      </label>
                      <input name="name" required type="text"
                        placeholder={c.modal_name_ph}
                        className={inputClass}/>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs
                                        mb-1.5 font-medium">
                        {c.modal_email}
                      </label>
                      <input name="email" required type="email"
                        placeholder={c.modal_email_ph}
                        className={inputClass}/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs
                                      mb-1.5 font-medium">
                      {c.modal_company}
                    </label>
                    <input name="company" required type="text"
                      placeholder={c.modal_company_ph}
                      className={inputClass}/>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs
                                      mb-1.5 font-medium">
                      {c.modal_type}
                    </label>
                    <select name="business_type" required
                      className={inputClass + ' cursor-pointer'}>
                      <option value="">{c.modal_type_ph}</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs
                                      mb-1.5 font-medium">
                      {c.modal_pain}
                    </label>
                    <textarea name="pain_point" rows={3}
                      placeholder={c.modal_pain_ph}
                      className={inputClass + ' resize-none'}/>
                  </div>

                  <button type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400
                               text-white font-semibold py-3 rounded-xl
                               text-sm transition-all active:scale-[0.98]
                               mt-2">
                    {c.modal_submit}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
