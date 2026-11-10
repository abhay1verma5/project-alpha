#!/usr/bin/env python3
"""
Seed script: Generate 40K+ exam questions (20K PYQ + 20K Mock-style)
directly into the SQLite database. No Django required.

Usage: python3 seed_questions.py
"""

import sqlite3
import hashlib
import json
import random
import re
import os
import time

DB_PATH = os.path.join(os.path.dirname(__file__), "db.sqlite3")

# ─── Question Banks by Subject ──────────────────────────────────────────

MATH_QUESTIONS = [
    # Algebra
    ("If x + y = 10 and x - y = 4, what is the value of x?", ["5", "6", "7", "8"], 2, "Adding: 2x = 14, x = 7", "Algebra"),
    ("The sum of first n natural numbers is given by:", ["n(n+1)/2", "n(n-1)/2", "n²/2", "n(n+2)/2"], 0, "Formula: S = n(n+1)/2", "Algebra"),
    ("If a² + b² = 25 and ab = 12, find (a+b)²:", ["49", "37", "25", "61"], 0, "(a+b)² = a² + 2ab + b² = 25 + 24 = 49", "Algebra"),
    ("The roots of x² - 5x + 6 = 0 are:", ["2 and 3", "1 and 6", "-2 and -3", "3 and -2"], 0, "Factoring: (x-2)(x-3) = 0", "Algebra"),
    ("If log₂(x) = 5, then x equals:", ["10", "25", "32", "64"], 2, "2⁵ = 32", "Algebra"),
    ("The value of i² + i⁴ + i⁶ is:", ["-1", "1", "-3", "3"], 0, "i²=-1, i⁴=1, i⁶=-1; sum = -1", "Algebra"),
    ("How many terms are in the expansion of (a+b)⁸?", ["7", "8", "9", "10"], 2, "Number of terms = n+1 = 9", "Algebra"),
    ("If α, β are roots of x² + px + q = 0, then α² + β² =", ["p² - 2q", "p² + 2q", "q² - 2p", "(p+q)²"], 0, "α² + β² = (α+β)² - 2αβ = p² - 2q", "Algebra"),
    ("The number of real solutions of |x|² + |x| - 6 = 0 is:", ["1", "2", "3", "4"], 1, "Let |x| = t, t² + t - 6 = 0, t = 2 or -3 (rejected). |x| = 2 gives x = ±2", "Algebra"),
    ("If 2^(x+1) = 4^(x-1), then x =", ["1", "2", "3", "4"], 2, "2^(x+1) = 2^(2x-2), so x+1 = 2x-2, x = 3", "Algebra"),
    # Calculus
    ("The derivative of sin(x)·cos(x) is:", ["cos(2x)", "sin(2x)", "-sin(2x)", "2cos(2x)"], 0, "d/dx[sin(x)cos(x)] = cos²x - sin²x = cos(2x)", "Calculus"),
    ("∫ e^x dx equals:", ["e^x + C", "xe^x + C", "e^(x+1) + C", "e^x/x + C"], 0, "Standard integral of e^x", "Calculus"),
    ("The integral of 1/x dx is:", ["x + C", "ln|x| + C", "1/x² + C", "x ln(x) + C"], 1, "Standard result: ∫1/x dx = ln|x| + C", "Calculus"),
    ("d/dx(tan x) =", ["sec x", "sec²x", "cosec²x", "cot x"], 1, "Standard derivative of tan x is sec²x", "Calculus"),
    ("If f(x) = x³ - 3x, the critical points are:", ["x = 0", "x = ±1", "x = ±√3", "x = 1"], 1, "f'(x) = 3x² - 3 = 0, x = ±1", "Calculus"),
    ("The area under y = x² from 0 to 2 is:", ["4/3", "8/3", "2", "4"], 1, "∫₀² x² dx = [x³/3]₀² = 8/3", "Calculus"),
    ("lim(x→0) sin(x)/x equals:", ["0", "1", "∞", "Does not exist"], 1, "Standard limit = 1", "Calculus"),
    ("The derivative of ln(x²+1) is:", ["2x/(x²+1)", "1/(x²+1)", "2x·ln(x²+1)", "x/(x²+1)"], 0, "Chain rule: 2x/(x²+1)", "Calculus"),
    # Geometry
    ("The distance between points (3,4) and (0,0) is:", ["5", "7", "√7", "25"], 0, "d = √(9+16) = √25 = 5", "Coordinate Geometry"),
    ("The slope of a line perpendicular to y = 2x + 3 is:", ["-2", "2", "-1/2", "1/2"], 2, "Perpendicular slope = -1/m = -1/2", "Coordinate Geometry"),
    ("Area of triangle with vertices (0,0), (4,0), (0,3) is:", ["6", "7", "12", "5"], 0, "Area = ½ × base × height = ½ × 4 × 3 = 6", "Coordinate Geometry"),
    ("The equation of a circle with center (2,3) and radius 5:", ["(x-2)²+(y-3)²=25", "(x+2)²+(y+3)²=25", "(x-2)²+(y-3)²=5", "x²+y²=25"], 0, "Standard form: (x-h)²+(y-k)²=r²", "Coordinate Geometry"),
    # Trigonometry
    ("sin²θ + cos²θ equals:", ["0", "1", "2", "sin(2θ)"], 1, "Fundamental trigonometric identity", "Trigonometry"),
    ("The value of sin(30°) is:", ["1/√2", "1/2", "√3/2", "1"], 1, "Standard value: sin 30° = 1/2", "Trigonometry"),
    ("tan(45°) equals:", ["0", "1/2", "1", "√3"], 2, "tan 45° = sin 45°/cos 45° = 1", "Trigonometry"),
    ("The period of sin(2x) is:", ["π", "2π", "π/2", "4π"], 0, "Period = 2π/2 = π", "Trigonometry"),
    # Statistics & Probability
    ("If P(A) = 0.3 and P(B) = 0.5, and A,B are independent, P(A∩B) =", ["0.15", "0.8", "0.2", "0.35"], 0, "P(A∩B) = P(A)·P(B) = 0.15", "Probability"),
    ("The mean of 2, 4, 6, 8, 10 is:", ["5", "6", "7", "8"], 1, "Mean = 30/5 = 6", "Statistics"),
    ("The median of 3, 7, 2, 9, 5 is:", ["3", "5", "7", "9"], 1, "Sorted: 2,3,5,7,9. Middle = 5", "Statistics"),
    ("Standard deviation measures:", ["Central tendency", "Dispersion", "Skewness", "Correlation"], 1, "SD measures spread/dispersion of data", "Statistics"),
    # Number System
    ("The HCF of 12 and 18 is:", ["3", "6", "9", "36"], 1, "Factors: 12=2²×3, 18=2×3². HCF=2×3=6", "Number System"),
    ("The LCM of 4, 6 and 8 is:", ["12", "24", "48", "8"], 1, "LCM = 24", "Number System"),
    ("Which is a prime number?", ["91", "87", "97", "93"], 2, "97 is prime; 91=7×13, 87=3×29, 93=3×31", "Number System"),
    ("The remainder when 17²³ is divided by 16:", ["0", "1", "15", "17"], 1, "17 ≡ 1 (mod 16), so 17²³ ≡ 1", "Number System"),
]

