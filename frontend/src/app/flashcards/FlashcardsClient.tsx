'use client';

import { useState } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const FLASHCARDS = [
  { q: 'What is the capital of India?', a: 'New Delhi', category: 'Geography' },
  { q: 'Who wrote the Indian National Anthem?', a: 'Rabindranath Tagore', category: 'History' },
  { q: 'Which article of the Indian Constitution abolishes untouchability?', a: 'Article 17', category: 'Polity' },
  { q: 'What is the currency of Japan?', a: 'Japanese Yen', category: 'Geography' },
  { q: 'Who was the first President of India?', a: 'Dr. Rajendra Prasad', category: 'History' },
  { q: 'What is the full form of GDP?', a: 'Gross Domestic Product', category: 'Economics' },
  { q: 'Which planet is known as the Red Planet?', a: 'Mars', category: 'Science' },
  { q: 'What is the chemical formula of water?', a: 'H₂O', category: 'Science' },
  { q: 'Which river is the longest river in India?', a: 'Ganga (Ganges)', category: 'Geography' },
  { q: 'Who is known as the Father of the Indian Constitution?', a: 'Dr. B.R. Ambedkar', category: 'Polity' },
  { q: 'What is the SI unit of force?', a: 'Newton', category: 'Science' },
  { q: 'In which year did India gain independence?', a: '1947', category: 'History' },
  { q: 'What is the full form of RBI?', a: 'Reserve Bank of India', category: 'Economics' },
  { q: 'Which vitamin is produced by sunlight?', a: 'Vitamin D', category: 'Science' },
  { q: 'What is Article 370?', a: 'Special status to Jammu & Kashmir (now abrogated)', category: 'Polity' },
  { q: 'Who painted the Mona Lisa?', a: 'Leonardo da Vinci', category: 'Art' },
  { q: 'What is the largest ocean in the world?', a: 'Pacific Ocean', category: 'Geography' },
  { q: 'Which gas is most abundant in the Earth\'s atmosphere?', a: 'Nitrogen (78%)', category: 'Science' },
  { q: 'Who was the first woman Prime Minister of India?', a: 'Indira Gandhi', category: 'History' },
  { q: 'What does CAG stand for?', a: 'Comptroller and Auditor General of India', category: 'Polity' },
  { q: 'What is the boiling point of water at sea level?', a: '100°C (212°F)', category: 'Science' },
  { q: 'Which fundamental right is called the heart of the Constitution?', a: 'Right to Constitutional Remedies (Article 32)', category: 'Polity' },
  { q: 'What is the headquarters of the International Court of Justice?', a: 'The Hague, Netherlands', category: 'International' },
  { q: 'What is the speed of light?', a: '3 × 10⁸ m/s (approximately)', category: 'Science' },
  { q: 'Who gave the theory of relativity?', a: 'Albert Einstein', category: 'Science' },
  { q: 'What is the full form of UNESCO?', a: 'United Nations Educational, Scientific and Cultural Organization', category: 'International' },
  { q: 'Which schedule of Indian Constitution deals with languages?', a: 'Eighth Schedule', category: 'Polity' },
  { q: 'What is the national animal of India?', a: 'Bengal Tiger', category: 'General' },
  { q: 'Which is the smallest state of India by area?', a: 'Goa', category: 'Geography' },
  { q: 'What is the pH value of pure water?', a: '7 (neutral)', category: 'Science' },
];

const CATEGORIES = ['All', ...Array.from(new Set(FLASHCARDS.map(f => f.category)))];

export function FlashcardsClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [category, setCategory] = useState('All');
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const filtered = category === 'All' ? FLASHCARDS : FLASHCARDS.filter(f => f.category === category);
  const card = filtered[current];

  const next = () => { setFlipped(false); setCurrent(prev => (prev + 1) % filtered.length); };
  const prev = () => { setFlipped(false); setCurrent(prev => (prev - 1 + filtered.length) % filtered.length); };
  const shuffle = () => { setFlipped(false); setCurrent(Math.floor(Math.random() * filtered.length)); };
  const markKnown = () => { setKnown(p => new Set([...p, current])); next(); };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Lightbulb className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'GK फ्लैशकार्ड्स' : 'GK Flashcards'}
          </h1>
          <p className="text-sm text-gray-500">
            {filtered.length} {hi ? 'कार्ड्स' : 'cards'} • {known.size} {hi ? 'याद किए' : 'known'}
          </p>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => { setCategory(c); setCurrent(0); setFlipped(false); }}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
              category === c ? 'bg-amber-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Card */}
      {card && (
        <div
          onClick={() => setFlipped(!flipped)}
          className="cursor-pointer select-none"
        >
          <div className={cn(
            'bg-white dark:bg-gray-900 rounded-2xl border-2 p-8 sm:p-12 text-center min-h-[250px] flex flex-col items-center justify-center transition-all',
            flipped ? 'border-green-400 bg-green-50 dark:bg-green-900/10' : 'border-amber-300 dark:border-amber-700'
          )}>
            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-3">{card.category}</span>
            {flipped ? (
              <>
                <p className="text-xs font-semibold text-green-600 mb-2">{hi ? 'उत्तर' : 'ANSWER'}</p>
                <p className="text-xl sm:text-2xl font-extrabold text-green-700 dark:text-green-300">{card.a}</p>
              </>
            ) : (
              <>
                <p className="text-xs font-semibold text-amber-600 mb-2">{hi ? 'प्रश्न' : 'QUESTION'}</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{card.q}</p>
              </>
            )}
            <p className="text-xs text-gray-400 mt-4">{hi ? 'उत्तर देखने के लिए टैप करें' : 'Tap to flip'}</p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-between mt-4">
        <button onClick={prev} className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors">
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-500">{current + 1} / {filtered.length}</span>
        </div>
        <div className="flex gap-2">
          <button onClick={shuffle} className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors" title="Shuffle">
            <Shuffle className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
          <button onClick={next} className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      {/* Mark known */}
      {flipped && (
        <div className="flex gap-3 mt-4">
          <button
            onClick={next}
            className="flex-1 py-3 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-bold text-sm"
          >
            {hi ? 'दोबारा देखें' : 'Review Again'}
          </button>
          <button
            onClick={markKnown}
            className="flex-1 py-3 rounded-xl bg-green-600 text-white font-bold text-sm active:scale-[0.98]"
          >
            {hi ? 'याद है' : 'I Know This'}
          </button>
        </div>
      )}

      {/* Reset */}
      {known.size > 0 && (
        <button
          onClick={() => { setKnown(new Set()); setCurrent(0); setFlipped(false); }}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 text-xs font-bold"
        >
          <RotateCcw className="w-3 h-3" /> {hi ? 'प्रगति रीसेट करें' : 'Reset Progress'}
        </button>
      )}
    </div>
  );
}
