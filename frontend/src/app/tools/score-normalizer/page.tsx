import type { Metadata } from 'next';
import { ScoreNormalizer } from '@/components/tools/ScoreNormalizer';

export const metadata: Metadata = {
  title: 'SSC & Railway Score Normalization Calculator — Check Normalized Marks | SarkariAlert',
  description: 'Calculate your normalized score for SSC CGL, SSC CHSL, SSC MTS, SSC GD, SSC CPO, RRB NTPC, RRB Group D multi-shift exams. See formula breakdown, estimated percentile, and visual comparison.',
  keywords: [
    'score normalization calculator',
    'ssc normalization formula',
    'railway normalization calculator',
    'ssc cgl normalized score',
    'ssc chsl normalization',
    'rrb ntpc normalization',
    'rrb group d normalized marks',
    'shift wise normalization',
    'multi shift exam normalization',
    'normalized marks calculator',
    'ssc score normalization formula',
    'normalization kya hota hai',
  ],
  alternates: { canonical: 'https://sarkarialert.online/tools/score-normalizer' },
};

const faqData = [
  {
    question: 'What is score normalization in SSC/Railway exams? (नॉर्मलाइजेशन क्या है?)',
    answer: 'Score normalization is a statistical process used by SSC and Railway boards to adjust marks across multiple shifts. Since different shifts may have different difficulty levels, normalization ensures a fair comparison. For example, if Shift 1 paper was tougher, candidates from that shift get an upward adjustment. (नॉर्मलाइजेशन एक सांख्यिकीय प्रक्रिया है जिसमें अलग-अलग शिफ्ट की कठिनाई के अनुसार अंकों को समायोजित किया जाता है।)',
  },
  {
    question: 'How does SSC calculate normalized scores? (SSC नॉर्मलाइज्ड स्कोर कैसे निकालता है?)',
    answer: 'SSC uses the formula: Normalized Score = Overall Mean + (Your Score - Shift Mean) × (Overall SD / Shift SD). This shifts and scales your raw score relative to the difficulty of your particular shift, making it comparable across all shifts. (SSC फॉर्मूला: नॉर्मलाइज्ड स्कोर = कुल औसत + (आपका स्कोर - शिफ्ट का औसत) × (कुल SD / शिफ्ट SD))',
  },
  {
    question: 'Can normalization decrease my score? (क्या नॉर्मलाइजेशन से मार्क्स कम हो सकते हैं?)',
    answer: 'Yes, if your shift was comparatively easier (higher average and lower standard deviation), normalization may reduce your marks. Conversely, if your shift was tougher, your marks may increase. The process is designed to level the playing field. (हां, अगर आपकी शिफ्ट आसान थी तो स्कोर कम हो सकता है, और कठिन थी तो बढ़ सकता है।)',
  },
  {
    question: 'What data do I need for this calculator? (कैलकुलेटर में क्या भरना होगा?)',
    answer: 'You need: your raw score, your shift\'s average (mean) and standard deviation (SD), and the overall average and SD across all shifts. These values are usually available in the official result PDF or press note released by SSC/RRB. (आपको चाहिए: अपना रॉ स्कोर, शिफ्ट का औसत और SD, और सभी शिफ्ट का कुल औसत और SD — ये SSC/RRB की ऑफिशियल PDF में मिलते हैं।)',
  },
  {
    question: 'Is normalization applied in all SSC and Railway exams? (क्या सभी SSC/Railway परीक्षाओं में नॉर्मलाइजेशन होता है?)',
    answer: 'Normalization is applied when the exam is conducted in multiple shifts across different days. SSC CGL, CHSL, GD, MTS, CPO Tier-I and RRB NTPC, Group D CBT exams all use normalization. Single-shift exams like interview rounds or skill tests do not require it. (बहु-शिफ्ट परीक्षाओं में ही नॉर्मलाइजेशन होता है — SSC CGL, CHSL, GD, MTS, CPO और RRB NTPC, Group D जैसी परीक्षाओं में।)',
  },
  {
    question: 'What is the difference between SSC and Railway normalization? (SSC और Railway नॉर्मलाइजेशन में क्या फर्क है?)',
    answer: 'Both SSC and Railway use similar statistical normalization approaches based on mean and standard deviation. The core formula is the same. The key difference is that Railway exams sometimes use a slightly different formula variant for CBT stages, but the principle of adjusting for shift difficulty remains identical. (दोनों में Mean-SD आधारित फॉर्मूला लगता है, बस Railway CBT में कभी-कभी थोड़ा अलग variant इस्तेमाल होता है।)',
  },
];

export default function ScoreNormalizerPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
          SSC / Railway Score Normalization Calculator
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          नॉर्मलाइजेशन कैलकुलेटर — मल्टी-शिफ्ट परीक्षा में अपना नॉर्मलाइज्ड स्कोर निकालें — Calculate your normalized score for SSC CGL, CHSL, GD, MTS, CPO, RRB NTPC, Group D multi-shift exams.
        </p>
      </div>

      <ScoreNormalizer />

      {/* FAQ Section */}
      <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Score Normalization
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
