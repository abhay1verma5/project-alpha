import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Medal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ex-Servicemen Government Jobs 2026-27 — ESM Reservation Vacancy | SarkariAlert',
  description:
    'Ex-servicemen government jobs 2026-27: Latest ESM reservation vacancies in central & state government. Retired army, navy, air force jobs with 10% reservation in Group C, 20% in Group D. Age relaxation, re-employment benefits & apply online.',
  keywords: [
    'ex servicemen jobs 2026',
    'ESM reservation government',
    'retired army jobs',
    'ex army vacancy',
    'CSD canteen jobs',
    'ECHS jobs',
    'ex servicemen sarkari naukri',
    'defence retired vacancy',
    'ESM age relaxation',
    'military re-employment',
    'ex servicemen quota',
    'armed forces retired jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/ex-servicemen-jobs',
  },
  openGraph: {
    title: 'Ex-Servicemen Government Jobs 2026-27 — ESM Reservation Vacancy',
    description:
      'Find latest ex-servicemen sarkari naukri 2026-27. ESM reservation in central & state government with age relaxation and re-employment benefits.',
    url: 'https://sarkarialert.online/ex-servicemen-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the reservation percentage for Ex-Servicemen in government jobs?',
    answer:
      'Ex-Servicemen (ESM) get reservation in central government jobs: 10% in Group C (clerical, technical) posts and 20% in Group D (multi-tasking staff) posts. In Group A and B posts, there is no fixed reservation but ESM get age relaxation and preference. Additionally, many state governments provide 2-5% reservation for ESM in state government jobs. The reservation is applicable to all ex-servicemen who have served in Army, Navy, or Air Force and have been released/retired/discharged.',
  },
  {
    question: 'Ex-servicemen ko government jobs mein kitni age relaxation milti hai?',
    answer:
      'Ex-servicemen ko government jobs mein actual military service ki duration + 3 saal ki age relaxation milti hai. For example, agar kisi ne 15 saal army mein serve kiya, toh unhe 15+3 = 18 saal ki age relaxation milegi. Iska matlab agar post ki upper age limit 27 saal hai, toh ESM 45 saal tak apply kar sakte hain. SSC, Railway, Banking, aur UPSC — sabhi mein yeh relaxation applicable hai. SC/ST/OBC ESM ko additional category relaxation bhi milti hai.',
  },
  {
    question: 'Which government posts are available for Ex-Servicemen?',
    answer:
      'Ex-Servicemen can apply for various government posts including: SSC — CGL, CHSL, MTS, GD Constable, SI. Railway — Group D, NTPC, RPF, Technician. Banking — Clerk, PO (with age relaxation). CAPF — CRPF, BSF, CISF, ITBP, SSB. State Police — Constable, Head Constable, SI. Postal — Postman, MTS, Mail Guard. Defence Civilian — LDC, UDC, MTS, Store Keeper. ECHS — Medical staff, administrative posts. CSD (Canteen Stores Department) — Canteen Manager, LDC. Many PSUs also have ESM quota.',
  },
  {
    question: 'How to get Ex-Servicemen certificate for government jobs?',
    answer:
      'Ex-Servicemen certificate (Discharge Certificate/Service Certificate) is issued by the respective service headquarters at the time of release/retirement. For government job applications, you need: (1) Discharge Book/Certificate from Record Office, (2) PPO (Pension Payment Order) if applicable, (3) Service & Release Certificate, (4) Character Certificate from last unit. If certificate is lost, apply to respective Record Office — Army: Pune, Navy: Mumbai, Air Force: New Delhi. Also register on DGR (Directorate General Resettlement) portal at dgrindia.com for re-employment assistance.',
  },
  {
    question: 'What are the re-employment benefits for Ex-Servicemen?',
    answer:
      'Ex-Servicemen re-employment benefits include: (1) Reservation — 10% in Group C, 20% in Group D central government posts. (2) Age relaxation — Military service period + 3 years. (3) DGR Sponsorship — DGR sponsors ESM for Group A/B level posts in PSUs and private sector. (4) Self-employment schemes — MUDRA loans, PMEGP with priority. (5) Security agency license — preference in security guard/agency setup. (6) Pension protection — pension continues even after re-employment (subject to rules). (7) CSD canteen facility — retained after re-employment. (8) Ex-gratia benefits and education concession for children.',
  },
  {
    question: 'Can family members of Ex-Servicemen avail ESM reservation?',
    answer:
      'ESM reservation is primarily for ex-servicemen themselves. However, some benefits extend to dependents: (1) Widows/Wards of deceased/disabled servicemen can avail compassionate appointment in the same organization. (2) Some state governments provide reservation for wards of ESM (2-5%). (3) Defence quota seats in educational institutions for children. (4) ESM contributory health scheme (ECHS) covers family members. (5) In some CAPF/Police recruitments, wards of ESM/serving personnel get bonus marks. The dependent must produce a relationship certificate from Zila Sainik Board.',
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
        name: 'Ex-Servicemen Jobs',
        item: 'https://sarkarialert.online/ex-servicemen-jobs',
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
    data = await getJobs({ qualification: 'graduation', page: '1' });
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
      filterParams={{ qualification: 'graduation' }}
    />
  );
}

export default function ExServicemenJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Medal className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Ex-Servicemen Government Jobs 2026 — ESM Reservation Vacancy
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              भूतपूर्व सैनिक सरकारी नौकरी 2026 — ESM आरक्षण
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>ex-servicemen government jobs 2026</strong> with ESM reservation across central and state government departments.
            Retired <strong>Army</strong>, <strong>Navy</strong>, and <strong>Air Force</strong> personnel get{' '}
            <strong>10% reservation in Group C</strong> and <strong>20% in Group D</strong> posts.
            Apply for posts in <strong>SSC</strong>, <strong>Railway</strong>, <strong>Banking</strong>, <strong>CAPF</strong>,{' '}
            <strong>CSD</strong>, <strong>ECHS</strong>, and defence civilian establishments with age relaxation of military service + 3 years.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां भूतपूर्व सैनिकों (ESM) के लिए सभी नवीनतम सरकारी नौकरियां देखें। सेना, नौसेना और वायु सेना के रिटायर्ड
            जवानों के लिए 10-20% आरक्षण, आयु छूट और पुनर्रोजगार सुविधाएं — SSC, रेलवे, बैंकिंग, CAPF भर्ती एक जगह।
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
          Frequently Asked Questions — Ex-Servicemen Government Jobs
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
