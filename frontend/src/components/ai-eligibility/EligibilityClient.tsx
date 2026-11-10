'use client';

import { useState } from 'react';
import { Sparkles, Loader2, CheckCircle2, XCircle, Trophy, RotateCcw, Lightbulb, IndianRupee, Calendar } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { tr } from '@/lib/translations';
import { cn } from '@/lib/utils';

const QUALIFICATIONS = [
  '8th', '10th', '12th', 'ITI', 'Diploma', 'D.Pharm', 'GNM', 'ANM',
  'Graduate', 'BA', 'B.Sc', 'B.Com', 'B.Tech', 'BCA', 'BBA', 'B.Ed', 'BTC', 'LLB',
  'MBBS', 'BDS', 'BAMS', 'BHMS', 'B.Pharm', 'B.Sc Nursing',
  'Post Graduate', 'MA', 'M.Sc', 'M.Com', 'M.Tech', 'MBA', 'MCA', 'M.Ed', 'LLM', 'MD', 'PhD',
];

const STATES = [
  'Uttar Pradesh', 'Bihar', 'Rajasthan', 'Madhya Pradesh', 'Maharashtra', 'Delhi',
  'Haryana', 'Punjab', 'Tamil Nadu', 'Karnataka', 'West Bengal', 'Gujarat',
  'Kerala', 'Andhra Pradesh', 'Telangana', 'Odisha', 'Jharkhand', 'Chhattisgarh',
  'Assam', 'Uttarakhand', 'Himachal Pradesh', 'Jammu & Kashmir', 'Goa',
];

interface ExamResult {
  name: string;
  eligible: boolean;
  salary_range: string;
  age_range: string;
  tips: string;
  reason: string;
}

interface EligibilityResponse {
  total_eligible: number;
  top_pick: string;
  top_pick_reason: string;
  exams: ExamResult[];
  source: string;
}

export function EligibilityClient() {
  const { lang } = useLanguage();
  const [dob, setDob] = useState('');
  const [qualification, setQualification] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EligibilityResponse | null>(null);
  const [error, setError] = useState('');
  const [showAll, setShowAll] = useState(false);

  const checkEligibility = async () => {
    if (!dob || !qualification || !category || !gender) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/ai-eligibility', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dob, qualification, category, gender, state, lang }),
      });
      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch {
      setError(tr('common.error', lang));
    }
    setLoading(false);
  };

  const reset = () => {
    setResult(null);
    setShowAll(false);
  };

  // ── FORM ──
  if (!result) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 space-y-5">
          {/* DOB */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{tr('elig.dob', lang)}</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 font-medium"
            />
          </div>

          {/* Qualification */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{tr('elig.qualification', lang)}</label>
            <select
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 font-medium"
            >
              <option value="">{lang === 'hi' ? '— चुनें —' : '— Select —'}</option>
              {QUALIFICATIONS.map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{tr('elig.category', lang)}</label>
            <div className="grid grid-cols-4 gap-2">
              {['General', 'OBC', 'SC', 'ST'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    'px-3 py-2.5 rounded-xl border-2 text-sm font-bold transition-all active:scale-95',
                    category === cat
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  )}
                >
                  {tr(`elig.${cat.toLowerCase()}`, lang) || cat}
                </button>
              ))}
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{tr('elig.gender', lang)}</label>
            <div className="grid grid-cols-3 gap-2">
              {['Male', 'Female', 'Other'].map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  className={cn(
                    'px-3 py-2.5 rounded-xl border-2 text-sm font-bold transition-all active:scale-95',
                    gender === g
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                      : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                  )}
                >
                  {tr(`elig.${g.toLowerCase()}`, lang)}
                </button>
              ))}
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">{tr('elig.state', lang)}</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-purple-500 font-medium"
            >
              <option value="">{lang === 'hi' ? '— चुनें (वैकल्पिक) —' : '— Select (optional) —'}</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm font-semibold">
              {error}
            </div>
          )}

          <button
            onClick={checkEligibility}
            disabled={!dob || !qualification || !category || !gender || loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-base shadow-lg disabled:opacity-50 active:scale-[0.98] transition-all"
          >
            {loading ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> {tr('elig.checking', lang)}</>
            ) : (
              <><Sparkles className="w-5 h-5" /> {tr('elig.check', lang)}</>
            )}
          </button>
        </div>
      </div>
    );
  }

  // ── RESULTS ──
  const eligibleExams = result.exams.filter((e) => e.eligible);
  const notEligible = result.exams.filter((e) => !e.eligible);
  const displayExams = showAll ? result.exams : eligibleExams;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Score card */}
      <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold opacity-80">{tr('elig.totalEligible', lang)}</p>
            <p className="text-5xl font-extrabold">{result.total_eligible}</p>
          </div>
          <Trophy className="w-14 h-14 text-yellow-300 opacity-80" />
        </div>
        {result.top_pick && result.top_pick !== 'None found' && (
          <div className="bg-white/15 rounded-xl p-4">
            <p className="text-xs font-semibold opacity-80 mb-1">{tr('elig.topPick', lang)}</p>
            <p className="text-lg font-bold">{result.top_pick}</p>
            <p className="text-sm opacity-90 mt-1">{result.top_pick_reason}</p>
          </div>
        )}
      </div>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowAll(false)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-bold transition-all',
            !showAll ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-2 border-green-300 dark:border-green-700' : 'text-gray-600 dark:text-gray-400'
          )}
        >
          {tr('elig.eligible', lang)} ({eligibleExams.length})
        </button>
        <button
          onClick={() => setShowAll(true)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-bold transition-all',
            showAll ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-700' : 'text-gray-600 dark:text-gray-400'
          )}
        >
          {lang === 'hi' ? 'सभी परीक्षाएँ' : 'All Exams'} ({result.exams.length})
        </button>
      </div>

      {/* Exam cards */}
      <div className="space-y-3 mb-8">
        {(showAll ? [...eligibleExams, ...notEligible] : eligibleExams).map((exam, i) => (
          <div
            key={i}
            className={cn(
              'bg-white dark:bg-gray-900 rounded-2xl border-2 p-4 sm:p-5',
              exam.eligible
                ? 'border-green-200 dark:border-green-800'
                : 'border-gray-200 dark:border-gray-700 opacity-75'
            )}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-gray-900 dark:text-white">{exam.name}</h4>
              {exam.eligible ? (
                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-300 px-2.5 py-1 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {tr('elig.eligible', lang)}
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/40 dark:text-red-300 px-2.5 py-1 rounded-lg">
                  <XCircle className="w-3.5 h-3.5" /> {tr('elig.notEligible', lang)}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-sm mb-2">
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <IndianRupee className="w-3.5 h-3.5 text-green-500" /> {exam.salary_range}
              </span>
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Calendar className="w-3.5 h-3.5 text-blue-500" /> {exam.age_range}
              </span>
            </div>
            {!exam.eligible && exam.reason && (
              <p className="text-xs text-red-600 dark:text-red-400 font-semibold">{exam.reason}</p>
            )}
            {exam.tips && (
              <div className="flex items-start gap-1.5 mt-2">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-600 dark:text-gray-400">{exam.tips}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={reset}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-lg active:scale-[0.98] transition-all"
      >
        <RotateCcw className="w-5 h-5" /> {tr('elig.tryAgain', lang)}
      </button>
    </div>
  );
}
