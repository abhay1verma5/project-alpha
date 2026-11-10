export interface TopicData {
  topic: string;
  questions: string;
  weightage: number;
  trend: 'high' | 'medium' | 'low';
}

export interface ExamAnalysis {
  exam: string;
  slug: string;
  paper: string;
  totalQuestions: number;
  totalMarks: number;
  duration: string;
  negativeMarking: string;
  color: string;
  borderColor: string;
  bgColor: string;
  iconBg: string;
  subjects: {
    subject: string;
    topics: TopicData[];
  }[];
}

// ── Helper to reduce boilerplate ──
const c = (color: string) => ({
  color: `border-l-${color}-500`,
  borderColor: `border-${color}-200 dark:border-${color}-800`,
  bgColor: `bg-${color}-50 dark:bg-${color}-900/20`,
});

export const EXAM_DATA: ExamAnalysis[] = [
  // ══════════════════════════════════
  //  SSC CGL
  // ══════════════════════════════════
  {
    exam: 'SSC CGL', slug: 'ssc-cgl', paper: 'Tier 1 (2017-2026 Analysis)',
    totalQuestions: 100, totalMarks: 200, duration: '60 minutes', negativeMarking: '0.50 per wrong answer',
    ...c('green'), iconBg: 'from-green-500 to-emerald-600',
    subjects: [
      { subject: 'Quantitative Aptitude (25 Questions)', topics: [
        { topic: 'Data Interpretation (Table/Bar/Pie/Line)', questions: '3-6', weightage: 20, trend: 'high' },
        { topic: 'Geometry (Triangles, Circles, Quadrilaterals)', questions: '2-4', weightage: 14, trend: 'high' },
        { topic: 'Mensuration (2D & 3D)', questions: '2-4', weightage: 14, trend: 'high' },
        { topic: 'Trigonometry (Heights & Distances)', questions: '1-4', weightage: 10, trend: 'medium' },
        { topic: 'Algebra (Equations, Surds, Indices)', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'Percentage, Profit & Loss', questions: '2-3', weightage: 10, trend: 'high' },
        { topic: 'Ratio & Proportion, Mixture', questions: '1-2', weightage: 6, trend: 'medium' },
        { topic: 'Time, Speed & Distance', questions: '1-2', weightage: 6, trend: 'medium' },
        { topic: 'Time & Work, Pipes & Cisterns', questions: '1-2', weightage: 6, trend: 'medium' },
        { topic: 'SI & CI, Number System', questions: '1-2', weightage: 4, trend: 'low' },
      ]},
      { subject: 'General Intelligence & Reasoning (25 Questions)', topics: [
        { topic: 'Analogy (Word, Number, Letter, Image)', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Classification (Odd One Out)', questions: '2-4', weightage: 12, trend: 'high' },
        { topic: 'Series (Number, Letter, Alpha-Numeric)', questions: '2-4', weightage: 12, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '2-3', weightage: 10, trend: 'high' },
        { topic: 'Blood Relations', questions: '1-2', weightage: 6, trend: 'medium' },
        { topic: 'Direction & Distance', questions: '1-2', weightage: 6, trend: 'medium' },
        { topic: 'Matrix / Paper Folding / Mirror Image', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'Venn Diagram / Syllogism', questions: '1-3', weightage: 8, trend: 'medium' },
        { topic: 'Statement & Conclusion / Assumption', questions: '1-2', weightage: 6, trend: 'low' },
        { topic: 'Dice, Cube, Missing Number, Word Formation', questions: '2-4', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'English Language (25 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Cloze Test (Fill in the Blanks)', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Error Spotting / Sentence Correction', questions: '2-4', weightage: 12, trend: 'high' },
        { topic: 'Synonyms & Antonyms', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'Idioms & Phrases', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'One Word Substitution', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'Spelling Correction', questions: '1-2', weightage: 6, trend: 'low' },
        { topic: 'Active/Passive, Direct/Indirect', questions: '2-3', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'General Awareness (25 Questions)', topics: [
        { topic: 'History (Ancient, Medieval, Modern India)', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Polity & Constitution', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Geography (India & World)', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Economics (Indian Economy, Budget, Policy)', questions: '2-4', weightage: 12, trend: 'high' },
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '5-8', weightage: 28, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '3-5', weightage: 16, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UPSC CSE
  // ══════════════════════════════════
  {
    exam: 'UPSC CSE', slug: 'upsc-cse', paper: 'Prelims GS Paper I (2015-2026 Analysis)',
    totalQuestions: 100, totalMarks: 200, duration: '120 minutes', negativeMarking: '1/3rd of marks',
    ...c('purple'), iconBg: 'from-purple-500 to-indigo-600',
    subjects: [
      { subject: 'General Studies Paper I (100 Questions)', topics: [
        { topic: 'History & Culture (Ancient, Medieval, Modern, Art & Culture)', questions: '15-20', weightage: 18, trend: 'high' },
        { topic: 'Polity & Governance (Constitution, Panchayati Raj, Rights)', questions: '12-18', weightage: 15, trend: 'high' },
        { topic: 'Geography (Physical, India, World, Climate)', questions: '10-15', weightage: 12, trend: 'high' },
        { topic: 'Economy (Macro, Micro, Banking, Budget, Schemes)', questions: '12-18', weightage: 15, trend: 'high' },
        { topic: 'Environment & Ecology (Biodiversity, Climate Change)', questions: '8-15', weightage: 12, trend: 'high' },
        { topic: 'Science & Technology (Space, Defence, IT, Biotech)', questions: '5-10', weightage: 8, trend: 'medium' },
        { topic: 'Current Affairs & Government Schemes', questions: '10-15', weightage: 12, trend: 'high' },
        { topic: 'International Relations & Organizations', questions: '3-5', weightage: 4, trend: 'medium' },
        { topic: 'Disaster Management & Social Issues', questions: '2-4', weightage: 4, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RRB NTPC
  // ══════════════════════════════════
  {
    exam: 'RRB NTPC', slug: 'rrb-ntpc', paper: 'CBT 1 (2019-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '90 minutes', negativeMarking: '1/3rd of marks',
    ...c('blue'), iconBg: 'from-blue-500 to-blue-600',
    subjects: [
      { subject: 'Mathematics (30 Questions)', topics: [
        { topic: 'Number System, HCF, LCM', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Percentage, Profit & Loss, Discount', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Ratio & Proportion, Mixture', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Time, Speed & Distance', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'SI & CI', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Algebra & Geometry', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Mensuration, Trigonometry', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Data Interpretation', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Average, Age Problems', questions: '1-2', weightage: 6, trend: 'low' },
      ]},
      { subject: 'General Intelligence & Reasoning (30 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '4-6', weightage: 18, trend: 'high' },
        { topic: 'Series (Number, Letter, Image)', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '2-4', weightage: 10, trend: 'high' },
        { topic: 'Blood Relations & Directions', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Venn Diagram & Syllogism', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Mathematical Operations & Puzzles', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Figure Counting, Mirror/Water Image', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Statement & Conclusion, Calendar, Clock', questions: '2-4', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'General Awareness (40 Questions)', topics: [
        { topic: 'Current Affairs (Last 6-12 months)', questions: '8-12', weightage: 25, trend: 'high' },
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '8-12', weightage: 25, trend: 'high' },
        { topic: 'History (India)', questions: '4-6', weightage: 12, trend: 'medium' },
        { topic: 'Geography (India & World)', questions: '4-6', weightage: 12, trend: 'medium' },
        { topic: 'Indian Polity & Constitution', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Economics & Indian Economy', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Computer & Sports Awareness', questions: '2-4', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  IBPS PO
  // ══════════════════════════════════
  {
    exam: 'IBPS PO', slug: 'ibps-po', paper: 'Prelims (2018-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes (20 min/section)', negativeMarking: '0.25 per wrong answer',
    ...c('yellow'), iconBg: 'from-yellow-500 to-amber-600',
    subjects: [
      { subject: 'Quantitative Aptitude (35 Questions)', topics: [
        { topic: 'Data Interpretation (Tabular, Bar, Pie, Line, Caselet)', questions: '10-15', weightage: 36, trend: 'high' },
        { topic: 'Number Series', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Simplification / Approximation', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Quadratic Equations', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Arithmetic (Percentage, P&L, SI/CI, Ratio, T&W, T&D)', questions: '5-10', weightage: 22, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (35 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement (Linear, Circular, Floor)', questions: '15-20', weightage: 50, trend: 'high' },
        { topic: 'Syllogism', questions: '3-5', weightage: 12, trend: 'high' },
        { topic: 'Blood Relations', questions: '2-3', weightage: 7, trend: 'medium' },
        { topic: 'Coding-Decoding & Inequality', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Direction & Distance, Order Ranking', questions: '2-3', weightage: 7, trend: 'medium' },
        { topic: 'Alphanumeric Series', questions: '3-5', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '7-10', weightage: 30, trend: 'high' },
        { topic: 'Cloze Test', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Error Spotting / Phrase Replacement', questions: '5', weightage: 17, trend: 'high' },
        { topic: 'Para Jumbles / Sentence Rearrangement', questions: '5', weightage: 17, trend: 'medium' },
        { topic: 'Fill in the Blanks (Single/Double)', questions: '3-5', weightage: 16, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  JEE MAIN
  // ══════════════════════════════════
  {
    exam: 'JEE Main', slug: 'jee-main', paper: 'Paper 1 B.E./B.Tech (2019-2026 Analysis)',
    totalQuestions: 90, totalMarks: 300, duration: '180 minutes', negativeMarking: '-1 for wrong MCQ',
    ...c('blue'), iconBg: 'from-blue-600 to-indigo-600',
    subjects: [
      { subject: 'Physics (30 Questions)', topics: [
        { topic: 'Mechanics (Laws, Rotational, Gravitation)', questions: '7-10', weightage: 28, trend: 'high' },
        { topic: 'Electrodynamics (Current, EMF, AC)', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Optics (Wave, Ray, Modern Physics)', questions: '4-6', weightage: 16, trend: 'high' },
        { topic: 'Thermodynamics & KTG', questions: '3-4', weightage: 12, trend: 'medium' },
        { topic: 'Electrostatics & Capacitors', questions: '3-4', weightage: 12, trend: 'high' },
        { topic: 'Modern Physics (Photoelectric, Nuclear, Atoms)', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Waves & Sound', questions: '1-2', weightage: 4, trend: 'low' },
      ]},
      { subject: 'Chemistry (30 Questions)', topics: [
        { topic: 'Organic Chemistry (GOC, Named Reactions, Biomolecules)', questions: '10-12', weightage: 35, trend: 'high' },
        { topic: 'Inorganic Chemistry (p-Block, d-Block, Coordination)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Physical Chemistry (Thermodynamics, Equilibrium, Electrochemistry)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Surface Chemistry & Solutions', questions: '1-2', weightage: 5, trend: 'low' },
      ]},
      { subject: 'Mathematics (30 Questions)', topics: [
        { topic: 'Coordinate Geometry (Circle, Parabola, Ellipse, Hyperbola)', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Calculus (Limits, Continuity, Differential, Integral)', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Algebra (Complex Numbers, Matrices, Sequences)', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Probability & Statistics', questions: '2-3', weightage: 10, trend: 'high' },
        { topic: 'Trigonometry', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Vectors & 3D Geometry', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Differential Equations', questions: '1-2', weightage: 6, trend: 'medium' },
        { topic: 'Mathematical Reasoning & Sets', questions: '1-2', weightage: 4, trend: 'low' },
        { topic: 'Permutations & Combinations, Binomial', questions: '1-2', weightage: 4, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  JEE ADVANCED
  // ══════════════════════════════════
  {
    exam: 'JEE Advanced', slug: 'jee-advanced', paper: 'Paper 1 & 2 (2015-2026 Analysis)',
    totalQuestions: 54, totalMarks: 360, duration: '360 minutes (2 papers × 3 hrs)', negativeMarking: '-1 to -2 per wrong answer',
    ...c('indigo'), iconBg: 'from-indigo-600 to-violet-700',
    subjects: [
      { subject: 'Physics', topics: [
        { topic: 'Mechanics (Rigid Body, SHM, Gravitation)', questions: '5-8', weightage: 30, trend: 'high' },
        { topic: 'Electromagnetism (Circuits, Induction, EM Waves)', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Optics & Modern Physics', questions: '3-5', weightage: 20, trend: 'high' },
        { topic: 'Thermodynamics & Fluid Mechanics', questions: '2-4', weightage: 15, trend: 'medium' },
        { topic: 'Waves (Sound, Superposition, Doppler)', questions: '1-3', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Chemistry', topics: [
        { topic: 'Organic Chemistry (Mechanism, Stereochemistry, Named Rxns)', questions: '6-8', weightage: 35, trend: 'high' },
        { topic: 'Physical Chemistry (Equilibrium, Kinetics, Electrochemistry)', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Inorganic Chemistry (Qualitative Analysis, Coordination)', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Analytical Chemistry & Salt Analysis', questions: '0-2', weightage: 5, trend: 'low' },
      ]},
      { subject: 'Mathematics', topics: [
        { topic: 'Calculus (Definite Integrals, Area, Differential Eq)', questions: '5-8', weightage: 30, trend: 'high' },
        { topic: 'Algebra (Matrices, Complex Numbers, Probability)', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Coordinate Geometry (Conics)', questions: '3-5', weightage: 20, trend: 'high' },
        { topic: 'Vectors & 3D', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Trigonometry & Properties of Triangles', questions: '1-3', weightage: 8, trend: 'medium' },
        { topic: 'Number Theory & Combinatorics', questions: '1-2', weightage: 5, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  NEET UG
  // ══════════════════════════════════
  {
    exam: 'NEET UG', slug: 'neet-ug', paper: 'UG (2017-2026 Analysis)',
    totalQuestions: 200, totalMarks: 720, duration: '200 minutes', negativeMarking: '-1 for wrong answer',
    ...c('red'), iconBg: 'from-red-500 to-rose-600',
    subjects: [
      { subject: 'Biology (100 Questions — Botany 50 + Zoology 50)', topics: [
        { topic: 'Human Physiology (Digestion, Breathing, Excretion, Neural)', questions: '15-20', weightage: 18, trend: 'high' },
        { topic: 'Genetics & Evolution (Molecular Basis, Principles)', questions: '10-15', weightage: 14, trend: 'high' },
        { topic: 'Cell Biology & Cell Division', questions: '8-10', weightage: 10, trend: 'high' },
        { topic: 'Plant Physiology (Photosynthesis, Transport, Hormones)', questions: '8-10', weightage: 10, trend: 'high' },
        { topic: 'Ecology & Environment (Ecosystem, Biodiversity)', questions: '8-10', weightage: 10, trend: 'high' },
        { topic: 'Reproduction (Plant & Human)', questions: '6-8', weightage: 8, trend: 'medium' },
        { topic: 'Morphology & Anatomy (Plant & Animal)', questions: '6-8', weightage: 8, trend: 'medium' },
        { topic: 'Diversity of Living Organisms (Classification)', questions: '5-8', weightage: 7, trend: 'medium' },
        { topic: 'Biotechnology & Its Applications', questions: '4-6', weightage: 6, trend: 'medium' },
        { topic: 'Biomolecules & Enzymes', questions: '3-5', weightage: 5, trend: 'medium' },
        { topic: 'Human Health & Disease, Microbes', questions: '3-5', weightage: 4, trend: 'low' },
      ]},
      { subject: 'Physics (50 Questions)', topics: [
        { topic: 'Mechanics (Laws, Work-Energy, Rotation)', questions: '10-14', weightage: 24, trend: 'high' },
        { topic: 'Electrostatics & Current Electricity', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Optics (Ray, Wave)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Magnetism & EMI', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Modern Physics (Atoms, Nuclei, Semiconductor)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Thermodynamics & KTG', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Oscillations & Waves', questions: '3-4', weightage: 8, trend: 'medium' },
        { topic: 'Properties of Matter (Fluid, Elasticity, Surface Tension)', questions: '2-4', weightage: 6, trend: 'medium' },
        { topic: 'Units, Dimensions, Motion', questions: '2-3', weightage: 4, trend: 'low' },
      ]},
      { subject: 'Chemistry (50 Questions)', topics: [
        { topic: 'Organic Chemistry (GOC, Hydrocarbons, Biomolecules)', questions: '15-18', weightage: 32, trend: 'high' },
        { topic: 'Inorganic Chemistry (p-Block, d-Block, Coordination)', questions: '12-15', weightage: 28, trend: 'high' },
        { topic: 'Physical Chemistry (Equilibrium, Electrochemistry, Solutions)', questions: '12-15', weightage: 28, trend: 'high' },
        { topic: 'Environmental Chemistry & Surface Chemistry', questions: '2-4', weightage: 6, trend: 'low' },
        { topic: 'Solid State, s-Block Elements', questions: '2-3', weightage: 6, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  GATE CSE
  // ══════════════════════════════════
  {
    exam: 'GATE CSE', slug: 'gate-cse', paper: 'Computer Science & IT (2015-2026 Analysis)',
    totalQuestions: 65, totalMarks: 100, duration: '180 minutes', negativeMarking: '1/3 for 1-mark, 2/3 for 2-mark MCQ',
    ...c('cyan'), iconBg: 'from-cyan-600 to-teal-600',
    subjects: [
      { subject: 'Core CS Subjects', topics: [
        { topic: 'Data Structures & Algorithms', questions: '6-10', weightage: 15, trend: 'high' },
        { topic: 'DBMS (SQL, Normalization, Transactions)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Operating Systems (Scheduling, Memory, Deadlock)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Computer Networks (TCP/IP, Subnetting)', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Theory of Computation (DFA, NFA, CFG, Turing Machine)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Compiler Design (Parsing, Syntax Analysis)', questions: '2-4', weightage: 6, trend: 'medium' },
        { topic: 'Computer Architecture & Organization', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Digital Logic (Boolean, K-Map, Combinational)', questions: '3-5', weightage: 8, trend: 'high' },
      ]},
      { subject: 'Mathematics & Aptitude', topics: [
        { topic: 'Discrete Mathematics (Graph Theory, Groups, Combinatorics)', questions: '4-6', weightage: 8, trend: 'high' },
        { topic: 'Linear Algebra (Matrices, Eigenvalues)', questions: '2-3', weightage: 5, trend: 'medium' },
        { topic: 'Probability & Statistics', questions: '2-3', weightage: 5, trend: 'medium' },
        { topic: 'Calculus (Limits, Maxima/Minima)', questions: '1-2', weightage: 3, trend: 'low' },
        { topic: 'General Aptitude (Verbal + Quantitative)', questions: '10', weightage: 15, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  GATE ECE
  // ══════════════════════════════════
  {
    exam: 'GATE ECE', slug: 'gate-ece', paper: 'Electronics & Communication (2015-2026 Analysis)',
    totalQuestions: 65, totalMarks: 100, duration: '180 minutes', negativeMarking: '1/3 for 1-mark, 2/3 for 2-mark MCQ',
    ...c('amber'), iconBg: 'from-amber-600 to-orange-600',
    subjects: [
      { subject: 'Core ECE Subjects', topics: [
        { topic: 'Network Theory (KVL, KCL, Thevenin, Norton)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Electronic Devices & Circuits (BJT, MOSFET, Op-Amp)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Signals & Systems (Fourier, Laplace, Z-Transform)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Control Systems (Root Locus, Bode, Nyquist)', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Digital Circuits (Logic Gates, Flip-Flops, Counters)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Communications (AM, FM, Digital Modulation)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Electromagnetics (Maxwell, Waveguides, Antenna)', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Microprocessors & VLSI', questions: '2-3', weightage: 5, trend: 'medium' },
      ]},
      { subject: 'Mathematics & Aptitude', topics: [
        { topic: 'Linear Algebra', questions: '2-3', weightage: 5, trend: 'medium' },
        { topic: 'Calculus & Differential Equations', questions: '2-3', weightage: 5, trend: 'medium' },
        { topic: 'Probability & Statistics', questions: '2-3', weightage: 5, trend: 'medium' },
        { topic: 'Complex Analysis & Transform Theory', questions: '1-2', weightage: 3, trend: 'low' },
        { topic: 'General Aptitude', questions: '10', weightage: 15, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  GATE ME
  // ══════════════════════════════════
  {
    exam: 'GATE ME', slug: 'gate-me', paper: 'Mechanical Engineering (2015-2026 Analysis)',
    totalQuestions: 65, totalMarks: 100, duration: '180 minutes', negativeMarking: '1/3 for 1-mark, 2/3 for 2-mark MCQ',
    ...c('orange'), iconBg: 'from-orange-600 to-red-600',
    subjects: [
      { subject: 'Core ME Subjects', topics: [
        { topic: 'Engineering Mechanics & Strength of Materials', questions: '6-8', weightage: 13, trend: 'high' },
        { topic: 'Thermodynamics & Heat Transfer', questions: '6-8', weightage: 13, trend: 'high' },
        { topic: 'Fluid Mechanics & Machinery', questions: '5-7', weightage: 11, trend: 'high' },
        { topic: 'Manufacturing Engineering (Machining, Casting, Welding)', questions: '5-7', weightage: 11, trend: 'high' },
        { topic: 'Theory of Machines & Vibrations', questions: '4-6', weightage: 8, trend: 'medium' },
        { topic: 'Machine Design (Gears, Bearings, Shafts)', questions: '3-5', weightage: 6, trend: 'medium' },
        { topic: 'Industrial Engineering (OR, Quality, Production Planning)', questions: '3-5', weightage: 6, trend: 'medium' },
        { topic: 'Power Engineering (IC Engines, Turbines, Refrigeration)', questions: '3-4', weightage: 6, trend: 'medium' },
        { topic: 'Material Science', questions: '1-2', weightage: 3, trend: 'low' },
      ]},
      { subject: 'Mathematics & Aptitude', topics: [
        { topic: 'Linear Algebra & Calculus', questions: '3-4', weightage: 6, trend: 'medium' },
        { topic: 'Differential Equations & Complex Analysis', questions: '2-3', weightage: 4, trend: 'medium' },
        { topic: 'Probability, Statistics & Numerical Methods', questions: '2-3', weightage: 4, trend: 'medium' },
        { topic: 'General Aptitude', questions: '10', weightage: 15, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  GATE EE
  // ══════════════════════════════════
  {
    exam: 'GATE EE', slug: 'gate-ee', paper: 'Electrical Engineering (2015-2026 Analysis)',
    totalQuestions: 65, totalMarks: 100, duration: '180 minutes', negativeMarking: '1/3 for 1-mark, 2/3 for 2-mark MCQ',
    ...c('yellow'), iconBg: 'from-yellow-600 to-amber-600',
    subjects: [
      { subject: 'Core EE Subjects', topics: [
        { topic: 'Network Theory', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Power Systems (Load Flow, Stability, Transmission)', questions: '6-8', weightage: 14, trend: 'high' },
        { topic: 'Electrical Machines (Transformer, Induction, Synchronous)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Control Systems', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Power Electronics (Converters, Inverters)', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Signals & Systems', questions: '3-4', weightage: 6, trend: 'medium' },
        { topic: 'Analog & Digital Electronics', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Electromagnetic Theory', questions: '2-3', weightage: 5, trend: 'low' },
        { topic: 'Measurements & Instrumentation', questions: '1-3', weightage: 4, trend: 'low' },
      ]},
      { subject: 'Mathematics & Aptitude', topics: [
        { topic: 'Linear Algebra & Calculus', questions: '3-4', weightage: 6, trend: 'medium' },
        { topic: 'Probability, Statistics, Numerical Methods', questions: '2-3', weightage: 4, trend: 'medium' },
        { topic: 'General Aptitude', questions: '10', weightage: 15, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  GATE CE
  // ══════════════════════════════════
  {
    exam: 'GATE CE', slug: 'gate-ce', paper: 'Civil Engineering (2015-2026 Analysis)',
    totalQuestions: 65, totalMarks: 100, duration: '180 minutes', negativeMarking: '1/3 for 1-mark, 2/3 for 2-mark MCQ',
    ...c('stone'), iconBg: 'from-stone-600 to-neutral-700',
    subjects: [
      { subject: 'Core CE Subjects', topics: [
        { topic: 'Structural Analysis (Indeterminate, Matrix Methods)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Geotechnical Engineering (Soil Mechanics, Foundation)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Fluid Mechanics & Hydraulics', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Environmental Engineering (Water, Wastewater)', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Transportation Engineering (Highway, Traffic)', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'RCC & Steel Structure Design', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Engineering Mechanics & SOM', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Surveying & Construction Management', questions: '2-3', weightage: 5, trend: 'low' },
        { topic: 'Hydrology & Irrigation', questions: '2-3', weightage: 5, trend: 'medium' },
      ]},
      { subject: 'Mathematics & Aptitude', topics: [
        { topic: 'Engineering Mathematics', questions: '8-10', weightage: 13, trend: 'high' },
        { topic: 'General Aptitude', questions: '10', weightage: 15, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SSC CHSL
  // ══════════════════════════════════
  {
    exam: 'SSC CHSL', slug: 'ssc-chsl', paper: 'Tier 1 (2018-2026 Analysis)',
    totalQuestions: 100, totalMarks: 200, duration: '60 minutes', negativeMarking: '0.50 per wrong answer',
    ...c('teal'), iconBg: 'from-teal-500 to-cyan-600',
    subjects: [
      { subject: 'Quantitative Aptitude (25 Questions)', topics: [
        { topic: 'Arithmetic (Percentage, P&L, SI/CI, Ratio)', questions: '8-10', weightage: 36, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Trigonometry', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Algebra', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Number System, Statistics', questions: '1-2', weightage: 4, trend: 'low' },
      ]},
      { subject: 'Reasoning (25 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '5-8', weightage: 26, trend: 'high' },
        { topic: 'Series & Coding-Decoding', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Non-Verbal (Mirror, Water, Paper Folding)', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Blood Relations, Direction', questions: '3-4', weightage: 14, trend: 'medium' },
        { topic: 'Syllogism, Statement-Conclusion', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Venn Diagram, Mathematical Operations', questions: '1-3', weightage: 8, trend: 'low' },
      ]},
      { subject: 'English Language (25 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Error Spotting', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Cloze Test', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Synonym, Antonym, Idioms', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'One Word, Spelling, Active-Passive', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Sentence Rearrangement', questions: '1-2', weightage: 4, trend: 'low' },
      ]},
      { subject: 'General Awareness (25 Questions)', topics: [
        { topic: 'General Science', questions: '6-10', weightage: 32, trend: 'high' },
        { topic: 'History', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Polity', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Geography', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Economics', questions: '2-3', weightage: 8, trend: 'medium' },
        { topic: 'Current Affairs, Static GK', questions: '3-5', weightage: 16, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SBI PO
  // ══════════════════════════════════
  {
    exam: 'SBI PO', slug: 'sbi-po', paper: 'Prelims (2019-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes (20 min/section)', negativeMarking: '0.25 per wrong answer',
    ...c('sky'), iconBg: 'from-sky-500 to-blue-600',
    subjects: [
      { subject: 'Quantitative Aptitude (35 Questions)', topics: [
        { topic: 'Data Interpretation (5 sets)', questions: '15-20', weightage: 48, trend: 'high' },
        { topic: 'Number Series', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Simplification / Approximation', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Arithmetic Word Problems', questions: '5-10', weightage: 24, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (35 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement', questions: '15-20', weightage: 50, trend: 'high' },
        { topic: 'Syllogism', questions: '3-5', weightage: 12, trend: 'high' },
        { topic: 'Inequality / Coding-Decoding', questions: '5', weightage: 14, trend: 'high' },
        { topic: 'Blood Relations, Direction, Order Ranking', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Alphanumeric/Number Series', questions: '3-5', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Cloze Test / Fill in Blanks', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Error Detection / Correction', questions: '5', weightage: 17, trend: 'high' },
        { topic: 'Sentence Rearrangement', questions: '5', weightage: 17, trend: 'medium' },
        { topic: 'Vocabulary / Word Swap / Column Match', questions: '3-5', weightage: 16, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  CTET
  // ══════════════════════════════════
  {
    exam: 'CTET', slug: 'ctet', paper: 'Paper I - Primary (2015-2026 Analysis)',
    totalQuestions: 150, totalMarks: 150, duration: '150 minutes', negativeMarking: 'No negative marking',
    ...c('pink'), iconBg: 'from-pink-500 to-rose-600',
    subjects: [
      { subject: 'Child Development & Pedagogy (30 Questions)', topics: [
        { topic: 'Child Development (Piaget, Vygotsky, Kohlberg)', questions: '10-12', weightage: 36, trend: 'high' },
        { topic: 'Inclusive Education & Special Needs', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Learning & Pedagogy', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Assessment & Evaluation', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'NCF 2005, RTE Act', questions: '2-3', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Mathematics (30 Questions)', topics: [
        { topic: 'Number System & Operations', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Data Handling & Patterns', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Pedagogical Issues in Math', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Measurement, Money, Time', questions: '1-3', weightage: 6, trend: 'low' },
      ]},
      { subject: 'Environmental Studies (30 Questions)', topics: [
        { topic: 'Family, Friends, Food, Shelter', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Water, Travel, Things We Make & Do', questions: '5-7', weightage: 20, trend: 'medium' },
        { topic: 'EVS Pedagogy & NCF', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Plants, Animals, Environment', questions: '5-7', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'Language I - Hindi/English (30 Questions)', topics: [
        { topic: 'Reading Comprehension (Prose & Poetry)', questions: '15', weightage: 50, trend: 'high' },
        { topic: 'Language Pedagogy', questions: '15', weightage: 50, trend: 'high' },
      ]},
      { subject: 'Language II - English/Hindi (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '15', weightage: 50, trend: 'high' },
        { topic: 'Language Pedagogy', questions: '15', weightage: 50, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UGC NET
  // ══════════════════════════════════
  {
    exam: 'UGC NET', slug: 'ugc-net', paper: 'Paper 1 - General (2018-2026 Analysis)',
    totalQuestions: 50, totalMarks: 100, duration: '60 minutes', negativeMarking: 'No negative marking',
    ...c('violet'), iconBg: 'from-violet-600 to-purple-700',
    subjects: [
      { subject: 'Paper 1 — Teaching & Research Aptitude (50 Questions)', topics: [
        { topic: 'Teaching Aptitude (Methods, Levels, Characteristics)', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Research Aptitude (Types, Ethics, Thesis)', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Reading Comprehension', questions: '5', weightage: 10, trend: 'high' },
        { topic: 'Communication (Types, Barriers, Effective)', questions: '5', weightage: 10, trend: 'medium' },
        { topic: 'Mathematical Reasoning & Aptitude', questions: '5', weightage: 10, trend: 'medium' },
        { topic: 'Logical Reasoning', questions: '5', weightage: 10, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '5', weightage: 10, trend: 'medium' },
        { topic: 'ICT (Information & Communication Technology)', questions: '5', weightage: 10, trend: 'high' },
        { topic: 'People, Development & Environment', questions: '5', weightage: 10, trend: 'medium' },
        { topic: 'Higher Education System (UGC, NAAC, NEP)', questions: '2-3', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  NDA
  // ══════════════════════════════════
  {
    exam: 'NDA', slug: 'nda', paper: 'Mathematics + GAT (2017-2026 Analysis)',
    totalQuestions: 270, totalMarks: 900, duration: '300 minutes (2.5 hrs × 2)', negativeMarking: '1/3rd of marks',
    ...c('emerald'), iconBg: 'from-emerald-600 to-green-700',
    subjects: [
      { subject: 'Mathematics (120 Questions, 300 Marks)', topics: [
        { topic: 'Algebra (Matrices, Complex Numbers, Quadratic)', questions: '20-25', weightage: 20, trend: 'high' },
        { topic: 'Calculus (Differentiation, Integration, Area)', questions: '20-25', weightage: 20, trend: 'high' },
        { topic: 'Trigonometry', questions: '15-20', weightage: 15, trend: 'high' },
        { topic: 'Analytic Geometry (2D & 3D)', questions: '10-15', weightage: 12, trend: 'medium' },
        { topic: 'Statistics & Probability', questions: '10-15', weightage: 12, trend: 'medium' },
        { topic: 'Vector Algebra', questions: '8-10', weightage: 8, trend: 'medium' },
        { topic: 'Differential Equations', questions: '5-8', weightage: 7, trend: 'medium' },
        { topic: 'Determinants', questions: '3-5', weightage: 6, trend: 'low' },
      ]},
      { subject: 'General Ability Test (150 Questions, 600 Marks)', topics: [
        { topic: 'English (Comprehension, Grammar, Vocabulary)', questions: '50', weightage: 33, trend: 'high' },
        { topic: 'General Knowledge (History, Geography, Current)', questions: '20-25', weightage: 16, trend: 'high' },
        { topic: 'Physics', questions: '15-20', weightage: 13, trend: 'high' },
        { topic: 'Chemistry', questions: '10-15', weightage: 10, trend: 'medium' },
        { topic: 'General Science (Biology)', questions: '10-12', weightage: 8, trend: 'medium' },
        { topic: 'Current Events', questions: '10-15', weightage: 10, trend: 'high' },
        { topic: 'Geography (India & World)', questions: '8-10', weightage: 6, trend: 'medium' },
        { topic: 'Freedom Movement, Indian Polity', questions: '5-8', weightage: 4, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SSC GD Constable
  // ══════════════════════════════════
  {
    exam: 'SSC GD', slug: 'ssc-gd', paper: 'Constable CBT (2019-2026 Analysis)',
    totalQuestions: 80, totalMarks: 160, duration: '60 minutes', negativeMarking: '0.50 per wrong answer',
    ...c('red'), iconBg: 'from-red-600 to-rose-700',
    subjects: [
      { subject: 'General Intelligence & Reasoning (20 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Series & Coding-Decoding', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'Non-Verbal (Image, Mirror, Paper Folding)', questions: '3-4', weightage: 18, trend: 'medium' },
        { topic: 'Blood Relations, Direction, Ranking', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Venn Diagram, Mathematical Operations', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Missing Number, Calendar, Clock', questions: '0-1', weightage: 3, trend: 'low' },
      ]},
      { subject: 'General Knowledge & Awareness (20 Questions)', topics: [
        { topic: 'Current Affairs & Static GK', questions: '6-8', weightage: 35, trend: 'high' },
        { topic: 'General Science', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'History & Culture', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Geography (India)', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Polity & Economics', questions: '1-2', weightage: 8, trend: 'low' },
        { topic: 'Sports, Awards, Important Days', questions: '0-1', weightage: 3, trend: 'low' },
      ]},
      { subject: 'Elementary Mathematics (20 Questions)', topics: [
        { topic: 'Arithmetic (Percentage, P&L, Ratio, Average)', questions: '8-10', weightage: 45, trend: 'high' },
        { topic: 'Number System, HCF, LCM', questions: '3-4', weightage: 18, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '3-4', weightage: 18, trend: 'medium' },
        { topic: 'Time & Work, Time & Distance', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'SI/CI, Age Problems', questions: '1-2', weightage: 7, trend: 'low' },
      ]},
      { subject: 'English / Hindi (20 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Error Spotting / Sentence Correction', questions: '3-5', weightage: 20, trend: 'high' },
        { topic: 'Fill in the Blanks / Cloze Test', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Synonyms, Antonyms, Idioms', questions: '3-4', weightage: 18, trend: 'medium' },
        { topic: 'One Word, Active-Passive, Direct-Indirect', questions: '2-3', weightage: 12, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SSC MTS
  // ══════════════════════════════════
  {
    exam: 'SSC MTS', slug: 'ssc-mts', paper: 'Paper 1 (2019-2026 Analysis)',
    totalQuestions: 100, totalMarks: 150, duration: '90 minutes', negativeMarking: '0.25 per wrong MCQ',
    ...c('lime'), iconBg: 'from-lime-600 to-green-600',
    subjects: [
      { subject: 'Numerical & Mathematical Ability (20 Questions)', topics: [
        { topic: 'Arithmetic (Percentage, Ratio, Average, P&L)', questions: '8-10', weightage: 45, trend: 'high' },
        { topic: 'Number System & Simplification', questions: '3-4', weightage: 18, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '3-4', weightage: 18, trend: 'medium' },
        { topic: 'Time & Work, Speed & Distance', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'SI/CI, Data Interpretation', questions: '1-2', weightage: 7, trend: 'low' },
      ]},
      { subject: 'Reasoning & General Intelligence (20 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Series & Coding', questions: '4-5', weightage: 22, trend: 'high' },
        { topic: 'Non-Verbal Reasoning', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Blood Relations, Direction', questions: '2-3', weightage: 14, trend: 'medium' },
        { topic: 'Venn Diagram, Syllogism', questions: '2-3', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'General Awareness (25 Questions)', topics: [
        { topic: 'General Science', questions: '7-10', weightage: 36, trend: 'high' },
        { topic: 'Current Affairs & Static GK', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'History', questions: '3-4', weightage: 14, trend: 'medium' },
        { topic: 'Geography', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Polity & Economics', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'Sports, Awards, Books', questions: '0-1', weightage: 4, trend: 'low' },
      ]},
      { subject: 'English Language (25 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Error Detection', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Synonym, Antonym', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Cloze Test / Fill in Blanks', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Idioms, One Word, Spelling', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Active-Passive, Sentence Improvement', questions: '1-3', weightage: 8, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RRB Group D
  // ══════════════════════════════════
  {
    exam: 'RRB Group D', slug: 'rrb-group-d', paper: 'CBT (2018-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '90 minutes', negativeMarking: '1/3rd of marks',
    ...c('orange'), iconBg: 'from-orange-500 to-amber-600',
    subjects: [
      { subject: 'Mathematics (25 Questions)', topics: [
        { topic: 'Number System, BODMAS, Fractions', questions: '3-4', weightage: 14, trend: 'high' },
        { topic: 'Percentage, P&L, Ratio', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Time & Work, Speed & Distance', questions: '3-4', weightage: 14, trend: 'medium' },
        { topic: 'Geometry & Mensuration', questions: '4-5', weightage: 18, trend: 'high' },
        { topic: 'SI/CI, Average, Age', questions: '3-4', weightage: 14, trend: 'medium' },
        { topic: 'Algebra, Trigonometry', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Statistics, Data Interpretation', questions: '1-2', weightage: 4, trend: 'low' },
      ]},
      { subject: 'General Intelligence & Reasoning (30 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '6-8', weightage: 24, trend: 'high' },
        { topic: 'Series & Coding-Decoding', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Non-Verbal Reasoning', questions: '4-6', weightage: 16, trend: 'medium' },
        { topic: 'Syllogism, Mathematical Operations', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Blood Relations, Direction, Order', questions: '3-4', weightage: 12, trend: 'medium' },
        { topic: 'Calendar, Clock, Dice, Alphabetical', questions: '2-4', weightage: 10, trend: 'medium' },
        { topic: 'Statement-Conclusion, Venn Diagram', questions: '1-2', weightage: 4, trend: 'low' },
      ]},
      { subject: 'General Science (25 Questions)', topics: [
        { topic: 'Physics (Force, Energy, Sound, Light, Electricity)', questions: '8-10', weightage: 36, trend: 'high' },
        { topic: 'Chemistry (Elements, Acids, Reactions, Metals)', questions: '7-9', weightage: 32, trend: 'high' },
        { topic: 'Biology (Human Body, Plants, Disease, Nutrition)', questions: '7-9', weightage: 32, trend: 'high' },
      ]},
      { subject: 'General Awareness & Current Affairs (20 Questions)', topics: [
        { topic: 'Current Affairs (Last 6 months)', questions: '6-8', weightage: 35, trend: 'high' },
        { topic: 'Indian History', questions: '3-4', weightage: 16, trend: 'medium' },
        { topic: 'Indian Polity', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Geography', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Economics', questions: '2-3', weightage: 12, trend: 'medium' },
        { topic: 'Sports, Awards, Static GK', questions: '1-3', weightage: 13, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  CDS
  // ══════════════════════════════════
  {
    exam: 'CDS', slug: 'cds', paper: 'Written Exam (2017-2026 Analysis)',
    totalQuestions: 300, totalMarks: 300, duration: '360 minutes (2 hrs × 3)', negativeMarking: '1/3rd of marks',
    ...c('slate'), iconBg: 'from-slate-600 to-gray-700',
    subjects: [
      { subject: 'English (120 Questions, 100 Marks)', topics: [
        { topic: 'Reading Comprehension', questions: '20-30', weightage: 25, trend: 'high' },
        { topic: 'Spotting Errors', questions: '15-20', weightage: 16, trend: 'high' },
        { topic: 'Sentence Improvement/Correction', questions: '15-20', weightage: 16, trend: 'high' },
        { topic: 'Ordering of Sentences', questions: '10-15', weightage: 12, trend: 'medium' },
        { topic: 'Synonyms & Antonyms', questions: '10-12', weightage: 10, trend: 'medium' },
        { topic: 'Fill in the Blanks', questions: '10-12', weightage: 10, trend: 'medium' },
        { topic: 'Idioms, One Word Substitution', questions: '8-10', weightage: 8, trend: 'medium' },
        { topic: 'Cloze Test', questions: '3-5', weightage: 3, trend: 'low' },
      ]},
      { subject: 'General Knowledge (120 Questions, 100 Marks)', topics: [
        { topic: 'History (Indian & World)', questions: '20-25', weightage: 20, trend: 'high' },
        { topic: 'Geography (India & World Physical)', questions: '15-20', weightage: 16, trend: 'high' },
        { topic: 'Indian Polity & Governance', questions: '15-18', weightage: 14, trend: 'high' },
        { topic: 'Economics (Indian Economy, Budget, Planning)', questions: '10-15', weightage: 12, trend: 'medium' },
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '15-20', weightage: 16, trend: 'high' },
        { topic: 'Current Events (National & International)', questions: '15-20', weightage: 16, trend: 'high' },
        { topic: 'Defence, Awards, Sports', questions: '3-5', weightage: 6, trend: 'low' },
      ]},
      { subject: 'Elementary Mathematics (100 Questions, 100 Marks)', topics: [
        { topic: 'Arithmetic (Number System, %, Ratio, Average, P&L)', questions: '25-30', weightage: 28, trend: 'high' },
        { topic: 'Algebra', questions: '15-18', weightage: 16, trend: 'high' },
        { topic: 'Geometry', questions: '12-15', weightage: 14, trend: 'high' },
        { topic: 'Trigonometry', questions: '10-15', weightage: 12, trend: 'medium' },
        { topic: 'Mensuration', questions: '10-12', weightage: 10, trend: 'medium' },
        { topic: 'Statistics & Probability', questions: '5-8', weightage: 7, trend: 'medium' },
        { topic: 'Time & Work, Time & Distance, SI/CI', questions: '8-12', weightage: 10, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '2-3', weightage: 3, trend: 'low' },
      ]},
    ],
  },
  // ══════════════════════════════════
  //  IBPS Clerk
  // ══════════════════════════════════
  {
    exam: 'IBPS Clerk', slug: 'ibps-clerk', paper: 'Prelims (2018-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('cyan'), iconBg: 'from-cyan-500 to-teal-600',
    subjects: [
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '7-10', weightage: 30, trend: 'high' },
        { topic: 'Cloze Test / Fill in the Blanks', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Error Spotting', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Sentence Rearrangement / Para Jumbles', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Phrase Replacement / Vocabulary', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Numerical Ability (35 Questions)', topics: [
        { topic: 'Number Series', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Simplification / Approximation', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Data Interpretation', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Arithmetic (%, Profit/Loss, Ratio, SI/CI)', questions: '8-10', weightage: 28, trend: 'high' },
        { topic: 'Miscellaneous (Age, Time & Work, Speed)', questions: '5-7', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (35 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement', questions: '10-15', weightage: 40, trend: 'high' },
        { topic: 'Syllogism', questions: '3-5', weightage: 12, trend: 'high' },
        { topic: 'Inequality / Coding-Decoding', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Blood Relation / Direction', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Alphabet / Number / Order & Ranking', questions: '5-7', weightage: 20, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SBI Clerk
  // ══════════════════════════════════
  {
    exam: 'SBI Clerk', slug: 'sbi-clerk', paper: 'Prelims (2019-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('blue'), iconBg: 'from-blue-500 to-indigo-600',
    subjects: [
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Cloze Test', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Error Detection / Correction', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Sentence Rearrangement', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Word Swap / Vocabulary', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Numerical Ability (35 Questions)', topics: [
        { topic: 'Simplification / Approximation', questions: '5-8', weightage: 20, trend: 'high' },
        { topic: 'Number Series', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Data Interpretation', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Arithmetic (Ratio, %, SI/CI, P&L)', questions: '8-10', weightage: 26, trend: 'high' },
        { topic: 'Time & Work, Speed, Age Problems', questions: '5-7', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (35 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement', questions: '10-15', weightage: 40, trend: 'high' },
        { topic: 'Syllogism', questions: '3-5', weightage: 12, trend: 'high' },
        { topic: 'Inequality', questions: '3-5', weightage: 12, trend: 'high' },
        { topic: 'Coding-Decoding / Blood Relation', questions: '5-7', weightage: 16, trend: 'medium' },
        { topic: 'Direction / Order & Ranking / Alpha-Numeric', questions: '5-7', weightage: 20, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SSC CPO (Sub-Inspector)
  // ══════════════════════════════════
  {
    exam: 'SSC CPO', slug: 'ssc-cpo', paper: 'Tier 1 (2019-2026 Analysis)',
    totalQuestions: 200, totalMarks: 200, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('red'), iconBg: 'from-red-500 to-rose-600',
    subjects: [
      { subject: 'General Intelligence & Reasoning (50 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Series (Number/Letter/Figure)', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '4-6', weightage: 10, trend: 'high' },
        { topic: 'Paper Folding / Mirror Image / Dice', questions: '5-8', weightage: 14, trend: 'medium' },
        { topic: 'Blood Relation / Direction / Ranking', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Matrix / Missing Number / Venn Diagram', questions: '6-8', weightage: 14, trend: 'medium' },
        { topic: 'Syllogism / Statement-Conclusion', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Word Formation / Embedded Figure', questions: '4-6', weightage: 10, trend: 'low' },
      ]},
      { subject: 'General Knowledge & Awareness (50 Questions)', topics: [
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '12-15', weightage: 28, trend: 'high' },
        { topic: 'History (Ancient, Medieval, Modern)', questions: '6-8', weightage: 14, trend: 'high' },
        { topic: 'Polity & Constitution', questions: '6-8', weightage: 14, trend: 'high' },
        { topic: 'Geography (India & World)', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Economics & Current Affairs', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Static GK (Awards, Books, Sports)', questions: '5-7', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'Quantitative Aptitude (50 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Trigonometry', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Algebra', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Percentage, Profit & Loss, Ratio', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Time & Work, Speed & Distance, SI/CI', questions: '6-8', weightage: 14, trend: 'medium' },
        { topic: 'Number System, Average, Simplification', questions: '4-6', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'English Comprehension (50 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Cloze Test', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Error Spotting / Correction', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Synonyms & Antonyms', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Idioms & Phrases / One Word Substitution', questions: '5-7', weightage: 14, trend: 'medium' },
        { topic: 'Sentence Improvement / Para Jumbles', questions: '5-7', weightage: 14, trend: 'medium' },
        { topic: 'Active-Passive / Direct-Indirect / Spelling', questions: '5-7', weightage: 14, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UP Police Constable
  // ══════════════════════════════════
  {
    exam: 'UP Police Constable', slug: 'up-police', paper: 'Written Exam (2018-2024 Analysis)',
    totalQuestions: 150, totalMarks: 300, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('amber'), iconBg: 'from-amber-500 to-orange-600',
    subjects: [
      { subject: 'General Knowledge (38 Questions)', topics: [
        { topic: 'UP Specific GK (History, Geography, Culture)', questions: '8-10', weightage: 25, trend: 'high' },
        { topic: 'Indian History & Freedom Struggle', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'General Science', questions: '5-7', weightage: 15, trend: 'medium' },
        { topic: 'Geography & Economics', questions: '3-5', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'General Hindi (37 Questions)', topics: [
        { topic: 'Vilom Shabd (Antonyms)', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Paryayvachi (Synonyms)', questions: '4-6', weightage: 14, trend: 'high' },
        { topic: 'Muhavare / Lokoktiyan', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Sandhi, Samas, Alankar', questions: '5-7', weightage: 16, trend: 'medium' },
        { topic: 'Vakya Shudhi / Vartani', questions: '5-7', weightage: 16, trend: 'medium' },
        { topic: 'Apathit Gadyansh (Unseen Passage)', questions: '5-7', weightage: 14, trend: 'medium' },
        { topic: 'Ling, Vachan, Karak, Kriya', questions: '2-4', weightage: 8, trend: 'low' },
      ]},
      { subject: 'Numerical & Mental Ability (38 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Percentage, Profit & Loss, Ratio', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Time & Work, Speed & Distance', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Algebra & Geometry', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Mensuration (2D & 3D)', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Tables, Graphs, Data Interpretation', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'SI/CI, Average, Age Problems', questions: '4-6', weightage: 16, trend: 'medium' },
      ]},
      { subject: 'Mental Aptitude / Reasoning (37 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '4-6', weightage: 14, trend: 'high' },
        { topic: 'Series (Number/Letter)', questions: '4-6', weightage: 14, trend: 'high' },
        { topic: 'Direction & Distance', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Blood Relation / Ranking', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Venn Diagram / Syllogism', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Mirror Image / Paper Folding / Dice', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Missing Number / Matrix', questions: '3-5', weightage: 12, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RBI Grade B
  // ══════════════════════════════════
  {
    exam: 'RBI Grade B', slug: 'rbi-grade-b', paper: 'Phase 1 (2020-2026 Analysis)',
    totalQuestions: 200, totalMarks: 200, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('violet'), iconBg: 'from-violet-500 to-purple-600',
    subjects: [
      { subject: 'General Awareness (80 Questions)', topics: [
        { topic: 'Banking & Financial Awareness', questions: '20-25', weightage: 30, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '20-25', weightage: 28, trend: 'high' },
        { topic: 'Static GK (India & World)', questions: '10-12', weightage: 14, trend: 'medium' },
        { topic: 'Economy (Budget, RBI Policies, GDP)', questions: '10-15', weightage: 16, trend: 'high' },
        { topic: 'International Relations & Awards', questions: '5-8', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'Quantitative Aptitude (30 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Number Series / Simplification', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Arithmetic (%, Ratio, SI/CI, P&L)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Algebra, Mensuration, Geometry', questions: '3-5', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Cloze Test / Fill in the Blanks', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Error Detection / Correction', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Para Jumbles / Sentence Rearrangement', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Vocabulary / Word Usage', questions: '3-5', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'Reasoning (60 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement', questions: '15-20', weightage: 35, trend: 'high' },
        { topic: 'Syllogism', questions: '5-7', weightage: 10, trend: 'high' },
        { topic: 'Inequality / Coding-Decoding', questions: '8-10', weightage: 15, trend: 'high' },
        { topic: 'Data Sufficiency', questions: '5-7', weightage: 10, trend: 'medium' },
        { topic: 'Blood Relation / Direction / Ranking', questions: '5-8', weightage: 12, trend: 'medium' },
        { topic: 'Input-Output / Machine Input', questions: '5-7', weightage: 10, trend: 'medium' },
        { topic: 'Logical / Critical Reasoning', questions: '3-5', weightage: 8, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  CUET UG
  // ══════════════════════════════════
  {
    exam: 'CUET UG', slug: 'cuet-ug', paper: 'General Test (Section III, 2022-2026 Analysis)',
    totalQuestions: 75, totalMarks: 300, duration: '60 minutes', negativeMarking: '1 mark per wrong answer',
    ...c('pink'), iconBg: 'from-pink-500 to-rose-600',
    subjects: [
      { subject: 'General Knowledge & Current Affairs (25 Questions)', topics: [
        { topic: 'Current Affairs (Last 1 year)', questions: '7-10', weightage: 35, trend: 'high' },
        { topic: 'Indian History & Culture', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Indian Polity & Governance', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Geography & Environment', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'General Science', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Awards, Books, Sports, Personalities', questions: '1-2', weightage: 5, trend: 'low' },
      ]},
      { subject: 'General Mental Ability (25 Questions)', topics: [
        { topic: 'Analogy / Classification / Series', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Coding-Decoding / Blood Relation', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Puzzles & Seating Arrangement', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Direction / Ranking / Syllogism', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Venn Diagram / Dice / Mirror Image', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Missing Number / Matrix', questions: '1-3', weightage: 10, trend: 'low' },
      ]},
      { subject: 'Numerical Ability (25 Questions)', topics: [
        { topic: 'Arithmetic (%, Ratio, SI/CI, Profit & Loss)', questions: '8-10', weightage: 36, trend: 'high' },
        { topic: 'Algebra & Number System', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Statistics & Probability', questions: '1-3', weightage: 12, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  AFCAT (Air Force)
  // ══════════════════════════════════
  {
    exam: 'AFCAT', slug: 'afcat', paper: 'Online Test (2019-2026 Analysis)',
    totalQuestions: 100, totalMarks: 300, duration: '120 minutes', negativeMarking: '1 mark per wrong answer',
    ...c('sky'), iconBg: 'from-sky-500 to-blue-600',
    subjects: [
      { subject: 'General Awareness (25 Questions)', topics: [
        { topic: 'History (India & World)', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Geography (India & World)', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Polity & Defence', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Current Affairs & Sports', questions: '5-8', weightage: 28, trend: 'high' },
        { topic: 'General Science', questions: '2-4', weightage: 16, trend: 'medium' },
      ]},
      { subject: 'Verbal Ability in English (25 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Error Detection / Correction', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Sentence Completion / Cloze Test', questions: '3-5', weightage: 16, trend: 'high' },
        { topic: 'Synonyms & Antonyms', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Idioms / One Word Substitution', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Para Jumbles / Sentence Rearrangement', questions: '1-3', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Numerical Ability (18 Questions)', topics: [
        { topic: 'Arithmetic (%, Ratio, Profit/Loss, SI/CI)', questions: '6-8', weightage: 38, trend: 'high' },
        { topic: 'Algebra & Number System', questions: '3-5', weightage: 22, trend: 'medium' },
        { topic: 'Geometry & Mensuration', questions: '3-4', weightage: 20, trend: 'medium' },
        { topic: 'Time & Work, Speed & Distance', questions: '2-3', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'Reasoning & Military Aptitude (32 Questions)', topics: [
        { topic: 'Analogy / Classification / Series', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '3-5', weightage: 14, trend: 'high' },
        { topic: 'Blood Relation / Direction', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Figure Completion / Pattern', questions: '4-6', weightage: 16, trend: 'medium' },
        { topic: 'Venn Diagram / Syllogism', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Data Sufficiency / Mathematical Operations', questions: '3-5', weightage: 14, trend: 'medium' },
        { topic: 'Mirror Image / Paper Folding', questions: '2-4', weightage: 12, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  CAT (MBA Entrance)
  // ══════════════════════════════════
  {
    exam: 'CAT', slug: 'cat-mba', paper: 'MBA Entrance (2019-2026 Analysis)',
    totalQuestions: 66, totalMarks: 198, duration: '120 minutes', negativeMarking: '1 mark per wrong MCQ',
    ...c('orange'), iconBg: 'from-orange-500 to-red-600',
    subjects: [
      { subject: 'Verbal Ability & Reading Comprehension (24 Questions)', topics: [
        { topic: 'Reading Comprehension Passages', questions: '16-18', weightage: 70, trend: 'high' },
        { topic: 'Para Jumbles / Para Summary', questions: '3-4', weightage: 15, trend: 'high' },
        { topic: 'Sentence Completion / Odd Sentence Out', questions: '2-4', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Data Interpretation & Logical Reasoning (20 Questions)', topics: [
        { topic: 'Data Interpretation (Tables, Charts, Graphs)', questions: '8-10', weightage: 45, trend: 'high' },
        { topic: 'Logical Reasoning (Arrangements, Puzzles)', questions: '8-10', weightage: 45, trend: 'high' },
        { topic: 'Games & Tournaments', questions: '0-4', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Quantitative Ability (22 Questions)', topics: [
        { topic: 'Arithmetic (%, Ratio, TSD, T&W, Mixtures)', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Algebra (Equations, Functions, Logs)', questions: '4-6', weightage: 22, trend: 'high' },
        { topic: 'Geometry & Mensuration', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Number System & Combinatorics', questions: '3-5', weightage: 20, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  NABARD Grade A
  // ══════════════════════════════════
  {
    exam: 'NABARD Grade A', slug: 'nabard-grade-a', paper: 'Prelims Phase 1 (2022-2026 Analysis)',
    totalQuestions: 200, totalMarks: 200, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('green'), iconBg: 'from-green-500 to-emerald-600',
    subjects: [
      { subject: 'Quantitative Aptitude (20 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '5-8', weightage: 35, trend: 'high' },
        { topic: 'Simplification & Approximation', questions: '4-5', weightage: 20, trend: 'high' },
        { topic: 'Number Series', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Arithmetic (CI/SI, Profit, Ratio, TSD)', questions: '3-5', weightage: 25, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (20 Questions)', topics: [
        { topic: 'Seating Arrangement & Puzzles', questions: '8-10', weightage: 45, trend: 'high' },
        { topic: 'Syllogism', questions: '3-5', weightage: 20, trend: 'high' },
        { topic: 'Coding-Decoding & Blood Relations', questions: '3-4', weightage: 15, trend: 'medium' },
        { topic: 'Inequality & Direction Sense', questions: '2-4', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'English Language (40 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '10-15', weightage: 35, trend: 'high' },
        { topic: 'Cloze Test / Fill in Blanks', questions: '5-8', weightage: 18, trend: 'high' },
        { topic: 'Error Spotting / Sentence Correction', questions: '5-8', weightage: 18, trend: 'high' },
        { topic: 'Para Jumbles & Sentence Rearrangement', questions: '5-7', weightage: 14, trend: 'medium' },
        { topic: 'Vocabulary (Synonyms, Antonyms, Idioms)', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'General Awareness (40 Questions)', topics: [
        { topic: 'Agriculture & Rural Development', questions: '10-15', weightage: 35, trend: 'high' },
        { topic: 'Banking & Financial Awareness', questions: '8-10', weightage: 22, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '8-10', weightage: 22, trend: 'high' },
        { topic: 'Economic & Social Issues', questions: '5-7', weightage: 15, trend: 'medium' },
        { topic: 'Static GK (Indian History, Geography, Polity)', questions: '2-3', weightage: 6, trend: 'low' },
      ]},
      { subject: 'Decision Making (10 Questions)', topics: [
        { topic: 'Situation-based Decision Making', questions: '5-6', weightage: 55, trend: 'high' },
        { topic: 'Analytical Reasoning', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'Ethics & Governance Scenarios', questions: '1-2', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'Computer Knowledge (20 Questions)', topics: [
        { topic: 'MS Office & Operating Systems', questions: '5-8', weightage: 35, trend: 'high' },
        { topic: 'Networking & Internet', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Database & DBMS', questions: '3-4', weightage: 20, trend: 'medium' },
        { topic: 'Computer Hardware & Software', questions: '3-5', weightage: 25, trend: 'medium' },
      ]},
      { subject: 'Agriculture & Rural Development (50 Questions)', topics: [
        { topic: 'Indian Agriculture (Crops, Irrigation, Land Reforms)', questions: '15-20', weightage: 35, trend: 'high' },
        { topic: 'Rural Development Schemes (MGNREGA, PMAY, etc.)', questions: '10-15', weightage: 25, trend: 'high' },
        { topic: 'Food Processing & Supply Chain', questions: '5-8', weightage: 14, trend: 'medium' },
        { topic: 'Microfinance & SHGs', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Agricultural Credit & NABARD Schemes', questions: '5-7', weightage: 14, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SEBI Grade A
  // ══════════════════════════════════
  {
    exam: 'SEBI Grade A', slug: 'sebi-grade-a', paper: 'Phase 1 Screening (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('blue'), iconBg: 'from-blue-500 to-indigo-600',
    subjects: [
      { subject: 'General Awareness (25 Questions)', topics: [
        { topic: 'Financial Markets & Securities', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Banking & Economy', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'SEBI Regulations & Capital Markets', questions: '3-5', weightage: 20, trend: 'high' },
      ]},
      { subject: 'Quantitative Aptitude (25 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Simplification & Number Series', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Arithmetic (Profit, Ratio, CI/SI)', questions: '5-7', weightage: 25, trend: 'medium' },
        { topic: 'Algebra & Geometry', questions: '2-4', weightage: 15, trend: 'low' },
      ]},
      { subject: 'English Language (25 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Error Detection / Sentence Correction', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Cloze Test / Fill in Blanks', questions: '4-5', weightage: 18, trend: 'medium' },
        { topic: 'Vocabulary & Idioms', questions: '3-5', weightage: 17, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (25 Questions)', topics: [
        { topic: 'Seating Arrangement & Puzzles', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Syllogism & Inequality', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Coding-Decoding & Blood Relations', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Direction & Order/Ranking', questions: '2-4', weightage: 17, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  LIC AAO
  // ══════════════════════════════════
  {
    exam: 'LIC AAO', slug: 'lic-aao', paper: 'Prelims (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 70, duration: '60 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('purple'), iconBg: 'from-purple-500 to-violet-600',
    subjects: [
      { subject: 'Reasoning Ability (30 Questions)', topics: [
        { topic: 'Seating Arrangement & Puzzles', questions: '10-12', weightage: 40, trend: 'high' },
        { topic: 'Syllogism', questions: '4-5', weightage: 15, trend: 'high' },
        { topic: 'Coding-Decoding & Blood Relations', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Inequality & Order/Ranking', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Direction Sense & Miscellaneous', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Quantitative Aptitude (30 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Number Series', questions: '5-6', weightage: 18, trend: 'high' },
        { topic: 'Simplification & Approximation', questions: '5-6', weightage: 18, trend: 'high' },
        { topic: 'Arithmetic (CI/SI, Profit, Ratio)', questions: '5-7', weightage: 20, trend: 'medium' },
        { topic: 'Quadratic Equations', questions: '3-5', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Error Detection / Sentence Improvement', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Cloze Test', questions: '5-6', weightage: 18, trend: 'high' },
        { topic: 'Para Jumbles / Sentence Rearrangement', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Vocabulary & Idioms', questions: '2-4', weightage: 12, trend: 'low' },
      ]},
      { subject: 'Current Affairs & GK (10 Questions)', topics: [
        { topic: 'Insurance & Financial Awareness', questions: '3-4', weightage: 35, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '3-4', weightage: 35, trend: 'high' },
        { topic: 'Static GK & LIC Knowledge', questions: '2-3', weightage: 30, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SSC Stenographer
  // ══════════════════════════════════
  {
    exam: 'SSC Stenographer', slug: 'ssc-steno', paper: 'Computer Based Exam (2022-2026 Analysis)',
    totalQuestions: 200, totalMarks: 200, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('teal'), iconBg: 'from-teal-500 to-cyan-600',
    subjects: [
      { subject: 'General Intelligence & Reasoning (50 Questions)', topics: [
        { topic: 'Analogies & Classification', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '4-6', weightage: 12, trend: 'high' },
        { topic: 'Matrix & Paper Folding', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Mirror & Water Image', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Series (Number, Letter, Figure)', questions: '5-8', weightage: 15, trend: 'high' },
        { topic: 'Blood Relations & Direction', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Venn Diagram & Mathematical Operations', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Embedded Figures & Counting', questions: '3-5', weightage: 13, trend: 'medium' },
      ]},
      { subject: 'General Awareness (50 Questions)', topics: [
        { topic: 'History & Culture', questions: '8-12', weightage: 22, trend: 'high' },
        { topic: 'Geography & Environment', questions: '6-10', weightage: 18, trend: 'medium' },
        { topic: 'Indian Polity & Constitution', questions: '6-10', weightage: 18, trend: 'high' },
        { topic: 'General Science (Physics, Chem, Bio)', questions: '8-12', weightage: 22, trend: 'high' },
        { topic: 'Current Affairs & Static GK', questions: '6-10', weightage: 20, trend: 'high' },
      ]},
      { subject: 'English Language (100 Questions)', topics: [
        { topic: 'Spot the Error', questions: '15-20', weightage: 18, trend: 'high' },
        { topic: 'Fill in the Blanks', questions: '10-15', weightage: 12, trend: 'high' },
        { topic: 'Synonyms / Antonyms', questions: '8-12', weightage: 10, trend: 'medium' },
        { topic: 'Spelling / Detecting Misspelt Words', questions: '5-8', weightage: 8, trend: 'medium' },
        { topic: 'Sentence Improvement', questions: '10-15', weightage: 12, trend: 'high' },
        { topic: 'Active/Passive Voice', questions: '5-8', weightage: 8, trend: 'medium' },
        { topic: 'Direct/Indirect Speech', questions: '5-8', weightage: 8, trend: 'medium' },
        { topic: 'Comprehension Passage', questions: '10-15', weightage: 12, trend: 'high' },
        { topic: 'One Word Substitution & Idioms/Phrases', questions: '8-10', weightage: 12, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RRB JE (Junior Engineer)
  // ══════════════════════════════════
  {
    exam: 'RRB JE', slug: 'rrb-je', paper: 'CBT-1 (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '90 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('rose'), iconBg: 'from-rose-500 to-red-600',
    subjects: [
      { subject: 'Mathematics (30 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '4-6', weightage: 18, trend: 'high' },
        { topic: 'Percentage, Profit & Loss', questions: '3-5', weightage: 15, trend: 'high' },
        { topic: 'Ratio, Proportion & Mixture', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Time & Work / Pipes & Cisterns', questions: '2-4', weightage: 12, trend: 'medium' },
        { topic: 'Time, Speed & Distance', questions: '2-3', weightage: 10, trend: 'medium' },
        { topic: 'Geometry & Mensuration', questions: '3-5', weightage: 15, trend: 'high' },
        { topic: 'Algebra & Trigonometry', questions: '3-5', weightage: 18, trend: 'high' },
      ]},
      { subject: 'General Intelligence & Reasoning (25 Questions)', topics: [
        { topic: 'Analogies & Classification', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '3-5', weightage: 18, trend: 'high' },
        { topic: 'Series (Number/Letter/Figure)', questions: '4-6', weightage: 22, trend: 'high' },
        { topic: 'Blood Relations & Direction', questions: '2-4', weightage: 15, trend: 'medium' },
        { topic: 'Mirror/Water Image & Paper Folding', questions: '2-4', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'General Awareness (15 Questions)', topics: [
        { topic: 'Current Affairs (Last 6 months)', questions: '4-6', weightage: 35, trend: 'high' },
        { topic: 'General Science', questions: '3-5', weightage: 30, trend: 'high' },
        { topic: 'Indian Polity & Economics', questions: '2-3', weightage: 20, trend: 'medium' },
        { topic: 'History & Geography', questions: '1-3', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'General Science (30 Questions)', topics: [
        { topic: 'Physics (Mechanics, Optics, Electricity)', questions: '10-12', weightage: 35, trend: 'high' },
        { topic: 'Chemistry (Elements, Acids, Chemical Reactions)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Biology (Human Body, Diseases, Ecology)', questions: '8-10', weightage: 30, trend: 'medium' },
        { topic: 'Environmental Science', questions: '1-2', weightage: 5, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UPPSC PCS
  // ══════════════════════════════════
  {
    exam: 'UPPSC PCS', slug: 'uppsc-pcs', paper: 'Prelims GS Paper I (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 200, duration: '120 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('amber'), iconBg: 'from-amber-500 to-orange-600',
    subjects: [
      { subject: 'Indian History (25-30 Questions)', topics: [
        { topic: 'Ancient India (Indus Valley, Vedic, Maurya, Gupta)', questions: '6-10', weightage: 30, trend: 'high' },
        { topic: 'Medieval India (Delhi Sultanate, Mughals, Bhakti)', questions: '5-8', weightage: 25, trend: 'medium' },
        { topic: 'Modern India (Freedom Struggle, Social Reform)', questions: '8-12', weightage: 35, trend: 'high' },
        { topic: 'UP Specific History & Culture', questions: '2-4', weightage: 10, trend: 'high' },
      ]},
      { subject: 'Geography (20-25 Questions)', topics: [
        { topic: 'Indian Geography (Physical, Economic)', questions: '8-12', weightage: 45, trend: 'high' },
        { topic: 'World Geography', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'UP Geography (Rivers, Soil, Climate)', questions: '3-5', weightage: 22, trend: 'high' },
        { topic: 'Environment & Ecology', questions: '2-4', weightage: 15, trend: 'high' },
      ]},
      { subject: 'Indian Polity (20-25 Questions)', topics: [
        { topic: 'Constitution (FR, DPSP, Amendments)', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Governance & Public Policy', questions: '4-6', weightage: 22, trend: 'high' },
        { topic: 'UP State Governance & Panchayati Raj', questions: '3-5', weightage: 20, trend: 'high' },
        { topic: 'International Relations', questions: '2-4', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'Economy (15-20 Questions)', topics: [
        { topic: 'Indian Economy (Planning, GDP, Inflation)', questions: '5-8', weightage: 35, trend: 'high' },
        { topic: 'Government Schemes & Budget', questions: '4-6', weightage: 30, trend: 'high' },
        { topic: 'UP Economy & Development', questions: '3-5', weightage: 25, trend: 'high' },
        { topic: 'Banking & Financial Institutions', questions: '1-3', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'General Science (20-25 Questions)', topics: [
        { topic: 'Physics (Mechanics, Heat, Light, Electricity)', questions: '6-8', weightage: 30, trend: 'medium' },
        { topic: 'Chemistry (Elements, Compounds, Daily Life)', questions: '5-8', weightage: 28, trend: 'medium' },
        { topic: 'Biology (Human Body, Diseases, Nutrition)', questions: '6-8', weightage: 30, trend: 'high' },
        { topic: 'Science & Technology / Space / Defence', questions: '2-4', weightage: 12, trend: 'high' },
      ]},
      { subject: 'Current Affairs (15-20 Questions)', topics: [
        { topic: 'National Current Events (Last 1 year)', questions: '6-8', weightage: 40, trend: 'high' },
        { topic: 'UP State Current Events', questions: '4-6', weightage: 30, trend: 'high' },
        { topic: 'International Events & Awards', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Sports & Miscellaneous', questions: '1-3', weightage: 10, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  BPSC (Bihar)
  // ══════════════════════════════════
  {
    exam: 'BPSC', slug: 'bpsc', paper: 'Prelims GS (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 150, duration: '120 minutes', negativeMarking: 'No negative marking',
    ...c('red'), iconBg: 'from-red-500 to-rose-600',
    subjects: [
      { subject: 'Indian History & Culture (30-35 Questions)', topics: [
        { topic: 'Ancient & Medieval Bihar (Magadha, Nalanda, Vikramashila)', questions: '8-12', weightage: 30, trend: 'high' },
        { topic: 'Modern India (Freedom Struggle, Bihar in National Movement)', questions: '10-12', weightage: 35, trend: 'high' },
        { topic: 'Ancient India (Indus, Vedic, Maurya, Gupta)', questions: '5-8', weightage: 20, trend: 'medium' },
        { topic: 'Art, Culture & Architecture', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Geography (20-25 Questions)', topics: [
        { topic: 'Bihar Geography (Rivers, Soil, Agriculture)', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Indian Geography (Physical & Economic)', questions: '6-8', weightage: 30, trend: 'high' },
        { topic: 'World Geography', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Environment & Disaster Management', questions: '2-3', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'Indian Polity (20-25 Questions)', topics: [
        { topic: 'Constitution (FR, DPSP, Amendments, Schedules)', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Governance & Public Administration', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'Bihar State Polity & Panchayati Raj', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'Judiciary & Recent Judgments', questions: '1-3', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Economy & Current Affairs (25-30 Questions)', topics: [
        { topic: 'Bihar Economy & Development Schemes', questions: '6-10', weightage: 30, trend: 'high' },
        { topic: 'Indian Economy (Budget, GDP, Policies)', questions: '5-8', weightage: 25, trend: 'high' },
        { topic: 'National Current Affairs', questions: '5-8', weightage: 25, trend: 'high' },
        { topic: 'Bihar State Current Affairs', questions: '3-5', weightage: 20, trend: 'high' },
      ]},
      { subject: 'General Science (25-30 Questions)', topics: [
        { topic: 'Physics (Mechanics, Heat, Electricity)', questions: '8-10', weightage: 35, trend: 'medium' },
        { topic: 'Chemistry (Elements, Daily Life Chemistry)', questions: '6-8', weightage: 25, trend: 'medium' },
        { topic: 'Biology (Human Body, Disease, Nutrition)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Science & Technology', questions: '2-4', weightage: 10, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RPSC RAS
  // ══════════════════════════════════
  {
    exam: 'RPSC RAS', slug: 'rpsc-ras', paper: 'Prelims GS (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 200, duration: '180 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('yellow'), iconBg: 'from-yellow-500 to-amber-600',
    subjects: [
      { subject: 'Rajasthan History, Art & Culture (25-30 Questions)', topics: [
        { topic: 'Rajasthan History (Rajput Kingdoms, Mewar, Marwar)', questions: '8-12', weightage: 35, trend: 'high' },
        { topic: 'Art, Painting, Architecture & Handicrafts', questions: '5-8', weightage: 25, trend: 'high' },
        { topic: 'Folk Music, Dance & Festivals', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Saints & Religious Movements', questions: '3-5', weightage: 22, trend: 'medium' },
      ]},
      { subject: 'Rajasthan Geography (15-20 Questions)', topics: [
        { topic: 'Physical Features (Desert, Aravalli, Rivers)', questions: '5-8', weightage: 35, trend: 'high' },
        { topic: 'Climate, Soil & Vegetation', questions: '3-5', weightage: 22, trend: 'medium' },
        { topic: 'Minerals, Industries & Agriculture', questions: '3-5', weightage: 25, trend: 'high' },
        { topic: 'Wildlife & Environment', questions: '2-3', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'Indian History & Polity (25-30 Questions)', topics: [
        { topic: 'Indian Polity & Constitution', questions: '8-12', weightage: 40, trend: 'high' },
        { topic: 'Modern Indian History & Freedom Struggle', questions: '6-10', weightage: 30, trend: 'high' },
        { topic: 'Ancient & Medieval India', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Rajasthan State Polity & Administration', questions: '2-4', weightage: 10, trend: 'high' },
      ]},
      { subject: 'Economy (20-25 Questions)', topics: [
        { topic: 'Rajasthan Economy (Agriculture, Industry, Tourism)', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Indian Economy (Budget, Planning, Banking)', questions: '5-8', weightage: 30, trend: 'high' },
        { topic: 'Government Schemes (Central + State)', questions: '3-5', weightage: 18, trend: 'high' },
        { topic: 'Demographic & Economic Indicators', questions: '2-3', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'Science & Current Affairs (30-35 Questions)', topics: [
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '12-15', weightage: 40, trend: 'medium' },
        { topic: 'National Current Events', questions: '8-10', weightage: 28, trend: 'high' },
        { topic: 'Rajasthan Current Events', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Science & Technology / Defence / Space', questions: '2-4', weightage: 12, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  SSC JE
  // ══════════════════════════════════
  {
    exam: 'SSC JE', slug: 'ssc-je', paper: 'Paper I (2022-2026 Analysis)',
    totalQuestions: 200, totalMarks: 200, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('violet'), iconBg: 'from-violet-500 to-purple-600',
    subjects: [
      { subject: 'General Intelligence & Reasoning (50 Questions)', topics: [
        { topic: 'Analogies & Classification', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Series (Number, Letter, Figure)', questions: '6-8', weightage: 15, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Matrix & Blood Relations', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Mirror/Water Image & Paper Folding', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Direction & Venn Diagrams', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Puzzle & Seating Arrangement', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'Mathematical Operations & Statements', questions: '3-5', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'General Awareness (50 Questions)', topics: [
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '12-15', weightage: 28, trend: 'high' },
        { topic: 'Indian History & Culture', questions: '6-10', weightage: 18, trend: 'medium' },
        { topic: 'Geography & Environment', questions: '6-8', weightage: 15, trend: 'medium' },
        { topic: 'Indian Polity & Constitution', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Current Affairs (Last 6 months)', questions: '6-10', weightage: 18, trend: 'high' },
        { topic: 'Economics & Static GK', questions: '2-4', weightage: 7, trend: 'low' },
      ]},
      { subject: 'Civil Engineering (100 Questions)', topics: [
        { topic: 'Building Materials & Construction', questions: '10-14', weightage: 12, trend: 'high' },
        { topic: 'Surveying', questions: '8-12', weightage: 10, trend: 'medium' },
        { topic: 'Soil Mechanics & Foundation', questions: '8-12', weightage: 10, trend: 'high' },
        { topic: 'RCC Structures & Design', questions: '10-14', weightage: 12, trend: 'high' },
        { topic: 'Steel Structures', questions: '5-8', weightage: 7, trend: 'medium' },
        { topic: 'Fluid Mechanics & Hydraulics', questions: '8-12', weightage: 10, trend: 'high' },
        { topic: 'Highway & Transportation Engg', questions: '6-10', weightage: 8, trend: 'medium' },
        { topic: 'Environmental Engineering', questions: '8-12', weightage: 10, trend: 'high' },
        { topic: 'Geotechnical Engineering', questions: '5-8', weightage: 7, trend: 'medium' },
        { topic: 'Estimation, Costing & Valuation', questions: '8-10', weightage: 8, trend: 'high' },
        { topic: 'Irrigation & Water Resources', questions: '3-6', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  IBPS SO
  // ══════════════════════════════════
  {
    exam: 'IBPS SO', slug: 'ibps-so', paper: 'Prelims (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 150, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('cyan'), iconBg: 'from-cyan-500 to-blue-600',
    subjects: [
      { subject: 'English Language (50 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '15-20', weightage: 35, trend: 'high' },
        { topic: 'Error Detection / Sentence Correction', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Cloze Test / Fill in Blanks', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Para Jumbles & Sentence Rearrangement', questions: '5-7', weightage: 14, trend: 'medium' },
        { topic: 'Vocabulary & Idioms', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Reasoning (50 Questions)', topics: [
        { topic: 'Seating Arrangement & Puzzles', questions: '15-18', weightage: 35, trend: 'high' },
        { topic: 'Syllogism', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Coding-Decoding & Blood Relations', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Inequality & Order Ranking', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Machine Input-Output', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Direction, Data Sufficiency', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Miscellaneous (Venn, Statement-Conclusion)', questions: '2-4', weightage: 7, trend: 'low' },
      ]},
      { subject: 'Quantitative Aptitude (50 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '15-18', weightage: 35, trend: 'high' },
        { topic: 'Number Series', questions: '5-7', weightage: 12, trend: 'high' },
        { topic: 'Simplification & Approximation', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Quadratic Equations', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Arithmetic (CI/SI, Profit, Ratio, TSD, T&W)', questions: '8-12', weightage: 20, trend: 'medium' },
        { topic: 'Probability & Permutation', questions: '2-4', weightage: 7, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  MPPSC
  // ══════════════════════════════════
  {
    exam: 'MPPSC', slug: 'mppsc', paper: 'Prelims GS Paper I (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 200, duration: '120 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('emerald'), iconBg: 'from-emerald-500 to-green-600',
    subjects: [
      { subject: 'History (15-20 Questions)', topics: [
        { topic: 'MP History & Culture', questions: '5-8', weightage: 35, trend: 'high' },
        { topic: 'Modern India & Freedom Struggle', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Ancient & Medieval India', questions: '3-5', weightage: 25, trend: 'medium' },
        { topic: 'Art & Architecture', questions: '1-2', weightage: 10, trend: 'low' },
      ]},
      { subject: 'Geography (15-18 Questions)', topics: [
        { topic: 'MP Geography (Rivers, Minerals, Agriculture)', questions: '5-8', weightage: 40, trend: 'high' },
        { topic: 'Indian Geography', questions: '4-6', weightage: 30, trend: 'high' },
        { topic: 'World Geography', questions: '2-3', weightage: 15, trend: 'medium' },
        { topic: 'Environment & Ecology', questions: '2-3', weightage: 15, trend: 'high' },
      ]},
      { subject: 'Polity & Economy (15-18 Questions)', topics: [
        { topic: 'Indian Constitution & Polity', questions: '5-8', weightage: 35, trend: 'high' },
        { topic: 'MP State Administration', questions: '3-5', weightage: 25, trend: 'high' },
        { topic: 'Indian Economy & MP Economy', questions: '4-6', weightage: 30, trend: 'high' },
        { topic: 'Governance & Social Justice', questions: '1-2', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Science & Technology (15-20 Questions)', topics: [
        { topic: 'Physics (Mechanics, Heat, Optics)', questions: '5-7', weightage: 30, trend: 'medium' },
        { topic: 'Chemistry (Elements, Compounds, Daily Life)', questions: '4-6', weightage: 25, trend: 'medium' },
        { topic: 'Biology (Human Body, Diseases, Nutrition)', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'IT & Space Technology', questions: '2-3', weightage: 20, trend: 'high' },
      ]},
      { subject: 'Current Affairs & Miscellaneous (20-25 Questions)', topics: [
        { topic: 'National Current Affairs (Last 1 year)', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'MP State Current Affairs', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Sports, Awards, Books', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Miscellaneous GK', questions: '2-3', weightage: 12, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RBI Assistant
  // ══════════════════════════════════
  {
    exam: 'RBI Assistant', slug: 'rbi-assistant', paper: 'Prelims (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('pink'), iconBg: 'from-pink-500 to-rose-600',
    subjects: [
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 32, trend: 'high' },
        { topic: 'Cloze Test', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Error Detection', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Fill in the Blanks / Sentence Improvement', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Para Jumbles', questions: '2-4', weightage: 13, trend: 'medium' },
      ]},
      { subject: 'Numerical Ability (35 Questions)', topics: [
        { topic: 'Number Series', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Simplification & Approximation', questions: '8-10', weightage: 25, trend: 'high' },
        { topic: 'Data Interpretation', questions: '5-8', weightage: 20, trend: 'high' },
        { topic: 'Arithmetic (CI/SI, Profit, Ratio, TSD)', questions: '8-10', weightage: 25, trend: 'medium' },
        { topic: 'Quadratic Equations', questions: '3-5', weightage: 12, trend: 'medium' },
      ]},
      { subject: 'Reasoning Ability (35 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement', questions: '10-12', weightage: 32, trend: 'high' },
        { topic: 'Syllogism', questions: '4-5', weightage: 13, trend: 'high' },
        { topic: 'Inequality', questions: '4-5', weightage: 13, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Blood Relations & Direction', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Alphanumeric Series & Order Ranking', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Miscellaneous', questions: '1-3', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  CAPF (AC)
  // ══════════════════════════════════
  {
    exam: 'CAPF (AC)', slug: 'capf-ac', paper: 'Paper I (2022-2026 Analysis)',
    totalQuestions: 125, totalMarks: 250, duration: '120 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('red'), iconBg: 'from-red-500 to-rose-600',
    subjects: [
      { subject: 'General Mental Ability (25 Questions)', topics: [
        { topic: 'Logical Reasoning & Analytical Ability', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Number & Letter Series', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Direction, Coding, Blood Relations', questions: '4-6', weightage: 25, trend: 'medium' },
      ]},
      { subject: 'General Science (25 Questions)', topics: [
        { topic: 'Physics (Mechanics, Optics, Electricity)', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Chemistry (Elements, Compounds, Reactions)', questions: '6-8', weightage: 28, trend: 'medium' },
        { topic: 'Biology (Human Body, Diseases, Nutrition)', questions: '6-8', weightage: 28, trend: 'high' },
        { topic: 'Science & Technology (Space, IT, Defence)', questions: '2-3', weightage: 9, trend: 'high' },
      ]},
      { subject: 'Indian Polity & Economy (25 Questions)', topics: [
        { topic: 'Constitution (FR, DPSP, Amendments)', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Indian Economy (Budget, Planning, Banking)', questions: '6-8', weightage: 28, trend: 'high' },
        { topic: 'Governance & Public Policy', questions: '4-6', weightage: 22, trend: 'medium' },
        { topic: 'International Relations & Organisations', questions: '2-4', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'History & Geography (25 Questions)', topics: [
        { topic: 'Modern Indian History & Freedom Struggle', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Indian Geography (Physical, Human, Economic)', questions: '6-8', weightage: 28, trend: 'high' },
        { topic: 'World Geography', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Ancient & Medieval India', questions: '3-5', weightage: 19, trend: 'medium' },
      ]},
      { subject: 'Current Affairs & Events (25 Questions)', topics: [
        { topic: 'National Current Affairs', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Defence & Security', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'International Affairs', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Sports, Awards, Appointments', questions: '2-4', weightage: 15, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  RRB ALP
  // ══════════════════════════════════
  {
    exam: 'RRB ALP', slug: 'rrb-alp', paper: 'CBT 1 (2022-2026 Analysis)',
    totalQuestions: 75, totalMarks: 75, duration: '60 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('orange'), iconBg: 'from-orange-500 to-amber-600',
    subjects: [
      { subject: 'Mathematics (20 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'Percentage, Ratio & Proportion', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'Profit & Loss, SI/CI', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Time & Work, TSD, Mensuration', questions: '4-6', weightage: 30, trend: 'high' },
      ]},
      { subject: 'General Intelligence & Reasoning (25 Questions)', topics: [
        { topic: 'Analogies & Classification', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Number & Letter Series', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Coding-Decoding & Direction', questions: '4-5', weightage: 18, trend: 'medium' },
        { topic: 'Venn Diagrams & Mathematical Operations', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Figure-based (Mirror, Water Image, Paper Folding)', questions: '4-6', weightage: 22, trend: 'high' },
      ]},
      { subject: 'General Science (20 Questions)', topics: [
        { topic: 'Physics (Mechanics, Heat, Light, Sound)', questions: '8-10', weightage: 45, trend: 'high' },
        { topic: 'Chemistry (Elements, Acids, Metals)', questions: '4-6', weightage: 25, trend: 'medium' },
        { topic: 'Biology (Human Body, Diseases)', questions: '4-6', weightage: 30, trend: 'high' },
      ]},
      { subject: 'General Awareness (10 Questions)', topics: [
        { topic: 'Current Affairs (Last 6 months)', questions: '3-5', weightage: 40, trend: 'high' },
        { topic: 'Static GK (History, Geography, Polity)', questions: '3-5', weightage: 35, trend: 'medium' },
        { topic: 'Railway GK', questions: '1-3', weightage: 25, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UPSC ESE (IES)
  // ══════════════════════════════════
  {
    exam: 'UPSC ESE', slug: 'upsc-ese', paper: 'Prelims Paper I - General Studies (2022-2026 Analysis)',
    totalQuestions: 120, totalMarks: 200, duration: '120 minutes', negativeMarking: '1/3 per wrong answer',
    ...c('indigo'), iconBg: 'from-indigo-500 to-blue-600',
    subjects: [
      { subject: 'Current Affairs & Issues (20-25 Questions)', topics: [
        { topic: 'National & International Current Events', questions: '8-10', weightage: 40, trend: 'high' },
        { topic: 'Science & Technology Developments', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Awards, Sports, Appointments', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Government Schemes & Policies', questions: '3-5', weightage: 17, trend: 'high' },
      ]},
      { subject: 'Indian Polity & Constitution (15-20 Questions)', topics: [
        { topic: 'Fundamental Rights & DPSP', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Parliament, Judiciary, Executive', questions: '5-7', weightage: 30, trend: 'high' },
        { topic: 'Constitutional Bodies & Amendments', questions: '3-5', weightage: 22, trend: 'medium' },
        { topic: 'Governance & Public Administration', questions: '2-3', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'Indian Economy (15-20 Questions)', topics: [
        { topic: 'Macro Economics (GDP, Inflation, Fiscal Policy)', questions: '5-7', weightage: 32, trend: 'high' },
        { topic: 'Banking, Finance & Monetary Policy', questions: '4-6', weightage: 28, trend: 'high' },
        { topic: 'Agriculture & Industry', questions: '3-5', weightage: 22, trend: 'medium' },
        { topic: 'International Trade & Organisations', questions: '2-3', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'History & Geography (20-25 Questions)', topics: [
        { topic: 'Modern Indian History & Freedom Struggle', questions: '6-8', weightage: 30, trend: 'high' },
        { topic: 'Indian Geography (Physical & Economic)', questions: '5-8', weightage: 28, trend: 'high' },
        { topic: 'World Geography', questions: '3-5', weightage: 20, trend: 'medium' },
        { topic: 'Ancient & Medieval India', questions: '3-5', weightage: 22, trend: 'medium' },
      ]},
      { subject: 'General Science & Engineering (30-35 Questions)', topics: [
        { topic: 'Basic Engineering Concepts', questions: '10-12', weightage: 35, trend: 'high' },
        { topic: 'Physics (Applied)', questions: '6-8', weightage: 22, trend: 'medium' },
        { topic: 'Chemistry & Materials', questions: '5-7', weightage: 18, trend: 'medium' },
        { topic: 'Environment & Ecology', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Energy & Sustainability', questions: '1-3', weightage: 5, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  DSSSB
  // ══════════════════════════════════
  {
    exam: 'DSSSB', slug: 'dsssb', paper: 'Tier-1 Common Exam (2022-2026 Analysis)',
    totalQuestions: 200, totalMarks: 200, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('emerald'), iconBg: 'from-emerald-500 to-green-600',
    subjects: [
      { subject: 'General Awareness (50 Questions)', topics: [
        { topic: 'Indian History & Culture', questions: '8-12', weightage: 22, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '8-12', weightage: 22, trend: 'high' },
        { topic: 'Geography (India & Delhi)', questions: '6-8', weightage: 15, trend: 'medium' },
        { topic: 'Current Affairs (Last 6 months)', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'General Science', questions: '5-8', weightage: 15, trend: 'medium' },
        { topic: 'Economics & Static GK', questions: '2-4', weightage: 6, trend: 'low' },
      ]},
      { subject: 'General Intelligence & Reasoning (50 Questions)', topics: [
        { topic: 'Analogies & Classification', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Series & Coding-Decoding', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Blood Relations & Direction', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Figure-based (Mirror/Water Image, Paper Folding)', questions: '6-8', weightage: 15, trend: 'medium' },
        { topic: 'Venn Diagram & Syllogism', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Puzzle & Seating Arrangement', questions: '6-8', weightage: 15, trend: 'high' },
        { topic: 'Mathematical Operations', questions: '2-4', weightage: 6, trend: 'low' },
      ]},
      { subject: 'Quantitative Aptitude (50 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Percentage, Ratio, Profit & Loss', questions: '8-10', weightage: 20, trend: 'high' },
        { topic: 'Time & Work, TSD', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Algebra & Geometry', questions: '6-8', weightage: 14, trend: 'medium' },
        { topic: 'Mensuration & Trigonometry', questions: '5-7', weightage: 12, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '5-8', weightage: 14, trend: 'high' },
        { topic: 'Statistics & Probability', questions: '2-3', weightage: 6, trend: 'low' },
      ]},
      { subject: 'English Language & Comprehension (50 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '10-15', weightage: 28, trend: 'high' },
        { topic: 'Error Detection & Sentence Improvement', questions: '8-10', weightage: 18, trend: 'high' },
        { topic: 'Fill in Blanks & Cloze Test', questions: '5-8', weightage: 14, trend: 'medium' },
        { topic: 'Synonyms, Antonyms, One Word', questions: '5-8', weightage: 14, trend: 'medium' },
        { topic: 'Idioms & Phrases', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Active-Passive, Direct-Indirect', questions: '4-6', weightage: 10, trend: 'medium' },
        { topic: 'Spelling & Vocabulary', questions: '2-3', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  KVS TGT/PGT
  // ══════════════════════════════════
  {
    exam: 'KVS TGT/PGT', slug: 'kvs-tgt-pgt', paper: 'Common Paper (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 150, duration: '150 minutes', negativeMarking: 'No negative marking',
    ...c('amber'), iconBg: 'from-amber-500 to-yellow-600',
    subjects: [
      { subject: 'General English (10 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '3-4', weightage: 35, trend: 'high' },
        { topic: 'Grammar (Tenses, Voice, Narration)', questions: '3-4', weightage: 35, trend: 'high' },
        { topic: 'Vocabulary', questions: '2-3', weightage: 30, trend: 'medium' },
      ]},
      { subject: 'General Hindi (10 Questions)', topics: [
        { topic: 'व्याकरण (संज्ञा, सर्वनाम, क्रिया)', questions: '4-5', weightage: 45, trend: 'high' },
        { topic: 'मुहावरे, लोकोक्तियाँ', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'अपठित गद्यांश', questions: '2-3', weightage: 30, trend: 'high' },
      ]},
      { subject: 'General Knowledge & Current Affairs (10 Questions)', topics: [
        { topic: 'Current Affairs (Last 6 months)', questions: '3-5', weightage: 40, trend: 'high' },
        { topic: 'Indian History & Polity', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'Geography & Science', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'Sports & Awards', questions: '1-2', weightage: 10, trend: 'low' },
      ]},
      { subject: 'Reasoning Ability (10 Questions)', topics: [
        { topic: 'Analogies & Series', questions: '3-4', weightage: 35, trend: 'high' },
        { topic: 'Coding & Blood Relations', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'Direction & Ranking', questions: '2-3', weightage: 20, trend: 'medium' },
        { topic: 'Venn Diagram & Puzzle', questions: '2-3', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'Computer Literacy (10 Questions)', topics: [
        { topic: 'MS Office (Word, Excel, PowerPoint)', questions: '3-4', weightage: 35, trend: 'high' },
        { topic: 'Internet & Networking', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'Computer Hardware & OS', questions: '2-3', weightage: 25, trend: 'medium' },
        { topic: 'Digital Initiatives & ICT in Education', questions: '1-2', weightage: 15, trend: 'high' },
      ]},
      { subject: 'Education & Pedagogy (40 Questions)', topics: [
        { topic: 'Understanding the Learner (CDP)', questions: '8-10', weightage: 22, trend: 'high' },
        { topic: 'Teaching-Learning Process', questions: '8-10', weightage: 22, trend: 'high' },
        { topic: 'Assessment & Evaluation', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'NEP 2020 & Educational Initiatives', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'Inclusive Education & Special Needs', questions: '4-6', weightage: 12, trend: 'medium' },
        { topic: 'School Administration & Management', questions: '3-5', weightage: 8, trend: 'medium' },
        { topic: 'Curriculum Design', questions: '2-3', weightage: 6, trend: 'medium' },
      ]},
      { subject: 'Subject Knowledge (60 Questions)', topics: [
        { topic: 'Core Subject Content', questions: '30-35', weightage: 55, trend: 'high' },
        { topic: 'Subject Pedagogy & Methodology', questions: '15-20', weightage: 30, trend: 'high' },
        { topic: 'NCERT Content & Applications', questions: '5-8', weightage: 15, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  EPFO SSA
  // ══════════════════════════════════
  {
    exam: 'EPFO SSA', slug: 'epfo-ssa', paper: 'Prelims (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '60 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('teal'), iconBg: 'from-teal-500 to-cyan-600',
    subjects: [
      { subject: 'English Language (30 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '8-10', weightage: 32, trend: 'high' },
        { topic: 'Cloze Test / Fill in Blanks', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Error Detection / Sentence Correction', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Para Jumbles & Sentence Rearrangement', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Vocabulary', questions: '1-3', weightage: 9, trend: 'low' },
      ]},
      { subject: 'Reasoning Ability (35 Questions)', topics: [
        { topic: 'Puzzles & Seating Arrangement', questions: '10-12', weightage: 32, trend: 'high' },
        { topic: 'Syllogism', questions: '4-5', weightage: 13, trend: 'high' },
        { topic: 'Inequality', questions: '4-5', weightage: 13, trend: 'high' },
        { topic: 'Coding-Decoding & Blood Relations', questions: '3-5', weightage: 13, trend: 'medium' },
        { topic: 'Direction & Order/Ranking', questions: '3-5', weightage: 13, trend: 'medium' },
        { topic: 'Alphanumeric Series', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Data Sufficiency', questions: '1-3', weightage: 6, trend: 'low' },
      ]},
      { subject: 'Quantitative Aptitude (35 Questions)', topics: [
        { topic: 'Data Interpretation', questions: '8-10', weightage: 28, trend: 'high' },
        { topic: 'Number Series', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Simplification & Approximation', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Arithmetic (CI/SI, Profit, Ratio, TSD)', questions: '6-8', weightage: 20, trend: 'medium' },
        { topic: 'Quadratic Equations', questions: '3-5', weightage: 10, trend: 'medium' },
        { topic: 'Miscellaneous (Probability, Permutation)', questions: '1-3', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UPTET
  // ══════════════════════════════════
  {
    exam: 'UPTET', slug: 'uptet', paper: 'Paper I Primary Level (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 150, duration: '150 minutes', negativeMarking: 'No negative marking',
    ...c('lime'), iconBg: 'from-lime-500 to-green-600',
    subjects: [
      { subject: 'Child Development & Pedagogy (30 Questions)', topics: [
        { topic: 'Growth & Development of Child', questions: '6-8', weightage: 22, trend: 'high' },
        { topic: 'Learning & Theories of Learning', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Intelligence & Creativity', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Inclusive Education & Special Needs', questions: '4-6', weightage: 18, trend: 'high' },
        { topic: 'Assessment, Motivation & Personality', questions: '5-7', weightage: 18, trend: 'medium' },
        { topic: 'NCF 2005 / NEP 2020', questions: '1-2', weightage: 7, trend: 'high' },
      ]},
      { subject: 'Language I - Hindi (30 Questions)', topics: [
        { topic: 'अपठित गद्यांश / पद्यांश', questions: '10-12', weightage: 35, trend: 'high' },
        { topic: 'व्याकरण (विलोम, पर्यायवाची, मुहावरे)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'भाषा शिक्षण की विधियाँ', questions: '5-7', weightage: 20, trend: 'medium' },
        { topic: 'Language Pedagogy', questions: '3-5', weightage: 15, trend: 'medium' },
      ]},
      { subject: 'Language II - English (30 Questions)', topics: [
        { topic: 'Unseen Passage & Comprehension', questions: '10-12', weightage: 35, trend: 'high' },
        { topic: 'Grammar (Tenses, Articles, Prepositions)', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Vocabulary (Synonyms, Antonyms)', questions: '4-6', weightage: 18, trend: 'medium' },
        { topic: 'Language Teaching Pedagogy', questions: '3-5', weightage: 17, trend: 'medium' },
      ]},
      { subject: 'Mathematics (30 Questions)', topics: [
        { topic: 'Number System, Fractions, Decimals', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Arithmetic (%, Profit/Loss, Ratio)', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Geometry, Mensuration, Data Handling', questions: '5-7', weightage: 20, trend: 'medium' },
        { topic: 'Algebra & Patterns', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'Math Pedagogy & Teaching Methods', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'NCERT Math Content', questions: '1-2', weightage: 5, trend: 'medium' },
      ]},
      { subject: 'Environmental Studies (30 Questions)', topics: [
        { topic: 'Family, Food, Shelter, Water', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Environment & Ecology', questions: '5-7', weightage: 20, trend: 'high' },
        { topic: 'Animals, Plants & Living Things', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'EVS Pedagogy & Teaching Methods', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Social Issues (Pollution, Conservation)', questions: '3-5', weightage: 15, trend: 'medium' },
        { topic: 'NCERT EVS Content', questions: '1-2', weightage: 6, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  CLAT
  // ══════════════════════════════════
  {
    exam: 'CLAT', slug: 'clat-ug', paper: 'UG Entrance (2022-2026 Analysis)',
    totalQuestions: 120, totalMarks: 120, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('slate'), iconBg: 'from-slate-500 to-gray-600',
    subjects: [
      { subject: 'English Language (22-26 Questions)', topics: [
        { topic: 'Reading Comprehension (Passages)', questions: '15-18', weightage: 70, trend: 'high' },
        { topic: 'Grammar & Vocabulary in Context', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Critical Reasoning from Passages', questions: '2-3', weightage: 10, trend: 'high' },
      ]},
      { subject: 'Current Affairs & GK (28-32 Questions)', topics: [
        { topic: 'Current Affairs (Last 1 year)', questions: '15-18', weightage: 55, trend: 'high' },
        { topic: 'Legal Current Affairs (Landmark Judgments)', questions: '5-7', weightage: 22, trend: 'high' },
        { topic: 'Static GK (History, Geography, Science)', questions: '5-7', weightage: 23, trend: 'medium' },
      ]},
      { subject: 'Legal Reasoning (28-32 Questions)', topics: [
        { topic: 'Constitutional Law Principles', questions: '8-10', weightage: 32, trend: 'high' },
        { topic: 'Criminal & Civil Law Principles', questions: '6-8', weightage: 22, trend: 'high' },
        { topic: 'Legal Maxims & Passage-based Legal Reasoning', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'International Law & Recent Legal Developments', questions: '3-5', weightage: 16, trend: 'medium' },
      ]},
      { subject: 'Logical Reasoning (22-26 Questions)', topics: [
        { topic: 'Passage-based Critical Reasoning', questions: '10-14', weightage: 55, trend: 'high' },
        { topic: 'Strengthening & Weakening Arguments', questions: '4-6', weightage: 22, trend: 'high' },
        { topic: 'Assumptions & Inferences', questions: '4-6', weightage: 23, trend: 'high' },
      ]},
      { subject: 'Quantitative Techniques (10-14 Questions)', topics: [
        { topic: 'Data Interpretation (Graphs, Tables)', questions: '4-6', weightage: 40, trend: 'high' },
        { topic: 'Arithmetic (%, Ratio, Average)', questions: '3-5', weightage: 35, trend: 'medium' },
        { topic: 'Statistics & Basic Math', questions: '2-3', weightage: 25, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  Delhi Police Constable
  // ══════════════════════════════════
  {
    exam: 'Delhi Police Constable', slug: 'delhi-police', paper: 'CBT (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '90 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('blue'), iconBg: 'from-blue-500 to-sky-600',
    subjects: [
      { subject: 'General Knowledge / Current Affairs (25 Questions)', topics: [
        { topic: 'Current Affairs (Last 6 months)', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Indian History & Culture', questions: '4-6', weightage: 20, trend: 'medium' },
        { topic: 'Indian Polity & Constitution', questions: '4-5', weightage: 18, trend: 'high' },
        { topic: 'Geography & Science', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Static GK (Delhi Specific)', questions: '1-2', weightage: 9, trend: 'high' },
      ]},
      { subject: 'Reasoning & Mental Ability (25 Questions)', topics: [
        { topic: 'Analogies & Classification', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Series (Number, Letter, Figure)', questions: '4-6', weightage: 22, trend: 'high' },
        { topic: 'Coding-Decoding & Direction', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Blood Relations & Ranking', questions: '3-4', weightage: 15, trend: 'medium' },
        { topic: 'Venn Diagram & Puzzle', questions: '3-5', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'Numerical Ability (25 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Percentage, Ratio, Profit & Loss', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Time & Work, TSD', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Mensuration & Geometry', questions: '3-5', weightage: 18, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '2-4', weightage: 14, trend: 'high' },
      ]},
      { subject: 'Computer Knowledge (25 Questions)', topics: [
        { topic: 'MS Office (Word, Excel, PowerPoint)', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Computer Fundamentals & OS', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Internet, Email & Networking', questions: '4-6', weightage: 22, trend: 'medium' },
        { topic: 'Cyber Crime & Information Security', questions: '2-4', weightage: 18, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UP Police Constable
  // ══════════════════════════════════
  {
    exam: 'UP Police SI', slug: 'up-police-si', paper: 'Written Exam (2022-2026 Analysis)',
    totalQuestions: 160, totalMarks: 400, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('rose'), iconBg: 'from-rose-500 to-pink-600',
    subjects: [
      { subject: 'General Hindi (40 Questions, 100 Marks)', topics: [
        { topic: 'व्याकरण (संधि, समास, उपसर्ग, प्रत्यय)', questions: '10-14', weightage: 30, trend: 'high' },
        { topic: 'विलोम, पर्यायवाची, अनेकार्थी शब्द', questions: '8-10', weightage: 22, trend: 'high' },
        { topic: 'मुहावरे एवं लोकोक्तियाँ', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'अपठित गद्यांश / पद्यांश', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'वाक्य शुद्धि एवं रिक्त स्थान', questions: '4-6', weightage: 16, trend: 'medium' },
      ]},
      { subject: 'General Knowledge (40 Questions, 100 Marks)', topics: [
        { topic: 'Indian History & Culture', questions: '6-10', weightage: 22, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'Indian & UP Geography', questions: '5-8', weightage: 18, trend: 'medium' },
        { topic: 'Current Affairs (National & UP)', questions: '8-10', weightage: 25, trend: 'high' },
        { topic: 'General Science', questions: '4-6', weightage: 12, trend: 'medium' },
        { topic: 'UP Specific GK', questions: '2-3', weightage: 5, trend: 'high' },
      ]},
      { subject: 'Numerical & Mental Ability (40 Questions, 100 Marks)', topics: [
        { topic: 'Number System & Simplification', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'Percentage, Ratio, Profit/Loss', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'Time & Work, TSD, Train', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Algebra & Mensuration', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Tables, Graphs & DI', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Reasoning (Series, Analogy, Coding)', questions: '5-7', weightage: 18, trend: 'high' },
      ]},
      { subject: 'Mental Aptitude / IQ / Reasoning (40 Questions, 100 Marks)', topics: [
        { topic: 'Logical Reasoning & Critical Thinking', questions: '8-10', weightage: 22, trend: 'high' },
        { topic: 'Public Interest & Law & Order', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Crime Control & Rule of Law', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'Communal Harmony & Adaptability', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Professional Knowledge (Police)', questions: '5-7', weightage: 15, trend: 'high' },
        { topic: 'Basic Law (IPC, CrPC, Evidence Act)', questions: '4-6', weightage: 16, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  TNPSC Group 4
  // ══════════════════════════════════
  {
    exam: 'TNPSC Group 4', slug: 'tnpsc-group-4', paper: 'Combined Exam (2020-2026 Analysis)',
    totalQuestions: 200, totalMarks: 300, duration: '180 minutes', negativeMarking: 'No negative marking',
    ...c('amber'), iconBg: 'from-amber-500 to-yellow-600',
    subjects: [
      { subject: 'General Knowledge (75 Questions)', topics: [
        { topic: 'Indian History (Ancient, Medieval, Modern)', questions: '10-14', weightage: 18, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '8-12', weightage: 14, trend: 'high' },
        { topic: 'Geography (India & Tamil Nadu)', questions: '8-10', weightage: 12, trend: 'medium' },
        { topic: 'Economics & Indian Economy', questions: '6-8', weightage: 10, trend: 'medium' },
        { topic: 'General Science (Physics, Chemistry, Biology)', questions: '12-16', weightage: 20, trend: 'high' },
        { topic: 'Current Affairs', questions: '10-14', weightage: 16, trend: 'high' },
        { topic: 'Tamil Nadu History & Culture', questions: '5-8', weightage: 10, trend: 'high' },
      ]},
      { subject: 'Tamil Language (25 Questions)', topics: [
        { topic: 'Tamil Grammar (இலக்கணம்)', questions: '8-10', weightage: 35, trend: 'high' },
        { topic: 'Tamil Literature (இலக்கியம்)', questions: '5-7', weightage: 25, trend: 'medium' },
        { topic: 'Comprehension Passage', questions: '5-7', weightage: 25, trend: 'medium' },
        { topic: 'Translation & Vocabulary', questions: '3-5', weightage: 15, trend: 'low' },
      ]},
      { subject: 'Aptitude & Mental Ability (100 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '12-16', weightage: 15, trend: 'high' },
        { topic: 'Percentage, Ratio, Profit & Loss', questions: '10-14', weightage: 13, trend: 'high' },
        { topic: 'Time & Work, Time Speed Distance', questions: '8-12', weightage: 11, trend: 'medium' },
        { topic: 'Mensuration & Geometry', questions: '8-10', weightage: 10, trend: 'medium' },
        { topic: 'Algebra & Trigonometry', questions: '6-8', weightage: 8, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '8-12', weightage: 11, trend: 'high' },
        { topic: 'Logical Reasoning (Analogy, Series)', questions: '12-16', weightage: 16, trend: 'high' },
        { topic: 'Coding-Decoding, Blood Relations', questions: '8-12', weightage: 10, trend: 'medium' },
        { topic: 'Direction & Ranking, Puzzle', questions: '4-6', weightage: 6, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  UP Police Constable
  // ══════════════════════════════════
  {
    exam: 'UP Police Constable', slug: 'up-police-constable', paper: 'Written Exam (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 300, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('red'), iconBg: 'from-red-500 to-rose-600',
    subjects: [
      { subject: 'General Knowledge (38 Questions)', topics: [
        { topic: 'Indian History & Freedom Struggle', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '5-7', weightage: 16, trend: 'high' },
        { topic: 'Geography (India & UP)', questions: '5-7', weightage: 14, trend: 'medium' },
        { topic: 'General Science', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'Current Affairs (National & UP)', questions: '8-10', weightage: 24, trend: 'high' },
        { topic: 'UP Specific GK', questions: '3-4', weightage: 10, trend: 'high' },
      ]},
      { subject: 'Hindi Language (37 Questions)', topics: [
        { topic: 'व्याकरण (संधि, समास, कारक)', questions: '10-12', weightage: 30, trend: 'high' },
        { topic: 'विलोम, पर्यायवाची, अनेकार्थी', questions: '8-10', weightage: 24, trend: 'high' },
        { topic: 'मुहावरे एवं लोकोक्तियाँ', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'अपठित गद्यांश', questions: '5-7', weightage: 18, trend: 'medium' },
        { topic: 'वाक्य शुद्धि एवं रिक्त स्थान', questions: '4-5', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'Numerical Ability (38 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '6-8', weightage: 18, trend: 'high' },
        { topic: 'Percentage, Ratio, Profit & Loss', questions: '6-8', weightage: 20, trend: 'high' },
        { topic: 'Time & Work, Time Speed Distance', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Mensuration & Geometry', questions: '4-6', weightage: 14, trend: 'medium' },
        { topic: 'Algebra (Equations, Surds)', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Data Interpretation (Tables, Graphs)', questions: '5-7', weightage: 22, trend: 'high' },
      ]},
      { subject: 'Mental Ability / Reasoning (37 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '6-8', weightage: 20, trend: 'high' },
        { topic: 'Series (Number, Letter, Figure)', questions: '6-8', weightage: 20, trend: 'high' },
        { topic: 'Coding-Decoding', questions: '4-5', weightage: 14, trend: 'medium' },
        { topic: 'Direction & Distance', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Blood Relations & Ranking', questions: '3-4', weightage: 10, trend: 'medium' },
        { topic: 'Venn Diagram, Mirror Image, Puzzle', questions: '5-7', weightage: 24, trend: 'high' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  Rajasthan Police Constable
  // ══════════════════════════════════
  {
    exam: 'Rajasthan Police Constable', slug: 'rajasthan-police', paper: 'Written Exam (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 75, duration: '120 minutes', negativeMarking: 'No negative marking',
    ...c('orange'), iconBg: 'from-orange-500 to-amber-600',
    subjects: [
      { subject: 'General Knowledge (60 Questions)', topics: [
        { topic: 'Indian History & Culture', questions: '8-10', weightage: 15, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '6-8', weightage: 12, trend: 'high' },
        { topic: 'Geography (India & World)', questions: '5-7', weightage: 10, trend: 'medium' },
        { topic: 'General Science', questions: '8-10', weightage: 15, trend: 'high' },
        { topic: 'Current Affairs', questions: '8-10', weightage: 16, trend: 'high' },
        { topic: 'Economy & Banking', questions: '4-6', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'Rajasthan GK (20 Questions)', topics: [
        { topic: 'Rajasthan History & Culture', questions: '6-8', weightage: 35, trend: 'high' },
        { topic: 'Rajasthan Geography & Resources', questions: '4-6', weightage: 25, trend: 'high' },
        { topic: 'Rajasthan Polity & Administration', questions: '3-4', weightage: 20, trend: 'medium' },
        { topic: 'Rajasthan Current Affairs & Schemes', questions: '3-4', weightage: 20, trend: 'high' },
      ]},
      { subject: 'Reasoning & Logic (35 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '6-8', weightage: 20, trend: 'high' },
        { topic: 'Series (Number, Letter, Figure)', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'Coding-Decoding & Direction', questions: '5-7', weightage: 18, trend: 'medium' },
        { topic: 'Blood Relations & Ranking', questions: '3-5', weightage: 12, trend: 'medium' },
        { topic: 'Venn Diagram & Syllogism', questions: '4-6', weightage: 16, trend: 'medium' },
        { topic: 'Puzzles & Pattern (Dice, Cube)', questions: '4-6', weightage: 16, trend: 'medium' },
      ]},
      { subject: 'Hindi Language (35 Questions)', topics: [
        { topic: 'व्याकरण (संधि, समास, कारक, उपसर्ग)', questions: '10-12', weightage: 30, trend: 'high' },
        { topic: 'विलोम, पर्यायवाची, अनेकार्थी शब्द', questions: '6-8', weightage: 22, trend: 'high' },
        { topic: 'मुहावरे एवं लोकोक्तियाँ', questions: '4-6', weightage: 16, trend: 'medium' },
        { topic: 'अपठित गद्यांश / पद्यांश', questions: '5-7', weightage: 18, trend: 'medium' },
        { topic: 'वाक्य शुद्धि एवं रिक्त स्थान', questions: '4-5', weightage: 14, trend: 'medium' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  BPSC Teacher TRE
  // ══════════════════════════════════
  {
    exam: 'BPSC Teacher TRE', slug: 'bpsc-tre', paper: 'Teacher Recruitment Exam (2022-2026 Analysis)',
    totalQuestions: 150, totalMarks: 150, duration: '150 minutes', negativeMarking: 'No negative marking',
    ...c('teal'), iconBg: 'from-teal-500 to-cyan-600',
    subjects: [
      { subject: 'Language (Hindi/Urdu/English/Bengali) (30 Questions)', topics: [
        { topic: 'Grammar & Syntax', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Comprehension & Passage', questions: '7-9', weightage: 28, trend: 'high' },
        { topic: 'Vocabulary & Word Usage', questions: '5-7', weightage: 22, trend: 'medium' },
        { topic: 'Sentence Correction & Translation', questions: '4-6', weightage: 20, trend: 'medium' },
      ]},
      { subject: 'General Knowledge (30 Questions)', topics: [
        { topic: 'Indian History & Bihar History', questions: '6-8', weightage: 22, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '5-7', weightage: 18, trend: 'high' },
        { topic: 'General Science', questions: '5-7', weightage: 18, trend: 'medium' },
        { topic: 'Current Affairs (National & Bihar)', questions: '6-8', weightage: 24, trend: 'high' },
        { topic: 'Bihar Geography & Economy', questions: '4-6', weightage: 18, trend: 'medium' },
      ]},
      { subject: 'Subject Knowledge (60 Questions)', topics: [
        { topic: 'Core Subject Content (As per TGT/PGT)', questions: '25-30', weightage: 48, trend: 'high' },
        { topic: 'Subject Pedagogy & Teaching Methods', questions: '12-15', weightage: 22, trend: 'high' },
        { topic: 'Curriculum & Assessment Techniques', questions: '8-10', weightage: 16, trend: 'medium' },
        { topic: 'Research & Innovation in Subject', questions: '5-8', weightage: 14, trend: 'medium' },
      ]},
      { subject: 'Pedagogy & Child Development (30 Questions)', topics: [
        { topic: 'Child Development & Psychology', questions: '8-10', weightage: 30, trend: 'high' },
        { topic: 'Teaching-Learning Process', questions: '6-8', weightage: 24, trend: 'high' },
        { topic: 'Inclusive Education & Special Needs', questions: '5-7', weightage: 20, trend: 'medium' },
        { topic: 'Assessment & Evaluation', questions: '4-6', weightage: 16, trend: 'medium' },
        { topic: 'Right to Education (RTE) Act', questions: '2-3', weightage: 10, trend: 'low' },
      ]},
    ],
  },

  // ══════════════════════════════════
  //  Supreme Court JCA
  // ══════════════════════════════════
  {
    exam: 'Supreme Court JCA', slug: 'supreme-court-jca', paper: 'Junior Court Assistant Exam (2022-2026 Analysis)',
    totalQuestions: 100, totalMarks: 100, duration: '120 minutes', negativeMarking: '0.25 per wrong answer',
    ...c('violet'), iconBg: 'from-violet-500 to-purple-600',
    subjects: [
      { subject: 'General Knowledge (25 Questions)', topics: [
        { topic: 'Indian History & Culture', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Indian Polity & Constitution', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Geography & General Science', questions: '4-6', weightage: 18, trend: 'medium' },
        { topic: 'Current Affairs & Legal Awareness', questions: '6-8', weightage: 28, trend: 'high' },
        { topic: 'Economy & Static GK', questions: '2-4', weightage: 10, trend: 'medium' },
      ]},
      { subject: 'English Language (25 Questions)', topics: [
        { topic: 'Reading Comprehension', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Grammar & Sentence Correction', questions: '5-7', weightage: 25, trend: 'high' },
        { topic: 'Vocabulary (Synonyms, Antonyms)', questions: '4-5', weightage: 18, trend: 'medium' },
        { topic: 'Cloze Test & Fill in the Blanks', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Idioms, Phrases & One Word Substitution', questions: '3-4', weightage: 16, trend: 'medium' },
      ]},
      { subject: 'Arithmetic / Numerical Ability (25 Questions)', topics: [
        { topic: 'Number System & Simplification', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Percentage, Ratio, Profit & Loss', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Time & Work, Time Speed Distance', questions: '3-5', weightage: 16, trend: 'medium' },
        { topic: 'Mensuration & Geometry', questions: '3-4', weightage: 14, trend: 'medium' },
        { topic: 'Data Interpretation', questions: '4-6', weightage: 22, trend: 'high' },
      ]},
      { subject: 'Reasoning & Logical Ability (25 Questions)', topics: [
        { topic: 'Analogy & Classification', questions: '5-7', weightage: 24, trend: 'high' },
        { topic: 'Series (Number, Letter, Figure)', questions: '4-6', weightage: 20, trend: 'high' },
        { topic: 'Coding-Decoding & Direction', questions: '4-5', weightage: 18, trend: 'medium' },
        { topic: 'Blood Relations & Ranking', questions: '3-4', weightage: 14, trend: 'medium' },
        { topic: 'Syllogism, Venn Diagram & Puzzle', questions: '4-6', weightage: 24, trend: 'high' },
      ]},
    ],
  },
];

export function getExamBySlug(slug: string): ExamAnalysis | undefined {
  return EXAM_DATA.find((e) => e.slug === slug);
}
