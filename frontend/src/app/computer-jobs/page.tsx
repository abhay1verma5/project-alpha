import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Monitor } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Computer/IT Government Jobs 2026-27 — BCA, B.Sc CS, MCA Sarkari Naukri | SarkariAlert',
  description:
    'Computer/IT government jobs 2026-27: Browse latest sarkari naukri for BCA, B.Sc Computer Science, MCA, B.Tech CS/IT candidates. NIC, NIELIT, SSC Scientific Assistant, IBPS IT Officer, DRDO Computer Scientist vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'computer government jobs 2026',
    'it sarkari naukri 2026',
    'bca government jobs',
    'mca sarkari naukri',
    'nic recruitment 2026',
    'nielit vacancy 2026',
    'ssc scientific assistant computer',
    'ibps it officer vacancy',
    'drdo computer scientist',
    'bsc computer science govt jobs',
    'computer operator sarkari naukri',
    'it officer bharti 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/computer-jobs',
  },
  openGraph: {
    title: 'Computer/IT Government Jobs 2026-27 — Latest BCA, MCA, B.Sc CS Sarkari Naukri',
    description:
      'Find computer/IT sarkari naukri 2026-27. NIC, NIELIT, SSC Scientific Assistant, IBPS IT Officer & DRDO vacancies for BCA, MCA, B.Sc CS candidates.',
    url: 'https://sarkarialert.online/computer-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for computer science graduates?',
    answer:
      'Computer science graduates (BCA, B.Sc CS, MCA, B.Tech CS/IT) can apply for NIC (National Informatics Centre) Scientist/Technical posts, NIELIT Scientist, SSC Scientific Assistant (Computer Science), IBPS SO IT Officer in banks, DRDO Computer Scientist, Indian Coast Guard IT posts, Railway IT department, UIDAI (Aadhaar) technical posts, and various state government IT officer positions.',
  },
  {
    question: 'Computer ki sarkari naukri ke liye kya qualification chahiye?',
    answer:
      'Computer ki sarkari naukri ke liye BCA, B.Sc Computer Science, MCA ya B.Tech CS/IT degree kisi manyata prapt sansthan se honi chahiye. NIC aur DRDO ke liye B.Tech/M.Tech zaroori hai. IBPS IT Officer ke liye graduation in CS/IT ya equivalent chahiye. SSC Scientific Assistant ke liye B.Sc Computer Science ya BCA bhi chalti hai. Computer operator posts ke liye basic computer certificate bhi kafi hai.',
  },
  {
    question: 'How to get NIC Scientist job?',
    answer:
      'NIC (National Informatics Centre) recruits Scientists through direct recruitment and deputation. For direct recruitment, candidates need B.Tech/MCA with relevant experience. NIC conducts its own recruitment exam covering Computer Science subjects, Programming, Networking, Database, and Web Technologies. Selection is based on written test followed by interview. NIC offers Pay Level 10-11 with government benefits.',
  },
  {
    question: 'What is the salary for IBPS IT Officer?',
    answer:
      'IBPS IT Officer (Specialist Officer Scale-I) gets a basic pay of Rs 36,000 - Rs 63,840. With allowances (DA, HRA, etc.), the gross salary is approximately Rs 50,000 - Rs 65,000 per month for freshers. Senior IT Officers at Scale-II and Scale-III earn higher. Banks also provide perks like medical insurance, leased accommodation, and performance-linked incentives.',
  },
  {
    question: 'Can BCA graduates apply for government IT jobs?',
    answer:
      'Yes, BCA graduates can apply for several government IT jobs including SSC Scientific Assistant (Computer Science), state government IT officer/computer operator posts, NIELIT technical posts, UIDAI technical posts, and various computer operator positions in central/state government. For NIC and DRDO higher posts, MCA or B.Tech may be required.',
  },
  {
    question: 'What is DRDO Computer Scientist recruitment process?',
    answer:
      'DRDO recruits Computer Scientists through CEPTAM (Centre for Personnel Talent Management) for Technical Assistant posts and through RAC (Recruitment & Assessment Centre) for Scientist-B posts. Scientist-B requires B.Tech/BE in CS/IT with GATE qualification. CEPTAM requires Diploma/B.Sc in relevant field. Selection involves CBT (Tier-I and Tier-II) followed by document verification/interview.',
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
        name: 'Computer/IT Jobs',
        item: 'https://sarkarialert.online/computer-jobs',
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
    data = await getJobs({ qualification: 'computer', page: '1' });
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
      filterParams={{ qualification: 'computer' }}
    />
  );
}

export default function ComputerJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Monitor className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Computer/IT Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              कंप्यूटर/IT सरकारी नौकरी 2026 — NIC, NIELIT, IBPS IT Officer भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>computer/IT sarkari naukri 2026</strong> across all major government departments and organizations.
            Candidates with <strong>BCA</strong>, <strong>B.Sc Computer Science</strong>, <strong>MCA</strong>, or <strong>B.Tech CS/IT</strong> can apply for posts like{' '}
            <strong>NIC Scientist</strong>, <strong>NIELIT Technical Officer</strong>, <strong>SSC Scientific Assistant</strong>,{' '}
            <strong>IBPS SO IT Officer</strong>, <strong>DRDO Computer Scientist</strong>, and various state government IT officer positions.
            These jobs offer pay scale of Rs 35,400 - 56,100+ (Level 6-10) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां कंप्यूटर/IT उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। NIC, NIELIT,
            SSC Scientific Assistant, IBPS IT Officer और DRDO की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Computer/IT Government Jobs
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
