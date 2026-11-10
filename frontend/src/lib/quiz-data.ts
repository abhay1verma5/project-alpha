/**
 * Class-specific subjects and chapters for the AI Quiz Generator.
 */

export interface Chapter {
  value: string;
  label: string;
  labelHi: string;
}

export interface Subject {
  value: string;
  label: string;
  labelHi: string;
  chapters?: Chapter[];
}

// Shared basic subjects
const BASIC_SUBJECTS: Subject[] = [
  { value: 'math', label: 'Math', labelHi: 'गणित' },
  { value: 'english', label: 'English', labelHi: 'अंग्रेजी' },
  { value: 'hindi', label: 'Hindi', labelHi: 'हिंदी' },
  { value: 'evs', label: 'EVS', labelHi: 'पर्यावरण' },
  { value: 'gk', label: 'GK', labelHi: 'सामान्य ज्ञान' },
];

const MIDDLE_SUBJECTS: Subject[] = [
  { value: 'math', label: 'Math', labelHi: 'गणित' },
  { value: 'science', label: 'Science', labelHi: 'विज्ञान' },
  { value: 'social', label: 'Social Science', labelHi: 'सामाजिक विज्ञान' },
  { value: 'english', label: 'English', labelHi: 'अंग्रेजी' },
  { value: 'hindi', label: 'Hindi', labelHi: 'हिंदी' },
  { value: 'sanskrit', label: 'Sanskrit', labelHi: 'संस्कृत' },
  { value: 'gk', label: 'GK', labelHi: 'सामान्य ज्ञान' },
];

const HIGH_SUBJECTS: Subject[] = [
  {
    value: 'math', label: 'Math', labelHi: 'गणित',
    chapters: [
      { value: 'number_system', label: 'Number System', labelHi: 'संख्या पद्धति' },
      { value: 'algebra', label: 'Algebra', labelHi: 'बीजगणित' },
      { value: 'geometry', label: 'Geometry', labelHi: 'ज्यामिति' },
      { value: 'trigonometry', label: 'Trigonometry', labelHi: 'त्रिकोणमिति' },
      { value: 'statistics', label: 'Statistics', labelHi: 'सांख्यिकी' },
      { value: 'mensuration', label: 'Mensuration', labelHi: 'क्षेत्रमिति' },
    ],
  },
  {
    value: 'science', label: 'Science', labelHi: 'विज्ञान',
    chapters: [
      { value: 'physics', label: 'Physics', labelHi: 'भौतिकी' },
      { value: 'chemistry', label: 'Chemistry', labelHi: 'रसायन' },
      { value: 'biology', label: 'Biology', labelHi: 'जीवविज्ञान' },
    ],
  },
  {
    value: 'social', label: 'Social Science', labelHi: 'सामाजिक विज्ञान',
    chapters: [
      { value: 'history', label: 'History', labelHi: 'इतिहास' },
      { value: 'geography', label: 'Geography', labelHi: 'भूगोल' },
      { value: 'civics', label: 'Civics', labelHi: 'नागरिकशास्त्र' },
      { value: 'economics', label: 'Economics', labelHi: 'अर्थशास्त्र' },
    ],
  },
  { value: 'english', label: 'English', labelHi: 'अंग्रेजी' },
  { value: 'hindi', label: 'Hindi', labelHi: 'हिंदी' },
];

