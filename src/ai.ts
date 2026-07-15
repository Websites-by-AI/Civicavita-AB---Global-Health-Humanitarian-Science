// OpenRouter API integration for the CIVICAVITA AI modules.
//
// Configure by adding to a `.env` file:
//   VITE_OPENROUTER_API_KEY=sk-or-...
//   VITE_OPENROUTER_MODEL=openai/gpt-4o-mini   (optional)
//
// If no key is present, the AI tools fall back to the built-in local
// demo generator, so the site always works.

export type Language = "en" | "fa" | "ar" | "sv";
export type ToolKey = "report" | "grant" | "blog" | "content";

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY as string | undefined;
const MODEL = (import.meta.env.VITE_OPENROUTER_MODEL as string | undefined) || "openai/gpt-4o-mini";
const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

export const hasOpenRouter = () => Boolean(API_KEY);

const languageInstruction: Record<Language, string> = {
  en: "Respond in clear professional English.",
  fa: "Respond in fluent, natural Persian (Farsi).",
  ar: "Respond in fluent, natural Modern Standard Arabic.",
  sv: "Respond in fluent, natural Swedish.",
};

const systemPrompt =
  "You are an assistant for CIVICAVITA AB, a founder-led global health, humanitarian science, and responsible-AI practice led by Sahar Motallebi (MD, MSc), who has 18+ years across ministries, NGOs, and UN agencies (WHO, UNICEF, UNDP). Write with rigor, humility, and field realism. Keep outputs concise and practical.";

const taskPrompt: Record<ToolKey, (input: string) => string> = {
  report: (q) =>
    `Create a structured outline for a scientific or technical report on: "${q}". Use numbered sections with brief descriptions. Include methods, findings, risks, recommendations, and an M&E plan.`,
  grant: (q) =>
    `Suggest 3-4 realistic funding directions relevant to these keywords: "${q}". For each, give a short name and one line on fit. End with a concise "fit note" on how to strengthen a proposal (measurable local outcomes, M&E, partnerships).`,
  blog: (q) =>
    `Draft a journal post in the first-person voice of Sahar Motallebi about: "${q}". Provide a compelling title and an engaging opening paragraph (120-180 words) grounded in real humanitarian and public health field experience.`,
  content: (q) =>
    `Generate 5 short social/advocacy content angles about: "${q}". Number them. Keep each to one sentence and make them concrete and dignified.`,
};

export async function runOpenRouter(
  tool: ToolKey,
  input: string,
  language: Language
): Promise<string> {
  if (!API_KEY) throw new Error("OpenRouter not configured");

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": typeof window !== "undefined" ? window.location.origin : "https://civicavita.org",
      "X-Title": "CIVICAVITA AB",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: `${systemPrompt} ${languageInstruction[language]}` },
        { role: "user", content: taskPrompt[tool](input.trim()) },
      ],
      temperature: 0.7,
      max_tokens: 700,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`OpenRouter error ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error("Empty response from OpenRouter");
  return String(content).trim();
}