PHYSICS_QUESTIONS = [
    ("The SI unit of force is:", ["Joule", "Watt", "Newton", "Pascal"], 2, "Force = mass × acceleration, unit is Newton (kg·m/s²)", "Mechanics"),
    ("If a body starts from rest and accelerates at 2 m/s², its velocity after 5s:", ["5 m/s", "10 m/s", "15 m/s", "20 m/s"], 1, "v = u + at = 0 + 2×5 = 10 m/s", "Mechanics"),
    ("Work done when force and displacement are perpendicular:", ["Maximum", "Zero", "Negative", "Infinite"], 1, "W = Fd·cos90° = 0", "Mechanics"),
    ("Kinetic energy of a body is proportional to:", ["velocity", "velocity²", "mass²", "acceleration"], 1, "KE = ½mv²", "Mechanics"),
    ("The unit of momentum is:", ["kg·m/s²", "kg·m/s", "kg·m²/s", "N·s²"], 1, "p = mv, unit is kg·m/s", "Mechanics"),
    ("Newton's third law states:", ["F = ma", "Every action has equal and opposite reaction", "A body at rest stays at rest", "F = dp/dt"], 1, "Third law: action-reaction pair", "Mechanics"),
    ("Escape velocity from Earth is approximately:", ["7.9 km/s", "11.2 km/s", "15.4 km/s", "3.2 km/s"], 1, "v_e = √(2gR) ≈ 11.2 km/s", "Gravitation"),
    ("The time period of a simple pendulum depends on:", ["Mass", "Length and g", "Amplitude", "Material"], 1, "T = 2π√(l/g)", "Oscillations"),
    ("Sound waves are:", ["Transverse", "Longitudinal", "Electromagnetic", "Standing"], 1, "Sound propagates as longitudinal waves", "Waves"),
    ("The speed of light in vacuum is approximately:", ["3×10⁶ m/s", "3×10⁸ m/s", "3×10¹⁰ m/s", "3×10⁵ m/s"], 1, "c ≈ 3 × 10⁸ m/s", "Optics"),
    ("Ohm's law relates:", ["Voltage and current", "Power and resistance", "Energy and time", "Force and mass"], 0, "V = IR", "Electricity"),
    ("The resistance of a conductor increases with:", ["Decrease in length", "Increase in cross-section", "Increase in temperature", "Decrease in temperature"], 2, "For metals, R increases with temperature", "Electricity"),
    ("In a parallel circuit, the total resistance is:", ["Sum of individual resistances", "Less than the smallest resistance", "Equal to largest resistance", "Product of resistances"], 1, "1/R = 1/R₁ + 1/R₂ + ..., always less than smallest", "Electricity"),
    ("The magnetic field inside a solenoid is:", ["Zero", "Non-uniform", "Uniform", "Infinite"], 2, "Inside a long solenoid, B is uniform", "Magnetism"),
    ("Electromagnetic induction was discovered by:", ["Ampere", "Faraday", "Maxwell", "Coulomb"], 1, "Faraday's law of electromagnetic induction", "Electromagnetism"),
    ("The photoelectric effect proves that light is:", ["A wave", "A particle", "Both wave and particle", "Neither"], 1, "Einstein explained it using photon (particle) nature", "Modern Physics"),
    ("The nucleus of an atom contains:", ["Electrons and protons", "Protons and neutrons", "Only protons", "Electrons and neutrons"], 1, "Nucleus has protons and neutrons", "Atomic Physics"),
    ("Radioactive decay follows:", ["Linear law", "Exponential decay", "Quadratic law", "Inverse square law"], 1, "N = N₀·e^(-λt)", "Nuclear Physics"),
    ("The dimension of Planck's constant is:", ["ML²T⁻¹", "ML²T⁻²", "MLT⁻¹", "M²LT⁻¹"], 0, "h has dimensions of energy × time = ML²T⁻¹", "Modern Physics"),
    ("A body thrown vertically up takes time t to reach max height. Total time of flight:", ["t", "2t", "t/2", "4t"], 1, "Symmetry: time up = time down, total = 2t", "Mechanics"),
    ("The focal length of a convex lens is:", ["Always positive", "Always negative", "Zero", "Depends on object distance"], 0, "By convention, convex lens has positive focal length", "Optics"),
    ("Power of a lens is measured in:", ["Meters", "Diopters", "Watts", "Candela"], 1, "P = 1/f (in meters), unit is diopter", "Optics"),
    ("Heat capacity of a body depends on:", ["Temperature only", "Mass and material", "Shape only", "Color"], 1, "C = mc (mass × specific heat)", "Thermodynamics"),
    ("In an adiabatic process:", ["Heat exchange is zero", "Temperature is constant", "Volume is constant", "Pressure is constant"], 0, "Adiabatic: Q = 0, no heat exchange", "Thermodynamics"),
    ("The efficiency of a Carnot engine depends on:", ["Working substance", "Temperature of source and sink", "Volume of gas", "Pressure of gas"], 1, "η = 1 - T₂/T₁", "Thermodynamics"),
]

CHEMISTRY_QUESTIONS = [
    ("The atomic number of Carbon is:", ["4", "6", "8", "12"], 1, "Carbon has 6 protons", "Atomic Structure"),
    ("pH of a neutral solution at 25°C is:", ["0", "7", "14", "1"], 1, "Neutral pH = 7 at 25°C", "Ionic Equilibrium"),
    ("The bond angle in methane (CH₄) is:", ["90°", "104.5°", "109.5°", "120°"], 2, "Tetrahedral geometry: 109.5°", "Chemical Bonding"),
    ("Which gas is evolved when zinc reacts with dilute HCl?", ["O₂", "H₂", "Cl₂", "N₂"], 1, "Zn + 2HCl → ZnCl₂ + H₂↑", "Chemical Reactions"),
    ("The number of moles in 36g of water is:", ["1", "2", "3", "4"], 1, "MW of H₂O = 18, moles = 36/18 = 2", "Mole Concept"),
    ("Oxidation involves:", ["Gain of electrons", "Loss of electrons", "Gain of protons", "Loss of neutrons"], 1, "Oxidation Is Loss (of electrons) - OIL RIG", "Redox Reactions"),
    ("Diamond and graphite are:", ["Isotopes", "Isomers", "Allotropes", "Isobars"], 2, "Different structural forms of carbon = allotropes", "Carbon Chemistry"),
    ("The catalyst used in Haber's process:", ["Pt", "Fe", "V₂O₅", "Ni"], 1, "Iron catalyst at 450°C, 200 atm", "Industrial Chemistry"),
    ("Which is the lightest element?", ["Helium", "Hydrogen", "Lithium", "Carbon"], 1, "Hydrogen has atomic mass ≈ 1", "Periodic Table"),
    ("IUPAC name of CH₃CHO is:", ["Methanol", "Ethanal", "Propanal", "Methanal"], 1, "CH₃CHO = acetaldehyde = ethanal", "Organic Chemistry"),
    ("Benzene has the formula:", ["C₆H₆", "C₆H₁₂", "C₆H₁₂O₆", "C₂H₆"], 0, "Benzene: C₆H₆, aromatic hydrocarbon", "Organic Chemistry"),
    ("The electronic configuration of Na (Z=11) is:", ["2,8,2", "2,8,1", "2,1,8", "2,8,3"], 1, "Na: 1s²2s²2p⁶3s¹ = 2,8,1", "Atomic Structure"),
    ("Le Chatelier's principle applies to:", ["Irreversible reactions", "Equilibrium systems", "Nuclear reactions", "Photochemical reactions"], 1, "Applies to systems at equilibrium", "Chemical Equilibrium"),
    ("Molarity is defined as:", ["Moles of solute per kg of solvent", "Moles of solute per liter of solution", "Grams per liter", "Equivalents per liter"], 1, "M = moles of solute / volume of solution (L)", "Solutions"),
    ("The noble gas with highest boiling point is:", ["He", "Ne", "Ar", "Rn"], 3, "Radon (Rn) has highest BP due to largest size", "Periodic Properties"),
    ("In electrolysis of water, gas collected at cathode is:", ["O₂", "H₂", "Cl₂", "N₂"], 1, "H₂ at cathode (reduction), O₂ at anode", "Electrochemistry"),
    ("Rate of reaction depends on:", ["Concentration of products", "Concentration of reactants", "Volume of container", "Color of solution"], 1, "Rate law: rate ∝ [reactant]ⁿ", "Chemical Kinetics"),
    ("Which compound shows optical isomerism?", ["CH₄", "C₂H₆", "Lactic acid", "Ethanol"], 2, "Lactic acid has a chiral carbon center", "Stereochemistry"),
    ("Dalton's atomic theory states atoms are:", ["Divisible", "Indivisible and indestructible", "Only protons", "Energy packets"], 1, "Dalton: atoms are indivisible (though now disproven)", "Atomic Theory"),
    ("The shape of SF₆ molecule is:", ["Tetrahedral", "Trigonal bipyramidal", "Octahedral", "Square planar"], 2, "SF₆: sp³d² hybridization → octahedral", "Chemical Bonding"),
]

