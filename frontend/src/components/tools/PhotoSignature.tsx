'use client';

import { useState, useRef, useCallback } from 'react';
import { Download, RotateCcw, Image, FileSignature, ShieldCheck, Combine } from 'lucide-react';

/* ────────────────────────────── Preset Types ────────────────────────────── */

interface ExamPreset {
  label: string;
  photo: { width: number; height: number; maxKB: number };
  signature: { width: number; height: number; maxKB: number };
}

const EXAM_PRESETS: ExamPreset[] = [
  {
    label: 'SSC (CGL/CHSL/MTS)',
    photo: { width: 200, height: 230, maxKB: 100 },
    signature: { width: 200, height: 86, maxKB: 40 },
  },
  {
    label: 'UPSC (CSE/CDS/NDA)',
    photo: { width: 300, height: 360, maxKB: 300 },
    signature: { width: 140, height: 60, maxKB: 100 },
  },
  {
    label: 'Railway / RRB',
    photo: { width: 200, height: 230, maxKB: 100 },
    signature: { width: 200, height: 86, maxKB: 40 },
  },
  {
    label: 'Banking / IBPS',
    photo: { width: 200, height: 230, maxKB: 50 },
    signature: { width: 140, height: 60, maxKB: 20 },
  },
  {
    label: 'Custom',
    photo: { width: 200, height: 230, maxKB: 100 },
    signature: { width: 140, height: 60, maxKB: 40 },
  },
];

