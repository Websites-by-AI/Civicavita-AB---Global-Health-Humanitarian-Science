import { json, requireAdmin, unauthorized } from "../../_lib.js";
const clean = (value, max = 20000) => String(value ?? "").trim().slice(0, max);
const rowToPost = (row) => ({ ...row, tags: JSON.parse(row.tags || "[]") });
const select = "SELECT id,title,excerpt,content,category,author,author_role AS authorRole,date,cover_emoji AS coverEmoji,cover_image AS coverImage,read_minutes AS readMinutes,tags,locale,translation_key AS translationKey FROM posts WHERE id=?";
export async function onRequestPut({ request, env, params }) {
  if (!(await requireAdmin(request, env))) return unauthorized();
  try {
    const p = await request.json();
    if (!clean(p.title,300) || !clean(p.content)) return json({ error: "Title and content are required." }, 400);
    const result = await env.DB.prepare("UPDATE posts SET title=?,excerpt=?,content=?,category=?,author=?,author_role=?,date=?,cover_emoji=?,cover_image=?,read_minutes=?,tags=?,locale=?,translation_key=?,updated_at=CURRENT_TIMESTAMP WHERE id=?")
      .bind(clean(p.title,300),clean(p.excerpt,1000),clean(p.content),clean(p.category,100),clean(p.author,150),clean(p.authorRole,150),clean(p.date,10),clean(p.coverEmoji,12),clean(p.coverImage,500) || null,Number(p.readMinutes)||1,JSON.stringify(Array.isArray(p.tags)?p.tags.slice(0,20).map(x=>clean(x,50)):[]),["en","fa","sv","fr","ar"].includes(p.locale) ? p.locale : "en",clean(p.translationKey,100) || null,params.id).run();
    if (!result.meta.changes) return json({ error: "Post not found." }, 404);
    return json({ post: rowToPost(await env.DB.prepare(select).bind(params.id).first()) });
  } catch (error) { console.error(error); return json({ error: "Could not update post." }, 500); }
}
export async function onRequestDelete({ request, env, params }) {
  if (!(await requireAdmin(request, env))) return unauthorized();
  const result = await env.DB.prepare("DELETE FROM posts WHERE id=?").bind(params.id).run();
  return result.meta.changes ? json({ ok: true }) : json({ error: "Post not found." }, 404);
}
