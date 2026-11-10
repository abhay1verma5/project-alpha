import type { Metadata } from 'next';
import { EXAM_PATTERNS } from '@/lib/exam-patterns';
import { ExamPatternIndex } from './ExamPatternIndex';

export const metadata: Metadata = {
  title: 'Exam Pattern & Weightage 2026-27 — SSC, UPSC, Railway, Bank, Police, TET, JEE, NEET, GATE',
  description:
    'Exam pattern for 100+ government and entrance exams: stages, sections, number of questions, marks, duration, negative marking and section-wise weightage. Filter by 10th pass, 12th pass, graduate, state and category.',
  alternates: { canonical: 'https://sarkarialert.online/exam-pattern' },
};

export default function ExamPatternPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Exam patterns',
    numberOfItems: EXAM_PATTERNS.length,
    itemListElement: EXAM_PATTERNS.slice(0, 50).map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: `https://sarkarialert.online/exam-pattern/${p.key}`,
    })),
  };
  const examPatternFaqData = [
    {
      question: 'What is the exam pattern for SSC CGL 2026-27?',
      answer: 'SSC CGL has 2 tiers. Tier-1 (online): 100 questions, 200 marks, 60 minutes — 4 sections: General Intelligence, General Awareness, Quantitative Aptitude, English. Tier-2 (online): Multiple papers including Maths (390 marks), English (200 marks), and General Studies (200 marks).',
    },
    {
      question: 'Government exam pattern kaise check karein?',
      answer: 'SarkariAlert par 100+ government exams ka detailed pattern available hai. Har exam ke liye sections, questions, marks, duration, negative marking aur section-wise weightage diya gaya hai. Search karein ya category se filter karein.',
    },
    {
      question: 'Is there negative marking in government exams?',
      answer: 'Most government exams have negative marking. SSC exams deduct 0.50 marks per wrong answer (for 2-mark questions). UPSC Prelims deducts 0.66 marks. Banking exams deduct 0.25 marks. Some exams like CTET and certain state exams have no negative marking.',
    },
    {
      question: 'How many stages are there in government exams?',
      answer: 'It varies by exam. SSC CGL: 2 tiers + Document Verification. UPSC CSE: Prelims + Mains + Interview. Banking: Prelims + Mains + Interview. Railway NTPC: CBT-1 + CBT-2 + Typing/CBAT. Some exams also include Physical Test (PET/PST).',
    },
    {
      question: 'What is section-wise weightage and why is it important?',
      answer: 'Section-wise weightage shows how marks are distributed across different subjects. For example, in SSC CGL Tier-1, each section carries 25% weightage. Knowing weightage helps you allocate preparation time proportionally and focus on high-scoring sections.',
    },
    {
      question: 'Can I skip sections in government exams?',
      answer: 'In most government exams, there are no sectional cutoffs for Tier-1/Prelims — overall score matters. However, some exams like IBPS PO have sectional cutoffs meaning you must score minimum marks in each section. Always check the specific exam notification.',
    },
    {
      question: 'What is the duration of major government exams?',
      answer: 'SSC CGL Tier-1: 60 minutes, UPSC Prelims: 2 hours per paper, IBPS PO Prelims: 60 minutes, RRB NTPC CBT-1: 90 minutes, CTET: 150 minutes, NDA: 150 minutes per paper. PwD candidates usually get 20-30 minutes extra time.',
    },
    {
      question: 'How to prepare based on exam pattern?',
      answer: 'Step 1: Understand the pattern — sections, marks, time. Step 2: Check weightage to prioritize subjects. Step 3: Practice with previous year papers matching the pattern. Step 4: Time management — allocate minutes per section proportionally. Step 5: Mock tests simulating exact pattern.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: examPatternFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Exam pattern & weightage</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
        {EXAM_PATTERNS.length} exams. Section weightage is computed from the official marks split. Entries marked
        "re-check" follow the latest notification we could find — confirm before your exam cycle.
      </p>
      <ExamPatternIndex patterns={EXAM_PATTERNS} />

      <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Exam Pattern
        </h2>
        <div className="space-y-4">
          {examPatternFaqData.map((faq, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50">
                {faq.question}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
