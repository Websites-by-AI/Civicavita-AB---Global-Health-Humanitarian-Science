import { useState, useMemo } from 'react';
import { usePosts } from '../context/PostsContext';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDate } from '../data/posts';
import { ArrowRight, Calendar, Clock, Tag, Search } from 'lucide-react';

export default function Blog() {
  const { posts } = usePosts();
  const { navigate } = useRouter();
  const { t } = useLanguage();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    return posts
      .filter((p) => activeCategory === 'All' || p.category === activeCategory)
      .filter((p) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((tag) => tag.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [posts, search, activeCategory]);

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      {/* Background */}
      <div className="absolute inset-0 bg-corp-900" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            <span className="text-sm font-medium text-primary-400">{t.blog.badge}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight mb-6">
            {t.blog.titlePart1}<span className="gradient-text">{t.blog.titleHighlight}</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">{t.blog.subtitle}</p>
        </div>

        {/* Search + Filters */}
        <div className="max-w-3xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute top-1/2 -translate-y-1/2 start-4 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.blog.searchPlaceholder}
              className="w-full ps-12 pe-4 py-3.5 rounded-xl glass-light text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'glass-light text-gray-300 hover:text-white'
                }`}
              >
                {cat === 'All' ? t.blog.allCategories : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">{t.blog.noPosts}</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((post) => (
              <article
                key={post.id}
                onClick={() => navigate({ name: 'post', id: post.id })}
                className="group cursor-pointer rounded-2xl glass overflow-hidden hover-lift flex flex-col"
              >
                {/* Cover */}
                <div className="relative h-44 bg-gradient-to-br from-primary-600/20 via-corp-700 to-corp-800 flex items-center justify-center">
                  {post.coverImage ? <img src={post.coverImage} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <div className="text-7xl group-hover:scale-110 transition-transform duration-500">{post.coverEmoji}</div>}
                  <div className="absolute top-3 end-3 px-2.5 py-1 rounded-full bg-primary-500/20 text-primary-400 text-[11px] font-semibold border border-primary-500/30">
                    {post.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(post.date)}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readMinutes} {t.blog.minRead}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-3 leading-snug group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-white/5 text-gray-400 border border-white/10 flex items-center gap-1">
                        <Tag className="w-2.5 h-2.5" />{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="text-xs">
                      <div className="font-semibold text-white">{post.author}</div>
                      <div className="text-gray-500">{post.authorRole}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary-400 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
