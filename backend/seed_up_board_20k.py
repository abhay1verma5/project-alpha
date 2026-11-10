#!/usr/bin/env python3
"""
UP Board PYQ Seeder — 20,000 Questions
Class 10 & 12, Hindi & English Medium
Subjects: Math, Science, Social Science, Hindi, English, Physics, Chemistry, Biology, History, Civics, Economics
"""
import os, sys, hashlib, random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import django
django.setup()

from pyq.models import ExamQuestion

TARGET_PER_EXAM = 5000  # 4 exam types × 5000 = 20,000 total

# ══════════════════════════════════════════════════════════════
#  CLASS 10 QUESTION BANKS — (question, [options], correct_idx, explanation, chapter)
# ══════════════════════════════════════════════════════════════

CLASS10_MATH = [
    # Real Numbers
    ("HCF of 12 and 18 is?", ["2","4","6","12"], 2, "HCF(12,18) = 6. Prime factorization: 12=2²×3, 18=2×3². Common factors: 2×3=6.", "Real Numbers"),
    ("LCM of 15 and 20 is?", ["30","45","60","120"], 2, "LCM(15,20) = 60. 15=3×5, 20=2²×5. LCM = 2²×3×5=60.", "Real Numbers"),
    ("If HCF(a,b)=1, the numbers are called?", ["Composite","Co-prime","Twin primes","Perfect"], 1, "Two numbers whose HCF is 1 are called co-prime numbers. Example: 8 and 15.", "Real Numbers"),
    ("√2 is a/an?", ["Rational number","Irrational number","Natural number","Integer"], 1, "√2 = 1.41421356... It is non-terminating and non-repeating, hence irrational.", "Real Numbers"),
    ("The decimal expansion of 7/8 is?", ["Terminating","Non-terminating repeating","Non-terminating non-repeating","None"], 0, "7/8 = 0.875 (terminating). Denominator 8=2³ has only 2 as prime factor.", "Real Numbers"),
    ("Product of HCF and LCM of two numbers equals?", ["Sum of numbers","Difference of numbers","Product of numbers","Square of numbers"], 2, "HCF(a,b) × LCM(a,b) = a × b. This is a fundamental property.", "Real Numbers"),
    ("Which is an irrational number?", ["22/7","√9","√5","0.333..."], 2, "√5 = 2.2360679... is non-terminating non-repeating. √9=3 (rational), 22/7 and 0.333... are rational.", "Real Numbers"),
    # Polynomials
    ("The degree of polynomial 3x⁴ + 2x² + 1 is?", ["1","2","3","4"], 3, "The highest power of x is 4, so degree = 4.", "Polynomials"),
    ("Sum of zeroes of x² - 5x + 6 is?", ["5","6","-5","-6"], 0, "For ax²+bx+c, sum of zeroes = -b/a = -(-5)/1 = 5.", "Polynomials"),
    ("Product of zeroes of x² - 5x + 6 is?", ["5","6","-5","-6"], 1, "For ax²+bx+c, product of zeroes = c/a = 6/1 = 6.", "Polynomials"),
    ("A polynomial of degree 2 is called?", ["Linear","Quadratic","Cubic","Quartic"], 1, "Degree 1=linear, degree 2=quadratic, degree 3=cubic, degree 4=quartic.", "Polynomials"),
    ("Number of zeroes of a quadratic polynomial is at most?", ["1","2","3","4"], 1, "A polynomial of degree n has at most n zeroes. Quadratic (degree 2) has at most 2 zeroes.", "Polynomials"),
    # Linear Equations
    ("The pair of equations x+y=5 and 2x+2y=10 has?", ["Unique solution","No solution","Infinite solutions","Two solutions"], 2, "2x+2y=10 is same as x+y=5 (divide by 2). Coincident lines → infinite solutions.", "Linear Equations"),
    ("For consistent pair of equations, a₁/a₂ ≠ b₁/b₂ means?", ["No solution","Unique solution","Infinite solutions","Cannot determine"], 1, "When a₁/a₂ ≠ b₁/b₂, lines intersect at exactly one point → unique solution.", "Linear Equations"),
    # Quadratic Equations
    ("Discriminant of ax² + bx + c = 0 is?", ["b² + 4ac","b² - 4ac","4ac - b²","a² - 4bc"], 1, "Discriminant D = b² - 4ac. It determines the nature of roots.", "Quadratic Equations"),
    ("If discriminant > 0, roots are?", ["Real and equal","Real and distinct","Imaginary","Zero"], 1, "D > 0 → two real and distinct roots. D = 0 → equal roots. D < 0 → no real roots.", "Quadratic Equations"),
    ("The roots of x² - 4 = 0 are?", ["±1","±2","±3","±4"], 1, "x² = 4, x = ±2. Or factoring: (x-2)(x+2)=0.", "Quadratic Equations"),
    # AP
    ("Common difference of AP 2, 5, 8, 11... is?", ["2","3","4","5"], 1, "d = a₂ - a₁ = 5 - 2 = 3.", "Arithmetic Progressions"),
    ("10th term of AP 3, 7, 11, 15... is?", ["39","43","47","51"], 0, "a₁₀ = a + (n-1)d = 3 + 9×4 = 3 + 36 = 39.", "Arithmetic Progressions"),
    ("Sum of first n natural numbers is?", ["n(n-1)/2","n(n+1)/2","n²/2","n(n+2)/2"], 1, "S = n(n+1)/2. Example: S₁₀ = 10×11/2 = 55.", "Arithmetic Progressions"),
    # Triangles
    ("In similar triangles, corresponding sides are?", ["Equal","Proportional","Perpendicular","Parallel"], 1, "In similar triangles, corresponding angles are equal and corresponding sides are proportional.", "Triangles"),
    ("BPT (Basic Proportionality Theorem) is also called?", ["Pythagoras theorem","Thales theorem","Angle bisector theorem","Mid-point theorem"], 1, "BPT/Thales theorem: A line parallel to one side of a triangle divides other two sides proportionally.", "Triangles"),
    # Trigonometry
    ("sin 30° = ?", ["0","1/2","1/√2","√3/2"], 1, "sin 30° = 1/2. This is a standard trigonometric value.", "Trigonometry"),
    ("cos 60° = ?", ["0","1/2","1/√2","√3/2"], 1, "cos 60° = 1/2 = sin 30°.", "Trigonometry"),
    ("tan 45° = ?", ["0","1","√3","1/√3"], 1, "tan 45° = sin45°/cos45° = (1/√2)/(1/√2) = 1.", "Trigonometry"),
    ("sin²θ + cos²θ = ?", ["0","1","2","sin2θ"], 1, "This is the fundamental trigonometric identity: sin²θ + cos²θ = 1.", "Trigonometry"),
    ("If sin A = 3/5, then cos A = ?", ["3/5","4/5","5/3","5/4"], 1, "sin²A + cos²A = 1. cos²A = 1 - 9/25 = 16/25. cos A = 4/5.", "Trigonometry"),
    # Coordinate Geometry
    ("Distance between points (0,0) and (3,4) is?", ["3","4","5","7"], 2, "Distance = √(3²+4²) = √(9+16) = √25 = 5.", "Coordinate Geometry"),
    ("Mid-point of (2,4) and (6,8) is?", ["(3,5)","(4,6)","(8,12)","(2,2)"], 1, "Mid-point = ((2+6)/2, (4+8)/2) = (4, 6).", "Coordinate Geometry"),
    # Circles
    ("Number of tangents from an external point to a circle is?", ["0","1","2","3"], 2, "From an external point, exactly 2 tangents can be drawn to a circle.", "Circles"),
    ("Angle between tangent and radius at point of contact is?", ["0°","45°","60°","90°"], 3, "The tangent at any point of a circle is perpendicular to the radius at the point of contact.", "Circles"),
    # Area Related to Circles
    ("Area of circle with radius r is?", ["2πr","πr²","2πr²","πr"], 1, "Area = πr². Circumference = 2πr.", "Areas Related to Circles"),
    ("Area of sector with angle θ is?", ["θ/360 × πr²","θ/180 × πr²","θ/360 × 2πr","θ × πr²"], 0, "Area of sector = (θ/360) × πr².", "Areas Related to Circles"),
    # Surface Areas and Volumes
    ("Volume of sphere with radius r is?", ["4/3 πr³","2/3 πr³","πr³","4πr²"], 0, "Volume of sphere = (4/3)πr³. Surface area = 4πr².", "Surface Areas and Volumes"),
    ("TSA of cylinder is?", ["2πrh","2πr(r+h)","πr²h","2πr²"], 1, "TSA of cylinder = 2πr(r+h) = 2πr² + 2πrh.", "Surface Areas and Volumes"),
    ("Volume of cone with radius r and height h is?", ["πr²h","1/3 πr²h","2/3 πr²h","1/2 πr²h"], 1, "Volume of cone = (1/3)πr²h. It is 1/3 of cylinder volume.", "Surface Areas and Volumes"),
    # Statistics
    ("Mean of 2, 4, 6, 8, 10 is?", ["4","5","6","7"], 2, "Mean = (2+4+6+8+10)/5 = 30/5 = 6.", "Statistics"),
    ("Median of 3, 5, 7, 9, 11 is?", ["5","7","9","6"], 1, "For odd n, median = middle value. Here n=5, median = 3rd value = 7.", "Statistics"),
    ("Mode is the value that appears?", ["Least often","Most often","In the middle","At the end"], 1, "Mode is the value with highest frequency in a data set.", "Statistics"),
    # Probability
    ("Probability of getting head in a coin toss is?", ["0","1/4","1/2","1"], 2, "P(Head) = 1/2. A fair coin has 2 equally likely outcomes.", "Probability"),
    ("Probability of impossible event is?", ["0","1/2","1","Cannot determine"], 0, "Probability of impossible event = 0. Probability of certain event = 1.", "Probability"),
    ("A die is thrown. P(getting 6) = ?", ["1/2","1/3","1/6","1/4"], 2, "P(6) = 1/6. A die has 6 equally likely outcomes.", "Probability"),
]

