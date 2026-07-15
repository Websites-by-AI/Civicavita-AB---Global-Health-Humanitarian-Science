import { useEffect, useMemo, useState } from "react";
import { AdminPanel, JournalSection, usePosts } from "./blog";
import { AiToolsSection } from "./aitools";

type Language = "en" | "fa" | "ar" | "sv";
type FocusArea = "outbreak" | "climate" | "nutrition";
type Phase = "assess" | "mobilize" | "scale";

type Capability = {
  title: string;
  body: string;
};

type FounderCopy = {
  eyebrow: string;
  name: string;
  role: string;
  headline: string;
  body: string;
  details: string[];
  expertiseLabel: string;
  expertise: string[];
  experienceLabel: string;
  experience: Array<{ period: string; text: string }>;
  educationLabel: string;
  education: string[];
  languagesLabel: string;
  languages: string[];
  linkLabel: string;
};

type Copy = {
  meta: {
    locale: string;
    dir: "ltr" | "rtl";
  };
  nav: {
    method: string;
    founder: string;
    ai: string;
    journal: string;
    studio: string;
    contact: string;
    language: string;
  };
  hero: {
    imageAlt: string;
    headline: string;
    subhead: string;
    primaryCta: string;
    secondaryCta: string;
  };
  method: {
    eyebrow: string;
    headline: string;
    capabilities: Capability[];
  };
  founder: FounderCopy;
  model: {
    eyebrow: string;
    headline: string;
    body: string;
    signals: string[];
  };
  studio: {
    eyebrow: string;
    headline: string;
    body: string;
    focusLegend: string;
    phaseLegend: string;
    suggestedBrief: string;
    recommendedPrograms: string;
    briefTitles: Record<FocusArea, Record<Phase, string>>;
    programs: string[];
  };
  contact: {
    eyebrow: string;
    headline: string;
    cta: string;
  };
  focusLabels: Record<FocusArea, string>;
  phaseLabels: Record<Phase, string>;
  briefs: Record<FocusArea, Record<Phase, string>>;
};

const heroImage =
  "https://images.pexels.com/photos/30313899/pexels-photo-30313899.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1100&w=1900";

const languageOptions: Array<{ code: Language; label: string; name: string }> = [
  { code: "en", label: "EN", name: "English" },
  { code: "fa", label: "Persian", name: "Persian / فارسی" },
  { code: "ar", label: "العربية", name: "Arabic" },
  { code: "sv", label: "SV", name: "Swedish" },
];

