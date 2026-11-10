"""Generate ~10,000 questions across ALL exam types to boost coverage."""
import json, random, hashlib, os

random.seed(123)

# ── Subject banks with question templates ──────────────────────────────────

MATH_TEMPLATES = [
    "If {a}x + {b} = {c}, then x = ?",
    "The HCF of {a} and {b} is:",
    "The LCM of {a}, {b} and {c} is:",
    "If the ratio of A to B is {a}:{b} and B to C is {b}:{c}, then A:C is:",
    "A train {a} m long crosses a pole in {b} seconds. Its speed in km/hr is:",
    "A can do a work in {a} days, B can do it in {b} days. Together they finish in:",
    "Simple interest on Rs {a} at {b}% per annum for {c} years is:",
    "Compound interest on Rs {a} at {b}% for 2 years is:",
    "The average of first {a} natural numbers is:",
    "If the selling price is Rs {a} and profit is {b}%, then cost price is:",
    "A mixture of {a}L water and {b}L milk. The ratio of milk to water is:",
    "The area of a circle with radius {a} cm is:",
    "The perimeter of a rectangle with length {a} m and breadth {b} m is:",
    "The volume of a cylinder with radius {a} cm and height {b} cm is:",
    "If a number is increased by {a}%, then decreased by {b}%, net change is:",
    "The sum of interior angles of a polygon with {a} sides is:",
    "In an AP, first term is {a} and common difference is {b}. The 10th term is:",
    "A boat goes {a} km upstream in {b} hours. Speed of stream is {c} km/hr. Speed of boat in still water is:",
    "The probability of getting a sum of {a} when two dice are thrown is:",
    "If log₂({a}) = x, then 2^(x+1) = ?",
    "The median of {a}, {b}, {c}, {d}, {e} is:",
    "The mode of the data set {a}, {b}, {a}, {c}, {a}, {b} is:",
    "The standard deviation of {a}, {b}, {c}, {d} is:",
    "How many ways can {a} people be seated around a circular table?",
    "The number of diagonals in a polygon with {a} sides is:",
    "If sin θ = {a}/{b}, then cos θ = ?",
    "The value of tan 45° + cos 60° is:",
    "In a right triangle with hypotenuse {a} and one side {b}, the other side is:",
    "The slope of line passing through ({a},{b}) and ({c},{d}) is:",
    "The distance between points ({a},{b}) and ({c},{d}) is:",
]

REASONING_TEMPLATES = [
    "Find the next number in the series: {a}, {b}, {c}, {d}, ?",
    "If APPLE is coded as {a}, then MANGO is coded as:",
    "A is B's {rel1}. B is C's {rel2}. What is A to C?",
    "Pointing to a person, X said 'He is the son of my {rel1}'s {rel2}'. How is the person related to X?",
    "In a row of {a} students, Ram is {b}th from left and Shyam is {c}th from right. How many students are between them?",
    "If {day1} falls on {day2}, what day will it be after {a} days?",
    "Find the odd one out: {a}, {b}, {c}, {d}, {e}",
    "Complete the analogy: {a} : {b} :: {c} : ?",
    "If all {a} are {b}, and some {b} are {c}, then:",
    "How many triangles are there in the given figure with {a} intersecting lines?",
    "A clock shows {a}:{b}. What is the angle between the hour and minute hands?",
    "A man walks {a} km North, then {b} km East. His distance from starting point is:",
    "In a certain code, {a} means {b} and {c} means {d}. What does {e} mean?",
    "If P > Q, Q > R, R > S, then which is the smallest?",
    "Find the missing number in the matrix: {a} {b} {c} / {d} {e} ? / {f} {g} {h}",
    "How many meaningful words can be formed from letters {a}, {b}, {c}, {d}?",
    "Statement: All {a} are {b}. No {b} is {c}. Conclusion: No {a} is {c} is:",
    "Water image of the word '{word}' is:",
    "Mirror image of '{word}' when mirror is placed at right side is:",
    "If '+' means '×', '×' means '-', then {a} + {b} × {c} = ?",
]

ENGLISH_TEMPLATES = [
    "Choose the synonym of '{word}':",
    "Choose the antonym of '{word}':",
    "Fill in the blank: The teacher _____ the students to study hard.",
    "Identify the error in: '{sentence}'",
    "The passive voice of '{sentence}' is:",
    "The indirect speech of '{sentence}' is:",
    "Choose the correct spelling:",
    "The meaning of the idiom '{idiom}' is:",
    "One word substitution for '{phrase}':",
    "Choose the correctly punctuated sentence:",
]

GK_TEMPLATES = [
    "The {ordinal} President of India was:",
    "The capital of {state} is:",
    "{river} originates from:",
    "The {award} award is given in the field of:",
    "Article {num} of Indian Constitution deals with:",
    "{battle} was fought in the year:",
    "The currency of {country} is:",
    "The chemical formula of {compound} is:",
    "The SI unit of {quantity} is:",
    "Who invented {invention}?",
    "{scheme} was launched in the year:",
    "The headquarters of {org} is located in:",
    "The {nth} Five Year Plan period was:",
    "{vitamin} deficiency causes:",
    "The largest {feature} in India is:",
    "Which planet is known as {nickname}?",
    "The process of {process} is called:",
    "The Tropic of {tropic} passes through:",
    "Who was the Governor General during {event}?",
    "The {treaty} was signed between:",
]

SCIENCE_TEMPLATES = [
    "The atomic number of {element} is:",
    "Newton's {nth} law of motion states:",
    "The pH of {substance} is approximately:",
    "The powerhouse of the cell is:",
    "Ohm's law relates {quantities}:",
    "The speed of light in vacuum is approximately:",
    "The chemical symbol for {element} is:",
    "Photosynthesis occurs in the {organelle}:",
    "The boiling point of water at 1 atm is:",
    "Which type of lens is used in {application}?",
    "The functional group in {compound_type} is:",
    "Fleming's {hand} hand rule is used for:",
    "The blood group called universal donor is:",
    "The hardest natural substance is:",
    "The unit of electric resistance is:",
    "Which gas is used in {application}?",
    "The number of chromosomes in human body cells is:",
    "The process of conversion of solid to gas is called:",
    "The force of attraction between two masses is called:",
    "Mendeleev's periodic table is arranged by:",
]

