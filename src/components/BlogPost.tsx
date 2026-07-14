import { useMemo } from 'react';
import { usePosts } from '../context/PostsContext';
import { useRouter } from '../context/RouterContext';
import { useLanguage } from '../i18n/LanguageContext';
import { formatDate } from '../data/posts';
import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react';

function renderContent(content: string): string {
  // Escape HTML
  let html = content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Headings
  html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold text-white mt-6 mb-3">$1</h3>');
  html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-white mt-8 mb-3">$1</h2>');
  html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-white mt-8 mb-3">$1</h1>');

  // Bold & italic
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Unordered lists — group consecutive lines starting with - or *
  html = html.replace(/(^|\n)((?:[-*] .+\n?)+)/g, (_m, pre, block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line: string) => line.replace(/^[-*] /, '').trim())
      .map((li: string) => `<li class="ms-5 mb-1 list-disc text-gray-300">${li}</li>`)
      .join('');
    return `${pre}<ul class="my-3">${items}</ul>`;
  });

  // Ordered lists
  html = html.replace(/(^|\n)((?:\d+\. .+\n?)+)/g, (_m, pre, block) => {
    const items = block
      .trim()
      .split('\n')
      .map((line: string) => line.replace(/^\d+\. /, '').trim())
      .map((li: string) => `<li class="ms-5 mb-1 list-decimal text-gray-300">${li}</li>`)
      .join('');
    return `${pre}<ol class="my-3">${items}</ol>`;
  });

  // Paragraphs — split on blank lines, but skip lines already turned into block elements
  html = html
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return '';
      if (/^<(h\d|ul|ol|blockquote|pre)/.test(trimmed)) return trimmed;
      return `<p class="text-gray-300 leading-relaxed mb-4 text-lg">${trimmed.replace(/\n/g, '<br/>')}</p>`;
    })
    .join('\n');

  return html;
}

export default function BlogPost() {
  const { route, navigate } = useRouter();
  const { posts } = usePosts();
  const { t } = useLanguage();

  const id = route.name === 'post' ? route.id : '';
  const post = useMemo(() => posts.find((p) => p.id === id), [posts, id]);

  if (!post) {
    return (
      <div className="relative min-h-screen pt-32 pb-20">
        <div className="absolute inset-0 bg-corp-900" />
        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">{t.blog.notFound}</h1>
          <p className="text-gray-400 mb-8">{t.blog.notFoundText}</p>
          <button
            onClick={() => navigate({ name: 'blog' })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            {t.blog.backToBlog}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-28 pb-20">
      <div className="absolute inset-0 bg-corp-900" />
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-primary-900/30 to-transparent" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate({ name: 'blog' })}
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1" />
          {t.blog.backToBlog}
        </button>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-primary-500/20 text-primary-400 text-xs font-semibold border border-primary-500/30">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Calendar className="w-3 h-3" />{formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock className="w-3 h-3" />{post.readMinutes} {t.blog.minRead}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight mb-8">
          {post.title}
        </h1>

        {/* Cover emoji banner */}
        <div className="mb-10 h-56 rounded-3xl bg-gradient-to-br from-primary-600/20 via-corp-700 to-corp-800 border border-white/5 flex items-center justify-center text-8xl shadow-2xl">
          {post.coverEmoji}
        </div>

        {/* Author */}
        <div className="flex items-center gap-4 p-4 rounded-2xl glass-light mb-10">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-white">{post.author}</div>
            <div className="text-sm text-primary-400">{post.authorRole}</div>
          </div>
        </div>

        {/* Content */}
        <div
          className="prose-docs prose-custom"
          dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-white/5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20 flex items-center gap-1"
            >
              <Tag className="w-3 h-3" />{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