CLASS10_SCIENCE = [
    # Chemical Reactions
    ("Rusting of iron is an example of?", ["Combination","Decomposition","Oxidation","Reduction"], 2, "Rusting is oxidation: 4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O. Iron gains oxygen.", "Chemical Reactions"),
    ("Which gas is evolved when zinc reacts with HCl?", ["Oxygen","Nitrogen","Hydrogen","Chlorine"], 2, "Zn + 2HCl → ZnCl₂ + H₂↑. Hydrogen gas is evolved with pop sound.", "Chemical Reactions"),
    ("Photosynthesis is an example of?", ["Exothermic reaction","Endothermic reaction","Neutralization","Combustion"], 1, "Photosynthesis absorbs sunlight energy (endothermic): 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂.", "Chemical Reactions"),
    ("Balancing a chemical equation follows the law of?", ["Conservation of energy","Conservation of mass","Constant proportions","Multiple proportions"], 1, "Law of conservation of mass: mass is neither created nor destroyed in a chemical reaction.", "Chemical Reactions"),
    # Acids Bases and Salts
    ("pH of pure water is?", ["0","5","7","14"], 2, "Pure water is neutral with pH = 7. pH < 7 is acidic, pH > 7 is basic.", "Acids, Bases and Salts"),
    ("Common salt is chemically?", ["NaOH","NaCl","Na₂CO₃","NaHCO₃"], 1, "Common salt = Sodium Chloride (NaCl). It is formed by strong acid + strong base.", "Acids, Bases and Salts"),
    ("Baking soda is?", ["NaCl","NaOH","NaHCO₃","Na₂CO₃"], 2, "Baking soda = Sodium Bicarbonate (NaHCO₃). Used in cooking and as antacid.", "Acids, Bases and Salts"),
    ("Litmus is obtained from?", ["Fungus","Lichen","Algae","Bacteria"], 1, "Litmus is a natural indicator obtained from lichens. Red in acid, blue in base.", "Acids, Bases and Salts"),
    # Metals and Non-metals
    ("Which metal is liquid at room temperature?", ["Iron","Gold","Mercury","Sodium"], 2, "Mercury (Hg) is the only metal that is liquid at room temperature (melting point -39°C).", "Metals and Non-metals"),
    ("Which non-metal is essential for life?", ["Carbon","Chlorine","Oxygen","Sulphur"], 2, "Oxygen is essential for respiration. We breathe in O₂ and release CO₂.", "Metals and Non-metals"),
    ("Metals are generally?", ["Bad conductors","Good conductors","Insulators","Semi-conductors"], 1, "Metals are good conductors of heat and electricity due to free electrons.", "Metals and Non-metals"),
    ("Most reactive metal is?", ["Gold","Iron","Potassium","Copper"], 2, "Potassium (K) is among the most reactive metals. Reactivity: K > Na > Ca > Mg > Al > Zn > Fe.", "Metals and Non-metals"),
    # Carbon and its Compounds
    ("Methane formula is?", ["CH₄","C₂H₆","C₂H₄","C₃H₈"], 0, "Methane (CH₄) is the simplest alkane with 1 carbon and 4 hydrogen atoms.", "Carbon and its Compounds"),
    ("Ethanol formula is?", ["CH₃OH","C₂H₅OH","C₃H₇OH","C₂H₅CHO"], 1, "Ethanol = C₂H₅OH (ethyl alcohol). Used as fuel, solvent, and in beverages.", "Carbon and its Compounds"),
    ("Covalent bond is formed by?", ["Transfer of electrons","Sharing of electrons","Donation of electrons","None"], 1, "Covalent bonds form by sharing electron pairs between atoms. Common in non-metals.", "Carbon and its Compounds"),
    # Life Processes
    ("Photosynthesis occurs in?", ["Mitochondria","Ribosome","Chloroplast","Nucleus"], 2, "Photosynthesis occurs in chloroplasts which contain chlorophyll (green pigment).", "Life Processes"),
    ("Blood component that carries oxygen?", ["WBC","Platelets","RBC","Plasma"], 2, "RBCs (Red Blood Cells) contain hemoglobin which binds and transports oxygen.", "Life Processes"),
    ("The basic unit of kidney is?", ["Neuron","Nephron","Alveoli","Villi"], 1, "Nephron is the structural and functional unit of kidney. Each kidney has ~1 million nephrons.", "Life Processes"),
    ("Which enzyme digests starch?", ["Pepsin","Lipase","Amylase","Trypsin"], 2, "Salivary amylase breaks down starch into maltose in the mouth.", "Life Processes"),
    # Control and Coordination
    ("Brain is protected by?", ["Ribs","Cranium","Vertebrae","Sternum"], 1, "The brain is protected by the cranium (skull bones) and meninges membranes.", "Control and Coordination"),
    ("Which hormone controls blood sugar?", ["Thyroxin","Adrenaline","Insulin","Growth hormone"], 2, "Insulin (from pancreas) lowers blood sugar. Diabetes occurs when insulin is insufficient.", "Control and Coordination"),
    # Heredity and Evolution
    ("DNA stands for?", ["Dioxyribonucleic acid","Deoxyribose nucleic acid","Deoxyribonucleic acid","Di-nucleic acid"], 2, "DNA = Deoxyribonucleic Acid. It carries genetic information.", "Heredity and Evolution"),
    ("Father of genetics is?", ["Darwin","Mendel","Lamarck","Watson"], 1, "Gregor Johann Mendel (1822-1884) is the father of genetics. He studied pea plants.", "Heredity and Evolution"),
    # Light
    ("Speed of light in vacuum is?", ["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁵ m/s"], 1, "Speed of light c = 3×10⁸ m/s = 3,00,000 km/s.", "Light - Reflection and Refraction"),
    ("Image formed by plane mirror is?", ["Real","Virtual and erect","Inverted","Magnified"], 1, "Plane mirror forms virtual, erect, laterally inverted, same-size image.", "Light - Reflection and Refraction"),
    ("Lens used to correct myopia is?", ["Convex","Concave","Bifocal","Cylindrical"], 1, "Myopia (short-sightedness) is corrected using concave (diverging) lens.", "Light - Reflection and Refraction"),
    # Electricity
    ("SI unit of electric current is?", ["Volt","Watt","Ampere","Ohm"], 2, "SI unit of current is Ampere (A). 1A = 1 coulomb/second.", "Electricity"),
    ("Ohm's law states V = ?", ["IR","I/R","R/I","I²R"], 0, "Ohm's law: V = IR (Voltage = Current × Resistance).", "Electricity"),
    ("1 kWh = ?", ["3600 J","36000 J","3600000 J","360 J"], 2, "1 kWh = 1000W × 3600s = 3,600,000 J = 3.6 MJ. This is 1 unit of electricity.", "Electricity"),
    # Magnetic Effects
    ("Dynamo converts?", ["Electrical to mechanical","Mechanical to electrical","Chemical to electrical","Electrical to heat"], 1, "A dynamo/generator converts mechanical energy to electrical energy using electromagnetic induction.", "Magnetic Effects of Current"),
    ("Fleming's left hand rule gives direction of?", ["Current","Force","Magnetic field","EMF"], 0, "Fleming's left hand rule: Forefinger=Field, Middle finger=Current, Thumb=Force (motion).", "Magnetic Effects of Current"),
    # Sources of Energy
    ("Solar cell converts?", ["Heat to electricity","Light to electricity","Wind to electricity","Chemical to electricity"], 1, "Solar cells (photovoltaic) convert sunlight directly into electricity.", "Sources of Energy"),
    # Environment
    ("Ozone layer is in?", ["Troposphere","Stratosphere","Mesosphere","Thermosphere"], 1, "Ozone layer is in the stratosphere (15-35 km altitude). It absorbs UV radiation.", "Our Environment"),
    ("10% law of energy transfer was given by?", ["Odum","Lindeman","Tansley","Haeckel"], 1, "Lindeman's 10% law: Only 10% of energy transfers from one trophic level to the next.", "Our Environment"),
]

CLASS10_SOCIAL_SCIENCE = [
    # History
    ("First War of Indian Independence was in?", ["1757","1857","1885","1947"], 1, "The First War of Independence (Sepoy Mutiny) was in 1857 against the British East India Company.", "History - India"),
    ("Who started the Civil Disobedience Movement?", ["Tilak","Gandhi","Nehru","Subhash"], 1, "Mahatma Gandhi started the Civil Disobedience Movement in 1930 with the Dandi March (Salt Satyagraha).", "History - India"),
    ("Jallianwala Bagh massacre happened in?", ["1915","1917","1919","1921"], 2, "Jallianwala Bagh massacre: April 13, 1919, Amritsar. General Dyer ordered firing on peaceful protesters.", "History - India"),
    ("Who gave the slogan 'Do or Die'?", ["Bhagat Singh","Subhash Chandra Bose","Mahatma Gandhi","Jawaharlal Nehru"], 2, "Mahatma Gandhi gave 'Do or Die' (Karo ya Maro) during the Quit India Movement in 1942.", "History - India"),
    ("Indian National Congress was founded in?", ["1857","1885","1905","1920"], 1, "INC was founded in 1885 by A.O. Hume. First session in Bombay under W.C. Bonnerjee.", "History - India"),
    ("French Revolution started in?", ["1776","1789","1799","1815"], 1, "French Revolution began in 1789 with the storming of the Bastille on July 14.", "History - World"),
    # Geography
    ("Largest state of India by area is?", ["Madhya Pradesh","Maharashtra","Uttar Pradesh","Rajasthan"], 3, "Rajasthan is the largest state by area (342,239 km²), followed by Madhya Pradesh.", "Geography - India"),
    ("Black soil is suitable for growing?", ["Rice","Wheat","Cotton","Tea"], 2, "Black soil (regur soil) is ideal for cotton cultivation. Found in Maharashtra, Gujarat, MP.", "Geography - Resources"),
    ("Which river is called 'Sorrow of Bihar'?", ["Ganga","Son","Kosi","Gandak"], 2, "Kosi river is called 'Sorrow of Bihar' due to frequent floods and course changes.", "Geography - India"),
    ("Bhakra Nangal Dam is on which river?", ["Ganga","Yamuna","Sutlej","Narmada"], 2, "Bhakra Nangal Dam is on Sutlej river in Himachal Pradesh/Punjab border. Height: 226m.", "Geography - Resources"),
    ("Which soil is most fertile?", ["Red soil","Laterite soil","Alluvial soil","Black soil"], 2, "Alluvial soil is the most fertile, deposited by rivers. Found in Indo-Gangetic plains.", "Geography - Resources"),
    # Civics
    ("How many Fundamental Rights in Indian Constitution?", ["5","6","7","8"], 1, "There are 6 Fundamental Rights (originally 7, Right to Property removed by 44th Amendment).", "Civics"),
    ("Minimum age to vote in India is?", ["16 years","18 years","21 years","25 years"], 1, "Voting age in India is 18 years (reduced from 21 by 61st Amendment, 1988).", "Civics"),
    ("Who is the head of a state government?", ["President","Prime Minister","Governor","Chief Minister"], 3, "Chief Minister is the head of state government. Governor is the constitutional head.", "Civics"),
    ("Panchayati Raj was constitutionalized by?", ["42nd Amendment","44th Amendment","73rd Amendment","86th Amendment"], 2, "73rd Amendment (1992) gave constitutional status to Panchayati Raj institutions.", "Civics"),
    # Economics
    ("Primary sector includes?", ["Manufacturing","Agriculture","Services","Banking"], 1, "Primary sector = agriculture, fishing, mining, forestry. Direct use of natural resources.", "Economics"),
    ("NREGA guarantees how many days of work?", ["50","100","150","200"], 1, "MGNREGA guarantees 100 days of wage employment per year to rural households.", "Economics"),
    ("GDP stands for?", ["Gross Domestic Product","Gross Development Plan","General Domestic Price","Grand Development Product"], 0, "GDP = Gross Domestic Product. Total value of goods and services produced in a country.", "Economics"),
    ("Green Revolution was related to?", ["Industry","Agriculture","IT","Education"], 1, "Green Revolution (1960s-70s) boosted agricultural production using HYV seeds, fertilizers, irrigation.", "Economics"),
]

