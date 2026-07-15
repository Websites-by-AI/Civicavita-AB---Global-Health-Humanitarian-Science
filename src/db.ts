import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export type Language = "en" | "fa" | "ar" | "sv";

export type PostStatus = "published" | "draft";

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  author: string;
  date: string;
  language: Language;
  status?: PostStatus;
};

export type DbUser = { username: string; password: string; role?: "admin" | "editor" };

export const isAdmin = (username: string) => username.trim().toLowerCase() === DEMO_USER;

// Read config from Vite env. Set these in a .env file:
//   VITE_SUPABASE_URL=...
//   VITE_SUPABASE_ANON_KEY=...
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const DEMO_USER = "admin";
export const DEMO_PASS = "civicavita";

let client: SupabaseClient | null = null;
if (SUPABASE_URL && SUPABASE_KEY) {
  try {
    client = createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch {
    client = null;
  }
}

export const isRemote = () => client !== null;

// ---------- Local storage fallback ----------
const POSTS_KEY = "civicavita_posts_v1";
const USERS_KEY = "civicavita_users_v1";

export const seedPosts: Post[] = [
  {
    id: "seed-1",
    title: "Why field evidence must outrank the plan",
    excerpt:
      "After two decades in complex emergencies, I have learned that the strongest plan is the one that keeps listening to the field.",
    body: "When I coordinated protection and health programs across Afghanistan, Somalia, Sudan, and Iran, the same lesson kept returning: a plan is only a hypothesis until it meets the community it is meant to serve.\n\nWe often arrive with frameworks, indicators, and funding cycles. These matter. But the families in a displacement camp, the nurse in an overstretched clinic, and the local volunteer who knows every household hold the evidence that no dashboard captures on its own.\n\nAt CIVICAVITA, our starting position is humility. We assess before we mobilize, and we mobilize in a way that keeps the feedback loop open. Evidence is not a report we deliver at the end. It is a daily practice that decides whether people are actually helped.",
    category: "Field notes",
    author: "Sahar Motallebi",
    date: "2026-01-14",
    language: "en",
  },
  {
    id: "seed-2",
    title: "Responsible AI belongs to public health, not the other way around",
    excerpt:
      "AI can accelerate humanitarian work, but only when human expertise stays in charge of judgement and dignity.",
    body: "There is real excitement about AI in global health, and there should be. Tools that draft grants, summarize evidence, and translate materials can free scarce human time for the work that only people can do.\n\nBut I have seen how quickly technology can drift away from the realities it claims to serve. A model that has never sat in a field clinic will confidently propose things that do not survive contact with the ground.\n\nSo at CIVICAVITA we treat AI as an assistant with a supervisor. Every output passes through review by people who understand the science, the context, and the human stakes. The goal is not to replace judgement. It is to give experienced people more room to exercise it.",
    category: "Perspective",
    author: "Sahar Motallebi",
    date: "2026-02-03",
    language: "en",
  },
  {
    id: "seed-3",
    title: "Building a company on trust, one relationship at a time",
    excerpt:
      "CIVICAVITA is young by design. We would rather grow slowly around trust than quickly around noise.",
    body: "People sometimes ask why a company with this much ambition is still small. My answer is simple: the humanitarian and public health world does not need another loud organization. It needs partners who show up, listen, and follow through.\n\nCIVICAVITA is founder-led today. That is not a limitation, it is a promise. Every engagement carries the same standards I have held across ministries, NGOs, and UN agencies since 2001.\n\nAs we grow, we will add colleagues who share this discipline. Until then, being deliberately small lets us stay close to the work and honest about what we can deliver.",
    category: "Company",
    author: "Sahar Motallebi",
    date: "2026-02-20",
    language: "en",
  },
];

function localLoadPosts(): Post[] {
  try {
    const raw = localStorage.getItem(POSTS_KEY);
    if (!raw) return seedPosts;
    const parsed = JSON.parse(raw) as Post[];
    return Array.isArray(parsed) && parsed.length ? parsed : seedPosts;
  } catch {
    return seedPosts;
  }
}

function localSavePosts(posts: Post[]) {
  try {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  } catch {
    // ignore
  }
}

function localLoadUsers(): DbUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const parsed = raw ? (JSON.parse(raw) as DbUser[]) : [];
    const hasDemo = parsed.some((u) => u.username === DEMO_USER);
    return hasDemo ? parsed : [{ username: DEMO_USER, password: DEMO_PASS }, ...parsed];
  } catch {
    return [{ username: DEMO_USER, password: DEMO_PASS }];
  }
}

