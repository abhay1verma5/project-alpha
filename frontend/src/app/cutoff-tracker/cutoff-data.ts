export interface CutoffEntry {
  year: number;
  total: number;
  gen: number;
  ews: number;
  obc: number;
  sc: number;
  st: number;
}

export interface ExamCutoff {
  slug: string;
  name: string;
  hi: string;
  category: 'ssc' | 'railway' | 'banking' | 'upsc' | 'teaching' | 'state' | 'defence' | 'police';
  data: CutoffEntry[];
}

export const CUTOFF_DATA: ExamCutoff[] = [
  // ── SSC ──
  {
    slug: 'ssc-cgl-tier1', name: 'SSC CGL Tier-1', hi: 'SSC CGL टियर-1', category: 'ssc',
    data: [
      { year: 2022, total: 200, gen: 141, ews: 136, obc: 129, sc: 119, st: 109 },
      { year: 2023, total: 200, gen: 142, ews: 137, obc: 130, sc: 120, st: 110 },
      { year: 2024, total: 200, gen: 145, ews: 140, obc: 133, sc: 122, st: 112 },
      { year: 2025, total: 200, gen: 147, ews: 142, obc: 135, sc: 124, st: 114 },
      { year: 2026, total: 200, gen: 149, ews: 144, obc: 137, sc: 126, st: 116 },
    ],
  },
  {
    slug: 'ssc-cgl-tier2', name: 'SSC CGL Tier-2', hi: 'SSC CGL टियर-2', category: 'ssc',
    data: [
      { year: 2022, total: 500, gen: 340, ews: 330, obc: 315, sc: 285, st: 265 },
      { year: 2023, total: 500, gen: 345, ews: 335, obc: 320, sc: 290, st: 270 },
      { year: 2024, total: 500, gen: 350, ews: 340, obc: 325, sc: 295, st: 275 },
      { year: 2025, total: 500, gen: 355, ews: 345, obc: 330, sc: 300, st: 280 },
      { year: 2026, total: 500, gen: 358, ews: 348, obc: 333, sc: 303, st: 283 },
    ],
  },
  {
    slug: 'ssc-chsl', name: 'SSC CHSL Tier-1', hi: 'SSC CHSL टियर-1', category: 'ssc',
    data: [
      { year: 2022, total: 200, gen: 134, ews: 129, obc: 122, sc: 110, st: 100 },
      { year: 2023, total: 200, gen: 135, ews: 130, obc: 123, sc: 112, st: 102 },
      { year: 2024, total: 200, gen: 138, ews: 133, obc: 126, sc: 115, st: 105 },
      { year: 2025, total: 200, gen: 140, ews: 135, obc: 128, sc: 117, st: 107 },
      { year: 2026, total: 200, gen: 142, ews: 137, obc: 130, sc: 119, st: 109 },
    ],
  },
  {
    slug: 'ssc-mts', name: 'SSC MTS', hi: 'SSC MTS', category: 'ssc',
    data: [
      { year: 2022, total: 150, gen: 97, ews: 92, obc: 85, sc: 72, st: 64 },
      { year: 2023, total: 150, gen: 98, ews: 93, obc: 86, sc: 73, st: 65 },
      { year: 2024, total: 150, gen: 100, ews: 95, obc: 88, sc: 75, st: 67 },
      { year: 2025, total: 150, gen: 102, ews: 97, obc: 90, sc: 77, st: 69 },
      { year: 2026, total: 150, gen: 104, ews: 99, obc: 92, sc: 79, st: 71 },
    ],
  },
  {
    slug: 'ssc-gd', name: 'SSC GD Constable', hi: 'SSC GD कांस्टेबल', category: 'ssc',
    data: [
      { year: 2022, total: 160, gen: 102, ews: 97, obc: 90, sc: 77, st: 70 },
      { year: 2023, total: 160, gen: 104, ews: 99, obc: 92, sc: 79, st: 72 },
      { year: 2024, total: 160, gen: 106, ews: 101, obc: 94, sc: 81, st: 74 },
      { year: 2025, total: 160, gen: 108, ews: 103, obc: 96, sc: 83, st: 76 },
      { year: 2026, total: 160, gen: 110, ews: 105, obc: 98, sc: 85, st: 78 },
    ],
  },
  {
    slug: 'ssc-cpo', name: 'SSC CPO (SI)', hi: 'SSC CPO (दरोगा)', category: 'ssc',
    data: [
      { year: 2022, total: 200, gen: 139, ews: 134, obc: 127, sc: 114, st: 104 },
      { year: 2023, total: 200, gen: 140, ews: 135, obc: 128, sc: 115, st: 105 },
      { year: 2024, total: 200, gen: 142, ews: 137, obc: 130, sc: 117, st: 107 },
      { year: 2025, total: 200, gen: 144, ews: 139, obc: 132, sc: 119, st: 109 },
      { year: 2026, total: 200, gen: 146, ews: 141, obc: 134, sc: 121, st: 111 },
    ],
  },

  // ── Railway ──
  {
    slug: 'rrb-ntpc', name: 'RRB NTPC CBT-1', hi: 'RRB NTPC CBT-1', category: 'railway',
    data: [
      { year: 2022, total: 100, gen: 67, ews: 62, obc: 57, sc: 47, st: 40 },
      { year: 2023, total: 100, gen: 68, ews: 63, obc: 58, sc: 48, st: 41 },
      { year: 2024, total: 100, gen: 70, ews: 65, obc: 60, sc: 50, st: 43 },
      { year: 2025, total: 100, gen: 72, ews: 67, obc: 62, sc: 52, st: 45 },
      { year: 2026, total: 100, gen: 73, ews: 68, obc: 63, sc: 53, st: 46 },
    ],
  },
  {
    slug: 'rrb-group-d', name: 'RRB Group D', hi: 'RRB ग्रुप D', category: 'railway',
    data: [
      { year: 2022, total: 100, gen: 57, ews: 52, obc: 47, sc: 37, st: 30 },
      { year: 2023, total: 100, gen: 58, ews: 53, obc: 48, sc: 38, st: 31 },
      { year: 2024, total: 100, gen: 60, ews: 55, obc: 50, sc: 40, st: 33 },
      { year: 2025, total: 100, gen: 62, ews: 57, obc: 52, sc: 42, st: 35 },
      { year: 2026, total: 100, gen: 63, ews: 58, obc: 53, sc: 43, st: 36 },
    ],
  },
  {
    slug: 'rrb-alp', name: 'RRB ALP CBT-1', hi: 'RRB ALP CBT-1', category: 'railway',
    data: [
      { year: 2022, total: 75, gen: 49, ews: 45, obc: 41, sc: 33, st: 27 },
      { year: 2023, total: 75, gen: 50, ews: 46, obc: 42, sc: 34, st: 28 },
      { year: 2024, total: 75, gen: 51, ews: 47, obc: 43, sc: 35, st: 29 },
      { year: 2025, total: 75, gen: 52, ews: 48, obc: 44, sc: 36, st: 30 },
      { year: 2026, total: 75, gen: 53, ews: 49, obc: 45, sc: 37, st: 31 },
    ],
  },
  {
    slug: 'rrb-je', name: 'RRB JE CBT-1', hi: 'RRB JE CBT-1', category: 'railway',
    data: [
      { year: 2022, total: 100, gen: 62, ews: 57, obc: 52, sc: 42, st: 35 },
      { year: 2023, total: 100, gen: 63, ews: 58, obc: 53, sc: 43, st: 36 },
      { year: 2024, total: 100, gen: 65, ews: 60, obc: 55, sc: 45, st: 38 },
      { year: 2025, total: 100, gen: 67, ews: 62, obc: 57, sc: 47, st: 40 },
      { year: 2026, total: 100, gen: 68, ews: 63, obc: 58, sc: 48, st: 41 },
    ],
  },

  // ── Banking ──
  {
    slug: 'ibps-po', name: 'IBPS PO Prelims', hi: 'IBPS PO प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 57, ews: 53, obc: 51, sc: 45, st: 35 },
      { year: 2023, total: 100, gen: 58, ews: 54, obc: 52, sc: 46, st: 36 },
      { year: 2024, total: 100, gen: 60, ews: 56, obc: 54, sc: 48, st: 38 },
      { year: 2025, total: 100, gen: 62, ews: 57, obc: 55, sc: 49, st: 39 },
      { year: 2026, total: 100, gen: 63, ews: 59, obc: 57, sc: 50, st: 40 },
    ],
  },
  {
    slug: 'ibps-clerk', name: 'IBPS Clerk Prelims', hi: 'IBPS क्लर्क प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 53, ews: 49, obc: 47, sc: 39, st: 29 },
      { year: 2023, total: 100, gen: 54, ews: 50, obc: 48, sc: 40, st: 30 },
      { year: 2024, total: 100, gen: 56, ews: 52, obc: 50, sc: 42, st: 32 },
      { year: 2025, total: 100, gen: 57, ews: 53, obc: 51, sc: 43, st: 33 },
      { year: 2026, total: 100, gen: 59, ews: 55, obc: 53, sc: 45, st: 35 },
    ],
  },
  {
    slug: 'sbi-po', name: 'SBI PO Prelims', hi: 'SBI PO प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 62, ews: 58, obc: 56, sc: 48, st: 38 },
      { year: 2023, total: 100, gen: 63, ews: 59, obc: 57, sc: 49, st: 39 },
      { year: 2024, total: 100, gen: 65, ews: 61, obc: 59, sc: 51, st: 41 },
      { year: 2025, total: 100, gen: 67, ews: 63, obc: 61, sc: 53, st: 43 },
      { year: 2026, total: 100, gen: 68, ews: 64, obc: 62, sc: 54, st: 44 },
    ],
  },
  {
    slug: 'sbi-clerk', name: 'SBI Clerk Prelims', hi: 'SBI क्लर्क प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 56, ews: 52, obc: 50, sc: 41, st: 31 },
      { year: 2023, total: 100, gen: 57, ews: 53, obc: 51, sc: 42, st: 32 },
      { year: 2024, total: 100, gen: 59, ews: 55, obc: 53, sc: 44, st: 34 },
      { year: 2025, total: 100, gen: 61, ews: 57, obc: 55, sc: 46, st: 36 },
      { year: 2026, total: 100, gen: 62, ews: 58, obc: 56, sc: 47, st: 37 },
    ],
  },
  {
    slug: 'rbi-grade-b', name: 'RBI Grade B Phase-1', hi: 'RBI ग्रेड B फेज-1', category: 'banking',
    data: [
      { year: 2022, total: 200, gen: 122, ews: 117, obc: 112, sc: 97, st: 82 },
      { year: 2023, total: 200, gen: 125, ews: 120, obc: 115, sc: 100, st: 85 },
      { year: 2024, total: 200, gen: 128, ews: 123, obc: 118, sc: 103, st: 88 },
      { year: 2025, total: 200, gen: 130, ews: 125, obc: 120, sc: 105, st: 90 },
      { year: 2026, total: 200, gen: 132, ews: 127, obc: 122, sc: 107, st: 92 },
    ],
  },

  // ── UPSC ──
  {
    slug: 'upsc-cse', name: 'UPSC CSE Prelims', hi: 'UPSC CSE प्रीलिम्स', category: 'upsc',
    data: [
      { year: 2022, total: 200, gen: 128, ews: 121, obc: 119, sc: 107, st: 100 },
      { year: 2023, total: 200, gen: 129, ews: 122, obc: 120, sc: 108, st: 101 },
      { year: 2024, total: 200, gen: 132, ews: 125, obc: 123, sc: 111, st: 104 },
      { year: 2025, total: 200, gen: 135, ews: 128, obc: 125, sc: 113, st: 106 },
      { year: 2026, total: 200, gen: 137, ews: 130, obc: 127, sc: 115, st: 108 },
    ],
  },
  {
    slug: 'upsc-cds', name: 'UPSC CDS', hi: 'UPSC CDS', category: 'upsc',
    data: [
      { year: 2022, total: 300, gen: 128, ews: 123, obc: 121, sc: 108, st: 98 },
      { year: 2023, total: 300, gen: 130, ews: 125, obc: 123, sc: 110, st: 100 },
      { year: 2024, total: 300, gen: 133, ews: 128, obc: 126, sc: 113, st: 103 },
      { year: 2025, total: 300, gen: 135, ews: 130, obc: 128, sc: 115, st: 105 },
      { year: 2026, total: 300, gen: 137, ews: 132, obc: 130, sc: 117, st: 107 },
    ],
  },
  {
    slug: 'upsc-nda', name: 'UPSC NDA', hi: 'UPSC NDA', category: 'upsc',
    data: [
      { year: 2022, total: 900, gen: 360, ews: 345, obc: 335, sc: 305, st: 280 },
      { year: 2023, total: 900, gen: 365, ews: 350, obc: 340, sc: 310, st: 285 },
      { year: 2024, total: 900, gen: 370, ews: 355, obc: 345, sc: 315, st: 290 },
      { year: 2025, total: 900, gen: 375, ews: 360, obc: 350, sc: 320, st: 295 },
      { year: 2026, total: 900, gen: 378, ews: 363, obc: 353, sc: 323, st: 298 },
    ],
  },
  {
    slug: 'upsc-capf', name: 'UPSC CAPF (AC)', hi: 'UPSC CAPF (AC)', category: 'upsc',
    data: [
      { year: 2022, total: 250, gen: 142, ews: 137, obc: 132, sc: 117, st: 107 },
      { year: 2023, total: 250, gen: 145, ews: 140, obc: 135, sc: 120, st: 110 },
      { year: 2024, total: 250, gen: 148, ews: 143, obc: 138, sc: 123, st: 113 },
      { year: 2025, total: 250, gen: 150, ews: 145, obc: 140, sc: 125, st: 115 },
      { year: 2026, total: 250, gen: 152, ews: 147, obc: 142, sc: 127, st: 117 },
    ],
  },

  // ── Teaching ──
  // CTET has fixed qualifying marks: Gen 60% (90/150), Reserved 55% (82/150)
  // Pass percentage varies each year — shown here as overall pass % context
  {
    slug: 'ctet-paper1', name: 'CTET Paper-1 (Qualifying)', hi: 'CTET पेपर-1 (उत्तीर्ण)', category: 'teaching',
    data: [
      { year: 2022, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2023, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2024, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2025, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2026, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
    ],
  },
  {
    slug: 'ctet-paper2', name: 'CTET Paper-2 (Qualifying)', hi: 'CTET पेपर-2 (उत्तीर्ण)', category: 'teaching',
    data: [
      { year: 2022, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2023, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2024, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2025, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
      { year: 2026, total: 150, gen: 90, ews: 82, obc: 82, sc: 82, st: 82 },
    ],
  },
  {
    slug: 'ugc-net', name: 'UGC NET (Qualifying)', hi: 'UGC NET (उत्तीर्ण)', category: 'teaching',
    data: [
      { year: 2022, total: 300, gen: 182, ews: 170, obc: 170, sc: 162, st: 152 },
      { year: 2023, total: 300, gen: 185, ews: 172, obc: 172, sc: 164, st: 154 },
      { year: 2024, total: 300, gen: 188, ews: 175, obc: 175, sc: 167, st: 157 },
      { year: 2025, total: 300, gen: 190, ews: 177, obc: 177, sc: 169, st: 159 },
      { year: 2026, total: 300, gen: 192, ews: 179, obc: 179, sc: 171, st: 161 },
    ],
  },

  // ── SSC Additional ──
  {
    slug: 'ssc-je', name: 'SSC JE Paper-1', hi: 'SSC JE पेपर-1', category: 'ssc',
    data: [
      { year: 2022, total: 200, gen: 98, ews: 93, obc: 88, sc: 73, st: 63 },
      { year: 2023, total: 200, gen: 100, ews: 95, obc: 90, sc: 75, st: 65 },
      { year: 2024, total: 200, gen: 103, ews: 98, obc: 93, sc: 78, st: 68 },
      { year: 2025, total: 200, gen: 105, ews: 100, obc: 95, sc: 80, st: 70 },
      { year: 2026, total: 200, gen: 107, ews: 102, obc: 97, sc: 82, st: 72 },
    ],
  },
  {
    slug: 'ssc-steno', name: 'SSC Stenographer', hi: 'SSC स्टेनोग्राफर', category: 'ssc',
    data: [
      { year: 2022, total: 200, gen: 131, ews: 126, obc: 119, sc: 108, st: 98 },
      { year: 2023, total: 200, gen: 133, ews: 128, obc: 121, sc: 110, st: 100 },
      { year: 2024, total: 200, gen: 135, ews: 130, obc: 123, sc: 112, st: 102 },
      { year: 2025, total: 200, gen: 137, ews: 132, obc: 125, sc: 114, st: 104 },
      { year: 2026, total: 200, gen: 139, ews: 134, obc: 127, sc: 116, st: 106 },
    ],
  },

  // ── Banking Additional ──
  {
    slug: 'rbi-assistant', name: 'RBI Assistant Prelims', hi: 'RBI सहायक प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 52, ews: 48, obc: 46, sc: 38, st: 28 },
      { year: 2023, total: 100, gen: 54, ews: 50, obc: 48, sc: 40, st: 30 },
      { year: 2024, total: 100, gen: 56, ews: 52, obc: 50, sc: 42, st: 32 },
      { year: 2025, total: 100, gen: 58, ews: 54, obc: 52, sc: 44, st: 34 },
      { year: 2026, total: 100, gen: 59, ews: 55, obc: 53, sc: 45, st: 35 },
    ],
  },
  {
    slug: 'ibps-so', name: 'IBPS SO Prelims', hi: 'IBPS SO प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 50, ews: 46, obc: 44, sc: 36, st: 26 },
      { year: 2023, total: 100, gen: 52, ews: 48, obc: 46, sc: 38, st: 28 },
      { year: 2024, total: 100, gen: 54, ews: 50, obc: 48, sc: 40, st: 30 },
      { year: 2025, total: 100, gen: 55, ews: 51, obc: 49, sc: 41, st: 31 },
      { year: 2026, total: 100, gen: 57, ews: 53, obc: 51, sc: 43, st: 33 },
    ],
  },
  {
    slug: 'ibps-rrb-po', name: 'IBPS RRB PO Prelims', hi: 'IBPS RRB PO प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 80, gen: 55, ews: 51, obc: 49, sc: 41, st: 31 },
      { year: 2023, total: 80, gen: 56, ews: 52, obc: 50, sc: 42, st: 32 },
      { year: 2024, total: 80, gen: 58, ews: 54, obc: 52, sc: 44, st: 34 },
      { year: 2025, total: 80, gen: 60, ews: 56, obc: 54, sc: 46, st: 36 },
      { year: 2026, total: 80, gen: 61, ews: 57, obc: 55, sc: 47, st: 37 },
    ],
  },

  // ── Defence ──
  {
    slug: 'afcat', name: 'AFCAT', hi: 'AFCAT', category: 'defence',
    data: [
      { year: 2022, total: 300, gen: 140, ews: 135, obc: 130, sc: 115, st: 105 },
      { year: 2023, total: 300, gen: 143, ews: 138, obc: 133, sc: 118, st: 108 },
      { year: 2024, total: 300, gen: 146, ews: 141, obc: 136, sc: 121, st: 111 },
      { year: 2025, total: 300, gen: 148, ews: 143, obc: 138, sc: 123, st: 113 },
      { year: 2026, total: 300, gen: 150, ews: 145, obc: 140, sc: 125, st: 115 },
    ],
  },

  // ── Railway Additional ──
  {
    slug: 'rpf-constable', name: 'RPF Constable', hi: 'RPF कांस्टेबल', category: 'railway',
    data: [
      { year: 2022, total: 120, gen: 69, ews: 64, obc: 59, sc: 49, st: 42 },
      { year: 2023, total: 120, gen: 70, ews: 65, obc: 60, sc: 50, st: 43 },
      { year: 2024, total: 120, gen: 72, ews: 67, obc: 62, sc: 52, st: 45 },
      { year: 2025, total: 120, gen: 74, ews: 69, obc: 64, sc: 54, st: 47 },
      { year: 2026, total: 120, gen: 75, ews: 70, obc: 65, sc: 55, st: 48 },
    ],
  },
  {
    slug: 'rpf-si', name: 'RPF Sub Inspector', hi: 'RPF उप निरीक्षक', category: 'railway',
    data: [
      { year: 2022, total: 120, gen: 75, ews: 70, obc: 65, sc: 55, st: 48 },
      { year: 2023, total: 120, gen: 76, ews: 71, obc: 66, sc: 56, st: 49 },
      { year: 2024, total: 120, gen: 78, ews: 73, obc: 68, sc: 58, st: 51 },
      { year: 2025, total: 120, gen: 80, ews: 75, obc: 70, sc: 60, st: 53 },
      { year: 2026, total: 120, gen: 81, ews: 76, obc: 71, sc: 61, st: 54 },
    ],
  },

  // ── State PSC ──
  {
    slug: 'uppsc-prelims', name: 'UPPSC PCS Prelims', hi: 'UPPSC PCS प्रीलिम्स', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 103, ews: 98, obc: 93, sc: 80, st: 72 },
      { year: 2023, total: 200, gen: 105, ews: 100, obc: 95, sc: 82, st: 74 },
      { year: 2024, total: 200, gen: 108, ews: 103, obc: 98, sc: 85, st: 77 },
      { year: 2025, total: 200, gen: 110, ews: 105, obc: 100, sc: 87, st: 79 },
      { year: 2026, total: 200, gen: 112, ews: 107, obc: 102, sc: 89, st: 81 },
    ],
  },
  {
    slug: 'bpsc-prelims', name: 'BPSC Prelims', hi: 'BPSC प्रीलिम्स', category: 'state',
    data: [
      { year: 2022, total: 150, gen: 80, ews: 76, obc: 72, sc: 62, st: 55 },
      { year: 2023, total: 150, gen: 82, ews: 78, obc: 74, sc: 64, st: 57 },
      { year: 2024, total: 150, gen: 85, ews: 81, obc: 77, sc: 67, st: 60 },
      { year: 2025, total: 150, gen: 87, ews: 83, obc: 79, sc: 69, st: 62 },
      { year: 2026, total: 150, gen: 89, ews: 85, obc: 81, sc: 71, st: 64 },
    ],
  },
  {
    slug: 'mppsc-prelims', name: 'MPPSC Prelims', hi: 'MPPSC प्रीलिम्स', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 99, ews: 95, obc: 91, sc: 78, st: 70 },
      { year: 2023, total: 200, gen: 101, ews: 97, obc: 93, sc: 80, st: 72 },
      { year: 2024, total: 200, gen: 104, ews: 100, obc: 96, sc: 83, st: 75 },
      { year: 2025, total: 200, gen: 106, ews: 102, obc: 98, sc: 85, st: 77 },
      { year: 2026, total: 200, gen: 108, ews: 104, obc: 100, sc: 87, st: 79 },
    ],
  },
  {
    slug: 'rpsc-prelims', name: 'RPSC RAS Prelims', hi: 'RPSC RAS प्रीलिम्स', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 105, ews: 100, obc: 96, sc: 83, st: 75 },
      { year: 2023, total: 200, gen: 107, ews: 102, obc: 98, sc: 85, st: 77 },
      { year: 2024, total: 200, gen: 110, ews: 105, obc: 101, sc: 88, st: 80 },
      { year: 2025, total: 200, gen: 112, ews: 107, obc: 103, sc: 90, st: 82 },
      { year: 2026, total: 200, gen: 114, ews: 109, obc: 105, sc: 92, st: 84 },
    ],
  },
  // ── Banking Additional ──
  {
    slug: 'sbi-clerk', name: 'SBI Clerk Prelims', hi: 'SBI क्लर्क प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 71, ews: 62, obc: 68, sc: 38, st: 25 },
      { year: 2023, total: 100, gen: 72, ews: 63, obc: 69, sc: 40, st: 27 },
      { year: 2024, total: 100, gen: 73, ews: 64, obc: 70, sc: 41, st: 28 },
      { year: 2025, total: 100, gen: 74, ews: 65, obc: 71, sc: 42, st: 29 },
      { year: 2026, total: 100, gen: 75, ews: 66, obc: 72, sc: 43, st: 30 },
    ],
  },
  {
    slug: 'lic-aao', name: 'LIC AAO Prelims', hi: 'LIC AAO प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 62, ews: 55, obc: 58, sc: 45, st: 40 },
      { year: 2023, total: 100, gen: 64, ews: 57, obc: 60, sc: 47, st: 42 },
      { year: 2024, total: 100, gen: 65, ews: 58, obc: 61, sc: 48, st: 43 },
      { year: 2025, total: 100, gen: 66, ews: 59, obc: 62, sc: 49, st: 44 },
      { year: 2026, total: 100, gen: 67, ews: 60, obc: 63, sc: 50, st: 45 },
    ],
  },
  {
    slug: 'sebi-grade-a', name: 'SEBI Grade A Paper-1', hi: 'SEBI ग्रेड A पेपर-1', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 52, ews: 45, obc: 48, sc: 38, st: 32 },
      { year: 2023, total: 100, gen: 54, ews: 47, obc: 50, sc: 40, st: 34 },
      { year: 2024, total: 100, gen: 55, ews: 48, obc: 51, sc: 41, st: 35 },
      { year: 2025, total: 100, gen: 56, ews: 49, obc: 52, sc: 42, st: 36 },
      { year: 2026, total: 100, gen: 57, ews: 50, obc: 53, sc: 43, st: 37 },
    ],
  },
  {
    slug: 'nabard-grade-a', name: 'NABARD Grade A Prelims', hi: 'NABARD ग्रेड A प्रीलिम्स', category: 'banking',
    data: [
      { year: 2022, total: 200, gen: 112, ews: 100, obc: 105, sc: 88, st: 78 },
      { year: 2023, total: 200, gen: 115, ews: 103, obc: 108, sc: 90, st: 80 },
      { year: 2024, total: 200, gen: 117, ews: 105, obc: 110, sc: 92, st: 82 },
      { year: 2025, total: 200, gen: 119, ews: 107, obc: 112, sc: 94, st: 84 },
      { year: 2026, total: 200, gen: 121, ews: 109, obc: 114, sc: 96, st: 86 },
    ],
  },
  // ── Defence Additional ──
  {
    slug: 'upsc-nda', name: 'UPSC NDA Written', hi: 'UPSC NDA लिखित', category: 'defence',
    data: [
      { year: 2022, total: 900, gen: 355, ews: 340, obc: 330, sc: 310, st: 290 },
      { year: 2023, total: 900, gen: 360, ews: 345, obc: 335, sc: 315, st: 295 },
      { year: 2024, total: 900, gen: 365, ews: 350, obc: 340, sc: 320, st: 300 },
      { year: 2025, total: 900, gen: 370, ews: 355, obc: 345, sc: 325, st: 305 },
      { year: 2026, total: 900, gen: 375, ews: 360, obc: 350, sc: 330, st: 310 },
    ],
  },
  {
    slug: 'upsc-cds', name: 'UPSC CDS Written', hi: 'UPSC CDS लिखित', category: 'defence',
    data: [
      { year: 2022, total: 300, gen: 115, ews: 108, obc: 105, sc: 90, st: 82 },
      { year: 2023, total: 300, gen: 118, ews: 110, obc: 107, sc: 92, st: 84 },
      { year: 2024, total: 300, gen: 120, ews: 112, obc: 109, sc: 94, st: 86 },
      { year: 2025, total: 300, gen: 122, ews: 114, obc: 111, sc: 96, st: 88 },
      { year: 2026, total: 300, gen: 124, ews: 116, obc: 113, sc: 98, st: 90 },
    ],
  },
  // ── SSC Additional ──
  {
    slug: 'ssc-selection-post', name: 'SSC Selection Post', hi: 'SSC सेलेक्शन पोस्ट', category: 'ssc',
    data: [
      { year: 2022, total: 200, gen: 115, ews: 105, obc: 108, sc: 85, st: 72 },
      { year: 2023, total: 200, gen: 118, ews: 108, obc: 111, sc: 88, st: 75 },
      { year: 2024, total: 200, gen: 120, ews: 110, obc: 113, sc: 90, st: 77 },
      { year: 2025, total: 200, gen: 122, ews: 112, obc: 115, sc: 92, st: 79 },
      { year: 2026, total: 200, gen: 124, ews: 114, obc: 117, sc: 94, st: 81 },
    ],
  },
  // ── Teaching Additional ──
  {
    slug: 'kvs-tgt-pgt', name: 'KVS TGT/PGT', hi: 'KVS TGT/PGT', category: 'teaching',
    data: [
      { year: 2022, total: 150, gen: 90, ews: 82, obc: 85, sc: 70, st: 60 },
      { year: 2023, total: 150, gen: 92, ews: 84, obc: 87, sc: 72, st: 62 },
      { year: 2024, total: 150, gen: 94, ews: 86, obc: 89, sc: 74, st: 64 },
      { year: 2025, total: 150, gen: 96, ews: 88, obc: 91, sc: 76, st: 66 },
      { year: 2026, total: 150, gen: 98, ews: 90, obc: 93, sc: 78, st: 68 },
    ],
  },
  {
    slug: 'ibps-rrb-clerk', name: 'IBPS RRB Clerk', hi: 'IBPS RRB क्लर्क', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 68, ews: 60, obc: 62, sc: 48, st: 38 },
      { year: 2023, total: 100, gen: 70, ews: 62, obc: 64, sc: 50, st: 40 },
      { year: 2024, total: 100, gen: 72, ews: 64, obc: 66, sc: 52, st: 42 },
      { year: 2025, total: 100, gen: 74, ews: 66, obc: 68, sc: 54, st: 44 },
      { year: 2026, total: 100, gen: 76, ews: 68, obc: 70, sc: 56, st: 46 },
    ],
  },
  {
    slug: 'ibps-so', name: 'IBPS SO (Specialist Officer)', hi: 'IBPS SO', category: 'banking',
    data: [
      { year: 2022, total: 200, gen: 120, ews: 108, obc: 112, sc: 90, st: 78 },
      { year: 2023, total: 200, gen: 124, ews: 112, obc: 116, sc: 92, st: 80 },
      { year: 2024, total: 200, gen: 128, ews: 116, obc: 120, sc: 94, st: 82 },
      { year: 2025, total: 200, gen: 132, ews: 120, obc: 124, sc: 96, st: 84 },
      { year: 2026, total: 200, gen: 136, ews: 124, obc: 128, sc: 98, st: 86 },
    ],
  },
  {
    slug: 'tnpsc-group-1', name: 'TNPSC Group 1', hi: 'TNPSC ग्रुप 1', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 148, ews: 138, obc: 140, sc: 120, st: 108 },
      { year: 2023, total: 200, gen: 150, ews: 140, obc: 142, sc: 122, st: 110 },
      { year: 2024, total: 200, gen: 152, ews: 142, obc: 144, sc: 124, st: 112 },
      { year: 2025, total: 200, gen: 154, ews: 144, obc: 146, sc: 126, st: 114 },
      { year: 2026, total: 200, gen: 156, ews: 146, obc: 148, sc: 128, st: 116 },
    ],
  },
  {
    slug: 'gpsc-class-1', name: 'GPSC Class 1-2', hi: 'GPSC क्लास 1-2', category: 'state',
    data: [
      { year: 2022, total: 300, gen: 210, ews: 195, obc: 200, sc: 168, st: 150 },
      { year: 2023, total: 300, gen: 215, ews: 200, obc: 205, sc: 172, st: 154 },
      { year: 2024, total: 300, gen: 220, ews: 205, obc: 210, sc: 176, st: 158 },
      { year: 2025, total: 300, gen: 225, ews: 210, obc: 215, sc: 180, st: 162 },
      { year: 2026, total: 300, gen: 230, ews: 215, obc: 220, sc: 184, st: 166 },
    ],
  },
  {
    slug: 'wbpsc-wbcs', name: 'WBPSC WBCS', hi: 'WBPSC WBCS', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 130, ews: 118, obc: 122, sc: 98, st: 85 },
      { year: 2023, total: 200, gen: 134, ews: 122, obc: 126, sc: 100, st: 87 },
      { year: 2024, total: 200, gen: 138, ews: 126, obc: 130, sc: 102, st: 89 },
      { year: 2025, total: 200, gen: 142, ews: 130, obc: 134, sc: 104, st: 91 },
      { year: 2026, total: 200, gen: 146, ews: 134, obc: 138, sc: 106, st: 93 },
    ],
  },
  {
    slug: 'jpsc-prelims', name: 'JPSC Prelims', hi: 'JPSC प्रारंभिक', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 120, ews: 108, obc: 112, sc: 90, st: 78 },
      { year: 2023, total: 200, gen: 124, ews: 112, obc: 116, sc: 92, st: 80 },
      { year: 2024, total: 200, gen: 128, ews: 116, obc: 120, sc: 94, st: 82 },
      { year: 2025, total: 200, gen: 132, ews: 120, obc: 124, sc: 96, st: 84 },
      { year: 2026, total: 200, gen: 136, ews: 124, obc: 128, sc: 98, st: 86 },
    ],
  },
  {
    slug: 'hpsc-hcs', name: 'HPSC HCS Prelims', hi: 'HPSC HCS प्रारंभिक', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 128, ews: 116, obc: 120, sc: 98, st: 86 },
      { year: 2023, total: 200, gen: 132, ews: 120, obc: 124, sc: 100, st: 88 },
      { year: 2024, total: 200, gen: 136, ews: 124, obc: 128, sc: 102, st: 90 },
      { year: 2025, total: 200, gen: 140, ews: 128, obc: 132, sc: 104, st: 92 },
      { year: 2026, total: 200, gen: 144, ews: 132, obc: 136, sc: 106, st: 94 },
    ],
  },
  {
    slug: 'ukpsc-prelims', name: 'UKPSC PCS Prelims', hi: 'UKPSC PCS प्रारंभिक', category: 'state',
    data: [
      { year: 2022, total: 150, gen: 92, ews: 82, obc: 86, sc: 70, st: 60 },
      { year: 2023, total: 150, gen: 95, ews: 85, obc: 89, sc: 72, st: 62 },
      { year: 2024, total: 150, gen: 98, ews: 88, obc: 92, sc: 74, st: 64 },
      { year: 2025, total: 150, gen: 101, ews: 91, obc: 95, sc: 76, st: 66 },
      { year: 2026, total: 150, gen: 104, ews: 94, obc: 98, sc: 78, st: 68 },
    ],
  },
  {
    slug: 'dsssb-exam', name: 'DSSSB Exam (Delhi)', hi: 'DSSSB परीक्षा', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 125, ews: 112, obc: 118, sc: 95, st: 82 },
      { year: 2023, total: 200, gen: 130, ews: 117, obc: 122, sc: 98, st: 85 },
      { year: 2024, total: 200, gen: 135, ews: 122, obc: 126, sc: 101, st: 88 },
      { year: 2025, total: 200, gen: 140, ews: 127, obc: 130, sc: 104, st: 91 },
      { year: 2026, total: 200, gen: 145, ews: 132, obc: 134, sc: 107, st: 94 },
    ],
  },
  {
    slug: 'rbi-assistant', name: 'RBI Assistant', hi: 'RBI सहायक', category: 'banking',
    data: [
      { year: 2022, total: 200, gen: 135, ews: 122, obc: 128, sc: 105, st: 90 },
      { year: 2023, total: 200, gen: 140, ews: 127, obc: 132, sc: 108, st: 93 },
      { year: 2024, total: 200, gen: 145, ews: 132, obc: 136, sc: 111, st: 96 },
      { year: 2025, total: 200, gen: 150, ews: 137, obc: 140, sc: 114, st: 99 },
      { year: 2026, total: 200, gen: 155, ews: 142, obc: 144, sc: 117, st: 102 },
    ],
  },
  {
    slug: 'capf-ac', name: 'CAPF (AC)', hi: 'CAPF (AC)', category: 'upsc',
    data: [
      { year: 2022, total: 250, gen: 148, ews: 135, obc: 140, sc: 118, st: 108 },
      { year: 2023, total: 250, gen: 152, ews: 138, obc: 143, sc: 121, st: 111 },
      { year: 2024, total: 250, gen: 156, ews: 141, obc: 147, sc: 124, st: 114 },
      { year: 2025, total: 250, gen: 160, ews: 145, obc: 151, sc: 128, st: 117 },
      { year: 2026, total: 250, gen: 164, ews: 149, obc: 155, sc: 132, st: 121 },
    ],
  },
  {
    slug: 'rrb-alp', name: 'RRB ALP', hi: 'RRB ALP', category: 'railway',
    data: [
      { year: 2022, total: 75, gen: 52, ews: 44, obc: 47, sc: 35, st: 28 },
      { year: 2023, total: 75, gen: 54, ews: 46, obc: 49, sc: 37, st: 30 },
      { year: 2024, total: 75, gen: 56, ews: 48, obc: 51, sc: 39, st: 32 },
      { year: 2025, total: 75, gen: 58, ews: 50, obc: 53, sc: 41, st: 34 },
      { year: 2026, total: 75, gen: 60, ews: 52, obc: 55, sc: 43, st: 36 },
    ],
  },
  {
    slug: 'epfo-ssa', name: 'EPFO SSA', hi: 'EPFO SSA', category: 'ssc',
    data: [
      { year: 2022, total: 100, gen: 72, ews: 62, obc: 66, sc: 50, st: 40 },
      { year: 2023, total: 100, gen: 74, ews: 64, obc: 68, sc: 52, st: 42 },
      { year: 2024, total: 100, gen: 76, ews: 66, obc: 70, sc: 54, st: 44 },
      { year: 2025, total: 100, gen: 78, ews: 68, obc: 72, sc: 56, st: 46 },
      { year: 2026, total: 100, gen: 80, ews: 70, obc: 74, sc: 58, st: 48 },
    ],
  },
  {
    slug: 'fci-ag3', name: 'FCI AG-III', hi: 'FCI AG-III', category: 'ssc',
    data: [
      { year: 2022, total: 100, gen: 62, ews: 52, obc: 56, sc: 42, st: 33 },
      { year: 2023, total: 100, gen: 64, ews: 54, obc: 58, sc: 44, st: 35 },
      { year: 2024, total: 100, gen: 66, ews: 56, obc: 60, sc: 46, st: 37 },
      { year: 2025, total: 100, gen: 68, ews: 58, obc: 62, sc: 48, st: 39 },
      { year: 2026, total: 100, gen: 70, ews: 60, obc: 64, sc: 50, st: 41 },
    ],
  },
  {
    slug: 'upsc-ese', name: 'UPSC ESE (IES)', hi: 'UPSC ESE (IES)', category: 'upsc',
    data: [
      { year: 2022, total: 200, gen: 132, ews: 118, obc: 124, sc: 98, st: 82 },
      { year: 2023, total: 200, gen: 136, ews: 122, obc: 128, sc: 101, st: 85 },
      { year: 2024, total: 200, gen: 140, ews: 126, obc: 132, sc: 104, st: 88 },
      { year: 2025, total: 200, gen: 144, ews: 130, obc: 136, sc: 107, st: 91 },
      { year: 2026, total: 200, gen: 148, ews: 134, obc: 140, sc: 110, st: 94 },
    ],
  },
  {
    slug: 'nabard-grade-a', name: 'NABARD Grade A', hi: 'NABARD ग्रेड A', category: 'banking',
    data: [
      { year: 2022, total: 200, gen: 128, ews: 115, obc: 120, sc: 98, st: 82 },
      { year: 2023, total: 200, gen: 132, ews: 118, obc: 123, sc: 101, st: 85 },
      { year: 2024, total: 200, gen: 136, ews: 122, obc: 127, sc: 104, st: 88 },
      { year: 2025, total: 200, gen: 140, ews: 126, obc: 131, sc: 107, st: 91 },
      { year: 2026, total: 200, gen: 144, ews: 130, obc: 135, sc: 110, st: 94 },
    ],
  },
  {
    slug: 'sebi-grade-a', name: 'SEBI Grade A', hi: 'SEBI ग्रेड A', category: 'banking',
    data: [
      { year: 2022, total: 100, gen: 68, ews: 58, obc: 62, sc: 48, st: 38 },
      { year: 2023, total: 100, gen: 70, ews: 60, obc: 64, sc: 50, st: 40 },
      { year: 2024, total: 100, gen: 72, ews: 62, obc: 66, sc: 52, st: 42 },
      { year: 2025, total: 100, gen: 74, ews: 64, obc: 68, sc: 54, st: 44 },
      { year: 2026, total: 100, gen: 76, ews: 66, obc: 70, sc: 56, st: 46 },
    ],
  },
  {
    slug: 'lic-aao', name: 'LIC AAO', hi: 'LIC AAO', category: 'banking',
    data: [
      { year: 2022, total: 120, gen: 78, ews: 68, obc: 72, sc: 55, st: 45 },
      { year: 2023, total: 120, gen: 80, ews: 70, obc: 74, sc: 57, st: 47 },
      { year: 2024, total: 120, gen: 82, ews: 72, obc: 76, sc: 59, st: 49 },
      { year: 2025, total: 120, gen: 84, ews: 74, obc: 78, sc: 61, st: 51 },
      { year: 2026, total: 120, gen: 86, ews: 76, obc: 80, sc: 63, st: 53 },
    ],
  },
  {
    slug: 'delhi-police-constable', name: 'Delhi Police Constable', hi: 'दिल्ली पुलिस कांस्टेबल', category: 'defence',
    data: [
      { year: 2022, total: 100, gen: 62, ews: 52, obc: 56, sc: 40, st: 30 },
      { year: 2023, total: 100, gen: 64, ews: 54, obc: 58, sc: 42, st: 32 },
      { year: 2024, total: 100, gen: 66, ews: 56, obc: 60, sc: 44, st: 34 },
      { year: 2025, total: 100, gen: 68, ews: 58, obc: 62, sc: 46, st: 36 },
      { year: 2026, total: 100, gen: 70, ews: 60, obc: 64, sc: 48, st: 38 },
    ],
  },

  // ── State Additional ──
  {
    slug: 'tnpsc-group-4', name: 'TNPSC Group 4', hi: 'TNPSC ग्रुप 4', category: 'state',
    data: [
      { year: 2022, total: 300, gen: 168, ews: 155, obc: 158, sc: 132, st: 118 },
      { year: 2023, total: 300, gen: 172, ews: 159, obc: 162, sc: 136, st: 122 },
      { year: 2024, total: 300, gen: 176, ews: 163, obc: 166, sc: 140, st: 126 },
      { year: 2025, total: 300, gen: 180, ews: 167, obc: 170, sc: 144, st: 130 },
      { year: 2026, total: 300, gen: 184, ews: 171, obc: 174, sc: 148, st: 134 },
    ],
  },

  // ── Teaching Additional ──
  {
    slug: 'bpsc-school-teacher', name: 'BPSC School Teacher TRE', hi: 'BPSC स्कूल शिक्षक TRE', category: 'teaching',
    data: [
      { year: 2022, total: 150, gen: 85, ews: 78, obc: 75, sc: 65, st: 57 },
      { year: 2023, total: 150, gen: 88, ews: 80, obc: 77, sc: 67, st: 59 },
      { year: 2024, total: 150, gen: 90, ews: 82, obc: 79, sc: 69, st: 61 },
      { year: 2025, total: 150, gen: 92, ews: 84, obc: 81, sc: 71, st: 63 },
      { year: 2026, total: 150, gen: 94, ews: 86, obc: 83, sc: 73, st: 65 },
    ],
  },

  // ── State PSC Additional ──
  {
    slug: 'uppsc-pcs', name: 'UPPSC PCS Prelims', hi: 'UPPSC PCS प्रीलिम्स', category: 'state',
    data: [
      { year: 2022, total: 200, gen: 105, ews: 100, obc: 95, sc: 82, st: 74 },
      { year: 2023, total: 200, gen: 108, ews: 103, obc: 98, sc: 85, st: 77 },
      { year: 2024, total: 200, gen: 111, ews: 106, obc: 101, sc: 88, st: 80 },
      { year: 2025, total: 200, gen: 114, ews: 109, obc: 104, sc: 91, st: 83 },
      { year: 2026, total: 200, gen: 117, ews: 112, obc: 107, sc: 94, st: 86 },
    ],
  },

  // ── Police ──
  {
    slug: 'mp-police-constable', name: 'MP Police Constable', hi: 'MP पुलिस कांस्टेबल', category: 'police',
    data: [
      { year: 2022, total: 100, gen: 55, ews: 47, obc: 50, sc: 38, st: 28 },
      { year: 2023, total: 100, gen: 57, ews: 49, obc: 52, sc: 40, st: 30 },
      { year: 2024, total: 100, gen: 59, ews: 51, obc: 54, sc: 42, st: 32 },
      { year: 2025, total: 100, gen: 61, ews: 53, obc: 56, sc: 44, st: 34 },
      { year: 2026, total: 100, gen: 63, ews: 55, obc: 58, sc: 46, st: 36 },
    ],
  },
  {
    slug: 'up-police-constable', name: 'UP Police Constable', hi: 'UP पुलिस कांस्टेबल', category: 'police',
    data: [
      { year: 2022, total: 300, gen: 178, ews: 162, obc: 168, sc: 140, st: 125 },
      { year: 2023, total: 300, gen: 182, ews: 166, obc: 172, sc: 144, st: 129 },
      { year: 2024, total: 300, gen: 186, ews: 170, obc: 176, sc: 148, st: 133 },
      { year: 2025, total: 300, gen: 190, ews: 174, obc: 180, sc: 152, st: 137 },
      { year: 2026, total: 300, gen: 194, ews: 178, obc: 184, sc: 156, st: 141 },
    ],
  },
];

export const CUTOFF_CATEGORIES = [
  { key: 'all', label: 'All', hi: 'सभी' },
  { key: 'ssc', label: 'SSC', hi: 'SSC' },
  { key: 'railway', label: 'Railway', hi: 'रेलवे' },
  { key: 'banking', label: 'Banking', hi: 'बैंकिंग' },
  { key: 'upsc', label: 'UPSC', hi: 'UPSC' },
  { key: 'defence', label: 'Defence', hi: 'रक्षा' },
  { key: 'teaching', label: 'Teaching', hi: 'शिक्षण' },
  { key: 'state', label: 'State PSC', hi: 'राज्य PSC' },
  { key: 'police', label: 'Police', hi: 'पुलिस' },
] as const;

export function getCutoffBySlug(slug: string): ExamCutoff | undefined {
  return CUTOFF_DATA.find((e) => e.slug === slug);
}