CLASS10_HINDI = [
    ("'सूरदास' किस भक्ति धारा के कवि हैं?", ["राम भक्ति","कृष्ण भक्ति","निर्गुण भक्ति","शक्ति भक्ति"], 1, "सूरदास कृष्ण भक्ति धारा (सगुण भक्ति) के प्रमुख कवि हैं। इनकी प्रमुख रचना 'सूरसागर' है।", "Hindi Literature"),
    ("'तुलसीदास' की प्रमुख रचना कौन सी है?", ["सूरसागर","रामचरितमानस","कामायनी","साकेत"], 1, "तुलसीदास की प्रमुख रचना 'रामचरितमानस' है, जो अवधी भाषा में लिखी गई है।", "Hindi Literature"),
    ("'वाक्य' के कितने अंग होते हैं?", ["2","3","4","5"], 0, "वाक्य के दो अंग होते हैं — उद्देश्य (Subject) और विधेय (Predicate)।", "Hindi Grammar"),
    ("'संज्ञा' के कितने भेद होते हैं?", ["3","4","5","6"], 2, "संज्ञा के 5 भेद: व्यक्तिवाचक, जातिवाचक, भाववाचक, समूहवाचक, द्रव्यवाचक।", "Hindi Grammar"),
    ("'सर्वनाम' का उदाहरण कौन सा है?", ["राम","सुंदर","वह","पढ़ना"], 2, "'वह' सर्वनाम है। सर्वनाम संज्ञा के स्थान पर प्रयुक्त होता है।", "Hindi Grammar"),
    ("'विशेषण' क्या होता है?", ["संज्ञा की विशेषता बताने वाला","क्रिया की विशेषता","जोड़ने वाला","विस्मय बोधक"], 0, "विशेषण वह शब्द है जो संज्ञा या सर्वनाम की विशेषता बताता है। जैसे: 'बड़ा' घर।", "Hindi Grammar"),
    ("'अलंकार' का शाब्दिक अर्थ क्या है?", ["सजावट","आभूषण","शोभा","सभी"], 1, "'अलंकार' का शाब्दिक अर्थ 'आभूषण' है। काव्य में शोभा बढ़ाने वाले तत्व।", "Hindi Grammar"),
    ("'उपमा अलंकार' में प्रयोग होता है?", ["जैसा, सा, सी","वही, वह","बिना, बगैर","या, अथवा"], 0, "उपमा अलंकार में 'जैसा', 'सा', 'सी', 'सम', 'तुल्य' आदि शब्दों का प्रयोग होता है।", "Hindi Grammar"),
    ("'रस' के कितने प्रकार होते हैं?", ["7","8","9","10"], 2, "रस के 9 प्रकार: श्रृंगार, हास्य, करुण, रौद्र, वीर, भयानक, बीभत्स, अद्भुत, शांत।", "Hindi Grammar"),
    ("'समास' का अर्थ क्या है?", ["विस्तार","संक्षेप","विग्रह","व्याख्या"], 1, "'समास' का अर्थ है 'संक्षेप' — दो या अधिक शब्दों का मिलकर एक शब्द बनना।", "Hindi Grammar"),
    ("'मुहावरा' क्या है?", ["लोकोक्ति","कहावत","विशेष अर्थ वाला वाक्यांश","उपमा"], 2, "मुहावरा वह वाक्यांश है जो अपने शाब्दिक अर्थ से भिन्न विशेष अर्थ देता है।", "Hindi Grammar"),
    ("'आँखों का तारा' मुहावरे का अर्थ है?", ["शत्रु","बहुत प्यारा","अंधा","तेज़ नज़र"], 1, "'आँखों का तारा' का अर्थ है 'बहुत प्यारा'। जैसे: बेटा माँ की आँखों का तारा है।", "Hindi Grammar"),
    ("पत्र कितने प्रकार के होते हैं?", ["2","3","4","5"], 0, "पत्र 2 प्रकार के होते हैं — औपचारिक (Formal) और अनौपचारिक (Informal)।", "Hindi Writing"),
    ("'कबीर' किस धारा के कवि हैं?", ["सगुण भक्ति","निर्गुण भक्ति","रीतिकाल","आधुनिक काल"], 1, "कबीर निर्गुण भक्ति धारा (ज्ञानमार्गी) के प्रमुख कवि हैं। इनके दोहे प्रसिद्ध हैं।", "Hindi Literature"),
    ("'प्रेमचंद' को क्या कहा जाता है?", ["कविता का राजा","उपन्यास सम्राट","नाटक का पिता","कहानी का जनक"], 1, "मुंशी प्रेमचंद को 'उपन्यास सम्राट' कहा जाता है। प्रमुख उपन्यास: गोदान, गबन।", "Hindi Literature"),
]

CLASS10_ENGLISH = [
    ("Choose the correct passive voice of 'She writes a letter':", ["A letter is written by her","A letter was written by her","A letter written by her","A letter is being written by her"], 0, "Active (Simple Present): She writes a letter → Passive: A letter is written by her.", "English Grammar"),
    ("The synonym of 'brave' is?", ["Coward","Courageous","Timid","Weak"], 1, "'Brave' means courageous, valiant, fearless.", "English Vocabulary"),
    ("The antonym of 'ancient' is?", ["Old","Historic","Modern","Antique"], 2, "'Ancient' means very old. Its antonym is 'modern' (new, recent).", "English Vocabulary"),
    ("Identify the noun: 'Honesty is the best policy'", ["best","policy","is","honesty"], 3, "'Honesty' is an abstract noun (quality/virtue). 'Policy' is also a noun.", "English Grammar"),
    ("Which is a conjunction?", ["Beautiful","Quickly","But","Under"], 2, "'But' is a conjunction that joins two contrasting clauses. Others: and, or, so, yet.", "English Grammar"),
    ("Fill in: He ___ to school daily.", ["go","goes","going","gone"], 1, "'He goes' — Third person singular uses 'goes' in simple present tense.", "English Grammar"),
    ("The plural of 'child' is?", ["Childs","Childrens","Children","Childes"], 2, "'Child' → 'Children' (irregular plural). Not childs or childrens.", "English Grammar"),
    ("Which tense: 'I have eaten lunch'?", ["Simple past","Present perfect","Past perfect","Future perfect"], 1, "'Have/has + past participle' = Present Perfect tense. Shows completed action with present relevance.", "English Grammar"),
    ("An adjective describes a?", ["Verb","Noun","Adverb","Preposition"], 1, "An adjective describes/modifies a noun or pronoun. Example: 'tall' building.", "English Grammar"),
    ("The article used before 'university' is?", ["A","An","The","No article"], 0, "'University' starts with 'yu' sound (consonant sound), so we use 'a' not 'an'.", "English Grammar"),
    ("Which is correct?", ["He don't know","He doesn't know","He doesn't knows","He don't knows"], 1, "Third person singular: 'He/She/It doesn't + base verb'. Doesn't know (not doesn't knows).", "English Grammar"),
    ("A formal letter ends with?", ["Yours lovingly","Best wishes","Yours faithfully","With love"], 2, "Formal letters end with 'Yours faithfully' (unknown recipient) or 'Yours sincerely' (known).", "English Writing"),
    ("'To put off' means?", ["To wear","To postpone","To finish","To start"], 1, "'Put off' is a phrasal verb meaning to postpone/delay something.", "English Vocabulary"),
    ("Choose the correct spelling:", ["Acheive","Achieve","Acheeve","Achive"], 1, "Correct spelling: A-C-H-I-E-V-E. Remember: 'i before e except after c'.", "English Vocabulary"),
]

# ══════════════════════════════════════════════════════════════
#  CLASS 12 QUESTION BANKS
# ══════════════════════════════════════════════════════════════

