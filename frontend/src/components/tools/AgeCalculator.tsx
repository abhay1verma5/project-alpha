'use client';

import { useState } from 'react';
import { Calculator, CheckCircle2, XCircle, Info } from 'lucide-react';

const CATEGORIES = [
  { value: 'general', label: 'General', relaxation: 0 },
  { value: 'obc', label: 'OBC (Non-Creamy)', relaxation: 3 },
  { value: 'sc', label: 'SC (Scheduled Caste)', relaxation: 5 },
  { value: 'st', label: 'ST (Scheduled Tribe)', relaxation: 5 },
  { value: 'ews', label: 'EWS', relaxation: 0 },
  { value: 'pwd', label: 'PwD (Disability)', relaxation: 10 },
  { value: 'pwd_obc', label: 'PwD + OBC', relaxation: 13 },
  { value: 'pwd_sc', label: 'PwD + SC/ST', relaxation: 15 },
  { value: 'ex_serviceman', label: 'Ex-Serviceman', relaxation: 5 },
];

const EXAM_AGE_LIMITS: Record<string, { min: number; max: number }> = {
  'SSC CGL': { min: 18, max: 32 },
  'SSC CHSL': { min: 18, max: 27 },
  'SSC MTS': { min: 18, max: 25 },
  'SSC GD': { min: 18, max: 23 },
  'UPSC CSE': { min: 21, max: 32 },
  'Railway NTPC': { min: 18, max: 33 },
  'Railway Group D': { min: 18, max: 33 },
  'IBPS PO': { min: 20, max: 30 },
  'IBPS Clerk': { min: 20, max: 28 },
  'SBI PO': { min: 21, max: 30 },
  'Delhi Police': { min: 18, max: 25 },
  'CTET': { min: 18, max: 99 },
  'Custom': { min: 18, max: 35 },
};

export function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [cutoffDate, setCutoffDate] = useState('');
  const [category, setCategory] = useState('general');
  const [exam, setExam] = useState('SSC CGL');
  const [customMax, setCustomMax] = useState(35);
  const [result, setResult] = useState<{
    years: number; months: number; days: number;
    eligible: boolean; maxAge: number; relaxedMax: number;
  } | null>(null);

  const calculate = () => {
    if (!dob || !cutoffDate) return;

    const birth = new Date(dob);
    const cutoff = new Date(cutoffDate);

    let years = cutoff.getFullYear() - birth.getFullYear();
    let months = cutoff.getMonth() - birth.getMonth();
    let days = cutoff.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(cutoff.getFullYear(), cutoff.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const catRelaxation = CATEGORIES.find(c => c.value === category)?.relaxation || 0;
    const limits = exam === 'Custom' ? { min: 18, max: customMax } : EXAM_AGE_LIMITS[exam];
    const relaxedMax = limits.max + catRelaxation;
    const eligible = years >= limits.min && years <= relaxedMax;

    setResult({ years, months, days, eligible, maxAge: limits.max, relaxedMax });
  };

  return (
    <div className="space-y-6">
      {/* Exam selector */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Select Exam</label>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.keys(EXAM_AGE_LIMITS).map((e) => (
            <button
              key={e}
              onClick={() => setExam(e)}
              className={`px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                exam === e
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {exam === 'Custom' && (
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">Max Age (General)</label>
          <input type="number" value={customMax} onChange={(e) => setCustomMax(+e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold" />
        </div>
      )}

      {/* Date inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Date of Birth</label>
          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base" />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Cut-off Date (from notification)</label>
          <input type="date" value={cutoffDate} onChange={(e) => setCutoffDate(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base" />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Category (for age relaxation)</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label} {c.relaxation > 0 ? `(+${c.relaxation} years)` : ''}
            </option>
          ))}
        </select>
      </div>

      {/* Calculate */}
      <button
        onClick={calculate}
        disabled={!dob || !cutoffDate}
        className="w-full py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        <Calculator className="w-5 h-5" /> Calculate Age & Eligibility
      </button>

      {/* Result */}
      {result && (
        <div className={`rounded-2xl border-2 p-6 ${
          result.eligible
            ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {result.eligible ? (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
            <div>
              <p className={`text-xl font-extrabold ${result.eligible ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                {result.eligible ? 'Eligible! ✓' : 'Not Eligible ✗'}
              </p>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                for {exam}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.years}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Years</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.months}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Months</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.days}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Days</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              Max age for General: <strong>{result.maxAge} years</strong>.
              With your category relaxation: <strong>{result.relaxedMax} years</strong>.
              Your age: <strong>{result.years} years {result.months} months {result.days} days</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
