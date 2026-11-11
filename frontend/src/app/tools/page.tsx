import type { Metadata } from 'next';
import Link from 'next/link';
import { Camera, Calculator, IndianRupee, FileText, Combine, Wrench, ChevronRight, CheckCircle2, ClipboardCheck, Activity, PercentCircle, Keyboard, FileDown, Dumbbell, Scale, Hash, GitCompare, BarChart3, Target, Route, Compass } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free Tools for Government Job Aspirants — SarkariAlert',
  description: 'Free tools: Photo resizer, Age calculator, Salary calculator for government job applicants. No signup, 100% free, works offline.',
};

const TOOLS = [
  {
    href: '/tools/photo-resizer',
    icon: Camera,
    title: 'Photo & Signature Resizer',
    description: 'Select your exam (SSC, UPSC, Railway, Bank, etc.) — auto-fills exact photo & signature size, KB limit, and dimensions. Upload → resize → download. No signup needed.',
    color: 'bg-blue-600',
    badge: '100% Private — No Upload to Server',
    features: ['Auto-detect exam photo specs', 'JPG/PNG resize to exact KB', 'Signature crop & resize', 'Works offline on phone'],
  },
  {
    href: '/tools/age-calculator',
    icon: Calculator,
    title: 'Age Calculator for Govt Exams',
    description: 'Select exam name → auto-fills cut-off date, age limit, and category relaxation (SC/ST/OBC/PwD/Ex-Serviceman). Shows if you are eligible instantly.',
    color: 'bg-green-600',
    badge: 'All Exams — Auto Cut-off Date',
    features: ['Pre-loaded exam cut-off dates', 'SC/ST/OBC/PwD relaxation', 'Shows Years-Months-Days', 'Eligibility check: Yes/No'],
  },
  {
    href: '/tools/salary-calculator',
    icon: IndianRupee,
    title: '7th CPC Salary Calculator',
    description: 'Select post name (Constable, Clerk, SSC CGL, etc.) → auto-fills pay level. Shows Basic Pay, DA (56%), HRA, Gross, NPS deduction, and exact in-hand salary.',
    color: 'bg-purple-600',
    badge: 'Level 1–14 — Updated DA 56%',
    features: ['Select post → auto pay level', 'DA + HRA + TA breakdown', 'NPS & tax deductions', 'City-wise HRA (X/Y/Z)'],
  },
  {
    href: '/tools/jpg-to-pdf',
    icon: FileText,
    title: 'JPG to PDF Converter',
    description: 'Combine multiple JPG/PNG images into a single PDF. One image per A4 page, perfect for uploading documents to government job application portals.',
    color: 'bg-red-600',
    badge: '100% Private — No Upload to Server',
    features: ['Multiple images to one PDF', 'Drag & drop or browse files', 'Reorder pages easily', 'Works offline on phone'],
  },
  {
    href: '/tools/photo-signature',
    icon: Combine,
    title: 'Photo + Signature Combiner',
    description: 'Upload passport photo and signature separately — combines them into one image at exact dimensions and KB limits required by SSC, UPSC, Railway, Banking forms.',
    color: 'bg-teal-600',
    badge: '100% Private — No Upload to Server',
    features: ['Exam-wise preset specs', 'Photo + signature in one image', 'Download combined or separately', 'Works offline on phone'],
  },
  {
    href: '/tools/eligibility-checker',
    icon: ClipboardCheck,
    title: 'Eligibility Checker',
    description: 'Enter your age, qualification, and category — instantly see which government exams you are eligible for. Covers 60+ exams with age relaxation.',
    color: 'bg-indigo-600',
    badge: '60+ Exams — Auto Category Relaxation',
    features: ['Age + qualification + category check', 'OBC/SC/ST/PwD relaxation applied', 'Shows all eligible exams', 'Salary range included'],
  },
  {
    href: '/tools/answer-key-calculator',
    icon: Hash,
    title: 'Answer Key Calculator',
    description: 'Upload or enter your answers against the official answer key. Auto-calculates marks with negative marking for SSC, Railway, Banking exams.',
    color: 'bg-orange-600',
    badge: 'Negative Marking — Auto Calculate',
    features: ['Exam-wise marking scheme', 'Negative marking applied', 'Section-wise score breakdown', 'Cut-off comparison'],
  },
  {
    href: '/tools/bmi-calculator',
    icon: Activity,
    title: 'BMI Calculator',
    description: 'Calculate your Body Mass Index for police, CAPF, and defence physical tests. Shows if you meet the BMI requirements for government jobs.',
    color: 'bg-pink-600',
    badge: 'Police & Defence Standards',
    features: ['Height + weight input', 'BMI category (underweight/normal/overweight)', 'Govt job physical standards', 'Tips to achieve target BMI'],
  },
  {
    href: '/tools/cgpa-to-percentage',
    icon: PercentCircle,
    title: 'CGPA to Percentage Converter',
    description: 'Convert CGPA to percentage for government job applications. Supports CBSE, university, and custom scale conversions.',
    color: 'bg-cyan-600',
    badge: 'CBSE / University / Custom Scale',
    features: ['CBSE 10-point scale', 'University 4-point scale', 'Custom multiplier option', 'Percentage to CGPA reverse'],
  },
  {
    href: '/tools/hindi-typing-test',
    icon: Keyboard,
    title: 'Hindi Typing Test',
    description: 'Practice Hindi typing (Kruti Dev / Mangal) for SSC CHSL, SSC Steno, and other government typing tests. Track WPM and accuracy.',
    color: 'bg-amber-600',
    badge: 'Kruti Dev & Mangal — WPM Tracker',
    features: ['Kruti Dev 010 layout', 'Mangal/Unicode layout', 'WPM & accuracy tracking', 'Exam-wise speed targets'],
  },
  {
    href: '/tools/pdf-compressor',
    icon: FileDown,
    title: 'PDF Compressor',
    description: 'Compress PDF files to reduce size for uploading to government job portals. Most portals have 200KB-2MB limits.',
    color: 'bg-slate-600',
    badge: '100% Private — No Upload to Server',
    features: ['Reduce PDF size by 50-90%', 'Meets portal size limits', 'No quality loss option', 'Works offline on phone'],
  },
  {
    href: '/tools/percentage-calculator',
    icon: Scale,
    title: 'Percentage Calculator',
    description: 'Calculate percentage from marks obtained and total marks. Useful for checking eligibility criteria (minimum 60%, 50%, etc.).',
    color: 'bg-emerald-600',
    badge: 'Marks to Percentage — Instant',
    features: ['Marks → Percentage', 'Percentage → Marks', 'Aggregate of multiple subjects', 'Minimum eligibility checker'],
  },
  {
    href: '/tools/physical-test-calculator',
    icon: Dumbbell,
    title: 'Physical Test Calculator',
    description: 'Check physical standards (height, chest, weight, running time) for police, army, CAPF, and railway jobs. Category and state-wise standards.',
    color: 'bg-rose-600',
    badge: 'Police / Army / CAPF Standards',
    features: ['Height & chest requirements', 'Running time targets', 'Category-wise relaxation', 'State police standards'],
  },
  {
    href: '/tools/exam-similarity',
    icon: GitCompare,
    title: 'Exam Similarity Finder',
    description: 'Find which exams share syllabus overlap. Preparing for SSC CGL? See CHSL, CPO, MTS have 70-80% common syllabus. Apply to more exams with same preparation.',
    color: 'bg-violet-600',
    badge: '30+ Exams — Overlap Analysis',
    features: ['Syllabus overlap percentage', 'Common subjects highlighted', 'Difficulty comparison', 'Salary range comparison'],
  },
  {
    href: '/tools/score-normalizer',
    icon: BarChart3,
    title: 'Score Normalization Calculator',
    description: 'Calculate normalized score for SSC & Railway multi-shift exams. Enter raw marks, shift details — get your normalized score instantly.',
    color: 'bg-sky-600',
    badge: 'SSC / Railway — Official Formula',
    features: ['SSC normalization formula', 'Railway CBT normalization', 'Percentile estimation', 'Step-by-step breakdown'],
  },
  {
    href: '/tools/rank-predictor',
    icon: Target,
    title: 'Rank Predictor',
    description: 'Enter your exam marks and category — predict your rank and selection probability. Based on historical cutoff data for SSC, UPSC, Banking, Railway.',
    color: 'bg-fuchsia-600',
    badge: 'Historical Data — Category-wise',
    features: ['Estimated rank range', 'Selection probability %', 'Category-wise cutoff comparison', 'Marks needed for safe zone'],
  },
  {
    href: '/tools/career-path',
    icon: Route,
    title: 'Career Path Finder',
    description: 'Select your qualification — see ALL government job options with salary, difficulty, and preparation timeline. Interactive career tree visualization.',
    color: 'bg-lime-600',
    badge: '8th to Post-Grad — All Options',
    features: ['Qualification-based filtering', 'Salary & difficulty comparison', 'Preparation timeline', 'Sector-wise grouping'],
  },
  {
    href: '/tools/exam-recommender',
    icon: Compass,
    title: 'AI Exam Recommender',
    description: '5-minute quiz to find your ideal government exam. Enter age, qualification, preferences — get personalized exam recommendations with match scores.',
    color: 'bg-yellow-600',
    badge: 'AI-Powered — Personalized',
    features: ['7-step assessment quiz', 'Top 5 exam matches', 'Match score percentage', 'Shareable result card'],
  },
];

export default function ToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#ff6f00] flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">Free Tools</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Essential tools for government job aspirants. Free forever, no signup, works on mobile.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-5 sm:p-6 hover:border-[#ff6f00] dark:hover:border-[#ff6f00] transition-all active:scale-[0.98] hover:shadow-lg"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-12 h-12 rounded-xl ${tool.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <tool.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-[#ff6f00] transition-colors">
                  {tool.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-green-100 text-green-800 dark:bg-green-800/60 dark:text-green-100">
                  {tool.badge}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">{tool.description}</p>

            <ul className="space-y-1.5 mb-4">
              {tool.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-1 text-sm font-bold text-[#ff6f00] group-hover:gap-2 transition-all">
              Open Tool <ChevronRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* More tools */}
      <div className="mt-8 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
          {TOOLS.length} Free Tools — No signup, no ads, works on mobile. New tools added regularly.
        </p>
      </div>
    </div>
  );
}
