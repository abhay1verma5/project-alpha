'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ClipboardCopy, Trash2, Save, FileText, User, Phone,
  MapPin, GraduationCap, Camera, PenTool, Check, AlertCircle,
} from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

/* ─────────────────────────────────────────────
   Types & storage
   ───────────────────────────────────────────── */
interface FormData {
  fullName: string;
  fatherName: string;
  motherName: string;
  dob: string;
  gender: string;
  category: string;
  mobile: string;
  email: string;
  address: string;
  qualification: string;
  percentage: string;
  passingYear: string;
}

const STORAGE_KEY = 'sarkari_form_assistant';
const PHOTO_KEY = 'sarkari_form_photo';
const SIGNATURE_KEY = 'sarkari_form_signature';

const EMPTY_FORM: FormData = {
  fullName: '',
  fatherName: '',
  motherName: '',
  dob: '',
  gender: '',
  category: '',
  mobile: '',
  email: '',
  address: '',
  qualification: '',
  percentage: '',
  passingYear: '',
};

const GENDERS = ['Male', 'Female', 'Other'];
const CATEGORIES = ['General', 'OBC', 'SC', 'ST', 'EWS'];
const QUALIFICATIONS = [
  '8th Pass', '10th Pass', '12th Pass', 'ITI', 'Diploma',
  'Graduate', 'B.Tech/B.E', 'B.Sc', 'B.Com', 'BA', 'BCA', 'BBA',
  'Post Graduate', 'M.Tech', 'MBA', 'MCA', 'PhD',
];

