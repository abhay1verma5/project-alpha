import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CATEGORY_LABELS: Record<string, string> = {
  railway: 'Railway',
  ssc: 'SSC',
  banking: 'Banking',
  defence: 'Defence',
  upsc: 'UPSC',
  state_psc: 'State PSC',
  teaching: 'Teaching',
  police: 'Police',
  health: 'Health & Medical',
  engineering: 'Engineering',
  medical: 'Medical / Nursing',
  university: 'University / College',
  gramin: 'Gram Panchayat / Rural',
  other: 'Other',
};

export const CATEGORY_COLORS: Record<string, string> = {
  railway: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  ssc: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  banking: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  defence: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  upsc: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  state_psc: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  teaching: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  police: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  health: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200',
  engineering: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
  medical: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200',
  university: 'bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200',
  gramin: 'bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200',
  other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
};

export const STATE_LABELS: Record<string, string> = {
  all_india: 'All India',
  andhra_pradesh: 'Andhra Pradesh',
  arunachal_pradesh: 'Arunachal Pradesh',
  assam: 'Assam',
  bihar: 'Bihar',
  chhattisgarh: 'Chhattisgarh',
  goa: 'Goa',
  gujarat: 'Gujarat',
  haryana: 'Haryana',
  himachal_pradesh: 'Himachal Pradesh',
  jharkhand: 'Jharkhand',
  karnataka: 'Karnataka',
  kerala: 'Kerala',
  madhya_pradesh: 'Madhya Pradesh',
  maharashtra: 'Maharashtra',
  manipur: 'Manipur',
  meghalaya: 'Meghalaya',
  mizoram: 'Mizoram',
  nagaland: 'Nagaland',
  odisha: 'Odisha',
  punjab: 'Punjab',
  rajasthan: 'Rajasthan',
  sikkim: 'Sikkim',
  tamil_nadu: 'Tamil Nadu',
  telangana: 'Telangana',
  tripura: 'Tripura',
  uttar_pradesh: 'Uttar Pradesh',
  uttarakhand: 'Uttarakhand',
  west_bengal: 'West Bengal',
  delhi: 'Delhi',
  jammu_kashmir: 'Jammu & Kashmir',
  ladakh: 'Ladakh',
  chandigarh: 'Chandigarh',
  puducherry: 'Puducherry',
  andaman_nicobar: 'Andaman & Nicobar',
  dadra_nagar_haveli: 'Dadra & Nagar Haveli',
  lakshadweep: 'Lakshadweep',
};

export const CATEGORY_ICONS: Record<string, string> = {
  railway: '🚂',
  ssc: '📋',
  banking: '🏦',
  defence: '🎖️',
  upsc: '🏛️',
  state_psc: '🏢',
  teaching: '📚',
  police: '👮',
  health: '🏥',
  engineering: '⚙️',
  medical: '💊',
  university: '🎓',
  gramin: '🌾',
  other: '📌',
};

// Comprehensive qualification groups for filtering
export const QUALIFICATION_GROUPS = [
  { group: 'School Level', options: [
    { value: '8th', label: '8th Pass' },
    { value: '10th', label: '10th Pass / Matric' },
    { value: '12th', label: '12th Pass / Intermediate' },
    { value: '12th Science', label: '12th (Science)' },
    { value: '12th Arts', label: '12th (Arts)' },
    { value: '12th Commerce', label: '12th (Commerce)' },
  ]},
  { group: 'Diploma / ITI', options: [
    { value: 'ITI', label: 'ITI' },
    { value: 'Diploma', label: 'Diploma (Polytechnic)' },
    { value: 'D.Pharm', label: 'D.Pharm' },
    { value: 'GNM', label: 'GNM (Nursing)' },
    { value: 'ANM', label: 'ANM (Nursing)' },
  ]},
  { group: 'Graduation (UG)', options: [
    { value: 'Graduate', label: 'Any Graduate' },
    { value: 'BA', label: 'BA (Arts)' },
    { value: 'B.Sc', label: 'B.Sc (Science)' },
    { value: 'B.Com', label: 'B.Com (Commerce)' },
    { value: 'B.Tech', label: 'B.Tech / B.E' },
    { value: 'BCA', label: 'BCA' },
    { value: 'BBA', label: 'BBA' },
    { value: 'B.Ed', label: 'B.Ed' },
    { value: 'BTC', label: 'BTC / D.El.Ed' },
    { value: 'LLB', label: 'LLB (Law)' },
    { value: 'MBBS', label: 'MBBS' },
    { value: 'BDS', label: 'BDS (Dental)' },
    { value: 'BAMS', label: 'BAMS (Ayurveda)' },
    { value: 'BHMS', label: 'BHMS (Homeopathy)' },
    { value: 'B.Pharm', label: 'B.Pharm' },
    { value: 'B.Sc Nursing', label: 'B.Sc Nursing' },
  ]},
  { group: 'Post Graduation (PG)', options: [
    { value: 'Post Graduate', label: 'Any PG / Master' },
    { value: 'MA', label: 'MA (Arts)' },
    { value: 'M.Sc', label: 'M.Sc (Science)' },
    { value: 'M.Com', label: 'M.Com' },
    { value: 'M.Tech', label: 'M.Tech / M.E' },
    { value: 'MBA', label: 'MBA' },
    { value: 'MCA', label: 'MCA' },
    { value: 'M.Ed', label: 'M.Ed' },
    { value: 'LLM', label: 'LLM' },
    { value: 'MD', label: 'MD / MS (Medical PG)' },
  ]},
  { group: 'Research / PhD', options: [
    { value: 'PhD', label: 'PhD / Doctorate' },
    { value: 'NET', label: 'UGC NET / SET' },
  ]},
];

// Sort options
export const SORT_OPTIONS = [
  { value: '-posted_date', label: 'Latest First' },
  { value: 'last_date', label: 'Deadline (Nearest)' },
  { value: '-vacancies', label: 'Most Vacancies' },
  { value: 'posted_date', label: 'Oldest First' },
];

export function formatDate(dateStr: string | null): string {
  if (!dateStr) return 'N/A';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatNumber(num: number | null): string {
  if (num === null || num === undefined) return 'N/A';
  return num.toLocaleString('en-IN');
}