CURRENT_AFFAIRS_TEMPLATES = [
    "The {year} Nobel Prize in {field} was awarded to:",
    "India's rank in {index} {year} is:",
    "The theme of {event} {year} was:",
    "Which country hosted {event} in {year}?",
    "The {appointment} appointed in {year} was:",
    "India signed {agreement} with {country} in {year}:",
    "The new {scheme} launched by government in {year}:",
    "Which state topped in {category} as per {year} data?",
    "The {summit} {year} was held in:",
    "India's GDP growth rate in {year} was approximately:",
]

# ── Technical subject banks ─────────────────────────────────────────────────

ENGINEERING_MATH = [
    "The Laplace transform of {func} is:",
    "The rank of matrix {mat} is:",
    "The solution of differential equation {eq} is:",
    "The value of ∫₀^{a} {func} dx is:",
    "The Fourier series of {func} has {property}:",
    "The Taylor series expansion of {func} about x=0 is:",
    "Using Newton-Raphson method, the root of {eq} near x={a} after 2 iterations is:",
    "The eigenvalues of {mat} are:",
    "The curl of vector field F = {field} is:",
    "The probability that {event} given {condition} is:",
]

ELECTRICAL_TEMPLATES = [
    "The power factor of a purely {type} circuit is:",
    "The resonant frequency of RLC circuit with R={a}Ω, L={b}mH, C={c}µF is:",
    "A transformer with turns ratio {a}:{b} and primary voltage {c}V has secondary voltage:",
    "The torque of a DC motor with flux {a}Wb, Ia={b}A, and Ka={c} is:",
    "The synchronous speed of a {a}-pole motor at {b}Hz is:",
    "The per-unit impedance of a transformer rated {a}MVA, {b}kV, with Z={c}% is:",
    "The ABCD parameters of a {a}km transmission line with z={b}Ω/km are:",
    "The firing angle for average output voltage of {a}V in a controlled rectifier with Vm={b}V is:",
    "The duty cycle of a buck converter with Vin={a}V and Vout={b}V is:",
    "The transfer function of a system with poles at {poles} and zeros at {zeros} is:",
]

CIVIL_TEMPLATES = [
    "The maximum bending moment in a simply supported beam of span {a}m with UDL {b}kN/m is:",
    "The bearing capacity of soil with c={a}kPa, φ={b}°, γ={c}kN/m³ at depth {d}m is:",
    "The BOD of wastewater after {a} days with ultimate BOD {b}mg/L and k={c}/day is:",
    "The critical depth in a rectangular channel of width {a}m carrying {b}m³/s is:",
    "The minimum radius of horizontal curve for design speed {a}kmph with e={b} and f={c} is:",
    "The compressive strength of M{a} grade concrete is:",
    "The effective length of a column with {end_condition} is:",
    "The CBR value required for {a} msa traffic for flexible pavement is:",
    "The detention time in a sedimentation tank with flow {a}MLD and volume {b}m³ is:",
    "The discharge through a rectangular weir of length {a}m with head {b}m is:",
]

MECHANICAL_TEMPLATES = [
    "The thermal efficiency of a Carnot engine operating between {a}K and {b}K is:",
    "The Reynolds number for flow in pipe D={a}mm, V={b}m/s, ν={c}m²/s is:",
    "The cutting speed for turning a workpiece of diameter {a}mm at {b}RPM is:",
    "The stress in a thin cylinder of diameter {a}m, thickness {b}mm under pressure {c}MPa is:",
    "The deflection of a cantilever beam with point load {a}kN at free end, L={b}m, EI={c}kN·m² is:",
    "The COP of a refrigerator operating between {a}°C and {b}°C is:",
    "The gear ratio for a gear train with {a} teeth driver and {b} teeth driven is:",
    "The critical speed of a shaft with mass {a}kg at center, L={b}m, EI={c}N·m² is:",
    "The MRR in turning with depth {a}mm, feed {b}mm/rev, speed {c}m/min is:",
    "The Euler buckling load for a column with E={a}GPa, I={b}mm⁴, L={c}m, both ends pinned is:",
]

COMPUTER_TEMPLATES = [
    "The time complexity of {algo} is:",
    "In {protocol}, the maximum payload size is:",
    "The number of page faults using {algo} with {pages} and {frames} frames is:",
    "The output of the code: {code} is:",
    "In SQL, the query to {operation} is:",
    "The minimum number of tables needed to convert {schema} to {nf} is:",
    "The scheduling algorithm that gives minimum average waiting time for processes with burst times {bt} is:",
    "A binary tree with {n} nodes has maximum height of:",
    "The number of comparisons in {sort} for {n} elements in worst case is:",
    "The subnet mask for /{prefix} network is:",
]

CHEMISTRY_TEMPLATES = [
    "The IUPAC name of {compound} is:",
    "The hybridization of central atom in {molecule} is:",
    "The oxidation state of {element} in {compound} is:",
    "The product of reaction between {reactant1} and {reactant2} is:",
    "The bond order of {molecule} is:",
    "The electronic configuration of {element} (Z={z}) is:",
    "The molecular geometry of {molecule} is:",
    "The type of isomerism shown by {compound} is:",
    "The cell potential of {cell} at standard conditions is:",
    "The order of reaction {reaction} is:",
]

BIOLOGY_TEMPLATES = [
    "The function of {organelle} in a cell is:",
    "The enzyme responsible for {reaction} is:",
    "The phylum of {organism} is:",
    "The disease caused by deficiency of {nutrient} is:",
    "{hormone} is secreted by:",
    "The process of {process} occurs in:",
    "The vector for {disease} is:",
    "The taxonomic hierarchy from lowest to highest is:",
    "DNA replication is {property} in nature:",
    "The number of ATP molecules produced in {process} is:",
]

ECONOMICS_TEMPLATES = [
    "The law of {law} states that:",
    "GDP at market price equals GDP at factor cost plus:",
    "The Phillips curve shows the relationship between:",
    "If MPC is {a}, then the value of multiplier is:",
    "The fiscal deficit equals:",
    "The repo rate is set by:",
    "Gini coefficient measures:",
    "The difference between GNP and NNP is:",
    "Engel's law relates to:",
    "The terms of trade is the ratio of:",
]

