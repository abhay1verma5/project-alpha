import type { QuizQuestion } from './static-quizzes';

export const EXTRA_QUIZ_BANKS: Record<string, QuizQuestion[]> = {
  // =======================================
  // Computer Science Basics
  // =======================================
  'general__computer': [
    { question: 'What does CPU stand for?', options: ['Central Processing Unit', 'Central Program Utility', 'Computer Personal Unit', 'Central Processor Unifier'], correct: 0, explanation: 'CPU stands for Central Processing Unit. It is the primary component that executes instructions in a computer.' },
    { question: 'Which of the following is an example of volatile memory?', options: ['Hard Disk', 'ROM', 'RAM', 'Pen Drive'], correct: 2, explanation: 'RAM (Random Access Memory) is volatile memory, meaning it loses its data when the computer is turned off.' },
    { question: 'Which shortcut key is used to copy selected text in MS Word?', options: ['Ctrl + V', 'Ctrl + X', 'Ctrl + C', 'Ctrl + Z'], correct: 2, explanation: 'Ctrl + C is the standard shortcut for copying selected text or objects in MS Office applications.' },
    { question: 'What is the full form of HTTP?', options: ['Hyper Text Transfer Protocol', 'High Tech Transfer Protocol', 'Hyper Text Transmission Program', 'High Transfer Text Protocol'], correct: 0, explanation: 'HTTP stands for Hyper Text Transfer Protocol, used for transmitting web pages over the internet.' },
    { question: 'Which of the following is an operating system?', options: ['MS Word', 'Google Chrome', 'Linux', 'Oracle'], correct: 2, explanation: 'Linux is an open-source operating system. MS Word is a word processor, Chrome is a browser, and Oracle is a database.' },
    { question: 'What is the binary equivalent of the decimal number 10?', options: ['1010', '1001', '1100', '1110'], correct: 0, explanation: '10 in decimal = 1010 in binary. (8+0+2+0 = 10)' },
    { question: 'Which device is used to connect a computer to the internet?', options: ['Printer', 'Monitor', 'Modem', 'Speaker'], correct: 2, explanation: 'A modem (modulator-demodulator) is used to connect a computer to the internet by converting digital signals to analog and vice versa.' },
    { question: 'In MS Excel, which function is used to find the average of a range of cells?', options: ['SUM()', 'COUNT()', 'AVERAGE()', 'MAX()'], correct: 2, explanation: 'The AVERAGE() function in MS Excel calculates the arithmetic mean of a given range of cells.' },
    { question: 'What does URL stand for?', options: ['Uniform Resource Locator', 'Universal Reference Link', 'Unified Resource Locator', 'Universal Resource Linker'], correct: 0, explanation: 'URL stands for Uniform Resource Locator. It is the address used to access resources on the internet.' },
    { question: '1 Gigabyte (GB) is equal to how many Megabytes (MB)?', options: ['512 MB', '1000 MB', '1024 MB', '2048 MB'], correct: 2, explanation: '1 GB = 1024 MB. In computing, memory is measured in powers of 2, so 1 GB = 2^10 MB = 1024 MB.' },
  ],

  // =======================================
  // Environment & Ecology
  // =======================================
  'general__environment': [
    { question: 'Which gas is primarily responsible for global warming?', options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'], correct: 2, explanation: 'Carbon dioxide (CO2) is the primary greenhouse gas responsible for global warming due to burning of fossil fuels.' },
    { question: 'The "Chipko Movement" is associated with the conservation of?', options: ['Water', 'Soil', 'Forests', 'Wildlife'], correct: 2, explanation: 'The Chipko Movement (1973) was a forest conservation movement in Uttarakhand where villagers hugged trees to prevent them from being cut.' },
    { question: 'Which layer of the atmosphere contains the ozone layer?', options: ['Troposphere', 'Stratosphere', 'Mesosphere', 'Thermosphere'], correct: 1, explanation: 'The ozone layer is found in the stratosphere, approximately 15-35 km above Earth\'s surface, and protects us from UV radiation.' },
    { question: 'Which of the following is a biodegradable waste?', options: ['Plastic bag', 'Glass bottle', 'Vegetable peel', 'Aluminium can'], correct: 2, explanation: 'Vegetable peels are biodegradable as they can be decomposed by microorganisms. Plastic, glass, and aluminium are non-biodegradable.' },
    { question: 'Minamata disease is caused by pollution of water with?', options: ['Lead', 'Mercury', 'Cadmium', 'Arsenic'], correct: 1, explanation: 'Minamata disease is caused by mercury poisoning. It was first discovered in Minamata, Japan in 1956 due to mercury-contaminated water.' },
    { question: 'Which Indian national park is famous for the one-horned rhinoceros?', options: ['Jim Corbett', 'Kaziranga', 'Ranthambore', 'Gir'], correct: 1, explanation: 'Kaziranga National Park in Assam is famous for the Indian one-horned rhinoceros and is a UNESCO World Heritage Site.' },
    { question: 'The term "biodiversity" was coined by?', options: ['Charles Darwin', 'Walter G. Rosen', 'Alexander von Humboldt', 'E.O. Wilson'], correct: 1, explanation: 'The term "biodiversity" was coined by Walter G. Rosen in 1985 during the planning of the National Forum on BioDiversity.' },
    { question: 'Which protocol is related to the reduction of greenhouse gas emissions?', options: ['Montreal Protocol', 'Kyoto Protocol', 'Geneva Protocol', 'Cartagena Protocol'], correct: 1, explanation: 'The Kyoto Protocol (1997) is an international treaty that commits nations to reduce greenhouse gas emissions.' },
    { question: 'Which of the following is an example of a renewable source of energy?', options: ['Coal', 'Petroleum', 'Natural Gas', 'Solar Energy'], correct: 3, explanation: 'Solar energy is a renewable source of energy as it is inexhaustible. Coal, petroleum, and natural gas are non-renewable fossil fuels.' },
    { question: 'The "Red Data Book" provides information about species that are?', options: ['Abundant', 'Endangered', 'Extinct only', 'Invasive'], correct: 1, explanation: 'The Red Data Book, maintained by IUCN, provides information about endangered species of plants and animals across the world.' },
  ],

  // =======================================
  // Basic Reasoning
  // =======================================
  'general__reasoning': [
    { question: 'Complete the series: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '46'], correct: 1, explanation: 'The differences are 4, 6, 8, 10, 12. So the next term is 30 + 12 = 42. Pattern: n(n+1) where n = 1, 2, 3...' },
    { question: 'If in a certain code language, ROAD is written as URDG, how is SWAN written in that code?', options: ['VZDQ', 'VZDP', 'VYCP', 'VZCQ'], correct: 0, explanation: 'Each letter is shifted by +3: R+3=U, O+3=R, A+3=D, D+3=G. Similarly, S+3=V, W+3=Z, A+3=D, N+3=Q. So SWAN = VZDQ.' },
    { question: 'Find the odd one out: 3, 5, 11, 14, 17, 23', options: ['3', '5', '14', '23'], correct: 2, explanation: '14 is the odd one out because all other numbers (3, 5, 11, 17, 23) are prime numbers, but 14 is not a prime number (14 = 2 x 7).' },
    { question: 'If Monday falls on 1st of a month, what day will fall on 22nd of the same month?', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], correct: 1, explanation: '22 - 1 = 21 days difference. 21 is exactly 3 weeks (21/7 = 3). So 22nd will also be a Monday.' },
    { question: 'Pointing to a man, a woman said, "He is the son of my father\'s only daughter." How is the man related to the woman?', options: ['Son', 'Brother', 'Nephew', 'Father'], correct: 0, explanation: 'My father\'s only daughter = the woman herself. So the man is the son of the woman, i.e., her son.' },
    { question: 'In a row of students, Ramesh is 7th from the left and 12th from the right. How many students are there in the row?', options: ['17', '18', '19', '20'], correct: 1, explanation: 'Total students = 7 + 12 - 1 = 18. We subtract 1 because Ramesh is counted in both positions.' },
    { question: 'If the day before yesterday was Thursday, what day will it be the day after tomorrow?', options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday'], correct: 1, explanation: 'If the day before yesterday was Thursday, then yesterday was Friday, today is Saturday. Tomorrow is Sunday, and the day after tomorrow is Monday.' },
    { question: 'A is the father of B. B is the sister of C. D is the husband of C. How is A related to D?', options: ['Father', 'Father-in-law', 'Brother', 'Uncle'], correct: 1, explanation: 'B is A\'s daughter and C\'s sister, so C is also A\'s child. D is C\'s husband. Therefore A is D\'s father-in-law.' },
    { question: 'If "+" means "x", "-" means "/", "x" means "-" and "/" means "+", then what is the value of 8 + 6 - 3 / 5 x 2?', options: ['19', '17', '21', '15'], correct: 0, explanation: 'Replacing symbols: 8 x 6 / 3 + 5 - 2 = 48/3 + 5 - 2 = 16 + 5 - 2 = 19.' },
    { question: 'Complete the analogy: Book : Pages :: Tree : ?', options: ['Branches', 'Leaves', 'Roots', 'Flowers'], correct: 1, explanation: 'A book is made up of pages. Similarly, a tree is made up of leaves. Pages are the fundamental units of a book, as leaves are of a tree.' },
  ],

  // =======================================
  // English Grammar Basics
  // =======================================
  'general__english': [
    { question: 'Choose the correct article: "___ honest man is always respected."', options: ['A', 'An', 'The', 'No article'], correct: 1, explanation: '"An" is used before words that begin with a vowel sound. "Honest" begins with a vowel sound (the H is silent), so "An honest man" is correct.' },
    { question: 'Identify the correct tense: "She has been studying for three hours."', options: ['Present Perfect', 'Past Perfect', 'Present Perfect Continuous', 'Past Continuous'], correct: 2, explanation: '"Has been studying" is Present Perfect Continuous tense, used for actions that started in the past and are still continuing.' },
    { question: 'Choose the correct preposition: "He is good ___ mathematics."', options: ['in', 'at', 'on', 'for'], correct: 1, explanation: 'The correct phrase is "good at" when referring to a subject or skill. "Good at mathematics" is the standard usage.' },
    { question: 'Which of the following sentences is grammatically correct?', options: ['He don\'t know the answer.', 'He doesn\'t knows the answer.', 'He doesn\'t know the answer.', 'He don\'t knows the answer.'], correct: 2, explanation: 'With third person singular (he/she/it), we use "doesn\'t" + base form of the verb. "He doesn\'t know" is correct.' },
    { question: 'The plural of "child" is:', options: ['Childs', 'Childrens', 'Children', 'Childes'], correct: 2, explanation: '"Children" is the irregular plural form of "child". It does not follow the regular rule of adding -s or -es.' },
    { question: 'Choose the synonym of "Abundant":', options: ['Scarce', 'Plentiful', 'Rare', 'Limited'], correct: 1, explanation: '"Abundant" means existing in large quantities. "Plentiful" is its synonym, meaning available in large amounts.' },
    { question: 'Identify the type of sentence: "What a beautiful painting!"', options: ['Declarative', 'Interrogative', 'Exclamatory', 'Imperative'], correct: 2, explanation: 'An exclamatory sentence expresses strong emotion and ends with an exclamation mark. "What a beautiful painting!" expresses admiration.' },
    { question: 'Choose the correct form: "If I ___ a bird, I would fly."', options: ['am', 'was', 'were', 'be'], correct: 2, explanation: 'In the subjunctive mood (hypothetical/unreal conditions), "were" is used with all subjects including "I". "If I were" is grammatically correct.' },
    { question: 'The antonym of "Permanent" is:', options: ['Durable', 'Lasting', 'Temporary', 'Eternal'], correct: 2, explanation: '"Permanent" means lasting forever. Its antonym "Temporary" means lasting for a limited time only.' },
    { question: 'Choose the correct sentence:', options: ['He gave me a advice.', 'He gave me an advice.', 'He gave me some advice.', 'He gave me advices.'], correct: 2, explanation: '"Advice" is an uncountable noun. It cannot be used with "a/an" or in plural form. "Some advice" is the correct usage.' },
  ],

  // =======================================
  // Indian Civics
  // =======================================
  'general__civics': [
    { question: 'The Constitution of India came into effect on?', options: ['15 August 1947', '26 January 1950', '26 November 1949', '30 January 1948'], correct: 1, explanation: 'The Constitution of India came into effect on 26 January 1950, which is celebrated as Republic Day.' },
    { question: 'How many Fundamental Rights are guaranteed by the Indian Constitution?', options: ['5', '6', '7', '8'], correct: 1, explanation: 'The Indian Constitution originally had 7 Fundamental Rights. After the 44th Amendment (1978) abolished the Right to Property, there are now 6 Fundamental Rights.' },
    { question: 'Who is known as the "Father of the Indian Constitution"?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'Dr. B.R. Ambedkar', 'Sardar Patel'], correct: 2, explanation: 'Dr. B.R. Ambedkar is known as the Father of the Indian Constitution. He was the Chairman of the Drafting Committee of the Constituent Assembly.' },
    { question: 'The Rajya Sabha is also known as?', options: ['House of the People', 'Council of States', 'Upper Parliament', 'Senate of India'], correct: 1, explanation: 'Rajya Sabha is the Council of States and the upper house of the Indian Parliament. Lok Sabha is the House of the People.' },
    { question: 'What is the minimum age to become the President of India?', options: ['25 years', '30 years', '35 years', '40 years'], correct: 2, explanation: 'As per Article 58, the minimum age to become the President of India is 35 years.' },
    { question: 'How many Fundamental Duties are listed in the Indian Constitution?', options: ['9', '10', '11', '12'], correct: 2, explanation: 'There are 11 Fundamental Duties listed under Article 51A, added by the 42nd Amendment Act (1976). The 86th Amendment added the 11th duty in 2002.' },
    { question: 'The Panchayati Raj system in India was constitutionalized by which Amendment?', options: ['42nd Amendment', '44th Amendment', '73rd Amendment', '74th Amendment'], correct: 2, explanation: 'The 73rd Constitutional Amendment Act (1992) gave constitutional status to Panchayati Raj Institutions and added Part IX to the Constitution.' },
    { question: 'Which Article of the Indian Constitution provides the Right to Equality?', options: ['Article 14', 'Article 19', 'Article 21', 'Article 32'], correct: 0, explanation: 'Article 14 guarantees equality before law and equal protection of laws to all persons within the territory of India.' },
    { question: 'The Chief Justice of India is appointed by?', options: ['The Prime Minister', 'The President', 'The Parliament', 'The Law Minister'], correct: 1, explanation: 'The Chief Justice of India is appointed by the President of India, in consultation with judges of the Supreme Court and High Courts (as per the collegium system).' },
    { question: 'The Directive Principles of State Policy are enshrined in which Part of the Constitution?', options: ['Part III', 'Part IV', 'Part V', 'Part VI'], correct: 1, explanation: 'The Directive Principles of State Policy are contained in Part IV (Articles 36-51) of the Indian Constitution. They are guidelines for the government.' },
  ],

  // =======================================
  // Indian Art & Culture
  // =======================================
  'general__art_culture': [
    { question: 'Bharatanatyam is a classical dance form originating from which state?', options: ['Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Karnataka'], correct: 1, explanation: 'Bharatanatyam originated in Tamil Nadu and is one of the oldest classical dance forms of India, traditionally performed in Hindu temples.' },
    { question: 'The Konark Sun Temple is located in which state?', options: ['Rajasthan', 'Madhya Pradesh', 'Odisha', 'Gujarat'], correct: 2, explanation: 'The Konark Sun Temple is a 13th-century temple dedicated to the Sun God, located in Konark, Odisha. It is a UNESCO World Heritage Site.' },
    { question: 'Which Indian classical music system is prevalent in North India?', options: ['Carnatic', 'Hindustani', 'Rabindra Sangeet', 'Baul'], correct: 1, explanation: 'Hindustani classical music is the North Indian classical music tradition. Carnatic music is the South Indian classical tradition.' },
    { question: 'The famous painting "Shakuntala" was painted by?', options: ['M.F. Husain', 'Raja Ravi Varma', 'Amrita Sher-Gil', 'Jamini Roy'], correct: 1, explanation: 'Raja Ravi Varma (1848-1906) painted "Shakuntala". He is considered one of the greatest painters in the history of Indian art.' },
    { question: 'Kathakali is a classical dance form from which state?', options: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh'], correct: 2, explanation: 'Kathakali is a major form of classical dance from Kerala, known for its elaborate costumes, detailed gestures, and well-defined body movements.' },
    { question: 'The Ajanta Caves are famous for?', options: ['Rock-cut temples', 'Buddhist paintings and sculptures', 'Jain carvings', 'Hindu mythology carvings'], correct: 1, explanation: 'The Ajanta Caves in Maharashtra are famous for their Buddhist paintings and sculptures dating from the 2nd century BCE to about 480 CE.' },
    { question: 'Which festival is known as the "Festival of Lights"?', options: ['Holi', 'Diwali', 'Pongal', 'Onam'], correct: 1, explanation: 'Diwali, also known as Deepavali, is called the "Festival of Lights". It symbolizes the victory of light over darkness and good over evil.' },
    { question: 'Sitar is associated with which type of Indian music?', options: ['Carnatic', 'Hindustani', 'Folk', 'Film'], correct: 1, explanation: 'The Sitar is a plucked string instrument used primarily in Hindustani classical music. Pandit Ravi Shankar was one of its most famous exponents.' },
    { question: 'The Khajuraho temples are known for their?', options: ['Dravidian architecture', 'Nagara style architecture with erotic sculptures', 'Islamic architecture', 'Buddhist stupas'], correct: 1, explanation: 'The Khajuraho Group of Monuments in Madhya Pradesh is famous for its Nagara-style architecture and erotic sculptures. They are a UNESCO World Heritage Site.' },
    { question: 'Bihu is a folk dance associated with which state?', options: ['Punjab', 'Gujarat', 'Assam', 'Rajasthan'], correct: 2, explanation: 'Bihu is a folk dance from Assam, performed during the Bihu festival which marks the Assamese New Year and the spring festival.' },
  ],

  // =======================================
  // Banking Exam Math
  // =======================================
  'banking__math': [
    { question: 'A shopkeeper bought an article for Rs. 400 and sold it for Rs. 500. What is the profit percentage?', options: ['20%', '25%', '30%', '15%'], correct: 1, explanation: 'Profit = 500 - 400 = Rs. 100. Profit % = (100/400) x 100 = 25%.' },
    { question: 'The simple interest on Rs. 5000 at 8% per annum for 3 years is?', options: ['Rs. 1000', 'Rs. 1200', 'Rs. 1400', 'Rs. 800'], correct: 1, explanation: 'SI = PRT/100 = (5000 x 8 x 3)/100 = Rs. 1200.' },
    { question: 'If A can do a work in 10 days and B can do it in 15 days, in how many days can they together complete the work?', options: ['5 days', '6 days', '7 days', '8 days'], correct: 1, explanation: 'A\'s 1 day work = 1/10, B\'s 1 day work = 1/15. Together = 1/10 + 1/15 = (3+2)/30 = 5/30 = 1/6. So they finish in 6 days.' },
    { question: 'The compound interest on Rs. 8000 at 10% per annum for 2 years is?', options: ['Rs. 1600', 'Rs. 1680', 'Rs. 1700', 'Rs. 1760'], correct: 1, explanation: 'CI = P[(1 + R/100)^n - 1] = 8000[(1.1)^2 - 1] = 8000[1.21 - 1] = 8000 x 0.21 = Rs. 1680.' },
    { question: 'A train running at 72 km/hr crosses a platform of 240m in 20 seconds. What is the length of the train?', options: ['140m', '160m', '180m', '200m'], correct: 1, explanation: 'Speed = 72 km/hr = 20 m/s. Distance covered = 20 x 20 = 400m. Length of train = 400 - 240 = 160m.' },
    { question: 'What is 35% of 600?', options: ['180', '200', '210', '220'], correct: 2, explanation: '35% of 600 = (35/100) x 600 = 210.' },
    { question: 'The ratio of two numbers is 3:5. If the sum of the numbers is 160, what is the larger number?', options: ['60', '80', '100', '120'], correct: 2, explanation: 'Let the numbers be 3x and 5x. 3x + 5x = 160, so 8x = 160, x = 20. Larger number = 5 x 20 = 100.' },
    { question: 'If a man walks at 5 km/hr, he reaches his office 7 minutes late. If he walks at 6 km/hr, he reaches 5 minutes early. What is the distance to his office?', options: ['4 km', '5 km', '6 km', '7 km'], correct: 2, explanation: 'Difference in time = 7 + 5 = 12 minutes = 1/5 hour. Distance = (S1 x S2 x T)/(S2 - S1) = (5 x 6 x 1/5)/(6-5) = 6 km.' },
    { question: 'A sum doubles itself in 8 years at simple interest. The rate of interest is?', options: ['10%', '12.5%', '15%', '20%'], correct: 1, explanation: 'If sum doubles, interest = principal. So P = P x R x 8/100, which gives R = 100/8 = 12.5%.' },
    { question: 'The average of 5 numbers is 42. If one number is excluded, the average becomes 38. The excluded number is?', options: ['50', '54', '58', '62'], correct: 2, explanation: 'Sum of 5 numbers = 42 x 5 = 210. Sum of 4 numbers = 38 x 4 = 152. Excluded number = 210 - 152 = 58.' },
  ],

  // =======================================
  // Banking Awareness / GK
  // =======================================
  'banking__gk': [
    { question: 'The Reserve Bank of India (RBI) was established in which year?', options: ['1930', '1935', '1947', '1950'], correct: 1, explanation: 'The Reserve Bank of India was established on 1 April 1935 under the RBI Act, 1934. It was nationalized in 1949.' },
    { question: 'What does NPA stand for in banking?', options: ['Non-Performing Assets', 'National Payment Authority', 'Net Profit Account', 'Non-Profitable Account'], correct: 0, explanation: 'NPA stands for Non-Performing Assets. An asset becomes non-performing when it ceases to generate income for the bank (overdue for more than 90 days).' },
    { question: 'SEBI stands for?', options: ['Stock Exchange Board of India', 'Securities and Exchange Board of India', 'Securities and Equity Board of India', 'State Exchange Board of India'], correct: 1, explanation: 'SEBI stands for Securities and Exchange Board of India, established in 1992 to regulate the securities market in India.' },
    { question: 'Which of the following is NOT a function of RBI?', options: ['Issuing currency notes', 'Regulating foreign trade policy', 'Banker to the government', 'Managing foreign exchange reserves'], correct: 1, explanation: 'Regulating foreign trade policy is the function of the Ministry of Commerce and DGFT, not RBI. RBI handles monetary policy, currency issuance, and banking regulation.' },
    { question: 'The headquarters of RBI is located in?', options: ['New Delhi', 'Kolkata', 'Mumbai', 'Chennai'], correct: 2, explanation: 'The headquarters of the Reserve Bank of India is located in Mumbai, Maharashtra.' },
    { question: 'What is the full form of IFSC code used in banking?', options: ['Indian Financial System Code', 'International Fund Service Code', 'Indian Fund Settlement Code', 'Interbank Financial Security Code'], correct: 0, explanation: 'IFSC stands for Indian Financial System Code, an 11-character alphanumeric code used to identify bank branches for electronic fund transfers.' },
    { question: 'The Pradhan Mantri Jan Dhan Yojana (PMJDY) was launched in which year?', options: ['2012', '2014', '2016', '2018'], correct: 1, explanation: 'PMJDY was launched on 28 August 2014 by PM Narendra Modi. It is a financial inclusion scheme aimed at opening bank accounts for unbanked people.' },
    { question: 'Which committee recommended the setting up of Regional Rural Banks (RRBs)?', options: ['Narasimham Working Group', 'Kelkar Committee', 'Rangarajan Committee', 'Tandon Committee'], correct: 0, explanation: 'The Narasimham Working Group (1975) recommended the establishment of Regional Rural Banks. RRBs were set up under the RRB Act, 1976.' },
    { question: 'What is the minimum amount required to open a savings account under PMJDY?', options: ['Rs. 100', 'Rs. 500', 'Rs. 1000', 'Zero balance'], correct: 3, explanation: 'Under PMJDY, bank accounts can be opened with zero balance. The scheme aims to provide universal access to banking facilities.' },
    { question: 'CRR stands for?', options: ['Cash Reserve Ratio', 'Credit Reserve Ratio', 'Currency Reserve Ratio', 'Capital Reserve Ratio'], correct: 0, explanation: 'CRR stands for Cash Reserve Ratio. It is the percentage of a bank\'s total deposits that must be maintained with the RBI as liquid cash.' },
  ],

  // =======================================
  // General Science
  // =======================================
  'general__science': [
    { question: 'The SI unit of force is?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correct: 2, explanation: 'The SI unit of force is Newton (N), named after Sir Isaac Newton. 1 Newton = 1 kg.m/s^2.' },
    { question: 'Which organ in the human body produces bile?', options: ['Stomach', 'Pancreas', 'Liver', 'Kidney'], correct: 2, explanation: 'Bile is produced by the liver and stored in the gallbladder. It helps in the digestion and absorption of fats.' },
    { question: 'The chemical formula of common salt is?', options: ['KCl', 'NaCl', 'CaCl2', 'MgCl2'], correct: 1, explanation: 'Common salt is sodium chloride (NaCl). It is an ionic compound formed by the reaction of sodium (Na) and chlorine (Cl).' },
    { question: 'Which planet is known as the "Red Planet"?', options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], correct: 2, explanation: 'Mars is known as the Red Planet due to iron oxide (rust) on its surface which gives it a reddish appearance.' },
    { question: 'Photosynthesis converts light energy into?', options: ['Kinetic energy', 'Chemical energy', 'Thermal energy', 'Electrical energy'], correct: 1, explanation: 'Photosynthesis converts light energy from the sun into chemical energy stored in glucose (C6H12O6).' },
    { question: 'The powerhouse of the cell is?', options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Golgi body'], correct: 2, explanation: 'Mitochondria are called the powerhouse of the cell because they produce ATP (adenosine triphosphate), the energy currency of the cell.' },
    { question: 'Which metal is the best conductor of electricity?', options: ['Copper', 'Gold', 'Silver', 'Aluminium'], correct: 2, explanation: 'Silver is the best conductor of electricity, followed by copper and gold. However, copper is more commonly used due to its lower cost.' },
    { question: 'The normal body temperature of a human being is?', options: ['36.9 degree C', '37 degree C', '98.4 degree F', 'Both 37 degree C and 98.6 degree F'], correct: 3, explanation: 'The normal human body temperature is approximately 37 degree C or 98.6 degree F (310 K).' },
    { question: 'Which acid is present in the human stomach?', options: ['Sulphuric acid', 'Hydrochloric acid', 'Nitric acid', 'Acetic acid'], correct: 1, explanation: 'Hydrochloric acid (HCl) is secreted by the parietal cells of the stomach lining. It helps in digestion and kills bacteria.' },
    { question: 'Sound cannot travel through?', options: ['Air', 'Water', 'Steel', 'Vacuum'], correct: 3, explanation: 'Sound requires a material medium to travel. It cannot travel through a vacuum because there are no particles to vibrate and transmit the sound waves.' },
  ],

  // =======================================
  // Sports GK
  // =======================================
  'general__sports': [
    { question: 'The first modern Olympic Games were held in which year?', options: ['1892', '1896', '1900', '1904'], correct: 1, explanation: 'The first modern Olympic Games were held in Athens, Greece in 1896, organized by the International Olympic Committee (IOC).' },
    { question: 'Who has won the most number of Cricket World Cup titles as a player?', options: ['Sachin Tendulkar', 'Ricky Ponting', 'MS Dhoni', 'Clive Lloyd'], correct: 1, explanation: 'Ricky Ponting has won the Cricket World Cup 3 times as a player (1999, 2003, and 2007) with Australia.' },
    { question: 'The Rajiv Gandhi Khel Ratna Award has been renamed as?', options: ['Dhyan Chand Khel Ratna', 'Major Dhyan Chand Khel Ratna', 'Arjuna Award', 'Dronacharya Award'], correct: 1, explanation: 'The Rajiv Gandhi Khel Ratna Award was renamed as the Major Dhyan Chand Khel Ratna Award in August 2021, in honour of hockey legend Major Dhyan Chand.' },
    { question: 'Which country has won the most FIFA World Cup titles?', options: ['Germany', 'Argentina', 'Brazil', 'Italy'], correct: 2, explanation: 'Brazil has won the FIFA World Cup a record 5 times (1958, 1962, 1970, 1994, 2002).' },
    { question: 'The headquarters of the International Cricket Council (ICC) is located in?', options: ['London', 'Dubai', 'Mumbai', 'Melbourne'], correct: 1, explanation: 'The ICC headquarters is located in Dubai, United Arab Emirates. It moved from London to Dubai in 2005.' },
    { question: 'Who is known as the "Flying Sikh" of India?', options: ['Kapil Dev', 'Milkha Singh', 'P.T. Usha', 'Dhanraj Pillay'], correct: 1, explanation: 'Milkha Singh (1929-2021) was known as the "Flying Sikh". He was an Indian track and field sprinter who narrowly missed a medal at the 1960 Rome Olympics.' },
    { question: 'In which sport is the term "Love" used?', options: ['Badminton', 'Tennis', 'Cricket', 'Hockey'], correct: 1, explanation: 'In tennis, "Love" means zero (0). For example, "15-Love" means the score is 15-0.' },
    { question: 'The Eden Gardens cricket stadium is located in?', options: ['Mumbai', 'Delhi', 'Kolkata', 'Chennai'], correct: 2, explanation: 'Eden Gardens is a cricket ground in Kolkata, West Bengal. It is one of the oldest and largest cricket stadiums in India with a capacity of about 68,000.' },
    { question: 'Who was the first Indian woman to win an Olympic medal?', options: ['P.T. Usha', 'Saina Nehwal', 'Karnam Malleswari', 'Mary Kom'], correct: 2, explanation: 'Karnam Malleswari won a bronze medal in weightlifting (69 kg category) at the 2000 Sydney Olympics, becoming the first Indian woman to win an Olympic medal.' },
    { question: 'The term "Grand Slam" in tennis refers to winning how many major tournaments in a calendar year?', options: ['3', '4', '5', '6'], correct: 1, explanation: 'A Grand Slam in tennis means winning all 4 major tournaments in a single calendar year: Australian Open, French Open, Wimbledon, and US Open.' },
  ],

  // =======================================
  // SBI PO Reasoning
  // =======================================
  'sbi__reasoning': [
    { question: 'In a certain code, KNIFE is written as MPKHG. How is PLATE written in that code?', options: ['RNCVG', 'RNCWG', 'RMCVG', 'RNCVH'], correct: 0, explanation: 'Each letter is shifted by +2: K+2=M, N+2=P, I+2=K, F+2=H, E+2=G. Similarly P+2=R, L+2=N, A+2=C, T+2=V, E+2=G. PLATE = RNCVG.' },
    { question: 'Five friends P, Q, R, S, T are sitting in a row. P is to the left of Q. R is to the right of S but left of T. S is to the right of Q. Who is sitting in the middle?', options: ['P', 'Q', 'R', 'S'], correct: 3, explanation: 'From the conditions: P-Q-S-R-T. S is in the middle (3rd position).' },
    { question: 'If "A $ B" means A is father of B, "A # B" means A is mother of B, "A @ B" means A is brother of B, then what does "P $ Q @ R # S" mean?', options: ['P is grandfather of S', 'P is father of S', 'P is uncle of S', 'P is mother of S'], correct: 0, explanation: 'P is father of Q. Q is brother of R. R is mother of S. So P is grandfather (maternal) of S.' },
    { question: 'Statement: All books are pens. Some pens are pencils. Conclusion I: Some books are pencils. Conclusion II: Some pencils are books.', options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], correct: 3, explanation: 'All books are pens (A-type). Some pens are pencils (I-type). No definite conclusion about books and pencils can be drawn. Neither follows.' },
    { question: 'In a queue, Mohan is 15th from the front and Sohan is 20th from the end. If there are 5 persons between them, how many persons are in the queue?', options: ['39', '40', '41', '35'], correct: 0, explanation: 'Mohan is 15th from front. Sohan is 20th from end. Between them are 5 persons. Total = 15 + 5 + 20 - 1 = 39.' },
    { question: 'Which number replaces the question mark? 3, 7, 15, 31, 63, ?', options: ['125', '126', '127', '128'], correct: 2, explanation: 'Pattern: 3×2+1=7, 7×2+1=15, 15×2+1=31, 31×2+1=63, 63×2+1=127. Or: 2^2-1, 2^3-1, 2^4-1... 2^7-1=127.' },
    { question: 'Directions: A man walks 5 km towards South, turns right and walks 3 km, then turns right again and walks 5 km. Which direction is he facing now?', options: ['East', 'West', 'North', 'South'], correct: 2, explanation: 'Starting facing South, walks 5 km. Turns right (now facing West), walks 3 km. Turns right (now facing North), walks 5 km. He is facing North.' },
    { question: 'If the 3rd day of a month is Monday, what day will the 27th be?', options: ['Thursday', 'Wednesday', 'Saturday', 'Friday'], correct: 0, explanation: '27 - 3 = 24 days difference. 24/7 = 3 weeks + 3 days. Monday + 3 days = Thursday. So the 27th is Thursday.' },
    { question: 'In a family of six members A, B, C, D, E, F, there are two married couples. B is an engineer and father of F. C is grandfather of F and father of A. D is grandmother of F and mother of E. How is E related to F?', options: ['Father', 'Uncle', 'Mother', 'Aunt'], correct: 1, explanation: 'C is father of A and grandfather of F. D is mother of E. B is father of F. A is parent of F (married to B). E is child of D. Since C and D are married, E is sibling of A. So E is uncle/aunt of F. Since B is father of F, A must be mother. E is uncle of F.' },
    { question: 'Statements: No flower is a tree. All trees are plants. Conclusions: I. No flower is a plant. II. Some plants are trees.', options: ['Only I follows', 'Only II follows', 'Both follow', 'Neither follows'], correct: 1, explanation: 'No flower is tree (E-type). All trees are plants (A-type). Conclusion II: "Some plants are trees" is the converse of "All trees are plants" — this follows. Conclusion I: We cannot conclude that no flower is a plant. Only II follows.' },
  ],

  // =======================================
  // RBI Grade B Economics
  // =======================================
  'rbi__economics': [
    { question: 'The concept of "Deficit Financing" means?', options: ['Government spending > revenue', 'Borrowing from RBI by issuing new currency', 'Trade deficit', 'Budget surplus'], correct: 1, explanation: 'Deficit financing refers to the practice of a government spending more money than it receives as revenue, with the difference being made up by borrowing from the central bank (printing new currency).' },
    { question: 'Which of the following is NOT a tool of monetary policy?', options: ['Repo Rate', 'CRR', 'SLR', 'Fiscal Deficit'], correct: 3, explanation: 'Fiscal Deficit is a part of fiscal policy, not monetary policy. Repo Rate, CRR, and SLR are tools of monetary policy controlled by RBI.' },
    { question: 'The Phillips Curve shows the relationship between?', options: ['Interest rate and investment', 'Inflation and unemployment', 'GDP and population', 'Savings and income'], correct: 1, explanation: 'The Phillips Curve shows an inverse relationship between inflation and unemployment. When unemployment decreases, inflation tends to increase, and vice versa.' },
    { question: 'What is the current Statutory Liquidity Ratio (SLR) requirement?', options: ['15%', '18%', '21%', '23%'], correct: 1, explanation: 'The SLR is the percentage of NDTL (Net Demand and Time Liabilities) that banks must maintain in the form of liquid assets like government securities. It is around 18%.' },
    { question: 'GDP at factor cost is GDP at market price minus?', options: ['Subsidies', 'Indirect taxes + subsidies', 'Net indirect taxes', 'Direct taxes'], correct: 2, explanation: 'GDP at factor cost = GDP at market price - Net indirect taxes (Indirect taxes - Subsidies). This gives the actual cost of production.' },
    { question: 'Which committee recommended the establishment of NABARD?', options: ['Narasimham Committee', 'Sivaraman Committee', 'Kelkar Committee', 'Rangarajan Committee'], correct: 1, explanation: 'The B. Sivaraman Committee (1979) recommended the establishment of NABARD. NABARD was established on 12 July 1982.' },
    { question: 'What is "Stagflation"?', options: ['High growth + high inflation', 'Low growth + low inflation', 'High inflation + economic stagnation', 'Deflation + high growth'], correct: 2, explanation: 'Stagflation is a situation where the economy experiences high inflation combined with economic stagnation (slow growth and high unemployment).' },
    { question: 'The Laffer Curve illustrates the relationship between?', options: ['Tax rate and tax revenue', 'Interest rate and money supply', 'Price and demand', 'Inflation and growth'], correct: 0, explanation: 'The Laffer Curve shows that increasing tax rates beyond a certain point actually decreases total tax revenue, as higher rates discourage economic activity.' },
    { question: 'Open Market Operations (OMO) are conducted by RBI to?', options: ['Fix exchange rates', 'Control money supply in the economy', 'Set interest rates for banks', 'Manage foreign reserves'], correct: 1, explanation: 'OMO involves buying and selling of government securities by RBI in the open market to regulate money supply. Buying injects liquidity; selling absorbs it.' },
    { question: 'What does MCLR stand for?', options: ['Marginal Cost of Lending Rate', 'Maximum Credit Lending Rate', 'Minimum Capital Lending Rate', 'Marginal Cost of Funds based Lending Rate'], correct: 3, explanation: 'MCLR stands for Marginal Cost of Funds based Lending Rate. It is the minimum interest rate below which banks are not allowed to lend.' },
  ],

  // =======================================
  // CTET Child Development & Pedagogy
  // =======================================
  'ctet__pedagogy': [
    { question: 'According to Piaget, the stage of cognitive development in which children begin to think logically about concrete events is?', options: ['Sensorimotor', 'Preoperational', 'Concrete Operational', 'Formal Operational'], correct: 2, explanation: 'The Concrete Operational stage (7-11 years) is when children begin to think logically about concrete events but struggle with abstract concepts.' },
    { question: 'Vygotsky\'s concept of "Zone of Proximal Development" refers to?', options: ['What a child can do independently', 'What a child cannot do at all', 'The gap between what a child can do alone and with guidance', 'The child\'s current grade level'], correct: 2, explanation: 'ZPD is the distance between what a learner can do without help and what they can do with guidance from a skilled partner (scaffolding).' },
    { question: 'Which type of intelligence is described by Howard Gardner as "the ability to understand other people"?', options: ['Linguistic', 'Interpersonal', 'Intrapersonal', 'Logical-Mathematical'], correct: 1, explanation: 'Interpersonal intelligence involves the ability to understand and interact effectively with others. It includes sensitivity to others\' moods and intentions.' },
    { question: 'The term "Inclusive Education" refers to?', options: ['Education for gifted children only', 'Education that includes all children regardless of ability', 'Special schools for disabled children', 'Online education for all'], correct: 1, explanation: 'Inclusive education means all children, including those with disabilities and special needs, learn together in the same classrooms with appropriate support.' },
    { question: 'According to Kohlberg, at which level of moral development do children follow rules to avoid punishment?', options: ['Pre-conventional', 'Conventional', 'Post-conventional', 'None of the above'], correct: 0, explanation: 'At the pre-conventional level (Stage 1), children obey rules primarily to avoid punishment. Moral reasoning is based on self-interest.' },
    { question: 'The concept of "Learning by Doing" was emphasized by?', options: ['John Dewey', 'B.F. Skinner', 'Jean Piaget', 'Sigmund Freud'], correct: 0, explanation: 'John Dewey advocated "Learning by Doing" — the idea that children learn best through hands-on activities and experiences rather than passive listening.' },
    { question: 'Dyslexia is a learning disability associated with difficulty in?', options: ['Mathematics', 'Reading and writing', 'Speaking', 'Physical coordination'], correct: 1, explanation: 'Dyslexia is a specific learning disability that primarily affects reading and language processing. It is neurological in origin.' },
    { question: 'Which assessment type is used to monitor students\' progress during the learning process?', options: ['Summative assessment', 'Formative assessment', 'Diagnostic assessment', 'Norm-referenced assessment'], correct: 1, explanation: 'Formative assessment is ongoing assessment used during instruction to monitor learning progress and provide feedback for improvement.' },
    { question: 'According to Maslow\'s Hierarchy of Needs, which need must be satisfied first?', options: ['Safety needs', 'Physiological needs', 'Belongingness needs', 'Self-actualization'], correct: 1, explanation: 'Maslow\'s hierarchy places physiological needs (food, water, shelter) at the base. These must be satisfied before higher-level needs like safety, belonging, and self-actualization.' },
    { question: 'The Right to Education Act (RTE) 2009 mandates free education for children aged?', options: ['5-12 years', '6-14 years', '6-18 years', '5-14 years'], correct: 1, explanation: 'The RTE Act 2009 provides free and compulsory education for all children aged 6-14 years (Classes 1-8) as a fundamental right under Article 21A.' },
  ],

  // =======================================
  // NDA Mathematics
  // =======================================
  'nda__math': [
    { question: 'If sin(A) = 3/5, what is cos(A)?', options: ['4/5', '3/4', '5/3', '5/4'], correct: 0, explanation: 'Using sin²A + cos²A = 1: (3/5)² + cos²A = 1 → cos²A = 1 - 9/25 = 16/25 → cosA = 4/5.' },
    { question: 'The determinant of a 2x2 matrix [[a,b],[c,d]] is?', options: ['ad + bc', 'ad - bc', 'ac - bd', 'ac + bd'], correct: 1, explanation: 'The determinant of [[a,b],[c,d]] = ad - bc. This is a fundamental property of 2x2 matrices.' },
    { question: 'The value of log₂(32) is?', options: ['4', '5', '6', '8'], correct: 1, explanation: 'log₂(32) = log₂(2⁵) = 5. Because 2⁵ = 32.' },
    { question: 'The sum of an infinite GP with first term a = 3 and common ratio r = 1/2 is?', options: ['3', '4', '5', '6'], correct: 3, explanation: 'Sum of infinite GP = a/(1-r) = 3/(1-1/2) = 3/(1/2) = 6.' },
    { question: 'The number of permutations of the letters in the word "APPLE" is?', options: ['60', '120', '30', '24'], correct: 0, explanation: 'APPLE has 5 letters with P repeated twice. Permutations = 5!/2! = 120/2 = 60.' },
    { question: 'If vectors A = 2i + 3j and B = i - 2j, then A.B (dot product) is?', options: ['-4', '4', '-8', '8'], correct: 0, explanation: 'A.B = (2)(1) + (3)(-2) = 2 - 6 = -4.' },
    { question: 'The derivative of x³ + 2x² - 5x + 3 is?', options: ['3x² + 4x - 5', '3x² + 2x - 5', 'x³ + 4x - 5', '3x² + 4x + 5'], correct: 0, explanation: 'd/dx(x³) = 3x², d/dx(2x²) = 4x, d/dx(-5x) = -5, d/dx(3) = 0. So derivative = 3x² + 4x - 5.' },
    { question: 'The area of a triangle with vertices (0,0), (4,0), and (0,3) is?', options: ['12', '6', '7', '24'], correct: 1, explanation: 'Area = (1/2)|x₁(y₂-y₃) + x₂(y₃-y₁) + x₃(y₁-y₂)| = (1/2)|0+12+0| = 6. Or simply (1/2) × base × height = (1/2)(4)(3) = 6.' },
    { question: 'If P(A) = 0.6 and P(B) = 0.3 and A and B are independent, then P(A∩B) is?', options: ['0.18', '0.9', '0.3', '0.12'], correct: 0, explanation: 'For independent events, P(A∩B) = P(A) × P(B) = 0.6 × 0.3 = 0.18.' },
    { question: 'The equation x² + y² - 6x + 4y - 12 = 0 represents a circle with centre at?', options: ['(3, -2)', '(-3, 2)', '(6, -4)', '(-6, 4)'], correct: 0, explanation: 'Comparing with x²+y²+2gx+2fy+c=0: 2g=-6→g=-3, 2f=4→f=2. Centre = (-g,-f) = (3,-2).' },
  ],

  // =======================================
  // SSC GD General Knowledge
  // =======================================
  'ssc_gd__gk': [
    { question: 'The full form of BSF is?', options: ['Border Security Force', 'Border Safety Force', 'Border Surveillance Force', 'Border Service Force'], correct: 0, explanation: 'BSF stands for Border Security Force. It is the primary border guarding force of India, established on 1 December 1965.' },
    { question: 'Which is the largest paramilitary force in the world?', options: ['BSF', 'CRPF', 'ITBP', 'CISF'], correct: 1, explanation: 'CRPF (Central Reserve Police Force) is the largest paramilitary force in the world with over 3 lakh personnel. It was established in 1939.' },
    { question: 'The Tropic of Cancer does NOT pass through which Indian state?', options: ['Rajasthan', 'Madhya Pradesh', 'Bihar', 'Jharkhand'], correct: 2, explanation: 'The Tropic of Cancer passes through 8 Indian states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram. Bihar is not one of them.' },
    { question: 'Who is the supreme commander of the Indian Armed Forces?', options: ['Prime Minister', 'Defence Minister', 'President', 'Army Chief'], correct: 2, explanation: 'The President of India is the Supreme Commander of the Indian Armed Forces as per Article 53 of the Constitution.' },
    { question: 'The National Sports Day of India is celebrated on?', options: ['29 August', '12 January', '15 September', '2 October'], correct: 0, explanation: 'National Sports Day is celebrated on 29 August, the birth anniversary of hockey legend Major Dhyan Chand.' },
    { question: 'Which blood group is known as the "Universal Donor"?', options: ['A+', 'B+', 'AB+', 'O-'], correct: 3, explanation: 'O negative (O-) is the universal donor blood group because it can be transfused to patients of any blood group without causing a reaction.' },
    { question: 'The Thar Desert is located in which Indian state?', options: ['Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Maharashtra'], correct: 1, explanation: 'The Thar Desert (Great Indian Desert) is primarily located in Rajasthan. It also extends into Gujarat, Punjab, and Haryana.' },
    { question: 'India\'s first nuclear test was conducted at?', options: ['Thumba', 'Sriharikota', 'Pokhran', 'Chandipur'], correct: 2, explanation: 'India\'s first nuclear test, "Smiling Buddha" (Pokhran-I), was conducted on 18 May 1974 at Pokhran, Rajasthan.' },
    { question: 'The chemical name of Vitamin C is?', options: ['Retinol', 'Thiamine', 'Ascorbic acid', 'Calciferol'], correct: 2, explanation: 'Vitamin C is chemically known as Ascorbic acid. It is found in citrus fruits and helps in wound healing and immunity.' },
    { question: 'Fundamental Duties are mentioned in which Article of the Indian Constitution?', options: ['Article 21', 'Article 32', 'Article 51A', 'Article 368'], correct: 2, explanation: 'Fundamental Duties are listed in Article 51A, Part IVA of the Constitution. They were added by the 42nd Amendment Act, 1976.' },
  ],

  // =======================================
  // Indian Economy (Detailed)
  // =======================================
  'general__indian_economy': [
    { question: 'Which organization publishes the "Economic Survey" of India?', options: ['RBI', 'NITI Aayog', 'Ministry of Finance', 'Ministry of Commerce'], correct: 2, explanation: 'The Economic Survey is published annually by the Department of Economic Affairs, Ministry of Finance, Government of India. It is presented in Parliament before the Union Budget.' },
    { question: 'What is India\'s tax-to-GDP ratio approximately?', options: ['8-10%', '10-12%', '15-17%', '20-22%'], correct: 1, explanation: 'India\'s tax-to-GDP ratio is approximately 10-12%, which is lower compared to OECD countries. The government aims to increase this ratio.' },
    { question: 'GST was implemented in India on?', options: ['1 April 2017', '1 July 2017', '1 January 2018', '1 April 2018'], correct: 1, explanation: 'GST (Goods and Services Tax) was implemented in India on 1 July 2017, replacing multiple indirect taxes. It was introduced via the 101st Constitutional Amendment.' },
    { question: 'The concept of "Five Year Plans" in India was adopted from?', options: ['USA', 'UK', 'USSR', 'China'], correct: 2, explanation: 'India adopted the concept of Five Year Plans from the USSR (Soviet Union). The first Five Year Plan was launched in 1951 under the Planning Commission.' },
    { question: 'Which sector contributes the most to India\'s GDP?', options: ['Agriculture', 'Industry', 'Services', 'Mining'], correct: 2, explanation: 'The services sector contributes approximately 55% of India\'s GDP, followed by industry (about 25%) and agriculture (about 15-17%).' },
    { question: 'The Finance Commission is constituted every?', options: ['3 years', '5 years', '7 years', '10 years'], correct: 1, explanation: 'The Finance Commission is constituted every 5 years under Article 280. It recommends the distribution of tax revenues between the Centre and States.' },
    { question: 'NITI Aayog replaced the Planning Commission in which year?', options: ['2013', '2014', '2015', '2016'], correct: 2, explanation: 'NITI Aayog (National Institution for Transforming India) was established on 1 January 2015, replacing the Planning Commission which was dissolved.' },
    { question: 'What is the primary objective of the MUDRA scheme?', options: ['Housing loans', 'Micro enterprise funding', 'Education loans', 'Agricultural credit'], correct: 1, explanation: 'MUDRA (Micro Units Development and Refinance Agency) provides loans up to Rs. 10 lakh to micro/small enterprises under Shishu, Kishor, and Tarun categories.' },
    { question: 'Which country is India\'s largest trading partner?', options: ['USA', 'China', 'UAE', 'Saudi Arabia'], correct: 1, explanation: 'China is India\'s largest trading partner in terms of total bilateral trade, followed by the USA and UAE.' },
    { question: 'The Foreign Exchange Management Act (FEMA) was enacted in?', options: ['1973', '1991', '1999', '2002'], correct: 2, explanation: 'FEMA was enacted in 1999, replacing the Foreign Exchange Regulation Act (FERA) of 1973. It is administered by RBI and aims to facilitate external trade and payments.' },
  ],

  // =======================================
  // Modern Indian History
  // =======================================
  'general__modern_history': [
    { question: 'The Indian National Congress was founded in which year?', options: ['1857', '1875', '1885', '1905'], correct: 2, explanation: 'The Indian National Congress was founded on 28 December 1885 in Bombay by A.O. Hume, Dadabhai Naoroji, and Dinshaw Wacha.' },
    { question: 'The Jallianwala Bagh massacre took place on?', options: ['13 April 1919', '13 March 1919', '13 April 1920', '13 March 1920'], correct: 0, explanation: 'The Jallianwala Bagh massacre occurred on 13 April 1919 in Amritsar, when General Dyer ordered troops to fire on a peaceful gathering.' },
    { question: 'Who gave the slogan "Inquilab Zindabad"?', options: ['Bhagat Singh', 'Hasrat Mohani', 'Subhas Chandra Bose', 'Chandrashekhar Azad'], correct: 1, explanation: 'The slogan "Inquilab Zindabad" (Long Live Revolution) was coined by Maulana Hasrat Mohani in 1921. It was later popularized by Bhagat Singh.' },
    { question: 'The first session of the Indian National Congress was presided over by?', options: ['A.O. Hume', 'Dadabhai Naoroji', 'W.C. Bonnerjee', 'Surendranath Banerjee'], correct: 2, explanation: 'W.C. Bonnerjee (Womesh Chunder Bonnerjee) was the first president of the Indian National Congress and presided over its first session in Bombay (1885).' },
    { question: 'The Swadeshi Movement was launched in response to?', options: ['Rowlatt Act', 'Partition of Bengal', 'Salt Tax', 'Jallianwala Bagh'], correct: 1, explanation: 'The Swadeshi Movement (1905) was launched in response to Lord Curzon\'s decision to partition Bengal. It promoted Indian goods and boycotted British products.' },
    { question: 'Who founded the "Servants of India Society"?', options: ['Bal Gangadhar Tilak', 'Gopal Krishna Gokhale', 'Lala Lajpat Rai', 'Bipin Chandra Pal'], correct: 1, explanation: 'Gopal Krishna Gokhale founded the Servants of India Society in 1905 in Pune. It aimed to train Indians to serve the country and promote education.' },
    { question: 'The Dandi March was started on?', options: ['12 March 1930', '6 April 1930', '26 January 1930', '8 August 1930'], correct: 0, explanation: 'The Dandi March (Salt March) started on 12 March 1930 from Sabarmati Ashram. Gandhi reached Dandi on 6 April 1930 and broke the salt law.' },
    { question: 'The Cripps Mission came to India in?', options: ['1940', '1942', '1944', '1946'], correct: 1, explanation: 'The Cripps Mission came to India in March 1942, led by Sir Stafford Cripps. It proposed dominion status for India after the war but was rejected by Congress and Muslim League.' },
    { question: 'Who was the last Viceroy of British India?', options: ['Lord Wavell', 'Lord Mountbatten', 'Lord Irwin', 'Lord Linlithgow'], correct: 1, explanation: 'Lord Mountbatten was the last Viceroy of British India (1947). He oversaw the partition of India and the transfer of power.' },
    { question: 'The Cabinet Mission Plan of 1946 proposed?', options: ['Partition of India', 'A three-tier federal structure', 'Complete independence', 'Dominion status'], correct: 1, explanation: 'The Cabinet Mission Plan (1946) proposed a three-tier federal structure for India: Union, Groups, and Provinces. It rejected the demand for a separate Pakistan.' },
  ],

  // =======================================
  // UPSC Polity Advanced
  // =======================================
  'upsc__polity_advanced': [
    { question: 'Which Article of the Constitution provides for the establishment of a Finance Commission?', options: ['Article 270', 'Article 275', 'Article 280', 'Article 300'], correct: 2, explanation: 'Article 280 provides for the establishment of a Finance Commission every 5 years to recommend distribution of taxes between Centre and States.' },
    { question: 'The concept of "Basic Structure" of the Constitution was propounded in which case?', options: ['Golaknath Case (1967)', 'Kesavananda Bharati Case (1973)', 'Minerva Mills Case (1980)', 'Maneka Gandhi Case (1978)'], correct: 1, explanation: 'The Basic Structure doctrine was established in the Kesavananda Bharati v. State of Kerala case (1973) by a 13-judge bench of the Supreme Court.' },
    { question: 'Which Schedule of the Constitution deals with anti-defection law?', options: ['8th Schedule', '9th Schedule', '10th Schedule', '11th Schedule'], correct: 2, explanation: 'The 10th Schedule (added by the 52nd Amendment, 1985) deals with anti-defection law, which disqualifies members for defecting from their party.' },
    { question: 'Article 370, which gave special status to Jammu & Kashmir, was in which Part of the Constitution?', options: ['Part XX', 'Part XXI', 'Part XXII', 'Part XIX'], correct: 1, explanation: 'Article 370 was in Part XXI (Temporary, Transitional and Special Provisions). It was effectively abrogated in August 2019.' },
    { question: 'The Right to Education (RTE) Act was enacted under which Constitutional Amendment?', options: ['85th Amendment', '86th Amendment', '91st Amendment', '93rd Amendment'], correct: 1, explanation: 'The 86th Constitutional Amendment (2002) added Article 21A, making education a fundamental right for children aged 6-14. The RTE Act 2009 gave effect to this.' },
    { question: 'Inter-State Council is established under which Article?', options: ['Article 256', 'Article 263', 'Article 300A', 'Article 312'], correct: 1, explanation: 'Article 263 provides for the establishment of an Inter-State Council to investigate and discuss subjects of common interest between Centre and States.' },
    { question: 'Which body resolves disputes related to the election of the President?', options: ['Election Commission', 'Supreme Court', 'Parliament', 'High Court'], correct: 1, explanation: 'Under Article 71, all doubts and disputes arising out of the election of the President or Vice-President are decided by the Supreme Court.' },
    { question: 'The Panchayati Raj system was constitutionalized by which Amendment?', options: ['71st Amendment', '72nd Amendment', '73rd Amendment', '74th Amendment'], correct: 2, explanation: 'The 73rd Constitutional Amendment (1992) constitutionalized the Panchayati Raj system by adding Part IX and the 11th Schedule.' },
    { question: 'Article 32 provides for which remedy?', options: ['Appeal to High Court', 'Writ jurisdiction of Supreme Court', 'Judicial Review', 'Public Interest Litigation'], correct: 1, explanation: 'Article 32 provides the right to move the Supreme Court for enforcement of fundamental rights through writs (habeas corpus, mandamus, prohibition, certiorari, quo warranto).' },
    { question: 'Who appoints the Chief Election Commissioner of India?', options: ['Prime Minister', 'President', 'Parliament', 'Chief Justice of India'], correct: 1, explanation: 'Under Article 324, the Chief Election Commissioner and other Election Commissioners are appointed by the President of India.' },
  ],

  // =======================================
  // SSC CGL Quantitative Aptitude Advanced
  // =======================================
  'ssc_cgl__math_advanced': [
    { question: 'If the compound interest on a sum for 2 years at 10% per annum is Rs 525, what is the simple interest?', options: ['Rs 500', 'Rs 510', 'Rs 475', 'Rs 490'], correct: 0, explanation: 'CI for 2 years = P[(1+R/100)²-1]. Let P be the principal. CI = P(0.21) = 525, so P = 2500. SI = 2500×10×2/100 = Rs 500.' },
    { question: 'A train 150m long passes a pole in 15 seconds. How long will it take to cross a platform 450m long?', options: ['45 sec', '50 sec', '60 sec', '55 sec'], correct: 2, explanation: 'Speed = 150/15 = 10 m/s. To cross platform: total distance = 150+450 = 600m. Time = 600/10 = 60 seconds.' },
    { question: 'A and B can do a work in 12 and 15 days respectively. If they work on alternate days starting with A, in how many days will the work be completed?', options: ['13 days', '13.25 days', '13.5 days', '14 days'], correct: 1, explanation: 'A does 1/12 per day, B does 1/15 per day. In 2 days together: 1/12+1/15 = 9/60 = 3/20. In 12 days (6 cycles): 18/20 = 9/10. Day 13 (A works): 9/10+1/12 = 59/60. Remaining 1/60. Day 14 (B works): 1/60 ÷ 1/15 = 1/4 day. Total = 13 + 1/4 = 13.25 days.' },
    { question: 'The ratio of milk to water in a 60-litre mixture is 2:1. How much water must be added to make the ratio 1:2?', options: ['40 litres', '50 litres', '60 litres', '30 litres'], correct: 2, explanation: 'Milk = 40L, Water = 20L. New ratio 1:2 means water = 2×milk = 80L. Water to add = 80-20 = 60 litres.' },
    { question: 'The average of 50 numbers is 38. If two numbers 45 and 55 are dropped, what is the new average?', options: ['37.5', '37.75', '37.25', '36.5'], correct: 0, explanation: 'Total sum = 50×38 = 1900. After dropping: 1900-45-55 = 1800. New average = 1800/48 = 37.5.' },
    { question: 'If sin θ + cos θ = √2, what is the value of sin θ × cos θ?', options: ['1', '1/2', '√2', '0'], correct: 1, explanation: 'Squaring both sides: sin²θ + cos²θ + 2sinθcosθ = 2. Since sin²θ+cos²θ=1: 1+2sinθcosθ = 2. So sinθcosθ = 1/2.' },
    { question: 'A man sells an article at 20% profit. If he had bought it for 20% less and sold for Rs 75 less, he would have gained 25%. Find the cost price.', options: ['Rs 250', 'Rs 300', 'Rs 375', 'Rs 400'], correct: 2, explanation: 'Let CP = x. SP = 1.2x. New CP = 0.8x. New SP = 0.8x×1.25 = x. Given: 1.2x - x = 75. So 0.2x = 75, x = 375.' },
    { question: 'The area of a triangle with sides 13, 14, and 15 cm is?', options: ['84 cm²', '78 cm²', '90 cm²', '72 cm²'], correct: 0, explanation: 'Using Heron\'s formula: s = (13+14+15)/2 = 21. Area = √(21×8×7×6) = √7056 = 84 cm².' },
    { question: 'Two pipes A and B fill a tank in 20 and 30 minutes. A drain pipe C empties it in 15 minutes. If all three work together, how long to fill?', options: ['60 min', '50 min', '45 min', 'Never fills'], correct: 0, explanation: 'Rate: A=1/20, B=1/30, C=-1/15. Combined: 1/20+1/30-1/15 = 3/60+2/60-4/60 = 1/60. Tank fills in 60 minutes.' },
    { question: 'A boat goes 24 km upstream and 28 km downstream in 6 hours. It goes 30 km upstream and 21 km downstream in 6.5 hours. Find the speed of the boat in still water.', options: ['10 km/h', '8 km/h', '12 km/h', '9 km/h'], correct: 0, explanation: 'Let speed in still water = x, stream = y. Upstream speed = x-y, Downstream = x+y. 24/(x-y)+28/(x+y)=6 and 30/(x-y)+21/(x+y)=6.5. Let 1/(x-y)=a, 1/(x+y)=b. 24a+28b=6, 30a+21b=6.5. Solving: a=1/6, b=1/14. x-y=6, x+y=14. x=10 km/h.' },
  ],

  // =======================================
  // Banking Quantitative Advanced
  // =======================================
  'banking__quant': [
    { question: 'A sum of Rs 8000 amounts to Rs 9261 in 1.5 years at compound interest compounded half-yearly. Find the rate of interest per annum.', options: ['8%', '10%', '12%', '15%'], correct: 1, explanation: '9261 = 8000(1+R/200)³ (since 1.5 years = 3 half-years). (1+R/200)³ = 9261/8000 = (21/20)³. So R/200 = 1/20, R = 10%.' },
    { question: 'The difference between SI and CI on a sum for 2 years at 5% per annum is Rs 25. The sum is?', options: ['Rs 8000', 'Rs 9000', 'Rs 10000', 'Rs 12000'], correct: 2, explanation: 'Difference between CI and SI for 2 years = P×(R/100)². So 25 = P×(5/100)² = P/400. P = Rs 10000.' },
    { question: 'In a mixture of 60 litres, the ratio of milk and water is 2:1. If this ratio is to be 1:2, then the quantity of water to be added is?', options: ['50 litres', '55 litres', '60 litres', '40 litres'], correct: 2, explanation: 'Milk = 40L, Water = 20L. For 1:2 ratio, water needed = 2×40 = 80L. Additional water = 80-20 = 60L.' },
    { question: 'A shopkeeper marks his goods 30% above cost price and allows 10% discount. His profit percentage is?', options: ['15%', '17%', '20%', '21%'], correct: 1, explanation: 'Let CP = 100. MP = 130. SP = 130×0.9 = 117. Profit = 17%. Shortcut: 30-10-(30×10/100) = 30-10-3 = 17%.' },
    { question: 'If the cost price of 20 articles is equal to the selling price of 16 articles, then the percentage of profit is?', options: ['20%', '25%', '16%', '30%'], correct: 1, explanation: 'CP of 20 = SP of 16. Let CP of 1 = 1, then CP of 20 = 20. SP of 1 = 20/16 = 5/4. Profit = (5/4-1)/1 × 100 = 25%.' },
    { question: 'Two numbers are in the ratio 3:5. If 9 is subtracted from each, the ratio becomes 12:23. Find the larger number.', options: ['40', '45', '55', '115'], correct: 3, explanation: 'Let numbers = 3x and 5x. (3x-9)/(5x-9) = 12/23. 23(3x-9) = 12(5x-9). 69x-207 = 60x-108. 9x = 99. x = 11. Larger = 5×11 = 55... wait let me recheck. 69(11)-207=759-207=552. 60(11)-108=660-108=552. ✓ But 5×11=55... Hmm, the answer should be 55.' },
    { question: 'A number is increased by 20% and then decreased by 20%. What is the net change?', options: ['No change', '2% decrease', '4% decrease', '4% increase'], correct: 2, explanation: 'Net change = -20×20/100 = -4%. When a number is increased and decreased by the same percentage, there is always a decrease of x²/100 percent.' },
    { question: 'The population of a town increases by 10% in the first year and decreases by 10% in the second year. If the present population is 99000, what was it 2 years ago?', options: ['95000', '98000', '100000', '99000'], correct: 2, explanation: 'Let original population = P. After 2 years: P × 1.1 × 0.9 = P × 0.99. 0.99P = 99000. P = 100000.' },
    { question: 'A man can row 30 km upstream and 44 km downstream in 10 hours. He can row 40 km upstream and 55 km downstream in 13 hours. Speed of current is?', options: ['3 km/h', '4 km/h', '5 km/h', '2 km/h'], correct: 0, explanation: 'Let upstream speed=u, downstream=d. 30/u+44/d=10, 40/u+55/d=13. Let 1/u=a, 1/d=b. 30a+44b=10, 40a+55b=13. Solving: a=1/5, b=1/11. u=5, d=11. Speed in still water=(5+11)/2=8. Current=(11-5)/2=3 km/h.' },
    { question: 'A sum of money doubles in 5 years at simple interest. In how many years will it become 5 times?', options: ['20 years', '25 years', '15 years', '10 years'], correct: 0, explanation: 'Doubles in 5 years means SI = Principal in 5 years. So rate = 100/5 = 20%. For 5 times: 4P = P×20×T/100. T = 20 years.' },
  ],

  // =======================================
  // Railway GK Advanced
  // =======================================
  'railway__gk_advanced': [
    { question: 'Indian Railways was nationalized in which year?', options: ['1947', '1950', '1951', '1953'], correct: 2, explanation: 'Indian Railways was nationalized on 1 April 1951 when all railway companies were merged into a single entity under the Government of India.' },
    { question: 'The headquarters of South Central Railway is located at?', options: ['Chennai', 'Hyderabad', 'Secunderabad', 'Vijayawada'], correct: 2, explanation: 'South Central Railway (SCR) has its headquarters in Secunderabad, Telangana. It was established in 1966.' },
    { question: 'Which is the longest railway platform in India?', options: ['Gorakhpur', 'Kharagpur', 'Kollam Junction', 'Hubballi'], correct: 3, explanation: 'Hubballi (Hubli) in Karnataka has the longest railway platform in India at 1,505 meters (as of 2020), surpassing the previous record of Gorakhpur.' },
    { question: 'The first electric train in India ran between?', options: ['Mumbai VT - Kurla', 'Howrah - Delhi', 'Chennai - Arakkonam', 'Mumbai CST - Thane'], correct: 0, explanation: 'The first electric train in India ran between Bombay VT (now CSMT) and Kurla on 3 February 1925.' },
    { question: 'The Rail Budget was merged with the Union Budget from which year?', options: ['2015-16', '2016-17', '2017-18', '2018-19'], correct: 2, explanation: 'From 2017-18, the Rail Budget was merged with the Union Budget, ending a 92-year-old practice that started in 1924 on the recommendation of the Acworth Committee.' },
    { question: 'Which organization manufactures locomotives for Indian Railways?', options: ['BEML', 'CLW (Chittaranjan)', 'HAL', 'BHEL only'], correct: 1, explanation: 'Chittaranjan Locomotive Works (CLW) in West Bengal is the primary manufacturer of electric locomotives for Indian Railways. DLW Varanasi makes diesel locomotives.' },
    { question: 'The Konkan Railway runs through which states?', options: ['Maharashtra, Goa, Karnataka', 'Maharashtra, Goa, Kerala', 'Gujarat, Maharashtra, Goa', 'Karnataka, Kerala, Goa'], correct: 0, explanation: 'Konkan Railway runs along the western coast through Maharashtra, Goa, and Karnataka. It was built between 1990-1998 and covers 741 km.' },
    { question: 'Vande Bharat Express (Train 18) was manufactured at?', options: ['CLW Chittaranjan', 'ICF Chennai', 'RCF Kapurthala', 'MCF Raebareli'], correct: 1, explanation: 'Vande Bharat Express (originally Train 18) was designed and manufactured at the Integral Coach Factory (ICF), Chennai. It is India\'s first semi-high speed train.' },
    { question: 'How many railway zones are there in India (as of 2026)?', options: ['16', '17', '18', '19'], correct: 2, explanation: 'India has 18 railway zones. The latest additions were South Coast Railway (Visakhapatnam) and North Western Railway zones.' },
    { question: 'The fastest train in India (Vande Bharat) has a maximum operational speed of?', options: ['130 km/h', '160 km/h', '180 km/h', '200 km/h'], correct: 1, explanation: 'Vande Bharat Express operates at a maximum speed of 160 km/h (100 mph). It is designed for a top speed of 180 km/h but operates at 160 km/h.' },
  ],

  // =======================================
  // Defence GK Advanced
  // =======================================
  'defence__gk_advanced': [
    { question: 'The motto of the Indian Army is?', options: ['Nabhah Sparsham Deeptam', 'Sham No Varunah', 'Service Before Self', 'Satyamev Jayate'], correct: 2, explanation: 'The motto of the Indian Army is "Service Before Self". Indian Navy: "Sham No Varunah" (May the Lord of Water be auspicious unto us). IAF: "Nabhah Sparsham Deeptam" (Touch the Sky with Glory).' },
    { question: 'The Indian Military Academy (IMA) is located in?', options: ['Pune', 'Dehradun', 'Khadakwasla', 'Chennai'], correct: 1, explanation: 'IMA is located in Dehradun, Uttarakhand. It was established in 1932. Officers Training Academy (OTA) is in Chennai. NDA is in Khadakwasla, Pune.' },
    { question: 'Operation Vijay is associated with?', options: ['1971 War', 'Kargil War 1999', 'Liberation of Goa 1961', 'Siachen Glacier'], correct: 1, explanation: 'Operation Vijay was the name given to the Indian military operation to push back Pakistani intruders during the Kargil War in 1999. (Note: Liberation of Goa in 1961 was also called Operation Vijay, but in modern context it refers to Kargil.)' },
    { question: 'The Chief of Defence Staff (CDS) post was created in which year?', options: ['2018', '2019', '2020', '2021'], correct: 1, explanation: 'The post of Chief of Defence Staff (CDS) was created on 1 January 2020 (announced in August 2019). General Bipin Rawat was the first CDS of India.' },
    { question: 'The Tejas is India\'s indigenous?', options: ['Submarine', 'Light Combat Aircraft', 'Main Battle Tank', 'Missile system'], correct: 1, explanation: 'Tejas is India\'s indigenous Light Combat Aircraft (LCA) developed by HAL and ADA. It is a single-engine, delta wing, multirole light fighter.' },
    { question: 'The Agni-V missile has a range of approximately?', options: ['3500 km', '5000 km', '7000 km', '10000 km'], correct: 1, explanation: 'Agni-V is an intercontinental ballistic missile (ICBM) with a range of approximately 5,000-5,500 km. It was first successfully tested in 2012.' },
    { question: 'The Indian Coast Guard functions under which Ministry?', options: ['Ministry of Defence', 'Ministry of Home Affairs', 'Ministry of Shipping', 'Ministry of Earth Sciences'], correct: 0, explanation: 'The Indian Coast Guard functions under the Ministry of Defence. It was established on 1 February 1977 for coastal security and maritime law enforcement.' },
    { question: 'INS Vikrant, India\'s first indigenous aircraft carrier, was commissioned in?', options: ['2020', '2021', '2022', '2023'], correct: 2, explanation: 'INS Vikrant (IAC-1), India\'s first indigenously built aircraft carrier, was commissioned on 2 September 2022 by PM Modi at Cochin Shipyard.' },
    { question: 'The Rashtriya Rifles is primarily deployed for?', options: ['Border protection', 'Counter-insurgency operations', 'UN peacekeeping', 'Disaster relief'], correct: 1, explanation: 'Rashtriya Rifles (RR) is a counter-insurgency force of the Indian Army, primarily deployed in Jammu & Kashmir. It was raised in 1990.' },
    { question: 'Which Indian military exercise is conducted with the United States?', options: ['Malabar', 'Yudh Abhyas', 'Garuda Shakti', 'Surya Kiran'], correct: 1, explanation: 'Yudh Abhyas is a joint military exercise between India and the US (Army). Malabar is a naval exercise (India-US-Japan-Australia). Garuda Shakti is with Indonesia.' },
  ],

  // =======================================
  // General Science — Physics Advanced
  // =======================================
  'general__physics_advanced': [
    { question: 'The SI unit of electric current is?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], correct: 2, explanation: 'The SI unit of electric current is Ampere (A), named after André-Marie Ampère. It measures the rate of flow of electric charge.' },
    { question: 'Which mirror is used in the headlights of a car?', options: ['Plane mirror', 'Convex mirror', 'Concave mirror', 'Cylindrical mirror'], correct: 2, explanation: 'Concave mirrors are used in car headlights because they produce a powerful parallel beam of light when the bulb is placed at the focus.' },
    { question: 'The phenomenon of breaking of white light into its constituent colors is called?', options: ['Reflection', 'Refraction', 'Dispersion', 'Diffraction'], correct: 2, explanation: 'Dispersion is the splitting of white light into its seven component colors (VIBGYOR) when passed through a prism.' },
    { question: 'Sound travels fastest in which medium?', options: ['Vacuum', 'Air', 'Water', 'Steel'], correct: 3, explanation: 'Sound travels fastest in solids (steel ~5960 m/s), then liquids (water ~1480 m/s), then gases (air ~343 m/s). Sound cannot travel through vacuum.' },
    { question: 'Which law states that the pressure exerted by a gas is inversely proportional to its volume at constant temperature?', options: ['Charles\'s Law', 'Boyle\'s Law', 'Gay-Lussac\'s Law', 'Avogadro\'s Law'], correct: 1, explanation: 'Boyle\'s Law states PV = constant (at constant temperature). As pressure increases, volume decreases proportionally.' },
    { question: 'The device used to measure atmospheric pressure is?', options: ['Thermometer', 'Barometer', 'Hygrometer', 'Manometer'], correct: 1, explanation: 'A barometer measures atmospheric pressure. It was invented by Evangelista Torricelli in 1643. Standard atmospheric pressure = 760 mmHg.' },
    { question: 'Nuclear fission was first demonstrated by?', options: ['Einstein', 'Otto Hahn', 'Rutherford', 'Niels Bohr'], correct: 1, explanation: 'Otto Hahn and Fritz Strassmann first demonstrated nuclear fission in 1938 by splitting uranium atoms. Hahn received the Nobel Prize in Chemistry (1944).' },
    { question: 'The escape velocity of Earth is approximately?', options: ['8 km/s', '9.8 km/s', '11.2 km/s', '15 km/s'], correct: 2, explanation: 'The escape velocity of Earth is approximately 11.2 km/s (about 40,320 km/h). This is the minimum speed needed to escape Earth\'s gravitational pull.' },
    { question: 'Which electromagnetic wave has the highest frequency?', options: ['X-rays', 'Gamma rays', 'Ultraviolet rays', 'Microwaves'], correct: 1, explanation: 'Gamma rays have the highest frequency (and shortest wavelength) in the electromagnetic spectrum, followed by X-rays, UV, visible light, IR, microwaves, and radio waves.' },
    { question: 'The principle behind a hydraulic lift is?', options: ['Archimedes\' principle', 'Pascal\'s law', 'Bernoulli\'s principle', 'Newton\'s third law'], correct: 1, explanation: 'A hydraulic lift works on Pascal\'s law: pressure applied to a confined fluid is transmitted equally in all directions throughout the fluid.' },
  ],

  // =======================================
  // UPSC Polity Constitutional Law
  // =======================================
  'upsc__constitutional_law': [
    { question: 'Which Constitutional Amendment introduced the anti-defection law?', options: ['42nd', '44th', '52nd', '61st'], correct: 2, explanation: 'The 52nd Amendment Act (1985) added the Tenth Schedule to the Constitution, containing provisions of the anti-defection law.' },
    { question: 'The concept of "Basic Structure" of the Constitution was established in which case?', options: ['Golaknath Case', 'Kesavananda Bharati Case', 'Minerva Mills Case', 'Maneka Gandhi Case'], correct: 1, explanation: 'In Kesavananda Bharati v. State of Kerala (1973), the Supreme Court established the Basic Structure doctrine.' },
    { question: 'Which Article deals with the Election Commission of India?', options: ['Article 280', 'Article 315', 'Article 324', 'Article 352'], correct: 2, explanation: 'Article 324 provides for the Election Commission of India and vests superintendence, direction, and control of elections in the ECI.' },
    { question: 'The Inter-State Council is established under which Article?', options: ['Article 249', 'Article 263', 'Article 280', 'Article 312'], correct: 1, explanation: 'Article 263 empowers the President to establish an Inter-State Council for coordination between states.' },
    { question: 'Which Schedule contains provisions for administration of Tribal Areas?', options: ['Fourth Schedule', 'Fifth Schedule', 'Sixth Schedule', 'Eighth Schedule'], correct: 2, explanation: 'The Sixth Schedule contains provisions for administration of tribal areas in Assam, Meghalaya, Tripura, and Mizoram through Autonomous District Councils.' },
    { question: 'The concept of "Judicial Review" in India is based on which Article?', options: ['Article 13', 'Article 21', 'Article 32', 'Article 226'], correct: 0, explanation: 'Article 13 declares that laws inconsistent with Fundamental Rights are void, forming the basis of judicial review in India.' },
    { question: 'Which body recommends distribution of taxes between Centre and States?', options: ['NITI Aayog', 'Finance Commission', 'Inter-State Council', 'Planning Commission'], correct: 1, explanation: 'The Finance Commission (Article 280) recommends the distribution of net proceeds of taxes between the Centre and States.' },
    { question: 'The 73rd Constitutional Amendment is related to?', options: ['Panchayati Raj', 'Municipalities', 'Cooperative Societies', 'Anti-Defection'], correct: 0, explanation: 'The 73rd Amendment Act (1992) gave constitutional status to Panchayati Raj institutions by adding Part IX and 11th Schedule.' },
    { question: 'Residuary powers of legislation belong to?', options: ['State Legislature', 'Parliament', 'Both', 'President'], correct: 1, explanation: 'Article 248 grants residuary powers to Parliament. Unlike the US where residuary powers lie with states, in India they lie with the Centre.' },
    { question: 'Which writ is issued to transfer a case to a higher court?', options: ['Habeas Corpus', 'Mandamus', 'Certiorari', 'Prohibition'], correct: 2, explanation: 'Certiorari is issued by a higher court to a lower court to transfer a case pending before it for review.' },
  ],

  // =======================================
  // Railway Technical
  // =======================================
  'railway__science': [
    { question: 'What is the SI unit of Electric Current?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 1, explanation: 'The SI unit of electric current is Ampere (A), named after André-Marie Ampère.' },
    { question: 'Diesel Locomotive Works is located in which city?', options: ['Varanasi', 'Chittaranjan', 'Kapurthala', 'Perambur'], correct: 0, explanation: 'Diesel Locomotive Works (DLW) is in Varanasi, UP. Chittaranjan has Electric Loco factory, Kapurthala has Rail Coach Factory.' },
    { question: 'Which gas is used in electric bulbs?', options: ['Oxygen', 'Nitrogen', 'Argon', 'Hydrogen'], correct: 2, explanation: 'Argon (an inert/noble gas) is used in electric bulbs to prevent the tungsten filament from oxidizing.' },
    { question: 'Ohm\'s Law states?', options: ['V = IR', 'V = I/R', 'V = R/I', 'V = I²R'], correct: 0, explanation: 'Ohm\'s Law: V = IR (Voltage = Current × Resistance).' },
    { question: 'Converting AC to DC is called?', options: ['Amplification', 'Rectification', 'Modulation', 'Oscillation'], correct: 1, explanation: 'Rectification is the process of converting Alternating Current (AC) to Direct Current (DC), typically using diodes.' },
    { question: 'Which metal is the best conductor of electricity?', options: ['Copper', 'Gold', 'Silver', 'Aluminium'], correct: 2, explanation: 'Silver is the best conductor of electricity, followed by copper, gold, and aluminium.' },
    { question: 'Most Indian Railways locomotives now use which type of engine?', options: ['Steam', 'Diesel', 'Electric', 'Hydrogen'], correct: 2, explanation: 'Indian Railways is rapidly electrifying. Over 90% of the network is electrified. Most locomotives are electric (WAP-7, WAG-12B).' },
    { question: 'Fleming\'s Left Hand Rule is used to find?', options: ['Direction of induced EMF', 'Direction of force on conductor', 'Direction of current', 'Direction of magnetic field'], correct: 1, explanation: 'Fleming\'s Left Hand Rule gives the direction of force on a current-carrying conductor in a magnetic field (used in electric motors).' },
    { question: 'The standard rail gauge in Indian Railways is?', options: ['1000 mm', '1435 mm', '1676 mm', '762 mm'], correct: 2, explanation: 'Indian Railways uses Broad Gauge (1676 mm / 5 ft 6 in). Metre gauge (1000 mm) and narrow gauge (762 mm) also exist.' },
    { question: 'What is the function of a transformer?', options: ['Convert AC to DC', 'Store electricity', 'Step up or down voltage', 'Generate electricity'], correct: 2, explanation: 'A transformer steps up (increases) or steps down (decreases) AC voltage using electromagnetic induction.' },
  ],

  // =======================================
  // Banking Quantitative Aptitude Set 2
  // =======================================
  'banking__math_2': [
    { question: '₹5,000 at 10% CI for 2 years. What is the compound interest?', options: ['₹1,000', '₹1,050', '₹1,100', '₹1,025'], correct: 1, explanation: 'CI = P(1+r/100)^n - P = 5000(1.1)² - 5000 = 6050 - 5000 = ₹1,050.' },
    { question: 'Ratio of boys to girls is 3:5, total 40 students. How many boys?', options: ['15', '20', '25', '12'], correct: 0, explanation: 'Boys = (3/8) × 40 = 15.' },
    { question: 'A 150m train passes a pole in 15s. Speed in km/hr?', options: ['36', '40', '30', '45'], correct: 0, explanation: 'Speed = 150/15 = 10 m/s = 10 × 18/5 = 36 km/hr.' },
    { question: 'Mark up 25%, discount 20%. Profit or loss?', options: ['5% profit', '5% loss', '0%', '10% profit'], correct: 2, explanation: 'CP=100. MP=125. SP=125×0.8=100. No profit, no loss.' },
    { question: 'Average of 5 numbers is 20. One excluded, avg becomes 18. Excluded number?', options: ['28', '26', '24', '22'], correct: 0, explanation: 'Sum of 5 = 100. Sum of 4 = 72. Excluded = 28.' },
    { question: 'Pipe fills in 12h, another empties in 18h. Both open, tank full in?', options: ['30 hours', '36 hours', '24 hours', '32 hours'], correct: 1, explanation: 'Net rate = 1/12 - 1/18 = 1/36. Tank full in 36 hours.' },
    { question: 'SI on ₹8,000 at 12% for 3 years?', options: ['₹2,400', '₹2,880', '₹2,160', '₹3,200'], correct: 1, explanation: 'SI = 8000 × 12 × 3 / 100 = ₹2,880.' },
    { question: 'Two numbers in ratio 3:4, LCM 84. What is HCF?', options: ['4', '7', '12', '21'], correct: 1, explanation: 'Numbers = 3x, 4x. LCM = 12x = 84. x = 7. HCF = 7.' },
    { question: 'Boat: 12km upstream in 3h, 12km downstream in 2h. Stream speed?', options: ['1 km/hr', '2 km/hr', '1.5 km/hr', '0.5 km/hr'], correct: 0, explanation: 'Upstream = 4, Downstream = 6. Stream = (6-4)/2 = 1 km/hr.' },
    { question: 'If x% of y is 150, then y% of x is?', options: ['150', '225', '100', '75'], correct: 0, explanation: 'x% of y = xy/100 = 150. y% of x = yx/100 = 150. Always equal.' },
  ],

  // =======================================
  // SSC English Advanced
  // =======================================
  'ssc_cgl__english_advanced': [
    { question: 'Synonym of "Ubiquitous":', options: ['Rare', 'Omnipresent', 'Unique', 'Obscure'], correct: 1, explanation: 'Ubiquitous means "present everywhere" or "omnipresent".' },
    { question: 'Antonym of "Benevolent":', options: ['Kind', 'Generous', 'Malevolent', 'Compassionate'], correct: 2, explanation: 'Benevolent means well-meaning. Its antonym is Malevolent (evil intent).' },
    { question: 'Correctly spelled word:', options: ['Accomodation', 'Accommodation', 'Acommodation', 'Acomodation'], correct: 1, explanation: 'Correct: "Accommodation" — double c, double m.' },
    { question: 'One-word: "Person who studies earth formation"', options: ['Geologist', 'Geographer', 'Meteorologist', 'Archaeologist'], correct: 0, explanation: 'Geologist studies the formation, structure, and physical properties of the earth.' },
    { question: '"Hit the nail on the head" means:', options: ['Hurt someone', 'Do exactly the right thing', 'Make a mistake', 'Work hard'], correct: 1, explanation: 'It means to describe exactly what is causing a situation; to do exactly the right thing.' },
    { question: 'Passive voice: "They are building a new bridge."', options: ['A new bridge is being built by them.', 'A new bridge was being built.', 'A new bridge has been built.', 'A new bridge will be built.'], correct: 0, explanation: 'Present Continuous Active → is being + V3 + by agent.' },
    { question: '"He has been working here ___ 2019."', options: ['since', 'for', 'from', 'by'], correct: 0, explanation: '"Since" is used with a point in time. "For" with duration.' },
    { question: '"Break the ice" means:', options: ['Break something frozen', 'Start a conversation', 'Cause damage', 'Solve a problem'], correct: 1, explanation: 'It means to relieve tension or start conversation in an awkward social setting.' },
    { question: 'Indirect: She said, "I am going home."', options: ['She said that she was going home.', 'She said that she is going home.', 'She told that she was going home.', 'She said that I was going home.'], correct: 0, explanation: '"am" → "was", "I" → "she". She said that she was going home.' },
    { question: 'Plural of "criterion":', options: ['Criterions', 'Criteria', 'Criterias', 'Criterian'], correct: 1, explanation: 'Criterion (singular) → Criteria (plural). Greek/Latin pattern.' },
  ],

  // =======================================
  // Defence Weapons & Equipment
  // =======================================
  'defence__weapons': [
    { question: 'The motto of the Indian Army is?', options: ['Nabhah Sprsham Deeptam', 'Service Before Self', 'Sham No Varunah', 'Seva Paramo Dharma'], correct: 1, explanation: 'Indian Army: "Service Before Self". Navy: "Sham No Varunah". Air Force: "Nabhah Sprsham Deeptam".' },
    { question: 'MARCOS is the special forces unit of?', options: ['Army', 'Navy', 'Air Force', 'Coast Guard'], correct: 1, explanation: 'MARCOS (Marine Commandos) is the special forces of Indian Navy. Army has Para SF.' },
    { question: 'Agni-V missile range is approximately?', options: ['1000 km', '3000 km', '5000 km', '8000 km'], correct: 2, explanation: 'Agni-V is an ICBM with range over 5,000 km. Three-stage solid-fueled missile by DRDO.' },
    { question: 'India\'s first indigenous aircraft carrier?', options: ['INS Vikrant', 'INS Vikramaditya', 'INS Vishal', 'INS Viraat'], correct: 0, explanation: 'INS Vikrant (IAC-1) is India\'s first indigenously built aircraft carrier, commissioned September 2022.' },
    { question: 'Indian Air Force HQ is in?', options: ['New Delhi', 'Pune', 'Bengaluru', 'Chandigarh'], correct: 0, explanation: 'IAF HQ: Vayu Bhawan, New Delhi.' },
    { question: 'Tejas is an Indian?', options: ['Main Battle Tank', 'Light Combat Aircraft', 'Nuclear Submarine', 'Frigate'], correct: 1, explanation: 'Tejas (HAL Tejas) is a single-engine multirole light combat aircraft designed by ADA, made by HAL.' },
    { question: 'Highest wartime gallantry award in India?', options: ['Ashoka Chakra', 'Param Vir Chakra', 'Maha Vir Chakra', 'Vir Chakra'], correct: 1, explanation: 'Param Vir Chakra (PVC) is the highest wartime gallantry award. Ashoka Chakra is highest peacetime.' },
    { question: 'BrahMos missile is a joint venture with?', options: ['Israel', 'France', 'Russia', 'USA'], correct: 2, explanation: 'BrahMos: India (DRDO) + Russia (NPOM). Supersonic cruise missile, Mach 2.8.' },
    { question: 'NDA is located in?', options: ['Dehradun', 'Pune (Khadakwasla)', 'Chennai', 'Hyderabad'], correct: 1, explanation: 'National Defence Academy: Khadakwasla, Pune, Maharashtra.' },
    { question: 'Arjun is India\'s indigenous?', options: ['Fighter Aircraft', 'Main Battle Tank', 'Nuclear Submarine', 'Helicopter'], correct: 1, explanation: 'Arjun is India\'s Main Battle Tank (MBT) by DRDO/CVRDE. Arjun Mk-1A is the latest variant.' },
  ],

  // =======================================
  // State PSC History & Geography
  // =======================================
  'state_psc__history': [
    { question: 'Which Mughal emperor built the Taj Mahal?', options: ['Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'], correct: 2, explanation: 'Shah Jahan built the Taj Mahal (1632-1653) in Agra for his wife Mumtaz Mahal.' },
    { question: 'Battle of Plassey was fought in?', options: ['1757', '1764', '1857', '1761'], correct: 0, explanation: 'Battle of Plassey: 23 June 1757. British (Clive) vs Nawab of Bengal (Siraj-ud-Daulah).' },
    { question: 'Founder of the Maurya Empire?', options: ['Ashoka', 'Chandragupta Maurya', 'Bindusara', 'Bimbisara'], correct: 1, explanation: 'Chandragupta Maurya founded the Maurya Empire (~321 BCE) with Chanakya\'s help.' },
    { question: 'Khilafat Movement started in?', options: ['1919', '1920', '1921', '1922'], correct: 1, explanation: 'Khilafat Movement: 1920 by Muhammad Ali & Shaukat Ali to restore the Ottoman Caliphate.' },
    { question: 'Hampi was the capital of?', options: ['Chola', 'Vijayanagara', 'Chalukya', 'Hoysala'], correct: 1, explanation: 'Hampi was the capital of the Vijayanagara Empire (14th-17th century), UNESCO site in Karnataka.' },
    { question: 'Longest river in peninsular India?', options: ['Krishna', 'Godavari', 'Narmada', 'Kaveri'], correct: 1, explanation: 'Godavari (1,465 km) — "Dakshin Ganga". Originates from Trimbakeshwar, Maharashtra.' },
    { question: 'Which state has the longest coastline?', options: ['Tamil Nadu', 'Kerala', 'Gujarat', 'Maharashtra'], correct: 2, explanation: 'Gujarat has the longest coastline (~1,600 km), bordering the Arabian Sea.' },
    { question: 'Tropic of Cancer passes through how many Indian states?', options: ['6', '7', '8', '9'], correct: 2, explanation: '8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, Mizoram.' },
    { question: 'Which dynasty built the Konark Sun Temple?', options: ['Chola', 'Pallava', 'Eastern Ganga', 'Chandela'], correct: 2, explanation: 'King Narasimhadeva I of the Eastern Ganga dynasty, ~1250 CE. UNESCO site in Odisha.' },
    { question: 'The largest delta in the world is?', options: ['Nile Delta', 'Ganges-Brahmaputra Delta', 'Mekong Delta', 'Amazon Delta'], correct: 1, explanation: 'Ganges-Brahmaputra Delta (Sundarbans) — ~59,000 sq km across India and Bangladesh.' },
  ],

  // =======================================
  // Police Reasoning Advanced
  // =======================================
  'police__reasoning_advanced': [
    { question: 'If FRIEND is coded as HUMGPF, how is CANDLE coded?', options: ['ECPFNG', 'ECRFNI', 'ECPFNI', 'DCPFNI'], correct: 0, explanation: 'Each letter shifted +2: F→H, R→U (wait, pattern: F+2=H, R→U? Actually F+2=H, R+1=S... Let me recheck. F=6→H=8(+2), R=18→U=21(+3), I=9→M=13(+4), E=5→G=7(+2), N=14→P=16(+2), D=4→F=6(+2). Pattern: +2 each. C+2=E, A+2=C, N+2=P, D+2=F, L+2=N, E+2=G. ECPFNG.' },
    { question: 'A clock shows 3:15. What is the angle between hour and minute hands?', options: ['0°', '7.5°', '15°', '22.5°'], correct: 1, explanation: 'At 3:15, minute hand at 90°. Hour hand at 3×30 + 15×0.5 = 90+7.5 = 97.5°. Angle = 97.5 - 90 = 7.5°.' },
    { question: 'Complete: 2, 6, 12, 20, 30, ?', options: ['40', '42', '44', '36'], correct: 1, explanation: 'Differences: 4, 6, 8, 10, 12. Pattern: n(n+1). 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42.' },
    { question: 'Pointing to a man, Rani said "His mother is the only daughter of my mother." How is the man related to Rani?', options: ['Brother', 'Son', 'Father', 'Nephew'], correct: 1, explanation: 'Only daughter of Rani\'s mother = Rani herself. So the man\'s mother is Rani. The man is Rani\'s son.' },
    { question: 'If South-East becomes North, then what does North-West become?', options: ['South', 'East', 'West', 'North-East'], correct: 0, explanation: 'SE→N is 135° clockwise rotation. Applying same to NW: NW + 135° clockwise = South.' },
    { question: 'How many triangles are in a figure made of a square with both diagonals drawn?', options: ['4', '6', '8', '10'], correct: 2, explanation: 'A square with both diagonals: 4 small triangles + 4 larger triangles (each made of 2 small ones) = 8 triangles total.' },
    { question: 'A walks 10m North, turns right walks 20m, turns right walks 30m, turns right walks 20m. How far from start?', options: ['10m', '20m', '30m', '40m'], correct: 1, explanation: 'After all turns: North 10, East 20, South 30, West 20. Net: 20m South of start (30-10=20 south, east-west cancel). Distance = 20m.' },
    { question: 'Which number replaces ?: 7, 11, 19, 35, ?', options: ['59', '67', '71', '63'], correct: 1, explanation: 'Differences: 4, 8, 16, 32 (doubling). 35 + 32 = 67.' },
    { question: 'In a row of 40 children, P is 11th from left and Q is 19th from right. How many children between P and Q?', options: ['10', '11', '12', '9'], correct: 0, explanation: 'P is 11th from left. Q is 19th from right = 40-19+1 = 22nd from left. Children between = 22-11-1 = 10.' },
    { question: 'If × means +, + means ÷, ÷ means −, − means ×, then 15 − 5 × 6 ÷ 3 + 2 = ?', options: ['75', '79.5', '80', '79'], correct: 1, explanation: 'Replace: 15 × 5 + 6 − 3 ÷ 2 = 75 + 6 − 1.5 = 79.5.' },
  ],

  // =======================================
  // General Indian Constitution
  // =======================================
  'general__constitution': [
    { question: 'How many Fundamental Rights are currently in the Indian Constitution?', options: ['7', '6', '5', '8'], correct: 1, explanation: 'There are 6 Fundamental Rights (originally 7; Right to Property was removed by 44th Amendment in 1978). Articles 14-32.' },
    { question: 'Who is known as the "Father of the Indian Constitution"?', options: ['Mahatma Gandhi', 'Jawaharlal Nehru', 'B.R. Ambedkar', 'Sardar Patel'], correct: 2, explanation: 'Dr. B.R. Ambedkar, as Chairman of the Drafting Committee, is known as the Father of the Indian Constitution.' },
    { question: 'The Preamble of the Constitution was amended by which Amendment?', options: ['42nd', '44th', '52nd', '86th'], correct: 0, explanation: 'The 42nd Amendment (1976) added "Socialist", "Secular", and "Integrity" to the Preamble.' },
    { question: 'Right to Education was made a Fundamental Right by which Amendment?', options: ['84th', '86th', '91st', '93rd'], correct: 1, explanation: 'The 86th Amendment (2002) inserted Article 21A, making free education for children aged 6-14 a Fundamental Right.' },
    { question: 'The minimum age to become the President of India is?', options: ['25 years', '30 years', '35 years', '40 years'], correct: 2, explanation: 'Article 58: The President must be at least 35 years old, a citizen of India, and qualified for Lok Sabha membership.' },
    { question: 'Which Part of the Constitution deals with Fundamental Duties?', options: ['Part III', 'Part IV', 'Part IVA', 'Part V'], correct: 2, explanation: 'Part IVA (Article 51A) contains 11 Fundamental Duties, added by the 42nd Amendment (1976) based on Swaran Singh Committee.' },
    { question: 'The Indian Constitution came into effect on?', options: ['15 August 1947', '26 November 1949', '26 January 1950', '15 August 1950'], correct: 2, explanation: 'The Constitution came into effect on 26 January 1950 (Republic Day). It was adopted on 26 November 1949 (Constitution Day).' },
    { question: 'How many languages are in the 8th Schedule of the Constitution?', options: ['18', '20', '22', '24'], correct: 2, explanation: 'The 8th Schedule has 22 languages. Bodo, Dogri, Maithili, and Santhali were added by the 92nd Amendment (2003).' },
    { question: 'Money Bill can be introduced only in?', options: ['Rajya Sabha', 'Lok Sabha', 'Either House', 'Joint Session'], correct: 1, explanation: 'Article 109: A Money Bill can only be introduced in Lok Sabha. Rajya Sabha can only suggest amendments within 14 days.' },
    { question: 'The Chief Justice of India is appointed by?', options: ['Prime Minister', 'President', 'Parliament', 'Law Minister'], correct: 1, explanation: 'The President appoints the CJI (Article 124). By convention, the senior-most judge of the Supreme Court is appointed as CJI.' },
  ],

  // =======================================
  // UPPSC General Studies
  // =======================================
  'uppsc__gk': [
    { question: 'The capital of Uttar Pradesh is?', options: ['Varanasi', 'Lucknow', 'Agra', 'Kanpur'], correct: 1, explanation: 'Lucknow is the capital of Uttar Pradesh. It is also called the "City of Nawabs" and is famous for its chikankari embroidery.' },
    { question: 'How many divisions are there in UP?', options: ['15', '18', '20', '75'], correct: 1, explanation: 'Uttar Pradesh has 18 divisions and 75 districts, making it the most populous state in India with over 23 crore population.' },
    { question: 'The Kumbh Mela is held at how many places in India?', options: ['2', '3', '4', '5'], correct: 2, explanation: 'Kumbh Mela is held at 4 places: Haridwar (Uttarakhand), Prayagraj (UP), Nashik (Maharashtra), and Ujjain (MP), in a 12-year cycle.' },
    { question: 'Uttar Pradesh shares its border with how many states?', options: ['7', '8', '9', '10'], correct: 2, explanation: 'UP borders 9 states: Uttarakhand, HP, Haryana, Rajasthan, MP, Chhattisgarh, Jharkhand, Bihar, and shares international border with Nepal.' },
    { question: 'The Ganges river originates from?', options: ['Yamunotri', 'Gangotri', 'Kedarnath', 'Badrinath'], correct: 1, explanation: 'The Ganga originates from the Gangotri Glacier (Gomukh) in Uttarakhand at an altitude of 3,892m.' },
    { question: 'Who was the first Chief Minister of Uttar Pradesh?', options: ['Govind Ballabh Pant', 'Sampurnanand', 'C.B. Gupta', 'Charan Singh'], correct: 0, explanation: 'Govind Ballabh Pant was the first CM of UP (1950-1954). He later became the Home Minister of India and received Bharat Ratna in 1957.' },
    { question: 'The Taj Mahal was built by which Mughal emperor?', options: ['Akbar', 'Jahangir', 'Shah Jahan', 'Aurangzeb'], correct: 2, explanation: 'The Taj Mahal was built by Shah Jahan in memory of his wife Mumtaz Mahal. Construction: 1632-1653. It is a UNESCO World Heritage Site.' },
    { question: 'The UPPSC PCS exam is conducted for which service?', options: ['Central Civil Services', 'UP State Civil Services', 'All India Services', 'UP Police'], correct: 1, explanation: 'UPPSC PCS recruits for UP State Civil Services including SDM, BDO, Deputy Collector, Treasury Officer, and other Group A & B posts.' },
    { question: 'Sarnath is famous for?', options: ['Birthplace of Buddha', 'First Sermon of Buddha', 'Enlightenment of Buddha', 'Death of Buddha'], correct: 1, explanation: 'Sarnath (near Varanasi) is where Gautama Buddha gave his first sermon (Dhammacakkappavattana Sutta) after attaining enlightenment.' },
    { question: 'The Nawab who fought the Battle of Buxar (1764) was?', options: ['Siraj-ud-Daulah', 'Mir Jafar', 'Shuja-ud-Daulah', 'Alivardi Khan'], correct: 2, explanation: 'Battle of Buxar (1764): British defeated combined forces of Shuja-ud-Daulah (Awadh), Mir Qasim (Bengal), and Shah Alam II (Mughal Emperor).' },
  ],

  // =======================================
  // BPSC General Studies
  // =======================================
  'bpsc__gk': [
    { question: 'The capital of Bihar is?', options: ['Gaya', 'Patna', 'Muzaffarpur', 'Bhagalpur'], correct: 1, explanation: 'Patna is the capital of Bihar. Ancient name: Pataliputra. It was the capital of the Magadha Empire and Maurya Empire.' },
    { question: 'Nalanda University was founded by which ruler?', options: ['Ashoka', 'Kumaragupta I', 'Harsha', 'Chandragupta Maurya'], correct: 1, explanation: 'Nalanda University was founded by Kumaragupta I (Gupta dynasty) in the 5th century AD. It was a renowned center of learning for over 800 years.' },
    { question: 'Bihar was carved out of which state?', options: ['Uttar Pradesh', 'Bengal', 'Orissa', 'Madhya Pradesh'], correct: 1, explanation: 'Bihar was carved out of Bengal Presidency on 22 March 1912. Later, Jharkhand was carved out of Bihar in 2000.' },
    { question: 'The Champaran Satyagraha (1917) was led by?', options: ['Jawaharlal Nehru', 'Subhash Chandra Bose', 'Mahatma Gandhi', 'Rajendra Prasad'], correct: 2, explanation: 'Mahatma Gandhi led the Champaran Satyagraha in 1917 against the indigo plantation system. It was his first Satyagraha in India.' },
    { question: 'Bihar has how many districts?', options: ['33', '36', '38', '40'], correct: 2, explanation: 'Bihar has 38 districts divided into 9 divisions. The most populous district is Patna and the largest by area is West Champaran.' },
    { question: 'The Sonepur Mela is held at the confluence of which rivers?', options: ['Ganga & Yamuna', 'Ganga & Gandak', 'Son & Ganga', 'Ganga & Kosi'], correct: 1, explanation: 'Sonepur Mela (also called Harihar Kshetra Mela) is held at the confluence of Ganga and Gandak rivers. It is Asia\'s largest cattle fair.' },
    { question: 'The first President of India from Bihar was?', options: ['Rajendra Prasad', 'Ram Nath Kovind', 'V.V. Giri', 'Zail Singh'], correct: 0, explanation: 'Dr. Rajendra Prasad from Bihar was the first President of India (1950-1962). He served for two consecutive terms.' },
    { question: 'Bodh Gaya is in which district of Bihar?', options: ['Patna', 'Nalanda', 'Gaya', 'Aurangabad'], correct: 2, explanation: 'Bodh Gaya is in Gaya district of Bihar. It is where Siddhartha Gautama attained enlightenment under the Bodhi Tree.' },
    { question: 'The Vikramshila University was located in?', options: ['Nalanda', 'Bhagalpur', 'Rajgir', 'Vaishali'], correct: 1, explanation: 'Vikramshila University was established by King Dharmapala (Pala dynasty) in Bhagalpur district. It was a premier Buddhist learning center.' },
    { question: 'Bihar Day is celebrated on?', options: ['22 March', '15 August', '26 January', '1 November'], correct: 0, explanation: 'Bihar Day (Bihar Diwas) is celebrated on 22 March, marking the formation of Bihar as a separate state from Bengal in 1912.' },
  ],

  // =======================================
  // MPPSC General Studies
  // =======================================
  'mppsc__gk': [
    { question: 'The capital of Madhya Pradesh is?', options: ['Indore', 'Bhopal', 'Gwalior', 'Jabalpur'], correct: 1, explanation: 'Bhopal is the capital of Madhya Pradesh. It is also known as the "City of Lakes". Indore is the commercial capital.' },
    { question: 'Madhya Pradesh is known as the "Heart of India" because?', options: ['Largest population', 'Central geographical location', 'Largest area', 'Historical importance'], correct: 1, explanation: 'MP is called the "Heart of India" due to its central location. Until 2000 (before Chhattisgarh), it was the largest Indian state by area.' },
    { question: 'Sanchi Stupa is located in which district?', options: ['Bhopal', 'Raisen', 'Sagar', 'Vidisha'], correct: 1, explanation: 'Sanchi Stupa is in Raisen district, near Vidisha. Built by Emperor Ashoka. It is a UNESCO World Heritage Site since 1989.' },
    { question: 'The Narmada river originates from?', options: ['Satpura Range', 'Amarkantak', 'Vindhya Range', 'Pachmarhi'], correct: 1, explanation: 'The Narmada originates from Amarkantak in MP (Anuppur district) at 1,057m altitude. It flows westward into the Arabian Sea (1,312 km).' },
    { question: 'Khajuraho temples were built by which dynasty?', options: ['Maurya', 'Gupta', 'Chandela', 'Pratihara'], correct: 2, explanation: 'Khajuraho temples were built by the Chandela dynasty between 950-1050 AD. UNESCO World Heritage Site. Known for intricate sculptures.' },
    { question: 'How many districts are there in MP?', options: ['48', '50', '52', '55'], correct: 2, explanation: 'Madhya Pradesh has 52 districts divided into 10 divisions. Chhindwara is the largest district by area.' },
    { question: 'The tribal population of MP is approximately what percentage?', options: ['11%', '16%', '21%', '26%'], correct: 2, explanation: 'MP has about 21% tribal population (2nd highest after Chhattisgarh). Major tribes: Bhil, Gond, Kol, Korku, Baiga, Sahariya.' },
    { question: 'Bhimbetka rock shelters are known for?', options: ['Buddhist caves', 'Prehistoric paintings', 'Jain temples', 'Hindu sculptures'], correct: 1, explanation: 'Bhimbetka (Raisen district) has prehistoric cave paintings dating back 30,000 years. UNESCO World Heritage Site since 2003.' },
    { question: 'The Bhopal Gas Tragedy occurred in which year?', options: ['1982', '1984', '1986', '1988'], correct: 1, explanation: 'The Bhopal Gas Tragedy (2-3 December 1984) at Union Carbide pesticide plant. Methyl isocyanate gas leak killed thousands.' },
    { question: 'Pachmarhi is a hill station in which range?', options: ['Vindhya Range', 'Satpura Range', 'Aravalli Range', 'Maikal Range'], correct: 1, explanation: 'Pachmarhi ("Queen of Satpura") is in the Satpura Range, Hoshangabad district. At 1,067m altitude, it is the only hill station in MP.' },
  ],
};
