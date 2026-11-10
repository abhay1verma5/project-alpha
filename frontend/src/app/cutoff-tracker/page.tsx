import type { Metadata } from 'next';
import { CutoffTrackerClient } from './CutoffTrackerClient';
import { CUTOFF_DATA } from './cutoff-data';

export const metadata: Metadata = {
  title: 'Cut-off Marks Tracker 2026-27 — SSC, Railway, Banking, UPSC, CTET | 20+ Exams',
  description: `View historical cut-off marks (2022-2026) for ${CUTOFF_DATA.length}+ government exams including SSC CGL, CHSL, MTS, IBPS PO, SBI PO, RRB NTPC, UPSC CSE, CTET. Category-wise: Gen, EWS, OBC, SC, ST.`,
  alternates: { canonical: 'https://sarkarialert.online/cutoff-tracker' },
};

const cutoffFaqData = [
  {
    question: 'What are the cut-off marks for SSC CGL 2026?',
    answer: 'SSC CGL Tier-1 2026 cut-off marks are approximately: General 149, EWS 144, OBC 137, SC 126, ST 116 out of 200.',
  },
  {
    question: 'How are government exam cut-off marks decided?',
    answer: 'Cut-off marks are decided based on the number of vacancies, total candidates, difficulty level of the exam, and reservation policy for different categories (General, EWS, OBC, SC, ST).',
  },
  {
    question: 'Do cut-off marks change every year?',
    answer: 'Yes, cut-off marks change every year based on factors like number of applicants, difficulty of the paper, and available vacancies. Generally, cut-offs have shown an upward trend.',
  },
  {
    question: 'Kya OBC/SC/ST ke liye cut-off kam hota hai?',
    answer: 'Haan, reservation policy ke tahat OBC, SC, ST aur EWS categories ke liye cut-off General se kam hota hai. Usually OBC ka cutoff General se 10-15 marks kam, SC ka 20-30 marks kam aur ST ka sabse kam hota hai.',
  },
  {
    question: 'How to predict cut-off marks before result?',
    answer: 'You can estimate cut-off by analyzing previous year trends, checking the difficulty level of the paper, and comparing with coaching institute expected cut-offs. Our tracker shows 5-year historical data to help you predict.',
  },
  {
    question: 'What is the difference between Tier-1 and Tier-2 cut-off?',
    answer: 'Tier-1 cut-off is the qualifying marks needed to appear for Tier-2. Tier-2 cut-off is the final marks for selection to the post. Tier-2 cut-offs are usually higher and post-specific (e.g., Tax Assistant vs Auditor in SSC CGL).',
  },
  {
    question: 'Which government exam has the lowest cut-off?',
    answer: 'Exams like SSC MTS, SSC GD Constable, and Railway Group D typically have lower cut-offs compared to SSC CGL, UPSC CSE, or Banking PO exams. However, competition is still very high due to the large number of applicants.',
  },
  {
    question: 'Is normalisation applied in SSC/Railway exams?',
    answer: 'Yes, SSC and Railway exams use normalisation formula when the exam is conducted in multiple shifts. This adjusts scores based on the difficulty level of each shift to ensure fairness. Your normalised score may differ from raw marks.',
  },
];

export default function CutoffTrackerPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cutoffFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CutoffTrackerClient />

      <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Cut-off Marks
        </h2>
        <div className="space-y-4">
          {cutoffFaqData.map((faq, i) => (
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
