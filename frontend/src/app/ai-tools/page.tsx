import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Brain, ClipboardCheck, MessageCircle, Search, ChevronRight, FileText, Mic, Keyboard, Lightbulb, BookOpen, PenTool, HelpCircle, Languages, Calculator } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Tools — Quiz, Resume Builder, Interview Prep, Career Advisor | SarkariAlert',
  description: 'Free AI-powered tools for government exam preparation. AI Quiz, Resume Builder, Interview Prep, Eligibility Checker, Career Advisor, Typing Test, GK Flashcards.',
  keywords: 'ai tools, sarkari exam ai, quiz generator, eligibility checker, career advisor, government job ai, resume builder, interview prep, typing test',
};

const AI_TOOLS = [
  {
    href: '/search',
    icon: Search,
    title: 'AI Search',
    title_hi: 'AI खोज',
    description: 'Search government jobs in natural language. Understands Hindi, English & Hinglish — with voice support.',
    gradient: 'from-blue-600 to-indigo-600',
    border: 'border-blue-200 dark:border-blue-800',
    tag: 'Smart Search',
  },
  {
    href: '/ai-quiz',
    icon: Brain,
    title: 'AI Quiz Generator',
    title_hi: 'AI क्विज़ जनरेटर',
    description: 'Practice MCQs for SSC, UPSC, Railway, Banking & more. AI generates fresh questions every time.',
    gradient: 'from-purple-600 to-fuchsia-600',
    border: 'border-purple-200 dark:border-purple-800',
    tag: 'Most Popular',
  },
  {
    href: '/ai-eligibility',
    icon: ClipboardCheck,
    title: 'AI Eligibility Checker',
    title_hi: 'AI पात्रता जाँच',
    description: 'Enter your age, education & category — instantly see which 30+ government exams you qualify for.',
    gradient: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-200 dark:border-emerald-800',
    tag: 'Quick Check',
  },
  {
    href: '/ai-career',
    icon: MessageCircle,
    title: 'AI Career Advisor',
    title_hi: 'AI करियर सलाहकार',
    description: 'Chat with AI about your government career path. Get personalized advice in Hindi or English.',
    gradient: 'from-orange-500 to-amber-600',
    border: 'border-orange-200 dark:border-orange-800',
    tag: 'Chat Bot',
  },
  {
    href: '/ai-resume',
    icon: FileText,
    title: 'AI Resume Builder',
    title_hi: 'AI रिज़्यूमे बिल्डर',
    description: 'Generate a professional government job-optimized resume using AI. Just fill your details and get a ready resume.',
    gradient: 'from-violet-600 to-purple-600',
    border: 'border-violet-200 dark:border-violet-800',
    tag: 'New',
  },
  {
    href: '/ai-interview',
    icon: Mic,
    title: 'AI Interview Prep',
    title_hi: 'AI इंटरव्यू प्रेप',
    description: 'Practice interview questions for specific government roles. Get AI-generated tips for each question.',
    gradient: 'from-sky-600 to-blue-600',
    border: 'border-sky-200 dark:border-sky-800',
    tag: 'New',
  },
  {
    href: '/typing-test',
    icon: Keyboard,
    title: 'Typing Speed Test',
    title_hi: 'टाइपिंग टेस्ट',
    description: 'Practice typing for SSC CHSL, CGL, IBPS exams. Track your WPM and accuracy in real-time.',
    gradient: 'from-green-600 to-emerald-600',
    border: 'border-green-200 dark:border-green-800',
    tag: 'Practice',
  },
  {
    href: '/flashcards',
    icon: Lightbulb,
    title: 'GK Flashcards',
    title_hi: 'GK फ्लैशकार्ड्स',
    description: 'Study general knowledge with swipeable flashcards. Covers polity, geography, science, history & more.',
    gradient: 'from-amber-500 to-orange-500',
    border: 'border-amber-200 dark:border-amber-800',
    tag: 'Study',
  },
  {
    href: '/ai-syllabus',
    icon: BookOpen,
    title: 'AI Syllabus Analyzer',
    title_hi: 'AI सिलेबस एनालाइज़र',
    description: 'Get detailed syllabus breakdown with topic weightage and preparation strategy for any exam.',
    gradient: 'from-teal-600 to-cyan-600',
    border: 'border-teal-200 dark:border-teal-800',
    tag: 'New',
  },
  {
    href: '/ai-answer-writer',
    icon: PenTool,
    title: 'AI Answer Writer',
    title_hi: 'AI उत्तर लेखक',
    description: 'Get model answers for descriptive/essay questions. Perfect for UPSC Mains and SSC descriptive papers.',
    gradient: 'from-rose-600 to-pink-600',
    border: 'border-rose-200 dark:border-rose-800',
    tag: 'New',
  },
  {
    href: '/ai-doubt',
    icon: HelpCircle,
    title: 'AI Doubt Solver',
    title_hi: 'AI डाउट सॉल्वर',
    description: 'Ask any GK, Science, History, Polity doubt. AI explains concepts clearly with examples.',
    gradient: 'from-indigo-600 to-blue-600',
    border: 'border-indigo-200 dark:border-indigo-800',
    tag: 'New',
  },
  {
    href: '/ai-vocabulary',
    icon: Languages,
    title: 'AI Vocabulary Builder',
    title_hi: 'AI शब्दावली बिल्डर',
    description: 'Build English vocabulary with meanings, synonyms, usage examples, and Hindi translations.',
    gradient: 'from-emerald-600 to-green-600',
    border: 'border-emerald-200 dark:border-emerald-800',
    tag: 'New',
  },
  {
    href: '/ai-math',
    icon: Calculator,
    title: 'AI Math Solver',
    title_hi: 'AI गणित सॉल्वर',
    description: 'Solve arithmetic, algebra, number series & quantitative aptitude with step-by-step AI solutions.',
    gradient: 'from-blue-600 to-violet-600',
    border: 'border-blue-200 dark:border-blue-800',
    tag: 'New',
  },
];

export default function AiToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 py-10 sm:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-purple-100 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powered by Google Gemini AI
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-3">
            AI Tools & Study Aids
          </h1>
          <p className="text-base sm:text-lg text-purple-100 max-w-xl mx-auto">
            Free AI-powered tools to supercharge your government exam preparation
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 mb-16 md:mb-0">
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
          {AI_TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`group relative bg-white dark:bg-gray-900 rounded-2xl border-2 ${tool.border} p-6 sm:p-7 hover:shadow-xl transition-all active:scale-[0.98]`}
            >
              <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                {tool.tag}
              </span>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center shadow-lg mb-4`}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">
                {tool.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                {tool.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 group-hover:gap-2.5 transition-all">
                Open Tool <ChevronRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