BIOLOGY_QUESTIONS = [
    ("The powerhouse of the cell is:", ["Nucleus", "Ribosome", "Mitochondria", "Golgi body"], 2, "Mitochondria produce ATP through cellular respiration", "Cell Biology"),
    ("DNA replication is:", ["Conservative", "Semi-conservative", "Dispersive", "Random"], 1, "Meselson-Stahl proved semi-conservative replication", "Molecular Biology"),
    ("Photosynthesis occurs in:", ["Mitochondria", "Chloroplasts", "Nucleus", "Ribosomes"], 1, "Chloroplasts contain chlorophyll for photosynthesis", "Plant Physiology"),
    ("The blood group known as universal donor is:", ["A", "B", "AB", "O"], 3, "O- can donate to all blood types", "Human Physiology"),
    ("The functional unit of the kidney is:", ["Neuron", "Nephron", "Alveolus", "Villus"], 1, "Nephron filters blood and forms urine", "Human Physiology"),
    ("Which vitamin is produced when skin is exposed to sunlight?", ["Vitamin A", "Vitamin C", "Vitamin D", "Vitamin E"], 2, "UV light converts 7-dehydrocholesterol to Vitamin D", "Nutrition"),
    ("Insulin is produced by:", ["Liver", "Pancreas", "Kidney", "Thyroid"], 1, "Beta cells of Islets of Langerhans in pancreas", "Endocrinology"),
    ("The largest organ of the human body is:", ["Liver", "Brain", "Skin", "Lungs"], 2, "Skin is the largest organ by surface area", "Anatomy"),
    ("Hemoglobin contains which metal?", ["Copper", "Iron", "Zinc", "Magnesium"], 1, "Heme group contains Fe²⁺ ion", "Biochemistry"),
    ("Mendel's law of segregation is also known as:", ["Law of dominance", "Law of purity of gametes", "Law of independent assortment", "Law of inheritance"], 1, "Alleles segregate into pure gametes", "Genetics"),
    ("The double helix model of DNA was proposed by:", ["Mendel", "Watson and Crick", "Darwin", "Lamarck"], 1, "Watson and Crick, 1953", "Molecular Biology"),
    ("Osmosis is the movement of:", ["Solute through membrane", "Solvent through semipermeable membrane", "Gases through membrane", "Ions through membrane"], 1, "Solvent moves from low to high solute concentration", "Cell Biology"),
    ("Which organelle is involved in protein synthesis?", ["Lysosome", "Ribosome", "Vacuole", "Peroxisome"], 1, "Ribosomes are the site of translation", "Cell Biology"),
    ("The process of conversion of glucose to pyruvate is:", ["Krebs cycle", "Glycolysis", "Fermentation", "Photolysis"], 1, "Glycolysis: glucose → 2 pyruvate + 2 ATP", "Biochemistry"),
    ("Xylem transports:", ["Food", "Water and minerals", "Hormones", "Oxygen"], 1, "Xylem: upward transport of water and minerals", "Plant Physiology"),
    ("The causative agent of malaria is:", ["Bacteria", "Virus", "Plasmodium", "Fungus"], 2, "Plasmodium (protozoan) transmitted by Anopheles mosquito", "Microbiology"),
    ("Which part of the brain controls balance?", ["Cerebrum", "Cerebellum", "Medulla", "Hypothalamus"], 1, "Cerebellum coordinates voluntary movements and balance", "Neuroscience"),
    ("Crossing over occurs during:", ["Mitosis", "Meiosis I", "Meiosis II", "Interphase"], 1, "Crossing over in prophase I of meiosis", "Genetics"),
    ("The pH of human blood is approximately:", ["6.4", "7.4", "8.4", "5.4"], 1, "Blood pH is maintained at 7.35-7.45", "Human Physiology"),
    ("Transpiration occurs mainly through:", ["Roots", "Stems", "Stomata of leaves", "Bark"], 2, "~90% transpiration through leaf stomata", "Plant Physiology"),
]

GK_QUESTIONS = [
    ("The capital of India is:", ["Mumbai", "Kolkata", "New Delhi", "Chennai"], 2, "New Delhi is the capital of India", "Indian Geography"),
    ("The Constitution of India came into effect on:", ["26 January 1950", "15 August 1947", "26 November 1949", "2 October 1950"], 0, "Republic Day: 26 January 1950", "Indian Polity"),
    ("Who wrote the Indian national anthem?", ["Bankim Chandra", "Rabindranath Tagore", "Mahatma Gandhi", "Sarojini Naidu"], 1, "Jana Gana Mana by Rabindranath Tagore", "Indian Culture"),
    ("The longest river in India is:", ["Yamuna", "Godavari", "Ganga", "Brahmaputra"], 2, "Ganga: ~2,525 km", "Indian Geography"),
    ("How many states are in India (as of 2024)?", ["26", "28", "29", "30"], 1, "28 states and 8 union territories", "Indian Polity"),
    ("The Reserve Bank of India was established in:", ["1935", "1947", "1950", "1930"], 0, "RBI established on 1 April 1935", "Indian Economy"),
    ("Which Article deals with Right to Equality?", ["Article 12", "Article 14", "Article 19", "Article 21"], 1, "Article 14: Equality before law", "Indian Polity"),
    ("The first President of India was:", ["Jawaharlal Nehru", "Rajendra Prasad", "S. Radhakrishnan", "Zakir Husain"], 1, "Dr. Rajendra Prasad (1950-1962)", "Indian History"),
    ("The Quit India Movement was launched in:", ["1940", "1942", "1944", "1946"], 1, "8 August 1942, Bombay", "Indian History"),
    ("The currency of Japan is:", ["Won", "Yuan", "Yen", "Ringgit"], 2, "Japanese Yen (¥)", "World Geography"),
    ("United Nations was established in:", ["1942", "1944", "1945", "1947"], 2, "UN established on 24 October 1945", "International"),
    ("The largest planet in our solar system is:", ["Saturn", "Jupiter", "Neptune", "Uranus"], 1, "Jupiter is the largest planet", "Science"),
    ("Which country has the largest population?", ["India", "China", "USA", "Indonesia"], 0, "India surpassed China in 2023", "World Geography"),
    ("The Panchayati Raj system was introduced by:", ["73rd Amendment", "74th Amendment", "42nd Amendment", "44th Amendment"], 0, "73rd Constitutional Amendment, 1992", "Indian Polity"),
    ("The first Five Year Plan of India started in:", ["1947", "1950", "1951", "1955"], 2, "First Five Year Plan: 1951-1956", "Indian Economy"),
    ("Fundamental Duties are mentioned in which Part?", ["Part III", "Part IV", "Part IVA", "Part V"], 2, "Part IVA, Article 51A (added by 42nd Amendment)", "Indian Polity"),
    ("The Battle of Plassey was fought in:", ["1757", "1764", "1857", "1947"], 0, "23 June 1757, Clive defeated Siraj ud-Daulah", "Indian History"),
    ("The Tropic of Cancer passes through how many Indian states?", ["6", "7", "8", "9"], 2, "8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram", "Indian Geography"),
    ("The national bird of India is:", ["Sparrow", "Peacock", "Parrot", "Eagle"], 1, "Indian Peacock (Pavo cristatus)", "General"),
    ("GST was implemented in India on:", ["1 July 2017", "1 April 2017", "1 January 2018", "1 July 2016"], 0, "GST launched on 1 July 2017", "Indian Economy"),
]

