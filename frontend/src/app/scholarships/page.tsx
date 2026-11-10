import type { Metadata } from 'next';
import Link from 'next/link';
import {
  GraduationCap, ExternalLink, BookOpen, Users, MapPin,
  Award, IndianRupee, ChevronRight, School, Building2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Government Scholarships 2026-27 — Class-wise, State-wise Schemes & Apply Links',
  description:
    'Complete list of Indian government scholarships for students — class 1 to PhD. Central & state schemes for SC/ST/OBC/Minority/EWS. NSP, Post Matric, Pre Matric, Merit-cum-Means and more. Direct apply links.',
  alternates: {
    canonical: 'https://sarkarialert.online/scholarships',
  },
  openGraph: {
    title: 'Government Scholarships 2026-27-27 — All Schemes with Apply Links',
    description: 'Complete guide to Indian government scholarships — class-wise, state-wise, category-wise. Direct apply links to NSP portal.',
    url: 'https://sarkarialert.online/scholarships',
  },
};

interface Scholarship {
  name: string;
  nameHi: string;
  provider: string;
  eligibility: string;
  amount: string;
  classLevel: string[];
  category: string[];
  applyLink: string;
  deadline?: string;
}

// ── Central Government Scholarships ───────────────────────────────────
const CENTRAL_SCHOLARSHIPS: Scholarship[] = [
  {
    name: 'Pre Matric Scholarship for SC Students',
    nameHi: 'SC छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Social Justice & Empowerment',
    eligibility: 'SC students, Class 1-10, Family income < ₹2.5 Lakh',
    amount: '₹750-1,000/month + ₹1,000 ad-hoc grant',
    classLevel: ['1-5', '6-10'],
    category: ['SC'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Post Matric Scholarship for SC Students',
    nameHi: 'SC छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Social Justice & Empowerment',
    eligibility: 'SC students, Class 11 to PhD, Family income < ₹2.5 Lakh',
    amount: 'Full tuition + ₹1,200/month maintenance',
    classLevel: ['11-12', 'UG', 'PG', 'PhD'],
    category: ['SC'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Pre Matric Scholarship for ST Students',
    nameHi: 'ST छात्रों के लिए प्री-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Tribal Affairs',
    eligibility: 'ST students, Class 9-10, Family income < ₹2.5 Lakh',
    amount: '₹500-800/month + ad-hoc grant',
    classLevel: ['6-10'],
    category: ['ST'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Post Matric Scholarship for ST Students',
    nameHi: 'ST छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Tribal Affairs',
    eligibility: 'ST students, Class 11 to PhD, Family income < ₹2.5 Lakh',
    amount: 'Full tuition + ₹1,200/month maintenance',
    classLevel: ['11-12', 'UG', 'PG', 'PhD'],
    category: ['ST'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Post Matric Scholarship for OBC Students',
    nameHi: 'OBC छात्रों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Social Justice & Empowerment',
    eligibility: 'OBC students, Class 11+, Family income < ₹1.5 Lakh',
    amount: '₹400-1,200/month + tuition fees',
    classLevel: ['11-12', 'UG', 'PG'],
    category: ['OBC'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Merit-cum-Means Scholarship for Minorities',
    nameHi: 'अल्पसंख्यकों के लिए मेरिट-कम-मीन्स छात्रवृत्ति',
    provider: 'Ministry of Minority Affairs',
    eligibility: 'Minority students (Muslim, Christian, Sikh, Buddhist, Jain, Parsi), Professional/Technical courses, Income < ₹2.5 Lakh',
    amount: 'Full course fee up to ₹20,000 + ₹1,000/month maintenance',
    classLevel: ['UG', 'PG'],
    category: ['Minority'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Pre Matric Scholarship for Minorities',
    nameHi: 'अल्पसंख्यकों के लिए प्री-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Minority Affairs',
    eligibility: 'Minority students, Class 1-10, Income < ₹1 Lakh',
    amount: '₹1,000-10,700/year (admission + tuition + maintenance)',
    classLevel: ['1-5', '6-10'],
    category: ['Minority'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Post Matric Scholarship for Minorities',
    nameHi: 'अल्पसंख्यकों के लिए पोस्ट-मैट्रिक छात्रवृत्ति',
    provider: 'Ministry of Minority Affairs',
    eligibility: 'Minority students, Class 11+, Income < ₹2 Lakh',
    amount: 'Full tuition + ₹1,200/month maintenance',
    classLevel: ['11-12', 'UG', 'PG', 'PhD'],
    category: ['Minority'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'Central Sector Scheme (CSSS)',
    nameHi: 'केंद्रीय क्षेत्र योजना छात्रवृत्ति',
    provider: 'Ministry of Education (MHRD)',
    eligibility: 'Top 20% of Class 12 Board, Family income < ₹8 Lakh',
    amount: '₹12,000/year (UG) → ₹20,000/year (PG) → ₹25,000/year (Professional)',
    classLevel: ['UG', 'PG'],
    category: ['General', 'SC', 'ST', 'OBC', 'EWS'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'PM Scholarship Scheme (PMSS) for RPF/CAPF',
    nameHi: 'RPF/CAPF वार्ड के लिए PM छात्रवृत्ति',
    provider: 'Ministry of Defence / Home Affairs',
    eligibility: 'Wards of ex-servicemen, RPF, CAPF personnel',
    amount: '₹3,000/month (Boys) ₹3,600/month (Girls)',
    classLevel: ['UG', 'PG'],
    category: ['Defence Wards'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'National Means-cum-Merit Scholarship (NMMSS)',
    nameHi: 'राष्ट्रीय मीन्स-कम-मेरिट छात्रवृत्ति',
    provider: 'Ministry of Education',
    eligibility: 'Class 8 students of govt schools, Family income < ₹3.5 Lakh, Score > 55%',
    amount: '₹12,000/year (Class 9-12)',
    classLevel: ['6-10', '11-12'],
    category: ['General', 'SC', 'ST', 'OBC', 'EWS'],
    applyLink: 'https://scholarships.gov.in/',
  },
  {
    name: 'PM YASASVI Scholarship (Top Class)',
    nameHi: 'PM यशस्वी छात्रवृत्ति (टॉप क्लास)',
    provider: 'Ministry of Social Justice & Empowerment',
    eligibility: 'OBC/EBC/DNT students in top institutions, Income < ₹2.5 Lakh',
    amount: 'Full tuition + ₹3,000/month maintenance',
    classLevel: ['UG', 'PG', 'PhD'],
    category: ['OBC', 'EWS'],
    applyLink: 'https://yet.nta.ac.in/',
  },
  {
    name: 'Pragati Scholarship for Girls (AICTE)',
    nameHi: 'लड़कियों के लिए प्रगति छात्रवृत्ति (AICTE)',
    provider: 'AICTE',
    eligibility: 'Girl students in AICTE-approved technical institutions, Income < ₹8 Lakh',
    amount: '₹50,000/year',
    classLevel: ['UG'],
    category: ['General', 'SC', 'ST', 'OBC', 'EWS'],
    applyLink: 'https://www.aicte-india.org/schemes/students-development-schemes/Pragati',
  },
  {
    name: 'Saksham Scholarship for PwD (AICTE)',
    nameHi: 'दिव्यांगजनों के लिए सक्षम छात्रवृत्ति (AICTE)',
    provider: 'AICTE',
    eligibility: 'Differently-abled students (≥40% disability) in technical courses, Income < ₹8 Lakh',
    amount: '₹50,000/year',
    classLevel: ['UG'],
    category: ['PwD'],
    applyLink: 'https://www.aicte-india.org/schemes/students-development-schemes/Saksham',
  },
  {
    name: 'INSPIRE Scholarship (DST)',
    nameHi: 'इंस्पायर छात्रवृत्ति (DST)',
    provider: 'Department of Science & Technology',
    eligibility: 'Top 1% in Class 12 Board pursuing BSc/BS/Integrated MS',
    amount: '₹80,000/year (SHE scholarship)',
    classLevel: ['UG'],
    category: ['General', 'SC', 'ST', 'OBC'],
    applyLink: 'https://online-inspire.gov.in/',
  },
  {
    name: 'Ishan Uday Scholarship (NE Region)',
    nameHi: 'ईशान उदय छात्रवृत्ति (पूर्वोत्तर)',
    provider: 'UGC',
    eligibility: 'Students from NE states pursuing UG, Family income < ₹4.5 Lakh',
    amount: '₹5,400/month (General) ₹7,800/month (Professional)',
    classLevel: ['UG'],
    category: ['NE Region'],
    applyLink: 'https://scholarships.gov.in/',
  },
];

// ── State Scholarship Portals ────────────────────────────────────────
const STATE_PORTALS = [
  { state: 'Uttar Pradesh', portal: 'UP Scholarship', link: 'https://scholarship.up.gov.in/', schemes: 'Pre Matric, Post Matric, Das Lakshya' },
  { state: 'Bihar', portal: 'Bihar e-Kalyan', link: 'https://ekalyan.bih.nic.in/', schemes: 'Post Matric, Mukhyamantri Kanya Utthan' },
  { state: 'Rajasthan', portal: 'SJE Rajasthan', link: 'https://sje.rajasthan.gov.in/Scholarship', schemes: 'Post Matric, Devnarayan, CM Higher Education' },
  { state: 'Madhya Pradesh', portal: 'MP Scholarship 2.0', link: 'https://scholarshipportal.mp.nic.in/', schemes: 'Post Matric, Gaon Ki Beti, Pratibha Kiran' },
  { state: 'Maharashtra', portal: 'MahaDBT', link: 'https://mahadbt.maharashtra.gov.in/', schemes: 'Post Matric, Rajarshi Shahu Maharaj, Rajiv Gandhi' },
  { state: 'West Bengal', portal: 'WB eDistrict', link: 'https://scholarships.wbsed.gov.in/', schemes: 'Aikyashree, Swami Vivekananda Merit-cum-Means' },
  { state: 'Karnataka', portal: 'SSP Karnataka', link: 'https://ssp.karnataka.gov.in/', schemes: 'Post Matric, Vidyasiri' },
  { state: 'Tamil Nadu', portal: 'TN eSevai', link: 'https://www.tn.gov.in/scheme/data_view/7189', schemes: 'BC/MBC/DNC, SC/ST, Minority scholarships' },
  { state: 'Telangana', portal: 'ePASS Telangana', link: 'https://telanganaepass.cgg.gov.in/', schemes: 'Post Matric, ePASS' },
  { state: 'Andhra Pradesh', portal: 'AP ePASS', link: 'https://apepass.cgg.gov.in/', schemes: 'Pre Matric, Post Matric, Jagananna Vidya Deevena' },
  { state: 'Gujarat', portal: 'Digital Gujarat', link: 'https://digitalgujarat.gov.in/', schemes: 'Post Matric, Mukhyamantri Yuva Swavalamban' },
  { state: 'Punjab', portal: 'Punjab Scholarship', link: 'https://scholarships.gov.in/', schemes: 'Post Matric, Ashirwad' },
  { state: 'Haryana', portal: 'Haryana Scholarship', link: 'https://scholarships.gov.in/', schemes: 'Post Matric, Consolidated Stipend' },
  { state: 'Odisha', portal: 'Odisha Scholarship', link: 'https://scholarship.odisha.gov.in/', schemes: 'Pre Matric, Post Matric, Green Passage' },
  { state: 'Jharkhand', portal: 'eKalyan Jharkhand', link: 'https://ekalyan.cgg.gov.in/', schemes: 'Post Matric, CM Merit Scholarship' },
  { state: 'Chhattisgarh', portal: 'CG Scholarship', link: 'https://scholarships.gov.in/', schemes: 'Post Matric' },
  { state: 'Assam', portal: 'Assam Scholarship', link: 'https://scholarships.gov.in/', schemes: 'Pre Matric, Post Matric' },
  { state: 'Kerala', portal: 'Kerala DCE', link: 'https://dcescholarship.kerala.gov.in/', schemes: 'Post Matric, eGrantz' },
  { state: 'Delhi', portal: 'Delhi e-District', link: 'https://edistrict.delhigovt.nic.in/', schemes: 'SC/ST Merit, OBC Merit Scholarship' },
  { state: 'Uttarakhand', portal: 'UK Scholarship', link: 'https://scholarships.gov.in/', schemes: 'Post Matric, CM Medhavi Chattra' },
];

const CLASS_LEVELS = [
  { key: '1-5', label: 'Class 1-5' },
  { key: '6-10', label: 'Class 6-10' },
  { key: '11-12', label: 'Class 11-12' },
  { key: 'UG', label: 'Graduation (UG)' },
  { key: 'PG', label: 'Post Graduation (PG)' },
  { key: 'PhD', label: 'PhD / Research' },
];

const CATEGORIES = [
  { key: 'SC', label: 'SC' },
  { key: 'ST', label: 'ST' },
  { key: 'OBC', label: 'OBC' },
  { key: 'Minority', label: 'Minority' },
  { key: 'EWS', label: 'EWS / General' },
  { key: 'Defence Wards', label: 'Defence Wards' },
  { key: 'PwD', label: 'PwD (Disabled)' },
];

interface Props {
  searchParams: Promise<Record<string, string>>;
}

export default async function ScholarshipsPage(props: Props) {
  const params = await props.searchParams;
  const filterClass = params.class || '';
  const filterCategory = params.category || '';

  const filtered = CENTRAL_SCHOLARSHIPS.filter((s) => {
    if (filterClass && !s.classLevel.includes(filterClass)) return false;
    if (filterCategory && !s.category.includes(filterCategory)) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 py-8 sm:py-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/30 rounded-full" />
          <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/20 rounded-full" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-100 text-sm font-medium mb-4">
            <Award className="w-4 h-4" />
            Government Scholarships 2026
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3">
            Scholarships & Schemes
          </h1>
          <p className="text-base sm:text-lg text-emerald-100 max-w-2xl mx-auto">
            Complete list of central & state government scholarships — class-wise, category-wise with direct apply links to NSP portal.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Apply Links */}
        <div className="mb-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-emerald-600" />
            Quick Apply Portals
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <a href="https://scholarships.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 text-sm font-bold hover:bg-emerald-100 transition-colors">
              <Building2 className="w-4 h-4" />
              NSP Portal
            </a>
            <a href="https://scholarship.up.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-blue-800 dark:text-blue-300 text-sm font-bold hover:bg-blue-100 transition-colors">
              <School className="w-4 h-4" />
              UP Scholarship
            </a>
            <a href="https://ekalyan.bih.nic.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900 text-purple-800 dark:text-purple-300 text-sm font-bold hover:bg-purple-100 transition-colors">
              <School className="w-4 h-4" />
              Bihar e-Kalyan
            </a>
            <a href="https://mahadbt.maharashtra.gov.in/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300 text-sm font-bold hover:bg-amber-100 transition-colors">
              <School className="w-4 h-4" />
              MahaDBT
            </a>
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3 mb-8">
          {/* Class Level Filter */}
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              <Link
                href="/scholarships"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                  !filterClass
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                }`}
              >
                All Classes
              </Link>
              {CLASS_LEVELS.map((cl) => (
                <Link
                  key={cl.key}
                  href={`/scholarships?class=${cl.key}${filterCategory ? `&category=${filterCategory}` : ''}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    filterClass === cl.key
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                  }`}
                >
                  {cl.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              <Link
                href={`/scholarships${filterClass ? `?class=${filterClass}` : ''}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                  !filterCategory
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                }`}
              >
                All Categories
              </Link>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.key}
                  href={`/scholarships?${filterClass ? `class=${filterClass}&` : ''}category=${cat.key}`}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all border ${
                    filterCategory === cat.key
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Central Scholarships */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-600" />
          Central Government Scholarships
          <span className="text-sm font-normal text-gray-500">({filtered.length} schemes)</span>
        </h2>

        <div className="space-y-3 mb-12">
          {filtered.map((s, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                    {s.name}
                  </h3>
                  <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mb-2">{s.provider}</p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {s.classLevel.map((cl) => (
                      <span key={cl} className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                        {cl}
                      </span>
                    ))}
                    {s.category.map((cat) => (
                      <span key={cat} className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
                        {cat}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    <span className="font-semibold">Eligibility:</span> {s.eligibility}
                  </p>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <IndianRupee className="w-3.5 h-3.5" />
                    {s.amount}
                  </p>
                </div>

                <a
                  href={s.applyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition-colors"
                >
                  Apply
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* State Portals */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          State Scholarship Portals
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 mb-12">
          {STATE_PORTALS.map((sp, i) => (
            <a
              key={i}
              href={sp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-base text-gray-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                  {sp.state}
                </h3>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </div>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 mb-1">{sp.portal}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{sp.schemes}</p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-800 rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Looking for Government Jobs?
          </h2>
          <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
            Browse thousands of sarkari naukri notifications with eligibility, salary, and direct apply links.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ff6f00] text-white font-semibold hover:bg-[#e65100] transition-colors shadow-lg"
          >
            Browse All Jobs
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How to apply for government scholarships in India?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Visit the National Scholarship Portal (NSP) at scholarships.gov.in. Register with your Aadhaar number, fill in personal and academic details, upload documents, and submit. Each state also has its own portal for state-specific schemes.',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the last date for NSP scholarship 2026?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'The NSP portal typically opens in August-September each year. Fresh applications usually close by November-December, and renewal by October-November. Check scholarships.gov.in for exact dates.',
                },
              },
              {
                '@type': 'Question',
                name: 'Which scholarships are available for SC/ST students?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'SC/ST students can apply for Pre Matric Scholarship (Class 1-10), Post Matric Scholarship (Class 11 to PhD), Top Class Education Scheme, and various state-level scholarships. Most cover full tuition fees plus a monthly maintenance allowance.',
                },
              },
            ],
          }),
        }}
      />
    </div>
  );
}
