export interface PYQQuestion {
  id: number;
  exam_type: string;
  year: number;
  subject: string;
  chapter: string;
  question_text: string;
  options: string[];
  correct_answer?: number;
  explanation?: string;
  difficulty: string;
  source: string;
  language: string;
  is_verified: boolean;
}

export interface PYQMeta {
  exams: { exam_type: string; count: number }[];
  years: number[];
  subjects: string[];
  total_questions: number;
}

export interface PYQCheckResult {
  score: number;
  total: number;
  percentage: number;
  results: {
    id: number;
    selected: number;
    correct_answer: number;
    is_correct: boolean;
    explanation: string;
    question_text: string;
    options: string[];
  }[];
}

// ── Exam category organization ──

export interface ExamInfo {
  value: string;
  label: string;
  labelHi: string;
}

export interface ExamCategory {
  id: string;
  label: string;
  labelHi: string;
  color: string;
  icon: string;
  exams: ExamInfo[];
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'class_1_5',
    label: 'Class 1-5',
    labelHi: 'कक्षा 1-5',
    color: 'bg-yellow-500',
    icon: '💒',
    exams: [
      { value: 'cbse_1', label: 'CBSE Class 1', labelHi: 'CBSE कक्षा 1' },
      { value: 'cbse_2', label: 'CBSE Class 2', labelHi: 'CBSE कक्षा 2' },
      { value: 'cbse_3', label: 'CBSE Class 3', labelHi: 'CBSE कक्षा 3' },
      { value: 'cbse_4', label: 'CBSE Class 4', labelHi: 'CBSE कक्षा 4' },
      { value: 'cbse_5', label: 'CBSE Class 5', labelHi: 'CBSE कक्षा 5' },
    ],
  },
  {
    id: 'class_6_9',
    label: 'Class 6-9',
    labelHi: 'कक्षा 6-9',
    color: 'bg-sky-500',
    icon: '📘',
    exams: [
      { value: 'cbse_6', label: 'CBSE Class 6', labelHi: 'CBSE कक्षा 6' },
      { value: 'cbse_7', label: 'CBSE Class 7', labelHi: 'CBSE कक्षा 7' },
      { value: 'cbse_8', label: 'CBSE Class 8', labelHi: 'CBSE कक्षा 8' },
      { value: 'cbse_9', label: 'CBSE Class 9', labelHi: 'CBSE कक्षा 9' },
    ],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    labelHi: 'इंजीनियरिंग',
    color: 'bg-blue-600',
    icon: '🔧',
    exams: [
      { value: 'jee_main', label: 'JEE Main', labelHi: 'JEE मेन' },
      { value: 'jee_advanced', label: 'JEE Advanced', labelHi: 'JEE एडवांस्ड' },
      { value: 'gate_cse', label: 'GATE CSE', labelHi: 'GATE CSE' },
      { value: 'gate_ece', label: 'GATE ECE', labelHi: 'GATE ECE' },
      { value: 'gate_me', label: 'GATE ME', labelHi: 'GATE ME' },
      { value: 'gate_ee', label: 'GATE EE', labelHi: 'GATE EE' },
      { value: 'gate_ce', label: 'GATE CE', labelHi: 'GATE CE' },
      { value: 'gate_ch', label: 'GATE CH', labelHi: 'GATE CH' },
      { value: 'gate_in', label: 'GATE IN', labelHi: 'GATE IN' },
      { value: 'gate_bt', label: 'GATE BT', labelHi: 'GATE BT' },
      { value: 'gate_pi', label: 'GATE PI', labelHi: 'GATE PI' },
      { value: 'gate_xe', label: 'GATE XE', labelHi: 'GATE XE' },
      { value: 'ese', label: 'ESE/IES', labelHi: 'ESE/IES' },
      { value: 'bel', label: 'BEL PE', labelHi: 'BEL PE' },
      { value: 'isro', label: 'ISRO', labelHi: 'ISRO' },
    ],
  },
  {
    id: 'medical',
    label: 'Medical',
    labelHi: 'मेडिकल',
    color: 'bg-red-600',
    icon: '🏥',
    exams: [
      { value: 'neet', label: 'NEET UG', labelHi: 'NEET UG' },
      { value: 'neet_pg', label: 'NEET PG', labelHi: 'NEET PG' },
      { value: 'aiims', label: 'AIIMS', labelHi: 'AIIMS' },
      { value: 'jipmer', label: 'JIPMER', labelHi: 'JIPMER' },
    ],
  },
  {
    id: 'ssc',
    label: 'SSC',
    labelHi: 'SSC',
    color: 'bg-green-600',
    icon: '📋',
    exams: [
      { value: 'ssc_cgl', label: 'SSC CGL', labelHi: 'SSC CGL' },
      { value: 'ssc_chsl', label: 'SSC CHSL', labelHi: 'SSC CHSL' },
      { value: 'ssc_mts', label: 'SSC MTS', labelHi: 'SSC MTS' },
      { value: 'ssc_gd', label: 'SSC GD', labelHi: 'SSC GD' },
      { value: 'ssc_cpo', label: 'SSC CPO', labelHi: 'SSC CPO' },
      { value: 'ssc_je', label: 'SSC JE', labelHi: 'SSC JE' },
      { value: 'ssc_steno', label: 'SSC Steno', labelHi: 'SSC स्टेनो' },
    ],
  },
  {
    id: 'central',
    label: 'Central Exams',
    labelHi: 'केंद्रीय परीक्षा',
    color: 'bg-purple-600',
    icon: '🏛️',
    exams: [
      { value: 'upsc_prelims', label: 'UPSC Prelims', labelHi: 'UPSC प्रीलिम्स' },
      { value: 'upsc_mains', label: 'UPSC Mains', labelHi: 'UPSC मेन्स' },
      { value: 'nda', label: 'NDA', labelHi: 'NDA' },
      { value: 'cds', label: 'CDS', labelHi: 'CDS' },
      { value: 'afcat', label: 'AFCAT', labelHi: 'AFCAT' },
      { value: 'capf', label: 'CAPF', labelHi: 'CAPF' },
    ],
  },
  {
    id: 'railway',
    label: 'Railway',
    labelHi: 'रेलवे',
    color: 'bg-orange-600',
    icon: '🚂',
    exams: [
      { value: 'rrb_ntpc', label: 'RRB NTPC', labelHi: 'RRB NTPC' },
      { value: 'rrb_group_d', label: 'RRB Group D', labelHi: 'RRB ग्रुप D' },
      { value: 'rrb_je', label: 'RRB JE', labelHi: 'RRB JE' },
      { value: 'rrb_alp', label: 'RRB ALP', labelHi: 'RRB ALP' },
      { value: 'rpf', label: 'RPF', labelHi: 'RPF' },
    ],
  },
  {
    id: 'banking',
    label: 'Banking',
    labelHi: 'बैंकिंग',
    color: 'bg-teal-600',
    icon: '🏦',
    exams: [
      { value: 'ibps_po', label: 'IBPS PO', labelHi: 'IBPS PO' },
      { value: 'ibps_clerk', label: 'IBPS Clerk', labelHi: 'IBPS क्लर्क' },
      { value: 'ibps_so', label: 'IBPS SO', labelHi: 'IBPS SO' },
      { value: 'sbi_po', label: 'SBI PO', labelHi: 'SBI PO' },
      { value: 'sbi_clerk', label: 'SBI Clerk', labelHi: 'SBI क्लर्क' },
      { value: 'rbi_grade_b', label: 'RBI Grade B', labelHi: 'RBI ग्रेड B' },
      { value: 'rbi_assistant', label: 'RBI Assistant', labelHi: 'RBI सहायक' },
      { value: 'nabard', label: 'NABARD', labelHi: 'NABARD' },
      { value: 'sebi', label: 'SEBI', labelHi: 'SEBI' },
      { value: 'lic_aao', label: 'LIC AAO', labelHi: 'LIC AAO' },
      { value: 'lic_ado', label: 'LIC ADO', labelHi: 'LIC ADO' },
    ],
  },
  {
    id: 'teaching',
    label: 'Teaching',
    labelHi: 'शिक्षा',
    color: 'bg-pink-600',
    icon: '📚',
    exams: [
      { value: 'ctet', label: 'CTET', labelHi: 'CTET' },
      { value: 'ugc_net', label: 'UGC NET', labelHi: 'UGC NET' },
      { value: 'kvs', label: 'KVS', labelHi: 'KVS' },
      { value: 'dsssb', label: 'DSSSB', labelHi: 'DSSSB' },
    ],
  },
  {
    id: 'state_psc',
    label: 'State PSC',
    labelHi: 'राज्य PSC',
    color: 'bg-indigo-600',
    icon: '🗺️',
    exams: [
      { value: 'uppsc', label: 'UPPSC', labelHi: 'UPPSC' },
      { value: 'bpsc', label: 'BPSC', labelHi: 'BPSC' },
      { value: 'mppsc', label: 'MPPSC', labelHi: 'MPPSC' },
      { value: 'rpsc', label: 'RPSC (RAS)', labelHi: 'RPSC (RAS)' },
      { value: 'appsc', label: 'APPSC', labelHi: 'APPSC' },
      { value: 'tnpsc', label: 'TNPSC', labelHi: 'TNPSC' },
      { value: 'wbpsc', label: 'WBPSC', labelHi: 'WBPSC' },
      { value: 'kpsc', label: 'KPSC', labelHi: 'KPSC' },
      { value: 'hpsc', label: 'HPSC', labelHi: 'HPSC' },
      { value: 'jpsc', label: 'JPSC', labelHi: 'JPSC' },
      { value: 'ukpsc', label: 'UKPSC', labelHi: 'UKPSC' },
      { value: 'cgpsc', label: 'CGPSC', labelHi: 'CGPSC' },
      { value: 'gpsc', label: 'GPSC Gujarat', labelHi: 'GPSC गुजरात' },
      { value: 'opsc', label: 'OPSC', labelHi: 'OPSC' },
      { value: 'ppsc', label: 'PPSC Punjab', labelHi: 'PPSC पंजाब' },
    ],
  },
  {
    id: 'board_10',
    label: 'Class 10 Board PYQ',
    labelHi: 'कक्षा 10 बोर्ड PYQ',
    color: 'bg-amber-600',
    icon: '📗',
    exams: [
      { value: 'cbse_10', label: 'CBSE Class 10', labelHi: 'CBSE कक्षा 10' },
      { value: 'up_board_10_en', label: 'UP Board 10 (English)', labelHi: 'UP बोर्ड 10 (अंग्रेजी माध्यम)' },
      { value: 'up_board_10_hi', label: 'UP Board 10 (Hindi)', labelHi: 'UP बोर्ड 10 (हिंदी माध्यम)' },
      { value: 'icse_10', label: 'ICSE Class 10', labelHi: 'ICSE कक्षा 10' },
      { value: 'bihar_board_10', label: 'Bihar Board 10', labelHi: 'बिहार बोर्ड 10' },
      { value: 'mp_board_10', label: 'MP Board 10', labelHi: 'MP बोर्ड 10' },
      { value: 'raj_board_10', label: 'Rajasthan Board 10', labelHi: 'राजस्थान बोर्ड 10' },
      { value: 'haryana_board_10', label: 'Haryana Board 10', labelHi: 'हरियाणा बोर्ड 10' },
      { value: 'jharkhand_board_10', label: 'Jharkhand Board 10', labelHi: 'झारखंड बोर्ड 10' },
      { value: 'cg_board_10', label: 'CG Board 10', labelHi: 'CG बोर्ड 10' },
      { value: 'uk_board_10', label: 'Uttarakhand Board 10', labelHi: 'उत्तराखंड बोर्ड 10' },
    ],
  },
  {
    id: 'board_12',
    label: 'Class 12 Board PYQ',
    labelHi: 'कक्षा 12 बोर्ड PYQ',
    color: 'bg-orange-600',
    icon: '📕',
    exams: [
      { value: 'cbse_12', label: 'CBSE Class 12', labelHi: 'CBSE कक्षा 12' },
      { value: 'cbse_11', label: 'CBSE Class 11', labelHi: 'CBSE कक्षा 11' },
      { value: 'up_board_12_en', label: 'UP Board 12 (English)', labelHi: 'UP बोर्ड 12 (अंग्रेजी माध्यम)' },
      { value: 'up_board_12_hi', label: 'UP Board 12 (Hindi)', labelHi: 'UP बोर्ड 12 (हिंदी माध्यम)' },
      { value: 'isc_12', label: 'ISC Class 12', labelHi: 'ISC कक्षा 12' },
      { value: 'bihar_board_12', label: 'Bihar Board 12', labelHi: 'बिहार बोर्ड 12' },
      { value: 'mp_board_12', label: 'MP Board 12', labelHi: 'MP बोर्ड 12' },
      { value: 'raj_board_12', label: 'Rajasthan Board 12', labelHi: 'राजस्थान बोर्ड 12' },
      { value: 'haryana_board_12', label: 'Haryana Board 12', labelHi: 'हरियाणा बोर्ड 12' },
      { value: 'jharkhand_board_12', label: 'Jharkhand Board 12', labelHi: 'झारखंड बोर्ड 12' },
      { value: 'cg_board_12', label: 'CG Board 12', labelHi: 'CG बोर्ड 12' },
      { value: 'uk_board_12', label: 'Uttarakhand Board 12', labelHi: 'उत्तराखंड बोर्ड 12' },
    ],
  },
  {
    id: 'admission',
    label: 'Admission Exams',
    labelHi: 'प्रवेश परीक्षा',
    color: 'bg-fuchsia-600',
    icon: '🏫',
    exams: [
      { value: 'wbjee', label: 'WBJEE', labelHi: 'WBJEE' },
      { value: 'mht_cet', label: 'MHT CET', labelHi: 'MHT CET' },
      { value: 'kcet', label: 'KCET Karnataka', labelHi: 'KCET कर्नाटक' },
      { value: 'ap_eamcet', label: 'AP EAMCET', labelHi: 'AP EAMCET' },
      { value: 'ts_eamcet', label: 'TS EAMCET', labelHi: 'TS EAMCET' },
      { value: 'bitsat', label: 'BITSAT', labelHi: 'BITSAT' },
      { value: 'viteee', label: 'VITEEE', labelHi: 'VITEEE' },
      { value: 'comedk', label: 'COMEDK', labelHi: 'COMEDK' },
      { value: 'srmjee', label: 'SRMJEE', labelHi: 'SRMJEE' },
      { value: 'bhu_uet', label: 'BHU UET', labelHi: 'BHU UET' },
      { value: 'ipu_cet', label: 'IPU CET', labelHi: 'IPU CET' },
      { value: 'duet', label: 'DU Entrance', labelHi: 'DU प्रवेश' },
      { value: 'amu_entrance', label: 'AMU Entrance', labelHi: 'AMU प्रवेश' },
      { value: 'tiss_net', label: 'TISS NET', labelHi: 'TISS NET' },
      { value: 'nift', label: 'NIFT', labelHi: 'NIFT' },
      { value: 'nid', label: 'NID', labelHi: 'NID' },
      { value: 'uceed', label: 'UCEED', labelHi: 'UCEED' },
      { value: 'ceed', label: 'CEED', labelHi: 'CEED' },
    ],
  },
  {
    id: 'law',
    label: 'Law',
    labelHi: 'विधि',
    color: 'bg-slate-600',
    icon: '⚖️',
    exams: [
      { value: 'clat', label: 'CLAT', labelHi: 'CLAT' },
      { value: 'ailet', label: 'AILET', labelHi: 'AILET' },
    ],
  },
  {
    id: 'mba',
    label: 'MBA',
    labelHi: 'MBA',
    color: 'bg-cyan-600',
    icon: '💼',
    exams: [
      { value: 'cat', label: 'CAT', labelHi: 'CAT' },
      { value: 'xat', label: 'XAT', labelHi: 'XAT' },
      { value: 'mat', label: 'MAT', labelHi: 'MAT' },
    ],
  },
  {
    id: 'nursing',
    label: 'Nursing & Pharma',
    labelHi: 'नर्सिंग और फार्मा',
    color: 'bg-rose-600',
    icon: '🏥',
    exams: [
      { value: 'gnm', label: 'GNM Nursing', labelHi: 'GNM नर्सिंग' },
      { value: 'anm', label: 'ANM Nursing', labelHi: 'ANM नर्सिंग' },
      { value: 'bsc_nursing', label: 'B.Sc Nursing', labelHi: 'B.Sc नर्सिंग' },
      { value: 'bpharm', label: 'B.Pharm', labelHi: 'B.Pharm' },
      { value: 'dpharm', label: 'D.Pharm', labelHi: 'D.Pharm' },
      { value: 'dmlt', label: 'DMLT', labelHi: 'DMLT' },
    ],
  },
  {
    id: 'state_police',
    label: 'State Police',
    labelHi: 'राज्य पुलिस',
    color: 'bg-red-700',
    icon: '🚔',
    exams: [
      { value: 'up_police', label: 'UP Police', labelHi: 'UP पुलिस' },
      { value: 'up_si', label: 'UP SI', labelHi: 'UP SI' },
      { value: 'bihar_police', label: 'Bihar Police', labelHi: 'बिहार पुलिस' },
      { value: 'bihar_si', label: 'Bihar SI', labelHi: 'बिहार SI' },
      { value: 'mp_police', label: 'MP Police', labelHi: 'MP पुलिस' },
      { value: 'mp_si', label: 'MP SI', labelHi: 'MP SI' },
      { value: 'raj_police', label: 'Rajasthan Police', labelHi: 'राजस्थान पुलिस' },
      { value: 'raj_si', label: 'Rajasthan SI', labelHi: 'राजस्थान SI' },
      { value: 'haryana_police', label: 'Haryana Police', labelHi: 'हरियाणा पुलिस' },
      { value: 'delhi_police', label: 'Delhi Police', labelHi: 'दिल्ली पुलिस' },
      { value: 'cg_police', label: 'CG Police', labelHi: 'CG पुलिस' },
      { value: 'uk_police', label: 'Uttarakhand Police', labelHi: 'उत्तराखंड पुलिस' },
      { value: 'jharkhand_police', label: 'Jharkhand Police', labelHi: 'झारखंड पुलिस' },
    ],
  },
  {
    id: 'state_teacher',
    label: 'State TET',
    labelHi: 'राज्य TET',
    color: 'bg-emerald-600',
    icon: '📖',
    exams: [
      { value: 'uptet', label: 'UPTET', labelHi: 'UPTET' },
      { value: 'supertet', label: 'Super TET', labelHi: 'सुपर TET' },
      { value: 'bihar_tet', label: 'Bihar TET/STET', labelHi: 'बिहार TET/STET' },
      { value: 'mptet', label: 'MP TET', labelHi: 'MP TET' },
      { value: 'reet', label: 'REET', labelHi: 'REET' },
      { value: 'htet', label: 'HTET', labelHi: 'HTET' },
      { value: 'otet', label: 'OTET', labelHi: 'OTET' },
      { value: 'wb_tet', label: 'WB TET', labelHi: 'WB TET' },
      { value: 'tntet', label: 'TN TET', labelHi: 'TN TET' },
      { value: 'kartet', label: 'Karnataka TET', labelHi: 'कर्नाटक TET' },
      { value: 'aptet', label: 'AP TET', labelHi: 'AP TET' },
    ],
  },
  {
    id: 'state_revenue',
    label: 'Patwari/Lekhpal',
    labelHi: 'पटवारी/लेखपाल',
    color: 'bg-lime-600',
    icon: '📋',
    exams: [
      { value: 'up_lekhpal', label: 'UP Lekhpal', labelHi: 'UP लेखपाल' },
      { value: 'mp_patwari', label: 'MP Patwari', labelHi: 'MP पटवारी' },
      { value: 'raj_patwari', label: 'Rajasthan Patwari', labelHi: 'राजस्थान पटवारी' },
      { value: 'cg_patwari', label: 'CG Patwari', labelHi: 'CG पटवारी' },
    ],
  },
  {
    id: 'state_group',
    label: 'State Group C/D',
    labelHi: 'राज्य ग्रुप C/D',
    color: 'bg-violet-600',
    icon: '🏢',
    exams: [
      { value: 'up_vdo', label: 'UP VDO/GPA', labelHi: 'UP VDO/GPA' },
      { value: 'up_ro_aro', label: 'UP RO/ARO', labelHi: 'UP RO/ARO' },
      { value: 'mp_vyapam', label: 'MP Vyapam', labelHi: 'MP व्यापम' },
      { value: 'raj_ldc', label: 'Rajasthan LDC', labelHi: 'राजस्थान LDC' },
      { value: 'jssc', label: 'JSSC Jharkhand', labelHi: 'JSSC झारखंड' },
      { value: 'osssc', label: 'OSSSC Odisha', labelHi: 'OSSSC ओडिशा' },
      { value: 'wbssc', label: 'WBSSC', labelHi: 'WBSSC' },
      { value: 'hssc', label: 'HSSC Haryana', labelHi: 'HSSC हरियाणा' },
    ],
  },
  {
    id: 'insurance',
    label: 'Insurance & Finance',
    labelHi: 'बीमा और वित्त',
    color: 'bg-emerald-700',
    icon: '🛡️',
    exams: [
      { value: 'niacl', label: 'NIACL', labelHi: 'NIACL' },
      { value: 'uiic', label: 'UIIC', labelHi: 'UIIC' },
      { value: 'epfo', label: 'EPFO', labelHi: 'EPFO' },
      { value: 'fci', label: 'FCI', labelHi: 'FCI' },
    ],
  },
  {
    id: 'others',
    label: 'Others',
    labelHi: 'अन्य',
    color: 'bg-gray-600',
    icon: '📝',
    exams: [
      { value: 'cuet', label: 'CUET', labelHi: 'CUET' },
      { value: 'olympiad', label: 'Olympiad', labelHi: 'ओलंपियाड' },
      { value: 'ntse', label: 'NTSE', labelHi: 'NTSE' },
      { value: 'kvpy', label: 'KVPY', labelHi: 'KVPY' },
      { value: 'icar', label: 'ICAR NET', labelHi: 'ICAR NET' },
      { value: 'general_gk', label: 'General GK', labelHi: 'सामान्य ज्ञान' },
      { value: 'bihar_cdpo', label: 'Bihar CDPO', labelHi: 'बिहार CDPO' },
    ],
  },
];

export function findExamInfo(examValue: string): { exam: ExamInfo; category: ExamCategory } | null {
  for (const cat of EXAM_CATEGORIES) {
    const exam = cat.exams.find(e => e.value === examValue);
    if (exam) return { exam, category: cat };
  }
  return null;
}
