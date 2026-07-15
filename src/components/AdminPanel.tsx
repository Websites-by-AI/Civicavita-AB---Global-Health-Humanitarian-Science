import { useState, useEffect } from 'react';
import { usePosts } from '../context/PostsContext';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useAuth, DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD } from '../context/AuthContext';
import { UsersDB, type DBUser } from '../db/users';
import { CommentsDB, type Comment } from '../db/comments';
import { SettingsDB, type SiteSettings, DEFAULT_SETTINGS, OPENROUTER_MODELS } from '../db/settings';
import { AuditLog } from '../db/audit';
import { type BlogPost, createEmptyPost, estimateReadMinutes, formatDate } from '../data/posts';

// Backward-compatible shim: the old code used db.audit.log(...) — keep it working
const db = { audit: AuditLog };
import {
  Lock, Plus, Edit2, Trash2, Eye, LogOut, Save, X, FileText, ArrowLeft, UserPlus, User as UserIcon, Sparkles,
  LayoutDashboard, MessageSquare, Settings as SettingsIcon, Download, ShieldCheck, Users as UsersIcon, Check, XCircle, Crown,
} from 'lucide-react';

type Tab = 'dashboard' | 'posts' | 'users' | 'comments' | 'settings' | 'backup' | 'audit';

export default function AdminPanel() {
  const { posts, addPost, updatePost, deletePost, resetPosts } = usePosts();
  const { navigate } = useRouter();
  const { user, isAuthed, login, register, logout, isLoading } = useAuth();
  const isDemo = user?.id === 'demo';

  // Merge adminExtra translations into admin for unified access (typed as any to allow extended keys)
  const _lang = useLanguage();
  const t: any = { ..._lang.t, admin: { ..._lang.t.admin, ...(_lang.t as any).adminExtra } };

  // Auth UI state
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [busy, setBusy] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Dashboard state
  const [tab, setTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<DBUser[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(SettingsDB.get());
  const [toast, setToast] = useState<string | null>(null);

  // Editor state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(createEmptyPost());

  const currentUser = user?.name || null;

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  // Reload dashboard data when tab changes or authed
  const refresh = async () => {
    setUsers(await UsersDB.list());
    setComments(await CommentsDB.all());
    setSettings(SettingsDB.get());
  };
  useEffect(() => { if (isAuthed) refresh(); }, [isAuthed, tab]);

  // ── Auth handlers ──
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setAuthError(''); setBusy(true);
    const res = await login(loginEmail, loginPassword);
    setBusy(false);
    if (!res.ok) setAuthError(t.admin.wrongPassword);
  };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); setRegError(''); setRegSuccess(''); setBusy(true);
    const res = await register(regName, regEmail, regPassword);
    setBusy(false);
    if (!res.ok) {
      if (res.error === 'EMAIL_TAKEN') setRegError(t.admin.registerEmailTaken);
      else setRegError(t.admin.registerError);
      return;
    }
    setRegSuccess(t.admin.registerSuccess);
  };
  const useDemoCredentials = () => { setLoginEmail(DEMO_ADMIN_EMAIL); setLoginPassword(DEMO_ADMIN_PASSWORD); setAuthError(''); };

  // ── Posts handlers ──
  const openEdit = (post: BlogPost) => { const { id: _id, ...rest } = post; void _id; setForm(rest); setEditingId(post.id); setIsCreating(false); };
  const openCreate = () => { setForm(createEmptyPost()); setEditingId(null); setIsCreating(true); setTab('posts'); };
  const closeForm = () => { setEditingId(null); setIsCreating(false); setForm(createEmptyPost()); };
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const withReadTime = { ...form, readMinutes: estimateReadMinutes(form.content) };
    if (editingId) { updatePost(editingId, withReadTime); db.audit.log('POST_UPDATE', user, `id=${editingId}`); }
    else {
      const newId = addPost(withReadTime);
      db.audit.log('POST_CREATE', user, `id=${newId}`);
      navigate({ name: 'post', id: newId });
    }
    closeForm();
    showToast(t.admin.toastPostSaved);
  };
  const handleDelete = (id: string) => {
    if (confirm(t.admin.confirmDelete)) { deletePost(id); db.audit.log('POST_DELETE', user, `id=${id}`); showToast(t.admin.toastPostDeleted); }
  };
  const handleResetAll = () => { if (confirm(t.admin.confirmReset)) { resetPosts(); db.audit.log('POSTS_RESET', user); showToast(t.admin.toastPostsReset); } };

  // ── Users handlers ──
  const deleteUser = async (u: DBUser) => {
    if (u.id === user?.id) return alert(t.admin.cannotDeleteSelf);
    if (u.isDemo || u.id === 'demo') return;
    if (!confirm(`${t.admin.confirmDeleteUser} ${u.email}?`)) return;
    await UsersDB.delete(u.id);
    db.audit.log('USER_DELETE', user, `deleted=${u.email}`);
    showToast(t.admin.toastUserDeleted);
    refresh();
  };
  const toggleRole = async (u: DBUser) => {
    if (u.id === user?.id) return;
    const newRole = u.role === 'admin' ? 'editor' : 'admin';
    // UsersDB doesn't have update — delete + recreate preserving id/createdAt
    const updated: DBUser = { ...u, role: newRole };
    await UsersDB.delete(u.id);
    // re-insert with same id by using raw indexedDB — simpler: just delete and let user re-register
    // for demo, we'll do a direct put
    const raw = await new Promise<IDBDatabase>((res, rej) => {
      const req = indexedDB.open('civicavita_db', 2);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
    await new Promise<void>((res, rej) => {
      const tx = raw.transaction('users', 'readwrite');
      const rq = tx.objectStore('users').put(updated);
      rq.onsuccess = () => res();
      rq.onerror = () => rej(rq.error);
    });
    db.audit.log('USER_ROLE_CHANGE', user, `user=${u.email} role=${newRole}`);
    showToast(t.admin.toastRoleChanged);
    refresh();
  };

  // ── Comments handlers ──
  const approveComment = async (c: Comment) => { await CommentsDB.approve(c.id); db.audit.log('COMMENT_APPROVE', user, `id=${c.id}`); showToast(t.admin.toastCommentApproved); refresh(); };
  const deleteComment = async (c: Comment) => { if (!confirm(t.admin.confirmDeleteComment)) return; await CommentsDB.delete(c.id); db.audit.log('COMMENT_DELETE', user, `id=${c.id}`); showToast(t.admin.toastCommentDeleted); refresh(); };

  // ── Settings handlers ──
  const saveSettings = () => { SettingsDB.save(settings); db.audit.log('SETTINGS_SAVE', user); showToast(t.admin.toastSettingsSaved); };
  const resetSettings = () => { if (confirm(t.admin.confirmResetSettings)) { SettingsDB.reset(); setSettings(DEFAULT_SETTINGS); showToast(t.admin.toastSettingsReset); } };

  // ── Backup handlers ──
  const exportBackup = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      settings: SettingsDB.get(),
      posts,
      users: users.map(u => ({ ...u, password: u.isDemo ? u.password : '[redacted]' })),
      comments,
      audit: db.audit.all(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `civicavita-backup-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    db.audit.log('BACKUP_EXPORT', user);
    showToast(t.admin.toastBackupExported);
  };
  const importBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    try {
      const text = await file.text();
      const data = JSON.parse(text);
      if (data.settings) SettingsDB.save(data.settings);
      if (Array.isArray(data.posts)) { localStorage.setItem('civicavita_posts_v1', JSON.stringify(data.posts)); }
      db.audit.log('BACKUP_IMPORT', user, `file=${file.name}`);
      showToast(t.admin.toastBackupImported);
      refresh();
    } catch { alert(t.admin.backupImportError); }
  };

  if (isLoading) {
    return <div className="relative min-h-screen pt-32 flex items-center justify-center"><div className="text-gray-400 text-sm">Loading…</div></div>;
  }

  // ─── LOGIN / REGISTER SCREEN ───
  if (!isAuthed) {
    return (
      <div className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-corp-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="relative z-10 w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-4 text-xs text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5" /><span>{t.admin.dbStatus}</span>
          </div>
          <div className="flex gap-2 mb-4 p-1 rounded-xl glass-light">
            <button onClick={() => { setMode('login'); setAuthError(''); }} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === 'login' ? 'bg-primary-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}>{t.admin.login}</button>
            <button onClick={() => { setMode('register'); setRegError(''); setRegSuccess(''); }} className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1.5 ${mode === 'register' ? 'bg-primary-500 text-white shadow' : 'text-gray-400 hover:text-white'}`}><UserPlus className="w-4 h-4" />{t.admin.register}</button>
          </div>
          <div className="mb-4 p-4 rounded-xl bg-gradient-to-br from-primary-500/15 to-blue-500/10 border border-primary-500/30">
            <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-primary-400" /><span className="text-xs font-bold text-primary-400 uppercase tracking-wider">{t.admin.demoTitle}</span></div>
            <p className="text-xs text-gray-300 mb-3">{t.admin.demoDescription}</p>
            <div className="space-y-1 text-xs font-mono mb-3">
              <div className="flex justify-between items-center gap-2"><span className="text-gray-400">{t.admin.demoEmailLabel}:</span><span className="text-white">{DEMO_ADMIN_EMAIL}</span></div>
              <div className="flex justify-between items-center gap-2"><span className="text-gray-400">{t.admin.demoPasswordLabel}:</span><span className="text-primary-400 font-bold">{DEMO_ADMIN_PASSWORD}</span></div>
            </div>
            <button onClick={useDemoCredentials} className="w-full py-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 text-xs font-semibold transition-colors border border-primary-500/30">{t.admin.useDemo}</button>
          </div>

          {mode === 'login' ? (
            <form onSubmit={handleLogin} className="p-8 rounded-3xl glass">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 mx-auto mb-5"><Lock className="w-6 h-6 text-primary-400" /></div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">{t.admin.title}</h2>
              <p className="text-sm text-gray-400 text-center mb-6">{t.admin.subtitle}</p>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.emailLabel}</label>
              <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-4" placeholder={t.admin.emailPlaceholder} autoFocus />
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.passwordLabel}</label>
              <input type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-4" placeholder={t.admin.passwordPlaceholder} />
              {authError && <p className="text-sm text-red-400 mb-4">{authError}</p>}
              <button type="submit" disabled={busy} className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50">{busy ? '…' : t.admin.login}</button>
              <p className="text-xs text-gray-500 text-center mt-4">{t.admin.noAccount} <button type="button" onClick={() => setMode('register')} className="text-primary-400 hover:text-primary-300 font-medium">{t.admin.registerLink}</button></p>
              <button type="button" onClick={() => navigate({ name: 'home' })} className="w-full mt-3 px-6 py-2.5 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"><ArrowLeft className="w-4 h-4 rtl:rotate-180" />{t.admin.backToSite}</button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="p-8 rounded-3xl glass">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500/20 to-blue-500/20 border border-primary-500/20 mx-auto mb-5"><UserPlus className="w-6 h-6 text-primary-400" /></div>
              <h2 className="text-2xl font-bold text-white text-center mb-2">{t.admin.registerTitle}</h2>
              <p className="text-sm text-gray-400 text-center mb-6">{t.admin.registerSubtitle}</p>
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldName}</label>
              <input type="text" value={regName} onChange={(e) => setRegName(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-4" placeholder={t.admin.fieldNamePlaceholder} autoFocus />
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.emailLabel}</label>
              <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-4" placeholder={t.admin.emailPlaceholder} />
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.passwordLabel}</label>
              <input type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required minLength={6} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-4" placeholder={t.admin.passwordMinLength} />
              {regError && <p className="text-sm text-red-400 mb-3">{regError}</p>}
              {regSuccess && <p className="text-sm text-primary-400 mb-3">{regSuccess}</p>}
              <button type="submit" disabled={busy} className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg disabled:opacity-50">{busy ? '…' : t.admin.register}</button>
              <p className="text-xs text-gray-500 text-center mt-4">{t.admin.haveAccount} <button type="button" onClick={() => setMode('login')} className="text-primary-400 hover:text-primary-300 font-medium">{t.admin.loginLink}</button></p>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED ADMIN DASHBOARD ───
  const auditEntries = db.audit.all().slice(0, 30);
  const pendingComments = comments.filter(c => !c.approved);
  const approvedComments = comments.filter(c => c.approved);
  const stats = [
    { label: t.admin.statPosts, value: posts.length, icon: <FileText className="w-5 h-5" />, color: 'from-primary-500 to-emerald-500' },
    { label: t.admin.statUsers, value: users.length, icon: <UsersIcon className="w-5 h-5" />, color: 'from-blue-500 to-cyan-500' },
    { label: t.admin.statCommentsPending, value: pendingComments.length, icon: <MessageSquare className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' },
    { label: t.admin.statCommentsApproved, value: approvedComments.length, icon: <Check className="w-5 h-5" />, color: 'from-violet-500 to-fuchsia-500' },
  ];

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t.admin.tabDashboard, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'posts', label: t.admin.tabPosts, icon: <FileText className="w-4 h-4" /> },
    { id: 'users', label: t.admin.tabUsers, icon: <UsersIcon className="w-4 h-4" /> },
    { id: 'comments', label: `${t.admin.tabComments}${pendingComments.length > 0 ? ` (${pendingComments.length})` : ''}`, icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'settings', label: t.admin.tabSettings, icon: <SettingsIcon className="w-4 h-4" /> },
    { id: 'backup', label: t.admin.tabBackup, icon: <Download className="w-4 h-4" /> },
    { id: 'audit', label: t.admin.tabAudit, icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 bg-corp-900" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold border mb-3 ${isDemo ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : 'bg-primary-500/20 text-primary-400 border-primary-500/30'}`}>
              {isDemo ? <Sparkles className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
              {isDemo ? `${t.header.demoUser}: ${currentUser}` : `${currentUser} · ${user?.role}`}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3"><LayoutDashboard className="w-8 h-8 text-primary-400" />{t.admin.dashboardTitle}</h1>
            <p className="text-gray-400 mt-2">{t.admin.dashboardSubtitle}</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => navigate({ name: 'ai' })} className="inline-flex items-center gap-2 px-4 py-2.5 glass-light hover:bg-white/10 text-white font-medium rounded-xl transition-all text-sm"><Sparkles className="w-4 h-4 text-primary-400" />{t.nav.ai}</button>
            <button onClick={() => navigate({ name: 'account' })} className="inline-flex items-center gap-2 px-4 py-2.5 glass-light hover:bg-white/10 text-white font-medium rounded-xl transition-all text-sm"><UserIcon className="w-4 h-4 text-primary-400" />{t.header.myAccount}</button>
            <button onClick={logout} className="p-2.5 glass-light text-gray-400 hover:text-white rounded-xl transition-colors" aria-label={t.admin.logout}><LogOut className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Toast */}
        {toast && (
          <div className="fixed top-24 right-6 rtl:right-auto rtl:left-6 z-50 px-5 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium shadow-xl animate-[fadeIn_0.3s_ease-out] flex items-center gap-2">
            <Check className="w-4 h-4" />{toast}
          </div>
        )}

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 p-1.5 rounded-xl glass-light">
          {TABS.map(tb => (
            <button key={tb.id} onClick={() => { setTab(tb.id); closeForm(); }} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === tb.id ? 'bg-primary-500 text-white shadow' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              {tb.icon}{tb.label}
            </button>
          ))}
        </div>

        {/* ═══════════ DASHBOARD TAB ═══════════ */}
        {tab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="p-5 rounded-2xl glass">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white mb-3`}>{s.icon}</div>
                  <div className="text-3xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="rounded-2xl glass p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><FileText className="w-4 h-4 text-primary-400" />{t.admin.recentPosts}</h3>
                <div className="space-y-2">
                  {posts.slice(0, 5).map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer" onClick={() => navigate({ name: 'post', id: p.id })}>
                      <span className="text-2xl">{p.coverEmoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{p.title}</p>
                        <p className="text-xs text-gray-500">{formatDate(p.date)} · {p.category}</p>
                      </div>
                    </div>
                  ))}
                  {posts.length === 0 && <p className="text-sm text-gray-500">{t.admin.noPosts}</p>}
                </div>
              </div>
              <div className="rounded-2xl glass p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary-400" />{t.admin.recentActivity}</h3>
                <div className="space-y-1 text-xs font-mono max-h-60 overflow-auto">
                  {auditEntries.slice(0, 10).map(e => (
                    <div key={e.id} className="flex gap-2 p-1.5 rounded hover:bg-white/5">
                      <span className="text-gray-500 flex-shrink-0">{new Date(e.timestamp).toLocaleTimeString()}</span>
                      <span className="text-primary-400 font-semibold flex-shrink-0">{e.action}</span>
                      <span className="text-gray-400 truncate">{e.userEmail || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ POSTS TAB ═══════════ */}
        {tab === 'posts' && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-white">{t.admin.allPosts} ({posts.length})</h3>
              <div className="flex gap-2">
                <button onClick={handleResetAll} className="text-xs text-gray-500 hover:text-red-400 transition-colors px-3 py-2">{t.admin.resetToDefault}</button>
                <button onClick={openCreate} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg text-sm"><Plus className="w-4 h-4" />{t.admin.newPost}</button>
              </div>
            </div>
            {(isCreating || editingId) && (
              <form onSubmit={handleSave} className="mb-6 p-6 rounded-2xl glass border border-primary-500/20">
                <div className="flex items-center justify-between mb-4"><h3 className="text-xl font-bold text-white">{editingId ? t.admin.editPost : t.admin.createPost}</h3><button type="button" onClick={closeForm} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"><X className="w-5 h-5" /></button></div>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldTitle}</label><input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldCategory}</label><input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
                </div>
                <div className="mb-4"><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldExcerpt}</label><textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none" placeholder={t.admin.fieldExcerptPlaceholder} /></div>
                <div className="mb-4"><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldContent} <span className="text-xs text-gray-500">{t.admin.markdownHint}</span></label><textarea rows={12} required value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-y" /></div>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldDate}</label><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldEmoji}</label><input type="text" maxLength={4} value={form.coverEmoji} onChange={(e) => setForm({ ...form, coverEmoji: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-center text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
                  <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldTags}</label><input type="text" value={form.tags.join(', ')} onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" placeholder={t.admin.fieldTagsPlaceholder} /></div>
                </div>
                <div className="flex gap-3"><button type="submit" className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg"><Save className="w-4 h-4" />{editingId ? t.admin.update : t.admin.publish}</button><button type="button" onClick={closeForm} className="px-6 py-2.5 glass-light text-gray-300 hover:text-white rounded-xl">{t.admin.cancel}</button></div>
              </form>
            )}
            <div className="rounded-2xl glass overflow-hidden">
              {posts.length === 0 ? <div className="p-12 text-center text-gray-500">{t.admin.noPosts}</div> : (
                <div className="divide-y divide-white/5">
                  {posts.map(post => (
                    <div key={post.id} className="p-5 flex items-start gap-4 hover:bg-white/[0.02]">
                      <div className="text-3xl flex-shrink-0">{post.coverEmoji}</div>
                      <div className="flex-1 min-w-0"><h4 className="font-semibold text-white mb-1 truncate">{post.title}</h4><div className="flex flex-wrap items-center gap-3 text-xs text-gray-500"><span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">{post.category}</span><span>{formatDate(post.date)}</span><span>{post.readMinutes} {t.blog.minRead}</span></div></div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button onClick={() => navigate({ name: 'post', id: post.id })} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10" title={t.admin.view}><Eye className="w-4 h-4" /></button>
                        <button onClick={() => openEdit(post)} className="p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-white/10" title={t.admin.edit}><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/10" title={t.admin.delete}><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* ═══════════ USERS TAB ═══════════ */}
        {tab === 'users' && (
          <div className="rounded-2xl glass overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <h3 className="font-semibold text-white">{t.admin.allUsers} ({users.length})</h3>
              <button onClick={() => setMode('register')} className="text-xs text-primary-400 hover:text-primary-300">{t.admin.addUser}</button>
            </div>
            {users.length === 0 ? <div className="p-12 text-center text-gray-500">{t.admin.noUsers}</div> : (
              <div className="divide-y divide-white/5">
                {users.map(u => (
                  <div key={u.id} className="p-5 flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${u.role === 'admin' ? 'bg-gradient-to-br from-primary-500 to-primary-600' : 'bg-gradient-to-br from-blue-500 to-cyan-600'}`}>{u.name.charAt(0).toUpperCase()}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap"><p className="font-semibold text-white">{u.name}</p>{u.role === 'admin' && <Crown className="w-3.5 h-3.5 text-amber-400" />}{u.isDemo && <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px]">DEMO</span>}</div>
                      <p className="text-sm text-gray-400 truncate">{u.email}</p>
                    </div>
                    <button onClick={() => toggleRole(u)} disabled={u.id === user?.id} className="px-3 py-1.5 text-xs rounded-lg glass-light hover:bg-white/10 text-gray-300 disabled:opacity-40">{u.role === 'admin' ? t.admin.makeEditor : t.admin.makeAdmin}</button>
                    <button onClick={() => deleteUser(u)} disabled={u.id === user?.id || u.isDemo} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/10 disabled:opacity-40"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════ COMMENTS TAB ═══════════ */}
        {tab === 'comments' && (
          <div className="space-y-6">
            {pendingComments.length > 0 && (
              <div>
                <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-amber-400"><MessageSquare className="w-5 h-5" />{t.admin.pendingComments} ({pendingComments.length})</h3>
                <div className="space-y-3">
                  {pendingComments.map(c => (
                    <div key={c.id} className="p-5 rounded-2xl glass border border-amber-500/30">
                      <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                        <div><p className="font-semibold text-white">{c.authorName}</p><p className="text-xs text-gray-400">{c.authorEmail} · {formatDate(c.createdAt)}</p></div>
                        <div className="flex gap-2">
                          <button onClick={() => approveComment(c)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-xs font-semibold hover:bg-green-500/30"><Check className="w-3.5 h-3.5" />{t.admin.approve}</button>
                          <button onClick={() => deleteComment(c)} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold hover:bg-red-500/30"><XCircle className="w-3.5 h-3.5" />{t.admin.reject}</button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{c.content}</p>
                      <p className="text-xs text-gray-500 mt-2">→ {posts.find(p => p.id === c.postId)?.title || t.admin.deletedPost}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="font-bold text-white mb-3 flex items-center gap-2 text-primary-400"><Check className="w-5 h-5" />{t.admin.approvedComments} ({approvedComments.length})</h3>
              {approvedComments.length === 0 ? <p className="text-sm text-gray-500">{t.admin.noApprovedComments}</p> : (
                <div className="space-y-3">
                  {approvedComments.map(c => (
                    <div key={c.id} className="p-5 rounded-2xl glass flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0"><p className="font-semibold text-white text-sm">{c.authorName}</p><p className="text-xs text-gray-400 mb-2">{formatDate(c.createdAt)}</p><p className="text-sm text-gray-300">{c.content}</p></div>
                      <button onClick={() => deleteComment(c)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/10 flex-shrink-0"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ═══════════ SETTINGS TAB ═══════════ */}
        {tab === 'settings' && (
          <div className="rounded-2xl glass p-6 max-w-3xl">
            <h3 className="font-bold text-white mb-6 flex items-center gap-2"><SettingsIcon className="w-5 h-5 text-primary-400" />{t.admin.siteSettings}</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.settingSiteName}</label><input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.settingTagline}</label><input type="text" value={settings.tagline} onChange={(e) => setSettings({ ...settings, tagline: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.settingEmail}</label><input type="email" value={settings.contactEmail} onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.settingPhone}</label><input type="text" value={settings.contactPhone} onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.settingAddress}</label><input type="text" value={settings.address} onChange={(e) => setSettings({ ...settings, address: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label><input type="text" value={settings.social.twitter} onChange={(e) => setSettings({ ...settings, social: { ...settings.social, twitter: e.target.value } })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label><input type="text" value={settings.social.linkedin} onChange={(e) => setSettings({ ...settings, social: { ...settings.social, linkedin: e.target.value } })} className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50" /></div>
              <div><label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.settingAccent}</label><input type="color" value={settings.accentColor} onChange={(e) => setSettings({ ...settings, accentColor: e.target.value })} className="w-full h-11 rounded-xl bg-white/5 border border-white/10 cursor-pointer" /></div>
            </div>

            {/* OpenRouter Integration */}
            <div className="my-6 p-4 rounded-xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h4 className="font-bold text-white">{(t.admin as any).openrouterTitle || 'OpenRouter API'}</h4>
                {settings.openrouter.apiKey ? (
                  <span className="ms-auto text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 font-semibold">ACTIVE</span>
                ) : (
                  <span className="ms-auto text-[10px] px-2 py-0.5 rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/30 font-semibold">OFF</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                {(t.admin as any).openrouterDescription || 'Connect to OpenRouter to power AI tools with real LLMs (GPT-4o, Claude, Gemini, Llama, etc.). Get a free key at openrouter.ai.'}
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">{(t.admin as any).openrouterKey || 'API Key'}</label>
                  <input type="password" value={settings.openrouter.apiKey} onChange={(e) => setSettings({ ...settings, openrouter: { ...settings.openrouter, apiKey: e.target.value } })} placeholder="sk-or-v1-..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">{(t.admin as any).openrouterModel || 'Model'}</label>
                  <select value={settings.openrouter.model} onChange={(e) => setSettings({ ...settings, openrouter: { ...settings.openrouter, model: e.target.value } })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
                    {OPENROUTER_MODELS.map(m => <option key={m.id} value={m.id} className="bg-corp-800">{m.name}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">{(t.admin as any).openrouterSiteName || 'Site name (sent to OpenRouter)'}</label>
                    <input type="text" value={settings.openrouter.siteName} onChange={(e) => setSettings({ ...settings, openrouter: { ...settings.openrouter, siteName: e.target.value } })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">{(t.admin as any).openrouterSiteUrl || 'Site URL'}</label>
                    <input type="text" value={settings.openrouter.siteUrl} onChange={(e) => setSettings({ ...settings, openrouter: { ...settings.openrouter, siteUrl: e.target.value } })} className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3 my-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-gray-300">{t.admin.settingCommentsEnabled}</span><input type="checkbox" checked={settings.commentsEnabled} onChange={(e) => setSettings({ ...settings, commentsEnabled: e.target.checked })} className="w-5 h-5 accent-primary-500" /></label>
              <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-gray-300">{t.admin.settingAutoApprove}</span><input type="checkbox" checked={settings.autoApproveComments} onChange={(e) => setSettings({ ...settings, autoApproveComments: e.target.checked })} className="w-5 h-5 accent-primary-500" /></label>
              <label className="flex items-center justify-between cursor-pointer"><span className="text-sm text-gray-300">{t.admin.settingRegistration}</span><input type="checkbox" checked={settings.registrationEnabled} onChange={(e) => setSettings({ ...settings, registrationEnabled: e.target.checked })} className="w-5 h-5 accent-primary-500" /></label>
            </div>
            <div className="flex gap-3"><button onClick={saveSettings} className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg">{t.admin.saveSettings}</button><button onClick={resetSettings} className="px-6 py-2.5 glass-light text-gray-300 hover:text-white rounded-xl">{t.admin.resetSettings}</button></div>
          </div>
        )}

        {/* ═══════════ BACKUP TAB ═══════════ */}
        {tab === 'backup' && (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="rounded-2xl glass p-6">
              <Download className="w-8 h-8 text-primary-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t.admin.exportTitle}</h3>
              <p className="text-sm text-gray-400 mb-4">{t.admin.exportDescription}</p>
              <button onClick={exportBackup} className="w-full px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg">{t.admin.exportButton}</button>
            </div>
            <div className="rounded-2xl glass p-6">
              <FileText className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold text-white mb-2">{t.admin.importTitle}</h3>
              <p className="text-sm text-gray-400 mb-4">{t.admin.importDescription}</p>
              <label className="block w-full px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold rounded-xl shadow-lg cursor-pointer text-center">{t.admin.importButton}<input type="file" accept="application/json" onChange={importBackup} className="hidden" /></label>
            </div>
            <div className="md:col-span-2 rounded-2xl glass p-6 border border-red-500/20">
              <h3 className="font-bold text-red-400 mb-2">{t.admin.dangerZone}</h3>
              <p className="text-sm text-gray-400 mb-4">{t.admin.dangerDescription}</p>
              <div className="flex gap-3 flex-wrap">
                <button onClick={handleResetAll} className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-semibold">{t.admin.resetPosts}</button>
                <button onClick={resetSettings} className="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg text-sm font-semibold">{t.admin.resetSettings}</button>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════ AUDIT TAB ═══════════ */}
        {tab === 'audit' && (
          <div className="rounded-2xl glass p-5">
            <div className="flex items-center gap-2 mb-4"><ShieldCheck className="w-5 h-5 text-primary-400" /><h3 className="font-bold text-white">{t.admin.auditLog}</h3><span className="text-xs text-gray-500">({auditEntries.length} {t.admin.auditRecent})</span></div>
            <div className="max-h-[600px] overflow-auto space-y-1 text-xs font-mono">
              {auditEntries.length === 0 ? <p className="text-gray-500 py-4 text-center">{t.admin.auditEmpty}</p> :
                auditEntries.map(entry => (
                  <div key={entry.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-white/[0.03]">
                    <span className="text-gray-500 flex-shrink-0">{new Date(entry.timestamp).toLocaleString()}</span>
                    <span className="text-primary-400 font-semibold flex-shrink-0">{entry.action}</span>
                    <span className="text-gray-400 flex-shrink-0">{entry.userEmail || '—'}</span>
                    {entry.details && <span className="text-gray-500 truncate">{entry.details}</span>}
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
