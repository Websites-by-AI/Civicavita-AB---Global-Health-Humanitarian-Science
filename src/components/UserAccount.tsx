import { User as UserIcon, ShieldCheck, Settings as SettingsIcon, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useRouter } from '../context/RouterContext';

/**
 * Current account view is intentionally read-only until the Member role and
 * server-side profile APIs are added. It avoids storing passwords/profile data
 * in browser IndexedDB.
 */
export default function UserAccount() {
  const { user, isAuthed } = useAuth();
  const { t, lang, setLang } = useLanguage();
  const { navigate } = useRouter();
  if (!isAuthed || !user) return <div className="relative min-h-screen pt-32 pb-20"><div className="absolute inset-0 bg-corp-900"/><div className="relative z-10 max-w-md mx-auto px-4 text-center"><UserIcon className="w-16 h-16 text-gray-600 mx-auto mb-4"/><h2 className="text-2xl font-bold text-white mb-2">{t.account.title}</h2><p className="text-gray-400 mb-6">{t.account.notLoggedIn}</p><button onClick={() => navigate({name:'admin'})} className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl inline-flex items-center gap-2"><LogIn className="w-4 h-4"/>{t.account.signIn}</button></div></div>;
  return <div className="relative min-h-screen pt-28 pb-20"><div className="absolute inset-0 bg-corp-900"/><div className="relative z-10 max-w-3xl mx-auto px-4"><h1 className="text-3xl font-bold text-white flex gap-3 items-center"><UserIcon className="w-8 h-8 text-primary-400"/>{t.account.title}</h1><div className="mt-8 rounded-2xl glass p-7"><div className="flex gap-4 items-center"><div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-2xl font-bold text-white">{user.name[0]?.toUpperCase()}</div><div><p className="text-xl font-bold text-white">{user.name}</p><p className="text-gray-400">{user.email}</p><p className="text-xs text-primary-300 mt-1 flex gap-1 items-center"><ShieldCheck className="w-3 h-3"/>{user.role}</p></div></div></div><div className="mt-5 rounded-2xl glass p-7"><h2 className="font-bold text-white flex gap-2 items-center"><SettingsIcon className="w-5 h-5 text-primary-400"/>{t.account.preferencesTitle}</h2><div className="mt-5 flex items-center justify-between"><span className="text-gray-300">{t.account.prefLanguage}</span><select value={lang} onChange={(e)=>setLang(e.target.value as typeof lang)} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white"><option value="en">English</option><option value="fa">فارسی</option><option value="sv">Svenska</option><option value="fr">Français</option><option value="ar">العربية</option></select></div><p className="text-sm text-gray-500 mt-6">Member profiles, saved articles and reading history will be added through secure server-side APIs.</p></div></div></div>;
}
