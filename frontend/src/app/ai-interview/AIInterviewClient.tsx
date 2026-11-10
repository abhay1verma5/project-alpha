'use client';

import { useState } from 'react';
import { Mic, Loader2, RefreshCw, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const ROLES = [
  { value: 'ssc_cgl', label: 'SSC CGL (Group B/C Officer)' },
  { value: 'upsc_ias', label: 'UPSC IAS / IPS (Civil Services)' },
  { value: 'bank_po', label: 'Bank PO (Probationary Officer)' },
  { value: 'bank_clerk', label: 'Bank Clerk' },
  { value: 'railway_tc', label: 'Railway (TC/Goods Guard)' },
  { value: 'police_si', label: 'Police Sub-Inspector' },
  { value: 'teacher', label: 'Government Teacher (PGT/TGT)' },
  { value: 'defence', label: 'Defence (NDA/CDS)' },
  { value: 'state_pcs', label: 'State PCS (SDM/BDO)' },
  { value: 'general', label: 'General Government Job' },
];

export function AIInterviewClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [role, setRole] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [revealed, setRevealed] = useState<Record<number, string>>({});
  const [loadingTip, setLoadingTip] = useState<Record<number, boolean>>({});

  const generateQuestions = async () => {
    if (!role) return;
    setLoading(true);
    setQuestions([]);
    setRevealed({});

    const roleLabel = ROLES.find(r => r.value === role)?.label || role;
    const prompt = `Generate exactly 10 interview questions for a ${roleLabel} government job interview in India. Mix of:
- 2 personal questions (Tell me about yourself, why government job)
- 3 technical/domain questions specific to the role
- 2 situational/behavioral questions
- 2 current affairs questions relevant to the role
- 1 opinion question

Return ONLY the numbered questions, one per line. No answers.`;

    try {
      const res = await fetch('/api/ai-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', text: prompt }] }),
      });
      const data = await res.json();
      const reply = data.reply || data.message || '';
      const qs = reply.split('\n').filter((l: string) => l.trim().match(/^\d/)).map((l: string) => l.replace(/^\d+\.\s*/, '').trim());
      setQuestions(qs.length > 0 ? qs : ['Failed to generate questions. Try again.']);
    } catch {
      setQuestions(['Error generating questions. Please try again.']);
    }
    setLoading(false);
  };

  const getAnswerTip = async (index: number, question: string) => {
    setLoadingTip(p => ({ ...p, [index]: true }));
    const roleLabel = ROLES.find(r => r.value === role)?.label || role;
    const prompt = `Give a brief (3-4 sentence) model answer tip for this ${roleLabel} interview question: "${question}". Be concise and practical.`;

    try {
      const res = await fetch('/api/ai-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', text: prompt }] }),
      });
      const data = await res.json();
      setRevealed(p => ({ ...p, [index]: data.reply || data.message || 'No tip available.' }));
    } catch {
      setRevealed(p => ({ ...p, [index]: 'Error loading tip.' }));
    }
    setLoadingTip(p => ({ ...p, [index]: false }));
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 flex items-center justify-center">
          <Mic className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'AI इंटरव्यू प्रेप' : 'AI Interview Prep'}
          </h1>
          <p className="text-sm text-gray-500">
            {hi ? 'सरकारी नौकरी इंटरव्यू के प्रश्न' : 'Government job interview questions'}
          </p>
        </div>
      </div>

      {questions.length === 0 ? (
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white mb-3">
              {hi ? 'पद / परीक्षा चुनें' : 'Select Role / Exam'}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map(r => (
                <button
                  key={r.value}
                  onClick={() => setRole(r.value)}
                  className={`px-3 py-3 rounded-xl text-xs font-bold transition-all text-left ${
                    role === r.value
                      ? 'bg-sky-600 text-white'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={generateQuestions}
            disabled={loading || !role}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 text-white font-bold text-base shadow-lg disabled:opacity-50 active:scale-[0.98] transition-all"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> {hi ? 'प्रश्न बना रहे हैं...' : 'Generating Questions...'}</> : (
              <><Mic className="w-5 h-5" /> {hi ? 'इंटरव्यू प्रश्न बनाएं' : 'Generate Interview Questions'}</>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="space-y-3 mb-6">
            {questions.map((q, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                <p className="font-bold text-sm text-gray-900 dark:text-white mb-2">
                  <span className="text-sky-600 mr-1.5">Q{i + 1}.</span> {q}
                </p>
                {revealed[i] ? (
                  <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-3 mt-2">
                    <p className="text-xs font-semibold text-sky-800 dark:text-sky-300 mb-1">{hi ? 'उत्तर सुझाव:' : 'Answer Tip:'}</p>
                    <p className="text-xs text-sky-700 dark:text-sky-400 leading-relaxed">{revealed[i]}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => getAnswerTip(i, q)}
                    disabled={loadingTip[i]}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 mt-1"
                  >
                    {loadingTip[i] ? <Loader2 className="w-3 h-3 animate-spin" /> : <ChevronDown className="w-3 h-3" />}
                    {hi ? 'उत्तर सुझाव देखें' : 'Show Answer Tip'}
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => { setQuestions([]); setRevealed({}); }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm"
          >
            <RefreshCw className="w-4 h-4" /> {hi ? 'नए प्रश्न' : 'New Questions'}
          </button>
        </div>
      )}
    </div>
  );
}