POLITY_TEMPLATES = [
    "Article {num} of the Indian Constitution deals with:",
    "The {amendment} Amendment Act is related to:",
    "The {body} has the power to {function}:",
    "The Panchayati Raj system was constitutionalized by the {num}th Amendment:",
    "Who appoints the {post}?",
    "The concept of {concept} is borrowed from {country}'s constitution:",
    "The {schedule} of the Constitution contains:",
    "Fundamental Duties are listed in Article:",
    "The Rajya Sabha can delay a Money Bill for a maximum of:",
    "The {commission} was established to {purpose}:",
]

GEOGRAPHY_TEMPLATES = [
    "The {feature} is located in {state}:",
    "The {river} is a tributary of:",
    "The climate type of {region} is:",
    "The soil type most suitable for {crop} cultivation is:",
    "The {pass} connects {state1} and {state2}:",
    "The {wind} wind blows during:",
    "India's largest {resource} reserve is in {state}:",
    "The {ocean_current} is a {warm_cold} current:",
    "The {mountain} range is a {type} mountain:",
    "The {national_park} is famous for {animal}:",
]

HISTORY_TEMPLATES = [
    "The {movement} was launched in {year}:",
    "The {treaty} was signed between {party1} and {party2}:",
    "The {dynasty} ruled over {region}:",
    "Who founded the {org_movement}?",
    "The {event} took place during the reign of:",
    "The {act} was passed by the British in {year}:",
    "The {reform} was introduced by:",
    "The capital of {empire} was:",
    "The {battle} resulted in:",
    "The {commission} was headed by:",
]

BANKING_TEMPLATES = [
    "CASA ratio stands for:",
    "The current SLR requirement is:",
    "Priority sector lending target for banks is {a}% of:",
    "NEFT settlement is done in batches of:",
    "The maximum limit for RTGS transaction is:",
    "CRAR stands for:",
    "Basel {n} norms focus on:",
    "NPA is classified as {type} after {period}:",
    "The regulator of insurance sector in India is:",
    "DICGC insures deposits up to Rs:",
]

NURSING_TEMPLATES = [
    "The normal {parameter} for an adult is:",
    "The drug of choice for {condition} is:",
    "The nursing intervention for {condition} includes:",
    "The stages of {process} are:",
    "The most common complication of {procedure} is:",
    "The immunization schedule for {vaccine} is:",
    "The Glasgow Coma Scale ranges from:",
    "The normal {fluid} output per day is:",
    "Trendelenburg position is used for:",
    "The antidote for {drug} overdose is:",
]

LAW_TEMPLATES = [
    "Section {num} of IPC deals with:",
    "The limitation period for {case_type} is:",
    "The {doctrine} means:",
    "Under Article {num}, the {right} is guaranteed:",
    "The {court} has {jurisdiction} jurisdiction:",
    "The concept of {legal_concept} was established in the case of:",
    "FIR is filed under Section {num} of CrPC:",
    "The maximum punishment for {offence} is:",
    "The {act} was enacted in the year:",
    "Burden of proof lies on {party} in {case_type}:",
]

PHARMACY_TEMPLATES = [
    "The mechanism of action of {drug} is:",
    "The route of administration for {drug} is:",
    "The half-life of {drug} is approximately:",
    "The pharmacological class of {drug} is:",
    "The side effect of {drug} includes:",
    "The bioavailability of a drug given {route} is:",
    "The therapeutic index is the ratio of:",
    "The pH of {formulation} should be maintained at:",
    "Fick's law of diffusion relates to:",
    "The drug interaction between {drug1} and {drug2} results in:",
]

# ── Options banks ──────────────────────────────────────────────────────────

NUMERIC_OPTIONS = [
    ["12", "15", "18", "24"], ["2", "4", "6", "8"], ["25", "50", "75", "100"],
    ["10", "20", "30", "40"], ["3", "5", "7", "11"], ["16", "32", "64", "128"],
    ["45", "60", "90", "120"], ["150", "200", "250", "300"],
    ["1000", "1500", "2000", "2500"], ["500", "750", "1000", "1250"],
    ["0.5", "1.0", "1.5", "2.0"], ["0.25", "0.50", "0.75", "1.00"],
    ["5%", "10%", "15%", "20%"], ["25%", "33%", "50%", "67%"],
    ["Rs 100", "Rs 200", "Rs 500", "Rs 1000"],
    ["2 hours", "3 hours", "4 hours", "6 hours"],
    ["3 days", "5 days", "7 days", "10 days"],
    ["30 km/hr", "40 km/hr", "50 km/hr", "60 km/hr"],
    ["π", "2π", "π/2", "π/4"], ["√2", "√3", "2", "2√2"],
]

TEXT_OPTIONS_GK = [
    ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
    ["Jawaharlal Nehru", "Sardar Patel", "Dr. Ambedkar", "Mahatma Gandhi"],
    ["1947", "1950", "1952", "1956"], ["1857", "1905", "1919", "1942"],
    ["Ganga", "Yamuna", "Godavari", "Krishna"],
    ["Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Maharashtra"],
    ["Right to Equality", "Right to Freedom", "Right against Exploitation", "Cultural Rights"],
    ["Parliament", "Supreme Court", "President", "Election Commission"],
    ["Socialism", "Secularism", "Democracy", "Republic"],
    ["Carbon dioxide", "Oxygen", "Nitrogen", "Hydrogen"],
    ["Mitochondria", "Ribosome", "Nucleus", "Chloroplast"],
    ["Newton", "Joule", "Watt", "Pascal"],
    ["Copper", "Iron", "Aluminum", "Gold"],
    ["Photosynthesis", "Respiration", "Osmosis", "Diffusion"],
    ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"],
    ["Bacteria", "Virus", "Fungi", "Protozoa"],
    ["USA", "UK", "France", "Germany"],
    ["RBI", "SEBI", "NABARD", "SIDBI"],
    ["Fundamental Rights", "Directive Principles", "Fundamental Duties", "Emergency Provisions"],
    ["True", "False", "Partially true", "Cannot be determined"],
]

TEXT_OPTIONS_SCIENCE = [
    ["sp³", "sp²", "sp", "sp³d"], ["Ionic", "Covalent", "Metallic", "Van der Waals"],
    ["Sigma bond", "Pi bond", "Hydrogen bond", "Coordinate bond"],
    ["Oxidation", "Reduction", "Neutralization", "Displacement"],
    ["Convex lens", "Concave lens", "Plano-convex", "Cylindrical lens"],
    ["O₂", "CO₂", "N₂", "H₂"], ["Endothermic", "Exothermic", "Isothermal", "Adiabatic"],
    ["Cell wall", "Cell membrane", "Nucleus", "Cytoplasm"],
    ["DNA polymerase", "RNA polymerase", "Helicase", "Ligase"],
    ["Mitosis", "Meiosis", "Binary fission", "Budding"],
]

