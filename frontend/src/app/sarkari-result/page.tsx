import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getResults } from '@/lib/api';
import { JobList } from '@/components/JobList';
import { Pagination } from '@/components/Pagination';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Trophy, FileCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sarkari Result 2026-27 — सरकारी रिजल्ट, Admit Card, Answer Key | SarkariAlert',
  description:
    'Sarkari Result 2026-27: Check latest sarkari exam results, admit cards & answer keys. SSC, UPSC, Railway, Banking, State PSC, Police, Defence government exam results with direct links, scorecard download & cut-off marks.',
  keywords: [
    'sarkari result',
    'sarkari result 2026',
    'sarkari exam result',
    'government exam result',
    'ssc result',
    'upsc result',
    'railway result',
    'sarkari result in hindi',
    'sarkari naukri result',
    'exam result check online',
    'admit card download',
    'answer key 2026',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/sarkari-result',
  },
  openGraph: {
    title: 'Sarkari Result 2026-27 — सरकारी रिजल्ट, Admit Card, Answer Key',
    description:
      'Check latest sarkari result 2026-27. SSC, UPSC, Railway, Banking exam results with scorecard download, cut-off & merit list.',
    url: 'https://sarkarialert.online/sarkari-result',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'How to check sarkari result online?',
    answer:
      'To check sarkari result online: (1) Visit SarkariAlert.online/sarkari-result or the official website of the exam conducting body (e.g., ssc.gov.in for SSC, upsc.gov.in for UPSC). (2) Navigate to the "Results" section. (3) Click on your exam name and year. (4) Enter your Roll Number or Registration Number and Date of Birth. (5) Click Submit to view your result. (6) Download and save the result PDF/scorecard for future reference. Always check results from official websites to avoid fake result scams.',
  },
  {
    question: 'Sarkari result check karne ke liye kaun si websites best hain?',
    answer:
      'Sarkari result check karne ke liye sabse reliable websites hain: (1) SarkariAlert.online — sabhi exams ke results ek jagah, (2) ssc.gov.in — SSC CGL, CHSL, MTS, GD results, (3) upsc.gov.in — UPSC Civil Services, CDS, NDA results, (4) indianrailways.gov.in — Railway NTPC, Group D, JE results, (5) ibps.in — Banking PO, Clerk, SO results, (6) respective state PSC websites jaise uppsc.up.nic.in, mppsc.mp.gov.in. Hamesha official website se hi result check karein, third-party sites par fake results ho sakte hain.',
  },
  {
    question: 'What should I do after the sarkari result is declared?',
    answer:
      'After result declaration: (1) Download and print your scorecard/marksheet immediately (some portals remove results after a few months). (2) Check if you are in the merit list/cut-off list. (3) If selected, prepare documents for verification — original certificates, caste certificate, domicile, photographs, medical certificate. (4) Check the document verification (DV) schedule and venue. (5) If waiting for next stage (Mains/Interview), start preparation immediately. (6) If not selected, analyze your performance and plan for the next attempt. (7) Keep checking for answer key objections and revised results.',
  },
  {
    question: 'How to download scorecard from sarkari result portal?',
    answer:
      'To download scorecard: (1) Visit the official result portal of the exam body. (2) Go to Results section and find your exam. (3) Enter your Registration Number/Roll Number and password/DOB. (4) Your scorecard will display on screen showing marks in each section, total marks, and qualifying status. (5) Click "Download" or "Print" button to save as PDF. (6) Some portals like SSC provide individual marks on a separate portal (ssc.gov.in > Result > Individual Marks). Note: Scorecards are usually available for 30-90 days after result declaration, so download them promptly.',
  },
  {
    question: 'What is the difference between merit list and result?',
    answer:
      'Result and merit list are different stages: Result shows whether you have qualified (passed) the exam — it includes all candidates who scored above the minimum qualifying marks. Merit List (or Final Select List) shows candidates who are actually selected for the post — it is prepared after all stages (written exam + physical test + interview + document verification) are completed and is based on final ranking. For example, in SSC CGL: Tier-1 result shows who qualified for Tier-2, Tier-2 result shows who qualified for DV, and the final merit list shows who got the job with specific post allocation.',
  },
  {
    question: 'How long does it take for sarkari result to come after exam?',
    answer:
      'Result declaration time varies by exam: SSC CGL/CHSL — 2 to 3 months after each tier. UPSC Prelims — 15 to 20 days. UPSC Mains — 2 to 3 months. Railway NTPC/Group D — 2 to 4 months. Banking (IBPS/SBI) — 1 to 2 months. State PSC Prelims — 1 to 2 months. Police Constable — 1 to 3 months. Defence (CDS/NDA) — 1 to 2 months. Note: These are approximate timelines and can vary. Check SarkariAlert regularly for result date announcements and notifications.',
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
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sarkari Result',
        item: 'https://sarkarialert.online/sarkari-result',
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

async function ResultsContent() {
  let data;
  try {
    data = await getResults({ page: '1' });
  } catch {
    return (
      <div className="text-center py-16 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <FileCheck className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
        <p className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2">Unable to load results</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Backend server is not available. Please try again later.
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.count / 20);

  return (
    <>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{data.count} results declared</p>
      <JobList jobs={data.results} emptyMessage="No results available yet." />
      <Pagination currentPage={1} totalPages={totalPages} basePath="/sarkari-result" queryParams={{}} />
    </>
  );
}

export default function SarkariResultPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg shadow-yellow-500/20">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Sarkari Result 2026 — सरकारी रिजल्ट, Admit Card, Answer Key
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              सरकारी रिजल्ट 2026 — लेटेस्ट परिणाम, एडमिट कार्ड, आंसर की
            </p>
          </div>
        </div>

        {/* Quick Navigation Links */}
        <div className="flex flex-wrap gap-3 mb-5">
          <Link
            href="/results"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-orange-100 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 text-sm font-medium rounded-lg hover:bg-orange-200 dark:hover:bg-orange-950/60 transition-colors border border-orange-200 dark:border-orange-900/50"
          >
            <FileCheck className="w-4 h-4" />
            All Results
          </Link>
          <Link
            href="/admit-cards"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-lg hover:bg-blue-200 dark:hover:bg-blue-950/60 transition-colors border border-blue-200 dark:border-blue-900/50"
          >
            <FileCheck className="w-4 h-4" />
            Admit Cards
          </Link>
          <Link
            href="/answer-keys"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-300 text-sm font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-950/60 transition-colors border border-green-200 dark:border-green-900/50"
          >
            <FileCheck className="w-4 h-4" />
            Answer Keys
          </Link>
        </div>

        {/* Intro section */}
        <div className="bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Welcome to <strong>Sarkari Result 2026</strong> — your one-stop destination for all government exam results,
            admit cards, and answer keys. Check the latest results for <strong>SSC</strong>, <strong>UPSC</strong>,{' '}
            <strong>Railway</strong>, <strong>Banking</strong>, <strong>State PSC</strong>, <strong>Police</strong>,{' '}
            <strong>Defence</strong>, and all other sarkari exams. This page shows all latest declared results with
            direct links to official scorecards. Also visit our dedicated{' '}
            <Link href="/admit-cards" className="text-orange-600 dark:text-orange-400 underline font-medium">Admit Cards</Link> and{' '}
            <Link href="/answer-keys" className="text-orange-600 dark:text-orange-400 underline font-medium">Answer Keys</Link> pages
            for upcoming exam hall tickets and provisional answer keys.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            सरकारी रिजल्ट 2026 — सभी सरकारी परीक्षाओं के लेटेस्ट परिणाम यहां देखें। SSC, UPSC, रेलवे, बैंकिंग, राज्य PSC,
            पुलिस और रक्षा परीक्षाओं के रिजल्ट, स्कोरकार्ड डाउनलोड, कट-ऑफ और मेरिट लिस्ट — सब एक जगह।
            एडमिट कार्ड और आंसर की के लिए ऊपर दिए गए लिंक पर क्लिक करें।
          </p>
        </div>
      </div>

      {/* Results list */}
      <Suspense fallback={<JobListSkeleton />}>
        <ResultsContent />
      </Suspense>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Sarkari Result
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
