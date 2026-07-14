import { usePosts } from '../context/PostsContext';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../i18n/LanguageContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { formatDate } from '../data/posts';
import { ArrowRight, Calendar, Clock, PenLine } from 'lucide-react';

export default function BlogPreview() {
  const { posts } = usePosts();
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const { ref, isVisible } = useScrollAnimation(0.05);

  const latest = [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-corp-900 via-corp-800/50 to-corp-900" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent" />

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-4">
              <PenLine className="w-4 h-4 text-primary-400" />
              <span className="text-sm font-medium text-primary-400">{t.blog.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
              {t.blog.titlePart1}<span className="gradient-text">{t.blog.titleHighlight}</span>
            </h2>
          </div>
          <button
            onClick={() => navigate({ name: 'blog' })}
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-light hover:bg-white/10 text-white font-medium rounded-full transition-all group"
          >
            {t.blog.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((post, i) => (
            <article
              key={post.id}
              onClick={() => navigate({ name: 'post', id: post.id })}
              className={`group cursor-pointer rounded-2xl glass overflow-hidden hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : '0ms' }}
            >
              <div className="relative h-40 bg-gradient-to-br from-primary-600/20 via-corp-700 to-corp-800 flex items-center justify-center">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-500">{post.coverEmoji}</div>
                <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-primary-500/20 text-primary-400 text-[11px] font-semibold border border-primary-500/30">
                  {post.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readMinutes} {t.blog.minRead}</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug mb-2 group-hover:text-primary-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
