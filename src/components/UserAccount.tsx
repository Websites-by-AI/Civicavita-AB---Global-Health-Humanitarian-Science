import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyT = any;
import { useRouter } from '../context/RouterContext';
import { UsersDB } from '../db/users';
import { CommentsDB, type Comment } from '../db/comments';
import { formatDate } from '../data/posts';
import { usePosts } from '../context/PostsContext';
import { User as UserIcon, Save, Lock, MessageSquare, Trash2, LogIn, Settings as SettingsIcon, Crown } from 'lucide-react';

export default function UserAccount() {
  const { user, isAuthed, logout, isDemo } = useAuth();
  const { t: _t, lang, setLang } = useLanguage();
  const t = _t as AnyT;
  const { navigate } = useRouter();
  const { posts } = usePosts();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [myComments, setMyComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      CommentsDB.all().then(all => setMyComments(all.filter(c => c.authorEmail.toLowerCase() === user.email.toLowerCase())));
    }
  }, [user]);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const saveProfile = async () => {
    if (!user || isDemo) return showToast(t.account.demoWarning);
    if (!name.trim() || !email.trim()) return setError('Invalid');
    // Check email conflict
    const existing = await UsersDB.findByEmail(email);
    if (existing && existing.id !== user.id) return setError('Email taken');
    // Update via direct indexedDB put
    const raw = await new Promise<IDBDatabase>((res, rej) => {
      const req = indexedDB.open('civicavita_db', 2);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    await new Promise<void>((res, rej) => {
      const tx = raw.transaction('users', 'readwrite');
      const rq = tx.objectStore('users').put({ ...user, name: name.trim(), email: email.trim() });
      rq.onsuccess = () => res();
      rq.onerror = () => rej(rq.error);
    });
    setError('');
    showToast(t.account.toastProfileSaved);
  };

  const changePassword = async () => {
    if (!user || isDemo) return showToast(t.account.demoWarning);
    setError('');
    if (currentPwd !== user.password) return setError(t.account.wrongCurrent);
    if (newPwd.length < 6) return setError(t.account.passwordMismatch);
    if (newPwd !== confirmPwd) return setError(t.account.passwordMismatch);
    const raw = await new Promise<IDBDatabase>((res, rej) => {
      const req = indexedDB.open('civicavita_db', 2);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    await new Promise<void>((res, rej) => {
      const tx = raw.transaction('users', 'readwrite');
      const rq = tx.objectStore('users').put({ ...user, password: newPwd });
      rq.onsuccess = () => res();
      rq.onerror = () => rej(rq.error);
    });
    setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
    showToast(t.account.toastPasswordChanged);
  };

  const deleteComment = async (c: Comment) => {
    if (!confirm(t.admin.confirmDeleteComment)) return;
    await CommentsDB.delete(c.id);
    setMyComments(myComments.filter(x => x.id !== c.id));
  };

  const deleteAccount = async () => {
    if (!user || isDemo) return showToast(t.account.demoWarning);
    if (!confirm(t.account.confirmDeleteAccount)) return;
    // delete user's comments
    for (const c of myComments) await CommentsDB.delete(c.id);
    await UsersDB.delete(user.id);
    logout();
    showToast(t.account.toastAccountDeleted);
    navigate({ name: 'home' });
  };

  if (!isAuthed || !user) {
    return (
      <div className="relative min-h-screen pt-32 pb-20">
        <div className="absolute inset-0 bg-corp-900" />
        <div className="relative z-10 max-w-md mx-auto px-4 text-center">
          <UserIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">{t.account.title}</h2>
          <p className="text-gray-400 mb-6">{t.account.notLoggedIn}</p>
          <button onClick={() => navigate({ name: 'admin' })} className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg inline-flex items-center gap-2">
            <LogIn className="w-4 h-4" />{t.account.signIn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 bg-corp-900" />
      {toast && (
        <div className="fixed top-24 right-6 rtl:right-auto rtl:left-6 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-xl flex items-center gap-2">
          <Save className="w-4 h-4" />{toast}
        </div>
      )}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3"><UserIcon className="w-8 h-8 text-primary-400" />{t.account.title}</h1>
          <p className="text-gray-400 mt-2">{t.account.subtitle}</p>
        </div>

        {isDemo && (
          <div className="mb-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm flex items-start gap-2">
            <Crown className="w-4 h-4 mt-0.5 flex-shrink-0" />{t.account.demoWarning}
          </div>
        )}

        {/* Profile card */}
        <div className="rounded-2xl glass p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><UserIcon className="w-5 h-5 text-primary-400" />{t.account.profileTitle}</h3>
          <div className="flex items-center gap-4 mb-5">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold ${isDemo ? 'bg-gradient-to-br from-blue-500 to-violet-600' : 'bg-gradient-to-br from-primary-500 to-primary-600'}`}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-white">{name}</p>
              <p className="text-xs text-gray-400">{t.account.memberSince}: {formatDate(user.createdAt)}</p>
              <p className="text-xs text-primary-400 flex items-center gap-1 mt-0.5">
                {user.role === 'admin' && <Crown className="w-3 h-3" />}{t.account.role}: {user.role}
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.account.fieldName}</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={isDemo} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.account.fieldEmail}</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isDemo} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50" /></div>
          </div>
          {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
          <button onClick={saveProfile} disabled={isDemo} className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 inline-flex items-center gap-2"><Save className="w-4 h-4" />{t.account.saveProfile}</button>
        </div>

        {/* Password card */}
        <div className="rounded-2xl glass p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Lock className="w-5 h-5 text-primary-400" />{t.account.passwordTitle}</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.account.currentPassword}</label><input type="password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} disabled={isDemo} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.account.newPassword}</label><input type="password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} disabled={isDemo} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50" /></div>
            <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.account.confirmPassword}</label><input type="password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} disabled={isDemo} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 disabled:opacity-50" /></div>
          </div>
          {error && <p className="text-sm text-red-400 mb-3">{error}</p>}
          <button onClick={changePassword} disabled={isDemo} className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50 inline-flex items-center gap-2"><Lock className="w-4 h-4" />{t.account.changePassword}</button>
        </div>

        {/* Preferences card */}
        <div className="rounded-2xl glass p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><SettingsIcon className="w-5 h-5 text-primary-400" />{t.account.preferencesTitle}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-300">{t.account.prefLanguage}</span>
              <select value={lang} onChange={(e) => setLang(e.target.value as any)} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50">
                <option value="en" className="bg-corp-800">English</option>
                <option value="fr" className="bg-corp-800">Français</option>
                <option value="sv" className="bg-corp-800">Svenska</option>
                <option value="ar" className="bg-corp-800">العربية</option>
                <option value="fa" className="bg-corp-800">فارسی</option>
              </select>
            </div>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-gray-300">{t.account.prefNotifications}</span><input type="checkbox" defaultChecked className="w-5 h-5 accent-primary-500" /></label>
            <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-gray-300">{t.account.prefTheme}</span><input type="checkbox" defaultChecked disabled className="w-5 h-5 accent-primary-500" /></label>
          </div>
        </div>

        {/* My comments */}
        <div className="rounded-2xl glass p-6 mb-6">
          <h3 className="font-bold text-white mb-4 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-primary-400" />{t.account.myCommentsTitle} ({myComments.length})</h3>
          {myComments.length === 0 ? <p className="text-sm text-gray-500">{t.account.noComments}</p> : (
            <div className="space-y-3">
              {myComments.map(c => {
                const post = posts.find(p => p.id === c.postId);
                return (
                  <div key={c.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-300 mb-1">{c.content}</p>
                      <p className="text-xs text-gray-500">{formatDate(c.createdAt)} → {post?.title || t.comments.deletedPost}{!c.approved && <span className="ms-2 text-amber-400">· {t.comments.awaitingApproval}</span>}</p>
                    </div>
                    <button onClick={() => deleteComment(c)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/10 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Delete account */}
        {!isDemo && (
          <div className="rounded-2xl glass p-6 border border-red-500/20">
            <h3 className="font-bold text-red-400 mb-2">{t.account.deleteAccountTitle}</h3>
            <p className="text-sm text-gray-400 mb-4">{t.account.deleteAccountWarning}</p>
            <button onClick={deleteAccount} className="px-6 py-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-semibold rounded-xl"><Trash2 className="w-4 h-4 inline me-2" />{t.account.deleteAccount}</button>
          </div>
        )}
      </div>
    </div>
  );
}
