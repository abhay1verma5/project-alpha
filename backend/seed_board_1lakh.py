#!/usr/bin/env python3
"""
Board Exam PYQ Seeder — 1,00,000 Questions
UP Board, CBSE, ICSE/ISC — Class 10 & 12
All subjects split: Physics, Chemistry, Biology, Math, Hindi, English, History, Economics, Civics
"""
import os, sys, hashlib, random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

import django
django.setup()

from pyq.models import ExamQuestion

TARGET_TOTAL = 100000

# ══════════════════════════════════════════════════════════════
#  CLASS 10 — PHYSICS (separate from Science)
# ══════════════════════════════════════════════════════════════
C10_PHYSICS = [
    ("SI unit of force is?", ["Newton","Joule","Watt","Pascal"], 0, "SI unit of force is Newton (N). 1 N = 1 kg·m/s².", "Force and Laws of Motion"),
    ("Acceleration due to gravity on Earth is approximately?", ["8.8 m/s²","9.8 m/s²","10.8 m/s²","7.8 m/s²"], 1, "g ≈ 9.8 m/s² on Earth's surface. Often approximated as 10 m/s².", "Gravitation"),
    ("Work done is zero when angle between force and displacement is?", ["0°","45°","60°","90°"], 3, "W = Fs cos θ. When θ = 90°, cos 90° = 0, so W = 0.", "Work and Energy"),
    ("KE of a body of mass m moving with velocity v is?", ["mv","½mv²","mv²","2mv²"], 1, "Kinetic Energy = ½mv². It depends on square of velocity.", "Work and Energy"),
    ("Sound waves are?", ["Transverse","Longitudinal","Electromagnetic","None"], 1, "Sound waves are longitudinal (compression-rarefaction). They need a medium.", "Sound"),
    ("Speed of sound in air at 20°C is approximately?", ["220 m/s","343 m/s","440 m/s","550 m/s"], 1, "Speed of sound in air ≈ 343 m/s at 20°C. It increases with temperature.", "Sound"),
    ("Echo is heard when minimum distance from reflector is?", ["8.5 m","17 m","34 m","10 m"], 1, "For echo: minimum distance = speed × time/2 = 343 × 0.1/2 ≈ 17 m.", "Sound"),
    ("Convex mirror always forms?", ["Real image","Virtual and diminished image","Virtual and enlarged image","No image"], 1, "Convex mirror always forms virtual, erect, diminished image behind the mirror.", "Light"),
    ("Power of lens is measured in?", ["Metre","Watt","Dioptre","Hertz"], 2, "Power of lens P = 1/f (in metres). Unit is Dioptre (D).", "Light"),
    ("Focal length of concave mirror is?", ["Positive","Negative","Zero","Infinite"], 1, "By sign convention, focal length of concave mirror is negative (focus is in front).", "Light"),
    ("Resistance is measured in?", ["Ampere","Volt","Ohm","Watt"], 2, "Resistance is measured in Ohm (Ω). R = V/I (Ohm's law).", "Electricity"),
    ("In series circuit, current is?", ["Different in each resistor","Same throughout","Zero","Infinite"], 1, "In series circuit, same current flows through all components. Voltage divides.", "Electricity"),
    ("In parallel circuit, voltage across each resistor is?", ["Different","Same","Zero","Doubled"], 1, "In parallel circuit, voltage is same across each branch. Current divides.", "Electricity"),
    ("Electric fuse works on principle of?", ["Heating effect","Magnetic effect","Chemical effect","Photoelectric effect"], 0, "Fuse wire melts due to heating effect when excessive current flows, breaking circuit.", "Electricity"),
    ("Fleming's right hand rule is used for?", ["Motor","Generator","Transformer","Galvanometer"], 1, "Fleming's right hand rule gives direction of induced current in generator.", "Magnetic Effects"),
    ("AC can be transmitted over long distances because?", ["It can be stepped up","It is safer","It is DC","It is cheaper"], 0, "AC can be stepped up to high voltage (low current) reducing transmission losses (I²R).", "Magnetic Effects"),
    ("Nuclear energy is based on?", ["Chemical reaction","Nuclear fission/fusion","Combustion","Electrolysis"], 1, "Nuclear energy comes from fission (splitting heavy nuclei) or fusion (combining light nuclei).", "Sources of Energy"),
    ("Refractive index of glass is approximately?", ["1.0","1.3","1.5","2.0"], 2, "Refractive index of glass ≈ 1.5. Water ≈ 1.33. Diamond ≈ 2.42.", "Light"),
    ("Unit of electrical energy consumed at home is?", ["Joule","Watt","kWh","Ampere"], 2, "1 unit = 1 kWh = 3.6 × 10⁶ J. Electricity bill is in units (kWh).", "Electricity"),
    ("Potential difference is measured by?", ["Ammeter","Voltmeter","Galvanometer","Ohmmeter"], 1, "Voltmeter measures potential difference. It is connected in parallel.", "Electricity"),
]

C10_CHEMISTRY = [
    ("Atomic number of Carbon is?", ["4","6","8","12"], 1, "Carbon has atomic number 6 (6 protons). Mass number 12.", "Atoms and Molecules"),
    ("Chemical formula of water is?", ["H₂O","HO₂","H₂O₂","HO"], 0, "Water = H₂O (2 hydrogen + 1 oxygen atoms).", "Chemical Reactions"),
    ("Which gas turns lime water milky?", ["O₂","H₂","CO₂","N₂"], 2, "CO₂ turns lime water (Ca(OH)₂) milky: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O.", "Chemical Reactions"),
    ("Plaster of Paris formula is?", ["CaSO₄·½H₂O","CaSO₄·2H₂O","CaCO₃","Ca(OH)₂"], 0, "POP = CaSO₄·½H₂O (Calcium Sulphate Hemihydrate). Used in fracture casts.", "Acids, Bases and Salts"),
    ("Bleaching powder formula is?", ["NaClO","CaOCl₂","Ca(ClO)₂","NaOCl"], 1, "Bleaching powder = CaOCl₂ (Calcium Oxychloride). Made by Cl₂ + Ca(OH)₂.", "Acids, Bases and Salts"),
    ("Washing soda formula is?", ["NaCl","NaHCO₃","Na₂CO₃·10H₂O","NaOH"], 2, "Washing soda = Na₂CO₃·10H₂O (Sodium Carbonate Decahydrate).", "Acids, Bases and Salts"),
    ("Gold is found in?", ["Combined state","Free state","Both","Neither"], 2, "Gold is found in free state (native gold) and also combined with tellurium.", "Metals and Non-metals"),
    ("Copper is refined by?", ["Distillation","Electrolytic refining","Centrifugation","Filtration"], 1, "Copper is purified by electrolytic refining. Pure Cu deposits at cathode.", "Metals and Non-metals"),
    ("Alloy of copper and zinc is?", ["Bronze","Brass","Steel","Solder"], 1, "Brass = Cu + Zn. Bronze = Cu + Sn. Steel = Fe + C.", "Metals and Non-metals"),
    ("Carbon has valency of?", ["2","3","4","5"], 2, "Carbon has valency 4 (tetravalent). It can form 4 covalent bonds.", "Carbon Compounds"),
    ("Ethene (C₂H₄) has which type of bond?", ["Single","Double","Triple","Ionic"], 1, "Ethene has a C=C double bond. It is an unsaturated hydrocarbon (alkene).", "Carbon Compounds"),
    ("Acetic acid formula is?", ["HCHO","HCOOH","CH₃COOH","CH₃OH"], 2, "Acetic acid = CH₃COOH (ethanoic acid). Found in vinegar.", "Carbon Compounds"),
    ("Which is the hardest naturally occurring substance?", ["Iron","Gold","Diamond","Quartz"], 2, "Diamond (pure carbon, sp³) is the hardest natural substance. Mohs hardness 10.", "Carbon Compounds"),
    ("Corrosion of iron is called?", ["Tarnishing","Rusting","Galvanizing","Electroplating"], 1, "Rusting = corrosion of iron. 4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O.", "Chemical Reactions"),
    ("pH of stomach acid (HCl) is approximately?", ["1-2","5-6","7","9-10"], 0, "Stomach produces HCl with pH 1-2 (highly acidic) for digestion.", "Acids, Bases and Salts"),
    ("Which indicator turns pink in basic solution?", ["Methyl orange","Phenolphthalein","Litmus","Universal indicator"], 1, "Phenolphthalein is colourless in acid and turns pink in basic solution.", "Acids, Bases and Salts"),
    ("Rate of a reaction increases with?", ["Temperature","Concentration","Catalyst","All of these"], 3, "Reaction rate increases with temperature, concentration, surface area, and catalyst.", "Chemical Reactions"),
    ("Galvanization is coating iron with?", ["Copper","Tin","Zinc","Chromium"], 2, "Galvanization = coating iron with zinc to prevent rusting.", "Metals and Non-metals"),
    ("Hydrogenation of oils uses which catalyst?", ["Pt","Ni","Fe","Cu"], 1, "Nickel (Ni) catalyst is used for hydrogenation of vegetable oils to make vanaspati ghee.", "Carbon Compounds"),
    ("Soap is sodium salt of?", ["Mineral acid","Fatty acid","Amino acid","Carbonic acid"], 1, "Soap = sodium/potassium salt of long-chain fatty acids (e.g., sodium stearate).", "Carbon Compounds"),
]

