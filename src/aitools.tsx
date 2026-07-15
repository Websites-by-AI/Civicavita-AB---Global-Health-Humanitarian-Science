import { useMemo, useState } from "react";
import { hasOpenRouter, runOpenRouter, type ToolKey } from "./ai";

export type Language = "en" | "fa" | "ar" | "sv";

type ToolCopy = {
  key: ToolKey;
  tab: string;
  title: string;
  description: string;
  inputLabel: string;
  placeholder: string;
  button: string;
  resultLabel: string;
  emptyResult: string;
};

type AiCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  disclaimer: string;
  loading: string;
  errorPrefix: string;
  liveBadge: string;
  demoBadge: string;
  tools: ToolCopy[];
};

export const aiCopy: Record<Language, AiCopy> = {
  en: {
    eyebrow: "AI modules",
    headline: "Responsible AI tools, tuned for global health work.",
    body: "These assistants draft structure and first ideas so experts can focus on judgement. Everything runs in your browser as a demonstration — no data leaves this page.",
    disclaimer: "Always reviewed by a human before use.",
    loading: "Generating...",
    errorPrefix: "Error",
    liveBadge: "Live AI (OpenRouter)",
    demoBadge: "Local demo mode",
    tools: [
      {
        key: "report",
        tab: "Report outliner",
        title: "Scientific report outliner",
        description: "Turn a topic into a structured research or technical report outline.",
        inputLabel: "Report topic",
        placeholder: "e.g. Cholera response in flood-affected districts",
        button: "Generate outline",
        resultLabel: "Suggested outline",
        emptyResult: "Enter a topic to generate a report outline.",
      },
      {
        key: "grant",
        tab: "Grant finder",
        title: "Grant opportunity finder",
        description: "Get sample funding directions and a fit note from your keywords.",
        inputLabel: "Keywords",
        placeholder: "e.g. maternal health, displacement, resilience",
        button: "Find grant directions",
        resultLabel: "Matched directions",
        emptyResult: "Enter keywords to explore grant directions.",
      },
      {
        key: "blog",
        tab: "Blog assistant",
        title: "Journal post assistant",
        description: "Draft a title and opening for a journal post in Sahar's voice.",
        inputLabel: "Post idea",
        placeholder: "e.g. Lessons from coordinating field clinics",
        button: "Draft post",
        resultLabel: "Draft",
        emptyResult: "Enter an idea to draft a post.",
      },
      {
        key: "content",
        tab: "Content ideas",
        title: "Social content ideas",
        description: "Generate short content angles for outreach and advocacy.",
        inputLabel: "Theme",
        placeholder: "e.g. climate and health resilience",
        button: "Generate ideas",
        resultLabel: "Ideas",
        emptyResult: "Enter a theme to generate ideas.",
      },
    ],
  },
  fa: {
    eyebrow: "ماژول های هوش مصنوعی",
    headline: "ابزارهای هوش مصنوعی مسئولانه، متناسب با کار سلامت جهانی.",
    body: "این دستیارها ساختار و ایده های اولیه را می سازند تا متخصص روی قضاوت تمرکز کند. همه چیز به صورت نمایشی در مرورگر شما اجرا می شود و داده ای ارسال نمی شود.",
    disclaimer: "همیشه پیش از استفاده توسط انسان بازبینی می شود.",
    loading: "در حال ساخت...",
    errorPrefix: "خطا",
    liveBadge: "هوش مصنوعی زنده (OpenRouter)",
    demoBadge: "حالت نمایشی محلی",
    tools: [
      {
        key: "report",
        tab: "طرح گزارش",
        title: "طراح ساختار گزارش علمی",
        description: "یک موضوع را به ساختار گزارش پژوهشی یا فنی تبدیل کنید.",
        inputLabel: "موضوع گزارش",
        placeholder: "مثال: پاسخ به وبا در مناطق سیل زده",
        button: "ساخت ساختار",
        resultLabel: "ساختار پیشنهادی",
        emptyResult: "برای ساخت ساختار گزارش یک موضوع وارد کنید.",
      },
      {
        key: "grant",
        tab: "یابنده گرنت",
        title: "یابنده فرصت های تامین مالی",
        description: "از کلیدواژه ها مسیرهای نمونه تامین مالی و یادداشت تناسب بگیرید.",
        inputLabel: "کلیدواژه ها",
        placeholder: "مثال: سلامت مادر، آوارگی، تاب آوری",
        button: "یافتن مسیرها",
        resultLabel: "مسیرهای متناسب",
        emptyResult: "برای بررسی مسیرهای گرنت کلیدواژه وارد کنید.",
      },
      {
        key: "blog",
        tab: "دستیار وبلاگ",
        title: "دستیار یادداشت",
        description: "پیش نویس عنوان و شروع یک یادداشت به سبک سحر بسازید.",
        inputLabel: "ایده یادداشت",
        placeholder: "مثال: درس های هماهنگی درمانگاه های میدانی",
        button: "ساخت پیش نویس",
        resultLabel: "پیش نویس",
        emptyResult: "برای ساخت پیش نویس یک ایده وارد کنید.",
      },
      {
        key: "content",
        tab: "ایده محتوا",
        title: "ایده های محتوای اجتماعی",
        description: "زاویه های کوتاه محتوا برای ارتباط و آگاهی بخشی بسازید.",
        inputLabel: "موضوع",
        placeholder: "مثال: تاب آوری اقلیم و سلامت",
        button: "ساخت ایده ها",
        resultLabel: "ایده ها",
        emptyResult: "برای ساخت ایده یک موضوع وارد کنید.",
      },
    ],
  },
  ar: {
    eyebrow: "وحدات الذكاء الاصطناعي",
    headline: "أدوات ذكاء اصطناعي مسؤولة مصممة لعمل الصحة العالمية.",
    body: "تصوغ هذه المساعدات الهيكل والأفكار الأولى ليركز الخبراء على الحكم. كل شيء يعمل في متصفحك كعرض توضيحي ولا تغادر أي بيانات هذه الصفحة.",
    disclaimer: "تتم مراجعتها دائما من قبل إنسان قبل الاستخدام.",
    loading: "جارٍ الإنشاء...",
    errorPrefix: "خطأ",
    liveBadge: "ذكاء اصطناعي مباشر (OpenRouter)",
    demoBadge: "وضع تجريبي محلي",
    tools: [
      {
        key: "report",
        tab: "مخطط التقرير",
        title: "مخطط التقرير العلمي",
        description: "حوّل موضوعا إلى هيكل تقرير بحثي أو تقني.",
        inputLabel: "موضوع التقرير",
        placeholder: "مثال: الاستجابة للكوليرا في المناطق المتضررة من الفيضانات",
        button: "إنشاء المخطط",
        resultLabel: "المخطط المقترح",
        emptyResult: "أدخل موضوعا لإنشاء مخطط التقرير.",
      },
      {
        key: "grant",
        tab: "باحث المنح",
        title: "باحث فرص التمويل",
        description: "احصل على اتجاهات تمويل نموذجية وملاحظة ملاءمة من كلماتك.",
        inputLabel: "الكلمات المفتاحية",
        placeholder: "مثال: صحة الأم، النزوح، المرونة",
        button: "البحث عن اتجاهات",
        resultLabel: "الاتجاهات المطابقة",
        emptyResult: "أدخل كلمات مفتاحية لاستكشاف اتجاهات المنح.",
      },
      {
        key: "blog",
        tab: "مساعد المدونة",
        title: "مساعد المقالات",
        description: "اصنع مسودة عنوان وبداية لمقال بأسلوب سحر.",
        inputLabel: "فكرة المقال",
        placeholder: "مثال: دروس من تنسيق العيادات الميدانية",
        button: "صياغة مسودة",
        resultLabel: "المسودة",
        emptyResult: "أدخل فكرة لصياغة مقال.",
      },
      {
        key: "content",
        tab: "أفكار المحتوى",
        title: "أفكار محتوى اجتماعي",
        description: "أنشئ زوايا محتوى قصيرة للتواصل والمناصرة.",
        inputLabel: "الموضوع",
        placeholder: "مثال: مرونة المناخ والصحة",
        button: "إنشاء أفكار",
        resultLabel: "الأفكار",
        emptyResult: "أدخل موضوعا لإنشاء أفكار.",
      },
    ],
  },
  sv: {
    eyebrow: "AI-moduler",
    headline: "Ansvarsfulla AI-verktyg, anpassade for global halsa.",
    body: "Dessa assistenter skissar struktur och forsta ideer sa att experter kan fokusera pa omdome. Allt kors i din webblasare som en demonstration och ingen data lamnar sidan.",
    disclaimer: "Granskas alltid av en manniska fore anvandning.",
    loading: "Genererar...",
    errorPrefix: "Fel",
    liveBadge: "Live-AI (OpenRouter)",
    demoBadge: "Lokalt demolage",
    tools: [
      {
        key: "report",
        tab: "Rapportskiss",
        title: "Vetenskaplig rapportskiss",
        description: "Gor ett amne till en strukturerad rapportdisposition.",
        inputLabel: "Rapportamne",
        placeholder: "t.ex. Kolerainsats i oversvammade distrikt",
        button: "Skapa disposition",
        resultLabel: "Forslag pa disposition",
        emptyResult: "Ange ett amne for att skapa en disposition.",
      },
      {
        key: "grant",
        tab: "Bidragssok",
        title: "Sokning av bidragsmojligheter",
        description: "Fa exempel pa finansieringsspar och en passningsnot fran dina nyckelord.",
        inputLabel: "Nyckelord",
        placeholder: "t.ex. modrahalsa, fordrivning, resiliens",
        button: "Hitta spar",
        resultLabel: "Matchande spar",
        emptyResult: "Ange nyckelord for att utforska bidragsspar.",
      },
      {
        key: "blog",
        tab: "Blogghjalp",
        title: "Journalassistent",
        description: "Skissa titel och inledning for ett inlagg i Sahars ton.",
        inputLabel: "Inlaggside",
        placeholder: "t.ex. Lardomar av att samordna faltkliniker",
        button: "Skissa inlagg",
        resultLabel: "Utkast",
        emptyResult: "Ange en ide for att skissa ett inlagg.",
      },
      {
        key: "content",
        tab: "Innehallsideer",
        title: "Ideer for sociala inlagg",
        description: "Skapa korta innehallsvinklar for kommunikation.",
        inputLabel: "Tema",
        placeholder: "t.ex. klimat- och halsoresiliens",
        button: "Skapa ideer",
        resultLabel: "Ideer",
        emptyResult: "Ange ett tema for att skapa ideer.",
      },
    ],
  },
};

