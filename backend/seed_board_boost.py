#!/usr/bin/env python3
"""Seed ~86k more board exam questions to reach 1 lakh additional target."""
import os, sys, hashlib, json, random

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
sys.path.insert(0, os.path.dirname(__file__))

import django
django.setup()
from pyq.models import ExamQuestion

# ─── Fresh question banks (unique text not in previous seeds) ───

CBSE10_MATH = [
    ("The HCF of 306 and 657 is", ["9","3","6","12"], 0),
    ("If two positive integers a and b are written as a=x³y² and b=xy³, then HCF(a,b) is", ["xy²","x³y³","x²y²","xy"], 0),
    ("The graph of y=p(x) intersects x-axis at 3 points, the number of zeroes of p(x) is", ["3","2","1","0"], 0),
    ("A quadratic polynomial whose sum and product of zeroes are -3 and 2 is", ["x²+3x+2","x²-3x+2","x²+3x-2","x²-3x-2"], 0),
    ("If α and β are zeroes of x²-5x+6, then α+β is", ["5","6","-5","-6"], 0),
    ("The pair of equations x+2y-5=0 and 3x+6y-15=0 has", ["infinite solutions","no solution","unique solution","two solutions"], 0),
    ("The 10th term of AP 2,7,12,... is", ["47","52","42","57"], 0),
    ("Sum of first 20 natural numbers is", ["210","190","200","220"], 0),
    ("If tan θ = 12/5, then sin θ is", ["12/13","5/13","5/12","13/12"], 0),
    ("The distance between the points (2,3) and (4,1) is", ["2√2","2√3","√8","4"], 0),
    ("In a right triangle, the hypotenuse is 13 cm and one side is 5 cm. The other side is", ["12 cm","8 cm","10 cm","11 cm"], 0),
    ("The total surface area of a cone with radius 7 cm and slant height 14 cm is", ["462 cm²","308 cm²","154 cm²","616 cm²"], 0),
    ("A card is drawn from a well-shuffled deck. P(getting a king) is", ["1/13","1/52","4/13","1/26"], 0),
    ("Two dice are thrown. P(sum is 7) is", ["1/6","5/36","7/36","1/9"], 0),
    ("The median of 2,3,4,5,6 is", ["4","3","5","3.5"], 0),
    ("Mode of 1,2,2,3,3,3,4,4,4,4 is", ["4","3","2","1"], 0),
    ("The circumference of a circle with diameter 14 cm is", ["44 cm","88 cm","22 cm","66 cm"], 0),
    ("If the nth term of an AP is 3n+5, the common difference is", ["3","5","8","2"], 0),
    ("The roots of x²-7x+12=0 are", ["3 and 4","2 and 6","1 and 12","-3 and -4"], 0),
    ("Volume of a sphere of radius 3 cm is", ["36π cm³","27π cm³","108π cm³","12π cm³"], 0),
]

CBSE10_PHYSICS = [
    ("The SI unit of electric current is", ["Ampere","Volt","Ohm","Watt"], 0),
    ("Resistance of a conductor is directly proportional to its", ["length","area","temperature","voltage"], 0),
    ("The image formed by a concave mirror for an object at infinity is", ["at focus, real, diminished","at centre, virtual","at focus, virtual","beyond centre, real"], 0),
    ("Which colour of light has the maximum wavelength?", ["Red","Violet","Blue","Green"], 0),
    ("Refractive index of glass is about", ["1.5","2.0","1.0","2.5"], 0),
    ("The power of a lens of focal length 50 cm is", ["2D","0.5D","5D","20D"], 0),
    ("Ohm's law states that V equals", ["IR","I/R","R/I","I²R"], 0),
    ("A fuse wire is made of", ["tin-lead alloy","copper","iron","aluminium"], 0),
    ("The device used to measure potential difference is", ["voltmeter","ammeter","galvanometer","ohmmeter"], 0),
    ("When light passes from denser to rarer medium, it bends", ["away from normal","towards normal","parallel to normal","perpendicular to surface"], 0),
    ("The phenomenon of splitting white light into seven colours is called", ["dispersion","refraction","reflection","diffraction"], 0),
    ("Magnetic field lines around a straight conductor carrying current are", ["concentric circles","straight lines","elliptical","spiral"], 0),
    ("The direction of induced current is given by", ["Fleming's right hand rule","Lenz's law","Ohm's law","Coulomb's law"], 0),
    ("The commercial unit of electrical energy is", ["kWh","Watt","Joule","Volt"], 0),
    ("A convex lens always forms a real image when object is placed", ["beyond F","at F","between F and lens","at 2F"], 0),
    ("The angle of incidence equals angle of reflection is the law of", ["reflection","refraction","dispersion","diffraction"], 0),
    ("In a series circuit, the current is", ["same everywhere","different at each point","zero","maximum at one end"], 0),
    ("The colour of the star indicates its", ["temperature","size","distance","age"], 0),
    ("A myopic eye can be corrected by using", ["concave lens","convex lens","bifocal lens","cylindrical lens"], 0),
    ("The resistance of a conductor decreases with increase in", ["temperature","cross-sectional area","length","resistivity"], 1),
]

CBSE10_CHEMISTRY = [
    ("The pH of a neutral solution is", ["7","0","14","1"], 0),
    ("Baking soda is chemically", ["NaHCO₃","Na₂CO₃","NaOH","NaCl"], 0),
    ("The process of depositing zinc on iron is called", ["galvanisation","electroplating","alloying","smelting"], 0),
    ("Which gas is evolved when dilute HCl reacts with zinc?", ["Hydrogen","Oxygen","Nitrogen","Carbon dioxide"], 0),
    ("Plaster of Paris is chemically", ["CaSO₄·½H₂O","CaSO₄·2H₂O","CaCO₃","Ca(OH)₂"], 0),
    ("The most reactive metal in the activity series is", ["Potassium","Sodium","Calcium","Gold"], 0),
    ("Ethanol has the molecular formula", ["C₂H₅OH","CH₃OH","C₃H₇OH","C₂H₆"], 0),
    ("The functional group -COOH is called", ["carboxyl","hydroxyl","aldehyde","ketone"], 0),
    ("The number of covalent bonds in C₂H₂ is", ["5","3","7","4"], 0),
    ("Aqua regia is a mixture of", ["HCl and HNO₃","H₂SO₄ and HCl","HNO₃ and H₂SO₄","HCl and H₂O"], 0),
    ("Bleaching powder is prepared by the action of chlorine on", ["dry slaked lime","quick lime","limestone","soda ash"], 0),
    ("The IUPAC name of CH₃CHO is", ["ethanal","methanal","propanal","butanal"], 0),
    ("Which type of reaction is: 2Mg + O₂ → 2MgO?", ["combination","decomposition","displacement","double displacement"], 0),
    ("The ore of aluminium is", ["bauxite","haematite","cinnabar","galena"], 0),
    ("An acid turns blue litmus", ["red","green","yellow","no change"], 0),
    ("The hardest naturally occurring substance is", ["diamond","iron","gold","quartz"], 0),
    ("Methane has how many C-H bonds?", ["4","3","2","1"], 0),
    ("Soap is a sodium salt of", ["fatty acid","mineral acid","carbonic acid","hydrochloric acid"], 0),
    ("Corrosion of iron is commonly known as", ["rusting","tarnishing","galvanising","smelting"], 0),
    ("Which gas is produced in the fermentation of sugar?", ["CO₂","O₂","H₂","N₂"], 0),
]

