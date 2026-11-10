import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, TrainFront } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Railway Government Jobs 2026-27 — RRB NTPC, Group D, JE भर्ती | SarkariAlert',
  description:
    'Railway government jobs 2026-27: Browse latest railway sarkari naukri. RRB NTPC, Group D, Railway JE, ALP, RPF, Loco Pilot & technician vacancies. Apply online with eligibility, salary, exam pattern & last date.',
  keywords: [
    'railway government jobs 2026',
    'rrb ntpc vacancy 2026',
    'railway group d bharti 2026',
    'railway je vacancy 2026',
    'alp loco pilot recruitment',
    'rpf constable vacancy 2026',
    'railway sarkari naukri',
    'rrb group d exam 2026',
    'railway technician bharti',
    'indian railway jobs 2026',
    'railway ntpc sarkari naukri',
    'rrb alp vacancy 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/railway-jobs',
  },
  openGraph: {
    title: 'Railway Government Jobs 2026-27 — RRB NTPC, Group D, JE भर्ती',
    description:
      'Find railway sarkari naukri 2026-27. RRB NTPC, Group D, JE, ALP, RPF & more railway vacancies with exam pattern and salary details.',
    url: 'https://sarkarialert.online/railway-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for RRB NTPC exam?',
    answer:
      'RRB NTPC (Non-Technical Popular Categories) requires graduation in any discipline from a recognized university. Age limit: 18-33 years (varies by post, with relaxation for OBC/SC/ST). Posts under NTPC include Station Master, Goods Guard, Commercial Apprentice, Traffic Assistant, Senior Clerk, Junior Account Assistant, and Typist. Selection: CBT-1 + CBT-2 + Typing/CBAT + Document Verification.',
  },
  {
    question: 'Railway Group D ki salary kitni hoti hai?',
    answer:
      'Railway Group D (Level 1) ki basic pay Rs 18,000 hai. DA, HRA, aur anya bhatte mila kar gross salary lagbhag Rs 25,000-32,000 per month hoti hai. Iske alawa railway employees ko free rail pass (duty + privilege), medical facilities, quarters (jahan available ho), pension (NPS), aur anya benefits milte hain. Promotion ke baad salary badhti jaati hai.',
  },
  {
    question: 'What is the exam pattern for Railway JE (Junior Engineer)?',
    answer:
      'Railway JE exam has two stages: CBT-1 (Computer Based Test) covers Mathematics, General Intelligence & Reasoning, General Awareness, General Science - 100 questions in 90 minutes. CBT-2 covers technical subjects related to the specific branch (Civil, Electrical, Mechanical, Electronics, IT) - 150 questions in 120 minutes. Minimum qualifying marks: 40% (UR), 30% (OBC/SC/ST). Followed by Document Verification and Medical Examination.',
  },
  {
    question: 'How to become a Loco Pilot (ALP) in Indian Railways?',
    answer:
      'To become a Loco Pilot, apply for RRB ALP (Assistant Loco Pilot) recruitment. Eligibility: 10th pass + ITI in relevant trade OR Diploma in Engineering. Age: 18-28 years. Selection: CBT-1 + CBT-2 + Computer Based Aptitude Test (CBAT) + Document Verification. After joining as ALP (Pay Level 2, Rs 19,900 basic), you can be promoted to Senior ALP, Loco Pilot, and eventually Senior Loco Pilot.',
  },
  {
    question: 'What is the role of RPF (Railway Protection Force)?',
    answer:
      'RPF (Railway Protection Force) protects railway property, passengers, and passenger area. RPF Constable requires 10th pass with physical fitness. RPF SI requires graduation. RPF Constable gets Pay Level 3 (Rs 21,700 basic) and SI gets Pay Level 6 (Rs 35,400 basic). Selection: CBT + PET (Physical Efficiency Test) + PMT (Physical Measurement Test) + Document Verification. RPF personnel get railway accommodation, free passes, and other benefits.',
  },
  {
    question: 'Which is better - Railway NTPC or Railway Group D?',
    answer:
      'Railway NTPC is better in terms of salary, work profile, and career growth. NTPC posts (Station Master, Goods Guard, etc.) require graduation and offer Pay Level 5-6 (Rs 29,200-35,400 basic). Group D posts (Track Maintainer, Helper, etc.) require 10th pass and offer Pay Level 1 (Rs 18,000 basic). However, Group D has more vacancies (often 1 lakh+) and lower competition per seat compared to NTPC.',
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
        name: 'Railway Jobs',
        item: 'https://sarkarialert.online/railway-jobs',
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

export default function RailwayJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <TrainFront className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Railway Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              रेलवे सरकारी नौकरी 2026 — RRB NTPC, ग्रुप D भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>railway sarkari naukri 2026</strong> across all Railway Recruitment Boards (RRBs) and Indian Railways zones.
            Candidates can apply for <strong>RRB NTPC</strong> (Station Master, Goods Guard, Commercial Apprentice),{' '}
            <strong>Railway Group D</strong> (Track Maintainer, Helper, Porter),{' '}
            <strong>Railway JE</strong> (Junior Engineer - Civil, Electrical, Mechanical),{' '}
            <strong>ALP (Assistant Loco Pilot)</strong>, <strong>RPF Constable/SI</strong>,{' '}
            and <strong>Railway Technician</strong> posts.
            Indian Railways is the largest employer in India with lakhs of vacancies every recruitment cycle, offering Pay Level 1-7 with free rail passes, medical facilities, quarters, and pension benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां रेलवे भर्ती के सभी नवीनतम अपडेट देखें। RRB NTPC, ग्रुप D, रेलवे JE, ALP, RPF
            और टेक्नीशियन की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Railway Government Jobs
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