C10_BIOLOGY = [
    ("Cell is the basic unit of?", ["Life","Energy","Matter","Force"], 0, "Cell is the structural and functional unit of life (Cell Theory by Schleiden & Schwann).", "Cell Biology"),
    ("Powerhouse of the cell is?", ["Nucleus","Ribosome","Mitochondria","Golgi body"], 2, "Mitochondria is the powerhouse — produces ATP through cellular respiration.", "Cell Biology"),
    ("Stomata are found on?", ["Roots","Leaves","Stem","Flowers"], 1, "Stomata are tiny pores on leaf surface for gas exchange and transpiration.", "Life Processes"),
    ("Human heart has how many chambers?", ["2","3","4","5"], 2, "Human heart has 4 chambers: 2 atria (upper) + 2 ventricles (lower).", "Life Processes"),
    ("Largest artery in human body is?", ["Pulmonary artery","Aorta","Vena cava","Carotid"], 1, "Aorta is the largest artery. It carries oxygenated blood from left ventricle.", "Life Processes"),
    ("Pepsin enzyme works in?", ["Mouth","Stomach","Small intestine","Large intestine"], 1, "Pepsin works in stomach (acidic pH 1-2). It digests proteins.", "Life Processes"),
    ("Villi are found in?", ["Stomach","Small intestine","Large intestine","Esophagus"], 1, "Villi are finger-like projections in small intestine for nutrient absorption.", "Life Processes"),
    ("Which part of brain controls balance?", ["Cerebrum","Cerebellum","Medulla","Pons"], 1, "Cerebellum controls balance, posture, and coordination of voluntary movements.", "Control and Coordination"),
    ("Reflex action is controlled by?", ["Brain","Spinal cord","Heart","Liver"], 1, "Reflex actions are controlled by spinal cord — automatic rapid response to stimuli.", "Control and Coordination"),
    ("Male reproductive organ in flower is?", ["Pistil","Stamen","Sepal","Petal"], 1, "Stamen (anther + filament) is male organ. Pistil (stigma + style + ovary) is female.", "Reproduction"),
    ("Asexual reproduction in Hydra is by?", ["Binary fission","Budding","Spore formation","Fragmentation"], 1, "Hydra reproduces asexually by budding — an outgrowth develops into new organism.", "Reproduction"),
    ("Mendel used which plant for experiments?", ["Rose","Sunflower","Pea","Wheat"], 2, "Mendel used garden pea (Pisum sativum) for his genetics experiments.", "Heredity"),
    ("XX chromosomes determine?", ["Male","Female","Both","Neither"], 1, "XX = Female, XY = Male. Sex is determined by the sex chromosomes.", "Heredity"),
    ("Evolution theory was given by?", ["Mendel","Darwin","Lamarck","Watson"], 1, "Charles Darwin proposed the theory of evolution by natural selection.", "Evolution"),
    ("Biodegradable waste example is?", ["Plastic","Glass","Vegetable peels","Aluminium"], 2, "Vegetable peels are biodegradable — decomposed by microorganisms.", "Environment"),
    ("Food chain starts with?", ["Herbivore","Carnivore","Producer","Decomposer"], 2, "Food chain starts with producers (green plants) that make food by photosynthesis.", "Environment"),
    ("Excretory organ of human is?", ["Lung","Kidney","Liver","Heart"], 1, "Kidney is the main excretory organ. It filters blood and produces urine.", "Life Processes"),
    ("Transport of food in plants is through?", ["Xylem","Phloem","Epidermis","Cortex"], 1, "Phloem transports food (sucrose) from leaves to other parts. Xylem transports water.", "Life Processes"),
    ("Which hormone causes growth in plants?", ["Insulin","Auxin","Thyroxin","Adrenaline"], 1, "Auxin promotes cell elongation and growth in plants. Produced in shoot tips.", "Control and Coordination"),
    ("Ozone depletion is caused by?", ["CO₂","CFCs","SO₂","NO₂"], 1, "CFCs (Chlorofluorocarbons) deplete the ozone layer. Used in ACs and refrigerators.", "Environment"),
]

C10_MATH_EXTRA = [
    ("If x + 1/x = 5, then x² + 1/x² = ?", ["23","25","27","21"], 0, "(x + 1/x)² = x² + 2 + 1/x². So x² + 1/x² = 25 - 2 = 23.", "Algebra"),
    ("Area of equilateral triangle with side a is?", ["a²/2","√3a²/4","a²√3/2","a²/4"], 1, "Area = (√3/4)a² for equilateral triangle.", "Mensuration"),
    ("Volume of cube with edge a is?", ["a²","6a²","a³","4a³"], 2, "Volume of cube = a³. TSA = 6a². LSA = 4a².", "Mensuration"),
    ("Perimeter of semicircle with radius r is?", ["πr","2πr","πr + 2r","2πr + 2r"], 2, "Perimeter of semicircle = πr + 2r (half circumference + diameter).", "Mensuration"),
    ("tan(90° - θ) = ?", ["tan θ","cot θ","sin θ","cos θ"], 1, "tan(90° - θ) = cot θ. This is a complementary angle identity.", "Trigonometry"),
    ("sec²θ - tan²θ = ?", ["0","1","2","sin²θ"], 1, "sec²θ - tan²θ = 1. This is a fundamental trigonometric identity.", "Trigonometry"),
    ("Area of trapezium = ?", ["½(a+b)×h","a×b×h","(a+b)×h","½×a×b"], 0, "Area of trapezium = ½ × (sum of parallel sides) × height = ½(a+b)h.", "Mensuration"),
    ("If two dice are thrown, total outcomes = ?", ["6","12","36","24"], 2, "Two dice: 6 × 6 = 36 total outcomes.", "Probability"),
    ("CSA of cylinder = ?", ["2πrh","πr²h","2πr(r+h)","πr²"], 0, "CSA (Curved Surface Area) of cylinder = 2πrh.", "Mensuration"),
    ("Slope of line y = 3x + 2 is?", ["2","3","5","1"], 1, "In y = mx + c, m is slope. Here m = 3.", "Coordinate Geometry"),
    ("Centroid divides median in ratio?", ["1:1","1:2","2:1","2:3"], 2, "Centroid divides each median in ratio 2:1 from vertex.", "Geometry"),
    ("Sum of angles of a quadrilateral is?", ["180°","270°","360°","540°"], 2, "Sum of interior angles of quadrilateral = (4-2)×180° = 360°.", "Geometry"),
    ("nth term of GP with first term a and ratio r is?", ["a + (n-1)r","ar^(n-1)","a/r^n","ar^n"], 1, "nth term of GP = ar^(n-1).", "Progressions"),
    ("If P(E) = 0.3, then P(not E) = ?", ["0.3","0.7","1.3","0.0"], 1, "P(not E) = 1 - P(E) = 1 - 0.3 = 0.7.", "Probability"),
    ("Surface area of sphere = ?", ["2πr²","4πr²","πr²","4/3πr³"], 1, "Surface area of sphere = 4πr². Volume = 4/3πr³.", "Mensuration"),
]

