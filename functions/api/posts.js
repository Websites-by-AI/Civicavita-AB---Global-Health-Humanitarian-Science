import { json, requireAdmin, unauthorized } from "../_lib.js";
const clean = (value, max = 20000) => String(value ?? "").trim().slice(0, max);
const rowToPost = (row) => ({ ...row, tags: JSON.parse(row.tags || "[]") });
export async function onRequestGet({ request, env }) {
  const locale = new URL(request.url).searchParams.get("locale") || "en";
  const select = "SELECT id,title,excerpt,content,category,author,author_role AS authorRole,date,cover_emoji AS coverEmoji,cover_image AS coverImage,read_minutes AS readMinutes,tags,locale,translation_key AS translationKey FROM posts WHERE locale=? ORDER BY date DESC, created_at DESC";
  const { results } = await env.DB.prepare(select).bind(locale).all();
  // Never silently show English content for another interface language.
  return json({ posts: results.map(rowToPost), locale, usedFallback: false });
}
export async function onRequestPost({ request, env }) {
  if (!(await requireAdmin(request, env))) return unauthorized();
  try {
    const p = await request.json();
    const id = `post-${crypto.randomUUID()}`;
    const title = clean(p.title, 300), content = clean(p.content);
    if (!title || !content) return json({ error: "Title and content are required." }, 400);
    await env.DB.prepare("INSERT INTO posts (id,title,excerpt,content,category,author,author_role,date,cover_emoji,cover_image,read_minutes,tags,locale,translation_key) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
      .bind(id,title,clean(p.excerpt,1000),content,clean(p.category,100),clean(p.author,150),clean(p.authorRole,150),clean(p.date,10),clean(p.coverEmoji,12),clean(p.coverImage,500) || null,Number(p.readMinutes) || 1,JSON.stringify(Array.isArray(p.tags) ? p.tags.slice(0,20).map(x => clean(x,50)) : []),["en","fa","sv","fr","ar"].includes(p.locale) ? p.locale : "en",clean(p.translationKey,100) || null).run();
    const post = await env.DB.prepare("SELECT id,title,excerpt,content,category,author,author_role AS authorRole,date,cover_emoji AS coverEmoji,cover_image AS coverImage,read_minutes AS readMinutes,tags,locale,translation_key AS translationKey FROM posts WHERE id=?").bind(id).first();
    return json({ post: rowToPost(post) }, 201);
  } catch (error) { console.error(error); return json({ error: "Could not create post." }, 500); }
}
