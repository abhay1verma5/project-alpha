'use client';

import { useState } from 'react';
import { Search, CheckCircle2, XCircle, Info, GraduationCap } from 'lucide-react';

const QUALIFICATIONS = [
  { value: '8th', label: '8th Pass', level: 1 },
  { value: '10th', label: '10th Pass', level: 2 },
  { value: '12th', label: '12th Pass', level: 3 },
  { value: '12th_sci', label: '12th Pass (Science)', level: 3.5 },
  { value: 'iti', label: 'ITI', level: 4 },
  { value: 'diploma', label: 'Diploma', level: 5 },
  { value: 'graduation', label: 'Graduation (Any)', level: 6 },
  { value: 'btech', label: 'B.Tech / B.E.', level: 7 },
  { value: 'bed', label: 'B.Ed', level: 7 },
  { value: 'mbbs', label: 'MBBS', level: 8 },
  { value: 'llb', label: 'LLB', level: 7 },
  { value: 'mba', label: 'MBA', level: 8 },
  { value: 'post_graduation', label: 'Post Graduation (Any)', level: 8 },
];

const CATEGORIES = [
  { value: 'general', label: 'General' },
  { value: 'obc', label: 'OBC' },
  { value: 'sc', label: 'SC' },
  { value: 'st', label: 'ST' },
  { value: 'ews', label: 'EWS' },
  { value: 'pwbd', label: 'PwBD' },
];

interface ExamData {
  name: string;
  minAge: number;
  maxAge: number;
  requiredQualifications: string[];
  qualificationLabel: string;
  ageRelaxation: Record<string, number>;
  genderRestriction?: 'M' | 'F' | null;
}