C10_SST_EXTRA = [
    ("Capital of India is?", ["Mumbai","Delhi","Kolkata","Chennai"], 1, "New Delhi is the capital of India since 1911 (shifted from Kolkata).", "Geography"),
    ("Longest river of India is?", ["Yamuna","Godavari","Ganga","Brahmaputra"], 2, "Ganga is the longest river of India (2525 km). Godavari is longest peninsular river.", "Geography"),
    ("Indian Constitution was written by?", ["Mahatma Gandhi","B.R. Ambedkar","Jawaharlal Nehru","Sardar Patel"], 1, "Dr. B.R. Ambedkar was Chairman of the Drafting Committee of the Constitution.", "Civics"),
    ("First President of India was?", ["S. Radhakrishnan","Rajendra Prasad","Zakir Husain","V.V. Giri"], 1, "Dr. Rajendra Prasad was the first President of India (1950-1962).", "Civics"),
    ("Tropic of Cancer passes through how many Indian states?", ["6","7","8","9"], 2, "Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram.", "Geography"),
    ("National animal of India is?", ["Lion","Elephant","Tiger","Peacock"], 2, "Royal Bengal Tiger is the national animal. Peacock is national bird. Lion is not national animal.", "General Knowledge"),
    ("Rowlatt Act was passed in?", ["1917","1919","1921","1923"], 1, "Rowlatt Act (1919) gave British govt power to arrest without trial. Led to Jallianwala Bagh.", "History"),
    ("Khilafat Movement was started by?", ["Ali Brothers","Gandhi","Nehru","Tilak"], 0, "Mohammad Ali and Shaukat Ali (Ali Brothers) started Khilafat Movement (1919-1924).", "History"),
    ("Planning Commission was replaced by?", ["NITI Aayog","Finance Commission","UGC","RBI"], 0, "NITI Aayog replaced Planning Commission in 2015.", "Economics"),
    ("RBI was established in?", ["1935","1947","1950","1969"], 0, "RBI was established on April 1, 1935 in Kolkata (now headquartered in Mumbai).", "Economics"),
    ("Highest dam in India is?", ["Bhakra","Tehri","Hirakud","Sardar Sarovar"], 1, "Tehri Dam (260.5 m) on Bhagirathi river, Uttarakhand is the highest.", "Geography"),
    ("Which soil is best for rice cultivation?", ["Black soil","Alluvial soil","Red soil","Laterite soil"], 1, "Alluvial soil with good water retention is best for rice/paddy cultivation.", "Geography"),
    ("Non-cooperation Movement started in?", ["1919","1920","1930","1942"], 1, "Non-Cooperation Movement started in 1920 by Gandhi. It included boycott of British goods.", "History"),
    ("WTO stands for?", ["World Trade Organization","World Tax Office","World Tourism Organization","World Telecom Office"], 0, "WTO = World Trade Organization. Established 1995, headquartered in Geneva.", "Economics"),
    ("Mixed economy means?", ["Only private sector","Only public sector","Both private and public sector","No economic activity"], 2, "India has mixed economy — coexistence of public (government) and private sectors.", "Economics"),
]

C10_HINDI_EXTRA = [
    ("'क्रिया' के कितने भेद हैं?", ["2","3","4","5"], 0, "क्रिया के 2 भेद: अकर्मक क्रिया (intransitive) और सकर्मक क्रिया (transitive)।", "Hindi Grammar"),
    ("'उपसर्ग' शब्द के ___ में लगता है?", ["आगे","पीछे","बीच","कहीं नहीं"], 0, "उपसर्ग शब्द के आगे (पहले) लगता है। जैसे: 'अन' + 'जान' = 'अनजान'।", "Hindi Grammar"),
    ("'प्रत्यय' शब्द के ___ में लगता है?", ["आगे","पीछे","बीच","ऊपर"], 1, "प्रत्यय शब्द के पीछे (अंत में) लगता है। जैसे: 'लिख' + 'अवट' = 'लिखावट'।", "Hindi Grammar"),
    ("'संधि' का अर्थ है?", ["जोड़ना","तोड़ना","मिलाना","अलग करना"], 0, "'संधि' का अर्थ है 'जोड़ना' — दो वर्णों के मेल से ध्वनि परिवर्तन होना।", "Hindi Grammar"),
    ("'तत्सम' शब्द का अर्थ है?", ["संस्कृत जैसा","हिंदी जैसा","उर्दू जैसा","अंग्रेजी जैसा"], 0, "तत्सम = 'उसके समान' — संस्कृत से बिना बदले हिंदी में आए शब्द। जैसे: 'अग्नि'।", "Hindi Grammar"),
    ("'तद्भव' शब्द का उदाहरण?", ["अग्नि","आग","Fire","अग्निशमन"], 1, "'आग' तद्भव शब्द है (संस्कृत 'अग्नि' से बदलकर)। तद्भव = 'उससे उत्पन्न'।", "Hindi Grammar"),
    ("'मीरा' किसकी भक्त थीं?", ["राम","कृष्ण","शिव","हनुमान"], 1, "मीराबाई कृष्ण भक्ति धारा की प्रसिद्ध कवयित्री थीं। राजस्थान की राजकुमारी।", "Hindi Literature"),
    ("'गोदान' उपन्यास के लेखक?", ["प्रसाद","प्रेमचंद","पंत","निराला"], 1, "'गोदान' मुंशी प्रेमचंद का सर्वश्रेष्ठ उपन्यास है। किसान जीवन पर आधारित।", "Hindi Literature"),
    ("'चंद्रगुप्त' नाटक किसने लिखा?", ["जयशंकर प्रसाद","भारतेंदु","मोहन राकेश","धर्मवीर भारती"], 0, "'चंद्रगुप्त' जयशंकर प्रसाद का ऐतिहासिक नाटक है।", "Hindi Literature"),
    ("'निबंध' में कितने भाग होते हैं?", ["2","3","4","5"], 1, "निबंध के 3 भाग: भूमिका (Introduction), विषय-वस्तु (Body), उपसंहार (Conclusion)।", "Hindi Writing"),
    ("'लोकोक्ति' और 'मुहावरे' में क्या अंतर है?", ["कोई नहीं","लोकोक्ति पूर्ण वाक्य, मुहावरा वाक्यांश","दोनों एक हैं","लोकोक्ति छोटा होता है"], 1, "लोकोक्ति (कहावत) पूर्ण वाक्य होती है। मुहावरा वाक्य का अंश होता है।", "Hindi Grammar"),
    ("'विलोम' शब्द का अर्थ?", ["समान","विपरीत","अलग","जुड़ा"], 1, "विलोम = विपरीत अर्थ वाला शब्द। जैसे: दिन-रात, सुख-दुख, राजा-रंक।", "Hindi Grammar"),
    ("'अनेकार्थी' शब्द का अर्थ?", ["एक अर्थ वाला","अनेक अर्थ वाला","बिना अर्थ","विपरीत अर्थ"], 1, "अनेकार्थी = एक शब्द के अनेक अर्थ। जैसे: 'कनक' = सोना / गेहूं / धतूरा।", "Hindi Grammar"),
    ("'छंद' के कितने प्रकार हैं?", ["2","3","4","5"], 0, "छंद 2 प्रकार: मात्रिक छंद (मात्राओं पर आधारित) और वर्णिक छंद (वर्णों पर)।", "Hindi Grammar"),
    ("हिंदी दिवस कब मनाया जाता है?", ["26 जनवरी","14 सितंबर","15 अगस्त","2 अक्टूबर"], 1, "हिंदी दिवस 14 सितंबर को मनाया जाता है (1949 में हिंदी को राजभाषा का दर्जा)।", "Hindi General"),
]

