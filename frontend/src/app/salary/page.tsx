import type { Metadata } from 'next';
import { SALARY_DATA } from './salary-data';
import { SalaryIndex } from './SalaryIndex';

export const metadata: Metadata = {
  title: 'Government Job Salary Details 2026-27 — In-hand Salary, Pay Level, Allowances',
  description: `Detailed salary breakdown for ${SALARY_DATA.length}+ government posts: basic pay, DA, HRA, in-hand salary. Compare SSC, Banking, Railway, UPSC, Defence, Police, Teaching salaries.`,
  alternates: { canonical: 'https://sarkarialert.online/salary' },
};

const salaryFaqData = [
  {
    question: 'What is the salary of SSC CGL posts?',
    answer: 'SSC CGL posts like Tax Assistant and Auditor start at Pay Level 4 (₹25,500 basic). With DA (56%), HRA, and other allowances, the in-hand salary ranges from ₹35,000 to ₹45,000 per month depending on city. Inspector-level posts start at Pay Level 7 (₹44,900 basic) with in-hand ₹60,000-₹75,000.',
  },
  {
    question: 'Sarkari naukri mein kitni salary milti hai?',
    answer: 'Sarkari naukri ki salary post ke hisaab se alag hoti hai. MTS/Group D: ₹18,000-₹22,000, Clerk: ₹25,000-₹35,000, PO/Inspector: ₹45,000-₹65,000, IAS/IPS: ₹56,100+ basic se shuru hoti hai. DA, HRA, TA jaise allowances extra milte hain.',
  },
  {
    question: 'What is DA (Dearness Allowance) and how does it affect salary?',
    answer: 'DA (Dearness Allowance) is a cost-of-living adjustment paid to government employees. As of 2026, DA is 56% of basic pay. It increases by 3-4% every 6 months. DA directly increases your gross salary — for ₹25,500 basic, DA alone adds ₹14,280.',
  },
  {
    question: 'How does HRA vary by city in government jobs?',
    answer: 'HRA depends on city classification: X cities (metro like Delhi, Mumbai) get 27% of basic, Y cities (tier-2 like Lucknow, Jaipur) get 18%, and Z cities (other) get 9%. This means a ₹6,000-₹12,000 difference in salary based on posting location.',
  },
  {
    question: 'What is NPS deduction in government salary?',
    answer: 'NPS (National Pension System) is a mandatory 10% deduction from basic pay for employees joining after 2004. The government contributes 14% to your NPS account. Though it reduces take-home pay, it builds a retirement corpus. For ₹25,500 basic, NPS deduction is ₹2,550/month.',
  },
  {
    question: 'Which government job has the highest salary?',
    answer: 'IAS officers (UPSC CSE) start at Pay Level 10 (₹56,100 basic) and can reach Cabinet Secretary level at ₹2,50,000. RBI Grade B officers earn ₹77,208 starting. PSU executives at ONGC, IOCL earn ₹60,000-₹1,80,000. SBI PO starting salary is around ₹52,000 in-hand.',
  },
  {
    question: 'Do government employees get 7th Pay Commission benefits?',
    answer: 'Yes, all central government employees get 7th CPC benefits with a minimum pay of ₹18,000 and fitment factor of 2.57x. State government employees follow their own pay commissions. The 8th Pay Commission is expected around 2026, which may further increase salaries.',
  },
  {
    question: 'What additional perks do government employees receive?',
    answer: 'Besides salary, govt employees get: Medical reimbursement, LTC (Leave Travel Concession), Children Education Allowance, Festival Advance, Housing facility/subsidy, Pension/NPS, Gratuity, Group Insurance, and 30 earned + 12 casual + 20 half-pay leaves per year.',
  },
];

export default function SalaryPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Government Job Salary Details',
    numberOfItems: SALARY_DATA.length,
    itemListElement: SALARY_DATA.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${p.name} Salary`,
      url: `https://sarkarialert.online/salary/${p.slug}`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: salaryFaqData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Salary Details</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">
        {SALARY_DATA.length} government posts with detailed in-hand salary breakdowns, city-wise comparison, and promotion paths.
      </p>
      <SalaryIndex />

      <section className="mt-10 border-t border-gray-200 dark:border-gray-800 pt-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions — Government Salary
        </h2>
        <div className="space-y-4">
          {salaryFaqData.map((faq, i) => (
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
