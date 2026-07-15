import { useEffect, useMemo, useState } from "react";
import {
  DEMO_PASS,
  DEMO_USER,
  createPost,
  fetchPosts,
  isAdmin,
  isRemote,
  listUsers,
  loginUser,
  registerUser,
  removePost,
  removeUser,
  resetToSeed,
  seedPosts,
  updatePost,
  type DbUser,
  type Language,
  type Post,
} from "./db";



export function usePosts() {
  const [posts, setPosts] = useState<Post[]>(seedPosts);

  useEffect(() => {
    let mounted = true;
    fetchPosts().then((data) => {
      if (mounted) setPosts(data);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const addPost = async (post: Omit<Post, "id" | "date"> & { date?: string }) => {
    const created = await createPost(post);
    setPosts((prev) => [created, ...prev]);
  };

  const deletePost = async (id: string) => {
    await removePost(id);
    setPosts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      return next.length ? next : seedPosts;
    });
  };

  const resetPosts = async () => {
    const data = await resetToSeed();
    setPosts(data);
  };

  const editPost = async (post: Post) => {
    const updated = await updatePost(post);
    setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return { posts, addPost, deletePost, resetPosts, editPost };
}

type BlogCopy = {
  eyebrow: string;
  headline: string;
  body: string;
  readMore: string;
  close: string;
  by: string;
  empty: string;
  adminButton: string;
  admin: {
    title: string;
    subtitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    login: string;
    register: string;
    switchToRegister: string;
    switchToLogin: string;
    registerTitle: string;
    loginTitle: string;
    wrongPassword: string;
    userExists: string;
    registered: string;
    logout: string;
    loggedInAs: string;
    newPost: string;
    titleLabel: string;
    excerptLabel: string;
    categoryLabel: string;
    bodyLabel: string;
    languageLabel: string;
    publish: string;
    published: string;
    existing: string;
    deleteLabel: string;
    resetLabel: string;
    close: string;
    hint: string;
    demoTitle: string;
  };
};

export const blogCopy: Record<Language, BlogCopy> = {
  en: {
    eyebrow: "Journal",
    headline: "Notes from the field, written by our founder.",
    body: "Reflections on global health, humanitarian delivery, and responsible AI from Sahar Motallebi and CIVICAVITA AB.",
    readMore: "Read article",
    close: "Close",
    by: "By",
    empty: "No articles in this language yet.",
    adminButton: "Admin",
    admin: {
      title: "CIVICAVITA admin",
      subtitle: "Write and publish new journal posts.",
      usernameLabel: "Username",
      usernamePlaceholder: "Enter username",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter password",
      login: "Sign in",
      register: "Create account",
      switchToRegister: "Need an account? Register",
      switchToLogin: "Have an account? Sign in",
      registerTitle: "Register a new admin",
      loginTitle: "Admin sign in",
      wrongPassword: "Incorrect username or password.",
      userExists: "That username already exists.",
      registered: "Account created. You are signed in.",
      logout: "Sign out",
      loggedInAs: "Signed in as",
      newPost: "New post",
      titleLabel: "Title",
      excerptLabel: "Short summary",
      categoryLabel: "Category",
      bodyLabel: "Content",
      languageLabel: "Language",
      publish: "Publish post",
      published: "Post published.",
      existing: "Published posts",
      deleteLabel: "Delete",
      resetLabel: "Reset to defaults",
      close: "Close panel",
      hint: "Tip: register your own account, or use the demo below.",
      demoTitle: "Demo credentials",
    },
  },
  fa: {
    eyebrow: "دفتر یادداشت",
    headline: "یادداشت هایی از میدان، به قلم بنیان گذار ما.",
    body: "تاملاتی درباره سلامت جهانی، اجرای بشردوستانه و هوش مصنوعی مسئولانه از سحر مطلبی و CIVICAVITA AB.",
    readMore: "خواندن مقاله",
    close: "بستن",
    by: "نویسنده",
    empty: "هنوز مقاله ای به این زبان منتشر نشده است.",
    adminButton: "مدیریت",
    admin: {
      title: "پنل مدیریت CIVICAVITA",
      subtitle: "نوشتن و انتشار یادداشت های جدید.",
      usernameLabel: "نام کاربری",
      usernamePlaceholder: "نام کاربری را وارد کنید",
      passwordLabel: "رمز عبور",
      passwordPlaceholder: "رمز عبور را وارد کنید",
      login: "ورود",
      register: "ساخت حساب",
      switchToRegister: "حساب ندارید؟ ثبت نام کنید",
      switchToLogin: "حساب دارید؟ وارد شوید",
      registerTitle: "ثبت نام مدیر جدید",
      loginTitle: "ورود مدیر",
      wrongPassword: "نام کاربری یا رمز اشتباه است.",
      userExists: "این نام کاربری قبلا ثبت شده است.",
      registered: "حساب ساخته شد. وارد شدید.",
      logout: "خروج",
      loggedInAs: "ورود با نام",
      newPost: "یادداشت جدید",
      titleLabel: "عنوان",
      excerptLabel: "خلاصه کوتاه",
      categoryLabel: "دسته",
      bodyLabel: "متن",
      languageLabel: "زبان",
      publish: "انتشار یادداشت",
      published: "یادداشت منتشر شد.",
      existing: "یادداشت های منتشر شده",
      deleteLabel: "حذف",
      resetLabel: "بازگردانی به پیش فرض",
      close: "بستن پنل",
      hint: "نکته: حساب خود را بسازید یا از حساب نمونه زیر استفاده کنید.",
      demoTitle: "حساب نمونه",
    },
  },
  ar: {
    eyebrow: "المدونة",
    headline: "ملاحظات من الميدان، بقلم مؤسِّستنا.",
    body: "تأملات في الصحة العالمية والتنفيذ الإنساني والذكاء الاصطناعي المسؤول من سحر مطلبي و CIVICAVITA AB.",
    readMore: "قراءة المقال",
    close: "إغلاق",
    by: "بقلم",
    empty: "لا توجد مقالات بهذه اللغة بعد.",
    adminButton: "الإدارة",
    admin: {
      title: "لوحة إدارة CIVICAVITA",
      subtitle: "اكتب وانشر مقالات جديدة.",
      usernameLabel: "اسم المستخدم",
      usernamePlaceholder: "أدخل اسم المستخدم",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      switchToRegister: "لا تملك حسابا؟ سجل الآن",
      switchToLogin: "لديك حساب؟ سجل الدخول",
      registerTitle: "تسجيل مدير جديد",
      loginTitle: "دخول المدير",
      wrongPassword: "اسم المستخدم أو كلمة المرور غير صحيحة.",
      userExists: "اسم المستخدم موجود بالفعل.",
      registered: "تم إنشاء الحساب. تم تسجيل دخولك.",
      logout: "تسجيل الخروج",
      loggedInAs: "مسجل الدخول باسم",
      newPost: "مقال جديد",
      titleLabel: "العنوان",
      excerptLabel: "ملخص قصير",
      categoryLabel: "الفئة",
      bodyLabel: "المحتوى",
      languageLabel: "اللغة",
      publish: "نشر المقال",
      published: "تم نشر المقال.",
      existing: "المقالات المنشورة",
      deleteLabel: "حذف",
      resetLabel: "إعادة إلى الافتراضي",
      close: "إغلاق اللوحة",
      hint: "نصيحة: أنشئ حسابك أو استخدم الحساب التجريبي أدناه.",
      demoTitle: "بيانات تجريبية",
    },
  },
  sv: {
    eyebrow: "Journal",
    headline: "Anteckningar fran faltet, skrivna av var grundare.",
    body: "Reflektioner om global halsa, humanitart genomforande och ansvarsfull AI fran Sahar Motallebi och CIVICAVITA AB.",
    readMore: "Las artikel",
    close: "Stang",
    by: "Av",
    empty: "Inga artiklar pa detta sprak annu.",
    adminButton: "Admin",
    admin: {
      title: "CIVICAVITA admin",
      subtitle: "Skriv och publicera nya inlagg.",
      usernameLabel: "Anvandarnamn",
      usernamePlaceholder: "Ange anvandarnamn",
      passwordLabel: "Losenord",
      passwordPlaceholder: "Ange losenord",
      login: "Logga in",
      register: "Skapa konto",
      switchToRegister: "Inget konto? Registrera",
      switchToLogin: "Har du konto? Logga in",
      registerTitle: "Registrera ny admin",
      loginTitle: "Admin-inloggning",
      wrongPassword: "Fel anvandarnamn eller losenord.",
      userExists: "Anvandarnamnet finns redan.",
      registered: "Konto skapat. Du ar inloggad.",
      logout: "Logga ut",
      loggedInAs: "Inloggad som",
      newPost: "Nytt inlagg",
      titleLabel: "Titel",
      excerptLabel: "Kort sammanfattning",
      categoryLabel: "Kategori",
      bodyLabel: "Innehall",
      languageLabel: "Sprak",
      publish: "Publicera inlagg",
      published: "Inlagg publicerat.",
      existing: "Publicerade inlagg",
      deleteLabel: "Ta bort",
      resetLabel: "Aterstall standard",
      close: "Stang panel",
      hint: "Tips: registrera ett eget konto eller anvand demokontot nedan.",
      demoTitle: "Demo-uppgifter",
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: "English",
  fa: "فارسی",
  ar: "العربية",
  sv: "Svenska",
};

export type PanelUi = {
  tabDashboard: string;
  tabNew: string;
  tabManage: string;
  tabUsers: string;
  tabSettings: string;
  statTotal: string;
  statPublished: string;
  statDrafts: string;
  statLanguages: string;
  saveDraft: string;
  editLabel: string;
  saveChanges: string;
  cancel: string;
  statusPublished: string;
  statusDraft: string;
  filterAll: string;
  searchPlaceholder: string;
  noResults: string;
  usersTitle: string;
  addUser: string;
  roleAdmin: string;
  roleEditor: string;
  you: string;
  settingsTitle: string;
  dbConnected: string;
  dbLocal: string;
  clearDrafts: string;
  quickActions: string;
  welcome: string;
};

export const panelUi: Record<Language, PanelUi> = {
  en: {
    tabDashboard: "Dashboard",
    tabNew: "New post",
    tabManage: "Manage",
    tabUsers: "Users",
    tabSettings: "Settings",
    statTotal: "Total posts",
    statPublished: "Published",
    statDrafts: "Drafts",
    statLanguages: "Languages used",
    saveDraft: "Save as draft",
    editLabel: "Edit",
    saveChanges: "Save changes",
    cancel: "Cancel",
    statusPublished: "Published",
    statusDraft: "Draft",
    filterAll: "All languages",
    searchPlaceholder: "Search posts...",
    noResults: "No posts match your search.",
    usersTitle: "Admin users",
    addUser: "Add user",
    roleAdmin: "Admin",
    roleEditor: "Editor",
    you: "you",
    settingsTitle: "Account & system",
    dbConnected: "Database connected",
    dbLocal: "Local demo mode (no database configured)",
    clearDrafts: "Delete all drafts",
    quickActions: "Quick actions",
    welcome: "Welcome back",
  },
  fa: {
    tabDashboard: "داشبورد",
    tabNew: "یادداشت جدید",
    tabManage: "مدیریت",
    tabUsers: "کاربران",
    tabSettings: "تنظیمات",
    statTotal: "کل یادداشت ها",
    statPublished: "منتشر شده",
    statDrafts: "پیش نویس ها",
    statLanguages: "زبان های استفاده شده",
    saveDraft: "ذخیره پیش نویس",
    editLabel: "ویرایش",
    saveChanges: "ذخیره تغییرات",
    cancel: "انصراف",
    statusPublished: "منتشر شده",
    statusDraft: "پیش نویس",
    filterAll: "همه زبان ها",
    searchPlaceholder: "جستجوی یادداشت ها...",
    noResults: "یادداشتی با جستجوی شما یافت نشد.",
    usersTitle: "کاربران مدیر",
    addUser: "افزودن کاربر",
    roleAdmin: "مدیر",
    roleEditor: "نویسنده",
    you: "شما",
    settingsTitle: "حساب و سیستم",
    dbConnected: "پایگاه داده متصل است",
    dbLocal: "حالت نمایشی محلی (پایگاه داده تنظیم نشده)",
    clearDrafts: "حذف همه پیش نویس ها",
    quickActions: "اقدامات سریع",
    welcome: "خوش آمدید",
  },
  ar: {
    tabDashboard: "لوحة المعلومات",
    tabNew: "مقال جديد",
    tabManage: "الإدارة",
    tabUsers: "المستخدمون",
    tabSettings: "الإعدادات",
    statTotal: "إجمالي المقالات",
    statPublished: "منشورة",
    statDrafts: "مسودات",
    statLanguages: "اللغات المستخدمة",
    saveDraft: "حفظ كمسودة",
    editLabel: "تعديل",
    saveChanges: "حفظ التغييرات",
    cancel: "إلغاء",
    statusPublished: "منشور",
    statusDraft: "مسودة",
    filterAll: "كل اللغات",
    searchPlaceholder: "ابحث في المقالات...",
    noResults: "لا توجد مقالات تطابق بحثك.",
    usersTitle: "مستخدمو الإدارة",
    addUser: "إضافة مستخدم",
    roleAdmin: "مدير",
    roleEditor: "محرر",
    you: "أنت",
    settingsTitle: "الحساب والنظام",
    dbConnected: "قاعدة البيانات متصلة",
    dbLocal: "وضع تجريبي محلي (لا توجد قاعدة بيانات)",
    clearDrafts: "حذف كل المسودات",
    quickActions: "إجراءات سريعة",
    welcome: "مرحبا بعودتك",
  },
  sv: {
    tabDashboard: "Oversikt",
    tabNew: "Nytt inlagg",
    tabManage: "Hantera",
    tabUsers: "Anvandare",
    tabSettings: "Installningar",
    statTotal: "Totalt inlagg",
    statPublished: "Publicerade",
    statDrafts: "Utkast",
    statLanguages: "Anvanda sprak",
    saveDraft: "Spara utkast",
    editLabel: "Redigera",
    saveChanges: "Spara andringar",
    cancel: "Avbryt",
    statusPublished: "Publicerad",
    statusDraft: "Utkast",
    filterAll: "Alla sprak",
    searchPlaceholder: "Sok inlagg...",
    noResults: "Inga inlagg matchar din sokning.",
    usersTitle: "Adminanvandare",
    addUser: "Lagg till anvandare",
    roleAdmin: "Admin",
    roleEditor: "Redaktor",
    you: "du",
    settingsTitle: "Konto och system",
    dbConnected: "Databas ansluten",
    dbLocal: "Lokalt demolage (ingen databas)",
    clearDrafts: "Ta bort alla utkast",
    quickActions: "Snabbatgarder",
    welcome: "Valkommen tillbaka",
  },
};

export function JournalSection({
  language,
  isRtl,
  posts,
  onOpenAdmin,
}: {
  language: Language;
  isRtl: boolean;
  posts: Post[];
  onOpenAdmin: () => void;
}) {
  const t = blogCopy[language];
  const [active, setActive] = useState<Post | null>(null);

  const visible = useMemo(
    () => posts.filter((p) => p.language === language).slice(0, 6),
    [posts, language]
  );

  return (
    <section id="journal" className="bg-[#10231f] px-6 py-24 text-white sm:px-10 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#a7f3d0]">{t.eyebrow}</p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-6xl">
              {t.headline}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{t.body}</p>
          </div>
          <button
            type="button"
            onClick={onOpenAdmin}
            className="inline-flex items-center justify-center border border-white/30 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
          >
            {t.adminButton}
          </button>
        </div>

        {visible.length === 0 ? (
          <p className="mt-16 text-lg text-white/60">{t.empty}</p>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((post) => (
              <article
                key={post.id}
                className="flex h-full flex-col border-t border-white/18 pt-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a7f3d0]">
                  {post.category}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em]">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 text-base leading-7 text-white/70">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-white/50">
                  <span>
                    {t.by} {post.author}
                  </span>
                  <span>{post.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActive(post)}
                  className="mt-6 self-start text-sm font-semibold uppercase tracking-[0.16em] text-[#a7f3d0] transition hover:text-white"
                >
                  {t.readMore}
                </button>
              </article>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-10 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            dir={isRtl ? "rtl" : "ltr"}
            className="relative w-full max-w-3xl bg-[#fffaf0] p-8 text-[#14231e] shadow-2xl sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute end-6 top-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#6c7a74] transition hover:text-[#14231e]"
            >
              {t.close}
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800/70">
              {active.category}
            </p>
            <h3 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
              {active.title}
            </h3>
            <p className="mt-3 text-sm text-[#6c7a74]">
              {t.by} {active.author} · {active.date}
            </p>
            <div className="mt-8 space-y-5 text-lg leading-8 text-[#3a4742]">
              {active.body.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function AdminPanel({
  language,
  isRtl,
  open,
  onClose,
  posts,
  addPost,
  deletePost,
  resetPosts,
  editPost,
}: {
  language: Language;
  isRtl: boolean;
  open: boolean;
  onClose: () => void;
  posts: Post[];
  addPost: (post: Omit<Post, "id" | "date">) => void;
  deletePost: (id: string) => void;
  resetPosts: () => void;
  editPost: (post: Post) => void;
}) {
  const t = blogCopy[language].admin;
  const ui = panelUi[language];
  const [authed, setAuthed] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState(false);

  const [tab, setTab] = useState<"dashboard" | "new" | "manage" | "users" | "settings">("dashboard");
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Field notes");
  const [body, setBody] = useState("");
  const [postLang, setPostLang] = useState<Language>(language);

  const [search, setSearch] = useState("");
  const [filterLang, setFilterLang] = useState<Language | "all">("all");
  const [editing, setEditing] = useState<Post | null>(null);

  const [users, setUsers] = useState<DbUser[]>([]);
  const [newUserName, setNewUserName] = useState("");
  const [newUserPass, setNewUserPass] = useState("");
  const [userMsg, setUserMsg] = useState<string | null>(null);

  const admin = isAdmin(currentUser);

  useEffect(() => {
    setPostLang(language);
  }, [language]);

  useEffect(() => {
    if (authed && admin) listUsers().then(setUsers);
  }, [authed, admin]);

  const refreshUsers = () => listUsers().then(setUsers);

  if (!open) return null;

  const stats = {
    total: posts.length,
    published: posts.filter((p) => (p.status ?? "published") === "published").length,
    drafts: posts.filter((p) => p.status === "draft").length,
    langs: new Set(posts.map((p) => p.language)).size,
  };

  const filtered = posts.filter((p) => {
    const matchLang = filterLang === "all" || p.language === filterLang;
    const q = search.trim().toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchLang && matchSearch;
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = username.trim();
    if (!name || !password) return;
    if (mode === "register") {
      const result = await registerUser(name, password);
      if (result === "exists") {
        setError(t.userExists);
        return;
      }
      setCurrentUser(name);
      setAuthed(true);
      setError(null);
      setNotice(true);
      setTimeout(() => setNotice(false), 2500);
      return;
    }
    const ok = await loginUser(name, password);
    if (ok) {
      setCurrentUser(name);
      setAuthed(true);
      setError(null);
    } else {
      setError(t.wrongPassword);
    }
  };

  const submitPost = (status: "published" | "draft") => {
    if (!title.trim() || !body.trim()) return;
    addPost({
      title: title.trim(),
      excerpt: excerpt.trim() || body.trim().slice(0, 140),
      body: body.trim(),
      category: category.trim() || "Journal",
      author: currentUser || "Sahar Motallebi",
      language: postLang,
      status,
    });
    setTitle("");
    setExcerpt("");
    setBody("");
    setNotice(true);
    setTimeout(() => setNotice(false), 2500);
    setTab("manage");
  };

  const saveEdit = () => {
    if (!editing) return;
    editPost(editing);
    setEditing(null);
    setNotice(true);
    setTimeout(() => setNotice(false), 2500);
  };

  const togglePublish = (post: Post) => {
    editPost({ ...post, status: (post.status ?? "published") === "published" ? "draft" : "published" });
  };

  const addNewUser = async () => {
    if (!newUserName.trim() || !newUserPass) return;
    const res = await registerUser(newUserName, newUserPass);
    setUserMsg(res === "exists" ? t.userExists : t.registered);
    setNewUserName("");
    setNewUserPass("");
    refreshUsers();
    setTimeout(() => setUserMsg(null), 2500);
  };

  const handleLogout = () => {
    setAuthed(false);
    setCurrentUser("");
    setTab("dashboard");
    setUsername("");
    setPassword("");
  };

  const inputClass =
    "mt-2 w-full border border-[#14231e]/20 bg-white px-4 py-3 text-base text-[#14231e] outline-none focus:border-[#10231f]";
  const labelClass = "text-sm font-semibold uppercase tracking-[0.14em] text-[#6c7a74]";

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        dir={isRtl ? "rtl" : "ltr"}
        className="relative w-full max-w-4xl bg-[#f7f2e8] p-8 text-[#14231e] shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.03em]">{t.title}</h3>
            <p className="mt-2 text-base text-[#44524d]">{t.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6c7a74] transition hover:text-[#14231e]"
          >
            {t.close}
          </button>
        </div>

        {!authed ? (
          <form onSubmit={handleAuth} className="mt-10 max-w-md">
            <p className="text-lg font-semibold tracking-[-0.02em]">
              {mode === "register" ? t.registerTitle : t.loginTitle}
            </p>
            <label className={`${labelClass} mt-6 block`} htmlFor="admin-user">
              {t.usernameLabel}
            </label>
            <input
              id="admin-user"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t.usernamePlaceholder}
              className={inputClass}
              autoComplete="username"
            />
            <label className={`${labelClass} mt-5 block`} htmlFor="admin-pass">
              {t.passwordLabel}
            </label>
            <input
              id="admin-pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              className={inputClass}
              autoComplete={mode === "register" ? "new-password" : "current-password"}
            />
            {error && <p className="mt-3 text-sm font-medium text-red-700">{error}</p>}
            <button
              type="submit"
              className="mt-6 inline-flex items-center justify-center bg-[#10231f] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-900"
            >
              {mode === "register" ? t.register : t.login}
            </button>
            <button
              type="button"
              onClick={() => {
                setMode(mode === "register" ? "login" : "register");
                setError(null);
              }}
              className="mt-4 block text-sm font-semibold text-emerald-800 transition hover:text-emerald-950"
            >
              {mode === "register" ? t.switchToLogin : t.switchToRegister}
            </button>

            <div className="mt-8 border border-emerald-800/30 bg-emerald-50/60 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-900/70">
                {t.demoTitle}
              </p>
              <p className="mt-2 text-sm text-[#3a4742]">
                {t.usernameLabel}: <span className="font-semibold">{DEMO_USER}</span> · {t.passwordLabel}:{" "}
                <span className="font-semibold">{DEMO_PASS}</span>
              </p>
              <p className="mt-2 text-xs text-[#8a958f]">{t.hint}</p>
              <p className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-900/70">
                <span
                  className={`inline-block h-2 w-2 rounded-full ${
                    isRemote() ? "bg-emerald-600" : "bg-amber-500"
                  }`}
                />
                {isRemote() ? "Database connected" : "Local demo mode (no database configured)"}
              </p>
            </div>
          </form>
        ) : (
          <div className="mt-8">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#14231e]/12 pb-4">
              <div className="flex flex-wrap gap-2">
                {([
                  ["dashboard", ui.tabDashboard],
                  ["new", ui.tabNew],
                  ["manage", ui.tabManage],
                  ...(admin ? [["users", ui.tabUsers] as const] : []),
                  ["settings", ui.tabSettings],
                ] as const).map(([key, labelText]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setTab(key as typeof tab)}
                    className={`px-4 py-2 text-sm font-semibold transition ${
                      tab === key
                        ? "bg-[#10231f] text-white"
                        : "border border-[#14231e]/16 text-[#14231e] hover:border-[#10231f]/45"
                    }`}
                  >
                    {labelText}
                  </button>
                ))}
              </div>
              <span className="text-sm text-[#6c7a74]">
                {t.loggedInAs} <span className="font-semibold text-[#14231e]">{currentUser}</span>
                {admin ? ` · ${ui.roleAdmin}` : ` · ${ui.roleEditor}`}
              </span>
            </div>

            {tab === "dashboard" && (
              <div className="mt-8">
                <p className="text-2xl font-semibold tracking-[-0.03em]">
                  {ui.welcome}, {currentUser}.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    [ui.statTotal, stats.total],
                    [ui.statPublished, stats.published],
                    [ui.statDrafts, stats.drafts],
                    [ui.statLanguages, stats.langs],
                  ].map(([labelText, value]) => (
                    <div key={labelText} className="border border-[#14231e]/14 bg-white p-5">
                      <p className="text-3xl font-semibold tracking-[-0.03em] text-[#10231f]">{value}</p>
                      <p className="mt-1 text-sm text-[#6c7a74]">{labelText}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6c7a74]">
                    {ui.quickActions}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => setTab("new")}
                      className="bg-[#a7f3d0] px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#0d211b] transition hover:bg-[#10231f] hover:text-white"
                    >
                      {ui.tabNew}
                    </button>
                    <button
                      type="button"
                      onClick={() => setTab("manage")}
                      className="border border-[#14231e]/16 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#14231e] transition hover:border-[#10231f]/45"
                    >
                      {ui.tabManage}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === "new" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitPost("published");
                }}
                className="mt-8 max-w-3xl space-y-5"
              >
                <div>
                  <label className={labelClass}>{t.titleLabel}</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{t.excerptLabel}</label>
                  <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className={inputClass} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>{t.categoryLabel}</label>
                    <input value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>{t.languageLabel}</label>
                    <select
                      value={postLang}
                      onChange={(e) => setPostLang(e.target.value as Language)}
                      className={inputClass}
                    >
                      {(Object.keys(languageNames) as Language[]).map((code) => (
                        <option key={code} value={code}>
                          {languageNames[code]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{t.bodyLabel}</label>
                  <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} className={inputClass} />
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="bg-[#10231f] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-emerald-900"
                  >
                    {t.publish}
                  </button>
                  <button
                    type="button"
                    onClick={() => submitPost("draft")}
                    className="border border-[#14231e]/16 px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#14231e] transition hover:border-[#10231f]/45"
                  >
                    {ui.saveDraft}
                  </button>
                  {notice && <span className="text-sm font-medium text-emerald-800">{t.published}</span>}
                </div>
              </form>
            )}

            {tab === "manage" && (
              <div className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={ui.searchPlaceholder}
                    className="flex-1 border border-[#14231e]/20 bg-white px-4 py-2.5 text-base outline-none focus:border-[#10231f]"
                  />
                  <select
                    value={filterLang}
                    onChange={(e) => setFilterLang(e.target.value as Language | "all")}
                    className="border border-[#14231e]/20 bg-white px-4 py-2.5 text-base outline-none focus:border-[#10231f]"
                  >
                    <option value="all">{ui.filterAll}</option>
                    {(Object.keys(languageNames) as Language[]).map((code) => (
                      <option key={code} value={code}>
                        {languageNames[code]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={resetPosts}
                    className="text-xs font-semibold uppercase tracking-[0.14em] text-[#6c7a74] transition hover:text-[#14231e]"
                  >
                    {t.resetLabel}
                  </button>
                </div>

                {filtered.length === 0 ? (
                  <p className="mt-8 text-[#6c7a74]">{ui.noResults}</p>
                ) : (
                  <div className="mt-5 max-h-[440px] space-y-3 overflow-y-auto pe-1">
                    {filtered.map((post) => (
                      <div key={post.id} className="border border-[#14231e]/14 bg-white p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800/70">
                              {languageNames[post.language]} · {post.category} ·{" "}
                              <span className={(post.status ?? "published") === "draft" ? "text-amber-700" : "text-emerald-700"}>
                                {(post.status ?? "published") === "draft" ? ui.statusDraft : ui.statusPublished}
                              </span>
                            </p>
                            <p className="mt-1 font-semibold leading-snug">{post.title}</p>
                            <p className="mt-1 text-xs text-[#8a958f]">{post.date}</p>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            <button
                              type="button"
                              onClick={() => setEditing(post)}
                              className="text-xs font-semibold uppercase tracking-[0.14em] text-[#10231f] transition hover:text-emerald-900"
                            >
                              {ui.editLabel}
                            </button>
                            <button
                              type="button"
                              onClick={() => togglePublish(post)}
                              className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700 transition hover:text-emerald-900"
                            >
                              {(post.status ?? "published") === "draft" ? ui.statusPublished : ui.statusDraft}
                            </button>
                            <button
                              type="button"
                              onClick={() => deletePost(post.id)}
                              className="text-xs font-semibold uppercase tracking-[0.14em] text-red-700 transition hover:text-red-900"
                            >
                              {t.deleteLabel}
                            </button>
                          </div>
                        </div>

                        {editing?.id === post.id && (
                          <div className="mt-4 space-y-3 border-t border-[#14231e]/12 pt-4">
                            <input
                              value={editing.title}
                              onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                              className="w-full border border-[#14231e]/20 bg-white px-3 py-2 text-base outline-none focus:border-[#10231f]"
                            />
                            <textarea
                              value={editing.body}
                              onChange={(e) => setEditing({ ...editing, body: e.target.value })}
                              rows={5}
                              className="w-full border border-[#14231e]/20 bg-white px-3 py-2 text-base outline-none focus:border-[#10231f]"
                            />
                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={saveEdit}
                                className="bg-[#10231f] px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-emerald-900"
                              >
                                {ui.saveChanges}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditing(null)}
                                className="border border-[#14231e]/16 px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#14231e]"
                              >
                                {ui.cancel}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "users" && admin && (
              <div className="mt-8 max-w-2xl">
                <p className="text-lg font-semibold tracking-[-0.02em]">{ui.usersTitle}</p>
                <div className="mt-5 space-y-3">
                  {users.map((u) => (
                    <div
                      key={u.username}
                      className="flex items-center justify-between border border-[#14231e]/14 bg-white p-4"
                    >
                      <div>
                        <p className="font-semibold">
                          {u.username}
                          {u.username === currentUser && ` (${ui.you})`}
                        </p>
                        <p className="text-xs text-[#8a958f]">
                          {isAdmin(u.username) ? ui.roleAdmin : ui.roleEditor}
                        </p>
                      </div>
                      {!isAdmin(u.username) && (
                        <button
                          type="button"
                          onClick={async () => {
                            await removeUser(u.username);
                            refreshUsers();
                          }}
                          className="text-xs font-semibold uppercase tracking-[0.14em] text-red-700 transition hover:text-red-900"
                        >
                          {t.deleteLabel}
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-[#14231e]/12 pt-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#6c7a74]">{ui.addUser}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      placeholder={t.usernamePlaceholder}
                      className="border border-[#14231e]/20 bg-white px-3 py-2.5 text-base outline-none focus:border-[#10231f]"
                    />
                    <input
                      type="password"
                      value={newUserPass}
                      onChange={(e) => setNewUserPass(e.target.value)}
                      placeholder={t.passwordPlaceholder}
                      className="border border-[#14231e]/20 bg-white px-3 py-2.5 text-base outline-none focus:border-[#10231f]"
                    />
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={addNewUser}
                      className="bg-[#10231f] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-emerald-900"
                    >
                      {ui.addUser}
                    </button>
                    {userMsg && <span className="text-sm font-medium text-emerald-800">{userMsg}</span>}
                  </div>
                </div>
              </div>
            )}

            {tab === "settings" && (
              <div className="mt-8 max-w-2xl space-y-6">
                <p className="text-lg font-semibold tracking-[-0.02em]">{ui.settingsTitle}</p>
                <div className="border border-[#14231e]/14 bg-white p-5">
                  <p className="flex items-center gap-2 text-sm font-medium text-[#14231e]">
                    <span
                      className={`inline-block h-2.5 w-2.5 rounded-full ${
                        isRemote() ? "bg-emerald-600" : "bg-amber-500"
                      }`}
                    />
                    {isRemote() ? ui.dbConnected : ui.dbLocal}
                  </p>
                  <p className="mt-2 text-sm text-[#6c7a74]">
                    {t.loggedInAs} <span className="font-semibold text-[#14231e]">{currentUser}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {admin && (
                    <button
                      type="button"
                      onClick={() => {
                        posts.filter((p) => p.status === "draft").forEach((p) => deletePost(p.id));
                      }}
                      className="border border-red-700/30 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-red-700 transition hover:bg-red-50"
                    >
                      {ui.clearDrafts}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="border border-[#14231e]/16 px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#14231e] transition hover:border-[#10231f]/45"
                  >
                    {t.logout}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
