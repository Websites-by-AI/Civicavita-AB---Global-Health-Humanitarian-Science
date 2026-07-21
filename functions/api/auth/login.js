import { createSession, json, sessionCookie } from "../../_lib.js";
export async function onRequestPost({ request, env }) {
  try {
    const { email, password } = await request.json();
    if (!env.ADMIN_EMAIL || !env.ADMIN_PASSWORD || !env.JWT_SECRET) {
      return json({ error: "Admin secrets are not configured." }, 503);
    }
    if (String(email).trim().toLowerCase() !== env.ADMIN_EMAIL.toLowerCase() || password !== env.ADMIN_PASSWORD) {
      return json({ error: "Invalid email or password." }, 401);
    }
    const token = await createSession(env);
    return json({ ok: true, user: { id: "admin", name: "Administrator", email: env.ADMIN_EMAIL, role: "admin" } }, 200, { "Set-Cookie": sessionCookie(token) });
  } catch { return json({ error: "Invalid request." }, 400); }
}