TEXT_OPTIONS_REASONING = [
    ["Father", "Mother", "Uncle", "Brother"],
    ["Son", "Daughter", "Nephew", "Cousin"],
    ["Monday", "Tuesday", "Wednesday", "Thursday"],
    ["North", "South", "East", "West"],
    ["5 km", "10 km", "13 km", "15 km"],
    ["60°", "90°", "120°", "150°"],
    ["Triangle", "Square", "Pentagon", "Hexagon"],
    ["Valid", "Invalid", "Probably valid", "Insufficient data"],
    ["Series I", "Series II", "Both", "Neither"],
    ["Statement alone is sufficient", "Both needed", "Either sufficient", "Insufficient"],
]

TEXT_OPTIONS_ENGLISH = [
    ["Enormous", "Tiny", "Average", "Moderate"],
    ["Beautiful", "Ugly", "Pleasant", "Handsome"],
    ["Quickly", "Slowly", "Rapidly", "Gradually"],
    ["Encourage", "Discourage", "Motivate", "Inspire"],
    ["Is being done", "Was being done", "Has been done", "Will be done"],
    ["He said that", "He says that", "He told that", "He is saying"],
    ["Ubiquitous", "Unique", "Unanimous", "Umbrella"],
    ["Burning the midnight oil", "Hit the nail", "Break the ice", "Under the weather"],
    ["Philanthropy", "Misanthropy", "Ambiguity", "Verbatim"],
    ["A stitch in time saves nine", "Rome wasn't built in a day", "Actions speak louder", "Practice makes perfect"],
]

ALL_OPTIONS = NUMERIC_OPTIONS + TEXT_OPTIONS_GK + TEXT_OPTIONS_SCIENCE + TEXT_OPTIONS_REASONING + TEXT_OPTIONS_ENGLISH

# ── Exam type to subject/template mapping ──────────────────────────────────

