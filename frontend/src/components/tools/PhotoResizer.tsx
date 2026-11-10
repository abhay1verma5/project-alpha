'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCcw, Image, FileSignature } from 'lucide-react';

const PRESETS = [
  { label: 'SSC CGL Photo', width: 200, height: 230, maxKB: 50, type: 'photo' },
  { label: 'SSC Signature', width: 140, height: 60, maxKB: 20, type: 'signature' },
  { label: 'UPSC Photo', width: 200, height: 230, maxKB: 300, type: 'photo' },
  { label: 'UPSC Signature', width: 200, height: 70, maxKB: 40, type: 'signature' },
  { label: 'Railway Photo', width: 200, height: 230, maxKB: 50, type: 'photo' },
  { label: 'Railway Signature', width: 140, height: 60, maxKB: 30, type: 'signature' },
  { label: 'IBPS / Bank Photo', width: 200, height: 230, maxKB: 50, type: 'photo' },
  { label: 'IBPS Signature', width: 140, height: 60, maxKB: 20, type: 'signature' },
  { label: 'Custom', width: 200, height: 200, maxKB: 50, type: 'photo' },
];

export function PhotoResizer() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [resultSize, setResultSize] = useState(0);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(230);
  const [maxKB, setMaxKB] = useState(50);
  const [processing, setProcessing] = useState(false);
  const [activePreset, setActivePreset] = useState('SSC CGL Photo');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const processImage = useCallback(async () => {
    if (!image) return;
    setProcessing(true);

    const img = new window.Image();
    img.src = image;
    await new Promise((resolve) => (img.onload = resolve));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Fill white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Draw image, maintaining aspect ratio (cover)
    const scale = Math.max(width / img.width, height / img.height);
    const x = (width - img.width * scale) / 2;
    const y = (height - img.height * scale) / 2;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

    // Binary search for quality to fit maxKB
    let lo = 0.1, hi = 1.0, bestBlob: string = '';
    for (let i = 0; i < 10; i++) {
      const mid = (lo + hi) / 2;
      const dataUrl = canvas.toDataURL('image/jpeg', mid);
      const sizeKB = Math.round((dataUrl.length * 3) / 4 / 1024);
      if (sizeKB <= maxKB) {
        bestBlob = dataUrl;
        lo = mid;
      } else {
        hi = mid;
      }
    }

    if (!bestBlob) {
      bestBlob = canvas.toDataURL('image/jpeg', 0.1);
    }

    const finalSize = Math.round((bestBlob.length * 3) / 4 / 1024);
    setResult(bestBlob);
    setResultSize(finalSize);
    setProcessing(false);
  }, [image, width, height, maxKB]);

  const download = () => {
    if (!result) return;
    const link = document.createElement('a');
    link.download = `sarkari-alert-${width}x${height}-${maxKB}kb.jpg`;
    link.href = result;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">Select Exam Preset</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => { setWidth(p.width); setHeight(p.height); setMaxKB(p.maxKB); setActivePreset(p.label); setResult(null); }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                activePreset === p.label
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {p.type === 'photo' ? <Image className="w-3.5 h-3.5" /> : <FileSignature className="w-3.5 h-3.5" />}
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom dimensions */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Width (px)</label>
          <input type="number" value={width} onChange={(e) => { setWidth(+e.target.value); setResult(null); }} className="w-full mt-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Height (px)</label>
          <input type="number" value={height} onChange={(e) => { setHeight(+e.target.value); setResult(null); }} className="w-full mt-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center" />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Max Size (KB)</label>
          <input type="number" value={maxKB} onChange={(e) => { setMaxKB(+e.target.value); setResult(null); }} className="w-full mt-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center" />
        </div>
      </div>

      {/* Upload */}
      <div
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl p-8 text-center cursor-pointer hover:border-[#ff6f00] transition-colors active:scale-[0.99]"
      >
        <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        {image ? (
          <div className="space-y-3">
            <img src={image} alt="Uploaded" className="max-h-40 mx-auto rounded-lg" />
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Tap to change image</p>
          </div>
        ) : (
          <div>
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-base font-bold text-gray-700 dark:text-gray-300">Upload Photo or Signature</p>
            <p className="text-sm text-gray-500 mt-1">JPG, PNG — processed on your device only</p>
          </div>
        )}
      </div>

      {/* Process button */}
      {image && (
        <button
          onClick={processImage}
          disabled={processing}
          className="w-full py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Resize to ${width}×${height}px (max ${maxKB}KB)`}
        </button>
      )}

      {/* Result */}
      {result && (
        <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 text-center space-y-4">
          <p className="text-lg font-extrabold text-green-700 dark:text-green-300">
            Done! Size: {resultSize}KB ({width}×{height}px)
          </p>
          <img src={result} alt="Resized" className="mx-auto border-2 border-green-300 rounded-lg" style={{ maxWidth: Math.min(width * 2, 300), maxHeight: Math.min(height * 2, 300) }} />
          <div className="flex gap-3 justify-center">
            <button onClick={download} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold active:scale-95 transition-all">
              <Download className="w-4 h-4" /> Download
            </button>
            <button onClick={() => { setResult(null); setImage(null); }} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold active:scale-95 transition-all">
              <RotateCcw className="w-4 h-4" /> New Image
            </button>
          </div>
        </div>
      )}

      {/* Privacy notice */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        🔒 Your image is processed entirely in your browser. Nothing is uploaded to any server.
      </p>
    </div>
  );
}
