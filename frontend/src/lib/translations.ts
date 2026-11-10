/**
 * Central multilingual translation dictionary.
 * Supports: English (en), Hindi (hi), Tamil (ta), Telugu (te), Bengali (bn).
 *
 * Use with: tr('key', lang)
 * Regional languages (ta/te/bn) have translations for critical UI strings.
 * Keys without regional translations fall back to English automatically.
 */

import type { Language } from '@/components/LanguageProvider';

type TranslationEntry = {
  en: string;
  hi: string;
  ta?: string;
  te?: string;
  bn?: string;
};

const T: Record<string, TranslationEntry> = {
  // ── Nav & Header ──
  'nav.home': { en: 'Home', hi: 'होम', ta: 'முகப்பு', te: 'హోమ్', bn: 'হোম' },
  'nav.jobs': { en: 'Jobs', hi: 'नौकरियाँ', ta: 'வேலைகள்', te: 'ఉద్యోగాలు', bn: 'চাকরি' },
  'nav.results': { en: 'Results', hi: 'रिजल्ट', ta: 'முடிவுகள்', te: 'ఫలితాలు', bn: 'ফলাফল' },
  'nav.admitCards': { en: 'Admit Cards', hi: 'एडमिट कार्ड', ta: 'அனுமதி அட்டை', te: 'అడ్మిట్ కార్డ్', bn: 'অ্যাডমিট কার্ড' },
  'nav.answerKeys': { en: 'Answer Keys', hi: 'आंसर की', ta: 'விடைக் குறிப்பு', te: 'ఆన్సర్ కీ', bn: 'আন্সার কী' },
  'nav.admissions': { en: 'Admissions', hi: 'एडमिशन', ta: 'சேர்க்கை', te: 'అడ్మిషన్', bn: 'ভর্তি' },
  'nav.syllabus': { en: 'Syllabus', hi: 'सिलेबस', ta: 'பாடத்திட்டம்', te: 'సిలబస్', bn: 'সিলেবাস' },
  'nav.scholarships': { en: 'Scholarships', hi: 'स्कॉलरशिप', ta: 'உதவித்தொகை', te: 'స్కాలర్‌షిప్', bn: 'বৃত্তি' },
  'nav.pyqPapers': { en: 'PYQ Papers', hi: 'पिछले प्रश्नपत्र', ta: 'முந்தைய வினாத்தாள்', te: 'గత ప్రశ్నపత్రాలు', bn: 'পূর্ববর্তী প্রশ্নপত্র' },
  'nav.weightage': { en: 'Weightage', hi: 'वेटेज' },
  'nav.mockTests': { en: 'Mock Tests', hi: 'मॉक टेस्ट', ta: 'மாதிரி தேர்வு', te: 'మాక్ టెస్ట్', bn: 'মক টেস্ট' },
  'nav.tools': { en: 'Tools', hi: 'टूल्स', ta: 'கருவிகள்', te: 'టూల్స్', bn: 'টুলস' },
  'nav.jobNews': { en: 'Job News', hi: 'जॉब न्यूज़', ta: 'வேலை செய்திகள்', te: 'ఉద్యోగ వార్తలు', bn: 'চাকরির খবর' },
  'nav.aiSearch': { en: 'AI Search', hi: 'AI खोज', ta: 'AI தேடல்', te: 'AI సెర్చ్', bn: 'AI অনুসন্ধান' },
  'nav.aiQuiz': { en: 'AI Quiz', hi: 'AI क्विज़', ta: 'AI வினாடி வினா', te: 'AI క్విజ్', bn: 'AI কুইজ' },
  'nav.aiEligibility': { en: 'Eligibility', hi: 'पात्रता जाँच', ta: 'தகுதி', te: 'అర్హత', bn: 'যোগ্যতা' },
  'nav.aiCareer': { en: 'Career AI', hi: 'करियर AI', ta: 'கரியர் AI', te: 'కెరీర్ AI', bn: 'ক্যারিয়ার AI' },
  'nav.pyqPractice': { en: 'PYQ Practice', hi: 'PYQ अभ्यास' },
  'nav.currentAffairs': { en: 'Current Affairs', hi: 'करंट अफेयर्स', ta: 'நடப்பு நிகழ்வுகள்', te: 'కరెంట్ అఫైర్స్', bn: 'কারেন্ট অ্যাফেয়ার্স' },
  'nav.dailyQuiz': { en: 'Daily Quiz', hi: 'डेली क्विज़', ta: 'தினசரி வினாடி வினா', te: 'డైలీ క్విజ్', bn: 'দৈনিক কুইজ' },
  'nav.salary': { en: 'Salary', hi: 'वेतन' },
  'nav.ageLimit': { en: 'Age Limit', hi: 'आयु सीमा' },
  'nav.cutoff': { en: 'Cut-off', hi: 'कट-ऑफ' },
  'nav.blog': { en: 'Blog', hi: 'ब्लॉग' },

  // ── Bottom Nav ──
  'bottomNav.home': { en: 'Home', hi: 'होम', ta: 'முகப்பு', te: 'హోమ్', bn: 'হোম' },
  'bottomNav.jobs': { en: 'Jobs', hi: 'नौकरी', ta: 'வேலை', te: 'ఉద్యోగం', bn: 'চাকরি' },
  'bottomNav.results': { en: 'Results', hi: 'रिजल्ट', ta: 'முடிவுகள்', te: 'ఫలితాలు', bn: 'ফলাফল' },
  'bottomNav.tools': { en: 'Tools', hi: 'टूल्स', ta: 'கருவிகள்', te: 'టూల్స్', bn: 'টুলস' },
  'bottomNav.ai': { en: 'AI Tools', hi: 'AI टूल्स', ta: 'AI கருவிகள்', te: 'AI టూల్స్', bn: 'AI টুলস' },
  'bottomNav.quiz': { en: 'Quiz', hi: 'क्विज़', ta: 'வினாடி வினா', te: 'క్విజ్', bn: 'কুইজ' },

  // ── Hero ──
  'hero.badge': { en: 'Updated daily — All India Government Jobs', hi: 'रोज़ अपडेट — सम्पूर्ण भारत सरकारी नौकरी', ta: 'தினமும் புதுப்பிப்பு — அகில இந்திய அரசு வேலைகள்', te: 'ప్రతిరోజూ అప్‌డేట్ — అఖిల భారత ప్రభుత్వ ఉద్యోగాలు', bn: 'প্রতিদিন আপডেট — সমগ্র ভারত সরকারি চাকরি' },
  'hero.title1': { en: 'Your Gateway to', hi: 'आपका रास्ता' },
  'hero.titleHighlight': { en: 'Sarkari Naukri', hi: 'सरकारी नौकरी', ta: 'அரசு வேலை', te: 'ప్రభుత్వ ఉద్యోగం', bn: 'সরকারি চাকরি' },
  'hero.subtitle': { en: 'SSC, UPSC, Railway, Banking, Defence, Police, Medical, Teaching, Gramin — AI-powered search in Hindi & English', hi: 'SSC, UPSC, रेलवे, बैंकिंग, रक्षा, पुलिस, मेडिकल, शिक्षा, ग्रामीण — हिंदी और अंग्रेजी में AI खोज' },
  'hero.trending': { en: 'Trending:', hi: 'ट्रेंडिंग:' },
  'hero.dailyUpdates': { en: 'Daily Updates', hi: 'रोज़ अपडेट' },
  'hero.vacancies': { en: '2L+ Vacancies', hi: '2L+ रिक्तियाँ' },
  'hero.allIndia': { en: 'All India', hi: 'सम्पूर्ण भारत' },
  'hero.aiVoice': { en: 'AI Search + Voice', hi: 'AI खोज + वॉइस' },

  // ── Stats Bar ──
  'stats.activeJobs': { en: 'Active Jobs', hi: 'सक्रिय नौकरी', ta: 'செயலில் உள்ள வேலைகள்', te: 'యాక్టివ్ ఉద్యోగాలు', bn: 'সক্রিয় চাকরি' },
  'stats.vacancies': { en: 'Vacancies', hi: 'रिक्तियाँ', ta: 'காலியிடங்கள்', te: 'ఖాళీలు', bn: 'শূন্যপদ' },
  'stats.results': { en: 'Results', hi: 'रिजल्ट', ta: 'முடிவுகள்', te: 'ఫలితాలు', bn: 'ফলাফল' },
  'stats.admitCards': { en: 'Admit Cards', hi: 'एडमिट कार्ड', ta: 'அனுமதி அட்டை', te: 'అడ్మిట్ కార్డ్', bn: 'অ্যাডমিট কার্ড' },
  'stats.states': { en: 'States', hi: 'राज्य', ta: 'மாநிலங்கள்', te: 'రాష్ట్రాలు', bn: 'রাজ্য' },

  // ── Job Card ──
  'job.posts': { en: 'Posts', hi: 'पद', ta: 'பதவிகள்', te: 'పోస్ట్‌లు', bn: 'পদ' },
  'job.lastDay': { en: 'Last Day!', hi: 'आखिरी दिन!', ta: 'கடைசி நாள்!', te: 'చివరి రోజు!', bn: 'শেষ দিন!' },
  'job.daysLeft': { en: 'd left', hi: 'दिन शेष', ta: 'நாள் மீதம்', te: 'రోజులు మిగిలి', bn: 'দিন বাকি' },
  'job.featured': { en: 'Featured', hi: 'विशेष', ta: 'சிறப்பு', te: 'ప్రత్యేకం', bn: 'বিশেষ' },
  'job.result': { en: 'Result', hi: 'रिजल्ट', ta: 'முடிவு', te: 'ఫలితం', bn: 'ফলাফল' },
  'job.admitCard': { en: 'Admit Card', hi: 'एडमिट कार्ड' },
  'job.answerKey': { en: 'Answer Key', hi: 'आंसर की' },
  'job.admission': { en: 'Admission', hi: 'एडमिशन' },
  'job.syllabusLabel': { en: 'Syllabus', hi: 'सिलेबस' },
  'job.eligibility': { en: 'Eligibility', hi: 'पात्रता' },
  'job.qualification': { en: 'Qualification', hi: 'योग्यता' },
  'job.qualificationNA': { en: 'Qualification N/A', hi: 'योग्यता उपलब्ध नहीं' },
  'job.ageLimit': { en: 'Age Limit', hi: 'आयु सीमा' },
  'job.ageLimitNA': { en: 'Age: See notification', hi: 'आयु: नोटिफिकेशन देखें' },
  'job.salary': { en: 'Salary', hi: 'वेतन' },
  'job.salaryNA': { en: 'Salary: See notification', hi: 'वेतन: नोटिफिकेशन देखें' },
  'job.vacancies': { en: 'Vacancies', hi: 'रिक्तियाँ' },
  'job.variousPosts': { en: 'Various Posts', hi: 'विभिन्न पद' },
  'job.location': { en: 'Location', hi: 'स्थान' },
  'job.lastDate': { en: 'Last Date', hi: 'अंतिम तिथि' },
  'job.lastDateNA': { en: 'Date not available', hi: 'तिथि उपलब्ध नहीं' },
  'job.postedOn': { en: 'Posted', hi: 'पोस्ट' },
  'job.expired': { en: 'Expired', hi: 'समय समाप्त' },
  'job.fee': { en: 'Fee', hi: 'शुल्क' },
  'job.feeNA': { en: 'Fee: See notification', hi: 'शुल्क: नोटिफिकेशन देखें' },
  'job.applyOnline': { en: 'Apply Online', hi: 'ऑनलाइन आवेदन करें' },
  'job.seeResult': { en: 'See Result', hi: 'परिणाम देखें' },
  'job.admitCardDl': { en: 'Admit Card', hi: 'एडमिट कार्ड' },
  'job.viewAnswerKey': { en: 'View Answer Key', hi: 'आंसर की देखें' },
  'job.dates': { en: 'Important Dates', hi: 'महत्वपूर्ण तिथियाँ' },
  'job.details': { en: 'Job Details', hi: 'नौकरी विवरण' },

  // ── Quick Filters ──
  'filter.browseByType': { en: 'Browse By Type', hi: 'प्रकार से खोजें', ta: 'வகை வாரியாக', te: 'రకం ప్రకారం', bn: 'ধরন অনুযায়ী' },
  'filter.categories': { en: 'Categories', hi: 'श्रेणियाँ', ta: 'வகைகள்', te: 'వర్గాలు', bn: 'বিভাগসমূহ' },
  'filter.seeAll': { en: 'See all', hi: 'सभी देखें', ta: 'அனைத்தும்', te: 'అన్నీ చూడండి', bn: 'সব দেখুন' },
  'filter.filterByEducation': { en: 'Filter by Education', hi: 'शिक्षा के अनुसार' },
  'filter.jobsByState': { en: 'Jobs by State', hi: 'राज्य अनुसार नौकरी' },
  'filter.allStates': { en: 'All states', hi: 'सभी राज्य' },
  'filter.freeTools': { en: 'Free Tools', hi: 'मुफ़्त टूल्स', ta: 'இலவச கருவிகள்', te: 'ఉచిత టూల్స్', bn: 'বিনামূল্যে টুলস' },
  'filter.allTools': { en: 'All tools', hi: 'सभी टूल्स' },
  'filter.latestJobs': { en: 'Latest Jobs', hi: 'नवीनतम नौकरी', ta: 'சமீபத்திய வேலைகள்', te: 'తాజా ఉద్యోగాలు', bn: 'সর্বশেষ চাকরি' },
  'filter.photoResizer': { en: 'Photo Resizer', hi: 'फोटो रिसाइज़र' },
  'filter.ageCalc': { en: 'Age Calculator', hi: 'आयु कैलकुलेटर' },
  'filter.salaryCalc': { en: 'Salary Calc', hi: 'वेतन कैलकु.' },

  // ── Footer ──
  'footer.description': { en: "India's comprehensive government job portal. Get notifications for SSC, UPSC, Railway, Banking & all sarkari naukri.", hi: 'भारत का व्यापक सरकारी नौकरी पोर्टल। SSC, UPSC, रेलवे, बैंकिंग और सभी सरकारी नौकरी की सूचना पाएं।', ta: 'இந்தியாவின் விரிவான அரசு வேலை போர்டல். SSC, UPSC, ரயில்வே, வங்கி மற்றும் அனைத்து அரசு வேலை அறிவிப்புகளைப் பெறுங்கள்.', te: 'భారతదేశపు సమగ్ర ప్రభుత్వ ఉద్యోగ పోర్టల్. SSC, UPSC, రైల్వే, బ్యాంకింగ్ & అన్ని ప్రభుత్వ ఉద్యోగ నోటిఫికేషన్‌లు పొందండి.', bn: 'ভারতের সবচেয়ে ব্যাপক সরকারি চাকরি পোর্টাল। SSC, UPSC, রেলওয়ে, ব্যাংকিং এবং সকল সরকারি চাকরির বিজ্ঞপ্তি পান।' },
  'footer.quickLinks': { en: 'Quick Links', hi: 'त्वरित लिंक', ta: 'விரைவு இணைப்புகள்', te: 'క్విక్ లింక్స్', bn: 'দ্রুত লিংক' },
  'footer.latestJobs': { en: 'Latest Jobs', hi: 'नवीनतम नौकरी', ta: 'சமீபத்திய வேலைகள்', te: 'తాజా ఉద్యోగాలు', bn: 'সর্বশেষ চাকরি' },
  'footer.categories': { en: 'Categories', hi: 'श्रेणियाँ', ta: 'வகைகள்', te: 'వర్గాలు', bn: 'বিভাগসমূহ' },
  'footer.freeTools': { en: 'Free Tools', hi: 'मुफ़्त टूल्स', ta: 'இலவச கருவிகள்', te: 'ఉచిత టూల్స్', bn: 'বিনামূল্যে টুলস' },
  'footer.photoResizer': { en: 'Photo & Signature Resizer', hi: 'फोटो और हस्ताक्षर रिसाइज़र' },
  'footer.ageCalc': { en: 'Age Calculator (with Relaxation)', hi: 'आयु कैलकुलेटर (छूट सहित)' },
  'footer.salaryCalc': { en: '7th CPC Salary Calculator', hi: '7वाँ CPC वेतन कैलकुलेटर' },
  'footer.allTools': { en: 'All Tools', hi: 'सभी टूल्स' },
  'footer.aiTools': { en: 'AI Tools', hi: 'AI टूल्स' },
  'footer.aiSearch': { en: 'AI Search', hi: 'AI सर्च' },
  'footer.aiQuiz': { en: 'AI Quiz Generator', hi: 'AI क्विज़ जनरेटर' },
  'footer.pyqPractice': { en: 'PYQ Practice', hi: 'PYQ अभ्यास' },
  'footer.previousPapers': { en: 'Previous Papers', hi: 'पिछले पेपर' },
  'footer.mockTests': { en: 'Mock Tests', hi: 'मॉक टेस्ट' },
  'footer.aiEligibility': { en: 'Eligibility Checker', hi: 'पात्रता जाँच' },
  'footer.aiCareer': { en: 'Career Advisor', hi: 'करियर सलाहकार' },
  'footer.copyright': { en: '2026 SarkariAlert. Not affiliated with any government body. Data sourced from official government websites.', hi: '2026 SarkariAlert. किसी भी सरकारी निकाय से संबद्ध नहीं। डेटा आधिकारिक सरकारी वेबसाइटों से लिया गया है।' },
  'footer.privacy': { en: 'Privacy Policy', hi: 'गोपनीयता नीति', ta: 'தனியுரிமைக் கொள்கை', te: 'గోప్యతా విధానం', bn: 'গোপনীয়তা নীতি' },

  // ── Search Page ──
  'search.heading': { en: 'Search Jobs', hi: 'नौकरी खोजें', ta: 'வேலை தேடுங்கள்', te: 'ఉద్యోగాలు వెతకండి', bn: 'চাকরি খুঁজুন' },
  'search.subtitle': { en: 'Normal keyword search or AI-powered smart search with voice', hi: 'सामान्य कीवर्ड खोज या AI स्मार्ट सर्च वॉइस के साथ' },
  'search.normalSearch': { en: 'Normal Search', hi: 'सामान्य खोज' },
  'search.aiSearch': { en: 'AI Search', hi: 'AI खोज' },
  'search.placeholderAi': { en: "Ask in Hindi/English — '10th pass railway job UP'...", hi: "हिंदी/अंग्रेजी में पूछें — '10th पास रेलवे नौकरी UP'..." },
  'search.placeholderNormal': { en: 'Type keywords — SSC CGL, Railway Group D, UPSC...', hi: 'कीवर्ड टाइप करें — SSC CGL, रेलवे ग्रुप D, UPSC...' },
  'search.listening': { en: 'Listening... speak in Hindi or English', hi: 'सुन रहे हैं... हिंदी या अंग्रेजी में बोलिए' },
  'search.popularSearches': { en: 'Popular Searches', hi: 'लोकप्रिय खोज' },
  'search.searchBtn': { en: 'Search', hi: 'खोजें', ta: 'தேடு', te: 'వెతకండి', bn: 'খুঁজুন' },
  'search.resultsFound': { en: 'results found', hi: 'परिणाम मिले' },
  'search.resultFound': { en: 'result found', hi: 'परिणाम मिला' },
  'search.noResults': { en: 'No results found', hi: 'कोई परिणाम नहीं मिला', ta: 'முடிவுகள் இல்லை', te: 'ఫలితాలు లేవు', bn: 'কোনো ফলাফল পাওয়া যায়নি' },
  'search.tryDifferent': { en: 'Try different keywords or switch to', hi: 'अलग कीवर्ड आज़माएं या स्विच करें' },
  'search.tryInstead': { en: 'instead', hi: '' },
  'search.searchGovtJobs': { en: 'Search Government Jobs', hi: 'सरकारी नौकरी खोजें', ta: 'அரசு வேலை தேடுங்கள்', te: 'ప్రభుత్వ ఉద్యోగాలు వెతకండి', bn: 'সরকারি চাকরি খুঁজুন' },
  'search.aiPowered': { en: 'Powered by AI — filters applied automatically', hi: 'AI द्वारा — फ़िल्टर स्वतः लागू' },

  // ── AI Quiz ──
  'quiz.title': { en: 'AI Quiz Generator', hi: 'AI क्विज़ जनरेटर' },
  'quiz.subtitle': { en: 'Practice for government exams with AI-generated questions', hi: 'AI-जनित प्रश्नों से सरकारी परीक्षा की तैयारी करें' },
  'quiz.selectExam': { en: 'Select Exam', hi: 'परीक्षा चुनें' },
  'quiz.selectTopic': { en: 'Select Topic', hi: 'विषय चुनें' },
  'quiz.generate': { en: 'Generate Quiz', hi: 'क्विज़ बनाएं' },
  'quiz.generating': { en: 'AI is generating your quiz...', hi: 'AI आपका क्विज़ बना रहा है...' },
  'quiz.question': { en: 'Question', hi: 'प्रश्न' },
  'quiz.next': { en: 'Next', hi: 'अगला', ta: 'அடுத்து', te: 'తదుపరి', bn: 'পরবর্তী' },
  'quiz.submit': { en: 'Submit Quiz', hi: 'क्विज़ जमा करें' },
  'quiz.score': { en: 'Your Score', hi: 'आपका स्कोर' },
  'quiz.correct': { en: 'Correct', hi: 'सही' },
  'quiz.incorrect': { en: 'Incorrect', hi: 'ग़लत' },
  'quiz.explanation': { en: 'Explanation', hi: 'व्याख्या' },
  'quiz.tryAnother': { en: 'Try Another Quiz', hi: 'और क्विज़ आज़माएं' },
  'quiz.yourAnswer': { en: 'Your Answer', hi: 'आपका उत्तर' },
  'quiz.correctAnswer': { en: 'Correct Answer', hi: 'सही उत्तर' },
  'quiz.outOf': { en: 'out of', hi: 'में से' },

  // ── AI Eligibility ──
  'elig.title': { en: 'AI Eligibility Checker', hi: 'AI पात्रता जाँच' },
  'elig.subtitle': { en: 'Check which government exams you are eligible for', hi: 'देखें कि आप किन सरकारी परीक्षाओं के लिए पात्र हैं' },
  'elig.dob': { en: 'Date of Birth', hi: 'जन्म तिथि' },
  'elig.qualification': { en: 'Highest Qualification', hi: 'उच्चतम शिक्षा' },
  'elig.category': { en: 'Category', hi: 'श्रेणी' },
  'elig.gender': { en: 'Gender', hi: 'लिंग' },
  'elig.male': { en: 'Male', hi: 'पुरुष' },
  'elig.female': { en: 'Female', hi: 'महिला' },
  'elig.other': { en: 'Other', hi: 'अन्य' },
  'elig.state': { en: 'State / UT', hi: 'राज्य / केंद्रशासित' },
  'elig.check': { en: 'Check Eligibility', hi: 'पात्रता जाँचें' },
  'elig.checking': { en: 'AI is analyzing your eligibility...', hi: 'AI आपकी पात्रता जाँच रहा है...' },
  'elig.eligible': { en: 'Eligible', hi: 'पात्र' },
  'elig.notEligible': { en: 'Not Eligible', hi: 'अपात्र' },
  'elig.totalEligible': { en: 'Total Eligible Exams', hi: 'कुल पात्र परीक्षाएँ' },
  'elig.topPick': { en: 'Top Recommendation', hi: 'सर्वश्रेष्ठ सुझाव' },
  'elig.salary': { en: 'Salary Range', hi: 'वेतन सीमा' },
  'elig.ageRange': { en: 'Age Range', hi: 'आयु सीमा' },
  'elig.tips': { en: 'Tips', hi: 'सुझाव' },
  'elig.tryAgain': { en: 'Check Again', hi: 'फिर से जाँचें' },
  'elig.general': { en: 'General', hi: 'सामान्य' },
  'elig.obc': { en: 'OBC', hi: 'OBC' },
  'elig.sc': { en: 'SC', hi: 'SC' },
  'elig.st': { en: 'ST', hi: 'ST' },

  // ── AI Career ──
  'career.title': { en: 'AI Career Advisor', hi: 'AI करियर सलाहकार' },
  'career.subtitle': { en: 'Get personalized government career guidance', hi: 'सरकारी करियर मार्गदर्शन पाएं' },
  'career.placeholder': { en: 'Ask about government careers...', hi: 'सरकारी करियर के बारे में पूछें...' },
  'career.send': { en: 'Send', hi: 'भेजें' },
  'career.thinking': { en: 'Thinking...', hi: 'सोच रहा है...' },
  'career.limitReached': { en: 'Message limit reached. Start a new session.', hi: 'संदेश सीमा पूरी। नया सत्र शुरू करें।' },
  'career.newChat': { en: 'New Chat', hi: 'नई चैट' },
  'career.messagesLeft': { en: 'messages left', hi: 'संदेश शेष' },

  // ── Nav extra ──
  'nav.aiTools': { en: 'AI Tools', hi: 'AI टूल्स', ta: 'AI கருவிகள்', te: 'AI టూల్స్', bn: 'AI টুলস' },
  'nav.savedJobs': { en: 'Saved Jobs', hi: 'सेव्ड जॉब्स', ta: 'சேமித்த வேலைகள்', te: 'సేవ్ చేసిన ఉద్యోగాలు', bn: 'সংরক্ষিত চাকরি' },
  'nav.notifications': { en: 'Notifications', hi: 'सूचनाएँ', ta: 'அறிவிப்புகள்', te: 'నోటిఫికేషన్‌లు', bn: 'বিজ্ঞপ্তি' },

  // ── Footer extra ──
  'footer.terms': { en: 'Terms of Service', hi: 'सेवा की शर्तें', ta: 'சேவை விதிமுறைகள்', te: 'సేవా నిబంధనలు', bn: 'সেবার শর্তাবলী' },
  'footer.about': { en: 'About Us', hi: 'हमारे बारे में', ta: 'எங்களைப் பற்றி', te: 'మా గురించి', bn: 'আমাদের সম্পর্কে' },
  'footer.contact': { en: 'Contact Us', hi: 'संपर्क करें', ta: 'எங்களைத் தொடர்பு கொள்ளுங்கள்', te: 'మమ్మల్ని సంప్రదించండి', bn: 'যোগাযোগ করুন' },
  'footer.disclaimer': { en: 'Disclaimer', hi: 'अस्वीकरण', ta: 'மறுப்பு', te: 'నిరాకరణ', bn: 'দাবিত্যাগ' },
  'footer.faq': { en: 'FAQ', hi: 'अक्सर पूछे जाने वाले प्रश्न', ta: 'அடிக்கடி கேட்கப்படும் கேள்விகள்', te: 'తరచుగా అడిగే ప్రశ్నలు', bn: 'সচরাচর জিজ্ঞাসা' },

  // ── Common ──
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...', ta: 'ஏற்றுகிறது...', te: 'లోడ్ అవుతోంది...', bn: 'লোড হচ্ছে...' },
  'common.error': { en: 'Something went wrong. Please try again.', hi: 'कुछ गलत हो गया। कृपया पुनः प्रयास करें।', ta: 'ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.', te: 'ఏదో తప్పు జరిగింది. దయచేసి మళ్ళీ ప్రయత్నించండి.', bn: 'কিছু ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' },
  'common.back': { en: 'Back', hi: 'वापस', ta: 'பின்செல்', te: 'వెనుకకు', bn: 'পেছনে' },
  'common.for': { en: 'for', hi: 'के लिए' },
};

export type TranslationKey = keyof typeof T;

/**
 * Get translation for a given key and language.
 * Usage: tr('nav.home', lang) -> 'Home' / 'होம' / 'முகப்பு' / 'హోమ్' / 'হোম'
 * Falls back to English if the requested language translation is missing.
 */
export function tr(key: string, lang: Language): string {
  const entry = T[key];
  if (!entry) return key;
  if (lang === 'en') return entry.en;
  if (lang === 'hi') return entry.hi;
  // Regional languages: use regional translation if available, else fall back to English
  const regional = entry[lang];
  if (regional && regional.trim() !== '') return regional;
  return entry.en;
}

export default T;
