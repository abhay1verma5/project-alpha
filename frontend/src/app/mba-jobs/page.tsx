import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MBA Government Jobs 2026-27 — Management Cadre Sarkari Naukri | SarkariAlert',
  description:
    'MBA government jobs 2026-27: Browse latest sarkari naukri for MBA, PGDM, BBA management graduates. IBPS SO, RBI Grade B, CAG, UPSC management posts, PSU management trainee vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'mba government jobs 2026',
    'mba sarkari naukri 2026',
    'ibps so management officer',
    'rbi grade b officer vacancy',
    'psu management trainee through cat',
    'upsc management posts',
    'sebi grade a officer',
    'mba ke baad sarkari naukri',
    'management cadre govt jobs',
    'cag auditor vacancy',
    'nabard grade a officer',
    'mba govt jobs salary',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/mba-jobs',
  },
  openGraph: {
    title: 'MBA Government Jobs 2026-27 — Latest Management Cadre Sarkari Naukri',
    description:
      'Find MBA sarkari naukri 2026-27. IBPS SO, RBI Grade B, PSU management trainee, SEBI & UPSC management cadre vacancies for MBA graduates.',
    url: 'https://sarkarialert.online/mba-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for MBA graduates?',
    answer:
      'MBA graduates can apply for IBPS SO (Specialist Officer) - Marketing/HR/IT/Finance, RBI Grade B Officer, SEBI Grade A Officer, NABARD Grade A/B Officer, PSU Management Trainee through CAT (IOCL, NTPC, GAIL, BHEL, etc.), CAG (Comptroller & Auditor General) posts, UPSC Civil Services (IAS/IPS), and various management cadre posts in state PSUs and government corporations.',
  },
  {
    question: 'MBA ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'MBA ke baad aap IBPS SO (Marketing/HR/Finance Officer), RBI Grade B, SEBI Grade A, NABARD Officer, PSU Management Trainee (CAT score se), CAG posts, aur UPSC services ke liye apply kar sakte hain. MBA Finance wale banking aur financial regulatory bodies mein, MBA HR wale PSU HR posts mein, aur MBA Marketing wale banking aur public sector marketing roles mein apply kar sakte hain.',
  },
  {
    question: 'How to get PSU Management Trainee job through CAT score?',
    answer:
      'Many PSUs like IOCL, NTPC, GAIL, BHEL, OIL, etc. recruit Management Trainees through CAT score. After qualifying CAT, apply on individual PSU websites when notifications are released. Selection typically involves CAT score shortlisting followed by Group Discussion (GD) and Personal Interview (PI). The pay scale for MT in PSUs is usually E1-E2 grade (Rs 40,000-50,000 basic).',
  },
  {
    question: 'What is the salary for RBI Grade B Officer?',
    answer:
      'RBI Grade B Officer gets an initial basic pay of Rs 55,200 (as per RBI pay structure). With allowances including DA, HRA, City Compensatory Allowance, Grade Allowance, etc., the gross salary is approximately Rs 1,00,000 - Rs 1,20,000 per month. RBI also provides subsidized housing, medical benefits, LFC, and performance-linked incentives.',
  },
  {
    question: 'Can MBA graduates apply for UPSC Civil Services?',
    answer:
      'Yes, MBA graduates can apply for UPSC Civil Services (IAS, IPS, IFS, IRS, etc.) as the minimum qualification is a graduation in any discipline. Many MBA graduates choose Management or Public Administration as their optional subject. MBA from a good institute also helps in the interview stage. Age limit is 21-32 years (with relaxation for reserved categories).',
  },
  {
    question: 'What is the IBPS SO exam for MBA graduates?',
    answer:
      'IBPS SO (Specialist Officer) exam recruits MBA graduates for positions like Marketing Officer (Scale-I), HR/Personnel Officer (Scale-I), IT Officer, and Law Officer in public sector banks. The exam has Prelims (Reasoning, English, Quantitative Aptitude) and Mains (Professional Knowledge). MBA in relevant specialization is required. Pay scale is Officer Scale-I (Rs 36,000-63,840 basic).',
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
        name: 'MBA Jobs',
        item: 'https://sarkarialert.online/mba-jobs',
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
    data = await getJobs({ qualification: 'mba', page: '1' });
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
      filterParams={{ qualification: 'mba' }}
    />
  );
}

export default function MbaJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              MBA Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              MBA सरकारी नौकरी 2026 — RBI, SEBI, PSU Management Trainee भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>MBA sarkari naukri 2026</strong> across all major government organizations and PSUs.
            Candidates with <strong>MBA</strong>, <strong>PGDM</strong>, or <strong>BBA</strong> degrees can apply for posts like{' '}
            <strong>IBPS SO (Marketing/HR/Finance Officer)</strong>, <strong>RBI Grade B Officer</strong>, <strong>SEBI Grade A</strong>,{' '}
            <strong>PSU Management Trainee</strong> through CAT, <strong>UPSC management cadre posts</strong>, and <strong>NABARD Grade A/B</strong>.
            These jobs offer pay scale of Rs 36,000 - 55,200+ (Officer Scale-I to Grade B) with allowances, pension, and career growth opportunities.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां MBA उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। IBPS SO, RBI Grade B,
            SEBI, NABARD, PSU Management Trainee और UPSC प्रबंधन पदों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — MBA Government Jobs
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
