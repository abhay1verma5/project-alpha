import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Crown, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UPSC Civil Services 2026-27 — IAS, IPS, IFS Exam | SarkariAlert',
  description:
    'UPSC Civil Services Examination 2026-27 — IAS, IPS, IFS exam notification, eligibility, syllabus, exam pattern (Prelims + Mains + Interview). Age limit, number of attempts, optional subject selection & salary details.',
  keywords: [
    'upsc cse 2026',
    'upsc civil services 2026',
    'ias exam 2026',
    'ips exam 2026',
    'ifs exam 2026',
    'upsc notification 2026',
    'upsc eligibility',
    'upsc syllabus 2026',
    'upsc prelims 2026',
    'upsc mains 2026',
    'upsc optional subject',
    'ias salary 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/upsc-cse',
  },
  openGraph: {
    title: 'UPSC Civil Services 2026-27 — IAS, IPS, IFS Exam',
    description:
      'UPSC CSE 2026-27 — IAS, IPS, IFS exam details. Eligibility, syllabus, exam pattern, age limit, number of attempts & salary information.',
    url: 'https://sarkarialert.online/upsc-cse',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for UPSC Civil Services 2026?',
    answer:
      'UPSC Civil Services requires a Bachelor\'s degree (Graduation) from a recognized university in any stream/discipline. There is no minimum percentage requirement. Final year students can also apply provisionally. Professional degrees like B.Tech, MBBS, LLB, CA, etc. are all eligible. Foreign university degrees recognized by the Association of Indian Universities (AIU) are also accepted.',
  },
  {
    question: 'What is the age limit for UPSC CSE?',
    answer:
      'UPSC CSE age limit is 21-32 years for General category (as on 1st August of the exam year). Age relaxation: OBC gets up to 35 years (3 years), SC/ST gets up to 37 years (5 years), PwD General gets up to 42 years (10 years). Defence services personnel get additional relaxation as per rules.',
  },
  {
    question: 'UPSC mein kitne attempts milte hain?',
    answer:
      'UPSC Civil Services mein General category ko 6 attempts milte hain 32 saal ki age tak. OBC ko 9 attempts milte hain 35 saal tak. SC/ST ko unlimited attempts milte hain 37 saal ki age tak (koi attempt limit nahi). PwD General ko 9 attempts, PwD OBC ko 9 attempts, PwD SC/ST ko unlimited attempts milte hain. Prelims exam dena attempt maana jaata hai.',
  },
  {
    question: 'What are the stages of UPSC Civil Services Exam?',
    answer:
      'UPSC CSE has three stages: 1) Prelims — Two papers: General Studies Paper I (100 questions, 200 marks) and CSAT Paper II (80 questions, 200 marks, qualifying with 33%). Prelims is only for screening. 2) Mains — 9 papers including Essay, 4 General Studies papers, 2 Optional Subject papers, and 2 qualifying language papers. Total 1750 marks. 3) Interview/Personality Test — 275 marks. Final ranking is based on Mains + Interview (2025 marks total).',
  },
  {
    question: 'How to choose the best optional subject for UPSC?',
    answer:
      'Choosing an optional subject depends on: 1) Your graduation background and interest. 2) Overlap with General Studies syllabus (e.g., Geography, History, Political Science have high overlap). 3) Availability of study material and coaching. 4) Scoring trends — check previous years\' marks. Popular optionals include: Sociology, Geography, History, Political Science, Public Administration, Anthropology, Philosophy, and Literature subjects. Choose a subject you genuinely enjoy studying.',
  },
  {
    question: 'What is the salary of an IAS officer?',
    answer:
      'IAS officer starting salary is Pay Level 10 (Rs 56,100 basic pay). With DA, HRA and other allowances, in-hand salary is approximately Rs 80,000-1,00,000 per month for a fresh Sub-Divisional Magistrate. As an IAS officer progresses: District Magistrate gets Rs 1,18,500 (Level 13), Secretary-level gets Rs 2,25,000 (Level 17), Cabinet Secretary gets Rs 2,50,000 (Level 18). Additional perks include government bungalow, car, staff, security, and significant administrative power.',
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
        name: 'UPSC Civil Services',
        item: 'https://sarkarialert.online/upsc-cse',
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
    data = await getJobs({ category: 'upsc', page: '1' });
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
      filterParams={{ category: 'upsc' }}
    />
  );
}

export default function UpscCsePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              UPSC Civil Services 2026 — IAS, IPS, IFS Exam
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              UPSC सिविल सेवा 2026 — IAS, IPS, IFS परीक्षा
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>UPSC Civil Services 2026</strong> exam updates. The CSE is India&apos;s most prestigious
            examination for recruitment to <strong>IAS (Indian Administrative Service)</strong>,{' '}
            <strong>IPS (Indian Police Service)</strong>, <strong>IFS (Indian Foreign Service)</strong>,
            and 21 other All India & Central Services. Graduation in any stream is eligible.
            Selection through <strong>Prelims + Mains + Interview</strong> with starting salary of Rs 56,100+ basic pay.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            UPSC सिविल सेवा 2026 — भारत की सबसे प्रतिष्ठित परीक्षा। IAS, IPS, IFS और 21 अन्य सेवाओं
            में भर्ती। किसी भी स्ट्रीम से ग्रेजुएशन पास उम्मीदवार आवेदन करें।
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
          Frequently Asked Questions — UPSC Civil Services 2026
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
