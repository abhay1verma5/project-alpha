// Landing pages by education level. These are the highest-volume searches in the
// sarkari space ("10th pass govt job", "12th pass sarkari naukri") and the least
// served: aggregators bury them under ads. Each page is a real DB filter.
export const LEVELS: Record<string, { title: string; hi: string; q: string; blurb: string }> = {
  '10th-pass': { title: '10th Pass Government Jobs', hi: '10वीं पास सरकारी नौकरी', q: '10th', blurb: 'Constable, Group D, MTS, Peon, Driver, Postman/GDS and apprenticeship posts that need only Class 10.' },
  '12th-pass': { title: '12th Pass Government Jobs', hi: '12वीं पास सरकारी नौकरी', q: '12th', blurb: 'CHSL, Stenographer, Police Constable, Railway NTPC (UG), Lekhpal, Patwari and Group C clerical posts.' },
  'iti': { title: 'ITI Government Jobs', hi: 'ITI सरकारी नौकरी', q: 'ITI', blurb: 'Technician, ALP, Fitter, Electrician, Apprentice and PSU trade posts for ITI certificate holders.' },
  'diploma': { title: 'Diploma / Polytechnic Government Jobs', hi: 'डिप्लोमा सरकारी नौकरी', q: 'Diploma', blurb: 'Junior Engineer (SSC JE, RRB JE, state PWD), Technical Assistant and PSU diploma trainee posts.' },
  'graduate': { title: 'Graduate Government Jobs', hi: 'ग्रेजुएट सरकारी नौकरी', q: 'Graduate', blurb: 'SSC CGL, Bank PO/Clerk, UPSC, State PSC, SI, Teacher and officer-level posts for any graduate.' },
  'nursing': { title: 'Nursing & Paramedical Government Jobs', hi: 'नर्सिंग सरकारी नौकरी', q: 'Nursing', blurb: 'Staff Nurse, ANM, GNM, Lab Technician, Pharmacist and NHM contractual posts.' },
  'engineering': { title: 'Engineering Government Jobs', hi: 'इंजीनियरिंग सरकारी नौकरी', q: 'B.Tech', blurb: 'GATE-based PSU recruitment, ISRO, DRDO, Railway, state engineering services and Assistant Engineer posts.' },
  'teacher': { title: 'Teaching Government Jobs (PRT, TGT, PGT)', hi: 'शिक्षक सरकारी नौकरी', q: 'B.Ed', blurb: 'KVS, NVS, DSSSB, state TET-based teacher recruitment, Assistant Professor and lecturer posts.' },
};