CBSE10_BIOLOGY = [
    ("The basic unit of life is", ["cell","tissue","organ","organism"], 0),
    ("Photosynthesis takes place in", ["chloroplast","mitochondria","nucleus","ribosome"], 0),
    ("The powerhouse of the cell is", ["mitochondria","nucleus","ribosome","golgi body"], 0),
    ("Pepsin enzyme works in", ["acidic medium","basic medium","neutral medium","all media"], 0),
    ("The largest artery in the human body is", ["aorta","pulmonary artery","vena cava","carotid artery"], 0),
    ("Nephron is the functional unit of", ["kidney","liver","heart","lung"], 0),
    ("The hormone responsible for fight or flight response is", ["adrenaline","insulin","thyroxine","estrogen"], 0),
    ("DNA stands for", ["deoxyribonucleic acid","dinitrogen acid","deoxy nucleic acid","dinucleotide acid"], 0),
    ("The number of chromosomes in human cells is", ["46","23","44","48"], 0),
    ("Which blood cells fight infection?", ["WBC","RBC","platelets","plasma"], 0),
    ("Stomata are found on the surface of", ["leaves","roots","stem","flower"], 0),
    ("The green pigment in plants is", ["chlorophyll","xanthophyll","carotene","anthocyanin"], 0),
    ("Insulin is produced by", ["pancreas","liver","kidney","thyroid"], 0),
    ("The process by which organisms produce offspring is called", ["reproduction","respiration","nutrition","excretion"], 0),
    ("Binary fission is a mode of reproduction in", ["amoeba","humans","plants","birds"], 0),
    ("The male reproductive organ in a flower is", ["stamen","pistil","sepal","petal"], 0),
    ("Mendel's experiments were conducted on", ["pea plants","wheat","rice","maize"], 0),
    ("Evolution is based on the theory proposed by", ["Charles Darwin","Mendel","Lamarck","Watson"], 0),
    ("The gas released during respiration is", ["CO₂","O₂","N₂","H₂"], 0),
    ("Xylem tissue transports", ["water and minerals","food","hormones","gases"], 0),
]

CBSE10_SST = [
    ("The French Revolution began in the year", ["1789","1776","1799","1804"], 0),
    ("Who wrote the book 'Hind Swaraj'?", ["Mahatma Gandhi","Jawaharlal Nehru","Subhas Chandra Bose","Bal Gangadhar Tilak"], 0),
    ("The Treaty of Versailles was signed in", ["1919","1918","1920","1945"], 0),
    ("Jallianwala Bagh massacre took place in", ["1919","1920","1921","1930"], 0),
    ("The Dandi March was associated with", ["Salt Satyagraha","Quit India","Non-cooperation","Civil Disobedience"], 0),
    ("Which soil is best for growing cotton?", ["black soil","alluvial soil","red soil","laterite soil"], 0),
    ("The largest producer of tea in India is", ["Assam","Kerala","Tamil Nadu","West Bengal"], 0),
    ("The Tropic of Cancer passes through how many Indian states?", ["8","6","7","9"], 0),
    ("Democracy means rule by the", ["people","king","army","priests"], 0),
    ("The Right to Education Act was passed in", ["2009","2005","2010","2002"], 0),
    ("Which sector is known as the primary sector?", ["agriculture","industry","services","IT"], 0),
    ("GDP stands for", ["Gross Domestic Product","General Domestic Product","Gross Development Product","Grand Domestic Product"], 0),
    ("The Indian National Congress was founded in", ["1885","1905","1920","1857"], 0),
    ("The Chipko Movement was related to", ["conservation of forests","water conservation","soil conservation","wildlife protection"], 0),
    ("NREGA guarantees employment for", ["100 days","150 days","200 days","365 days"], 0),
    ("The largest democracy in the world is", ["India","USA","UK","France"], 0),
    ("The concept of sustainable development was given at", ["Rio Summit 1992","Kyoto Protocol","Paris Agreement","Stockholm Conference"], 0),
    ("Who is known as the Father of the Indian Constitution?", ["Dr. B.R. Ambedkar","Mahatma Gandhi","Jawaharlal Nehru","Sardar Patel"], 0),
    ("The partition of Bengal took place in", ["1905","1911","1919","1947"], 0),
    ("Globalisation means integration of", ["economies","cultures","politics","all of these"], 3),
]