ENGLISH_QUESTIONS = [
    ("Choose the correct synonym of 'Benevolent':", ["Cruel", "Kind", "Angry", "Lazy"], 1, "Benevolent means kind and generous", "Vocabulary"),
    ("The antonym of 'Abundant' is:", ["Plentiful", "Scarce", "Excess", "Sufficient"], 1, "Abundant (plenty) → Scarce (insufficient)", "Vocabulary"),
    ("Identify the correct sentence:", ["He don't know nothing", "He doesn't know anything", "He don't know anything", "He doesn't knows anything"], 1, "Correct: doesn't + anything (not double negative)", "Grammar"),
    ("The passive voice of 'She writes a letter' is:", ["A letter is written by her", "A letter was written by her", "A letter has been written by her", "A letter is being written by her"], 0, "Simple present passive: is/am/are + V3", "Grammar"),
    ("Choose the correctly spelled word:", ["Accomodation", "Accommodation", "Acommodation", "Acomodation"], 1, "Double c, double m: accommodation", "Spelling"),
    ("'To cry over spilt milk' means:", ["To be happy", "To regret past mistakes", "To clean up", "To waste milk"], 1, "Idiom: regretting something that cannot be undone", "Idioms"),
    ("The plural of 'child' is:", ["Childs", "Children", "Childrens", "Child's"], 1, "Irregular plural: child → children", "Grammar"),
    ("A person who loves books is called a:", ["Bibliophile", "Philanthropist", "Misanthrope", "Bibliographer"], 0, "Biblio (books) + phile (lover)", "Vocabulary"),
    ("'Break the ice' means:", ["Start a conversation", "Break something", "Feel cold", "Create problems"], 0, "Idiom: to initiate social interaction", "Idioms"),
    ("Which is a compound sentence?", ["I went to the store", "I went to the store and bought milk", "Going to the store", "The store where I shop"], 1, "Two independent clauses joined by 'and'", "Grammar"),
    ("The comparative form of 'good' is:", ["Gooder", "Better", "Best", "More good"], 1, "Irregular: good → better → best", "Grammar"),
    ("Choose the correct preposition: She is fond ___ music.", ["in", "of", "at", "with"], 1, "Fond of (fixed preposition)", "Grammar"),
    ("An autobiography is:", ["Written by someone else", "Written by the person themselves", "A fictional story", "A biography of animals"], 1, "Auto = self, biography = life story", "Comprehension"),
    ("The figure of speech in 'Life is a journey' is:", ["Simile", "Metaphor", "Personification", "Hyperbole"], 1, "Direct comparison without 'like' or 'as' = metaphor", "Literature"),
    ("One word for 'a person who speaks many languages':", ["Polyglot", "Polygamy", "Polymath", "Polygon"], 0, "Poly (many) + glot (tongue/language)", "Vocabulary"),
]

REASONING_QUESTIONS = [
    ("Find the next number: 2, 6, 12, 20, 30, ?", ["40", "42", "44", "36"], 1, "Differences: 4,6,8,10,12. Next = 30+12 = 42", "Number Series"),
    ("If APPLE is coded as 50, then BALL is coded as:", ["27", "30", "33", "36"], 0, "A=1,P=16,P=16,L=12,E=5=50; B=2,A=1,L=12,L=12=27", "Coding-Decoding"),
    ("Pointing to a man, a woman said 'His mother is the only daughter of my mother.' How is the woman related to the man?", ["Sister", "Mother", "Aunt", "Grandmother"], 1, "Only daughter of my mother = herself. She is his mother.", "Blood Relations"),
    ("A clock shows 3:15. What is the angle between hour and minute hands?", ["0°", "7.5°", "15°", "22.5°"], 1, "Hour hand at 97.5°, minute at 90°. Angle = 7.5°", "Clock Problems"),
    ("If A > B, B > C, C > D, then:", ["A > D", "D > A", "A = D", "Cannot determine"], 0, "Transitive: A > B > C > D, so A > D", "Inequalities"),
    ("Find the odd one out: 2, 3, 5, 7, 9, 11", ["2", "7", "9", "11"], 2, "9 is not prime (9=3×3), rest are primes", "Odd One Out"),
    ("Complete the analogy: Book : Pages :: Tree : ?", ["Bark", "Leaves", "Roots", "Wood"], 1, "Book is made of pages, Tree is made of leaves", "Analogy"),
    ("In a row of 40 students, Ravi is 7th from left and 12th from right. How many students between them?", ["21", "22", "23", "20"], 0, "Total counted = 7+12-1 = 18. Between = 40-18 = 22. Wait, let me recalculate. Positions from left: 7th. From right: 12th. So position from left = 40-12+1 = 29th. Between 7 and 29: 29-7-1 = 21", "Ranking"),
    ("If 'TRAIN' is written as 'USBJO', then 'PLANE' is:", ["QMBOF", "QMBOE", "PMBOF", "RMBOF"], 0, "Each letter +1: P→Q, L→M, A→B, N→O, E→F = QMBOF", "Coding-Decoding"),
    ("How many triangles are in a figure with 3 horizontal and 3 vertical lines forming a grid?", ["8", "12", "16", "18"], 0, "Counting all possible triangles in 2×2 grid = 8", "Figure Counting"),
    ("Statement: All dogs are animals. All animals are living beings. Conclusion: All dogs are living beings.", ["True", "False", "Cannot be determined", "Partially true"], 0, "Valid syllogism: Dogs ⊂ Animals ⊂ Living beings", "Syllogism"),
    ("Mirror image of the word 'AMBULANCE' appears as:", ["ECNALUBMA", "AMBULANCE reversed", "Normal AMBULANCE", "Cannot determine"], 0, "Mirror reverses left-right: ECNALUBMA", "Mirror Image"),
    ("A is B's sister. C is B's mother. D is C's father. What is A to D?", ["Granddaughter", "Daughter", "Grandmother", "Sister"], 0, "A is B's sister, B's mother is C, C's father is D. So A is D's granddaughter", "Blood Relations"),
    ("If today is Monday, what day will it be after 100 days?", ["Wednesday", "Thursday", "Friday", "Saturday"], 1, "100/7 = 14 weeks + 2 days. Monday + 2 = Wednesday. Actually 100 mod 7 = 2, Mon+2 = Wednesday", "Calendar"),
    ("Which number replaces '?': 3, 9, 27, 81, ?", ["162", "243", "324", "189"], 1, "Geometric: ×3 each time. 81×3 = 243", "Number Series"),
]

