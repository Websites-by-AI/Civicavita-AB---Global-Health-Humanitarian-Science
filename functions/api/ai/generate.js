import { json, requireAdmin } from "../../_lib.js";

// Public AI tools are rate-sensitive. For production, place /api/ai/* behind
// Cloudflare Turnstile or add a per-IP rate limiter before enabling anonymous use.
export async function onRequestPost({ request, env }) {
  try {
    const { prompt, language = "en" } = await request.json();
    if (!prompt || typeof prompt !== "string" || prompt.length > 7000) return json({ error: "Invalid prompt." }, 400);
    if (!env.OPENROUTER_API_KEY) return json({ error: "AI service is not configured." }, 503);
    const languageNames = { en: "English", fa: "Persian (Farsi)", sv: "Swedish", fr: "French", ar: "Arabic" };
    const system = `You are CIVICAVITA AB's responsible global-health writing assistant. Reply only in ${languageNames[language] || "English"}. Use clear Markdown with short headings, bullet lists where useful, and no HTML. Do not invent organisations, partnerships, project results, beneficiary numbers, citations, funding opportunities, medical facts, or personal experience. State assumptions and items needing verification.`;
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${env.OPENROUTER_API_KEY}` },
      body: JSON.stringify({ model: env.OPENROUTER_MODEL || "openai/gpt-4o-mini", temperature: 0.4, max_tokens: 1200, messages: [{ role: "system", content: system }, { role: "user", content: prompt }] })
    });
    if (!response.ok) return json({ error: "AI service returned an error." }, 502);
    const data = await response.json();
    const output = data?.choices?.[0]?.message?.content;
    if (!output) return json({ error: "AI service returned no content." }, 502);
    return json({ output: String(output) });
  } catch (error) { console.error(error); return json({ error: "Could not generate content." }, 500); }
}