function localSaveUsers(users: DbUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

// ---------- Public API (async, works with or without a database) ----------

export async function fetchPosts(): Promise<Post[]> {
  if (client) {
    const { data, error } = await client
      .from("posts")
      .select("id,title,excerpt,body,category,author,date,language")
      .order("date", { ascending: false });
    if (!error && data && data.length) return data as Post[];
    if (!error) return seedPosts;
  }
  return localLoadPosts();
}

export async function createPost(post: Omit<Post, "id" | "date"> & { date?: string }): Promise<Post> {
  const record: Post = {
    ...post,
    status: post.status || "published",
    id: `post-${Date.now()}`,
    date: post.date || new Date().toISOString().slice(0, 10),
  };
  if (client) {
    const { data, error } = await client.from("posts").insert(record).select().single();
    if (!error && data) return data as Post;
  }
  const next = [record, ...localLoadPosts()];
  localSavePosts(next);
  return record;
}

export async function updatePost(post: Post): Promise<Post> {
  if (client) {
    const { data, error } = await client
      .from("posts")
      .update(post)
      .eq("id", post.id)
      .select()
      .single();
    if (!error && data) return data as Post;
  }
  const next = localLoadPosts().map((p) => (p.id === post.id ? post : p));
  localSavePosts(next);
  return post;
}

export async function listUsers(): Promise<DbUser[]> {
  if (client) {
    const { data, error } = await client.from("users").select("username,password,role");
    if (!error && data) return data as DbUser[];
  }
  return localLoadUsers();
}

export async function removeUser(username: string): Promise<void> {
  const name = username.trim();
  if (name === DEMO_USER) return; // never delete the demo admin
  if (client) {
    await client.from("users").delete().eq("username", name);
    return;
  }
  const next = localLoadUsers().filter((u) => u.username !== name);
  localSaveUsers(next);
}

export async function removePost(id: string): Promise<void> {
  if (client) {
    await client.from("posts").delete().eq("id", id);
    return;
  }
  const next = localLoadPosts().filter((p) => p.id !== id);
  localSavePosts(next.length ? next : seedPosts);
}

export async function resetToSeed(): Promise<Post[]> {
  if (client) {
    return fetchPosts();
  }
  localSavePosts(seedPosts);
  return seedPosts;
}

export async function loginUser(username: string, password: string): Promise<boolean> {
  const name = username.trim();
  if (client) {
    const { data, error } = await client
      .from("users")
      .select("username")
      .eq("username", name)
      .eq("password", password)
      .maybeSingle();
    if (!error) return !!data;
  }
  return localLoadUsers().some((u) => u.username === name && u.password === password);
}

export async function registerUser(
  username: string,
  password: string
): Promise<"ok" | "exists"> {
  const name = username.trim();
  if (client) {
    const { data: existing } = await client
      .from("users")
      .select("username")
      .eq("username", name)
      .maybeSingle();
    if (existing) return "exists";
    const { error } = await client.from("users").insert({ username: name, password });
    if (!error) return "ok";
  }
  const users = localLoadUsers();
  if (users.some((u) => u.username === name)) return "exists";
  localSaveUsers([...users, { username: name, password }]);
  return "ok";
}