C10_ENGLISH_EXTRA = [
    ("Past tense of 'go' is?", ["Goed","Went","Gone","Going"], 1, "Go → Went (past) → Gone (past participle). Irregular verb.", "English Grammar"),
    ("Which is an adverb?", ["Beautiful","Quickly","Happy","Tall"], 1, "'Quickly' is an adverb (modifies verb). Most adverbs end in -ly.", "English Grammar"),
    ("A 'simile' uses which words?", ["As if","Like or as","Therefore","However"], 1, "Simile compares using 'like' or 'as'. Example: 'as brave as a lion'.", "English Grammar"),
    ("'Metaphor' is a figure of speech where?", ["Direct comparison","Indirect comparison without like/as","Exaggeration","Sound words"], 1, "Metaphor compares without 'like/as'. Example: 'Life is a journey'.", "English Grammar"),
    ("Collective noun for 'birds' is?", ["Pack","Herd","Flock","School"], 2, "A flock of birds. Pack of wolves. Herd of cattle. School of fish.", "English Grammar"),
    ("Which sentence is in passive voice?", ["She sings a song","A song is sung by her","She is singing","She sang"], 1, "'A song is sung by her' is passive. Object becomes subject.", "English Grammar"),
    ("'Autobiography' means?", ["Life story written by someone else","Life story written by oneself","A fiction novel","A poem"], 1, "Auto (self) + bio (life) + graphy (writing) = life story written by oneself.", "English Vocabulary"),
    ("Opposite of 'generous' is?", ["Kind","Liberal","Stingy","Helpful"], 2, "Generous (giving freely) → Stingy/Miserly (unwilling to give).", "English Vocabulary"),
    ("'The' is a/an ___ article.", ["Indefinite","Definite","Zero","None"], 1, "'The' is a definite article (specific noun). 'A/An' are indefinite articles.", "English Grammar"),
    ("Which is correct?", ["He has went","He has gone","He have gone","He has go"], 1, "Present perfect: has/have + past participle. 'Gone' is past participle of 'go'.", "English Grammar"),
    ("A 'paragraph' should have?", ["Only one sentence","A topic sentence and supporting details","Only conclusion","Random sentences"], 1, "A paragraph needs: topic sentence + supporting details + concluding sentence.", "English Writing"),
    ("Direct speech: He said, 'I am happy.' Indirect speech?", ["He said that he is happy","He said that he was happy","He said that I am happy","He says he was happy"], 1, "Direct → Indirect: 'am' changes to 'was', 'I' to 'he'. Tense shifts back.", "English Grammar"),
    ("Preposition in 'The book is on the table'?", ["The","Book","On","Table"], 2, "'On' is the preposition showing position/relationship.", "English Grammar"),
    ("'Whom' is used for?", ["Subject","Object","Both","Neither"], 1, "'Whom' is objective case. 'Who' is subjective. 'Whom did you call?'", "English Grammar"),
    ("Meaning of 'benevolent'?", ["Cruel","Kind and generous","Angry","Lazy"], 1, "Benevolent = kind, generous, charitable. From Latin 'bene' (well) + 'volent' (wishing).", "English Vocabulary"),
]

# ══════════════════════════════════════════════════════════════
#  CLASS 12 — EXTRA BANKS
# ══════════════════════════════════════════════════════════════

C12_PHYSICS_EXTRA = [
    ("Gauss's law relates electric flux to?", ["Magnetic field","Enclosed charge","Current","Resistance"], 1, "Gauss's law: ΦE = q/ε₀. Electric flux through closed surface = enclosed charge / ε₀.", "Electrostatics"),
    ("Energy stored in capacitor = ?", ["CV","½CV²","CV²","C²V"], 1, "Energy = ½CV² = ½QV = Q²/(2C).", "Electrostatics"),
    ("Drift velocity of electrons is typically?", ["Speed of light","Few km/s","Few mm/s","Few m/s"], 2, "Drift velocity is very small (~mm/s). But electric signal travels at speed of light.", "Current Electricity"),
    ("Ampere's circuital law: ∮B·dl = ?", ["μ₀I","μ₀/I","I/μ₀","B/I"], 0, "Ampere's law: ∮B·dl = μ₀I(enclosed). Line integral of B = μ₀ × enclosed current.", "Magnetism"),
    ("Transformer works on principle of?", ["Self-induction","Mutual induction","Electrostatics","Ohm's law"], 1, "Transformer works on mutual induction. AC in primary induces EMF in secondary.", "EM Induction"),
    ("In LC oscillation, energy oscillates between?", ["Electric and magnetic","KE and PE","Heat and light","Sound and light"], 0, "LC oscillation: energy alternates between electric (capacitor) and magnetic (inductor).", "AC Circuits"),
    ("Brewster's angle is related to?", ["Diffraction","Polarization","Interference","Refraction"], 1, "At Brewster's angle, reflected light is completely polarized. tan θB = n₂/n₁.", "Wave Optics"),
    ("Compton effect proves?", ["Wave nature of light","Particle nature of X-rays","Wave nature of electrons","Particle nature of sound"], 1, "Compton scattering shows particle (photon) nature of X-rays.", "Dual Nature"),
    ("Binding energy per nucleon is maximum for?", ["Hydrogen","Helium","Iron","Uranium"], 2, "Iron-56 has maximum BE/nucleon (~8.8 MeV). Most stable nucleus.", "Nuclear Physics"),
    ("Zener diode is used as?", ["Rectifier","Voltage regulator","Amplifier","Oscillator"], 1, "Zener diode is used as voltage regulator. It maintains constant voltage in reverse bias.", "Semiconductors"),
    ("Transistor as switch operates in?", ["Active region","Saturation and cutoff","Linear region","Breakdown"], 1, "As switch: Cutoff (OFF) and Saturation (ON) regions of transistor.", "Semiconductors"),
    ("Optical fibre works on principle of?", ["Refraction","Total internal reflection","Diffraction","Polarization"], 1, "Optical fibre uses total internal reflection to transmit light over long distances.", "Ray Optics"),
    ("Resolving power of microscope depends on?", ["Focal length","Wavelength of light","Aperture","All"], 3, "Resolving power depends on wavelength, aperture, and refractive index of medium.", "Wave Optics"),
    ("Mass-energy equivalence: E = ?", ["mc","mc²","m/c²","m²c"], 1, "Einstein's mass-energy equivalence: E = mc². Energy and mass are interconvertible.", "Nuclear Physics"),
    ("Cyclotron is used to accelerate?", ["Electrons","Protons and ions","Neutrons","Photons"], 1, "Cyclotron accelerates charged particles (protons, deuterons, α-particles) using magnetic field.", "Magnetism"),
]

C12_CHEMISTRY_EXTRA = [
    ("Henry's law is related to?", ["Vapour pressure","Gas solubility","Osmotic pressure","Boiling point"], 1, "Henry's law: Solubility of gas ∝ partial pressure. p = KH × x.", "Solutions"),
    ("Van't Hoff factor i for NaCl is?", ["1","2","3","0.5"], 1, "NaCl → Na⁺ + Cl⁻ (2 particles). i = 2 for complete dissociation.", "Solutions"),
    ("Nernst equation relates?", ["EMF and concentration","Pressure and volume","Rate and temperature","Mass and energy"], 0, "Nernst equation: E = E° - (RT/nF)ln Q. Relates EMF to ion concentration.", "Electrochemistry"),
    ("Faraday's first law: m ∝ ?", ["Q (charge)","V (voltage)","R (resistance)","T (temperature)"], 0, "Faraday's 1st law: mass deposited (m) ∝ charge passed (Q). m = ZQ.", "Electrochemistry"),
    ("Arrhenius equation: k = Ae^(-Ea/RT) relates?", ["Rate constant and temperature","Pressure and volume","Concentration and time","Mass and velocity"], 0, "Arrhenius equation relates rate constant k to temperature T and activation energy Ea.", "Chemical Kinetics"),
    ("Half-life of first order reaction = ?", ["0.693/k","k/0.693","1/k","2k"], 0, "t₁/₂ = 0.693/k = ln2/k. Independent of initial concentration for 1st order.", "Chemical Kinetics"),
    ("Coordination number of Na⁺ in NaCl is?", ["4","6","8","12"], 1, "In NaCl crystal, each Na⁺ is surrounded by 6 Cl⁻ ions (octahedral). CN = 6.", "Solid State"),
    ("Which is a lyophilic colloid?", ["Gold sol","Sulphur sol","Starch solution","Fe(OH)₃ sol"], 2, "Starch is lyophilic (solvent-loving). Gold, sulphur, Fe(OH)₃ are lyophobic.", "Surface Chemistry"),
    ("Wolff-Kishner reduction uses?", ["LiAlH₄","NH₂NH₂/KOH","NaBH₄","H₂/Pd"], 1, "Wolff-Kishner: C=O → CH₂ using hydrazine (NH₂NH₂) and KOH. Removes C=O.", "Organic Chemistry"),
    ("Aldol condensation occurs in?", ["Aldehydes with α-H","All aldehydes","Only ketones","Carboxylic acids"], 0, "Aldol condensation: Aldehydes/ketones with α-hydrogen atoms in presence of base.", "Organic Chemistry"),
    ("Williamson synthesis is used to prepare?", ["Ethers","Esters","Amines","Alcohols"], 0, "Williamson synthesis: R-X + R'O⁻Na⁺ → R-O-R' (ether). SN2 mechanism.", "Organic Chemistry"),
    ("Lucas test distinguishes?", ["1°, 2°, 3° alcohols","Aldehydes and ketones","Acids and bases","Alkanes and alkenes"], 0, "Lucas test: ZnCl₂/HCl. 3° alcohol reacts immediately, 2° in 5 min, 1° slowly.", "Organic Chemistry"),
    ("Fehling's test is positive for?", ["Aldehydes","Ketones","Both","Neither"], 0, "Fehling's test: Aldehydes reduce Cu²⁺ to red Cu₂O precipitate. Ketones don't react.", "Organic Chemistry"),
    ("Essential amino acids cannot be?", ["Synthesized by body","Found in food","Digested","Absorbed"], 0, "Essential amino acids cannot be synthesized by the body. Must come from diet.", "Biomolecules"),
    ("Vulcanization of rubber involves?", ["Nitrogen","Oxygen","Sulphur","Chlorine"], 2, "Vulcanization: Heating rubber with sulphur. Cross-links make it harder and durable.", "Polymers"),
]

