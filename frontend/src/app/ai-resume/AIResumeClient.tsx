'use client';

import { useState } from 'react';
import { FileText, Loader2, Copy, Check, Download } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export function AIResumeClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';

  const [form, setForm] = useState({
    name: '', email: '', phone: '', dob: '',
    qualification: '', specialization: '', university: '', year: '',
    experience: '', skills: '', targetExam: '', achievements: '',
  });
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const generate = async () => {
    if (!form.name || !form.qualification) return;
    setLoading(true);
    setResume('');

    const prompt = `Generate a professional government job resume in a clean, structured format for the following candidate. The resume should be optimized for Indian government job applications (SSC/UPSC/Railway/Banking style).

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Date of Birth: ${form.dob}
Qualification: ${form.qualification} ${form.specialization ? `(${form.specialization})` : ''}
University: ${form.university}
Year of Passing: ${form.year}
Experience: ${form.experience || 'Fresher'}
Skills: ${form.skills}
Target Exam/Job: ${form.targetExam}
Achievements: ${form.achievements}

Generate in a professional format with sections: Personal Details, Career Objective, Education, Skills, Experience (if any), Achievements, Declaration. Use clean formatting.`;

    try {
      const res = await fetch('/api/ai-career', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', text: prompt }] }),
      });
      const data = await res.json();
      setResume(data.reply || data.message || 'Failed to generate resume.');
    } catch {
      setResume('Error generating resume. Please try again.');
    }
    setLoading(false);
  };

  const copyResume = () => {
    navigator.clipboard.writeText(resume).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const fields = [
    { key: 'name', label: hi ? 'पूरा नाम' : 'Full Name', required: true },
    { key: 'email', label: hi ? 'ईमेल' : 'Email', type: 'email' },
    { key: 'phone', label: hi ? 'फ़ोन नंबर' : 'Phone Number' },
    { key: 'dob', label: hi ? 'जन्म तिथि' : 'Date of Birth', type: 'date' },
    { key: 'qualification', label: hi ? 'उच्चतम शिक्षा' : 'Highest Qualification', required: true },
    { key: 'specialization', label: hi ? 'विशेषज्ञता' : 'Specialization' },
    { key: 'university', label: hi ? 'विश्वविद्यालय/बोर्ड' : 'University/Board' },
    { key: 'year', label: hi ? 'उत्तीर्ण वर्ष' : 'Year of Passing' },
    { key: 'experience', label: hi ? 'अनुभव (यदि कोई हो)' : 'Experience (if any)', multiline: true },
    { key: 'skills', label: hi ? 'कौशल' : 'Skills' },
    { key: 'targetExam', label: hi ? 'लक्ष्य परीक्षा/नौकरी' : 'Target Exam/Job' },
    { key: 'achievements', label: hi ? 'उपलब्धियाँ' : 'Achievements', multiline: true },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'AI रिज़्यूमे बिल्डर' : 'AI Resume Builder'}
          </h1>
          <p className="text-sm text-gray-500">
            {hi ? 'सरकारी नौकरी के लिए अनुकूलित रिज़्यूमे' : 'Optimized for government job applications'}
          </p>
        </div>
      </div>

      {!resume ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fields.map(f => (
              <div key={f.key} className={f.multiline ? 'sm:col-span-2' : ''}>
                <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
                  {f.label} {f.required && <span className="text-red-500">*</span>}
                </label>
                {f.multiline ? (
                  <textarea
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:border-violet-400 focus:outline-none"
                  />
                ) : (
                  <input
                    type={f.type || 'text'}
                    value={(form as Record<string, string>)[f.key]}
                    onChange={e => update(f.key, e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:border-violet-400 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={generate}
            disabled={loading || !form.name || !form.qualification}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-base shadow-lg disabled:opacity-50 active:scale-[0.98] transition-all"
          >
            {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> {hi ? 'रिज़्यूमे बना रहे हैं...' : 'Generating Resume...'}</> : (
              <><FileText className="w-5 h-5" /> {hi ? 'रिज़्यूमे बनाएं' : 'Generate Resume'}</>
            )}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white">{hi ? 'आपका रिज़्यूमे' : 'Your Resume'}</h2>
            <div className="flex gap-2">
              <button onClick={copyResume} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300">
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                {copied ? (hi ? 'कॉपी हुआ' : 'Copied') : (hi ? 'कॉपी' : 'Copy')}
              </button>
              <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-700 dark:text-gray-300">
                <Download className="w-4 h-4" /> {hi ? 'प्रिंट' : 'Print'}
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6 whitespace-pre-wrap text-sm text-gray-800 dark:text-gray-200 leading-relaxed print:border-0 print:p-0">
            {resume}
          </div>
          <button
            onClick={() => { setResume(''); }}
            className="mt-4 w-full py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm"
          >
            {hi ? 'नया रिज़्यूमे बनाएं' : 'Create New Resume'}
          </button>
        </div>
      )}
    </div>
  );
}
