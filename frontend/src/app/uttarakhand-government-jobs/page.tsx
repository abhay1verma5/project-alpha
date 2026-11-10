import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Uttarakhand Government Jobs 2026-27 — उत्तराखंड सरकारी नौकरी | SarkariAlert',
  description:
    'Uttarakhand Government Jobs 2026-27: Latest Uttarakhand sarkari naukri for UKPSC, UKSSSC, Uttarakhand Police & more. Apply online for Uttarakhand state government vacancies with eligibility, salary & last date.',
  keywords: [
    'uttarakhand government jobs 2026',
    'uttarakhand sarkari naukri',
    'ukpsc vacancy 2026',
    'uksssc bharti 2026',
    'uttarakhand police vacancy',
    'ukpsc pcs exam',
    'uksssc recruitment 2026',
    'uttarakhand forest guard bharti',
    'uttarakhand sarkari naukri 2026',
    'uttarakhand state government jobs',
    'ukpsc civil services 2026',
    'uttarakhand police constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/uttarakhand-government-jobs',
  },
  openGraph: {
    title: 'Uttarakhand Government Jobs 2026-27 — उत्तराखंड सरकारी नौकरी',
    description:
      'Find Uttarakhand sarkari naukri 2026-27. UKPSC, UKSSSC, Uttarakhand Police & more vacancies in Uttarakhand.',
    url: 'https://sarkarialert.online/uttarakhand-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Uttarakhand?',
    answer:
      'The major recruitment bodies in Uttarakhand are: UKPSC (Uttarakhand Public Service Commission) for PCS (Provincial Civil Service), RO/ARO, Assistant Prosecution Officer, and other Group A/B posts. UKSSSC (Uttarakhand Subordinate Service Selection Commission) for VDO, Patwari, Forest Guard, Junior Assistant, and other Group C posts. Uttarakhand Police for Constable, SI, and other police positions. UBSE and UTTBSE for teacher recruitment exams.',
  },
  {
    question: 'UKPSC PCS exam ka pattern kya hai?',
    answer:
      'UKPSC PCS exam teen stages mein hoti hai: Prelims (2 papers — General Studies I aur General Studies II/CSAT, objective type, 150-100 marks), Mains (7 descriptive papers including Hindi, English, Essay, 3 GS papers, aur 1 optional subject), aur Interview. UKPSC PCS se SDM, DSP, BDO, Naib Tehsildar jaise posts milte hain. Uttarakhand ka state-specific GK — geography, history, culture, aur current affairs bahut important hai.',
  },
  {
    question: 'UKSSSC se kaunsi government jobs milti hain?',
    answer:
      'UKSSSC (Uttarakhand Subordinate Service Selection Commission) se bahut saari Group C posts milti hain: VDO (Village Development Officer), Patwari/Lekhpal, Forest Guard, Junior Assistant, Stenographer, Lab Assistant, Livestock Extension Officer, Excise Constable, aur other posts. UKSSSC exams generally objective type hote hain. Qualification posts ke hisaab se 10th/12th/Graduation hoti hai. UKSSSC ki official website sssc.uk.gov.in pe notifications check karein.',
  },
  {
    question: 'Uttarakhand Forest Guard ki bharti kaise hoti hai?',
    answer:
      'Uttarakhand Forest Guard ki bharti UKSSSC ke through hoti hai. Written Exam (objective type — General Knowledge, Maths, Reasoning, Hindi, Uttarakhand GK), Physical Standard Test (Height — 163 cm male, 150 cm female), Physical Efficiency Test (25 km walk in 4 hours for male, 14 km walk in 4 hours for female), aur Document Verification hota hai. Qualification: 12th pass. Salary Rs 21,700 basic pay se start hoti hai. Forest Department mein promotion ke acche chances hote hain.',
  },
  {
    question: 'Uttarakhand Police bharti mein kya hota hai?',
    answer:
      'Uttarakhand Police Constable bharti mein Written Exam (100 marks — GK, Hindi, Uttarakhand GK, Maths, Reasoning), Physical Standard Test (Height — 167 cm male, 152 cm female for general), Physical Efficiency Test (running — 1600m in 6.30 min for males, 800m in 3.30 min for females), aur Document Verification hota hai. 12th pass hona zaroori hai. Salary Rs 21,700 basic pay se start hoti hai. Uttarakhand GK pe focus karein — state ki geography, culture, festivals important hain.',
  },
  {
    question: 'What are the upcoming Uttarakhand government exams in 2026?',
    answer:
      'Upcoming Uttarakhand government exams in 2026 include: UKPSC PCS Prelims & Mains, UKPSC RO/ARO exam, UKSSSC VDO & Patwari recruitment, UKSSSC Forest Guard, Uttarakhand Police Constable & SI bharti, UKPSC Assistant Prosecution Officer, Uttarakhand Teacher recruitment (LT/TGT/PGT), UKSSSC Junior Assistant, Uttarakhand Forest Department recruitment, and various departmental exams. Check UKPSC (ukpsc.gov.in) and UKSSSC (sssc.uk.gov.in) regularly.',
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
        name: 'Uttarakhand Government Jobs',
        item: 'https://sarkarialert.online/uttarakhand-government-jobs',
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
    data = await getJobs({ state: 'uttarakhand', page: '1' });
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
      filterParams={{ state: 'uttarakhand' }}
    />
  );
}

export default function UttarakhandGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Uttarakhand Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              उत्तराखंड सरकारी नौकरी 2026 — UKPSC, UKSSSC, Uttarakhand Police भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Uttarakhand sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>UKPSC</strong> (PCS, RO/ARO, APO), <strong>UKSSSC</strong> (VDO, Patwari, Forest Guard, Junior Assistant),{' '}
            <strong>Uttarakhand Police</strong> (Constable, SI), and teacher recruitment posts.
            Uttarakhand offers unique government opportunities especially in forest, tourism, and hill development departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां उत्तराखंड की सभी नवीनतम सरकारी नौकरियां देखें। UKPSC, UKSSSC, Uttarakhand Police
            और अन्य सभी विभागों की भर्ती अधिसूचनाएं एक जगह। UKPSC PCS, UKSSSC Forest Guard, Uttarakhand Police भर्ती अपडेट।
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
          Frequently Asked Questions — Uttarakhand Government Jobs
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
