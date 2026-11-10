import type { Metadata } from 'next';
import { PYQClient } from '@/components/pyq/PYQClient';
import { RelatedLinks, PYQ_RELATED_LINKS } from '@/components/RelatedLinks';

export const metadata: Metadata = {
  title: 'PYQ Practice — Previous Year Question Papers | SarkariAlert',
  description:
    'Practice Previous Year Questions (PYQ) for JEE, NEET, GATE, SSC, UPSC, Railway, Banking, CBSE, State PSC and 60+ exams. Year-wise, subject-wise MCQ practice with instant answers and mock test mode.',
  keywords: [
    'previous year questions', 'PYQ', 'JEE Main PYQ', 'NEET PYQ', 'GATE PYQ',
    'SSC CGL PYQ', 'UPSC Prelims PYQ', 'IBPS PO PYQ', 'RRB NTPC PYQ',
    'CBSE board papers', 'mock test', 'exam practice', 'MCQ practice',
    'previous year papers with answers', 'question bank',
  ],
  openGraph: {
    title: 'PYQ Practice — Previous Year Questions | SarkariAlert',
    description: 'Practice PYQs for 60+ Indian exams — JEE, NEET, SSC, UPSC, Railway, Banking & more.',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'How to use previous year questions for exam preparation?',
    answer: 'Select your exam from the dropdown, choose the year and subject, then practice questions one by one. Review the correct answers after each question. Focus on topics where you make mistakes and revise them thoroughly.',
  },
  {
    question: 'PYQ se padhai kaise karein?',
    answer: 'Pehle apna exam select karein, phir year aur subject choose karein. Har question solve karein aur answer check karein. Jo topics mein galti ho, unhe dobara padhein. Daily 50-100 PYQ practice karna best strategy hai.',
  },
  {
    question: 'Which exams have PYQ available on SarkariAlert?',
    answer: 'SarkariAlert offers PYQs for 60+ exams including JEE Main, NEET, GATE, SSC CGL, SSC CHSL, UPSC Prelims, IBPS PO, RRB NTPC, CBSE Board, State PSC, and many more competitive exams.',
  },
  {
    question: 'Are these actual exam questions?',
    answer: 'Yes, these are actual questions from previous year examination papers. They are collected from official sources and organized year-wise and subject-wise for easy practice.',
  },
  {
    question: 'How many questions are available?',
    answer: 'SarkariAlert has a database of 10,00,000+ previous year questions across 60+ exams, covering multiple years and subjects. New questions are added regularly as more exams are conducted.',
  },
];

function FAQSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqData.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

export default function PYQPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <PYQClient />
      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
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

      <RelatedLinks title="Popular PYQ & Resources" links={PYQ_RELATED_LINKS} />

      {/* FAQ JSON-LD */}
      <FAQSchema />
    </main>
  );
}