const SENIOR_SUBJECTS: Subject[] = [
  {
    value: 'physics', label: 'Physics', labelHi: 'भौतिकी',
    chapters: [
      { value: 'mechanics', label: 'Mechanics', labelHi: 'यांत्रिकी' },
      { value: 'thermodynamics', label: 'Thermodynamics', labelHi: 'ऊष्मागतिकी' },
      { value: 'waves', label: 'Waves & Oscillations', labelHi: 'तरंगें' },
      { value: 'optics', label: 'Optics', labelHi: 'प्रकाशिकी' },
      { value: 'electrostatics', label: 'Electrostatics', labelHi: 'स्थिरवैद्युतिकी' },
      { value: 'current_electricity', label: 'Current Electricity', labelHi: 'विद्युत धारा' },
      { value: 'magnetism', label: 'Magnetism & EMI', labelHi: 'चुंबकत्व' },
      { value: 'modern_physics', label: 'Modern Physics', labelHi: 'आधुनिक भौतिकी' },
    ],
  },
  {
    value: 'chemistry', label: 'Chemistry', labelHi: 'रसायन विज्ञान',
    chapters: [
      { value: 'physical_chem', label: 'Physical Chemistry', labelHi: 'भौतिक रसायन' },
      { value: 'organic_chem', label: 'Organic Chemistry', labelHi: 'कार्बनिक रसायन' },
      { value: 'inorganic_chem', label: 'Inorganic Chemistry', labelHi: 'अकार्बनिक रसायन' },
      { value: 'chemical_bonding', label: 'Chemical Bonding', labelHi: 'रासायनिक बंध' },
      { value: 'periodic_table', label: 'Periodic Table', labelHi: 'आवर्त सारणी' },
      { value: 'electrochemistry', label: 'Electrochemistry', labelHi: 'विद्युत रसायन' },
    ],
  },
  {
    value: 'math', label: 'Math', labelHi: 'गणित',
    chapters: [
      { value: 'calculus', label: 'Calculus', labelHi: 'कलन' },
      { value: 'algebra', label: 'Algebra', labelHi: 'बीजगणित' },
      { value: 'coordinate', label: 'Coordinate Geometry', labelHi: 'निर्देशांक ज्यामिति' },
      { value: 'vectors', label: 'Vectors & 3D', labelHi: 'सदिश और 3D' },
      { value: 'probability', label: 'Probability', labelHi: 'प्रायिकता' },
      { value: 'trigonometry', label: 'Trigonometry', labelHi: 'त्रिकोणमिति' },
      { value: 'matrices', label: 'Matrices', labelHi: 'आव्यूह' },
    ],
  },
  {
    value: 'biology', label: 'Biology', labelHi: 'जीवविज्ञान',
    chapters: [
      { value: 'cell_biology', label: 'Cell Biology', labelHi: 'कोशिका' },
      { value: 'genetics', label: 'Genetics', labelHi: 'आनुवंशिकी' },
      { value: 'ecology', label: 'Ecology', labelHi: 'पारिस्थितिकी' },
      { value: 'human_physiology', label: 'Human Physiology', labelHi: 'मानव शरीर' },
      { value: 'plant_physiology', label: 'Plant Physiology', labelHi: 'पादप शरीर' },
      { value: 'evolution', label: 'Evolution', labelHi: 'विकास' },
      { value: 'biotechnology', label: 'Biotechnology', labelHi: 'जैव प्रौद्योगिकी' },
    ],
  },
  { value: 'english', label: 'English', labelHi: 'अंग्रेजी' },
  {
    value: 'economics', label: 'Economics', labelHi: 'अर्थशास्त्र',
    chapters: [
      { value: 'micro', label: 'Microeconomics', labelHi: 'सूक्ष्म अर्थशास्त्र' },
      { value: 'macro', label: 'Macroeconomics', labelHi: 'समष्टि अर्थशास्त्र' },
      { value: 'indian_economy', label: 'Indian Economy', labelHi: 'भारतीय अर्थव्यवस्था' },
    ],
  },
  {
    value: 'accountancy', label: 'Accountancy', labelHi: 'लेखाशास्त्र',
    chapters: [
      { value: 'financial_statements', label: 'Financial Statements', labelHi: 'वित्तीय विवरण' },
      { value: 'partnership', label: 'Partnership', labelHi: 'साझेदारी' },
      { value: 'company_accounts', label: 'Company Accounts', labelHi: 'कंपनी खाते' },
    ],
  },
  { value: 'history', label: 'History', labelHi: 'इतिहास' },
  { value: 'political_science', label: 'Political Science', labelHi: 'राजनीति विज्ञान' },
  { value: 'computer_science', label: 'Computer Science', labelHi: 'कंप्यूटर विज्ञान' },
];

// Competitive exam subjects
const COMP_SUBJECTS: Subject[] = [
  { value: 'math', label: 'Mathematics', labelHi: 'गणित' },
  { value: 'gk', label: 'General Knowledge', labelHi: 'सामान्य ज्ञान' },
  { value: 'english', label: 'English', labelHi: 'अंग्रेजी' },
  { value: 'reasoning', label: 'Reasoning', labelHi: 'रीज़निंग' },
  { value: 'science', label: 'General Science', labelHi: 'सामान्य विज्ञान' },
  { value: 'current_affairs', label: 'Current Affairs', labelHi: 'करंट अफेयर्स' },
  { value: 'hindi', label: 'Hindi', labelHi: 'हिंदी' },
  { value: 'polity', label: 'Indian Polity', labelHi: 'भारतीय राजव्यवस्था' },
];

/**
 * Get subjects for a given exam/class
 */
export function getSubjects(exam: string): Subject[] {
  const cls = parseInt(exam.replace('class_', ''));
  if (cls >= 1 && cls <= 5) return BASIC_SUBJECTS;
  if (cls >= 6 && cls <= 8) return MIDDLE_SUBJECTS;
  if (cls >= 9 && cls <= 10) return HIGH_SUBJECTS;
  if (cls >= 11 && cls <= 12) return SENIOR_SUBJECTS;
  return COMP_SUBJECTS;
}
