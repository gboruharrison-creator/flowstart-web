'use client';

import { useState } from 'react';
import Link from 'next/link';

const content = {
  IT: {
    title: 'Informativa sulla Privacy',
    updated: 'Ultimo aggiornamento: 29 marzo 2026',
    back: 'Torna alla home',
    sections: [
      {
        heading: '1. Titolare del Trattamento',
        body: `Flowstart AI è il titolare del trattamento dei dati personali raccolti tramite questo sito web. Per qualsiasi richiesta relativa al trattamento dei tuoi dati personali, puoi contattarci all'indirizzo: hello@flowstart.it\n\nQuesto sito raccoglie dati personali esclusivamente tramite il modulo di contatto per la richiesta di accesso Beta.`,
      },
      {
        heading: '2. Dati Raccolti',
        body: `Raccogliamo esclusivamente l'indirizzo email fornito volontariamente dall'utente tramite il modulo di iscrizione alla Beta.\n\nNon vengono utilizzati cookie di profilazione. Non vengono raccolti automaticamente dati personali, ad eccezione dei log tecnici del server (indirizzo IP, timestamp delle richieste) necessari al corretto funzionamento del servizio, trattati sulla base del legittimo interesse del titolare.`,
      },
      {
        heading: '3. Base Giuridica',
        body: `Il trattamento dei dati personali si basa sul consenso dell'utente, ai sensi dell'Art. 6.1.a del Regolamento (UE) 2016/679 (GDPR).\n\nL'utente ha il diritto di revocare il proprio consenso in qualsiasi momento, senza che ciò pregiudichi la liceità del trattamento effettuato prima della revoca. Per revocare il consenso, è sufficiente scrivere a hello@flowstart.it.`,
      },
      {
        heading: '4. Responsabili del Trattamento (Data Processors)',
        body: `I dati raccolti possono essere trasferiti ai seguenti responsabili del trattamento:\n\n• Formspree Inc. (USA) — gestione dei moduli di contatto e raccolta email. Il trasferimento di dati verso gli Stati Uniti è coperto da Standard Contractual Clauses (SCC) approvate dalla Commissione Europea. Informativa privacy: formspree.io/legal/privacy-policy\n\n• Calendly LLC (USA) — gestione della prenotazione delle chiamate di consulenza. Il trasferimento di dati verso gli Stati Uniti è coperto da Standard Contractual Clauses (SCC). Informativa privacy: calendly.com/privacy`,
      },
      {
        heading: '5. Conservazione dei Dati',
        body: `I dati personali raccolti tramite il modulo Beta vengono conservati per il tempo strettamente necessario alla gestione della richiesta di accesso, e comunque non oltre 12 mesi dalla raccolta.\n\nAl termine del periodo di conservazione, i dati saranno cancellati o anonimizzati.`,
      },
      {
        heading: "6. Diritti dell'Interessato",
        body: `Ai sensi degli Articoli 15-22 del GDPR, hai il diritto di:\n\n• Accesso: ottenere conferma dell'esistenza di dati che ti riguardano e ottenerne copia.\n• Rettifica: richiedere la correzione di dati inesatti.\n• Cancellazione ("diritto all'oblio"): richiedere la cancellazione dei tuoi dati personali.\n• Limitazione: richiedere la limitazione del trattamento.\n• Portabilità: ricevere i tuoi dati in formato strutturato e leggibile da dispositivo automatico.\n• Opposizione: opporti al trattamento dei tuoi dati.\n\nPer esercitare uno qualsiasi di questi diritti, scrivici a: hello@flowstart.it`,
      },
      {
        heading: '7. Reclami',
        body: `Hai il diritto di proporre reclamo al Garante per la Protezione dei Dati Personali se ritieni che il trattamento dei tuoi dati violi il GDPR.\n\nGarante Privacy: www.garanteprivacy.it\nIndirizzo: Piazza Venezia 11 — 00187 Roma\nEmail: garante@gpdp.it`,
      },
    ],
  },
  EN: {
    title: 'Privacy Policy',
    updated: 'Last updated: March 29, 2026',
    back: 'Back to home',
    sections: [
      {
        heading: '1. Data Controller',
        body: `Flowstart AI is the data controller for personal data collected through this website. For any requests related to the processing of your personal data, you can contact us at: hello@flowstart.it\n\nThis website collects personal data exclusively through the contact form for Beta access requests.`,
      },
      {
        heading: '2. Data Collected',
        body: `We collect exclusively the email address voluntarily provided by the user through the Beta signup form.\n\nNo profiling cookies are used. No personal data is collected automatically, except for server technical logs (IP address, request timestamps) necessary for the correct functioning of the service, processed on the basis of the controller's legitimate interest.`,
      },
      {
        heading: '3. Legal Basis',
        body: `The processing of personal data is based on the user's consent, pursuant to Art. 6.1.a of Regulation (EU) 2016/679 (GDPR).\n\nThe user has the right to withdraw consent at any time, without affecting the lawfulness of processing carried out before withdrawal. To withdraw consent, simply write to hello@flowstart.it.`,
      },
      {
        heading: '4. Data Processors',
        body: `Collected data may be transferred to the following data processors:\n\n• Formspree Inc. (USA) — contact form management and email collection. Data transfers to the United States are covered by Standard Contractual Clauses (SCC) approved by the European Commission. Privacy policy: formspree.io/legal/privacy-policy\n\n• Calendly LLC (USA) — management of consultation call bookings. Data transfers to the United States are covered by Standard Contractual Clauses (SCC). Privacy policy: calendly.com/privacy`,
      },
      {
        heading: '5. Data Retention',
        body: `Personal data collected through the Beta form is retained for the time strictly necessary to manage the access request, and in any case no longer than 12 months from collection.\n\nAt the end of the retention period, data will be deleted or anonymized.`,
      },
      {
        heading: '6. Data Subject Rights',
        body: `Under Articles 15-22 of the GDPR, you have the right to:\n\n• Access: obtain confirmation of the existence of data relating to you and obtain a copy.\n• Rectification: request correction of inaccurate data.\n• Erasure ("right to be forgotten"): request deletion of your personal data.\n• Restriction: request restriction of processing.\n• Portability: receive your data in a structured, machine-readable format.\n• Objection: object to the processing of your data.\n\nTo exercise any of these rights, write to us at: hello@flowstart.it`,
      },
      {
        heading: '7. Complaints',
        body: `You have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la Protezione dei Dati Personali) if you believe that the processing of your data violates the GDPR.\n\nGarante Privacy: www.garanteprivacy.it\nAddress: Piazza Venezia 11 — 00187 Roma, Italy\nEmail: garante@gpdp.it`,
      },
    ],
  },
};

const PrivacyPolicyClient = () => {
  const [lang, setLang] = useState('IT');
  const c = content[lang];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors text-sm font-mono group">
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            {c.back}
          </Link>
          <button
            onClick={() => setLang(lang === 'IT' ? 'EN' : 'IT')}
            className="flex items-center gap-2 px-4 py-2 border border-slate-800 rounded-full hover:border-emerald-500 transition-all text-sm font-mono"
          >
            {lang === 'IT' ? '🇮🇹 IT' : '🇬🇧 EN'}
          </button>
        </div>

        {/* Header */}
        <div className="mb-12 pb-8 border-b border-slate-800">
          <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/30 text-emerald-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">
            FLOWSTART.it
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter mb-4">{c.title}</h1>
          <p className="text-slate-500 text-sm font-mono">{c.updated}</p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {c.sections.map((section, i) => (
            <div key={i} className="p-8 bg-slate-900/40 border border-slate-800 rounded-2xl">
              <h2 className="text-sm font-bold text-emerald-400 mb-4 uppercase tracking-widest">{section.heading}</h2>
              <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{section.body}</p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="text-slate-600 text-xs font-mono">© 2026 Flowstart AI · hello@flowstart.it</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyClient;