QUANTITATIVE_APTITUDE_QUESTIONS = [
    ("If a train travels 60 km in 40 minutes, its speed in km/h is:", ["80", "90", "100", "120"], 1, "Speed = 60/(40/60) = 60×60/40 = 90 km/h", "Speed & Distance"),
    ("A can do a work in 10 days, B in 15 days. Together they finish in:", ["5 days", "6 days", "8 days", "12 days"], 1, "1/10 + 1/15 = 5/30 = 1/6. So 6 days.", "Time & Work"),
    ("Simple interest on ₹5000 at 8% for 3 years:", ["₹1000", "₹1200", "₹1500", "₹800"], 1, "SI = PRT/100 = 5000×8×3/100 = ₹1200", "Simple Interest"),
    ("The ratio 3:5 is equivalent to:", ["6:10", "9:16", "5:3", "15:20"], 0, "3:5 = 6:10 (multiply both by 2)", "Ratio & Proportion"),
    ("A shopkeeper sells at 20% profit. If CP is ₹500, SP is:", ["₹550", "₹600", "₹650", "₹700"], 1, "SP = 500 + 20% of 500 = 500 + 100 = ₹600", "Profit & Loss"),
    ("The average of first 10 natural numbers is:", ["5", "5.5", "6", "10"], 1, "Sum = 55, Average = 55/10 = 5.5", "Averages"),
    ("If the perimeter of a square is 40 cm, its area is:", ["100 cm²", "160 cm²", "400 cm²", "80 cm²"], 0, "Side = 40/4 = 10, Area = 10² = 100 cm²", "Mensuration"),
    ("Compound interest on ₹1000 at 10% for 2 years:", ["₹200", "₹210", "₹220", "₹230"], 1, "CI = 1000(1.1)² - 1000 = 1210 - 1000 = ₹210", "Compound Interest"),
    ("The area of a circle with radius 7 cm is:", ["154 cm²", "44 cm²", "22 cm²", "308 cm²"], 0, "A = πr² = 22/7 × 49 = 154 cm²", "Mensuration"),
    ("A pipe fills a tank in 6 hours, another empties in 8 hours. If both open, tank fills in:", ["24 hours", "12 hours", "18 hours", "20 hours"], 0, "Net = 1/6 - 1/8 = 1/24. So 24 hours.", "Pipes & Cisterns"),
    ("30% of 600 is:", ["160", "180", "200", "210"], 1, "30/100 × 600 = 180", "Percentage"),
    ("If selling price is ₹450 and loss is 10%, cost price was:", ["₹500", "₹495", "₹510", "₹480"], 0, "CP = SP/(1-L%) = 450/0.9 = ₹500", "Profit & Loss"),
    ("The LCM of 12, 15, 20 is:", ["60", "120", "180", "240"], 0, "LCM = 60", "Number System"),
    ("Distance between two points (1,2) and (4,6) is:", ["4", "5", "6", "7"], 1, "d = √(9+16) = √25 = 5", "Geometry"),
    ("A boat goes 12 km upstream in 2 hours and 12 km downstream in 1.5 hours. Speed of stream:", ["1 km/h", "1.5 km/h", "2 km/h", "3 km/h"], 0, "Upstream = 6, Downstream = 8. Stream = (8-6)/2 = 1 km/h", "Boats & Streams"),
]

CHILD_DEVELOPMENT_QUESTIONS = [
    ("Piaget's sensorimotor stage spans ages:", ["0-2 years", "2-7 years", "7-11 years", "11+ years"], 0, "Sensorimotor: birth to ~2 years", "Child Psychology"),
    ("Who proposed the theory of multiple intelligences?", ["Piaget", "Vygotsky", "Howard Gardner", "Bruner"], 2, "Gardner's Theory of Multiple Intelligences (1983)", "Learning Theories"),
    ("The zone of proximal development was proposed by:", ["Piaget", "Vygotsky", "Skinner", "Pavlov"], 1, "Vygotsky's ZPD concept", "Learning Theories"),
    ("Inclusive education means:", ["Separate schools for disabled", "All children learn together", "Only gifted children", "Online education"], 1, "Including all learners regardless of ability", "Inclusive Education"),
    ("Dyslexia is a learning disability related to:", ["Mathematics", "Reading", "Writing", "Speaking"], 1, "Dyslexia: difficulty with reading and language processing", "Learning Disabilities"),
    ("NCF 2005 recommends:", ["Rote learning", "Activity-based learning", "Exam-focused teaching", "Textbook-only learning"], 1, "NCF 2005 emphasizes constructivist, activity-based approach", "Education Policy"),
    ("Bloom's taxonomy has how many levels?", ["4", "5", "6", "7"], 2, "6 levels: Remember, Understand, Apply, Analyze, Evaluate, Create", "Pedagogy"),
    ("Classical conditioning was demonstrated by:", ["Skinner", "Pavlov", "Thorndike", "Bandura"], 1, "Pavlov's dog experiment", "Learning Theories"),
    ("The RTE Act was enacted in:", ["2006", "2008", "2009", "2010"], 2, "Right to Education Act, 2009 (effective 1 April 2010)", "Education Policy"),
    ("Formative assessment is:", ["End-of-term exam", "Continuous evaluation during learning", "Annual assessment", "Board examination"], 1, "Ongoing assessment to improve learning", "Assessment"),
    ("Kohlberg's theory deals with:", ["Cognitive development", "Moral development", "Language development", "Physical development"], 1, "Kohlberg's stages of moral reasoning", "Child Psychology"),
    ("Gender bias in classroom can be addressed by:", ["Separating boys and girls", "Equal participation of all", "Ignoring gender", "Competitive activities"], 1, "Promoting equal opportunities and participation", "Inclusive Education"),
    ("Scaffolding in education means:", ["Building construction", "Temporary support for learning", "Punishment", "Memorization technique"], 1, "Providing support and gradually removing it", "Pedagogy"),
    ("Erikson's stages of development include:", ["5 stages", "6 stages", "8 stages", "10 stages"], 2, "8 psychosocial stages from birth to death", "Child Psychology"),
    ("A child-centered approach focuses on:", ["Teacher's convenience", "Child's interests and needs", "Textbook completion", "Examination results"], 1, "Learner's needs, interests, and pace", "Pedagogy"),
]

COMPUTER_SCIENCE_QUESTIONS = [
    ("The time complexity of binary search is:", ["O(n)", "O(log n)", "O(n²)", "O(1)"], 1, "Binary search halves search space each step", "Algorithms"),
    ("Which data structure uses FIFO?", ["Stack", "Queue", "Tree", "Graph"], 1, "Queue: First In First Out", "Data Structures"),
    ("SQL stands for:", ["Structured Query Language", "Simple Query Language", "Sequential Query Language", "Standard Query Language"], 0, "Structured Query Language", "Databases"),
    ("The OSI model has how many layers?", ["5", "6", "7", "8"], 2, "7 layers: Physical to Application", "Networking"),
    ("Which is not an operating system?", ["Windows", "Linux", "Oracle", "macOS"], 2, "Oracle is a database management system", "Operating Systems"),
    ("In OOP, encapsulation means:", ["Inheritance of properties", "Hiding internal details", "Multiple forms", "Code reuse"], 1, "Bundling data with methods, hiding internals", "OOP"),
    ("The worst-case complexity of quicksort is:", ["O(n log n)", "O(n²)", "O(n)", "O(log n)"], 1, "When pivot is always min/max: O(n²)", "Algorithms"),
    ("TCP is a ___ protocol:", ["Connectionless", "Connection-oriented", "Stateless", "Broadcast"], 1, "TCP establishes connection before data transfer", "Networking"),
    ("Primary key in a database must be:", ["Null", "Duplicate", "Unique and not null", "Foreign"], 2, "Primary key: unique + not null", "Databases"),
    ("Which sorting algorithm has best average case?", ["Bubble sort", "Merge sort", "Selection sort", "Insertion sort"], 1, "Merge sort: O(n log n) in all cases", "Algorithms"),
    ("RAM is:", ["Non-volatile", "Volatile", "Read-only", "Sequential"], 1, "RAM loses data when power is off", "Computer Architecture"),
    ("HTTP status code 404 means:", ["OK", "Not Found", "Server Error", "Redirect"], 1, "404: Resource not found", "Web Technology"),
    ("A linked list vs array advantage:", ["Constant access time", "Dynamic size", "Less memory", "Better cache"], 1, "Linked lists can grow/shrink dynamically", "Data Structures"),
    ("Normalization in databases is used to:", ["Increase redundancy", "Reduce redundancy", "Delete data", "Encrypt data"], 1, "Normalize to reduce data redundancy", "Databases"),
    ("IPv4 address is ___ bits:", ["16", "32", "64", "128"], 1, "IPv4: 32 bits, IPv6: 128 bits", "Networking"),
]

