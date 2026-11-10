// Gemini access for the AI routes.
//
// gemini-2.5-flash is retired for new API keys, and gemini-3.x models are served
// through the Interactions API (POST /v1beta/interactions). We try that first and
// keep generateContent as a fallback for any key that still has an older model.
//
// Free Tier keys allow roughly 20 requests/day, so every route that calls this
// must sit behind the per-IP limiter in ./rate-limit.ts.

const INTERACTIONS_URL = 'https://generativelanguage.googleapis.com/v1beta/interactions';
const INTERACTIONS_MODELS = ['gemini-3.8-flash'];
const LEGACY_MODELS = ['gemini-3.8-flash'];

function getGeminiKey() {
  return process.env.GEMINI_API_KEY || '';
}

interface GeminiOptions {
  systemPrompt: string;
  userMessage: string;
  temperature?: number;
  maxTokens?: number;
  /** If true, parse response as JSON (handles markdown code blocks) */
  json?: boolean;
}

interface GeminiResult<T = string> {
  ok: boolean;
  data: T;
  raw?: string;
}

interface InteractionStep {
  type?: string;
  content?: { type?: string; text?: string }[];
}

async function callInteractions(key: string, systemPrompt: string, input: string, maxTokens: number): Promise<string | null> {
  for (const model of INTERACTIONS_MODELS) {
    try {
      const response = await fetch(INTERACTIONS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
        body: JSON.stringify({
          model,
          system_instruction: systemPrompt,
          input,
          store: false,
          generation_config: { max_output_tokens: maxTokens, thinking_level: 'minimal' },
        }),
      });
      if (!response.ok) continue;
      const data = await response.json();
      const steps: InteractionStep[] = data.steps || [];
      const text = steps
        .filter((s) => s.type === 'model_output')
        .flatMap((s) => s.content || [])
        .filter((c) => c.type === 'text' && c.text)
        .map((c) => c.text)
        .join('');
      if (text) return text;
    } catch {
      continue;
    }
  }
  return null;
}

async function callGenerateContent(
  key: string,
  contents: unknown[],
  temperature: number,
  maxTokens: number,
): Promise<string | null> {
  for (const model of LEGACY_MODELS) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents, generationConfig: { temperature, maxOutputTokens: maxTokens } }),
        },
      );
      if (!response.ok) continue;
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (text) return text;
    } catch {
      continue;
    }
  }
  return null;
}

/**
 * Call Gemini with a system prompt and one user message.
 * Returns { ok, data, raw } where data is parsed JSON (if json=true) or raw text.
 */
export async function callGemini<T = string>(opts: GeminiOptions): Promise<GeminiResult<T>> {
  const key = getGeminiKey();
  if (!key) {
    return { ok: false, data: '' as unknown as T };
  }

  const maxTokens = opts.maxTokens ?? 1024;
  const raw =
    (await callInteractions(key, opts.systemPrompt, opts.userMessage, maxTokens)) ??
    (await callGenerateContent(
      key,
      [{ role: 'user', parts: [{ text: `${opts.systemPrompt}\n\n${opts.userMessage}` }] }],
      opts.temperature ?? 0.1,
      maxTokens,
    ));

  if (!raw) {
    return { ok: false, data: '' as unknown as T };
  }

  if (!opts.json) {
    return { ok: true, data: raw as unknown as T, raw };
  }

  // Parse JSON — handle markdown code blocks
  try {
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);
    return { ok: true, data: parsed as T, raw };
  } catch {
    return { ok: false, data: '' as unknown as T, raw };
  }
}

/**
 * Call Gemini with multi-turn conversation history.
 */
export async function callGeminiChat(opts: {
  systemPrompt: string;
  messages: { role: 'user' | 'model'; text: string }[];
  temperature?: number;
  maxTokens?: number;
}): Promise<GeminiResult<string>> {
  const key = getGeminiKey();
  if (!key) {
    return { ok: false, data: '' };
  }

  const maxTokens = opts.maxTokens ?? 1024;

  // Interactions API: send the history as one transcript, last user turn at the end.
  const transcript = opts.messages
    .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
    .join('\n\n');
  const interactionsText = await callInteractions(
    key,
    `${opts.systemPrompt}\n\nThe conversation so far is given as a transcript. Reply as the Assistant to the last User turn only.`,
    transcript,
    maxTokens,
  );
  if (interactionsText) {
    return { ok: true, data: interactionsText, raw: interactionsText };
  }

  const contents = [
    { role: 'user', parts: [{ text: opts.systemPrompt }] },
    { role: 'model', parts: [{ text: 'Understood. I will follow these instructions.' }] },
    ...opts.messages.map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    })),
  ];
  const legacyText = await callGenerateContent(key, contents, opts.temperature ?? 0.7, maxTokens);
  if (legacyText) {
    return { ok: true, data: legacyText, raw: legacyText };
  }
  return { ok: false, data: '' };
}
