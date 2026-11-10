import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { allowRequest } from '@/lib/rate-limit';

// One route for the single-shot study tools. Each tool gets its own system
// prompt so the model is not told it is a "career counselor" when solving maths.
const TOOL_PROMPTS: Record<string, string> = {
  doubt:
    'You are a patient teacher for Indian government-exam aspirants (SSC, Banking, Railway, UPSC, State PSC, TET). ' +
    'Explain the concept clearly with a short example and the key points to remember. Keep it under 300 words.',
  math:
    'You are a maths tutor for Indian competitive exams. Solve the problem step by step, show every calculation, ' +
    'state the final answer clearly, and add one shortcut trick if a common one exists.',
  syllabus:
    'You are an exam analyst. Give a structured syllabus breakdown: sections and topics, approximate weightage, ' +
    'the highest-yield topics, and a short preparation strategy. Use headings and bullet points.',
  vocabulary:
    'You are an English vocabulary coach for SSC, IBPS and UPSC aspirants. Give accurate meanings, Hindi meaning, ' +
    'part of speech, example sentences, synonyms and antonyms in a clean list.',
  'answer-writer':
    'You are a UPSC/SSC descriptive-paper mentor. Write a model answer with Introduction, Body (key points, examples, ' +
    'data) and Conclusion, around 250 words, in the style examiners reward.',
};

const PER_IP_PER_HOUR = 20;
const MAX_PROMPT_CHARS = 2000;

export async function POST(request: NextRequest) {
  try {
    if (!allowRequest(request, PER_IP_PER_HOUR)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { tool, prompt, lang } = await request.json();
    const systemPrompt = TOOL_PROMPTS[tool];
    if (!systemPrompt) {
      return NextResponse.json({ error: 'Unknown tool' }, { status: 400 });
    }
    if (typeof prompt !== 'string' || !prompt.trim()) {
      return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
    }

    const langLine = lang === 'hi' ? 'Reply in Hindi (Devanagari).' : 'Reply in English.';
    const result = await callGemini({
      systemPrompt: `${systemPrompt}\n${langLine}`,
      userMessage: prompt.slice(0, MAX_PROMPT_CHARS),
      temperature: 0.4,
      maxTokens: 1500,
    });

    if (result.ok && result.data) {
      return NextResponse.json({ reply: result.data });
    }
    return NextResponse.json(
      { error: 'AI is temporarily unavailable. Please try again in a few minutes.' },
      { status: 503 },
    );
  } catch {
    return NextResponse.json({ error: 'Request failed' }, { status: 500 });
  }
}
