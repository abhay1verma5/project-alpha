import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '8th Pass Government Jobs 2026-27 — 8वीं पास सरकारी नौकरी | SarkariAlert',
  description:
    '8th pass government jobs 2026-27: Latest sarkari naukri for 8vi pass candidates. GDS, Peon, Safai Karamchari, Chowkidar, Mali, Anganwadi Helper vacancies. Apply online without exam — eligibility, salary & last date.',
  keywords: [
    '8th pass govt job',
    '8th pass sarkari naukri',
    '8vi pass naukri',
    'GDS vacancy 8th pass',
    'safai karamchari bharti',
    'peon vacancy',
    '8th pass government jobs 2026',
    'chowkidar vacancy 2026',
    'mali vacancy government',
    'anganwadi helper 8th pass',
    'bina exam sarkari naukri',
    '8th pass army bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/8th-pass-jobs',
  },
  openGraph: {
    title: '8th Pass Government Jobs 2026-27 — 8वीं पास सरकारी नौकरी',
    description:
      'Find 8th pass sarkari naukri 2026-27. GDS, Peon, Safai Karamchari, Chowkidar, Mali & Anganwadi Helper vacancies without exam.',
    url: 'https://sarkarialert.online/8th-pass-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs can I get with 8th pass qualification?',
    answer:
      'With 8th pass qualification, you can apply for Gramin Dak Sevak (GDS) in India Post, Peon/Office Attendant in various departments, Safai Karamchari in municipalities and railways, Chowkidar/Watchman, Mali (Gardener) in government offices, Anganwadi Helper under ICDS, and Group D posts in Railways and state governments. Many of these positions do not require any written exam.',
  },
  {
    question: '8vi pass sarkari naukri mein kitni salary milti hai?',
    answer:
      '8vi pass sarkari naukri mein salary post ke hisab se alag hoti hai. GDS ko Rs 12,000-14,500 TRCA milta hai. Peon/Office Attendant ko Pay Level 1 mein Rs 18,000-56,900 basic pay milti hai. Safai Karamchari ko Rs 18,000-25,000 monthly milta hai. Anganwadi Helper ko Rs 4,000-6,000 honorarium milta hai. Government benefits jaise DA, HRA aur medical bhi milte hain.',
  },
  {
    question: 'How to apply for 8th pass government jobs without exam?',
    answer:
      'Many 8th pass government jobs are filled without exam through merit-based selection. For GDS, selection is based on 10th marks (recently changed to 10th). For Safai Karamchari and Mali posts, apply when municipality or department releases notification. For Anganwadi Helper, contact district WCD/CDPO office. Check employment newspapers and official websites regularly for notifications.',
  },
  {
    question: 'What is the age limit for 8th pass sarkari naukri?',
    answer:
      'The general age limit for 8th pass government jobs is 18-25 years for most posts, extendable to 18-40 years for some positions like Anganwadi and Safai Karamchari. SC/ST candidates get 5 years relaxation, OBC candidates get 3 years relaxation. Ex-servicemen and PwD candidates also get additional age relaxation as per government rules.',
  },
  {
    question: 'Can 8th pass candidates apply for Railway Group D jobs?',
    answer:
      'Railway Group D (now Level 1 posts) currently requires 10th pass and ITI in some trades. However, some older notifications accepted 8th pass candidates. For 8th pass candidates, Railway Safai Karamchari posts and Track Maintainer (in some zones) may be available. Check RRB notifications for the latest eligibility requirements.',
  },
  {
    question: 'Is there any government job for 8th pass female candidates?',
    answer:
      'Yes, 8th pass female candidates can apply for Anganwadi Helper/Sahayika (Rs 4,000-6,000/month), ASHA Worker under National Health Mission, Safai Karamchari in hospitals and schools, Cook (Rassoiya) in Mid-Day Meal scheme, and Ayah posts in government schools and hospitals. Most of these are local-level positions with preference to women.',
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
        name: '8th Pass Jobs',
        item: 'https://sarkarialert.online/8th-pass-jobs',
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
    data = await getJobs({ qualification: '8th', page: '1' });
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
      filterParams={{ qualification: '8th' }}
    />
  );
}

export default function EighthPassJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              8th Pass Government Jobs 2026 — 8वीं पास सरकारी नौकरी
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              8वीं पास सरकारी नौकरी 2026 — बिना परीक्षा भी नौकरी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>8th pass government jobs 2026</strong> across central and state departments.
            Candidates with <strong>8th pass (8वीं पास)</strong> qualification can apply for posts like{' '}
            <strong>GDS (Gramin Dak Sevak)</strong>, <strong>Peon</strong>, <strong>Safai Karamchari</strong>,{' '}
            <strong>Chowkidar</strong>, <strong>Mali</strong>, and <strong>Anganwadi Helper</strong>.
            Many of these posts are filled <strong>without any written exam</strong> — selection is based on merit and document verification.
            Salary ranges from Rs 4,000 to Rs 25,000+ depending on the post and department.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां 8वीं पास उम्मीदवारों के लिए सभी सरकारी नौकरियां देखें। पोस्ट ऑफिस GDS, चपरासी, सफाई कर्मचारी,
            चौकीदार, माली और आंगनवाड़ी हेल्पर जैसे पदों पर बिना परीक्षा भी नौकरी मिल सकती है।
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
          Frequently Asked Questions — 8th Pass Government Jobs
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
