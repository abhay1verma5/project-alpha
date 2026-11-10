import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Building2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Panchayat Jobs 2026-27 — Gram Panchayat Sachiv, Rozgar Sahayak Bharti | SarkariAlert',
  description:
    'Panchayat jobs 2026-27: Latest Gram Panchayat Sachiv, Rozgar Sahayak, Panchayat Secretary & block level vacancies. State-wise panchayat recruitment for graduate candidates. Apply online with eligibility, salary & last date.',
  keywords: [
    'panchayat sachiv bharti 2026',
    'gram panchayat vacancy',
    'rozgar sahayak recruitment',
    'panchayat secretary',
    'block level jobs',
    'gram panchayat sachiv salary',
    'panchayat sevak bharti',
    'gram rozgar sahayak vacancy',
    'panchayat bharti 2026',
    'village level worker recruitment',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/panchayat-jobs',
  },
  openGraph: {
    title: 'Panchayat Jobs 2026-27 — Gram Panchayat Sachiv, Rozgar Sahayak Bharti',
    description:
      'Find latest panchayat bharti 2026-27. Gram Panchayat Sachiv, Rozgar Sahayak, Panchayat Secretary & block level vacancies across all states.',
    url: 'https://sarkarialert.online/panchayat-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the role of Gram Panchayat Sachiv (Panchayat Secretary)?',
    answer:
      'Gram Panchayat Sachiv is the administrative head of the Gram Panchayat. Key responsibilities include maintaining birth/death records, issuing certificates (caste, income, domicile), managing MGNREGA records, handling panchayat finances, preparing meeting minutes, implementing government schemes at village level, and coordinating with Block Development Office (BDO).',
  },
  {
    question: 'Panchayat Sachiv ki salary kitni hoti hai aur kya ye permanent job hai?',
    answer:
      'Panchayat Sachiv ki salary state ke hisab se Rs 20,000 se Rs 35,000 per month hoti hai. Bihar mein Rs 22,000-25,000, UP mein Rs 20,000-30,000, aur Haryana mein Rs 25,000-35,000 tak milti hai. Kuch states mein ye contractual hoti hai aur kuch mein permanent. Rozgar Sahayak ko Rs 8,000-15,000 monthly milta hai.',
  },
  {
    question: 'What is the eligibility for Panchayat Sachiv and Rozgar Sahayak?',
    answer:
      'For Panchayat Sachiv, candidates need graduation (BA/B.Sc/B.Com) from a recognized university with basic computer knowledge (CCC/NIELIT certificate). Age limit is 21-40 years. For Rozgar Sahayak, 10+2 or graduation is required with computer knowledge. Local domicile of the concerned district/block is generally mandatory.',
  },
  {
    question: 'What is the selection process for panchayat-level jobs?',
    answer:
      'Selection process for Panchayat Sachiv typically includes a written exam (General Knowledge, Hindi, Math, Computer, Panchayati Raj knowledge) followed by document verification and merit list. For Rozgar Sahayak, selection is usually based on merit of educational marks or a simple written test. Interview may be conducted in some states.',
  },
  {
    question: 'What are the duties of Rozgar Sahayak in Gram Panchayat?',
    answer:
      'Rozgar Sahayak (Employment Assistant) works under MGNREGA at the Gram Panchayat level. Duties include maintaining job card records, recording attendance of MGNREGA workers, preparing muster rolls, data entry on NREGASoft portal, coordinating with Gram Rozgar Sevak, and ensuring timely wage payments to workers.',
  },
  {
    question: 'Which states have the most panchayat vacancies in 2026?',
    answer:
      'Major panchayat vacancies in 2026 are expected from Bihar (Panchayat Sachiv for 8,000+ panchayats), Uttar Pradesh (Gram Panchayat Adhikari/Sachiv), Rajasthan (Gram Sevak), Madhya Pradesh (Panchayat Secretary), Jharkhand, and West Bengal. Each state conducts its own recruitment through BPSC, UPPSC, RPSC or respective Panchayati Raj departments.',
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
        name: 'Panchayat Jobs',
        item: 'https://sarkarialert.online/panchayat-jobs',
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

export default function PanchayatJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Panchayat Jobs 2026 — Gram Panchayat Sachiv, Rozgar Sahayak Bharti
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              पंचायत भर्ती 2026 — ग्राम पंचायत सचिव, रोजगार सहायक
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>panchayat bharti 2026</strong> across all states of India.
            Vacancies available for <strong>Gram Panchayat Sachiv (Secretary)</strong>, <strong>Rozgar Sahayak</strong>,{' '}
            <strong>Gram Sevak</strong>, <strong>Panchayat Sevak</strong>, and other block-level positions.
            Graduation with <strong>computer knowledge (CCC certificate)</strong> is typically required for Sachiv posts.
            Salary ranges from Rs 8,000 to Rs 35,000 depending on the post and state.
            These are village and block-level administrative positions with growth opportunities.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां सभी राज्यों की पंचायत भर्ती 2026 देखें। ग्राम पंचायत सचिव, रोजगार सहायक, ग्राम सेवक, पंचायत सेवक और
            ब्लॉक स्तर के पदों पर भर्ती। ग्रेजुएशन और कंप्यूटर ज्ञान के साथ आवेदन करें।
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
          Frequently Asked Questions — Panchayat Jobs
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
