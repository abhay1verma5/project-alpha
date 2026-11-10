import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Law Government Jobs 2026-27 — LLB, Legal Officer Sarkari Naukri | SarkariAlert',
  description:
    'Law government jobs 2026-27: Browse latest sarkari naukri for LLB, LLM law graduates. Judicial services, APO, Legal Officer, CLAT, judiciary exam, state judicial service vacancies. Apply online with eligibility, salary & last date.',
  keywords: [
    'law government jobs 2026',
    'llb sarkari naukri 2026',
    'judicial services exam 2026',
    'apo vacancy 2026',
    'legal officer govt jobs',
    'judiciary exam preparation',
    'clat government jobs',
    'state judicial service',
    'upsc legal advisor',
    'legal officer bharti',
    'law officer sarkari naukri',
    'advocate government jobs',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/law-jobs',
  },
  openGraph: {
    title: 'Law Government Jobs 2026-27 — Latest LLB, Legal Officer Sarkari Naukri',
    description:
      'Find law sarkari naukri 2026-27. Judicial services, APO, Legal Officer, UPSC legal posts & state judiciary vacancies for LLB, LLM graduates.',
    url: 'https://sarkarialert.online/law-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'Which government jobs are available for law graduates?',
    answer:
      'Law graduates (LLB/LLM) can apply for State Judicial Services (Civil Judge/Judicial Magistrate), Assistant Public Prosecutor (APO/APP), Legal Officer in PSUs and government departments, UPSC Legal Advisor/Counsel, IBPS SO Law Officer in banks, JAG (Judge Advocate General) in Armed Forces, Law Officer in RBI/SEBI/NABARD, Staff Selection Commission (SSC) legal posts, and various state-level legal aid service positions.',
  },
  {
    question: 'Judiciary exam ki taiyari kaise karein?',
    answer:
      'Judiciary exam ki taiyari ke liye sabse pehle Bare Acts (CPC, CrPC, IPC, Evidence Act, Constitution) achi tarah padhein. State judicial service ke liye state-specific laws bhi zaruri hain. Prelims mein objective questions hote hain, Mains mein descriptive, aur phir Interview hota hai. Previous year papers solve karein aur current legal developments follow karein. LLB complete hona zaroori hai aur kuch states mein practice experience bhi maanga jaata hai.',
  },
  {
    question: 'What is the salary of a Civil Judge in India?',
    answer:
      'A Civil Judge (Junior Division) starts at Pay Level 12-13 (approximately Rs 56,100 - Rs 1,77,500 basic pay) depending on the state. With allowances (DA, HRA, etc.), the gross salary is approximately Rs 80,000 - Rs 1,20,000 per month for freshers. Senior Civil Judges and District Judges earn significantly more. Judges also get government accommodation, vehicle allowance, and other perks.',
  },
  {
    question: 'How to become Assistant Public Prosecutor (APO)?',
    answer:
      'To become APO/APP, candidates need LLB degree from a recognized university. Most states conduct their own APO exam through State Public Service Commission. The selection process typically includes Prelims (MCQ), Mains (descriptive on Law subjects), and Interview. Some states require practice experience at bar. APO works in criminal courts representing the state/prosecution.',
  },
  {
    question: 'Can law graduates apply for bank jobs?',
    answer:
      'Yes, law graduates can apply for Law Officer posts in banks through IBPS SO (Specialist Officer) exam. They can also apply for RBI Legal Officer, NABARD Legal Officer, and SEBI Legal Officer posts. Additionally, LLB holders can apply for general banking positions through IBPS PO/Clerk exams as any graduation is acceptable. PSU banks recruit Law Officers regularly at Scale-I and Scale-II levels.',
  },
  {
    question: 'What is JAG entry for law graduates in Armed Forces?',
    answer:
      'JAG (Judge Advocate General) is a branch in Indian Army, Navy, and Air Force that recruits law graduates as officers. Candidates need LLB/LLM with minimum 55% marks. Selection is through SSB interview. JAG officers handle court martial proceedings, military law, and legal advisory for the armed forces. They get officer rank pay, military benefits, and opportunities for career progression.',
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
        name: 'Law Jobs',
        item: 'https://sarkarialert.online/law-jobs',
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
    data = await getJobs({ qualification: 'law', page: '1' });
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
      filterParams={{ qualification: 'law' }}
    />
  );
}

export default function LawJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Law Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              कानून/विधि सरकारी नौकरी 2026 — न्यायिक सेवा, APO, विधि अधिकारी भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>law sarkari naukri 2026</strong> across all major government departments and judicial services.
            Candidates with <strong>LLB</strong> or <strong>LLM</strong> degrees can apply for posts like{' '}
            <strong>Civil Judge/Judicial Magistrate</strong> (State Judicial Services), <strong>Assistant Public Prosecutor (APO)</strong>,{' '}
            <strong>Legal Officer</strong> in PSUs, <strong>UPSC Legal Advisor</strong>, <strong>IBPS SO Law Officer</strong> in banks,
            and <strong>JAG Officer</strong> in Armed Forces.
            These jobs offer pay scale of Rs 36,000 - 56,100+ (Level 7-12) with government benefits like pension, accommodation, and career progression.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां विधि उम्मीदवारों के लिए सभी नवीनतम सरकारी नौकरियां देखें। न्यायिक सेवा, APO,
            विधि अधिकारी, UPSC, बैंक विधि अधिकारी और सशस्त्र बलों की JAG भर्ती अधिसूचनाएं एक जगह।
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
          Frequently Asked Questions — Law Government Jobs
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