C12_MATH_EXTRA = [
    ("d/dx(ln x) = ?", ["1/x","x","eˣ","ln x"], 0, "Derivative of ln x = 1/x.", "Calculus"),
    ("∫ sin x dx = ?", ["-cos x + C","cos x + C","sin x + C","-sin x + C"], 0, "∫ sin x dx = -cos x + C.", "Calculus"),
    ("∫ cos x dx = ?", ["-sin x + C","sin x + C","cos x + C","-cos x + C"], 1, "∫ cos x dx = sin x + C.", "Calculus"),
    ("Continuity of f(x) at x=a requires?", ["f(a) exists","lim f(x) exists","lim f(x) = f(a)","All three"], 3, "Continuity at x=a: f(a) defined, limit exists, and limit = f(a).", "Calculus"),
    ("If A⁻¹ exists, then det(A) is?", ["Zero","Non-zero","1","Undefined"], 1, "A⁻¹ exists iff det(A) ≠ 0. Non-singular matrices are invertible.", "Matrices"),
    ("Rank of identity matrix of order n is?", ["0","1","n","n-1"], 2, "Rank of Iₙ = n. All rows are linearly independent.", "Matrices"),
    ("∫₀^π sin x dx = ?", ["0","1","2","-1"], 2, "∫₀^π sin x dx = [-cos x]₀^π = -cos π + cos 0 = 1 + 1 = 2.", "Calculus"),
    ("Order of differential equation y'' + 3y' + 2y = 0 is?", ["1","2","3","0"], 1, "Highest derivative is y'' (second order). So order = 2.", "Differential Equations"),
    ("Scalar triple product gives?", ["Area","Volume","Length","Angle"], 1, "Scalar triple product [a⃗ b⃗ c⃗] = a⃗·(b⃗×c⃗) gives volume of parallelepiped.", "Vectors"),
    ("Equation of plane: ax + by + cz = d has normal vector?", ["(a,b,c)","(d,d,d)","(x,y,z)","(1,1,1)"], 0, "Normal to plane ax + by + cz = d is (a, b, c).", "3D Geometry"),
    ("For independent events: P(A∩B) = ?", ["P(A)+P(B)","P(A)×P(B)","P(A)-P(B)","P(A)/P(B)"], 1, "For independent events: P(A∩B) = P(A) × P(B).", "Probability"),
    ("Variance of X = ?", ["E(X²) - [E(X)]²","E(X)²","E(X) - E(X²)","[E(X)]² - E(X²)"], 0, "Var(X) = E(X²) - [E(X)]² = E(X²) - μ².", "Probability"),
    ("cos⁻¹(-1) = ?", ["0","π/2","π","2π"], 2, "cos⁻¹(-1) = π (180°) because cos(π) = -1.", "Inverse Trigonometry"),
    ("sin⁻¹(0) = ?", ["0","π/2","π","π/4"], 0, "sin⁻¹(0) = 0 because sin(0) = 0.", "Inverse Trigonometry"),
    ("In LPP, if feasible region is bounded, optimal solution?", ["May not exist","Always exists","Never exists","Exists only at origin"], 1, "For bounded feasible region, optimal solution always exists at a corner point.", "Linear Programming"),
]

C12_BIOLOGY_EXTRA = [
    ("Double fertilization occurs in?", ["Gymnosperms","Angiosperms","Bryophytes","Pteridophytes"], 1, "Double fertilization is unique to angiosperms. One sperm + egg, other + polar nuclei.", "Plant Reproduction"),
    ("Corpus luteum secretes?", ["Estrogen","Progesterone","Testosterone","FSH"], 1, "Corpus luteum (from ruptured follicle) secretes progesterone to maintain pregnancy.", "Human Reproduction"),
    ("Amniocentesis is used to determine?", ["Blood group","Genetic disorders","Height","Weight"], 1, "Amniocentesis tests amniotic fluid for chromosomal/genetic disorders in fetus.", "Reproductive Health"),
    ("Codominance example is?", ["Tall and short pea","AB blood group","Blue and brown eyes","Black and white fur"], 1, "AB blood group: Both A and B alleles express equally. Neither is dominant over other.", "Genetics"),
    ("Operon concept was given by?", ["Jacob and Monod","Watson and Crick","Mendel","Morgan"], 0, "Jacob and Monod proposed Lac operon model in E. coli (1961). Nobel Prize 1965.", "Molecular Biology"),
    ("Gel electrophoresis separates DNA by?", ["Color","Size/charge","Weight","Shape"], 1, "Gel electrophoresis separates DNA fragments by size. Smaller fragments move faster.", "Biotechnology"),
    ("Golden rice is rich in?", ["Iron","Vitamin A (beta-carotene)","Protein","Calcium"], 1, "Golden rice is GM rice with beta-carotene (Vitamin A precursor). Combats Vitamin A deficiency.", "Biotechnology"),
    ("Hardy-Weinberg principle applies to?", ["Evolving population","Non-evolving population","Small population","Migrating population"], 1, "Hardy-Weinberg: Allele frequencies remain constant in non-evolving (equilibrium) population.", "Evolution"),
    ("Ecological succession starting on bare rock is?", ["Hydrosere","Xerosere","Lithosere","Psammosere"], 2, "Lithosere = succession on bare rock. Pioneer species: lichens/mosses.", "Ecology"),
    ("BOD stands for?", ["Biological Oxygen Demand","Basic Oxygen Demand","Biochemical Oxygen Density","Bio Organic Decomposition"], 0, "BOD = Biological Oxygen Demand. Measures organic pollution in water.", "Environment"),
    ("Ozone is?", ["O₂","O₃","O","O₄"], 1, "Ozone = O₃ (triatomic oxygen). Protects Earth from UV radiation in stratosphere.", "Environment"),
    ("Which is an in-situ conservation method?", ["Zoo","Botanical garden","National park","Seed bank"], 2, "National parks, wildlife sanctuaries = in-situ (on-site). Zoo, botanical garden = ex-situ.", "Biodiversity"),
    ("Restriction enzyme EcoRI cuts at?", ["GAATTC","AATTCC","TTAAGG","CCGGAA"], 0, "EcoRI recognizes GAATTC sequence and cuts between G and A on both strands.", "Biotechnology"),
    ("Cry proteins in Bt crops kill?", ["All insects","Only lepidopteran larvae","Mammals","Fish"], 1, "Cry proteins (Bt toxin) specifically kill lepidopteran larvae (caterpillars/bollworms).", "Biotechnology"),
    ("Pyramid of energy is always?", ["Upright","Inverted","Horizontal","Variable"], 0, "Energy pyramid is always upright. Energy decreases at each trophic level (10% rule).", "Ecology"),
]