function loadForm(): FormData {
  try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : { ...EMPTY_FORM }; } catch { return { ...EMPTY_FORM }; }
}
function saveForm(data: FormData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function loadImage(key: string): string {
  try { return localStorage.getItem(key) || ''; } catch { return ''; }
}
function saveImage(key: string, data: string) {
  try { localStorage.setItem(key, data); } catch {}
}
function clearImage(key: string) {
  try { localStorage.removeItem(key); } catch {}
}

/* ─────────────────────────────────────────────
   Component
   ───────────────────────────────────────────── */
export function FormAssistantClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [photo, setPhoto] = useState('');
  const [signature, setSignature] = useState('');
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const photoRef = useRef<HTMLInputElement>(null);
  const sigRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm(loadForm());
    setPhoto(loadImage(PHOTO_KEY));
    setSignature(loadImage(SIGNATURE_KEY));
    setMounted(true);
  }, []);

  const update = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => {
      const next = { ...prev, [field]: value };
      saveForm(next);
      return next;
    });
  }, []);

  const handleFileUpload = useCallback((key: string, setter: (v: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      // Limit to 200KB for localStorage safety
      if (file.size > 200 * 1024) {
        alert(hi ? 'File 200KB se chota hona chahiye.' : 'File must be smaller than 200KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        setter(dataUrl);
        saveImage(key, dataUrl);
      };
      reader.readAsDataURL(file);
    };
  }, [hi]);

  const handleSave = () => {
    saveForm(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyAll = async () => {
    const lines: string[] = [];
    lines.push('=== Application Form Details ===');
    lines.push('');
    if (form.fullName) lines.push(`Full Name: ${form.fullName}`);
    if (form.fatherName) lines.push(`Father's Name: ${form.fatherName}`);
    if (form.motherName) lines.push(`Mother's Name: ${form.motherName}`);
    if (form.dob) lines.push(`Date of Birth: ${new Date(form.dob).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })}`);
    if (form.gender) lines.push(`Gender: ${form.gender}`);
    if (form.category) lines.push(`Category: ${form.category}`);
    lines.push('');
    if (form.mobile) lines.push(`Mobile: ${form.mobile}`);
    if (form.email) lines.push(`Email: ${form.email}`);
    if (form.address) lines.push(`Address: ${form.address}`);
    lines.push('');
    if (form.qualification) lines.push(`Qualification: ${form.qualification}`);
    if (form.percentage) lines.push(`Percentage/CGPA: ${form.percentage}`);
    if (form.passingYear) lines.push(`Passing Year: ${form.passingYear}`);
    lines.push('');
    lines.push('Generated via SarkariAlert Form Assistant');

    try {
      await navigator.clipboard.writeText(lines.filter(l => l !== '' || lines.indexOf(l) < lines.length).join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = lines.join('\n');
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClearAll = () => {
    if (!confirm(hi ? 'Kya aap sab data mita dena chahte hain?' : 'Are you sure you want to clear all data?')) return;
    setForm({ ...EMPTY_FORM });
    setPhoto('');
    setSignature('');
    saveForm(EMPTY_FORM);
    clearImage(PHOTO_KEY);
    clearImage(SIGNATURE_KEY);
  };

  const filledCount = Object.values(form).filter(v => v.trim() !== '').length;
  const totalFields = Object.keys(form).length;
  const progress = Math.round((filledCount / totalFields) * 100);

  if (!mounted) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="pb-28 md:pb-8">
      {/* Header with icon */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {hi ? 'Form Fill Assistant' : 'Form Fill Assistant'}
          </h2>
          <p className="text-sm text-gray-500">
            {hi ? 'Apni jaankari ek baar bhare, har jagah use kare' : 'Fill once, use everywhere'}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            {filledCount} / {totalFields} {hi ? 'fields filled' : 'fields filled'}
          </span>
          <span className="text-sm font-extrabold text-blue-600">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        {progress === 100 && (
          <p className="text-xs font-bold text-green-600 mt-2">
            {hi ? 'Sab fields bhar diye gaye!' : 'All fields completed!'}
          </p>
        )}
      </div>

      {/* Privacy notice */}
      <div className="flex items-start gap-2.5 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800 p-3 mb-6">
        <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-700 dark:text-blue-400">
          {hi
            ? 'Aapka sara data sirf aapke device par save hota hai. Koi bhi server par nahi bheja jata.'
            : 'All your data is saved locally on your device only. Nothing is sent to any server.'}
        </p>
      </div>

      {/* Personal Information */}
      <SectionHeading icon={<User className="w-4 h-4" />} title={hi ? 'Personal Information' : 'Personal Information'} />

      <div className="space-y-3 mb-6">
        <FormInput
          label={hi ? 'Full Name' : 'Full Name'}
          placeholder={hi ? 'Poora naam likhe' : 'Enter your full name'}
          value={form.fullName}
          onChange={(v) => update('fullName', v)}
        />
        <FormInput
          label={hi ? "Father's Name" : "Father's Name"}
          placeholder={hi ? "Pita ka naam" : "Enter father's name"}
          value={form.fatherName}
          onChange={(v) => update('fatherName', v)}
        />
        <FormInput
          label={hi ? "Mother's Name" : "Mother's Name"}
          placeholder={hi ? "Mata ka naam" : "Enter mother's name"}
          value={form.motherName}
          onChange={(v) => update('motherName', v)}
        />
        <FormInput
          label={hi ? 'Date of Birth' : 'Date of Birth'}
          type="date"
          value={form.dob}
          onChange={(v) => update('dob', v)}
        />

        {/* Gender */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            {hi ? 'Gender' : 'Gender'}
          </label>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map(g => (
              <button
                key={g}
                onClick={() => update('gender', g)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                  form.gender === g
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            {hi ? 'Category' : 'Category'}
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => update('category', c)}
                className={cn(
                  'px-4 py-2.5 rounded-xl text-sm font-bold transition-all',
                  form.category === c
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <SectionHeading icon={<Phone className="w-4 h-4" />} title={hi ? 'Contact Details' : 'Contact Details'} />

      <div className="space-y-3 mb-6">
        <FormInput
          label={hi ? 'Mobile Number' : 'Mobile Number'}
          placeholder="10 digit mobile number"
          type="tel"
          value={form.mobile}
          onChange={(v) => update('mobile', v)}
          maxLength={10}
        />
        <FormInput
          label={hi ? 'Email' : 'Email'}
          placeholder="your.email@example.com"
          type="email"
          value={form.email}
          onChange={(v) => update('email', v)}
        />
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            <MapPin className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            {hi ? 'Address' : 'Full Address'}
          </label>
          <textarea
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder={hi ? 'Poora pata likhe' : 'House No., Street, City, State, PIN'}
            rows={3}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 resize-none"
          />
        </div>
      </div>

      {/* Education */}
      <SectionHeading icon={<GraduationCap className="w-4 h-4" />} title={hi ? 'Education Details' : 'Education Details'} />

      <div className="space-y-3 mb-6">
        <div>
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
            {hi ? 'Qualification' : 'Highest Qualification'}
          </label>
          <select
            value={form.qualification}
            onChange={(e) => update('qualification', e.target.value)}
            className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 appearance-none"
          >
            <option value="">{hi ? '-- Select --' : '-- Select Qualification --'}</option>
            {QUALIFICATIONS.map(q => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <FormInput
            label={hi ? 'Percentage/CGPA' : 'Percentage / CGPA'}
            placeholder="e.g. 78.5"
            value={form.percentage}
            onChange={(v) => update('percentage', v)}
          />
          <FormInput
            label={hi ? 'Passing Year' : 'Passing Year'}
            placeholder="e.g. 2024"
            type="number"
            value={form.passingYear}
            onChange={(v) => update('passingYear', v)}
          />
        </div>
      </div>

      {/* Photo & Signature */}
      <SectionHeading icon={<Camera className="w-4 h-4" />} title={hi ? 'Photo & Signature' : 'Photo & Signature'} />

      <div className="grid grid-cols-2 gap-3 mb-6">
        {/* Photo upload */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            <Camera className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            {hi ? 'Photo' : 'Photo'}
          </label>
          {photo ? (
            <div className="relative">
              <img
                src={photo}
                alt="Photo preview"
                className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
              />
              <button
                onClick={() => { setPhoto(''); clearImage(PHOTO_KEY); }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => photoRef.current?.click()}
              className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <Camera className="w-6 h-6 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500">{hi ? 'Upload' : 'Upload Photo'}</span>
              <span className="text-[10px] text-gray-400">Max 200KB</span>
            </button>
          )}
          <input
            ref={photoRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload(PHOTO_KEY, setPhoto)}
            className="hidden"
          />
        </div>

        {/* Signature upload */}
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
            <PenTool className="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" />
            {hi ? 'Signature' : 'Signature'}
          </label>
          {signature ? (
            <div className="relative">
              <img
                src={signature}
                alt="Signature preview"
                className="w-full h-32 object-contain rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
              />
              <button
                onClick={() => { setSignature(''); clearImage(SIGNATURE_KEY); }}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => sigRef.current?.click()}
              className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <PenTool className="w-6 h-6 text-gray-400" />
              <span className="text-xs font-semibold text-gray-500">{hi ? 'Upload' : 'Upload Signature'}</span>
              <span className="text-[10px] text-gray-400">Max 200KB</span>
            </button>
          )}
          <input
            ref={sigRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload(SIGNATURE_KEY, setSignature)}
            className="hidden"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleSave}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98]',
            saved
              ? 'bg-green-600 text-white'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20'
          )}
        >
          {saved ? (
            <><Check className="w-4 h-4" /> {hi ? 'Saved!' : 'Saved!'}</>
          ) : (
            <><Save className="w-4 h-4" /> {hi ? 'Save All' : 'Save All Details'}</>
          )}
        </button>

        <button
          onClick={handleCopyAll}
          className={cn(
            'w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-[0.98]',
            copied
              ? 'bg-green-600 text-white'
              : 'bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'
          )}
        >
          {copied ? (
            <><Check className="w-4 h-4" /> {hi ? 'Copied!' : 'Copied to Clipboard!'}</>
          ) : (
            <><ClipboardCopy className="w-4 h-4" /> {hi ? 'Copy All' : 'Copy All Details'}</>
          )}
        </button>

        {filledCount > 0 && (
          <button
            onClick={handleClearAll}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 text-red-500 text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
          >
            <Trash2 className="w-3 h-3" /> {hi ? 'Clear All' : 'Clear All Data'}
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Reusable sub-components
   ───────────────────────────────────────────── */
function SectionHeading({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-3 mt-2">
      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        {icon}
      </div>
      <h3 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h3>
    </div>
  );
}

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  maxLength,
}: {
  label: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
      />
    </div>
  );
}
