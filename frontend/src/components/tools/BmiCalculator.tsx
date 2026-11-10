'use client';

import { useState } from 'react';
import { Calculator, RotateCcw, Info, Scale } from 'lucide-react';

interface BmiCategory {
  label: string;
  range: string;
  color: string;
  bgColor: string;
  min: number;
  max: number;
}

const BMI_CATEGORIES: BmiCategory[] = [
  { label: 'Underweight', range: '< 18.5', color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-500', min: 0, max: 18.5 },
  { label: 'Normal', range: '18.5 – 24.9', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-500', min: 18.5, max: 25 },
  { label: 'Overweight', range: '25.0 – 29.9', color: 'text-yellow-600 dark:text-yellow-400', bgColor: 'bg-yellow-500', min: 25, max: 30 },
  { label: 'Obese', range: '30.0+', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-500', min: 30, max: 50 },
];

const JOB_BMI_REQUIREMENTS = [
  { job: 'Indian Army', bmiRange: '18.5 – 24.9', heightRange: '170 cm (Male)', weightRange: '50+ kg' },
  { job: 'Indian Navy', bmiRange: '18.0 – 25.0', heightRange: '157 cm (Male)', weightRange: 'As per height' },
  { job: 'Indian Air Force', bmiRange: '18.0 – 25.0', heightRange: '162.5 cm (Male)', weightRange: 'As per height' },
  { job: 'Police (General)', bmiRange: '18.5 – 27.0', heightRange: '168 cm (Male)', weightRange: 'Proportional' },
  { job: 'CRPF / BSF', bmiRange: '18.5 – 25.0', heightRange: '170 cm (Male)', weightRange: 'As per height' },
  { job: 'SSC GD', bmiRange: '18.5 – 25.0', heightRange: '170 cm (Male)', weightRange: 'Proportional' },
];

function getBmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  return BMI_CATEGORIES[3];
}

export function BmiCalculator() {
  const [heightMode, setHeightMode] = useState<'cm' | 'feet'>('cm');
  const [heightCm, setHeightCm] = useState('');
  const [feet, setFeet] = useState('');
  const [inches, setInches] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<{
    bmi: number;
    category: BmiCategory;
    idealMin: number;
    idealMax: number;
    heightInM: number;
  } | null>(null);

  const calculate = () => {
    let heightM: number;
    if (heightMode === 'cm') {
      const cm = parseFloat(heightCm);
      if (isNaN(cm) || cm < 50 || cm > 250) return;
      heightM = cm / 100;
    } else {
      const ft = parseFloat(feet);
      const inch = parseFloat(inches) || 0;
      if (isNaN(ft) || ft < 1) return;
      heightM = (ft * 30.48 + inch * 2.54) / 100;
    }

    const w = parseFloat(weight);
    if (isNaN(w) || w < 10 || w > 300) return;

    const bmi = w / (heightM * heightM);
    const category = getBmiCategory(bmi);
    const idealMin = Math.round(18.5 * heightM * heightM * 10) / 10;
    const idealMax = Math.round(24.9 * heightM * heightM * 10) / 10;

    setResult({
      bmi: Math.round(bmi * 10) / 10,
      category,
      idealMin,
      idealMax,
      heightInM: heightM,
    });
  };

  const reset = () => {
    setHeightCm('');
    setFeet('');
    setInches('');
    setWeight('');
    setResult(null);
  };

  // Visual scale position (0-100%)
  const getScalePosition = (bmi: number): number => {
    if (bmi < 10) return 0;
    if (bmi > 40) return 100;
    return ((bmi - 10) / 30) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Height mode toggle */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Height Input Mode</label>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setHeightMode('cm')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              heightMode === 'cm'
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Centimeters (cm)
          </button>
          <button
            onClick={() => setHeightMode('feet')}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              heightMode === 'feet'
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Feet & Inches
          </button>
        </div>
      </div>

      {/* Height & Weight inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {heightMode === 'cm' ? (
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Height (cm)</label>
            <input
              type="number"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              placeholder="e.g. 170"
              min="50"
              max="250"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Feet</label>
              <input
                type="number"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                placeholder="5"
                min="1"
                max="8"
                className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Inches</label>
              <input
                type="number"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                placeholder="8"
                min="0"
                max="11"
                className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
              />
            </div>
          </div>
        )}
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 68"
            min="10"
            max="300"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Calculator className="w-5 h-5" /> Calculate BMI
        </button>
        <button
          onClick={reset}
          className="px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
        </button>
      </div>

      {/* Result */}
      {result && (
        <div className={`rounded-2xl border-2 p-6 ${
          result.category.label === 'Normal'
            ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800'
            : result.category.label === 'Underweight'
            ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-300 dark:border-blue-800'
            : result.category.label === 'Overweight'
            ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 dark:border-yellow-800'
            : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-8 h-8 text-gray-700 dark:text-gray-300" />
            <div>
              <p className={`text-xl font-extrabold ${result.category.color}`}>
                BMI: {result.bmi} — {result.category.label}
              </p>
            </div>
          </div>

          {/* Visual BMI scale */}
          <div className="mb-6">
            <div className="relative h-6 rounded-full overflow-hidden flex">
              <div className="flex-1 bg-blue-400" />
              <div className="flex-1 bg-green-400" />
              <div className="flex-1 bg-yellow-400" />
              <div className="flex-1 bg-red-400" />
            </div>
            <div className="relative h-4">
              <div
                className="absolute top-0 transform -translate-x-1/2"
                style={{ left: `${getScalePosition(result.bmi)}%` }}
              >
                <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[10px] border-l-transparent border-r-transparent border-b-gray-900 dark:border-b-white" />
              </div>
            </div>
            <div className="flex justify-between text-xs font-bold text-gray-500 mt-1">
              <span>10</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{result.bmi}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Your BMI</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
              <p className="text-lg font-extrabold text-gray-900 dark:text-white">{result.idealMin} – {result.idealMax} kg</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Ideal Weight Range</p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>
              For your height ({Math.round(result.heightInM * 100)} cm), the healthy weight range is <strong>{result.idealMin} – {result.idealMax} kg</strong> (BMI 18.5–24.9).
            </p>
          </div>
        </div>
      )}

      {/* BMI categories reference */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">BMI Categories</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Category</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">BMI Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {BMI_CATEGORIES.map((cat) => (
                <tr key={cat.label}>
                  <td className={`px-4 py-2 font-bold ${cat.color}`}>{cat.label}</td>
                  <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{cat.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Govt job BMI table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">BMI Requirements for Government Jobs</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Job / Force</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">BMI Range</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Min Height</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {JOB_BMI_REQUIREMENTS.map((req) => (
                <tr key={req.job}>
                  <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">{req.job}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{req.bmiRange}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{req.heightRange}</td>
                  <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{req.weightRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          BMI = Weight (kg) / Height (m)². This is a general guideline. Actual requirements may vary by category and notification. Consult the official notification for exact standards.
        </p>
      </div>
    </div>
  );
}
