import json
import logging
import time

from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

logger = logging.getLogger(__name__)

# ── Full generation plan: exam → subjects → year range → questions per combo ──

GENERATION_PLAN = {
    # Engineering
    "jee_main": {
        "subjects": ["Physics", "Chemistry", "Mathematics"],
        "years": range(2002, 2027),
        "count": 30,
    },
    "jee_advanced": {
        "subjects": ["Physics", "Chemistry", "Mathematics"],
        "years": range(1998, 2027),
        "count": 25,
    },
    "gate_cse": {
        "subjects": [
            "Data Structures", "Algorithms", "Operating Systems",
            "DBMS", "Computer Networks", "Theory of Computation",
            "Compiler Design", "Digital Logic", "Computer Architecture",
            "Discrete Mathematics", "Engineering Mathematics",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    "gate_ece": {
        "subjects": [
            "Signals and Systems", "Control Systems", "Communications",
            "Analog Circuits", "Digital Circuits", "Electromagnetics",
            "Electronic Devices", "Network Theory", "Engineering Mathematics",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    "gate_me": {
        "subjects": [
            "Thermodynamics", "Fluid Mechanics", "Strength of Materials",
            "Theory of Machines", "Machine Design", "Heat Transfer",
            "Manufacturing Engineering", "Industrial Engineering",
            "Engineering Mathematics",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    "gate_ee": {
        "subjects": [
            "Electric Circuits", "Electromagnetic Theory", "Signals and Systems",
            "Electrical Machines", "Power Systems", "Control Systems",
            "Power Electronics", "Analog and Digital Electronics",
            "Engineering Mathematics",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    "gate_ce": {
        "subjects": [
            "Structural Engineering", "Geotechnical Engineering",
            "Water Resources", "Environmental Engineering",
            "Transportation Engineering", "Surveying",
            "Construction Materials", "Engineering Mathematics",
        ],
        "years": range(2003, 2027),
        "count": 15,
    },
    "gate_ch": {
        "subjects": [
            "Process Calculations", "Thermodynamics", "Fluid Mechanics",
            "Heat Transfer", "Mass Transfer", "Chemical Reaction Engineering",
            "Process Control", "Engineering Mathematics",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "ese": {
        "subjects": ["General Studies", "Engineering Aptitude", "Technical Paper"],
        "years": range(2005, 2027),
        "count": 15,
    },
    "isro": {
        "subjects": ["Electronics", "Computer Science", "Mechanical", "Electrical"],
        "years": range(2008, 2027),
        "count": 15,
    },
    # Medical
    "neet": {
        "subjects": ["Physics", "Chemistry", "Biology (Botany)", "Biology (Zoology)"],
        "years": range(2005, 2027),
        "count": 30,
    },
    "neet_pg": {
        "subjects": [
            "Anatomy", "Physiology", "Biochemistry", "Pharmacology",
            "Pathology", "Microbiology", "Medicine", "Surgery",
            "Obstetrics & Gynecology", "Pediatrics",
        ],
        "years": range(2005, 2027),
        "count": 15,
    },
    "aiims": {
        "subjects": ["Physics", "Chemistry", "Biology", "General Knowledge"],
        "years": range(2015, 2020),
        "count": 20,
    },
    # SSC
    "ssc_cgl": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "General Intelligence & Reasoning", "General Awareness",
        ],
        "years": range(2000, 2027),
        "count": 25,
    },
    "ssc_chsl": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "General Intelligence & Reasoning", "General Awareness",
        ],
        "years": range(2003, 2027),
        "count": 20,
    },
    "ssc_mts": {
        "subjects": [
            "Numerical Aptitude", "English Language",
            "General Intelligence & Reasoning", "General Awareness",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "ssc_gd": {
        "subjects": [
            "Mathematics", "English/Hindi",
            "General Intelligence & Reasoning", "General Knowledge",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "ssc_cpo": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "General Intelligence & Reasoning", "General Awareness",
        ],
        "years": range(2005, 2027),
        "count": 15,
    },
    "ssc_je": {
        "subjects": [
            "General Intelligence & Reasoning", "General Awareness",
            "General Engineering (Civil & Structural)",
            "General Engineering (Electrical)",
            "General Engineering (Mechanical)",
        ],
        "years": range(2008, 2027),
        "count": 12,
    },
    # Central Exams
    "upsc_prelims": {
        "subjects": [
            "Indian Polity", "Indian History", "Geography",
            "Economy", "Environment & Ecology", "Science & Technology",
            "Current Affairs", "CSAT (Aptitude)",
        ],
        "years": range(1996, 2027),
        "count": 20,
    },
    "upsc_mains": {
        "subjects": [
            "Essay", "General Studies I", "General Studies II",
            "General Studies III", "General Studies IV (Ethics)",
        ],
        "years": range(2000, 2027),
        "count": 10,
    },
    "nda": {
        "subjects": ["Mathematics", "General Ability Test", "English", "General Knowledge"],
        "years": range(2000, 2027),
        "count": 20,
    },
    "cds": {
        "subjects": ["English", "General Knowledge", "Elementary Mathematics"],
        "years": range(2005, 2027),
        "count": 15,
    },
    "afcat": {
        "subjects": [
            "General Awareness", "Verbal Ability", "Numerical Ability",
            "Reasoning & Military Aptitude",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    # Railway
    "rrb_ntpc": {
        "subjects": [
            "Mathematics", "General Intelligence & Reasoning",
            "General Awareness", "General Science",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "rrb_group_d": {
        "subjects": [
            "Mathematics", "General Intelligence & Reasoning",
            "General Awareness", "General Science",
        ],
        "years": range(2008, 2027),
        "count": 20,
    },
    "rrb_je": {
        "subjects": [
            "Mathematics", "General Intelligence & Reasoning",
            "General Awareness", "General Science",
            "Technical Ability",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "rrb_alp": {
        "subjects": [
            "Mathematics", "General Intelligence & Reasoning",
            "General Science", "Technical Ability",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    # Banking
    "ibps_po": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "Reasoning Ability", "General Awareness",
            "Computer Knowledge",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "ibps_clerk": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "Reasoning Ability", "General Awareness",
            "Computer Knowledge",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "sbi_po": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "Reasoning Ability", "General Awareness",
        ],
        "years": range(2000, 2027),
        "count": 20,
    },
    "sbi_clerk": {
        "subjects": [
            "Quantitative Aptitude", "English Language",
            "Reasoning Ability", "General Awareness",
        ],
        "years": range(2005, 2027),
        "count": 15,
    },
    "rbi_grade_b": {
        "subjects": [
            "General Awareness", "Quantitative Aptitude",
            "English Language", "Reasoning",
            "Economic & Social Issues", "Finance & Management",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "nabard": {
        "subjects": [
            "Economic & Social Issues", "Agriculture & Rural Development",
            "Quantitative Aptitude", "Reasoning", "English",
        ],
        "years": range(2010, 2027),
        "count": 10,
    },
    "lic_aao": {
        "subjects": [
            "Quantitative Aptitude", "Reasoning Ability",
            "English Language", "General Knowledge",
            "Insurance & Financial Market Awareness",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    # Teaching
    "ctet": {
        "subjects": [
            "Child Development & Pedagogy", "Mathematics",
            "Environmental Studies", "Language I (Hindi/English)",
            "Language II", "Social Studies/Science",
        ],
        "years": range(2011, 2027),
        "count": 20,
    },
    "ugc_net": {
        "subjects": [
            "General Paper I (Teaching Aptitude)",
            "Computer Science", "Commerce", "Economics",
            "English Literature", "History", "Political Science",
            "Management", "Education", "Hindi Literature",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    "kvs": {
        "subjects": [
            "General English", "General Hindi",
            "General Knowledge & Current Affairs",
            "Reasoning Ability", "Computer Literacy",
            "Pedagogy",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    # State PSC
    "uppsc": {
        "subjects": [
            "General Studies I", "General Studies II",
            "General Hindi", "CSAT",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    "bpsc": {
        "subjects": ["General Studies", "CSAT", "General Hindi", "General Science"],
        "years": range(2005, 2027),
        "count": 15,
    },
    "mppsc": {
        "subjects": ["General Studies", "CSAT", "General Hindi", "General Science"],
        "years": range(2005, 2027),
        "count": 15,
    },
    "rpsc": {
        "subjects": [
            "General Knowledge", "General Science",
            "History & Culture of Rajasthan", "Indian Polity",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "tnpsc": {
        "subjects": [
            "General Studies", "Aptitude & Mental Ability",
            "Tamil Language", "English Language",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "wbpsc": {
        "subjects": ["General Studies", "English", "Bengali", "Arithmetic"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "appsc": {
        "subjects": ["General Studies", "Mental Ability", "Telugu", "English"],
        "years": range(2008, 2027),
        "count": 12,
    },
    # CBSE Board
    "cbse_10": {
        "subjects": [
            "Mathematics", "Science", "Social Science",
            "English", "Hindi",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "cbse_11": {
        "subjects": [
            "Physics", "Chemistry", "Mathematics", "Biology",
            "Accountancy", "Business Studies", "Economics",
            "English", "Computer Science", "Political Science",
            "History", "Geography",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "cbse_12": {
        "subjects": [
            "Physics", "Chemistry", "Mathematics", "Biology",
            "Accountancy", "Business Studies", "Economics",
            "English", "Computer Science", "Political Science",
            "History", "Geography",
        ],
        "years": range(2000, 2027),
        "count": 20,
    },
    # UP Board — English Medium
    "up_board_12_en": {
        "subjects": [
            "Physics", "Chemistry", "Mathematics", "Biology",
            "English", "Hindi", "Sanskrit",
            "Economics", "History", "Geography", "Civics",
            "Accountancy", "Business Studies", "Computer",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "up_board_10_en": {
        "subjects": [
            "Mathematics", "Science", "Social Science",
            "English", "Hindi", "Sanskrit", "Computer",
        ],
        "years": range(2008, 2027),
        "count": 20,
    },
    # UP Board — Hindi Medium (questions generated in Hindi)
    "up_board_12_hi": {
        "subjects": [
            "भौतिक विज्ञान (Physics)", "रसायन विज्ञान (Chemistry)",
            "गणित (Mathematics)", "जीव विज्ञान (Biology)",
            "अंग्रेजी (English)", "हिंदी (Hindi)", "संस्कृत (Sanskrit)",
            "अर्थशास्त्र (Economics)", "इतिहास (History)",
            "भूगोल (Geography)", "नागरिक शास्त्र (Civics)",
            "लेखाशास्त्र (Accountancy)", "व्यवसाय अध्ययन (Business Studies)",
            "कम्प्यूटर (Computer)",
        ],
        "years": range(2005, 2027),
        "count": 20,
        "language": "hi",
    },
    "up_board_10_hi": {
        "subjects": [
            "गणित (Mathematics)", "विज्ञान (Science)",
            "सामाजिक विज्ञान (Social Science)",
            "अंग्रेजी (English)", "हिंदी (Hindi)",
            "संस्कृत (Sanskrit)", "कम्प्यूटर (Computer)",
        ],
        "years": range(2008, 2027),
        "count": 20,
        "language": "hi",
    },
    # Other boards
    "icse_10": {
        "subjects": ["Mathematics", "Science (Physics)", "Science (Chemistry)", "Science (Biology)", "English", "History & Civics", "Geography"],
        "years": range(2005, 2027),
        "count": 15,
    },
    "isc_12": {
        "subjects": ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Computer Science", "Economics", "Accounts"],
        "years": range(2005, 2027),
        "count": 15,
    },
    # Law
    "clat": {
        "subjects": [
            "English Language", "Current Affairs & General Knowledge",
            "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "ailet": {
        "subjects": ["English", "General Knowledge", "Legal Aptitude", "Reasoning", "Mathematics"],
        "years": range(2010, 2027),
        "count": 12,
    },
    # MBA
    "cat": {
        "subjects": [
            "Quantitative Aptitude", "Verbal Ability & Reading Comprehension",
            "Data Interpretation & Logical Reasoning",
        ],
        "years": range(2000, 2027),
        "count": 15,
    },
    # Others
    "cuet": {
        "subjects": [
            "English", "General Test", "Mathematics",
            "Physics", "Chemistry", "Biology",
            "Accountancy", "Economics", "Business Studies",
            "History", "Political Science", "Geography",
        ],
        "years": range(2022, 2027),
        "count": 15,
    },
    "olympiad": {
        "subjects": [
            "Mathematics (IMO)", "Science (NSO)",
            "Physics (IPhO)", "Chemistry (IChO)",
            "Biology (IBO)", "Informatics (IOI)",
        ],
        "years": range(2005, 2027),
        "count": 10,
    },
    # ── Nursing & Paramedical ──
    "gnm": {
        "subjects": [
            "Anatomy & Physiology", "Nursing Foundations",
            "Community Health Nursing", "Medical-Surgical Nursing",
            "Obstetrics & Gynecology Nursing", "Pediatric Nursing",
            "Mental Health Nursing", "Microbiology",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "anm": {
        "subjects": [
            "Community Health Nursing", "Health Promotion",
            "Child Health Nursing", "Midwifery",
            "Health Centre Management", "Nutrition",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "bsc_nursing": {
        "subjects": [
            "Anatomy", "Physiology", "Biochemistry",
            "Microbiology", "Nursing Foundations",
            "Medical-Surgical Nursing", "Pharmacology",
            "Community Health Nursing", "OBG Nursing",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "bpharm": {
        "subjects": [
            "Pharmaceutical Chemistry", "Pharmacology",
            "Pharmaceutics", "Pharmacognosy",
            "Pharmaceutical Analysis", "Hospital & Clinical Pharmacy",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "dpharm": {
        "subjects": [
            "Pharmaceutics", "Pharmaceutical Chemistry",
            "Pharmacology & Toxicology", "Biochemistry & Clinical Pathology",
            "Human Anatomy & Physiology", "Drug Store & Business Management",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "dmlt": {
        "subjects": [
            "Clinical Pathology", "Microbiology",
            "Biochemistry", "Hematology & Blood Banking",
        ],
        "years": range(2015, 2027),
        "count": 12,
    },
    # ── State Police Exams ──
    "up_police": {
        "subjects": [
            "General Hindi", "General Knowledge", "Numerical & Mental Ability",
            "Mental Aptitude/IQ/Reasoning", "Indian Constitution & Law",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "up_si": {
        "subjects": [
            "General Hindi", "General Knowledge", "Numerical & Mental Ability",
            "Mental Aptitude/IQ/Reasoning", "Indian Law & Constitution",
        ],
        "years": range(2005, 2027),
        "count": 20,
    },
    "bihar_police": {
        "subjects": [
            "Hindi", "English", "Mathematics", "General Knowledge",
            "General Science", "Current Affairs",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "bihar_si": {
        "subjects": [
            "Hindi", "English", "General Studies", "Current Affairs",
            "Reasoning & Logic", "Indian Constitution",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "mp_police": {
        "subjects": [
            "General Knowledge & Science", "Reasoning & Aptitude",
            "Quantitative Aptitude", "Hindi & English",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "raj_police": {
        "subjects": [
            "Reasoning & Logic", "General Knowledge",
            "General Science", "Rajasthan GK",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "haryana_police": {
        "subjects": [
            "General Knowledge", "Reasoning", "Quantitative Aptitude",
            "Haryana GK", "Hindi & English",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "delhi_police": {
        "subjects": [
            "Reasoning & General Intelligence", "General Knowledge & Current Affairs",
            "Quantitative Aptitude", "English & Hindi Comprehension",
        ],
        "years": range(2005, 2027),
        "count": 15,
    },
    # ── State TET Exams ──
    "uptet": {
        "subjects": [
            "Child Development & Pedagogy", "Hindi Language",
            "English Language", "Mathematics", "Environmental Studies",
            "Social Studies", "Science",
        ],
        "years": range(2011, 2027),
        "count": 20,
    },
    "supertet": {
        "subjects": [
            "Hindi Language", "English", "Mathematics & Science",
            "Reasoning & Logic", "General Knowledge", "Teaching Methodology",
        ],
        "years": range(2015, 2027),
        "count": 15,
    },
    "bihar_tet": {
        "subjects": [
            "Child Development & Pedagogy", "Language I",
            "Language II", "Mathematics", "Environmental Studies",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "mptet": {
        "subjects": [
            "Child Development & Pedagogy", "Hindi Language",
            "English Language", "Mathematics", "Environmental Studies",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "reet": {
        "subjects": [
            "Child Development & Pedagogy", "Hindi",
            "English", "Mathematics", "Environmental Studies",
            "Rajasthan GK",
        ],
        "years": range(2010, 2027),
        "count": 15,
    },
    "htet": {
        "subjects": [
            "Child Development & Pedagogy", "Hindi",
            "English", "Mathematics", "General Knowledge",
            "Haryana GK",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    # ── State Revenue/Patwari ──
    "up_lekhpal": {
        "subjects": [
            "General Hindi", "Mathematics", "General Knowledge",
            "Rural Economy & Agriculture", "Village Society",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "mp_patwari": {
        "subjects": [
            "General Knowledge", "Quantitative Aptitude",
            "Hindi Language", "Computer Knowledge",
            "Rural Economy", "Panchayati Raj",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "raj_patwari": {
        "subjects": [
            "General Knowledge", "Rajasthan GK",
            "Hindi", "Mathematics", "Computer Knowledge",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    # ── State Group C/D ──
    "up_vdo": {
        "subjects": [
            "General Hindi", "General Knowledge", "Reasoning",
            "Numerical Ability", "Panchayati Raj System",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "up_ro_aro": {
        "subjects": [
            "General Hindi", "General Studies", "Reasoning",
            "Statistics", "Current Affairs",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "mp_vyapam": {
        "subjects": [
            "General Knowledge", "Reasoning", "Quantitative Aptitude",
            "Hindi", "Computer Knowledge",
        ],
        "years": range(2008, 2027),
        "count": 15,
    },
    "hssc": {
        "subjects": [
            "General Knowledge", "Reasoning", "Mathematics",
            "English", "Hindi", "Haryana GK",
        ],
        "years": range(2008, 2027),
        "count": 12,
    },
    "jssc": {
        "subjects": [
            "General Knowledge", "Reasoning", "Mathematics",
            "Hindi", "Jharkhand GK",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    # ── More State PSC ──
    "hpsc": {
        "subjects": ["General Studies", "CSAT", "Haryana GK"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "jpsc": {
        "subjects": ["General Studies", "CSAT", "Jharkhand GK"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "ukpsc": {
        "subjects": ["General Studies", "CSAT", "Uttarakhand GK"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "cgpsc": {
        "subjects": ["General Studies", "CSAT", "CG GK"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "gpsc": {
        "subjects": ["General Studies", "Gujarat GK", "Reasoning"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "opsc": {
        "subjects": ["General Studies", "Odisha GK", "Reasoning"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "ppsc": {
        "subjects": ["General Studies", "Punjab GK", "Mental Ability"],
        "years": range(2008, 2027),
        "count": 12,
    },
    "kpsc": {
        "subjects": ["General Studies", "Karnataka GK", "Reasoning"],
        "years": range(2008, 2027),
        "count": 12,
    },
    # ── Other exams ──
    "icar": {
        "subjects": [
            "Agriculture", "Horticulture", "Animal Husbandry",
            "Agricultural Engineering", "General Studies",
        ],
        "years": range(2008, 2027),
        "count": 12,
    },
    "fci": {
        "subjects": [
            "General Intelligence & Reasoning", "General Knowledge",
            "Quantitative Aptitude", "English Language",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "epfo": {
        "subjects": [
            "General English", "Quantitative Aptitude",
            "General Awareness", "Social Security & Insurance",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "ntse": {
        "subjects": [
            "Mental Ability Test (MAT)", "Scholastic Aptitude Test (SAT)",
            "Mathematics", "Science", "Social Science",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    # ── Additional GATE branches ──
    "gate_in": {
        "subjects": [
            "Measurements", "Sensors & Transducers", "Control Systems",
            "Analog Electronics", "Digital Electronics", "Signals & Systems",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "gate_bt": {
        "subjects": [
            "Microbiology", "Biochemistry", "Molecular Biology",
            "Genetics", "Bioprocess Engineering", "Immunology",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "gate_pi": {
        "subjects": [
            "Manufacturing Processes", "Industrial Engineering",
            "Quality Management", "Operations Research",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    "gate_xe": {
        "subjects": [
            "Engineering Mathematics", "Fluid Mechanics",
            "Thermodynamics", "Polymer Science",
        ],
        "years": range(2005, 2027),
        "count": 12,
    },
    # Insurance
    "lic_ado": {
        "subjects": [
            "Reasoning Ability", "Quantitative Aptitude",
            "English Language", "General Knowledge",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "sebi": {
        "subjects": [
            "General Awareness", "Quantitative Aptitude",
            "English Language", "Reasoning",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "ibps_so": {
        "subjects": [
            "Professional Knowledge (IT)", "Professional Knowledge (Agriculture)",
            "Professional Knowledge (HR)", "Professional Knowledge (Marketing)",
            "Reasoning", "English", "Quantitative Aptitude",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "rbi_assistant": {
        "subjects": [
            "Reasoning", "Quantitative Aptitude",
            "English Language", "General Awareness",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "rpf": {
        "subjects": [
            "General Awareness", "Arithmetic", "General Intelligence & Reasoning",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "ssc_steno": {
        "subjects": [
            "General Intelligence & Reasoning", "General Awareness",
            "English Language",
        ],
        "years": range(2008, 2027),
        "count": 12,
    },
    "dsssb": {
        "subjects": [
            "General Awareness", "General Intelligence & Reasoning",
            "Quantitative Aptitude", "English Language & Comprehension",
            "Hindi Language",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "capf": {
        "subjects": [
            "General Ability & Intelligence", "General Studies",
            "Essay", "English Comprehension",
        ],
        "years": range(2010, 2027),
        "count": 12,
    },
    "jipmer": {
        "subjects": ["Physics", "Chemistry", "Biology", "English & Logic"],
        "years": range(2015, 2020),
        "count": 15,
    },
    # ── MBA ──
    "xat": {
        "subjects": [
            "Verbal & Logical Ability", "Decision Making",
            "Quantitative Ability & Data Interpretation",
        ],
        "years": range(2008, 2027),
        "count": 12,
    },
    "mat": {
        "subjects": [
            "Language Comprehension", "Mathematical Skills",
            "Data Analysis & Sufficiency", "Intelligence & Critical Reasoning",
            "Indian & Global Environment",
        ],
        "years": range(2008, 2027),
        "count": 12,
    },
}

GEMINI_PROMPT = """You are an expert Indian exam question paper generator.

Generate exactly {count} multiple-choice questions (MCQs) for the following exam:

Exam: {exam_name}
Subject: {subject}
Year: {year}
Difficulty: Mix of easy, medium, and hard
{language_instruction}
IMPORTANT RULES:
1. Questions must be realistic, exam-level difficulty for {exam_name}
2. Each question must have exactly 4 options
3. Only ONE correct answer per question
4. Include a brief but clear explanation for each answer
5. Questions should cover different topics within the subject
6. For numerical/calculation questions, show the solution approach in the explanation
7. Make questions as authentic as possible — similar to real {exam_name} papers

Return ONLY a valid JSON array with this exact structure (no markdown, no code blocks):
[
  {{
    "question": "The question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Brief explanation of the correct answer",
    "difficulty": "easy|medium|hard"
  }}
]"""


def parse_gemini_response(text):
    """Extract JSON array from Gemini response, handling markdown code blocks."""
    text = text.strip()
    # Remove markdown code blocks if present
    if text.startswith("```"):
        lines = text.split("\n")
        # Remove first and last line (``` markers)
        lines = [l for l in lines if not l.strip().startswith("```")]
        text = "\n".join(lines)
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        # Try to find JSON array in the text
        start = text.find("[")
        end = text.rfind("]") + 1
        if start != -1 and end > start:
            return json.loads(text[start:end])
        raise


class Command(BaseCommand):
    help = "Generate PYQ-style questions using Gemini AI"

    def add_arguments(self, parser):
        parser.add_argument("--exam", type=str, help="Specific exam type (e.g. jee_main)")
        parser.add_argument("--subject", type=str, help="Specific subject")
        parser.add_argument("--year", type=int, help="Specific year")
        parser.add_argument("--count", type=int, help="Override question count per combo")
        parser.add_argument("--dry-run", action="store_true", help="Show plan without generating")
        parser.add_argument("--skip-existing", action="store_true", default=True,
                            help="Skip combos that already have enough questions")

    def handle(self, *args, **options):
        import os
        import requests as req

        api_key = os.environ.get("GEMINI_API_KEY", "")
        if not api_key and not options["dry_run"]:
            self.stderr.write(self.style.ERROR("GEMINI_API_KEY environment variable required"))
            return

        # All Gemini calls go through config.gemini (Interactions API, gemini-3.8-flash).
        # NOTE: a Free Tier key allows ~20 requests/day, so bulk generation needs a paid tier.
        from config.gemini import gemini_text

        def call_gemini(prompt_text, retries=3):
            """Call Gemini. No third-party fallback: prompts and exam content stay with Google's API."""
            return gemini_text(prompt_text, max_tokens=8192, retries=retries)

        from pyq.models import ExamQuestion, ExamType

        exam_filter = options.get("exam")
        subject_filter = options.get("subject")
        year_filter = options.get("year")
        count_override = options.get("count")
        dry_run = options["dry_run"]
        skip_existing = options["skip_existing"]

        valid_exams = {c[0] for c in ExamType.choices}

        # Build work list: (exam, subj, yr) -> (count, language)
        plan = {}
        for exam_key, config in GENERATION_PLAN.items():
            if exam_filter and exam_key != exam_filter:
                continue
            if exam_key not in valid_exams:
                continue
            lang = config.get("language", "en")
            for subj in config["subjects"]:
                if subject_filter and subj.lower() != subject_filter.lower():
                    continue
                years = config["years"]
                if year_filter:
                    if year_filter not in years:
                        continue
                    years = [year_filter]
                for yr in years:
                    count = count_override or config["count"]
                    plan[(exam_key, subj, yr)] = (count, lang)

        total_qs = sum(v[0] for v in plan.values())
        self.stdout.write(f"\nGeneration plan: {len(plan)} combos, ~{total_qs} questions")

        if dry_run:
            for (exam, subj, yr), (cnt, lang) in sorted(plan.items()):
                existing = ExamQuestion.objects.filter(
                    exam_type=exam, subject__iexact=subj, year=yr
                ).count()
                marker = " [SKIP]" if existing >= cnt and skip_existing else ""
                lang_tag = f" [{lang}]" if lang != "en" else ""
                self.stdout.write(f"  {exam} | {yr} | {subj}: {cnt} qs (existing: {existing}){marker}{lang_tag}")
            return

        total_generated = 0
        total_skipped = 0
        errors = 0
        exam_labels = dict(ExamType.choices)

        for (exam, subj, yr), (cnt, lang) in sorted(plan.items()):
            # Check existing
            existing = ExamQuestion.objects.filter(
                exam_type=exam, subject__iexact=subj, year=yr
            ).count()
            if existing >= cnt and skip_existing:
                total_skipped += 1
                continue

            needed = cnt - existing if skip_existing else cnt
            exam_name = exam_labels.get(exam, exam)
            lang_tag = f" [{lang}]" if lang != "en" else ""
            self.stdout.write(f"\n  Generating {needed}q: {exam_name} | {yr} | {subj}{lang_tag}...")

            language_instruction = ""
            if lang == "hi":
                language_instruction = "Language: Generate ALL questions, options, and explanations in HINDI (Devanagari script). Use Hindi throughout.\n"

            prompt = GEMINI_PROMPT.format(
                count=needed, exam_name=exam_name, subject=subj, year=yr,
                language_instruction=language_instruction,
            )

            try:
                response_text = call_gemini(prompt)
                if not response_text:
                    raise Exception("No response from Gemini API")
                questions = parse_gemini_response(response_text)

                saved = 0
                for q in questions[:needed]:
                    if not isinstance(q, dict):
                        continue
                    q_text = q.get("question", "").strip()
                    opts = q.get("options", [])
                    correct = q.get("correct", 0)
                    if not q_text or len(opts) != 4:
                        continue
                    if not isinstance(correct, int) or correct < 0 or correct > 3:
                        correct = 0

                    try:
                        ExamQuestion.objects.create(
                            exam_type=exam,
                            year=yr,
                            subject=subj,
                            question_text=q_text,
                            options=opts,
                            correct_answer=correct,
                            explanation=q.get("explanation", ""),
                            difficulty=q.get("difficulty", "medium"),
                            source="ai_generated",
                            language=lang,
                        )
                        saved += 1
                    except IntegrityError:
                        # Duplicate question
                        continue

                total_generated += saved
                self.stdout.write(self.style.SUCCESS(f"    Saved {saved}/{len(questions)}"))

            except Exception as e:
                errors += 1
                self.stderr.write(self.style.ERROR(f"    ERROR: {e}"))

            # Rate limit
            time.sleep(1)

        self.stdout.write(self.style.SUCCESS(
            f"\nDone! Generated: {total_generated}, Skipped: {total_skipped}, Errors: {errors}"
        ))