function generate(tool: ToolKey, input: string): string {
  const q = input.trim();
  if (!q) return "";
  switch (tool) {
    case "report":
      return [
        `Title: ${q} — evidence and response brief`,
        "",
        "1. Executive summary",
        "2. Background and context",
        "3. Problem statement and scope",
        "4. Methods and data sources",
        "5. Key findings",
        "6. Risks and assumptions",
        "7. Recommendations and next steps",
        "8. Monitoring and evaluation plan",
        "9. References",
      ].join("\n");
    case "grant":
      return [
        `Directions matched to "${q}":`,
        "",
        "• Global health innovation fund — early-stage field pilots",
        "• Humanitarian resilience grant — community-led delivery",
        "• Research-to-policy fellowship — evidence translation",
        "",
        `Fit note: strong alignment with ${q}. Emphasize measurable local outcomes, a clear M&E framework, and existing field partnerships to strengthen the proposal.`,
      ].join("\n");
    case "blog":
      return [
        `Suggested title: What ${q} taught me about doing the work well`,
        "",
        `Opening: For years, ${q} has stayed with me — not as a case study, but as a reminder of how much the field teaches those willing to listen. Here is what I keep coming back to, and why it shapes how we work at CIVICAVITA.`,
      ].join("\n");
    case "content":
      return [
        `Content angles on "${q}":`,
        "",
        `1. Myth vs reality: what people get wrong about ${q}.`,
        `2. A single field story that makes ${q} human.`,
        `3. Three numbers that reframe ${q}.`,
        `4. One practical action a partner can take this week.`,
        `5. A question to invite dialogue: what would change if we treated ${q} as urgent?`,
      ].join("\n");
    default:
      return "";
  }
}

