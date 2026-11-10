import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Stethoscope } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Medical Government Jobs 2026-27 — MBBS, BDS, AYUSH Doctor Sarkari Naukri | SarkariAlert',
  description:
    'Medical government jobs 2026-27: Browse latest sarkari naukri for MBBS, BDS, AYUSH, BAMS, BHMS doctors. AIIMS, ESIC, Army Medical Corps, CHS, state health services vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'medical government jobs 2026',
    'doctor sarkari naukri 2026',
    'mbbs government jobs',
    'aiims doctor recruitment 2026',
    'esic medical officer vacancy',
    'army medical corps recruitment',
    'chs doctor vacancy',
    'state medical officer jobs',
    'bds government jobs',
    'ayush doctor sarkari naukri',
    'govt doctor salary india',
    'medical officer bharti 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/medical-jobs',
  },
  openGraph: {
    title: 'Medical Government Jobs 2026-27 — Latest MBBS, BDS, AYUSH Doctor Sarkari Naukri',
    description:
      'Find medical sarkari naukri 2026-27. AIIMS, ESIC, Army Medical Corps, CHS & state health services vacancies for MBBS, BDS, AYUSH doctors.',
    url: 'https://sarkarialert.online/medical-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for MBBS doctors?',
    answer:
      'MBBS doctors can apply for AIIMS Senior/Junior Resident, ESIC Medical Officer (Allopathy), Army Medical Corps (Short Service Commission), Central Health Service (CHS) Medical Officer through UPSC, State Health Services Medical Officer, Railway Medical Officer, Municipal Corporation Medical Officer, and CGHS Medical Officer posts.',
  },
  {
    question: 'Govt doctor ki salary kitni hoti hai India mein?',
    answer:
      'Government doctor ki salary Pay Level 10 (Rs 56,100 - Rs 1,77,500 basic pay) se shuru hoti hai. AIIMS Junior Resident ko lagbhag Rs 70,000-80,000 monthly milta hai. CHS Medical Officer ko Rs 80,000-1,00,000+ milta hai allowances ke saath. Senior positions jaise Professor/HOD ko Rs 1,50,000-2,00,000+ milta hai. NPA (Non-Practicing Allowance) bhi milta hai.',
  },
  {
    question: 'How to join Army Medical Corps as a doctor?',
    answer:
      'To join Army Medical Corps, MBBS doctors can apply through Short Service Commission (SSC) entry. AMC conducts recruitment through notification on joinindianarmy.nic.in. Selection involves interview and medical examination. Candidates must be MBBS with internship completed. Age limit is generally 45 years. Officers get military rank, pay, and benefits.',
  },
  {
    question: 'What is the UPSC CHS (Central Health Service) exam?',
    answer:
      'UPSC CHS exam is conducted for recruitment of Medical Officers in Central Health Service. It includes a computer-based test covering General Medicine, Pediatrics, Surgery, Obstetrics & Gynaecology, and Preventive & Social Medicine. Candidates need MBBS with 1 year internship. CHS offers Pay Level 10 with NPA, government accommodation, and career progression to Director level.',
  },
  {
    question: 'Can AYUSH doctors apply for government medical jobs?',
    answer:
      'Yes, AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy) doctors have dedicated government posts. ESIC recruits AYUSH Medical Officers, states have AYUSH departments with regular vacancies, CGHS has AYUSH dispensaries, Railway has AYUSH doctor posts, and Ministry of AYUSH has research positions. BAMS, BHMS, BUMS degree holders can apply.',
  },
  {
    question: 'What is the selection process for ESIC Medical Officer?',
    answer:
      'ESIC Medical Officer recruitment involves online application on esic.nic.in, followed by interview/walk-in-interview for Specialist and Senior Resident posts. For regular Medical Officer posts, ESIC conducts a computer-based test. Candidates need MBBS with registration in MCI/NMC. ESIC offers excellent medical benefits for employees and their families along with Pay Level 10.',
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
        name: 'Medical Jobs',
        item: 'https://sarkarialert.online/medical-jobs',
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
    data = await getJobs({ qualification: 'mbbs', page: '1' });
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
      filterParams={{ qualification: 'mbbs' }}
    />
  );
}

export default function MedicalJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-lg shadow-red-500/20">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Medical Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              मेडिकल सरकारी नौकरी 2026 — AIIMS, ESIC, AMC, CHS भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>medical sarkari naukri 2026</strong> across all major government hospitals and health services.
            Candidates with <strong>MBBS</strong>, <strong>BDS</strong>, <strong>AYUSH (BAMS/BHMS/BUMS)</strong> degrees can apply for posts like{' '}
            <strong>AIIMS Senior/Junior Resident</strong>, <strong>ESIC Medical Officer</strong>, <strong>Army Medical Corps</strong>,{' '}
            <strong>CHS Medical Officer</strong> (through UPSC), and state health services medical officer posts.
            These jobs offer pay scale of Rs 56,100+ (Level 10) with NPA, government benefits like pension, accommodation, and career growth.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां मेडिकल उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। AIIMS, ESIC,
            सेना मेडिकल कोर, CHS और राज्य स्वास्थ्य सेवाओं की डॉक्टर भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Medical Government Jobs
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
