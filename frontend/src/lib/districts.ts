/** Indian states and their major districts for programmatic SEO pages */

export interface StateInfo {
  name: string;
  nameHi: string;
  slug: string;
  recruitmentBodies: string[];
  districts: { name: string; nameHi: string; slug: string }[];
}

export const STATES: StateInfo[] = [
  {
    name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश', slug: 'uttar-pradesh',
    recruitmentBodies: ['UPPSC', 'UPSSSC', 'UP Police', 'UPSESSB'],
    districts: [
      { name: 'Lucknow', nameHi: 'लखनऊ', slug: 'lucknow' },
      { name: 'Noida', nameHi: 'नोएडा', slug: 'noida' },
      { name: 'Allahabad (Prayagraj)', nameHi: 'प्रयागराज', slug: 'prayagraj' },
      { name: 'Varanasi', nameHi: 'वाराणसी', slug: 'varanasi' },
      { name: 'Kanpur', nameHi: 'कानपुर', slug: 'kanpur' },
      { name: 'Agra', nameHi: 'आगरा', slug: 'agra' },
      { name: 'Meerut', nameHi: 'मेरठ', slug: 'meerut' },
      { name: 'Gorakhpur', nameHi: 'गोरखपुर', slug: 'gorakhpur' },
      { name: 'Ghaziabad', nameHi: 'गाजियाबाद', slug: 'ghaziabad' },
      { name: 'Bareilly', nameHi: 'बरेली', slug: 'bareilly' },
    ],
  },
  {
    name: 'Bihar', nameHi: 'बिहार', slug: 'bihar',
    recruitmentBodies: ['BPSC', 'BSSC', 'CSBC', 'BTSC'],
    districts: [
      { name: 'Patna', nameHi: 'पटना', slug: 'patna' },
      { name: 'Gaya', nameHi: 'गया', slug: 'gaya' },
      { name: 'Muzaffarpur', nameHi: 'मुजफ्फरपुर', slug: 'muzaffarpur' },
      { name: 'Bhagalpur', nameHi: 'भागलपुर', slug: 'bhagalpur' },
      { name: 'Darbhanga', nameHi: 'दरभंगा', slug: 'darbhanga' },
      { name: 'Purnia', nameHi: 'पूर्णिया', slug: 'purnia' },
    ],
  },
  {
    name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश', slug: 'madhya-pradesh',
    recruitmentBodies: ['MPPSC', 'MPESB (Vyapam)', 'MP Police'],
    districts: [
      { name: 'Bhopal', nameHi: 'भोपाल', slug: 'bhopal' },
      { name: 'Indore', nameHi: 'इंदौर', slug: 'indore' },
      { name: 'Jabalpur', nameHi: 'जबलपुर', slug: 'jabalpur' },
      { name: 'Gwalior', nameHi: 'ग्वालियर', slug: 'gwalior' },
      { name: 'Ujjain', nameHi: 'उज्जैन', slug: 'ujjain' },
    ],
  },
  {
    name: 'Rajasthan', nameHi: 'राजस्थान', slug: 'rajasthan',
    recruitmentBodies: ['RPSC', 'RSMSSB', 'Rajasthan Police'],
    districts: [
      { name: 'Jaipur', nameHi: 'जयपुर', slug: 'jaipur' },
      { name: 'Jodhpur', nameHi: 'जोधपुर', slug: 'jodhpur' },
      { name: 'Udaipur', nameHi: 'उदयपुर', slug: 'udaipur' },
      { name: 'Kota', nameHi: 'कोटा', slug: 'kota' },
      { name: 'Ajmer', nameHi: 'अजमेर', slug: 'ajmer' },
    ],
  },
  {
    name: 'Maharashtra', nameHi: 'महाराष्ट्र', slug: 'maharashtra',
    recruitmentBodies: ['MPSC', 'Maharashtra Police', 'ZP Bharti'],
    districts: [
      { name: 'Mumbai', nameHi: 'मुंबई', slug: 'mumbai' },
      { name: 'Pune', nameHi: 'पुणे', slug: 'pune' },
      { name: 'Nagpur', nameHi: 'नागपुर', slug: 'nagpur' },
      { name: 'Nashik', nameHi: 'नासिक', slug: 'nashik' },
      { name: 'Aurangabad', nameHi: 'औरंगाबाद', slug: 'aurangabad' },
    ],
  },
  {
    name: 'West Bengal', nameHi: 'पश्चिम बंगाल', slug: 'west-bengal',
    recruitmentBodies: ['WBPSC', 'WBSSC', 'WB Police'],
    districts: [
      { name: 'Kolkata', nameHi: 'कोलकाता', slug: 'kolkata' },
      { name: 'Howrah', nameHi: 'हावड़ा', slug: 'howrah' },
      { name: 'Siliguri', nameHi: 'सिलीगुड़ी', slug: 'siliguri' },
    ],
  },
  {
    name: 'Tamil Nadu', nameHi: 'तमिलनाडु', slug: 'tamil-nadu',
    recruitmentBodies: ['TNPSC', 'TN Police', 'TRB'],
    districts: [
      { name: 'Chennai', nameHi: 'चेन्नई', slug: 'chennai' },
      { name: 'Coimbatore', nameHi: 'कोयंबटूर', slug: 'coimbatore' },
      { name: 'Madurai', nameHi: 'मदुरै', slug: 'madurai' },
    ],
  },
  {
    name: 'Karnataka', nameHi: 'कर्नाटक', slug: 'karnataka',
    recruitmentBodies: ['KPSC', 'Karnataka Police', 'KEA'],
    districts: [
      { name: 'Bangalore', nameHi: 'बैंगलोर', slug: 'bangalore' },
      { name: 'Mysore', nameHi: 'मैसूर', slug: 'mysore' },
      { name: 'Hubli', nameHi: 'हुबली', slug: 'hubli' },
    ],
  },
  {
    name: 'Gujarat', nameHi: 'गुजरात', slug: 'gujarat',
    recruitmentBodies: ['GPSC', 'GSSSB', 'Gujarat Police'],
    districts: [
      { name: 'Ahmedabad', nameHi: 'अहमदाबाद', slug: 'ahmedabad' },
      { name: 'Surat', nameHi: 'सूरत', slug: 'surat' },
      { name: 'Vadodara', nameHi: 'वडोदरा', slug: 'vadodara' },
      { name: 'Rajkot', nameHi: 'राजकोट', slug: 'rajkot' },
    ],
  },
  {
    name: 'Telangana', nameHi: 'तेलंगाना', slug: 'telangana',
    recruitmentBodies: ['TSPSC', 'TS Police'],
    districts: [
      { name: 'Hyderabad', nameHi: 'हैदराबाद', slug: 'hyderabad' },
      { name: 'Warangal', nameHi: 'वारंगल', slug: 'warangal' },
    ],
  },
  {
    name: 'Andhra Pradesh', nameHi: 'आंध्र प्रदेश', slug: 'andhra-pradesh',
    recruitmentBodies: ['APPSC', 'AP Police'],
    districts: [
      { name: 'Visakhapatnam', nameHi: 'विशाखापट्टनम', slug: 'visakhapatnam' },
      { name: 'Vijayawada', nameHi: 'विजयवाड़ा', slug: 'vijayawada' },
      { name: 'Tirupati', nameHi: 'तिरुपति', slug: 'tirupati' },
    ],
  },
  {
    name: 'Punjab', nameHi: 'पंजाब', slug: 'punjab',
    recruitmentBodies: ['PPSC', 'PSSSB', 'Punjab Police'],
    districts: [
      { name: 'Chandigarh', nameHi: 'चंडीगढ़', slug: 'chandigarh' },
      { name: 'Ludhiana', nameHi: 'लुधियाना', slug: 'ludhiana' },
      { name: 'Amritsar', nameHi: 'अमृतसर', slug: 'amritsar' },
    ],
  },
  {
    name: 'Haryana', nameHi: 'हरियाणा', slug: 'haryana',
    recruitmentBodies: ['HPSC', 'HSSC', 'Haryana Police'],
    districts: [
      { name: 'Gurugram', nameHi: 'गुरुग्राम', slug: 'gurugram' },
      { name: 'Faridabad', nameHi: 'फरीदाबाद', slug: 'faridabad' },
      { name: 'Hisar', nameHi: 'हिसार', slug: 'hisar' },
      { name: 'Rohtak', nameHi: 'रोहतक', slug: 'rohtak' },
    ],
  },
  {
    name: 'Jharkhand', nameHi: 'झारखंड', slug: 'jharkhand',
    recruitmentBodies: ['JPSC', 'JSSC', 'Jharkhand Police'],
    districts: [
      { name: 'Ranchi', nameHi: 'रांची', slug: 'ranchi' },
      { name: 'Jamshedpur', nameHi: 'जमशेदपुर', slug: 'jamshedpur' },
      { name: 'Dhanbad', nameHi: 'धनबाद', slug: 'dhanbad' },
    ],
  },
  {
    name: 'Uttarakhand', nameHi: 'उत्तराखंड', slug: 'uttarakhand',
    recruitmentBodies: ['UKPSC', 'UKSSSC', 'Uttarakhand Police'],
    districts: [
      { name: 'Dehradun', nameHi: 'देहरादून', slug: 'dehradun' },
      { name: 'Haridwar', nameHi: 'हरिद्वार', slug: 'haridwar' },
      { name: 'Nainital', nameHi: 'नैनीताल', slug: 'nainital' },
    ],
  },
  {
    name: 'Chhattisgarh', nameHi: 'छत्तीसगढ़', slug: 'chhattisgarh',
    recruitmentBodies: ['CGPSC', 'CG Vyapam', 'CG Police'],
    districts: [
      { name: 'Raipur', nameHi: 'रायपुर', slug: 'raipur' },
      { name: 'Bilaspur', nameHi: 'बिलासपुर', slug: 'bilaspur' },
    ],
  },
  {
    name: 'Odisha', nameHi: 'ओडिशा', slug: 'odisha',
    recruitmentBodies: ['OPSC', 'OSSSC', 'Odisha Police'],
    districts: [
      { name: 'Bhubaneswar', nameHi: 'भुवनेश्वर', slug: 'bhubaneswar' },
      { name: 'Cuttack', nameHi: 'कटक', slug: 'cuttack' },
    ],
  },
  {
    name: 'Assam', nameHi: 'असम', slug: 'assam',
    recruitmentBodies: ['APSC', 'Assam Police', 'DEE Assam'],
    districts: [
      { name: 'Guwahati', nameHi: 'गुवाहाटी', slug: 'guwahati' },
      { name: 'Dibrugarh', nameHi: 'डिब्रूगढ़', slug: 'dibrugarh' },
    ],
  },
  {
    name: 'Kerala', nameHi: 'केरल', slug: 'kerala',
    recruitmentBodies: ['Kerala PSC'],
    districts: [
      { name: 'Thiruvananthapuram', nameHi: 'तिरुवनंतपुरम', slug: 'thiruvananthapuram' },
      { name: 'Kochi', nameHi: 'कोच्चि', slug: 'kochi' },
    ],
  },
];

/** Get state info by slug */
export function getState(slug: string): StateInfo | undefined {
  return STATES.find(s => s.slug === slug);
}

/** Get district info */
export function getDistrict(stateSlug: string, districtSlug: string) {
  const state = getState(stateSlug);
  if (!state) return undefined;
  const district = state.districts.find(d => d.slug === districtSlug);
  if (!district) return undefined;
  return { state, district };
}

/** Generate all state+district combinations for static generation */
export function getAllDistrictParams() {
  const params: { state: string; district: string }[] = [];
  for (const state of STATES) {
    for (const district of state.districts) {
      params.push({ state: state.slug, district: district.slug });
    }
  }
  return params;
}
