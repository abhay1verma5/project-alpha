import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Banknote } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Banking Government Jobs 2026-27 — IBPS, SBI, RBI Bank Bharti | SarkariAlert',
  description:
    'Banking government jobs 2026-27: Browse latest bank sarkari naukri. IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B/Assistant, NABARD, SIDBI & cooperative bank vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'banking government jobs 2026',
    'bank sarkari naukri 2026',
    'ibps po clerk vacancy 2026',
    'sbi po recruitment 2026',
    'rbi grade b vacancy',
    'nabard recruitment 2026',
    'bank bharti 2026',
    'ibps rrb po clerk',
    'sbi clerk vacancy 2026',
    'bank po sarkari naukri',
    'cooperative bank jobs',
    'rbi assistant vacancy 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/banking-jobs',
  },
  openGraph: {
    title: 'Banking Government Jobs 2026-27 — IBPS, SBI, RBI Bank Bharti',
    description:
      'Find bank sarkari naukri 2026-27. IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B, NABARD & more banking vacancies.',
    url: 'https://sarkarialert.online/banking-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'How to apply for IBPS PO and Clerk exams?',
    answer:
      'IBPS PO and Clerk exams are conducted annually by the Institute of Banking Personnel Selection. Apply online at ibps.in when the notification is released (usually July-August for PO, September-October for Clerk). Eligibility: Graduation in any discipline from a recognized university. Age: 20-30 years for PO, 20-28 years for Clerk. The exam has Prelims (objective) + Mains + Interview (PO only).',
  },
  {
    question: 'Bank PO aur Clerk ki salary kitni hoti hai?',
    answer:
      'Bank PO ki starting basic pay Rs 36,000-40,000 hoti hai. Allowances (DA, HRA, CCA, special pay) ke saath gross salary Rs 52,000-60,000 per month hoti hai. Bank Clerk ki starting basic pay Rs 19,900 hai aur allowances ke saath gross salary Rs 28,000-35,000 hoti hai. Dono ko medical insurance, pension (NPS), leased accommodation, LFC, aur anya perks milte hain.',
  },
  {
    question: 'What is the difference between IBPS PO and SBI PO?',
    answer:
      'IBPS PO recruits for 11 public sector banks (Bank of Baroda, PNB, Canara Bank, etc.) while SBI PO recruits only for State Bank of India. SBI PO has higher initial basic pay (Rs 41,960 vs Rs 36,000 for IBPS PO). SBI PO exam is considered slightly tougher. Both have similar exam patterns: Prelims + Mains + Interview. SBI PO has more metro postings while IBPS PO banks have wider rural/semi-urban postings.',
  },
  {
    question: 'How to prepare for RBI Grade B exam?',
    answer:
      'RBI Grade B is one of the most prestigious banking exams. Phase-I covers General Awareness, English, Quantitative Aptitude, Reasoning. Phase-II covers Economic & Social Issues, Finance & Management, and English (descriptive). Phase-III is Interview. Preparation: Focus on economics (Ramesh Singh), finance (banking awareness), RBI publications, The Hindu/Indian Express for current affairs, and NCERT economics books.',
  },
  {
    question: 'What is the role of NABARD in banking recruitment?',
    answer:
      'NABARD (National Bank for Agriculture and Rural Development) recruits for Grade A (Assistant Manager) and Grade B (Manager) officers. NABARD Grade A salary starts at Rs 44,500 basic with gross salary of Rs 70,000-80,000. Exam pattern: Prelims + Mains + Interview. NABARD focuses on agriculture and rural development. It is one of the highest paying banking organizations in India.',
  },
  {
    question: 'Can commerce graduates get advantage in banking exams?',
    answer:
      'While banking exams are open to graduates of any discipline, commerce graduates (B.Com, BBA, MBA Finance) have a natural advantage in subjects like accountancy, finance, banking awareness, and economic concepts. However, the exam pattern tests general aptitude (reasoning, English, math) where all graduates are equally competitive. CA/CS/ICWA qualified candidates get additional preference in some specialist officer posts.',
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
        name: 'Banking Jobs',
        item: 'https://sarkarialert.online/banking-jobs',
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
    data = await getJobs({ category: 'banking', page: '1' });
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
      filterParams={{ category: 'banking' }}
    />
  );
}

export default function BankingJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Banknote className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Banking Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              बैंक सरकारी नौकरी 2026 — IBPS, SBI, RBI भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>banking sarkari naukri 2026</strong> across all major public sector banks and financial institutions.
            Candidates with graduation in any discipline can apply for{' '}
            <strong>IBPS PO/Clerk</strong>, <strong>SBI PO/Clerk</strong>, <strong>RBI Grade B/Assistant</strong>,{' '}
            <strong>NABARD Grade A/B</strong>, <strong>SIDBI</strong>, <strong>IBPS RRB</strong>,{' '}
            and <strong>Specialist Officer (SO)</strong> posts.
            Banking jobs offer attractive salary packages with PO starting at Rs 36,000-42,000 basic pay,
            along with perks like leased accommodation, medical insurance, LFC, pension (NPS), and career growth up to GM/CMD level.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां बैंक भर्ती के सभी नवीनतम अपडेट देखें। IBPS PO/Clerk, SBI PO/Clerk, RBI Grade B, NABARD,
            SIDBI और अन्य बैंकिंग भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Banking Government Jobs
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
