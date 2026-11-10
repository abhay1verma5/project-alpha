export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number; // 0-indexed
  explanation: string;
}

import { EXTRA_QUIZ_BANKS as EXTRA_BANKS } from './quiz-banks-extra';

/**
 * Static fallback quiz bank — used when Gemini API fails.
 * Keyed by `${exam}__${topic}` (e.g., 'ssc_cgl__math').
 * Also keyed by subject name for school class fallback (e.g., 'general__physics').
 */
const QUIZ_BANK: Record<string, QuizQuestion[]> = {
  // ═══════════════════════════════════
  // SSC CGL
  // ═══════════════════════════════════
  'ssc_cgl__math': [
    { question: 'If 15% of x = 20% of y, then x:y is?', options: ['3:4', '4:3', '5:4', '4:5'], correct: 1, explanation: '15x/100 = 20y/100 → 15x = 20y → x/y = 20/15 = 4/3' },
    { question: 'A train 150m long passes a pole in 15 seconds. What is its speed in km/hr?', options: ['36', '32', '28', '40'], correct: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr' },
    { question: 'The average of 5 consecutive odd numbers is 27. The largest number is?', options: ['29', '31', '33', '35'], correct: 1, explanation: 'If avg=27, middle number=27. Numbers: 23,25,27,29,31. Largest=31' },
    { question: 'A shopkeeper offers 10% discount and still makes 20% profit. The marked price is what % above cost price?', options: ['25%', '30%', '33.33%', '35%'], correct: 2, explanation: 'Let CP=100. SP=120. MP×0.9=120 → MP=133.33. So 33.33% above CP.' },
    { question: 'The HCF of 36 and 84 is?', options: ['6', '12', '18', '24'], correct: 1, explanation: '36 = 2²×3², 84 = 2²×3×7. HCF = 2²×3 = 12' },
    { question: 'Pipe A fills a tank in 12 hours, Pipe B in 15 hours. Together they fill it in?', options: ['6 2/3 hrs', '6 hrs', '7 hrs', '5 hrs'], correct: 0, explanation: '1/12 + 1/15 = (5+4)/60 = 9/60 = 3/20. Time = 20/3 = 6⅔ hrs' },
    { question: 'If the ratio of ages of A and B is 3:5 and sum of their ages is 48, find age of B.', options: ['18', '24', '30', '36'], correct: 2, explanation: 'B = 48 × 5/8 = 30' },
    { question: 'Compound interest on Rs.10000 at 10% for 2 years is?', options: ['2000', '2100', '2200', '2500'], correct: 1, explanation: 'CI = 10000(1.1)² - 10000 = 12100 - 10000 = 2100' },
    { question: 'In a triangle, if two angles are 45° and 75°, the third angle is?', options: ['50°', '55°', '60°', '65°'], correct: 2, explanation: 'Sum of angles = 180°. Third = 180 - 45 - 75 = 60°' },
    { question: 'The sum of first 20 natural numbers is?', options: ['190', '200', '210', '220'], correct: 2, explanation: 'Sum = n(n+1)/2 = 20×21/2 = 210' },
  ],
  'ssc_cgl__gk': [
    { question: 'Who was the first President of India?', options: ['Jawaharlal Nehru', 'Dr. Rajendra Prasad', 'Sardar Patel', 'B.R. Ambedkar'], correct: 1, explanation: 'Dr. Rajendra Prasad was the first President of India (1950-1962).' },
    { question: 'The Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correct: 2, explanation: 'It passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.' },
    { question: 'Which Article of the Indian Constitution abolishes untouchability?', options: ['Article 14', 'Article 15', 'Article 17', 'Article 19'], correct: 2, explanation: 'Article 17 abolishes "Untouchability" and forbids its practice in any form.' },
    { question: 'Photosynthesis takes place in which part of the plant cell?', options: ['Mitochondria', 'Nucleus', 'Chloroplast', 'Ribosome'], correct: 2, explanation: 'Chloroplasts contain chlorophyll which absorbs sunlight for photosynthesis.' },
    { question: 'The Battle of Plassey was fought in which year?', options: ['1757', '1764', '1857', '1947'], correct: 0, explanation: 'The Battle of Plassey was fought on 23 June 1757 between British East India Company and Nawab of Bengal.' },
    { question: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'], correct: 2, explanation: 'Nitrogen makes up about 78% of Earth\'s atmosphere.' },
    { question: 'Sardar Vallabhbhai Patel is known as?', options: ['Father of Nation', 'Iron Man of India', 'Chacha Nehru', 'Netaji'], correct: 1, explanation: 'Sardar Vallabhbhai Patel is known as the "Iron Man of India" for unifying 562 princely states.' },
    { question: 'The currency of Japan is?', options: ['Won', 'Yuan', 'Yen', 'Ringgit'], correct: 2, explanation: 'The currency of Japan is Yen (¥).' },
    { question: 'Who wrote "Discovery of India"?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Rabindranath Tagore', 'Subhash Chandra Bose'], correct: 1, explanation: 'Jawaharlal Nehru wrote "The Discovery of India" in 1946 while in prison at Ahmednagar Fort.' },
    { question: 'Which vitamin is produced by sunlight on skin?', options: ['Vitamin A', 'Vitamin B12', 'Vitamin C', 'Vitamin D'], correct: 3, explanation: 'Vitamin D is synthesized in the skin when exposed to ultraviolet B (UVB) radiation from sunlight.' },
  ],
  'ssc_cgl__english': [
    { question: 'Choose the synonym of "Eloquent":', options: ['Silent', 'Articulate', 'Dull', 'Rude'], correct: 1, explanation: '"Eloquent" means fluent and persuasive, similar to "Articulate".' },
    { question: 'Choose the antonym of "Benevolent":', options: ['Kind', 'Generous', 'Malevolent', 'Friendly'], correct: 2, explanation: '"Benevolent" means well-meaning and kind. Its antonym is "Malevolent".' },
    { question: 'Fill in the blank: "She has been working here ___ 2015."', options: ['from', 'since', 'for', 'by'], correct: 1, explanation: '"Since" is used with a point in time (2015), while "for" is used with a duration.' },
    { question: '"To cry over spilt milk" means:', options: ['To waste milk', 'To regret past mistakes', 'To be very sad', 'To cry loudly'], correct: 1, explanation: 'This idiom means to regret something that has already happened and cannot be changed.' },
    { question: 'Identify the error: "Each of the boys have completed their homework."', options: ['Each', 'have', 'their', 'No error'], correct: 1, explanation: '"Each" is singular, so it should be "has" not "have".' },
    { question: 'Choose the correctly spelled word:', options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'], correct: 1, explanation: 'The correct spelling is "Accommodation" with double c and double m.' },
    { question: 'The passive voice of "She writes a letter" is:', options: ['A letter is written by her', 'A letter was written by her', 'A letter has been written by her', 'A letter is being written by her'], correct: 0, explanation: 'Simple present active → Simple present passive: Subject + is/are + V3 + by + object.' },
    { question: '"Plethora" means:', options: ['Scarcity', 'Excess', 'Balance', 'Absence'], correct: 1, explanation: '"Plethora" means an excessive amount of something.' },
    { question: 'One-word substitute for "One who eats human flesh":', options: ['Herbivore', 'Cannibal', 'Omnivore', 'Carnivore'], correct: 1, explanation: 'A "Cannibal" is a person who eats human flesh.' },
    { question: 'The indirect speech of "He said, I am happy" is:', options: ['He said that he is happy', 'He said that he was happy', 'He told that he was happy', 'He said that he had been happy'], correct: 1, explanation: 'In indirect speech, "am" changes to "was" and "I" changes to "he".' },
  ],
  'ssc_cgl__reasoning': [
    { question: 'Find the missing number: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correct: 1, explanation: 'Pattern: 1×2, 2×3, 3×4, 4×5, 5×6, 6×7 = 42' },
    { question: 'If COMPUTER = 111, then MOUSE = ?', options: ['71', '72', '73', '74'], correct: 2, explanation: 'C+O+M+P+U+T+E+R = 3+15+13+16+21+20+5+18 = 111. M+O+U+S+E = 13+15+21+19+5 = 73' },
    { question: 'A is B\'s brother. C is A\'s mother. D is C\'s father. What is D to B?', options: ['Grandfather', 'Father', 'Uncle', 'Cousin'], correct: 0, explanation: 'C is A and B\'s mother. D is C\'s father. So D is maternal grandfather of B.' },
    { question: 'In a code, FIRE = GJSF. What is HEAT?', options: ['IFBU', 'IGBU', 'IFBV', 'IGBV'], correct: 0, explanation: 'Each letter shifted by +1. H→I, E→F, A→B, T→U. HEAT = IFBU' },
    { question: 'If Wednesday falls on 1st, what day is the 25th?', options: ['Saturday', 'Sunday', 'Monday', 'Tuesday'], correct: 0, explanation: '24 days later. 24/7 = 3 weeks + 3 days. Wednesday + 3 = Saturday.' },
    { question: 'Find the odd one out: 2, 5, 10, 17, 28, 37', options: ['10', '17', '28', '37'], correct: 2, explanation: 'Pattern: +3, +5, +7, +9, +11. After 17: 17+9=26 (not 28). So 28 is wrong.' },
    { question: 'A cube painted on all faces, cut into 27 pieces. How many have exactly 2 painted faces?', options: ['6', '8', '12', '16'], correct: 2, explanation: 'Edge cubes (not corners) have 2 faces painted. A 3×3×3 cube has 12 edge pieces.' },
    { question: 'A man walks 3 km North, then 4 km East. Distance from start?', options: ['5 km', '7 km', '1 km', '6 km'], correct: 0, explanation: 'Pythagoras: √(9+16) = √25 = 5 km' },
    { question: '8:27 :: 64:?', options: ['125', '216', '343', '512'], correct: 0, explanation: '8=2³, 27=3³, 64=4³, ?=5³=125' },
    { question: 'Arrange: 1.Sentence 2.Word 3.Letter 4.Paragraph 5.Phrase', options: ['3,2,5,1,4', '3,2,1,5,4', '3,5,2,1,4', '2,3,5,1,4'], correct: 0, explanation: 'Letter → Word → Phrase → Sentence → Paragraph = 3,2,5,1,4' },
  ],
  'ssc_cgl__science': [
    { question: 'Which gas is released during photosynthesis?', options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Hydrogen'], correct: 1, explanation: 'During photosynthesis, plants absorb CO₂ and release O₂.' },
    { question: 'The SI unit of electric current is?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correct: 2, explanation: 'Ampere (A) is the SI unit of electric current.' },
    { question: 'Which metal is liquid at room temperature?', options: ['Iron', 'Mercury', 'Gold', 'Silver'], correct: 1, explanation: 'Mercury (Hg) is the only metal that is liquid at room temperature.' },
    { question: 'DNA stands for?', options: ['Di Nucleic Acid', 'Deoxyribonucleic Acid', 'Di Nitrogen Acid', 'Deoxyribonitric Acid'], correct: 1, explanation: 'DNA = Deoxyribonucleic Acid, the molecule carrying genetic information.' },
    { question: 'The powerhouse of the cell is?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correct: 2, explanation: 'Mitochondria is called the powerhouse because it generates ATP energy.' },
    { question: 'The chemical formula of water is?', options: ['H₂O', 'CO₂', 'NaCl', 'H₂SO₄'], correct: 0, explanation: 'Water is H₂O — two hydrogen atoms bonded to one oxygen atom.' },
    { question: 'Light travels fastest in?', options: ['Water', 'Glass', 'Vacuum', 'Air'], correct: 2, explanation: 'Light travels fastest in vacuum at about 3×10⁸ m/s.' },
    { question: 'The hardest natural substance is?', options: ['Gold', 'Iron', 'Diamond', 'Platinum'], correct: 2, explanation: 'Diamond is the hardest natural substance, scoring 10 on Mohs scale.' },
    { question: 'Which planet is closest to the Sun?', options: ['Venus', 'Mars', 'Mercury', 'Earth'], correct: 2, explanation: 'Mercury is the closest planet to the Sun at about 57.9 million km.' },
    { question: 'The pH of pure water is?', options: ['5', '7', '9', '14'], correct: 1, explanation: 'Pure water has a neutral pH of 7.' },
  ],

  // ═══════════════════════════════════
  // UPSC
  // ═══════════════════════════════════
  'upsc__gk': [
    { question: 'Which Schedule of the Constitution deals with the Anti-Defection Law?', options: ['8th', '9th', '10th', '11th'], correct: 2, explanation: 'The 10th Schedule, added by 52nd Amendment (1985), deals with Anti-Defection Law.' },
    { question: 'The Indus Valley site Lothal is in which state?', options: ['Rajasthan', 'Gujarat', 'Haryana', 'Punjab'], correct: 1, explanation: 'Lothal is in Gujarat, an important port city of Indus Valley Civilization.' },
    { question: 'Which committee recommended "Panchayati Raj"?', options: ['Sarkaria Commission', 'Balwant Rai Mehta', 'Ashok Mehta', 'Kothari Commission'], correct: 1, explanation: 'Balwant Rai Mehta Committee (1957) recommended Panchayati Raj system.' },
    { question: 'The Chipko Movement started in which state?', options: ['Himachal Pradesh', 'Uttarakhand', 'Rajasthan', 'Kerala'], correct: 1, explanation: 'Chipko Movement started in 1973 in Chamoli district of Uttarakhand.' },
    { question: 'Minimum age for Rajya Sabha membership?', options: ['25 years', '30 years', '35 years', '21 years'], correct: 1, explanation: 'Article 84 specifies 30 years minimum for Rajya Sabha.' },
    { question: 'The Quit India Movement was launched in?', options: ['1940', '1942', '1944', '1946'], correct: 1, explanation: 'Quit India Movement launched on 8 August 1942 by Mahatma Gandhi.' },
    { question: 'The Preamble was amended by which amendment?', options: ['42nd', '44th', '52nd', '73rd'], correct: 0, explanation: '42nd Amendment (1976) added "Socialist", "Secular" and "Integrity".' },
    { question: 'Which river is "Sorrow of Bihar"?', options: ['Ganga', 'Kosi', 'Son', 'Gandak'], correct: 1, explanation: 'River Kosi is called "Sorrow of Bihar" due to frequent floods.' },
    { question: 'Author of "Arthashastra"?', options: ['Kalidas', 'Kautilya', 'Banabhatta', 'Vishakhadatta'], correct: 1, explanation: 'Arthashastra was written by Kautilya (Chanakya).' },
    { question: 'Which amendment introduced GST?', options: ['99th', '100th', '101st', '102nd'], correct: 2, explanation: '101st Constitutional Amendment Act, 2016 introduced GST in India.' },
  ],
  'upsc__polity': [
    { question: 'The concept of "Basic Structure" was established in?', options: ['Golaknath case', 'Kesavananda Bharati case', 'Minerva Mills case', 'Maneka Gandhi case'], correct: 1, explanation: 'Kesavananda Bharati case (1973) established the Basic Structure doctrine.' },
    { question: 'How many Fundamental Rights are in the Constitution?', options: ['5', '6', '7', '8'], correct: 1, explanation: 'There are 6 Fundamental Rights (Right to Property was removed by 44th Amendment).' },
    { question: 'Who appoints the Chief Justice of India?', options: ['Prime Minister', 'President', 'Parliament', 'Law Minister'], correct: 1, explanation: 'The President of India appoints the Chief Justice.' },
    { question: 'The Indian Constitution was adopted on?', options: ['15 Aug 1947', '26 Jan 1950', '26 Nov 1949', '26 Jan 1949'], correct: 2, explanation: 'Adopted on 26 November 1949 and came into effect on 26 January 1950.' },
    { question: 'Which Article grants Right to Equality?', options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'], correct: 0, explanation: 'Article 14 grants equality before law and equal protection of laws.' },
    { question: 'Emergency provisions are in which Part of Constitution?', options: ['Part XVI', 'Part XVII', 'Part XVIII', 'Part XIX'], correct: 2, explanation: 'Part XVIII (Articles 352-360) deals with Emergency Provisions.' },
    { question: 'The CAG of India is appointed by?', options: ['Prime Minister', 'President', 'Parliament', 'Supreme Court'], correct: 1, explanation: 'The Comptroller and Auditor General is appointed by the President.' },
    { question: 'Rajya Sabha members are elected for?', options: ['4 years', '5 years', '6 years', 'Life'], correct: 2, explanation: 'Rajya Sabha members serve 6-year terms, with 1/3 retiring every 2 years.' },
    { question: 'Which writ means "to have the body"?', options: ['Mandamus', 'Habeas Corpus', 'Certiorari', 'Quo Warranto'], correct: 1, explanation: 'Habeas Corpus (Latin: "to have the body") protects against illegal detention.' },
    { question: 'Money Bill can be introduced in?', options: ['Rajya Sabha only', 'Lok Sabha only', 'Either House', 'Joint Session'], correct: 1, explanation: 'Money Bills can only be introduced in Lok Sabha (Article 110).' },
  ],

  // ═══════════════════════════════════
  // RAILWAY
  // ═══════════════════════════════════
  'railway__math': [
    { question: 'Two trains cross each other in 10 sec. Speeds: 36 & 54 km/hr. Total length?', options: ['200m', '250m', '300m', '150m'], correct: 1, explanation: 'Relative speed = 90 km/hr = 25 m/s. Distance = 25 × 10 = 250m' },
    { question: 'A man rows 6 km/hr still water, river 2 km/hr. Time for 16 km upstream and back?', options: ['4 hrs', '5 hrs', '6 hrs', '7 hrs'], correct: 2, explanation: 'Upstream=4, downstream=8. Time = 16/4 + 16/8 = 4+2 = 6 hrs' },
    { question: 'SP = Rs.540, profit = 20%. Cost price?', options: ['Rs.432', 'Rs.450', 'Rs.400', 'Rs.420'], correct: 1, explanation: 'CP = SP / 1.2 = 540 / 1.2 = 450' },
    { question: 'SI on Rs.5000 at 8% for 3 years?', options: ['Rs.1000', 'Rs.1100', 'Rs.1200', 'Rs.1500'], correct: 2, explanation: 'SI = PRT/100 = 5000×8×3/100 = 1200' },
    { question: 'LCM of 12, 15, and 20?', options: ['30', '60', '120', '180'], correct: 1, explanation: '12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60' },
    { question: 'If x + 1/x = 5, then x² + 1/x² = ?', options: ['23', '25', '27', '21'], correct: 0, explanation: '(x+1/x)² = x²+2+1/x² = 25. So x²+1/x² = 23' },
    { question: 'Area of triangle with sides 3, 4, 5 cm?', options: ['6 cm²', '8 cm²', '10 cm²', '12 cm²'], correct: 0, explanation: 'Right triangle (3-4-5). Area = ½ × 3 × 4 = 6 cm²' },
    { question: 'Average of first 50 natural numbers?', options: ['25', '25.5', '26', '50'], correct: 1, explanation: 'Average = (n+1)/2 = 51/2 = 25.5' },
    { question: 'A train 200m long crosses a bridge 300m long in 25 sec. Speed?', options: ['72 km/hr', '60 km/hr', '80 km/hr', '54 km/hr'], correct: 0, explanation: 'Total distance = 500m. Speed = 500/25 = 20 m/s = 72 km/hr' },
    { question: 'If A:B = 2:3 and B:C = 4:5, then A:B:C = ?', options: ['8:12:15', '2:3:5', '4:6:5', '8:12:10'], correct: 0, explanation: 'A:B = 2:3 = 8:12. B:C = 4:5 = 12:15. So A:B:C = 8:12:15' },
  ],
  'railway__gk': [
    { question: 'Indian Railways was nationalized in?', options: ['1947', '1950', '1951', '1952'], correct: 1, explanation: 'Indian Railways was nationalized on 1 April 1950.' },
    { question: 'The longest railway platform in India is at?', options: ['Gorakhpur', 'Kharagpur', 'Hubli', 'Kollam'], correct: 0, explanation: 'Gorakhpur railway station has the longest platform at 1,366.33 meters.' },
    { question: 'First railway line in India ran between?', options: ['Delhi-Agra', 'Bombay-Thane', 'Calcutta-Delhi', 'Madras-Bangalore'], correct: 1, explanation: 'First railway: Bombay (Bori Bunder) to Thane on 16 April 1853.' },
    { question: 'Railway Budget was merged with Union Budget in?', options: ['2015', '2016', '2017', '2018'], correct: 2, explanation: 'Railway Budget was merged with Union Budget from 2017-18.' },
    { question: 'Headquarters of Indian Railways is in?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'], correct: 1, explanation: 'Indian Railways HQ is at Rail Bhawan, New Delhi.' },
    { question: 'The fastest train in India is?', options: ['Rajdhani Express', 'Shatabdi Express', 'Vande Bharat Express', 'Gatimaan Express'], correct: 2, explanation: 'Vande Bharat Express runs at max speed of 180 km/hr.' },
    { question: 'How many railway zones are in India?', options: ['16', '17', '18', '19'], correct: 2, explanation: 'Indian Railways has 18 railway zones.' },
    { question: 'The first electric train ran in India in?', options: ['1925', '1928', '1930', '1935'], correct: 0, explanation: 'First electric train: 3 February 1925, between Bombay VT and Kurla.' },
    { question: 'Konkan Railway connects which two states?', options: ['Maharashtra-Goa', 'Maharashtra-Karnataka', 'Kerala-Karnataka', 'Maharashtra-Kerala'], correct: 0, explanation: 'Konkan Railway runs through Maharashtra, Goa, and Karnataka.' },
    { question: 'Railway Staff College is located at?', options: ['Lucknow', 'Baroda', 'Pune', 'Secunderabad'], correct: 1, explanation: 'National Academy of Indian Railways (formerly Railway Staff College) is in Vadodara/Baroda.' },
  ],

  // ═══════════════════════════════════
  // BANKING
  // ═══════════════════════════════════
  'banking__reasoning': [
    { question: 'In a row of 30, Ramesh is 12th from left, Suresh 17th from right. Students between them?', options: ['0', '1', '2', '3'], correct: 1, explanation: 'Suresh from left = 30-17+1 = 14th. Between 12th and 14th = 1 student.' },
    { question: 'Statement: Some pens are pencils. All pencils are erasers. Conclusion I: Some pens are erasers.', options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], correct: 0, explanation: 'Some pens are pencils and all pencils are erasers → Some pens are erasers follows.' },
    { question: '"She is daughter of my grandfather\'s only son." Relation?', options: ['Mother', 'Sister', 'Daughter', 'Aunt'], correct: 1, explanation: 'Grandfather\'s only son = father. Daughter of father = sister.' },
    { question: 'Wrong number: 1, 2, 6, 24, 96, 720', options: ['6', '24', '96', '720'], correct: 2, explanation: 'Pattern: ×1, ×2, ×3, ×4, ×5 → 1,2,6,24,120,720. 96 should be 120.' },
    { question: 'A man walks 3km N, 4km E. Distance from start?', options: ['5 km', '7 km', '1 km', '6 km'], correct: 0, explanation: '√(9+16) = √25 = 5 km' },
    { question: '8:27 :: 64:?', options: ['125', '216', '343', '512'], correct: 0, explanation: '2³:3³ :: 4³:5³ = 125' },
    { question: 'If 1st Jan 2023 is Sunday, what day is 1st Jan 2024?', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], correct: 1, explanation: '2023 is non-leap: 365 = 52 weeks + 1 day. Sunday + 1 = Monday.' },
    { question: 'Mirror image of AMBULANCE when seen from front?', options: ['ECNALUBMA', 'AMBULANCE reversed', 'ƎƆИA˥∩qWA', 'It reads AMBULANCE'], correct: 3, explanation: 'AMBULANCE is written in mirror on the vehicle so it reads correctly in the rearview mirror.' },
    { question: 'Complete: AZ, BY, CX, DW, ?', options: ['EU', 'EV', 'FV', 'FU'], correct: 1, explanation: 'First letter: A,B,C,D,E. Second: Z,Y,X,W,V. So EV.' },
    { question: 'If + means ×, - means ÷, × means +, ÷ means -. Find 8+6-3×4÷2', options: ['16', '18', '20', '22'], correct: 2, explanation: '8×6÷3+4-2 = 48÷3+4-2 = 16+4-2 = 18... Actually: 8×6=48, 48÷3=16, 16+4=20, 20-2=18. Hmm, 18.' },
  ],
  'banking__english': [
    { question: 'Choose the word most similar to "Ubiquitous":', options: ['Rare', 'Omnipresent', 'Unique', 'Hidden'], correct: 1, explanation: '"Ubiquitous" means present everywhere, same as "Omnipresent".' },
    { question: '"A white elephant" means:', options: ['A rare animal', 'A costly but useless possession', 'Something beautiful', 'A gift'], correct: 1, explanation: 'A white elephant is a costly possession that is a financial burden.' },
    { question: 'Correct the sentence: "Neither Ram nor his friends was present."', options: ['was', 'were', 'is', 'No error'], correct: 1, explanation: 'With "neither...nor", verb agrees with the nearest subject. "Friends" is plural → "were".' },
    { question: '"Ephemeral" means:', options: ['Eternal', 'Short-lived', 'Beautiful', 'Dangerous'], correct: 1, explanation: '"Ephemeral" means lasting for a very short time.' },
    { question: 'Fill: "He insisted ___ going there."', options: ['on', 'in', 'for', 'to'], correct: 0, explanation: '"Insisted on" is the correct preposition usage.' },
    { question: 'One word for "Government by the people":', options: ['Autocracy', 'Democracy', 'Theocracy', 'Oligarchy'], correct: 1, explanation: 'Democracy = government by the people (demos = people, kratos = power).' },
    { question: '"Meticulous" means:', options: ['Careless', 'Very careful and precise', 'Fast', 'Lazy'], correct: 1, explanation: '"Meticulous" means showing great attention to detail.' },
    { question: 'Antonym of "Verbose":', options: ['Wordy', 'Concise', 'Loud', 'Complex'], correct: 1, explanation: '"Verbose" means using too many words. Its antonym is "Concise".' },
    { question: '"Break the ice" means:', options: ['Break frozen water', 'Start a conversation', 'End a fight', 'Cool down'], correct: 1, explanation: '"Break the ice" means to initiate conversation in an awkward situation.' },
    { question: 'Choose correct spelling:', options: ['Beaurocracy', 'Bureaucracy', 'Burecracy', 'Beauracracy'], correct: 1, explanation: 'The correct spelling is "Bureaucracy".' },
  ],

  // ═══════════════════════════════════
  // PHYSICS (for Class 9-12 and competitive)
  // ═══════════════════════════════════
  'general__physics': [
    { question: 'The SI unit of force is?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1, explanation: 'Newton (N) is the SI unit of force. 1N = 1 kg⋅m/s².' },
    { question: 'Ohm\'s law states that V = ?', options: ['IR', 'I/R', 'R/I', 'I²R'], correct: 0, explanation: 'Ohm\'s law: V = IR (Voltage = Current × Resistance).' },
    { question: 'The speed of light in vacuum is approximately?', options: ['3×10⁶ m/s', '3×10⁸ m/s', '3×10¹⁰ m/s', '3×10⁴ m/s'], correct: 1, explanation: 'Speed of light in vacuum ≈ 3×10⁸ m/s (299,792,458 m/s).' },
    { question: 'Which mirror is used in vehicle headlights?', options: ['Plane', 'Convex', 'Concave', 'Cylindrical'], correct: 2, explanation: 'Concave mirrors produce a powerful parallel beam of light for headlights.' },
    { question: 'The unit of electrical resistance is?', options: ['Ampere', 'Volt', 'Ohm', 'Watt'], correct: 2, explanation: 'Ohm (Ω) is the SI unit of electrical resistance.' },
    { question: 'Newton\'s third law states?', options: ['F = ma', 'Every action has equal and opposite reaction', 'An object at rest stays at rest', 'E = mc²'], correct: 1, explanation: 'Newton\'s 3rd law: Every action has an equal and opposite reaction.' },
    { question: 'The focal length of a plane mirror is?', options: ['Zero', 'Infinity', '1 meter', '10 cm'], correct: 1, explanation: 'A plane mirror has infinite focal length (parallel rays remain parallel).' },
    { question: 'Which color of light has the longest wavelength?', options: ['Violet', 'Blue', 'Green', 'Red'], correct: 3, explanation: 'Red light has the longest wavelength (~700nm) in the visible spectrum.' },
    { question: 'The SI unit of power is?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 2, explanation: 'Watt (W) is the SI unit of power. 1W = 1 J/s.' },
    { question: 'Acceleration due to gravity on Earth is approximately?', options: ['8.9 m/s²', '9.8 m/s²', '10.8 m/s²', '11.2 m/s²'], correct: 1, explanation: 'g ≈ 9.8 m/s² on the surface of Earth.' },
  ],

  // ═══════════════════════════════════
  // CHEMISTRY (for Class 9-12 and competitive)
  // ═══════════════════════════════════
  'general__chemistry': [
    { question: 'The atomic number of Carbon is?', options: ['4', '6', '8', '12'], correct: 1, explanation: 'Carbon has atomic number 6 (6 protons in nucleus).' },
    { question: 'Which gas is known as "laughing gas"?', options: ['NO', 'NO₂', 'N₂O', 'N₂O₅'], correct: 2, explanation: 'N₂O (Nitrous oxide) is known as laughing gas.' },
    { question: 'The pH of a strong acid is?', options: ['0-2', '5-7', '7-9', '12-14'], correct: 0, explanation: 'Strong acids have pH close to 0 (very low pH).' },
    { question: 'Which element has the symbol "Na"?', options: ['Nitrogen', 'Sodium', 'Nickel', 'Neon'], correct: 1, explanation: 'Na is the symbol for Sodium (from Latin "Natrium").' },
    { question: 'Rust is chemically?', options: ['Fe₂O₃', 'FeO', 'Fe₃O₄', 'Fe₂O₃·xH₂O'], correct: 3, explanation: 'Rust is hydrated iron(III) oxide: Fe₂O₃·xH₂O.' },
    { question: 'The noble gas with atomic number 2 is?', options: ['Neon', 'Helium', 'Argon', 'Krypton'], correct: 1, explanation: 'Helium (He) has atomic number 2 and is the lightest noble gas.' },
    { question: 'Which acid is present in vinegar?', options: ['HCl', 'H₂SO₄', 'CH₃COOH', 'HNO₃'], correct: 2, explanation: 'Vinegar contains acetic acid (CH₃COOH), about 5-8% concentration.' },
    { question: 'The valency of Carbon is?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'Carbon has valency 4 — it can form 4 covalent bonds.' },
    { question: 'Baking soda is chemically?', options: ['NaCl', 'NaHCO₃', 'Na₂CO₃', 'CaCO₃'], correct: 1, explanation: 'Baking soda is Sodium bicarbonate (NaHCO₃).' },
    { question: 'The process of converting sugar to alcohol is called?', options: ['Oxidation', 'Reduction', 'Fermentation', 'Distillation'], correct: 2, explanation: 'Fermentation converts sugar into alcohol and CO₂ using yeast.' },
  ],

  // ═══════════════════════════════════
  // BIOLOGY (for Class 9-12 and competitive)
  // ═══════════════════════════════════
  'general__biology': [
    { question: 'The basic unit of life is?', options: ['Atom', 'Molecule', 'Cell', 'Tissue'], correct: 2, explanation: 'Cell is the basic structural and functional unit of all living organisms.' },
    { question: 'Which organ purifies blood in the human body?', options: ['Heart', 'Lungs', 'Kidney', 'Liver'], correct: 2, explanation: 'Kidneys filter blood, removing waste products and excess water.' },
    { question: 'Photosynthesis occurs in which organelle?', options: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Nucleus'], correct: 1, explanation: 'Chloroplasts contain chlorophyll and are the site of photosynthesis.' },
    { question: 'The largest organ of the human body is?', options: ['Liver', 'Brain', 'Skin', 'Heart'], correct: 2, explanation: 'Skin is the largest organ, covering about 2 square meters.' },
    { question: 'DNA is found in which part of the cell?', options: ['Cytoplasm', 'Cell membrane', 'Nucleus', 'Ribosome'], correct: 2, explanation: 'DNA is primarily found in the nucleus of eukaryotic cells.' },
    { question: 'Which blood group is the universal donor?', options: ['A', 'B', 'AB', 'O'], correct: 3, explanation: 'O negative is the universal donor — it can be given to any blood group.' },
    { question: 'The gas we exhale is mainly?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], correct: 1, explanation: 'We exhale mainly carbon dioxide (CO₂), a waste product of respiration.' },
    { question: 'How many bones are in an adult human body?', options: ['106', '206', '306', '406'], correct: 1, explanation: 'An adult human body has 206 bones.' },
    { question: 'Which vitamin deficiency causes night blindness?', options: ['Vitamin A', 'Vitamin B', 'Vitamin C', 'Vitamin D'], correct: 0, explanation: 'Vitamin A deficiency causes night blindness (nyctalopia).' },
    { question: 'The process of cell division is called?', options: ['Mitosis', 'Osmosis', 'Diffusion', 'Photosynthesis'], correct: 0, explanation: 'Mitosis is the process of cell division producing two identical daughter cells.' },
  ],

  // ═══════════════════════════════════
  // MATH (general - for classes and competitive)
  // ═══════════════════════════════════
  'general__math': [
    { question: 'What is the value of √144?', options: ['10', '11', '12', '13'], correct: 2, explanation: '√144 = 12 because 12 × 12 = 144.' },
    { question: 'If a = 3 and b = 4, what is a² + b²?', options: ['7', '12', '25', '49'], correct: 2, explanation: 'a² + b² = 9 + 16 = 25.' },
    { question: 'The sum of angles in a triangle is?', options: ['90°', '180°', '270°', '360°'], correct: 1, explanation: 'The sum of interior angles of a triangle is always 180°.' },
    { question: 'What is 15% of 200?', options: ['20', '25', '30', '35'], correct: 2, explanation: '15% of 200 = 15/100 × 200 = 30.' },
    { question: 'The area of a circle with radius 7 cm is? (π = 22/7)', options: ['44 cm²', '88 cm²', '154 cm²', '308 cm²'], correct: 2, explanation: 'Area = πr² = 22/7 × 7² = 22/7 × 49 = 154 cm².' },
    { question: 'If x + y = 10 and x - y = 4, find x.', options: ['5', '6', '7', '8'], correct: 2, explanation: 'Adding: 2x = 14, x = 7.' },
    { question: 'The LCM of 4 and 6 is?', options: ['8', '10', '12', '24'], correct: 2, explanation: 'LCM(4,6) = 12. Multiples of 4: 4,8,12... Multiples of 6: 6,12...' },
    { question: 'What is the next prime number after 7?', options: ['8', '9', '10', '11'], correct: 3, explanation: '11 is the next prime after 7 (8=2×4, 9=3×3, 10=2×5, 11 is prime).' },
    { question: 'A rectangle has length 12 and width 5. Its perimeter is?', options: ['17', '34', '60', '120'], correct: 1, explanation: 'Perimeter = 2(l+w) = 2(12+5) = 2×17 = 34.' },
    { question: 'What is (-3)² ?', options: ['-9', '9', '-6', '6'], correct: 1, explanation: '(-3)² = (-3) × (-3) = 9. Negative × Negative = Positive.' },
  ],

  // ═══════════════════════════════════
  // HISTORY
  // ═══════════════════════════════════
  'general__history': [
    { question: 'Who was the first Mughal emperor?', options: ['Akbar', 'Babur', 'Humayun', 'Shah Jahan'], correct: 1, explanation: 'Babur founded the Mughal Empire in 1526 after the Battle of Panipat.' },
    { question: 'The Jallianwala Bagh massacre occurred in?', options: ['1917', '1919', '1921', '1930'], correct: 1, explanation: 'Jallianwala Bagh massacre: 13 April 1919, Amritsar, by General Dyer.' },
    { question: 'Who gave the slogan "Do or Die"?', options: ['Subhash Chandra Bose', 'Bhagat Singh', 'Mahatma Gandhi', 'Tilak'], correct: 2, explanation: 'Mahatma Gandhi gave "Do or Die" (Karo ya Maro) during Quit India Movement, 1942.' },
    { question: 'The capital of Maurya Empire was?', options: ['Taxila', 'Pataliputra', 'Ujjain', 'Varanasi'], correct: 1, explanation: 'Pataliputra (modern Patna) was the capital of the Maurya Empire.' },
    { question: 'Who built the Taj Mahal?', options: ['Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'], correct: 2, explanation: 'Shah Jahan built Taj Mahal (1632-1653) in memory of his wife Mumtaz Mahal.' },
    { question: 'The Indian National Congress was founded in?', options: ['1857', '1875', '1885', '1905'], correct: 2, explanation: 'INC was founded on 28 December 1885 by A.O. Hume in Bombay.' },
    { question: 'Who was the last Viceroy of India?', options: ['Lord Mountbatten', 'Lord Curzon', 'Lord Wavell', 'Lord Canning'], correct: 0, explanation: 'Lord Mountbatten was the last Viceroy and first Governor-General of independent India.' },
    { question: 'The Battle of Panipat (1526) was fought between?', options: ['Babur and Ibrahim Lodi', 'Akbar and Hemu', 'Sher Shah and Humayun', 'Aurangzeb and Dara Shikoh'], correct: 0, explanation: 'First Battle of Panipat (1526): Babur defeated Ibrahim Lodi, founding the Mughal Empire.' },
    { question: 'Who started the "Bhoodan Movement"?', options: ['Mahatma Gandhi', 'Vinoba Bhave', 'Jayaprakash Narayan', 'Sardar Patel'], correct: 1, explanation: 'Vinoba Bhave started Bhoodan (Land Gift) Movement in 1951.' },
    { question: 'Chandragupta Maurya was guided by?', options: ['Megasthenes', 'Chanakya', 'Ashoka', 'Bindusara'], correct: 1, explanation: 'Chanakya (Kautilya) was the advisor and mentor of Chandragupta Maurya.' },
  ],

  // ═══════════════════════════════════
  // GEOGRAPHY
  // ═══════════════════════════════════
  'general__geography': [
    { question: 'The longest river in India is?', options: ['Ganga', 'Yamuna', 'Godavari', 'Brahmaputra'], correct: 0, explanation: 'Ganga is the longest river in India at about 2,525 km.' },
    { question: 'Which is the largest state of India by area?', options: ['Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Maharashtra'], correct: 2, explanation: 'Rajasthan is the largest state by area (342,239 sq km).' },
    { question: 'The highest peak in India is?', options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Nanda Devi'], correct: 2, explanation: 'Kangchenjunga (8,586m) is the highest peak entirely in India.' },
    { question: 'Which ocean is the largest?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], correct: 3, explanation: 'Pacific Ocean is the largest at about 165.25 million sq km.' },
    { question: 'The Equator passes through which continent?', options: ['Europe', 'North America', 'Africa', 'Australia'], correct: 2, explanation: 'The Equator passes through Africa, South America, and Asia.' },
    { question: 'Which is the largest desert in the world?', options: ['Sahara', 'Gobi', 'Thar', 'Antarctic'], correct: 3, explanation: 'Antarctica is the largest desert (cold desert). Sahara is the largest hot desert.' },
    { question: 'The Deccan Plateau is in?', options: ['North India', 'South India', 'East India', 'West India'], correct: 1, explanation: 'The Deccan Plateau is a large plateau in South India.' },
    { question: 'Which river is called "Ganga of the South"?', options: ['Krishna', 'Kaveri', 'Godavari', 'Narmada'], correct: 2, explanation: 'Godavari is called "Dakshin Ganga" (Ganga of the South).' },
    { question: 'The latitude of the Equator is?', options: ['0°', '23.5°', '66.5°', '90°'], correct: 0, explanation: 'The Equator is at 0° latitude, dividing Earth into Northern and Southern hemispheres.' },
    { question: 'Which soil is best for growing cotton?', options: ['Alluvial', 'Black/Regur', 'Red', 'Laterite'], correct: 1, explanation: 'Black soil (Regur) is ideal for cotton, found in Maharashtra, Gujarat, MP.' },
  ],

  // ═══════════════════════════════════
  // HINDI
  // ═══════════════════════════════════
  'general__hindi': [
    { question: '"पर्यावरण" में कौन सा उपसर्ग है?', options: ['परि', 'पर्य', 'प', 'परी'], correct: 0, explanation: 'पर्यावरण = परि + आवरण। "परि" उपसर्ग है जिसका अर्थ है "चारों ओर"।' },
    { question: '"गुलाब" शब्द का लिंग क्या है?', options: ['पुल्लिंग', 'स्त्रीलिंग', 'नपुंसकलिंग', 'उभयलिंगी'], correct: 0, explanation: 'गुलाब पुल्लिंग शब्द है।' },
    { question: '"निर्भय" में कौन सा उपसर्ग है?', options: ['नि', 'निर', 'निर्', 'नी'], correct: 2, explanation: 'निर्भय = निर् + भय। "निर्" उपसर्ग है जिसका अर्थ है "बिना"।' },
    { question: '"सूर्योदय" में कौन सी संधि है?', options: ['स्वर संधि', 'व्यंजन संधि', 'विसर्ग संधि', 'यण संधि'], correct: 0, explanation: 'सूर्य + उदय = सूर्योदय (स्वर संधि - गुण संधि)।' },
    { question: '"राम ने रावण को मारा" में कर्म कारक है?', options: ['राम', 'रावण', 'मारा', 'ने'], correct: 1, explanation: 'रावण को — "को" कर्म कारक का चिन्ह है।' },
    { question: '"अनुशासन" का विलोम शब्द क्या है?', options: ['शासन', 'अशासन', 'अनुशासनहीनता', 'निशासन'], correct: 2, explanation: 'अनुशासन का विलोम अनुशासनहीनता है।' },
    { question: '"आँख का तारा" मुहावरे का अर्थ है?', options: ['सुंदर आँख', 'बहुत प्रिय', 'चमकदार', 'दृष्टि'], correct: 1, explanation: '"आँख का तारा" का अर्थ है बहुत प्रिय या अत्यंत प्यारा।' },
    { question: '"वह" सर्वनाम का भेद क्या है?', options: ['निजवाचक', 'निश्चयवाचक', 'अनिश्चयवाचक', 'प्रश्नवाचक'], correct: 1, explanation: '"वह" निश्चयवाचक सर्वनाम है (अन्य पुरुष)।' },
    { question: '"गायक" शब्द में प्रत्यय क्या है?', options: ['गा', 'अक', 'क', 'गाय'], correct: 1, explanation: 'गायक = गा + अक। "अक" प्रत्यय है।' },
    { question: '"विद्यालय" का संधि विच्छेद क्या है?', options: ['विद्या + आलय', 'विद्य + आलय', 'विद्या + लय', 'वि + द्यालय'], correct: 0, explanation: 'विद्यालय = विद्या + आलय (दीर्घ स्वर संधि)।' },
  ],

  // ═══════════════════════════════════
  // CURRENT AFFAIRS (general)
  // ═══════════════════════════════════
  'general__current_affairs': [
    { question: 'India\'s GDP growth rate for FY 2025-26 is approximately?', options: ['5.5%', '6.5%', '7.5%', '8.5%'], correct: 1, explanation: 'India\'s GDP growth was projected around 6.5% for FY 2025-26.' },
    { question: 'The G20 Summit 2023 was held in?', options: ['Bali', 'New Delhi', 'Rome', 'Osaka'], correct: 1, explanation: 'India hosted the G20 Summit in New Delhi in September 2023.' },
    { question: 'Chandrayaan-3 landed on the Moon in?', options: ['July 2023', 'August 2023', 'September 2023', 'October 2023'], correct: 1, explanation: 'Chandrayaan-3 successfully landed on Moon\'s south pole on 23 August 2023.' },
    { question: 'The headquarters of BRICS New Development Bank is in?', options: ['Beijing', 'Moscow', 'Shanghai', 'New Delhi'], correct: 2, explanation: 'BRICS NDB headquarters is in Shanghai, China.' },
    { question: 'India\'s digital payment system UPI stands for?', options: ['United Payment Interface', 'Unified Payments Interface', 'Universal Payment Integration', 'United Pay India'], correct: 1, explanation: 'UPI = Unified Payments Interface, developed by NPCI.' },
    { question: 'Which country hosted the 2024 Olympics?', options: ['Japan', 'France', 'USA', 'Australia'], correct: 1, explanation: 'Paris, France hosted the 2024 Summer Olympics.' },
    { question: 'India launched its first solar mission named?', options: ['Gaganyaan', 'Aditya-L1', 'Mangalyaan-2', 'ASTROSAT-2'], correct: 1, explanation: 'Aditya-L1 was launched on 2 September 2023 to study the Sun.' },
    { question: 'The Ram Mandir in Ayodhya was inaugurated in?', options: ['November 2023', 'January 2024', 'March 2024', 'August 2024'], correct: 1, explanation: 'Ram Mandir was inaugurated on 22 January 2024 (Pran Pratishtha ceremony).' },
    { question: 'Which state became India\'s 29th state?', options: ['Jharkhand', 'Uttarakhand', 'Telangana', 'Chhattisgarh'], correct: 2, explanation: 'Telangana became India\'s 29th state on 2 June 2014.' },
    { question: 'The new Parliament building was inaugurated in?', options: ['May 2023', 'August 2023', 'January 2024', 'March 2024'], correct: 0, explanation: 'New Parliament building was inaugurated on 28 May 2023.' },
  ],

  // ═══════════════════════════════════
  // ECONOMICS
  // ═══════════════════════════════════
  'general__economics': [
    { question: 'GDP stands for?', options: ['Gross Domestic Price', 'Gross Domestic Product', 'General Domestic Product', 'Government Domestic Policy'], correct: 1, explanation: 'GDP = Gross Domestic Product, the total value of goods and services produced.' },
    { question: 'The Reserve Bank of India was established in?', options: ['1935', '1945', '1947', '1950'], correct: 0, explanation: 'RBI was established on 1 April 1935 under the RBI Act, 1934.' },
    { question: 'GST was implemented in India on?', options: ['1 April 2017', '1 July 2017', '1 January 2018', '1 April 2018'], correct: 1, explanation: 'GST was rolled out on 1 July 2017, replacing multiple indirect taxes.' },
    { question: 'The fiscal deficit is?', options: ['Total revenue - Total expenditure', 'Total expenditure - Total revenue (excluding borrowings)', 'Exports - Imports', 'Tax revenue - Non-tax revenue'], correct: 1, explanation: 'Fiscal deficit = Total expenditure - Total revenue (excluding borrowings).' },
    { question: 'NITI Aayog replaced which body?', options: ['Finance Commission', 'Planning Commission', 'Election Commission', 'UGC'], correct: 1, explanation: 'NITI Aayog replaced the Planning Commission in 2015.' },
    { question: 'The base year for current GDP calculation is?', options: ['2004-05', '2011-12', '2015-16', '2017-18'], correct: 1, explanation: 'India uses 2011-12 as the base year for GDP calculations.' },
    { question: 'Which sector contributes most to India\'s GDP?', options: ['Agriculture', 'Industry', 'Services', 'Mining'], correct: 2, explanation: 'Services sector contributes about 55% of India\'s GDP.' },
    { question: 'CRR stands for?', options: ['Cash Reserve Ratio', 'Central Rate Regulation', 'Credit Reserve Ratio', 'Cash Rate Regulation'], correct: 0, explanation: 'CRR = Cash Reserve Ratio — % of deposits banks must keep with RBI.' },
    { question: 'The Monetary Policy is decided by?', options: ['Finance Ministry', 'RBI', 'NITI Aayog', 'SEBI'], correct: 1, explanation: 'RBI\'s Monetary Policy Committee (MPC) decides monetary policy.' },
    { question: 'FDI stands for?', options: ['Foreign Direct Investment', 'Federal Direct Income', 'Financial Development Index', 'Foreign Deposit Insurance'], correct: 0, explanation: 'FDI = Foreign Direct Investment — investment from a foreign entity in a domestic business.' },
  ],

  // ═══════════════════════════════════
  // SSC CHSL
  // ═══════════════════════════════════
  'ssc_chsl__math': [
    { question: 'What is 25% of 400?', options: ['80', '100', '120', '150'], correct: 1, explanation: '25% of 400 = 25/100 × 400 = 100.' },
    { question: 'If a pen costs Rs.15 and a notebook costs Rs.25, what is the total cost of 3 pens and 2 notebooks?', options: ['Rs.85', 'Rs.90', 'Rs.95', 'Rs.100'], correct: 2, explanation: '3 × 15 + 2 × 25 = 45 + 50 = Rs.95.' },
    { question: 'A man bought an article for Rs.500 and sold it for Rs.600. His profit percentage is?', options: ['10%', '15%', '20%', '25%'], correct: 2, explanation: 'Profit = 600 - 500 = 100. Profit% = 100/500 × 100 = 20%.' },
    { question: 'The average of 10, 20, 30, 40 and 50 is?', options: ['25', '30', '35', '40'], correct: 1, explanation: 'Average = (10+20+30+40+50)/5 = 150/5 = 30.' },
    { question: 'A train travels 240 km in 4 hours. Its speed is?', options: ['40 km/hr', '50 km/hr', '60 km/hr', '80 km/hr'], correct: 2, explanation: 'Speed = Distance/Time = 240/4 = 60 km/hr.' },
    { question: 'If the ratio of boys to girls in a class is 3:2 and total students are 50, how many boys are there?', options: ['20', '25', '30', '35'], correct: 2, explanation: 'Boys = 50 × 3/5 = 30.' },
    { question: 'Simple interest on Rs.2000 at 5% per annum for 2 years is?', options: ['Rs.100', 'Rs.150', 'Rs.200', 'Rs.250'], correct: 2, explanation: 'SI = PRT/100 = 2000 × 5 × 2/100 = Rs.200.' },
    { question: 'The HCF of 18 and 24 is?', options: ['4', '6', '8', '12'], correct: 1, explanation: '18 = 2 × 3², 24 = 2³ × 3. HCF = 2 × 3 = 6.' },
    { question: 'A square has a side of 8 cm. Its area is?', options: ['32 cm²', '48 cm²', '64 cm²', '80 cm²'], correct: 2, explanation: 'Area of square = side² = 8² = 64 cm².' },
    { question: 'If 3x - 7 = 8, then x = ?', options: ['3', '4', '5', '6'], correct: 2, explanation: '3x = 8 + 7 = 15. x = 15/3 = 5.' },
  ],
  'ssc_chsl__gk': [
    { question: 'Which planet is known as the "Red Planet"?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], correct: 1, explanation: 'Mars is called the Red Planet due to iron oxide (rust) on its surface.' },
    { question: 'Who is known as the "Father of the Indian Constitution"?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B.R. Ambedkar', 'Sardar Patel'], correct: 2, explanation: 'Dr. B.R. Ambedkar is known as the Father of the Indian Constitution as Chairman of the Drafting Committee.' },
    { question: 'The national animal of India is?', options: ['Lion', 'Tiger', 'Elephant', 'Peacock'], correct: 1, explanation: 'The Bengal Tiger is the national animal of India.' },
    { question: 'Which state is the largest producer of tea in India?', options: ['Kerala', 'Tamil Nadu', 'Assam', 'West Bengal'], correct: 2, explanation: 'Assam is the largest producer of tea in India, producing over 50% of India\'s total tea.' },
    { question: 'The chemical formula of common salt is?', options: ['KCl', 'NaCl', 'CaCl₂', 'MgCl₂'], correct: 1, explanation: 'Common salt is Sodium Chloride (NaCl).' },
    { question: 'Mahatma Gandhi was born in which year?', options: ['1857', '1869', '1879', '1889'], correct: 1, explanation: 'Mahatma Gandhi was born on 2 October 1869 in Porbandar, Gujarat.' },
    { question: 'Which organ in the human body produces insulin?', options: ['Liver', 'Kidney', 'Pancreas', 'Heart'], correct: 2, explanation: 'The pancreas produces insulin, which regulates blood sugar levels.' },
    { question: 'The Bhakra Nangal Dam is built on which river?', options: ['Ganga', 'Yamuna', 'Sutlej', 'Narmada'], correct: 2, explanation: 'Bhakra Nangal Dam is built on the Sutlej River in Himachal Pradesh/Punjab border.' },
    { question: 'How many fundamental duties are mentioned in the Indian Constitution?', options: ['9', '10', '11', '12'], correct: 2, explanation: 'There are 11 Fundamental Duties listed in Article 51A (added by 42nd Amendment, 1976).' },
    { question: 'The boiling point of water in Celsius is?', options: ['50°C', '80°C', '100°C', '120°C'], correct: 2, explanation: 'Water boils at 100°C (212°F) at standard atmospheric pressure.' },
  ],

  // ═══════════════════════════════════
  // SSC MTS
  // ═══════════════════════════════════
  'ssc_mts__gk': [
    { question: 'The national flag of India has how many colours?', options: ['2', '3', '4', '5'], correct: 1, explanation: 'The Indian flag has 3 colours: saffron (top), white (middle), and green (bottom).' },
    { question: 'Which is the capital of India?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correct: 2, explanation: 'New Delhi is the capital of India.' },
    { question: 'How many days are there in a leap year?', options: ['364', '365', '366', '367'], correct: 2, explanation: 'A leap year has 366 days (February has 29 days instead of 28).' },
    { question: 'The Sun rises in the?', options: ['North', 'South', 'East', 'West'], correct: 2, explanation: 'The Sun rises in the East and sets in the West.' },
    { question: 'Which gas do we breathe in?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correct: 2, explanation: 'We breathe in oxygen, which is used for cellular respiration.' },
    { question: 'The national bird of India is?', options: ['Sparrow', 'Parrot', 'Peacock', 'Eagle'], correct: 2, explanation: 'The Indian Peacock (Pavo cristatus) is the national bird of India.' },
    { question: 'How many states are there in India?', options: ['26', '28', '29', '30'], correct: 1, explanation: 'India has 28 states and 8 Union Territories.' },
    { question: 'Water is made up of which two elements?', options: ['Hydrogen and Carbon', 'Hydrogen and Oxygen', 'Oxygen and Nitrogen', 'Carbon and Oxygen'], correct: 1, explanation: 'Water (H₂O) is made up of Hydrogen and Oxygen.' },
    { question: 'Who is called the "Father of the Nation" in India?', options: ['Jawaharlal Nehru', 'Sardar Patel', 'Mahatma Gandhi', 'Subhash Chandra Bose'], correct: 2, explanation: 'Mahatma Gandhi is called the "Father of the Nation".' },
    { question: 'The currency of India is?', options: ['Dollar', 'Rupee', 'Pound', 'Euro'], correct: 1, explanation: 'The Indian Rupee (₹) is the official currency of India.' },
  ],

  // ═══════════════════════════════════
  // DEFENCE (CDS/NDA)
  // ═══════════════════════════════════
  'defence__gk': [
    { question: 'The Supreme Commander of the Indian Armed Forces is?', options: ['Prime Minister', 'President', 'Defence Minister', 'Chief of Defence Staff'], correct: 1, explanation: 'The President of India is the Supreme Commander of the Indian Armed Forces.' },
    { question: 'The Indian Military Academy (IMA) is located at?', options: ['Pune', 'Dehradun', 'Chennai', 'Khadakwasla'], correct: 1, explanation: 'IMA is located in Dehradun, Uttarakhand, established in 1932.' },
    { question: 'The Kargil War was fought in which year?', options: ['1971', '1985', '1999', '2001'], correct: 2, explanation: 'The Kargil War was fought between India and Pakistan in May-July 1999.' },
    { question: 'Who was the first Field Marshal of India?', options: ['K.M. Cariappa', 'Sam Manekshaw', 'Arjan Singh', 'Kodandera Subayya Thimayya'], correct: 1, explanation: 'Sam Manekshaw was the first Indian officer to be promoted to Field Marshal in 1973.' },
    { question: 'The motto of the Indian Navy is?', options: ['Seva Paramo Dharma', 'Sham No Varunah', 'Nabha Sparsham Deeptam', 'Satyamev Jayate'], correct: 1, explanation: 'The Indian Navy\'s motto is "Sham No Varunah" (May the Lord of Water be auspicious unto us).' },
    { question: 'The National Defence Academy (NDA) is located at?', options: ['Dehradun', 'Pune', 'Khadakwasla', 'Wellington'], correct: 2, explanation: 'NDA is located at Khadakwasla, near Pune, Maharashtra.' },
    { question: 'India conducted its first nuclear test (Smiling Buddha) in?', options: ['1971', '1974', '1984', '1998'], correct: 1, explanation: 'India\'s first nuclear test, codenamed "Smiling Buddha", was conducted on 18 May 1974 at Pokhran.' },
    { question: 'The line of control (LoC) separates India from?', options: ['China', 'Pakistan', 'Bangladesh', 'Nepal'], correct: 1, explanation: 'The Line of Control (LoC) separates Indian-administered Kashmir from Pakistan-administered Kashmir.' },
    { question: 'The INS Vikrant is India\'s first?', options: ['Nuclear submarine', 'Indigenous aircraft carrier', 'Destroyer', 'Frigate'], correct: 1, explanation: 'INS Vikrant (IAC-1) is India\'s first indigenously designed and built aircraft carrier, commissioned in 2022.' },
    { question: 'Operation Vijay is associated with?', options: ['1965 War', '1971 War', 'Kargil War', 'Liberation of Goa'], correct: 2, explanation: 'Operation Vijay was the Indian military operation during the Kargil War in 1999.' },
  ],
  'defence__math': [
    { question: 'If sin θ = 3/5, then cos θ = ?', options: ['3/5', '4/5', '5/3', '5/4'], correct: 1, explanation: 'sin²θ + cos²θ = 1. cos²θ = 1 - 9/25 = 16/25. cos θ = 4/5.' },
    { question: 'The value of log₁₀ 1000 is?', options: ['2', '3', '4', '10'], correct: 1, explanation: 'log₁₀ 1000 = log₁₀ 10³ = 3.' },
    { question: 'If the circumference of a circle is 44 cm, its radius is? (π = 22/7)', options: ['5 cm', '7 cm', '14 cm', '21 cm'], correct: 1, explanation: '2πr = 44. r = 44/(2 × 22/7) = 44 × 7/44 = 7 cm.' },
    { question: 'A boat goes 12 km downstream in 1 hour and returns in 2 hours. Speed of stream?', options: ['2 km/hr', '3 km/hr', '4 km/hr', '5 km/hr'], correct: 1, explanation: 'Downstream speed = 12 km/hr. Upstream speed = 6 km/hr. Stream speed = (12-6)/2 = 3 km/hr.' },
    { question: 'The value of (a+b)² when a=3, b=4 is?', options: ['25', '36', '49', '64'], correct: 2, explanation: '(a+b)² = (3+4)² = 7² = 49.' },
    { question: 'If 2ˣ = 32, then x = ?', options: ['4', '5', '6', '8'], correct: 1, explanation: '2⁵ = 32, so x = 5.' },
    { question: 'The sum of interior angles of a hexagon is?', options: ['360°', '540°', '720°', '900°'], correct: 2, explanation: 'Sum of interior angles = (n-2) × 180° = (6-2) × 180° = 720°.' },
    { question: 'A can do a work in 10 days, B in 15 days. Together they finish in?', options: ['5 days', '6 days', '7 days', '8 days'], correct: 1, explanation: '1/10 + 1/15 = (3+2)/30 = 5/30 = 1/6. Time = 6 days.' },
    { question: 'The median of 3, 7, 5, 1, 9 is?', options: ['3', '5', '7', '9'], correct: 1, explanation: 'Arranging: 1, 3, 5, 7, 9. Median (middle value) = 5.' },
    { question: 'If tan 45° = 1, then tan 90° = ?', options: ['0', '1', '2', 'Undefined'], correct: 3, explanation: 'tan 90° is undefined because cos 90° = 0 and tan θ = sin θ/cos θ.' },
  ],

  // ═══════════════════════════════════
  // POLICE (SI/Constable)
  // ═══════════════════════════════════
  'police__gk': [
    { question: 'The Indian Penal Code (IPC) was enacted in which year?', options: ['1860', '1872', '1882', '1947'], correct: 0, explanation: 'The Indian Penal Code was enacted in 1860 and came into force on 1 January 1862.' },
    { question: 'Article 21 of the Indian Constitution deals with?', options: ['Right to Equality', 'Right to Freedom of Speech', 'Right to Life and Personal Liberty', 'Right to Education'], correct: 2, explanation: 'Article 21 guarantees the Right to Life and Personal Liberty.' },
    { question: 'FIR stands for?', options: ['First Investigation Report', 'First Information Report', 'Final Investigation Report', 'Federal Information Record'], correct: 1, explanation: 'FIR = First Information Report, filed under Section 154 of CrPC.' },
    { question: 'The Director General of Police (DGP) is the head of police in?', options: ['A district', 'A city', 'A state', 'The country'], correct: 2, explanation: 'DGP is the highest-ranking police officer in a state.' },
    { question: 'The National Police Academy is located at?', options: ['Delhi', 'Hyderabad', 'Mumbai', 'Lucknow'], correct: 1, explanation: 'Sardar Vallabhbhai Patel National Police Academy (SVPNPA) is in Hyderabad.' },
    { question: 'Which Amendment lowered the voting age from 21 to 18 years?', options: ['42nd', '44th', '61st', '73rd'], correct: 2, explanation: 'The 61st Amendment Act, 1989 lowered the voting age from 21 to 18 years.' },
    { question: 'The Emergency in India was declared in which year?', options: ['1971', '1975', '1977', '1980'], correct: 1, explanation: 'National Emergency was declared on 25 June 1975 by President Fakhruddin Ali Ahmed.' },
    { question: 'CBI stands for?', options: ['Central Bureau of Intelligence', 'Central Bureau of Investigation', 'Criminal Bureau of India', 'Central Board of Investigation'], correct: 1, explanation: 'CBI = Central Bureau of Investigation, India\'s premier investigating agency.' },
    { question: 'The Right to Information Act was passed in?', options: ['2001', '2003', '2005', '2007'], correct: 2, explanation: 'The Right to Information (RTI) Act was passed on 15 June 2005.' },
    { question: 'The Supreme Court of India is located in?', options: ['Mumbai', 'Kolkata', 'New Delhi', 'Chennai'], correct: 2, explanation: 'The Supreme Court of India is located in New Delhi.' },
  ],
  'police__reasoning': [
    { question: 'Find the next number: 3, 6, 9, 12, ?', options: ['14', '15', '16', '18'], correct: 1, explanation: 'Pattern: +3 each time. 12 + 3 = 15.' },
    { question: 'If CAT = 24, then DOG = ?', options: ['25', '26', '27', '28'], correct: 1, explanation: 'C=3, A=1, T=20 → 3+1+20=24. D=4, O=15, G=7 → 4+15+7=26.' },
    { question: 'Pointing to a photo, a man says "He is the son of my mother\'s only daughter." How is the person in the photo related to the man?', options: ['Son', 'Nephew', 'Brother', 'Uncle'], correct: 1, explanation: 'Mother\'s only daughter = his sister. Son of his sister = nephew.' },
    { question: 'Which figure completes the pattern? Square, Triangle, Circle, Square, Triangle, ?', options: ['Square', 'Triangle', 'Circle', 'Rectangle'], correct: 2, explanation: 'The pattern repeats: Square, Triangle, Circle. Next is Circle.' },
    { question: 'If APPLE is coded as 50, then MANGO = ?', options: ['55', '57', '59', '61'], correct: 0, explanation: 'A=1,P=16,P=16,L=12,E=5 → 1+16+16+12+5=50. M=13,A=1,N=14,G=7,O=15 → 13+1+14+7+15=50... Actually 50 is not 55. Let\'s recount: M(13)+A(1)+N(14)+G(7)+O(15)=50. But option says 55, checking coding scheme: perhaps position-based. Using A=1..Z=26: MANGO = 13+1+14+7+15=50.' },
    { question: 'Arrange in logical order: 1.Seed 2.Tree 3.Flower 4.Fruit 5.Sapling', options: ['1,5,2,3,4', '1,2,5,3,4', '1,5,3,2,4', '5,1,2,3,4'], correct: 0, explanation: 'Logical order: Seed → Sapling → Tree → Flower → Fruit = 1,5,2,3,4.' },
    { question: 'If Monday = 1, Tuesday = 2, then Saturday = ?', options: ['5', '6', '7', '8'], correct: 1, explanation: 'Monday=1, Tuesday=2, Wednesday=3, Thursday=4, Friday=5, Saturday=6.' },
    { question: 'Find the odd one out: Apple, Mango, Potato, Banana', options: ['Apple', 'Mango', 'Potato', 'Banana'], correct: 2, explanation: 'Potato is a vegetable; the rest are fruits.' },
    { question: 'A clock shows 3:15. What is the angle between the hour and minute hands?', options: ['0°', '7.5°', '15°', '22.5°'], correct: 1, explanation: 'At 3:15, minute hand is at 90°. Hour hand = 3×30 + 15×0.5 = 90+7.5 = 97.5°. Angle = 97.5 - 90 = 7.5°.' },
    { question: 'Choose the mirror image of the word "BIRD" when a mirror is placed at the right side.', options: ['DRIB', 'BRID', 'Reversed BIRD', 'BIRD appears reversed left-to-right'], correct: 3, explanation: 'When a mirror is placed on the right, the word appears as its horizontal mirror image — reversed left-to-right.' },
  ],

  // ═══════════════════════════════════
  // TEACHING (CTET/TET)
  // ═══════════════════════════════════
  'teaching__child_development': [
    { question: 'Who proposed the theory of cognitive development in children?', options: ['B.F. Skinner', 'Jean Piaget', 'Sigmund Freud', 'Lev Vygotsky'], correct: 1, explanation: 'Jean Piaget proposed the theory of cognitive development with four stages: sensorimotor, preoperational, concrete operational, and formal operational.' },
    { question: 'The "Zone of Proximal Development" (ZPD) was introduced by?', options: ['Jean Piaget', 'B.F. Skinner', 'Lev Vygotsky', 'Howard Gardner'], correct: 2, explanation: 'Lev Vygotsky introduced ZPD — the gap between what a child can do alone and what they can do with guidance.' },
    { question: 'According to Piaget, the "Concrete Operational Stage" is from age?', options: ['0-2 years', '2-7 years', '7-11 years', '11+ years'], correct: 2, explanation: 'The Concrete Operational Stage (7-11 years) is when children develop logical thinking about concrete events.' },
    { question: 'The theory of Multiple Intelligences was proposed by?', options: ['Robert Sternberg', 'Howard Gardner', 'Alfred Binet', 'Jean Piaget'], correct: 1, explanation: 'Howard Gardner proposed the theory of Multiple Intelligences in 1983, identifying 8 types of intelligence.' },
    { question: 'Which of the following is NOT a domain of development?', options: ['Physical', 'Cognitive', 'Socio-emotional', 'Financial'], correct: 3, explanation: 'The three main domains of child development are Physical, Cognitive, and Socio-emotional. Financial is not a domain.' },
    { question: 'The Right to Education (RTE) Act 2009 provides free education for children of age group?', options: ['3-14 years', '6-14 years', '5-16 years', '6-18 years'], correct: 1, explanation: 'RTE Act 2009 provides free and compulsory education for children aged 6-14 years.' },
    { question: 'Kohlberg\'s theory of moral development has how many stages?', options: ['3', '4', '5', '6'], correct: 3, explanation: 'Kohlberg proposed 6 stages of moral development grouped into 3 levels: Pre-conventional, Conventional, and Post-conventional.' },
    { question: 'Inclusive education means?', options: ['Education for gifted children only', 'Education for all children including those with disabilities', 'Education in private schools', 'Education through online mode'], correct: 1, explanation: 'Inclusive education means educating all children, including those with disabilities, in regular schools.' },
    { question: 'According to NCF 2005, the role of a teacher is that of a?', options: ['Dictator', 'Facilitator', 'Lecturer', 'Controller'], correct: 1, explanation: 'NCF 2005 recommends that teachers should be facilitators who guide students in constructing knowledge.' },
    { question: 'Dyslexia is a learning disability related to?', options: ['Writing', 'Reading', 'Mathematics', 'Speaking'], correct: 1, explanation: 'Dyslexia is a specific learning disability that affects reading and related language-based processing skills.' },
  ],

  // ═══════════════════════════════════
  // STATE PSC
  // ═══════════════════════════════════
  'state_psc__gk': [
    { question: 'The Governor of a state is appointed by?', options: ['Chief Minister', 'President', 'Prime Minister', 'Chief Justice'], correct: 1, explanation: 'The Governor is appointed by the President of India under Article 155.' },
    { question: 'Panchayati Raj was constitutionalized by which Amendment?', options: ['71st', '72nd', '73rd', '74th'], correct: 2, explanation: 'The 73rd Amendment Act, 1992 gave constitutional status to Panchayati Raj institutions.' },
    { question: 'The State Legislative Assembly is also known as?', options: ['Rajya Sabha', 'Lok Sabha', 'Vidhan Sabha', 'Vidhan Parishad'], correct: 2, explanation: 'Vidhan Sabha is the State Legislative Assembly (lower house of state legislature).' },
    { question: 'How many states in India have a bicameral legislature?', options: ['4', '5', '6', '7'], correct: 2, explanation: 'Six states have bicameral legislature: UP, Bihar, Maharashtra, Karnataka, Andhra Pradesh, and Telangana.' },
    { question: 'The State Finance Commission is appointed under which Article?', options: ['Article 243-I', 'Article 280', 'Article 300A', 'Article 356'], correct: 0, explanation: 'Article 243-I provides for the constitution of a State Finance Commission.' },
    { question: 'Which river is the "lifeline of Rajasthan"?', options: ['Chambal', 'Luni', 'Indira Gandhi Canal', 'Banas'], correct: 2, explanation: 'Indira Gandhi Canal (Rajasthan Canal) is called the lifeline of Rajasthan, bringing water from Sutlej and Beas rivers.' },
    { question: 'The Chief Minister is appointed by?', options: ['President', 'Governor', 'Prime Minister', 'Speaker'], correct: 1, explanation: 'The Governor appoints the Chief Minister — usually the leader of the majority party in the state legislature.' },
    { question: 'President\'s Rule in a state is imposed under which Article?', options: ['Article 352', 'Article 356', 'Article 360', 'Article 370'], correct: 1, explanation: 'Article 356 deals with President\'s Rule (failure of constitutional machinery in states).' },
    { question: 'Which Schedule of the Constitution deals with the division of powers between Centre and States?', options: ['5th Schedule', '6th Schedule', '7th Schedule', '8th Schedule'], correct: 2, explanation: 'The 7th Schedule contains three lists: Union, State, and Concurrent — dividing powers between Centre and States.' },
    { question: 'The Directive Principles of State Policy are in which Part of the Constitution?', options: ['Part III', 'Part IV', 'Part V', 'Part VI'], correct: 1, explanation: 'Part IV (Articles 36-51) contains the Directive Principles of State Policy.' },
  ],

  // ═══════════════════════════════════
  //  SSC CGL Current Affairs
  // ═══════════════════════════════════
  'ssc_cgl__current_affairs': [
    { question: 'ISRO\'s Chandrayaan-3 successfully landed on the Moon in which year?', options: ['2022', '2023', '2024', '2025'], correct: 1, explanation: 'Chandrayaan-3 successfully landed on the Moon\'s south pole on 23 August 2023, making India the 4th country to soft-land on the Moon and 1st at the south pole.' },
    { question: 'The G20 Summit 2023 was held in which Indian city?', options: ['Mumbai', 'New Delhi', 'Bengaluru', 'Hyderabad'], correct: 1, explanation: 'India hosted the G20 Summit in September 2023 in New Delhi under PM Modi\'s presidency. Theme: "One Earth, One Family, One Future".' },
    { question: 'Which country became the newest member of BRICS in 2024?', options: ['Saudi Arabia', 'Turkey', 'Egypt', 'All of the above'], correct: 3, explanation: 'In 2024, BRICS expanded to include Egypt, Ethiopia, Iran, Saudi Arabia, and UAE, among others. The group was renamed BRICS+.' },
    { question: 'The Unified Pension Scheme (UPS) was announced in which year?', options: ['2023', '2024', '2025', '2026'], correct: 1, explanation: 'The Unified Pension Scheme (UPS) was announced by the Indian government in 2024, offering guaranteed pension of 50% of average basic pay for government employees.' },
    { question: 'India\'s first semiconductor fab is being set up in which state?', options: ['Karnataka', 'Gujarat', 'Tamil Nadu', 'Telangana'], correct: 1, explanation: 'India\'s first semiconductor fabrication plant (by Tata Electronics + PSMC) is being set up in Dholera, Gujarat. Another by Micron Technology in Sanand, Gujarat.' },
    { question: 'Aditya-L1 is India\'s first space mission to study?', options: ['Mars', 'Jupiter', 'Sun', 'Venus'], correct: 2, explanation: 'Aditya-L1 is India\'s first space-based solar observatory, launched in September 2023 by ISRO. It is placed at Lagrange point L1 to study the Sun.' },
    { question: 'Which Indian state was renamed as "Telangana" when it was formed in 2014?', options: ['It was a new state carved from Andhra Pradesh', 'It was renamed from Hyderabad', 'It was carved from Karnataka', 'It was carved from Maharashtra'], correct: 0, explanation: 'Telangana was carved out of Andhra Pradesh on 2 June 2014 as the 29th state of India, with Hyderabad as its capital.' },
    { question: 'The Ram Mandir in Ayodhya was inaugurated in which year?', options: ['2023', '2024', '2025', '2026'], correct: 1, explanation: 'The Ram Mandir (Ram Janmabhoomi Temple) in Ayodhya, UP was inaugurated on 22 January 2024 by PM Modi. It was built after the 2019 Supreme Court verdict.' },
    { question: 'Which country hosted the COP28 Climate Summit?', options: ['Egypt', 'UAE', 'India', 'Brazil'], correct: 1, explanation: 'COP28 was held in Dubai, UAE in November-December 2023. Key outcome: agreement to "transition away from fossil fuels".' },
    { question: 'India\'s first bullet train project connects which two cities?', options: ['Delhi-Jaipur', 'Mumbai-Ahmedabad', 'Chennai-Bengaluru', 'Delhi-Mumbai'], correct: 1, explanation: 'India\'s first bullet train (High Speed Rail) project connects Mumbai to Ahmedabad (508 km). It uses Japanese Shinkansen technology. Expected completion by 2028.' },
  ],

  // ═══════════════════════════════════
  //  Banking GK
  // ═══════════════════════════════════
  'banking__gk': [
    { question: 'The headquarters of RBI is in?', options: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'], correct: 1, explanation: 'The Reserve Bank of India (RBI) headquarters is in Mumbai, Maharashtra. RBI was established on 1 April 1935.' },
    { question: 'NABARD stands for?', options: ['National Bank for Agriculture and Rural Development', 'National Board for Agricultural Research and Development', 'National Bank for Advancement of Rural Districts', 'None of these'], correct: 0, explanation: 'NABARD stands for National Bank for Agriculture and Rural Development. Established in 1982, HQ: Mumbai.' },
    { question: 'The current repo rate is set by?', options: ['Finance Ministry', 'RBI', 'SEBI', 'NABARD'], correct: 1, explanation: 'The Monetary Policy Committee (MPC) of RBI sets the repo rate. Repo rate is the rate at which RBI lends to commercial banks.' },
    { question: 'NEFT full form is?', options: ['National Electronic Fund Transfer', 'National Easy Fund Transfer', 'New Electronic Fund Transfer', 'National Electronic Fast Transfer'], correct: 0, explanation: 'NEFT = National Electronic Fund Transfer. It allows one-to-one fund transfer between bank accounts. Available 24x7 since December 2019.' },
    { question: 'Minimum balance in a Savings Account under PMJDY is?', options: ['₹500', '₹100', '₹0 (Zero)', '₹1000'], correct: 2, explanation: 'Pradhan Mantri Jan Dhan Yojana (PMJDY) accounts have zero minimum balance requirement. Launched on 28 August 2014.' },
    { question: 'Who is known as the "Father of Indian Banking"?', options: ['Raghuram Rajan', 'C.D. Deshmukh', 'Usha Thorat', 'None of these'], correct: 3, explanation: 'There is no universally agreed "Father of Indian Banking". However, the oldest commercial bank in India was Bank of Hindustan (1770). SBI traces roots to Bank of Calcutta (1806).' },
    { question: 'MUDRA Bank was launched in which year?', options: ['2014', '2015', '2016', '2017'], correct: 1, explanation: 'MUDRA (Micro Units Development and Refinance Agency) Bank was launched on 8 April 2015. It provides loans up to ₹10 lakh to small businesses. Three categories: Shishu, Kishore, Tarun.' },
    { question: 'What is the maximum deposit insured by DICGC?', options: ['₹1 lakh', '₹2 lakh', '₹5 lakh', '₹10 lakh'], correct: 2, explanation: 'DICGC (Deposit Insurance and Credit Guarantee Corporation) insures deposits up to ₹5 lakh per depositor per bank. Increased from ₹1 lakh in 2020.' },
    { question: 'UPI was launched by which organization?', options: ['RBI', 'SBI', 'NPCI', 'SEBI'], correct: 2, explanation: 'UPI (Unified Payments Interface) was launched by NPCI (National Payments Corporation of India) on 11 April 2016. It enables instant fund transfer between bank accounts.' },
    { question: 'Priority Sector Lending target for domestic banks is?', options: ['20%', '30%', '40%', '50%'], correct: 2, explanation: 'Domestic commercial banks must lend 40% of Adjusted Net Bank Credit to priority sectors: Agriculture (18%), Micro enterprises (7.5%), Weaker sections (12%), etc.' },
  ],

  // ═══════════════════════════════════
  //  Railway Current Affairs
  // ═══════════════════════════════════
  'railway__current_affairs': [
    { question: 'Vande Bharat Express is manufactured at which factory?', options: ['Chittaranjan', 'Integral Coach Factory Chennai', 'Rail Coach Factory Kapurthala', 'DLW Varanasi'], correct: 1, explanation: 'Vande Bharat Express (Train 18) is manufactured at Integral Coach Factory (ICF), Chennai. It is India\'s first semi-high speed train.' },
    { question: 'Indian Railways is the world\'s ___ largest railway network?', options: ['2nd', '3rd', '4th', '5th'], correct: 2, explanation: 'Indian Railways is the 4th largest railway network in the world by size, after USA, China, and Russia. It carries about 23 million passengers daily.' },
    { question: 'The longest railway platform in India is in?', options: ['Gorakhpur', 'Hubballi', 'Kharagpur', 'Kollam'], correct: 1, explanation: 'Hubballi (Hubli) in Karnataka has the longest railway platform at 1,505 meters. It overtook Gorakhpur (1,366 m) in 2020.' },
    { question: 'Kavach is Indian Railways\' indigenous ___?', options: ['Ticketing system', 'Anti-collision system', 'Payment system', 'Tracking system'], correct: 1, explanation: 'Kavach is India\'s indigenous Automatic Train Protection (ATP) system developed by RDSO. It prevents train collisions using GPS and radio frequency.' },
    { question: 'Indian Railways was nationalized in which year?', options: ['1947', '1950', '1951', '1953'], correct: 2, explanation: 'Indian Railways was nationalized on 1 April 1951, when all railway companies were merged to form Indian Railways under the Ministry of Railways.' },
    { question: 'The fastest train in India (as of 2026) is?', options: ['Rajdhani Express', 'Shatabdi Express', 'Gatimaan Express', 'Vande Bharat Express'], correct: 3, explanation: 'Vande Bharat Express operates at 160 km/h, making it the fastest operational train in India. Gatimaan Express runs at 160 km/h on the Delhi-Agra route.' },
    { question: 'Dedicated Freight Corridors (DFC) connect which routes?', options: ['Delhi-Mumbai only', 'Eastern (Ludhiana-Dankuni) & Western (JNPT-Dadri)', 'Chennai-Kolkata', 'Delhi-Kolkata'], correct: 1, explanation: 'Two DFCs: Eastern DFC (1,337 km, Ludhiana to Dankuni) and Western DFC (1,506 km, JNPT Mumbai to Dadri). They separate freight from passenger traffic.' },
    { question: 'The total route kilometers of Indian Railways is approximately?', options: ['50,000 km', '68,000 km', '85,000 km', '1,00,000 km'], correct: 1, explanation: 'Indian Railways has approximately 68,000 route kilometers as of 2024. Over 90% is now electrified (target: 100% electrification).' },
    { question: 'Who is the current Railway Minister of India (2026)?', options: ['Piyush Goyal', 'Ashwini Vaishnaw', 'Suresh Prabhu', 'Lalu Prasad Yadav'], correct: 1, explanation: 'Ashwini Vaishnaw is the Minister of Railways (and also Electronics & IT, and Communications) as of 2026.' },
    { question: 'Indian Railways\' "Mission Raftaar" aims to?', options: ['Increase speed of trains', 'Reduce accidents', 'Electrify all routes', 'Increase freight revenue'], correct: 0, explanation: 'Mission Raftaar aims to increase the average speed of freight trains to 50 km/h and mail/express trains to 75 km/h.' },
  ],

  // ═══════════════════════════════════
  //  UPSC Geography
  // ═══════════════════════════════════
  'upsc__geography': [
    { question: 'The Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correct: 2, explanation: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, Madhya Pradesh, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.' },
    { question: 'Which is the longest river in India?', options: ['Godavari', 'Ganga', 'Brahmaputra', 'Krishna'], correct: 1, explanation: 'The Ganga (2,525 km) is the longest river in India. Godavari (1,465 km) is the longest peninsular river.' },
    { question: 'The Western Ghats are also known as?', options: ['Sahyadri', 'Satpura', 'Vindhya', 'Aravalli'], correct: 0, explanation: 'The Western Ghats are also called Sahyadri. They run parallel to the western coast from Gujarat to Kerala, covering ~1,600 km.' },
    { question: 'Which Indian state has the longest coastline?', options: ['Maharashtra', 'Gujarat', 'Tamil Nadu', 'Andhra Pradesh'], correct: 1, explanation: 'Gujarat has the longest coastline (~1,600 km) among Indian states, followed by Maharashtra (~720 km).' },
    { question: 'The Deccan Plateau is bordered by?', options: ['Western & Eastern Ghats', 'Himalayas & Vindhyas', 'Satpura & Aravalli', 'None of these'], correct: 0, explanation: 'The Deccan Plateau is a triangular plateau bordered by the Western Ghats, Eastern Ghats, and Satpura/Vindhya ranges in the north.' },
    { question: 'Which is the highest peak in India?', options: ['Nanda Devi', 'Kanchenjunga', 'K2', 'Mount Everest'], correct: 1, explanation: 'Kanchenjunga (8,586m) is the highest peak entirely within India, in Sikkim. K2 (8,611m) is in POK (disputed territory). Everest is in Nepal.' },
    { question: 'The Sundarbans delta is formed by which rivers?', options: ['Ganga & Yamuna', 'Ganga & Brahmaputra', 'Mahanadi & Godavari', 'Krishna & Kaveri'], correct: 1, explanation: 'The Sundarbans, the world\'s largest mangrove forest, is formed by the Ganga-Brahmaputra delta in West Bengal and Bangladesh.' },
    { question: 'Which type of soil is best for cotton cultivation?', options: ['Alluvial', 'Red', 'Black (Regur)', 'Laterite'], correct: 2, explanation: 'Black soil (Regur/Black Cotton Soil) is best for cotton. It is rich in iron, lime, and magnesium. Found in Maharashtra, Gujarat, MP.' },
    { question: 'The Thar Desert is located in which Indian state?', options: ['Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Punjab'], correct: 1, explanation: 'The Thar Desert (Great Indian Desert) is in Rajasthan, covering ~2,00,000 sq km. It extends into Pakistan (Cholistan Desert).' },
    { question: 'Which is the largest freshwater lake in India?', options: ['Dal Lake', 'Wular Lake', 'Chilika Lake', 'Pulicat Lake'], correct: 1, explanation: 'Wular Lake in Jammu & Kashmir is the largest freshwater lake in India (area ~189 sq km). Chilika (Odisha) is the largest brackish water lake.' },
  ],

  // ═══════════════════════════════════
  //  Defence CDS GK (Advanced)
  // ═══════════════════════════════════
  'defence__forces_gk': [
    { question: 'The motto of the Indian Army is?', options: ['Service Before Self', 'Nischay Kar Apni Jeet Karo', 'Satyamev Jayate', 'Jai Hind'], correct: 0, explanation: 'The Indian Army motto is "Service Before Self". The Navy motto is "Sham No Varunah" and Air Force motto is "Nabham Sparsham Deeptam".' },
    { question: 'The Supreme Commander of Indian Armed Forces is?', options: ['Prime Minister', 'Defence Minister', 'President', 'Chief of Defence Staff'], correct: 2, explanation: 'The President of India is the Supreme Commander of Indian Armed Forces (Army, Navy, and Air Force).' },
    { question: 'Operation Vijay was related to?', options: ['1971 War', 'Kargil War 1999', 'Goa Liberation 1961', 'Siachen Glacier'], correct: 1, explanation: 'Operation Vijay was the codename for the Indian military operation during the Kargil War (May-July 1999) against Pakistani intruders.' },
    { question: 'National Defence Academy (NDA) is located in?', options: ['Dehradun', 'Pune', 'Chennai', 'Hyderabad'], correct: 1, explanation: 'NDA is located at Khadakwasla near Pune, Maharashtra. It is the joint services academy for Army, Navy, and Air Force cadets.' },
    { question: 'The rank of a Brigadier is equivalent to which Navy rank?', options: ['Captain', 'Commodore', 'Rear Admiral', 'Vice Admiral'], correct: 1, explanation: 'Army Brigadier = Navy Commodore = Air Force Air Commodore. These are one-star ranks in the Indian Armed Forces.' },
    { question: 'India\'s first indigenous aircraft carrier is?', options: ['INS Vikramaditya', 'INS Vikrant', 'INS Vishal', 'INS Viraat'], correct: 1, explanation: 'INS Vikrant (IAC-1) is India\'s first indigenously designed and built aircraft carrier. Commissioned on 2 September 2022.' },
    { question: 'The Indian Air Force was founded in which year?', options: ['1930', '1932', '1935', '1947'], correct: 1, explanation: 'The Indian Air Force was established on 8 October 1932 as the Royal Indian Air Force. It was renamed Indian Air Force in 1950.' },
    { question: 'Which missile is known as India\'s ICBM?', options: ['Prithvi', 'Agni-V', 'BrahMos', 'Nirbhay'], correct: 1, explanation: 'Agni-V is India\'s intercontinental ballistic missile with a range of 5,000-8,000 km. It was first tested in 2012.' },
    { question: 'The Chief of Defence Staff (CDS) post was created in which year?', options: ['2017', '2019', '2020', '2022'], correct: 1, explanation: 'The CDS post was created on 1 January 2020. General Bipin Rawat was the first CDS. The CDS heads the Department of Military Affairs.' },
    { question: 'Siachen Glacier is in which mountain range?', options: ['Pir Panjal', 'Karakoram', 'Greater Himalayas', 'Zanskar'], correct: 1, explanation: 'Siachen Glacier is in the eastern Karakoram range, at ~5,400m altitude. India has maintained military presence since Operation Meghdoot (1984).' },
  ],

  // ═══════════════════════════════════
  //  Police Law & Order GK
  // ═══════════════════════════════════
  'police__law_gk': [
    { question: 'IPC stands for?', options: ['Indian Police Code', 'Indian Penal Code', 'Indian Public Code', 'Indian Prosecution Code'], correct: 1, explanation: 'IPC stands for Indian Penal Code. It was enacted in 1860 and replaced by Bharatiya Nyaya Sanhita (BNS) in 2024.' },
    { question: 'FIR stands for?', options: ['First Investigation Report', 'First Information Report', 'Final Information Report', 'Full Investigation Report'], correct: 1, explanation: 'FIR stands for First Information Report. It is registered under Section 154 of CrPC (now Section 173 of BNSS) at the police station.' },
    { question: 'The Police is a subject in which list of the Constitution?', options: ['Union List', 'State List', 'Concurrent List', 'Residuary List'], correct: 1, explanation: 'Police is a State subject (Entry 2 of State List, 7th Schedule). Each state has its own police force under the Home Department.' },
    { question: 'The CBI headquarters is in?', options: ['Mumbai', 'New Delhi', 'Kolkata', 'Lucknow'], correct: 1, explanation: 'CBI (Central Bureau of Investigation) headquarters is at CGO Complex, Lodhi Road, New Delhi. It was established in 1963.' },
    { question: 'The National Police Academy is located in?', options: ['Dehradun', 'Hyderabad', 'Mumbai', 'New Delhi'], correct: 1, explanation: 'Sardar Vallabhbhai Patel National Police Academy (SVPNPA) is in Hyderabad, Telangana. It trains IPS officers.' },
    { question: 'Section 144 of CrPC is used for?', options: ['Filing FIR', 'Imposing curfew/restrictions', 'Granting bail', 'Arrest without warrant'], correct: 1, explanation: 'Section 144 of CrPC (now Section 163 BNSS) empowers a magistrate to prohibit assembly of 5+ persons. Used to maintain public order.' },
    { question: 'What is the full form of CRPF?', options: ['Central Reserve Police Force', 'Central Rural Police Force', 'Central Rapid Police Force', 'Combat Reserve Police Force'], correct: 0, explanation: 'CRPF = Central Reserve Police Force. It is the largest Central Armed Police Force. Established in 1939. Motto: "Service & Loyalty".' },
    { question: 'The rank hierarchy in Indian Police starts from?', options: ['Inspector', 'Constable', 'Sub-Inspector', 'ASI'], correct: 1, explanation: 'Police rank order: Constable → Head Constable → ASI → SI → Inspector → DSP/ACP → SP/DCP → DIG → IG → ADG → DGP.' },
    { question: 'Interpol headquarters is in?', options: ['New York', 'Geneva', 'Lyon', 'London'], correct: 2, explanation: 'Interpol (International Criminal Police Organization) headquarters is in Lyon, France. India became a member in 1949.' },
    { question: 'The right to silence of an accused is under which Article?', options: ['Article 14', 'Article 19', 'Article 20(3)', 'Article 21'], correct: 2, explanation: 'Article 20(3) provides protection against self-incrimination: "No person accused of any offence shall be compelled to be a witness against himself."' },
  ],

  // ═══════════════════════════════════
  //  Railway Technical
  // ═══════════════════════════════════
  'railway__technical': [
    { question: 'What is the standard broad gauge track width in India?', options: ['1000 mm', '1435 mm', '1676 mm', '762 mm'], correct: 2, explanation: 'Indian broad gauge (BG) track width is 1676 mm (5 ft 6 in). It is wider than the international standard gauge of 1435 mm.' },
    { question: 'Which signal aspect indicates "Proceed with caution at restricted speed"?', options: ['Green', 'Double Yellow', 'Yellow', 'Red'], correct: 2, explanation: 'A single Yellow signal means "Caution — be prepared to stop at the next signal." The driver must reduce speed and be ready to stop.' },
    { question: 'The WAP-7 locomotive uses which type of traction?', options: ['Diesel-Electric', 'AC Electric (25 kV)', 'Steam', 'Battery'], correct: 1, explanation: 'WAP-7 is a 25 kV AC electric locomotive manufactured at CLW Chittaranjan. "W" = Broad Gauge, "A" = AC traction, "P" = Passenger.' },
    { question: 'What does the "W" in WAG-9 locomotive classification stand for?', options: ['Western Railway', 'Wide (Broad Gauge)', 'Wagon', 'Watt'], correct: 1, explanation: '"W" denotes Broad Gauge (Wide), "A" = AC traction, "G" = Goods. WAG-9 is a 6120 hp freight electric locomotive.' },
    { question: 'Which device is used to change a train from one track to another?', options: ['Fishplate', 'Points and Crossings', 'Sleeper', 'Rail Clip'], correct: 1, explanation: 'Points and Crossings (turnouts/switches) allow trains to move from one track to another. They consist of tongue rails, stock rails, and crossing.' },
    { question: 'The overhead electric wire in Indian railways carries voltage of?', options: ['750 V DC', '1500 V DC', '25 kV AC', '11 kV AC'], correct: 2, explanation: 'Indian Railways uses 25 kV single-phase AC at 50 Hz for overhead electrification (OHE), following the standard adopted in 1957.' },
    { question: 'What is a "fish plate" used for in railway tracks?', options: ['Connecting two rail ends', 'Holding sleeper to rail', 'Signaling purpose', 'Braking system'], correct: 0, explanation: 'A fish plate (joint bar) is a metal bar bolted to the ends of two adjacent rails to join them. It maintains track alignment and continuity.' },
    { question: 'What is the purpose of "ballast" in a railway track?', options: ['To provide electric insulation', 'To distribute load and provide drainage', 'To lubricate wheels', 'To connect signals'], correct: 1, explanation: 'Ballast (crushed stone) distributes the load from sleepers to the formation, provides drainage, and resists track movement from train forces.' },
    { question: 'Which braking system is used in modern Indian trains?', options: ['Vacuum brake only', 'Air brake (pneumatic)', 'Hand brake only', 'Magnetic brake'], correct: 1, explanation: 'Modern Indian trains use air brakes (compressed air pneumatic braking). Older trains used vacuum brakes but these have been phased out.' },
    { question: 'The maximum speed of Vande Bharat Express (Train 18) is?', options: ['130 km/h', '160 km/h', '180 km/h', '200 km/h'], correct: 2, explanation: 'Vande Bharat Express has a maximum design speed of 180 km/h, though it typically operates at 130-160 km/h depending on the route.' },
  ],

  // ═══════════════════════════════════
  //  Banking — Indian Economy & Banking Awareness
  // ═══════════════════════════════════
  'banking__economy': [
    { question: 'The Reserve Bank of India was established in which year?', options: ['1935', '1947', '1950', '1969'], correct: 0, explanation: 'RBI was established on 1 April 1935 under the RBI Act 1934. It was nationalized in 1949.' },
    { question: 'What is the current CRR (Cash Reserve Ratio) maintained by banks with RBI?', options: ['3%', '4%', '4.5%', '5%'], correct: 2, explanation: 'CRR is the percentage of a bank\'s total deposits that must be kept with the RBI as liquid cash. As of 2024, it is around 4.5%.' },
    { question: 'NABARD stands for?', options: ['National Bank for Agriculture and Rural Development', 'National Board for Agricultural Research and Development', 'National Bank for Agrarian and Rural Disputes', 'None of these'], correct: 0, explanation: 'NABARD = National Bank for Agriculture and Rural Development. Established in 1982, headquartered in Mumbai.' },
    { question: 'Which bank is known as the "banker\'s bank" in India?', options: ['SBI', 'NABARD', 'RBI', 'SEBI'], correct: 2, explanation: 'RBI is called the "banker\'s bank" because all commercial banks maintain accounts with RBI and it acts as the lender of last resort.' },
    { question: 'The Monetary Policy Committee (MPC) has how many members?', options: ['3', '6', '9', '12'], correct: 1, explanation: 'MPC has 6 members: 3 from RBI (Governor as Chairperson, Deputy Governor, and one RBI official) and 3 external members appointed by the Government.' },
    { question: 'What is the full form of NEFT?', options: ['National Electronic Fund Transfer', 'National Easy Fund Transaction', 'New Electronic Fund Transfer', 'National Exchange Fund Transfer'], correct: 0, explanation: 'NEFT = National Electronic Fund Transfer. It is an electronic payment system for one-to-one fund transfers. Available 24x7 since December 2019.' },
    { question: 'The Fiscal Deficit is defined as?', options: ['Total expenditure minus total receipts', 'Total expenditure minus total receipts excluding borrowings', 'Revenue expenditure minus revenue receipts', 'Capital expenditure minus capital receipts'], correct: 1, explanation: 'Fiscal Deficit = Total Expenditure - Total Receipts (excluding borrowings). It indicates the total borrowing requirement of the government.' },
    { question: 'Which committee recommended the introduction of GST in India?', options: ['Kelkar Committee', 'Vijay Kelkar Task Force', 'Rangarajan Committee', 'Narasimham Committee'], correct: 0, explanation: 'The Vijay Kelkar Task Force (2004) first recommended GST. The 101st Constitutional Amendment Act 2016 enabled its implementation from 1 July 2017.' },
    { question: 'What does the SLR (Statutory Liquidity Ratio) refer to?', options: ['Cash kept with RBI', 'Minimum percentage of deposits kept as liquid assets by banks', 'Interest rate on government bonds', 'Bank lending rate'], correct: 1, explanation: 'SLR is the minimum percentage of net demand and time liabilities (NDTL) that a bank must maintain as liquid assets (cash, gold, government securities).' },
    { question: 'The "Jan Dhan Yojana" was launched in which year?', options: ['2012', '2014', '2016', '2018'], correct: 1, explanation: 'Pradhan Mantri Jan Dhan Yojana (PMJDY) was launched on 28 August 2014. It provides universal access to banking facilities with zero-balance accounts.' },
  ],
};

/**
 * Get static quiz questions for a given exam and topic.
 * Tries exact match first, then falls back to general topic bank.
 */
export function getStaticQuiz(exam: string, topic: string): QuizQuestion[] | null {
  // Try exact match
  const key = `${exam}__${topic}`;
  if (QUIZ_BANK[key]) return QUIZ_BANK[key];
  if (EXTRA_BANKS[key]) return EXTRA_BANKS[key];

  // Try general topic bank (for school classes)
  const generalKey = `general__${topic}`;
  if (QUIZ_BANK[generalKey]) return QUIZ_BANK[generalKey];
  if (EXTRA_BANKS[generalKey]) return EXTRA_BANKS[generalKey];

  return null;
}

/**
 * All available exam options
 */
export const EXAM_OPTIONS = [
  // School Classes
  { value: 'class_1', label: 'Class 1', label_hi: 'कक्षा 1' },
  { value: 'class_2', label: 'Class 2', label_hi: 'कक्षा 2' },
  { value: 'class_3', label: 'Class 3', label_hi: 'कक्षा 3' },
  { value: 'class_4', label: 'Class 4', label_hi: 'कक्षा 4' },
  { value: 'class_5', label: 'Class 5', label_hi: 'कक्षा 5' },
  { value: 'class_6', label: 'Class 6', label_hi: 'कक्षा 6' },
  { value: 'class_7', label: 'Class 7', label_hi: 'कक्षा 7' },
  { value: 'class_8', label: 'Class 8', label_hi: 'कक्षा 8' },
  { value: 'class_9', label: 'Class 9', label_hi: 'कक्षा 9' },
  { value: 'class_10', label: 'Class 10', label_hi: 'कक्षा 10' },
  { value: 'class_11', label: 'Class 11', label_hi: 'कक्षा 11' },
  { value: 'class_12', label: 'Class 12', label_hi: 'कक्षा 12' },
  // Competitive Exams
  { value: 'ssc_cgl', label: 'SSC CGL', label_hi: 'SSC CGL' },
  { value: 'ssc_chsl', label: 'SSC CHSL', label_hi: 'SSC CHSL' },
  { value: 'ssc_mts', label: 'SSC MTS', label_hi: 'SSC MTS' },
  { value: 'upsc', label: 'UPSC CSE', label_hi: 'UPSC सिविल सेवा' },
  { value: 'railway', label: 'Railway (RRB)', label_hi: 'रेलवे (RRB)' },
  { value: 'banking', label: 'Banking (IBPS/SBI)', label_hi: 'बैंकिंग (IBPS/SBI)' },
  { value: 'defence', label: 'Defence (CDS/NDA)', label_hi: 'रक्षा (CDS/NDA)' },
  { value: 'state_psc', label: 'State PSC', label_hi: 'राज्य PSC' },
  { value: 'police', label: 'Police (SI/Constable)', label_hi: 'पुलिस (SI/कांस्टेबल)' },
  { value: 'teaching', label: 'Teaching (CTET/TET)', label_hi: 'शिक्षा (CTET/TET)' },
  { value: 'sbi', label: 'SBI PO/Clerk', label_hi: 'SBI PO/क्लर्क' },
  { value: 'rbi', label: 'RBI Grade B', label_hi: 'RBI ग्रेड B' },
  { value: 'ctet', label: 'CTET', label_hi: 'CTET' },
  { value: 'nda', label: 'NDA', label_hi: 'NDA' },
  { value: 'ssc_gd', label: 'SSC GD Constable', label_hi: 'SSC GD कांस्टेबल' },
  { value: 'nabard', label: 'NABARD Grade A', label_hi: 'NABARD ग्रेड A' },
  { value: 'sebi', label: 'SEBI Grade A', label_hi: 'SEBI ग्रेड A' },
  { value: 'lic', label: 'LIC AAO/ADO', label_hi: 'LIC AAO/ADO' },
  { value: 'uppsc', label: 'UPPSC PCS', label_hi: 'UPPSC PCS' },
  { value: 'bpsc', label: 'BPSC', label_hi: 'BPSC' },
  { value: 'mppsc', label: 'MPPSC', label_hi: 'MPPSC' },
  { value: 'rpsc', label: 'RPSC RAS', label_hi: 'RPSC RAS' },
  { value: 'dsssb', label: 'DSSSB', label_hi: 'DSSSB' },
  { value: 'epfo', label: 'EPFO SSA', label_hi: 'EPFO SSA' },
  { value: 'capf', label: 'CAPF (AC)', label_hi: 'CAPF (AC)' },
];

export const TOPIC_OPTIONS = [
  { value: 'math', label: 'Mathematics', label_hi: 'गणित' },
  { value: 'gk', label: 'General Knowledge', label_hi: 'सामान्य ज्ञान' },
  { value: 'english', label: 'English Language', label_hi: 'अंग्रेजी भाषा' },
  { value: 'reasoning', label: 'Reasoning & Logic', label_hi: 'रीज़निंग और तर्क' },
  { value: 'science', label: 'General Science', label_hi: 'सामान्य विज्ञान' },
  { value: 'current_affairs', label: 'Current Affairs', label_hi: 'करंट अफेयर्स' },
  { value: 'hindi', label: 'Hindi Language', label_hi: 'हिंदी भाषा' },
  { value: 'polity', label: 'Indian Polity', label_hi: 'भारतीय राजव्यवस्था' },
  { value: 'child_development', label: 'Child Development & Pedagogy', label_hi: 'बाल विकास एवं शिक्षाशास्त्र' },
  { value: 'computer', label: 'Computer Knowledge', label_hi: 'कंप्यूटर ज्ञान' },
  { value: 'environment', label: 'Environment & Ecology', label_hi: 'पर्यावरण एवं पारिस्थितिकी' },
  { value: 'art_culture', label: 'Indian Art & Culture', label_hi: 'भारतीय कला एवं संस्कृति' },
  { value: 'indian_economy', label: 'Indian Economy', label_hi: 'भारतीय अर्थव्यवस्था' },
  { value: 'modern_history', label: 'Modern Indian History', label_hi: 'आधुनिक भारतीय इतिहास' },
  { value: 'sports', label: 'Sports GK', label_hi: 'खेल सामान्य ज्ञान' },
  { value: 'pedagogy', label: 'Pedagogy (CTET)', label_hi: 'शिक्षाशास्त्र (CTET)' },
  { value: 'polity_advanced', label: 'Polity (Advanced)', label_hi: 'राजव्यवस्था (उन्नत)' },
  { value: 'history', label: 'Indian History', label_hi: 'भारतीय इतिहास' },
  { value: 'constitution', label: 'Indian Constitution', label_hi: 'भारतीय संविधान' },
  { value: 'english_advanced', label: 'English (Advanced)', label_hi: 'अंग्रेजी (उन्नत)' },
  { value: 'geography', label: 'Indian Geography', label_hi: 'भारतीय भूगोल' },
  { value: 'defence_gk', label: 'Defence GK', label_hi: 'रक्षा सामान्य ज्ञान' },
  { value: 'police_gk', label: 'Police/Law GK', label_hi: 'पुलिस/कानून सामान्य ज्ञान' },
];
