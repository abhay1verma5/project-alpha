import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Shield, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'SSC GD Constable 2026-27 — CRPF, BSF, CISF, ITBP Bharti | SarkariAlert',
  description:
    'SSC GD Constable 2026-27 recruitment for CRPF, BSF, CISF, ITBP, SSB, AR & NIA. Eligibility (10th/12th pass), physical standards, salary Rs 21,700-69,100, PET/PST details. Apply online for paramilitary forces.',
  keywords: [
    'ssc gd constable 2026',
    'ssc gd bharti 2026',
    'ssc gd crpf recruitment',
    'ssc gd bsf vacancy',
    'ssc gd cisf bharti',
    'ssc gd itbp recruitment',
    'ssc gd physical test',
    'ssc gd salary 2026',
    'ssc gd eligibility',
    'ssc gd 10th pass jobs',
    'ssc gd pet pst details',
    'paramilitary forces recruitment 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/ssc-gd',
  },
  openGraph: {
    title: 'SSC GD Constable 2026-27 — CRPF, BSF, CISF, ITBP Bharti',
    description:
      'SSC GD Constable 2026-27 — paramilitary forces recruitment. CRPF, BSF, CISF, ITBP bharti. Physical standards, salary & eligibility details.',
    url: 'https://sarkarialert.online/ssc-gd',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What is the eligibility for SSC GD Constable 2026?',
    answer:
      'SSC GD Constable 2026 requires candidates to have passed 10th class (Matriculation) or equivalent from a recognized board. However, for SSC GD (General Duty) Constable posts in CAPFs, the minimum qualification has been revised to 12th pass (Higher Secondary) in recent cycles. Candidates should check the latest notification for updated eligibility. Age limit is 18-23 years for General category.',
  },
  {
    question: 'What are the physical standards for SSC GD?',
    answer:
      'SSC GD physical standards: Height — Male General/OBC: 170 cm, SC/ST: 162.5 cm. Female General/OBC: 157 cm, SC/ST: 150 cm. Chest (Male only) — Unexpanded: 80 cm, Expanded: 85 cm (5 cm expansion required). Weight — proportionate to height and age as per medical standards. Candidates from hill areas and certain states get relaxation in height requirements.',
  },
  {
    question: 'SSC GD ki salary kitni hoti hai?',
    answer:
      'SSC GD Constable ki salary Pay Level 3 (Rs 21,700-69,100) ke according hoti hai. Basic pay Rs 21,700 se start hoti hai. DA, HRA, ration money, washing allowance aur other allowances milakar in-hand salary approximately Rs 30,000-35,000 per month hoti hai. Risk allowance, uniform allowance aur free accommodation bhi milta hai. 7-8 saal baad Head Constable mein promotion hota hai.',
  },
  {
    question: 'Which forces are included in SSC GD recruitment?',
    answer:
      'SSC GD Constable recruitment covers the following Central Armed Police Forces (CAPFs) and organizations: 1) CRPF (Central Reserve Police Force), 2) BSF (Border Security Force), 3) CISF (Central Industrial Security Force), 4) ITBP (Indo-Tibetan Border Police), 5) SSB (Sashastra Seema Bal), 6) Assam Rifles (AR), 7) NIA (National Investigation Agency), and 8) SSF (Secretariat Security Force). Candidates can give preference for forces during application.',
  },
  {
    question: 'What are the PET/PST details for SSC GD Constable?',
    answer:
      'SSC GD PET (Physical Efficiency Test): Male — 5 km run in 24 minutes. Female — 1.6 km run in 8.5 minutes. PST (Physical Standard Test) checks height and chest measurements. PET/PST is conducted after CBT (Computer Based Test) which has 80 questions in 60 minutes covering General Intelligence, General Knowledge, Elementary Mathematics, and English/Hindi. Medical examination follows PET/PST for document verification and final selection.',
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
        name: 'SSC GD Constable',
        item: 'https://sarkarialert.online/ssc-gd',
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
    data = await getJobs({ category: 'ssc', page: '1' });
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
      filterParams={{ category: 'ssc' }}
    />
  );
}

export default function SscGdPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 flex items-center justify-center shadow-lg shadow-slate-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              SSC GD Constable 2026 — CRPF, BSF, CISF, ITBP Bharti
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              SSC GD कांस्टेबल 2026 — CRPF, BSF, CISF भर्ती
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-slate-50 dark:bg-slate-950/30 border border-slate-200 dark:border-slate-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Get the latest <strong>SSC GD Constable 2026</strong> recruitment updates for paramilitary forces.
            Apply for <strong>CRPF</strong>, <strong>BSF</strong>, <strong>CISF</strong>,{' '}
            <strong>ITBP</strong>, <strong>SSB</strong>, and <strong>Assam Rifles</strong> constable posts.
            Candidates with <strong>10th/12th pass</strong> qualification and good physical fitness can apply.
            Salary starts at Rs 21,700-69,100 with additional allowances and government benefits.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            SSC GD कांस्टेबल 2026 — अर्धसैनिक बलों में भर्ती। CRPF, BSF, CISF, ITBP, SSB में
            कांस्टेबल पदों के लिए 10वीं/12वीं पास उम्मीदवार आवेदन करें।
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
          Frequently Asked Questions — SSC GD Constable 2026
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
