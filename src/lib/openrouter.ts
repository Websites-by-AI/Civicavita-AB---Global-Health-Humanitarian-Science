import { SettingsDB } from '../db/settings';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenRouterResponse {
  ok: boolean;
  text?: string;
  error?: string;
  usedFallback?: boolean;
}

/**
 * Call OpenRouter's chat completions endpoint.
 * Falls back gracefully if no API key is configured or the request fails.
 */
export async function callOpenRouter(
  messages: ChatMessage[],
  fallbackText?: string
): Promise<OpenRouterResponse> {
  const settings = SettingsDB.get();
  const { apiKey, model, siteName, siteUrl } = settings.openrouter;

  if (!apiKey) {
    return {
      ok: false,
      error: 'NO_API_KEY',
      text: fallbackText,
      usedFallback: true,
    };
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': siteUrl || 'https://civicavita.se',
        'X-Title': siteName || 'Civicavita AB',
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return {
        ok: false,
        error: `OpenRouter ${res.status}: ${errText.slice(0, 200)}`,
        text: fallbackText,
        usedFallback: true,
      };
    }

    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    if (!text) {
      return { ok: false, error: 'Empty response', text: fallbackText, usedFallback: true };
    }
    return { ok: true, text };
  } catch (e) {
    return {
      ok: false,
      error: (e as Error).message,
      text: fallbackText,
      usedFallback: true,
    };
  }
}

export function hasOpenRouterKey(): boolean {
  return !!SettingsDB.get().openrouter.apiKey;
}