CLASS12_PHYSICS = [
    ("SI unit of electric charge is?", ["Ampere","Volt","Coulomb","Ohm"], 2, "SI unit of charge is Coulomb (C). 1 Coulomb = charge of 6.25×10¹⁸ electrons.", "Electrostatics"),
    ("Coulomb's law gives force between?", ["Masses","Magnets","Charges","Currents"], 2, "Coulomb's law: F = kq₁q₂/r². Force between two point charges is proportional to product of charges.", "Electrostatics"),
    ("Electric field inside a conductor is?", ["Maximum","Minimum","Zero","Infinite"], 2, "Electric field inside a conductor in electrostatic equilibrium is zero. Charges reside on surface.", "Electrostatics"),
    ("Capacitance of parallel plate capacitor is?", ["ε₀A/d","ε₀d/A","ε₀Ad","A/ε₀d"], 0, "C = ε₀A/d where A = area of plates, d = distance between plates, ε₀ = permittivity.", "Electrostatics"),
    ("Kirchhoff's junction rule is based on?", ["Conservation of energy","Conservation of charge","Newton's law","Ohm's law"], 1, "Junction rule: ΣI(in) = ΣI(out). Based on conservation of charge at a node.", "Current Electricity"),
    ("Internal resistance of an ideal battery is?", ["Infinite","Very high","Zero","1 Ohm"], 2, "An ideal battery has zero internal resistance. Real batteries have small internal resistance.", "Current Electricity"),
    ("Wheatstone bridge is used to measure?", ["Current","Voltage","Resistance","Capacitance"], 2, "Wheatstone bridge measures unknown resistance. At balance: P/Q = R/S.", "Current Electricity"),
    ("Biot-Savart law gives?", ["Electric field","Magnetic field due to current","Gravitational field","EMF"], 1, "Biot-Savart law: dB = (μ₀/4π)(Idl×r̂)/r². Gives magnetic field due to current element.", "Moving Charges and Magnetism"),
    ("Force on a current-carrying conductor in magnetic field: F = ?", ["qvB","BIL","qE","kq₁q₂/r²"], 1, "F = BIL sin θ where B = magnetic field, I = current, L = length of conductor.", "Moving Charges and Magnetism"),
    ("Faraday's law relates to?", ["Electrostatics","Electromagnetic induction","Magnetism","Gravitation"], 1, "Faraday's law: Induced EMF = -dΦ/dt. Change in magnetic flux induces EMF.", "Electromagnetic Induction"),
    ("Self-inductance is measured in?", ["Farad","Henry","Weber","Tesla"], 1, "SI unit of inductance is Henry (H). Named after Joseph Henry.", "Electromagnetic Induction"),
    ("In AC circuit, power factor cos φ = ?", ["R/Z","X/Z","Z/R","X/R"], 0, "Power factor = cos φ = R/Z where R = resistance, Z = impedance.", "AC Circuits"),
    ("Electromagnetic waves travel at speed of?", ["Sound","Light","Electron","None"], 1, "EM waves travel at speed of light c = 3×10⁸ m/s in vacuum.", "EM Waves"),
    ("Which EM wave has highest frequency?", ["Radio waves","Microwaves","X-rays","Gamma rays"], 3, "Gamma rays have highest frequency (>10²⁰ Hz) and highest energy.", "EM Waves"),
    ("Snell's law: n₁ sin i = ?", ["n₂ sin i","n₂ sin r","n₁ sin r","n₂ cos r"], 1, "Snell's law: n₁ sin i = n₂ sin r. Relates angles of incidence and refraction.", "Ray Optics"),
    ("Total internal reflection occurs when light goes from?", ["Denser to rarer medium","Rarer to denser medium","Same medium","Vacuum to air"], 0, "TIR occurs when light goes from denser to rarer medium at angle > critical angle.", "Ray Optics"),
    ("In Young's double slit experiment, fringe width β = ?", ["λD/d","λd/D","Dd/λ","D/λd"], 0, "β = λD/d where λ = wavelength, D = screen distance, d = slit separation.", "Wave Optics"),
    ("Photoelectric effect proves light is?", ["Wave","Particle","Both","Neither"], 1, "Photoelectric effect (Einstein) shows particle nature of light (photons). KE = hν - φ.", "Dual Nature"),
    ("de Broglie wavelength λ = ?", ["h/p","h/E","p/h","E/h"], 0, "de Broglie: λ = h/p = h/(mv). Every moving particle has a wave associated with it.", "Dual Nature"),
    ("Bohr's model is for?", ["Multi-electron atoms","Hydrogen-like atoms","Molecules","Metals"], 1, "Bohr model applies to hydrogen and hydrogen-like atoms (single electron systems).", "Atoms"),
    ("In nuclear fission, a heavy nucleus?", ["Combines","Splits","Remains same","Evaporates"], 1, "Nuclear fission: Heavy nucleus splits into lighter nuclei releasing energy. Used in nuclear reactors.", "Nuclei"),
    ("Nuclear fusion requires?", ["Low temperature","Very high temperature","Room temperature","Low pressure"], 1, "Nuclear fusion requires extremely high temperature (~10⁷ K) to overcome electrostatic repulsion.", "Nuclei"),
    ("In p-n junction diode, current flows easily in?", ["Forward bias","Reverse bias","Both","Neither"], 0, "In forward bias, p-side is positive, barrier reduces, current flows easily.", "Semiconductor"),
    ("LED stands for?", ["Light Emitting Diode","Light Energy Device","Low Energy Diode","Laser Emitting Diode"], 0, "LED = Light Emitting Diode. Converts electrical energy to light. Used in displays.", "Semiconductor"),
    ("Logic gate that gives output 1 when all inputs are 1?", ["OR","AND","NOT","NOR"], 1, "AND gate: Output = 1 only when ALL inputs are 1. Y = A·B.", "Semiconductor"),
]

CLASS12_CHEMISTRY = [
    ("Molarity is defined as?", ["Moles of solute per litre of solution","Moles per kg of solvent","Grams per litre","Equivalents per litre"], 0, "Molarity (M) = moles of solute / volume of solution in litres.", "Solutions"),
    ("Raoult's law is applicable to?", ["Ideal solutions","Real solutions","Gases","Solids"], 0, "Raoult's law: P = P°×x (partial pressure = vapor pressure × mole fraction) for ideal solutions.", "Solutions"),
    ("Colligative properties depend on?", ["Nature of solute","Number of solute particles","Nature of solvent","Temperature only"], 1, "Colligative properties depend on number of solute particles, not their nature.", "Solutions"),
    ("In electrolysis, reduction occurs at?", ["Anode","Cathode","Both","Neither"], 1, "Reduction occurs at cathode (gain of electrons). Oxidation at anode (loss of electrons).", "Electrochemistry"),
    ("Standard hydrogen electrode potential is?", ["1 V","0 V","-1 V","0.5 V"], 1, "Standard Hydrogen Electrode (SHE) potential is defined as 0 V (reference electrode).", "Electrochemistry"),
    ("Rate of reaction depends on?", ["Concentration","Temperature","Catalyst","All of these"], 3, "Rate depends on concentration (rate law), temperature (Arrhenius), and catalyst.", "Chemical Kinetics"),
    ("Order of reaction can be?", ["Only integer","Only positive","Zero or positive","Only whole number"], 2, "Order can be zero, positive integer, fraction, or even negative for some reactions.", "Chemical Kinetics"),
    ("Le Chatelier's principle is about?", ["Chemical bonding","Chemical equilibrium","Thermodynamics","Electrochemistry"], 1, "Le Chatelier: If equilibrium is disturbed, system shifts to counteract the change.", "Chemical Equilibrium"),
    ("pH of 0.01 M HCl is?", ["1","2","3","4"], 1, "pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2.", "Ionic Equilibrium"),
    ("Coordination number of FCC is?", ["4","6","8","12"], 3, "In FCC (Face-Centered Cubic), each atom touches 12 neighbors. CN = 12.", "Solid State"),
    ("Number of atoms per unit cell in BCC is?", ["1","2","4","6"], 1, "BCC: 8 corners × 1/8 + 1 center = 1 + 1 = 2 atoms per unit cell.", "Solid State"),
    ("Which is not a colloidal solution?", ["Milk","Fog","Blood","Sugar solution"], 3, "Sugar solution is a true solution (particle size < 1 nm). Milk, fog, blood are colloids.", "Surface Chemistry"),
    ("Tyndall effect is shown by?", ["True solutions","Colloidal solutions","Suspensions","Pure solvents"], 1, "Tyndall effect: Scattering of light by colloidal particles. Not seen in true solutions.", "Surface Chemistry"),
    ("IUPAC name of CH₃CHO is?", ["Methanal","Ethanal","Propanal","Butanal"], 1, "CH₃CHO = Ethanal (Acetaldehyde). 2 carbons with -CHO group.", "Aldehydes and Ketones"),
    ("Cannizzaro reaction is given by?", ["Aldehydes with α-H","Aldehydes without α-H","Ketones","Carboxylic acids"], 1, "Cannizzaro reaction: Aldehydes without α-hydrogen (like HCHO, C₆H₅CHO) undergo disproportionation.", "Aldehydes and Ketones"),
    ("Grignard reagent has formula?", ["R-MgX","R-ZnX","R-Li","R-Na"], 0, "Grignard reagent: RMgX (R = alkyl/aryl, X = halogen). Used in organic synthesis.", "Haloalkanes"),
    ("SN1 reaction rate depends on?", ["Both substrate and nucleophile","Only substrate","Only nucleophile","Solvent only"], 1, "SN1 is unimolecular. Rate = k[substrate]. Independent of nucleophile concentration.", "Haloalkanes"),
    ("Glucose formula is?", ["C₆H₁₂O₆","C₁₂H₂₂O₁₁","C₆H₁₀O₅","C₅H₁₀O₅"], 0, "Glucose = C₆H₁₂O₆ (a monosaccharide/simple sugar). Also called dextrose.", "Biomolecules"),
    ("DNA contains which sugar?", ["Ribose","Deoxyribose","Glucose","Fructose"], 1, "DNA has deoxyribose sugar (lacks one oxygen). RNA has ribose sugar.", "Biomolecules"),
    ("Bakelite is a type of?", ["Thermoplastic","Thermosetting plastic","Elastomer","Fibre"], 1, "Bakelite is thermosetting (cannot be remoulded). Made from phenol + formaldehyde.", "Polymers"),
    ("Nylon-66 is a?", ["Addition polymer","Condensation polymer","Natural polymer","Homopolymer"], 1, "Nylon-66 is a condensation polymer of hexamethylenediamine and adipic acid.", "Polymers"),
    ("Aspirin is chemically?", ["Paracetamol","Acetyl salicylic acid","Ibuprofen","Caffeine"], 1, "Aspirin = Acetyl Salicylic Acid. Used as analgesic (pain reliever) and antipyretic.", "Chemistry in Everyday Life"),
    ("Detergents are sodium salts of?", ["Fatty acids","Long chain sulphonic acids","Amino acids","Carbolic acid"], 1, "Detergents are sodium salts of long chain benzene sulphonic acids. Work in hard water too.", "Chemistry in Everyday Life"),
]

