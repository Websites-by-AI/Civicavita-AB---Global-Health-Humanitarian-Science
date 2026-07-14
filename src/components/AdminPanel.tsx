import { useState } from 'react';
import { usePosts } from '../context/PostsContext';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../i18n/LanguageContext';
import { type BlogPost, createEmptyPost, estimateReadMinutes, formatDate } from '../data/posts';
import { Lock, Plus, Edit2, Trash2, Eye, LogOut, Save, X, FileText, ArrowLeft } from 'lucide-react';

const ADMIN_PASSWORD = 'civicavita2026';
const SESSION_KEY = 'civicavita_admin_auth';

export default function AdminPanel() {
  const { posts, addPost, updatePost, deletePost, resetPosts } = usePosts();
  const { navigate } = useRouter();
  const { t } = useLanguage();

  const [isAuthed, setIsAuthed] = useState<boolean>(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(createEmptyPost());

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1');
      setIsAuthed(true);
      setAuthError('');
    } else {
      setAuthError(t.admin.wrongPassword);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAuthed(false);
    setPassword('');
  };

  const openEdit = (post: BlogPost) => {
    const { id: _id, ...rest } = post;
    void _id;
    setForm(rest);
    setEditingId(post.id);
    setIsCreating(false);
  };

  const openCreate = () => {
    setForm(createEmptyPost());
    setEditingId(null);
    setIsCreating(true);
  };

  const closeForm = () => {
    setEditingId(null);
    setIsCreating(false);
    setForm(createEmptyPost());
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;
    const withReadTime = { ...form, readMinutes: estimateReadMinutes(form.content) };
    if (editingId) {
      updatePost(editingId, withReadTime);
    } else {
      const newId = addPost(withReadTime);
      navigate({ name: 'post', id: newId });
    }
    closeForm();
  };

  const handleDelete = (id: string) => {
    if (confirm(t.admin.confirmDelete)) {
      deletePost(id);
    }
  };

  // Login screen
  if (!isAuthed) {
    return (
      <div className="relative min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
        <div className="absolute inset-0 bg-corp-900" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />

        <form
          onSubmit={handleLogin}
          className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl glass"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 border border-primary-500/20 mx-auto mb-6">
            <Lock className="w-7 h-7 text-primary-400" />
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">{t.admin.title}</h2>
          <p className="text-sm text-gray-400 text-center mb-8">{t.admin.subtitle}</p>

          <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.passwordLabel}</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-4"
            placeholder={t.admin.passwordPlaceholder}
            autoFocus
          />
          {authError && <p className="text-sm text-red-400 mb-4">{authError}</p>}
          <p className="text-xs text-gray-500 mb-6">{t.admin.hint}</p>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5"
          >
            {t.admin.login}
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'home' })}
            className="w-full mt-3 px-6 py-2.5 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t.admin.backToSite}
          </button>
        </form>
      </div>
    );
  }

  // Authenticated admin
  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 bg-corp-900" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-semibold border border-primary-500/30 mb-3">
              <Lock className="w-3 h-3" />{t.admin.authenticated}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center gap-3">
              <FileText className="w-8 h-8 text-primary-400" />
              {t.admin.dashboardTitle}
            </h1>
            <p className="text-gray-400 mt-2">{t.admin.dashboardSubtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              {t.admin.newPost}
            </button>
            <button
              onClick={handleLogout}
              className="p-2.5 glass-light text-gray-400 hover:text-white rounded-xl transition-colors"
              aria-label={t.admin.logout}
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editor form */}
        {(isCreating || editingId) && (
          <form
            onSubmit={handleSave}
            className="mb-10 p-6 sm:p-8 rounded-2xl glass border border-primary-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingId ? t.admin.editPost : t.admin.createPost}
              </h3>
              <button type="button" onClick={closeForm} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldTitle}</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldCategory}</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldExcerpt}</label>
              <textarea
                rows={2}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
                placeholder={t.admin.fieldExcerptPlaceholder}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t.admin.fieldContent} <span className="text-xs text-gray-500">{t.admin.markdownHint}</span>
              </label>
              <textarea
                rows={14}
                required
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-y"
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldDate}</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldEmoji}</label>
                <input
                  type="text"
                  maxLength={4}
                  value={form.coverEmoji}
                  onChange={(e) => setForm({ ...form, coverEmoji: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-center text-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.admin.fieldTags}</label>
                <input
                  type="text"
                  value={form.tags.join(', ')}
                  onChange={(e) => setForm({ ...form, tags: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                  placeholder={t.admin.fieldTagsPlaceholder}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-all"
              >
                <Save className="w-4 h-4" />
                {editingId ? t.admin.update : t.admin.publish}
              </button>
              <button
                type="button"
                onClick={closeForm}
                className="px-6 py-2.5 glass-light text-gray-300 hover:text-white rounded-xl transition-colors"
              >
                {t.admin.cancel}
              </button>
            </div>
          </form>
        )}

        {/* Posts list */}
        <div className="rounded-2xl glass overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-white">{t.admin.allPosts} ({posts.length})</h3>
            <button
              onClick={() => { if (confirm(t.admin.confirmReset)) resetPosts(); }}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors"
            >
              {t.admin.resetToDefault}
            </button>
          </div>
          {posts.length === 0 ? (
            <div className="p-12 text-center text-gray-500">{t.admin.noPosts}</div>
          ) : (
            <div className="divide-y divide-white/5">
              {posts.map((post) => (
                <div key={post.id} className="p-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors">
                  <div className="text-3xl flex-shrink-0">{post.coverEmoji}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white mb-1 truncate">{post.title}</h4>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">{post.category}</span>
                      <span>{formatDate(post.date)}</span>
                      <span>{post.readMinutes} {t.blog.minRead}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => navigate({ name: 'post', id: post.id })}
                      className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                      title={t.admin.view}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEdit(post)}
                      className="p-2 text-gray-400 hover:text-primary-400 rounded-lg hover:bg-white/10 transition-colors"
                      title={t.admin.edit}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors"
                      title={t.admin.delete}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
