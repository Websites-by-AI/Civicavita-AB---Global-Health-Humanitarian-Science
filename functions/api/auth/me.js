import { json, requireAdmin, unauthorized } from "../../_lib.js";
export async function onRequestGet({ request, env }) {
  if (!(await requireAdmin(request, env))) return unauthorized();
  return json({ user: { id: "admin", name: "Administrator", email: env.ADMIN_EMAIL, role: "admin" } });
}
