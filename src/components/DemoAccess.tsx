import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { Sparkles, X, Shield, Lock, Mail } from 'lucide-react';

export default function DemoAccess() {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  const { navigate } = useRouter();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-500/50 ${open ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100'}`}
        aria-label={t.demoAccess.buttonLabel}
      >
        <Sparkles className="w-5 h-5" />
      </button>

      {open && (
        <div className="fixed bottom-6 left-6 rtl:left-auto rtl:right-6 z-50 w-80 max-w-[90vw] rounded-2xl glass shadow-2xl shadow-black/40 border border-primary-500/20 overflow-hidden animate-[fadeIn_0.3s_ease-out]">
          <div className="p-4 bg-gradient-to-br from-blue-500/15 to-violet-500/10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-bold text-white">{t.demoAccess.title}</span>
            </div>
            <button onClick={() => setOpen(false)} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3">
            <p className="text-xs text-gray-400 leading-relaxed">{t.demoAccess.description}</p>

            <div className="rounded-xl bg-corp-900/60 border border-white/5 p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1.5"><Mail className="w-3 h-3" />{t.demoAccess.email}</span>
                <span className="text-white font-mono">demo@civicavita.se</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400 flex items-center gap-1.5"><Lock className="w-3 h-3" />{t.demoAccess.password}</span>
                <span className="text-primary-400 font-mono font-bold">civicavita2026</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setOpen(false); navigate({ name: 'admin' }); }}
                className="py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow hover:shadow-primary-500/30 transition-all"
              >
                {t.demoAccess.openAdmin}
              </button>
              <button
                onClick={() => { navigator.clipboard?.writeText('demo@civicavita.se / civicavita2026'); setOpen(false); }}
                className="py-2 text-xs font-semibold rounded-lg glass-light text-gray-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {t.demoAccess.copyCreds}
              </button>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed">{t.demoAccess.note}</p>
          </div>
        </div>
      )}
    </>
  );
}
