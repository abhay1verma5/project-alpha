'use client';

import { useState, useEffect } from 'react';
import { ClipboardList, Plus, Trash2, Pencil, X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

type Status = 'Applied' | 'Admit Card' | 'Exam Done' | 'Result Pending' | 'Selected' | 'Not Selected';
interface App { id: string; name: string; date: string; status: Status; }

const STATUSES: Status[] = ['Applied', 'Admit Card', 'Exam Done', 'Result Pending', 'Selected', 'Not Selected'];
const SC: Record<Status, string> = {
  'Applied': 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300',
  'Admit Card': 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300',
  'Exam Done': 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300',
  'Result Pending': 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300',
  'Selected': 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300',
  'Not Selected': 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300',
};

const KEY = 'sarkari_apply_tracker';
function load(): App[] { try { const d = localStorage.getItem(KEY); return d ? JSON.parse(d) : []; } catch { return []; } }
function save(a: App[]) { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch {} }

export function ApplyTrackerClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const [mounted, setMounted] = useState(false);
  const [apps, setApps] = useState<App[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [nn, setNn] = useState('');
  const [nd, setNd] = useState('');
  const [ns, setNs] = useState<Status>('Applied');

  useEffect(() => { setApps(load()); setMounted(true); }, []);

  const add = () => {
    if (!nn.trim() || !nd) return;
    const u = [{ id: Date.now().toString(), name: nn.trim(), date: nd, status: ns }, ...apps];
    setApps(u); save(u); setNn(''); setNd(''); setNs('Applied'); setShowAdd(false);
  };
  const del = (id: string) => { const u = apps.filter(a => a.id !== id); setApps(u); save(u); };
  const upd = (id: string, s: Status) => { const u = apps.map(a => a.id === id ? { ...a, status: s } : a); setApps(u); save(u); setEditId(null); };

  if (!mounted) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-violet-600 rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
          <ClipboardList className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'आवेदन ट्रैकर' : 'Application Tracker'}</h1>
          <p className="text-sm text-gray-500">{apps.length} {hi ? 'आवेदन' : 'applications tracked'}</p>
        </div>
      </div>

      {showAdd ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border-2 border-dashed border-violet-300 dark:border-violet-700 p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">{hi ? 'नया आवेदन' : 'Add Application'}</h3>
            <button onClick={() => setShowAdd(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-4 h-4 text-gray-400" /></button>
          </div>
          <input type="text" value={nn} onChange={e => setNn(e.target.value)} placeholder={hi ? 'परीक्षा नाम' : 'Exam name (e.g. SSC CGL 2026)'} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm mb-2 focus:outline-none focus:border-violet-400" />
          <input type="date" value={nd} onChange={e => setNd(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm mb-2 focus:outline-none focus:border-violet-400" />
          <div className="mb-3">
            <label className="block text-xs font-bold text-gray-600 dark:text-gray-400 mb-1.5">{hi ? 'स्थिति' : 'Status'}</label>
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map(s => <button key={s} onClick={() => setNs(s)} className={cn('px-2.5 py-1 rounded-md text-[11px] font-bold', ns === s ? SC[s] : 'bg-gray-100 dark:bg-gray-800 text-gray-500')}>{s}</button>)}
            </div>
          </div>
          <button onClick={add} className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm">{hi ? 'जोड़ें' : 'Add'}</button>
        </div>
      ) : (
        <button onClick={() => setShowAdd(true)} className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 text-gray-500 font-bold text-sm flex items-center justify-center gap-2 hover:border-violet-400 hover:text-violet-500 transition-colors mb-4">
          <Plus className="w-4 h-4" /> {hi ? 'नया आवेदन जोड़ें' : 'Add New Application'}
        </button>
      )}

      {apps.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{hi ? 'कोई आवेदन नहीं' : 'No Applications Yet'}</h2>
          <p className="text-sm text-gray-500">{hi ? 'ट्रैक करने के लिए ऊपर जोड़ें' : 'Add applications above to start tracking'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {apps.map(a => (
            <div key={a.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 dark:text-white">{a.name}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{hi ? 'तिथि' : 'Applied'}: {new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="flex gap-1.5 flex-shrink-0">
                  <button onClick={() => setEditId(editId === a.id ? null : a.id)} className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-violet-600"><Pencil className="w-3.5 h-3.5" /></button>
                  <button onClick={() => del(a.id)} className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <div className="mt-2"><span className={cn('inline-block px-2.5 py-1 rounded-md text-[11px] font-bold', SC[a.status])}>{a.status}</span></div>
              {editId === a.id && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <p className="text-xs font-bold text-gray-500 mb-1.5">{hi ? 'स्थिति बदलें' : 'Change Status'}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {STATUSES.map(s => <button key={s} onClick={() => upd(a.id, s)} className={cn('px-2.5 py-1 rounded-md text-[11px] font-bold', a.status === s ? 'ring-2 ring-violet-500 ' + SC[s] : 'bg-gray-100 dark:bg-gray-800 text-gray-500')}>{s}</button>)}
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
