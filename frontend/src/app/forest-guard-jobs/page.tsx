import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Trees } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Forest Guard/Ranger Bharti 2026-27 — Van Vibhag Vacancy | SarkariAlert',
  description:
    'Forest Guard Bharti 2026-27: Latest van vibhag vacancy for Forest Guard, Forest Ranger, Vanpal, Forest Officer posts. State forest department recruitment, UPSC Indian Forest Service, wildlife warden & more. Apply online with eligibility, salary & last date.',
  keywords: [
    'forest guard bharti 2026',
    'van vibhag vacancy 2026',
    'forest ranger recruitment 2026',
    'vanpal bharti',
    'forest department jobs',
    'forest guard vacancy',
    'van rakshak bharti',
    'forest officer recruitment',
    'wildlife warden vacancy',
    'indian forest service 2026',
    'state forest department jobs',
    'forest guard physical test',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/forest-guard-jobs',
  },
  openGraph: {
    title: 'Forest Guard/Ranger Bharti 2026-27 — Van Vibhag Vacancy',
    description:
      'Find forest department sarkari naukri 2026-27. Forest Guard, Ranger, Vanpal, Forest Officer vacancies across all state forest departments.',
    url: 'https://sarkarialert.online/forest-guard-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for Forest Guard jobs?',
    answer:
      'For Forest Guard posts, the minimum qualification is 10th pass (Matriculation) or 12th pass depending on the state. Age limit is generally 18-25 years (with relaxation for OBC/SC/ST). Physical standards: Height - 163cm (Male), 150cm (Female) for general category. Chest - 79cm (unexpanded), 84cm (expanded) for males. Candidates must be physically fit and able to walk long distances in forest terrain.',
  },
  {
    question: 'Forest Guard ki salary kitni hoti hai?',
    answer:
      'Forest Guard ko Pay Level 2-3 (Rs 19,900 - Rs 63,200 basic pay) milta hai. Allowances (DA, HRA, uniform, ration, risk allowance) ke saath gross salary Rs 25,000-35,000 per month hoti hai. Forest Ranger ko Pay Level 6-7 (Rs 35,400 - Rs 1,12,400) milta hai jo allowances ke saath Rs 50,000-65,000 tak hoti hai. Senior posts jaise Deputy Forest Officer, ACF ko aur zyada salary milti hai.',
  },
  {
    question: 'What is the physical test for Forest Guard recruitment?',
    answer:
      'Forest Guard physical test includes: Running - 25 km walk in 4 hours (male), 14 km walk in 4 hours (female) in some states, or 1600m run in 6 minutes (male), 800m run in 4 minutes (female). Height measurement. Chest measurement (for males). Long jump and high jump in some states. Cycling test in some forest departments. Physical standards vary by state.',
  },
  {
    question: 'How to become a Forest Ranger or Forest Officer?',
    answer:
      'To become a Forest Ranger, appear for State Forest Service exams conducted by State PSCs (like UPPSC, MPPSC, RPSC). For Indian Forest Service (IFS), clear UPSC Civil Services exam and opt for IFS. For Deputy Ranger/Forester, apply through state forest department exams. Qualification for Ranger is graduation (B.Sc. preferred), for IFS it is graduation with a science subject or engineering degree.',
  },
  {
    question: 'Which states have the most Forest Guard vacancies?',
    answer:
      'States with frequent Forest Guard/Ranger vacancies include: Rajasthan (RSMSSB Forest Guard), Madhya Pradesh (MP Vanrakshak), Chhattisgarh (CG Van Vibhag), Maharashtra (Forest Department), Uttarakhand (UKSSSC Forest Guard), Karnataka (KFD), Tamil Nadu (TNFUSRC), Gujarat, Jharkhand, and Odisha. Central organizations like Project Tiger, Wildlife Institute of India, and National Parks also recruit regularly.',
  },
  {
    question: 'Forest Guard bharti mein kya documents chahiye?',
    answer:
      'Forest Guard bharti ke liye zaruri documents: 10th/12th marksheet aur certificate, Aadhar Card, caste certificate (OBC/SC/ST ke liye), domicile/residence certificate, character certificate, medical fitness certificate, passport size photo, driving license (kuch states mein), sports certificate (agar hai to extra marks ke liye). Kuch states mein NCC certificate aur computer certificate ko preference milti hai.',
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
        name: 'Forest Guard Jobs',
        item: 'https://sarkarialert.online/forest-guard-jobs',
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
    data = await getJobs({ category: 'other', page: '1' });
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
      filterParams={{ category: 'other' }}
    />
  );
}

export default function ForestGuardJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center shadow-lg shadow-green-600/20">
            <Trees className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Forest Guard/Ranger Bharti 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              वन विभाग भर्ती 2026 — फॉरेस्ट गार्ड, रेंजर, वनपाल
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>forest guard bharti 2026</strong> and van vibhag vacancy across all states.
            Candidates with <strong>10th</strong>, <strong>12th</strong>, or <strong>graduation</strong> can apply for posts like{' '}
            <strong>Forest Guard</strong>, <strong>Van Rakshak</strong>, <strong>Vanpal</strong>,{' '}
            <strong>Forest Ranger</strong>, <strong>Deputy Ranger</strong>, and <strong>Forest Officer</strong> in{' '}
            state forest departments and central wildlife organizations.
            These jobs offer pay scale of Rs 19,900 - 35,400+ (Level 2-6) with government benefits like
            pension, medical, uniform allowance, risk allowance, and housing in forest areas.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां वन विभाग की सभी नवीनतम भर्तियां देखें। फॉरेस्ट गार्ड, वनपाल, वन रक्षक, रेंजर
            और वन अधिकारी की सभी राज्यों की भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Forest Guard/Ranger Jobs
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
