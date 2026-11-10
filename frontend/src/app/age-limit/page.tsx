import type { Metadata } from 'next';
import { AGE_LIMIT_DATA } from './age-limit-data';
import { AgeLimitIndex } from './AgeLimitIndex';

export const metadata: Metadata = {
  title: 'Age Limit for Government Exams 2026-27 — SSC, Railway, Banking, UPSC, Police, Defence',
  description: `Category-wise age limit and relaxation for ${AGE_LIMIT_DATA.length}+ government exams. Check Gen, OBC, SC/ST, PwD, Ex-Servicemen age limits for SSC CGL, IBPS PO, RRB NTPC, UPSC CSE and more.`,
  alternates: { canonical: 'https://sarkarialert.online/age-limit' },
};

const ageLimitFaqData = [
  {
    question: 'What is the general age limit for government exams?',
    answer: 'Most government exams have an age limit of 18-27 years for General category. However, some exams like UPSC CSE allow up to 32 years, banking exams up to 30 years, and teaching exams up to 35 years. Age is calculated as of the cutoff date mentioned in the notification.',
  },
  {
    question: 'Sarkari naukri mein OBC ko kitne saal ki chhoot milti hai?',
    answer: 'OBC (Non-Creamy Layer) candidates ko sabhi central government exams mein 3 saal ki age relaxation milti hai. Matlab agar General ke liye age limit 27 saal hai, to OBC ke liye 30 saal hoga. Kuch state government exams mein 5 saal tak ki chhoot bhi milti hai.',
  },
  {
    question: 'How much age relaxation do SC/ST candidates get?',
    answer: 'SC/ST candidates get 5 years age relaxation in all central government exams. For example, if the upper age limit is 27 for General, SC/ST can apply up to 32 years. In some state exams, the relaxation can be even higher.',
  },
  {
    question: 'What age relaxation is available for PwD candidates?',
    answer: 'PwD (Persons with Disability) candidates get 10 years relaxation for General-PwD, 13 years for OBC-PwD, and 15 years for SC/ST-PwD. This makes PwD one of the most relaxed categories in terms of age limit.',
  },
  {
    question: 'Do ex-servicemen get age relaxation in government jobs?',
    answer: 'Yes, ex-servicemen get 3 years relaxation plus the period of military service (up to 5 years). Effectively, they get 3+service years relaxation. Disabled ex-servicemen get additional 3 years. This applies to most central and state government jobs.',
  },
  {
    question: 'What is the age cutoff date for SSC exams?',
    answer: 'For SSC exams, the age cutoff date is usually 01 January or 01 August of the notification year. For example, SSC CGL 2026 has cutoff date 01-01-2027. Your age on this specific date determines eligibility, not the exam date or application date.',
  },
  {
    question: 'Is there any age relaxation for female candidates?',
    answer: 'Some exams like SSC CPO, CDS, and state police jobs give 2-3 years extra age relaxation to female candidates. However, most central government exams like SSC CGL, IBPS PO, UPSC CSE do not provide additional relaxation for female candidates beyond their category relaxation.',
  },
  {
    question: 'How many attempts are allowed in UPSC CSE?',
    answer: 'UPSC CSE allows 6 attempts for General, 9 for OBC, and unlimited for SC/ST (until age limit). For General category, the age limit is 32 years with 6 attempts maximum. EWS candidates also get 6 attempts.',
  },
];

export default function AgeLimitPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Government Exam Age Limits',
    numberOfItems: AGE_LIMIT_DATA.length,
    itemListElement: AGE_LIMIT_DATA.map((e, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${e.name} Age Limit`,
      url: `https://sarkarialert.online/age-limit/${e.slug}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: ageLimitFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Age Limit Database</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
        {AGE_LIMIT_DATA.length} exams with category-wise age limits, relaxation details, and attempt limits.
      </p>
      <AgeLimitIndex />

      <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Age Limit
        </h2>
        <div className="space-y-4">
          {ageLimitFaqData.map((faq, i) => (
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
