import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Train, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RRB NTPC 2026-27 — Railway Non-Technical Recruitment | SarkariAlert',
  description:
    'RRB NTPC 2026-27 railway non-technical popular categories recruitment. Station Master, Goods Guard, Commercial Clerk & other posts. Eligibility, CBT stages, salary, vacancy details for 12th pass & graduates.',
  keywords: [
    'rrb ntpc 2026',
    'rrb ntpc notification 2026',
    'rrb ntpc recruitment',
    'railway ntpc vacancy 2026',
    'rrb ntpc station master',
    'rrb ntpc goods guard',
    'rrb ntpc commercial clerk',
    'rrb ntpc eligibility',
    'rrb ntpc salary',
    'rrb ntpc cbt exam',
    'railway non technical jobs',
    'rrb ntpc exam pattern 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/rrb-ntpc',
  },
  openGraph: {
    title: 'RRB NTPC 2026-27 — Railway Non-Technical Recruitment',
    description:
      'RRB NTPC 2026-27 — Station Master, Goods Guard, Clerk & other railway posts. Eligibility, salary, CBT stages & vacancy details.',
    url: 'https://sarkarialert.online/rrb-ntpc',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for RRB NTPC 2026?',
    answer:
      'RRB NTPC eligibility varies by post level: Graduate posts (Station Master, Traffic Assistant, Goods Guard, Senior Commercial cum Ticket Clerk, Senior Clerk cum Typist, Junior Account Assistant cum Typist) require a Bachelor\'s degree from a recognized university. Under-Graduate posts (Commercial cum Ticket Clerk, Accounts Clerk cum Typist, Junior Clerk cum Typist, Trains Clerk) require 12th pass (10+2) from a recognized board.',
  },
  {
    question: 'What are the posts available in RRB NTPC?',
    answer:
      'RRB NTPC offers multiple posts: Graduate Level — Station Master (Pay Level 6), Traffic Assistant (Level 6), Goods Guard (Level 5), Sr. Commercial cum Ticket Clerk (Level 5), Sr. Clerk cum Typist (Level 5), Jr. Account Assistant (Level 5). Under-Graduate Level — Commercial cum Ticket Clerk (Level 3), Accounts Clerk (Level 3), Jr. Clerk cum Typist (Level 2), Trains Clerk (Level 2).',
  },
  {
    question: 'RRB NTPC ki salary kitni hoti hai?',
    answer:
      'RRB NTPC ki salary post ke level par depend karti hai. Station Master ko Pay Level 6 (Rs 35,400-1,12,400) milta hai, in-hand around Rs 45,000-55,000. Goods Guard ko Pay Level 5 (Rs 29,200-92,300), in-hand Rs 38,000-45,000. Jr. Clerk ko Pay Level 2 (Rs 19,900-63,200), in-hand Rs 28,000-32,000. Sabko railway pass, medical, quarters aur pension ka benefit milta hai.',
  },
  {
    question: 'What are the CBT stages in RRB NTPC exam?',
    answer:
      'RRB NTPC exam has multiple stages: 1) CBT 1 (First Stage) — 100 questions, 90 minutes covering Maths, General Intelligence & Reasoning, General Awareness. This is a screening test. 2) CBT 2 (Second Stage) — 120 questions, 90 minutes with higher difficulty level. 3) Typing Skill Test / Computer Based Aptitude Test (CBAT) — for specific posts. 4) Document Verification & Medical Examination.',
  },
  {
    question: 'How many vacancies are expected in RRB NTPC 2026?',
    answer:
      'RRB NTPC 2026 is expected to announce 25,000-35,000+ vacancies across all Railway Recruitment Boards (RRBs) covering zones like RRB Allahabad, RRB Mumbai, RRB Kolkata, RRB Chennai, RRB Delhi, etc. The exact number of vacancies will be notified in the official recruitment notification. Previous RRB NTPC cycle had 35,281 vacancies.',
  },
  {
    question: 'Can 12th pass candidates apply for RRB NTPC?',
    answer:
      'Yes, 12th pass candidates can apply for Under-Graduate level posts in RRB NTPC including Commercial cum Ticket Clerk, Accounts Clerk cum Typist, Junior Clerk cum Typist, and Trains Clerk. These posts offer Pay Level 2 and Level 3 with starting salary of Rs 19,900-21,700 basic pay. Graduation is not required for these posts.',
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
        name: 'RRB NTPC',
        item: 'https://sarkarialert.online/rrb-ntpc',
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
    data = await getJobs({ category: 'railway', page: '1' });
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
      filterParams={{ category: 'railway' }}
    />
  );
}

export default function RrbNtpcPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Train className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              RRB NTPC 2026 — Railway Non-Technical Recruitment
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              RRB NTPC 2026 — रेलवे नॉन-टेक्निकल भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>RRB NTPC 2026</strong> recruitment updates for non-technical popular categories.
            Apply for <strong>Station Master</strong>, <strong>Goods Guard</strong>,{' '}
            <strong>Commercial Clerk</strong>, and other railway posts. Both <strong>12th pass</strong> and{' '}
            <strong>graduate</strong> candidates are eligible for different post levels.
            Salary ranges from Rs 19,900 to Rs 1,12,400 with railway benefits including free passes and quarters.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            RRB NTPC 2026 — रेलवे नॉन-टेक्निकल भर्ती। स्टेशन मास्टर, गुड्स गार्ड, क्लर्क पदों के लिए
            12वीं पास और ग्रेजुएट उम्मीदवार आवेदन करें। रेलवे पास और क्वार्टर की सुविधा।
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
          Frequently Asked Questions — RRB NTPC 2026
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
