import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Pill } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pharmacy Government Jobs 2026-27 — D.Pharm, B.Pharm Sarkari Naukri | SarkariAlert',
  description:
    'Pharmacy government jobs 2026-27: Browse latest sarkari naukri for D.Pharm, B.Pharm, M.Pharm candidates. ESIC pharmacist, Railway pharmacist, CGHS, AIIMS, Army pharmacist & state health department vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'pharmacy government jobs 2026',
    'pharmacist sarkari naukri 2026',
    'd.pharm government jobs',
    'b.pharm sarkari naukri',
    'esic pharmacist vacancy 2026',
    'railway pharmacist recruitment',
    'cghs pharmacist jobs',
    'aiims pharmacist vacancy',
    'govt hospital pharmacist jobs',
    'army pharmacist recruitment',
    'state health department pharmacist',
    'pharmacist bharti 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/pharmacy-jobs',
  },
  openGraph: {
    title: 'Pharmacy Government Jobs 2026-27 — Latest D.Pharm, B.Pharm Sarkari Naukri',
    description:
      'Find pharmacy sarkari naukri 2026-27. ESIC, Railway, CGHS, AIIMS & Army pharmacist vacancies for D.Pharm, B.Pharm, M.Pharm candidates.',
    url: 'https://sarkarialert.online/pharmacy-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for pharmacy graduates?',
    answer:
      'Pharmacy graduates can apply for ESIC Pharmacist, Railway Pharmacist, CGHS Pharmacist, AIIMS Pharmacist, Army Medical Corps Pharmacist, State Health Department Pharmacist, CRPF/BSF/CISF Pharmacist, Municipal Corporation Pharmacist, and Drug Inspector posts. Both D.Pharm and B.Pharm holders are eligible for most pharmacist posts.',
  },
  {
    question: 'Pharmacy sarkari naukri ke liye kya qualification chahiye?',
    answer:
      'Pharmacy sarkari naukri ke liye D.Pharm ya B.Pharm degree kisi manyata prapt sansthan se honi chahiye aur State/Central Pharmacy Council me registration zaroori hai. Drug Inspector ke liye B.Pharm + experience chahiye. M.Pharm holders ke liye research aur senior posts bhi available hain.',
  },
  {
    question: 'What is the salary of a government pharmacist in India?',
    answer:
      'Government pharmacists typically get Pay Level 5 (Rs 29,200 - Rs 92,300 basic pay). With allowances (DA, HRA, etc.), the gross salary is approximately Rs 40,000 - Rs 55,000 per month for freshers. ESIC and AIIMS pharmacists may get higher pay scales. Senior pharmacists and Drug Inspectors get Pay Level 6-7.',
  },
  {
    question: 'How to apply for ESIC Pharmacist recruitment?',
    answer:
      'ESIC Pharmacist recruitment is conducted periodically through online applications on esic.nic.in. Candidates need D.Pharm/B.Pharm with registration in Pharmacy Council. Selection is based on written exam (CBT) followed by document verification. ESIC offers good pay scale with medical benefits for employees and their families.',
  },
  {
    question: 'Can D.Pharm holders apply for Railway Pharmacist posts?',
    answer:
      'Yes, D.Pharm holders can apply for Railway Pharmacist posts. Indian Railways recruits pharmacists through RRB (Railway Recruitment Board) for railway hospitals and health units. Both D.Pharm and B.Pharm holders with valid registration are eligible. The selection process includes CBT and document verification.',
  },
  {
    question: 'What is the selection process for AIIMS Pharmacist recruitment?',
    answer:
      'AIIMS Pharmacist recruitment involves a computer-based test (CBT) covering subjects like Pharmacology, Pharmaceutical Chemistry, Pharmaceutics, and Hospital & Clinical Pharmacy. Candidates must have B.Pharm or D.Pharm with registration. AIIMS offers excellent pay and working environment with opportunities for career growth.',
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
        name: 'Pharmacy Jobs',
        item: 'https://sarkarialert.online/pharmacy-jobs',
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
    data = await getJobs({ qualification: 'pharmacy', page: '1' });
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
      filterParams={{ qualification: 'pharmacy' }}
    />
  );
}

export default function PharmacyJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/20">
            <Pill className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Pharmacy Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              फार्मेसी सरकारी नौकरी 2026 — D.Pharm, B.Pharm, M.Pharm भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-pink-50 dark:bg-pink-950/30 border border-pink-200 dark:border-pink-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>pharmacy sarkari naukri 2026</strong> across all major government departments and hospitals.
            Candidates with <strong>D.Pharm</strong>, <strong>B.Pharm</strong>, or <strong>M.Pharm</strong> can apply for posts like{' '}
            <strong>ESIC Pharmacist</strong>, <strong>Railway Pharmacist</strong>, <strong>CGHS Pharmacist</strong>,{' '}
            <strong>AIIMS Pharmacist</strong>, <strong>Army Medical Corps Pharmacist</strong>, and state health department pharmacist posts.
            These jobs offer pay scale of Rs 29,200 - 92,300 (Level 5-6) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां फार्मेसी उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। ESIC, रेलवे, CGHS, AIIMS,
            सेना और राज्य स्वास्थ्य विभाग की फार्मासिस्ट भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Pharmacy Government Jobs
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
