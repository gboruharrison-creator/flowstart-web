'use client'
import { useState } from 'react'
import { useForm } from '@formspree/react'
import Link from 'next/link'

const WA_NUMBER = '393517546455'
const waLink = (text) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`

const t = {
  it: {
    nav_services: 'Servizi',
    nav_method: 'Metodo',
    nav_about: 'Chi siamo',
    nav_cta: 'Audit gratuito',

    hero_label: 'Siti web · Software · Assistenti AI per PMI',
    hero_h1_line1: 'Ti trovano su Google.',
    hero_h1_line2: 'Ti rispondono anche quando sei occupato.',
    hero_sub:
      'Flowstart costruisce siti web e software per la tua attività, ti fa trovare su Google e aggiunge un assistente AI che risponde a chiamate e messaggi, prenota appuntamenti e non perde clienti fuori orario.',
    hero_cta_primary: 'Chiedi l’audit gratuito',
    hero_cta_secondary: 'Prenota una chiamata',
    hero_note: 'Audit su WhatsApp, senza impegno. Rispondiamo in giornata.',

    audit_title: 'Audit rapido · la tua attività',
    audit_before: 'Oggi',
    audit_after: 'Con Flowstart',
    audit_items: [
      'Scheda Google completa, con orari e foto',
      'Sito veloce da telefono',
      'Pulsante WhatsApp in un tocco',
      'Risposta a chiamate fuori orario',
      'Prenotazioni senza telefonate',
    ],

    services_label: 'Cosa facciamo',
    services_title: 'Tre servizi. Un solo referente.',
    services_sub:
      'Ti facciamo trovare, facciamo in modo che nessun cliente resti senza risposta e, quando serve, costruiamo il software su misura. Parti da quello che ti serve e aggiungi il resto quando vuoi.',

    s1_tag: '01 · Pronto Online',
    s1_title: 'Fatti trovare',
    s1_desc:
      'Tutto quello che serve perché un cliente ti trovi su Google e ti contatti in pochi secondi.',
    s1_items: [
      'Scheda Google Business ottimizzata',
      'Sito one-page veloce e mobile',
      'Pulsante WhatsApp e click-to-call',
      'Richiesta recensioni ai clienti soddisfatti',
    ],

    s2_tag: '02 · Flowstart AI',
    s2_title: 'Rispondi sempre',
    s2_desc:
      'Un assistente AI in italiano che lavora dentro i tuoi processi, 24 ore su 24.',
    s2_items: [
      'Agente vocale che risponde al telefono',
      'Assistente per WhatsApp e sito',
      'Prenotazioni e promemoria automatici',
      'Automazioni per il lavoro ripetitivo',
    ],

    s3_tag: '03 · Sviluppo',
    s3_title: 'Costruiamo su misura',
    s3_desc:
      'Siti web e software pensati per come lavori tu, non modelli già pronti.',
    s3_items: [
      'Siti web aziendali e landing page',
      'E-commerce (Shopify o su misura)',
      'Web app, gestionali e aree clienti',
      'Integrazioni: pagamenti, CRM, fatturazione',
    ],

    agency_title: 'Sei un’agenzia?',
    agency_desc:
      'Offri gli assistenti Flowstart ai tuoi clienti con il tuo marchio. Tecnologia nostra, relazione tua.',
    agency_cta: 'Parliamone →',

    how_label: 'Metodo',
    how_title: 'Operativi in circa 7 giorni.',
    how_sub:
      'Niente integrazioni complicate e niente formazione del personale. Ci pensiamo noi.',
    steps: [
      {
        title: 'Audit gratuito',
        desc: 'Guardiamo come ti trovano oggi su Google, sul sito e al telefono. Ti mandiamo cosa sistemare, in ordine di priorità.',
      },
      {
        title: 'Setup',
        desc: 'Sistemiamo la presenza online e, se serve, configuriamo l’assistente con la voce, gli orari e le informazioni della tua attività.',
      },
      {
        title: 'Supporto mensile',
        desc: 'Aggiornamenti, risposte alle recensioni, controllo dell’assistente e un report semplice su cosa sta funzionando.',
      },
    ],

    principles_label: 'Come lavoriamo',
    principles_title: 'Regole chiare, dall’inizio.',
    principles: [
      {
        title: 'Gli account sono tuoi',
        desc: 'Scheda Google, dominio e numeri restano a nome tuo. Se smetti, porti via tutto.',
      },
      {
        title: 'Prezzo chiaro prima di iniziare',
        desc: 'Dopo l’audit ricevi un preventivo scritto. Nessun costo nascosto.',
      },
      {
        title: 'Un solo referente',
        desc: 'Parli sempre con la stessa persona, su WhatsApp o al telefono.',
      },
      {
        title: 'Italiano e inglese',
        desc: 'Assistenti e siti in due lingue, utili anche per clienti e turisti stranieri.',
      },
    ],

    about_label: 'Chi siamo',
    about_title: 'Una piccola squadra, vicina alle attività locali.',
    about_body:
      'Flowstart nasce in Molise da Harrison Gboru, che lavora ogni giorno su e-commerce, siti e strumenti digitali per le aziende. L’idea è semplice: dare a studi, negozi e attività locali gli stessi strumenti delle grandi aziende, senza complicazioni.',
    about_facts: [
      ['Base', 'Campobasso, Molise'],
      ['Lavoriamo', 'In tutta Italia, da remoto'],
      ['Lingue', 'Italiano, inglese'],
    ],

    cta_label: 'Inizia oggi',
    cta_title: 'Vuoi sapere cosa migliorare per primo?',
    cta_sub:
      'Scrivici su WhatsApp il nome della tua attività. Ti mandiamo l’audit gratuito, senza impegno.',
    cta_btn: 'Scrivi su WhatsApp',
    cta_or: 'oppure',
    cta_form: 'Compila il modulo →',
    wa_text: 'Ciao, vorrei l’audit gratuito per la mia attività: ',
    wa_agency: 'Ciao, sono un’agenzia e vorrei informazioni sugli assistenti Flowstart in white-label.',

    calendly_title: 'Prenota 30 minuti con noi.',

    modal_title: 'Richiedi l’audit gratuito',
    modal_sub: 'Ti ricontattiamo entro 24 ore.',
    modal_name: 'Nome e cognome',
    modal_name_ph: 'Mario Rossi',
    modal_company: 'Attività',
    modal_company_ph: 'Studio Rossi',
    modal_email: 'Email',
    modal_email_ph: 'mario@tuaattivita.it',
    modal_interest: 'Cosa ti interessa?',
    modal_interest_opts: ['Farmi trovare online', 'Sito web / e-commerce', 'Software o app su misura', 'Assistente AI', 'Più servizi', 'Non lo so ancora'],
    modal_type: 'Tipo di attività',
    modal_type_ph: 'Seleziona...',
    modal_pain: 'Dove perdi più clienti o tempo? (opzionale)',
    modal_pain_ph: 'Es. non rispondiamo al telefono durante gli appuntamenti...',
    modal_submit: 'Invia richiesta',
    modal_success_title: 'Richiesta ricevuta.',
    modal_success_sub: 'Ti contatteremo entro 24 ore.',
    modal_privacy: 'Inviando accetti la',

    business_types: [
      'Studio medico / dentistico',
      'Studio professionale',
      'Ristorante / bar',
      'Hotel / B&B',
      'Parrucchiere / estetica',
      'Negozio',
      'Agenzia',
      'Altro',
    ],

    footer_rights: '© 2026 Flowstart. Tutti i diritti riservati.',
    footer_privacy: 'Privacy',
    footer_terms: 'Termini',
  },
  en: {
    nav_services: 'Services',
    nav_method: 'Method',
    nav_about: 'About',
    nav_cta: 'Free audit',

    hero_label: 'Websites · Software · AI assistants for small businesses',
    hero_h1_line1: 'Customers find you on Google.',
    hero_h1_line2: 'They get an answer even when you’re busy.',
    hero_sub:
      'Flowstart builds websites and software for your business, gets you found on Google and adds an AI assistant that answers calls and messages, books appointments and stops you losing customers after hours.',
    hero_cta_primary: 'Get the free audit',
    hero_cta_secondary: 'Book a call',
    hero_note: 'Audit over WhatsApp, no strings attached. We reply the same day.',

    audit_title: 'Quick audit · your business',
    audit_before: 'Today',
    audit_after: 'With Flowstart',
    audit_items: [
      'Complete Google profile, with hours and photos',
      'Website that’s fast on a phone',
      'One-tap WhatsApp button',
      'Calls answered after hours',
      'Bookings without phone calls',
    ],

    services_label: 'What we do',
    services_title: 'Three services. One point of contact.',
    services_sub:
      'We get you found, make sure no customer goes unanswered and, when you need it, build custom software. Start with what you need and add the rest whenever you like.',

    s1_tag: '01 · Pronto Online',
    s1_title: 'Get found',
    s1_desc:
      'Everything a customer needs to find you on Google and contact you in seconds.',
    s1_items: [
      'Optimised Google Business Profile',
      'Fast, mobile one-page website',
      'WhatsApp and click-to-call buttons',
      'Review requests to happy customers',
    ],

    s2_tag: '02 · Flowstart AI',
    s2_title: 'Always answer',
    s2_desc:
      'An AI assistant in Italian and English that works inside your processes, 24/7.',
    s2_items: [
      'Voice agent that answers the phone',
      'Assistant for WhatsApp and your website',
      'Automatic bookings and reminders',
      'Automations for repetitive work',
    ],

    s3_tag: '03 · Development',
    s3_title: 'Built for you',
    s3_desc:
      'Websites and software designed around how you work, not off-the-shelf templates.',
    s3_items: [
      'Business websites and landing pages',
      'E-commerce (Shopify or custom)',
      'Web apps, management tools and client portals',
      'Integrations: payments, CRM, invoicing',
    ],

    agency_title: 'Are you an agency?',
    agency_desc:
      'Offer Flowstart assistants to your clients under your own brand. Our technology, your relationship.',
    agency_cta: 'Let’s talk →',

    how_label: 'Method',
    how_title: 'Live in about 7 days.',
    how_sub: 'No complex integrations and no staff training. We handle it.',
    steps: [
      {
        title: 'Free audit',
        desc: 'We check how people find you today on Google, on your site and by phone, and send you what to fix, in priority order.',
      },
      {
        title: 'Setup',
        desc: 'We fix your online presence and, if needed, set up the assistant with your business’s voice, hours and information.',
      },
      {
        title: 'Monthly support',
        desc: 'Updates, review replies, assistant check-ups and a simple report on what’s working.',
      },
    ],

    principles_label: 'How we work',
    principles_title: 'Clear rules from day one.',
    principles: [
      {
        title: 'You own the accounts',
        desc: 'Google profile, domain and numbers stay in your name. If you leave, you take everything.',
      },
      {
        title: 'Clear price before we start',
        desc: 'After the audit you get a written quote. No hidden costs.',
      },
      {
        title: 'One point of contact',
        desc: 'You always speak to the same person, on WhatsApp or by phone.',
      },
      {
        title: 'Italian and English',
        desc: 'Bilingual assistants and sites, useful for foreign customers and tourists too.',
      },
    ],

    about_label: 'About',
    about_title: 'A small team, close to local businesses.',
    about_body:
      'Flowstart was started in Molise by Harrison Gboru, who works every day on e-commerce, websites and digital tools for businesses. The idea is simple: give practices, shops and local businesses the same tools big companies use, without the complexity.',
    about_facts: [
      ['Based in', 'Campobasso, Molise'],
      ['We work', 'Across Italy, remotely'],
      ['Languages', 'Italian, English'],
    ],

    cta_label: 'Get started',
    cta_title: 'Want to know what to fix first?',
    cta_sub:
      'Send us your business name on WhatsApp. We’ll send you the free audit, no strings attached.',
    cta_btn: 'Message on WhatsApp',
    cta_or: 'or',
    cta_form: 'Fill in the form →',
    wa_text: 'Hi, I’d like the free audit for my business: ',
    wa_agency: 'Hi, I run an agency and would like information on white-label Flowstart assistants.',

    calendly_title: 'Book 30 minutes with us.',

    modal_title: 'Request the free audit',
    modal_sub: 'We’ll get back to you within 24 hours.',
    modal_name: 'Full name',
    modal_name_ph: 'Mario Rossi',
    modal_company: 'Business',
    modal_company_ph: 'Rossi Practice',
    modal_email: 'Email',
    modal_email_ph: 'mario@yourbusiness.it',
    modal_interest: 'What are you interested in?',
    modal_interest_opts: ['Getting found online', 'Website / e-commerce', 'Custom software or app', 'AI assistant', 'Several services', 'Not sure yet'],
    modal_type: 'Business type',
    modal_type_ph: 'Select...',
    modal_pain: 'Where do you lose most customers or time? (optional)',
    modal_pain_ph: 'E.g. we can’t answer the phone during appointments...',
    modal_submit: 'Send request',
    modal_success_title: 'Request received.',
    modal_success_sub: 'We’ll contact you within 24 hours.',
    modal_privacy: 'By sending you accept the',

    business_types: [
      'Medical / dental practice',
      'Professional firm',
      'Restaurant / bar',
      'Hotel / B&B',
      'Hair / beauty salon',
      'Shop',
      'Agency',
      'Other',
    ],

    footer_rights: '© 2026 Flowstart. All rights reserved.',
    footer_privacy: 'Privacy',
    footer_terms: 'Terms',
  },
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 mb-4">
      <div className="h-px w-8 bg-emerald-500" />
      <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">
        {children}
      </span>
    </div>
  )
}

function Check({ ok }) {
  return ok ? (
    <svg className="w-4 h-4 text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-slate-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 01-4.82-1.32l-.35-.2-3.58.93.96-3.49-.23-.36a9.43 9.43 0 01-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47a9.4 9.4 0 016.7 2.78 9.4 9.4 0 012.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0012.04.63C5.76.63.65 5.74.65 12.02c0 2 .52 3.97 1.52 5.7L.55 23.63l6.05-1.59a11.35 11.35 0 005.43 1.38h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.06z" />
    </svg>
  )
}

export default function LandingPage() {
  const [lang, setLang] = useState('it')
  const [showModal, setShowModal] = useState(false)
  const [form, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || 'missing-id')
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL

  const c = t[lang]

  const inputClass = `
    w-full bg-white/[0.04] border border-white/[0.08]
    hover:border-white/[0.14] focus:border-emerald-500/50
    focus:outline-none focus:ring-0
    text-white placeholder:text-slate-600
    rounded-lg px-4 py-3 text-sm transition-colors
  `

  const primaryBtn = `group inline-flex items-center justify-center gap-2
    bg-emerald-500 hover:bg-emerald-400 text-white font-semibold
    px-6 py-3.5 rounded-xl text-sm transition-all active:scale-[0.98]
    shadow-[0_0_24px_rgba(16,185,129,0.2)] hover:shadow-[0_0_32px_rgba(16,185,129,0.3)]`

  const secondaryBtn = `inline-flex items-center justify-center gap-2
    border border-white/[0.12] hover:border-white/[0.24] hover:bg-white/[0.04]
    text-white font-medium px-6 py-3.5 rounded-xl text-sm transition-all`

  return (
    <div lang={lang} style={{ background: '#0f172a' }} className="min-h-screen">

      {/* ─── NAV ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(15,23,42,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">Flowstart</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-slate-400 hover:text-white text-sm transition-colors">{c.nav_services}</a>
            <a href="#how" className="text-slate-400 hover:text-white text-sm transition-colors">{c.nav_method}</a>
            <a href="#about" className="text-slate-400 hover:text-white text-sm transition-colors">{c.nav_about}</a>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang((l) => (l === 'it' ? 'en' : 'it'))}
              aria-label={lang === 'it' ? 'Switch to English' : 'Passa all’italiano'}
              className="text-slate-400 hover:text-white text-xs font-medium transition-colors px-2 py-1 rounded hover:bg-white/[0.05]"
            >
              {lang === 'it' ? 'EN' : 'IT'}
            </button>
            <a
              href={waLink(c.wa_text)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all active:scale-[0.97]"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              {c.nav_cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section id="top" className="pt-28 pb-20 md:pt-36 md:pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 mb-8">
              <div className="h-px w-8 bg-emerald-500" />
              <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">{c.hero_label}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.05] mb-6">
              {c.hero_h1_line1}
              <br />
              <span style={{ color: '#10b981' }}>{c.hero_h1_line2}</span>
            </h1>

            <p className="text-slate-400 text-lg leading-relaxed max-w-xl mb-10">{c.hero_sub}</p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a href={waLink(c.wa_text)} target="_blank" rel="noopener noreferrer" className={primaryBtn}>
                <WhatsAppIcon />
                {c.hero_cta_primary}
              </a>
              <button onClick={() => setShowModal(true)} className={secondaryBtn}>
                {c.hero_cta_secondary}
              </button>
            </div>
            <p className="text-slate-500 text-xs mt-4">{c.hero_note}</p>
          </div>

          {/* Audit card */}
          <div className="animate-fade-up-delay-2 rounded-2xl border border-white/[0.08] bg-[#0b1222] p-6 md:p-7">
            <div className="flex items-center justify-between mb-6">
              <span className="text-white text-sm font-semibold tracking-tight">{c.audit_title}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 rounded px-2 py-0.5">
                audit
              </span>
            </div>
            <div className="grid grid-cols-[1fr_auto_auto] gap-x-5 gap-y-3.5 items-center text-sm">
              <span />
              <span className="text-slate-500 text-[11px] uppercase tracking-wider text-center">{c.audit_before}</span>
              <span className="text-emerald-400 text-[11px] uppercase tracking-wider text-center">{c.audit_after}</span>
              {c.audit_items.map((item, i) => (
                <div key={item} className="contents">
                  <span className="text-slate-300 leading-snug">{item}</span>
                  <span className="flex justify-center"><Check ok={i === 0} /></span>
                  <span className="flex justify-center"><Check ok /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" className="py-24 md:py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14 max-w-2xl">
            <SectionLabel>{c.services_label}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">{c.services_title}</h2>
            <p className="text-slate-400 text-base leading-relaxed">{c.services_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tag: c.s1_tag, title: c.s1_title, desc: c.s1_desc, items: c.s1_items, accent: false },
              { tag: c.s2_tag, title: c.s2_title, desc: c.s2_desc, items: c.s2_items, accent: true },
              { tag: c.s3_tag, title: c.s3_title, desc: c.s3_desc, items: c.s3_items, accent: false },
            ].map(({ tag, title, desc, items, accent }) => (
              <div
                key={tag}
                className={`rounded-2xl p-7 md:p-8 border ${
                  accent ? 'border-emerald-500/25 bg-emerald-950/20' : 'border-white/[0.07] bg-[#0b1222]'
                }`}
              >
                <div className="text-emerald-400 text-xs font-mono font-medium mb-5">{tag}</div>
                <h3 className="text-white font-semibold text-2xl tracking-tight mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{desc}</p>
                <ul className="space-y-3">
                  {items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm text-slate-300">
                      <span className="mt-0.5"><Check ok /></span>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-white/[0.07] px-7 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold text-base tracking-tight mb-1">{c.agency_title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{c.agency_desc}</p>
            </div>
            <a
              href={waLink(c.wa_agency)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium whitespace-nowrap transition-colors"
            >
              {c.agency_cta}
            </a>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section id="how" className="py-24 md:py-32 px-6 border-t border-white/[0.06]" style={{ background: '#080e1a' }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <SectionLabel>{c.how_label}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">{c.how_title}</h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-md">{c.how_sub}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {c.steps.map(({ title, desc }, i) => (
              <div key={title} className="p-8 bg-[#0b1222]">
                <div className="text-emerald-500 text-xs font-mono font-medium mb-6">0{i + 1}</div>
                <h3 className="text-white font-semibold text-base tracking-tight mb-3">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ─── */}
      <section id="principles" className="py-24 md:py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <SectionLabel>{c.principles_label}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{c.principles_title}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {c.principles.map(({ title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/[0.07] bg-[#0b1222] p-6">
                <h3 className="text-white font-semibold text-base tracking-tight mb-2">{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-32 px-6 border-t border-white/[0.06]" style={{ background: '#080e1a' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start">
          <div
            className="w-28 h-28 md:w-36 md:h-36 rounded-2xl border border-white/[0.08] bg-[#0b1222] flex items-center justify-center"
            aria-hidden="true"
          >
            <span className="text-emerald-400 font-semibold text-3xl md:text-4xl tracking-tight">HG</span>
          </div>
          <div>
            <SectionLabel>{c.about_label}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-5 max-w-2xl">{c.about_title}</h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-2xl mb-8">{c.about_body}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/[0.06] pt-6">
              {c.about_facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="text-slate-500 text-xs uppercase tracking-wider mb-1">{k}</dt>
                  <dd className="text-white text-sm">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section id="cta" className="py-24 md:py-32 px-6 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl">
            <SectionLabel>{c.cta_label}</SectionLabel>
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4">{c.cta_title}</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-8">{c.cta_sub}</p>
            <div className="flex flex-col gap-4">
              <a href={waLink(c.wa_text)} target="_blank" rel="noopener noreferrer" className={primaryBtn + ' self-start'}>
                <WhatsAppIcon />
                {c.cta_btn}
              </a>
              <div className="flex items-center gap-3 max-w-xs">
                <div className="h-px flex-1 bg-white/[0.06]" />
                <span className="text-slate-600 text-xs">{c.cta_or}</span>
                <div className="h-px flex-1 bg-white/[0.06]" />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="text-slate-400 hover:text-white text-sm transition-colors self-start"
              >
                {c.cta_form}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALENDLY (only if configured) ─── */}
      {calendlyUrl && (
        <section id="calendly" className="py-24 md:py-32 px-6 border-t border-white/[0.06]" style={{ background: '#080e1a' }}>
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mb-3">Discovery call</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">{c.calendly_title}</h2>
            </div>
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
              <iframe src={calendlyUrl} width="100%" height="600" frameBorder="0" title="Book a call" loading="lazy" />
            </div>
          </div>
        </section>
      )}

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-white/[0.06] px-6 py-10" style={{ background: '#080e1a' }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-emerald-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-[10px]">F</span>
            </div>
            <span className="text-slate-500 text-xs">{c.footer_rights}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="mailto:hello@flowstart.it" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              hello@flowstart.it
            </a>
            <a href={waLink(c.wa_text)} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">
              WhatsApp +39 351 754 6455
            </a>
            <Link href="/privacy" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">{c.footer_privacy}</Link>
            <Link href="/terms" className="text-slate-500 hover:text-slate-300 text-xs transition-colors">{c.footer_terms}</Link>
          </div>
        </div>
      </footer>

      {/* ─── MODAL ─── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl border border-white/[0.10] p-8 my-8" style={{ background: '#0b1222' }}>
            {form.succeeded ? (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5">
                  <Check ok />
                </div>
                <h3 className="text-white font-semibold text-lg tracking-tight mb-2">{c.modal_success_title}</h3>
                <p className="text-slate-400 text-sm">{c.modal_success_sub}</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-white font-semibold text-lg tracking-tight mb-1">{c.modal_title}</h3>
                    <p className="text-slate-400 text-sm">{c.modal_sub}</p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                    className="text-slate-500 hover:text-slate-300 text-xl leading-none ml-4 mt-0.5 transition-colors"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="hidden" name="lang" value={lang} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5 font-medium">{c.modal_name}</label>
                      <input name="name" required type="text" placeholder={c.modal_name_ph} className={inputClass} />
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5 font-medium">{c.modal_email}</label>
                      <input name="email" required type="email" placeholder={c.modal_email_ph} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1.5 font-medium">{c.modal_company}</label>
                    <input name="company" required type="text" placeholder={c.modal_company_ph} className={inputClass} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5 font-medium">{c.modal_type}</label>
                      <select name="business_type" required className={inputClass + ' cursor-pointer'}>
                        <option value="">{c.modal_type_ph}</option>
                        {c.business_types.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-400 text-xs mb-1.5 font-medium">{c.modal_interest}</label>
                      <select name="interest" required className={inputClass + ' cursor-pointer'}>
                        <option value="">{c.modal_type_ph}</option>
                        {c.modal_interest_opts.map((o) => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-400 text-xs mb-1.5 font-medium">{c.modal_pain}</label>
                    <textarea name="pain_point" rows={3} placeholder={c.modal_pain_ph} className={inputClass + ' resize-none'} />
                  </div>

                  <button
                    type="submit"
                    disabled={form.submitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-60 text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-[0.98] mt-2"
                  >
                    {c.modal_submit}
                  </button>
                  <p className="text-slate-500 text-[11px] text-center">
                    {c.modal_privacy}{' '}
                    <Link href="/privacy" className="underline hover:text-slate-300">Privacy Policy</Link>.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
