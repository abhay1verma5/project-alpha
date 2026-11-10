import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'GDS Recruitment 2026-27 — Gramin Dak Sevak India Post Vacancy | SarkariAlert',
  description:
    'GDS recruitment 2026-27: Latest Gramin Dak Sevak vacancy by India Post. 10th pass eligibility, TRCA salary Rs 12,000-14,500, merit-based selection on 10th marks. Apply online for Branch Postmaster, ABPM & Dak Sevak posts.',
  keywords: [
    'GDS recruitment 2026',
    'gramin dak sevak vacancy',
    'india post GDS',
    'GDS bharti',
    'dak sevak online form',
    'post office recruitment',
    'GDS cycle 7 list',
    'GDS to MTS promotion',
    'india post vacancy 2026',
    'GDS TRCA salary',
    'branch postmaster GDS',
    'GDS merit list 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/gds-jobs',
  },
  openGraph: {
    title: 'GDS Recruitment 2026-27 — Gramin Dak Sevak India Post Vacancy',
    description:
      'Find latest GDS bharti 2026-27 by India Post. Gramin Dak Sevak vacancy for 10th pass candidates. Merit-based selection, TRCA Rs 12,000-14,500.',
    url: 'https://sarkarialert.online/gds-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for GDS (Gramin Dak Sevak) recruitment?',
    answer:
      'GDS eligibility requires 10th pass (Secondary School) from a recognized board with mandatory pass in Mathematics and English (studied as compulsory or elective subjects). Age limit is 18 to 40 years with relaxation for SC/ST (5 years), OBC (3 years), and PwD (10 years). Candidates must be a resident of the postal division they apply for. Knowledge of local language of the state is mandatory.',
  },
  {
    question: 'GDS ki salary kitni hoti hai aur kya allowances milte hain?',
    answer:
      'GDS ko TRCA (Time Related Continuity Allowance) milta hai, salary nahi. BPM (Branch Postmaster) ko Rs 12,000-29,380, ABPM ko Rs 10,000-24,470 aur Dak Sevak ko Rs 10,000-24,470 milta hai (as per GDS revision). DA bhi milta hai jo har 6 mahine revise hota hai. Medical allowance, risk/hardship allowance aur ex-gratia bhi milte hain. GDS ko pension nahi milti, lekin SB (Sevak Benefit) fund milta hai.',
  },
  {
    question: 'How is GDS selection done — is there any exam?',
    answer:
      'GDS selection is purely merit-based on 10th class marks — there is NO written exam, NO interview, and NO physical test. Merit is calculated based on marks obtained in 10th standard (converted to percentage). In case of equal marks, preference is given to older candidates. The merit list is prepared circle-wise and published on the India Post GDS portal (appost.in).',
  },
  {
    question: 'Can GDS be promoted to Postman or MTS?',
    answer:
      'Yes, GDS can be promoted to regular government posts. GDS with 2 years of service can appear for Postman/Mail Guard exam (25% quota reserved for GDS). GDS can also be promoted to MTS (Multi Tasking Staff) with 50% quota reserved for GDS having 5 years of service. After becoming MTS/Postman, they get regular government pay scale, pension, and all benefits.',
  },
  {
    question: 'What is GDS cycle list and how many posts are available?',
    answer:
      'India Post releases GDS vacancies in cycles. Each cycle covers multiple postal circles across India. Recent cycles have had 30,000-44,000+ vacancies per cycle. GDS Cycle 7 and Cycle 8 are the latest rounds. Vacancies are available in all 23 postal circles covering all states and union territories. Candidates can apply for multiple divisions within their state.',
  },
  {
    question: 'What are the different types of GDS posts?',
    answer:
      'There are three types of GDS posts: 1) BPM (Branch Postmaster) — heads the Branch Post Office, handles all postal operations, highest TRCA. 2) ABPM (Assistant Branch Postmaster) — assists BPM in postal work, handles money orders and registered articles. 3) Dak Sevak — delivers mail in rural areas, collects letters from letter boxes. All three are part-time government engagement (not regular employment) with 5 hours of daily duty.',
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
        name: 'GDS Jobs',
        item: 'https://sarkarialert.online/gds-jobs',
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
    data = await getJobs({ qualification: '10th', page: '1' });
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
      filterParams={{ qualification: '10th' }}
    />
  );
}

export default function GDSJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              GDS Recruitment 2026 — Gramin Dak Sevak India Post Vacancy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ग्रामीण डाक सेवक भर्ती 2026 — इंडिया पोस्ट GDS वैकेंसी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>GDS recruitment 2026</strong> by India Post (Department of Posts).
            <strong> Gramin Dak Sevak</strong> vacancies for <strong>BPM (Branch Postmaster)</strong>,{' '}
            <strong>ABPM (Assistant Branch Postmaster)</strong>, and <strong>Dak Sevak</strong> posts.
            Eligibility is <strong>10th pass</strong> with Mathematics and English. Selection is{' '}
            <strong>purely merit-based on 10th marks</strong> — no written exam. TRCA salary ranges from{' '}
            <strong>Rs 12,000 to Rs 29,380</strong>. GDS can be promoted to regular Postman/MTS posts.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां इंडिया पोस्ट की GDS भर्ती 2026 देखें। 10वीं पास उम्मीदवार ग्रामीण डाक सेवक (BPM, ABPM, डाक सेवक) पदों
            पर आवेदन करें। बिना परीक्षा, 10वीं के मार्क्स पर मेरिट से चयन। TRCA Rs 12,000-29,380।
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
          Frequently Asked Questions — GDS Recruitment
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
