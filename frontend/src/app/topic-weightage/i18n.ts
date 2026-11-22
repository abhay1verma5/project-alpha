// Localised strings for the topic-weightage pages.
// 'tw.*' keys live here; any other key falls through to the shared tr() in lib/translations.

import type { Language } from '@/components/LanguageProvider';
import { tr } from '@/lib/translations';

type Entry = { en: string; hi: string };

const TW: Record<string, Entry> = {
  'tw.badge': { en: 'Data-driven Analysis', hi: 'डेटा-आधारित विश्लेषण' },
  'tw.title': { en: 'Topic-wise Weightage', hi: 'विषयवार वेटेज' },
  'tw.subtitle': {
    en: 'See which topics carry the most marks, exam by exam. Based on past papers.',
    hi: 'हर परीक्षा में किन विषयों के सबसे ज़्यादा अंक हैं, देखें। पिछले पेपरों पर आधारित।',
  },
  'tw.search.label': { en: 'Search exam or topic', hi: 'परीक्षा या विषय खोजें' },
  'tw.search.placeholder': { en: 'e.g. SSC CGL, Reasoning, Polity', hi: 'जैसे SSC CGL, रीज़निंग, पॉलिटी' },
  'tw.search.button': { en: 'Search', hi: 'खोजें' },
  'tw.filter.category': { en: 'Category', hi: 'श्रेणी' },
  'tw.filter.level': { en: 'Qualification', hi: 'योग्यता' },
  'tw.filter.state': { en: 'State', hi: 'राज्य' },
  'tw.filter.trend': { en: 'Priority topics', hi: 'प्राथमिकता वाले विषय' },
  'tw.filter.sort': { en: 'Sort by', hi: 'क्रम' },
  'tw.filter.all': { en: 'All', hi: 'सभी' },
  'tw.filter.any': { en: 'Any', hi: 'कोई भी' },
  'tw.filter.hasHigh': { en: 'Has high-priority topics', hi: 'उच्च प्राथमिकता वाले विषय हैं' },
  'tw.filter.hasMedium': { en: 'Has medium-priority topics', hi: 'मध्यम प्राथमिकता वाले विषय हैं' },
  'tw.filter.hasLow': { en: 'Has low-priority topics', hi: 'कम प्राथमिकता वाले विषय हैं' },
  'tw.sort.name': { en: 'Name (A–Z)', hi: 'नाम (A–Z)' },
  'tw.sort.questions': { en: 'Most questions', hi: 'सबसे ज़्यादा प्रश्न' },
  'tw.reset': { en: 'Clear filters', hi: 'फ़िल्टर हटाएँ' },
  'tw.count': { en: '{n} exams found', hi: '{n} परीक्षाएँ मिलीं' },
  'tw.empty.title': { en: 'No exams match these filters', hi: 'इन फ़िल्टर से कोई परीक्षा नहीं मिली' },
  'tw.empty.body': { en: 'Try a broader search or clear the filters.', hi: 'खोज को व्यापक करें या फ़िल्टर हटाएँ।' },
  'tw.error': {
    en: 'Topic weightage data is unavailable right now. Please try again later.',
    hi: 'अभी विषयवार डेटा उपलब्ध नहीं है। कृपया बाद में प्रयास करें।',
  },
  'tw.approx': {
    en: 'Approximate — based on past papers. Verify with the official notification.',
    hi: 'अनुमानित — पिछले पेपरों पर आधारित। आधिकारिक अधिसूचना से ज़रूर जाँच लें।',
  },
  'tw.asOf': { en: 'As of {date}', hi: '{date} तक' },
  'tw.qs': { en: '{n} Qs', hi: '{n} प्रश्न' },
  'tw.questions': { en: 'Questions', hi: 'प्रश्न' },
  'tw.marks': { en: 'Marks', hi: 'अंक' },
  'tw.subjects': { en: 'Subjects', hi: 'विषय' },
  'tw.negative': { en: 'Negative', hi: 'नेगेटिव' },
  'tw.topTopics': { en: 'Top topics', hi: 'प्रमुख विषय' },
  'tw.viewWeightage': { en: 'View weightage', hi: 'वेटेज देखें' },
  'tw.allExams': { en: 'All exams', hi: 'सभी परीक्षाएँ' },
  'tw.topicSearch': { en: 'Search topics', hi: 'विषय खोजें' },
  'tw.topicSearch.placeholder': { en: 'e.g. Polity, Percentage', hi: 'जैसे पॉलिटी, प्रतिशत' },
  'tw.noTopics': { en: 'No topics match your search.', hi: 'आपकी खोज से कोई विषय नहीं मिला।' },
  'tw.subjectNote': {
    en: 'Each subject adds up to 100%. Chapter-wise weightage from past papers.',
    hi: 'हर विषय का कुल योग 100% है। पिछले पेपरों पर आधारित चैप्टर-वार वेटेज।',
  },
  'tw.trend.high': { en: 'High priority', hi: 'उच्च प्राथमिकता' },
  'tw.trend.medium': { en: 'Medium', hi: 'मध्यम' },
  'tw.trend.low': { en: 'Low', hi: 'कम' },
  'tw.cta.pyq': { en: 'Previous Year Papers', hi: 'पिछले वर्षों के पेपर' },
  'tw.cta.pyqDesc': {
    en: 'Download year-wise PYQ PDFs from official sources',
    hi: 'आधिकारिक स्रोतों से साल-वार PYQ PDF डाउनलोड करें',
  },
  'tw.cta.downloadPapers': { en: 'Download Papers', hi: 'पेपर डाउनलोड करें' },
  'tw.cta.mock': { en: 'Free Mock Tests', hi: 'फ़्री मॉक टेस्ट' },
  'tw.cta.mockDesc': {
    en: 'Practice with exam-pattern mock tests for all exams',
    hi: 'सभी परीक्षाओं के पैटर्न वाले मॉक टेस्ट से अभ्यास करें',
  },
  'tw.cta.startPractice': { en: 'Start Practice', hi: 'अभ्यास शुरू करें' },
};

/** Translate a key. Vars replace {name} placeholders. */
export function twTr(key: string, lang: Language, vars?: Record<string, string | number>): string {
  const entry = TW[key];
  let text = entry ? (lang === 'hi' ? entry.hi : entry.en) : tr(key, lang);
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}
