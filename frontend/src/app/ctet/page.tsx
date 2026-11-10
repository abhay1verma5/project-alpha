import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { GraduationCap, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CTET 2026-27 — Central Teacher Eligibility Test | SarkariAlert',
  description:
    'CTET 2026-27 Central Teacher Eligibility Test notification, eligibility (D.El.Ed/B.Ed), Paper 1 vs Paper 2, qualifying marks, validity (lifetime). Apply for KVS, NVS & central government school teaching jobs.',
  keywords: [
    'ctet 2026',
    'ctet notification 2026',
    'ctet eligibility 2026',
    'ctet paper 1 paper 2',
    'ctet qualifying marks',
    'ctet validity lifetime',
    'ctet syllabus 2026',
    'ctet exam pattern',
    'central teacher eligibility test',
    'ctet bed deled',
    'ctet kvs nvs recruitment',
    'ctet vs tet difference',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/ctet',
  },
  openGraph: {
    title: 'CTET 2026-27 — Central Teacher Eligibility Test',
    description:
      'CTET 2026-27 — eligibility, Paper 1 vs Paper 2, qualifying marks, lifetime validity. Complete guide for teaching aspirants.',
    url: 'https://sarkarialert.online/ctet',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the difference between CTET Paper 1 and Paper 2?',
    answer:
      'CTET Paper 1 is for candidates who want to teach Classes 1-5 (Primary Level). It covers Child Development & Pedagogy, Language I, Language II, Mathematics, and Environmental Studies — 150 questions, 150 marks, 2.5 hours. CTET Paper 2 is for Classes 6-8 (Upper Primary Level). It covers Child Development & Pedagogy, Language I, Language II, and either Mathematics & Science OR Social Studies/Social Science — 150 questions, 150 marks, 2.5 hours. Candidates can appear for both papers.',
  },
  {
    question: 'What is the eligibility for CTET 2026?',
    answer:
      'For Paper 1 (Classes 1-5): Senior Secondary (12th) with at least 50% marks AND D.El.Ed (Diploma in Elementary Education) or equivalent. OR Senior Secondary with 50% AND B.Ed. OR Graduation with D.El.Ed. For Paper 2 (Classes 6-8): Graduation with at least 50% marks AND B.Ed (Bachelor of Education). OR Graduation with 50% AND D.El.Ed. OR Senior Secondary with 50% AND B.El.Ed (4-year integrated course).',
  },
  {
    question: 'CTET ki validity ab lifetime hai kya?',
    answer:
      'Haan, CTET certificate ki validity ab lifetime hai! Pehle CTET certificate sirf 7 saal ke liye valid tha, lekin December 2021 mein government ne notification jaari karke CTET certificate ko lifetime valid kar diya hai. Iska matlab ek baar CTET qualify karne ke baad aapko dobara exam dene ki zaroorat nahi hai. Lekin agar aap apna score improve karna chahte hain toh dobara exam de sakte hain.',
  },
  {
    question: 'What are the qualifying marks for CTET?',
    answer:
      'CTET qualifying marks are: General (Unreserved) category — 60% (i.e., 90 out of 150 marks). OBC/SC/ST category — 55% (i.e., 82 out of 150 marks). CTET is a qualifying exam, not a ranking exam. Clearing CTET does not guarantee a teaching job — it only makes you eligible to apply for teaching positions in central government schools like KVS, NVS, and other schools under the central government.',
  },
  {
    question: 'What is the difference between CTET and State TET?',
    answer:
      'CTET (Central Teacher Eligibility Test) is conducted by CBSE and is valid for teaching posts in central government schools (KVS, NVS, Army Schools, EFC schools, etc.) and also accepted by many state governments. State TET is conducted by individual state governments and is valid only for teaching posts in that particular state\'s government schools. CTET has wider acceptance. Some states accept only their state TET, while others accept both CTET and state TET for recruitment.',
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
        name: 'CTET',
        item: 'https://sarkarialert.online/ctet',
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
    data = await getJobs({ category: 'teaching', page: '1' });
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
      filterParams={{ category: 'teaching' }}
    />
  );
}

export default function CtetPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              CTET 2026 — Central Teacher Eligibility Test
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              CTET 2026 — केंद्रीय शिक्षक पात्रता परीक्षा
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>CTET 2026</strong> exam updates. The Central Teacher Eligibility Test is conducted by
            CBSE for candidates aspiring to teach in <strong>KVS (Kendriya Vidyalaya)</strong>,{' '}
            <strong>NVS (Navodaya Vidyalaya)</strong>, and other central government schools.{' '}
            <strong>Paper 1</strong> is for Classes 1-5 and <strong>Paper 2</strong> is for Classes 6-8.
            Candidates with <strong>D.El.Ed</strong> or <strong>B.Ed</strong> qualification can apply.
            CTET certificate now has <strong>lifetime validity</strong>.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            CTET 2026 — केंद्रीय शिक्षक पात्रता परीक्षा। KVS, NVS और केंद्रीय विद्यालयों में
            शिक्षक बनने के लिए D.El.Ed/B.Ed उम्मीदवार आवेदन करें। अब लाइफटाइम वैलिडिटी।
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
          Frequently Asked Questions — CTET 2026
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
