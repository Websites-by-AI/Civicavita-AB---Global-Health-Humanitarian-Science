import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { X, Lock, UserPlus, User, Sparkles, Mail } from 'lucide-react';

interface Props {
  open: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register';
}

export default function AuthModal({ open, onClose, initialMode = 'login' }: Props) {
  const { login, register, loginAsDemo } = useAuth();
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError('');
      setSuccess('');
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setBusy(true);
    const res = await login(email, password);
    setBusy(false);
    if (!res.ok) {
      setError(res.error === 'INVALID' ? t.admin.wrongPassword : t.admin.registerError);
      return;
    }
    onClose();
    navigate({ name: 'admin' });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setBusy(true);
    const res = await register(name, email, password);
    setBusy(false);
    if (!res.ok) {
      if (res.error === 'EMAIL_TAKEN') setError(t.admin.registerEmailTaken);
      else setError(t.admin.registerError);
      return;
    }
    setSuccess(t.admin.registerSuccess);
    setTimeout(() => { onClose(); navigate({ name: 'admin' }); }, 800);
  };

  const handleDemo = async () => {
    setBusy(true);
    await loginAsDemo();
    setBusy(false);
    onClose();
    navigate({ name: 'admin' });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-3xl glass overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]">
        {/* Close */}
        <button onClick={onClose} className="absolute top-4 end-4 p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 z-10">
          <X className="w-5 h-5" />
        </button>

        {/* Demo banner */}
        <div className="p-4 bg-gradient-to-br from-primary-500/15 to-blue-500/10 border-b border-primary-500/20">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary-400" />
            <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">{t.admin.demoTitle}</span>
          </div>
          <p className="text-xs text-gray-300 mb-2">{t.admin.demoDescription}</p>
          <div className="flex items-center justify-between text-xs font-mono bg-corp-900/60 rounded-lg px-3 py-2 mb-2">
            <span className="text-gray-400"><Mail className="w-3 h-3 inline" /> {t.admin.demoEmailLabel}:</span>
            <span className="text-white">demo@civicavita.se</span>
          </div>
          <div className="flex items-center justify-between text-xs font-mono bg-corp-900/60 rounded-lg px-3 py-2 mb-3">
            <span className="text-gray-400"><Lock className="w-3 h-3 inline" /> {t.admin.demoPasswordLabel}:</span>
            <span className="text-primary-400 font-bold">civicavita2026</span>
          </div>
          <button onClick={handleDemo} disabled={busy} className="w-full py-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 text-xs font-semibold border border-primary-500/30 disabled:opacity-50">
            {t.admin.useDemo}
          </button>
        </div>

        {/* Mode tabs */}
        <div className="flex gap-2 p-4 pb-0">
          <button onClick={() => { setMode('login'); setError(''); setSuccess(''); }} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'login' ? 'bg-primary-500 text-white shadow' : 'glass-light text-gray-400 hover:text-white'}`}>
            {t.admin.login}
          </button>
          <button onClick={() => { setMode('register'); setError(''); setSuccess(''); }} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${mode === 'register' ? 'bg-primary-500 text-white shadow' : 'glass-light text-gray-400 hover:text-white'}`}>
            <UserPlus className="w-4 h-4" />{t.admin.register}
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 mx-auto">
                <Lock className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.admin.emailLabel}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.admin.emailPlaceholder} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.admin.passwordLabel}</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.admin.passwordPlaceholder} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              <button type="submit" disabled={busy} className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow disabled:opacity-50">
                {busy ? '…' : t.admin.login}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500/20 to-blue-500/20 border border-primary-500/20 mx-auto">
                <User className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.admin.fieldName}</label>
                <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder={t.admin.fieldNamePlaceholder} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50" autoFocus />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.admin.emailLabel}</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.admin.emailPlaceholder} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1.5">{t.admin.passwordLabel}</label>
                <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t.admin.passwordMinLength} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50" />
              </div>
              {error && <p className="text-xs text-red-400">{error}</p>}
              {success && <p className="text-xs text-primary-400">{success}</p>}
              <button type="submit" disabled={busy} className="w-full py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-lg shadow disabled:opacity-50">
                {busy ? '…' : t.admin.register}
              </button>
            </form>
          )}
          <p className="text-[10px] text-gray-500 text-center mt-4 leading-relaxed">
            {t.authModal.storageNote}
          </p>
        </div>
      </div>
    </div>
  );
}
