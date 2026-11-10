import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: '10th Pass Sarkari Naukri 2026-27 — 10th Pass Government Jobs | SarkariAlert',
  description:
    '10th pass sarkari naukri 2026-27: Browse latest government jobs for 10th pass candidates. SSC, Railway, Defence, Police, Postal & Group D vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    '10th pass sarkari naukri 2026',
    '10th pass government jobs',
    '10th pass sarkari job',
    'dasvi pass sarkari naukri',
    '10th pass railway jobs',
    '10th pass defence jobs',
    '10th pass police jobs',
    'ssc gd bharti 2026',
    'group d vacancy 2026',
    '10th pass govt job apply online',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/10th-pass-jobs',
  },
  openGraph: {
    title: '10th Pass Government Jobs 2026-27 — Latest Sarkari Naukri for 10th Pass',
    description:
      'Find 10th pass sarkari naukri 2026-27. Railway Group D, SSC GD, Police Constable, Postal, Defence & more vacancies for 10th pass candidates.',
    url: 'https://sarkarialert.online/10th-pass-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs can I get after 10th pass?',
    answer:
      'After 10th pass, you can apply for Railway Group D, SSC GD Constable, Police Constable, Indian Army Soldier, Postal Department (GDS/MTS), Defence jobs, CISF, BSF, CRPF and various state-level Group D vacancies.',
  },
  {
    question: '10th pass ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      '10th pass ke baad aap Railway Group D, SSC GD Constable, Police Constable, Indian Army, Postal GDS, Defence, CISF, BSF, CRPF aur vibhinn rajya stariya Group D padoon ke liye aavedan kar sakte hain.',
  },
  {
    question: 'What is the salary for 10th pass government jobs?',
    answer:
      'The salary for 10th pass government jobs typically ranges from Rs 18,000 to Rs 25,000 per month (Pay Level 1-3). With allowances (DA, HRA, etc.), the gross salary can be Rs 22,000 to Rs 35,000 per month.',
  },
  {
    question: 'What is the age limit for 10th pass government jobs?',
    answer:
      'The general age limit for most 10th pass government jobs is 18 to 25 years. OBC candidates get 3 years relaxation, SC/ST candidates get 5 years relaxation. Some departments like Railway and Defence have specific age limits.',
  },
  {
    question: 'How to apply for 10th pass government jobs online?',
    answer:
      'Visit the official website of the recruiting organization (e.g., ssc.nic.in, rrcb.gov.in, joinindianarmy.nic.in). Register, fill the application form, upload documents, pay the fee, and submit. Check SarkariAlert for direct apply links.',
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
        name: '10th Pass Jobs',
        item: 'https://sarkarialert.online/10th-pass-jobs',
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

export default function TenthPassJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              10th Pass Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              10वीं पास सरकारी नौकरी 2026 — दसवीं पास के लिए सरकारी भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>10th pass sarkari naukri 2026</strong> across all major government departments.
            Candidates who have passed 10th (Matriculation / High School) are eligible for posts like{' '}
            <strong>Railway Group D</strong>, <strong>SSC GD Constable</strong>, <strong>Police Constable</strong>,{' '}
            <strong>Indian Army Soldier</strong>, <strong>Postal GDS & MTS</strong>, Defence (Navy, Air Force, Army),
            and various state-level Group D vacancies. These jobs offer pay scale of Rs 18,000 - 25,000+ with
            government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां 10वीं पास उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। रेलवे, SSC, पुलिस, सेना, डाक विभाग
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — 10th Pass Sarkari Naukri
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