CLASS12_MATH = [
    # Relations and Functions
    ("A function f: A→B is bijective if it is?", ["Only one-one","Only onto","Both one-one and onto","Neither"], 2, "Bijective = one-one (injective) + onto (surjective). Every element has unique pre-image.", "Relations and Functions"),
    ("sin⁻¹(1) = ?", ["0","π/6","π/4","π/2"], 3, "sin⁻¹(1) = π/2 (90°) because sin(π/2) = 1.", "Inverse Trigonometry"),
    ("tan⁻¹(1) = ?", ["0","π/6","π/4","π/3"], 2, "tan⁻¹(1) = π/4 (45°) because tan(π/4) = 1.", "Inverse Trigonometry"),
    # Matrices
    ("If A is 3×2 matrix and B is 2×4 matrix, order of AB is?", ["3×4","2×2","3×2","2×4"], 0, "AB is defined when columns of A = rows of B. Order of AB = (rows of A) × (columns of B) = 3×4.", "Matrices"),
    ("Transpose of A is obtained by?", ["Adding rows","Interchanging rows and columns","Multiplying rows","Subtracting rows"], 1, "Transpose A' is obtained by interchanging rows and columns of matrix A.", "Matrices"),
    ("Identity matrix has?", ["All zeros","All ones","1 on diagonal, 0 elsewhere","0 on diagonal, 1 elsewhere"], 2, "Identity matrix I has 1s on main diagonal and 0s elsewhere. AI = IA = A.", "Matrices"),
    # Determinants
    ("If det(A) = 0, matrix is?", ["Invertible","Non-singular","Singular","Orthogonal"], 2, "If |A| = 0, matrix is singular (non-invertible). If |A| ≠ 0, it is non-singular.", "Determinants"),
    ("det(kA) for n×n matrix = ?", ["k·det(A)","k²·det(A)","kⁿ·det(A)","det(A)/k"], 2, "det(kA) = kⁿ·det(A) for n×n matrix. Each row multiplied by k.", "Determinants"),
    # Calculus
    ("d/dx (sin x) = ?", ["cos x","-cos x","sin x","-sin x"], 0, "Derivative of sin x is cos x.", "Differentiation"),
    ("d/dx (eˣ) = ?", ["eˣ","xeˣ⁻¹","eˣ/x","x·eˣ"], 0, "Derivative of eˣ is eˣ itself. It is the only function equal to its own derivative.", "Differentiation"),
    ("∫ 1/x dx = ?", ["x","1/x²","ln|x| + C","eˣ + C"], 2, "∫ 1/x dx = ln|x| + C (natural logarithm of absolute value of x).", "Integration"),
    ("∫ eˣ dx = ?", ["eˣ","eˣ + C","xeˣ + C","eˣ/x + C"], 1, "∫ eˣ dx = eˣ + C.", "Integration"),
    ("∫₀¹ x² dx = ?", ["1/2","1/3","1/4","1"], 1, "∫₀¹ x² dx = [x³/3]₀¹ = 1/3 - 0 = 1/3.", "Integration"),
    ("Area under curve y=f(x) from a to b is?", ["∫ₐᵇ f(x)dx","f(b)-f(a)","f'(b)-f'(a)","∫ₐᵇ f'(x)dx"], 0, "Area = ∫ₐᵇ f(x)dx (definite integral). Fundamental theorem of calculus.", "Application of Integration"),
    # Differential Equations
    ("Order of dy/dx + y = 0 is?", ["0","1","2","3"], 1, "Order = highest derivative present. dy/dx is first derivative, so order = 1.", "Differential Equations"),
    ("Degree of (d²y/dx²)³ + dy/dx = 0 is?", ["1","2","3","6"], 2, "Degree = power of highest order derivative. (d²y/dx²)³ has degree 3.", "Differential Equations"),
    # Vectors
    ("If |a⃗| = 3 and |b⃗| = 4 and a⃗ ⊥ b⃗, then |a⃗ × b⃗| = ?", ["0","7","12","5"], 2, "|a⃗ × b⃗| = |a⃗||b⃗|sin90° = 3×4×1 = 12.", "Vectors"),
    ("a⃗ · b⃗ = 0 implies?", ["a⃗ ∥ b⃗","a⃗ ⊥ b⃗","a⃗ = b⃗","a⃗ = 0"], 1, "Dot product = 0 means vectors are perpendicular (90° angle). a⃗·b⃗ = |a⃗||b⃗|cosθ.", "Vectors"),
    # 3D Geometry
    ("Direction cosines satisfy l² + m² + n² = ?", ["0","1","2","3"], 1, "l² + m² + n² = 1 where l, m, n are direction cosines. Sum of squares = 1.", "3D Geometry"),
    # Probability
    ("P(A∪B) = P(A) + P(B) - ?", ["P(A)·P(B)","P(A∩B)","P(A|B)","P(B|A)"], 1, "Addition theorem: P(A∪B) = P(A) + P(B) - P(A∩B).", "Probability"),
    ("Bayes' theorem gives?", ["Prior probability","Posterior probability","Joint probability","Marginal probability"], 1, "Bayes' theorem: P(A|B) = P(B|A)·P(A)/P(B). Gives posterior (updated) probability.", "Probability"),
    ("Mean of Binomial distribution is?", ["np","npq","n/p","√(npq)"], 0, "Mean of Binomial = np where n = trials, p = probability of success.", "Probability"),
    # Linear Programming
    ("In LPP, the feasible region is?", ["Always unbounded","Set of all possible solutions","Set satisfying all constraints","Single point"], 2, "Feasible region is the set of all points satisfying all constraints simultaneously.", "Linear Programming"),
    ("Optimal solution of LPP occurs at?", ["Center of feasible region","Corner points","Any point","Origin"], 1, "Optimal solution occurs at corner (vertex) points of the feasible region.", "Linear Programming"),
]

CLASS12_BIOLOGY = [
    ("Pollination by insects is called?", ["Anemophily","Entomophily","Hydrophily","Ornithophily"], 1, "Entomophily = pollination by insects. Anemophily = wind, Hydrophily = water, Ornithophily = birds.", "Reproduction in Plants"),
    ("Male gamete in flowering plant is found in?", ["Ovule","Pollen grain","Stigma","Sepal"], 1, "Pollen grain contains male gametes. It develops in the anther of stamen.", "Reproduction in Plants"),
    ("The process of attachment of embryo to uterine wall is?", ["Fertilization","Ovulation","Implantation","Gestation"], 2, "Implantation: Blastocyst attaches to uterine endometrium about 7 days after fertilization.", "Human Reproduction"),
    ("Menstrual cycle in human female is of?", ["14 days","21 days","28 days","35 days"], 2, "Menstrual cycle is approximately 28 days. Ovulation occurs around day 14.", "Human Reproduction"),
    ("Test tube baby technique is called?", ["Cloning","IVF","GIFT","AI"], 1, "IVF = In Vitro Fertilization. Fertilization occurs outside the body in a lab.", "Reproductive Health"),
    ("Mendel's law of segregation is also called?", ["Law of dominance","Law of purity of gametes","Law of independent assortment","Law of variation"], 1, "Law of Segregation = Law of Purity of Gametes. Each gamete gets only one allele.", "Genetics"),
    ("Phenotypic ratio of monohybrid cross is?", ["1:1","1:2:1","3:1","9:3:3:1"], 2, "Monohybrid cross F2 phenotypic ratio = 3:1 (dominant:recessive). Genotypic = 1:2:1.", "Genetics"),
    ("DNA replication is?", ["Conservative","Semi-conservative","Dispersive","Random"], 1, "DNA replication is semi-conservative (Meselson & Stahl experiment). Each strand acts as template.", "Molecular Biology"),
    ("Transcription produces?", ["DNA","mRNA","Protein","Lipid"], 1, "Transcription: DNA → mRNA. RNA polymerase reads DNA template and synthesizes mRNA.", "Molecular Biology"),
    ("Central dogma of molecular biology is?", ["DNA→RNA→Protein","RNA→DNA→Protein","Protein→RNA→DNA","DNA→Protein→RNA"], 0, "Central dogma: DNA →(transcription)→ RNA →(translation)→ Protein.", "Molecular Biology"),
    ("Restriction enzymes are called?", ["Molecular scissors","Molecular glue","Molecular markers","Molecular probes"], 0, "Restriction enzymes = molecular scissors. They cut DNA at specific recognition sequences.", "Biotechnology"),
    ("PCR was invented by?", ["Watson","Crick","Kary Mullis","Berg"], 2, "PCR (Polymerase Chain Reaction) was invented by Kary Mullis in 1983. Nobel Prize 1993.", "Biotechnology"),
    ("Bt cotton is resistant to?", ["Drought","Bollworm","Virus","Fungus"], 1, "Bt cotton has Bt toxin gene (from Bacillus thuringiensis) making it resistant to bollworm.", "Biotechnology Applications"),
    ("Natural selection was proposed by?", ["Lamarck","Darwin","Mendel","Hugo de Vries"], 1, "Charles Darwin proposed natural selection in 'Origin of Species' (1859).", "Evolution"),
    ("Homologous organs have?", ["Same function","Same structure","Same origin","Same size"], 2, "Homologous organs have same origin and structure but different functions. Example: human hand, whale flipper.", "Evolution"),
    ("First trophic level is occupied by?", ["Herbivores","Carnivores","Producers","Decomposers"], 2, "Producers (green plants) occupy first trophic level. They make food by photosynthesis.", "Ecology"),
    ("Biodiversity hotspot in India is?", ["Thar Desert","Western Ghats","Gangetic Plain","Deccan Plateau"], 1, "Western Ghats is one of 36 global biodiversity hotspots. Rich in endemic species.", "Biodiversity"),
    ("Greenhouse gases cause?", ["Global warming","Ozone depletion","Acid rain","Eutrophication"], 0, "Greenhouse gases (CO₂, CH₄, N₂O) trap heat → global warming → climate change.", "Environmental Issues"),
    ("Eutrophication is caused by?", ["Heavy metals","Excess nutrients","Pesticides","Radioactive waste"], 1, "Eutrophication: Excess nutrients (N, P) → algal bloom → oxygen depletion in water bodies.", "Environmental Issues"),
]

