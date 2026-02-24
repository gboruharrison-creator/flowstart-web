import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const App = () => {
  // --- 1. GLOBAL STATES (The Brain) ---
  const [lang, setLang] = useState('EN');
  const [calls, setCalls] = useState(10);
  const [ticket, setTicket] = useState(150);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState({ show: false, text: '' });
  const [compareView, setCompareView] = useState('agent');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');

  // Formspree Integration (Your Unique ID)
  const [state, handleSubmit] = useForm("xlgwoago");

  // --- 2. LOGIC & EFFECTS ---

  // Mouse Tracking for the Agent Pulse Cursor
  useEffect(() => {
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Terminal Animation Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < 5 ? prev + 1 : 0));
    }, 3500); 
    return () => clearInterval(timer);
  }, []);

  // FOMO Toast Notifications
  useEffect(() => {
    const activities = [
      lang === 'EN' ? "Agent 01: Recovered €240 Lead" : "Agente 01: Recuperato Lead da €240",
      lang === 'EN' ? "New Partner joined from Milan" : "Nuovo Partner acquisito a Milano",
      lang === 'EN' ? "System: 24/7 Sync Active" : "Sistema: Sincronizzazione 24/7 Attiva",
      lang === 'EN' ? "Agent 03: Booking confirmed" : "Agente 03: Prenotazione confermata"
    ];
    const interval = setInterval(() => {
      const randomText = activities[Math.floor(Math.random() * activities.length)];
      setToast({ show: true, text: randomText });
      setTimeout(() => setToast({ show: false, text: '' }), 4000);
    }, 12000);
    return () => clearInterval(interval);
  }, [lang]);

  // Calculations
  const monthlyRecovery = (calls * ticket * 22 * 0.20).toLocaleString('it-IT', {
    maximumFractionDigits: 0
  });

  const resetApp = () => {
    setLang('EN'); setCalls(10); setTicket(150); setIsModalOpen(false); setStep(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const t = {
    EN: {
      hero: "Software Robots that Buy You Time.",
      sub: "We don't just automate. We eliminate repetitive labor.",
      cta: "Join Beta",
      roiTitle: "Revenue Recovery",
      roiBtn: "Capture This Revenue"
    },
    IT: {
      hero: "Software Robot che ti Ridanno Tempo.",
      sub: "Non automatizziamo e basta. Eliminiamo il lavoro ripetitivo.",
      cta: "Unisciti alla Beta",
      roiTitle: "Recupero Fatturato",
      roiBtn: "Recupera il Fatturato"
    }
  };

  // --- 3. THE UI RENDER ---
  return (
    <div className="w-full min-h-screen bg-[#0f172a] text-white font-sans overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* Global Style Injections */}
      <style>{`
        @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { display: flex; animation: scroll 30s linear infinite; }
      `}</style>

      {/* CUSTOM CURSOR */}
      <div 
        className="hidden md:block fixed pointer-events-none z-[999] transition-transform duration-150 ease-out"
        style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_15px_#10b981]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-emerald-500/30 rounded-full animate-ping"></div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex justify-between items-center p-8 max-w-7xl mx-auto relative z-50">
        <button onClick={resetApp} className="flex items-center gap-1 group focus:outline-none">
          <span className="text-2xl font-black tracking-tighter italic group-hover:text-emerald-500 transition-colors">FLOWSTART</span>
          <span className="text-2xl font-black text-emerald-500">.it</span>
        </button>
        
        <button onClick={() => setLang(lang === 'EN' ? 'IT' : 'EN')} className="flex items-center gap-2 group px-4 py-2 border border-slate-800 rounded-full hover:border-emerald-500 transition-all">
          <span className="text-sm font-mono">{lang === 'EN' ? '🇬🇧 EN' : '🇮🇹 IT'}</span>
        </button>
      </nav>

      {/* HERO SECTION (Aggranda Style) */}
      <header className="pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent uppercase italic tracking-tighter leading-[0.9]">
          {t[lang].hero}
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-mono uppercase tracking-widest">
          {t[lang].sub}
        </p>
        <button onClick={() => setIsModalOpen(true)} className="bg-emerald-500 text-slate-950 text-lg font-black px-12 py-5 rounded-full hover:bg-white transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-105">
          {t[lang].cta}
        </button>
      </header>

      {/* LOGO SLIDER */}
      <section className="py-20 bg-slate-950/50 border-y border-slate-900 overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-20 whitespace-nowrap">
          {["GEMINI", "N8N", "OPENAI", "ANTHROPIC", "PINECONE", "MAKE.COM", "LANGCHAIN", "GROQ", "GEMINI", "N8N", "OPENAI", "ANTHROPIC", "PINECONE", "MAKE.COM", "LANGCHAIN", "GROQ"].map((logo, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500/20"></div>
              <span className="text-2xl font-black tracking-tighter text-slate-700 hover:text-white transition-colors cursor-default">{logo}</span>
            </div>
          ))}
        </div>
      </section>

      {/* AGENTIC FLOW DEMO */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-6">{lang === 'EN' ? 'The Agentic Workflow' : 'Il Flusso Agentico'}</h2>
            <p className="text-slate-400 mb-10 leading-relaxed">{lang === 'EN' ? "Autonomous business logic execution." : "Esecuzione autonoma della logica aziendale."}</p>
            
            <div className="space-y-4">
              {['Capture', 'Qualify', 'Execute', 'Sync'].map((stepName, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <span className="text-emerald-500 font-mono font-bold">0{i+1}</span>
                  <span className="font-bold uppercase tracking-widest text-xs">{stepName}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b1222] rounded-[2rem] overflow-hidden border border-slate-800 shadow-2xl">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></div>
            </div>
            <div className="p-8 font-mono text-sm min-h-[400px] space-y-6">
              {step >= 0 && <div className="text-blue-400 animate-pulse">[09:41] INBOUND: "Book dental checkup"</div>}
              {step >= 1 && <div className="text-slate-600">_AGENT_THINKING...</div>}
              {step >= 2 && <div className="text-emerald-400 font-bold italic">"Checking Dr. Rossi's schedule... 🔍"</div>}
              {step >= 4 && <div className="text-white border-l-2 border-emerald-500 pl-4 py-2">"Tomorrow at 14:30 is free. Confirm?"</div>}
              {step >= 5 && <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-500 text-xs font-bold animate-bounce">✓ DATABASE SYNC SUCCESSFUL</div>}
              <div className="w-2 h-5 bg-emerald-500 animate-pulse inline-block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR */}
      <section className="max-w-5xl mx-auto px-6 py-32 bg-slate-900/30 border border-slate-800 rounded-[3rem]">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter">{t[lang].roiTitle}</h2>
            <div>
              <p className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-[0.3em]">Missed Calls: {calls}</p>
              <input type="range" min="1" max="100" value={calls} onChange={(e) => setCalls(e.target.value)} className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <p className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-[0.3em]">Ticket Value: €{ticket}</p>
              <input type="range" min="50" max="2000" step="50" value={ticket} onChange={(e) => setTicket(e.target.value)} className="w-full accent-emerald-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer" />
            </div>
          </div>
          <div className="text-center p-12 bg-[#0f172a] rounded-[2rem] border border-emerald-500/20 shadow-2xl">
            <div className="text-[10px] text-emerald-500 font-mono uppercase tracking-[0.5em] mb-4">Monthly Potential</div>
            <div className="text-6xl md:text-7xl font-black italic text-white mb-8">€{monthlyRecovery}</div>
            <button onClick={() => setIsModalOpen(true)} className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-xl uppercase text-sm tracking-widest hover:bg-white transition-colors">{t[lang].roiBtn}</button>
          </div>
        </div>
      </section>

      {/* HUMAN VS AGENT COMPARISON */}
      <section className="max-w-5xl mx-auto px-6 py-32">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-black italic uppercase mb-4">{lang === 'EN' ? 'The Efficiency Gap' : 'Il Gap di Efficienza'}</h3>
          <div className="inline-flex p-1 bg-slate-900 border border-slate-800 rounded-full">
            <button onClick={() => setCompareView('human')} className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${compareView === 'human' ? 'bg-red-500/20 text-red-500' : 'text-slate-500'}`}>HUMAN</button>
            <button onClick={() => setCompareView('agent')} className={`px-8 py-2 rounded-full text-xs font-bold transition-all ${compareView === 'agent' ? 'bg-emerald-500 text-slate-950' : 'text-slate-500'}`}>AGENT</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { label: 'AVAILABILITY', h: '40h/wk', a: '168h/wk' },
            { label: 'RESPONSE TIME', h: '15-45 min', a: '< 2 sec' },
            { label: 'SCALABILITY', h: 'Linear', a: 'Infinite' }
          ].map((s, i) => (
            <div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-3xl relative overflow-hidden group">
              <div className={`absolute inset-0 opacity-10 transition-colors ${compareView === 'agent' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4">{s.label}</div>
              <div className={`text-2xl font-black italic ${compareView === 'agent' ? 'text-emerald-500' : 'text-red-500'}`}>{compareView === 'agent' ? s.a : s.h}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CASE STUDIES (AGGRANDA STYLE) */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-900">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">
              {lang === 'EN' ? 'Proven Results' : 'Risultati Provati'}
            </h2>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
              {lang === 'EN' ? 'How our agents perform in the field.' : 'Come i nostri agenti operano sul campo.'}
            </p>
          </div>
          <div className="text-emerald-500 font-black italic text-xl md:text-2xl">
            TOTAL: +14,200 HRS SAVED
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              industry: lang === 'EN' ? 'Medical Clinic' : 'Clinica Medica',
              metric: '72%',
              desc: lang === 'EN' ? 'Reduction in missed appointments via Voice AI.' : 'Riduzione appuntamenti persi tramite Voice AI.',
              saved: '15h/week'
            },
            {
              industry: lang === 'EN' ? 'E-commerce' : 'E-commerce',
              metric: '€12k',
              desc: lang === 'EN' ? 'Recovered abandoned carts through Agentic Chat.' : 'Recupero carrelli abbandonati via Chat Agentica.',
              saved: '24/7 Ops'
            },
            {
              industry: lang === 'EN' ? 'Law Firm' : 'Studio Legale',
              metric: 'Zero',
              desc: lang === 'EN' ? 'Manual data entry for 500+ documents/month.' : 'Data entry manuale per oltre 500 documenti/mese.',
              saved: '40h/month'
            }
          ].map((caseStudy, i) => (
            <div key={i} className="group p-10 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] hover:border-emerald-500/50 transition-all duration-500">
              <div className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em] mb-6">{caseStudy.industry}</div>
              <div className="text-5xl font-black italic mb-4 group-hover:scale-110 transition-transform origin-left">{caseStudy.metric}</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">{caseStudy.desc}</p>
              <div className="pt-6 border-t border-slate-800/50 flex justify-between items-center">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Impact:</span>
                <span className="text-xs font-black text-white">{caseStudy.saved}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING (AGGRANDA STYLE) */}
      <section className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">{lang === 'EN' ? 'Investment Plans' : 'Piani di Investimento'}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Core Robot', price: '89',
              features: lang === 'EN' 
                ? ['24/7 Data Entry Robot', 'Email Inbox Management', 'Zero-Error Accounting'] 
                : ['Robot Data Entry 24/7', 'Gestione Inbox Email', 'Contabilità Zero-Errori']
            },
            {
              name: 'Growth Agent', price: '189', popular: true,
              features: lang === 'EN' 
                ? ['3 Dedicated Software Robots', 'Lead Qualification Agent', 'ROI Tracking Dashboard'] 
                : ['3 Software Robot Dedicati', 'Agente Qualifica Lead', 'Dashboard Tracking ROI']
            },
            {
              name: 'Elite Scale', price: '449',
              features: lang === 'EN' 
                ? ['Custom Agentic Infrastructure', 'Voice-to-CRM Automation', '6-Month ROI Guarantee'] 
                : ['Infrastruttura Agentica Custom', 'Automazione Voice-to-CRM', 'Garanzia ROI 6 Mesi']
            }
          ].map((plan, i) => (
            <div key={i} className={`p-10 rounded-[2.5rem] border transition-all duration-500 ${plan.popular ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.1)] scale-105' : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'}`}>
              <h3 className="text-xl font-bold mb-4 italic uppercase tracking-widest text-emerald-500">{plan.name}</h3>
              <div className="text-4xl font-black mb-6 text-white">€{plan.price}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
              <ul className="space-y-4 mb-10 min-h-[160px]">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-slate-400">
                    <span className="text-emerald-500 text-lg">✓</span> {feat}
                  </li>
                ))}
              </ul>
              <button onClick={() => setIsModalOpen(true)} className={`w-full py-4 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${plan.popular ? 'bg-emerald-500 text-slate-950 hover:bg-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800 text-white hover:bg-slate-700'}`}>
                {lang === 'EN' ? 'Get Started' : 'Inizia Ora'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CALENDAR (Calendly Integration) */}
      <section id="book" className="max-w-7xl mx-auto px-6 py-32 border-t border-slate-900">
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
              <div className="relative w-full bg-white rounded-[2.5rem] overflow-hidden h-[600px] shadow-2xl animate-in zoom-in-95 duration-500">
                <iframe 
                  src="https://calendly.com/flowstartai/new-meeting" 
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900/50 border-t border-slate-800 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="text-2xl font-black italic mb-6">FLOWSTART<span className="text-emerald-500">.it</span></div>
            <p className="text-slate-500 text-sm max-w-sm font-mono uppercase tracking-widest leading-relaxed">
              {lang === 'EN' ? 'Next-gen Agentic Infrastructure.' : 'Infrastruttura Agentica di Nuova Generazione.'}
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 italic text-white">{lang === 'EN' ? 'Connect' : 'Social'}</h4>
            <div className="grid grid-cols-3 gap-3 w-fit">
              <SocialIcon type="facebook" />
              <SocialIcon type="instagram" />
              <SocialIcon type="tiktok" />
              <SocialIcon type="linkedin" />
              <SocialIcon type="twitter" />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 italic text-white">Contact</h4>
            <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">hello@flowstart.it</p>
          </div>
        </div>
      </footer>

      {/* OVERLAYS: Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-10 left-10 z-[100] animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-slate-900/90 border border-emerald-500/30 backdrop-blur-xl px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>
            <span className="text-[10px] font-mono text-white uppercase tracking-widest">{toast.text}</span>
          </div>
        </div>
      )}

      {/* LEAD CAPTURE MODAL (Formspree Integration) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4">
          <div className="bg-slate-900 border border-emerald-500/20 p-8 md:p-12 rounded-[3rem] max-w-md w-full relative overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500/10 blur-[100px]"></div>
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors z-10"
            >✕</button>

            {state.succeeded ? (
              <div className="text-center py-8 animate-in zoom-in duration-500">
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
                    ? `Handshake protocol complete. Agent_01 is reviewing your access.` 
                    : `Protocollo completato. Agent_01 sta revisionando il tuo accesso.`}
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
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input 
                    id="email"
                    type="email" 
                    name="email" 
                    required 
                    placeholder={lang === 'EN' ? "Work Email" : "Email Aziendale"} 
                    className="w-full bg-slate-950 border border-slate-800 p-4 rounded-2xl text-white outline-none focus:border-emerald-500 transition-all font-mono text-sm" 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1 font-mono" />
                  
                  <button 
                    type="submit" 
                    disabled={state.submitting}
                    className="w-full py-4 bg-emerald-500 text-slate-950 font-black rounded-2xl uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-50 disabled:cursor-wait shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                  >
                    {state.submitting 
                      ? (lang === 'EN' ? 'Syncing Node...' : 'Sincronizzazione...') 
                      : (lang === 'EN' ? 'Request Access' : 'Richiedi Accesso')}
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

// Helper Social Component
const SocialIcon = ({ type }) => {
  const icons = {
    facebook: { color: 'hover:bg-[#1877F2]', path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    instagram: { color: 'hover:bg-[#E4405F]', path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324z" },
    tiktok: { color: 'hover:bg-[#00F2EA]', path: "M12.525.02c1.31 0 2.591.214 3.794.608V7.17c-1.027-.66-2.242-1.04-3.539-1.04-3.537 0-6.403 2.866-6.403 6.403s2.866 6.403 6.403 6.403c.188 0 .373-.008.556-.024V24c-.185.013-.37.02-.556.02C5.607 24 0 18.393 0 11.465S5.607-1.072 12.525-1.072v1.092zM24 6.643c-3.14 0-5.684-2.544-5.684-5.684V0h-5.692v13.56c0 1.571-1.274 2.844-2.844 2.844-1.571 0-2.844-1.274-2.844-2.844 0-1.571 1.274-2.844 2.844-2.844.382 0 .741.075 1.069.212V5.138A6.404 6.404 0 0 0 12.525 4.6c-3.537 0-6.403 2.866-6.403 6.403s2.866 6.403 6.403 6.403c3.537 0 6.403-2.866 6.403-6.403V6.643H24z" },
    linkedin: { color: 'hover:bg-[#0077B5]', path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
    twitter: { color: 'hover:bg-[#1DA1F2]', path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" }
  };
  return (
    <a href="#" className={`w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center transition-all group ${icons[type].color}`}>
      <svg className="w-4 h-4 fill-slate-500 group-hover:fill-white" viewBox="0 0 24 24"><path d={icons[type].path}/></svg>
    </a>
  );
};

export default App;