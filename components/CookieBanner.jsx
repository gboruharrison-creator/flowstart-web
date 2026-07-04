'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'flowstart_cookie_consent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(CONSENT_KEY)) {
      setVisible(true); // eslint-disable-line react-hooks/set-state-in-effect
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[200] bg-slate-900 border-t border-emerald-500/30 px-6 py-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-slate-400 text-sm font-mono leading-relaxed">
          Utilizziamo cookie tecnici necessari al funzionamento del sito. Nessun cookie di profilazione.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2 border border-slate-700 rounded-full text-xs font-bold text-slate-400 hover:border-slate-500 hover:text-white transition-all uppercase tracking-widest"
          >
            Rifiuta
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-emerald-500 text-slate-950 rounded-full text-xs font-bold hover:bg-white transition-all uppercase tracking-widest"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