/* ────────────────────────── Image Processing Utils ──────────────────────── */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/** Resize an image to exact dimensions, compress to fit maxKB, return dataURL + actual KB. */
async function resizeAndCompress(
  src: string,
  targetW: number,
  targetH: number,
  maxKB: number,
): Promise<{ dataUrl: string; sizeKB: number }> {
  const img = await loadImage(src);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d')!;

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, targetW, targetH);

  // Draw with cover-crop
  const scale = Math.max(targetW / img.width, targetH / img.height);
  const x = (targetW - img.width * scale) / 2;
  const y = (targetH - img.height * scale) / 2;
  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);

  // Binary-search quality to fit maxKB
  let lo = 0.05,
    hi = 1.0,
    best = '';
  for (let i = 0; i < 12; i++) {
    const mid = (lo + hi) / 2;
    const dataUrl = canvas.toDataURL('image/jpeg', mid);
    const sizeKB = Math.round((dataUrl.length * 3) / 4 / 1024);
    if (sizeKB <= maxKB) {
      best = dataUrl;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (!best) best = canvas.toDataURL('image/jpeg', 0.05);
  const finalKB = Math.round((best.length * 3) / 4 / 1024);
  return { dataUrl: best, sizeKB: finalKB };
}

/* ────────────────────────────── Component ───────────────────────────────── */

export function PhotoSignature() {
  /* --- state --- */
  const [activePreset, setActivePreset] = useState<string>('SSC (CGL/CHSL/MTS)');
  const [photoSpec, setPhotoSpec] = useState(EXAM_PRESETS[0].photo);
  const [sigSpec, setSigSpec] = useState(EXAM_PRESETS[0].signature);

  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [sigSrc, setSigSrc] = useState<string | null>(null);

  const [processing, setProcessing] = useState(false);

  // results
  const [photoResult, setPhotoResult] = useState<{ dataUrl: string; sizeKB: number } | null>(null);
  const [sigResult, setSigResult] = useState<{ dataUrl: string; sizeKB: number } | null>(null);
  const [combinedResult, setCombinedResult] = useState<string | null>(null);
  const [combinedKB, setCombinedKB] = useState(0);

  const photoInputRef = useRef<HTMLInputElement>(null);
  const sigInputRef = useRef<HTMLInputElement>(null);

  /* --- helpers --- */
  const isCustom = activePreset === 'Custom';

  const selectPreset = (p: ExamPreset) => {
    setActivePreset(p.label);
    setPhotoSpec({ ...p.photo });
    setSigSpec({ ...p.signature });
    clearResults();
  };

  const clearResults = () => {
    setPhotoResult(null);
    setSigResult(null);
    setCombinedResult(null);
    setCombinedKB(0);
  };

  const handleFile = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setter(reader.result as string);
      clearResults();
    };
    reader.readAsDataURL(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  /* --- process --- */
  const processImages = useCallback(async () => {
    if (!photoSrc || !sigSrc) return;
    setProcessing(true);

    try {
      // Resize photo and signature independently
      const [photo, sig] = await Promise.all([
        resizeAndCompress(photoSrc, photoSpec.width, photoSpec.height, photoSpec.maxKB),
        resizeAndCompress(sigSrc, sigSpec.width, sigSpec.height, sigSpec.maxKB),
      ]);

      setPhotoResult(photo);
      setSigResult(sig);

      // Build combined image (photo on top, signature below with a small gap)
      const gap = 10;
      const comboW = Math.max(photoSpec.width, sigSpec.width);
      const comboH = photoSpec.height + gap + sigSpec.height;

      const canvas = document.createElement('canvas');
      canvas.width = comboW;
      canvas.height = comboH;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, comboW, comboH);

      // Draw resized photo centered
      const photoImg = await loadImage(photo.dataUrl);
      const photoX = Math.round((comboW - photoSpec.width) / 2);
      ctx.drawImage(photoImg, photoX, 0, photoSpec.width, photoSpec.height);

      // Draw resized signature centered
      const sigImg = await loadImage(sig.dataUrl);
      const sigX = Math.round((comboW - sigSpec.width) / 2);
      ctx.drawImage(sigImg, sigX, photoSpec.height + gap, sigSpec.width, sigSpec.height);

      // Label text
      ctx.fillStyle = '#888888';
      ctx.font = 'bold 10px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Photo', comboW / 2, photoSpec.height + gap - 2);

      const comboDataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const comboKB = Math.round((comboDataUrl.length * 3) / 4 / 1024);
      setCombinedResult(comboDataUrl);
      setCombinedKB(comboKB);
    } catch {
      // silently fail
    } finally {
      setProcessing(false);
    }
  }, [photoSrc, sigSrc, photoSpec, sigSpec]);

  /* --- downloads --- */
  const downloadFile = (dataUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
  };

  const resetAll = () => {
    setPhotoSrc(null);
    setSigSrc(null);
    clearResults();
  };

  /* ────────────────────────────── Render ────────────────────────────────── */

  return (
    <div className="space-y-6">
      {/* Privacy badge */}
      <div className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
        <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="text-xs font-bold text-green-700 dark:text-green-300">100% Private — Images are processed in your browser, never uploaded</span>
      </div>

      {/* ── Exam Preset Selection ── */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
          Select Exam
        </h3>
        <div className="flex flex-wrap gap-2">
          {EXAM_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => selectPreset(p)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                activePreset === p.label
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Spec Summary / Custom Inputs ── */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 space-y-4">
        {/* Photo specs */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Image className="w-3.5 h-3.5" /> Photo Specs
          </h4>
          {isCustom ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Width (px)</label>
                <input type="number" value={photoSpec.width} onChange={(e) => { setPhotoSpec({ ...photoSpec, width: +e.target.value }); clearResults(); }} className="w-full mt-1 px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Height (px)</label>
                <input type="number" value={photoSpec.height} onChange={(e) => { setPhotoSpec({ ...photoSpec, height: +e.target.value }); clearResults(); }} className="w-full mt-1 px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Max KB</label>
                <input type="number" value={photoSpec.maxKB} onChange={(e) => { setPhotoSpec({ ...photoSpec, maxKB: +e.target.value }); clearResults(); }} className="w-full mt-1 px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-sm" />
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {photoSpec.width} x {photoSpec.height}px &middot; Max {photoSpec.maxKB}KB
            </p>
          )}
        </div>

        {/* Signature specs */}
        <div>
          <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FileSignature className="w-3.5 h-3.5" /> Signature Specs
          </h4>
          {isCustom ? (
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Width (px)</label>
                <input type="number" value={sigSpec.width} onChange={(e) => { setSigSpec({ ...sigSpec, width: +e.target.value }); clearResults(); }} className="w-full mt-1 px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Height (px)</label>
                <input type="number" value={sigSpec.height} onChange={(e) => { setSigSpec({ ...sigSpec, height: +e.target.value }); clearResults(); }} className="w-full mt-1 px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-sm" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase">Max KB</label>
                <input type="number" value={sigSpec.maxKB} onChange={(e) => { setSigSpec({ ...sigSpec, maxKB: +e.target.value }); clearResults(); }} className="w-full mt-1 px-3 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-center text-sm" />
              </div>
            </div>
          ) : (
            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {sigSpec.width} x {sigSpec.height}px &middot; Max {sigSpec.maxKB}KB
            </p>
          )}
        </div>
      </div>

      {/* ── Upload Section ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Photo upload */}
        <div
          onClick={() => photoInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors active:scale-[0.99] ${
            photoSrc
              ? 'border-blue-300 dark:border-blue-700 bg-blue-50/50 dark:bg-blue-950/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-[#ff6f00]'
          }`}
        >
          <input ref={photoInputRef} type="file" accept="image/*" onChange={handleFile(setPhotoSrc)} className="hidden" />
          {photoSrc ? (
            <div className="space-y-2">
              <img src={photoSrc} alt="Photo" className="max-h-32 mx-auto rounded-lg" />
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tap to change photo</p>
            </div>
          ) : (
            <div>
              <Image className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Upload Photo</p>
              <p className="text-xs text-gray-500 mt-1">Passport-size photo (JPG/PNG)</p>
            </div>
          )}
        </div>

        {/* Signature upload */}
        <div
          onClick={() => sigInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-colors active:scale-[0.99] ${
            sigSrc
              ? 'border-purple-300 dark:border-purple-700 bg-purple-50/50 dark:bg-purple-950/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-[#ff6f00]'
          }`}
        >
          <input ref={sigInputRef} type="file" accept="image/*" onChange={handleFile(setSigSrc)} className="hidden" />
          {sigSrc ? (
            <div className="space-y-2">
              <img src={sigSrc} alt="Signature" className="max-h-32 mx-auto rounded-lg" />
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Tap to change signature</p>
            </div>
          ) : (
            <div>
              <FileSignature className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-700 dark:text-gray-300">Upload Signature</p>
              <p className="text-xs text-gray-500 mt-1">Signature on white paper (JPG/PNG)</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Process Button ── */}
      {photoSrc && sigSrc && (
        <button
          onClick={processImages}
          disabled={processing}
          className="w-full py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Combine className="w-5 h-5" />
          {processing ? 'Processing...' : 'Combine Photo + Signature'}
        </button>
      )}

      {/* ── Results ── */}
      {photoResult && sigResult && combinedResult && (
        <div className="space-y-5">
          {/* Combined preview */}
          <div className="bg-green-50 dark:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-2xl p-6 text-center space-y-4">
            <p className="text-lg font-extrabold text-green-700 dark:text-green-300">
              Combined Image Ready!
            </p>
            <div className="inline-block bg-white border-2 border-green-300 rounded-lg p-2">
              <img
                src={combinedResult}
                alt="Combined photo + signature"
                className="mx-auto"
                style={{ maxWidth: 300 }}
              />
            </div>
            <p className="text-sm font-semibold text-green-600 dark:text-green-400">
              Combined: {combinedKB}KB
            </p>
            <button
              onClick={() => downloadFile(combinedResult, `sarkari-alert-photo-signature-combined.jpg`)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold active:scale-95 transition-all"
            >
              <Download className="w-4 h-4" /> Download Combined Image
            </button>
          </div>

          {/* Individual downloads */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Photo result */}
            <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 text-center space-y-3">
              <p className="text-sm font-bold text-blue-700 dark:text-blue-300">
                Photo: {photoSpec.width}x{photoSpec.height}px &middot; {photoResult.sizeKB}KB
              </p>
              <img
                src={photoResult.dataUrl}
                alt="Resized photo"
                className="mx-auto border border-blue-300 rounded-lg"
                style={{ maxWidth: Math.min(photoSpec.width * 2, 200), maxHeight: Math.min(photoSpec.height * 2, 260) }}
              />
              {photoResult.sizeKB > photoSpec.maxKB && (
                <p className="text-xs font-bold text-red-600 dark:text-red-400">
                  Warning: {photoResult.sizeKB}KB exceeds {photoSpec.maxKB}KB limit. Try a simpler image.
                </p>
              )}
              <button
                onClick={() => downloadFile(photoResult.dataUrl, `sarkari-alert-photo-${photoSpec.width}x${photoSpec.height}.jpg`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download Photo
              </button>
            </div>

            {/* Signature result */}
            <div className="bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-2xl p-4 text-center space-y-3">
              <p className="text-sm font-bold text-purple-700 dark:text-purple-300">
                Signature: {sigSpec.width}x{sigSpec.height}px &middot; {sigResult.sizeKB}KB
              </p>
              <img
                src={sigResult.dataUrl}
                alt="Resized signature"
                className="mx-auto border border-purple-300 rounded-lg"
                style={{ maxWidth: Math.min(sigSpec.width * 2, 200), maxHeight: Math.min(sigSpec.height * 2, 120) }}
              />
              {sigResult.sizeKB > sigSpec.maxKB && (
                <p className="text-xs font-bold text-red-600 dark:text-red-400">
                  Warning: {sigResult.sizeKB}KB exceeds {sigSpec.maxKB}KB limit. Try a cleaner signature.
                </p>
              )}
              <button
                onClick={() => downloadFile(sigResult.dataUrl, `sarkari-alert-signature-${sigSpec.width}x${sigSpec.height}.jpg`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold active:scale-95 transition-all"
              >
                <Download className="w-3.5 h-3.5" /> Download Signature
              </button>
            </div>
          </div>

          {/* Reset */}
          <div className="text-center">
            <button
              onClick={resetAll}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold active:scale-95 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Start Over
            </button>
          </div>
        </div>
      )}

      {/* ── Instructions ── */}
      {!combinedResult && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">How to use:</h3>
          <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <li>Select your exam (SSC, UPSC, Railway, Banking) or choose Custom.</li>
            <li>Upload your passport-size photo (face visible, white background preferred).</li>
            <li>Upload your signature (sign on white paper, take a photo or scan).</li>
            <li>Click &quot;Combine Photo + Signature&quot; to process.</li>
            <li>Download the combined image, or download photo and signature separately.</li>
          </ol>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            Tip: For best results, use a clear passport photo against a white background and sign with a dark pen on white paper.
          </p>
        </div>
      )}

      {/* Privacy footer */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        Your images are processed entirely in your browser. Nothing is uploaded to any server.
      </p>
    </div>
  );
}
