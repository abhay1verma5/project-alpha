import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { FileCheck, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SSC CHSL 2026-27 — LDC, DEO, PA/SA Recruitment | SarkariAlert',
  description:
    'SSC CHSL 2026-27 recruitment for LDC, Data Entry Operator, Postal Assistant & Sorting Assistant. 12th pass eligibility, exam pattern, salary, typing test details. Apply online for SSC Combined Higher Secondary Level exam.',
  keywords: [
    'ssc chsl 2026',
    'ssc chsl notification 2026',
    'ssc chsl ldc recruitment',
    'ssc chsl deo vacancy',
    'ssc chsl postal assistant',
    'ssc chsl sorting assistant',
    'ssc chsl 12th pass jobs',
    'ssc chsl salary 2026',
    'ssc chsl typing test',
    'ssc chsl exam pattern',
    'ssc chsl eligibility',
    'ssc combined higher secondary level',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/ssc-chsl',
  },
  openGraph: {
    title: 'SSC CHSL 2026-27 — LDC, DEO, PA/SA Recruitment',
    description:
      'SSC CHSL 2026-27 recruitment — LDC, Data Entry Operator, PA/SA posts for 12th pass candidates. Salary, exam pattern & eligibility details.',
    url: 'https://sarkarialert.online/ssc-chsl',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for SSC CHSL 2026?',
    answer:
      'SSC CHSL 2026 requires candidates to have passed 12th Standard (Higher Secondary) or equivalent from a recognized board. There is no minimum percentage requirement. For Data Entry Operator posts, candidates must also have studied Computer Science as a subject in 12th or have a certificate/diploma in Computer Application.',
  },
  {
    question: 'What are the posts available in SSC CHSL?',
    answer:
      'SSC CHSL offers four types of posts: 1) Lower Division Clerk (LDC) / Junior Secretariat Assistant (JSA) — Pay Level 2 in various ministries. 2) Data Entry Operator (DEO) — Pay Level 4 in government departments. 3) Postal Assistant (PA) — Pay Level 4 in Department of Posts. 4) Sorting Assistant (SA) — Pay Level 4 in Department of Posts.',
  },
  {
    question: 'SSC CHSL mein typing test kaise hota hai?',
    answer:
      'SSC CHSL mein LDC/JSA ke liye typing test hota hai — English mein 35 words per minute ya Hindi mein 30 words per minute (computer par). DEO ke liye 8000 key depressions per hour ka speed test hota hai. Typing test qualifying nature ka hai — isme marks nahi lagte. PA/SA ke liye bhi computer proficiency test hota hai.',
  },
  {
    question: 'What is the salary for SSC CHSL posts?',
    answer:
      'SSC CHSL salary varies by post: LDC/JSA gets Pay Level 2 (Rs 19,900-63,200 basic pay, in-hand approx Rs 28,000-32,000). DEO gets Pay Level 4 (Rs 25,500-81,100, in-hand approx Rs 35,000-42,000). PA/SA gets Pay Level 4 (Rs 25,500-81,100, in-hand approx Rs 35,000-42,000). All posts come with DA, HRA, Transport Allowance and other government benefits.',
  },
  {
    question: 'What is the age limit for SSC CHSL 2026?',
    answer:
      'SSC CHSL age limit is 18-27 years for all posts as on the date specified in the notification. Age relaxation: OBC gets 3 years, SC/ST gets 5 years, PwD gets 10 years (13 for OBC-PwD, 15 for SC/ST-PwD). Ex-servicemen get relaxation as per government rules.',
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
        name: 'SSC CHSL',
        item: 'https://sarkarialert.online/ssc-chsl',
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
    data = await getJobs({ category: 'ssc', page: '1' });
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
      filterParams={{ category: 'ssc' }}
    />
  );
}

export default function SscChslPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/20">
            <FileCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              SSC CHSL 2026 — LDC, DEO, PA/SA Recruitment
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              SSC CHSL 2026 — LDC, डाटा एंट्री ऑपरेटर भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>SSC CHSL 2026</strong> recruitment updates for <strong>12th pass</strong> candidates.
            Apply for <strong>Lower Division Clerk (LDC)</strong>, <strong>Data Entry Operator (DEO)</strong>,{' '}
            <strong>Postal Assistant (PA)</strong>, and <strong>Sorting Assistant (SA)</strong> posts in central government.
            Salary ranges from Rs 19,900 to Rs 81,100 with full government benefits including pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            SSC CHSL 2026 — 12वीं पास उम्मीदवारों के लिए LDC, DEO, PA/SA भर्ती। केंद्र सरकार में
            क्लर्क और डाटा एंट्री ऑपरेटर पदों के लिए आवेदन करें।
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
          Frequently Asked Questions — SSC CHSL 2026
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
