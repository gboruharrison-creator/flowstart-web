'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useForm, ValidationError } from '@formspree/react';
import PricingButton from '../components/PricingButton';

const LandingPage = () => {
  const [lang, setLang] = useState('EN');
  const [calls, setCalls] = useState(10);
  const [ticket, setTicket] = useState(150);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState({ show: false, text: '' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fieldValues, setFieldValues] = useState({ name: '', email: '', company: '', businessType: '' });
  const [touched, setTouched] = useState({ name: false, email: false, company: false, businessType: false });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [painPointLen, setPainPointLen] = useState(0);

  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ID);

  const markTouched = (field) => setTouched(prev => ({ ...prev, [field]: true }));
  const setField = (field, val) => setFieldValues(prev => ({ ...prev, [field]: val }));
  const hasError = (field) => (touched[field] || submitAttempted) && !fieldValues[field];

  const handleModalSubmit = (e) => {
    setSubmitAttempted(true);
    if (!fieldValues.name || !fieldValues.email || !fieldValues.company || !fieldValues.businessType) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  };

  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const activities = [
      lang === 'EN' ? 'Agent 01: Recovered €240 Lead' : 'Agente 01: Recuperato Lead da €240',
      lang === 'EN' ? 'New Partner joined from Milan' : 'Nuovo Partner acquisito a Milano',
      lang === 'EN' ? 'System: 24/7 Sync Active' : 'Sistema: Sincronizzazione 24/7 Attiva',
      lang === 'EN' ? 'Agent 03: Booking confirmed' : 'Agente 03: Prenotazione confermata',
    ];
    const interval = setInterval(() => {
      const randomText = activities[Math.floor(Math.random() * activities.length)];
      setToast({ show: true, text: randomText });
      setTimeout(() => setToast({ show: false, text: '' }), 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, [lang]);

  const monthlyRecovery = (calls * ticket * 22 * 0.2).toLocaleString('it-IT', {
    maximumFractionDigits: 0,
  });

  const resetApp = () => {
    setLang('EN');
    setCalls(10);
    setTicket(150);
    setIsModalOpen(false);
    setStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = {
    EN: {
      hero: 'Software Robots that Buy You Time.',
      sub: "We don't just automate. We eliminate repetitive labor.",
      cta: 'Join Beta',
      roiTitle: 'Revenue Recovery',
      roiBtn: 'Capture This Revenue',
    },
    IT: {
      hero: 'Software Robot che ti Ridanno Tempo.',
      sub: 'Non automatizziamo e basta. Eliminiamo il lavoro ripetitivo.',
      cta: 'Unisciti alla Beta',
      roiTitle: 'Recupero Fatturato',
      roiBtn: 'Recupera il Fatturato',
    },
  };

  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden selection:bg-emerald-500/30">

      {/* CUSTOM CURSOR */}
      <div
        className="hidden md:block fixed pointer-events-none z-[999] transition-transform duration-150 ease-out"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-emerald-500/30 rounded-full animate-ping"></div>
      </div>

      {/* NAVIGATION — Part 9 */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05]"
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <button onClick={resetApp} className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">F</span>
            </div>
            <span className="text-white font-semibold text-sm tracking-tight">Flowstart AI</span>
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'EN' ? 'IT' : 'EN')}
              className="text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.05]"
            >
              {lang === 'IT' ? 'EN' : 'IT'}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-all active:scale-[0.98]"
            >
              {lang === 'IT' ? 'Accesso Beta' : 'Beta Access'}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO — Part 1 */}
      <header className="pt-36 pb-24 md:pt-44 md:pb-32 px-6 text-center max-w-5xl mx-auto">

        {/* Announcement bar — 1b */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 text-xs font-medium tracking-wide">
            {lang === 'IT'
              ? '5 posti Beta disponibili — Accesso limitato'
              : '5 Beta spots available — Limited access'}
          </span>
        </div>

        {/* Headline — 1a */}
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent tracking-tight leading-[0.9]">
          {t[lang].hero}
        </h1>

        {/* Subheadline — 1a */}
        <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto font-normal leading-relaxed">
          {t[lang].sub}
        </p>

        {/* CTAs — 1c + 1d */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-all duration-200 active:scale-[0.98] shadow-[0_0_24px_rgba(16,185,129,0.25)] hover:shadow-[0_0_32px_rgba(16,185,129,0.35)]"
          >
            {t[lang].cta}
            <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
          </button>
          <button
            onClick={() => document.getElementById('calendly-section')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            {lang === 'IT' ? 'Prenota una chiamata' : 'Book a call'}
            <span className="text-slate-600">→</span>
          </button>
        </div>

        {/* Social proof — 1e */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="flex -space-x-1.5">
            {['R', 'M', 'L', 'A', 'G'].map((initial, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full bg-slate-700 border border-slate-900 flex items-center justify-center text-[9px] font-semibold text-slate-300"
              >
                {initial}
              </div>
            ))}
          </div>
          <span className="text-slate-500 text-xs">
            {lang === 'IT'
              ? 'Già adottato da studi italiani'
              : 'Already adopted by Italian studios'}
          </span>
        </div>
      </header>

      {/* LOGO SLIDER */}
      <section className="py-12 bg-slate-950/50 border-y border-slate-900 overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-20 whitespace-nowrap">
          {[
            'GEMINI', 'N8N', 'OPENAI', 'ANTHROPIC', 'PINECONE', 'MAKE.COM', 'LANGCHAIN', 'GROQ',
            'GEMINI', 'N8N', 'OPENAI', 'ANTHROPIC', 'PINECONE', 'MAKE.COM', 'LANGCHAIN', 'GROQ',
          ].map((logo, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500/20"></div>
              <span className="text-2xl font-black tracking-tighter text-slate-700 hover:text-white transition-colors cursor-default">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* AGENTIC FLOW DEMO — terminal upgrade Part 8 */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-6">
              {lang === 'EN' ? 'The Agentic Workflow' : 'Il Flusso Agentico'}
            </h2>
            <p className="text-slate-400 mb-10 leading-relaxed">
              {lang === 'EN' ? 'Autonomous business logic execution.' : 'Esecuzione autonoma della logica aziendale.'}
            </p>
            <div className="space-y-4">
              {['Capture', 'Qualify', 'Execute', 'Sync'].map((stepName, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-emerald-500 font-mono font-bold">0{i + 1}</span>
                  <span className="font-bold uppercase tracking-widest text-xs">{stepName}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Terminal window — Part 8 */}
          <div className="rounded-2xl border border-white/[0.08] overflow-hidden" style={{ background: '#060d19' }}>
            <div
              className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06]"
              style={{ background: '#080e1a' }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-amber-500/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-slate-600 text-xs font-mono ml-2">flowstart ~ agent_01</span>
            </div>
            <div className="p-5 font-mono text-sm min-h-[240px] space-y-6">
              {step >= 0 && <div className="text-blue-400 animate-pulse">[09:41] INBOUND: &quot;Book dental checkup&quot;</div>}
              {step >= 1 && <div className="text-slate-600">_AGENT_THINKING...</div>}
              {step >= 2 && <div className="text-emerald-400 font-bold italic">&quot;Checking Dr. Rossi&apos;s schedule... 🔍&quot;</div>}
              {step >= 4 && <div className="text-white border-l-2 border-emerald-500 pl-4 py-2">&quot;Tomorrow at 14:30 is free. Confirm?&quot;</div>}
              {step >= 5 && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-500 text-xs font-bold animate-bounce">
                  ✓ DATABASE SYNC SUCCESSFUL
                </div>
              )}
              <div className="w-2 h-5 bg-emerald-500 animate-pulse inline-block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR — Part 6 */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="flex flex-col items-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-emerald-500/60" />
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
              {lang === 'IT' ? 'Calcolatore ROI' : 'ROI Calculator'}
            </span>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter text-center">
            {t[lang].roiTitle}
          </h2>
        </div>

        <div className="rounded-2xl border border-white/[0.07] bg-[#0b1222] p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Slider 1 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-slate-300 text-sm font-medium">
                    {lang === 'IT' ? 'Chiamate perse / giorno' : 'Missed calls / day'}
                  </label>
                  <span className="text-white text-sm font-semibold tabular-nums bg-slate-800 px-2.5 py-1 rounded-lg border border-white/[0.08]">
                    {calls}
                  </span>
                </div>
                <input
                  type="range" min="1" max="100" value={calls}
                  onChange={(e) => setCalls(e.target.value)}
                  className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
              {/* Slider 2 */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-slate-300 text-sm font-medium">
                    {lang === 'IT' ? 'Valore medio cliente' : 'Average ticket value'}
                  </label>
                  <span className="text-white text-sm font-semibold tabular-nums bg-slate-800 px-2.5 py-1 rounded-lg border border-white/[0.08]">
                    €{ticket}
                  </span>
                </div>
                <input
                  type="range" min="50" max="2000" step="50" value={ticket}
                  onChange={(e) => setTicket(e.target.value)}
                  className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* Result display — Part 6b */}
            <div className="pt-6 border-t border-white/[0.06] md:border-t-0 md:pt-0 md:pl-8 md:border-l md:border-white/[0.06]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-sm">
                  {lang === 'IT'
                    ? 'Fatturato recuperabile / mese'
                    : 'Recoverable revenue / month'}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-slate-500 text-xs">
                    {lang === 'IT' ? 'stima live' : 'live estimate'}
                  </span>
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-emerald-400 tracking-tight mb-2">
                €{monthlyRecovery}
              </div>
              <p className="text-slate-500 text-sm mt-2 mb-6">
                {lang === 'IT'
                  ? 'basato su 22 giorni lavorativi, 20% di tasso di recupero'
                  : 'based on 22 working days, 20% recovery rate'}
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl uppercase text-sm tracking-widest hover:bg-white transition-colors"
              >
                {t[lang].roiBtn}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EFFICIENCY COMPARISON — Part 5 */}
      <section className="max-w-5xl mx-auto px-6 py-24 md:py-32">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-emerald-500/60" />
          <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
            {lang === 'IT' ? 'Efficienza' : 'Efficiency'}
          </span>
        </div>
        <h2 className="text-3xl font-black italic uppercase mb-10">
          {lang === 'EN' ? 'The Efficiency Gap' : 'Il Gap di Efficienza'}
        </h2>

        {/* Column headers — Part 5b */}
        <div className="grid grid-cols-3 items-center mb-2 pb-3 border-b border-white/[0.06]">
          <div />
          <div className="text-center">
            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">
              {lang === 'IT' ? 'Agente umano' : 'Human agent'}
            </span>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
              {lang === 'IT' ? 'Agente AI' : 'AI agent'}
            </span>
          </div>
        </div>

        {/* Metric rows — Part 5a */}
        {[
          {
            label: lang === 'EN' ? 'Availability' : 'Disponibilità',
            h: '40h/wk',
            a: '168h/wk',
          },
          {
            label: lang === 'EN' ? 'Response Time' : 'Tempo di risposta',
            h: '15-45 min',
            a: '< 2 sec',
          },
          {
            label: lang === 'EN' ? 'Scalability' : 'Scalabilità',
            h: lang === 'EN' ? 'Linear' : 'Lineare',
            a: lang === 'EN' ? 'Infinite' : 'Infinita',
          },
        ].map((s, i) => (
          <div key={i} className="grid grid-cols-3 items-center py-4 border-b border-white/[0.04] last:border-0">
            <div className="text-slate-400 text-sm font-medium">{s.label}</div>
            <div className="text-center">
              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-red-500/10 border border-red-500/15 text-red-400 text-sm font-medium">
                {s.h}
              </span>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/15 text-emerald-400 text-sm font-medium">
                {s.a}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* CASE STUDIES — Part 3 */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-slate-900">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-emerald-500/60" />
          <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
            {lang === 'IT' ? 'Risultati reali' : 'Real results'}
          </span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
              {lang === 'EN' ? 'Proven Results' : 'Risultati Provati'}
            </h2>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
              {lang === 'EN' ? 'How our agents perform in the field.' : 'Come i nostri agenti operano sul campo.'}
            </p>
          </div>
          <div className="text-emerald-500 font-black italic text-xl md:text-2xl">TOTAL: +14,200 HRS SAVED</div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              industry: lang === 'EN' ? 'Medical Clinic' : 'Clinica Medica',
              metric: '72%',
              desc: lang === 'EN' ? 'Reduction in missed appointments via Voice AI.' : 'Riduzione appuntamenti persi tramite Voice AI.',
              saved: '15h/week',
            },
            {
              industry: 'E-commerce',
              metric: '€12k',
              desc: lang === 'EN' ? 'Recovered abandoned carts through Agentic Chat.' : 'Recupero carrelli abbandonati via Chat Agentica.',
              saved: '24/7 Ops',
            },
            {
              industry: lang === 'EN' ? 'Law Firm' : 'Studio Legale',
              metric: 'Zero',
              desc: lang === 'EN' ? 'Manual data entry for 500+ documents/month.' : 'Data entry manuale per oltre 500 documenti/mese.',
              saved: '40h/month',
            },
          ].map((caseStudy, i) => (
            <div
              key={i}
              className="group relative rounded-2xl border border-white/[0.07] bg-[#0b1222] p-6 hover:border-emerald-500/20 hover:bg-[#0b1a1a] transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-white/[0.06]">
                  <span className="text-slate-400 text-xs font-medium">{caseStudy.industry}</span>
                </div>
                <div className="text-emerald-400 text-2xl font-bold tracking-tight">
                  {caseStudy.metric}
                </div>
              </div>

              <h3 className="text-white font-semibold text-base mb-2 tracking-tight">
                {caseStudy.desc}
              </h3>

              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {lang === 'EN' ? 'Impact:' : 'Impatto:'}{' '}
                <span className="text-white font-semibold">{caseStudy.saved}</span>
              </p>

              <div className="pt-4 border-t border-white/[0.05] flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-slate-500 text-xs">
                  {lang === 'IT' ? 'Caso studio verificato' : 'Verified case study'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING — Part 4 */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-slate-900">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-emerald-500/60" />
            <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
              {lang === 'IT' ? 'Prezzi' : 'Pricing'}
            </span>
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">
            {lang === 'EN' ? 'Investment Plans' : 'Piani di Investimento'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Core Robot',
              price: '89',
              planSlug: 'starter',
              priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_STARTER || 'price_starter',
              desc: lang === 'EN' ? 'Automate your first workflow' : 'Automatizza il tuo primo flusso',
              features: lang === 'EN'
                ? ['24/7 Data Entry Robot', 'Email Inbox Management', 'Zero-Error Accounting']
                : ['Robot Data Entry 24/7', 'Gestione Inbox Email', 'Contabilità Zero-Errori'],
            },
            {
              name: 'Growth Agent',
              price: '189',
              planSlug: 'professional',
              priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_PROFESSIONAL || 'price_professional',
              popular: true,
              desc: lang === 'EN' ? 'Scale with dedicated robots' : 'Scala con robot dedicati',
              features: lang === 'EN'
                ? ['3 Dedicated Software Robots', 'Lead Qualification Agent', 'ROI Tracking Dashboard']
                : ['3 Software Robot Dedicati', 'Agente Qualifica Lead', 'Dashboard Tracking ROI'],
            },
            {
              name: 'Elite Scale',
              price: '449',
              planSlug: 'enterprise',
              priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
              desc: lang === 'EN' ? 'Full agentic infrastructure' : 'Infrastruttura agentica completa',
              features: lang === 'EN'
                ? ['Custom Agentic Infrastructure', 'Voice-to-CRM Automation', '6-Month ROI Guarantee']
                : ['Infrastruttura Agentica Custom', 'Automazione Voice-to-CRM', 'Garanzia ROI 6 Mesi'],
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 flex flex-col ${
                plan.popular
                  ? 'border-emerald-500/30 bg-emerald-950/20'
                  : 'border-white/[0.07] bg-[#0b1222]'
              }`}
            >
              {plan.popular && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 w-fit">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  <span className="text-emerald-400 text-xs font-medium">
                    {lang === 'IT' ? 'Più popolare' : 'Most popular'}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <div className="text-slate-400 text-xs font-medium uppercase tracking-widest mb-3">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-white text-4xl font-bold tracking-tight">€{plan.price}</span>
                  <span className="text-slate-500 text-sm">/mese</span>
                </div>
                <p className="text-slate-500 text-sm">{plan.desc}</p>
              </div>

              <div className="space-y-2.5 flex-1 mb-6">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                      <svg className="w-2.5 h-2.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300 text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <PricingButton
                priceId={plan.priceId}
                planName={plan.planSlug}
                label={plan.planSlug === 'enterprise'
                  ? (lang === 'EN' ? 'Contact us' : 'Contattaci')
                  : (lang === 'EN' ? 'Get Started' : 'Inizia Ora')}
                className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${
                  plan.popular
                    ? 'bg-emerald-500 text-slate-950 hover:bg-white shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
              />
            </div>
          ))}
        </div>
      </section>

      {/* CALENDLY — id added for scroll target */}
      <section id="calendly-section" className="max-w-7xl mx-auto px-6 py-24 md:py-32 border-t border-slate-900">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-emerald-500/60" />
          <span className="text-emerald-400 text-xs font-medium uppercase tracking-widest">
            {lang === 'IT' ? 'Inizia oggi' : 'Get started'}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-block px-4 py-1 rounded-full border border-emerald-500/30 text-emerald-500 text-[10px] font-mono uppercase tracking-[0.3em] mb-6">
              {lang === 'EN' ? 'Direct Integration' : 'Integrazione Diretta'}
            </div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">
              {lang === 'EN' ? 'Secure Your Infrastructure.' : 'Metti in Sicurezza il tuo Business.'}
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-md">
              {lang === 'EN'
                ? 'Book a technical discovery call to identify the first 3 agents for your ecosystem.'
                : 'Prenota una chiamata tecnica per identificare i primi 3 agenti per il tuo ecosistema.'}
            </p>
            <div className="flex items-center gap-4 text-emerald-500 font-mono text-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              {lang === 'EN' ? 'Next available slot: Tomorrow' : 'Prossima disponibilità: Domani'}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            {!showCalendar ? (
              <div
                onClick={() => setShowCalendar(true)}
                className="relative aspect-square md:aspect-video lg:aspect-square rounded-[2.5rem] bg-slate-900 border border-slate-800 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-all overflow-hidden"
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">📅</div>
                <span className="px-8 py-4 bg-white text-slate-950 font-black rounded-full uppercase text-xs tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                  {lang === 'EN' ? 'View Schedule' : 'Vedi Disponibilità'}
                </span>
              </div>
            ) : (
              <div className="relative w-full bg-white rounded-[2.5rem] overflow-hidden h-[600px] shadow-2xl">
                <iframe
                  src={process.env.NEXT_PUBLIC_CALENDLY_URL}
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER — Part 7 */}
      <footer style={{ background: '#080e1a' }} className="border-t border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-white font-semibold text-sm tracking-tight">Flowstart AI</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {lang === 'IT'
                  ? 'Infrastruttura Agentica per PMI italiane.'
                  : 'Agentic Infrastructure for Italian SMEs.'}
              </p>
              <p className="text-slate-600 text-xs mt-2">hello@flowstart.it</p>
            </div>

            <div className="flex flex-wrap gap-12">
              <div>
                <div className="text-slate-600 text-xs font-medium uppercase tracking-widest mb-3">
                  {lang === 'IT' ? 'Prodotto' : 'Product'}
                </div>
                <div className="space-y-2">
                  <a href="/#pricing" className="block text-slate-400 hover:text-white text-sm transition-colors">
                    {lang === 'IT' ? 'Prezzi' : 'Pricing'}
                  </a>
                  <a href="/#calendly-section" className="block text-slate-400 hover:text-white text-sm transition-colors">
                    {lang === 'IT' ? 'Prenota chiamata' : 'Book a call'}
                  </a>
                </div>
              </div>
              <div>
                <div className="text-slate-600 text-xs font-medium uppercase tracking-widest mb-3">
                  Legal
                </div>
                <div className="space-y-2">
                  <Link href="/privacy" className="block text-slate-400 hover:text-white text-sm transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="block text-slate-400 hover:text-white text-sm transition-colors">
                    Termini di Servizio
                  </Link>
                </div>
              </div>
              <div>
                <div className="text-slate-600 text-xs font-medium uppercase tracking-widest mb-3">
                  {lang === 'EN' ? 'Connect' : 'Social'}
                </div>
                <div className="flex flex-wrap gap-2">
                  <SocialIcon type="facebook" />
                  <SocialIcon type="instagram" />
                  <SocialIcon type="tiktok" />
                  <SocialIcon type="linkedin" />
                  <SocialIcon type="twitter" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-600 text-xs">
              © 2026 Flowstart AI.
              {lang === 'IT' ? ' Tutti i diritti riservati.' : ' All rights reserved.'}
            </p>
          </div>
        </div>
      </footer>

      {/* FOMO TOAST */}
      {toast.show && (
        <div className="fixed bottom-10 left-10 z-[100]">
          <div className="bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-[10px] font-mono text-white uppercase tracking-widest">{toast.text}</span>
          </div>
        </div>
      )}

      {/* LEAD CAPTURE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/95 backdrop-blur-xl p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/20 p-8 md:p-10 rounded-[3rem] max-w-lg w-full relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)] my-auto">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[100px]"></div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors z-10"
            >
              ✕
            </button>

            {state.succeeded ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                  <svg className="w-10 h-10 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black italic uppercase mb-4">
                  {lang === 'EN' ? 'Application Received' : 'Richiesta Ricevuta'}
                </h2>
                <p className="text-slate-400 text-sm mb-8 font-mono tracking-tight leading-relaxed">
                  {lang === 'EN'
                    ? 'Handshake protocol complete. Agent_01 is reviewing your access.'
                    : 'Protocollo completato. Agent_01 sta revisionando il tuo accesso.'}
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-emerald-500 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-colors underline decoration-emerald-500/30 underline-offset-8"
                >
                  {lang === 'EN' ? '[ Return to Terminal ]' : '[ Torna al Terminale ]'}
                </button>
              </div>
            ) : (
              <div className="text-center relative z-10">
                <div className="inline-block p-4 rounded-2xl bg-emerald-500/10 text-emerald-500 mb-6 animate-pulse">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-black italic mb-2 uppercase tracking-tighter">
                  {lang === 'EN' ? 'Join the Beta' : 'Unisciti alla Beta'}
                </h2>
                <p className="text-slate-400 mb-8 text-sm leading-relaxed font-mono">
                  {lang === 'EN'
                    ? 'Limited to 5 exclusive partners. Queue status: Active.'
                    : 'Limitato a 5 partner esclusivi. Stato coda: Attiva.'}
                </p>

                <form onSubmit={handleModalSubmit} className="space-y-4 text-left" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm mb-1 block">
                        {lang === 'EN' ? 'Name' : 'Nome'}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder={lang === 'EN' ? 'Your full name' : 'Il tuo nome e cognome'}
                        className={`w-full bg-slate-800 border ${hasError('name') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500'} px-4 py-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 text-sm transition-all`}
                        onChange={(e) => setField('name', e.target.value)}
                        onBlur={() => markTouched('name')}
                      />
                      {hasError('name') && (
                        <p className="text-red-400 text-xs mt-1">{lang === 'EN' ? 'This field is required' : 'Campo obbligatorio'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-1 block">
                        {lang === 'EN' ? 'Work Email' : 'Email Aziendale'}
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder={lang === 'EN' ? 'Work Email' : 'Email Aziendale'}
                        className={`w-full bg-slate-800 border ${hasError('email') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500'} px-4 py-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 text-sm transition-all`}
                        onChange={(e) => setField('email', e.target.value)}
                        onBlur={() => markTouched('email')}
                      />
                      <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 font-mono" />
                      {hasError('email') && (
                        <p className="text-red-400 text-xs mt-1">{lang === 'EN' ? 'This field is required' : 'Campo obbligatorio'}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-300 text-sm mb-1 block">
                        {lang === 'EN' ? 'Company / Practice' : 'Studio / Azienda'}
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder={lang === 'EN' ? 'E.g. Rossi Dental Practice' : 'Es. Studio Dentistico Rossi'}
                        className={`w-full bg-slate-800 border ${hasError('company') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500'} px-4 py-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 text-sm transition-all`}
                        onChange={(e) => setField('company', e.target.value)}
                        onBlur={() => markTouched('company')}
                      />
                      {hasError('company') && (
                        <p className="text-red-400 text-xs mt-1">{lang === 'EN' ? 'This field is required' : 'Campo obbligatorio'}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-slate-300 text-sm mb-1 block">
                        {lang === 'EN' ? 'Phone (optional)' : 'Telefono (opzionale)'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+39 02 1234 5678"
                        className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-300 text-sm mb-1 block">
                      {lang === 'EN' ? 'Business type' : 'Tipo di attività'}
                    </label>
                    <select
                      name="business_type"
                      required
                      defaultValue=""
                      className={`w-full bg-slate-800 border ${hasError('businessType') ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-slate-700 focus:border-emerald-500 focus:ring-emerald-500'} px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-1 text-sm transition-all appearance-none`}
                      onChange={(e) => setField('businessType', e.target.value)}
                      onBlur={() => markTouched('businessType')}
                    >
                      <option value="" disabled>{lang === 'EN' ? 'Select...' : 'Seleziona...'}</option>
                      <option value="dental">{lang === 'EN' ? 'Dental Practice' : 'Studio Dentistico'}</option>
                      <option value="legal">{lang === 'EN' ? 'Law Firm' : 'Studio Legale'}</option>
                      <option value="hotel">{lang === 'EN' ? 'Hotel / Hospitality' : 'Hotel / Hospitality'}</option>
                      <option value="logistics">{lang === 'EN' ? 'Logistics' : 'Logistica'}</option>
                      <option value="other">{lang === 'EN' ? 'Other' : 'Altro'}</option>
                    </select>
                    {hasError('businessType') && (
                      <p className="text-red-400 text-xs mt-1">{lang === 'EN' ? 'This field is required' : 'Campo obbligatorio'}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-slate-300 text-sm mb-1 block">
                      {lang === 'EN' ? 'Main challenge (optional)' : 'Problema principale (opzionale)'}
                    </label>
                    <textarea
                      name="pain_point"
                      rows={3}
                      maxLength={300}
                      placeholder={lang === 'EN'
                        ? 'E.g. We lose clients because we miss calls after 6pm...'
                        : 'Es. Perdiamo clienti perché non rispondiamo al telefono dopo le 18:00...'}
                      className="w-full bg-slate-800 border border-slate-700 px-4 py-3 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm transition-all resize-none"
                      onChange={(e) => setPainPointLen(e.target.value.length)}
                    />
                    <p className="text-slate-500 text-xs text-right mt-1">{painPointLen} / 300</p>
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50 disabled:cursor-wait shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    {state.submitting
                      ? lang === 'EN' ? 'Syncing Node...' : 'Sincronizzazione...'
                      : lang === 'EN' ? 'Submit Application' : 'Invia Candidatura'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const SocialIcon = ({ type }) => {
  const icons = {
    facebook: { color: 'hover:bg-[#1877F2]', path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
    instagram: { color: 'hover:bg-[#E4405F]', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324z' },
    tiktok: { color: 'hover:bg-[#00F2EA]', path: 'M12.525.02c1.31 0 2.591.214 3.794.608V7.17c-1.027-.66-2.242-1.04-3.539-1.04-3.537 0-6.403 2.866-6.403 6.403s2.866 6.403 6.403 6.403c.188 0 .373-.008.556-.024V24c-.185.013-.37.02-.556.02C5.607 24 0 18.393 0 11.465S5.607-1.072 12.525-1.072v1.092zM24 6.643c-3.14 0-5.684-2.544-5.684-5.684V0h-5.692v13.56c0 1.571-1.274 2.844-2.844 2.844-1.571 0-2.844-1.274-2.844-2.844 0-1.571 1.274-2.844 2.844-2.844.382 0 .741.075 1.069.212V5.138A6.404 6.404 0 0 0 12.525 4.6c-3.537 0-6.403 2.866-6.403 6.403s2.866 6.403 6.403 6.403c3.537 0 6.403-2.866 6.403-6.403V6.643H24z' },
    linkedin: { color: 'hover:bg-[#0077B5]', path: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
    twitter: { color: 'hover:bg-[#1DA1F2]', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  };
  const urls = {
    facebook: 'https://www.facebook.com/flowstartai',
    instagram: 'https://www.instagram.com/flowstartai',
    tiktok: 'https://www.tiktok.com/@flowstartai',
    linkedin: 'https://www.linkedin.com/company/flowstartai',
    twitter: 'https://www.twitter.com/flowstartai',
  };
  return (
    <a
      href={urls[type]}
      target="_blank"
      rel="noopener noreferrer"
      className={`w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center transition-all group ${icons[type].color}`}
    >
      <svg className="w-4 h-4 fill-slate-500 group-hover:fill-white" viewBox="0 0 24 24">
        <path d={icons[type].path} />
      </svg>
    </a>
  );
};

export default LandingPage;
