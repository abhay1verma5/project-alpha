'use client';

import { useState, useRef } from 'react';
import { Upload, FileText, Image, CheckCircle2, XCircle, Info, ExternalLink } from 'lucide-react';

interface FileInfo {
  name: string;
  sizeBytes: number;
  sizeKB: number;
  sizeMB: number;
  type: string;
  isImage: boolean;
  isPdf: boolean;
  width?: number;
  height?: number;
}

interface Requirement {
  label: string;
  minKB: number;
  maxKB: number;
}

const PRESET_REQUIREMENTS: Requirement[] = [
  { label: 'SSC Photo (20-50 KB)', minKB: 20, maxKB: 50 },
  { label: 'UPSC Photo (20-300 KB)', minKB: 20, maxKB: 300 },
  { label: 'Railway Photo (20-50 KB)', minKB: 20, maxKB: 50 },
  { label: 'Signature (10-20 KB)', minKB: 10, maxKB: 20 },
  { label: 'PDF under 200 KB', minKB: 0, maxKB: 200 },
  { label: 'PDF under 500 KB', minKB: 0, maxKB: 500 },
  { label: 'PDF under 1 MB', minKB: 0, maxKB: 1024 },
  { label: 'PDF under 2 MB', minKB: 0, maxKB: 2048 },
];

const ALL_CHECK_REQUIREMENTS: Requirement[] = [
  { label: 'Photo: 20-50 KB', minKB: 20, maxKB: 50 },
  { label: 'Signature: 10-20 KB', minKB: 10, maxKB: 20 },
  { label: 'PDF: under 200 KB', minKB: 0, maxKB: 200 },
  { label: 'PDF: under 500 KB', minKB: 0, maxKB: 500 },
  { label: 'PDF: under 1 MB', minKB: 0, maxKB: 1024 },
  { label: 'PDF: under 2 MB', minKB: 0, maxKB: 2048 },
];

