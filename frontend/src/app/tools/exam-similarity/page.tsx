import type { Metadata } from 'next';
import { ExamSimilarity } from '@/components/tools/ExamSimilarity';

export const metadata: Metadata = {
  title: 'Exam Similarity Finder — कौन सी परीक्षाएं मिलती-जुलती हैं? | SarkariAlert',
  description: 'Find which government exams share syllabus overlap. Preparing for SSC CGL? See 70-90% overlap with CHSL, CPO, MTS. Compare difficulty, salary & common subjects for 20+ exams.',
  keywords: [
    'exam similarity finder',
    'syllabus overlap',
    'ssc cgl similar exams',
    'ibps po similar exams',
    'upsc similar exams',
    'government exam comparison',
    'exam overlap calculator',
    'common syllabus exams',
    'sarkari exam similarity',
    'मिलती जुलती परीक्षाएं',
  ],
  alternates: { canonical: 'https://sarkarialert.online/tools/exam-similarity' },
};

const faqs = [
  {
    q: 'What is the Exam Similarity Finder?',
    a: 'The Exam Similarity Finder shows you which government exams share common syllabus topics. For example, if you are preparing for SSC CGL, it shows that CHSL and CPO have 80-90% syllabus overlap, so your preparation covers multiple exams.',
  },
  {
    q: 'How is the overlap percentage calculated?',
    a: 'The overlap percentage is based on common subjects, topic weightage, and question pattern similarity between two exams. A higher percentage means the exams share more syllabus content and preparing for one significantly helps with the other.',
  },
  {
    q: 'Which exams have the highest syllabus overlap?',
    a: 'Banking exams (IBPS PO, SBI PO, IBPS Clerk, SBI Clerk) share 85-92% overlap. SSC exams (CGL, CHSL, CPO) share 80-90% overlap. State PSC exams (UPPSC, BPSC, MPPSC) share 85-90% overlap with each other and with UPSC Prelims.',
  },
  {
    q: 'Can I prepare for multiple exams at once?',
    a: 'Yes! That is the main purpose of this tool. If two exams have 70%+ overlap, your preparation for one exam covers most of the syllabus for the other. Focus on the common subjects first, then prepare exam-specific topics separately.',
  },
  {
    q: 'Are the salary ranges accurate?',
    a: 'Salary ranges shown are based on the 7th Pay Commission basic pay scales. Actual in-hand salary depends on posting location (HRA), allowances, and deductions. Use our Salary Calculator tool for detailed breakdowns.',
  },
  {
    q: 'How many exams are covered in this tool? (कितनी परीक्षाएं कवर की गई हैं?)',
    a: 'Currently, the tool covers 20+ major government exams including SSC (CGL, CHSL, MTS, GD, CPO), Banking (IBPS PO/Clerk, SBI PO/Clerk), Railway (NTPC, Group D, JE), UPSC Prelims, NDA, CDS, CTET, UGC NET, and State PSCs (UPPSC, BPSC, MPPSC).',
  },
];

export default function ExamSimilarityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Exam Similarity Finder — कौन सी परीक्षाएं मिलती-जुलती हैं?
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          अपनी परीक्षा चुनें और देखें कि किन-किन परीक्षाओं का सिलेबस मिलता-जुलता है। एक तैयारी, कई परीक्षाएं!
        </p>
      </div>

      <ExamSimilarity />

      {/* FAQ Section */}
      <div className="mt-12 space-y-4">
        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3">
          {faqs.map((item, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors list-none">
                {item.q}
                <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://sarkarialert.online',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Tools',
                item: 'https://sarkarialert.online/tools',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Exam Similarity Finder',
                item: 'https://sarkarialert.online/tools/exam-similarity',
              },
            ],
          }),
        }}
      />

      {/* FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: { '@type': 'Answer', text: faq.a },
            })),
          }),
        }}
      />
    </div>
  );
}