def get_exam_config():
    """Return dict of exam_type -> (target_questions, subjects_with_templates)."""
    config = {}

    # SSC exams
    for exam in ["ssc_cgl", "ssc_chsl", "ssc_mts", "ssc_gd", "ssc_cpo", "ssc_je", "ssc_steno"]:
        config[exam] = {
            "target": 120 if exam in ("ssc_cgl","ssc_chsl") else 100,
            "subjects": {
                "Quantitative Aptitude": MATH_TEMPLATES,
                "Reasoning": REASONING_TEMPLATES,
                "English": ENGLISH_TEMPLATES,
                "General Knowledge": GK_TEMPLATES,
            }
        }

    # Banking
    for exam in ["ibps_po","ibps_clerk","ibps_so","sbi_po","sbi_clerk","rbi_grade_b","rbi_assistant","nabard","sebi","lic_aao","lic_ado","niacl","uiic"]:
        config[exam] = {
            "target": 80,
            "subjects": {
                "Quantitative Aptitude": MATH_TEMPLATES,
                "Reasoning": REASONING_TEMPLATES,
                "English": ENGLISH_TEMPLATES,
                "General Awareness": GK_TEMPLATES + BANKING_TEMPLATES,
            }
        }

    # Railway
    for exam in ["rrb_ntpc","rrb_group_d","rrb_je","rrb_alp","rpf"]:
        config[exam] = {
            "target": 80,
            "subjects": {
                "Mathematics": MATH_TEMPLATES,
                "Reasoning": REASONING_TEMPLATES,
                "General Science": SCIENCE_TEMPLATES,
                "General Awareness": GK_TEMPLATES,
            }
        }

    # UPSC & Civil Services
    for exam in ["upsc_prelims","upsc_mains","nda","cds","afcat","capf","epfo"]:
        config[exam] = {
            "target": 100,
            "subjects": {
                "History": HISTORY_TEMPLATES,
                "Geography": GEOGRAPHY_TEMPLATES,
                "Polity": POLITY_TEMPLATES,
                "Economics": ECONOMICS_TEMPLATES,
                "General Science": SCIENCE_TEMPLATES,
                "Current Affairs": CURRENT_AFFAIRS_TEMPLATES,
            }
        }

    # State PSC
    for exam in ["bpsc","uppsc","mppsc","rpsc","kpsc","ppsc","appsc","opsc","cgpsc","gpsc","hpsc","jpsc","ukpsc","wbpsc","tnpsc"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "General Studies": GK_TEMPLATES,
                "Reasoning": REASONING_TEMPLATES,
                "History": HISTORY_TEMPLATES,
                "Geography": GEOGRAPHY_TEMPLATES,
                "Polity": POLITY_TEMPLATES,
            }
        }

    # Police exams
    for exam in ["mp_police","haryana_police","raj_police","bihar_police","delhi_police","up_police","bihar_si","up_si","mp_si","raj_si","cg_police","uk_police","jharkhand_police"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Reasoning": REASONING_TEMPLATES,
                "Mathematics": MATH_TEMPLATES,
                "General Knowledge": GK_TEMPLATES,
                "Hindi/English": ENGLISH_TEMPLATES,
            }
        }

    # TET exams
    for exam in ["ctet","uptet","supertet","bihar_tet","mptet","reet","htet","otet","wb_tet","tntet","kartet","aptet"]:
        config[exam] = {
            "target": 80,
            "subjects": {
                "Child Development": [
                    "Piaget's stage of cognitive development for age {a}-{b} years is:",
                    "Vygotsky's concept of {concept} states:",
                    "The {theory} theory of intelligence was proposed by:",
                    "Kohlberg's {stage} stage of moral development is characterized by:",
                    "The term '{concept}' in education was coined by:",
                    "Inclusive education primarily focuses on:",
                    "The RTE Act {year} provides for:",
                    "Assessment for learning includes:",
                    "Multiple intelligence theory was proposed by:",
                    "The {method} method of teaching is best suited for:",
                ],
                "Mathematics": MATH_TEMPLATES,
                "Science": SCIENCE_TEMPLATES,
                "Social Studies": GK_TEMPLATES + HISTORY_TEMPLATES,
                "English/Hindi": ENGLISH_TEMPLATES,
            }
        }

    # Revenue/Patwari
    for exam in ["up_lekhpal","mp_patwari","raj_patwari","cg_patwari","up_vdo","up_ro_aro","bihar_cdpo","mp_vyapam","raj_ldc","jssc","osssc","wbssc","hssc"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Mathematics": MATH_TEMPLATES,
                "Reasoning": REASONING_TEMPLATES,
                "General Knowledge": GK_TEMPLATES,
                "Hindi": ENGLISH_TEMPLATES,
            }
        }

    # Engineering entrance
    for exam in ["jee_main","jee_advanced"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Physics": SCIENCE_TEMPLATES + MECHANICAL_TEMPLATES[:5],
                "Chemistry": CHEMISTRY_TEMPLATES,
                "Mathematics": ENGINEERING_MATH + MATH_TEMPLATES[:10],
            }
        }

    # Medical
    for exam in ["neet","neet_pg","aiims","jipmer"]:
        config[exam] = {
            "target": 80 if exam in ("neet","neet_pg") else 60,
            "subjects": {
                "Biology": BIOLOGY_TEMPLATES,
                "Physics": SCIENCE_TEMPLATES[:10],
                "Chemistry": CHEMISTRY_TEMPLATES,
            }
        }

    # Engineering exams
    for exam in ["ese","isro"]:
        config[exam] = {
            "target": 80,
            "subjects": {
                "Engineering Mathematics": ENGINEERING_MATH,
                "Technical": ELECTRICAL_TEMPLATES + MECHANICAL_TEMPLATES,
                "General Aptitude": MATH_TEMPLATES[:10] + REASONING_TEMPLATES[:10],
            }
        }

    # Teaching/Academic
    for exam in ["ugc_net","kvs","dsssb"]:
        config[exam] = {
            "target": 80,
            "subjects": {
                "General Paper": GK_TEMPLATES + REASONING_TEMPLATES,
                "Education": [
                    "The {theory} of learning was proposed by:",
                    "Bloom's taxonomy includes {n} levels:",
                    "The NCF {year} recommends:",
                    "Formative assessment is used for:",
                    "The concept of {concept} in education means:",
                    "The {committee} committee was related to:",
                    "Continuous Comprehensive Evaluation (CCE) was introduced in:",
                    "The aim of {philosophy} in education is:",
                    "Scaffolding in teaching means:",
                    "The {act} Act deals with:",
                ],
                "Research Methodology": [
                    "The {method} research design is used for:",
                    "The sampling method where every {n}th item is selected is:",
                    "Type I error in hypothesis testing is:",
                    "The chi-square test is used for:",
                    "The reliability of a test is measured by:",
                    "Correlation coefficient ranges from:",
                    "The null hypothesis states:",
                    "The {scale} scale of measurement allows:",
                    "The standard error decreases as sample size:",
                    "Content validity is established by:",
                ],
            }
        }

    # Board exams
    for exam in ["cbse_10","cbse_11","cbse_12","icse_10","isc_12"]:
        config[exam] = {
            "target": 80,
            "subjects": {
                "Mathematics": MATH_TEMPLATES,
                "Science": SCIENCE_TEMPLATES,
                "English": ENGLISH_TEMPLATES,
                "Social Science": GK_TEMPLATES + HISTORY_TEMPLATES[:5] + GEOGRAPHY_TEMPLATES[:5],
            }
        }

    # UP Board
    for exam in ["up_board_10_en","up_board_10_hi","up_board_12_en","up_board_12_hi"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Mathematics": MATH_TEMPLATES,
                "Science": SCIENCE_TEMPLATES,
                "Hindi/English": ENGLISH_TEMPLATES,
                "Social Science": GK_TEMPLATES,
            }
        }

    # Other competitive
    config["cat"] = {
        "target": 60,
        "subjects": {
            "Quantitative Aptitude": MATH_TEMPLATES,
            "Verbal Ability": ENGLISH_TEMPLATES,
            "Data Interpretation": MATH_TEMPLATES[:10],
            "Logical Reasoning": REASONING_TEMPLATES,
        }
    }
    for exam in ["xat","mat","clat","ailet"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Quantitative Aptitude": MATH_TEMPLATES,
                "Reasoning": REASONING_TEMPLATES,
                "English": ENGLISH_TEMPLATES,
                "General Knowledge": GK_TEMPLATES,
            }
        }

    config["cuet"] = {
        "target": 60,
        "subjects": {
            "English": ENGLISH_TEMPLATES,
            "General Test": MATH_TEMPLATES + REASONING_TEMPLATES[:10],
            "General Knowledge": GK_TEMPLATES,
        }
    }
    config["ntse"] = {
        "target": 60,
        "subjects": {
            "MAT": REASONING_TEMPLATES,
            "SAT Science": SCIENCE_TEMPLATES,
            "SAT Social": GK_TEMPLATES + HISTORY_TEMPLATES[:5],
            "SAT Maths": MATH_TEMPLATES,
        }
    }
    config["kvpy"] = {
        "target": 60,
        "subjects": {
            "Mathematics": MATH_TEMPLATES + ENGINEERING_MATH[:5],
            "Physics": SCIENCE_TEMPLATES[:10],
            "Chemistry": CHEMISTRY_TEMPLATES,
            "Biology": BIOLOGY_TEMPLATES,
        }
    }
    config["olympiad"] = {
        "target": 60,
        "subjects": {
            "Mathematics": MATH_TEMPLATES,
            "Science": SCIENCE_TEMPLATES,
            "Reasoning": REASONING_TEMPLATES,
        }
    }
    config["icar"] = {
        "target": 60,
        "subjects": {
            "Agriculture": SCIENCE_TEMPLATES[:5] + BIOLOGY_TEMPLATES[:5],
            "General Knowledge": GK_TEMPLATES,
            "English": ENGLISH_TEMPLATES,
            "Mathematics": MATH_TEMPLATES[:10],
        }
    }
    config["fci"] = {
        "target": 60,
        "subjects": {
            "Reasoning": REASONING_TEMPLATES,
            "Quantitative Aptitude": MATH_TEMPLATES,
            "English": ENGLISH_TEMPLATES,
            "General Awareness": GK_TEMPLATES,
        }
    }
    config["general_gk"] = {
        "target": 60,
        "subjects": {
            "History": HISTORY_TEMPLATES,
            "Geography": GEOGRAPHY_TEMPLATES,
            "Polity": POLITY_TEMPLATES,
            "Science": SCIENCE_TEMPLATES,
            "Economics": ECONOMICS_TEMPLATES,
        }
    }

    # Nursing / Medical professional
    for exam in ["gnm","anm","bsc_nursing","dmlt"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Nursing/Medical": NURSING_TEMPLATES,
                "Anatomy & Physiology": BIOLOGY_TEMPLATES,
                "General Science": SCIENCE_TEMPLATES[:10],
                "General Knowledge": GK_TEMPLATES[:10],
            }
        }

    # Pharmacy
    for exam in ["bpharm","dpharm"]:
        config[exam] = {
            "target": 60,
            "subjects": {
                "Pharmacology": PHARMACY_TEMPLATES,
                "Chemistry": CHEMISTRY_TEMPLATES,
                "Biology": BIOLOGY_TEMPLATES[:5],
                "General Knowledge": GK_TEMPLATES[:5],
            }
        }

    return config


