import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Delhi Government Jobs 2026-27 — दिल्ली सरकारी नौकरी | SarkariAlert',
  description:
    'Delhi Government Jobs 2026-27: Latest Delhi sarkari naukri for DSSSB, Delhi Police, DTC, Delhi Jal Board, MCD & more. Apply online for Delhi government vacancies with eligibility, salary & last date.',
  keywords: [
    'delhi government jobs 2026',
    'delhi sarkari naukri',
    'dsssb vacancy 2026',
    'delhi police bharti 2026',
    'dtc recruitment 2026',
    'delhi jal board vacancy',
    'mcd vacancy 2026',
    'dsssb tgt pgt vacancy',
    'delhi sarkari naukri 2026',
    'delhi state government jobs',
    'delhi police constable bharti',
    'dsssb je recruitment',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/delhi-government-jobs',
  },
  openGraph: {
    title: 'Delhi Government Jobs 2026-27 — दिल्ली सरकारी नौकरी',
    description:
      'Find Delhi sarkari naukri 2026-27. DSSSB, Delhi Police, DTC, Delhi Jal Board, MCD & more vacancies in Delhi.',
    url: 'https://sarkarialert.online/delhi-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Delhi?',
    answer:
      'The major recruitment bodies in Delhi are: DSSSB (Delhi Subordinate Services Selection Board) for TGT, PGT, LDC, Patwari, Assistant Teacher, Junior Engineer, Pharmacist, Staff Nurse, and other Group B/C posts. Delhi Police (under SSC/UPSC) for Constable, Head Constable, SI, and ASI. DTC (Delhi Transport Corporation) for Bus Driver, Conductor, and other posts. Delhi Jal Board (DJB) for Junior Engineer, Assistant Engineer. MCD (Municipal Corporation of Delhi) for various posts.',
  },
  {
    question: 'DSSSB TGT/PGT exam ka pattern kya hai?',
    answer:
      'DSSSB TGT (Trained Graduate Teacher) exam mein ek paper hota hai — 200 questions, 200 marks, 2 hours. Sections: General Awareness (20), General Intelligence & Reasoning (20), Arithmetic & Numerical Ability (20), Hindi Language & Comprehension (20), English Language & Comprehension (20), aur Concerned Subject (100). PGT mein bhi same pattern hai but difficulty level higher hota hai. TGT ke liye B.Ed + Graduation aur PGT ke liye B.Ed + Post Graduation chahiye.',
  },
  {
    question: 'Delhi Police Constable ki bharti kaise hoti hai?',
    answer:
      'Delhi Police Constable bharti SSC (Staff Selection Commission) ke through hoti hai. Computer Based Exam (100 questions, 100 marks — GK/Current Affairs, Reasoning, Numerical Ability, Hindi/English), Physical Endurance & Measurement Test (1600m run in 7 min for males, 800m run in 4 min 30 sec for females), aur Medical Exam hota hai. Qualification: 12th pass. Height: 170 cm (male), 157 cm (female). Salary Rs 21,700 basic pay se start hoti hai with Delhi allowances.',
  },
  {
    question: 'Delhi Jal Board (DJB) Junior Engineer ki salary aur exam kya hai?',
    answer:
      'Delhi Jal Board Junior Engineer ki bharti DSSSB ke through hoti hai. Exam mein General Awareness (20 marks), Reasoning (20), Maths (20), Hindi (10), English (10), aur Technical Subject — Civil/Electrical/Mechanical (120 marks) se questions aate hain. Qualification: Diploma/B.Tech in relevant branch. Salary Pay Level 6 (Rs 35,400 basic pay) se start hoti hai. Delhi allowances ke saath gross salary Rs 50,000-60,000 per month hoti hai. DJB mein AE posts bhi nikti hain.',
  },
  {
    question: 'MCD mein kaunsi government jobs milti hain?',
    answer:
      'MCD (Municipal Corporation of Delhi) mein various posts hoti hain: Junior Engineer (Civil/Electrical), Assistant Teacher (Nursery/Primary), Pharmacist, Staff Nurse, Patwari, Lower Division Clerk, Multi Tasking Staff, Sanitary Inspector, aur other Group C/D posts. MCD ki bharti mostly DSSSB ke through hoti hai. MCD teachers ki salary bahut acchi hai — Rs 30,000-50,000 per month (Delhi allowances ke saath). MCD ki website mcdonline.nic.in pe bhi notifications aate hain.',
  },
  {
    question: 'What are the upcoming Delhi government exams in 2026?',
    answer:
      'Upcoming Delhi government exams in 2026 include: DSSSB TGT/PGT teacher recruitment, DSSSB LDC/Patwari, DSSSB Junior Engineer, Delhi Police Constable & Head Constable (through SSC), Delhi Jal Board JE/AE, DTC Bus Driver & Conductor, MCD Assistant Teacher, DSSSB Pharmacist & Staff Nurse, AIIMS Delhi non-faculty posts, and various autonomous body recruitments. Check DSSSB official website dsssb.delhi.gov.in regularly for latest notifications.',
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
        name: 'Delhi Government Jobs',
        item: 'https://sarkarialert.online/delhi-government-jobs',
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
    data = await getJobs({ state: 'delhi', page: '1' });
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
      filterParams={{ state: 'delhi' }}
    />
  );
}

export default function DelhiGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Delhi Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              दिल्ली सरकारी नौकरी 2026 — DSSSB, Delhi Police, DTC, DJB, MCD भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Delhi sarkari naukri 2026</strong> across all government departments.
            Browse vacancies from <strong>DSSSB</strong> (TGT, PGT, JE, LDC), <strong>Delhi Police</strong> (Constable, SI),{' '}
            <strong>DTC</strong> (Delhi Transport Corporation), <strong>Delhi Jal Board</strong> (Junior Engineer, AE),
            and <strong>MCD</strong> (Municipal Corporation) recruitment. Delhi offers some of the highest-paying government jobs
            due to additional Delhi allowances and HRA benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां दिल्ली की सभी नवीनतम सरकारी नौकरियां देखें। DSSSB, Delhi Police, DTC, Delhi Jal Board, MCD
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। DSSSB TGT/PGT, Delhi Police Constable, DJB JE भर्ती अपडेट।
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
          Frequently Asked Questions — Delhi Government Jobs
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
