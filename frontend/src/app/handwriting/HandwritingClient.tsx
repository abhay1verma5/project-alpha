'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { PenLine, RotateCcw, Download, Timer, Play, Square } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { cn } from '@/lib/utils';

const PROMPTS = [
  'The Government of India provides numerous employment opportunities for citizens across various departments.',
  'Education is the most powerful weapon which you can use to change the world.',
  'Democracy is not merely a form of government. It is primarily a mode of associated living.',
  'The Constitution of India guarantees fundamental rights to all citizens including equality and freedom.',
  'India is the largest democracy in the world with a rich cultural heritage spanning thousands of years.',
];

const COLORS = [
  { name: 'Blue', value: '#1e40af' },
  { name: 'Black', value: '#111827' },
  { name: 'Red', value: '#dc2626' },
];

const WIDTHS = [
  { name: 'Thin', value: 1.5 },
  { name: 'Medium', value: 2.5 },
  { name: 'Thick', value: 4 },
];

export function HandwritingClient() {
  const { lang } = useLanguage();
  const hi = lang === 'hi';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState(COLORS[0].value);
  const [width, setWidth] = useState(WIDTHS[1].value);
  const [prompt, setPrompt] = useState('');
  const [timing, setTiming] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  }, []);

  useEffect(() => {
    drawLines();
  }, []);

  useEffect(() => {
    if (timing) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timing]);

  const drawLines = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 0.5;
    for (let y = 30; y < canvas.height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    // Red margin line
    ctx.strokeStyle = '#fca5a5';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, canvas.height);
    ctx.stroke();
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const touch = e.touches[0];
      return { x: (touch.clientX - rect.left) * scaleX, y: (touch.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setDrawing(true);
    lastPos.current = getPos(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing || !lastPos.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPos.current = pos;
  };

  const endDraw = () => {
    setDrawing(false);
    lastPos.current = null;
  };

  const clear = () => {
    drawLines();
  };

  const download = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'handwriting-practice.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const newPrompt = () => {
    setPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-600 to-fuchsia-600 flex items-center justify-center">
          <PenLine className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">{hi ? 'लेखन अभ्यास' : 'Handwriting Practice'}</h1>
          <p className="text-sm text-gray-500">{hi ? 'लिखावट सुधारें और गति बढ़ाएं' : 'Improve writing speed and neatness'}</p>
        </div>
      </div>

      {/* Prompt */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 p-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">{hi ? 'यह लिखें' : 'Copy this passage'}</span>
          <button onClick={newPrompt} className="text-xs font-bold text-yellow-600 hover:text-yellow-800">{hi ? 'नया पैराग्राफ' : 'New Prompt'}</button>
        </div>
        <p className="text-sm text-yellow-900 dark:text-yellow-200 italic leading-relaxed">{prompt}</p>
      </div>

      {/* Timer + Controls */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button onClick={() => { setTiming(!timing); if (!timing) setSeconds(0); }} className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold', timing ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')}>
            {timing ? <><Square className="w-3 h-3" /> Stop</> : <><Play className="w-3 h-3" /> Start Timer</>}
          </button>
          <span className="flex items-center gap-1 text-sm font-bold text-gray-600"><Timer className="w-3.5 h-3.5" /> {fmt(seconds)}</span>
        </div>
        <div className="flex gap-1.5">
          <button onClick={clear} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-600" title="Clear"><RotateCcw className="w-4 h-4" /></button>
          <button onClick={download} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-600" title="Download"><Download className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Pen controls */}
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1.5">
          {COLORS.map(c => (
            <button key={c.value} onClick={() => setColor(c.value)} className={cn('w-7 h-7 rounded-full border-2 transition-all', color === c.value ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent')} style={{ backgroundColor: c.value }} title={c.name} />
          ))}
        </div>
        <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-1.5">
          {WIDTHS.map(w => (
            <button key={w.value} onClick={() => setWidth(w.value)} className={cn('px-2.5 py-1 rounded-md text-[11px] font-bold', width === w.value ? 'bg-pink-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600')}>
              {w.name}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas */}
      <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 overflow-hidden touch-none">
        <canvas
          ref={canvasRef}
          width={700}
          height={500}
          className="w-full cursor-crosshair bg-white"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={endDraw}
          onMouseLeave={endDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={endDraw}
        />
      </div>

      <p className="text-xs text-gray-400 mt-2 text-center">{hi ? 'माउस या उंगली से लिखें। डाउनलोड बटन से सहेजें।' : 'Write with mouse or finger. Save with download button.'}</p>
    </div>
  );
}