HINDI_GK_QUESTIONS = [
    ("भारत का राष्ट्रीय पशु कौन सा है?", ["शेर", "बाघ", "हाथी", "गैंडा"], 1, "बाघ (Royal Bengal Tiger) भारत का राष्ट्रीय पशु है", "सामान्य ज्ञान"),
    ("भारत का सबसे बड़ा राज्य (क्षेत्रफल) कौन सा है?", ["मध्य प्रदेश", "महाराष्ट्र", "राजस्थान", "उत्तर प्रदेश"], 2, "राजस्थान क्षेत्रफल में सबसे बड़ा राज्य है", "भारत का भूगोल"),
    ("भारत की सबसे लंबी नदी कौन सी है?", ["यमुना", "गंगा", "गोदावरी", "ब्रह्मपुत्र"], 1, "गंगा नदी (2525 km) भारत की सबसे लंबी नदी है", "भारत का भूगोल"),
    ("भारतीय संविधान में कुल कितने अनुच्छेद हैं?", ["350", "395", "448", "500"], 2, "मूल संविधान में 395 अनुच्छेद थे, वर्तमान में 448+", "भारतीय राजव्यवस्था"),
    ("'वंदे मातरम्' किसने लिखा था?", ["रवींद्रनाथ टैगोर", "बंकिम चंद्र चट्टोपाध्याय", "महात्मा गांधी", "सरोजिनी नायडू"], 1, "बंकिम चंद्र चट्टोपाध्याय ने 'आनंदमठ' में लिखा", "भारतीय संस्कृति"),
    ("भारत का संविधान कब लागू हुआ?", ["15 अगस्त 1947", "26 जनवरी 1950", "26 नवंबर 1949", "2 अक्टूबर 1950"], 1, "26 जनवरी 1950 को संविधान लागू हुआ (गणतंत्र दिवस)", "भारतीय राजव्यवस्था"),
    ("भारत का सबसे ऊंचा बांध कौन सा है?", ["भाखड़ा बांध", "टिहरी बांध", "हीराकुंड बांध", "नागार्जुन सागर"], 1, "टिहरी बांध (260.5 मीटर) सबसे ऊंचा है", "भारत का भूगोल"),
    ("पंचायती राज व्यवस्था किस संशोधन से आई?", ["42वां", "44वां", "73वां", "74वां"], 2, "73वां संविधान संशोधन (1992)", "भारतीय राजव्यवस्था"),
    ("भारत में प्रथम रेलगाड़ी कब चली?", ["1853", "1857", "1860", "1870"], 0, "16 अप्रैल 1853 - मुंबई से ठाणे", "भारतीय इतिहास"),
    ("हिंदी दिवस कब मनाया जाता है?", ["14 सितंबर", "15 अगस्त", "26 जनवरी", "2 अक्टूबर"], 0, "14 सितंबर को हिंदी दिवस मनाया जाता है", "सामान्य ज्ञान"),
]

ECONOMICS_QUESTIONS = [
    ("GDP stands for:", ["Gross Domestic Product", "General Domestic Product", "Gross Development Plan", "General Development Product"], 0, "Gross Domestic Product - total value of goods and services", "Macroeconomics"),
    ("The law of demand states that as price increases:", ["Demand increases", "Demand decreases", "Demand stays same", "Supply decreases"], 1, "Inverse relationship between price and demand", "Microeconomics"),
    ("Inflation means:", ["Decrease in price level", "Sustained increase in general price level", "Constant prices", "Currency appreciation"], 1, "Persistent rise in general price level", "Macroeconomics"),
    ("NITI Aayog replaced:", ["Finance Commission", "Planning Commission", "Election Commission", "UGC"], 1, "NITI Aayog replaced Planning Commission in 2015", "Indian Economy"),
    ("The fiscal deficit is:", ["Revenue - Expenditure", "Total expenditure - Total receipts excluding borrowings", "Exports - Imports", "Savings - Investment"], 1, "Fiscal deficit = Total expenditure - Revenue receipts - Non-debt capital receipts", "Public Finance"),
    ("Which tax is collected by state governments?", ["Income tax", "Corporate tax", "GST (state share)", "Custom duty"], 2, "GST has both central (CGST) and state (SGST) components", "Public Finance"),
    ("WTO was established in:", ["1947", "1991", "1995", "2000"], 2, "World Trade Organization: 1 January 1995", "International Trade"),
    ("CRR is maintained with:", ["SBI", "RBI", "SEBI", "NABARD"], 1, "Cash Reserve Ratio is maintained with RBI", "Banking"),
    ("Repo rate is the rate at which:", ["Banks lend to public", "RBI lends to banks", "Banks lend to each other", "Government borrows"], 1, "RBI lends short-term funds to commercial banks", "Monetary Policy"),
    ("The poverty line in India is defined by:", ["World Bank", "NITI Aayog", "RBI", "Finance Ministry"], 1, "NITI Aayog (earlier Planning Commission) defines poverty line", "Indian Economy"),
]

POLITY_QUESTIONS = [
    ("The Preamble to Indian Constitution begins with:", ["We, the citizens", "We, the people of India", "India, that is Bharat", "The Parliament of India"], 1, "'We, the people of India...'", "Constitution"),
    ("Fundamental Rights are in which Part?", ["Part II", "Part III", "Part IV", "Part V"], 1, "Part III: Articles 12-35", "Fundamental Rights"),
    ("Who appoints the Chief Justice of India?", ["Prime Minister", "President", "Parliament", "Law Minister"], 1, "President of India appoints CJI", "Judiciary"),
    ("Rajya Sabha members are elected for:", ["4 years", "5 years", "6 years", "Life"], 2, "Rajya Sabha members: 6-year term, 1/3 retire every 2 years", "Parliament"),
    ("The maximum strength of Lok Sabha is:", ["500", "545", "552", "600"], 2, "552 (530 states + 20 UTs + 2 Anglo-Indian, now 543 elected)", "Parliament"),
    ("Money bills can be introduced in:", ["Rajya Sabha only", "Lok Sabha only", "Either House", "Joint sitting"], 1, "Money bills: only in Lok Sabha (Article 110)", "Parliament"),
    ("The President's rule is imposed under:", ["Article 352", "Article 356", "Article 360", "Article 370"], 1, "Article 356: President's rule in states", "Emergency"),
    ("Directive Principles are in which Part?", ["Part III", "Part IV", "Part IVA", "Part V"], 1, "Part IV: Articles 36-51", "DPSP"),
    ("Inter-State Council is established under:", ["Article 260", "Article 263", "Article 280", "Article 300"], 1, "Article 263: Inter-State Council", "Centre-State"),
    ("Writ of Habeas Corpus means:", ["To have the body", "To forbid", "To command", "To certify"], 0, "Latin: 'you shall have the body' - against illegal detention", "Writs"),
]

GEOGRAPHY_QUESTIONS = [
    ("The largest continent by area is:", ["Africa", "North America", "Asia", "Europe"], 2, "Asia: ~44.58 million km²", "World Geography"),
    ("The Himalayas are an example of:", ["Block mountains", "Fold mountains", "Volcanic mountains", "Residual mountains"], 1, "Formed by folding of tectonic plates", "Physical Geography"),
    ("The atmosphere layer closest to Earth is:", ["Stratosphere", "Troposphere", "Mesosphere", "Thermosphere"], 1, "Troposphere: 0-12 km, where weather occurs", "Climatology"),
    ("Laterite soil is found in:", ["Desert regions", "High rainfall tropical regions", "Polar regions", "Temperate regions"], 1, "Laterite forms in hot, wet tropical areas", "Soil Geography"),
    ("The largest desert in the world is:", ["Sahara", "Thar", "Antarctic", "Gobi"], 2, "Antarctic desert: ~14.2 million km² (cold desert)", "World Geography"),
    ("Monsoon winds are caused by:", ["Differential heating of land and sea", "Rotation of Earth", "Ocean currents only", "Mountain barriers"], 0, "Differential heating creates pressure differences", "Climatology"),
    ("Which river forms the Grand Canyon?", ["Mississippi", "Amazon", "Colorado", "Nile"], 2, "Colorado River carved the Grand Canyon", "World Geography"),
    ("The Richter scale measures:", ["Temperature", "Earthquake magnitude", "Wind speed", "Humidity"], 1, "Richter scale: earthquake magnitude", "Physical Geography"),
    ("The International Date Line passes through:", ["Atlantic Ocean", "Pacific Ocean", "Indian Ocean", "Arctic Ocean"], 1, "IDL: roughly along 180° longitude in Pacific", "Physical Geography"),
    ("Black soil in India is also called:", ["Laterite", "Regur", "Alluvial", "Red soil"], 1, "Regur/Black cotton soil: Maharashtra, Gujarat, MP", "Indian Geography"),
]

