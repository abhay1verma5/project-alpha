'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Timer, RotateCcw, Play, Square, Keyboard, Award, AlertTriangle } from 'lucide-react';

const HINDI_PARAGRAPHS = [
  'भारत एक विशाल देश है जो दक्षिण एशिया में स्थित है। यह दुनिया का सातवाँ सबसे बड़ा देश है और जनसंख्या की दृष्टि से दूसरा सबसे बड़ा देश है। भारत की राजधानी नई दिल्ली है। यहाँ अनेक भाषाएँ बोली जाती हैं और हिंदी सबसे अधिक बोली जाने वाली भाषा है। भारत की संस्कृति बहुत प्राचीन और समृद्ध है। यहाँ के लोग मेहनती और प्रतिभाशाली हैं।',
  'कंप्यूटर आज के युग में बहुत महत्वपूर्ण उपकरण बन गया है। सरकारी कार्यालयों में सभी कार्य कंप्यूटर पर किए जाते हैं। हिंदी टाइपिंग का ज्ञान सरकारी नौकरी के लिए आवश्यक है। कई परीक्षाओं जैसे सीपीसीटी और कोर्ट परीक्षा में हिंदी टाइपिंग की परीक्षा होती है। नियमित अभ्यास से टाइपिंग की गति और शुद्धता दोनों बढ़ती हैं।',
  'शिक्षा मानव जीवन का सबसे महत्वपूर्ण अंग है। शिक्षित व्यक्ति समाज में सम्मान पाता है। आज के प्रतिस्पर्धी युग में अच्छी शिक्षा के बिना सफलता प्राप्त करना कठिन है। सरकार ने शिक्षा के क्षेत्र में अनेक योजनाएँ चलाई हैं। प्रत्येक बच्चे को शिक्षा का अधिकार मिलना चाहिए। शिक्षा से ही देश का विकास संभव है।',
  'स्वस्थ शरीर में स्वस्थ मन निवास करता है। प्रतिदिन व्यायाम करने से शरीर स्वस्थ और मन प्रसन्न रहता है। सुबह जल्दी उठना और योग करना स्वास्थ्य के लिए अत्यंत लाभदायक है। संतुलित आहार लेना भी बहुत आवश्यक है। जंक फूड से बचना चाहिए और हरी सब्जियाँ तथा फल खाने चाहिए। अच्छे स्वास्थ्य के बिना जीवन में कुछ भी प्राप्त करना कठिन है।',
  'भारत सरकार ने डिजिटल इंडिया कार्यक्रम की शुरुआत की है। इसका उद्देश्य देश को डिजिटल रूप से सशक्त बनाना है। इस योजना के तहत सरकारी सेवाएँ ऑनलाइन उपलब्ध कराई जा रही हैं। आधार कार्ड और डिजिलॉकर जैसी सुविधाएँ इसी का हिस्सा हैं। इंटरनेट की सुविधा गाँवों तक पहुँचाई जा रही है। डिजिटल साक्षरता को बढ़ावा देना इस कार्यक्रम का प्रमुख लक्ष्य है।',
];

const DURATION_OPTIONS = [
  { label: '5 min', value: 5 * 60 },
  { label: '10 min', value: 10 * 60 },
  { label: '15 min', value: 15 * 60 },
];

type TestStatus = 'idle' | 'running' | 'finished';

interface ResultData {
  wpm: number;
  accuracy: number;
  totalChars: number;
  correctChars: number;
  errors: number;
  totalWords: number;
  grade: string;
  gradeColor: string;
}