const EXAMS: ExamData[] = [
  {
    name: 'SSC CGL',
    minAge: 18, maxAge: 32,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'SSC CHSL',
    minAge: 18, maxAge: 27,
    requiredQualifications: ['12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '12th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'SSC GD Constable',
    minAge: 18, maxAge: 23,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'SSC MTS',
    minAge: 18, maxAge: 25,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'SSC JE',
    minAge: 18, maxAge: 32,
    requiredQualifications: ['diploma', 'btech', 'post_graduation'],
    qualificationLabel: 'Diploma / B.Tech',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'UPSC CSE (IAS/IPS)',
    minAge: 21, maxAge: 32,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'UPSC CDS',
    minAge: 20, maxAge: 25,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
  },
  {
    name: 'UPSC NDA',
    minAge: 16, maxAge: 19,
    requiredQualifications: ['12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '12th Pass',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
    genderRestriction: 'M',
  },
  {
    name: 'RRB NTPC',
    minAge: 18, maxAge: 33,
    requiredQualifications: ['12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '12th Pass / Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'RRB Group D',
    minAge: 18, maxAge: 33,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th + ITI',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'IBPS PO',
    minAge: 20, maxAge: 30,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'IBPS Clerk',
    minAge: 20, maxAge: 28,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'SBI PO',
    minAge: 21, maxAge: 30,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'SBI Clerk',
    minAge: 20, maxAge: 28,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'RBI Grade B',
    minAge: 21, maxAge: 30,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'CTET',
    minAge: 18, maxAge: 99,
    requiredQualifications: ['bed', 'graduation', 'btech', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'B.Ed',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
  },
  {
    name: 'Delhi Police Constable',
    minAge: 18, maxAge: 25,
    requiredQualifications: ['12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '12th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'UP Police Constable',
    minAge: 18, maxAge: 28,
    requiredQualifications: ['12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '12th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'Railway RPF',
    minAge: 18, maxAge: 25,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'CISF Constable',
    minAge: 18, maxAge: 23,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'BSF Constable',
    minAge: 18, maxAge: 23,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'CRPF Constable',
    minAge: 18, maxAge: 23,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'Indian Army GD',
    minAge: 17, maxAge: 21,
    requiredQualifications: ['10th', '12th', '12th_sci', 'iti', 'diploma', 'graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: '10th Pass',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
    genderRestriction: 'M',
  },
  {
    name: 'Navy SSR',
    minAge: 17, maxAge: 20,
    requiredQualifications: ['12th_sci', 'diploma', 'graduation', 'btech', 'mbbs', 'post_graduation'],
    qualificationLabel: '12th (Science)',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
    genderRestriction: 'M',
  },
  {
    name: 'Air Force X Group',
    minAge: 17, maxAge: 21,
    requiredQualifications: ['12th_sci', 'diploma', 'graduation', 'btech', 'mbbs', 'post_graduation'],
    qualificationLabel: '12th (Science)',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
    genderRestriction: 'M',
  },
  {
    name: 'EPFO SSA',
    minAge: 18, maxAge: 27,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'FCI Manager',
    minAge: 18, maxAge: 27,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'LIC AAO',
    minAge: 21, maxAge: 30,
    requiredQualifications: ['graduation', 'btech', 'bed', 'mbbs', 'llb', 'mba', 'post_graduation'],
    qualificationLabel: 'Graduation',
    ageRelaxation: { general: 0, obc: 3, sc: 5, st: 5, ews: 0, pwbd: 10 },
  },
  {
    name: 'GATE',
    minAge: 0, maxAge: 999,
    requiredQualifications: ['btech', 'post_graduation'],
    qualificationLabel: 'B.Tech / B.E.',
    ageRelaxation: { general: 0, obc: 0, sc: 0, st: 0, ews: 0, pwbd: 0 },
  },
];

interface EligibilityResult {
  exam: ExamData;
  ageEligible: boolean;
  qualEligible: boolean;
  genderEligible: boolean;
  eligible: boolean;
  age: number;
  relaxedMaxAge: number;
  reason: string;
}

export function EligibilityChecker() {
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('M');
  const [qualification, setQualification] = useState('graduation');
  const [category, setCategory] = useState('general');
  const [results, setResults] = useState<EligibilityResult[] | null>(null);
  const [filterEligible, setFilterEligible] = useState(false);

  const checkEligibility = () => {
    if (!dob) return;

    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    const eligibilityResults: EligibilityResult[] = EXAMS.map((exam) => {
      const relaxation = exam.ageRelaxation[category] || 0;
      const relaxedMaxAge = exam.maxAge + relaxation;
      const ageEligible = exam.maxAge === 999 ? true : (age >= exam.minAge && age <= relaxedMaxAge);
      const qualEligible = exam.requiredQualifications.includes(qualification);
      const genderEligible = !exam.genderRestriction || exam.genderRestriction === gender;

      const reasons: string[] = [];
      if (!ageEligible) {
        if (age < exam.minAge) reasons.push(`Min age ${exam.minAge}, your age ${age}`);
        else reasons.push(`Max age ${relaxedMaxAge} (with relaxation), your age ${age}`);
      }
      if (!qualEligible) {
        reasons.push(`Requires: ${exam.qualificationLabel}`);
      }
      if (!genderEligible) {
        reasons.push(`${exam.genderRestriction === 'M' ? 'Males' : 'Females'} only`);
      }

      return {
        exam,
        ageEligible,
        qualEligible,
        genderEligible,
        eligible: ageEligible && qualEligible && genderEligible,
        age,
        relaxedMaxAge,
        reason: reasons.join(' | ') || 'All criteria met',
      };
    });

    setResults(eligibilityResults);
  };

  const displayedResults = results
    ? filterEligible
      ? results.filter((r) => r.eligible)
      : results
    : null;

  const eligibleCount = results?.filter((r) => r.eligible).length || 0;

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Gender
          </label>
          <div className="flex gap-2 mt-1">
            {[
              { value: 'M', label: 'Male' },
              { value: 'F', label: 'Female' },
            ].map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`flex-1 px-4 py-3 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                  gender === g.value
                    ? 'bg-[#1a3a5c] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Qualification
          </label>
          <select
            value={qualification}
            onChange={(e) => setQualification(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          >
            {QUALIFICATIONS.map((q) => (
              <option key={q.value} value={q.value}>
                {q.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Check button */}
      <button
        onClick={checkEligibility}
        disabled={!dob}
        className="w-full py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        <Search className="w-5 h-5" /> Check Eligibility
      </button>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="rounded-2xl bg-[#1a3a5c] p-5 text-white">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-7 h-7" />
              <h3 className="text-xl font-extrabold">Results</h3>
            </div>
            <p className="text-sm opacity-90">
              You are eligible for <strong className="text-green-300">{eligibleCount}</strong> out of{' '}
              <strong>{results.length}</strong> exams.
            </p>
          </div>

          {/* Filter toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterEligible(false)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                !filterEligible
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Exams ({results.length})
            </button>
            <button
              onClick={() => setFilterEligible(true)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                filterEligible
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Eligible Only ({eligibleCount})
            </button>
          </div>

          {/* Table (desktop) */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border-2 border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="text-left px-4 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Exam</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Status</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Age</th>
                  <th className="text-center px-4 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Qualification</th>
                  <th className="text-left px-4 py-3 font-bold text-gray-700 dark:text-gray-300 uppercase text-xs">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayedResults?.map((r, i) => (
                  <tr
                    key={i}
                    className={`${
                      r.eligible
                        ? 'bg-green-50/50 dark:bg-green-950/10'
                        : 'bg-white dark:bg-gray-900'
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{r.exam.name}</td>
                    <td className="px-4 py-3 text-center">
                      {r.eligible ? (
                        <span className="inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Eligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold">
                          <XCircle className="w-4 h-4" /> Not Eligible
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {r.ageEligible ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {r.qualEligible ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400 text-xs">
                      {r.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="sm:hidden space-y-3">
            {displayedResults?.map((r, i) => (
              <div
                key={i}
                className={`rounded-xl border-2 p-4 ${
                  r.eligible
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                    : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-extrabold text-gray-900 dark:text-white">{r.exam.name}</h4>
                  {r.eligible ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Eligible
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> Not Eligible
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">Age:</span>
                    {r.ageEligible ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">Pass</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-bold">Fail</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 dark:text-gray-400">Qualification:</span>
                    {r.qualEligible ? (
                      <span className="text-green-600 dark:text-green-400 font-bold">Pass</span>
                    ) : (
                      <span className="text-red-600 dark:text-red-400 font-bold">Fail</span>
                    )}
                  </div>
                </div>
                {!r.eligible && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {r.reason}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Info note */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800 dark:text-amber-300">
              <p className="font-bold mb-1">Disclaimer</p>
              <p>
                यह eligibility check सामान्य जानकारी पर आधारित है। Age relaxation और qualification requirements
                अलग-अलग posts और notifications के अनुसार बदल सकती हैं। कृपया official notification ज़रूर देखें।
                Age calculation current date पर आधारित है; actual cut-off date अलग हो सकती है।
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