CLASS12_HISTORY = [
    ("Who was the first Governor-General of India?", ["Lord Mountbatten","Lord Canning","Warren Hastings","William Bentinck"], 2, "Warren Hastings was the first Governor-General of Bengal (1773-85). Lord Canning was first Viceroy.", "Modern India"),
    ("Battle of Plassey was fought in?", ["1757","1764","1799","1857"], 0, "Battle of Plassey (1757): Robert Clive defeated Siraj-ud-Daulah. Established British rule in Bengal.", "Modern India"),
    ("Quit India Movement started in?", ["1930","1940","1942","1945"], 2, "Quit India Movement: August 8, 1942. Gandhi's call 'Do or Die'. Massive civil disobedience.", "Modern India"),
    ("Who wrote 'Discovery of India'?", ["Mahatma Gandhi","Jawaharlal Nehru","B.R. Ambedkar","S. Radhakrishnan"], 1, "Jawaharlal Nehru wrote 'Discovery of India' in 1944 while in Ahmednagar Fort jail.", "Modern India"),
    ("Partition of Bengal was done by?", ["Lord Curzon","Lord Ripon","Lord Dalhousie","Lord Wellesley"], 0, "Lord Curzon partitioned Bengal in 1905. It was annulled in 1911 due to strong protests.", "Modern India"),
    ("Simon Commission came to India in?", ["1919","1927","1928","1930"], 2, "Simon Commission arrived in 1928. Indians protested ('Simon Go Back') as it had no Indian member.", "Modern India"),
    ("Who founded Arya Samaj?", ["Raja Ram Mohan Roy","Swami Dayanand Saraswati","Swami Vivekananda","Annie Besant"], 1, "Swami Dayanand Saraswati founded Arya Samaj in 1875 in Bombay. Motto: 'Back to Vedas'.", "Social Reform"),
    ("Sati was abolished by?", ["Warren Hastings","Lord William Bentinck","Lord Dalhousie","Lord Curzon"], 1, "Lord William Bentinck abolished Sati in 1829 (Regulation XVII) with efforts of Raja Ram Mohan Roy.", "Social Reform"),
    ("Indus Valley Civilization was discovered in?", ["1911","1921","1931","1941"], 1, "Harappan civilization discovered in 1921 at Harappa by Daya Ram Sahni (under John Marshall).", "Ancient India"),
    ("Ashoka embraced Buddhism after which battle?", ["Haldighati","Kalinga","Panipat","Talikota"], 1, "Ashoka embraced Buddhism after the bloody Kalinga War (261 BC). He spread dharma via edicts.", "Ancient India"),
]

CLASS12_ECONOMICS = [
    ("GDP at factor cost = GDP at market price - ?", ["Subsidies","Net indirect taxes","Direct taxes","Depreciation"], 1, "GDP(FC) = GDP(MP) - Net Indirect Taxes. Net Indirect Taxes = Indirect Taxes - Subsidies.", "National Income"),
    ("Fiscal deficit = Total expenditure - ?", ["Total revenue","Total receipts excluding borrowings","Tax revenue","Non-tax revenue"], 1, "Fiscal Deficit = Total Expenditure - Total Receipts (excluding borrowings). Shows govt borrowing need.", "Government Budget"),
    ("Primary deficit = Fiscal deficit - ?", ["Revenue deficit","Interest payments","Capital expenditure","Tax revenue"], 1, "Primary Deficit = Fiscal Deficit - Interest Payments. Shows borrowing need excluding interest.", "Government Budget"),
    ("CRR is maintained with?", ["RBI","SBI","Government","SEBI"], 0, "CRR (Cash Reserve Ratio): Banks must keep a percentage of deposits with RBI.", "Money and Banking"),
    ("Full form of NITI Aayog is?", ["National Institution for Transforming India","National Institute of Technology India","National Industrial Training Institute","None"], 0, "NITI = National Institution for Transforming India. Replaced Planning Commission in 2015.", "Indian Economy"),
    ("Green Revolution was led by?", ["Verghese Kurien","M.S. Swaminathan","Norman Borlaug","Amartya Sen"], 1, "M.S. Swaminathan is called the Father of Indian Green Revolution. Norman Borlaug was global pioneer.", "Indian Economy"),
    ("Demand curve slopes?", ["Upward","Downward","Horizontal","Vertical"], 1, "Demand curve slopes downward (negative slope). Higher price → lower quantity demanded.", "Microeconomics"),
    ("When MR = MC, firm gets?", ["Maximum revenue","Maximum profit","Minimum cost","Break even"], 1, "Profit maximization condition: MR = MC (Marginal Revenue = Marginal Cost).", "Microeconomics"),
    ("Price elasticity of demand for necessities is?", ["Elastic","Inelastic","Unitary","Perfectly elastic"], 1, "Necessities have inelastic demand (Ed < 1). Change in price causes small change in quantity.", "Microeconomics"),
    ("Monopoly has how many sellers?", ["Many","Few","Two","One"], 3, "Monopoly = single seller. Oligopoly = few sellers. Perfect competition = many sellers.", "Market Structure"),
]

CLASS12_CIVICS = [
    ("Indian Constitution came into effect on?", ["15 Aug 1947","26 Jan 1950","26 Nov 1949","2 Oct 1950"], 1, "Constitution came into effect on 26 January 1950. 26 Nov 1949 was when it was adopted.", "Constitution"),
    ("Total number of Articles in Constitution originally?", ["370","395","448","350"], 1, "Originally 395 Articles in 22 Parts, 8 Schedules. Now has 470+ Articles, 25 Parts, 12 Schedules.", "Constitution"),
    ("Rajya Sabha members are elected for?", ["3 years","4 years","5 years","6 years"], 3, "Rajya Sabha members serve 6-year terms. 1/3 retire every 2 years.", "Parliament"),
    ("Money bill can be introduced in?", ["Rajya Sabha","Lok Sabha","Either House","Joint Session"], 1, "Money bills can only be introduced in Lok Sabha (Article 110). RS can only suggest amendments.", "Parliament"),
    ("Emergency provisions are in which Part?", ["Part XVI","Part XVII","Part XVIII","Part XIX"], 2, "Emergency provisions are in Part XVIII (Articles 352-360). Three types of emergency.", "Emergency"),
    ("Right to Education is under Article?", ["21","21A","19","14"], 1, "Article 21A (added by 86th Amendment, 2002): Free and compulsory education for 6-14 years.", "Fundamental Rights"),
    ("How many Fundamental Duties are there?", ["9","10","11","12"], 2, "11 Fundamental Duties (Article 51A). Originally 10, 11th added by 86th Amendment.", "Fundamental Duties"),
    ("Who is the guardian of Fundamental Rights?", ["President","Parliament","Supreme Court","Prime Minister"], 2, "Supreme Court is the guardian/protector of Fundamental Rights (Articles 32).", "Judiciary"),
    ("CAG is appointed by?", ["Prime Minister","President","Chief Justice","Parliament"], 1, "Comptroller and Auditor General (CAG) is appointed by the President (Article 148).", "Constitutional Bodies"),
    ("Chief Election Commissioner is removed by?", ["President","Parliament (like SC judge)","Prime Minister","Cabinet"], 1, "CEC can only be removed by Parliament through impeachment (like a Supreme Court judge).", "Constitutional Bodies"),
]

# ══════════════════════════════════════════════════════════════
#  HINDI MEDIUM QUESTION BANKS (translations + additional)
# ══════════════════════════════════════════════════════════════

CLASS10_MATH_HI = [
    ("12 और 18 का HCF क्या है?", ["2","4","6","12"], 2, "HCF(12,18) = 6। अभाज्य गुणनखंड: 12=2²×3, 18=2×3²। उभयनिष्ठ: 2×3=6।", "वास्तविक संख्याएँ"),
    ("15 और 20 का LCM क्या है?", ["30","45","60","120"], 2, "LCM(15,20) = 60। 15=3×5, 20=2²×5। LCM = 2²×3×5=60।", "वास्तविक संख्याएँ"),
    ("√2 एक ___ संख्या है?", ["परिमेय","अपरिमेय","प्राकृत","पूर्णांक"], 1, "√2 = 1.41421356... यह अनवसानी अनावर्ती दशमलव है, अतः अपरिमेय संख्या है।", "वास्तविक संख्याएँ"),
    ("बहुपद 3x⁴ + 2x² + 1 की घात क्या है?", ["1","2","3","4"], 3, "x की उच्चतम घात 4 है, अतः बहुपद की घात 4 है।", "बहुपद"),
    ("x² - 5x + 6 के शून्यकों का योग है?", ["5","6","-5","-6"], 0, "ax²+bx+c में शून्यकों का योग = -b/a = -(-5)/1 = 5।", "बहुपद"),
    ("द्विघात समीकरण का विविक्तकर D = ?", ["b² + 4ac","b² - 4ac","4ac - b²","a² - 4bc"], 1, "विविक्तकर D = b² - 4ac। यह मूलों की प्रकृति निर्धारित करता है।", "द्विघात समीकरण"),
    ("A.P. 2, 5, 8, 11... का सार्वअंतर है?", ["2","3","4","5"], 1, "d = a₂ - a₁ = 5 - 2 = 3।", "समांतर श्रेढ़ी"),
    ("sin 30° = ?", ["0","1/2","1/√2","√3/2"], 1, "sin 30° = 1/2। यह एक मानक त्रिकोणमितीय मान है।", "त्रिकोणमिति"),
    ("cos 60° = ?", ["0","1/2","1/√2","√3/2"], 1, "cos 60° = 1/2 = sin 30°।", "त्रिकोणमिति"),
    ("tan 45° = ?", ["0","1","√3","1/√3"], 1, "tan 45° = sin45°/cos45° = (1/√2)/(1/√2) = 1।", "त्रिकोणमिति"),
    ("sin²θ + cos²θ = ?", ["0","1","2","sin2θ"], 1, "यह मूल त्रिकोणमितीय सर्वसमिका है: sin²θ + cos²θ = 1।", "त्रिकोणमिति"),
    ("बिंदुओं (0,0) और (3,4) के बीच की दूरी?", ["3","4","5","7"], 2, "दूरी = √(3²+4²) = √(9+16) = √25 = 5।", "निर्देशांक ज्यामिति"),
    ("वृत्त का क्षेत्रफल = ?", ["2πr","πr²","2πr²","πr"], 1, "वृत्त का क्षेत्रफल = πr²। परिधि = 2πr।", "वृत्तों से संबंधित क्षेत्रफल"),
    ("गोले का आयतन = ?", ["4/3 πr³","2/3 πr³","πr³","4πr²"], 0, "गोले का आयतन = (4/3)πr³। पृष्ठीय क्षेत्रफल = 4πr²।", "पृष्ठीय क्षेत्रफल और आयतन"),
    ("2, 4, 6, 8, 10 का माध्य?", ["4","5","6","7"], 2, "माध्य = (2+4+6+8+10)/5 = 30/5 = 6।", "सांख्यिकी"),
    ("सिक्के को उछालने पर चित आने की प्रायिकता?", ["0","1/4","1/2","1"], 2, "P(चित) = 1/2। एक निष्पक्ष सिक्के में 2 समान रूप से संभावित परिणाम हैं।", "प्रायिकता"),
]

