'use client';

import { useState } from 'react';
import Link from 'next/link';

const content = {
  IT: {
    title: 'Termini di Servizio',
    updated: 'Ultimo aggiornamento: 29 marzo 2026',
    back: 'Torna alla home',
    sections: [
      {
        heading: '1. Descrizione del Servizio',
        body: `Flowstart AI ("il Servizio") è una piattaforma di automazione AI per PMI italiane, attualmente in fase Beta.\n\nIl Servizio è fornito "così com'è" (as is) durante la fase Beta, senza garanzie di continuità, disponibilità o idoneità a uno scopo specifico. Flowstart AI si riserva il diritto di modificare, sospendere o interrompere il Servizio in qualsiasi momento.`,
      },
      {
        heading: '2. Accesso Beta',
        body: `L'accesso alla fase Beta è limitato a un numero selezionato di partner e viene concesso su invito o previa approvazione esplicita da parte di Flowstart AI.\n\nFlowstart AI si riserva il diritto di revocare l'accesso Beta in qualsiasi momento, senza preavviso e senza obbligo di motivazione.`,
      },
      {
        heading: '3. Utilizzo Consentito',
        body: `L'utente si impegna a utilizzare il Servizio esclusivamente per scopi leciti e conformi alla normativa vigente.\n\nÈ espressamente vietato:\n• Utilizzare il Servizio per attività illegali o fraudolente\n• Tentare di accedere in modo non autorizzato ai sistemi di Flowstart AI\n• Rivendere, sublicenziare o cedere l'accesso a terzi senza autorizzazione scritta\n• Utilizzare il Servizio in modo da arrecare danno a Flowstart AI o a terzi`,
      },
      {
        heading: '4. Limitazione di Responsabilità',
        body: `Nella misura massima consentita dalla legge applicabile, Flowstart AI non sarà responsabile per danni diretti, indiretti, incidentali, consequenziali o punitivi derivanti dall'utilizzo o dall'impossibilità di utilizzo del Servizio.\n\nDurante la fase Beta, il Servizio potrebbe contenere errori o imprecisioni. L'utente accetta di utilizzarlo consapevolmente di tale limitazione.`,
      },
      {
        heading: '5. Legge Applicabile e Foro Competente',
        body: `I presenti Termini di Servizio sono regolati dalla legge italiana.\n\nPer qualsiasi controversia relativa all'interpretazione o all'esecuzione dei presenti Termini, le parti accettano la giurisdizione esclusiva del Foro di Milano.`,
      },
      {
        heading: '6. Contatti',
        body: `Per qualsiasi domanda relativa ai presenti Termini di Servizio, puoi contattarci a:\n\nhello@flowstart.it\n\nFlowstart AI — Milano, Italia`,
      },
    ],
  },
  EN: {
    title: 'Terms of Service',
    updated: 'Last updated: March 29, 2026',
    back: 'Back to home',
    sections: [
      {
        heading: '1. Service Description',
        body: `Flowstart AI ("the Service") is an AI automation platform for Italian SMEs, currently in Beta phase.\n\nThe Service is provided "as is" during the Beta phase, without warranties of continuity, availability, or fitness for a specific purpose. Flowstart AI reserves the right to modify, suspend, or discontinue the Service at any time.`,
      },
      {
        heading: '2. Beta Access',
        body: `Access to the Beta phase is limited to a select number of partners and is granted by invitation or following explicit approval by Flowstart AI.\n\nFlowstart AI reserves the right to revoke Beta access at any time, without notice and without obligation to provide reasons.`,
      },
      {
        heading: '3. Permitted Use',
        body: `The user agrees to use the Service exclusively for lawful purposes and in compliance with applicable law.\n\nThe following are expressly prohibited:\n• Using the Service for illegal or fraudulent activities\n• Attempting to gain unauthorized access to Flowstart AI systems\n• Reselling, sublicensing, or transferring access to third parties without written authorization\n• Using the Service in a manner that causes harm to Flowstart AI or third parties`,
      },
      {
        heading: '4. Limitation of Liability',
        body: `To the maximum extent permitted by applicable law, Flowstart AI will not be liable for direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use the Service.\n\nDuring the Beta phase, the Service may contain errors or inaccuracies. The user accepts to use it with awareness of this limitation.`,
      },
      {
        heading: '5. Governing Law and Jurisdiction',
        body: `These Terms of Service are governed by Italian law.\n\nFor any dispute relating to the interpretation or execution of these Terms, the parties accept the exclusive jurisdiction of the Court of Milan (Foro di Milano).`,
      },
      {
        heading: '6. Contact',
        body: `For any questions regarding these Terms of Service, you can contact us at:\n\nhello@flowstart.it\n\nFlowstart AI — Milan, Italy`,
      },
    ],
  },
};

const TermsClient = () => {
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

export default TermsClient;
