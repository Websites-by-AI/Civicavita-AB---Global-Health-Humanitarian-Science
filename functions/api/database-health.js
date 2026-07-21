import { json, requireAdmin, unauthorized } from "../_lib.js";
export async function onRequestGet({ request, env }) {
  if (!(await requireAdmin(request, env))) return unauthorized();
  try {
    if (!env.DB) return json({ ok: false, error: "D1 binding DB is missing." }, 500);
    const result = await env.DB.prepare("SELECT datetime('now') AS database_time").first();
    return json({ ok: true, database: "civicavita", database_time: result?.database_time, environment: env.APP_ENV || "production" });
  } catch (error) { console.error(error); return json({ ok: false, error: "D1 connection failed." }, 500); }
}