const translations: Record<Language, Copy> = {
  en: {
    meta: { locale: "en", dir: "ltr" },
    nav: {
      method: "Method",
      founder: "About us",
      ai: "AI",
      journal: "Journal",
      studio: "Studio",
      contact: "Contact",
      language: "Language",
    },
    hero: {
      imageAlt: "Healthcare professionals consulting during a field health mission",
      headline: "Global health, humanitarian science, and AI for lives in motion.",
      subhead:
        "We help health and humanitarian teams turn evidence, field realities, and responsible AI into clear decisions when the stakes are high.",
      primaryCta: "Build an impact brief",
      secondaryCta: "Explore the method",
    },
    method: {
      eyebrow: "Method",
      headline: "Science only matters when it survives contact with the field.",
      capabilities: [
        {
          title: "Evidence to action",
          body: "Rapid reviews, implementation research, and decision briefs that help teams move without losing scientific rigor.",
        },
        {
          title: "Humanitarian operations",
          body: "Field-ready coordination models for health, WASH, logistics, shelter, and community engagement teams.",
        },
        {
          title: "Responsible AI workflows",
          body: "Tools for grants, reports, videos, and knowledge products with clear review loops and safeguards.",
        },
      ],
    },
    founder: {
      eyebrow: "About us",
      name: "Sahar Motallebi, MD, MSc",
      role: "Founder and Researcher at CIVICAVITA AB",
      headline:
        "CIVICAVITA AB is a founder-led research and public health practice built around field evidence, humanitarian delivery, and trusted communication.",
      body: "The company is shaped by Sahar Motallebi's medical training, international public health expertise, and more than 18 years of work with ministries, NGOs, WHO, UNICEF, UNDP, and community organizations across the Middle East, Africa, Asia, and Europe.",
      details: [
        "Former technical and program roles with WHO, UNDP, UN Women, and humanitarian partners.",
        "Experience in Iran, Iraq, Sudan, Somalia, Kenya, Pakistan, Afghanistan, Sri Lanka, Germany, Switzerland, and Sweden.",
        "Education includes an MD from Tehran University and an MSc in International Public Health from Lund University.",
      ],
      expertiseLabel: "Core expertise",
      expertise: [
        "Disaster management",
        "Program design and M&E",
        "Health systems strengthening",
        "Resource mobilization and grants",
        "Women health and protection",
        "Community mobilization",
      ],
      experienceLabel: "Professional experience",
      experience: [
        { period: "2022 – Present", text: "Founder and Researcher, CIVICAVITA AB (Sweden)" },
        { period: "2012 – 2013", text: "Project Coordinator for Women Protection (EVAW), UN Women, Afghanistan" },
        { period: "2010 – 2011", text: "Program Specialist, UNICEF Eastern Zonal Office, Afghanistan" },
        { period: "2009 – 2010", text: "Head of Health and Nutrition Program, UNICEF, Somalia" },
        { period: "2007 – 2008", text: "Head of Sub-office, Blue Nile State, WHO, Sudan" },
        { period: "2000 – 2007", text: "Disaster Planning Advisor and Emergency Physician, Ministry of Health / WHO, Iran" },
      ],
      educationLabel: "Education",
      education: [
        "MSc in International Public Health, Lund University, Sweden",
        "Doctorate in Medicine (MD), Tehran University of Medical Sciences, Iran",
        "Graduate studies in disaster risk reduction (University of Copenhagen) and health district management (Basel University)",
      ],
      languagesLabel: "Languages",
      languages: ["Persian (native)", "Azeri (native)", "English (fluent)", "Arabic", "French"],
      linkLabel: "View LinkedIn profile",
    },
    model: {
      eyebrow: "Why CIVICAVITA",
      headline: "A new company built on two decades of hard-won field trust.",
      body: "CIVICAVITA AB is deliberately young and founder-led. Our value is not scale, but the depth of experience behind every decision: 18+ years across ministries, NGOs, and UN agencies, applied with care to each partner we serve.",
      signals: [
        "Founder-led senior expertise on every engagement, not junior hand-offs",
        "Global health research translated into decisions frontline teams can act on",
        "Humanitarian programs designed around real local delivery, not templates",
        "Responsible AI that speeds up the work while experts keep the judgement",
      ],
    },
    studio: {
      eyebrow: "Impact studio",
      headline: "Shape a field-ready brief in seconds.",
      body: "The original app had many AI utilities. This version gives visitors one clear interaction that demonstrates the value before asking for deeper commitment.",
      focusLegend: "Choose a focus",
      phaseLegend: "Select a phase",
      suggestedBrief: "Suggested brief",
      recommendedPrograms: "Recommended programs",
      briefTitles: {
        outbreak: {
          assess: "Outbreak intelligence: assess the next move.",
          mobilize: "Outbreak intelligence: mobilize the next move.",
          scale: "Outbreak intelligence: scale the next move.",
        },
        climate: {
          assess: "Climate-health resilience: assess the next move.",
          mobilize: "Climate-health resilience: mobilize the next move.",
          scale: "Climate-health resilience: scale the next move.",
        },
        nutrition: {
          assess: "Nutrition and care access: assess the next move.",
          mobilize: "Nutrition and care access: mobilize the next move.",
          scale: "Nutrition and care access: scale the next move.",
        },
      },
      programs: [
        "Grant and proposal intelligence",
        "Crisis learning cells",
        "Field evidence dashboards",
        "Health impact storytelling",
      ],
    },
    contact: {
      eyebrow: "Next step",
      headline: "Bring the mission into focus.",
      cta: "Start a conversation",
    },
    focusLabels: {
      outbreak: "Outbreak intelligence",
      climate: "Climate-health resilience",
      nutrition: "Nutrition and care access",
    },
    phaseLabels: {
      assess: "Assess",
      mobilize: "Mobilize",
      scale: "Scale",
    },
    briefs: {
      outbreak: {
        assess:
          "Map facility readiness, surveillance gaps, referral pathways, and community trust signals before the first field sprint.",
        mobilize:
          "Stand up an incident learning cell that turns epidemiology, logistics, and local feedback into daily decisions.",
        scale:
          "Package protocols, training assets, and supply forecasts so regional teams can replicate the response safely.",
      },
      climate: {
        assess:
          "Combine vulnerability mapping, seasonal risk data, and local knowledge to identify communities facing compounding health threats.",
        mobilize:
          "Coordinate water, shelter, vector control, and primary care partners around a single climate-health operating picture.",
        scale:
          "Create adaptation playbooks that help governments and NGOs fund, monitor, and sustain resilience programs.",
      },
      nutrition: {
        assess:
          "Trace food security, maternal health, market access, and screening coverage to reveal where malnutrition risk is accelerating.",
        mobilize:
          "Align procurement, outreach, and clinical pathways so children and caregivers move quickly from screening to support.",
        scale:
          "Convert lessons into dashboards, grant narratives, and partner training that expand coverage without losing quality.",
      },
    },
  },
  fa: {
    meta: { locale: "fa", dir: "rtl" },
    nav: {
      method: "روش کار",
      founder: "درباره ما",
      ai: "هوش مصنوعی",
      journal: "دفتر یادداشت",
      studio: "استودیو",
      contact: "تماس",
      language: "زبان",
    },
    hero: {
      imageAlt: "متخصصان سلامت در حال مشورت در یک ماموریت میدانی",
      headline: "سلامت جهانی، علم بشردوستانه و هوش مصنوعی برای زندگی در حرکت.",
      subhead:
        "ما به تیم های سلامت و بشردوستانه کمک می کنیم شواهد، واقعیت های میدان و هوش مصنوعی مسئولانه را در لحظه های حساس به تصمیم های روشن تبدیل کنند.",
      primaryCta: "ساخت خلاصه اثرگذاری",
      secondaryCta: "دیدن روش کار",
    },
    method: {
      eyebrow: "روش کار",
      headline: "علم زمانی ارزش دارد که در تماس با میدان نیز کار کند.",
      capabilities: [
        {
          title: "از شواهد تا اقدام",
          body: "مرورهای سریع، پژوهش اجرایی و خلاصه های تصمیم ساز که به تیم ها کمک می کند بدون کاهش دقت علمی حرکت کنند.",
        },
        {
          title: "عملیات بشردوستانه",
          body: "مدل های هماهنگی آماده میدان برای سلامت، آب و بهداشت، لجستیک، سرپناه و مشارکت جامعه.",
        },
        {
          title: "جریان کار هوش مصنوعی مسئولانه",
          body: "ابزارهایی برای گرنت، گزارش، ویدیو و محصولات دانشی همراه با حلقه های بازبینی و محافظت روشن.",
        },
      ],
    },
    founder: {
      eyebrow: "درباره ما",
      name: "سحر مطلبی، پزشک و کارشناس ارشد سلامت عمومی بین الملل",
      role: "بنیان گذار و پژوهشگر در CIVICAVITA AB",
      headline:
        "CIVICAVITA AB یک مجموعه پژوهشی و سلامت عمومی به رهبری بنیان گذار است که بر شواهد میدانی، اجرای بشردوستانه و ارتباطات قابل اعتماد تکیه دارد.",
      body: "این شرکت با آموزش پزشکی، تخصص سلامت عمومی بین الملل و بیش از ۱۸ سال تجربه سحر مطلبی در همکاری با وزارتخانه ها، سازمان های مردم نهاد، WHO، UNICEF، UNDP و نهادهای جامعه محور در خاورمیانه، آفریقا، آسیا و اروپا شکل گرفته است.",
      details: [
        "سابقه نقش های فنی و برنامه ای با WHO، UNDP، UN Women و شریکان بشردوستانه.",
        "تجربه در ایران، عراق، سودان، سومالی، کنیا، پاکستان، افغانستان، سریلانکا، آلمان، سوئیس و سوئد.",
        "دارای مدرک پزشکی از دانشگاه تهران و کارشناسی ارشد سلامت عمومی بین الملل از دانشگاه لوند.",
      ],
      expertiseLabel: "حوزه های تخصصی",
      expertise: [
        "مدیریت بحران",
        "طراحی برنامه و پایش و ارزیابی",
        "تقویت نظام سلامت",
        "جذب منابع و مدیریت گرنت",
        "سلامت زنان و حمایت",
        "بسیج اجتماعی جامعه",
      ],
      experienceLabel: "تجربه حرفه ای",
      experience: [
        { period: "۲۰۲۲ – اکنون", text: "بنیان گذار و پژوهشگر، CIVICAVITA AB (سوئد)" },
        { period: "۲۰۱۲ – ۲۰۱۳", text: "هماهنگ کننده پروژه حمایت از زنان (EVAW)، UN Women، افغانستان" },
        { period: "۲۰۱۰ – ۲۰۱۱", text: "کارشناس برنامه، دفتر منطقه ای شرق یونیسف، افغانستان" },
        { period: "۲۰۰۹ – ۲۰۱۰", text: "مسئول برنامه سلامت و تغذیه، یونیسف، سومالی" },
        { period: "۲۰۰۷ – ۲۰۰۸", text: "مسئول دفتر ایالت نیل آبی، WHO، سودان" },
        { period: "۲۰۰۰ – ۲۰۰۷", text: "مشاور برنامه ریزی بحران و پزشک اورژانس، وزارت بهداشت / WHO، ایران" },
      ],
      educationLabel: "تحصیلات",
      education: [
        "کارشناسی ارشد سلامت عمومی بین الملل، دانشگاه لوند، سوئد",
        "دکترای پزشکی، دانشگاه علوم پزشکی تهران، ایران",
        "دوره های تکمیلی کاهش ریسک بلایا (دانشگاه کپنهاگ) و مدیریت منطقه ای سلامت (دانشگاه بازل)",
      ],
      languagesLabel: "زبان ها",
      languages: ["فارسی (مادری)", "آذری (مادری)", "انگلیسی (روان)", "عربی", "فرانسه"],
      linkLabel: "مشاهده پروفایل لینکدین",
    },
    model: {
      eyebrow: "چرا CIVICAVITA",
      headline: "شرکتی نوپا که بر بیش از دو دهه اعتماد میدانی بنا شده است.",
      body: "CIVICAVITA AB آگاهانه نوپا و به رهبری بنیان گذار است. ارزش ما اندازه نیست، بلکه عمق تجربه پشت هر تصمیم است: بیش از ۱۸ سال کار با وزارتخانه ها، سازمان های مردم نهاد و آژانس های سازمان ملل.",
      signals: [
        "تخصص ارشد بنیان گذار در هر همکاری، نه واگذاری به نیروهای کم تجربه",
        "ترجمه پژوهش سلامت جهانی به تصمیم های قابل اجرا برای تیم های خط مقدم",
        "طراحی برنامه های بشردوستانه بر اساس اجرای واقعی محلی، نه قالب های آماده",
        "هوش مصنوعی مسئولانه که کار را سریع تر می کند اما قضاوت در دست متخصص می ماند",
      ],
    },
    studio: {
      eyebrow: "استودیوی اثرگذاری",
      headline: "در چند ثانیه یک خلاصه آماده میدان بسازید.",
      body: "نسخه اولیه ابزارهای هوش مصنوعی زیادی داشت. این نسخه یک تعامل روشن ارائه می دهد تا ارزش کار قبل از درخواست تعهد بیشتر دیده شود.",
      focusLegend: "انتخاب حوزه",
      phaseLegend: "انتخاب مرحله",
      suggestedBrief: "خلاصه پیشنهادی",
      recommendedPrograms: "برنامه های پیشنهادی",
      briefTitles: {
        outbreak: {
          assess: "هوشمندی شیوع: ارزیابی حرکت بعدی.",
          mobilize: "هوشمندی شیوع: بسیج حرکت بعدی.",
          scale: "هوشمندی شیوع: گسترش حرکت بعدی.",
        },
        climate: {
          assess: "تاب آوری سلامت اقلیمی: ارزیابی حرکت بعدی.",
          mobilize: "تاب آوری سلامت اقلیمی: بسیج حرکت بعدی.",
          scale: "تاب آوری سلامت اقلیمی: گسترش حرکت بعدی.",
        },
        nutrition: {
          assess: "تغذیه و دسترسی به مراقبت: ارزیابی حرکت بعدی.",
          mobilize: "تغذیه و دسترسی به مراقبت: بسیج حرکت بعدی.",
          scale: "تغذیه و دسترسی به مراقبت: گسترش حرکت بعدی.",
        },
      },
      programs: [
        "هوشمندی گرنت و پروپوزال",
        "سلول های یادگیری بحران",
        "داشبوردهای شواهد میدانی",
        "روایت اثرگذاری سلامت",
      ],
    },
    contact: {
      eyebrow: "گام بعدی",
      headline: "ماموریت را شفاف و متمرکز کنید.",
      cta: "شروع گفتگو",
    },
    focusLabels: {
      outbreak: "هوشمندی شیوع",
      climate: "تاب آوری سلامت اقلیمی",
      nutrition: "تغذیه و دسترسی به مراقبت",
    },
    phaseLabels: {
      assess: "ارزیابی",
      mobilize: "بسیج",
      scale: "گسترش",
    },
    briefs: {
      outbreak: {
        assess:
          "آمادگی مراکز، شکاف های پایش، مسیرهای ارجاع و نشانه های اعتماد جامعه را پیش از نخستین حرکت میدانی نقشه برداری کنید.",
        mobilize:
          "یک سلول یادگیری حادثه ایجاد کنید تا اپیدمیولوژی، لجستیک و بازخورد محلی را به تصمیم های روزانه تبدیل کند.",
        scale:
          "پروتکل ها، دارایی های آموزشی و پیش بینی های زنجیره تامین را بسته بندی کنید تا تیم های منطقه ای پاسخ را ایمن تکرار کنند.",
      },
      climate: {
        assess:
          "نقشه آسیب پذیری، داده های ریسک فصلی و دانش محلی را ترکیب کنید تا جوامع در معرض تهدیدهای ترکیبی سلامت شناسایی شوند.",
        mobilize:
          "شرکای آب، سرپناه، کنترل ناقلان و مراقبت اولیه را پیرامون یک تصویر عملیاتی سلامت اقلیمی هماهنگ کنید.",
        scale:
          "راهنماهای سازگاری بسازید تا دولت ها و سازمان ها بتوانند برنامه های تاب آوری را تامین مالی، پایش و پایدار کنند.",
      },
      nutrition: {
        assess:
          "امنیت غذایی، سلامت مادر، دسترسی بازار و پوشش غربالگری را دنبال کنید تا نقاط شتاب خطر سوءتغذیه آشکار شود.",
        mobilize:
          "تدارکات، ارتباط با جامعه و مسیرهای بالینی را همسو کنید تا کودکان و مراقبان سریع از غربالگری به حمایت برسند.",
        scale:
          "درس آموخته ها را به داشبورد، روایت گرنت و آموزش شریکان تبدیل کنید تا پوشش بدون افت کیفیت گسترش یابد.",
      },
    },
  },
  ar: {
    meta: { locale: "ar", dir: "rtl" },
    nav: {
      method: "المنهج",
      founder: "من نحن",
      ai: "الذكاء الاصطناعي",
      journal: "المدونة",
      studio: "الاستوديو",
      contact: "تواصل",
      language: "اللغة",
    },
    hero: {
      imageAlt: "مختصون في الصحة يتشاورون خلال مهمة صحية ميدانية",
      headline: "الصحة العالمية، العلم الإنساني، والذكاء الاصطناعي لحياة تتحرك.",
      subhead:
        "نساعد فرق الصحة والعمل الإنساني على تحويل الأدلة وواقع الميدان والذكاء الاصطناعي المسؤول إلى قرارات واضحة عندما تكون المخاطر عالية.",
      primaryCta: "ابن موجز أثر",
      secondaryCta: "استكشف المنهج",
    },
    method: {
      eyebrow: "المنهج",
      headline: "لا تكون للعلم قيمة إلا عندما يصمد أمام واقع الميدان.",
      capabilities: [
        {
          title: "من الدليل إلى العمل",
          body: "مراجعات سريعة وبحوث تنفيذية وموجزات قرار تساعد الفرق على التحرك دون فقدان الصرامة العلمية.",
        },
        {
          title: "عمليات إنسانية",
          body: "نماذج تنسيق جاهزة للميدان لفرق الصحة والمياه والصرف الصحي واللوجستيات والمأوى والتواصل المجتمعي.",
        },
        {
          title: "مسارات ذكاء اصطناعي مسؤولة",
          body: "أدوات للمنح والتقارير والفيديو ومنتجات المعرفة مع حلقات مراجعة وضوابط واضحة.",
        },
      ],
    },
    founder: {
      eyebrow: "من نحن",
      name: "سحر مطلبي، طبيبة وماجستير صحة عامة دولية",
      role: "المؤسسة والباحثة في CIVICAVITA AB",
      headline:
        "CIVICAVITA AB ممارسة بحثية وصحية عامة تقودها المؤسسة، وتقوم على الأدلة الميدانية والتنفيذ الإنساني والتواصل الموثوق.",
      body: "تتشكل الشركة من تدريب سحر مطلبي الطبي وخبرتها في الصحة العامة الدولية وأكثر من 18 عاما من العمل مع الوزارات والمنظمات غير الحكومية و WHO و UNICEF و UNDP والمنظمات المجتمعية في الشرق الأوسط وأفريقيا وآسيا وأوروبا.",
      details: [
        "أدوار فنية وبرنامجية سابقة مع WHO و UNDP و UN Women وشركاء إنسانيين.",
        "خبرة في إيران والعراق والسودان والصومال وكينيا وباكستان وأفغانستان وسريلانكا وألمانيا وسويسرا والسويد.",
        "تحمل درجة الطب من جامعة طهران وماجستير الصحة العامة الدولية من جامعة لوند.",
      ],
      expertiseLabel: "مجالات الخبرة",
      expertise: [
        "إدارة الكوارث",
        "تصميم البرامج والرصد والتقييم",
        "تعزيز النظم الصحية",
        "حشد الموارد وإدارة المنح",
        "صحة المرأة والحماية",
        "التعبئة المجتمعية",
      ],
      experienceLabel: "الخبرة المهنية",
      experience: [
        { period: "2022 – الآن", text: "المؤسسة والباحثة، CIVICAVITA AB (السويد)" },
        { period: "2012 – 2013", text: "منسقة مشروع حماية المرأة (EVAW)، UN Women، أفغانستان" },
        { period: "2010 – 2011", text: "أخصائية برامج، المكتب الإقليمي الشرقي لليونيسف، أفغانستان" },
        { period: "2009 – 2010", text: "رئيسة برنامج الصحة والتغذية، اليونيسف، الصومال" },
        { period: "2007 – 2008", text: "رئيسة المكتب الفرعي، ولاية النيل الأزرق، WHO، السودان" },
        { period: "2000 – 2007", text: "مستشارة تخطيط الكوارث وطبيبة طوارئ، وزارة الصحة / WHO، إيران" },
      ],
      educationLabel: "التعليم",
      education: [
        "ماجستير الصحة العامة الدولية، جامعة لوند، السويد",
        "دكتوراه في الطب، جامعة طهران للعلوم الطبية، إيران",
        "دراسات عليا في الحد من مخاطر الكوارث (جامعة كوبنهاجن) وإدارة الأقاليم الصحية (جامعة بازل)",
      ],
      languagesLabel: "اللغات",
      languages: ["الفارسية (الأم)", "الأذرية (الأم)", "الإنجليزية (بطلاقة)", "العربية", "الفرنسية"],
      linkLabel: "عرض ملف لينكدإن",
    },
    model: {
      eyebrow: "لماذا CIVICAVITA",
      headline: "شركة جديدة مبنية على أكثر من عقدين من الثقة الميدانية.",
      body: "شركة CIVICAVITA AB حديثة عن قصد وتقودها المؤسِّسة. قيمتنا ليست الحجم، بل عمق الخبرة خلف كل قرار: أكثر من 18 عاما مع الوزارات والمنظمات غير الحكومية ووكالات الأمم المتحدة.",
      signals: [
        "خبرة قيادية للمؤسِّسة في كل مشروع، وليس إحالة لموظفين مبتدئين",
        "ترجمة أبحاث الصحة العالمية إلى قرارات قابلة للتنفيذ للفرق الميدانية",
        "برامج إنسانية مصممة حول التنفيذ المحلي الحقيقي وليس القوالب الجاهزة",
        "ذكاء اصطناعي مسؤول يسرّع العمل بينما يبقى الحكم بيد الخبراء",
      ],
    },
    studio: {
      eyebrow: "استوديو الأثر",
      headline: "شكّل موجزا جاهزا للميدان خلال ثوان.",
      body: "كان التطبيق الأصلي يضم أدوات ذكاء اصطناعي كثيرة. هذه النسخة تقدم تفاعلا واحدا واضحا يبين القيمة قبل طلب التزام أعمق.",
      focusLegend: "اختر مجال التركيز",
      phaseLegend: "اختر المرحلة",
      suggestedBrief: "الموجز المقترح",
      recommendedPrograms: "البرامج المقترحة",
      briefTitles: {
        outbreak: {
          assess: "استخبارات التفشي: تقييم الخطوة التالية.",
          mobilize: "استخبارات التفشي: حشد الخطوة التالية.",
          scale: "استخبارات التفشي: توسيع الخطوة التالية.",
        },
        climate: {
          assess: "مرونة الصحة والمناخ: تقييم الخطوة التالية.",
          mobilize: "مرونة الصحة والمناخ: حشد الخطوة التالية.",
          scale: "مرونة الصحة والمناخ: توسيع الخطوة التالية.",
        },
        nutrition: {
          assess: "التغذية والوصول إلى الرعاية: تقييم الخطوة التالية.",
          mobilize: "التغذية والوصول إلى الرعاية: حشد الخطوة التالية.",
          scale: "التغذية والوصول إلى الرعاية: توسيع الخطوة التالية.",
        },
      },
      programs: [
        "استخبارات المنح والمقترحات",
        "خلايا تعلم الأزمات",
        "لوحات أدلة ميدانية",
        "سرد أثر الصحة",
      ],
    },
    contact: {
      eyebrow: "الخطوة التالية",
      headline: "اجعل المهمة واضحة ومركزة.",
      cta: "ابدأ محادثة",
    },
    focusLabels: {
      outbreak: "استخبارات التفشي",
      climate: "مرونة الصحة والمناخ",
      nutrition: "التغذية والوصول إلى الرعاية",
    },
    phaseLabels: {
      assess: "تقييم",
      mobilize: "حشد",
      scale: "توسيع",
    },
    briefs: {
      outbreak: {
        assess:
          "ارسم جاهزية المرافق وفجوات الترصد ومسارات الإحالة وإشارات ثقة المجتمع قبل أول اندفاع ميداني.",
        mobilize:
          "أنشئ خلية تعلم للحادث تحول الوبائيات واللوجستيات والتغذية الراجعة المحلية إلى قرارات يومية.",
        scale:
          "حزم البروتوكولات ومواد التدريب وتوقعات الإمداد كي تستطيع الفرق الإقليمية تكرار الاستجابة بأمان.",
      },
      climate: {
        assess:
          "اجمع خرائط الهشاشة وبيانات المخاطر الموسمية والمعرفة المحلية لتحديد المجتمعات التي تواجه تهديدات صحية متراكبة.",
        mobilize:
          "نسق شركاء المياه والمأوى ومكافحة النواقل والرعاية الأولية حول صورة تشغيلية واحدة للصحة والمناخ.",
        scale:
          "أنشئ أدلة تكيف تساعد الحكومات والمنظمات على تمويل برامج المرونة ومراقبتها واستدامتها.",
      },
      nutrition: {
        assess:
          "تتبع الأمن الغذائي وصحة الأم والوصول إلى الأسواق وتغطية الفحص لكشف أماكن تسارع خطر سوء التغذية.",
        mobilize:
          "وائم المشتريات والتواصل والمسارات السريرية كي ينتقل الأطفال ومقدمو الرعاية بسرعة من الفحص إلى الدعم.",
        scale:
          "حوّل الدروس إلى لوحات متابعة وسرد للمنح وتدريب للشركاء لتوسيع التغطية دون خسارة الجودة.",
      },
    },
  },
  sv: {
    meta: { locale: "sv", dir: "ltr" },
    nav: {
      method: "Metod",
      founder: "Om oss",
      ai: "AI",
      journal: "Journal",
      studio: "Studio",
      contact: "Kontakt",
      language: "Sprak",
    },
    hero: {
      imageAlt: "Vardpersonal samtalar under ett faltbaserat halsouppdrag",
      headline: "Global halsa, humanitar vetenskap och AI for liv i rorelse.",
      subhead:
        "Vi hjalper halso- och humanitara team att omvandla evidens, faltverklighet och ansvarsfull AI till tydliga beslut nar insatsen ar hog.",
      primaryCta: "Skapa en effektbrief",
      secondaryCta: "Utforska metoden",
    },
    method: {
      eyebrow: "Metod",
      headline: "Vetenskap spelar roll forst nar den fungerar i motet med faltet.",
      capabilities: [
        {
          title: "Evidens till handling",
          body: "Snabba oversikter, implementeringsforskning och beslutsunderlag som hjalper team att agera utan att tappa vetenskaplig skarpa.",
        },
        {
          title: "Humanitara insatser",
          body: "Faltklara samordningsmodeller for halsa, WASH, logistik, skydd och dialog med lokalsamhallen.",
        },
        {
          title: "Ansvarsfulla AI-floden",
          body: "Verktyg for bidrag, rapporter, video och kunskapsprodukter med tydliga granskningsloopar och skyddsracken.",
        },
      ],
    },
    founder: {
      eyebrow: "Om oss",
      name: "Sahar Motallebi, MD, MSc",
      role: "Grundare och forskare vid CIVICAVITA AB",
      headline:
        "CIVICAVITA AB ar en grundarledd forsknings- och folkhalsoverksamhet byggd kring faltevidens, humanitart genomforande och trovärdig kommunikation.",
      body: "Foretaget formas av Sahar Motallebis medicinska utbildning, internationella folkhalsokompetens och mer an 18 ars arbete med ministerier, civilsamhällesorganisationer, WHO, UNICEF, UNDP och lokala aktorer i Mellanostern, Afrika, Asien och Europa.",
      details: [
        "Tidigare tekniska roller och programroller med WHO, UNDP, UN Women och humanitara partner.",
        "Erfarenhet fran Iran, Irak, Sudan, Somalia, Kenya, Pakistan, Afghanistan, Sri Lanka, Tyskland, Schweiz och Sverige.",
        "Utbildad lakare vid Teherans universitet och MSc i International Public Health fran Lunds universitet.",
      ],
      expertiseLabel: "Karnkompetens",
      expertise: [
        "Katastrofhantering",
        "Programdesign och M&E",
        "Starkta halsosystem",
        "Resursmobilisering och bidrag",
        "Kvinnors halsa och skydd",
        "Social mobilisering",
      ],
      experienceLabel: "Yrkeserfarenhet",
      experience: [
        { period: "2022 – Nu", text: "Grundare och forskare, CIVICAVITA AB (Sverige)" },
        { period: "2012 – 2013", text: "Projektsamordnare for kvinnoskydd (EVAW), UN Women, Afghanistan" },
        { period: "2010 – 2011", text: "Programspecialist, UNICEF ostra regionkontoret, Afghanistan" },
        { period: "2009 – 2010", text: "Chef for halso- och nutritionsprogram, UNICEF, Somalia" },
        { period: "2007 – 2008", text: "Chef for underkontor, Blue Nile State, WHO, Sudan" },
        { period: "2000 – 2007", text: "Radgivare i katastrofplanering och akutlakare, halsoministeriet / WHO, Iran" },
      ],
      educationLabel: "Utbildning",
      education: [
        "MSc i International Public Health, Lunds universitet, Sverige",
        "Lakarexamen (MD), Teherans universitet for medicinska vetenskaper, Iran",
        "Vidareutbildning i katastrofriskreducering (Kopenhamns universitet) och halsodistriktsledning (Basels universitet)",
      ],
      languagesLabel: "Sprak",
      languages: ["Persiska (modersmal)", "Azeriska (modersmal)", "Engelska (flytande)", "Arabiska", "Franska"],
      linkLabel: "Visa LinkedIn-profil",
    },
    model: {
      eyebrow: "Varfor CIVICAVITA",
      headline: "Ett nytt foretag byggt pa over tva decennier av faltfortroende.",
      body: "CIVICAVITA AB ar medvetet ungt och grundarlett. Vart varde ar inte storlek utan djupet av erfarenhet bakom varje beslut: over 18 ars arbete med ministerier, organisationer och FN-organ.",
      signals: [
        "Senior grundarkompetens i varje uppdrag, inte overlamning till juniorer",
        "Global halsaforskning oversatt till beslut som frontlinjeteam kan agera pa",
        "Humanitara program formade efter verkligt lokalt genomforande, inte mallar",
        "Ansvarsfull AI som snabbar upp arbetet medan experter behaller omdomet",
      ],
    },
    studio: {
      eyebrow: "Effektstudio",
      headline: "Forma en faltklar brief pa nagra sekunder.",
      body: "Den ursprungliga appen hade manga AI-verktyg. Den har versionen ger besokaren en tydlig interaktion som visar vardet innan nasta steg.",
      focusLegend: "Valj fokus",
      phaseLegend: "Valj fas",
      suggestedBrief: "Foreslagen brief",
      recommendedPrograms: "Rekommenderade program",
      briefTitles: {
        outbreak: {
          assess: "Utbrottsanalys: bedom nasta steg.",
          mobilize: "Utbrottsanalys: mobilisera nasta steg.",
          scale: "Utbrottsanalys: skala nasta steg.",
        },
        climate: {
          assess: "Klimat och halsa: bedom nasta steg.",
          mobilize: "Klimat och halsa: mobilisera nasta steg.",
          scale: "Klimat och halsa: skala nasta steg.",
        },
        nutrition: {
          assess: "Nutrition och vardtillgang: bedom nasta steg.",
          mobilize: "Nutrition och vardtillgang: mobilisera nasta steg.",
          scale: "Nutrition och vardtillgang: skala nasta steg.",
        },
      },
      programs: [
        "Bidrags- och forslagspaning",
        "Krisens larandeceller",
        "Faltbaserade evidenspaneler",
        "Berattelser om halsoeffekt",
      ],
    },
    contact: {
      eyebrow: "Nasta steg",
      headline: "Gor uppdraget tydligt.",
      cta: "Starta ett samtal",
    },
    focusLabels: {
      outbreak: "Utbrottsanalys",
      climate: "Klimat och halsa",
      nutrition: "Nutrition och vardtillgang",
    },
    phaseLabels: {
      assess: "Bedom",
      mobilize: "Mobilisera",
      scale: "Skala",
    },
    briefs: {
      outbreak: {
        assess:
          "Kartlagg vardkapacitet, overvakningsluckor, remissvagar och fortroendesignaler innan forsta faltinsatsen.",
        mobilize:
          "Starta en larandecell som gor epidemiologi, logistik och lokal feedback till dagliga beslut.",
        scale:
          "Paketera protokoll, utbildningsmaterial och forsorjningsprognoser sa regionala team kan upprepa insatsen sakert.",
      },
      climate: {
        assess:
          "Kombinera sarbarhetskartor, sasongsrisker och lokal kunskap for att hitta grupper som moter sammansatta halsohot.",
        mobilize:
          "Samordna vatten, skydd, vektorkontroll och primarvard runt en gemensam operativ bild for klimat och halsa.",
        scale:
          "Skapa anpassningsguider som hjalper myndigheter och organisationer att finansiera, folja upp och halla i resiliensprogram.",
      },
      nutrition: {
        assess:
          "Folj livsmedelssakerhet, modrahalsa, marknadstillgang och screening for att se var risken for undernaring accelererar.",
        mobilize:
          "Samordna inkop, uppsokande arbete och kliniska vagar sa barn och vardgivare snabbt gar fran screening till stod.",
        scale:
          "Gor lardomar till dashboards, bidragsberattelser och partnerutbildning som okar rackvidd utan att tappa kvalitet.",
      },
    },
  },
};

