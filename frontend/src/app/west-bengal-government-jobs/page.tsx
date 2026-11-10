import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'West Bengal Government Jobs 2026-27 — পশ্চিমবঙ্গ সরকারি চাকরি | SarkariAlert',
  description:
    'West Bengal Government Jobs 2026-27: Latest WB sarkari naukri for WBPSC, WB Police, WB TET, WBSSC & more. Apply online for West Bengal state government vacancies with eligibility, salary & last date.',
  keywords: [
    'west bengal government jobs 2026',
    'wb sarkari naukri',
    'wbpsc vacancy 2026',
    'wb police bharti 2026',
    'wb tet teacher vacancy',
    'wbssc recruitment 2026',
    'wbpsc wbcs exam',
    'wb police si vacancy',
    'west bengal sarkari naukri 2026',
    'west bengal state government jobs',
    'wbpsc clerkship 2026',
    'wb police constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/west-bengal-government-jobs',
  },
  openGraph: {
    title: 'West Bengal Government Jobs 2026-27 — পশ্চিমবঙ্গ সরকারি চাকরি',
    description:
      'Find West Bengal sarkari naukri 2026-27. WBPSC, WB Police, WB TET, WBSSC & more vacancies in West Bengal.',
    url: 'https://sarkarialert.online/west-bengal-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in West Bengal?',
    answer:
      'The major recruitment bodies in West Bengal are: WBPSC (West Bengal Public Service Commission) for WBCS (West Bengal Civil Service), Judicial Service, Clerkship, and other Group A/B/C posts. WBSSC (West Bengal Staff Selection Commission) for Group D, Krishi Prayukti Sahayak, and other posts. WB Police Recruitment Board for Constable, SI, Lady Constable, and Excise Constable. WB TET for primary and upper primary teacher recruitment.',
  },
  {
    question: 'WBPSC WBCS exam ka pattern kya hai?',
    answer:
      'WBPSC WBCS (West Bengal Civil Service) exam teen stages mein hoti hai: Prelims (1 paper — 200 questions, 200 marks covering GS, Current Affairs, Reasoning, English, Bengali/Hindi/Urdu/Nepali/Santali), Mains (6 descriptive papers including Bengali/Hindi/Urdu/Nepali/Santali, English, GS papers, optional subject), aur Personality Test (Interview — 200 marks). WBCS se WBAS, WBPS, Joint BDO, Deputy Magistrate jaise posts milte hain.',
  },
  {
    question: 'How to prepare for WB Police SI exam?',
    answer:
      'WB Police SI (Sub Inspector) exam mein Preliminary Exam (200 marks — Reasoning, GK, Elementary Mathematics, English/Bengali), Physical Measurement Test, Physical Efficiency Test (running, long jump, high jump), and Final Written Exam + Interview hota hai. Qualification: Graduation from recognized university. Age: 20-27 years. Physical: Height — 167 cm (male), 160 cm (female). Focus on Bengali/English literature, WB GK, current affairs, and basic mathematics.',
  },
  {
    question: 'WBPSC Clerkship exam mein kya aata hai?',
    answer:
      'WBPSC Clerkship exam ek single stage written test hai — objective type. Subjects: English (Comprehension, Grammar, Vocabulary — 100 marks), Arithmetic & Test of Reasoning (100 marks), aur General Knowledge (50 marks). Qualification: Madhyamik (10th) pass. Age: 18-32 years. Salary Rs 22,700 basic pay se start hoti hai with DA, HRA, aur other allowances. Typing test bhi hota hai — English 30 wpm ya Bengali 20 wpm.',
  },
  {
    question: 'WB TET pass karne ke baad teacher ki naukri kaise milti hai?',
    answer:
      'WB TET (West Bengal Teacher Eligibility Test) pass karne ke baad Primary TET pass candidates ko primary school teacher ke liye aur Upper Primary TET pass candidates ko upper primary teacher ke liye apply kar sakte hain. TET qualify karna mandatory hai but selection merit list ke basis pe hota hai. Primary teacher salary Rs 25,500 basic pay se start hoti hai. WB SSC (School Service Commission) teacher recruitment ke liye separate exam bhi conduct karta hai.',
  },
  {
    question: 'What are the upcoming West Bengal government exams in 2026?',
    answer:
      'Upcoming West Bengal government exams in 2026 include: WBPSC WBCS Prelims & Mains, WBPSC Clerkship exam, WBPSC Judicial Service, WB Police Constable & SI recruitment, WB TET (Primary & Upper Primary), WBSSC Group D recruitment, WB Forest Guard, WB Health Department recruitment, WBPSC Miscellaneous Services, and various district-level vacancies. Check WBPSC official website wbpsc.gov.in regularly for notifications.',
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
        name: 'West Bengal Government Jobs',
        item: 'https://sarkarialert.online/west-bengal-government-jobs',
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
    data = await getJobs({ state: 'west_bengal', page: '1' });
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
      filterParams={{ state: 'west_bengal' }}
    />
  );
}

export default function WestBengalGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center shadow-lg shadow-green-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              West Bengal Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              পশ্চিমবঙ্গ সরকারি চাকরি 2026 — WBPSC, WB Police, WBSSC ভর্তি
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>West Bengal sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>WBPSC</strong> (WBCS, Clerkship, Judicial Service), <strong>WB Police</strong> (Constable, SI),{' '}
            <strong>WB TET</strong> (Primary & Upper Primary Teachers), and <strong>WBSSC</strong> (Group D, KPS) recruitment.
            West Bengal offers numerous government vacancies across education, police, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            এখানে পশ্চিমবঙ্গের সমস্ত সাম্প্রতিক সরকারি চাকরি দেখুন। WBPSC, WB Police, WB TET, WBSSC
            এবং অন্যান্য সমস্ত বিভাগের নিয়োগ বিজ্ঞপ্তি এক জায়গায়। WBPSC WBCS, WB Police SI, Clerkship ভর্তি আপডেট।
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
          Frequently Asked Questions — West Bengal Government Jobs
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
