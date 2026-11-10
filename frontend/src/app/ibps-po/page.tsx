import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Landmark, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'IBPS PO 2026-27 — Probationary Officer Recruitment | SarkariAlert',
  description:
    'IBPS PO 2026-27 probationary officer recruitment in public sector banks. Eligibility, exam pattern (Prelims + Mains + Interview), salary Rs 52,000+, participating banks, number of attempts & vacancy details.',
  keywords: [
    'ibps po 2026',
    'ibps po notification 2026',
    'ibps po recruitment',
    'ibps po eligibility',
    'ibps po salary',
    'ibps po exam pattern',
    'ibps probationary officer',
    'ibps po prelims 2026',
    'ibps po mains 2026',
    'bank po vacancy 2026',
    'ibps po participating banks',
    'ibps po interview preparation',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/ibps-po',
  },
  openGraph: {
    title: 'IBPS PO 2026-27 — Probationary Officer Recruitment',
    description:
      'IBPS PO 2026-27 recruitment — eligibility, exam pattern, salary Rs 52,000+, participating banks. Complete guide for bank PO aspirants.',
    url: 'https://sarkarialert.online/ibps-po',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for IBPS PO 2026?',
    answer:
      'IBPS PO 2026 requires a Bachelor\'s degree (Graduation) from a recognized university in any discipline. Candidates must be between 20-30 years of age. Computer literacy is mandatory. Final year students who can produce proof of graduation before the specified date are also eligible to apply.',
  },
  {
    question: 'What is the IBPS PO exam pattern for 2026?',
    answer:
      'IBPS PO selection has three stages: 1) Prelims — 100 questions in 60 minutes covering English (30Q), Quantitative Aptitude (35Q), Reasoning (35Q). 2) Mains — 155 questions in 180 minutes covering Reasoning & Computer Aptitude (45Q), English (35Q), Data Analysis (35Q), General/Economy/Banking Awareness (40Q) plus a Descriptive Paper (Letter/Essay Writing). 3) Interview — 100 marks. Final merit is Mains (80%) + Interview (20%).',
  },
  {
    question: 'IBPS PO ki salary kitni hoti hai?',
    answer:
      'IBPS PO ki starting basic pay Rs 36,000 hai (revised pay scale). DA, HRA, CCA, medical aur other allowances milakar in-hand salary approximately Rs 52,000-55,000 per month hoti hai metro cities mein. Ye har 2-3 saal mein increment hoti hai. Senior positions mein salary Rs 80,000-1,00,000+ tak pahunch sakti hai. Bank employees ko leased accommodation, pension (NPS), aur annual bonus bhi milta hai.',
  },
  {
    question: 'Which banks participate in IBPS PO recruitment?',
    answer:
      'IBPS PO recruitment includes 11 participating public sector banks: Bank of Baroda, Bank of India, Bank of Maharashtra, Canara Bank, Central Bank of India, Indian Bank, Indian Overseas Bank, Punjab National Bank, Punjab & Sind Bank, UCO Bank, and Union Bank of India. Note: SBI conducts its own separate PO recruitment.',
  },
  {
    question: 'How many attempts are allowed for IBPS PO?',
    answer:
      'There is no official limit on the number of attempts for IBPS PO exam, as long as you meet the age criteria (20-30 years for General). With age relaxation, OBC candidates get up to 33 years, SC/ST up to 35 years. So General candidates effectively get around 8-10 attempts, OBC gets 11-13 attempts, and SC/ST gets 13-15 attempts during their eligible age window.',
  },
];

function FAQSchema() {
  const schema = {
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function BreadcrumbSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://sarkarialert.online/' },
      { '@type': 'ListItem', position: 2, name: 'Jobs', item: 'https://sarkarialert.online/jobs' },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'IBPS PO',
        item: 'https://sarkarialert.online/ibps-po',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

async function JobsContent() {
  let data;
  try {
    data = await getJobs({ category: 'banking', page: '1' });
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <Briefcase className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load jobs</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Backend server is not available. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <JobsLoadMore
      initialJobs={data.results}
      totalCount={data.count}
      nextUrl={data.next}
      filterParams={{ category: 'banking' }}
    />
  );
}

export default function IbpsPoPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              IBPS PO 2026 — Probationary Officer Recruitment
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              IBPS PO 2026 — प्रोबेशनरी ऑफिसर भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>IBPS PO 2026</strong> recruitment updates for <strong>Probationary Officer</strong> posts
            in 11 participating public sector banks. Graduation in any discipline is required.
            Selection through <strong>Prelims + Mains + Interview</strong> with starting salary of{' '}
            <strong>Rs 52,000+ per month</strong>. Excellent career growth from PO to Chief Manager and beyond.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            IBPS PO 2026 — सार्वजनिक क्षेत्र के बैंकों में प्रोबेशनरी ऑफिसर भर्ती। ग्रेजुएशन पास
            उम्मीदवार आवेदन करें। वेतन Rs 52,000+ प्रति माह।
          </p>
        </div>
      </div>

      {/* Job list */}
      <Suspense fallback={<JobListSkeleton />}>
        <JobsContent />
      </Suspense>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — IBPS PO 2026
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
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