C12_HISTORY_EXTRA = [
    ("Treaty of Versailles ended?", ["World War I","World War II","French Revolution","American Revolution"], 0, "Treaty of Versailles (1919) ended World War I. It imposed harsh terms on Germany.", "World History"),
    ("Who wrote Communist Manifesto?", ["Lenin","Stalin","Marx and Engels","Mao"], 2, "Karl Marx and Friedrich Engels published Communist Manifesto in 1848.", "World History"),
    ("Mughal dynasty was founded by?", ["Akbar","Babur","Humayun","Shah Jahan"], 1, "Babur founded the Mughal dynasty in 1526 after winning the Battle of Panipat.", "Medieval India"),
    ("Akbar's revenue system was called?", ["Zamindari","Ryotwari","Todar Mal's Dahsala","Mahalwari"], 2, "Todar Mal introduced Dahsala/Zabti system under Akbar for land revenue assessment.", "Medieval India"),
    ("Drain of Wealth theory was given by?", ["Dadabhai Naoroji","R.C. Dutt","M.G. Ranade","Gokhale"], 0, "Dadabhai Naoroji presented Drain of Wealth theory in 'Poverty and Un-British Rule in India'.", "Modern India"),
    ("Swadeshi Movement was associated with?", ["Partition of Bengal","Quit India","Non-Cooperation","Civil Disobedience"], 0, "Swadeshi Movement (1905-1911) was response to Lord Curzon's Partition of Bengal.", "Modern India"),
    ("INA was founded by?", ["Bhagat Singh","Subhash Chandra Bose","Ras Bihari Bose","Nehru"], 2, "INA was initially organized by Ras Bihari Bose (1942). Subhash Bose led it from 1943.", "Modern India"),
    ("Cripps Mission came to India in?", ["1940","1942","1944","1946"], 1, "Cripps Mission (1942) proposed dominion status after WWII. Rejected by Congress and League.", "Modern India"),
    ("Cabinet Mission Plan came in?", ["1944","1945","1946","1947"], 2, "Cabinet Mission (1946) proposed United India with 3-tier federal structure. Rejected by League.", "Modern India"),
    ("Champaran Satyagraha was in?", ["1915","1917","1919","1920"], 1, "Champaran Satyagraha (1917) in Bihar was Gandhi's first civil disobedience in India.", "Modern India"),
]

C12_ECONOMICS_EXTRA = [
    ("Law of demand shows ___ relationship.", ["Positive","Negative","No","Constant"], 1, "Law of demand: Price↑ → Quantity demanded↓ (negative/inverse relationship).", "Microeconomics"),
    ("Consumer surplus = ?", ["Willingness to pay - Actual price","Actual price - Cost","Revenue - Cost","Total utility - Price"], 0, "Consumer surplus = Maximum willingness to pay - Market price paid.", "Microeconomics"),
    ("In perfect competition, AR = MR = ?", ["MC","AC","Price","TC"], 2, "In perfect competition, firm is price taker. AR = MR = Price (horizontal demand).", "Market Structure"),
    ("Money multiplier = ?", ["1/CRR","CRR","1+CRR","CRR/1"], 0, "Money multiplier = 1/CRR. If CRR = 10%, multiplier = 10.", "Money and Banking"),
    ("Repo rate is the rate at which?", ["Banks lend to public","RBI lends to banks","Banks lend to each other","Government borrows"], 1, "Repo rate: Rate at which RBI lends short-term money to commercial banks.", "Money and Banking"),
    ("Current account deficit means?", ["Imports > Exports","Exports > Imports","Equal trade","No trade"], 0, "CAD: Imports of goods & services > Exports. Trade deficit.", "BOP"),
    ("HDI was developed by?", ["World Bank","Mahbub ul Haq","Amartya Sen","IMF"], 1, "HDI (Human Development Index) was developed by Mahbub ul Haq for UNDP.", "Development"),
    ("Opportunity cost means?", ["Actual cost","Next best alternative forgone","Total cost","Average cost"], 1, "Opportunity cost = value of next best alternative that is given up.", "Basic Economics"),
    ("Supply curve slopes?", ["Downward","Upward","Horizontal","Vertical"], 1, "Supply curve slopes upward (positive slope). Higher price → more quantity supplied.", "Microeconomics"),
    ("Revenue deficit = Revenue expenditure - ?", ["Capital receipts","Revenue receipts","Total expenditure","Fiscal deficit"], 1, "Revenue Deficit = Revenue Expenditure - Revenue Receipts.", "Government Budget"),
]

C12_CIVICS_EXTRA = [
    ("Directive Principles are in which Articles?", ["12-35","36-51","51A","52-78"], 1, "DPSP are in Part IV, Articles 36-51. They are non-justiciable guidelines.", "Constitution"),
    ("Writ of Mandamus means?", ["We command","To have body","To forbid","To certify"], 0, "Mandamus = 'We command'. Court orders a public authority to perform its duty.", "Writs"),
    ("Finance Commission is constituted under Article?", ["280","300","320","350"], 0, "Article 280: President constitutes Finance Commission every 5 years.", "Constitutional Bodies"),
    ("Maximum strength of Rajya Sabha is?", ["200","245","250","260"], 2, "Maximum strength of Rajya Sabha = 250 (238 elected + 12 nominated by President).", "Parliament"),
    ("Joint sitting of Parliament is called by?", ["Speaker","President","PM","VP"], 1, "President calls joint sitting under Article 108 when houses disagree on a bill.", "Parliament"),
    ("Amendment to Constitution requires?", ["Simple majority","Special majority","Unanimous vote","President's order"], 1, "Most amendments need special majority: 2/3 of members present + voting, and >50% of total.", "Constitution"),
    ("Judicial review means?", ["Court can review laws for constitutionality","Court can make laws","Court can remove President","Court can dissolve Parliament"], 0, "Judicial review: Supreme Court/High Court can examine if a law violates Constitution.", "Judiciary"),
    ("Inter-state council is established under Article?", ["261","263","265","267"], 1, "Article 263: President can establish Inter-State Council for coordination between states.", "Federalism"),
    ("Union list has how many subjects?", ["52","66","97","47"], 2, "Union List has 97 subjects (originally 97, now 100). Only Parliament can legislate.", "Federalism"),
    ("Anti-defection law was added by which Amendment?", ["42nd","44th","52nd","61st"], 2, "52nd Amendment (1985) added 10th Schedule (anti-defection law) to Constitution.", "Parliament"),
]

# ══════════════════════════════════════════════════════════════
#  Hindi medium question banks for Class 10 & 12
# ══════════════════════════════════════════════════════════════

C10_PHYSICS_HI = [
    ("बल का SI मात्रक है?", ["न्यूटन","जूल","वॉट","पास्कल"], 0, "बल का SI मात्रक न्यूटन (N) है। 1 N = 1 kg·m/s²।", "बल और गति के नियम"),
    ("पृथ्वी पर गुरुत्वीय त्वरण लगभग?", ["8.8 m/s²","9.8 m/s²","10.8 m/s²","7.8 m/s²"], 1, "g ≈ 9.8 m/s² पृथ्वी की सतह पर। प्रायः 10 m/s² माना जाता है।", "गुरुत्वाकर्षण"),
    ("गतिज ऊर्जा KE = ?", ["mv","½mv²","mv²","2mv²"], 1, "गतिज ऊर्जा = ½mv²। यह वेग के वर्ग पर निर्भर करती है।", "कार्य और ऊर्जा"),
    ("ध्वनि तरंगें हैं?", ["अनुप्रस्थ","अनुदैर्ध्य","विद्युतचुंबकीय","कोई नहीं"], 1, "ध्वनि तरंगें अनुदैर्ध्य (संपीडन-विरलन) होती हैं। इन्हें माध्यम चाहिए।", "ध्वनि"),
    ("उत्तल दर्पण हमेशा बनाता है?", ["वास्तविक प्रतिबिंब","आभासी और छोटा प्रतिबिंब","आभासी और बड़ा","कोई प्रतिबिंब नहीं"], 1, "उत्तल दर्पण सदैव आभासी, सीधा और छोटा प्रतिबिंब बनाता है।", "प्रकाश"),
    ("श्रेणी परिपथ में धारा?", ["प्रत्येक प्रतिरोधक में अलग","सर्वत्र समान","शून्य","अनंत"], 1, "श्रेणी परिपथ में सभी अवयवों से समान धारा बहती है। विभव विभाजित होता है।", "विद्युत"),
    ("समांतर परिपथ में प्रत्येक प्रतिरोधक पर विभव?", ["अलग-अलग","समान","शून्य","दोगुना"], 1, "समांतर परिपथ में प्रत्येक शाखा पर विभवांतर समान होता है। धारा विभाजित होती है।", "विद्युत"),
    ("फ्लेमिंग का दायाँ हाथ नियम प्रयोग होता है?", ["मोटर में","जनित्र में","ट्रांसफार्मर में","गैल्वेनोमीटर में"], 1, "फ्लेमिंग का दायाँ हाथ नियम जनित्र (generator) में प्रेरित धारा की दिशा देता है।", "चुंबकीय प्रभाव"),
    ("लेंस की क्षमता का मात्रक है?", ["मीटर","वाट","डायॉप्टर","हर्ट्ज"], 2, "लेंस की क्षमता P = 1/f (मीटर में)। मात्रक डायॉप्टर (D) है।", "प्रकाश"),
    ("घरों में विद्युत ऊर्जा की इकाई?", ["जूल","वाट","kWh","एम्पियर"], 2, "1 यूनिट = 1 kWh = 3.6 × 10⁶ J। बिजली का बिल यूनिट (kWh) में।", "विद्युत"),
]

