import type { Metadata } from 'next';
import { Gift, ExternalLink } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sarkari Yojana 2026-27 — सरकारी योजना लिस्ट, Online Apply | SarkariAlert',
  description:
    'Sarkari Yojana 2026-27: Complete list of central & state government schemes. PM Kisan, Ayushman Bharat, PM Awas Yojana, Sukanya Samriddhi, Mudra Yojana, Ujjwala, Ladli Behna & more. Check eligibility, documents & apply online.',
  keywords: [
    'sarkari yojana 2026',
    'सरकारी योजना लिस्ट 2026',
    'government schemes india 2026',
    'pm kisan yojana',
    'ayushman bharat yojana',
    'pm awas yojana',
    'sukanya samriddhi yojana',
    'mudra yojana',
    'ujjwala yojana',
    'ladli behna yojana',
    'sarkari yojana online apply',
    'central government schemes',
    'state government schemes',
  ],
  alternates: {
    canonical: 'https://sarkarialert.online/sarkari-yojana',
  },
  openGraph: {
    title: 'Sarkari Yojana 2026-27 — सरकारी योजना लिस्ट, Online Apply',
    description:
      'Complete list of government schemes 2026-27. PM Kisan, Ayushman Bharat, PM Awas, Mudra, Ujjwala & more. Check eligibility & apply online.',
    url: 'https://sarkarialert.online/sarkari-yojana',
    type: 'website',
  },
};

