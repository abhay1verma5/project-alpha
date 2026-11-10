import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kerala Government Jobs 2026-27 — കേരള സർക്കാർ ജോലി | SarkariAlert',
  description:
    'Kerala Government Jobs 2026-27: Latest Kerala sarkari naukri for Kerala PSC, KTET, Kerala Police & more. Apply online for Kerala state government vacancies with eligibility, salary & last date.',
  keywords: [
    'kerala government jobs 2026',
    'kerala sarkari naukri',
    'kerala psc vacancy 2026',
    'ktet teacher vacancy',
    'kerala police bharti 2026',
    'kerala psc thulasi',
    'kerala psc one time registration',
    'kerala psc exam calendar 2026',
    'kerala sarkari naukri 2026',
    'kerala state government jobs',
    'kerala psc ldc 2026',
    'kerala police constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/kerala-government-jobs',
  },
  openGraph: {
    title: 'Kerala Government Jobs 2026-27 — കേരള സർക്കാർ ജോലി',
    description:
      'Find Kerala sarkari naukri 2026-27. Kerala PSC, KTET, Kerala Police & more vacancies in Kerala.',
    url: 'https://sarkarialert.online/kerala-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Kerala?',
    answer:
      'The major recruitment body in Kerala is Kerala PSC (Kerala Public Service Commission) which handles almost all state government recruitments including Last Grade Servants (LGS), Lower Division Clerk (LDC), Village Field Assistant, Secretariat Assistant, Police Constable, Sub Inspector, Assistant Engineer, and other Group A/B/C/D posts. KTET (Kerala Teacher Eligibility Test) is for teacher recruitment. Kerala Police recruitment is also conducted through Kerala PSC.',
  },
  {
    question: 'Kerala PSC One Time Registration kya hai aur Thulasi portal kaise use karein?',
    answer:
      'Kerala PSC ka One Time Registration (OTR) Thulasi portal (thulasi.psc.kerala.gov.in) pe karna hota hai. Ek baar registration karne ke baad aap kisi bhi Kerala PSC notification ke liye apply kar sakte hain — baar baar naya registration karne ki zarurat nahi. OTR mein aapka profile, photo, signature, educational qualifications, aur other details save ho jati hain. Profile ID aur password se login karke kisi bhi vacancy ke liye one-click apply kar sakte hain.',
  },
  {
    question: 'How to prepare for Kerala PSC LDC exam?',
    answer:
      'Kerala PSC LDC (Lower Division Clerk) exam ek objective type test hai — 100 questions, 100 marks, 1 hour 15 minutes. Subjects: General Knowledge (Renaissance in Kerala, Indian History, Geography, Polity, Science), Current Affairs, General English, General Knowledge (including Kerala Renaissance movements), and Mental Ability. Kerala Renaissance aur Kerala GK pe special focus zaroori hai. SSLC (10th) pass hona chahiye. Salary Rs 26,500 basic pay se start hoti hai.',
  },
  {
    question: 'Kerala Police mein bharti ka process kya hai?',
    answer:
      'Kerala Police Constable/SI bharti Kerala PSC ke through hoti hai. Written Test (OMR based — 100 marks covering GK, Current Affairs, Maths, Science, Kerala GK), Physical Efficiency Test (100m sprint, high jump, long jump, shot put, 800m/1500m run), aur Physical Measurement Test hota hai. Constable ke liye 12th pass, SI ke liye Degree chahiye. Physical: Height — 168 cm (male), 157 cm (female). Kerala PSC Thulasi portal pe apply karein.',
  },
  {
    question: 'KTET pass karne ke baad teacher ki naukri kaise milti hai?',
    answer:
      'KTET (Kerala Teacher Eligibility Test) 4 categories mein hota hai: Category I (Lower Primary), Category II (Upper Primary), Category III (High School), Category IV (Arabic/Sanskrit/Hindi). KTET qualify karna mandatory hai teaching posts ke liye. KTET pass hone ke baad Kerala PSC ke through teaching vacancies ke liye apply kar sakte hain. Selection written exam + interview ke basis pe hota hai. Primary teacher salary Rs 35,700 basic pay se start hoti hai.',
  },
  {
    question: 'What are the upcoming Kerala government exams in 2026?',
    answer:
      'Upcoming Kerala government exams in 2026 include: Kerala PSC LDC (Lower Division Clerk), Kerala PSC LGS (Last Grade Servants), Kerala PSC Secretariat Assistant, Kerala Police Constable & SI, KTET (Category I, II, III, IV), Kerala PSC Assistant Engineer, Kerala PSC Village Field Assistant, Kerala PSC Degree Level Preliminary Exam, and various departmental exams. Check Kerala PSC Exam Calendar on keralapsc.gov.in for exact dates.',
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
        name: 'Kerala Government Jobs',
        item: 'https://sarkarialert.online/kerala-government-jobs',
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
    data = await getJobs({ state: 'kerala', page: '1' });
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
      filterParams={{ state: 'kerala' }}
    />
  );
}

export default function KeralaGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Kerala Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              കേരള സർക്കാർ ജോലി 2026 — Kerala PSC, KTET, Kerala Police
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Kerala sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>Kerala PSC</strong> (LDC, LGS, Secretariat Assistant, Assistant Engineer),{' '}
            <strong>KTET</strong> (Teacher Eligibility Test), and <strong>Kerala Police</strong> (Constable, SI) recruitment.
            Kerala PSC conducts hundreds of exams every year through the Thulasi portal for various government departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            ഇവിടെ കേരളത്തിലെ എല്ലാ ഏറ്റവും പുതിയ സർക്കാർ ജോലികൾ കാണുക. Kerala PSC, KTET, Kerala Police
            തുടങ്ങിയ എല്ലാ വകുപ്പുകളിലെയും നിയമന അറിയിപ്പുകൾ ഒരിടത്ത്. Kerala PSC LDC, LGS, Police Constable നിയമന അപ്‌ഡേറ്റ്.
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
          Frequently Asked Questions — Kerala Government Jobs
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