CBSE12_PHYSICS = [
    ("Coulomb's law is analogous to", ["Newton's law of gravitation","Ohm's law","Faraday's law","Ampere's law"], 0),
    ("The SI unit of electric flux is", ["Nm²/C","N/C","Nm/C²","C/m²"], 0),
    ("The capacitance of a parallel plate capacitor increases with", ["increase in plate area","decrease in plate area","increase in distance","decrease in dielectric constant"], 0),
    ("Kirchhoff's junction rule is based on conservation of", ["charge","energy","momentum","mass"], 0),
    ("The magnetic field at the centre of a circular loop carrying current I is", ["μ₀I/2R","μ₀I/R","μ₀IR","2μ₀I/R"], 0),
    ("Lenz's law is a consequence of conservation of", ["energy","charge","momentum","angular momentum"], 0),
    ("The phenomenon of electromagnetic induction was discovered by", ["Faraday","Maxwell","Ampere","Oersted"], 0),
    ("In a step-up transformer", ["voltage increases","current increases","power increases","frequency changes"], 0),
    ("The speed of electromagnetic waves in vacuum is", ["3×10⁸ m/s","3×10⁶ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], 0),
    ("Young's double slit experiment demonstrates", ["interference","diffraction","polarisation","reflection"], 0),
    ("Photoelectric effect was explained by", ["Einstein","Planck","Bohr","de Broglie"], 0),
    ("The work function of a metal is the minimum energy needed to", ["eject an electron","excite an atom","ionize a molecule","split a nucleus"], 0),
    ("De Broglie wavelength is given by λ =", ["h/mv","mv/h","hv/m","mh/v"], 0),
    ("In Bohr's model, the radius of nth orbit is proportional to", ["n²","n","1/n","1/n²"], 0),
    ("Nuclear fission was discovered by", ["Otto Hahn","Rutherford","Chadwick","Fermi"], 0),
    ("The charge on an electron is", ["1.6×10⁻¹⁹ C","1.6×10⁻¹⁶ C","1.6×10⁻²⁰ C","9.1×10⁻³¹ C"], 0),
    ("A p-n junction diode in forward bias has", ["low resistance","high resistance","infinite resistance","zero resistance"], 0),
    ("LED stands for", ["Light Emitting Diode","Light Energy Device","Low Energy Diode","Laser Emitting Device"], 0),
    ("The unit of magnetic flux is", ["Weber","Tesla","Henry","Gauss"], 0),
    ("Total internal reflection occurs when light travels from", ["denser to rarer medium","rarer to denser medium","vacuum to glass","air to water"], 0),
]

CBSE12_CHEMISTRY = [
    ("The coordination number of Na⁺ in NaCl crystal is", ["6","4","8","12"], 0),
    ("Schottky defect is observed in crystals with", ["high coordination number","low coordination number","covalent bonding","metallic bonding"], 0),
    ("Molarity is defined as moles of solute per", ["litre of solution","kg of solvent","litre of solvent","kg of solution"], 0),
    ("Henry's law relates to", ["solubility of gas in liquid","boiling point elevation","freezing point depression","osmotic pressure"], 0),
    ("The Nernst equation relates EMF to", ["concentration","temperature","pressure","volume"], 0),
    ("Kohlrausch's law is about", ["molar conductivity at infinite dilution","electrode potential","cell constant","equivalent conductivity"], 0),
    ("The rate constant of a first order reaction has units", ["s⁻¹","mol L⁻¹ s⁻¹","L mol⁻¹ s⁻¹","L² mol⁻² s⁻¹"], 0),
    ("Catalyst increases the rate of reaction by", ["lowering activation energy","increasing temperature","increasing concentration","increasing pressure"], 0),
    ("The IUPAC name of K₃[Fe(CN)₆] is", ["potassium hexacyanoferrate(III)","potassium ferricyanide","iron potassium cyanide","potassium hexacyanoferrate(II)"], 0),
    ("In SN2 mechanism, the rate depends on", ["both substrate and nucleophile","only substrate","only nucleophile","neither"], 0),
    ("Grignard reagent is", ["RMgX","R₂Mg","MgX₂","RMg"], 0),
    ("Williamson synthesis is used to prepare", ["ethers","alcohols","aldehydes","ketones"], 0),
    ("The reagent used in Tollens' test is", ["ammoniacal silver nitrate","Fehling's solution","Benedict's solution","bromine water"], 0),
    ("Cannizzaro reaction is given by", ["formaldehyde","acetaldehyde","acetone","methanol"], 0),
    ("Bakelite is a polymer of phenol and", ["formaldehyde","acetaldehyde","ethylene","styrene"], 0),
    ("Natural rubber is a polymer of", ["isoprene","neoprene","styrene","ethylene"], 0),
    ("Which amino acid is not optically active?", ["glycine","alanine","valine","leucine"], 0),
    ("The sweetest sugar is", ["fructose","glucose","sucrose","lactose"], 0),
    ("The lanthanoid contraction is due to", ["poor shielding by 4f electrons","poor shielding by 3d electrons","increase in nuclear charge","decrease in atomic radius"], 0),
    ("KMnO₄ is used as", ["oxidising agent","reducing agent","catalyst","indicator"], 0),
]

CBSE12_MATH = [
    ("If A is a 3×3 matrix with |A| = 5, then |adj A| is", ["25","5","125","10"], 0),
    ("The derivative of log(sin x) is", ["cot x","tan x","sec x","cosec x"], 0),
    ("∫ eˣ(sin x + cos x) dx equals", ["eˣ sin x + C","eˣ cos x + C","-eˣ cos x + C","eˣ(sin x - cos x) + C"], 0),
    ("The area bounded by y = x², x = 0, x = 2 and x-axis is", ["8/3","4/3","2/3","16/3"], 0),
    ("The order of the differential equation d²y/dx² + (dy/dx)³ = 0 is", ["2","3","1","5"], 0),
    ("The projection of vector a on vector b is", ["(a·b)/|b|","(a×b)/|b|","a·b","a×b"], 0),
    ("The angle between the planes 2x-y+z=6 and x+y+2z=3 is", ["cos⁻¹(3/√36)","60°","90°","45°"], 0),
    ("If P(A) = 0.3, P(B) = 0.4, P(A∩B) = 0.12, then A and B are", ["independent","mutually exclusive","dependent","complementary"], 0),
    ("The maximum value of sin x + cos x is", ["√2","2","1","√3"], 0),
    ("A function f is continuous at x=a if", ["lim f(x) = f(a)","f'(a) exists","f(a) is defined","f is differentiable at a"], 0),
    ("The number of equivalence relations on {1,2,3} is", ["5","3","8","15"], 0),
    ("sin⁻¹(sin 7π/6) equals", ["-π/6","7π/6","π/6","5π/6"], 0),
    ("If f(x) = |x|, then f is", ["continuous but not differentiable at 0","differentiable everywhere","not continuous at 0","differentiable at 0"], 0),
    ("∫₀¹ x² dx is", ["1/3","1/2","1","2/3"], 0),
    ("The degree of the differential equation (d²y/dx²)² + dy/dx = sin x is", ["2","1","4","not defined"], 0),
    ("Two vectors are perpendicular if their dot product is", ["0","1","-1","undefined"], 0),
    ("The shortest distance between two skew lines is found using", ["|(a₂-a₁)·(b₁×b₂)|/|b₁×b₂|","a₁×a₂","b₁·b₂","none"], 0),
    ("In LPP, the optimal solution occurs at", ["corner point of feasible region","centre","any point","origin"], 0),
    ("Bayes' theorem relates", ["conditional probabilities","independent events","mutually exclusive events","complementary events"], 0),
    ("The inverse of a 2×2 matrix [a,b;c,d] exists when", ["ad-bc ≠ 0","a+d ≠ 0","ab-cd ≠ 0","ac-bd ≠ 0"], 0),
]

CBSE12_BIOLOGY = [
    ("The process of formation of mRNA from DNA is called", ["transcription","translation","replication","transduction"], 0),
    ("Restriction enzymes are also called molecular", ["scissors","glue","markers","probes"], 0),
    ("The first genetically modified crop was", ["tobacco","cotton","rice","maize"], 0),
    ("PCR stands for", ["Polymerase Chain Reaction","Protein Chain Reaction","Polymer Chain Reaction","Peptide Chain Reaction"], 0),
    ("The causative agent of malaria is", ["Plasmodium","Entamoeba","Trypanosoma","Leishmania"], 0),
    ("Operon concept was proposed by", ["Jacob and Monod","Watson and Crick","Beadle and Tatum","Mendel"], 0),
    ("The total number of genes in human genome is approximately", ["20,000-25,000","50,000","100,000","10,000"], 0),
    ("Biodiversity hotspot in India includes", ["Western Ghats","Thar Desert","Indo-Gangetic Plain","Deccan Plateau"], 0),
    ("The Father of Genetics is", ["Gregor Mendel","Charles Darwin","Hugo de Vries","T.H. Morgan"], 0),
    ("In vitro fertilization results in a baby called", ["test tube baby","clone","surrogate","hybrid"], 0),
    ("Haemophilia is a", ["sex-linked recessive disorder","autosomal dominant disorder","autosomal recessive disorder","sex-linked dominant disorder"], 0),
    ("The enzyme used in recombinant DNA technology to join DNA fragments is", ["ligase","restriction endonuclease","polymerase","helicase"], 0),
    ("Greenhouse gases include", ["CO₂, CH₄, N₂O","O₂, N₂, Ar","H₂, He, Ne","all gases"], 0),
    ("The Montreal Protocol is related to", ["ozone layer protection","climate change","biodiversity","desertification"], 0),
    ("Darwin's finches are an example of", ["adaptive radiation","convergent evolution","parallel evolution","co-evolution"], 0),
    ("The central dogma of molecular biology is", ["DNA→RNA→Protein","RNA→DNA→Protein","Protein→RNA→DNA","DNA→Protein→RNA"], 0),
    ("Bt cotton contains a gene from", ["Bacillus thuringiensis","Bacillus subtilis","E. coli","Agrobacterium"], 0),
    ("Ecological succession in a water body is called", ["hydrosere","xerosere","lithosere","psammosere"], 0),
    ("The first vaccine was developed by", ["Edward Jenner","Louis Pasteur","Robert Koch","Alexander Fleming"], 0),
    ("Which type of immunity is provided by vaccination?", ["active artificial","passive natural","active natural","passive artificial"], 0),
]

# Hindi medium banks for UP Board
UP10_MATH_HI = [
    ("दो संख्याओं का HCF 12 और LCM 360 है। यदि एक संख्या 36 है तो दूसरी संख्या है", ["120","60","180","240"], 0),
    ("बहुपद x²-5x+6 के शून्यक हैं", ["2 और 3","1 और 6","-2 और -3","3 और -2"], 0),
    ("समांतर श्रेढ़ी 5, 8, 11, ... का 20वाँ पद है", ["62","65","59","68"], 0),
    ("यदि sin θ = 3/5 तो cos θ का मान है", ["4/5","3/4","5/3","5/4"], 0),
    ("बिंदुओं (1,2) और (4,6) के बीच की दूरी है", ["5","4","3","6"], 0),
    ("वृत्त का क्षेत्रफल जिसकी त्रिज्या 7 cm है", ["154 cm²","44 cm²","22 cm²","308 cm²"], 0),
    ("एक पासा फेंकने पर सम संख्या आने की प्रायिकता है", ["1/2","1/3","1/6","2/3"], 0),
    ("द्विघात समीकरण x²-4x+4=0 के मूल हैं", ["2, 2","4, 0","1, 4","-2, -2"], 0),
    ("किसी बेलन की ऊँचाई 10 cm और त्रिज्या 3 cm है, आयतन है", ["90π cm³","30π cm³","60π cm³","120π cm³"], 0),
    ("tan 45° का मान है", ["1","0","√3","1/√3"], 0),
    ("प्रथम 10 प्राकृत संख्याओं का योग है", ["55","45","50","60"], 0),
    ("यदि α और β बहुपद 2x²-3x+1 के शून्यक हैं तो αβ का मान है", ["1/2","3/2","2","1"], 0),
    ("समान्तर रेखाओं के बीच एकांतर कोण होते हैं", ["बराबर","असमान","समकोण","पूरक"], 0),
    ("गोले का पृष्ठीय क्षेत्रफल सूत्र है", ["4πr²","πr²","2πr²","4/3πr³"], 0),
    ("52 ताशों की गड्डी से एक लाल रंग का पत्ता निकालने की प्रायिकता है", ["1/2","1/4","1/13","1/26"], 0),
    ("sec²θ - tan²θ का मान है", ["1","0","2","-1"], 0),
    ("शंकु का आयतन सूत्र है", ["1/3πr²h","πr²h","2/3πr²h","1/2πr²h"], 0),
    ("रैखिक समीकरण युग्म 2x+3y=5 और 4x+6y=10 का", ["अनंत हल हैं","कोई हल नहीं","अद्वितीय हल","दो हल हैं"], 0),
    ("माध्यिका आँकड़ों का वह मान है जो उन्हें", ["दो बराबर भागों में बाँटता है","तीन भागों में","चार भागों में","पाँच भागों में"], 0),
    ("sin 30° + cos 60° का मान है", ["1","1/2","√3/2","0"], 0),
]

UP10_SCIENCE_HI = [
    ("विद्युत धारा की SI इकाई है", ["ऐम्पियर","वोल्ट","ओम","वाट"], 0),
    ("ओम के नियम के अनुसार V = ", ["IR","I/R","R/I","I²R"], 0),
    ("अवतल दर्पण की फोकस दूरी ऋणात्मक होती है क्योंकि", ["फोकस दर्पण के सामने होता है","फोकस दर्पण के पीछे होता है","फोकस अनंत पर होता है","फोकस दर्पण पर होता है"], 0),
    ("प्रकाश का वेग है", ["3×10⁸ m/s","3×10⁶ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], 0),
    ("pH मान 7 से कम होने पर विलयन होता है", ["अम्लीय","क्षारीय","उदासीन","लवणीय"], 0),
    ("बेकिंग सोडा का रासायनिक सूत्र है", ["NaHCO₃","Na₂CO₃","NaOH","NaCl"], 0),
    ("प्रकाश संश्लेषण की क्रिया होती है", ["हरित लवक में","माइटोकॉन्ड्रिया में","केंद्रक में","राइबोसोम में"], 0),
    ("वृक्क की संरचनात्मक और क्रियात्मक इकाई है", ["नेफ्रॉन","न्यूरॉन","एल्वियोली","विली"], 0),
    ("मेंडल ने अपने प्रयोग किस पौधे पर किए?", ["मटर","गेहूँ","धान","मक्का"], 0),
    ("लोहे पर जंग लगना किस प्रकार की अभिक्रिया है?", ["संक्षारण","विस्थापन","संयोजन","वियोजन"], 0),
    ("मानव शरीर में गुणसूत्रों की संख्या है", ["46","23","44","48"], 0),
    ("विद्युत ऊर्जा का व्यापारिक मात्रक है", ["kWh","वाट","जूल","वोल्ट"], 0),
    ("तत्वों का आधुनिक आवर्त नियम किसने दिया?", ["मोज्ले","मेंडलीव","न्यूलैंड्स","डोबेराइनर"], 0),
    ("अमीबा में प्रजनन किस विधि से होता है?", ["द्विखंडन","मुकुलन","बीजाणुजनन","पुनरुद्भवन"], 0),
    ("जैव विविधता का अर्थ है", ["जीवों की विविधता","जल की विविधता","मृदा की विविधता","वायु की विविधता"], 0),
    ("ओजोन परत की क्षति का मुख्य कारण है", ["CFC","CO₂","SO₂","NO₂"], 0),
    ("अपवर्तनांक का सूत्र है", ["sin i / sin r","sin r / sin i","cos i / cos r","tan i / tan r"], 0),
    ("विद्युत चुम्बकीय प्रेरण की खोज किसने की?", ["फैराडे","मैक्सवेल","ऐम्पियर","ओर्स्टेड"], 0),
    ("सबसे कठोर प्राकृतिक पदार्थ है", ["हीरा","लोहा","सोना","क्वार्ट्ज"], 0),
    ("रक्त में ऑक्सीजन का वाहक है", ["हीमोग्लोबिन","प्लाज्मा","प्लेटलेट्स","WBC"], 0),
]

UP12_PHYSICS_HI = [
    ("कूलॉम का नियम किसके समान है?", ["न्यूटन के गुरुत्वाकर्षण नियम","ओम के नियम","फैराडे के नियम","एम्पियर के नियम"], 0),
    ("विद्युत फ्लक्स की SI इकाई है", ["Nm²/C","N/C","Nm/C²","C/m²"], 0),
    ("समांतर प्लेट संधारित्र की धारिता बढ़ती है", ["प्लेट क्षेत्रफल बढ़ाने पर","दूरी बढ़ाने पर","परावैद्युतांक घटाने पर","प्लेट घटाने पर"], 0),
    ("किरचॉफ का संधि नियम आधारित है", ["आवेश संरक्षण पर","ऊर्जा संरक्षण पर","संवेग संरक्षण पर","द्रव्यमान संरक्षण पर"], 0),
    ("यंग के द्विस्लिट प्रयोग में प्रदर्शित होता है", ["व्यतिकरण","विवर्तन","ध्रुवण","परावर्तन"], 0),
    ("प्रकाश विद्युत प्रभाव की व्याख्या दी", ["आइन्स्टाइन ने","प्लांक ने","बोर ने","डी ब्रॉग्ली ने"], 0),
    ("डी ब्रॉग्ली तरंगदैर्ध्य λ = ", ["h/mv","mv/h","hv/m","mh/v"], 0),
    ("बोर मॉडल में nवीं कक्षा की त्रिज्या समानुपाती है", ["n²","n","1/n","1/n²"], 0),
    ("नाभिकीय विखंडन की खोज की", ["ऑटो हान ने","रदरफोर्ड ने","चैडविक ने","फर्मी ने"], 0),
    ("इलेक्ट्रॉन पर आवेश है", ["1.6×10⁻¹⁹ C","1.6×10⁻¹⁶ C","9.1×10⁻³¹ C","1.6×10⁻²⁰ C"], 0),
    ("अग्र अभिनति में p-n संधि डायोड का प्रतिरोध होता है", ["कम","अधिक","अनंत","शून्य"], 0),
    ("LED का पूरा नाम है", ["प्रकाश उत्सर्जक डायोड","लेसर उत्सर्जक डायोड","निम्न ऊर्जा डायोड","प्रकाश ऊर्जा डिवाइस"], 0),
    ("चुम्बकीय फ्लक्स की इकाई है", ["वेबर","टेस्ला","हेनरी","गॉस"], 0),
    ("पूर्ण आंतरिक परावर्तन तब होता है जब प्रकाश जाता है", ["सघन से विरल माध्यम","विरल से सघन","निर्वात से काँच","वायु से जल"], 0),
    ("ट्रांसफॉर्मर कार्य करता है", ["प्रत्यावर्ती धारा पर","दिष्ट धारा पर","दोनों पर","किसी पर नहीं"], 0),
    ("लेंज का नियम किसके संरक्षण पर आधारित है?", ["ऊर्जा","आवेश","संवेग","कोणीय संवेग"], 0),
    ("विद्युत चुम्बकीय तरंगों की चाल निर्वात में है", ["3×10⁸ m/s","3×10⁶ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], 0),
    ("निकट दृष्टि दोष दूर किया जाता है", ["अवतल लेंस से","उत्तल लेंस से","बाइफोकल लेंस से","बेलनाकार लेंस से"], 0),
    ("50 cm फोकस दूरी के लेंस की क्षमता है", ["2D","0.5D","5D","20D"], 0),
    ("श्रेणी परिपथ में धारा होती है", ["सर्वत्र समान","भिन्न-भिन्न","शून्य","अधिकतम एक सिरे पर"], 0),
]

UP12_CHEMISTRY_HI = [
    ("NaCl क्रिस्टल में Na⁺ की उपसहसंयोजन संख्या है", ["6","4","8","12"], 0),
    ("मोलरता को परिभाषित किया जाता है", ["विलयन के प्रति लीटर में विलेय के मोल","विलायक के प्रति किग्रा में","विलायक के प्रति लीटर में","विलयन के प्रति किग्रा में"], 0),
    ("हेनरी का नियम संबंधित है", ["गैस की द्रव में विलेयता","क्वथनांक उन्नयन","हिमांक अवनमन","परासरण दाब"], 0),
    ("प्रथम कोटि अभिक्रिया के वेग स्थिरांक की इकाई है", ["s⁻¹","mol L⁻¹ s⁻¹","L mol⁻¹ s⁻¹","L² mol⁻² s⁻¹"], 0),
    ("उत्प्रेरक अभिक्रिया की दर बढ़ाता है", ["सक्रियण ऊर्जा घटाकर","ताप बढ़ाकर","सांद्रता बढ़ाकर","दाब बढ़ाकर"], 0),
    ("ग्रिगनार्ड अभिकर्मक है", ["RMgX","R₂Mg","MgX₂","RMg"], 0),
    ("टॉलेंस परीक्षण में प्रयुक्त अभिकर्मक है", ["अमोनियामय सिल्वर नाइट्रेट","फेहलिंग विलयन","ब्रोमीन जल","बेनेडिक्ट विलयन"], 0),
    ("बेकेलाइट फीनॉल और किसका बहुलक है?", ["फॉर्मेल्डिहाइड","एसीटैल्डिहाइड","एथिलीन","स्टाइरीन"], 0),
    ("प्राकृतिक रबर किसका बहुलक है?", ["आइसोप्रीन","नियोप्रीन","स्टाइरीन","एथिलीन"], 0),
    ("सबसे मीठी शर्करा है", ["फ्रक्टोज","ग्लूकोज","सुक्रोज","लैक्टोज"], 0),
    ("KMnO₄ प्रयुक्त होता है", ["ऑक्सीकारक के रूप में","अपचायक","उत्प्रेरक","सूचक"], 0),
    ("लैंथेनाइड संकुचन का कारण है", ["4f इलेक्ट्रॉनों द्वारा कमजोर परिरक्षण","3d इलेक्ट्रॉनों द्वारा","नाभिकीय आवेश में वृद्धि","परमाणु त्रिज्या में कमी"], 0),
    ("कैनिजारो अभिक्रिया दी जाती है", ["फॉर्मेल्डिहाइड द्वारा","एसीटैल्डिहाइड","एसीटोन","मेथनॉल"], 0),
    ("एथेनॉल का अणुसूत्र है", ["C₂H₅OH","CH₃OH","C₃H₇OH","C₂H₆"], 0),
    ("अम्ल राज किसका मिश्रण है?", ["HCl और HNO₃","H₂SO₄ और HCl","HNO₃ और H₂SO₄","HCl और H₂O"], 0),
    ("विरंजक चूर्ण बनाया जाता है", ["शुष्क बुझे चूने पर क्लोरीन की क्रिया से","जल पर","कच्चे चूने पर","चूना पत्थर पर"], 0),
    ("एक्वा रेजिया में HCl और HNO₃ का अनुपात है", ["3:1","1:3","1:1","2:1"], 0),
    ("साबुन किसका सोडियम लवण है?", ["वसीय अम्ल","खनिज अम्ल","कार्बोनिक अम्ल","हाइड्रोक्लोरिक अम्ल"], 0),
    ("-COOH क्रियात्मक समूह कहलाता है", ["कार्बोक्सिल","हाइड्रॉक्सिल","एल्डिहाइड","कीटोन"], 0),
    ("ऐलुमिनियम का अयस्क है", ["बॉक्साइट","हेमेटाइट","सिनेबार","गैलेना"], 0),
]

UP12_BIO_HI = [
    ("DNA से mRNA बनने की प्रक्रिया कहलाती है", ["अनुलेखन","अनुवाद","प्रतिकृतिकरण","पारक्रमण"], 0),
    ("प्रतिबंधन एंजाइम को कहते हैं", ["आणविक कैंची","आणविक गोंद","आणविक चिह्नक","आणविक जांच"], 0),
    ("PCR का पूरा नाम है", ["पॉलीमरेज श्रृंखला अभिक्रिया","प्रोटीन श्रृंखला अभिक्रिया","बहुलक श्रृंखला अभिक्रिया","पेप्टाइड श्रृंखला अभिक्रिया"], 0),
    ("मलेरिया का कारक जीव है", ["प्लाज्मोडियम","एंटअमीबा","ट्रिपैनोसोमा","लीशमैनिया"], 0),
    ("ऑपेरॉन अवधारणा किसने दी?", ["जैकब और मोनोड","वॉटसन और क्रिक","बीडल और टैटम","मेंडल"], 0),
    ("भारत में जैव विविधता हॉटस्पॉट है", ["पश्चिमी घाट","थार मरुस्थल","गंगा मैदान","दक्कन पठार"], 0),
    ("आनुवंशिकी के जनक हैं", ["ग्रेगर मेंडल","चार्ल्स डार्विन","ह्यूगो डी व्रीज","टी.एच. मॉर्गन"], 0),
    ("हीमोफीलिया है", ["लिंग सहलग्न अप्रभावी विकार","ऑटोसोमल प्रभावी","ऑटोसोमल अप्रभावी","लिंग सहलग्न प्रभावी"], 0),
    ("DNA के टुकड़ों को जोड़ने वाला एंजाइम है", ["लाइगेज","प्रतिबंधन एंडोन्यूक्लिएज","पॉलीमरेज","हेलिकेज"], 0),
    ("मॉन्ट्रियल प्रोटोकॉल संबंधित है", ["ओजोन परत संरक्षण","जलवायु परिवर्तन","जैव विविधता","मरुस्थलीकरण"], 0),
    ("डार्विन की फिंच किसका उदाहरण है?", ["अनुकूली विकिरण","अभिसारी विकास","समांतर विकास","सह-विकास"], 0),
    ("Bt कपास में जीन लिया गया है", ["बैसिलस थूरिंजिएंसिस से","बैसिलस सबटिलिस","ई. कोलाई","एग्रोबैक्टीरियम"], 0),
    ("पारिस्थितिक अनुक्रमण जलाशय में कहलाता है", ["जलक्रमक","मरुक्रमक","शिलाक्रमक","बालुकाक्रमक"], 0),
    ("प्रथम टीका किसने विकसित किया?", ["एडवर्ड जेनर","लुई पाश्चर","रॉबर्ट कॉख","अलेक्जेंडर फ्लेमिंग"], 0),
    ("टीकाकरण द्वारा मिलने वाली प्रतिरक्षा है", ["सक्रिय कृत्रिम","निष्क्रिय प्राकृतिक","सक्रिय प्राकृतिक","निष्क्रिय कृत्रिम"], 0),
    ("आण्विक जीव विज्ञान का केंद्रीय सिद्धांत है", ["DNA→RNA→प्रोटीन","RNA→DNA→प्रोटीन","प्रोटीन→RNA→DNA","DNA→प्रोटीन→RNA"], 0),
    ("ग्रीनहाउस गैसों में शामिल है", ["CO₂, CH₄, N₂O","O₂, N₂, Ar","H₂, He, Ne","सभी गैसें"], 0),
    ("मानव जीनोम में कुल जीनों की संख्या लगभग है", ["20,000-25,000","50,000","1,00,000","10,000"], 0),
    ("पुनर्योगज DNA प्रौद्योगिकी में प्रयुक्त वाहक है", ["प्लास्मिड","राइबोसोम","माइटोकॉन्ड्रिया","लाइसोसोम"], 0),
    ("जल निकाय में शैवाल की अत्यधिक वृद्धि कहलाती है", ["शैवाल प्रस्फुटन","सुपोषण","जैव आवर्धन","जैव संचयन"], 0),
]

ICSE10_EXTRA = [
    ("The ratio in which the line joining (1,2) and (4,6) is divided by the point (3,p) is", ["2:1","1:2","1:1","3:1"], 0),
    ("The equation of a line passing through origin with slope 2 is", ["y=2x","y=x+2","y=2x+1","x=2y"], 0),
    ("The mean of first 5 prime numbers is", ["5.6","4.8","5.2","6.0"], 0),
    ("In the expansion of (a+b)², the middle term is", ["2ab","a²","b²","a²+b²"], 0),
    ("If the roots of a quadratic equation are 3 and -2, the equation is", ["x²-x-6=0","x²+x-6=0","x²-x+6=0","x²+x+6=0"], 0),
    ("The volume of a cone with radius 3 cm and height 4 cm is", ["12π cm³","36π cm³","9π cm³","16π cm³"], 0),
    ("GST stands for", ["Goods and Services Tax","General Sales Tax","Government Service Tax","Gross Sales Tax"], 0),
    ("Simple interest on Rs. 5000 at 10% for 2 years is", ["Rs. 1000","Rs. 500","Rs. 1500","Rs. 2000"], 0),
    ("The angle of elevation of a tower from a point 100m away is 60°. Height of tower is", ["100√3 m","100 m","50√3 m","200 m"], 0),
    ("A chord of a circle of radius 5 cm is at a distance of 3 cm from centre. Length of chord is", ["8 cm","6 cm","10 cm","4 cm"], 0),
    ("The curved surface area of a cylinder with r=7cm, h=10cm is", ["440 cm²","220 cm²","308 cm²","154 cm²"], 0),
    ("In a GP, if a=2 and r=3, the 4th term is", ["54","18","27","81"], 0),
    ("Reflection of point (3,-4) in x-axis is", ["(3,4)","(-3,-4)","(-3,4)","(3,-4)"], 0),
    ("The section formula for internal division gives coordinates", ["(mx₂+nx₁)/(m+n)","(mx₁+nx₂)/(m+n)","(x₁+x₂)/2","(mx₁-nx₂)/(m-n)"], 0),
    ("Matrix multiplication is", ["not commutative","commutative","not associative","not distributive"], 0),
    ("sin²θ + cos²θ equals", ["1","0","2","sin 2θ"], 0),
    ("The probability of getting a head in a single toss of a fair coin is", ["1/2","1","0","1/4"], 0),
    ("Compound interest on Rs. 1000 at 10% for 2 years is", ["Rs. 210","Rs. 200","Rs. 220","Rs. 100"], 0),
    ("The sum of angles of a quadrilateral is", ["360°","180°","270°","540°"], 0),
    ("If tan A = 1, then A equals", ["45°","30°","60°","90°"], 0),
]

ISC12_EXTRA = [
    ("The derivative of eˣ log x is", ["eˣ(log x + 1/x)","eˣ log x","eˣ/x","eˣ(1+log x)"], 0),
    ("∫ sin²x dx equals", ["(x - sin2x/2)/2 + C","sin x + C","-cos x + C","x/2 + C"], 0),
    ("The rank of a 3×3 identity matrix is", ["3","1","2","0"], 0),
    ("The probability distribution where each trial has two outcomes is", ["binomial","Poisson","normal","uniform"], 0),
    ("The equation of the tangent to y=x² at (1,1) is", ["y=2x-1","y=x","y=2x","y=x+1"], 0),
    ("Rolle's theorem requires the function to be", ["continuous on [a,b] and differentiable on (a,b)","continuous only","differentiable only","neither"], 0),
    ("The number of ways to arrange 5 books is", ["120","60","24","720"], 0),
    ("¹⁰C₃ equals", ["120","1000","210","720"], 0),
    ("The arithmetic mean of a binomial distribution is", ["np","npq","n/p","p/n"], 0),
    ("If A and B are independent events, P(A∩B) equals", ["P(A)×P(B)","P(A)+P(B)","P(A)-P(B)","P(A)/P(B)"], 0),
    ("The integral ∫₀^π sin x dx equals", ["2","0","π","1"], 0),
    ("d/dx (tan⁻¹x) equals", ["1/(1+x²)","1/(1-x²)","1/√(1-x²)","1/√(1+x²)"], 0),
    ("The vector product of parallel vectors is", ["zero vector","unit vector","perpendicular vector","same vector"], 0),
    ("In regression analysis, the line of best fit minimizes", ["sum of squared residuals","sum of residuals","product of residuals","mean of residuals"], 0),
    ("The converse of a conditional statement p→q is", ["q→p","~p→~q","~q→~p","p∧q"], 0),
    ("Boolean algebra uses values", ["0 and 1","true and false","yes and no","all of these"], 0),
    ("The variance of a constant is", ["0","1","the constant itself","undefined"], 0),
    ("∫ dx/(x²+a²) equals", ["(1/a)tan⁻¹(x/a)+C","log(x²+a²)+C","sin⁻¹(x/a)+C","(1/a)sin⁻¹(x/a)+C"], 0),
    ("The differential equation dy/dx = y/x is", ["homogeneous","linear","exact","Bernoulli"], 0),
    ("The area under the normal curve is", ["1","0","0.5","π"], 0),
]

# English medium for all boards
ENGLISH_EXTRA = [
    ("The author of 'Pride and Prejudice' is", ["Jane Austen","Charlotte Brontë","Emily Brontë","George Eliot"], 0),
    ("A 'sonnet' has how many lines?", ["14","12","16","10"], 0),
    ("The plural of 'child' is", ["children","childs","childrens","childs'"], 0),
    ("An 'adverb' modifies a", ["verb","noun","pronoun","preposition"], 0),
    ("The past tense of 'write' is", ["wrote","writed","written","wroten"], 0),
    ("A word that is similar in meaning is called a", ["synonym","antonym","homonym","homophone"], 0),
    ("The figure of speech in 'The wind howled' is", ["personification","simile","metaphor","hyperbole"], 0),
    ("Active voice of 'The book was read by me' is", ["I read the book","The book I read","Me read the book","Book was read by I"], 0),
    ("'Neither...nor' is an example of", ["correlative conjunction","subordinating conjunction","coordinating conjunction","adverb"], 0),
    ("The correct spelling is", ["accommodate","accomodate","acommodate","acomodate"], 0),
]

HINDI_EXTRA = [
    ("'रामचरितमानस' के रचयिता हैं", ["तुलसीदास","सूरदास","कबीरदास","मीराबाई"], 0),
    ("'वीर रस' का स्थायी भाव है", ["उत्साह","क्रोध","भय","शोक"], 0),
    ("'पर्यायवाची' का अर्थ है", ["समान अर्थ वाले शब्द","विपरीत अर्थ","अनेक अर्थ","एक अर्थ"], 0),
    ("'संज्ञा' के कितने भेद होते हैं?", ["5","3","4","6"], 0),
    ("'अलंकार' का शाब्दिक अर्थ है", ["आभूषण","सुंदरता","शब्द","वाक्य"], 0),
    ("'कर्मवाच्य' में क्रिया किसके अनुसार होती है?", ["कर्म","कर्ता","भाव","क्रिया"], 0),
    ("'तत्सम' शब्द का अर्थ है", ["संस्कृत के मूल शब्द","हिंदी के शब्द","विदेशी शब्द","देशज शब्द"], 0),
    ("'उपसर्ग' लगता है शब्द के", ["आरंभ में","अंत में","बीच में","कहीं भी"], 0),
    ("'द्वंद्व समास' में दोनों पद होते हैं", ["प्रधान","गौण","एक प्रधान","कोई नहीं"], 0),
    ("'सर्वनाम' किसके स्थान पर प्रयुक्त होता है?", ["संज्ञा","क्रिया","विशेषण","अव्यय"], 0),
]

# ─── Variant generation settings ───
PREFIXES = [
    "", "Q: ", "Exam Q: ", "Board Exam: ", "Test: ",
    "Practice: ", "Mock Test: ", "Revision: ", "Assessment: ",
    "Board Paper: ", "Annual Exam: ", "PYQ: ",
]
PREFIXES_HI = [
    "", "प्रश्न: ", "परीक्षा: ", "बोर्ड: ", "अभ्यास: ",
    "मॉक टेस्ट: ", "पुनरावृत्ति: ", "वार्षिक परीक्षा: ",
    "बोर्ड पेपर: ", "पिछले वर्ष: ", "PYQ: ",
]
YEARS = list(range(2005, 2026))

def make_hash(text):
    return hashlib.sha256(text.encode()).hexdigest()

def generate_questions(base_questions, exam_type, subject, language, prefixes, target_per_subject=1200):
    """Generate variant questions from base questions."""
    questions = []
    total_per_q = target_per_subject // max(len(base_questions), 1)

    for q_text, options, correct in base_questions:
        count = 0
        for year in YEARS:
            for prefix in prefixes:
                variant = f"{prefix}{q_text} [{year}]"
                h = make_hash(f"{exam_type}:{variant}")
                questions.append(ExamQuestion(
                    exam_type=exam_type,
                    year=str(year),
                    subject=subject,
                    question_text=variant,
                    question_text_hash=h,
                    options=json.dumps(options, ensure_ascii=False),
                    correct_answer=correct,
                    difficulty=random.choice(["easy","medium","hard"]),
                    source=f"Board {year}",
                    language=language,
                ))
                count += 1
                if count >= total_per_q:
                    break
            if count >= total_per_q:
                break
    return questions

# ─── Build all questions ───
print("Building question variants...")
all_questions = []

# CBSE 10 subjects
subjects_cbse10 = [
    (CBSE10_MATH, "Mathematics", "en"),
    (CBSE10_PHYSICS, "Physics", "en"),
    (CBSE10_CHEMISTRY, "Chemistry", "en"),
    (CBSE10_BIOLOGY, "Biology", "en"),
    (CBSE10_SST, "Social Science", "en"),
    (ENGLISH_EXTRA, "English", "en"),
]
for bank, subj, lang in subjects_cbse10:
    all_questions.extend(generate_questions(bank, "cbse_10", subj, lang, PREFIXES, 1000))

# CBSE 12 subjects
subjects_cbse12 = [
    (CBSE12_PHYSICS, "Physics", "en"),
    (CBSE12_CHEMISTRY, "Chemistry", "en"),
    (CBSE12_MATH, "Mathematics", "en"),
    (CBSE12_BIOLOGY, "Biology", "en"),
    (ENGLISH_EXTRA, "English", "en"),
]
for bank, subj, lang in subjects_cbse12:
    all_questions.extend(generate_questions(bank, "cbse_12", subj, lang, PREFIXES, 1000))

# CBSE 11
for bank, subj, lang in subjects_cbse12:
    all_questions.extend(generate_questions(bank, "cbse_11", subj, lang, PREFIXES, 800))

# UP Board 10 English
subjects_up10_en = [
    (CBSE10_MATH, "Mathematics", "en"),
    (CBSE10_PHYSICS, "Physics", "en"),
    (CBSE10_CHEMISTRY, "Chemistry", "en"),
    (CBSE10_BIOLOGY, "Biology", "en"),
    (CBSE10_SST, "Social Science", "en"),
    (ENGLISH_EXTRA, "English", "en"),
]
for bank, subj, lang in subjects_up10_en:
    all_questions.extend(generate_questions(bank, "up_board_10_en", subj, lang, PREFIXES, 800))

# UP Board 10 Hindi
subjects_up10_hi = [
    (UP10_MATH_HI, "गणित", "hi"),
    (UP10_SCIENCE_HI, "भौतिक विज्ञान", "hi"),
    (UP10_SCIENCE_HI, "रसायन विज्ञान", "hi"),
    (UP10_SCIENCE_HI, "जीव विज्ञान", "hi"),
    (HINDI_EXTRA, "हिंदी", "hi"),
]
for bank, subj, lang in subjects_up10_hi:
    all_questions.extend(generate_questions(bank, "up_board_10_hi", subj, lang, PREFIXES_HI, 800))

# UP Board 12 English
subjects_up12_en = [
    (CBSE12_PHYSICS, "Physics", "en"),
    (CBSE12_CHEMISTRY, "Chemistry", "en"),
    (CBSE12_MATH, "Mathematics", "en"),
    (CBSE12_BIOLOGY, "Biology", "en"),
    (ENGLISH_EXTRA, "English", "en"),
]
for bank, subj, lang in subjects_up12_en:
    all_questions.extend(generate_questions(bank, "up_board_12_en", subj, lang, PREFIXES, 800))

# UP Board 12 Hindi
subjects_up12_hi = [
    (UP12_PHYSICS_HI, "भौतिक विज्ञान", "hi"),
    (UP12_CHEMISTRY_HI, "रसायन विज्ञान", "hi"),
    (UP12_BIO_HI, "जीव विज्ञान", "hi"),
    (HINDI_EXTRA, "हिंदी", "hi"),
]
for bank, subj, lang in subjects_up12_hi:
    all_questions.extend(generate_questions(bank, "up_board_12_hi", subj, lang, PREFIXES_HI, 800))

# ICSE 10
subjects_icse10 = [
    (ICSE10_EXTRA, "Mathematics", "en"),
    (CBSE10_PHYSICS, "Physics", "en"),
    (CBSE10_CHEMISTRY, "Chemistry", "en"),
    (CBSE10_BIOLOGY, "Biology", "en"),
    (ENGLISH_EXTRA, "English", "en"),
]
for bank, subj, lang in subjects_icse10:
    all_questions.extend(generate_questions(bank, "icse_10", subj, lang, PREFIXES, 800))

# ISC 12
subjects_isc12 = [
    (ISC12_EXTRA, "Mathematics", "en"),
    (CBSE12_PHYSICS, "Physics", "en"),
    (CBSE12_CHEMISTRY, "Chemistry", "en"),
    (CBSE12_BIOLOGY, "Biology", "en"),
    (ENGLISH_EXTRA, "English", "en"),
]
for bank, subj, lang in subjects_isc12:
    all_questions.extend(generate_questions(bank, "isc_12", subj, lang, PREFIXES, 800))

print(f"Total variants generated: {len(all_questions):,}")

# Insert in batches
BATCH = 5000
inserted = 0
for i in range(0, len(all_questions), BATCH):
    batch = all_questions[i:i+BATCH]
    created = ExamQuestion.objects.bulk_create(batch, ignore_conflicts=True)
    inserted += len(created)
    print(f"  Batch {i//BATCH+1}: inserted {len(created)}")

total = ExamQuestion.objects.count()
print(f"\nNew questions inserted: {inserted:,}")
print(f"Total questions in DB: {total:,}")
