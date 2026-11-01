'use client'
import { useEffect, useState } from 'react'
import { useForm } from '@formspree/react'
import Link from 'next/link'

const WA = '393517546455'
const wa = (text) => `https://wa.me/${WA}?text=${encodeURIComponent(text)}`
const PHONE = '+39 351 754 6455'
const EMAIL = 'hello@flowstart.it'

const T = {
  it: {
    nav: [['#progetti', 'Progetti'], ['#servizi', 'Servizi'], ['#metodo', 'Metodo'], ['#chi-sono', 'Chi sono'], ['/login', 'Accedi']],
    h1a: 'La tua attività, ',
    h1mark: 'trovata su Google',
    h1b: ' e sempre raggiungibile.',
    lede: 'Sono Harrison, e Flowstart è il mio studio in Molise. Costruisco siti web e software, sistemo la tua presenza su Google e aggiungo assistenti AI che rispondono ai clienti quando tu non puoi.',
    ctaAudit: 'Richiedi l’audit gratuito',
    ctaWork: 'Vedi i progetti',
    tags: ['Google Business Profile', 'Siti web', 'Shopify e SEO', 'Web app', 'Assistenti vocali AI', 'GA4'],

    auditTitle: 'Audit presenza online',
    auditSub: 'Pizzeria di quartiere, Campobasso',
    auditChip: 'Esempio',
    before: 'Prima',
    after: 'Dopo',
    score: 'Punteggio',
    checks: [
      ['Scheda Google', 'Orari vecchi, 2 foto, categoria sbagliata', 'Completa: orari, foto, categorie, servizi'],
      ['Sito web', 'Lento da telefono, nessun pulsante per chiamare', 'Veloce, con chiama e WhatsApp in un tocco'],
      ['Recensioni', 'Nessuna risposta del titolare', 'Link diretto per chiederle, risposte a tutte'],
      ['Telefono', 'Chiamate perse durante il servizio', 'L’assistente risponde e prende la prenotazione'],
      ['Email', 'Indirizzo @gmail.com, finisce in spam', 'info@ sul tuo dominio, con record anti-spam'],
    ],

    workH: 'Progetti veri, online e funzionanti.',
    workP: 'Dal 2025 ho pubblicato dieci prodotti, dai siti per attività locali alle app con intelligenza artificiale. Questi tre mostrano meglio cosa faccio.',
    cases: {
      flow: {
        title: 'Flowstart AI',
        desc: 'La piattaforma su cui girano i miei assistenti AI. Ogni attività ha la sua area riservata, con chiamate e prenotazioni in tempo reale.',
        bullets: ['Agenti vocali collegati al numero dell’attività', 'Abbonamenti e pagamenti con Stripe', 'Automazioni tra sistemi con n8n'],
        link: 'Apri l’area clienti',
        dashTitle: 'Chiamate di oggi',
        live: 'attivo',
        calls: [['Prenotazione giovedì 18:30', 'ok', '2:14'], ['Orari di apertura', 'ok', '0:41'], ['Richiamare il titolare', 'mark', '1:05']],
      },
      gold: {
        desc: 'Sito per un centro massaggi a Bojano, pensato per una cosa sola: far prenotare dal telefono.',
        bullets: ['Prenotazione e WhatsApp sempre a portata', 'Dati strutturati per Google Maps'],
        link: 'Apri il sito',
        sub: 'Massaggi e benessere, Bojano',
        btn: 'Prenota ora',
      },
      bridge: {
        desc: 'App che legge i documenti della burocrazia europea e li spiega agli immigrati in parole semplici.',
        bullets: ['Rischio a semaforo e scadenze con avvisi', 'Lettere formali in 4 lingue'],
        link: 'Apri l’app',
        rows: ['Permesso di soggiorno', 'Scade tra 60 giorni', 'Prossimi passi pronti'],
      },
    },

    servH: 'Farti trovare, farti rispondere, costruire il resto.',
    servP: 'Prezzo fisso, deciso dopo l’audit gratuito o una prima chiamata. Account, dominio e codice restano sempre a nome tuo.',
    offers: [
      {
        kicker: 'Pronto Online',
        title: 'Pronto per essere trovato',
        for: 'Per ristoranti, negozi, artigiani, studi professionali e centri benessere.',
        items: [
          ['Scheda Google', ' sistemata, con un link per raccogliere recensioni'],
          ['Sito o pagina contatti', ': chiama, WhatsApp, email, indicazioni'],
          ['Email aziendale', ' sul tuo dominio, che non finisce in spam'],
          ['Stessi dati ovunque', ' su sito, Google, Facebook e directory'],
        ],
        note: 'Piano mensile opzionale: foto e post su Google, risposte alle recensioni, report mensile.',
        cta: 'Richiedi l’audit gratuito',
        msg: 'audit',
      },
      {
        kicker: 'Flowstart AI',
        title: 'Un assistente che risponde 24/7',
        for: 'Per studi medici, studi professionali e attività che perdono chiamate quando sono occupate o chiuse.',
        items: [
          ['Risponde al telefono', ' con una voce italiana naturale'],
          ['Prende appuntamenti', ' e risponde alle domande frequenti'],
          ['Richiama i clienti', ' che non tornano da mesi'],
          ['Dati in Europa', ', nel rispetto del GDPR'],
        ],
        note: 'Ogni chiamata è registrata nel tuo pannello, con esito e durata.',
        cta: 'Chiedimi una demo',
        msg: 'demo',
        feature: true,
      },
      {
        kicker: 'Sviluppo',
        title: 'Siti e software su misura',
        for: 'Per aziende che hanno bisogno di un sito, un e-commerce o uno strumento interno fatto per come lavorano.',
        items: [
          ['Siti aziendali', ' e landing page veloci da telefono'],
          ['E-commerce', ' su Shopify, con SEO e schede prodotto'],
          ['Web app', ', gestionali e aree clienti'],
          ['Integrazioni', ' con pagamenti, CRM e fatturazione'],
        ],
        note: 'Preventivo scritto dopo una prima chiamata, con tempi e consegne chiari.',
        cta: 'Raccontami il progetto',
        msg: 'dev',
      },
    ],
    agency: 'Sei un’agenzia? Puoi offrire gli assistenti Flowstart ai tuoi clienti con il tuo marchio.',
    agencyLink: 'Parliamone su WhatsApp',

    stepsH: 'Tre passi, nessuna sorpresa.',
    stepsP: 'Parli sempre con me, in italiano o in inglese. Niente gergo tecnico.',
    steps: [
      ['Audit gratuito', 'Controllo come ti vedono oggi i clienti su Google, sul sito e al telefono. Ricevi l’elenco di cosa manca e un prezzo fisso.'],
      ['Setup', 'Sistemo tutto io. Tu approvi testi e foto prima che vadano online, e gli account restano a nome tuo.'],
      ['Supporto mensile', 'Se vuoi, me ne occupo ogni mese e ti mando un report semplice: chiamate, visite, recensioni.'],
    ],

    aboutH: 'Tecnico di formazione, vicino alle attività del territorio.',
    about: [
      'Ho lavorato più di cinque anni nel supporto IT per un’azienda internazionale, poi in produzione, nelle consegne e come tecnico della fibra ottica qui in Molise. Conosco il lavoro di chi apre la serranda ogni mattina.',
      'Nel 2025 ho imparato a programmare e da allora ho pubblicato dieci prodotti: siti, app e assistenti AI. Con Flowstart metto insieme le due cose: tecnologia seria, spiegata in modo semplice.',
    ],
    portraitTop: 'Campobasso, Molise',
    portraitBottom: 'Harrison Gboru, fondatore',
    facts: [['Base', 'Campobasso, Molise'], ['Lingue', 'Italiano, inglese'], ['Lavoro', 'In tutta Italia, anche da remoto'], ['Strumenti', 'Shopify, Google, React, Next.js, Supabase']],

    contactH: 'Parliamo della tua attività.',
    contactP: 'Scrivimi su WhatsApp con il nome della tua attività. Ti mando l’audit gratuito e ti dico con chiarezza cosa conviene fare.',
    contactWa: 'Scrivimi su WhatsApp',
    contactForm: 'Preferisco il modulo',
    phoneLabel: 'Telefono e WhatsApp',
    copy: 'Copia',
    copied: 'Copiato',
    calH: 'Prenota 30 minuti con me',

    msgs: {
      audit: 'Ciao Harrison, vorrei l’audit gratuito per la mia attività: ',
      demo: 'Ciao Harrison, vorrei una demo dell’assistente AI per la mia attività: ',
      dev: 'Ciao Harrison, vorrei un preventivo per un sito o software. Il progetto: ',
      agency: 'Ciao Harrison, ho un’agenzia e vorrei offrire gli assistenti Flowstart ai miei clienti.',
    },

    mTitle: 'Richiedi l’audit gratuito',
    mSub: 'Ti rispondo entro 24 ore.',
    mName: 'Nome e cognome',
    mEmail: 'Email',
    mBiz: 'Attività',
    mType: 'Tipo di attività',
    mInterest: 'Cosa ti serve?',
    mPick: 'Seleziona',
    mPain: 'Raccontami in breve (facoltativo)',
    mPainPh: 'Es. non riusciamo a rispondere al telefono durante gli appuntamenti',
    mSend: 'Invia richiesta',
    mFine: 'Inviando accetti la',
    mErr: 'Invio non riuscito. Riprova o scrivimi su WhatsApp.',
    mDoneH: 'Richiesta inviata',
    mDoneP: 'Ti rispondo entro 24 ore all’email che hai indicato.',
    close: 'Chiudi',
    types: ['Studio medico o dentistico', 'Studio professionale', 'Ristorante o bar', 'Hotel o B&B', 'Parrucchiere o estetica', 'Negozio', 'Azienda', 'Agenzia', 'Altro'],
    interests: ['Farmi trovare su Google', 'Sito web o e-commerce', 'Software o app su misura', 'Assistente AI', 'Più cose insieme', 'Non lo so ancora'],

    rights: '© 2026 Flowstart',
    privacy: 'Privacy',
    terms: 'Termini',
    clients: 'Area clienti',
  },
  en: {
    nav: [['#progetti', 'Work'], ['#servizi', 'Services'], ['#metodo', 'Process'], ['#chi-sono', 'About'], ['/login', 'Log in']],
    h1a: 'Your business, ',
    h1mark: 'found on Google',
    h1b: ' and always reachable.',
    lede: 'I’m Harrison, and Flowstart is my studio in Molise, Italy. I build websites and software, fix your presence on Google and add AI assistants that answer customers when you can’t.',
    ctaAudit: 'Get a free audit',
    ctaWork: 'See my work',
    tags: ['Google Business Profile', 'Websites', 'Shopify and SEO', 'Web apps', 'AI voice assistants', 'GA4'],

    auditTitle: 'Online presence audit',
    auditSub: 'Neighbourhood pizzeria, Campobasso',
    auditChip: 'Example',
    before: 'Before',
    after: 'After',
    score: 'Score',
    checks: [
      ['Google profile', 'Old hours, 2 photos, wrong category', 'Complete: hours, photos, categories, services'],
      ['Website', 'Slow on a phone, no call button', 'Fast, with one-tap call and WhatsApp'],
      ['Reviews', 'No replies from the owner', 'A direct link to ask for them, every one answered'],
      ['Phone', 'Calls missed during service', 'The assistant answers and takes the booking'],
      ['Email', 'A @gmail.com address that lands in spam', 'info@ on your own domain, with anti-spam records'],
    ],

    workH: 'Real projects, live and working.',
    workP: 'Since 2025 I’ve shipped ten products, from local business sites to AI apps. These three show best what I do.',
    cases: {
      flow: {
        title: 'Flowstart AI',
        desc: 'The platform my AI assistants run on. Each business gets its own private area, with calls and bookings in real time.',
        bullets: ['Voice agents connected to the business’s number', 'Subscriptions and payments with Stripe', 'Cross-system automations with n8n'],
        link: 'Open the client area',
        dashTitle: 'Today’s calls',
        live: 'live',
        calls: [['Booking Thursday 6:30pm', 'ok', '2:14'], ['Opening hours', 'ok', '0:41'], ['Call the owner back', 'mark', '1:05']],
      },
      gold: {
        desc: 'A site for a massage studio in Bojano, built for one job: booking from a phone.',
        bullets: ['Booking and WhatsApp always in reach', 'Structured data for Google Maps'],
        link: 'Open the site',
        sub: 'Massage and wellness, Bojano',
        btn: 'Book now',
      },
      bridge: {
        desc: 'An app that reads European bureaucracy documents and explains them to immigrants in plain words.',
        bullets: ['Traffic-light risk and deadline alerts', 'Formal letters in 4 languages'],
        link: 'Open the app',
        rows: ['Residence permit', 'Expires in 60 days', 'Next steps ready'],
      },
    },

    servH: 'Get found, get answered, build the rest.',
    servP: 'A fixed price, agreed after the free audit or a first call. Accounts, domain and code always stay in your name.',
    offers: [
      {
        kicker: 'Pronto Online',
        title: 'Ready to be found',
        for: 'For restaurants, shops, trades, professional studios and wellness centres.',
        items: [
          ['Google profile', ' cleaned up, with a link to collect reviews'],
          ['Website or contact page', ': call, WhatsApp, email, directions'],
          ['Company email', ' on your own domain that stays out of spam'],
          ['Consistent details', ' across site, Google, Facebook and directories'],
        ],
        note: 'Optional monthly plan: Google photos and posts, review replies, a monthly report.',
        cta: 'Get a free audit',
        msg: 'audit',
      },
      {
        kicker: 'Flowstart AI',
        title: 'An assistant that answers 24/7',
        for: 'For clinics, professional firms and businesses that miss calls when they’re busy or closed.',
        items: [
          ['Answers the phone', ' with a natural Italian voice'],
          ['Books appointments', ' and answers common questions'],
          ['Reactivates customers', ' who haven’t come back in months'],
          ['Data in Europe', ', handled under GDPR'],
        ],
        note: 'Every call is logged in your dashboard, with outcome and length.',
        cta: 'Ask me for a demo',
        msg: 'demo',
        feature: true,
      },
      {
        kicker: 'Development',
        title: 'Custom websites and software',
        for: 'For companies that need a website, an online shop or an internal tool built around how they work.',
        items: [
          ['Business websites', ' and landing pages that are fast on a phone'],
          ['Online shops', ' on Shopify, with SEO and product pages'],
          ['Web apps', ', management tools and client portals'],
          ['Integrations', ' with payments, CRM and invoicing'],
        ],
        note: 'A written quote after a first call, with clear timelines and deliverables.',
        cta: 'Tell me about the project',
        msg: 'dev',
      },
    ],
    agency: 'Running an agency? You can offer Flowstart assistants to your clients under your own brand.',
    agencyLink: 'Let’s talk on WhatsApp',

    stepsH: 'Three steps, no surprises.',
    stepsP: 'You always deal with me, in Italian or English. No jargon.',
    steps: [
      ['Free audit', 'I check how customers see you today on Google, your site and the phone. You get a list of what’s missing and a fixed price.'],
      ['Setup', 'I set everything up. You approve texts and photos before they go live, and the accounts stay in your name.'],
      ['Monthly support', 'If you want, I look after it every month and send a simple report: calls, visits, reviews.'],
    ],

    aboutH: 'Technical by training, close to local businesses.',
    about: [
      'I spent more than five years in IT support for an international company, then worked in production, delivery and as a fibre-optic technician here in Molise. I know the work of people who open the shutters every morning.',
      'In 2025 I learned to code, and since then I’ve shipped ten products: websites, apps and AI assistants. With Flowstart I bring both together: serious technology, explained simply.',
    ],
    portraitTop: 'Campobasso, Molise',
    portraitBottom: 'Harrison Gboru, founder',
    facts: [['Based in', 'Campobasso, Molise'], ['Languages', 'Italian, English'], ['I work', 'Across Italy, remotely too'], ['Tools', 'Shopify, Google, React, Next.js, Supabase']],

    contactH: 'Let’s talk about your business.',
    contactP: 'Message me on WhatsApp with your business name. I’ll send you the free audit and tell you plainly what’s worth doing.',
    contactWa: 'Message me on WhatsApp',
    contactForm: 'I’d rather use the form',
    phoneLabel: 'Phone and WhatsApp',
    copy: 'Copy',
    copied: 'Copied',
    calH: 'Book 30 minutes with me',

    msgs: {
      audit: 'Hi Harrison, I’d like the free audit for my business: ',
      demo: 'Hi Harrison, I’d like a demo of the AI assistant for my business: ',
      dev: 'Hi Harrison, I’d like a quote for a website or software. The project: ',
      agency: 'Hi Harrison, I run an agency and would like to offer Flowstart assistants to my clients.',
    },

    mTitle: 'Request the free audit',
    mSub: 'I’ll reply within 24 hours.',
    mName: 'Full name',
    mEmail: 'Email',
    mBiz: 'Business',
    mType: 'Business type',
    mInterest: 'What do you need?',
    mPick: 'Select',
    mPain: 'Tell me briefly (optional)',
    mPainPh: 'E.g. we can’t answer the phone during appointments',
    mSend: 'Send request',
    mFine: 'By sending you accept the',
    mErr: 'Sending failed. Try again or message me on WhatsApp.',
    mDoneH: 'Request sent',
    mDoneP: 'I’ll reply within 24 hours to the email you gave.',
    close: 'Close',
    types: ['Medical or dental practice', 'Professional firm', 'Restaurant or bar', 'Hotel or B&B', 'Hair or beauty salon', 'Shop', 'Company', 'Agency', 'Other'],
    interests: ['Getting found on Google', 'Website or online shop', 'Custom software or app', 'AI assistant', 'Several things', 'Not sure yet'],

    rights: '© 2026 Flowstart',
    privacy: 'Privacy',
    terms: 'Terms',
    clients: 'Client area',
  },
}

function WaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.7-1.2 2.2 2.2 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  )
}

function CopyLine({ label, value, c }) {
  const [done, setDone] = useState(false)
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setDone(true)
      setTimeout(() => setDone(false), 1600)
    } catch {
      /* clipboard blocked: the value is user-select:all, so a tap still selects it */
    }
  }
  return (
    <div className="line">
      <div style={{ minWidth: 0 }}>
        <small>{label}</small>
        <output>{value}</output>
      </div>
      <button type="button" className="copy" onClick={onCopy}>{done ? c.copied : c.copy}</button>
    </div>
  )
}

export default function Home({ fontClass = '' }) {
  const [lang, setLang] = useState('it')
  const [audit, setAudit] = useState('before')
  const [touched, setTouched] = useState(false)
  const [modal, setModal] = useState(false)
  const [form, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID || 'missing-id')
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL
  const c = T[lang]

  useEffect(() => {
    try {
      const saved = localStorage.getItem('fs-lang')
      if (saved === 'en' || saved === 'it') setLang(saved) // eslint-disable-line react-hooks/set-state-in-effect
    } catch { /* storage unavailable */ }
  }, [])

  useEffect(() => {
    try { localStorage.setItem('fs-lang', lang) } catch { /* storage unavailable */ }
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (touched) return
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => setAudit('after'), 1800)
    return () => clearTimeout(id)
  }, [touched])

  useEffect(() => {
    if (!modal) return
    const onKey = (e) => e.key === 'Escape' && setModal(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modal])

  const pickState = (s) => { setTouched(true); setAudit(s) }
  const ok = audit === 'after'
  const flow = c.cases.flow

  return (
    <div className={`fs ${fontClass}`}>
      <header>
        <div className="wrap bar">
          <a className="logo" href="#top"><i>F</i>Flowstart</a>
          <nav className="nav" aria-label={lang === 'it' ? 'Sezioni' : 'Sections'}>
            {c.nav.map(([href, label]) =>
              href.startsWith('/')
                ? <Link key={href} href={href}>{label}</Link>
                : <a key={href} href={href}>{label}</a>
            )}
          </nav>
          <div className="lang" role="group" aria-label="Lingua / Language">
            <button type="button" aria-pressed={lang === 'it'} onClick={() => setLang('it')}>IT</button>
            <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
          <a className="btn primary sm" href={wa(c.msgs.audit)} target="_blank" rel="noopener noreferrer">
            <WaIcon /><span className="t">WhatsApp</span>
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1>{c.h1a}<span className="mark">{c.h1mark}</span>{c.h1b}</h1>
              <p className="lede">{c.lede}</p>
              <div className="ctas">
                <a className="btn primary" href={wa(c.msgs.audit)} target="_blank" rel="noopener noreferrer">{c.ctaAudit}</a>
                <a className="btn" href="#progetti">{c.ctaWork}</a>
              </div>
              <ul className="tags" aria-label={lang === 'it' ? 'Competenze' : 'Skills'}>
                {c.tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>

            <div className="audit" data-state={audit} aria-live="polite">
              <div className="audit-head">
                <div>
                  <h3>{c.auditTitle}</h3>
                  <p>{c.auditSub}</p>
                </div>
                <span className="chip">{c.auditChip}</span>
              </div>
              <div className="switch" role="group" aria-label={`${c.before} / ${c.after}`}>
                <button type="button" aria-pressed={!ok} onClick={() => pickState('before')}>{c.before}</button>
                <button type="button" aria-pressed={ok} onClick={() => pickState('after')}>{c.after}</button>
              </div>
              <ul className="checks">
                {c.checks.map(([name, bad, good]) => (
                  <li key={name}>
                    <i className="dot" aria-hidden="true">{ok ? '✓' : '✕'}</i>
                    <div><b>{name}</b><span className="v">{ok ? good : bad}</span></div>
                  </li>
                ))}
              </ul>
              <div className="score">
                <span>{c.score}</span>
                <strong>{ok ? '5/5' : '1/5'}</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="block" id="progetti">
          <div className="wrap">
            <div className="sec-head">
              <h2>{c.workH}</h2>
              <p>{c.workP}</p>
            </div>
            <div className="work">
              <article className="case">
                <div className="visual v-dash" aria-hidden="true">
                  <div className="dash">
                    <div className="dash-top">{flow.dashTitle}<span>{flow.live}</span></div>
                    {flow.calls.map(([label, tone, len]) => (
                      <div className="call" key={label}>
                        <i style={{ background: tone === 'ok' ? 'var(--ok)' : 'var(--mark)' }} />
                        <b>{label}</b>
                        <em>{len}</em>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-meta"><span>Next.js</span><span>Supabase</span><span>Stripe</span></div>
                  <h3>{flow.title}</h3>
                  <p>{flow.desc}</p>
                  <ul>{flow.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <Link className="case-link" href="/login">{flow.link}</Link>
                </div>
              </article>

              <article className="case">
                <div className="visual v-gold" aria-hidden="true">
                  <div className="gold">
                    <em>Golden Touch</em>
                    <p>{c.cases.gold.sub}</p>
                    <span>{c.cases.gold.btn}</span>
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-meta"><span>Demo</span><span>SEO</span><span>Schema.org</span></div>
                  <h3>Golden Touch</h3>
                  <p>{c.cases.gold.desc}</p>
                  <ul>{c.cases.gold.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <a className="case-link" href="https://goldentouchbojano.vercel.app" target="_blank" rel="noopener noreferrer">{c.cases.gold.link}</a>
                </div>
              </article>

              <article className="case">
                <div className="visual v-doc" aria-hidden="true">
                  <div className="doc">
                    <div className="row"><i style={{ background: 'var(--bad)' }} /><b>{c.cases.bridge.rows[0]}</b></div>
                    <div className="ln" style={{ width: '92%' }} /><div className="ln" style={{ width: '70%' }} />
                    <div className="row"><i style={{ background: 'var(--mark)' }} />{c.cases.bridge.rows[1]}</div>
                    <div className="row"><i style={{ background: 'var(--ok)' }} />{c.cases.bridge.rows[2]}</div>
                  </div>
                </div>
                <div className="case-body">
                  <div className="case-meta"><span>Next.js</span><span>GPT-4o</span><span>Stripe</span></div>
                  <h3>Bridge AI</h3>
                  <p>{c.cases.bridge.desc}</p>
                  <ul>{c.cases.bridge.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <a className="case-link" href="https://getbridgeai.app" target="_blank" rel="noopener noreferrer">{c.cases.bridge.link}</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="block" id="servizi">
          <div className="wrap">
            <div className="sec-head">
              <h2>{c.servH}</h2>
              <p>{c.servP}</p>
            </div>
            <div className="offers">
              {c.offers.map((o) => (
                <article key={o.kicker} className={`offer${o.feature ? ' feature' : ''}`}>
                  <p className="kicker">{o.kicker}</p>
                  <h3>{o.title}</h3>
                  <p className="for">{o.for}</p>
                  <ul>
                    {o.items.map(([strong, rest]) => (
                      <li key={strong}><span><strong>{strong}</strong>{rest}</span></li>
                    ))}
                  </ul>
                  <p className="note">{o.note}</p>
                  <div className="actions">
                    <a className="btn primary" href={wa(c.msgs[o.msg])} target="_blank" rel="noopener noreferrer">{o.cta}</a>
                  </div>
                </article>
              ))}
            </div>
            <p className="agency">
              {c.agency}{' '}
              <a href={wa(c.msgs.agency)} target="_blank" rel="noopener noreferrer">{c.agencyLink}</a>
            </p>
          </div>
        </section>

        <section className="block" id="metodo">
          <div className="wrap">
            <div className="sec-head">
              <h2>{c.stepsH}</h2>
              <p>{c.stepsP}</p>
            </div>
            <ol className="steps">
              {c.steps.map(([h, p]) => <li key={h}><h3>{h}</h3><p>{p}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="block" id="chi-sono">
          <div className="wrap about">
            <div className="portrait" role="img" aria-label="Harrison Gboru">
              <span>{c.portraitTop}</span>
              <b>HG</b>
              <span>{c.portraitBottom}</span>
            </div>
            <div>
              <h2>{c.aboutH}</h2>
              <div className="text">{c.about.map((p) => <p key={p.slice(0, 20)}>{p}</p>)}</div>
              <dl className="facts">
                {c.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
              </dl>
            </div>
          </div>
        </section>

        {calendlyUrl && (
          <section className="block" id="prenota">
            <div className="wrap">
              <div className="sec-head"><h2>{c.calH}</h2></div>
              <div className="cal">
                <iframe src={calendlyUrl} width="100%" height="640" frameBorder="0" title={c.calH} loading="lazy" />
              </div>
            </div>
          </section>
        )}

        <section className="contact" id="contatti">
          <div className="wrap">
            <h2>{c.contactH}</h2>
            <p className="lede">{c.contactP}</p>
            <div className="ctas">
              <a className="btn primary" href={wa(c.msgs.audit)} target="_blank" rel="noopener noreferrer"><WaIcon />{c.contactWa}</a>
              <button type="button" className="btn ghost" onClick={() => setModal(true)}>{c.contactForm}</button>
            </div>
            <div className="lines">
              <CopyLine label={c.phoneLabel} value={PHONE} c={c} />
              <CopyLine label="Email" value={EMAIL} c={c} />
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap">
          <span>{c.rights}</span>
          <nav aria-label="Footer">
            <Link href="/login">{c.clients}</Link>
            <Link href="/privacy">{c.privacy}</Link>
            <Link href="/terms">{c.terms}</Link>
            <a href="https://www.linkedin.com/in/harrison-gboru-52a142264" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/gboruharrison-creator" target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
        </div>
      </footer>

      {modal && (
        <div className="modal-bg" onClick={(e) => e.target === e.currentTarget && setModal(false)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            {form.succeeded ? (
              <div className="done">
                <i className="dot" aria-hidden="true">✓</i>
                <h3 id="modal-title">{c.mDoneH}</h3>
                <p>{c.mDoneP}</p>
                <button type="button" className="btn" onClick={() => setModal(false)}>{c.close}</button>
              </div>
            ) : (
              <>
                <div className="modal-head">
                  <div>
                    <h3 id="modal-title">{c.mTitle}</h3>
                    <p>{c.mSub}</p>
                  </div>
                  <button type="button" className="x" aria-label={c.close} onClick={() => setModal(false)}>×</button>
                </div>
                <form className="form" onSubmit={handleSubmit}>
                  <input type="hidden" name="lang" value={lang} />
                  <div className="two">
                    <label>{c.mName}<input name="name" required autoComplete="name" /></label>
                    <label>{c.mEmail}<input name="email" type="email" required autoComplete="email" /></label>
                  </div>
                  <label>{c.mBiz}<input name="company" required autoComplete="organization" /></label>
                  <div className="two">
                    <label>{c.mType}
                      <select name="business_type" required defaultValue="">
                        <option value="" disabled>{c.mPick}</option>
                        {c.types.map((x) => <option key={x}>{x}</option>)}
                      </select>
                    </label>
                    <label>{c.mInterest}
                      <select name="interest" required defaultValue="">
                        <option value="" disabled>{c.mPick}</option>
                        {c.interests.map((x) => <option key={x}>{x}</option>)}
                      </select>
                    </label>
                  </div>
                  <label>{c.mPain}<textarea name="message" placeholder={c.mPainPh} /></label>
                  {form.errors && form.errors.getFormErrors().length > 0 && <p className="err">{c.mErr}</p>}
                  <button type="submit" className="btn primary" disabled={form.submitting}>{c.mSend}</button>
                  <p className="fine">{c.mFine} <Link href="/privacy">Privacy Policy</Link>.</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
