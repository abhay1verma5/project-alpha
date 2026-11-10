'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Download, RotateCw, ZoomIn, ZoomOut, Sun, Contrast, RefreshCw } from 'lucide-react';

const PRESETS = [
  { label: 'SSC (3.5×4.5 cm)', w: 413, h: 531 },
  { label: 'UPSC (3.5×3.5 cm)', w: 413, h: 413 },
  { label: 'Railway (3×3.5 cm)', w: 354, h: 413 },
  { label: 'Passport (3.5×4.5 cm)', w: 413, h: 531 },
  { label: 'Banking (3.5×4.5 cm)', w: 413, h: 531 },
  { label: 'Custom', w: 400, h: 400 },
];

export function PhotoEditorClient() {
  const [image, setImage] = useState<string | null>(null);
  const [preset, setPreset] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [bgColor, setBgColor] = useState('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      setBrightness(100);
      setContrast(100);
      setRotation(0);
      setZoom(1);
    };
    reader.readAsDataURL(file);
  }, []);

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const p = PRESETS[preset];
    canvas.width = p.w;
    canvas.height = p.h;

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, p.w, p.h);

      ctx.save();
      ctx.translate(p.w / 2, p.h / 2);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`;

      const scale = Math.max(p.w / img.width, p.h / img.height);
      const sw = img.width * scale;
      const sh = img.height * scale;
      ctx.drawImage(img, -sw / 2, -sh / 2, sw, sh);
      ctx.restore();
    };
    img.src = image;
  }, [image, preset, brightness, contrast, rotation, zoom, bgColor]);

  // Redraw when settings change
  const redraw = useCallback(() => {
    if (typeof window !== 'undefined') {
      requestAnimationFrame(drawCanvas);
    }
  }, [drawCanvas]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawCanvas();
    setTimeout(() => {
      const link = document.createElement('a');
      link.download = `photo_${PRESETS[preset].w}x${PRESETS[preset].h}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      link.click();
    }, 100);
  };

  const reset = () => {
    setBrightness(100);
    setContrast(100);
    setRotation(0);
    setZoom(1);
    setBgColor('#ffffff');
  };

  return (
    <div className="space-y-6">
      {/* Upload area */}
      {!image ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-12 text-center hover:border-blue-400 transition-colors"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="font-semibold text-gray-700 dark:text-gray-300">Click to upload photo</p>
          <p className="text-sm text-gray-500 mt-1">JPG, PNG — Max 5MB</p>
        </button>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Preview */}
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-center min-h-[300px]">
              <canvas
                ref={canvasRef}
                className="max-w-full max-h-[400px] rounded shadow-lg"
                style={{ imageRendering: 'auto' }}
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Photo
              </button>
              <button
                onClick={() => { setImage(null); reset(); }}
                className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                New Photo
              </button>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Preset selector */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Photo Size</label>
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => { setPreset(i); setTimeout(redraw, 50); }}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
                      preset === i
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Brightness */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <Sun className="w-4 h-4" /> Brightness: {brightness}%
              </label>
              <input
                type="range" min={50} max={150} value={brightness}
                onChange={(e) => { setBrightness(+e.target.value); redraw(); }}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Contrast */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <Contrast className="w-4 h-4" /> Contrast: {contrast}%
              </label>
              <input
                type="range" min={50} max={150} value={contrast}
                onChange={(e) => { setContrast(+e.target.value); redraw(); }}
                className="w-full accent-blue-600"
              />
            </div>

            {/* Zoom */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <ZoomIn className="w-4 h-4" /> Zoom: {zoom.toFixed(1)}x
              </label>
              <div className="flex items-center gap-2">
                <button onClick={() => { setZoom(Math.max(0.5, zoom - 0.1)); redraw(); }} className="p-1.5 rounded bg-gray-200 dark:bg-gray-700">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <input
                  type="range" min={0.5} max={3} step={0.1} value={zoom}
                  onChange={(e) => { setZoom(+e.target.value); redraw(); }}
                  className="flex-1 accent-blue-600"
                />
                <button onClick={() => { setZoom(Math.min(3, zoom + 0.1)); redraw(); }} className="p-1.5 rounded bg-gray-200 dark:bg-gray-700">
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Rotation */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                <RotateCw className="w-4 h-4" /> Rotation: {rotation}°
              </label>
              <div className="flex gap-2">
                <button onClick={() => { setRotation((rotation - 90 + 360) % 360); redraw(); }}
                  className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg">-90°</button>
                <button onClick={() => { setRotation((rotation + 90) % 360); redraw(); }}
                  className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg">+90°</button>
                <button onClick={() => { setRotation(0); redraw(); }}
                  className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 rounded-lg">Reset</button>
              </div>
            </div>

            {/* Background color */}
            <div>
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1 block">Background Color</label>
              <div className="flex gap-2">
                {['#ffffff', '#f0f0f0', '#e3f2fd', '#fce4ec'].map((c) => (
                  <button key={c} onClick={() => { setBgColor(c); redraw(); }}
                    className={`w-8 h-8 rounded-full border-2 ${bgColor === c ? 'border-blue-600' : 'border-gray-300'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            {/* Reset all */}
            <button onClick={() => { reset(); redraw(); }}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 transition-colors">
              <RefreshCw className="w-4 h-4" /> Reset All Adjustments
            </button>
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {/* Requirements info */}
      <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-5 border border-blue-200 dark:border-blue-900">
        <h2 className="font-bold text-blue-900 dark:text-blue-200 mb-3">Common Photo Requirements</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm text-blue-800 dark:text-blue-300">
          <div><strong>SSC:</strong> 3.5×4.5 cm, 20-50 KB, JPG</div>
          <div><strong>UPSC:</strong> 3.5×3.5 cm, &lt;300 KB, JPG</div>
          <div><strong>Railway:</strong> 3×3.5 cm, 20-50 KB, JPG</div>
          <div><strong>Banking:</strong> 3.5×4.5 cm, 20-50 KB, JPG</div>
          <div><strong>Background:</strong> White or light blue preferred</div>
          <div><strong>Format:</strong> JPEG, clear face, no glasses</div>
        </div>
      </div>
    </div>
  );
}
