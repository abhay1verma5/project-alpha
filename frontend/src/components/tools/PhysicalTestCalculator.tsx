'use client';

import { useState } from 'react';
import { Calculator, CheckCircle2, XCircle, Info, Shield } from 'lucide-react';

interface ForceStandards {
  name: string;
  male: { height: number; chest: number; chestExpanded: number; weight: number };
  female: { height: number; chest: number | null; chestExpanded: number | null; weight: number };
}

const FORCES: ForceStandards[] = [
  {
    name: 'UP Police',
    male: { height: 168, chest: 79, chestExpanded: 84, weight: 0 },
    female: { height: 152, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'SSC GD Constable',
    male: { height: 170, chest: 80, chestExpanded: 85, weight: 0 },
    female: { height: 157, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'Army GD',
    male: { height: 170, chest: 77, chestExpanded: 82, weight: 50 },
    female: { height: 152, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'CRPF',
    male: { height: 170, chest: 80, chestExpanded: 85, weight: 0 },
    female: { height: 157, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'BSF',
    male: { height: 170, chest: 80, chestExpanded: 85, weight: 0 },
    female: { height: 157, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'Railway RPF',
    male: { height: 165, chest: 80, chestExpanded: 85, weight: 0 },
    female: { height: 157, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'Delhi Police',
    male: { height: 170, chest: 81, chestExpanded: 85, weight: 0 },
    female: { height: 157, chest: null, chestExpanded: null, weight: 0 },
  },
  {
    name: 'State Police (General)',
    male: { height: 168, chest: 79, chestExpanded: 84, weight: 0 },
    female: { height: 155, chest: null, chestExpanded: null, weight: 0 },
  },
];

export function PhysicalTestCalculator() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [chest, setChest] = useState('');
  const [chestExpanded, setChestExpanded] = useState('');
  const [showResults, setShowResults] = useState(false);

  const calculate = () => {
    if (!height) return;
    setShowResults(true);
  };

  const reset = () => {
    setHeight('');
    setWeight('');
    setChest('');
    setChestExpanded('');
    setShowResults(false);
  };

  const checkEligibility = (force: ForceStandards) => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const c = parseFloat(chest);
    const ce = parseFloat(chestExpanded);
    const std = gender === 'male' ? force.male : force.female;

    const checks: { label: string; pass: boolean; detail: string }[] = [];

    // Height
    checks.push({
      label: 'Height',
      pass: h >= std.height,
      detail: `Required: ${std.height} cm | Yours: ${h || '—'} cm`,
    });

    // Chest (male only for most)
    if (gender === 'male' && std.chest !== null && std.chestExpanded !== null) {
      checks.push({
        label: 'Chest (Normal)',
        pass: !isNaN(c) && c >= std.chest,
        detail: `Required: ${std.chest} cm | Yours: ${c || '—'} cm`,
      });
      checks.push({
        label: 'Chest (Expanded)',
        pass: !isNaN(ce) && ce >= std.chestExpanded,
        detail: `Required: ${std.chestExpanded} cm | Yours: ${ce || '—'} cm`,
      });
      if (!isNaN(c) && !isNaN(ce)) {
        const expansion = ce - c;
        checks.push({
          label: 'Chest Expansion',
          pass: expansion >= 4,
          detail: `Required: 4+ cm | Yours: ${expansion} cm`,
        });
      }
    }

    // Weight (only if force has a weight requirement)
    if (std.weight > 0) {
      checks.push({
        label: 'Weight',
        pass: !isNaN(w) && w >= std.weight,
        detail: `Required: ${std.weight} kg | Yours: ${w || '—'} kg`,
      });
    }

    const allPass = checks.every((c) => c.pass);
    return { checks, allPass };
  };

  return (
    <div className="space-y-6">
      {/* Gender */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Gender</label>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => { setGender('male'); setShowResults(false); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              gender === 'male'
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Male (पुरुष)
          </button>
          <button
            onClick={() => { setGender('female'); setShowResults(false); }}
            className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
              gender === 'female'
                ? 'bg-[#1a3a5c] text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Female (महिला)
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 172"
            min="100"
            max="220"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
        <div>
          <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 65"
            min="30"
            max="150"
            className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
          />
        </div>
      </div>

      {gender === 'male' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Chest Normal (cm)</label>
            <input
              type="number"
              value={chest}
              onChange={(e) => setChest(e.target.value)}
              placeholder="e.g. 80"
              min="50"
              max="130"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
          <div>
            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Chest Expanded (cm)</label>
            <input
              type="number"
              value={chestExpanded}
              onChange={(e) => setChestExpanded(e.target.value)}
              placeholder="e.g. 85"
              min="50"
              max="140"
              className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-base"
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculate}
          disabled={!height}
          className="flex-1 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          <Calculator className="w-5 h-5" /> Check Eligibility
        </button>
        <button
          onClick={reset}
          className="px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold transition-all active:scale-95"
        >
          Reset
        </button>
      </div>

      {/* Results */}
      {showResults && (
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5" /> Eligibility Results
          </h2>
          {FORCES.map((force) => {
            const { checks, allPass } = checkEligibility(force);
            return (
              <div
                key={force.name}
                className={`rounded-2xl border-2 p-4 ${
                  allPass
                    ? 'bg-green-50 dark:bg-green-950/30 border-green-300 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-3">
                  {allPass ? (
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )}
                  <p className={`font-extrabold ${allPass ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                    {force.name} — {allPass ? 'Eligible' : 'Not Eligible'}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {checks.map((chk) => (
                    <div key={chk.label} className="flex items-center gap-2 text-sm">
                      {chk.pass ? (
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>{chk.label}:</strong> {chk.detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Standards Table */}
      <div className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3">
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">
            Physical Standards ({gender === 'male' ? 'Male' : 'Female'})
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Force</th>
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Height</th>
                {gender === 'male' && (
                  <>
                    <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Chest</th>
                    <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Expanded</th>
                  </>
                )}
                <th className="text-left px-4 py-2 font-bold text-gray-600 dark:text-gray-400">Weight</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {FORCES.map((force) => {
                const std = gender === 'male' ? force.male : force.female;
                return (
                  <tr key={force.name}>
                    <td className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-300">{force.name}</td>
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{std.height} cm</td>
                    {gender === 'male' && (
                      <>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{std.chest} cm</td>
                        <td className="px-4 py-2 text-gray-600 dark:text-gray-400">{std.chestExpanded} cm</td>
                      </>
                    )}
                    <td className="px-4 py-2 text-gray-600 dark:text-gray-400">
                      {std.weight > 0 ? `${std.weight} kg` : 'Proportional'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info note */}
      <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
        <p>
          Standards shown are for General category candidates. SC/ST/OBC candidates may get relaxation in height and chest as per official notification. Always refer to the official notification for exact requirements.
        </p>
      </div>
    </div>
  );
}
