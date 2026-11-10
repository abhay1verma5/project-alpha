'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Plus, Trash2, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

type AdmitStatus = 'Upcoming' | 'Released' | 'Download Available';

interface AdmitCard {
  id: string;
  exam: string;
  examHi?: string;
  expectedDate: string;
  status: AdmitStatus;
  isDefault?: boolean;
}

const STATUS_COLORS: Record<AdmitStatus, string> = {
  'Upcoming': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300',
  'Released': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
  'Download Available': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
};

const STATUSES: AdmitStatus[] = ['Upcoming', 'Released', 'Download Available'];

const DEFAULT_CARDS: AdmitCard[] = [
  { id: 'default-1', exam: 'SSC CGL 2026 Tier-2', examHi: 'SSC CGL 2026 टियर-2', expectedDate: 'Expected Jan 2027', status: 'Upcoming', isDefault: true },
  { id: 'default-2', exam: 'IBPS PO 2026 Mains', examHi: 'IBPS PO 2026 मुख्य', expectedDate: 'Expected Nov 2026', status: 'Upcoming', isDefault: true },
  { id: 'default-3', exam: 'RRB NTPC 2026 CBT-2', examHi: 'RRB NTPC 2026 CBT-2', expectedDate: 'Expected Dec 2026', status: 'Upcoming', isDefault: true },
  { id: 'default-4', exam: 'CTET Jan 2027', examHi: 'CTET जनवरी 2027', expectedDate: 'Expected Jan 2027', status: 'Upcoming', isDefault: true },
  { id: 'default-5', exam: 'UPSC CSE Prelims 2027', examHi: 'UPSC CSE प्रारंभिक 2027', expectedDate: 'Expected May 2027', status: 'Upcoming', isDefault: true },
  { id: 'default-6', exam: 'SSC CHSL 2026 Tier-1', examHi: 'SSC CHSL 2026 टियर-1', expectedDate: 'Expected Dec 2026', status: 'Upcoming', isDefault: true },
  { id: 'default-7', exam: 'IBPS Clerk 2026 Prelims', examHi: 'IBPS क्लर्क 2026 प्रारंभिक', expectedDate: 'Expected Nov 2026', status: 'Upcoming', isDefault: true },
  { id: 'default-8', exam: 'SSC GD Constable 2027', examHi: 'SSC GD कांस्टेबल 2027', expectedDate: 'Expected Feb 2027', status: 'Upcoming', isDefault: true },
];

const KEY = 'sarkari_admit_tracker';

function loadCustom(): AdmitCard[] {
  try {
    const d = localStorage.getItem(KEY);
    return d ? JSON.parse(d) : [];
  } catch {
    return [];
  }
}

function saveCustom(cards: AdmitCard[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(cards));
  } catch {}
}

export function AdmitCardTrackerClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [mounted, setMounted] = useState(false);
  const [customCards, setCustomCards] = useState<AdmitCard[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newExam, setNewExam] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStatus, setNewStatus] = useState<AdmitStatus>('Upcoming');

  useEffect(() => {
    setCustomCards(loadCustom());
    setMounted(true);
  }, []);

  const allCards = [...DEFAULT_CARDS, ...customCards];

  const addCard = () => {
    if (!newExam.trim() || !newDate.trim()) return;
    const card: AdmitCard = {
      id: Date.now().toString(),
      exam: newExam.trim(),
      expectedDate: newDate.trim(),
      status: newStatus,
    };
    const updated = [card, ...customCards];
    setCustomCards(updated);
    saveCustom(updated);
    setNewExam('');
    setNewDate('');
    setNewStatus('Upcoming');
    setShowAdd(false);
  };

  const deleteCard = (id: string) => {
    const updated = customCards.filter((c) => c.id !== id);
    setCustomCards(updated);
    saveCustom(updated);
  };

  const updateStatus = (id: string, status: AdmitStatus) => {
    const updated = customCards.map((c) => (c.id === id ? { ...c, status } : c));
    setCustomCards(updated);
    saveCustom(updated);
  };

  if (!mounted) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-purple-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'एडमिट कार्ड ट्रैकर' : 'Admit Card Tracker'}
          </h1>
          <p className="text-sm text-gray-500">
            {allCards.length} {hi ? 'एडमिट कार्ड ट्रैक हो रहे हैं' : 'admit cards tracked'}
          </p>
        </div>
      </div>

      {/* Add new card */}
      {showAdd ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-purple-300 dark:border-purple-700 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">
              {hi ? 'नया एडमिट कार्ड जोड़ें' : 'Add Admit Card'}
            </h3>
            <button
              onClick={() => setShowAdd(false)}
              className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <input
            type="text"
            value={newExam}
            onChange={(e) => setNewExam(e.target.value)}
            placeholder={hi ? 'परीक्षा नाम (जैसे SSC CHSL 2026)' : 'Exam name (e.g. SSC CHSL 2026)'}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm mb-2 focus:outline-none focus:border-purple-400"
          />
          <input
            type="text"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            placeholder={hi ? 'अपेक्षित तिथि (जैसे Expected Jan 2027)' : 'Expected date (e.g. Expected Jan 2027)'}
            className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm mb-2 focus:outline-none focus:border-purple-400"
          />
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">
              {hi ? 'स्थिति' : 'Status'}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setNewStatus(s)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[11px] font-bold',
                    newStatus === s ? STATUS_COLORS[s] : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={addCard}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm"
          >
            {hi ? 'जोड़ें' : 'Add'}
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowAdd(true)}
          className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-purple-400 hover:text-purple-500 transition-colors mb-4"
        >
          <Plus className="w-4 h-4" /> {hi ? 'नया एडमिट कार्ड जोड़ें' : 'Add Custom Admit Card'}
        </button>
      )}

      {/* Cards list */}
      {allCards.length === 0 ? (
        <div className="text-center py-16">
          <CreditCard className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            {hi ? 'कोई एडमिट कार्ड नहीं' : 'No Admit Cards'}
          </h2>
          <p className="text-sm text-gray-500">
            {hi ? 'ट्रैक करने के लिए ऊपर जोड़ें' : 'Add admit cards above to start tracking'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {allCards.map((card) => (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                    {hi && card.examHi ? card.examHi : card.exam}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{card.expectedDate}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={cn(
                      'inline-block px-2.5 py-1 rounded-md text-[11px] font-bold',
                      STATUS_COLORS[card.status]
                    )}
                  >
                    {card.status}
                  </span>
                  {!card.isDefault && (
                    <button
                      onClick={() => deleteCard(card.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
              {/* Status changer for custom cards */}
              {!card.isDefault && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-gray-500 mb-1.5">
                    {hi ? 'स्थिति बदलें' : 'Change Status'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {STATUSES.map((s) => (
                      <button
                        key={s}
                        onClick={() => updateStatus(card.id, s)}
                        className={cn(
                          'px-2.5 py-1 rounded-md text-[11px] font-bold',
                          card.status === s
                            ? 'ring-2 ring-purple-500 ' + STATUS_COLORS[s]
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