export function AiToolsSection({ language, isRtl }: { language: Language; isRtl: boolean }) {
  const copy = aiCopy[language];
  const [active, setActive] = useState<ToolKey>("report");
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tool = useMemo(() => copy.tools.find((t) => t.key === active)!, [copy, active]);

  const handleRun = async () => {
    if (!input.trim()) return;
    setError(null);
    if (!hasOpenRouter()) {
      setResult(generate(active, input));
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const text = await runOpenRouter(active, input, language);
      setResult(text);
    } catch (e) {
      // Fall back to the local generator if the API call fails.
      setResult(generate(active, input));
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai" className="bg-[#efe4cf] px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-800/70">
            {copy.eyebrow}
          </p>
          <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
            {copy.headline}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#44524d]">{copy.body}</p>
          <p className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/70">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                hasOpenRouter() ? "bg-emerald-600" : "bg-amber-500"
              }`}
            />
            {hasOpenRouter() ? copy.liveBadge : copy.demoBadge}
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          {copy.tools.map((tItem) => (
            <button
              key={tItem.key}
              type="button"
              onClick={() => {
                setActive(tItem.key);
                setResult("");
                setInput("");
              }}
              className={`px-5 py-3 text-sm font-semibold transition ${
                active === tItem.key
                  ? "bg-[#10231f] text-white"
                  : "border border-[#14231e]/18 text-[#14231e] hover:border-[#10231f]/45"
              }`}
            >
              {tItem.tab}
            </button>
          ))}
        </div>

        <div className="mt-8 grid overflow-hidden border border-[#14231e]/14 bg-[#fffaf0] shadow-[0_24px_80px_rgba(20,35,30,0.12)] lg:grid-cols-2">
          <div className={`p-7 sm:p-10 ${isRtl ? "lg:border-l" : "lg:border-r"} border-[#14231e]/12`}>
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">{tool.title}</h3>
            <p className="mt-3 text-base leading-7 text-[#44524d]">{tool.description}</p>
            <label className="mt-8 block text-sm font-semibold uppercase tracking-[0.14em] text-[#6c7a74]">
              {tool.inputLabel}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tool.placeholder}
              rows={4}
              className="mt-2 w-full border border-[#14231e]/20 bg-white px-4 py-3 text-base text-[#14231e] outline-none focus:border-[#10231f]"
            />
            <button
              type="button"
              onClick={handleRun}
              disabled={loading}
              className="mt-6 inline-flex items-center justify-center bg-[#a7f3d0] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#0d211b] transition hover:bg-[#10231f] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? copy.loading : tool.button}
            </button>
          </div>

          <div className="flex min-h-[320px] flex-col p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800/70">
              {tool.resultLabel}
            </p>
            <pre className="mt-5 flex-1 whitespace-pre-wrap font-sans text-base leading-7 text-[#14231e]">
              {loading ? copy.loading : result || tool.emptyResult}
            </pre>
            {error && (
              <p className="mt-4 text-xs font-medium text-amber-700">
                {copy.errorPrefix}: {error}
              </p>
            )}
            <p className="mt-6 border-t border-[#14231e]/12 pt-5 text-xs text-[#8a958f]">
              {copy.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