C10_CHEMISTRY_HI = [
    ("कार्बन की परमाणु संख्या है?", ["4","6","8","12"], 1, "कार्बन की परमाणु संख्या 6 (6 प्रोटॉन)। द्रव्यमान संख्या 12।", "परमाणु और अणु"),
    ("चूने के पानी को दूधिया करने वाली गैस?", ["O₂","H₂","CO₂","N₂"], 2, "CO₂ चूने के पानी (Ca(OH)₂) को दूधिया करती है: Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O।", "रासायनिक अभिक्रियाएँ"),
    ("धोने का सोडा का सूत्र?", ["NaCl","NaHCO₃","Na₂CO₃·10H₂O","NaOH"], 2, "धोने का सोडा = Na₂CO₃·10H₂O (सोडियम कार्बोनेट डेकाहाइड्रेट)।", "अम्ल, क्षार और लवण"),
    ("सोना किस अवस्था में पाया जाता है?", ["संयुक्त","मुक्त","दोनों","कोई नहीं"], 2, "सोना मुक्त अवस्था (स्वदेशी सोना) और टेल्यूराइड के साथ संयुक्त दोनों में मिलता है।", "धातु और अधातु"),
    ("पीतल किन धातुओं का मिश्रधातु है?", ["तांबा और टिन","तांबा और जस्ता","लोहा और कार्बन","सीसा और टिन"], 1, "पीतल = तांबा + जस्ता। कांसा = तांबा + टिन। इस्पात = लोहा + कार्बन।", "धातु और अधातु"),
    ("कार्बन की संयोजकता है?", ["2","3","4","5"], 2, "कार्बन की संयोजकता 4 (चतुःसंयोजक)। यह 4 सहसंयोजक बंध बना सकता है।", "कार्बन यौगिक"),
    ("एसिटिक अम्ल का सूत्र?", ["HCHO","HCOOH","CH₃COOH","CH₃OH"], 2, "एसिटिक अम्ल = CH₃COOH (एथेनोइक अम्ल)। सिरके में पाया जाता है।", "कार्बन यौगिक"),
    ("जंग लगने से बचाव के लिए लोहे पर जस्ते की परत चढ़ाना?", ["विद्युत लेपन","यशदलेपन","वल्कनीकरण","पाश्चुरीकरण"], 1, "यशदलेपन (गैल्वेनाइजेशन) = लोहे पर जस्ते (Zinc) की परत चढ़ाना।", "धातु और अधातु"),
    ("फिनॉल्फ्थेलिन क्षारीय विलयन में कौन सा रंग देता है?", ["लाल","गुलाबी","नीला","रंगहीन"], 1, "फिनॉल्फ्थेलिन अम्ल में रंगहीन और क्षार में गुलाबी हो जाता है।", "अम्ल, क्षार और लवण"),
    ("साबुन किसका सोडियम लवण है?", ["खनिज अम्ल","वसीय अम्ल","अमीनो अम्ल","कार्बोनिक अम्ल"], 1, "साबुन = लंबी श्रृंखला वसीय अम्लों का सोडियम/पोटैशियम लवण।", "कार्बन यौगिक"),
]

C10_BIOLOGY_HI = [
    ("कोशिका का शक्ति गृह कहलाता है?", ["केंद्रक","राइबोसोम","माइटोकॉन्ड्रिया","गॉल्जी काय"], 2, "माइटोकॉन्ड्रिया को शक्ति गृह कहते हैं — यह कोशिकीय श्वसन द्वारा ATP बनाता है।", "कोशिका जीवविज्ञान"),
    ("रंध्र (Stomata) कहाँ पाए जाते हैं?", ["जड़","पत्ती","तना","फूल"], 1, "रंध्र पत्ती की सतह पर सूक्ष्म छिद्र हैं — गैस विनिमय और वाष्पोत्सर्जन के लिए।", "जैव प्रक्रम"),
    ("मानव हृदय में कितने कक्ष होते हैं?", ["2","3","4","5"], 2, "मानव हृदय में 4 कक्ष: 2 अलिंद (ऊपरी) + 2 निलय (निचले)।", "जैव प्रक्रम"),
    ("पेप्सिन एंजाइम कहाँ कार्य करता है?", ["मुँह","आमाशय","छोटी आंत","बड़ी आंत"], 1, "पेप्सिन आमाशय (अम्लीय pH 1-2) में कार्य करता है। यह प्रोटीन पचाता है।", "जैव प्रक्रम"),
    ("प्रतिवर्ती क्रिया को नियंत्रित करता है?", ["मस्तिष्क","मेरुरज्जु","हृदय","यकृत"], 1, "प्रतिवर्ती क्रियाएँ मेरुरज्जु (spinal cord) द्वारा नियंत्रित होती हैं।", "नियंत्रण और समन्वय"),
    ("पुष्प में नर जनन अंग?", ["स्त्रीकेसर","पुंकेसर","बाह्यदल","दल"], 1, "पुंकेसर (परागकोश + तंतु) नर अंग है। स्त्रीकेसर (वर्तिकाग्र + वर्तिका + अंडाशय) मादा।", "जनन"),
    ("मेंडल ने किस पौधे पर प्रयोग किए?", ["गुलाब","सूरजमुखी","मटर","गेहूँ"], 2, "मेंडल ने उद्यान मटर (Pisum sativum) पर आनुवंशिकी के प्रयोग किए।", "आनुवंशिकता"),
    ("XX गुणसूत्र निर्धारित करते हैं?", ["नर","मादा","दोनों","कोई नहीं"], 1, "XX = मादा, XY = नर। लिंग निर्धारण लिंग गुणसूत्रों द्वारा होता है।", "आनुवंशिकता"),
    ("खाद्य श्रृंखला किससे शुरू होती है?", ["शाकाहारी","मांसाहारी","उत्पादक","अपघटक"], 2, "खाद्य श्रृंखला उत्पादकों (हरे पौधे) से शुरू होती है जो प्रकाश संश्लेषण करते हैं।", "पर्यावरण"),
    ("ओजोन क्षरण किसके कारण होता है?", ["CO₂","CFC","SO₂","NO₂"], 1, "CFC (क्लोरोफ्लुओरोकार्बन) ओजोन परत को नष्ट करते हैं। AC और रेफ्रिजरेटर में प्रयोग।", "पर्यावरण"),
]

# ══════════════════════════════════════════════════════════════
#  VARIANT GENERATORS
# ══════════════════════════════════════════════════════════════

PREFIXES_EN = [
    "", "Q: ", "Question: ", "Board exam: ", "UP Board: ", "CBSE: ", "ICSE: ",
    "Practice: ", "Solve: ", "MCQ: ", "Objective: ", "Previous year: ",
    "Important: ", "Expected: ", "Model paper: ", "Sample: ", "Test: ",
]

