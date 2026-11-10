import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Hammer, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'RRB Group D 2026-27 — Railway Group D Bharti 32000+ Posts | SarkariAlert',
  description:
    'RRB Group D 2026-27 railway recruitment for 32000+ posts. Eligibility (10th + ITI/NAC), age limit (18-33), PET details, salary Rs 18,000-56,900. Track Maintainer, Helper, Pointsman & other Group D vacancies.',
  keywords: [
    'rrb group d 2026',
    'railway group d bharti 2026',
    'rrb group d vacancy 2026',
    'rrb group d eligibility',
    'rrb group d salary',
    'rrb group d pet details',
    'railway group d 10th pass jobs',
    'rrb group d iti jobs',
    'rrb group d track maintainer',
    'rrb group d helper vacancy',
    'railway group d physical test',
    'rrb group d 32000 posts',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/rrb-group-d',
  },
  openGraph: {
    title: 'RRB Group D 2026-27 — Railway Group D Bharti 32000+ Posts',
    description:
      'RRB Group D 2026-27 — 32000+ railway posts. 10th + ITI eligibility, PET details, salary Rs 18,000-56,900. Track Maintainer, Helper vacancies.',
    url: 'https://sarkarialert.online/rrb-group-d',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for RRB Group D 2026?',
    answer:
      'RRB Group D 2026 requires 10th pass (Matriculation) from a recognized board PLUS an ITI certificate from NCVT/SCVT in a relevant trade OR National Apprenticeship Certificate (NAC) granted by NCVT. Some posts may accept 10th pass with NAC. Candidates must be Indian nationals. The exact trade-wise eligibility varies by post and is detailed in the official notification.',
  },
  {
    question: 'What is the age limit for RRB Group D?',
    answer:
      'RRB Group D age limit is 18-33 years for General category as on the date specified in the notification. Age relaxation: OBC-NCL gets 3 years (up to 36), SC/ST gets 5 years (up to 38), PwD General gets 10 years (up to 43), Ex-Servicemen get relaxation as per rules. Candidates from J&K domicile and certain other categories get additional relaxation.',
  },
  {
    question: 'RRB Group D ka PET (Physical Efficiency Test) kaisa hota hai?',
    answer:
      'RRB Group D PET mein: Male candidates ko 35 kg weight uthake 100 meter 2 minute mein chalke le jaana hota hai, aur 1000 meter ki race 4 minute 15 second mein complete karni hoti hai. Female candidates ko 20 kg weight uthake 100 meter 2 minute mein chalke le jaana hota hai, aur 1000 meter ki race 5 minute 40 second mein complete karni hoti hai. PET qualifying nature ka hai — pass ya fail.',
  },
  {
    question: 'What is the salary for RRB Group D posts?',
    answer:
      'RRB Group D salary is Pay Level 1 (Rs 18,000-56,900 basic pay as per 7th Pay Commission). Starting basic pay is Rs 18,000. With Dearness Allowance (DA), HRA, Transport Allowance and other benefits, the in-hand salary for Group D freshers is approximately Rs 25,000-30,000 per month. Additional benefits include railway passes, medical facilities, quarters, and pension (NPS).',
  },
  {
    question: 'How many vacancies are expected in RRB Group D 2026?',
    answer:
      'RRB Group D 2026 is expected to announce 32,000+ vacancies across all Railway Recruitment Boards for posts like Track Maintainer Grade-IV, Helper/Assistant in various technical departments (Electrical, Mechanical, S&T, Engineering), Pointsman, and other Group D posts. The previous RRB Group D recruitment cycle had over 1,03,769 vacancies. Exact numbers will be in the official notification.',
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
        name: 'RRB Group D',
        item: 'https://sarkarialert.online/rrb-group-d',
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

export default function RrbGroupDPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Hammer className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              RRB Group D 2026 — Railway Group D Bharti 32000+ Posts
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              RRB ग्रुप डी 2026 — रेलवे ग्रुप डी 32000+ पद
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>RRB Group D 2026</strong> recruitment updates for <strong>32,000+</strong> railway posts.
            Apply for <strong>Track Maintainer</strong>, <strong>Helper</strong>, <strong>Pointsman</strong>,
            and other Group D vacancies. Candidates with <strong>10th pass + ITI</strong> or{' '}
            <strong>NAC (National Apprenticeship Certificate)</strong> can apply.
            Salary starts at Rs 18,000-56,900 with railway benefits including free passes, quarters, and medical.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            RRB ग्रुप डी 2026 — रेलवे में 32,000+ पदों पर भर्ती। ट्रैक मेंटेनर, हेल्पर, पॉइंट्समैन
            पदों के लिए 10वीं + ITI पास उम्मीदवार आवेदन करें। रेलवे पास और क्वार्टर की सुविधा।
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
          Frequently Asked Questions — RRB Group D 2026
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