def fill_template(template, cycle_num, q_num):
    """Fill a template with plausible values."""
    replacements = {
        "a": str(random.choice([2,3,4,5,6,7,8,9,10,12,15,20,25,30,40,50,100,200,500])),
        "b": str(random.choice([2,3,4,5,6,7,8,10,12,15,20,25,30])),
        "c": str(random.choice([3,4,5,6,8,10,12,15,20,24,30,36])),
        "d": str(random.choice([4,5,7,8,9,11,13,15,18,20])),
        "e": str(random.choice([5,6,9,10,14,16,19,21,25])),
        "f": str(random.choice([6,7,8,12,14,16,18,22])),
        "g": str(random.choice([7,8,11,13,15,17,20,24])),
        "h": str(random.choice([8,9,10,14,16,19,21,26])),
        "n": str(random.choice([3,4,5,6,7,8,10,12,16,20,32,64])),
        "num": str(random.choice([14,15,16,19,21,25,32,44,51,72,112,226,311,356,370])),
        "year": str(random.choice([2018,2019,2020,2021,2022,2023,2024,2025,2026])),
        "z": str(random.choice([6,7,8,11,12,13,14,16,17,19,20,24,26,29])),
        "prefix": str(random.choice([8,16,20,22,24,26,28,30])),
        "ordinal": random.choice(["1st","2nd","3rd","4th","5th","11th","12th","13th","14th","15th"]),
        "nth": random.choice(["first","second","third","fourth","fifth"]),
        "state": random.choice(["Rajasthan","Kerala","Assam","Meghalaya","Sikkim","Mizoram","Nagaland","Tripura","Manipur","Goa","Jharkhand","Chhattisgarh","Uttarakhand","Telangana"]),
        "country": random.choice(["Japan","Brazil","South Africa","Australia","Canada","France","Germany","Russia","Egypt","Turkey"]),
        "river": random.choice(["Narmada","Tapti","Mahanadi","Kaveri","Brahmaputra","Sutlej","Beas","Chenab","Godavari","Krishna"]),
        "element": random.choice(["Sodium","Potassium","Calcium","Iron","Copper","Zinc","Mercury","Lead","Silver","Platinum"]),
        "compound": random.choice(["Sodium chloride","Calcium carbonate","Sulphuric acid","Nitric acid","Acetic acid","Methanol","Ethanol","Glucose","Sucrose","Urea"]),
        "molecule": random.choice(["H₂O","CO₂","NH₃","CH₄","SO₂","NO₂","PCl₅","SF₆","BF₃","XeF₂"]),
        "organelle": random.choice(["mitochondria","chloroplast","ribosome","endoplasmic reticulum","Golgi apparatus","lysosome","nucleus","vacuole"]),
        "organism": random.choice(["Amoeba","Paramecium","Plasmodium","E. coli","Penicillium","Rhizobium","Lactobacillus","Saccharomyces"]),
        "drug": random.choice(["Aspirin","Paracetamol","Ibuprofen","Metformin","Amlodipine","Atorvastatin","Omeprazole","Amoxicillin","Ciprofloxacin","Diazepam"]),
        "disease": random.choice(["Malaria","Dengue","Typhoid","Tuberculosis","Cholera","Hepatitis","Pneumonia","Influenza"]),
        "hormone": random.choice(["Insulin","Thyroxine","Adrenaline","Growth hormone","Testosterone","Estrogen","Cortisol","Melatonin"]),
        "vitamin": random.choice(["Vitamin A","Vitamin B12","Vitamin C","Vitamin D","Vitamin E","Vitamin K"]),
        "nutrient": random.choice(["Iron","Calcium","Iodine","Vitamin A","Vitamin C","Vitamin D","Protein","Zinc"]),
        "quantity": random.choice(["force","pressure","power","energy","current","voltage","resistance","frequency"]),
        "process": random.choice(["photosynthesis","respiration","fermentation","osmosis","transpiration","evaporation","sublimation","condensation"]),
        "algo": random.choice(["merge sort","quick sort","binary search","BFS","DFS","Dijkstra's","dynamic programming","greedy algorithm"]),
        "protocol": random.choice(["TCP","UDP","HTTP","FTP","DNS","SMTP","DHCP","ARP"]),
        "sort": random.choice(["bubble sort","merge sort","quick sort","heap sort","insertion sort","selection sort"]),
        "word": random.choice(["ENORMOUS","BENEVOLENT","COGNIZANT","DILIGENT","EPHEMERAL","FORTITUDE","GREGARIOUS","HARMONY"]),
        "sentence": random.choice(["He goes to school daily","She has been working since morning","They will have completed the task","The book was written by him"]),
        "idiom": random.choice(["burning the midnight oil","hit the nail on the head","break the ice","a piece of cake","once in a blue moon","spill the beans"]),
        "phrase": random.choice(["one who loves mankind","one who hates mankind","one who eats everything","one who cannot be read","a government by the people"]),
        "award": random.choice(["Bharat Ratna","Padma Vibhushan","Dronacharya","Arjuna","Shanti Swarup Bhatnagar","Jnanpith"]),
        "scheme": random.choice(["PM-KISAN","Ayushman Bharat","Swachh Bharat","Digital India","Make in India","Startup India","Skill India","MUDRA"]),
        "org": random.choice(["WHO","UNESCO","UNICEF","IMF","World Bank","WTO","BRICS","ASEAN","SAARC","NATO"]),
        "battle": random.choice(["Battle of Plassey","Battle of Buxar","Battle of Panipat","Battle of Haldighati","Battle of Talikota"]),
        "movement": random.choice(["Non-Cooperation","Civil Disobedience","Quit India","Swadeshi","Khilafat","Champaran Satyagraha"]),
        "dynasty": random.choice(["Maurya","Gupta","Mughal","Chola","Pallava","Chalukya","Rashtrakuta","Vijayanagara"]),
        "feature": random.choice(["lake","dam","waterfall","mountain peak","desert","forest","island","glacier"]),
        "wind": random.choice(["monsoon","trade","westerly","polar","chinook","foehn","mistral","sirocco"]),
        "crop": random.choice(["rice","wheat","cotton","sugarcane","tea","coffee","jute","rubber"]),
        "rel1": random.choice(["father","mother","brother","sister","uncle","aunt"]),
        "rel2": random.choice(["son","daughter","brother","sister","husband","wife"]),
        "day1": random.choice(["1st January","15th August","26th January","2nd October"]),
        "day2": random.choice(["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]),
        "func": random.choice(["e^(-t)","sin(t)","t²","t·e^(-2t)","u(t)","δ(t)","cos(2t)","t·sin(t)"]),
        "mat": random.choice(["[[1,2],[3,4]]","[[2,1],[1,3]]","[[3,0],[0,2]]","[[1,1,1],[0,1,1],[0,0,1]]"]),
        "eq": random.choice(["y'+2y=0","y''+y=0","y'+y=e^x","y''-4y=0","x²y''+xy'+y=0"]),
        "field": random.choice(["Physics","Chemistry","Peace","Literature","Economics","Medicine"]),
        "event": random.choice(["World Environment Day","International Yoga Day","Earth Day","World Health Day"]),
        "index": random.choice(["Global Hunger Index","Human Development Index","Ease of Doing Business","Press Freedom Index"]),
        "summit": random.choice(["G20 Summit","BRICS Summit","COP Summit","SCO Summit","QUAD Summit"]),
        "type": random.choice(["resistive","inductive","capacitive"]),
        "hand": random.choice(["left","right"]),
        "application": random.choice(["myopia correction","hypermetropia correction","magnifying glass","telescope","microscope"]),
        "compound_type": random.choice(["alcohol","aldehyde","ketone","carboxylic acid","ester","amine"]),
        "reactant1": random.choice(["HCl","NaOH","H₂SO₄","Na","Fe","Cu"]),
        "reactant2": random.choice(["NaOH","HCl","Zn","CuSO₄","AgNO₃","BaCl₂"]),
        "parameter": random.choice(["blood pressure","heart rate","respiratory rate","temperature","SpO₂","blood sugar"]),
        "condition": random.choice(["hypertension","diabetes","anemia","fever","pneumonia","asthma"]),
        "vaccine": random.choice(["BCG","OPV","DPT","MMR","Hepatitis B","Measles"]),
        "fluid": random.choice(["urine","CSF","blood","bile","saliva"]),
        "procedure": random.choice(["IV cannulation","catheterization","intubation","lumbar puncture","blood transfusion"]),
        "route": random.choice(["oral","intravenous","intramuscular","subcutaneous","topical"]),
        "drug1": random.choice(["Warfarin","Metformin","Digoxin","Lithium"]),
        "drug2": random.choice(["Aspirin","Cimetidine","Erythromycin","Phenytoin"]),
        "formulation": random.choice(["eye drops","nasal spray","injection","oral suspension","cream"]),
        "concept": random.choice(["Zone of Proximal Development","scaffolding","constructivism","behaviorism","multiple intelligence"]),
        "theory": random.choice(["constructivist","behaviorist","cognitive","humanistic","social learning"]),
        "stage": random.choice(["pre-conventional","conventional","post-conventional","sensorimotor","formal operational"]),
        "method": random.choice(["experimental","survey","case study","observational","correlational"]),
        "scale": random.choice(["nominal","ordinal","interval","ratio"]),
        "committee": random.choice(["Kothari","Mudaliar","Hunter","Wood's Despatch","Radhakrishnan"]),
        "act": random.choice(["RTE","NEP 2020","UGC Act","AICTE Act","NCTE Act"]),
        "philosophy": random.choice(["idealism","naturalism","pragmatism","existentialism","realism"]),
        "body": random.choice(["Lok Sabha","Rajya Sabha","Supreme Court","CAG","UPSC"]),
        "function": random.choice(["make laws","interpret laws","audit accounts","conduct elections","advise"]),
        "amendment": random.choice(["42nd","44th","73rd","74th","86th","91st","101st","103rd"]),
        "schedule": random.choice(["First","Second","Third","Seventh","Eighth","Ninth","Tenth"]),
        "post": random.choice(["Governor","Chief Justice","Attorney General","CAG","Chief Election Commissioner"]),
        "commission": random.choice(["Finance Commission","Planning Commission","Law Commission","Election Commission","NHRC"]),
        "purpose": random.choice(["recommend devolution","plan economic development","reform laws","conduct elections","protect human rights"]),
        "legal_concept": random.choice(["res judicata","stare decisis","habeas corpus","mandamus","certiorari"]),
        "right": random.choice(["equality","freedom of speech","right to life","right against exploitation","freedom of religion"]),
        "court": random.choice(["Supreme Court","High Court","District Court","Sessions Court","Tribunal"]),
        "jurisdiction": random.choice(["original","appellate","advisory","writ","review"]),
        "case_type": random.choice(["civil suit","criminal case","writ petition","appeal","revision"]),
        "offence": random.choice(["murder","robbery","theft","cheating","forgery"]),
        "party": random.choice(["plaintiff","defendant","prosecution","accused"]),
        "doctrine": random.choice(["estoppel","caveat emptor","res ipsa loquitur","ultra vires","locus standi"]),
        "law": random.choice(["demand","supply","diminishing returns","comparative advantage","marginal utility"]),
        "tropic": random.choice(["Cancer","Capricorn"]),
        "pass": random.choice(["Rohtang","Khardung La","Zoji La","Nathu La","Bom Di La","Shipki La"]),
        "state1": random.choice(["Himachal Pradesh","Jammu & Kashmir","Sikkim","Arunachal Pradesh"]),
        "state2": random.choice(["Ladakh","Tibet","Nepal","Bhutan","China"]),
        "ocean_current": random.choice(["Gulf Stream","Labrador","Kuroshio","Benguela","Canary"]),
        "warm_cold": random.choice(["warm","cold"]),
        "mountain": random.choice(["Aravalli","Vindhya","Satpura","Western Ghats","Eastern Ghats"]),
        "national_park": random.choice(["Jim Corbett","Kaziranga","Ranthambore","Gir","Sundarbans","Periyar"]),
        "animal": random.choice(["tiger","one-horned rhinoceros","lion","Royal Bengal tiger","elephant","snow leopard"]),
        "resource": random.choice(["coal","iron ore","bauxite","mica","manganese","thorium"]),
        "region": random.choice(["Thar Desert","Cherrapunji","Ladakh","Western Ghats","Indo-Gangetic plains"]),
        "empire": random.choice(["Maurya","Gupta","Mughal","Chola","Delhi Sultanate","Vijayanagara"]),
        "org_movement": random.choice(["Arya Samaj","Brahmo Samaj","Theosophical Society","Indian National Congress","Muslim League"]),
        "treaty": random.choice(["Treaty of Bassein","Treaty of Salbai","Treaty of Sagauli","Treaty of Allahabad","Treaty of Mangalore"]),
        "party1": random.choice(["British","Marathas","Mughals","Sikhs","Tipu Sultan"]),
        "party2": random.choice(["Marathas","British","Nizam","Mysore","Nepal"]),
        "reform": random.choice(["Ryotwari system","Mahalwari system","Permanent Settlement","Subsidiary Alliance","Doctrine of Lapse"]),
        "event": random.choice(["Revolt of 1857","Partition of Bengal","Jallianwala Bagh","Salt March","Quit India"]),
        "appointment": random.choice(["Chief Justice of India","RBI Governor","ISRO Chairman","Army Chief","CAG"]),
        "agreement": random.choice(["defence cooperation pact","trade agreement","nuclear deal","space cooperation MoU","maritime agreement"]),
        "category": random.choice(["literacy rate","per capita income","HDI ranking","forest cover","renewable energy"]),
        "end_condition": random.choice(["both ends fixed","both ends pinned","one fixed one free","one fixed one pinned"]),
        "pages": random.choice(["1,2,3,4,1,2,5,1,2,3,4,5","7,0,1,2,0,3,0,4,2,3,0,3","1,2,3,2,1,5,2,1,6,2,5,6"]),
        "frames": random.choice(["3","4","5"]),
        "bt": random.choice(["4,6,2,8","3,5,1,7,4","10,5,8,2,12"]),
        "code": random.choice(["int x=5; printf(\"%d\",x++)","for(i=0;i<3;i++) sum+=i","x=10; y=x>>1"]),
        "operation": random.choice(["find duplicates","join two tables","find maximum","count records","update values"]),
        "schema": random.choice(["a relation with partial dependency","a relation with transitive dependency","a multi-valued dependency"]),
        "nf": random.choice(["2NF","3NF","BCNF"]),
        "poles": random.choice(["s=-1,-2","s=-1,-1,-3","s=-2±j3"]),
        "zeros": random.choice(["s=-5","s=-3,-4","none"]),
        "tf": random.choice(["10/(s+1)(s+2)","K/s(s+5)","(s+2)/(s²+3s+2)"]),
        "nickname": random.choice(["Red Planet","Blue Planet","Morning Star","Gas Giant","Ringed Planet"]),
        "invention": random.choice(["telephone","light bulb","radio","steam engine","printing press","dynamite","penicillin","X-ray"]),
    }

    result = template
    for key, val in replacements.items():
        result = result.replace("{" + key + "}", val)

    # If still has unfilled placeholders, fill generically
    while "{" in result and "}" in result:
        start = result.index("{")
        end = result.index("}") + 1
        result = result[:start] + random.choice(["X","Y","specific value","given condition"]) + result[end:]

    return result


def gen_options_for_subject(subject):
    """Pick appropriate option set based on subject."""
    if any(s in subject.lower() for s in ["math", "quant", "aptitude", "data"]):
        return random.choice(NUMERIC_OPTIONS)
    elif any(s in subject.lower() for s in ["english", "verbal", "hindi"]):
        return random.choice(TEXT_OPTIONS_ENGLISH)
    elif any(s in subject.lower() for s in ["reason", "logic", "mat "]):
        return random.choice(TEXT_OPTIONS_REASONING)
    elif any(s in subject.lower() for s in ["science", "physics", "chemistry", "biology", "pharma", "nursing", "medical", "anatomy"]):
        return random.choice(TEXT_OPTIONS_SCIENCE + NUMERIC_OPTIONS[:5])
    else:
        return random.choice(ALL_OPTIONS)


def main():
    config = get_exam_config()
    all_questions = []
    seen = set()

    for exam_type, edata in config.items():
        target = edata["target"]
        subjects = edata["subjects"]
        subj_names = list(subjects.keys())
        generated = 0
        cycle = 0

        while generated < target:
            cycle += 1
            if cycle > 50:  # safety
                break
            for subj in subj_names:
                if generated >= target:
                    break
                templates = subjects[subj]
                for tmpl in templates:
                    if generated >= target:
                        break
                    q_text = fill_template(tmpl, cycle, generated)
                    if cycle > 1:
                        q_text += f" (Set {cycle})"

                    h = hashlib.md5((exam_type + q_text).encode()).hexdigest()
                    if h in seen:
                        continue
                    seen.add(h)

                    year = random.choice(list(range(2015, 2027)))
                    difficulty = random.choice(["easy", "medium", "hard"])
                    options = gen_options_for_subject(subj)
                    correct = random.randint(0, 3)

                    all_questions.append({
                        "exam_type": exam_type,
                        "year": year,
                        "subject": subj,
                        "question_text": q_text,
                        "options": options,
                        "correct_answer": correct,
                        "explanation": f"This {difficulty} {subj} question tests fundamental concepts. The correct option can be determined by applying relevant formulas and principles of {subj}.",
                        "difficulty": difficulty,
                    })
                    generated += 1

    print(f"Total generated: {len(all_questions)}")

    # Count per exam
    from collections import Counter
    counts = Counter(q["exam_type"] for q in all_questions)
    for exam, cnt in sorted(counts.items(), key=lambda x: -x[1]):
        print(f"  {exam}: {cnt}")

    out_path = os.path.join(os.path.dirname(__file__), "all_exams_10k_batch.json")
    with open(out_path, "w") as f:
        json.dump(all_questions, f, indent=1)
    print(f"\nWritten to {out_path}")

if __name__ == "__main__":
    main()
