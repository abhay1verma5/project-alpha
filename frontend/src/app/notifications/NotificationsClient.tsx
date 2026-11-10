'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, Check, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { CATEGORY_LABELS, CATEGORY_ICONS } from '@/lib/utils';

const NOTIF_KEY = 'sarkari_notif_prefs';

interface NotifPrefs {
  categories: string[];
  enabled: boolean;
}

function loadPrefs(): NotifPrefs {
  try {
    const d = localStorage.getItem(NOTIF_KEY);
    if (d) return JSON.parse(d);
  } catch {}
  return { categories: [], enabled: false };
}

function savePrefs(p: NotifPrefs) {
  try { localStorage.setItem(NOTIF_KEY, JSON.stringify(p)); } catch {}
}

export function NotificationsClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [prefs, setPrefs] = useState<NotifPrefs>({ categories: [], enabled: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPrefs(loadPrefs());
    setMounted(true);
  }, []);

  const toggleCategory = (cat: string) => {
    const updated = prefs.categories.includes(cat)
      ? { ...prefs, categories: prefs.categories.filter(c => c !== cat) }
      : { ...prefs, categories: [...prefs.categories, cat] };
    setPrefs(updated);
    savePrefs(updated);
  };

  const toggleAll = () => {
    const allCats = Object.keys(CATEGORY_LABELS);
    const updated = prefs.categories.length === allCats.length
      ? { ...prefs, categories: [] }
      : { ...prefs, categories: allCats };
    setPrefs(updated);
    savePrefs(updated);
  };

  if (!mounted) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-[#ff6f00] flex items-center justify-center">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'सूचना प्राथमिकताएँ' : 'Notification Preferences'}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {hi ? 'जिन श्रेणियों की सूचना चाहिए उन्हें चुनें' : 'Select categories you want to be notified about'}
          </p>
        </div>
      </div>

      {/* Telegram CTA */}
      <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl p-5 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">{hi ? 'टेलीग्राम से जुड़ें' : 'Join Telegram'}</h3>
            <p className="text-sm text-sky-100">
              {hi ? 'नई नौकरियों की तुरंत सूचना पाएं' : 'Get instant alerts for new jobs'}
            </p>
          </div>
          <a
            href="https://t.me/sarkarialert_official"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 font-bold text-sm rounded-xl hover:bg-blue-50 transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> {hi ? 'जुड़ें' : 'Join'}
          </a>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900 dark:text-white">
            {hi ? 'श्रेणियाँ चुनें' : 'Select Categories'}
          </h2>
          <button onClick={toggleAll} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
            {prefs.categories.length === Object.keys(CATEGORY_LABELS).length
              ? (hi ? 'सभी हटाएँ' : 'Deselect All')
              : (hi ? 'सभी चुनें' : 'Select All')}
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const selected = prefs.categories.includes(key);
            return (
              <button
                key={key}
                onClick={() => toggleCategory(key)}
                className={`flex items-center gap-2 px-3 py-3 rounded-xl text-sm font-semibold transition-all ${
                  selected
                    ? 'bg-[#ff6f00] text-white'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span>{CATEGORY_ICONS[key] || '📌'}</span>
                <span className="truncate">{label}</span>
                {selected && <Check className="w-4 h-4 ml-auto flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-4">
        <div className="flex items-start gap-3">
          <BellOff className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-sm text-blue-800 dark:text-blue-300 mb-1">
              {hi ? 'ब्राउज़र नोटिफिकेशन जल्द आ रहे हैं' : 'Browser Push Notifications Coming Soon'}
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              {hi
                ? 'अभी के लिए, तुरंत अपडेट पाने के लिए हमारे टेलीग्राम चैनल से जुड़ें। ब्राउज़र पुश नोटिफिकेशन जल्द ही लॉन्च होंगे।'
                : 'For now, join our Telegram channel for instant updates. Browser push notifications will be launched soon.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
