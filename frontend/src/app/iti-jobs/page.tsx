import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ITI Government Jobs 2026-27 — Trade-wise Sarkari Naukri | SarkariAlert',
  description:
    'ITI government jobs 2026-27: Browse latest sarkari naukri for ITI pass candidates. Railway, Defence, NTPC, ONGC, Ordnance Factory, Trade Apprentice & PSU vacancies for all ITI trades. Apply online with eligibility, salary & last date.',
  keywords: [
    'iti government jobs 2026',
    'iti sarkari naukri',
    'iti trade apprentice vacancy 2026',
    'iti railway jobs 2026',
    'iti fitter electrician jobs',
    'iti pass sarkari naukri',
    'ordnance factory iti vacancy',
    'iti diesel mechanic govt jobs',
    'iti welder turner govt jobs',
    'iti psu jobs 2026',
    'iti defence jobs',
    'ncvt iti government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/iti-jobs',
  },
  openGraph: {
    title: 'ITI Government Jobs 2026-27 — Trade-wise Sarkari Naukri for ITI Pass',
    description:
      'Find ITI sarkari naukri 2026-27. Railway, Defence, NTPC, ONGC, Ordnance Factory, Trade Apprentice & more vacancies for all ITI trades.',
    url: 'https://sarkarialert.online/iti-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for ITI pass candidates?',
    answer:
      'ITI pass candidates can apply for Railway Technician (RRB), Trade Apprentice (NAPS), Ordnance Factory (Indian Ordnance Factories), Defence establishments (MEG, EME, Army Base Workshop), PSU jobs (NTPC, ONGC, BHEL, SAIL), State Electricity Boards, PWD, and various technical posts in central/state government departments.',
  },
  {
    question: 'ITI pass ke liye kaun si sarkari naukri mil sakti hai?',
    answer:
      'ITI pass ke baad aap Railway Technician (RRB), Trade Apprentice (NAPS), Ordnance Factory, Defence establishments (MEG, EME, Army Base Workshop), PSU jobs (NTPC, ONGC, BHEL, SAIL), Rajya Bijli Board, PWD aur vibhinn kendriya/rajya sarkar ke takniki padoon ke liye aavedan kar sakte hain.',
  },
  {
    question: 'What is the salary for ITI government jobs?',
    answer:
      'ITI government jobs typically fall under Pay Level 2 to Level 4 (Rs 19,900 - Rs 25,500 basic pay). With allowances (DA, HRA, etc.), the gross salary ranges from Rs 28,000 to Rs 40,000 per month. Railway Technicians and PSU jobs offer higher pay with additional benefits.',
  },
  {
    question: 'How to apply for Trade Apprentice through NAPS portal?',
    answer:
      'To apply for Trade Apprentice, register on the NAPS (National Apprenticeship Promotion Scheme) portal at apprenticeshipindia.gov.in. Upload your ITI certificate (NCVT/SCVT), Aadhaar card, and other documents. Search for available apprenticeship opportunities in government establishments and apply online.',
  },
  {
    question: 'Which ITI trades have maximum government job opportunities?',
    answer:
      'ITI trades with maximum government job opportunities include Fitter, Electrician, Welder, Turner, Machinist, Diesel Mechanic, Wireman, Electronics Mechanic, Instrument Mechanic, and COPA (Computer Operator & Programming Assistant). Fitter and Electrician trades have the highest number of vacancies across Railway, Defence, and PSUs.',
  },
  {
    question: 'Is NCVT certificate necessary for ITI government jobs?',
    answer:
      'Most government organizations prefer NCVT (National Council for Vocational Training) certified ITI candidates. However, SCVT (State Council for Vocational Training) certificates are also accepted by many recruiters including Railways and State Government departments. NCVT certification is nationally recognized and gives wider job opportunities.',
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
        name: 'ITI Jobs',
        item: 'https://sarkarialert.online/iti-jobs',
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
    data = await getJobs({ qualification: 'iti', page: '1' });
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
      filterParams={{ qualification: 'iti' }}
    />
  );
}

export default function ITIJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              ITI Government Jobs 2026 — Trade-wise Sarkari Naukri
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              ITI सरकारी नौकरी 2026 — ट्रेड अप्रेंटिस, रेलवे, PSU भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>ITI sarkari naukri 2026</strong> across all major government departments and PSUs.
            Candidates with <strong>ITI (NCVT/SCVT)</strong> in trades like <strong>Fitter</strong>, <strong>Electrician</strong>,{' '}
            <strong>Welder</strong>, <strong>Turner</strong>, <strong>Diesel Mechanic</strong>, and others can apply for posts like{' '}
            <strong>Railway Technician</strong>, <strong>Trade Apprentice</strong>, <strong>Ordnance Factory Worker</strong>,{' '}
            <strong>Defence Civilian Posts</strong>, and PSU jobs at <strong>NTPC</strong>, <strong>ONGC</strong>, <strong>BHEL</strong>, <strong>SAIL</strong>.
            These jobs offer pay scale of Rs 19,900 - 25,500+ (Level 2-4) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां ITI पास उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। रेलवे, रक्षा, NTPC, ONGC,
            आयुध निर्माणी और ट्रेड अप्रेंटिस की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — ITI Government Jobs
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
