import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../i18n/LanguageContext';
import { CommentsDB, type Comment } from '../db/comments';
import { SettingsDB } from '../db/settings';
import { formatDate } from '../data/posts';
import { MessageSquare, Send, Clock } from 'lucide-react';

interface Props { postId: string; }

export default function CommentsSection({ postId }: Props) {
  const { user, isAuthed } = useAuth();
  const t = useLanguage().t as any;
  const [comments, setComments] = useState<Comment[]>([]);
  const [content, setContent] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [pending, setPending] = useState(false);
  const settings = SettingsDB.get();

  const reload = async () => setComments(await CommentsDB.forPost(postId));
  useEffect(() => { reload(); }, [postId]);
  useEffect(() => { if (user) setName(user.name); }, [user]);

  if (!settings.commentsEnabled) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !name.trim()) return;
    await CommentsDB.create({
      postId,
      authorName: name.trim(),
      authorEmail: user?.email || 'guest@example.com',
      content: content.trim(),
    });
    setContent('');
    setPending(true);
    setTimeout(() => setPending(false), 3500);
    // If auto-approve, reload
    if (settings.autoApproveComments) reload();
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/5">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <MessageSquare className="w-6 h-6 text-primary-400" />
        {t.comments.title} ({comments.length})
      </h3>

      {/* Comment form */}
      {isAuthed ? (
        <form onSubmit={submit} className="mb-8 p-5 rounded-2xl glass">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.comments.author}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          <textarea
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={t.comments.placeholder}
            className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
          />
          <button type="submit" className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-lg text-sm">
            <Send className="w-4 h-4" />{t.comments.submit}
          </button>
          {pending && (
            <p className="mt-3 text-sm text-amber-400 flex items-center gap-1.5"><Clock className="w-4 h-4" />{t.comments.pending}</p>
          )}
        </form>
      ) : (
        <p className="mb-8 text-sm text-gray-400 p-4 rounded-xl glass-light">{t.comments.loginToComment}</p>
      )}

      {/* Comments list */}
      {comments.length === 0 ? (
        <p className="text-sm text-gray-500 italic">{t.comments.empty}</p>
      ) : (
        <div className="space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl glass">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                  {c.authorName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{c.authorName}</p>
                  <p className="text-xs text-gray-500">{t.comments.postedOn} {formatDate(c.createdAt)}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed ps-12">{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
