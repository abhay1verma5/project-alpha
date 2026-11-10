'use client';

import { useState, useEffect } from 'react';
import { Bell, Mail, CheckCircle2, ChevronDown, X, Loader2 } from 'lucide-react';
import { CATEGORY_LABELS, STATE_LABELS, cn } from '@/lib/utils';

const FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily Digest', description: 'Get notified every morning' },
  { value: 'weekly', label: 'Weekly Summary', description: 'Get a summary every Monday' },
] as const;

type Frequency = (typeof FREQUENCY_OPTIONS)[number]['value'];

interface AlertPreferences {
  email: string;
  categories: string[];
  states: string[];
  frequency: Frequency;
  createdAt: string;
}

const STORAGE_KEY = 'sarkari_alert_preferences';

function MultiSelect({
  label,
  options,
  selected,
  onChange,
  placeholder,
}: {
  label: string;
  options: Record<string, string>;
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  const toggle = (key: string) => {
    if (selected.includes(key)) {
      onChange(selected.filter((s) => s !== key));
    } else {
      onChange([...selected, key]);
    }
  };

  const removeItem = (key: string) => {
    onChange(selected.filter((s) => s !== key));
  };

  return (
    <div className="relative">
      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
        {label}
      </label>

      {/* Selected tags */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selected.map((key) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800"
            >
              {options[key]}
              <button
                type="button"
                onClick={() => removeItem(key)}
                className="hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Dropdown trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-all',
          open
            ? 'border-blue-400 dark:border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900/50'
            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600',
          'bg-white dark:bg-gray-900'
        )}
      >
        <span className={selected.length === 0 ? 'text-gray-400' : 'text-gray-700 dark:text-gray-200'}>
          {selected.length === 0
            ? placeholder
            : `${selected.length} selected`}
        </span>
        <ChevronDown className={cn('w-4 h-4 text-gray-400 transition-transform', open && 'rotate-180')} />
      </button>

      {/* Dropdown menu */}
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl">
            {Object.entries(options).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors',
                  selected.includes(key)
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                )}
              >
                <div
                  className={cn(
                    'w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors',
                    selected.includes(key)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300 dark:border-gray-600'
                  )}
                >
                  {selected.includes(key) && (
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  )}
                </div>
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function AlertsClient() {
  const [email, setEmail] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [existingPrefs, setExistingPrefs] = useState<AlertPreferences | null>(null);
  const [emailError, setEmailError] = useState('');

  // Load existing preferences from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const prefs: AlertPreferences = JSON.parse(stored);
        setExistingPrefs(prefs);
        setEmail(prefs.email);
        setCategories(prefs.categories);
        setStates(prefs.states);
        setFrequency(prefs.frequency);
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setEmailError('Email is required');
      return false;
    }
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) return;

    setSaving(true);

    // Simulate a brief save delay for UX
    setTimeout(() => {
      const prefs: AlertPreferences = {
        email,
        categories,
        states,
        frequency,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
      setExistingPrefs(prefs);
      setSaving(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setEmail('');
    setCategories([]);
    setStates([]);
    setFrequency('daily');
    setExistingPrefs(null);
    setSubmitted(false);
    setEmailError('');
  };

  // Success state
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 sm:p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Preferences Saved!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm leading-relaxed">
            Your alert preferences have been saved locally. Once our email notification system is live,
            you will automatically start receiving {frequency === 'daily' ? 'daily' : 'weekly'} alerts
            at <strong className="text-gray-900 dark:text-white">{email}</strong>.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-8">
            {categories.length > 0 && `Categories: ${categories.map((c) => CATEGORY_LABELS[c] || c).join(', ')}. `}
            {states.length > 0 && `States: ${states.map((s) => STATE_LABELS[s] || s).join(', ')}.`}
            {categories.length === 0 && states.length === 0 && 'All categories and states.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
            >
              Edit Preferences
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-semibold text-sm transition-colors"
            >
              Remove Alerts
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-500/20">
          <Bell className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          Job Alert Notifications
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
          Get notified about new government job openings that match your interests.
          Choose your categories, preferred states, and notification frequency.
        </p>
      </div>

      {/* Existing preferences banner */}
      {existingPrefs && (
        <div className="mb-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
            You already have alert preferences saved. Update them below or{' '}
            <button onClick={handleReset} className="underline hover:text-blue-600 dark:hover:text-blue-300">
              remove all preferences
            </button>.
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8 space-y-6">
        {/* Email */}
        <div>
          <label htmlFor="alert-email" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              id="alert-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              onBlur={() => email && validateEmail(email)}
              placeholder="your@email.com"
              className={cn(
                'w-full pl-10 pr-4 py-3 rounded-xl border text-sm transition-all bg-white dark:bg-gray-900',
                emailError
                  ? 'border-red-400 dark:border-red-600 focus:ring-2 focus:ring-red-100 dark:focus:ring-red-900/50'
                  : 'border-gray-200 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-600 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50'
              )}
            />
          </div>
          {emailError && (
            <p className="mt-1.5 text-xs text-red-500 font-medium">{emailError}</p>
          )}
        </div>

        {/* Categories */}
        <MultiSelect
          label="Job Categories"
          options={CATEGORY_LABELS}
          selected={categories}
          onChange={setCategories}
          placeholder="All categories (leave empty for all)"
        />

        {/* States */}
        <MultiSelect
          label="State / Region"
          options={STATE_LABELS}
          selected={states}
          onChange={setStates}
          placeholder="All states (leave empty for all)"
        />

        {/* Frequency */}
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            Notification Frequency
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FREQUENCY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFrequency(opt.value)}
                className={cn(
                  'flex flex-col items-start p-4 rounded-xl border text-left transition-all',
                  frequency === opt.value
                    ? 'border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 ring-2 ring-blue-100 dark:ring-blue-900/50'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-900'
                )}
              >
                <span className={cn(
                  'text-sm font-bold',
                  frequency === opt.value
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-700 dark:text-gray-300'
                )}>
                  {opt.label}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {opt.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Info notice */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50">
          <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
            <strong>Note:</strong> Email notifications are coming soon. Your preferences are saved locally
            on this device. Once the email notification system is ready, you will automatically start
            receiving alerts based on these preferences. No spam, ever.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] text-sm disabled:opacity-60"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Saving...
            </>
          ) : (
            <>
              <Bell className="w-4 h-4" /> {existingPrefs ? 'Update Alert Preferences' : 'Save Alert Preferences'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}