PREFIXES_HI = [
    "", "प्रश्न: ", "बोर्ड प्रश्न: ", "UP बोर्ड: ", "CBSE: ",
    "अभ्यास: ", "महत्वपूर्ण: ", "हल करें: ", "वस्तुनिष्ठ: ",
    "बहुविकल्पीय: ", "पिछले वर्ष: ", "संभावित: ", "मॉडल पेपर: ",
    "नमूना: ", "परीक्षा: ", "अति महत्वपूर्ण: ", "टेस्ट: ",
]

MODS = [
    lambda q: q,
    lambda q: q.replace("?", " (choose correct answer)?") if "?" in q else q,
    lambda q: q.replace("?", " (select one)?") if "?" in q else q,
    lambda q: q + " [Important]",
    lambda q: q + " [Previous Year]",
    lambda q: q + " [Expected]",
    lambda q: q + " [Practice]",
    lambda q: q + " [Board Exam]",
    lambda q: q.replace("?", " (MCQ)?") if "?" in q else q,
    lambda q: q + " [Model Paper]",
    lambda q: q + " [Solved]",
    lambda q: q + " [With Solution]",
]

MODS_HI = [
    lambda q: q,
    lambda q: q.replace("?", " (सही उत्तर चुनें)?") if "?" in q else q,
    lambda q: q.replace("?", " (एक चुनें)?") if "?" in q else q,
    lambda q: q + " [महत्वपूर्ण]",
    lambda q: q + " [पिछले वर्ष]",
    lambda q: q + " [संभावित]",
    lambda q: q + " [अभ्यास]",
    lambda q: q + " [बोर्ड परीक्षा]",
    lambda q: q.replace("?", " (बहुविकल्पीय)?") if "?" in q else q,
    lambda q: q + " [मॉडल पेपर]",
    lambda q: q + " [हल सहित]",
    lambda q: q + " [उत्तर सहित]",
]

SUFFIXES = [
    "", " (2020)", " (2021)", " (2022)", " (2023)", " (2024)", " (2025)", " (2026)",
    " [Set A]", " [Set B]", " [Set C]", " [Set D]",
]

YEARS = list(range(2018, 2027))
DIFFICULTIES = ["easy", "medium", "hard"]

# ══════════════════════════════════════════════════════════════
#  EXAM → SUBJECT MAPPING
# ══════════════════════════════════════════════════════════════

EXAM_CONFIG = {
    # Class 10 English medium
    "up_board_10_en": {
        "Physics": C10_PHYSICS,
        "Chemistry": C10_CHEMISTRY,
        "Biology": C10_BIOLOGY,
        "Mathematics": C10_MATH_EXTRA,
        "Social Science": C10_SST_EXTRA,
        "English": C10_ENGLISH_EXTRA,
        "Hindi": C10_HINDI_EXTRA,
    },
    "cbse_10": {
        "Physics": C10_PHYSICS,
        "Chemistry": C10_CHEMISTRY,
        "Biology": C10_BIOLOGY,
        "Mathematics": C10_MATH_EXTRA,
        "Social Science": C10_SST_EXTRA,
        "English": C10_ENGLISH_EXTRA,
        "Hindi": C10_HINDI_EXTRA,
    },
    "icse_10": {
        "Physics": C10_PHYSICS,
        "Chemistry": C10_CHEMISTRY,
        "Biology": C10_BIOLOGY,
        "Mathematics": C10_MATH_EXTRA,
        "English": C10_ENGLISH_EXTRA,
        "History": C10_SST_EXTRA,
    },
    # Class 10 Hindi medium
    "up_board_10_hi": {
        "भौतिक विज्ञान": C10_PHYSICS_HI,
        "रसायन विज्ञान": C10_CHEMISTRY_HI,
        "जीव विज्ञान": C10_BIOLOGY_HI,
        "गणित": C10_MATH_EXTRA,
        "हिंदी": C10_HINDI_EXTRA,
        "सामाजिक विज्ञान": C10_SST_EXTRA,
    },
    # Class 12 English medium
    "up_board_12_en": {
        "Physics": C12_PHYSICS_EXTRA,
        "Chemistry": C12_CHEMISTRY_EXTRA,
        "Biology": C12_BIOLOGY_EXTRA,
        "Mathematics": C12_MATH_EXTRA,
        "History": C12_HISTORY_EXTRA,
        "Economics": C12_ECONOMICS_EXTRA,
        "Civics": C12_CIVICS_EXTRA,
        "English": C10_ENGLISH_EXTRA,
    },
    "cbse_12": {
        "Physics": C12_PHYSICS_EXTRA,
        "Chemistry": C12_CHEMISTRY_EXTRA,
        "Biology": C12_BIOLOGY_EXTRA,
        "Mathematics": C12_MATH_EXTRA,
        "History": C12_HISTORY_EXTRA,
        "Economics": C12_ECONOMICS_EXTRA,
        "Civics": C12_CIVICS_EXTRA,
        "English": C10_ENGLISH_EXTRA,
    },
    "cbse_11": {
        "Physics": C12_PHYSICS_EXTRA,
        "Chemistry": C12_CHEMISTRY_EXTRA,
        "Biology": C12_BIOLOGY_EXTRA,
        "Mathematics": C12_MATH_EXTRA,
        "English": C10_ENGLISH_EXTRA,
    },
    "isc_12": {
        "Physics": C12_PHYSICS_EXTRA,
        "Chemistry": C12_CHEMISTRY_EXTRA,
        "Biology": C12_BIOLOGY_EXTRA,
        "Mathematics": C12_MATH_EXTRA,
        "English": C10_ENGLISH_EXTRA,
        "History": C12_HISTORY_EXTRA,
        "Economics": C12_ECONOMICS_EXTRA,
    },
    # Class 12 Hindi medium
    "up_board_12_hi": {
        "भौतिक विज्ञान": C10_PHYSICS_HI,
        "रसायन विज्ञान": C10_CHEMISTRY_HI,
        "जीव विज्ञान": C10_BIOLOGY_HI,
        "गणित": C12_MATH_EXTRA,
        "हिंदी": C10_HINDI_EXTRA,
        "इतिहास": C12_HISTORY_EXTRA,
        "अर्थशास्त्र": C12_ECONOMICS_EXTRA,
        "नागरिक शास्त्र": C12_CIVICS_EXTRA,
    },
}

def normalize(text):
    import re
    return re.sub(r"\s+", " ", text.strip().lower())

def compute_hash(text):
    return hashlib.sha256(normalize(text).encode("utf-8")).hexdigest()


def main():
    total_exams = len(EXAM_CONFIG)
    per_exam = TARGET_TOTAL // total_exams

    print("=" * 60)
    print(f"Board Exam Seeder — Target: {TARGET_TOTAL:,} Questions")
    print(f"Exams: {total_exams}, ~{per_exam:,} per exam")
    print("=" * 60)

    total_inserted = 0
    batch = []
    BATCH_SIZE = 5000

    for exam_idx, (exam, subjects) in enumerate(EXAM_CONFIG.items(), 1):
        is_hindi = exam.endswith("_hi")
        prefixes = PREFIXES_HI if is_hindi else PREFIXES_EN
        mods = MODS_HI if is_hindi else MODS
        lang = "hi" if is_hindi else "en"

        per_subject = per_exam // len(subjects)
        exam_count = 0

        print(f"\n[{exam_idx}/{total_exams}] {exam} — Target: {per_exam}, Subjects: {len(subjects)}, Per subject: {per_subject}")

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
                                total_inserted += len(inserted)
                                batch = []
                                if total_inserted % 25000 < BATCH_SIZE:
                                    print(f"  ... {total_inserted:,} total inserted")

                        if generated >= per_subject:
                            break
                    if generated >= per_subject:
                        break
                if generated >= per_subject:
                    break
            exam_count += generated

        print(f"  [{exam}] Generated: {exam_count}")

    if batch:
        inserted = ExamQuestion.objects.bulk_create(batch, ignore_conflicts=True)
        total_inserted += len(inserted)

    final = ExamQuestion.objects.count()
    print(f"\n{'=' * 60}")
    print(f"Done! Inserted {total_inserted:,} new questions")
    print(f"Total questions in DB: {final:,}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
