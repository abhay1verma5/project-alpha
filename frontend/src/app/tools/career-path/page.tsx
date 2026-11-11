import type { Metadata } from 'next';
import { CareerPath } from '@/components/tools/CareerPath';

export const metadata: Metadata = {
  title: 'Career Path Finder — मेरी योग्यता पर कौन सी सरकारी नौकरी? | SarkariAlert',
  description:
    'Enter your qualification (10th, 12th, Graduate, B.Tech, Post Graduate) and discover ALL government job options with salary, timeline, selection process & difficulty level. SSC, UPSC, Railway, Banking, Defence — complete career map.',
  keywords: [
    'government job career path',
    'sarkari naukri options',
    'career path after 10th',
    'career path after 12th',
    'career path after graduation',
    'government job salary',
    'ssc career path',
    'upsc career path',
    'railway career path',
    'sarkari naukri career map',
    'government exam list with salary',
    'सरकारी नौकरी करियर पाथ',
    'योग्यता के अनुसार सरकारी नौकरी',
  ],
  alternates: { canonical: 'https://sarkarialert.online/tools/career-path' },
};

const faqData = [
  {
    question: '10th Pass के बाद कौन सी सरकारी नौकरी मिल सकती है?',
    answer:
      '10th Pass candidates can apply for Railway Group D (₹18,000-56,900), SSC MTS (₹18,000-56,900), Army GD Agniveer (₹30,000), Police Constable (₹20,000-63,200), and Postal MTS (₹18,000-56,900). ये सभी exams 18-25 age group के लिए हैं।',
  },
  {
    question: '12th Pass ke baad kaun si government job options hain?',
    answer:
      '12th Pass ke baad SSC CHSL (₹25,500-81,100), SSC GD (₹21,700-69,100), Railway NTPC (₹19,900-63,200), NDA (₹56,100+), Air Force X/Y Group (₹30,000+), Police SI (₹35,400-1,12,400), and Bank Clerk (₹20,000-60,000) ke liye apply kar sakte hain.',
  },
  {
    question: 'Which government exam has the highest salary for graduates?',
    answer:
      'For graduates, UPSC CSE (IAS/IPS) offers the highest salary at ₹56,100-2,50,000+ per month. RBI Grade B (₹77,208+) and SSC CGL (₹44,900-1,42,400) are also high-paying options. UPSC CSE is the most difficult but most rewarding career path.',
  },
  {
    question: 'B.Tech ke baad konsi sarkari naukri best hai?',
    answer:
      'B.Tech graduates ke liye GATE through PSU jobs (₹60,000-1,80,000), ESE/IES (₹56,100+), ISRO Scientist (₹56,100+), SSC JE (₹35,400-1,12,400), and Railway JE (₹35,400-1,12,400) best options hain. GATE score se direct PSU placement possible hai.',
  },
  {
    question: 'Post Graduate ke liye kaun se government exams hain?',
    answer:
      'Post Graduates can apply for UGC NET/JRF (₹57,700+ for Assistant Professor), PGT Teacher (₹44,900-1,42,400), RBI Grade B (₹77,208+), and all graduate-level exams like UPSC CSE, SSC CGL, Banking exams with added advantage.',
  },
  {
    question: 'Government job ki preparation mein kitna time lagta hai?',
    answer:
      'Preparation time varies: SSC MTS/GD (3-6 months), SSC CHSL/CGL (6-12 months), Banking PO (6-9 months), Railway NTPC (6-8 months), UPSC CSE (12-24 months), GATE PSU (8-12 months). Consistent daily 4-6 hours study recommended hai.',
  },
  {
    question: 'What is the easiest government exam to crack?',
    answer:
      'SSC MTS, Railway Group D, and Postal MTS are considered relatively easier exams with 10th pass eligibility. SSC GD and Police Constable exams require physical fitness but have simpler written tests. Competition varies by region and vacancies.',
  },
  {
    question: '35 saal ki umar mein kaun si sarkari naukri mil sakti hai?',
    answer:
      'At 35 years, you can still apply for UPSC CSE (up to 32 + relaxation), SSC CGL (up to 32 + relaxation), Teaching positions (no upper age limit for some), RBI Grade B (up to 30 + relaxation), and many State Government jobs with higher age limits.',
  },
];

export default function CareerPathPage() {
  const faqSchema = {
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          Career Path Finder — मेरी योग्यता पर कौन सी सरकारी नौकरी?
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          अपनी शिक्षा, उम्र और पसंदीदा क्षेत्र चुनें — सभी सरकारी नौकरी विकल्प, सैलरी, selection process और
          तैयारी का समय देखें। Compare two exams side-by-side.
        </p>
      </div>

      <CareerPath />

      {/* FAQ Section */}
      <section className="mt-16">
        <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-4">
          {faqData.map((faq, i) => (
            <details
              key={i}
              className="group rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-bold text-gray-900 dark:text-white text-sm sm:text-base">
                {faq.question}
                <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">
                  &#9660;
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