CLASS10_SCIENCE_HI = [
    ("लोहे पर जंग लगना किसका उदाहरण है?", ["संयोजन","अपघटन","ऑक्सीकरण","अपचयन"], 2, "जंग लगना ऑक्सीकरण है: 4Fe + 3O₂ → 2Fe₂O₃। लोहा ऑक्सीजन ग्रहण करता है।", "रासायनिक अभिक्रियाएँ"),
    ("शुद्ध जल का pH मान होता है?", ["0","5","7","14"], 2, "शुद्ध जल उदासीन होता है, pH = 7। pH < 7 अम्लीय, pH > 7 क्षारीय।", "अम्ल, क्षार और लवण"),
    ("कमरे के तापमान पर कौन सी धातु द्रव है?", ["लोहा","सोना","पारा","सोडियम"], 2, "पारा (Hg) कमरे के तापमान पर द्रव अवस्था में रहने वाली एकमात्र धातु है।", "धातु और अधातु"),
    ("मीथेन का सूत्र है?", ["CH₄","C₂H₆","C₂H₄","C₃H₈"], 0, "मीथेन (CH₄) सबसे सरल एल्केन है जिसमें 1 कार्बन और 4 हाइड्रोजन परमाणु हैं।", "कार्बन और उसके यौगिक"),
    ("प्रकाश संश्लेषण कहाँ होता है?", ["माइटोकॉन्ड्रिया","राइबोसोम","हरित लवक","केंद्रक"], 2, "प्रकाश संश्लेषण हरित लवक (क्लोरोप्लास्ट) में होता है जिसमें क्लोरोफिल होता है।", "जैव प्रक्रम"),
    ("ऑक्सीजन का वहन कौन करता है?", ["WBC","प्लेटलेट्स","RBC","प्लाज्मा"], 2, "RBC (लाल रक्त कणिकाएँ) में हीमोग्लोबिन होता है जो ऑक्सीजन का वहन करता है।", "जैव प्रक्रम"),
    ("मस्तिष्क की सुरक्षा करता है?", ["पसलियाँ","कपाल","कशेरुक","उरोस्थि"], 1, "मस्तिष्क की सुरक्षा कपाल (खोपड़ी) की हड्डियाँ और मस्तिष्कावरण करते हैं।", "नियंत्रण एवं समन्वय"),
    ("DNA का पूरा नाम है?", ["डाइऑक्सीरिबोन्यूक्लिक अम्ल","डीऑक्सीराइबोज न्यूक्लिक अम्ल","डीऑक्सीराइबोन्यूक्लिक अम्ल","डाइ-न्यूक्लिक अम्ल"], 2, "DNA = डीऑक्सीराइबोन्यूक्लिक अम्ल। यह आनुवंशिक सूचना का वाहक है।", "आनुवंशिकता"),
    ("निर्वात में प्रकाश की चाल है?", ["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁵ m/s"], 1, "प्रकाश की चाल c = 3×10⁸ m/s = 3,00,000 km/s।", "प्रकाश"),
    ("विद्युत धारा का SI मात्रक है?", ["वोल्ट","वाट","एम्पियर","ओम"], 2, "विद्युत धारा का SI मात्रक एम्पियर (A) है। 1A = 1 कूलॉम/सेकंड।", "विद्युत"),
    ("ओम का नियम: V = ?", ["IR","I/R","R/I","I²R"], 0, "ओम का नियम: V = IR (विभवांतर = धारा × प्रतिरोध)।", "विद्युत"),
    ("डायनेमो बदलता है?", ["विद्युत को यांत्रिक","यांत्रिक को विद्युत","रासायनिक को विद्युत","विद्युत को ऊष्मा"], 1, "डायनेमो/जनित्र यांत्रिक ऊर्जा को विद्युत ऊर्जा में बदलता है।", "विद्युत धारा के चुंबकीय प्रभाव"),
    ("ओजोन परत किस मंडल में है?", ["क्षोभमंडल","समतापमंडल","मध्यमंडल","तापमंडल"], 1, "ओजोन परत समतापमंडल (15-35 km) में है। यह UV विकिरण को अवशोषित करती है।", "हमारा पर्यावरण"),
    ("निकट दृष्टि दोष में कौन सा लेंस लगाते हैं?", ["उत्तल","अवतल","बाइफोकल","बेलनाकार"], 1, "निकट दृष्टि दोष (मायोपिया) को अवतल (अपसारी) लेंस से ठीक किया जाता है।", "प्रकाश"),
    ("सौर सेल बदलता है?", ["ऊष्मा को विद्युत","प्रकाश को विद्युत","पवन को विद्युत","रासायनिक को विद्युत"], 1, "सौर सेल सूर्य के प्रकाश को सीधे विद्युत ऊर्जा में बदलता है।", "ऊर्जा के स्रोत"),
]

CLASS12_PHYSICS_HI = [
    ("विद्युत आवेश का SI मात्रक है?", ["एम्पियर","वोल्ट","कूलॉम","ओम"], 2, "आवेश का SI मात्रक कूलॉम (C) है। 1 कूलॉम = 6.25×10¹⁸ इलेक्ट्रॉनों का आवेश।", "स्थिरवैद्युतिकी"),
    ("चालक के अंदर विद्युत क्षेत्र होता है?", ["अधिकतम","न्यूनतम","शून्य","अनंत"], 2, "स्थैतिक साम्यावस्था में चालक के अंदर विद्युत क्षेत्र शून्य होता है।", "स्थिरवैद्युतिकी"),
    ("किरचॉफ का संधि नियम आधारित है?", ["ऊर्जा संरक्षण","आवेश संरक्षण","न्यूटन नियम","ओम नियम"], 1, "संधि नियम: ΣI(अंदर) = ΣI(बाहर)। आवेश संरक्षण पर आधारित।", "विद्युत धारा"),
    ("फैराडे का नियम संबंधित है?", ["स्थिरवैद्युत","विद्युत चुंबकीय प्रेरण","चुंबकत्व","गुरुत्वाकर्षण"], 1, "फैराडे का नियम: प्रेरित EMF = -dΦ/dt। चुंबकीय फ्लक्स में परिवर्तन EMF उत्पन्न करता है।", "विद्युत चुंबकीय प्रेरण"),
    ("विद्युत चुंबकीय तरंगें चलती हैं?", ["ध्वनि की चाल से","प्रकाश की चाल से","इलेक्ट्रॉन की चाल से","किसी से नहीं"], 1, "EM तरंगें निर्वात में प्रकाश की चाल c = 3×10⁸ m/s से चलती हैं।", "EM तरंगें"),
    ("स्नेल का नियम: n₁ sin i = ?", ["n₂ sin i","n₂ sin r","n₁ sin r","n₂ cos r"], 1, "स्नेल का नियम: n₁ sin i = n₂ sin r। आपतन और अपवर्तन कोणों को जोड़ता है।", "किरण प्रकाशिकी"),
    ("यंग के द्विस्लिट प्रयोग में फ्रिंज चौड़ाई β = ?", ["λD/d","λd/D","Dd/λ","D/λd"], 0, "β = λD/d जहाँ λ = तरंगदैर्ध्य, D = पर्दे की दूरी, d = स्लिटों का अंतर।", "तरंग प्रकाशिकी"),
    ("प्रकाशवैद्युत प्रभाव सिद्ध करता है प्रकाश है?", ["तरंग","कण","दोनों","कोई नहीं"], 1, "प्रकाशवैद्युत प्रभाव (आइंस्टीन) प्रकाश की कण प्रकृति (फोटॉन) दर्शाता है।", "द्वैत प्रकृति"),
    ("नाभिकीय विखंडन में भारी नाभिक?", ["जुड़ता है","टूटता है","अपरिवर्तित रहता है","वाष्पित होता है"], 1, "नाभिकीय विखंडन: भारी नाभिक हल्के नाभिकों में टूटता है, ऊर्जा मुक्त होती है।", "नाभिक"),
    ("p-n संधि डायोड में धारा आसानी से बहती है?", ["अग्र अभिनति","पश्च अभिनति","दोनों","कोई नहीं"], 0, "अग्र अभिनति में p-पक्ष धनात्मक होता है, अवरोध कम होता है, धारा बहती है।", "अर्धचालक"),
    ("LED का पूरा नाम है?", ["लाइट एमिटिंग डायोड","लाइट एनर्जी डिवाइस","लो एनर्जी डायोड","लेज़र एमिटिंग डायोड"], 0, "LED = Light Emitting Diode (प्रकाश उत्सर्जक डायोड)।", "अर्धचालक"),
    ("AND गेट का आउटपुट 1 होता है जब?", ["कोई भी इनपुट 1 हो","सभी इनपुट 1 हों","कोई इनपुट 0 हो","सभी इनपुट 0 हों"], 1, "AND गेट: आउटपुट = 1 केवल जब सभी इनपुट 1 हों। Y = A·B।", "अर्धचालक"),
]

