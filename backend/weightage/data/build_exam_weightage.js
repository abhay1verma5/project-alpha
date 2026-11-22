// One-off converter: frontend/src/app/topic-weightage/exam-data.ts -> backend/weightage/data/exam_weightage.json
// Run from anywhere: node backend/weightage/data/build_exam_weightage.js
// Uses the TypeScript compiler already installed in frontend/node_modules to strip types.
// Raw weightages are kept as-is (weightage_raw); the server normalizes them per subject.
const fs = require('fs');
const path = require('path');

const HERE = __dirname;
const REPO_PA = path.resolve(HERE, '../../..');
const TS_FILE = path.join(REPO_PA, 'frontend/src/app/topic-weightage/exam-data.ts');
const OUT_FILE = path.join(HERE, 'exam_weightage.json');
const ts = require(path.join(REPO_PA, 'frontend/node_modules/typescript'));

const AS_OF = '2026-11-22';

// slug -> [category, level, state]. Judgement calls; see README in the return message.
const MAP = {
  'ssc-cgl': ['ssc', 'graduate', 'all_india'],
  'upsc-cse': ['upsc', 'graduate', 'all_india'],
  'rrb-ntpc': ['railway', 'graduate', 'all_india'],
  'ibps-po': ['banking', 'graduate', 'all_india'],
  'jee-main': ['entrance', '12th', 'all_india'],
  'jee-advanced': ['entrance', '12th', 'all_india'],
  'neet-ug': ['medical', '12th', 'all_india'],
  'gate-cse': ['engineering', 'graduate', 'all_india'],
  'gate-ece': ['engineering', 'graduate', 'all_india'],
  'gate-me': ['engineering', 'graduate', 'all_india'],
  'gate-ee': ['engineering', 'graduate', 'all_india'],
  'gate-ce': ['engineering', 'graduate', 'all_india'],
  'ssc-chsl': ['ssc', '12th', 'all_india'],
  'sbi-po': ['banking', 'graduate', 'all_india'],
  'ctet': ['teaching', '12th', 'all_india'],
  'ugc-net': ['teaching', 'postgraduate', 'all_india'],
  'nda': ['defence', '12th', 'all_india'],
  'ssc-gd': ['ssc', '10th', 'all_india'],
  'ssc-mts': ['ssc', '10th', 'all_india'],
  'rrb-group-d': ['railway', '10th', 'all_india'],
  'cds': ['defence', 'graduate', 'all_india'],
  'ibps-clerk': ['banking', 'graduate', 'all_india'],
  'sbi-clerk': ['banking', 'graduate', 'all_india'],
  'ssc-cpo': ['police', 'graduate', 'all_india'],
  'up-police': ['police', '12th', 'uttar_pradesh'],
  'rbi-grade-b': ['banking', 'graduate', 'all_india'],
  'cuet-ug': ['entrance', '12th', 'all_india'],
  'afcat': ['defence', 'graduate', 'all_india'],
  'cat-mba': ['entrance', 'graduate', 'all_india'],
  'nabard-grade-a': ['banking', 'graduate', 'all_india'],
  'sebi-grade-a': ['banking', 'graduate', 'all_india'],
  'lic-aao': ['insurance', 'graduate', 'all_india'],
  'ssc-steno': ['ssc', '12th', 'all_india'],
  'rrb-je': ['railway', 'graduate', 'all_india'],
  'uppsc-pcs': ['state_psc', 'graduate', 'uttar_pradesh'],
  'bpsc': ['state_psc', 'graduate', 'bihar'],
  'rpsc-ras': ['state_psc', 'graduate', 'rajasthan'],
  'ssc-je': ['ssc', 'graduate', 'all_india'],
  'ibps-so': ['banking', 'graduate', 'all_india'],
  'mppsc': ['state_psc', 'graduate', 'madhya_pradesh'],
  'rbi-assistant': ['banking', 'graduate', 'all_india'],
  'capf-ac': ['police', 'graduate', 'all_india'],
  'rrb-alp': ['railway', '10th', 'all_india'],
  'upsc-ese': ['upsc', 'graduate', 'all_india'],
  'dsssb': ['other', 'graduate', 'delhi'],
  'kvs-tgt-pgt': ['teaching', 'graduate', 'all_india'],
  'epfo-ssa': ['other', 'graduate', 'all_india'],
  'uptet': ['teaching', '12th', 'uttar_pradesh'],
  'clat-ug': ['entrance', '12th', 'all_india'],
  'delhi-police': ['police', '12th', 'delhi'],
  'up-police-si': ['police', 'graduate', 'uttar_pradesh'],
  'tnpsc-group-4': ['state_psc', '10th', 'tamil_nadu'],
  'up-police-constable': ['police', '12th', 'uttar_pradesh'],
  'rajasthan-police': ['police', '12th', 'rajasthan'],
  'bpsc-tre': ['teaching', 'graduate', 'bihar'],
  'supreme-court-jca': ['judiciary', 'graduate', 'all_india'],
};

// Same display name on two entries in the TS file; disambiguate by edition (paper years).
const RENAME = {
  'up-police': 'UP Police Constable (2018-2024)',
  'up-police-constable': 'UP Police Constable (2022-2026)',
};

const src = fs.readFileSync(TS_FILE, 'utf8');
const js = ts.transpileModule(src, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2019 },
}).outputText;
const mod = { exports: {} };
new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
const exams = mod.exports.EXAM_DATA;
if (!Array.isArray(exams) || exams.length !== 56) {
  throw new Error(`expected 56 exams, got ${exams && exams.length}`);
}

const cleanSubject = (s) => s.replace(/\s*\([^()]*\)\s*$/, '').trim();

const out = exams.map((e) => {
  const mapped = MAP[e.slug];
  if (!mapped) throw new Error(`no category/level/state for ${e.slug}`);
  if (!RENAME[e.slug] && exams.filter((x) => x.exam === e.exam).length > 1) {
    throw new Error(`duplicate exam name without rename: ${e.exam}`);
  }
  const [category, level, state] = mapped;
  const colorMatch = /border-l-([a-z]+)-500/.exec(e.color);
  return {
    slug: e.slug,
    exam: RENAME[e.slug] || e.exam,
    paper: e.paper,
    category,
    level,
    state,
    total_questions: e.totalQuestions,
    total_marks: e.totalMarks,
    duration: e.duration,
    negative_marking: e.negativeMarking,
    color: colorMatch ? colorMatch[1] : 'slate',
    approx: true,
    as_of: AS_OF,
    subjects: e.subjects.map((s) => ({
      subject: cleanSubject(s.subject),
      subject_detail: s.subject,
      topics: s.topics.map((t) => ({
        topic: t.topic,
        questions: t.questions,
        weightage_raw: t.weightage,
        trend: t.trend,
      })),
    })),
  };
});

fs.writeFileSync(OUT_FILE, JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${out.length} exams to ${OUT_FILE}`);
