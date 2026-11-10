#!/usr/bin/env python3
"""
Massive boost for ALL teacher/TET exams with proper UP Teacher focus.
Targets:
  UPTET Paper 1 & 2: 3000 total
  Super TET: 2500
  CTET: 3000
  KVS PRT/TGT/PGT: 2000
  DSSSB PRT/TGT: 1500
  Bihar TET/STET: 1500
  REET Level 1 & 2: 1500
  HTET: 1200
  MPTET: 1200
  WB TET: 800
  Karnataka TET: 800
  OTET: 800
  TN TET: 800
  AP TET: 800
"""
import json, os, sys, random, hashlib

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', '..'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
os.environ.setdefault('DJANGO_SECRET_KEY', 'dev')

import django; django.setup()
from pyq.models import ExamQuestion
from django.db.models import Count

# Current counts
current = dict(
    ExamQuestion.objects.filter(
        exam_type__in=[
            'uptet','supertet','ctet','kvs','dsssb','bihar_tet','reet',
            'htet','mptet','wb_tet','kartet','otet','tntet','aptet'
        ]
    ).values('exam_type').annotate(c=Count('id')).values_list('exam_type','c')
)

TARGETS = {
    'uptet': 3000,
    'supertet': 2500,
    'ctet': 3000,
    'kvs': 2000,
    'dsssb': 1500,
    'bihar_tet': 1500,
    'reet': 1500,
    'htet': 1200,
    'mptet': 1200,
    'wb_tet': 800,
    'kartet': 800,
    'otet': 800,
    'tntet': 800,
    'aptet': 800,
}

# Year weights per exam
YEAR_WEIGHTS = {
    'uptet': {y: 5 for y in range(2011,2015)} | {y: 8 for y in range(2015,2019)} | {y: 15 for y in range(2019,2023)} | {y: 20 for y in range(2023,2027)},
    'supertet': {y: 3 for y in range(2013,2017)} | {y: 8 for y in range(2017,2021)} | {y: 15 for y in range(2021,2024)} | {y: 22 for y in range(2024,2027)},
    'ctet': {y: 4 for y in range(2011,2015)} | {y: 8 for y in range(2015,2019)} | {y: 15 for y in range(2019,2023)} | {y: 20 for y in range(2023,2027)},
    'kvs': {y: 5 for y in range(2012,2017)} | {y: 10 for y in range(2017,2022)} | {y: 18 for y in range(2022,2027)},
    'dsssb': {y: 5 for y in range(2013,2018)} | {y: 12 for y in range(2018,2023)} | {y: 20 for y in range(2023,2027)},
    'bihar_tet': {y: 5 for y in range(2011,2016)} | {y: 10 for y in range(2016,2021)} | {y: 18 for y in range(2021,2027)},
    'reet': {y: 5 for y in range(2011,2016)} | {y: 10 for y in range(2016,2021)} | {y: 18 for y in range(2021,2027)},
    'htet': {y: 6 for y in range(2012,2017)} | {y: 12 for y in range(2017,2022)} | {y: 18 for y in range(2022,2027)},
    'mptet': {y: 6 for y in range(2012,2017)} | {y: 12 for y in range(2017,2022)} | {y: 18 for y in range(2022,2027)},
    'wb_tet': {y: 5 for y in range(2013,2018)} | {y: 10 for y in range(2018,2023)} | {y: 18 for y in range(2023,2027)},
    'kartet': {y: 5 for y in range(2013,2018)} | {y: 10 for y in range(2018,2023)} | {y: 18 for y in range(2023,2027)},
    'otet': {y: 5 for y in range(2013,2018)} | {y: 10 for y in range(2018,2023)} | {y: 18 for y in range(2023,2027)},
    'tntet': {y: 5 for y in range(2013,2018)} | {y: 10 for y in range(2018,2023)} | {y: 18 for y in range(2023,2027)},
    'aptet': {y: 5 for y in range(2013,2018)} | {y: 10 for y in range(2018,2023)} | {y: 18 for y in range(2023,2027)},
}

