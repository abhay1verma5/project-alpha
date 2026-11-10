import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'UP Government Jobs 2026-27 — उत्तर प्रदेश सरकारी नौकरी | SarkariAlert',
  description:
    'UP Government Jobs 2026-27: Latest Uttar Pradesh sarkari naukri for UPPSC, UPSSSC, UP Police, UP TGT/PGT, Lekhpal, RO/ARO & more. Apply online for UP state government vacancies with eligibility, salary & last date.',
  keywords: [
    'up government jobs 2026',
    'uttar pradesh sarkari naukri',
    'uppsc vacancy 2026',
    'upsssc bharti 2026',
    'up police vacancy',
    'up tgt pgt vacancy',
    'up lekhpal bharti',
    'up ro aro vacancy',
    'up sarkari naukri',
    'up state government jobs',
    'uppsc pcs 2026',
    'up constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/up-government-jobs',
  },
  openGraph: {
    title: 'UP Government Jobs 2026-27 — उत्तर प्रदेश सरकारी नौकरी',
    description:
      'Find UP sarkari naukri 2026-27. UPPSC, UPSSSC, UP Police, UP TGT/PGT, Lekhpal & more vacancies in Uttar Pradesh.',
    url: 'https://sarkarialert.online/up-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Uttar Pradesh?',
    answer:
      'The major recruitment bodies in UP are: UPPSC (Uttar Pradesh Public Service Commission) for PCS, RO/ARO, APO, and other Group A/B posts. UPSSSC (UP Subordinate Services Selection Commission) for Lekhpal, Junior Assistant, VDO, Forest Guard, and other Group C posts. UP Police Recruitment Board (UPPRPB) for Constable, SI, and other police posts. UP Basic Education Board for primary teachers, and UP Secondary Education Board for TGT/PGT posts.',
  },
  {
    question: 'UPPSC PCS exam ka pattern kya hai?',
    answer:
      'UPPSC PCS exam teen charan mein hota hai: Prelims (2 papers — GS aur CSAT, objective type, 200-200 marks), Mains (8 papers including Hindi, Essay, 4 GS papers, 2 optional papers — descriptive type), aur Interview (personality test). Prelims qualify karne ke baad hi Mains de sakte hain. Final merit Mains + Interview marks se banti hai. PCS se SDM, DSP, BDO, Naib Tehsildar jaise posts milte hain.',
  },
  {
    question: 'How to prepare for UP Police Constable exam?',
    answer:
      'UP Police Constable exam preparation: Written exam covers General Knowledge, Hindi, Numerical Ability, and Reasoning (300 marks, 2 hours). After written exam, there is Physical Standard Test (height/chest), Physical Efficiency Test (running — 4.8 km in 25 min for males, 2.4 km in 14 min for females), and Document Verification. Focus on UP GK, current affairs, basic math, and Hindi grammar. Previous year papers are very helpful.',
  },
  {
    question: 'What is UPSSSC PET and who needs to qualify it?',
    answer:
      'UPSSSC PET (Preliminary Eligibility Test) is a mandatory qualifying exam for all Group C posts under UPSSSC. Candidates must first clear PET, and then they can apply for specific UPSSSC recruitments like Lekhpal, Junior Assistant, VDO, etc. PET is valid for 1 year. It tests General Hindi, Mathematics, Reasoning, General Science, Indian History, Geography, Current Affairs, and Computer Knowledge.',
  },
  {
    question: 'UP mein Lekhpal ki salary kitni hai?',
    answer:
      'UP Lekhpal ko Pay Level 5 (Rs 29,200 - Rs 92,300 basic pay) milti hai. DA, HRA, aur other allowances ke saath gross salary lagbhag Rs 35,000 - 45,000 per month hoti hai. Lekhpal ka kaam land records maintain karna, patwari work, aur revenue collection mein sahayata karna hai. Yeh post UPSSSC ke through bharti hoti hai jiske liye PET qualify karna zaroori hai.',
  },
  {
    question: 'What are the upcoming UP government exams in 2026?',
    answer:
      'Upcoming UP government exams in 2026 include: UPPSC PCS Prelims & Mains, UPSSSC PET, UP Police Constable & SI recruitment, UP TGT/PGT teacher recruitment, UPSSSC Lekhpal, UP RO/ARO (Review Officer), UPPSC APO (Assistant Prosecution Officer), UP Junior Engineer, UP Forest Guard, and various district-level posts. Check UPPSC and UPSSSC official websites regularly for latest notifications.',
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
        name: 'UP Government Jobs',
        item: 'https://sarkarialert.online/up-government-jobs',
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
    data = await getJobs({ state: 'uttar_pradesh', page: '1' });
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
      filterParams={{ state: 'uttar_pradesh' }}
    />
  );
}

export default function UPGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              UP Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              उत्तर प्रदेश सरकारी नौकरी 2026 — UPPSC, UPSSSC, UP Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Uttar Pradesh sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>UPPSC</strong> (PCS, RO/ARO, APO), <strong>UPSSSC</strong> (Lekhpal, Junior Assistant, VDO),{' '}
            <strong>UP Police</strong> (Constable, SI), <strong>UP TGT/PGT</strong> teacher recruitment,
            and <strong>UP Lekhpal</strong> posts. Uttar Pradesh is India&apos;s largest state by population with
            thousands of government vacancies every year across education, police, revenue, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां उत्तर प्रदेश की सभी नवीनतम सरकारी नौकरियां देखें। UPPSC, UPSSSC, UP Police, UP TGT/PGT,
            लेखपाल और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। UP PCS, UP SI, UP Constable भर्ती अपडेट।
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
          Frequently Asked Questions — UP Government Jobs
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