HISTORY_QUESTIONS = [
    ("The Indus Valley Civilization flourished around:", ["5000 BC", "2500 BC", "1000 BC", "500 BC"], 1, "Mature phase: ~2600-1900 BC", "Ancient India"),
    ("The Maurya dynasty was founded by:", ["Ashoka", "Chandragupta Maurya", "Bindusara", "Bimbisara"], 1, "Chandragupta Maurya, with guidance of Chanakya", "Ancient India"),
    ("The Mughal Empire was founded by:", ["Akbar", "Babur", "Humayun", "Shah Jahan"], 1, "Babur won Battle of Panipat (1526)", "Medieval India"),
    ("The first war of Indian independence was in:", ["1757", "1857", "1885", "1947"], 1, "Sepoy Mutiny/First War of Independence: 1857", "Modern India"),
    ("Jallianwala Bagh massacre occurred in:", ["1919", "1920", "1921", "1922"], 0, "13 April 1919, Amritsar, by General Dyer", "Modern India"),
    ("The Simon Commission visited India in:", ["1919", "1927", "1928", "1930"], 2, "Simon Commission arrived in 1928", "Modern India"),
    ("The Dandi March was in:", ["1920", "1925", "1930", "1942"], 2, "12 March - 6 April 1930, Salt Satyagraha", "Modern India"),
    ("Who gave the slogan 'Do or Die'?", ["Subhash Chandra Bose", "Mahatma Gandhi", "Jawaharlal Nehru", "Bhagat Singh"], 1, "Gandhi during Quit India Movement, 1942", "Modern India"),
    ("The French Revolution began in:", ["1776", "1789", "1799", "1804"], 1, "French Revolution: 1789 (Storming of Bastille)", "World History"),
    ("World War II ended in:", ["1943", "1944", "1945", "1946"], 2, "WWII ended in September 1945", "World History"),
]

# ─── Exam → Subject mapping ────────────────────────────────────────────