export function PdfCompressor() {
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<Requirement | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const sizeBytes = file.size;
    const sizeKB = parseFloat((sizeBytes / 1024).toFixed(2));
    const sizeMB = parseFloat((sizeBytes / (1024 * 1024)).toFixed(2));
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    const info: FileInfo = {
      name: file.name,
      sizeBytes,
      sizeKB,
      sizeMB,
      type: file.type,
      isImage,
      isPdf,
    };

    if (isImage) {
      const img = new window.Image();
      img.onload = () => {
        info.width = img.naturalWidth;
        info.height = img.naturalHeight;
        setFileInfo({ ...info });
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(file);
    } else {
      setFileInfo(info);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const meetsRequirement = (req: Requirement) => {
    if (!fileInfo) return null;
    return fileInfo.sizeKB >= req.minKB && fileInfo.sizeKB <= req.maxKB;
  };

  const formatSize = (kb: number) => {
    if (kb >= 1024) return `${(kb / 1024).toFixed(2)} MB`;
    return `${kb.toFixed(2)} KB`;
  };

  return (
    <div className="space-y-6">
      {/* Notice */}
      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 dark:text-blue-300">
          <strong>यह एक File Size Checker है।</strong> यह tool आपकी file की size जाँचता है और बताता है कि वह सरकारी फॉर्म की requirements को पूरा करती है या नहीं। Actual compression के लिए नीचे दिए गए tools इस्तेमाल करें।
        </p>
      </div>

      {/* File upload */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          dragOver
            ? 'border-[#1a3a5c] bg-blue-50 dark:bg-blue-950/20 dark:border-blue-500'
            : 'border-gray-300 dark:border-gray-600 hover:border-[#1a3a5c] dark:hover:border-blue-500'
        }`}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
        <p className="text-lg font-bold text-gray-700 dark:text-gray-300">
          Click or Drag & Drop File
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          PDF, JPG, PNG, JPEG supported
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,.pdf"
          onChange={onFileChange}
          className="hidden"
        />
      </div>

      {/* File info */}
      {fileInfo && (
        <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-4">
          <div className="flex items-center gap-3">
            {fileInfo.isImage ? (
              <Image className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            ) : (
              <FileText className="w-8 h-8 text-red-600 dark:text-red-400" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-lg font-extrabold text-gray-900 dark:text-white truncate">{fileInfo.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{fileInfo.type}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{formatSize(fileInfo.sizeKB)}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">File Size</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{fileInfo.sizeBytes.toLocaleString()}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Bytes</p>
            </div>
            {fileInfo.isImage && fileInfo.width && fileInfo.height && (
              <div className="text-center p-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  {fileInfo.width} x {fileInfo.height}
                </p>
                <p className="text-xs font-bold text-gray-500 uppercase">Dimensions (px)</p>
              </div>
            )}
          </div>

          {/* Requirement checks */}
          <div>
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
              Requirement Check
            </p>
            <div className="space-y-2">
              {ALL_CHECK_REQUIREMENTS.map((req, i) => {
                const meets = meetsRequirement(req);
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                      meets
                        ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800'
                    }`}
                  >
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{req.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${meets ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {meets ? 'Pass' : 'Fail'}
                      </span>
                      {meets ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Preset buttons */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Quick Check Presets
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {PRESET_REQUIREMENTS.map((preset, i) => {
            const meets = fileInfo ? meetsRequirement(preset) : null;
            return (
              <button
                key={i}
                onClick={() => setSelectedPreset(preset)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 border ${
                  selectedPreset?.label === preset.label
                    ? 'bg-[#1a3a5c] text-white border-[#1a3a5c]'
                    : meets === true
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-300 dark:border-green-700'
                    : meets === false
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-300 dark:border-red-700'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                }`}
              >
                {preset.label}
                {meets !== null && (meets ? ' ✓' : ' ✗')}
              </button>
            );
          })}
        </div>
        {selectedPreset && fileInfo && (
          <div className={`mt-3 p-3 rounded-xl text-sm font-semibold ${
            meetsRequirement(selectedPreset)
              ? 'bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400'
              : 'bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400'
          }`}>
            {meetsRequirement(selectedPreset)
              ? `Your file (${formatSize(fileInfo.sizeKB)}) meets the "${selectedPreset.label}" requirement (${selectedPreset.minKB}-${selectedPreset.maxKB} KB).`
              : `Your file (${formatSize(fileInfo.sizeKB)}) does NOT meet the "${selectedPreset.label}" requirement (${selectedPreset.minKB}-${selectedPreset.maxKB} KB). ${
                  fileInfo.sizeKB > selectedPreset.maxKB ? 'File is too large.' : 'File is too small.'
                }`
            }
          </div>
        )}
      </div>

      {/* Tips section */}
      <div className="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 space-y-4">
        <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Compression Tips / कम्प्रेशन के तरीके</h3>

        <div className="space-y-3">
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Image Compression (Photo/Signature)</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside">
              <li>
                <a href="https://tinypng.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                  TinyPNG.com <ExternalLink className="w-3 h-3" />
                </a> — Best for PNG/JPEG compression
              </li>
              <li>
                <a href="https://compressjpeg.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                  CompressJPEG.com <ExternalLink className="w-3 h-3" />
                </a> — JPEG compression with quality control
              </li>
              <li>
                <a href="https://imageresizer.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                  ImageResizer.com <ExternalLink className="w-3 h-3" />
                </a> — Resize + compress images
              </li>
              <li>MS Paint: Open image → Resize → Save as JPEG with lower quality</li>
            </ul>
          </div>

          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">PDF Compression</p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1.5 list-disc list-inside">
              <li>
                <a href="https://www.ilovepdf.com/compress_pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                  iLovePDF.com <ExternalLink className="w-3 h-3" />
                </a> — Best free PDF compressor
              </li>
              <li>
                <a href="https://smallpdf.com/compress-pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                  SmallPDF.com <ExternalLink className="w-3 h-3" />
                </a> — Simple PDF compression
              </li>
              <li>
                <a href="https://www.pdf24.org/en/compress-pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                  PDF24.org <ExternalLink className="w-3 h-3" />
                </a> — Free unlimited PDF tools
              </li>
            </ul>
          </div>

          <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
            <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-1">Common Government Form Requirements</p>
            <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1 list-disc list-inside">
              <li>Photo: JPG/JPEG, 20-50 KB, 3.5cm x 4.5cm (passport size)</li>
              <li>Signature: JPG/JPEG, 10-20 KB, white background</li>
              <li>Photo dimensions: Usually 200x230 px or as specified</li>
              <li>Signature dimensions: Usually 140x60 px or as specified</li>
              <li>PDF documents: Usually under 1-2 MB</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