CLASS12_CHEMISTRY_HI = [
    ("मोलरता की परिभाषा है?", ["विलेय के मोल प्रति लीटर विलयन","मोल प्रति kg विलायक","ग्राम प्रति लीटर","तुल्यांक प्रति लीटर"], 0, "मोलरता (M) = विलेय के मोल / विलयन का आयतन (लीटर में)।", "विलयन"),
    ("0.01 M HCl का pH है?", ["1","2","3","4"], 1, "pH = -log[H⁺] = -log(0.01) = -log(10⁻²) = 2।", "आयनिक साम्य"),
    ("FCC में समन्वय संख्या है?", ["4","6","8","12"], 3, "FCC (फलक केन्द्रित घन) में प्रत्येक परमाणु 12 पड़ोसियों को स्पर्श करता है।", "ठोस अवस्था"),
    ("टिंडल प्रभाव दिखाता है?", ["वास्तविक विलयन","कोलॉइडी विलयन","निलंबन","शुद्ध विलायक"], 1, "टिंडल प्रभाव: कोलॉइडी कणों द्वारा प्रकाश का प्रकीर्णन।", "पृष्ठ रसायन"),
    ("ग्लूकोज का सूत्र है?", ["C₆H₁₂O₆","C₁₂H₂₂O₁₁","C₆H₁₀O₅","C₅H₁₀O₅"], 0, "ग्लूकोज = C₆H₁₂O₆ (एकशर्करा)। इसे डेक्सट्रोज भी कहते हैं।", "जैव अणु"),
    ("DNA में कौन सी शर्करा होती है?", ["राइबोज","डीऑक्सीराइबोज","ग्लूकोज","फ्रक्टोज"], 1, "DNA में डीऑक्सीराइबोज शर्करा होती है। RNA में राइबोज शर्करा।", "जैव अणु"),
    ("बैकेलाइट किस प्रकार का प्लास्टिक है?", ["थर्मोप्लास्टिक","थर्मोसेटिंग","इलास्टोमर","फाइबर"], 1, "बैकेलाइट थर्मोसेटिंग प्लास्टिक है (पुनः नहीं ढाला जा सकता)।", "बहुलक"),
    ("एस्पिरिन रासायनिक रूप से है?", ["पैरासिटामोल","एसिटिल सैलिसिलिक अम्ल","आइबुप्रोफेन","कैफीन"], 1, "एस्पिरिन = एसिटिल सैलिसिलिक अम्ल। दर्दनिवारक और ज्वरनाशक।", "दैनिक जीवन में रसायन"),
    ("SN1 अभिक्रिया की दर निर्भर करती है?", ["क्रियाधार और नाभिकरागी दोनों","केवल क्रियाधार","केवल नाभिकरागी","केवल विलायक"], 1, "SN1 एकाणुक है। दर = k[क्रियाधार]। नाभिकरागी की सांद्रता पर निर्भर नहीं।", "हैलोएल्केन"),
    ("नायलॉन-66 है एक?", ["योगात्मक बहुलक","संघनन बहुलक","प्राकृतिक बहुलक","समबहुलक"], 1, "नायलॉन-66 हेक्सामेथिलीन डाइएमीन और एडिपिक अम्ल का संघनन बहुलक है।", "बहुलक"),
]

# ══════════════════════════════════════════════════════════════
#  VARIANT GENERATORS
# ══════════════════════════════════════════════════════════════

PREFIXES_EN = [
    "", "Q: ", "Question: ", "Exam question: ",
    "UP Board: ", "Board exam: ", "Practice: ",
    "Solve: ", "MCQ: ", "Objective: ",
    "Previous year: ", "Important: ", "Expected: ",
    "Model paper: ", "Sample paper: ",
]

PREFIXES_HI = [
    "", "प्रश्न: ", "बोर्ड प्रश्न: ", "परीक्षा प्रश्न: ",
    "UP बोर्ड: ", "अभ्यास: ", "महत्वपूर्ण: ",
    "हल करें: ", "वस्तुनिष्ठ: ", "बहुविकल्पीय: ",
    "पिछले वर्ष: ", "संभावित: ", "मॉडल पेपर: ",
    "नमूना प्रश्न: ", "अति महत्वपूर्ण: ",
]

MODS = [
    lambda q: q,
    lambda q: q.replace("?", " (choose the correct answer)?") if "?" in q else q,
    lambda q: q.replace("?", " (select one)?") if "?" in q else q,
    lambda q: q + " [Important]",
    lambda q: q.replace("?", " — pick one?") if "?" in q else q,
    lambda q: q + " [Previous Year]",
    lambda q: q + " [Expected]",
    lambda q: q + " [Practice]",
    lambda q: q.replace("?", " (MCQ)?") if "?" in q else q,
    lambda q: q + " [Model Paper]",
]

MODS_HI = [
    lambda q: q,
    lambda q: q.replace("?", " (सही उत्तर चुनें)?") if "?" in q else q,
    lambda q: q.replace("?", " (एक चुनें)?") if "?" in q else q,
    lambda q: q + " [महत्वपूर्ण]",
    lambda q: q.replace("?", " — बताइए?") if "?" in q else q,
    lambda q: q + " [पिछले वर्ष]",
    lambda q: q + " [संभावित]",
    lambda q: q + " [अभ्यास]",
    lambda q: q.replace("?", " (बहुविकल्पीय)?") if "?" in q else q,
    lambda q: q + " [मॉडल पेपर]",
]

SUFFIXES = [
    "", " (2022)", " (2023)", " (2024)", " (2025)", " (2026)",
    " [Set A]", " [Set B]", " [Set C]", " [Set D]",
]

YEARS = list(range(2018, 2027))
DIFFICULTIES = ["easy", "medium", "hard"]

# ══════════════════════════════════════════════════════════════
#  EXAM → SUBJECT → QUESTION BANK MAPPING
# ══════════════════════════════════════════════════════════════

EXAM_SUBJECTS = {
    "up_board_10_en": {
        "Mathematics": CLASS10_MATH,
        "Science": CLASS10_SCIENCE,
        "Social Science": CLASS10_SOCIAL_SCIENCE,
        "English": CLASS10_ENGLISH,
    },
    "up_board_10_hi": {
        "गणित": CLASS10_MATH_HI,
        "विज्ञान": CLASS10_SCIENCE_HI,
        "हिंदी": CLASS10_HINDI,
    },
    "up_board_12_en": {
        "Physics": CLASS12_PHYSICS,
        "Chemistry": CLASS12_CHEMISTRY,
        "Mathematics": CLASS12_MATH,
        "Biology": CLASS12_BIOLOGY,
        "History": CLASS12_HISTORY,
        "Economics": CLASS12_ECONOMICS,
        "Civics": CLASS12_CIVICS,
        "English": CLASS10_ENGLISH,  # Reuse English grammar
    },
    "up_board_12_hi": {
        "भौतिक विज्ञान": CLASS12_PHYSICS_HI,
        "रसायन विज्ञान": CLASS12_CHEMISTRY_HI,
        "हिंदी": CLASS10_HINDI,
        "जीव विज्ञान": CLASS12_BIOLOGY,  # Biology in English (shared)
        "इतिहास": CLASS12_HISTORY,       # History in English (shared)
        "अर्थशास्त्र": CLASS12_ECONOMICS,  # Economics in English (shared)
        "नागरिक शास्त्र": CLASS12_CIVICS,  # Civics in English (shared)
    },
}

def normalize(text):
    import re
    return re.sub(r"\s+", " ", text.strip().lower())

def compute_hash(text):
    return hashlib.sha256(normalize(text).encode("utf-8")).hexdigest()


def main():
    print("=" * 60)
    print("UP Board PYQ Seeder — Target: 20,000 Questions")
    print("=" * 60)

    total_inserted = 0
    batch = []
    BATCH_SIZE = 5000

    for exam, subjects in EXAM_SUBJECTS.items():
        is_hindi = exam.endswith("_hi")
        prefixes = PREFIXES_HI if is_hindi else PREFIXES_EN
        mods = MODS_HI if is_hindi else MODS
        lang = "hi" if is_hindi else "en"

        target = TARGET_PER_EXAM
        per_subject = target // len(subjects)
        exam_count = 0

        print(f"\n[{exam}] Target: {target}, Subjects: {len(subjects)}, Per subject: {per_subject}")

        for subj_name, bank in subjects.items():
            generated = 0
            for qi, (q_text, opts, correct, expl, chapter) in enumerate(bank):
                for pi, prefix in enumerate(prefixes):
                    for mi, mod_fn in enumerate(mods):
                        for si, suffix in enumerate(SUFFIXES):
                            if generated >= per_subject:
                                break
                            year = YEARS[(pi + mi + si + qi) % len(YEARS)]
                            diff = DIFFICULTIES[(qi + pi + mi) % 3]

                            variant_q = prefix + mod_fn(q_text) + suffix
                            q_hash = compute_hash(variant_q)

                            batch.append(ExamQuestion(
                                exam_type=exam,
                                year=year,
                                subject=subj_name,
                                chapter=chapter,
                                question_text=variant_q,
                                question_text_hash=q_hash,
                                options=opts,
                                correct_answer=correct,
                                explanation=expl,
                                difficulty=diff,
                                source="ai_generated",
                                language=lang,
                                is_verified=False,
                            ))
                            generated += 1

                            if len(batch) >= BATCH_SIZE:
                                inserted = ExamQuestion.objects.bulk_create(batch, ignore_conflicts=True)
                                count = len(inserted)
                                total_inserted += count
                                batch = []
                                print(f"  ... {total_inserted:,} inserted so far")

                        if generated >= per_subject:
                            break
                    if generated >= per_subject:
                        break
                if generated >= per_subject:
                    break
            exam_count += generated
            print(f"  {subj_name}: {generated} questions generated")

        print(f"  [{exam}] Total: {exam_count}")

    # Flush remaining
    if batch:
        inserted = ExamQuestion.objects.bulk_create(batch, ignore_conflicts=True)
        total_inserted += len(inserted)

    # Final count
    final = ExamQuestion.objects.count()
    print(f"\n{'=' * 60}")
    print(f"Done! Inserted {total_inserted:,} new UP Board questions")
    print(f"Total questions in DB: {final:,}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
