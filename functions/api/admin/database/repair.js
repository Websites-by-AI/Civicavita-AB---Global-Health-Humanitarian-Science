import { adminGuard, json } from '../../../_auth.js';
const run = (env, sql) => env.DB.prepare(sql).run();
async function addColumn(env, sql) { try { await run(env, sql); return 'added'; } catch (e) { if (String(e).includes('duplicate column name')) return 'already exists'; throw e; } }
export async function onRequestPost({ request, env }) {
  const guard = await adminGuard(request, env);
  if (guard.error) return guard.error;
  try {
    await run(env, `CREATE TABLE IF NOT EXISTS posts (id TEXT PRIMARY KEY,title TEXT NOT NULL,excerpt TEXT NOT NULL DEFAULT '',content TEXT NOT NULL,category TEXT NOT NULL DEFAULT 'Editorial',author TEXT NOT NULL DEFAULT 'CIVICAVITA AB',author_role TEXT NOT NULL DEFAULT 'Editorial team',date TEXT NOT NULL,cover_emoji TEXT NOT NULL DEFAULT '📝',read_minutes INTEGER NOT NULL DEFAULT 1,tags TEXT NOT NULL DEFAULT '[]',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)`);
    const changes = [];
    changes.push(['locale', await addColumn(env, "ALTER TABLE posts ADD COLUMN locale TEXT NOT NULL DEFAULT 'en'")]);
    changes.push(['translation_key', await addColumn(env, 'ALTER TABLE posts ADD COLUMN translation_key TEXT')]);
    changes.push(['cover_image', await addColumn(env, 'ALTER TABLE posts ADD COLUMN cover_image TEXT')]);
    await run(env, 'CREATE INDEX IF NOT EXISTS idx_posts_locale_date ON posts(locale, date DESC)');
    await run(env, 'CREATE TABLE IF NOT EXISTS setup_state (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)');
    await run(env, "INSERT OR REPLACE INTO setup_state (key,value,updated_at) VALUES ('posts_schema','ready',CURRENT_TIMESTAMP)");
    const existingFa = (await env.DB.prepare("SELECT COUNT(*) AS count FROM posts WHERE locale='fa'").first())?.count || 0;
    let seededPersianPosts = 0;
    if (!existingFa) {
      const posts = [
        ['fa-editorial-evidence-field','از تجربه حرفه‌ای تا شواهد عمومی: نقطه شروعی با دقت','سیویکاویتا کار عمومی خود را با تفکیک روشن میان سابقه حرفه‌ای مستند و ادعاهای مربوط به یک سازمان آغاز می‌کند.','سیویکاویتا AB فعالیت عمومی پژوهشی و مشاوره‌ای خود را از سوئد توسعه می‌دهد. نقطه شروع این مسیر استفاده دقیق از شواهد، بیان روشن دامنه کار و توسعه تدریجی فعالیت‌ها است.\n\nدکتر سحر مطلبی دارای سابقه حرفه‌ای مستند در سلامت عمومی و زمینه‌های بشردوستانه است. این تجربه‌ها دیدگاه مجموعه را شکل می‌دهند، اما به معنای شراکت فعلی نهادهای پیشین با سیویکاویتا نیستند.','یادداشت تحلیلی','🔎','/images/insight-evidence-health.jpg','["شواهد","شفافیت","سلامت جهانی"]','evidence-field'],
        ['fa-editorial-displacement-health','آوارگی، سرپناه و سلامت: پرسش‌هایی که به توجه بلندمدت نیاز دارند','تأملی بر پایه کارهای مستند درباره عوامل اجتماعی سلامت در جمعیت‌های آواره و سرپناه پس از بحران.','سرپناه موقت تنها یک مسئله لجستیکی نیست. این موضوع بر حریم خصوصی، ایمنی، تداوم مراقبت و عوامل اجتماعی اثرگذار بر سلامت تأثیر می‌گذارد.\n\nسوابق دانشگاهی و حرفه‌ای دکتر سحر مطلبی شامل کار درباره عوامل اجتماعی سلامت برای جمعیت‌های آواره و سرپناه پس از بحران است. سیویکاویتا این موضوع را با مرور دقیق شواهد و یادداشت‌های عمومی بررسی می‌کند.','علوم بشردوستانه','⛺','/images/insight-humanitarian-research.jpg','["آوارگی","سرپناه","عدالت سلامت"]','displacement-health'],
        ['fa-editorial-health-systems','نظام‌های سلامت تاب‌آور با تداوم، یادگیری و اعتماد ساخته می‌شوند','تاب‌آوری نظام سلامت کار مستمر بر نهادها، داده‌ها، مردم و دسترسی به مراقبت است.','نظام‌های سلامت با بیماری‌های مزمن، خطرات اقلیمی، آوارگی و کمبود نیروی کار مواجه‌اند. تاب‌آوری محصولی نیست که نصب شود؛ ظرفیتی است که با تداوم مراقبت، دانش محلی، یادگیری و نهادهای پاسخ‌گو ایجاد می‌شود.\n\nسیویکاویتا از تجربه‌های مستند در سیاست بیماری‌های غیرواگیر، پایش و ارزیابی و برنامه‌ریزی بلایا برای صورت‌بندی پرسش‌های پژوهشی و مشاوره‌ای استفاده می‌کند.','نظام‌های سلامت','🏥','/images/insight-health-systems.jpg','["نظام سلامت","تاب‌آوری","سیاست‌گذاری"]','health-systems'],
        ['fa-editorial-responsible-ai','هوش مصنوعی مسئولانه با قضاوت پاسخ‌گوی انسانی آغاز می‌شود','هوش مصنوعی می‌تواند به پژوهش و ارتباطات کمک کند، اما جای دانش زمینه‌ای و مسئولیت‌پذیری را نمی‌گیرد.','هوش مصنوعی می‌تواند به سامان‌دهی اطلاعات و تولید پیش‌نویس‌های ساختاریافته کمک کند. با این حال، در سلامت عمومی و زمینه‌های بشردوستانه، پاسخ روان لزوماً پاسخ قابل اعتماد نیست.\n\nسیویکاویتا هوش مصنوعی را فناوری کمکی می‌داند: منابع باید بررسی شوند، عدم قطعیت باید بیان شود و افراد دارای دانش زمینه‌ای همچنان مسئول تصمیم‌ها هستند.','هوش مصنوعی مسئولانه','🧠','/images/insight-responsible-ai.jpg','["هوش مصنوعی مسئولانه","اخلاق","پژوهش"]','responsible-ai']
      ];
      for (const p of posts) { await env.DB.prepare("INSERT OR IGNORE INTO posts (id,title,excerpt,content,category,author,author_role,date,cover_emoji,cover_image,read_minutes,tags,locale,translation_key) VALUES (?,?,?,?,?,'CIVICAVITA AB','تیم تحریریه','2026-07-21',?,?,2,?,'fa',?)").bind(...p).run(); seededPersianPosts++; }
    }
    return json({ ok: true, message: `Posts database repaired. Persian posts added: ${seededPersianPosts}.`, changes, seededPersianPosts });
  } catch (error) { console.error('D1 repair error:', error); return json({ ok: false, error: error instanceof Error ? error.message : 'Database repair failed.' }, 500); }
}
