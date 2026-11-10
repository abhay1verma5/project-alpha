import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, FlaskConical } from 'lucide-react';

export const metadata: Metadata = {
  title: 'B.Sc Government Jobs 2026-27 — Science Graduate Sarkari Naukri | SarkariAlert',
  description:
    'B.Sc government jobs 2026-27: Browse latest sarkari naukri for science graduates. Scientific Assistant, Lab Technician, Forest Officer, ISRO, Meteorological Dept & research vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'bsc government jobs 2026',
    'science graduate sarkari naukri',
    'scientific assistant vacancy 2026',
    'lab technician government jobs',
    'forest officer vacancy 2026',
    'isro scientist recruitment',
    'bsc sarkari naukri 2026',
    'meteorological department jobs',
    'drdo scientist vacancy',
    'science graduate govt jobs',
    'bsc chemistry physics biology jobs',
    'research scientist sarkari naukri',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/science-jobs',
  },
  openGraph: {
    title: 'B.Sc Government Jobs 2026-27 — Science Graduate Sarkari Naukri',
    description:
      'Find B.Sc sarkari naukri 2026-27. Scientific Assistant, Lab Technician, Forest Officer, ISRO, Meteorological Dept & more vacancies for science graduates.',
    url: 'https://sarkarialert.online/science-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for B.Sc graduates?',
    answer:
      'B.Sc graduates can apply for Scientific Assistant (DRDO, BARC, ISRO), Lab Technician (hospitals, forensic labs), Forest Officer/Range Officer (State Forest Services), Meteorological Department posts (IMD), CSIR research positions, SSC CGL (various ministries), State PSC posts, Food Inspector, Drug Inspector, and teaching positions (TGT Science) in government schools.',
  },
  {
    question: 'B.Sc ke baad kaun si sarkari naukri mil sakti hai?',
    answer:
      'B.Sc ke baad aap Scientific Assistant (DRDO, BARC, ISRO), Lab Technician, Forest Officer, Meteorological Department, CSIR mein research positions, SSC CGL, State PSC, Food Inspector, Drug Inspector, aur TGT Science Teacher ki naukri ke liye apply kar sakte hain. UPSC IFS (Indian Forest Service) bhi B.Sc graduates ke liye ek bahut accha option hai.',
  },
  {
    question: 'How to get a job in ISRO after B.Sc?',
    answer:
      'After B.Sc, you can apply for ISRO Scientist/Engineer SC posts (if you have M.Sc/M.Tech) or ISRO Technical Assistant posts with B.Sc qualification. ISRO recruits through its own written exam followed by interview. You can also join ISRO through ICRB (ISRO Centralized Recruitment Board) notifications published on isro.gov.in.',
  },
  {
    question: 'What is the salary for Scientific Assistant in government?',
    answer:
      'Scientific Assistant in government organizations gets Pay Level 6 (Rs 35,400 - Rs 1,12,400 basic pay). With allowances (DA, HRA, etc.), the gross salary is approximately Rs 50,000 - Rs 60,000 per month for freshers. DRDO, BARC, and ISRO offer additional allowances making the CTC even higher.',
  },
  {
    question: 'Can B.Sc graduates apply for Forest Officer posts?',
    answer:
      'Yes, B.Sc graduates (especially with Botany, Zoology, Forestry, Agriculture) can apply for Indian Forest Service (IFS) through UPSC, State Forest Service through State PSCs, Forest Range Officer, and Forest Guard posts. IFS officers start at Pay Level 10 (Rs 56,100 basic) with field allowances.',
  },
  {
    question: 'What are the best government exams for science graduates?',
    answer:
      'The best government exams for B.Sc graduates include UPSC IFS (Indian Forest Service), SSC CGL, State PSC exams, ISRO Scientist/Engineer exam, DRDO SET (Scientist Entry Test), CSIR-UGC NET (for research/teaching), ICAR NET, GATE (for M.Sc holders), and various Scientific Assistant recruitment exams by BARC, DRDO, and other organizations.',
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
        name: 'Science Jobs',
        item: 'https://sarkarialert.online/science-jobs',
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
    data = await getJobs({ qualification: 'b.sc', page: '1' });
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
      filterParams={{ qualification: 'b.sc' }}
    />
  );
}

export default function ScienceJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              B.Sc Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              बीएससी सरकारी नौकरी 2026 — साइंस ग्रेजुएट भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>B.Sc sarkari naukri 2026</strong> across all major government departments and research organizations.
            Candidates with <strong>B.Sc</strong> in <strong>Physics</strong>, <strong>Chemistry</strong>, <strong>Biology</strong>,{' '}
            <strong>Mathematics</strong>, or other science subjects can apply for posts like{' '}
            <strong>Scientific Assistant</strong>, <strong>Lab Technician</strong>, <strong>Forest Officer</strong>,{' '}
            <strong>ISRO Scientist</strong>, <strong>Meteorological Assistant</strong>, and research positions at{' '}
            <strong>DRDO</strong>, <strong>BARC</strong>, <strong>CSIR</strong>, and more.
            These jobs offer pay scale of Rs 35,400 - 56,100+ (Level 6-10) with government benefits like pension, medical, and job security.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां बीएससी साइंस ग्रेजुएट उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। ISRO, DRDO, BARC,
            CSIR, वन विभाग, मौसम विभाग और अन्य विज्ञान संबंधित भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — B.Sc Government Jobs
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