export function HindiTypingTest() {
  const [paragraph, setParagraph] = useState('');
  const [typedText, setTypedText] = useState('');
  const [duration, setDuration] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [status, setStatus] = useState<TestStatus>('idle');
  const [result, setResult] = useState<ResultData | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const pickRandomParagraph = useCallback(() => {
    const idx = Math.floor(Math.random() * HINDI_PARAGRAPHS.length);
    setParagraph(HINDI_PARAGRAPHS[idx]);
  }, []);

  useEffect(() => {
    pickRandomParagraph();
  }, [pickRandomParagraph]);

  const calculateStats = useCallback(() => {
    let correct = 0;
    let errors = 0;
    const len = typedText.length;
    for (let i = 0; i < len; i++) {
      if (i < paragraph.length && typedText[i] === paragraph[i]) {
        correct++;
      } else {
        errors++;
      }
    }
    const elapsed = (Date.now() - startTimeRef.current) / 1000 / 60; // minutes
    const words = typedText.trim().split(/\s+/).filter(Boolean).length;
    const wpm = elapsed > 0 ? Math.round(words / elapsed) : 0;
    const accuracy = len > 0 ? Math.round((correct / len) * 100) : 0;
    return { wpm, accuracy, totalChars: len, correctChars: correct, errors, totalWords: words };
  }, [typedText, paragraph]);

  const getGrade = (wpm: number): { grade: string; gradeColor: string } => {
    if (wpm >= 35) return { grade: 'Excellent', gradeColor: 'text-green-600 dark:text-green-400' };
    if (wpm >= 30) return { grade: 'Good', gradeColor: 'text-blue-600 dark:text-blue-400' };
    if (wpm >= 25) return { grade: 'Pass (CPCT)', gradeColor: 'text-yellow-600 dark:text-yellow-400' };
    return { grade: 'Needs Practice', gradeColor: 'text-red-600 dark:text-red-400' };
  };

  const finishTest = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus('finished');
    const stats = calculateStats();
    const { grade, gradeColor } = getGrade(stats.wpm);
    setResult({ ...stats, grade, gradeColor });
  }, [calculateStats]);

  useEffect(() => {
    if (status === 'running' && timeLeft <= 0) {
      finishTest();
    }
  }, [timeLeft, status, finishTest]);

  const startTest = () => {
    pickRandomParagraph();
    setTypedText('');
    setTimeLeft(duration);
    setResult(null);
    setStatus('running');
    startTimeRef.current = Date.now();
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) return 0;
        return prev - 1;
      });
    }, 1000);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const stopTest = () => {
    finishTest();
  };

  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setStatus('idle');
    setTypedText('');
    setTimeLeft(duration);
    setResult(null);
    pickRandomParagraph();
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const liveStats = status === 'running' ? calculateStats() : null;

  const renderHighlightedText = () => {
    return paragraph.split('').map((char, i) => {
      let cls = 'text-gray-700 dark:text-gray-300';
      if (i < typedText.length) {
        if (typedText[i] === char) {
          cls = 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40';
        } else {
          cls = 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/40';
        }
      } else if (i === typedText.length) {
        cls = 'text-gray-900 dark:text-white bg-yellow-200 dark:bg-yellow-700/50 border-b-2 border-yellow-500';
      }
      return (
        <span key={i} className={cls}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="space-y-6">
      {/* Duration selector */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Test Duration
        </label>
        <div className="flex gap-2 mt-2">
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                if (status === 'idle') {
                  setDuration(opt.value);
                  setTimeLeft(opt.value);
                }
              }}
              disabled={status !== 'idle'}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-60 ${
                duration === opt.value
                  ? 'bg-[#1a3a5c] text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Timer display */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6 text-[#1a3a5c] dark:text-blue-400" />
          <span
            className={`text-3xl font-extrabold font-mono ${
              timeLeft <= 30 && status === 'running'
                ? 'text-red-600 dark:text-red-400 animate-pulse'
                : 'text-gray-900 dark:text-white'
            }`}
          >
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="flex gap-2">
          {status === 'idle' && (
            <button
              onClick={startTest}
              className="px-5 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <Play className="w-4 h-4" /> Start
            </button>
          )}
          {status === 'running' && (
            <button
              onClick={stopTest}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
            >
              <Square className="w-4 h-4" /> Stop
            </button>
          )}
          <button
            onClick={resetTest}
            className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-bold text-sm flex items-center gap-2 transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Live stats */}
      {status === 'running' && liveStats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="text-center p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <p className="text-2xl font-extrabold text-blue-700 dark:text-blue-300">{liveStats.wpm}</p>
            <p className="text-xs font-bold text-blue-500 uppercase">WPM</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
            <p className="text-2xl font-extrabold text-green-700 dark:text-green-300">{liveStats.accuracy}%</p>
            <p className="text-xs font-bold text-green-500 uppercase">Accuracy</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
            <p className="text-2xl font-extrabold text-purple-700 dark:text-purple-300">{liveStats.totalChars}</p>
            <p className="text-xs font-bold text-purple-500 uppercase">Characters</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
            <p className="text-2xl font-extrabold text-red-700 dark:text-red-300">{liveStats.errors}</p>
            <p className="text-xs font-bold text-red-500 uppercase">Errors</p>
          </div>
        </div>
      )}

      {/* Source paragraph with highlighting */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 block">
          Source Text (Type this)
        </label>
        <div className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-lg leading-relaxed font-medium select-none min-h-[120px]">
          {renderHighlightedText()}
        </div>
      </div>

      {/* Typing area */}
      <div>
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2 block">
          Type Here
        </label>
        <textarea
          ref={textareaRef}
          value={typedText}
          onChange={(e) => {
            if (status === 'running') setTypedText(e.target.value);
          }}
          disabled={status !== 'running'}
          placeholder={status === 'idle' ? 'Start बटन दबाएँ और टाइप करना शुरू करें...' : status === 'finished' ? 'टेस्ट समाप्त हो गया है।' : 'यहाँ टाइप करें...'}
          className="w-full mt-1 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium text-lg min-h-[150px] resize-none focus:outline-none focus:border-[#1a3a5c] dark:focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          dir="auto"
          lang="hi"
        />
      </div>

      {/* Result card */}
      {result && (
        <div className="rounded-2xl border-2 border-[#1a3a5c] dark:border-blue-700 bg-white dark:bg-gray-900 p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Award className="w-8 h-8 text-[#1a3a5c] dark:text-blue-400" />
            <h3 className="text-xl font-extrabold text-gray-900 dark:text-white">Test Result</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="text-center p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
              <p className="text-3xl font-extrabold text-blue-700 dark:text-blue-300">{result.wpm}</p>
              <p className="text-xs font-bold text-blue-500 uppercase">WPM</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
              <p className="text-3xl font-extrabold text-green-700 dark:text-green-300">{result.accuracy}%</p>
              <p className="text-xs font-bold text-green-500 uppercase">Accuracy</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800">
              <p className="text-3xl font-extrabold text-purple-700 dark:text-purple-300">{result.totalWords}</p>
              <p className="text-xs font-bold text-purple-500 uppercase">Total Words</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <p className="text-3xl font-extrabold text-gray-700 dark:text-gray-300">{result.totalChars}</p>
              <p className="text-xs font-bold text-gray-500 uppercase">Characters</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
              <p className="text-3xl font-extrabold text-red-700 dark:text-red-300">{result.errors}</p>
              <p className="text-xs font-bold text-red-500 uppercase">Errors</p>
            </div>
            <div className="text-center p-4 rounded-xl bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800">
              <p className={`text-2xl font-extrabold ${result.gradeColor}`}>{result.grade}</p>
              <p className="text-xs font-bold text-yellow-600 dark:text-yellow-500 uppercase">Grade</p>
            </div>
          </div>

          {/* CPCT grading info */}
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 space-y-2">
            <p className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase">CPCT Grading Criteria</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
              <div className={`px-3 py-2 rounded-lg ${result.wpm >= 25 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'} font-semibold`}>
                25+ WPM = Pass
              </div>
              <div className={`px-3 py-2 rounded-lg ${result.wpm >= 30 ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'} font-semibold`}>
                30+ WPM = Good
              </div>
              <div className={`px-3 py-2 rounded-lg ${result.wpm >= 35 ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'} font-semibold`}>
                35+ WPM = Excellent
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Font info note */}
      <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-800 dark:text-amber-300">
          <p className="font-bold mb-1">Font Information</p>
          <p>
            यह टेस्ट Unicode Hindi input पर काम करता है। CPCT और Court परीक्षा में Mangal font (Unicode) और Kruti Dev font (Remington layout) इस्तेमाल होते हैं।
            अपने कंप्यूटर में Hindi Phonetic या Inscript keyboard layout enable करें। Windows पर <strong>Win + Space</strong> से language बदलें।
          </p>
        </div>
      </div>

      {/* Keyboard shortcut */}
      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 flex items-start gap-3">
        <Keyboard className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p className="font-bold text-gray-700 dark:text-gray-300 mb-1">Tips for Better Speed</p>
          <ul className="list-disc list-inside space-y-1">
            <li>रोज़ 30 मिनट अभ्यास करें</li>
            <li>पहले accuracy पर ध्यान दें, speed अपने आप बढ़ेगी</li>
            <li>कीबोर्ड को बिना देखे टाइप करने की कोशिश करें (Touch Typing)</li>
            <li>SSC, Court, CPCT — सभी में 25-35 WPM Hindi typing ज़रूरी है</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