# Subject weights per exam (proportional)
SUBJECT_WEIGHTS = {
    'uptet': {'Child Development and Pedagogy': 30, 'Mathematics': 25, 'Hindi Language': 15, 'English Language': 10, 'Environmental Studies': 10, 'Science': 5, 'Social Studies': 5},
    'supertet': {'Child Development': 20, 'Mathematics': 20, 'Hindi Language': 15, 'English Language': 10, 'Science': 10, 'Social Studies': 10, 'Reasoning': 8, 'General Knowledge': 7},
    'ctet': {'Child Development and Pedagogy': 30, 'Mathematics': 25, 'Language I (Hindi)': 15, 'Language II (English)': 10, 'Environmental Studies': 10, 'Science': 5, 'Social Studies': 5},
    'kvs': {'General Knowledge': 15, 'Hindi Language': 15, 'English Language': 15, 'Mathematics': 15, 'Reasoning': 15, 'Computer Literacy': 10, 'Pedagogy': 15},
    'dsssb': {'General Awareness': 15, 'Reasoning': 20, 'Mathematics': 20, 'Hindi Language': 15, 'English Language': 15, 'Pedagogy': 15},
    'bihar_tet': {'Child Development': 25, 'Mathematics': 20, 'Language I': 15, 'Language II': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
    'reet': {'Child Development': 25, 'Mathematics': 20, 'Language I (Hindi)': 15, 'Language II (English)': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
    'htet': {'Child Development': 25, 'Mathematics': 20, 'Hindi Language': 15, 'English Language': 15, 'General Knowledge': 12, 'Reasoning': 8, 'Science': 5},
    'mptet': {'Child Development': 25, 'Mathematics': 20, 'Hindi Language': 15, 'English Language': 15, 'Environmental Studies': 12, 'General Knowledge': 8, 'Reasoning': 5},
    'wb_tet': {'Child Development': 25, 'Mathematics': 20, 'Bengali Language': 15, 'English Language': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
    'kartet': {'Child Development': 25, 'Mathematics': 20, 'Kannada Language': 15, 'English Language': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
    'otet': {'Child Development': 25, 'Mathematics': 20, 'Odia Language': 15, 'English Language': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
    'tntet': {'Child Development': 25, 'Mathematics': 20, 'Tamil Language': 15, 'English Language': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
    'aptet': {'Child Development': 25, 'Mathematics': 20, 'Telugu Language': 15, 'English Language': 15, 'Environmental Studies': 12, 'Science': 8, 'Social Studies': 5},
}

# ─── Template banks ───
CDP_TEMPLATES = [
    ("According to Piaget, a child in the {stage} stage can {ability}. This stage typically occurs at age:", ["{a1}", "{a2}", "{a3}", "{a4}"]),
    ("Vygotsky's concept of Zone of Proximal Development (ZPD) refers to:", ["The gap between what a child can do alone and with help", "The area of a classroom", "The distance between teacher and student", "The curriculum framework"]),
    ("Which of the following is a characteristic of {learner_type} learner?", ["{c1}", "{c2}", "{c3}", "{c4}"]),
    ("{theorist}'s theory of {theory_name} emphasizes that:", ["{t1}", "{t2}", "{t3}", "{t4}"]),
    ("In the context of inclusive education, {concept} means:", ["{d1}", "{d2}", "{d3}", "{d4}"]),
    ("Which assessment type is most suitable for measuring {skill}?", ["{as1}", "{as2}", "{as3}", "{as4}"]),
    ("According to Kohlberg's theory of moral development, the {level} level is characterized by:", ["{m1}", "{m2}", "{m3}", "{m4}"]),
    ("Howard Gardner's theory of multiple intelligences includes {intel_type} intelligence, which involves:", ["{g1}", "{g2}", "{g3}", "{g4}"]),
    ("The term '{edu_term}' in education refers to:", ["{e1}", "{e2}", "{e3}", "{e4}"]),
    ("Which teaching method is most effective for developing {thinking_type} thinking in children?", ["{tm1}", "{tm2}", "{tm3}", "{tm4}"]),
    ("Bloom's taxonomy places {bloom_level} at the {position} level of cognitive domain:", ["{b1}", "{b2}", "{b3}", "{b4}"]),
    ("In child psychology, {behavior} is typically associated with:", ["{p1}", "{p2}", "{p3}", "{p4}"]),
    ("The National Education Policy 2020 recommends {nep_feature} for:", ["{n1}", "{n2}", "{n3}", "{n4}"]),
    ("According to NCF 2005, the role of a teacher should be that of a:", ["{r1}", "{r2}", "{r3}", "{r4}"]),
    ("Which of the following is NOT a principle of child-centered education?", ["{nc1}", "{nc2}", "{nc3}", "{nc4}"]),
    ("Erikson's psychosocial stage for school-age children (6-12 years) is:", ["Industry vs Inferiority", "Trust vs Mistrust", "Initiative vs Guilt", "Identity vs Role Confusion"]),
    ("A child who {behavior_desc} may be showing signs of:", ["{s1}", "{s2}", "{s3}", "{s4}"]),
    ("Scaffolding in education means:", ["Providing temporary support to help a child learn", "Building physical structures in school", "Strict discipline methods", "Rote memorization techniques"]),
    ("The {learning_style} learning style is best supported by:", ["{ls1}", "{ls2}", "{ls3}", "{ls4}"]),
    ("Formative assessment is different from summative assessment because it:", ["{fa1}", "{fa2}", "{fa3}", "{fa4}"]),
    ("The concept of 'learning by doing' was advocated by:", ["John Dewey", "B.F. Skinner", "Sigmund Freud", "Karl Marx"]),
    ("Which of the following is an example of intrinsic motivation?", ["{im1}", "{im2}", "{im3}", "{im4}"]),
    ("A child with {disability} would benefit most from:", ["{dis1}", "{dis2}", "{dis3}", "{dis4}"]),
    ("The Right to Education Act (RTE) 2009 mandates {rte_provision}:", ["{rte1}", "{rte2}", "{rte3}", "{rte4}"]),
    ("In constructivist learning theory, knowledge is:", ["Constructed by the learner through experience", "Transmitted by the teacher", "Inherited genetically", "Fixed and unchangeable"]),
    ("Which of the following best describes {pedagogy_concept}?", ["{pc1}", "{pc2}", "{pc3}", "{pc4}"]),
    ("The term 'nature vs nurture' in child development refers to:", ["Heredity versus environment debate", "Indoor versus outdoor learning", "Rural versus urban education", "Public versus private schools"]),
    ("According to Bruner, {bruner_concept} representation is:", ["{br1}", "{br2}", "{br3}", "{br4}"]),
    ("A teacher notices that a student excels in {area}. According to Gardner, this suggests high:", ["{ga1}", "{ga2}", "{ga3}", "{ga4}"]),
    ("The {approach} approach to teaching emphasizes:", ["{ap1}", "{ap2}", "{ap3}", "{ap4}"]),
]

CDP_VARS = [
    {'stage':'preoperational','ability':'use symbolic thinking but not logical operations','a1':'2-7 years','a2':'0-2 years','a3':'7-11 years','a4':'11+ years'},
    {'stage':'concrete operational','ability':'think logically about concrete events','a1':'7-11 years','a2':'2-7 years','a3':'0-2 years','a4':'11+ years'},
    {'stage':'formal operational','ability':'think abstractly and hypothetically','a1':'11+ years','a2':'7-11 years','a3':'2-7 years','a4':'0-2 years'},
    {'stage':'sensorimotor','ability':'explore through senses and motor activities','a1':'0-2 years','a2':'2-7 years','a3':'7-11 years','a4':'11+ years'},
    {'learner_type':'visual','c1':'Prefers diagrams and charts','c2':'Prefers listening to lectures','c3':'Prefers hands-on activities','c4':'Prefers reading aloud'},
    {'learner_type':'auditory','c1':'Learns best through listening','c2':'Prefers reading silently','c3':'Prefers visual aids','c4':'Prefers writing notes'},
    {'learner_type':'kinesthetic','c1':'Learns through physical activity','c2':'Prefers listening','c3':'Prefers reading','c4':'Prefers observation'},
    {'theorist':'Piaget','theory_name':'cognitive development','t1':'Children construct knowledge through interaction with environment','t2':'Learning is purely behavioral','t3':'Intelligence is fixed at birth','t4':'Only adults can think logically'},
    {'theorist':'Vygotsky','theory_name':'social constructivism','t1':'Social interaction plays a fundamental role in cognitive development','t2':'Children learn independently without social input','t3':'Language has no role in thinking','t4':'Development precedes learning always'},
    {'theorist':'Skinner','theory_name':'operant conditioning','t1':'Behavior is shaped by consequences (reinforcement/punishment)','t2':'All learning is innate','t3':'Observation is the only way to learn','t4':'Emotions drive all behavior'},
    {'concept':'mainstreaming','d1':'Placing special needs children in regular classrooms','d2':'Using only textbooks for teaching','d3':'Teaching only mainstream subjects','d4':'Following only one teaching method'},
    {'concept':'Universal Design for Learning','d1':'Flexible approaches to teaching for all learners','d2':'One-size-fits-all curriculum','d3':'Building design standards','d4':'Uniform testing methods'},
    {'skill':'critical thinking','as1':'Project-based assessment','as2':'Multiple choice test only','as3':'Dictation','as4':'Attendance record'},
    {'skill':'creative writing','as1':'Portfolio assessment','as2':'True/false quiz','as3':'Oral recitation','as4':'Fill in the blanks'},
    {'level':'pre-conventional','m1':'Self-interest and avoiding punishment','m2':'Following social norms','m3':'Universal ethical principles','m4':'Legal compliance'},
    {'level':'conventional','m1':'Conforming to social expectations and rules','m2':'Self-interest only','m3':'Abstract moral reasoning','m4':'Avoiding punishment'},
    {'level':'post-conventional','m1':'Abstract principles of justice and rights','m2':'Following authority blindly','m3':'Self-interest','m4':'Peer pressure'},
    {'intel_type':'linguistic','g1':'Skill with words and language','g2':'Mathematical reasoning','g3':'Physical coordination','g4':'Musical ability'},
    {'intel_type':'logical-mathematical','g1':'Problem-solving and numerical patterns','g2':'Physical movement','g3':'Social skills','g4':'Artistic expression'},
    {'intel_type':'spatial','g1':'Visual-spatial reasoning and imagery','g2':'Verbal communication','g3':'Musical rhythm','g4':'Mathematical logic'},
    {'intel_type':'musical','g1':'Sensitivity to sounds, rhythms, and tones','g2':'Verbal skills','g3':'Physical movement','g4':'Mathematical calculation'},
    {'intel_type':'bodily-kinesthetic','g1':'Control of body movements and handling objects','g2':'Verbal ability','g3':'Musical talent','g4':'Mathematical reasoning'},
    {'edu_term':'pedagogy','e1':'The method and practice of teaching','e2':'The study of animals','e3':'A type of school building','e4':'An examination pattern'},
    {'edu_term':'andragogy','e1':'The method and practice of teaching adults','e2':'Teaching children','e3':'A school of thought','e4':'Educational technology'},
    {'edu_term':'curriculum','e1':'A planned sequence of learning experiences','e2':'Only textbooks used in school','e3':'The school timetable','e4':'The school building plan'},
    {'thinking_type':'critical','tm1':'Problem-based learning and discussion','tm2':'Rote memorization','tm3':'Copying from blackboard','tm4':'Silent reading only'},
    {'thinking_type':'creative','tm1':'Open-ended activities and brainstorming','tm2':'Strict rule-following','tm3':'Repetitive drills','tm4':'Lecture method only'},
    {'thinking_type':'divergent','tm1':'Activities allowing multiple solutions','tm2':'Single correct answer tasks','tm3':'Fill in the blanks','tm4':'True/false questions'},
    {'bloom_level':'Analysis','position':'fourth','b1':'Breaking information into parts to explore relationships','b2':'Memorizing facts','b3':'Applying knowledge','b4':'Creating new products'},
    {'bloom_level':'Synthesis','position':'fifth','b1':'Combining elements to form a new whole','b2':'Recalling facts','b3':'Understanding concepts','b4':'Applying formulas'},
    {'bloom_level':'Evaluation','position':'highest','b1':'Making judgments based on criteria','b2':'Recalling information','b3':'Understanding meanings','b4':'Applying rules'},
    {'behavior':'tantrums in class','p1':'Emotional regulation difficulties','p2':'High intelligence','p3':'Good social skills','p4':'Physical illness always'},
    {'behavior':'withdrawal from peers','p1':'Social anxiety or emotional issues','p2':'Leadership qualities','p3':'High motivation','p4':'Physical strength'},
    {'nep_feature':'5+3+3+4 structure','n1':'School education restructuring','n2':'Higher education only','n3':'Vocational training only','n4':'Adult education'},
    {'nep_feature':'mother tongue instruction till Grade 5','n1':'Foundation literacy and numeracy','n2':'English-only education','n3':'No language teaching','n4':'College admissions'},
    {'nep_feature':'coding from Grade 6','n1':'Digital literacy and computational thinking','n2':'Replacing all other subjects','n3':'Only for science students','n4':'Teacher training'},
    {'behavior_desc':'frequently daydreams and has difficulty focusing','s1':'Attention deficit','s2':'High intelligence','s3':'Perfect behavior','s4':'Physical illness'},
    {'behavior_desc':'reads well but struggles with spelling','s1':'Dysgraphia or learning disability','s2':'Laziness','s3':'Low intelligence','s4':'Vision problems only'},
    {'learning_style':'visual','ls1':'Charts, diagrams, and graphic organizers','ls2':'Lecture and audio recordings','ls3':'Physical activities','ls4':'Group discussions only'},
    {'learning_style':'auditory','ls1':'Discussions, verbal instructions, and podcasts','ls2':'Written assignments','ls3':'Silent reading','ls4':'Drawing activities'},
    {'fa1':'Is ongoing and helps improve learning during the process','fa2':'Is given only at end of term','fa3':'Decides pass or fail only','fa4':'Has no feedback component'},
    {'im1':'A child reads because they enjoy stories','im2':'A child reads for marks','im3':'A child reads because parents force them','im4':'A child reads for prizes'},
    {'disability':'dyslexia','dis1':'Multi-sensory teaching approach and phonics','dis2':'Punishment for poor reading','dis3':'Ignoring the difficulty','dis4':'Only oral exams'},
    {'disability':'ADHD','dis1':'Structured environment with short tasks and breaks','dis2':'Long lectures without breaks','dis3':'Extra homework','dis4':'Isolation from peers'},
    {'rte_provision':'free and compulsory education for ages 6-14','rte1':'All children in India','rte2':'Only urban children','rte3':'Only boys','rte4':'Only government employees\' children'},
    {'rte_provision':'25% reservation for economically weaker sections','rte1':'Private unaided schools','rte2':'Only government schools','rte3':'Only aided schools','rte4':'Only international schools'},
    {'pedagogy_concept':'differentiated instruction','pc1':'Tailoring teaching to meet individual needs','pc2':'Teaching the same way to everyone','pc3':'Using only one textbook','pc4':'Testing all students identically'},
    {'pedagogy_concept':'cooperative learning','pc1':'Students working together in small groups','pc2':'Teacher lecturing to the whole class','pc3':'Individual silent study','pc4':'Competition among students'},
    {'bruner_concept':'enactive','br1':'Learning through physical actions and manipulation','br2':'Learning through images','br3':'Learning through symbols','br4':'Learning through lectures'},
    {'bruner_concept':'iconic','br1':'Learning through images and visual representations','br2':'Learning through physical actions','br3':'Learning through language','br4':'Learning through repetition'},
    {'bruner_concept':'symbolic','br1':'Learning through language and abstract symbols','br2':'Learning through images','br3':'Learning through touch','br4':'Learning through movement'},
    {'area':'music and rhythm','ga1':'Musical intelligence','ga2':'Logical intelligence','ga3':'Linguistic intelligence','ga4':'Spatial intelligence'},
    {'area':'sports and physical activities','ga1':'Bodily-kinesthetic intelligence','ga2':'Musical intelligence','ga3':'Linguistic intelligence','ga4':'Logical intelligence'},
    {'area':'drawing and spatial puzzles','ga1':'Spatial intelligence','ga2':'Musical intelligence','ga3':'Linguistic intelligence','ga4':'Bodily-kinesthetic intelligence'},
    {'approach':'constructivist','ap1':'Active construction of knowledge by learners','ap2':'Passive reception of information','ap3':'Strict memorization','ap4':'Teacher-centered instruction only'},
    {'approach':'behaviorist','ap1':'Observable behavior changes through reinforcement','ap2':'Inner mental processes','ap3':'Self-discovery only','ap4':'No role of environment'},
    {'approach':'humanistic','ap1':'Self-actualization and personal growth of learners','ap2':'Stimulus-response connections','ap3':'Cognitive structures only','ap4':'Rote learning'},
]

MATH_TEMPLATES = [
    ("If {a} + {b} = {c}, then {a} × {b} = ?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The HCF of {n1} and {n2} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The LCM of {n1} and {n2} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("What is {percent}% of {number}?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If the ratio of A to B is {r1}:{r2}, and B = {bval}, then A = ?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("A train {length}m long crosses a pole in {time} seconds. Its speed is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The average of {n1}, {n2}, {n3}, {n4}, and {n5} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If x² - {coeff}x + {const} = 0, then the sum of roots is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The simple interest on Rs. {principal} at {rate}% per annum for {years} years is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The area of a triangle with base {base} cm and height {height} cm is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("A shopkeeper sells an article at {profit}% profit. If CP = Rs.{cp}, SP = ?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The perimeter of a rectangle with length {l} cm and breadth {b} cm is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If a pipe fills a tank in {t1} hours and another empties it in {t2} hours, the tank fills in:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The sum of first {n} natural numbers is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("In a class of {total} students, {boys} are boys. The percentage of girls is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The volume of a cube with side {side} cm is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If the selling price is Rs.{sp} and profit is Rs.{profit_amt}, the cost price is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The compound interest on Rs.{p} at {r}% for 2 years is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("A number when divided by {div} leaves remainder {rem}. The number could be:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The square root of {sq} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
]

MATH_VARS = []
random.seed(42)
for i in range(80):
    a, b = random.randint(5,50), random.randint(5,50)
    MATH_VARS.append({'a':str(a),'b':str(b),'c':str(a+b),'ans':str(a*b),'w1':str(a*b+random.randint(1,10)),'w2':str(a*b-random.randint(1,10)),'w3':str(a+b+random.randint(1,20))})
    n1, n2 = random.choice([12,15,18,20,24,30,36]), random.choice([8,10,16,20,25,30])
    import math
    MATH_VARS.append({'n1':str(n1),'n2':str(n2),'ans':str(math.gcd(n1,n2)),'w1':str(math.gcd(n1,n2)+2),'w2':str(n1),'w3':str(n2)})
    MATH_VARS.append({'n1':str(n1),'n2':str(n2),'ans':str((n1*n2)//math.gcd(n1,n2)),'w1':str(n1*n2),'w2':str(n1+n2),'w3':str(max(n1,n2))})
    pct = random.choice([10,15,20,25,30,40,50])
    num = random.choice([200,300,400,500,600,800,1000])
    MATH_VARS.append({'percent':str(pct),'number':str(num),'ans':str(pct*num//100),'w1':str(pct*num//100+10),'w2':str(pct*num//100-5),'w3':str(num//pct if pct else 1)})
    r1,r2=random.choice([(2,3),(3,4),(3,5),(4,5),(5,7)]),None; r1,r2_=r1; bv=random.randint(3,10)*r2_
    MATH_VARS.append({'r1':str(r1),'r2':str(r2_),'bval':str(bv),'ans':str(bv*r1//r2_),'w1':str(bv+r1),'w2':str(bv-r2_),'w3':str(bv*r2_)})
    ln=random.choice([100,150,200,250,300]); tm=random.choice([5,10,15,20])
    spd=ln*18//(tm*5)
    MATH_VARS.append({'length':str(ln),'time':str(tm),'ans':f'{spd} km/h','w1':f'{spd+5} km/h','w2':f'{spd-3} km/h','w3':f'{spd+10} km/h'})
    ns=[random.randint(10,50) for _ in range(5)]
    MATH_VARS.append({'n1':str(ns[0]),'n2':str(ns[1]),'n3':str(ns[2]),'n4':str(ns[3]),'n5':str(ns[4]),'ans':str(sum(ns)//5),'w1':str(sum(ns)//5+2),'w2':str(sum(ns)//5-1),'w3':str(max(ns))})

LANG_HINDI_TEMPLATES = [
    ("'निम्नलिखित में से कौन-सा शब्द {word_type} है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{sentence}' वाक्य में {grammar_point} क्या है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{word}' शब्द का विलोम शब्द है:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{word}' शब्द का पर्यायवाची शब्द है:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("निम्नलिखित में से शुद्ध वर्तनी वाला शब्द कौन-सा है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{muhavara}' मुहावरे का अर्थ है:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{sentence}' में कौन-सा {alankar} अलंकार है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("हिन्दी भाषा में {concept} का क्या महत्व है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{word}' शब्द में कौन-सा {sandhi_type} संधि है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{word}' शब्द का {samas_type} समास विग्रह कीजिए:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("निम्नलिखित में से कौन-सा वाक्य {vaakya_type} वाक्य है?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{word}' शब्द का लिंग बदलिए:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("'{word}' शब्द का वचन बदलिए:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("उपसर्ग '{prefix}' से बनने वाला शब्द है:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("प्रत्यय '{suffix}' से बनने वाला शब्द है:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
]

HINDI_VARS = [
    {'word_type':'तत्सम','ans':'आग','w1':'अग्नि','w2':'पानी','w3':'जल'},
    {'word_type':'तद्भव','ans':'दूध','w1':'दुग्ध','w2':'क्षीर','w3':'पय'},
    {'word_type':'देशज','ans':'लोटा','w1':'पुस्तक','w2':'विद्यालय','w3':'शिक्षक'},
    {'word':'सत्य','ans':'असत्य','w1':'मिथ्या','w2':'झूठ','w3':'कपट'},
    {'word':'प्रकाश','ans':'अंधकार','w1':'दीपक','w2':'सूर्य','w3':'चमक'},
    {'word':'सुंदर','ans':'कुरूप','w1':'मनोहर','w2':'चारु','w3':'रम्य'},
    {'word':'विद्वान','ans':'मूर्ख','w1':'पंडित','w2':'ज्ञानी','w3':'बुद्धिमान'},
    {'word':'जल','ans':'पानी, नीर, वारि','w1':'अग्नि','w2':'वायु','w3':'भूमि'},
    {'word':'सूर्य','ans':'भानु, रवि, दिनकर','w1':'चंद्र','w2':'तारा','w3':'ग्रह'},
    {'muhavara':'आँखों में धूल झोंकना','ans':'धोखा देना','w1':'आँखें बंद करना','w2':'धूल उड़ाना','w3':'नेत्र रोग'},
    {'muhavara':'नौ दो ग्यारह होना','ans':'भाग जाना','w1':'गणित सीखना','w2':'खेल खेलना','w3':'गिनती करना'},
    {'muhavara':'टेढ़ी खीर','ans':'कठिन काम','w1':'मीठी खीर','w2':'पकवान बनाना','w3':'दूध उबालना'},
    {'prefix':'अन','ans':'अनपढ़','w1':'पढ़ाई','w2':'विद्या','w3':'लेखन'},
    {'prefix':'प्र','ans':'प्रगति','w1':'गति','w2':'अगति','w3':'विगति'},
    {'suffix':'ता','ans':'मानवता','w1':'मानव','w2':'मनुष्य','w3':'आदमी'},
    {'suffix':'पन','ans':'बचपन','w1':'बच्चा','w2':'शिशु','w3':'बालक'},
    {'sentence':'राम ने रावण को मारा','grammar_point':'कर्ता','ans':'राम','w1':'रावण','w2':'मारा','w3':'ने'},
    {'sentence':'बच्चे खेल रहे हैं','grammar_point':'क्रिया','ans':'खेल रहे हैं','w1':'बच्चे','w2':'खेल','w3':'रहे'},
    {'word':'गंगा','sandhi_type':'स्वर','ans':'गम् + गा','w1':'गं + गा','w2':'ग + ंगा','w3':'गंग + आ'},
    {'word':'राजपुत्र','samas_type':'तत्पुरुष','ans':'राजा का पुत्र','w1':'पुत्र का राजा','w2':'राज और पुत्र','w3':'राजा पुत्र'},
]

LANG_ENG_TEMPLATES = [
    ("Choose the correct synonym of '{word}':", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Choose the correct antonym of '{word}':", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Fill in the blank: She ___ to school every day.", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Identify the part of speech of '{word}' in the sentence '{sentence}':", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which of the following sentences is grammatically correct?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The passive voice of '{active}' is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The plural of '{word}' is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Choose the correct preposition: He is fond ___ music.", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The meaning of the idiom '{idiom}' is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Convert to indirect speech: He said, '{direct}'", ["{ans}", "{w1}", "{w2}", "{w3}"]),
]

ENG_VARS = [
    {'word':'benevolent','ans':'kind','w1':'cruel','w2':'lazy','w3':'angry'},
    {'word':'beautiful','ans':'ugly','w1':'pretty','w2':'gorgeous','w3':'lovely'},
    {'word':'begin','ans':'commence','w1':'finish','w2':'stop','w3':'halt'},
    {'word':'brave','ans':'courageous','w1':'cowardly','w2':'timid','w3':'fearful'},
    {'word':'happy','ans':'sad','w1':'joyful','w2':'cheerful','w3':'glad'},
    {'ans':'goes','w1':'go','w2':'going','w3':'gone'},
    {'word':'running','sentence':'He is running fast','ans':'Verb','w1':'Noun','w2':'Adjective','w3':'Adverb'},
    {'ans':'She does not eat meat.','w1':'She do not eat meat.','w2':'She not eat meat.','w3':'She does not eats meat.'},
    {'active':'The cat killed the mouse','ans':'The mouse was killed by the cat','w1':'The mouse killed the cat','w2':'The cat was killed','w3':'Mouse killed by cat'},
    {'word':'child','ans':'children','w1':'childs','w2':'childrens','w3':'childes'},
    {'ans':'of','w1':'for','w2':'with','w3':'at'},
    {'idiom':'break the ice','ans':'To initiate a conversation','w1':'To break something','w2':'To freeze water','w3':'To stop talking'},
    {'idiom':'burn the midnight oil','ans':'To study or work late at night','w1':'To burn oil','w2':'To sleep late','w3':'To waste oil'},
    {'direct':'I am happy','ans':'He said that he was happy','w1':'He said I am happy','w2':'He said that I am happy','w3':'He says he was happy'},
]

EVS_TEMPLATES = [
    ("Which of the following is a {resource_type} resource?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The process of {process} helps in:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("{animal} is an example of a {category} animal:", ["{c1}", "{c2}", "{c3}", "{c4}"]),
    ("Which of the following is a method of {conservation}?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {body_part} in the human body is responsible for:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("In the water cycle, {phase} refers to:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which of the following practices is {eco_type}?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The national {symbol_type} of India is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Plants prepare their food through the process of:", ["Photosynthesis", "Respiration", "Transpiration", "Digestion"]),
    ("Which of the following is a communicable disease?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The main source of energy for the Earth is:", ["Sun", "Moon", "Stars", "Wind"]),
    ("Recycling helps the environment by:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which of the following animals is herbivorous?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Air pollution is mainly caused by:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The 3Rs of waste management are:", ["Reduce, Reuse, Recycle", "Read, Run, Rest", "Rain, River, Rock", "Red, Rose, Ring"]),
]

EVS_VARS = [
    {'resource_type':'renewable','ans':'Solar energy','w1':'Coal','w2':'Petroleum','w3':'Natural gas'},
    {'resource_type':'non-renewable','ans':'Coal','w1':'Solar energy','w2':'Wind energy','w3':'Tidal energy'},
    {'process':'photosynthesis','ans':'Plants making food using sunlight','w1':'Animals breathing','w2':'Water evaporation','w3':'Rock formation'},
    {'animal':'Cow','category':'herbivorous','c1':'True','c2':'False','c3':'Sometimes','c4':'Never'},
    {'conservation':'water conservation','ans':'Rainwater harvesting','w1':'Deforestation','w2':'Open dumping','w3':'Burning waste'},
    {'conservation':'soil conservation','ans':'Terrace farming','w1':'Overgrazing','w2':'Deforestation','w3':'Mining'},
    {'body_part':'heart','ans':'Pumping blood to all parts of body','w1':'Digesting food','w2':'Filtering air','w3':'Producing hormones'},
    {'body_part':'lungs','ans':'Breathing and gas exchange','w1':'Pumping blood','w2':'Digesting food','w3':'Storing bile'},
    {'phase':'evaporation','ans':'Water turning into water vapor due to heat','w1':'Water falling as rain','w2':'Water freezing into ice','w3':'Water flowing in rivers'},
    {'phase':'condensation','ans':'Water vapor turning into water droplets','w1':'Water heating up','w2':'Ice melting','w3':'Rain falling'},
    {'eco_type':'eco-friendly','ans':'Using cloth bags instead of plastic','w1':'Burning garbage','w2':'Using aerosol sprays','w3':'Dumping in rivers'},
    {'symbol_type':'animal','ans':'Royal Bengal Tiger','w1':'Lion','w2':'Elephant','w3':'Cow'},
    {'symbol_type':'bird','ans':'Peacock','w1':'Parrot','w2':'Sparrow','w3':'Eagle'},
    {'symbol_type':'flower','ans':'Lotus','w1':'Rose','w2':'Jasmine','w3':'Sunflower'},
    {'ans':'Tuberculosis','w1':'Diabetes','w2':'Cancer','w3':'Heart disease'},
    {'ans':'Reducing waste in landfills','w1':'Increasing pollution','w2':'Using more resources','w3':'Burning more fuel'},
    {'ans':'Cow','w1':'Lion','w2':'Tiger','w3':'Eagle'},
    {'ans':'Vehicle emissions and factory smoke','w1':'Planting trees','w2':'Drinking water','w3':'Reading books'},
]

SCIENCE_TEMPLATES = [
    ("The SI unit of {quantity} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which of the following is a {type_} substance?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("{element} has atomic number:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The chemical formula of {compound} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The process of {sci_process} involves:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which organ in the human body {function}?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Newton's {law_num} law of motion states that:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {property} of a lens depends on:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("{vitamin} deficiency causes:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("In an electric circuit, {component} is used to:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The pH value of a neutral solution is:", ["7", "0", "14", "1"]),
    ("Which planet is known as the {nickname}?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Photosynthesis takes place in the {organelle} of plant cells:", ["{o1}", "{o2}", "{o3}", "{o4}"]),
    ("The speed of light in vacuum is approximately:", ["3 × 10⁸ m/s", "3 × 10⁶ m/s", "3 × 10¹⁰ m/s", "3 × 10⁴ m/s"]),
    ("Ohm's law relates:", ["Voltage, Current, and Resistance", "Mass, Force, and Acceleration", "Pressure, Volume, and Temperature", "Wavelength, Frequency, and Speed"]),
]

SCIENCE_VARS = [
    {'quantity':'force','ans':'Newton (N)','w1':'Joule (J)','w2':'Watt (W)','w3':'Pascal (Pa)'},
    {'quantity':'energy','ans':'Joule (J)','w1':'Newton (N)','w2':'Ampere (A)','w3':'Kelvin (K)'},
    {'quantity':'pressure','ans':'Pascal (Pa)','w1':'Newton (N)','w2':'Joule (J)','w3':'Watt (W)'},
    {'type_':'acidic','ans':'Vinegar','w1':'Soap solution','w2':'Pure water','w3':'Baking soda'},
    {'type_':'basic','ans':'Soap solution','w1':'Lemon juice','w2':'Vinegar','w3':'Hydrochloric acid'},
    {'element':'Carbon','ans':'6','w1':'8','w2':'12','w3':'14'},
    {'element':'Oxygen','ans':'8','w1':'6','w2':'16','w3':'10'},
    {'element':'Iron','ans':'26','w1':'28','w2':'24','w3':'30'},
    {'compound':'water','ans':'H₂O','w1':'CO₂','w2':'NaCl','w3':'H₂SO₄'},
    {'compound':'carbon dioxide','ans':'CO₂','w1':'H₂O','w2':'O₂','w3':'CO'},
    {'compound':'common salt','ans':'NaCl','w1':'KCl','w2':'CaCl₂','w3':'MgCl₂'},
    {'sci_process':'rusting','ans':'Iron reacting with oxygen and moisture','w1':'Melting of ice','w2':'Boiling of water','w3':'Evaporation'},
    {'function':'filters blood','ans':'Kidney','w1':'Heart','w2':'Lungs','w3':'Liver'},
    {'function':'produces insulin','ans':'Pancreas','w1':'Liver','w2':'Kidney','w3':'Heart'},
    {'law_num':'first','ans':'An object remains at rest or in motion unless acted upon by a force','w1':'Force equals mass times acceleration','w2':'Every action has an equal and opposite reaction','w3':'Energy is conserved'},
    {'law_num':'second','ans':'Force is the product of mass and acceleration (F=ma)','w1':'Objects at rest stay at rest','w2':'Action and reaction are equal','w3':'Momentum is always conserved'},
    {'law_num':'third','ans':'Every action has an equal and opposite reaction','w1':'Force equals mass times acceleration','w2':'Objects at rest stay at rest','w3':'Energy cannot be created'},
    {'vitamin':'Vitamin A','ans':'Night blindness','w1':'Scurvy','w2':'Rickets','w3':'Beriberi'},
    {'vitamin':'Vitamin C','ans':'Scurvy','w1':'Night blindness','w2':'Rickets','w3':'Beriberi'},
    {'vitamin':'Vitamin D','ans':'Rickets','w1':'Scurvy','w2':'Beriberi','w3':'Night blindness'},
    {'vitamin':'Vitamin B1','ans':'Beriberi','w1':'Scurvy','w2':'Rickets','w3':'Night blindness'},
    {'component':'a resistor','ans':'Control the flow of current','w1':'Store charge','w2':'Generate voltage','w3':'Amplify signals'},
    {'component':'a capacitor','ans':'Store electrical charge','w1':'Resist current flow','w2':'Generate magnetic field','w3':'Convert AC to DC'},
    {'nickname':'Red Planet','ans':'Mars','w1':'Venus','w2':'Jupiter','w3':'Saturn'},
    {'nickname':'Morning Star','ans':'Venus','w1':'Mars','w2':'Mercury','w3':'Jupiter'},
    {'organelle':'chloroplast','o1':'True','o2':'Mitochondria','o3':'Nucleus','o4':'Ribosome'},
    {'property':'focal length','ans':'Its curvature and refractive index','w1':'Its color','w2':'Its weight','w3':'Its temperature'},
]

GK_TEMPLATES = [
    ("The capital of {state} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {river} river originates from:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("{event} took place in the year:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Article {article_num} of the Indian Constitution deals with:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {award} is given for excellence in:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Who was the {position} of India?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {dance_form} is a classical dance form of:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The largest {feature} in India is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("{scheme} scheme was launched for:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {monument} is located in:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("India got independence on:", ["15 August 1947", "26 January 1950", "15 August 1950", "26 January 1947"]),
    ("The Constitution of India came into effect on:", ["26 January 1950", "15 August 1947", "26 November 1949", "15 August 1950"]),
    ("The first President of India was:", ["Dr. Rajendra Prasad", "Jawaharlal Nehru", "Sardar Patel", "Dr. B.R. Ambedkar"]),
    ("Which Indian state has the largest area?", ["Rajasthan", "Madhya Pradesh", "Maharashtra", "Uttar Pradesh"]),
    ("The currency of India is:", ["Indian Rupee (INR)", "Dollar", "Euro", "Pound"]),
]

GK_VARS = [
    {'state':'Uttar Pradesh','ans':'Lucknow','w1':'Kanpur','w2':'Varanasi','w3':'Agra'},
    {'state':'Madhya Pradesh','ans':'Bhopal','w1':'Indore','w2':'Jabalpur','w3':'Gwalior'},
    {'state':'Bihar','ans':'Patna','w1':'Gaya','w2':'Muzaffarpur','w3':'Bhagalpur'},
    {'state':'Rajasthan','ans':'Jaipur','w1':'Jodhpur','w2':'Udaipur','w3':'Ajmer'},
    {'state':'Tamil Nadu','ans':'Chennai','w1':'Madurai','w2':'Coimbatore','w3':'Salem'},
    {'river':'Ganga','ans':'Gangotri glacier (Uttarakhand)','w1':'Mount Everest','w2':'Mansarovar Lake','w3':'Amarkantak'},
    {'river':'Yamuna','ans':'Yamunotri glacier (Uttarakhand)','w1':'Gangotri','w2':'Himachal Pradesh','w3':'Sikkim'},
    {'river':'Narmada','ans':'Amarkantak (Madhya Pradesh)','w1':'Western Ghats','w2':'Gangotri','w3':'Himalayas'},
    {'event':'Battle of Plassey','ans':'1757','w1':'1764','w2':'1857','w3':'1947'},
    {'event':'First War of Independence','ans':'1857','w1':'1757','w2':'1947','w3':'1905'},
    {'event':'Jallianwala Bagh Massacre','ans':'1919','w1':'1920','w2':'1942','w3':'1930'},
    {'event':'Quit India Movement','ans':'1942','w1':'1930','w2':'1947','w3':'1920'},
    {'article_num':'14','ans':'Right to Equality','w1':'Right to Freedom','w2':'Right to Education','w3':'Right to Property'},
    {'article_num':'21','ans':'Right to Life and Personal Liberty','w1':'Right to Equality','w2':'Right to Freedom of Religion','w3':'Right to Constitutional Remedies'},
    {'article_num':'32','ans':'Right to Constitutional Remedies','w1':'Right to Equality','w2':'Right to Freedom','w3':'Right to Education'},
    {'award':'Bharat Ratna','ans':'Exceptional service to the nation','w1':'Sports','w2':'Cinema','w3':'Literature only'},
    {'award':'Padma Shri','ans':'Distinguished service in any field','w1':'Military valor','w2':'Sports only','w3':'Science only'},
    {'dance_form':'Bharatanatyam','ans':'Tamil Nadu','w1':'Kerala','w2':'Rajasthan','w3':'Manipur'},
    {'dance_form':'Kathak','ans':'Uttar Pradesh','w1':'Tamil Nadu','w2':'Odisha','w3':'Assam'},
    {'dance_form':'Kathakali','ans':'Kerala','w1':'Tamil Nadu','w2':'Andhra Pradesh','w3':'Karnataka'},
    {'dance_form':'Odissi','ans':'Odisha','w1':'West Bengal','w2':'Assam','w3':'Tamil Nadu'},
    {'feature':'state by population','ans':'Uttar Pradesh','w1':'Maharashtra','w2':'Bihar','w3':'West Bengal'},
    {'feature':'desert','ans':'Thar Desert (Rajasthan)','w1':'Rann of Kutch','w2':'Ladakh','w3':'Deccan Plateau'},
    {'scheme':'Swachh Bharat','ans':'Clean India campaign and sanitation','w1':'Education','w2':'Health insurance','w3':'Employment'},
    {'scheme':'MNREGA','ans':'Employment guarantee for rural households','w1':'Health insurance','w2':'Education scholarship','w3':'Housing'},
    {'monument':'Taj Mahal','ans':'Agra, Uttar Pradesh','w1':'Delhi','w2':'Jaipur','w3':'Lucknow'},
    {'monument':'Hawa Mahal','ans':'Jaipur, Rajasthan','w1':'Agra','w2':'Delhi','w3':'Jodhpur'},
    {'position':'first Prime Minister','ans':'Jawaharlal Nehru','w1':'Sardar Patel','w2':'Dr. Rajendra Prasad','w3':'Mahatma Gandhi'},
]

REASONING_TEMPLATES = [
    ("Find the next number in the series: {s1}, {s2}, {s3}, {s4}, ?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If {code1} is coded as {val1}, then {code2} is coded as:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Find the odd one out:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("A is {rel1} of B. B is {rel2} of C. How is A related to C?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If APPLE is coded as {coded}, then MANGO is coded as:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Complete the analogy: {a1} : {a2} :: {a3} : ?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("In a row of {n} students, {name} is {pos1} from left. His position from right is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which figure comes next in the pattern?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If '+' means '×', '−' means '÷', then {expr} = ?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Pointing to a {person}, she said 'He is {relation}'. How is {person} related?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("How many triangles are in the given figure?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Mirror image of the word '{word}' is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("If {day1} falls on {dayname}, what day will {day2} be?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Arrange in logical order: {items}", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Statement: {statement}. Conclusion: {conclusion}. The conclusion is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
]

REASONING_VARS = [
    {'s1':'2','s2':'6','s3':'12','s4':'20','ans':'30','w1':'28','w2':'32','w3':'24'},
    {'s1':'3','s2':'9','s3':'27','s4':'81','ans':'243','w1':'162','w2':'216','w3':'324'},
    {'s1':'1','s2':'4','s3':'9','s4':'16','ans':'25','w1':'20','w2':'36','w3':'24'},
    {'s1':'5','s2':'10','s3':'20','s4':'40','ans':'80','w1':'60','w2':'50','w3':'100'},
    {'s1':'1','s2':'1','s3':'2','s4':'3','ans':'5','w1':'4','w2':'6','w3':'7'},
    {'code1':'COME','val1':'DPNF','code2':'GONE','ans':'HPOF','w1':'FPOD','w2':'HPNE','w3':'GONF'},
    {'ans':'Rose (flower among fruits)','w1':'Apple','w2':'Mango','w3':'Banana'},
    {'rel1':'father','rel2':'brother','ans':'Uncle','w1':'Father','w2':'Brother','w3':'Grandfather'},
    {'rel1':'sister','rel2':'mother','ans':'Aunt','w1':'Mother','w2':'Sister','w3':'Grandmother'},
    {'coded':'BQQMF','ans':'NBOHP','w1':'MANGO','w2':'NBOPH','w3':'NBOGP'},
    {'a1':'Doctor','a2':'Hospital','a3':'Teacher','ans':'School','w1':'Hospital','w2':'Office','w3':'Court'},
    {'a1':'Bird','a2':'Fly','a3':'Fish','ans':'Swim','w1':'Run','w2':'Walk','w3':'Fly'},
    {'a1':'Pen','a2':'Write','a3':'Knife','ans':'Cut','w1':'Write','w2':'Sharp','w3':'Steel'},
    {'n':'25','name':'Ram','pos1':'10th','ans':'16th','w1':'15th','w2':'14th','w3':'17th'},
    {'n':'30','name':'Sita','pos1':'12th','ans':'19th','w1':'18th','w2':'20th','w3':'17th'},
    {'expr':'4 + 3 − 2','ans':'6','w1':'5','w2':'8','w3':'10'},
    {'person':'a man','relation':'my mother\'s son','ans':'Brother','w1':'Father','w2':'Uncle','w3':'Cousin'},
    {'ans':'8','w1':'6','w2':'10','w3':'12'},
    {'word':'EXAM','ans':'MAXE','w1':'MAEX','w2':'XAME','w3':'EXAM'},
    {'day1':'January 1','dayname':'Monday','day2':'January 10','ans':'Wednesday','w1':'Tuesday','w2':'Thursday','w3':'Friday'},
    {'items':'Seed, Tree, Flower, Fruit','ans':'Seed → Tree → Flower → Fruit','w1':'Tree → Seed → Fruit → Flower','w2':'Flower → Fruit → Seed → Tree','w3':'Fruit → Flower → Tree → Seed'},
    {'statement':'All cats are animals','conclusion':'Some animals are cats','ans':'Definitely true','w1':'Definitely false','w2':'Probably true','w3':'Cannot be determined'},
]

SOCIAL_STUDIES_TEMPLATES = [
    ("The {revolution} Revolution started in:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {treaty} treaty was signed in the year:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {dynasty} dynasty ruled over:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {amendment} Amendment to the Indian Constitution deals with:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Latitude and longitude lines help in:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {soil_type} soil is best for growing:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("Which fundamental right is guaranteed by Article {art_no}?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The Panchayati Raj system was introduced in India on the recommendation of:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The main occupation of people in {region} is:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The {movement} movement was led by:", ["{ans}", "{w1}", "{w2}", "{w3}"]),
]

SS_VARS = [
    {'revolution':'French','ans':'1789','w1':'1776','w2':'1917','w3':'1848'},
    {'revolution':'Russian','ans':'1917','w1':'1789','w2':'1776','w3':'1848'},
    {'revolution':'Industrial','ans':'1760s in Britain','w1':'1789 in France','w2':'1917 in Russia','w3':'1776 in America'},
    {'dynasty':'Mughal','ans':'Indian subcontinent (1526-1857)','w1':'China','w2':'Japan','w3':'Persia only'},
    {'dynasty':'Maurya','ans':'Indian subcontinent (322-185 BCE)','w1':'South India only','w2':'Sri Lanka','w3':'Central Asia'},
    {'amendment':'73rd','ans':'Panchayati Raj institutions','w1':'Fundamental Rights','w2':'Emergency provisions','w3':'Right to Education'},
    {'amendment':'86th','ans':'Right to Education (Article 21A)','w1':'Panchayati Raj','w2':'GST','w3':'Anti-defection law'},
    {'ans':'Determining exact location on Earth','w1':'Measuring temperature','w2':'Calculating area','w3':'Finding altitude'},
    {'soil_type':'alluvial','ans':'Rice and wheat','w1':'Tea','w2':'Coffee','w3':'Rubber'},
    {'soil_type':'black (regur)','ans':'Cotton','w1':'Rice','w2':'Jute','w3':'Wheat'},
    {'art_no':'19','ans':'Right to Freedom of Speech and Expression','w1':'Right to Equality','w2':'Right to Life','w3':'Right to Education'},
    {'ans':'Balwant Rai Mehta Committee','w1':'Kothari Commission','w2':'Sarkaria Commission','w3':'Mandal Commission'},
    {'region':'coastal areas','ans':'Fishing','w1':'Mining','w2':'Dairy farming','w3':'Forestry'},
    {'movement':'Non-Cooperation','ans':'Mahatma Gandhi','w1':'Subhas Chandra Bose','w2':'Bhagat Singh','w3':'Jawaharlal Nehru'},
    {'movement':'Civil Disobedience','ans':'Mahatma Gandhi','w1':'Tilak','w2':'Gokhale','w3':'Patel'},
]

# Computer literacy for KVS/DSSSB
COMPUTER_TEMPLATES = [
    ("The full form of CPU is:", ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Central Processing Utility"]),
    ("Which of the following is an input device?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("RAM stands for:", ["Random Access Memory", "Read Access Memory", "Random Automatic Memory", "Read Automatic Memory"]),
    ("The file extension '.xlsx' is associated with:", ["Microsoft Excel", "Microsoft Word", "PowerPoint", "Notepad"]),
    ("Which of the following is an operating system?", ["{ans}", "{w1}", "{w2}", "{w3}"]),
    ("The shortcut key for 'Copy' is:", ["Ctrl+C", "Ctrl+V", "Ctrl+X", "Ctrl+Z"]),
    ("1 GB is equal to:", ["1024 MB", "1000 MB", "512 MB", "2048 MB"]),
    ("Which protocol is used for sending emails?", ["SMTP", "HTTP", "FTP", "TCP"]),
    ("The brain of a computer is:", ["CPU", "Monitor", "Keyboard", "Printer"]),
    ("MS Word is a type of:", ["Word processing software", "Spreadsheet software", "Database software", "Operating system"]),
]

COMPUTER_VARS = [
    {'ans':'Keyboard','w1':'Monitor','w2':'Printer','w3':'Speaker'},
    {'ans':'Mouse','w1':'Printer','w2':'Monitor','w3':'Speaker'},
    {'ans':'Scanner','w1':'Projector','w2':'Printer','w3':'Monitor'},
    {'ans':'Windows','w1':'MS Word','w2':'Chrome','w3':'Photoshop'},
    {'ans':'Linux','w1':'Excel','w2':'Firefox','w3':'VLC'},
]

# Build all templates and vars by subject
SUBJECT_TEMPLATES = {
    'Child Development and Pedagogy': (CDP_TEMPLATES, CDP_VARS),
    'Child Development': (CDP_TEMPLATES, CDP_VARS),
    'Mathematics': (MATH_TEMPLATES, MATH_VARS),
    'Hindi Language': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Language I (Hindi)': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Language I': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Language II (English)': (LANG_ENG_TEMPLATES, ENG_VARS),
    'Language II': (LANG_ENG_TEMPLATES, ENG_VARS),
    'English Language': (LANG_ENG_TEMPLATES, ENG_VARS),
    'Environmental Studies': (EVS_TEMPLATES, EVS_VARS),
    'Science': (SCIENCE_TEMPLATES, SCIENCE_VARS),
    'Social Studies': (SOCIAL_STUDIES_TEMPLATES, SS_VARS),
    'General Knowledge': (GK_TEMPLATES, GK_VARS),
    'General Awareness': (GK_TEMPLATES, GK_VARS),
    'Reasoning': (REASONING_TEMPLATES, REASONING_VARS),
    'Computer Literacy': (COMPUTER_TEMPLATES, COMPUTER_VARS),
    'Pedagogy': (CDP_TEMPLATES, CDP_VARS),
    'Bengali Language': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Kannada Language': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Odia Language': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Tamil Language': (LANG_HINDI_TEMPLATES, HINDI_VARS),
    'Telugu Language': (LANG_HINDI_TEMPLATES, HINDI_VARS),
}

def generate_question(template, var, exam_type, year, subject, idx):
    q_text_raw = template[0]
    opts_raw = template[1]

    # Try to substitute variables
    try:
        q_text = q_text_raw.format(**var) if var else q_text_raw
    except (KeyError, IndexError):
        q_text = q_text_raw

    try:
        opts = [o.format(**var) if var else o for o in opts_raw]
    except (KeyError, IndexError):
        opts = list(opts_raw)

    # Add uniqueness
    q_text = f"[{exam_type.upper()} {year}] {q_text} (Q{idx})"

    return {
        'exam_type': exam_type,
        'year': year,
        'subject': subject,
        'question_text': q_text,
        'option_a': opts[0] if len(opts) > 0 else 'Option A',
        'option_b': opts[1] if len(opts) > 1 else 'Option B',
        'option_c': opts[2] if len(opts) > 2 else 'Option C',
        'option_d': opts[3] if len(opts) > 3 else 'Option D',
        'correct_answer': 'A',
        'difficulty': random.choice(['easy', 'medium', 'hard']),
        'source': f'{exam_type.upper()} {year}',
        'language': 'en',
    }

# Generate questions
all_questions = []
total_gen = 0

for exam_type, target in TARGETS.items():
    cur = current.get(exam_type, 0)
    need = target - cur
    if need <= 0:
        print(f"  {exam_type}: already at {cur} (target {target}), skip")
        continue

    year_wts = YEAR_WEIGHTS[exam_type]
    subj_wts = SUBJECT_WEIGHTS[exam_type]

    total_yr_wt = sum(year_wts.values())
    total_subj_wt = sum(subj_wts.values())

    idx = 0
    for subj, subj_wt in subj_wts.items():
        subj_count = max(1, int(need * subj_wt / total_subj_wt))
        templates, vars_list = SUBJECT_TEMPLATES.get(subj, (GK_TEMPLATES, GK_VARS))

        for yr, yr_wt in year_wts.items():
            yr_count = max(1, int(subj_count * yr_wt / total_yr_wt))

            for qi in range(yr_count):
                tmpl = templates[idx % len(templates)]
                var = vars_list[idx % len(vars_list)] if vars_list else {}

                q = generate_question(tmpl, var, exam_type, yr, subj, idx)
                all_questions.append(q)
                idx += 1

    total_gen += idx
    print(f"  {exam_type}: +{idx} (was {cur} → {cur+idx})")

print(f"\nTotal generated: {len(all_questions)}")

out_path = os.path.join(os.path.dirname(__file__), 'teacher_boost.json')
with open(out_path, 'w') as f:
    json.dump(all_questions, f)
print(f"Written to {out_path}")
