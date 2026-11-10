'use client';

import { useState } from 'react';
import { Search, ArrowLeftRight, X, Briefcase } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { type Job } from '@/lib/api';
import { CATEGORY_LABELS, STATE_LABELS, formatDate, formatNumber } from '@/lib/utils';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export function CompareClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [jobs, setJobs] = useState<(Job | null)[]>([null, null]);
  const [searchQ, setSearchQ] = useState(['', '']);
  const [results, setResults] = useState<Job[][]>([[], []]);
  const [loading, setLoading] = useState([false, false]);
  const [showResults, setShowResults] = useState([false, false]);

  const searchJobs = async (index: number) => {
    const q = searchQ[index].trim();
    if (!q) return;
    const newLoading = [...loading];
    newLoading[index] = true;
    setLoading(newLoading);
    try {
      const res = await fetch(`${API_BASE}/search/?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      const newResults = [...results];
      newResults[index] = data.results || [];
      setResults(newResults);
      const newShow = [...showResults];
      newShow[index] = true;
      setShowResults(newShow);
    } catch {}
    const nl = [...loading];
    nl[index] = false;
    setLoading(nl);
  };

  const selectJob = (index: number, job: Job) => {
    const newJobs = [...jobs];
    newJobs[index] = job;
    setJobs(newJobs);
    const newShow = [...showResults];
    newShow[index] = false;
    setShowResults(newShow);
  };

  const clearJob = (index: number) => {
    const newJobs = [...jobs];
    newJobs[index] = null;
    setJobs(newJobs);
  };

  const rows = [
    { label: hi ? 'संगठन' : 'Organization', key: 'organization' },
    { label: hi ? 'श्रेणी' : 'Category', key: 'category', format: (v: string) => CATEGORY_LABELS[v] || v },
    { label: hi ? 'राज्य' : 'State', key: 'state', format: (v: string) => STATE_LABELS[v] || v },
    { label: hi ? 'रिक्तियाँ' : 'Vacancies', key: 'vacancies', format: (v: number) => formatNumber(v) },
    { label: hi ? 'योग्यता' : 'Qualification', key: 'qualification' },
    { label: hi ? 'वेतन' : 'Salary', key: 'salary' },
    { label: hi ? 'आयु सीमा' : 'Age Limit', key: 'age_limit' },
    { label: hi ? 'अंतिम तिथि' : 'Last Date', key: 'last_date', format: (v: string) => formatDate(v) },
    { label: hi ? 'शेष दिन' : 'Days Left', key: 'days_left', format: (v: number) => v >= 0 ? `${v} ${hi ? 'दिन' : 'days'}` : (hi ? 'समाप्त' : 'Expired') },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <ArrowLeftRight className="w-6 h-6 text-[#ff6f00]" />
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'नौकरियों की तुलना करें' : 'Compare Jobs'}
          </h1>
          <p className="text-sm text-gray-500">{hi ? 'दो नौकरियों की साथ-साथ तुलना करें' : 'Compare two jobs side-by-side'}</p>
        </div>
      </div>

      {/* Search boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[0, 1].map(i => (
          <div key={i} className="relative">
            {jobs[i] ? (
              <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-blue-400 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">{jobs[i]!.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{jobs[i]!.organization}</p>
                  </div>
                  <button onClick={() => clearJob(i)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 ml-2">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQ[i]}
                    onChange={e => { const q = [...searchQ]; q[i] = e.target.value; setSearchQ(q); }}
                    onKeyDown={e => e.key === 'Enter' && searchJobs(i)}
                    placeholder={hi ? `नौकरी ${i + 1} खोजें...` : `Search Job ${i + 1}...`}
                    className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm font-semibold focus:border-blue-400 focus:outline-none"
                  />
                  <button
                    onClick={() => searchJobs(i)}
                    className="px-4 py-3 rounded-xl bg-[#ff6f00] text-white font-bold text-sm"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
                {showResults[i] && results[i].length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl max-h-60 overflow-y-auto">
                    {results[i].map(job => (
                      <button
                        key={job.slug}
                        onClick={() => selectJob(i, job)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-800 last:border-0"
                      >
                        <p className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-1">{job.title}</p>
                        <p className="text-xs text-gray-500">{job.organization}</p>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Comparison table */}
      {jobs[0] && jobs[1] ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase w-1/4">{hi ? 'विशेषता' : 'Feature'}</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-[#ff6f00] uppercase w-[37.5%]">{hi ? 'नौकरी 1' : 'Job 1'}</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-blue-600 uppercase w-[37.5%]">{hi ? 'नौकरी 2' : 'Job 2'}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(row => {
                  const v1 = (jobs[0] as unknown as Record<string, unknown>)[row.key];
                  const v2 = (jobs[1] as unknown as Record<string, unknown>)[row.key];
                  const f = row.format as ((v: never) => string) | undefined;
                  return (
                    <tr key={row.key} className="border-t border-gray-100 dark:border-gray-800">
                      <td className="px-4 py-3 text-xs font-bold text-gray-500">{row.label}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{v1 ? (f ? f(v1 as never) : String(v1)) : '-'}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{v2 ? (f ? f(v2 as never) : String(v2)) : '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <Briefcase className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <p className="text-sm text-gray-500">{hi ? 'तुलना शुरू करने के लिए दो नौकरियाँ खोजें' : 'Search and select two jobs to compare'}</p>
        </div>
      )}
    </div>
  );
}
