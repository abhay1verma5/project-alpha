import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Accessibility } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Divyang/PwBD Government Jobs 2026-27 — 4% Reservation Vacancies | SarkariAlert',
  description:
    'Divyang sarkari naukri 2026-27: Latest PwBD government jobs with 4% reservation under RPWD Act 2016. Handicapped vacancy in SSC, Railway, Banking, UPSC & state government. Age relaxation, disability certificate, eligible categories & apply online.',
  keywords: [
    'divyang sarkari naukri',
    'PwBD government jobs',
    'handicapped vacancy 2026',
    'disabled persons quota',
    'divyang reservation',
    'RPWD Act jobs',
    'divyang vacancy 2026',
    'PwBD reservation 4 percent',
    'disability certificate government job',
    'handicapped sarkari naukri',
    'PwBD age relaxation',
    'benchmark disability jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/divyang-jobs',
  },
  openGraph: {
    title: 'Divyang/PwBD Government Jobs 2026-27 — 4% Reservation Vacancies',
    description:
      'Find latest divyang/PwBD sarkari naukri 2026-27 with 4% reservation. SSC, Railway, Banking, UPSC vacancies for persons with disabilities.',
    url: 'https://sarkarialert.online/divyang-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the reservation percentage for PwBD/Divyang in government jobs?',
    answer:
      'Under the Rights of Persons with Disabilities (RPWD) Act 2016, 4% reservation is provided for Persons with Benchmark Disabilities (PwBD) in government jobs. This 4% is divided among different disability categories: 1% for blindness/low vision, 1% for deaf/hard of hearing, 1% for locomotor disability (including cerebral palsy, leprosy cured, dwarfism, acid attack victims, muscular dystrophy), and 1% for autism, intellectual disability, specific learning disability, and mental illness. This reservation applies to all Group A, B, C, and D posts in central and state government.',
  },
  {
    question: 'Divyang sarkari naukri ke liye disability certificate kaise banaye?',
    answer:
      'Disability certificate banwane ke liye aapko apne district ke government hospital ya medical board mein jaana hoga. Required documents: Aadhaar card, passport photo, medical reports, aur prescriptions. Medical board (2-3 doctors ki team) aapki disability assess karegi aur certificate issue karegi jismein disability percentage likhi hogi. 40% ya usse zyada disability percentage wale candidates ko "benchmark disability" maana jaata hai aur unhe reservation ka fayda milta hai. Certificate banwane mein 1-2 weeks lagte hain. UDID (Unique Disability ID) card bhi banwa lein — swavlambancard.gov.in par online apply kar sakte hain.',
  },
  {
    question: 'What is the age relaxation for PwBD candidates in government exams?',
    answer:
      'PwBD candidates get 10 years age relaxation over and above the upper age limit in central government jobs. This is one of the highest age relaxations available. For example, if the upper age limit for General category is 30 years, PwBD-General can apply up to 40 years. PwBD-OBC gets 13 years relaxation (10 + 3), PwBD-SC/ST gets 15 years relaxation (10 + 5). This relaxation applies to SSC, UPSC, Railway, Banking, and all central government recruitments.',
  },
  {
    question: 'Which disability categories are eligible for government job reservation?',
    answer:
      'The RPWD Act 2016 recognizes 21 disability categories: (1) Blindness, (2) Low Vision, (3) Leprosy Cured, (4) Hearing Impairment, (5) Locomotor Disability, (6) Dwarfism, (7) Intellectual Disability, (8) Mental Illness, (9) Autism Spectrum Disorder, (10) Cerebral Palsy, (11) Muscular Dystrophy, (12) Chronic Neurological Conditions, (13) Specific Learning Disabilities, (14) Multiple Sclerosis, (15) Speech & Language Disability, (16) Thalassemia, (17) Hemophilia, (18) Sickle Cell Disease, (19) Multiple Disabilities, (20) Acid Attack Victims, (21) Parkinson\'s Disease. Candidates must have 40% or more benchmark disability to avail reservation.',
  },
  {
    question: 'Which government departments have maximum PwBD/Divyang posts?',
    answer:
      'Departments with significant PwBD recruitment include: SSC (Staff Selection Commission) — recruits for CGL, CHSL, MTS, JE with PwBD vacancies in all posts. Indian Railways — has dedicated PwBD quota in Group C and D posts (Clerk, Technician, Track Maintainer). Banking Sector — SBI, IBPS, RBI reserve 4% posts. Postal Department — Postman, MTS, PA/SA posts. Income Tax Department — Tax Assistant, Inspector posts. Defence Civilian posts — LDC, MTS, Store Keeper. State government departments also reserve 4% in their respective recruitments.',
  },
  {
    question: 'Can PwBD candidates get scribe/extra time in government exams?',
    answer:
      'Yes, PwBD candidates with 40% or more benchmark disability are entitled to: (1) Scribe/Reader/Lab Assistant — for candidates with visual impairment, locomotor disability affecting writing, or cerebral palsy. The scribe should be from a qualification lower than the candidate. (2) Compensatory time — 20 minutes per hour of exam (e.g., 40 minutes extra for a 2-hour exam). (3) Accessible seating — ground floor exam center with wheelchair access. These facilities must be requested while filling the application form. Candidates need to submit disability certificate as proof.',
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
        name: 'Divyang Jobs',
        item: 'https://sarkarialert.online/divyang-jobs',
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

export default function DivyangJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Accessibility className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Divyang/PwBD Government Jobs 2026 — 4% Reservation Vacancies
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              दिव्यांग सरकारी नौकरी 2026 — 4% आरक्षण वैकेंसी
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>divyang/PwBD sarkari naukri 2026</strong> with <strong>4% reservation</strong> under the{' '}
            <strong>RPWD Act 2016</strong>. Persons with Benchmark Disabilities (40% or more) can apply for reserved posts in{' '}
            <strong>SSC</strong>, <strong>Railway</strong>, <strong>Banking</strong>, <strong>UPSC</strong>, and state government departments.
            PwBD candidates get <strong>10 years age relaxation</strong>, scribe facility, and compensatory time in exams.
            All 21 disability categories recognized under RPWD Act are eligible for reservation benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां दिव्यांग/PwBD उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। RPWD Act 2016 के तहत 4% आरक्षण,
            10 वर्ष आयु छूट, स्क्राइब सुविधा और अतिरिक्त समय — SSC, रेलवे, बैंकिंग और UPSC की वैकेंसी एक जगह।
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
          Frequently Asked Questions — Divyang/PwBD Government Jobs
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
