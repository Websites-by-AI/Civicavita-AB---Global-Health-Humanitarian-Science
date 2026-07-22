export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  date: string; // ISO date
  coverEmoji: string;
  coverImage?: string;
  readMinutes: number;
  tags: string[];
  locale?: 'en' | 'fa' | 'sv' | 'fr' | 'ar';
  translationKey?: string;
}

const STORAGE_KEY = 'civicavita_posts_v1';

export const SEED_POSTS: BlogPost[] = [
  {
    id: 'editorial-evidence-field', title: 'From field experience to public evidence: a careful starting point',
    excerpt: 'CIVICAVITA begins its public work by separating documented professional experience from claims about a new organisation.',
    content: `CIVICAVITA AB is developing its public research and advisory work from Sweden. Its starting point is not a claim to have already delivered large-scale programmes. It is a commitment to use evidence carefully, state scope clearly and build work progressively.

Dr. Sahar Motallebi brings documented professional experience in public health and humanitarian contexts, including roles with ministries, WHO, UNICEF, UNDP and UN Women. Those experiences inform the perspective of the practice; they do not make those institutions current CIVICAVITA partners.

This distinction matters. In global health, credibility depends on transparent attribution, appropriate evidence and respect for the people and institutions closest to the issue.`,
    category: 'Editorial', author: 'CIVICAVITA AB', authorRole: 'Editorial team', date: '2026-07-21', coverEmoji: '🔎', coverImage: '/images/insight-evidence-health.jpg', readMinutes: 2, tags: ['Evidence', 'Transparency', 'Global Health'], locale: 'en', translationKey: 'evidence-field'
  },
  {
    id: 'editorial-displacement-health', title: 'Displacement, shelter and health: questions that need long-term attention',
    excerpt: 'Reflections informed by documented work on social determinants of health in displaced populations and post-disaster sheltering.',
    content: `Temporary shelter is never only a logistical question. It affects privacy, safety, exposure to weather, continuity of care and the social conditions that shape health.

Dr. Motallebi's documented academic and professional record includes work on social determinants of health for displaced populations and a 2006 conference publication on semi-permanent sheltering after disasters. These experiences point to an enduring question for researchers and decision-makers: what happens when a short-term response becomes a long-term living condition?

CIVICAVITA will explore this topic through careful research synthesis and public-facing notes, without presenting past work as a current programme.`,
    category: 'Humanitarian Science', author: 'CIVICAVITA AB', authorRole: 'Editorial team', date: '2026-07-18', coverEmoji: '⛺', coverImage: '/images/insight-humanitarian-research.jpg', readMinutes: 2, tags: ['Displacement', 'Shelter', 'Health Equity'], locale: 'en', translationKey: 'displacement-health'
  },
  {
    id: 'editorial-health-systems', title: 'Resilient health systems are built through continuity, learning and trust',
    excerpt: 'Health systems resilience is not a technology claim; it is sustained work on institutions, data, people and access to care.',
    content: `Health systems experience pressure from many directions: chronic disease, climate risks, displacement, workforce shortages and unequal access to information. Resilience is not a product that can be installed. It is a capacity developed through continuity of care, local knowledge, learning and accountable institutions.

The founder's record includes technical work relating to non-communicable disease policy, monitoring and evaluation, disaster planning and health programming. CIVICAVITA draws on those documented areas of experience to frame questions for research and advisory work.

Our public writing will focus on useful questions, clear evidence and practical limits rather than promises of transformation.`,
    category: 'Health Systems', author: 'CIVICAVITA AB', authorRole: 'Editorial team', date: '2026-07-15', coverEmoji: '🏥', coverImage: '/images/insight-health-systems.jpg', readMinutes: 2, tags: ['Health Systems', 'Resilience', 'Policy'], locale: 'en', translationKey: 'health-systems'
  },
  {
    id: 'editorial-responsible-ai', title: 'Responsible AI starts with accountable human judgment',
    excerpt: 'AI may assist research and communication, but it cannot replace contextual knowledge, ethical review or responsibility.',
    content: `AI can help organise information, create structured first drafts and support knowledge workflows. In public health and humanitarian settings, however, a fluent answer is not necessarily a reliable one.

CIVICAVITA treats AI as assistive technology. Sources need checking, uncertainty needs stating and people with relevant contextual knowledge remain responsible for decisions. This approach is especially important when data are incomplete, situations change quickly or the consequences of an error are serious.

As a recently active public practice, CIVICAVITA is exploring responsible AI methods carefully and will publish only work that has appropriate human review.`,
    category: 'Responsible AI', author: 'CIVICAVITA AB', authorRole: 'Editorial team', date: '2026-07-12', coverEmoji: '🧠', coverImage: '/images/insight-responsible-ai.jpg', readMinutes: 2, tags: ['Responsible AI', 'Ethics', 'Research'], locale: 'en', translationKey: 'responsible-ai'
  }
];

export function loadPosts(): BlogPost[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
      return SEED_POSTS;
    }
    const parsed = JSON.parse(raw) as BlogPost[];
    if (!Array.isArray(parsed) || parsed.length === 0) return SEED_POSTS;
    return parsed;
  } catch {
    return SEED_POSTS;
  }
}

export function savePosts(posts: BlogPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch {
    // storage full or blocked — fail silently
  }
}

