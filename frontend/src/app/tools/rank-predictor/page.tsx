import type { Metadata } from 'next';
import { RankPredictor } from '@/components/tools/RankPredictor';

export const metadata: Metadata = {
  title: 'Rank Predictor — Marks se Rank aur Selection Probability Jaane | SarkariAlert',
  description: 'Enter your exam marks and predict your rank, selection probability, and cutoff comparison for SSC CGL, CHSL, UPSC, IBPS PO, SBI, RRB NTPC, CTET, UGC NET. Category-wise analysis with historical cutoff data.',
  keywords: [
    'rank predictor',
    'ssc cgl rank predictor',
    'upsc rank predictor',
    'ibps po rank predictor',
    'exam rank calculator',
    'selection probability calculator',
    'cutoff marks comparison',
    'sarkari exam rank predictor',
    'marks se rank jaane',
    'government exam rank prediction',
  ],
  alternates: { canonical: 'https://sarkarialert.online/tools/rank-predictor' },
};

const faqData = [
  {
    question: 'How does the Rank Predictor calculate my estimated rank? / Rank Predictor rank kaise calculate karta hai?',
    answer:
      'The rank predictor uses historical cutoff data from the last 3 years, total number of candidates, and your marks to estimate a rank range. It compares your score against past cutoff trends and category-wise competition to give an approximate rank band. Yeh tool pichle 3 saal ke cutoff data, total candidates, aur aapke marks ka analysis karke ek estimated rank range deta hai.',
  },
  {
    question: 'Is this rank prediction 100% accurate? / Kya yeh rank prediction 100% sahi hai?',
    answer:
      'No, this is an approximate prediction based on historical data and trends. Actual ranks depend on many factors like paper difficulty, number of applicants, normalization, and vacancies. Use this as a reference tool, not a guarantee. Nahi, yeh ek approximate prediction hai. Actual rank paper difficulty, applicants ki sankhya, normalization aur vacancies par depend karti hai.',
  },
  {
    question: 'Which exams are supported by this tool? / Kaun kaun si exam ke liye yeh tool kaam karta hai?',
    answer:
      'Currently, the tool supports SSC CGL, SSC CHSL, SSC MTS, SSC GD, UPSC Prelims, IBPS PO, IBPS Clerk, SBI PO, SBI Clerk, RRB NTPC, RRB Group D, CTET, and UGC NET. We regularly update cutoff data as new results are published.',
  },
  {
    question: 'How is selection probability calculated? / Selection probability kaise calculate hoti hai?',
    answer:
      'Selection probability is calculated by comparing your marks with the historical cutoff for your category. If your marks are well above the cutoff, probability is higher (shown in green). If marks are near the cutoff, it is moderate (yellow). If below cutoff, probability is low (red). The exact percentage factors in the gap between your marks and the average cutoff of the last 3 years.',
  },
  {
    question: 'Does the category (OBC/SC/ST/EWS) affect rank prediction? / Kya category rank prediction ko affect karti hai?',
    answer:
      'Yes, category plays a significant role. Cutoffs for reserved categories (OBC, SC, ST, EWS, PH) are generally lower than General category. The tool shows category-specific cutoff data and calculates your selection probability accordingly. Haan, reserved categories ka cutoff General se kam hota hai aur tool accordingly aapki probability calculate karta hai.',
  },
  {
    question: 'What does "marks needed to be safe" mean? / "Safe hone ke liye kitne marks chahiye" ka kya matlab hai?',
    answer:
      'This shows how many additional marks you need to score above the highest cutoff of the last 3 years in your category to have a comfortable margin for selection. If it shows 0 or negative, your current score is already above the safe zone. Yeh batata hai ki aapko apni category ke highest cutoff se kitne zyada marks chahiye safe zone mein aane ke liye.',
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

export default function RankPredictorPage() {
  return (
    <>
      <FAQSchema />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
            Rank Predictor — Marks se Rank Jaane
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            अपने marks डालें और जानें estimated rank, selection probability, और पिछले 3 साल के cutoff comparison — SSC, UPSC, Bank, Railway, CTET, UGC NET exams के लिए।
          </p>
        </div>

        <RankPredictor />

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-4">
            {faqData.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <span className="pr-4">{faq.question}</span>
                  <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg flex-shrink-0">
                    &#9662;
                  </span>
                </summary>
                <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
