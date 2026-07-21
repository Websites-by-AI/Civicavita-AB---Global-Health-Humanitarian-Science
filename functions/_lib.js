const encoder = new TextEncoder();

export const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=UTF-8", ...headers } });

export const unauthorized = () => json({ error: "Unauthorized" }, 401);

function base64url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function base64urlText(text) { return base64url(encoder.encode(text)); }
async function sign(text, secret) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return base64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(text))));
}
function cookieValue(request, name) {
  const match = request.headers.get("Cookie")?.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
  return match?.[1];
}
export async function createSession(env) {
  if (!env.JWT_SECRET) throw new Error("Missing JWT_SECRET secret");
  const payload = base64urlText(JSON.stringify({ email: env.ADMIN_EMAIL, exp: Date.now() + 1000 * 60 * 60 * 8 }));
  return `${payload}.${await sign(payload, env.JWT_SECRET)}`;
}
export async function requireAdmin(request, env) {
  const token = cookieValue(request, "civicavita_admin");
  if (!token || !env.JWT_SECRET || !env.ADMIN_EMAIL) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || signature !== await sign(payload, env.JWT_SECRET)) return false;
  try {
    const padded = payload.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((payload.length + 3) % 4);
    const data = JSON.parse(atob(padded));
    return data.email === env.ADMIN_EMAIL && data.exp > Date.now();
  } catch { return false; }
}
export const sessionCookie = (token) => `civicavita_admin=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`;
export const clearSessionCookie = "civicavita_admin=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0";