export function createEmptyPost(): Omit<BlogPost, 'id'> {
  return {
    title: '',
    excerpt: '',
    content: '',
    category: 'Research',
    author: 'Dr. Sahar Motallebi',
    authorRole: 'Founder & Lead Researcher',
    date: new Date().toISOString().slice(0, 10),
    coverEmoji: '📝',
    readMinutes: 5,
    tags: [],
    locale: 'en',
    translationKey: '',
  };
}

export function estimateReadMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function generateId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Fallback copies keep the public blog readable if the remote D1 API is temporarily unavailable. */
export const PERSIAN_SEED_POSTS: BlogPost[] = [
  { id:'fa-editorial-evidence-field', translationKey:'evidence-field', locale:'fa', title:'از تجربه حرفه‌ای تا شواهد عمومی: نقطه شروعی با دقت', excerpt:'سیویکاویتا کار عمومی خود را با تفکیک روشن میان سابقه حرفه‌ای مستند و ادعاهای مربوط به یک سازمان آغاز می‌کند.', content:'سیویکاویتا AB فعالیت عمومی پژوهشی و مشاوره‌ای خود را از سوئد توسعه می‌دهد. نقطه شروع این مسیر استفاده دقیق از شواهد، بیان روشن دامنه کار و توسعه تدریجی فعالیت‌ها است.\n\nدکتر سحر مطلبی دارای سابقه حرفه‌ای مستند در سلامت عمومی و زمینه‌های بشردوستانه است. این تجربه‌ها دیدگاه مجموعه را شکل می‌دهند.', category:'یادداشت تحلیلی', author:'سیویکاویتا AB', authorRole:'تیم تحریریه', date:'2026-07-21', coverEmoji:'🔎', coverImage:'/images/insight-evidence-health.jpg', readMinutes:2, tags:['شواهد','شفافیت','سلامت جهانی'] },
  { id:'fa-editorial-displacement-health', translationKey:'displacement-health', locale:'fa', title:'آوارگی، سرپناه و سلامت: پرسش‌هایی که به توجه بلندمدت نیاز دارند', excerpt:'تأملی بر پایه کارهای مستند درباره عوامل اجتماعی سلامت در جمعیت‌های آواره و سرپناه پس از بحران.', content:'سرپناه موقت تنها یک مسئله لجستیکی نیست. این موضوع بر حریم خصوصی، ایمنی، تداوم مراقبت و عوامل اجتماعی اثرگذار بر سلامت تأثیر می‌گذارد.\n\nسیویکاویتا این موضوع را با مرور دقیق شواهد و یادداشت‌های عمومی بررسی می‌کند.', category:'علوم بشردوستانه', author:'سیویکاویتا AB', authorRole:'تیم تحریریه', date:'2026-07-18', coverEmoji:'⛺', coverImage:'/images/insight-humanitarian-research.jpg', readMinutes:2, tags:['آوارگی','سرپناه','عدالت سلامت'] },
  { id:'fa-editorial-health-systems', translationKey:'health-systems', locale:'fa', title:'نظام‌های سلامت تاب‌آور با تداوم، یادگیری و اعتماد ساخته می‌شوند', excerpt:'تاب‌آوری نظام سلامت کار مستمر بر نهادها، داده‌ها، مردم و دسترسی به مراقبت است.', content:'نظام‌های سلامت با بیماری‌های مزمن، خطرات اقلیمی، آوارگی و کمبود نیروی کار مواجه‌اند. تاب‌آوری ظرفیتی است که با تداوم مراقبت، دانش محلی، یادگیری و نهادهای پاسخ‌گو ایجاد می‌شود.', category:'نظام‌های سلامت', author:'سیویکاویتا AB', authorRole:'تیم تحریریه', date:'2026-07-15', coverEmoji:'🏥', coverImage:'/images/insight-health-systems.jpg', readMinutes:2, tags:['نظام سلامت','تاب‌آوری','سیاست‌گذاری'] },
  { id:'fa-editorial-responsible-ai', translationKey:'responsible-ai', locale:'fa', title:'هوش مصنوعی مسئولانه با قضاوت پاسخ‌گوی انسانی آغاز می‌شود', excerpt:'هوش مصنوعی می‌تواند به پژوهش و ارتباطات کمک کند، اما جای دانش زمینه‌ای و مسئولیت‌پذیری را نمی‌گیرد.', content:'هوش مصنوعی می‌تواند به سامان‌دهی اطلاعات و تولید پیش‌نویس‌های ساختاریافته کمک کند. در سلامت عمومی، پاسخ روان لزوماً پاسخ قابل اعتماد نیست.\n\nمنابع باید بررسی شوند و افراد دارای دانش زمینه‌ای همچنان مسئول تصمیم‌ها هستند.', category:'هوش مصنوعی مسئولانه', author:'سیویکاویتا AB', authorRole:'تیم تحریریه', date:'2026-07-12', coverEmoji:'🧠', coverImage:'/images/insight-responsible-ai.jpg', readMinutes:2, tags:['هوش مصنوعی مسئولانه','اخلاق','پژوهش'] },
];
export function fallbackPostsForLocale(locale: string): BlogPost[] { return locale === 'fa' ? PERSIAN_SEED_POSTS : locale === 'en' ? SEED_POSTS : []; }
