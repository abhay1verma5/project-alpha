import { NextRequest, NextResponse } from 'next/server';
import { callGemini } from '@/lib/gemini';
import { getStaticQuiz, type QuizQuestion } from '@/lib/static-quizzes';

// In-memory cache: key → { questions, timestamp }
const cache = new Map<string, { questions: QuizQuestion[]; ts: number }>();
const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

function getSystemPrompt(count: number) {
  return `You are a question paper setter for Indian competitive exams and school exams (NCERT/CBSE syllabus).
Generate exactly ${count} multiple-choice questions for the given exam/class and topic.

IMPORTANT:
- Generate EXACTLY ${count} questions, no more, no less
- Each question must have exactly 4 options
- Provide the correct answer as 0-indexed number (0, 1, 2, or 3)
- Include a brief explanation for each answer
- If the exam is a school class (Class 1 to 12), generate age-appropriate questions matching that class level and NCERT/CBSE syllabus
- If the exam is a competitive exam (SSC, UPSC, Railway, etc.), generate questions at that exam's difficulty level
- Questions must be unique and varied

Respond ONLY with valid JSON array (no markdown, no explanation):
[
  {
    "question": "question text",
    "options": ["option A", "option B", "option C", "option D"],
    "correct": 0,
    "explanation": "brief explanation"
  }
]`;
}

export async function POST(request: NextRequest) {
  try {
    const { exam, topic, lang, count: rawCount } = await request.json();

    if (!exam || !topic) {
      return NextResponse.json({ error: 'Exam and topic required' }, { status: 400 });
    }

    const count = [5, 10, 20, 30].includes(rawCount) ? rawCount : 10;
    const language = lang === 'hi' ? 'hi' : 'en';
    const cacheKey = `${exam}__${topic}__${language}__${count}`;

    // Check cache
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json({ questions: cached.questions, source: 'cache' });
    }

    const langInstruction = language === 'hi'
      ? 'Generate ALL questions, options, and explanations in Hindi (Devanagari script).'
      : 'Generate ALL questions, options, and explanations in English.';

    const maxTokens = count <= 10 ? 4096 : count <= 20 ? 8192 : 12000;

    const result = await callGemini<QuizQuestion[]>({
      systemPrompt: getSystemPrompt(count),
      userMessage: `Exam: ${exam.replace(/_/g, ' ').toUpperCase()}\nTopic: ${topic.replace(/_/g, ' ')}\n${langInstruction}`,
      temperature: 0.7,
      maxTokens,
      json: true,
    });

    if (result.ok && Array.isArray(result.data) && result.data.length >= 3) {
      const questions = result.data.slice(0, count);
      cache.set(cacheKey, { questions, ts: Date.now() });
      return NextResponse.json({ questions, source: 'ai' });
    }

    // Fallback to static quiz bank
    const staticQuiz = getStaticQuiz(exam, topic);
    if (staticQuiz) {
      return NextResponse.json({ questions: staticQuiz, source: 'static' });
    }

    // Try matching topic across other exams (but only same subject, never GK for chemistry etc.)
    const baseTopic = topic.split(' - ')[0].toLowerCase().replace(/\s+/g, '_');
    const topicFallbacks = ['ssc_cgl', 'railway', 'banking', 'upsc'];
    for (const fb of topicFallbacks) {
      const fbQuiz = getStaticQuiz(fb, baseTopic);
      if (fbQuiz) return NextResponse.json({ questions: fbQuiz, source: 'static' });
    }
    // Map school sub-subjects to broader topics
    const subjectMap: Record<string, string> = {
      physics: 'science', chemistry: 'science', biology: 'science',
      algebra: 'math', geometry: 'math', trigonometry: 'math', calculus: 'math',
      statistics: 'math', mensuration: 'math', coordinate: 'math', vectors: 'math',
      probability: 'math', matrices: 'math',
      history: 'gk', geography: 'gk', civics: 'gk', economics: 'gk', polity: 'gk',
    };
    const mapped = subjectMap[baseTopic];
    if (mapped) {
      for (const fb of topicFallbacks) {
        const fbQuiz = getStaticQuiz(fb, mapped);
        if (fbQuiz) return NextResponse.json({ questions: fbQuiz, source: 'static' });
      }
    }

    return NextResponse.json({ error: 'Could not generate quiz. Please try again.' }, { status: 500 });
  } catch {
    return NextResponse.json({ error: 'Quiz generation failed' }, { status: 500 });
  }
}
