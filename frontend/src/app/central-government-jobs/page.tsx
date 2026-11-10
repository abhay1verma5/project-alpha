import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Landmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Central Government Jobs 2026-27 — केंद्र सरकार की नौकरी | SarkariAlert',
  description:
    'Central government jobs 2026-27: Browse latest sarkari naukri in central government departments. UPSC, SSC, Railway, Banking, Defence, central ministries & 7th pay commission jobs. Apply online with eligibility, salary & last date.',
  keywords: [
    'central government jobs 2026',
    'kendriya sarkar ki naukri',
    'central govt vacancy 2026',
    'upsc recruitment 2026',
    'ssc cgl chsl vacancy',
    'railway government jobs',
    'banking government jobs 2026',
    'defence civilian jobs',
    'central ministry jobs',
    '7th pay commission salary',
    'central sarkari naukri 2026',
    'kendriya sarkar bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/central-government-jobs',
  },
  openGraph: {
    title: 'Central Government Jobs 2026-27 — केंद्र सरकार की नौकरी',
    description:
      'Find central government sarkari naukri 2026-27. UPSC, SSC, Railway, Banking, Defence & central ministry vacancies with 7th pay commission salary.',
    url: 'https://sarkarialert.online/central-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major central government recruiting bodies?',
    answer:
      'The major central government recruiting bodies include UPSC (Union Public Service Commission) for IAS, IPS, IFS and Group A/B services; SSC (Staff Selection Commission) for CGL, CHSL, MTS, GD Constable; Railway Recruitment Boards (RRB) for NTPC, Group D, JE; IBPS for bank PO/Clerk; and individual ministries/departments for specific posts. These organizations conduct exams at the national level for lakhs of vacancies every year.',
  },
  {
    question: 'Central government job mein kitni salary milti hai 7th pay commission ke anusaar?',
    answer:
      'Central government mein 7th pay commission ke anusaar salary: MTS/Group D - Pay Level 1 (Rs 18,000 basic), LDC/DEO - Pay Level 2 (Rs 19,900), UDC/Constable - Pay Level 3-4 (Rs 21,700-25,500), Inspector/SI - Pay Level 6-7 (Rs 35,400-44,900), Section Officer - Pay Level 7-8, IAS/IPS - Pay Level 10+ (Rs 56,100+). DA, HRA, TA aur anya bhatte alag se milte hain.',
  },
  {
    question: 'How to prepare for SSC CGL exam for central government jobs?',
    answer:
      'SSC CGL preparation strategy: Tier-I (Prelims) covers Quantitative Aptitude, General Intelligence, English, General Awareness - 60 minutes for 100 questions. Tier-II covers Math, English, Statistics/General Studies - 2 hours 15 minutes. Focus on NCERT books (6-12), previous year papers, daily current affairs, and practice mock tests. Dedicate 6-8 months for serious preparation.',
  },
  {
    question: 'What are the benefits of central government jobs?',
    answer:
      'Central government job benefits include: 7th Pay Commission salary with DA (Dearness Allowance), HRA (House Rent Allowance), TA (Transport Allowance), pension under NPS/OPS, medical facilities (CGHS), LTC (Leave Travel Concession), Group Insurance, Gratuity, GPF (General Provident Fund), child education allowance, maternity/paternity leave, and job security. Central government employees also get government quarters in many cases.',
  },
  {
    question: 'Which defence civilian jobs are available in central government?',
    answer:
      'Defence civilian jobs include posts in Ordnance Factory Board (OFB), Defence Research & Development Organisation (DRDO), Border Roads Organisation (BRO), Military Engineering Service (MES), Army/Navy/Air Force civilian posts, Defence Accounts Department, Cantonment Board, and various defence PSUs (BEL, HAL, BDL, BEML, MDL). These posts are recruited through SSC, UPSC, or direct recruitment by respective organizations.',
  },
  {
    question: 'Can state government employees transfer to central government?',
    answer:
      'Direct transfer from state to central government is generally not possible. However, state government employees can appear for UPSC Civil Services or other central government exams if they meet age and eligibility criteria. Some deputation posts are available where state officers can serve in central government on deputation basis for 2-5 years. IAS/IPS officers regularly serve at both central and state levels.',
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
        name: 'Central Government Jobs',
        item: 'https://sarkarialert.online/central-government-jobs',
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
    data = await getJobs({ page: '1' });
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
      filterParams={{}}
    />
  );
}

export default function CentralGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Landmark className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Central Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              केंद्र सरकार की नौकरी 2026 — UPSC, SSC, Railway, Banking भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>central government sarkari naukri 2026</strong> across all major central departments and ministries.
            Central government jobs are recruited through <strong>UPSC</strong> (IAS, IPS, IFS, CDS, NDA),{' '}
            <strong>SSC</strong> (CGL, CHSL, MTS, GD Constable), <strong>Railway Recruitment Boards</strong> (NTPC, Group D, JE),{' '}
            <strong>IBPS/SBI</strong> (Bank PO, Clerk), and individual ministries/departments.
            All central government jobs follow the <strong>7th Pay Commission</strong> pay structure with benefits like DA, HRA, TA,
            pension (NPS), CGHS medical facilities, LTC, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां केंद्र सरकार की सभी नवीनतम नौकरियां देखें। UPSC, SSC, रेलवे, बैंकिंग, रक्षा और सभी
            केंद्रीय मंत्रालयों/विभागों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Central Government Jobs
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
