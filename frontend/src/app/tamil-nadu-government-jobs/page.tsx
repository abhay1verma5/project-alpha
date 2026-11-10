import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getJobs } from '@/lib/api';
import { JobsLoadMore } from '@/components/JobsLoadMore';
import { JobListSkeleton } from '@/components/JobCardSkeleton';
import { Briefcase, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tamil Nadu Government Jobs 2026-27 — தமிழ்நாடு அரசு வேலை | SarkariAlert',
  description:
    'Tamil Nadu Government Jobs 2026-27: Latest TN sarkari naukri for TNPSC, TN Police, TN TRB, MRB & more. Apply online for Tamil Nadu state government vacancies with eligibility, salary & last date.',
  keywords: [
    'tamil nadu government jobs 2026',
    'tn sarkari naukri',
    'tnpsc vacancy 2026',
    'tn police bharti 2026',
    'tn trb teacher vacancy',
    'mrb recruitment 2026',
    'tnpsc group 1 2 4 exam',
    'tn police si vacancy',
    'tamil nadu sarkari naukri 2026',
    'tamil nadu state government jobs',
    'tnpsc group 2a 2026',
    'tn police constable bharti',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/tamil-nadu-government-jobs',
  },
  openGraph: {
    title: 'Tamil Nadu Government Jobs 2026-27 — தமிழ்நாடு அரசு வேலை',
    description:
      'Find Tamil Nadu sarkari naukri 2026-27. TNPSC, TN Police, TN TRB, MRB & more vacancies in Tamil Nadu.',
    url: 'https://sarkarialert.online/tamil-nadu-government-jobs',
    type: 'website',
  },
};

const faqData = [
  {
    question: 'What are the major recruitment bodies in Tamil Nadu?',
    answer:
      'The major recruitment bodies in Tamil Nadu are: TNPSC (Tamil Nadu Public Service Commission) for Group 1, 2, 2A, and 4 services including Deputy Collector, DSP, and other administrative posts. TN TRB (Teachers Recruitment Board) for PG Assistant, BT Assistant, and other teaching posts. MRB (Medical Services Recruitment Board) for Nurses, Lab Technicians, Pharmacists, and other health department posts. TN Police for Constable, SI, and other police positions.',
  },
  {
    question: 'TNPSC Group 1 exam ka pattern kya hai?',
    answer:
      'TNPSC Group 1 exam teen stages mein hoti hai: Prelims (General Studies — 200 questions, 300 marks, 3 hours), Mains (3 descriptive papers — Tamil/other language, General Studies, aur aptitude/mental ability), aur Interview. Group 1 se Deputy Collector, DSP, Assistant Commissioner, District Registrar jaise top posts milte hain. Tamil Nadu GK, Indian Polity, History, Geography, Science, aur Current Affairs pe focus karna zaroori hai.',
  },
  {
    question: 'How to prepare for TN Police SI exam?',
    answer:
      'TN Police SI (Sub Inspector) exam mein Written Test (General Knowledge, Psychology, Criminology & Police Science — 200 questions), Physical Efficiency Test (1500m run, 100m run, long jump, shot put, high jump), and Viva Voce (interview) hota hai. Qualification: Any degree from recognized university. Age: 20-30 years. Physical standards: Height — 170 cm (male), 157 cm (female). Focus on Tamil Nadu GK, Indian Polity, Criminology, and current affairs.',
  },
  {
    question: 'TNPSC Group 4 exam mein kya aata hai?',
    answer:
      'TNPSC Group 4 (Combined Civil Services Exam IV) ek single stage exam hai — 200 questions (300 marks, 3 hours). Subjects: General Studies (75 questions) covering History, Geography, Polity, Science, Current Affairs, aur Aptitude & Mental Ability (25 questions). Qualification: 10th pass (SSLC). Group 4 se Village Administrative Officer (VAO), Junior Assistant, Bill Collector, Typist jaise posts milte hain. Tamil Nadu GK bahut important hai.',
  },
  {
    question: 'TN TRB teacher recruitment ka process kya hai?',
    answer:
      'TN TRB (Teachers Recruitment Board) PG Assistant/BT Assistant ke liye Computer Based Test conduct karta hai. PG Assistant ke liye Post Graduation zaroori hai aur BT Assistant ke liye B.Ed with relevant subject degree chahiye. Exam mein concerned subject (120 marks) aur Educational Methodology (30 marks) se questions aate hain. Salary PG Assistant ke liye Rs 36,900 basic pay se start hoti hai. TRB ki official website trb.tn.gov.in pe notifications check karein.',
  },
  {
    question: 'What are the upcoming Tamil Nadu government exams in 2026?',
    answer:
      'Upcoming Tamil Nadu government exams in 2026 include: TNPSC Group 1 Prelims & Mains, TNPSC Group 2/2A exam, TNPSC Group 4 (VAO, Junior Assistant), TN Police Constable & SI recruitment, TN TRB PG/BT Assistant, MRB Nurse & Lab Technician recruitment, TNPSC Departmental Exam, TN Forest Department recruitment, and various district-level vacancies. Check TNPSC, TRB, and MRB official websites regularly.',
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
        name: 'Tamil Nadu Government Jobs',
        item: 'https://sarkarialert.online/tamil-nadu-government-jobs',
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
    data = await getJobs({ state: 'tamil_nadu', page: '1' });
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
      filterParams={{ state: 'tamil_nadu' }}
    />
  );
}

export default function TamilNaduGovernmentJobsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/20">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Tamil Nadu Government Jobs 2026
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              தமிழ்நாடு அரசு வேலை 2026 — TNPSC, TN Police, TRB, MRB
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Find the latest <strong>Tamil Nadu sarkari naukri 2026</strong> across all state government departments.
            Browse vacancies from <strong>TNPSC</strong> (Group 1, 2, 2A, 4), <strong>TN Police</strong> (Constable, SI),{' '}
            <strong>TN TRB</strong> (PG Assistant, BT Assistant), and <strong>MRB</strong> (Nurses, Lab Technicians) recruitment.
            Tamil Nadu offers thousands of government vacancies every year across education, police, health, and administrative departments.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            இங்கே தமிழ்நாட்டின் அனைத்து சமீபத்திய அரசு வேலைகளைக் காணுங்கள். TNPSC, TN Police, TRB, MRB
            மற்றும் அனைத்து துறைகளின் ஆட்சேர்ப்பு அறிவிப்புகள் ஒரே இடத்தில். TNPSC Group 1/2/4, TN Police SI, TRB Teacher ஆட்சேர்ப்பு புதுப்பிப்பு.
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
          Frequently Asked Questions — Tamil Nadu Government Jobs
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
