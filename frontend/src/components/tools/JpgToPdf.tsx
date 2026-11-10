'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Upload,
  Download,
  Trash2,
  ChevronUp,
  ChevronDown,
  Plus,
  FileText,
  ShieldCheck,
  RotateCcw,
  Loader2,
  GripVertical,
  X,
} from 'lucide-react';
import jsPDF from 'jspdf';

interface ImageFile {
  id: string;
  name: string;
  dataUrl: string;
  width: number;
  height: number;
}

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
// Margin in mm
const MARGIN_MM = 10;

export function JpgToPdf() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [generating, setGenerating] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pageFit, setPageFit] = useState<'fit' | 'fill'>('fit');
  const inputRef = useRef<HTMLInputElement>(null);

  const loadImage = (file: File): Promise<ImageFile | null> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        resolve(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.onload = () => {
          resolve({
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            name: file.name,
            dataUrl: reader.result as string,
            width: img.width,
            height: img.height,
          });
        };
        img.onerror = () => resolve(null);
        img.src = reader.result as string;
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const addFiles = useCallback(async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const loaded = await Promise.all(fileArray.map(loadImage));
    const valid = loaded.filter((img): img is ImageFile => img !== null);
    if (valid.length > 0) {
      setImages((prev) => [...prev, ...valid]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) {
        addFiles(e.dataTransfer.files);
      }
    },
    [addFiles]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    setImages((prev) => {
      const newArr = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newArr.length) return prev;
      [newArr[index], newArr[targetIndex]] = [newArr[targetIndex], newArr[index]];
      return newArr;
    });
  };

  const clearAll = () => {
    setImages([]);
  };

  const generatePdf = useCallback(async () => {
    if (images.length === 0) return;
    setGenerating(true);

    // Small delay to let the UI update
    await new Promise((r) => setTimeout(r, 50));

    try {
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

      for (let i = 0; i < images.length; i++) {
        if (i > 0) pdf.addPage();

        const img = images[i];

        // Available area inside margins
        const availW = A4_WIDTH_MM - MARGIN_MM * 2;
        const availH = A4_HEIGHT_MM - MARGIN_MM * 2;

        // Image aspect ratio
        const imgRatio = img.width / img.height;
        const pageRatio = availW / availH;

        let drawW: number;
        let drawH: number;

        if (pageFit === 'fit') {
          // Fit entire image inside the available area
          if (imgRatio > pageRatio) {
            // Image is wider than the page area
            drawW = availW;
            drawH = availW / imgRatio;
          } else {
            // Image is taller than the page area
            drawH = availH;
            drawW = availH * imgRatio;
          }
        } else {
          // Fill: cover the entire available area, cropping is not possible with jsPDF addImage
          // so we just use fit behavior for fill too
          if (imgRatio > pageRatio) {
            drawW = availW;
            drawH = availW / imgRatio;
          } else {
            drawH = availH;
            drawW = availH * imgRatio;
          }
        }

        // Center on page
        const x = MARGIN_MM + (availW - drawW) / 2;
        const y = MARGIN_MM + (availH - drawH) / 2;

        // Determine format from dataUrl
        const format = img.dataUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG';

        pdf.addImage(img.dataUrl, format, x, y, drawW, drawH);
      }

      pdf.save('sarkari-alert-images.pdf');
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again with fewer or smaller images.');
    } finally {
      setGenerating(false);
    }
  }, [images, pageFit]);

  return (
    <div className="space-y-6">
      {/* Privacy Badge */}
      <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
        <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
        <span className="text-xs font-bold text-green-700 dark:text-green-300">
          100% Private — processed on your device. Nothing is uploaded to any server.
        </span>
      </div>

      {/* Upload Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all active:scale-[0.99] ${
          dragOver
            ? 'border-[#ff6f00] bg-orange-50 dark:bg-orange-950/20'
            : 'border-gray-300 dark:border-gray-600 hover:border-[#ff6f00]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/jpg"
          multiple
          onChange={handleFileInput}
          className="hidden"
        />
        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
        <p className="text-base font-bold text-gray-700 dark:text-gray-300">
          {images.length === 0 ? 'Upload Images' : 'Add More Images'}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          JPG, PNG, WebP — drag & drop or tap to browse
        </p>
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              {images.length} {images.length === 1 ? 'Image' : 'Images'} Added
            </h3>
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Remove All
            </button>
          </div>

          <div className="space-y-2">
            {images.map((img, index) => (
              <div
                key={img.id}
                className="flex items-center gap-3 p-3 bg-white dark:bg-gray-900 rounded-xl border-2 border-gray-200 dark:border-gray-700"
              >
                {/* Grip / Order indicator */}
                <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  <span className="text-[10px] font-bold text-gray-400">{index + 1}</span>
                </div>

                {/* Thumbnail */}
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0 border border-gray-200 dark:border-gray-700"
                />

                {/* Name and dimensions */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                    {img.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {img.width} x {img.height}px
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); moveImage(index, 'up'); }}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
                    title="Move up"
                  >
                    <ChevronUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveImage(index, 'down'); }}
                    disabled={index === images.length - 1}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 transition-colors"
                    title="Move down"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); removeImage(img.id); }}
                    className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    title="Remove"
                  >
                    <X className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add more button (secondary) */}
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 text-sm font-bold text-gray-600 dark:text-gray-400 hover:border-[#ff6f00] hover:text-[#ff6f00] transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Add More Images
          </button>

          {/* Page fit option */}
          <div>
            <label className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
              Image Sizing
            </label>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setPageFit('fit')}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                  pageFit === 'fit'
                    ? 'bg-[#1a3a5c] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Fit to Page
              </button>
              <button
                onClick={() => setPageFit('fill')}
                className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                  pageFit === 'fill'
                    ? 'bg-[#1a3a5c] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Fill Page
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1.5">
              {pageFit === 'fit'
                ? 'Each image fits entirely within the A4 page with margins.'
                : 'Each image fills the available A4 area while maintaining aspect ratio.'}
            </p>
          </div>

          {/* Generate PDF button */}
          <button
            onClick={generatePdf}
            disabled={generating}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[#1a3a5c] hover:bg-[#0d2137] text-white font-bold text-base transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Convert to PDF ({images.length} {images.length === 1 ? 'page' : 'pages'})
              </>
            )}
          </button>

          {/* Reset */}
          <button
            onClick={clearAll}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm transition-all active:scale-[0.98] hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      )}

      {/* Info section when no images */}
      {images.length === 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-3">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { step: '1', title: 'Upload Images', desc: 'Add JPG, PNG, or WebP images' },
              { step: '2', title: 'Arrange Order', desc: 'Reorder pages as needed' },
              { step: '3', title: 'Download PDF', desc: 'One image per A4 page' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-gray-900">
                <div className="w-7 h-7 rounded-full bg-[#1a3a5c] text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{item.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy notice (footer) */}
      <p className="text-xs text-center text-gray-400 dark:text-gray-500">
        Your images are processed entirely in your browser. Nothing is uploaded to any server.
      </p>
    </div>
  );
}