const focusKeys: FocusArea[] = ["outbreak", "climate", "nutrition"];
const phaseKeys: Phase[] = ["assess", "mobilize", "scale"];

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [focus, setFocus] = useState<FocusArea>("outbreak");
  const [phase, setPhase] = useState<Phase>("assess");
  const [adminOpen, setAdminOpen] = useState(false);
  const { posts, addPost, deletePost, resetPosts, editPost } = usePosts();
  const copy = translations[language];
  const isRtl = copy.meta.dir === "rtl";
  const brief = useMemo(() => copy.briefs[focus][phase], [copy, focus, phase]);

  useEffect(() => {
    document.documentElement.lang = copy.meta.locale;
    document.documentElement.dir = copy.meta.dir;
  }, [copy.meta.dir, copy.meta.locale]);

  return (
    <main
      lang={copy.meta.locale}
      dir={copy.meta.dir}
      className="min-h-screen bg-[#f7f2e8] text-[#14231e] antialiased"
    >
      <section className="relative flex min-h-screen overflow-hidden bg-[#10231f] text-white">
        <img
          src={heroImage}
          alt={copy.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-70 motion-safe:animate-[slowZoom_18s_ease-in-out_infinite_alternate]"
        />
        <div
          className={`absolute inset-0 ${
            isRtl ? "bg-gradient-to-l" : "bg-gradient-to-r"
          } from-[#071512]/90 via-[#071512]/56 to-[#071512]/12`}
        />

        <div className="relative z-10 flex w-full flex-col">
          <header className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-6 py-7 sm:px-10">
            <a href="#top" className="text-lg font-semibold tracking-[0.24em] text-white">
              CIVICAVITA AB
            </a>
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/78 md:gap-8">
              <nav className="hidden items-center gap-6 lg:flex">
                <a className="transition hover:text-white" href="#method">
                  {copy.nav.method}
                </a>
                <a className="transition hover:text-white" href="#about">
                  {copy.nav.founder}
                </a>
                <a className="transition hover:text-white" href="#ai">
                  {copy.nav.ai}
                </a>
                <a className="transition hover:text-white" href="#journal">
                  {copy.nav.journal}
                </a>
                <a className="transition hover:text-white" href="#studio">
                  {copy.nav.studio}
                </a>
                <a className="transition hover:text-white" href="#contact">
                  {copy.nav.contact}
                </a>
              </nav>
              <div className="flex items-center gap-2" aria-label={copy.nav.language}>
                {languageOptions.map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => setLanguage(option.code)}
                    className={`px-3 py-2 text-xs font-semibold transition ${
                      language === option.code
                        ? "bg-white text-[#10231f]"
                        : "border border-white/25 text-white/75 hover:border-white hover:text-white"
                    }`}
                    aria-pressed={language === option.code}
                    title={option.name}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div id="top" className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 pb-16 pt-10 sm:px-10">
            <div className="max-w-4xl motion-safe:animate-[riseIn_900ms_ease-out_both]">
              <p className="mb-6 text-xl font-medium tracking-[0.32em] text-[#a7f3d0] sm:text-2xl">
                CIVICAVITA AB
              </p>
              <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                {copy.hero.headline}
              </h1>
              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/78 sm:text-xl">
                {copy.hero.subhead}
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#studio"
                  className="inline-flex items-center justify-center bg-[#a7f3d0] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#0d211b] transition hover:bg-white"
                >
                  {copy.hero.primaryCta}
                </a>
                <a
                  href="#method"
                  className="inline-flex items-center justify-center border border-white/35 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
                >
                  {copy.hero.secondaryCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="method" className="px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="motion-safe:animate-[fadeUp_900ms_ease-out_both]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-800/70">
              {copy.method.eyebrow}
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#14231e] sm:text-6xl">
              {copy.method.headline}
            </h2>
          </div>

          <div className="space-y-12">
            {copy.method.capabilities.map((item, index) => (
              <article
                key={item.title}
                className="group border-t border-[#14231e]/18 pt-8 motion-safe:animate-[fadeUp_900ms_ease-out_both]"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="grid gap-4 md:grid-cols-[0.38fr_0.62fr] md:gap-10">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[#14231e]">
                    {item.title}
                  </h3>
                  <p className="max-w-2xl text-lg leading-8 text-[#44524d] transition group-hover:text-[#14231e]">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-[#efe4cf] px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="motion-safe:animate-[fadeUp_900ms_ease-out_both]">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-800/70">
              {copy.founder.eyebrow}
            </p>
            <img
              src="/images/sahar-motallebi.jpg"
              alt={copy.founder.name}
              className="mt-8 h-48 w-48 rounded-full border-4 border-white object-cover shadow-[0_18px_50px_rgba(20,35,30,0.28)]"
            />
            <h2 className="mt-8 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#14231e] sm:text-6xl">
              CIVICAVITA AB
            </h2>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#14231e]">
              {copy.founder.name}
            </p>
            <p className="mt-2 text-xl font-medium text-emerald-900/80">{copy.founder.role}</p>
          </div>

          <div>
            <p className="max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.035em] text-[#14231e] sm:text-5xl">
              {copy.founder.headline}
            </p>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-[#44524d]">{copy.founder.body}</p>

            <div className="mt-10 space-y-5">
              {copy.founder.details.map((detail, index) => (
                <p
                  key={detail}
                  className="border-t border-[#14231e]/18 pt-5 text-lg leading-8 text-[#14231e] motion-safe:animate-[slideLine_700ms_ease-out_both]"
                  style={{ animationDelay: `${index * 90}ms` }}
                >
                  {detail}
                </p>
              ))}
            </div>

            <div className="mt-12 border-t border-[#14231e]/18 pt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                {copy.founder.expertiseLabel}
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {copy.founder.expertise.map((item) => (
                  <p key={item} className="border-s-2 border-emerald-700/50 ps-4 text-lg text-[#14231e]">
                    {item}
                  </p>
                ))}
              </div>
            </div>

            <div className="mt-12 border-t border-[#14231e]/18 pt-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                {copy.founder.experienceLabel}
              </p>
              <div className="mt-5 space-y-4">
                {copy.founder.experience.map((item) => (
                  <div
                    key={item.period + item.text}
                    className="grid gap-1 border-b border-[#14231e]/12 pb-4 sm:grid-cols-[0.32fr_0.68fr] sm:gap-6"
                  >
                    <p className="text-sm font-semibold uppercase tracking-[0.12em] text-emerald-900/70">
                      {item.period}
                    </p>
                    <p className="text-lg leading-7 text-[#14231e]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-10 border-t border-[#14231e]/18 pt-7 sm:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                  {copy.founder.educationLabel}
                </p>
                <div className="mt-5 space-y-3">
                  {copy.founder.education.map((item) => (
                    <p key={item} className="border-s-2 border-emerald-700/50 ps-4 text-base leading-7 text-[#14231e]">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                  {copy.founder.languagesLabel}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {copy.founder.languages.map((item) => (
                    <span
                      key={item}
                      className="border border-[#14231e]/18 bg-white/60 px-4 py-2 text-sm font-medium text-[#14231e]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <a
              href="https://www.linkedin.com/in/sahar-motallebi-05108310/"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center justify-center bg-[#10231f] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-emerald-900"
            >
              {copy.founder.linkLabel}
            </a>
          </div>
        </div>
      </section>

      <AiToolsSection language={language} isRtl={isRtl} />

      <section className="bg-[#10231f] px-6 py-24 text-white sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#a7f3d0]">
              {copy.model.eyebrow}
            </p>
            <h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              {copy.model.headline}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              {copy.model.body}
            </p>
          </div>

          <div className="space-y-5">
            {copy.model.signals.map((signal, index) => (
              <div
                key={signal}
                className="flex items-start gap-5 border-t border-white/18 pt-5 motion-safe:animate-[slideLine_700ms_ease-out_both]"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="mt-1 h-2 w-2 flex-none rounded-full bg-[#a7f3d0]" />
                <p className="text-xl leading-8 text-white/82">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <JournalSection
        language={language}
        isRtl={isRtl}
        posts={posts}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      <section id="studio" className="px-6 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-800/70">
              {copy.studio.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              {copy.studio.headline}
            </h2>
            <p className="mt-6 text-lg leading-8 text-[#44524d]">
              {copy.studio.body}
            </p>
          </div>

          <div className="mt-14 grid overflow-hidden border border-[#14231e]/14 bg-[#fffaf0] shadow-[0_24px_80px_rgba(20,35,30,0.12)] lg:grid-cols-[0.9fr_1.1fr]">
            <div
              className={`space-y-10 border-b border-[#14231e]/12 p-7 sm:p-10 lg:border-b-0 ${
                isRtl ? "lg:border-l" : "lg:border-r"
              }`}
            >
              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                  {copy.studio.focusLegend}
                </legend>
                <div className="mt-5 grid gap-3">
                  {focusKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFocus(key)}
                      className={`text-start transition ${
                        focus === key
                          ? "bg-[#10231f] px-5 py-4 text-white"
                          : "border border-[#14231e]/14 px-5 py-4 text-[#14231e] hover:border-[#10231f]/45"
                      }`}
                    >
                      {copy.focusLabels[key]}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                  {copy.studio.phaseLegend}
                </legend>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {phaseKeys.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setPhase(key)}
                      className={`px-4 py-3 text-sm font-semibold transition ${
                        phase === key
                          ? "bg-[#a7f3d0] text-[#10231f]"
                          : "border border-[#14231e]/14 text-[#14231e] hover:border-[#10231f]/45"
                      }`}
                    >
                      {copy.phaseLabels[key]}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="flex min-h-[440px] flex-col justify-between p-7 sm:p-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800/70">
                  {copy.studio.suggestedBrief}
                </p>
                <h3 className="mt-5 max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                  {copy.studio.briefTitles[focus][phase]}
                </h3>
                <p className="mt-8 max-w-2xl text-xl leading-9 text-[#44524d]" key={`${language}-${focus}-${phase}`}>
                  {brief}
                </p>
              </div>

              <div className="mt-12 border-t border-[#14231e]/12 pt-7">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#6c7a74]">
                  {copy.studio.recommendedPrograms}
                </p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {copy.studio.programs.map((program) => (
                    <p key={program} className="border-s-2 border-emerald-700/50 ps-4 text-lg text-[#14231e]">
                      {program}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24 sm:px-10 lg:pb-32">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 border-t border-[#14231e]/18 pt-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-800/70">
              {copy.contact.eyebrow}
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              {copy.contact.headline}
            </h2>
          </div>
          <a
            href="mailto:hello@civicavita.org?subject=Civicavita%20AB%20collaboration"
            className="inline-flex items-center justify-center bg-[#10231f] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-emerald-900"
          >
            {copy.contact.cta}
          </a>
        </div>
      </section>

      <AdminPanel
        language={language}
        isRtl={isRtl}
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        posts={posts}
        addPost={addPost}
        deletePost={deletePost}
        resetPosts={resetPosts}
        editPost={editPost}
      />
    </main>
  );
}