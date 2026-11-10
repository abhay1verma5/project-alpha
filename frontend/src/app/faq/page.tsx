import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ — Frequently Asked Questions',
  description: 'Frequently asked questions about SarkariAlert, government jobs, exam preparation, and using our platform.',
};

const faqs = [
  {
    category: 'About SarkariAlert',
    questions: [
      { q: 'What is SarkariAlert?', a: 'SarkariAlert is India\'s comprehensive government job portal that aggregates job notifications, results, admit cards, answer keys, and exam updates from all major government organizations. We also offer AI-powered study tools, mock tests, and career guidance.' },
      { q: 'Is SarkariAlert a government website?', a: 'No. SarkariAlert is an independent information platform. We collect data from official government websites and present it in a user-friendly format. Always verify information from official sources.' },
      { q: 'Is SarkariAlert free to use?', a: 'Yes! SarkariAlert is 100% free. All features including job listings, mock tests, AI tools, previous year questions, and current affairs are available at no cost.' },
      { q: 'How often is the data updated?', a: 'We update our database daily. New job notifications, results, and admit cards are typically added within hours of being published on official websites.' },
    ],
  },
  {
    category: 'Government Jobs',
    questions: [
      { q: 'How do I apply for a government job?', a: 'Click on any job listing to see the full details including the "Apply Online" link. This will take you to the official application portal. Always apply through the official website only.' },
      { q: 'Which categories of jobs does SarkariAlert cover?', a: 'We cover all major categories: SSC, UPSC, Railway, Banking (IBPS/SBI), Defence, Police, State PSC, Teaching, Health & Medical, Engineering, University, Gramin Dak Sevak, and more.' },
      { q: 'Can I filter jobs by my qualification?', a: 'Yes! Use the education filter on the Jobs page to find positions matching your qualification — from 8th Pass to PhD.' },
      { q: 'How do I know if a job deadline has passed?', a: 'Each job card shows the number of days remaining. Jobs with expired deadlines are automatically marked and filtered out from active listings.' },
    ],
  },
  {
    category: 'Mock Tests & PYQ',
    questions: [
      { q: 'What exams have mock tests available?', a: 'We offer mock tests for SSC CGL, CHSL, MTS, GD, UPSC Prelims, RRB NTPC, Group D, IBPS PO/Clerk, SBI PO, CTET, UGC NET, NDA, JEE Main/Advanced, NEET, GATE, CBSE 10 & 12, and more.' },
      { q: 'Are the previous year questions authentic?', a: 'Our PYQ database contains questions collected from official question papers and verified educational sources. We continuously add new questions and verify existing ones.' },
      { q: 'How are mock test scores tracked?', a: 'Your test history and scores are saved locally on your device. We track tests completed, average score, best score, and your streak.' },
    ],
  },
  {
    category: 'AI Tools',
    questions: [
      { q: 'What AI tools are available?', a: 'SarkariAlert offers AI-powered Search, AI Quiz Generator, AI Eligibility Checker, and AI Career Advisor. All tools are free and work in both Hindi and English.' },
      { q: 'How accurate is the AI eligibility checker?', a: 'The AI eligibility checker provides general guidance based on known criteria. Exact eligibility should always be verified from official notifications as criteria can change with each recruitment cycle.' },
      { q: 'Can I use voice search?', a: 'Yes! Our AI Search supports voice input in both Hindi and English. Click the microphone icon and speak your query.' },
    ],
  },
  {
    category: 'Technical',
    questions: [
      { q: 'Does SarkariAlert work offline?', a: 'SarkariAlert is a Progressive Web App (PWA). You can install it on your phone and access previously loaded content offline.' },
      { q: 'How do I switch between Hindi and English?', a: 'Click the language toggle button (EN/HI) in the header. Your preference is saved and persists across sessions.' },
      { q: 'How do I enable dark mode?', a: 'Click the sun/moon icon in the header to toggle between light and dark mode. It also follows your system preference.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Frequently Asked Questions</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Find answers to common questions about SarkariAlert and government jobs.</p>

      <div className="space-y-8">
        {faqs.map((section) => (
          <div key={section.category}>
            <h2 className="text-lg font-bold text-[#1a3a5c] dark:text-blue-300 mb-4">{section.category}</h2>
            <div className="space-y-3">
              {section.questions.map((item, i) => (
                <details key={i} className="group bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                  <summary className="flex items-center justify-between px-5 py-4 cursor-pointer font-semibold text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors list-none">
                    {item.q}
                    <span className="ml-2 text-gray-400 group-open:rotate-180 transition-transform">&#9660;</span>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-3">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.flatMap(s => s.questions.map(q => ({
              '@type': 'Question',
              name: q.q,
              acceptedAnswer: { '@type': 'Answer', text: q.a },
            }))),
          }),
        }}
      />
    </div>
  );
}