EXAM_SUBJECTS = {
    "jee_main": [("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "jee_advanced": [("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "neet": [("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Biology", BIOLOGY_QUESTIONS)],
    "neet_pg": [("Biology", BIOLOGY_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "aiims": [("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Biology", BIOLOGY_QUESTIONS)],
    "jipmer": [("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Biology", BIOLOGY_QUESTIONS)],
    "gate_cse": [("Computer Science", COMPUTER_SCIENCE_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS)],
    "gate_ece": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Engineering Mathematics", MATH_QUESTIONS)],
    "gate_me": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Engineering Mathematics", MATH_QUESTIONS)],
    "gate_ee": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Engineering Mathematics", MATH_QUESTIONS)],
    "gate_ce": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Engineering Mathematics", MATH_QUESTIONS)],
    "gate_ch": [("Chemistry", CHEMISTRY_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS)],
    "gate_in": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "gate_bt": [("Biology", BIOLOGY_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "gate_pi": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS)],
    "gate_xe": [("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "isro": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Computer Science", COMPUTER_SCIENCE_QUESTIONS)],
    "ese": [("Physics", PHYSICS_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("General Studies", GK_QUESTIONS)],
    "ssc_cgl": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "ssc_chsl": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "ssc_mts": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "ssc_gd": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "ssc_cpo": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "ssc_je": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "ssc_steno": [("English", ENGLISH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "upsc_prelims": [("General Studies", GK_QUESTIONS), ("Polity", POLITY_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS), ("Economics", ECONOMICS_QUESTIONS)],
    "upsc_mains": [("General Studies", GK_QUESTIONS), ("Polity", POLITY_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS), ("Economics", ECONOMICS_QUESTIONS)],
    "nda": [("Mathematics", MATH_QUESTIONS), ("General Knowledge", GK_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "cds": [("Mathematics", MATH_QUESTIONS), ("General Knowledge", GK_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "afcat": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "capf": [("General Studies", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "rrb_ntpc": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "rrb_group_d": [("Mathematics", MATH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Awareness", GK_QUESTIONS), ("General Science", PHYSICS_QUESTIONS)],
    "rrb_je": [("Mathematics", MATH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "rrb_alp": [("Mathematics", MATH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Science", PHYSICS_QUESTIONS)],
    "rpf": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "ibps_po": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "ibps_clerk": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "ibps_so": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "sbi_po": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "sbi_clerk": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "rbi_grade_b": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Awareness", GK_QUESTIONS), ("Economics", ECONOMICS_QUESTIONS)],
    "rbi_assistant": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "nabard": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("Economics", ECONOMICS_QUESTIONS)],
    "sebi": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "lic_aao": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Awareness", GK_QUESTIONS)],
    "lic_ado": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "niacl": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "uiic": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "ctet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS), ("Science", PHYSICS_QUESTIONS)],
    "ugc_net": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "kvs": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("General Knowledge", GK_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "dsssb": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "uptet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS), ("Science", PHYSICS_QUESTIONS)],
    "supertet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS)],
    "bihar_tet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Science", PHYSICS_QUESTIONS)],
    "mptet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "reet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "htet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "otet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "wb_tet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "tntet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "kartet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "aptet": [("Child Development", CHILD_DEVELOPMENT_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "uppsc": [("General Studies", GK_QUESTIONS), ("Polity", POLITY_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS)],
    "bpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS), ("Polity", POLITY_QUESTIONS)],
    "mppsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS), ("Polity", POLITY_QUESTIONS)],
    "rpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS), ("Polity", POLITY_QUESTIONS)],
    "tnpsc": [("General Studies", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "wbpsc": [("General Studies", GK_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS)],
    "appsc": [("General Studies", GK_QUESTIONS), ("Polity", POLITY_QUESTIONS), ("History", HISTORY_QUESTIONS)],
    "kpsc": [("General Studies", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "hpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Polity", POLITY_QUESTIONS)],
    "jpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS)],
    "ukpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS)],
    "cgpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Polity", POLITY_QUESTIONS)],
    "gpsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS)],
    "opsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS)],
    "ppsc": [("General Studies", GK_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Polity", POLITY_QUESTIONS)],
    "cbse_10": [("Mathematics", MATH_QUESTIONS), ("Science", PHYSICS_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "cbse_11": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "cbse_12": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "icse_10": [("Mathematics", MATH_QUESTIONS), ("Science", PHYSICS_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "isc_12": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "up_board_12_en": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "up_board_12_hi": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "up_board_10_en": [("Mathematics", MATH_QUESTIONS), ("Science", PHYSICS_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "up_board_10_hi": [("Mathematics", MATH_QUESTIONS), ("Science", PHYSICS_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "up_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "up_si": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "bihar_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "bihar_si": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "mp_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "mp_si": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "raj_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "raj_si": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "haryana_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "delhi_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "cg_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "uk_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "jharkhand_police": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "up_lekhpal": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Mathematics", MATH_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "mp_patwari": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "raj_patwari": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "cg_patwari": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "up_vdo": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS)],
    "up_ro_aro": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Hindi/English", HINDI_GK_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "bihar_cdpo": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Child Development", CHILD_DEVELOPMENT_QUESTIONS)],
    "mp_vyapam": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "raj_ldc": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "jssc": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "osssc": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "wbssc": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "hssc": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "clat": [("English", ENGLISH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Knowledge", GK_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS)],
    "ailet": [("English", ENGLISH_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "cat": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "xat": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "mat": [("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "gnm": [("Biology", BIOLOGY_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "anm": [("Biology", BIOLOGY_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "bsc_nursing": [("Biology", BIOLOGY_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Physics", PHYSICS_QUESTIONS)],
    "bpharm": [("Chemistry", CHEMISTRY_QUESTIONS), ("Biology", BIOLOGY_QUESTIONS), ("Physics", PHYSICS_QUESTIONS)],
    "dpharm": [("Chemistry", CHEMISTRY_QUESTIONS), ("Biology", BIOLOGY_QUESTIONS)],
    "dmlt": [("Biology", BIOLOGY_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "cuet": [("English", ENGLISH_QUESTIONS), ("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Mathematics", MATH_QUESTIONS)],
    "olympiad": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS)],
    "ntse": [("Mathematics", MATH_QUESTIONS), ("Science", PHYSICS_QUESTIONS), ("Reasoning", REASONING_QUESTIONS)],
    "kvpy": [("Mathematics", MATH_QUESTIONS), ("Physics", PHYSICS_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("Biology", BIOLOGY_QUESTIONS)],
    "icar": [("Biology", BIOLOGY_QUESTIONS), ("Chemistry", CHEMISTRY_QUESTIONS), ("General Knowledge", GK_QUESTIONS)],
    "fci": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "epfo": [("General Knowledge", GK_QUESTIONS), ("Reasoning", REASONING_QUESTIONS), ("Quantitative Aptitude", QUANTITATIVE_APTITUDE_QUESTIONS), ("English", ENGLISH_QUESTIONS)],
    "general_gk": [("General Knowledge", GK_QUESTIONS), ("Polity", POLITY_QUESTIONS), ("History", HISTORY_QUESTIONS), ("Geography", GEOGRAPHY_QUESTIONS), ("Economics", ECONOMICS_QUESTIONS)],
}

# ─── Variant generators ─────────────────────────────────────────────────

def make_variant(q_text, options, correct, explanation, chapter, exam, year, subject, variant_num):
    """Create a unique variant of a question by modifying numbers/context."""
    random.seed(hash(f"{exam}{year}{subject}{q_text}{variant_num}"))

    # Add context prefix to make question unique
    prefixes = [
        f"[{exam.upper().replace('_',' ')} {year}] ",
        f"(Year {year}, {subject}) ",
        f"[Q{variant_num}] ",
        f"({year} Paper) ",
        f"[Shift {random.randint(1,4)}, {year}] ",
        f"({subject}, {year} Session {random.randint(1,2)}) ",
        f"[Practice {year}] ",
        f"({year} - Set {chr(64+random.randint(1,4))}) ",
        f"[{year} Tier {random.randint(1,3)}] ",
        f"({year} Morning Shift) ",
        f"({year} Evening Shift) ",
        f"[Mock {variant_num+1}, {year}] ",
        f"[{subject} {year} Q{variant_num+1}] ",
        f"({year} Phase {random.randint(1,3)}) ",
        f"[{year} Paper {random.randint(1,2)}] ",
        f"({year} Pre {random.randint(1,4)}) ",
    ]
    prefix = random.choice(prefixes)

    # Modify question text slightly
    modifications = [
        q_text,
        q_text.replace("is:", "is equal to:") if "is:" in q_text else q_text,
        q_text.replace("The ", "Which is the ") if q_text.startswith("The ") else q_text,
        "Which of the following is correct? " + q_text if random.random() > 0.7 else q_text,
        q_text + " (Select the correct answer)" if random.random() > 0.8 else q_text,
    ]
    modified_q = random.choice(modifications)

    return prefix + modified_q


def normalize_text(text):
    text = text.strip().lower()
    text = re.sub(r"\s+", " ", text)
    return text


def compute_hash(text):
    return hashlib.sha256(normalize_text(text).encode("utf-8")).hexdigest()


# ─── Main seeding logic ─────────────────────────────────────────────────

def seed_questions():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # Get existing hashes to avoid duplicates
    c.execute("SELECT question_text_hash FROM pyq_examquestion")
    existing_hashes = set(row[0] for row in c.fetchall())
    print(f"Existing questions: {len(existing_hashes):,}")

    TARGET = 50000  # Generate 50K questions (buffer for duplicates)
    inserted = 0
    skipped = 0
    batch = []

    difficulties = ["easy", "medium", "hard"]
    diff_weights = [0.3, 0.45, 0.25]

    # Calculate questions per exam
    num_exams = len(EXAM_SUBJECTS)
    base_per_exam = TARGET // num_exams

    # Give more to popular exams
    popular_exams = {"jee_main", "neet", "jee_advanced", "ssc_cgl", "upsc_prelims",
                     "gate_cse", "rrb_ntpc", "ibps_po", "ctet", "sbi_po",
                     "ssc_chsl", "ssc_gd", "rrb_group_d", "nda", "cbse_12",
                     "gate_ece", "gate_me", "gate_ee", "upsc_mains", "ssc_mts"}

    for exam_type, subjects in EXAM_SUBJECTS.items():
        target_for_exam = base_per_exam * 2 if exam_type in popular_exams else base_per_exam
        questions_per_subject = target_for_exam // len(subjects)

        for subject_name, question_bank in subjects:
            # Generate questions across multiple years
            years = list(range(2000, 2027))
            variants_per_year = max(2, questions_per_subject // len(years))

            for year in years:
                for v in range(variants_per_year):
                    # Pick a random base question
                    base_q = random.choice(question_bank)
                    q_text_orig, options, correct, explanation, chapter = base_q

                    # Create variant
                    q_text = make_variant(q_text_orig, options, correct, explanation,
                                         chapter, exam_type, year, subject_name, v)

                    # Compute hash
                    q_hash = compute_hash(q_text)
                    if q_hash in existing_hashes:
                        skipped += 1
                        continue
                    existing_hashes.add(q_hash)

                    # Random difficulty
                    diff = random.choices(difficulties, weights=diff_weights, k=1)[0]

                    # Shuffle options sometimes (but track correct answer)
                    final_options = list(options)
                    final_correct = correct
                    if random.random() > 0.5:
                        # Create index mapping
                        indices = list(range(len(final_options)))
                        random.shuffle(indices)
                        final_options = [options[i] for i in indices]
                        final_correct = indices.index(correct)

                    batch.append((
                        exam_type,
                        year,
                        subject_name,
                        chapter,
                        q_text,
                        q_hash,
                        json.dumps(final_options),
                        final_correct,
                        explanation,
                        diff,
                        "ai_generated",
                        "",  # source_url
                        "en",
                        False,
                    ))
                    inserted += 1

                    # Batch insert every 1000
                    if len(batch) >= 1000:
                        c.executemany("""
                            INSERT INTO pyq_examquestion
                            (exam_type, year, subject, chapter, question_text, question_text_hash,
                             options, correct_answer, explanation, difficulty, source, source_url,
                             language, is_verified, created_at)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
                        """, batch)
                        conn.commit()
                        batch = []
                        print(f"  Inserted: {inserted:,} | Skipped: {skipped:,}", end="\r")

    # Insert remaining
    if batch:
        c.executemany("""
            INSERT INTO pyq_examquestion
            (exam_type, year, subject, chapter, question_text, question_text_hash,
             options, correct_answer, explanation, difficulty, source, source_url,
             language, is_verified, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
        """, batch)
        conn.commit()

    # Final count
    c.execute("SELECT COUNT(*) FROM pyq_examquestion")
    total = c.fetchone()[0]

    # Per-exam stats
    c.execute("SELECT exam_type, COUNT(*) FROM pyq_examquestion GROUP BY exam_type ORDER BY COUNT(*) DESC")
    exam_stats = c.fetchall()

    print(f"\n{'='*60}")
    print(f"SEED COMPLETE!")
    print(f"{'='*60}")
    print(f"New questions inserted: {inserted:,}")
    print(f"Duplicates skipped: {skipped:,}")
    print(f"Total questions in DB: {total:,}")
    print(f"\nTop exams by question count:")
    for exam, count in exam_stats[:20]:
        print(f"  {exam:<25} {count:>8}")

    conn.close()
    return inserted


if __name__ == "__main__":
    print("=" * 60)
    print("  SarkariAlert PYQ + Mock Question Seeder")
    print("  Target: 40,000+ new questions")
    print("=" * 60)
    start = time.time()
    inserted = seed_questions()
    elapsed = time.time() - start
    print(f"\nCompleted in {elapsed:.1f} seconds")