const schemes = [
  {
    name: 'PM Kisan Samman Nidhi',
    nameHi: 'पीएम किसान सम्मान निधि',
    description: 'किसानों को हर साल Rs 6,000 तीन किस्तों में सीधे बैंक खाते में',
    eligibility: 'All land-holding farmer families with cultivable land',
    link: 'https://pmkisan.gov.in/',
    color: 'green',
  },
  {
    name: 'Ayushman Bharat (PM-JAY)',
    nameHi: 'आयुष्मान भारत योजना',
    description: 'गरीब परिवारों को Rs 5 लाख तक का मुफ्त स्वास्थ्य बीमा',
    eligibility: 'BPL families as per SECC 2011 data',
    link: 'https://pmjay.gov.in/',
    color: 'blue',
  },
  {
    name: 'PM Awas Yojana',
    nameHi: 'पीएम आवास योजना',
    description: 'गरीबों को पक्का मकान बनाने के लिए Rs 1.20-2.50 लाख की सहायता',
    eligibility: 'EWS/LIG families without pucca house',
    link: 'https://pmaymis.gov.in/',
    color: 'orange',
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    nameHi: 'सुकन्या समृद्धि योजना',
    description: 'बेटियों के भविष्य के लिए बचत योजना — 8.2% ब्याज दर, टैक्स फ्री',
    eligibility: 'Parents/guardians of girl child (age 0-10 years)',
    link: 'https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=89',
    color: 'pink',
  },
  {
    name: 'PM Mudra Yojana',
    nameHi: 'पीएम मुद्रा योजना',
    description: 'छोटे व्यापारियों को बिना गारंटी Rs 10 लाख तक का बिजनेस लोन',
    eligibility: 'Non-corporate, non-farm small/micro enterprises',
    link: 'https://www.mudra.org.in/',
    color: 'purple',
  },
  {
    name: 'Ujjwala Yojana',
    nameHi: 'उज्ज्वला योजना',
    description: 'BPL परिवारों की महिलाओं को मुफ्त LPG कनेक्शन',
    eligibility: 'BPL households, especially women above 18 years',
    link: 'https://www.pmuy.gov.in/',
    color: 'red',
  },
  {
    name: 'Ladli Behna Yojana',
    nameHi: 'लाडली बहना योजना',
    description: 'मध्य प्रदेश की महिलाओं को हर महीने Rs 1,250 सीधे बैंक खाते में',
    eligibility: 'Women aged 21-60 in MP with family income < Rs 2.5 lakh/year',
    link: 'https://ladlibahna.mp.gov.in/',
    color: 'rose',
  },
  {
    name: 'PM Vishwakarma Yojana',
    nameHi: 'पीएम विश्वकर्मा योजना',
    description: 'कारीगरों और शिल्पकारों को Rs 3 लाख तक का लोन और ट्रेनिंग',
    eligibility: 'Traditional artisans and craftspeople in 18 trades',
    link: 'https://pmvishwakarma.gov.in/',
    color: 'amber',
  },
  {
    name: 'Atal Pension Yojana',
    nameHi: 'अटल पेंशन योजना',
    description: 'असंगठित क्षेत्र के कामगारों को 60 साल बाद Rs 1,000-5,000 मासिक पेंशन',
    eligibility: 'Indian citizens aged 18-40, not income tax payer',
    link: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    color: 'indigo',
  },
  {
    name: 'PM Surya Ghar (Free Solar)',
    nameHi: 'पीएम सूर्य घर योजना',
    description: 'घरों पर मुफ्त सोलर पैनल लगवाएं — 300 यूनिट तक बिजली फ्री',
    eligibility: 'All residential electricity consumers',
    link: 'https://pmsuryaghar.gov.in/',
    color: 'yellow',
  },
  {
    name: 'Agnipath Scheme',
    nameHi: 'अग्निपथ योजना',
    description: 'सेना, नौसेना, वायुसेना में 4 साल की सेवा — Rs 30,000-40,000 वेतन',
    eligibility: 'Indian youth aged 17.5-23 years, 10th/12th pass',
    link: 'https://agnipathvayu.cdac.in/',
    color: 'emerald',
  },
  {
    name: 'Startup India',
    nameHi: 'स्टार्टअप इंडिया',
    description: 'नए बिजनेस शुरू करने के लिए फंडिंग, टैक्स छूट और मेंटरशिप',
    eligibility: 'Startups recognized by DPIIT, less than 10 years old',
    link: 'https://www.startupindia.gov.in/',
    color: 'cyan',
  },
  {
    name: 'PM Scholarship Scheme',
    nameHi: 'पीएम छात्रवृत्ति योजना',
    description: 'सशस्त्र बल/पूर्व सैनिक के बच्चों को Rs 2,500/month तक स्कॉलरशिप',
    eligibility: 'Wards of ex-servicemen/armed forces personnel',
    link: 'https://scholarships.gov.in/',
    color: 'teal',
  },
  {
    name: 'National Apprenticeship Scheme',
    nameHi: 'राष्ट्रीय शिक्षुता योजना',
    description: 'युवाओं को इंडस्ट्री में ट्रेनिंग और Rs 5,000-9,000 मासिक स्टाइपेंड',
    eligibility: 'ITI/Diploma/Graduate candidates aged 16+',
    link: 'https://www.apprenticeshipindia.gov.in/',
    color: 'sky',
  },
  {
    name: 'PM Internship Scheme',
    nameHi: 'पीएम इंटर्नशिप योजना',
    description: 'टॉप 500 कंपनियों में 12 महीने की इंटर्नशिप — Rs 5,000/month भत्ता',
    eligibility: 'Youth aged 21-24, not employed in full-time jobs',
    link: 'https://pminternship.mca.gov.in/',
    color: 'violet',
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  green: { bg: 'bg-green-50 dark:bg-green-950/30', border: 'border-green-200 dark:border-green-900/50', text: 'text-green-700 dark:text-green-400', badge: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300' },
  blue: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-900/50', text: 'text-blue-700 dark:text-blue-400', badge: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950/30', border: 'border-orange-200 dark:border-orange-900/50', text: 'text-orange-700 dark:text-orange-400', badge: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300' },
  pink: { bg: 'bg-pink-50 dark:bg-pink-950/30', border: 'border-pink-200 dark:border-pink-900/50', text: 'text-pink-700 dark:text-pink-400', badge: 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950/30', border: 'border-purple-200 dark:border-purple-900/50', text: 'text-purple-700 dark:text-purple-400', badge: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300' },
  red: { bg: 'bg-red-50 dark:bg-red-950/30', border: 'border-red-200 dark:border-red-900/50', text: 'text-red-700 dark:text-red-400', badge: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300' },
  rose: { bg: 'bg-rose-50 dark:bg-rose-950/30', border: 'border-rose-200 dark:border-rose-900/50', text: 'text-rose-700 dark:text-rose-400', badge: 'bg-rose-100 dark:bg-rose-900/50 text-rose-700 dark:text-rose-300' },
  amber: { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-900/50', text: 'text-amber-700 dark:text-amber-400', badge: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300' },
  indigo: { bg: 'bg-indigo-50 dark:bg-indigo-950/30', border: 'border-indigo-200 dark:border-indigo-900/50', text: 'text-indigo-700 dark:text-indigo-400', badge: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300' },
  yellow: { bg: 'bg-yellow-50 dark:bg-yellow-950/30', border: 'border-yellow-200 dark:border-yellow-900/50', text: 'text-yellow-700 dark:text-yellow-400', badge: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300' },
  emerald: { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-900/50', text: 'text-emerald-700 dark:text-emerald-400', badge: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300' },
  cyan: { bg: 'bg-cyan-50 dark:bg-cyan-950/30', border: 'border-cyan-200 dark:border-cyan-900/50', text: 'text-cyan-700 dark:text-cyan-400', badge: 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300' },
  teal: { bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-200 dark:border-teal-900/50', text: 'text-teal-700 dark:text-teal-400', badge: 'bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300' },
  sky: { bg: 'bg-sky-50 dark:bg-sky-950/30', border: 'border-sky-200 dark:border-sky-900/50', text: 'text-sky-700 dark:text-sky-400', badge: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300' },
  violet: { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-900/50', text: 'text-violet-700 dark:text-violet-400', badge: 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300' },
};

const faqData = [
  {
    question: 'Sarkari yojana ke liye eligibility kaise check karein?',
    answer:
      'Sarkari yojana ki eligibility check karne ke liye yojana ki official website par jaayein. Har yojana ke liye alag-alag eligibility criteria hoti hai jaise age, income, caste category, BPL card, ration card, aadhar card etc. Aap apne nazdeeki CSC (Common Service Centre) ya Jan Seva Kendra par bhi eligibility check karwa sakte hain.',
  },
  {
    question: 'How to apply online for government schemes?',
    answer:
      'To apply online for government schemes: 1) Visit the official scheme website (e.g., pmkisan.gov.in, pmjay.gov.in). 2) Click on "Apply Online" or "Registration". 3) Enter your Aadhaar number, mobile number, and personal details. 4) Upload required documents (Aadhaar, bank passbook, income certificate). 5) Submit the application and note down the reference number. You can also apply through CSC centers, Umang App, or DigiLocker.',
  },
  {
    question: 'What documents are needed for sarkari yojana?',
    answer:
      'Common documents needed for most government schemes: Aadhaar Card, Bank Account Passbook (linked with Aadhaar), Income Certificate, Caste Certificate (for SC/ST/OBC), BPL Card / Ration Card, Passport-size photographs, Mobile number linked with Aadhaar, Domicile/Residence Certificate, and scheme-specific documents like land records (PM Kisan), health card (Ayushman Bharat), or birth certificate of girl child (Sukanya Samriddhi).',
  },
  {
    question: 'Central aur state government yojana mein kya fark hai?',
    answer:
      'Central government yojana (like PM Kisan, Ayushman Bharat, PM Awas) poore desh mein laagu hoti hain aur inke liye central government paisa deti hai. State government yojana (like Ladli Behna, Kanya Sumangala) sirf us rajya mein laagu hoti hain. Kuch yojanaayein central-state dono milkar chalati hain jaise PM Awas Yojana jismein 60% central aur 40% state ka paisa lagta hai.',
  },
  {
    question: 'How to check sarkari yojana application status?',
    answer:
      'To check your sarkari yojana application status: 1) Visit the official scheme website. 2) Look for "Check Status" or "Beneficiary Status" option. 3) Enter your Aadhaar number, application ID, or mobile number. 4) Your application status will be displayed. For PM Kisan, visit pmkisan.gov.in > Beneficiary Status. For PM Awas, visit pmaymis.gov.in > Track Your Assessment. You can also check via Umang App or by calling the scheme helpline.',
  },
  {
    question: 'Which government schemes are available for women in 2026?',
    answer:
      'Major government schemes for women in 2026: Ladli Behna Yojana (Rs 1,250/month in MP), Sukanya Samriddhi Yojana (savings for girl child at 8.2% interest), Ujjwala Yojana (free LPG connection), PM Awas Yojana (housing in woman\'s name), Mahila Samman Savings Certificate (7.5% interest), Free Silai Machine Yojana, Lakhpati Didi Yojana (Rs 1 lakh income for SHG women), and various state-level schemes like Kanya Sumangala (UP), Majhi Kanya Bhagyashree (Maharashtra).',
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
        name: 'Sarkari Yojana',
        item: 'https://sarkarialert.online/sarkari-yojana',
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

export default function SarkariYojanaPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <FAQSchema />
      <BreadcrumbSchema />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Sarkari Yojana 2026 — Government Schemes
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              सरकारी योजना 2026 — केंद्र और राज्य सरकार की योजनाएं
            </p>
          </div>
        </div>

        {/* Intro section */}
        <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 sm:p-5 mb-6">
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            Browse the complete list of <strong>sarkari yojana 2026</strong> from central and state governments.
            From <strong>PM Kisan Samman Nidhi</strong> (Rs 6,000/year for farmers) to <strong>Ayushman Bharat</strong> (Rs 5 lakh health insurance),
            <strong> PM Awas Yojana</strong> (pucca housing), <strong>Mudra Yojana</strong> (business loans up to Rs 10 lakh),
            and <strong>Ladli Behna Yojana</strong> (Rs 1,250/month for women) — find eligibility, required documents,
            and direct links to apply online for all government welfare schemes.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            यहां केंद्र और राज्य सरकार की सभी प्रमुख योजनाओं की जानकारी देखें। PM किसान, आयुष्मान भारत, PM आवास,
            मुद्रा, उज्ज्वला, लाडली बहना और अन्य योजनाओं की पात्रता, दस्तावेज़ और ऑनलाइन आवेदन लिंक।
          </p>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {schemes.map((scheme, i) => {
          const colors = colorMap[scheme.color] || colorMap.green;
          return (
            <div
              key={i}
              className={`${colors.bg} border ${colors.border} rounded-xl p-4 sm:p-5 flex flex-col`}
            >
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                {scheme.name}
              </h3>
              <p className={`text-xs font-medium ${colors.text} mb-2`}>{scheme.nameHi}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed flex-1">
                {scheme.description}
              </p>
              <div className="mb-3">
                <span className={`inline-block text-xs px-2 py-1 rounded-md ${colors.badge} font-medium`}>
                  {scheme.eligibility}
                </span>
              </div>
              <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-white hover:underline mt-auto"
              >
                Apply / Learn More
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          );
        })}
      </div>

      {/* FAQ Section */}
      <section className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Sarkari Yojana
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
