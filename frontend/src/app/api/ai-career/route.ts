import { NextRequest, NextResponse } from 'next/server';
import { callGeminiChat } from '@/lib/gemini';
import { allowRequest } from '@/lib/rate-limit';

const SYSTEM_PROMPT = `You are an expert Indian government career counselor for SarkariAlert.
Your job is to help students and job seekers find the right government career path.

Rules:
- You are friendly and supportive, like a mentor
- You understand Hindi, English, and Hinglish — respond in the same language the user uses
- Give specific, actionable advice about government exams (SSC, UPSC, Railway, Banking, Defence, Police, Teaching, Medical, Engineering)
- Include exam names, age limits, qualification requirements, salary ranges when relevant
- If the user hasn't shared their profile, ask about their age, education, and interests
- Suggest preparation strategies, time management, book recommendations
- Be encouraging but realistic about exam difficulty
- Keep responses concise (2-4 paragraphs max)
- Use bullet points for lists
- If asked about non-government topics, gently redirect to government career guidance`;

const MAX_CONTEXT_MESSAGES = 6;

export async function POST(request: NextRequest) {
  try {
    if (!allowRequest(request, 30)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages required' }, { status: 400 });
    }

    if (messages.length > 10) {
      return NextResponse.json({ error: 'Message limit reached' }, { status: 429 });
    }

    // Trim to last N messages for context window
    const contextMessages = messages.slice(-MAX_CONTEXT_MESSAGES).map((m: { role: string; text: string }) => ({
      role: m.role as 'user' | 'model',
      text: m.text,
    }));

    const result = await callGeminiChat({
      systemPrompt: SYSTEM_PROMPT,
      messages: contextMessages,
      temperature: 0.7,
      maxTokens: 1024,
    });

    if (result.ok && result.data) {
      return NextResponse.json({ reply: result.data });
    }

    // Fallback response
    return NextResponse.json({
      reply: 'I apologize, I am temporarily unavailable. Please try again in a moment. Meanwhile, you can explore our AI Search to find relevant government jobs.\n\nक्षमा करें, मैं अभी उपलब्ध नहीं हूँ। कृपया कुछ देर बाद पुनः प्रयास करें।',
    });
  } catch {
    return NextResponse.json({ error: 'Career advice failed' }, { status: 500 });
  }
}
