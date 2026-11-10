"""
Enriches existing crawled jobs with realistic qualification, salary,
last_date, organization, age_limit, and content_type based on title keywords.
"""
import re

from django.core.management.base import BaseCommand
from django.utils import timezone

from jobs.models import Job

# Organization mapping — guess from title keywords
ORG_MAP = {
    "ssc": "Staff Selection Commission (SSC)",
    "staff selection": "Staff Selection Commission (SSC)",
    "upsc": "Union Public Service Commission (UPSC)",
    "ias": "Union Public Service Commission (UPSC)",
    "ips": "Union Public Service Commission (UPSC)",
    "railway": "Indian Railways / Railway Recruitment Board",
    "rrb": "Railway Recruitment Board (RRB)",
    "rrc": "Railway Recruitment Cell (RRC)",
    "ibps": "Institute of Banking Personnel Selection (IBPS)",
    "sbi": "State Bank of India (SBI)",
    "rbi": "Reserve Bank of India (RBI)",
    "lic": "Life Insurance Corporation (LIC)",
    "nabard": "National Bank for Agriculture & Rural Development",
    "army": "Indian Army",
    "navy": "Indian Navy",
    "air force": "Indian Air Force",
    "agniveer": "Indian Armed Forces",
    "nda": "National Defence Academy (UPSC)",
    "cds": "Combined Defence Services (UPSC)",
    "bsf": "Border Security Force (BSF)",
    "crpf": "Central Reserve Police Force (CRPF)",
    "cisf": "Central Industrial Security Force (CISF)",
    "itbp": "Indo-Tibetan Border Police (ITBP)",
    "ssb": "Sashastra Seema Bal (SSB)",
    "ctet": "Central Board of Secondary Education (CBSE)",
    "kvs": "Kendriya Vidyalaya Sangathan (KVS)",
    "nvs": "Navodaya Vidyalaya Samiti (NVS)",
    "aiims": "All India Institute of Medical Sciences (AIIMS)",
    "neet": "National Testing Agency (NTA)",
    "isro": "Indian Space Research Organisation (ISRO)",
    "drdo": "Defence Research & Development Organisation (DRDO)",
    "bhel": "Bharat Heavy Electricals Limited (BHEL)",
    "ongc": "Oil & Natural Gas Corporation (ONGC)",
    "iocl": "Indian Oil Corporation Limited (IOCL)",
    "hal": "Hindustan Aeronautics Limited (HAL)",
    "bel": "Bharat Electronics Limited (BEL)",
    "sail": "Steel Authority of India (SAIL)",
    "uppsc": "Uttar Pradesh Public Service Commission",
    "bpsc": "Bihar Public Service Commission",
    "rpsc": "Rajasthan Public Service Commission",
    "mppsc": "Madhya Pradesh Public Service Commission",
    "hpsc": "Haryana Public Service Commission",
    "wbpsc": "West Bengal Public Service Commission",
    "jpsc": "Jharkhand Public Service Commission",
    "ukpsc": "Uttarakhand Public Service Commission",
    "cgpsc": "Chhattisgarh Public Service Commission",
    "appsc": "Andhra Pradesh Public Service Commission",
    "tspsc": "Telangana State Public Service Commission",
    "opsc": "Odisha Public Service Commission",
    "tnpsc": "Tamil Nadu Public Service Commission",
    "kpsc": "Karnataka Public Service Commission",
    "gpsc": "Gujarat Public Service Commission",
    "mpsc": "Maharashtra Public Service Commission",
    "nielit": "National Institute of Electronics & IT (NIELIT)",
    "nta": "National Testing Agency (NTA)",
    "ugc": "University Grants Commission (UGC)",
    "coast guard": "Indian Coast Guard",
    "nicl": "National Insurance Company Limited (NICL)",
    "npcil": "Nuclear Power Corporation of India",
    "ntpc": "NTPC Limited",
    "pgcil": "Power Grid Corporation of India",
    "fci": "Food Corporation of India (FCI)",
    "anganwadi": "Integrated Child Development Services (ICDS)",
    "up police": "Uttar Pradesh Police Recruitment Board",
    "bihar police": "Bihar Police / Central Selection Board",
    "rajasthan police": "Rajasthan Police",
    "mp police": "Madhya Pradesh Professional Examination Board",
    "haryana police": "Haryana Staff Selection Commission",
    "delhi police": "Delhi Police / SSC",
    "high court": "High Court of India",
    "supreme court": "Supreme Court of India",
    "scholarship": "Government of India / State Government",
    "polytechnic": "State Technical Education Board",
    "iti": "Directorate of Industrial Training",
}

# Qualification patterns — guess from title keywords
QUAL_MAP = {
    "group d": "10th Pass (Matric)",
    "mts": "10th Pass (Matric)",
    "peon": "8th / 10th Pass",
    "sweeper": "8th Pass",
    "safai": "8th Pass",
    "chowkidar": "8th / 10th Pass",
    "constable": "10th / 12th Pass",
    "soldier": "10th / 12th Pass",
    "agniveer": "10th / 12th Pass",
    "clerk": "12th Pass / Graduate",
    "steno": "12th Pass with Stenography",
    "stenographer": "12th Pass with Stenography",
    "ldc": "12th Pass with Typing",
    "udc": "Graduate (Any Discipline)",
    "je ": "Diploma / B.Tech (Engineering)",
    "junior engineer": "Diploma / B.Tech (Engineering)",
    "cgl": "Graduate (Any Discipline)",
    "chsl": "12th Pass",
    "gd constable": "10th / 12th Pass",
    "sub inspector": "Graduate (Any Discipline)",
    "si ": "Graduate (Any Discipline)",
    "inspector": "Graduate (Any Discipline)",
    "teacher": "B.Ed / D.El.Ed with Graduate",
    "tgt": "Graduate with B.Ed",
    "pgt": "Post Graduate with B.Ed",
    "prt": "12th with D.El.Ed / B.Ed",
    "nursing": "GNM / B.Sc Nursing",
    "gnm": "GNM Diploma",
    "anm": "ANM Diploma",
    "pharmacist": "D.Pharm / B.Pharm",
    "doctor": "MBBS / MD",
    "mbbs": "MBBS",
    "bds": "BDS (Bachelor of Dental Surgery)",
    "scientist": "M.Tech / M.Sc / PhD",
    "engineer": "B.Tech / B.E.",
    "assistant": "Graduate (Any Discipline)",
    "officer": "Graduate / Post Graduate",
    "manager": "Graduate / MBA / CA",
    "po ": "Graduate (Any Discipline)",
    "probationary officer": "Graduate (Any Discipline)",
    "specialist officer": "Graduate / Post Graduate (Relevant Field)",
    "apprentice": "ITI / Diploma",
    "iti": "ITI Certificate",
    "tradesman": "ITI / 10th Pass",
    "technician": "10th + ITI / Diploma",
    "civil judge": "LLB (Law Graduate)",
    "judicial": "LLB (Law Graduate)",
    "advocate": "LLB (Law Graduate)",
    "professor": "PhD with NET/SLET",
    "lecturer": "Post Graduate with NET/SLET",
    "admission": "10th / 12th Pass (Varies)",
    "polytechnic": "10th Pass",
    "scholarship": "8th / 10th / 12th / Graduate",
    "nda": "12th Pass (Science - PCM)",
    "cds": "Graduate (Any Discipline)",
    "ias": "Graduate (Any Discipline)",
    "net": "Post Graduate (55% Marks)",
}

# Salary ranges by category
SALARY_MAP = {
    "group d": "₹18,000 – ₹56,900 (Level-1)",
    "mts": "₹18,000 – ₹56,900 (Level-1)",
    "constable": "₹21,700 – ₹69,100 (Level-3)",
    "clerk": "₹19,900 – ₹63,200 (Level-2)",
    "steno": "₹25,500 – ₹81,100 (Level-4)",
    "je ": "₹35,400 – ₹1,12,400 (Level-6)",
    "junior engineer": "₹35,400 – ₹1,12,400 (Level-6)",
    "cgl": "₹44,900 – ₹1,42,400 (Level-7)",
    "chsl": "₹25,500 – ₹81,100 (Level-4)",
    "sub inspector": "₹35,400 – ₹1,12,400 (Level-6)",
    "si ": "₹35,400 – ₹1,12,400 (Level-6)",
    "inspector": "₹44,900 – ₹1,42,400 (Level-7)",
    "teacher": "₹44,900 – ₹1,42,400 (Level-7)",
    "tgt": "₹44,900 – ₹1,42,400 (Level-7)",
    "pgt": "₹47,600 – ₹1,51,100 (Level-8)",
    "officer": "₹44,900 – ₹1,42,400 (Level-7)",
    "po ": "₹36,000 – ₹63,840 (Basic)",
    "scientist": "₹56,100 – ₹1,77,500 (Level-10)",
    "engineer": "₹44,900 – ₹1,42,400 (Level-7)",
    "manager": "₹50,000 – ₹1,60,000",
    "assistant": "₹25,500 – ₹81,100 (Level-4)",
    "soldier": "₹21,700 – ₹69,100 per month",
    "agniveer": "₹30,000 per month (1st year)",
    "nursing": "₹44,900 – ₹1,42,400 (Level-7)",
    "pharmacist": "₹35,400 – ₹1,12,400 (Level-6)",
    "professor": "₹1,44,200 – ₹2,18,200 (Level-14)",
    "apprentice": "₹9,000 – ₹15,000 (Stipend)",
    "peon": "₹18,000 – ₹56,900 (Level-1)",
    "safai": "₹18,000 – ₹56,900 (Level-1)",
    "technician": "₹19,900 – ₹63,200 (Level-2)",
    "ldc": "₹19,900 – ₹63,200 (Level-2)",
    "udc": "₹25,500 – ₹81,100 (Level-4)",
}

# Content type detection from title
CONTENT_TYPE_KEYWORDS = {
    "result": ["result", "merit list", "cut off", "cutoff", "marks", "score card", "scorecard", "final list", "topper"],
    "admit_card": ["admit card", "call letter", "hall ticket", "exam date", "exam schedule", "e-admit"],
    "answer_key": ["answer key", "objection", "response sheet"],
    "admission": ["admission", "counseling", "counselling", "allotment", "seat", "polytechnic admission", "scholarship"],
    "syllabus": ["syllabus", "exam pattern", "exam scheme"],
}


def guess_content_type(title):
    title_lower = title.lower()
    for ct, keywords in CONTENT_TYPE_KEYWORDS.items():
        for kw in keywords:
            if kw in title_lower:
                return ct
    return "job"


def guess_organization(title):
    title_lower = title.lower()
    # Try longer keywords first to avoid partial matches (e.g. "lic" in "police")
    sorted_keys = sorted(ORG_MAP.keys(), key=len, reverse=True)
    for keyword in sorted_keys:
        # Use word boundary check for short keywords (<=4 chars)
        if len(keyword) <= 4:
            if re.search(r'\b' + re.escape(keyword) + r'\b', title_lower):
                return ORG_MAP[keyword]
        else:
            if keyword in title_lower:
                return ORG_MAP[keyword]
    return ""


def guess_qualification(title):
    title_lower = title.lower()
    for keyword, qual in QUAL_MAP.items():
        if keyword in title_lower:
            return qual
    return None


def guess_salary(title):
    title_lower = title.lower()
    for keyword, sal in SALARY_MAP.items():
        if keyword in title_lower:
            return sal
    return None


def generate_age_limit(title):
    title_lower = title.lower()
    if any(kw in title_lower for kw in ["group d", "mts", "constable", "soldier", "agniveer"]):
        return "18-25 years (relaxation as per rules)"
    if any(kw in title_lower for kw in ["clerk", "steno", "chsl", "ldc"]):
        return "18-27 years (relaxation as per rules)"
    if any(kw in title_lower for kw in ["cgl", "si ", "sub inspector", "inspector"]):
        return "20-30 years (relaxation as per rules)"
    if any(kw in title_lower for kw in ["officer", "po ", "manager"]):
        return "21-30 years (relaxation as per rules)"
    if any(kw in title_lower for kw in ["teacher", "tgt", "pgt", "prt"]):
        return "21-40 years (relaxation as per rules)"
    if any(kw in title_lower for kw in ["scientist", "professor"]):
        return "Up to 35 years (relaxation as per rules)"
    return None


class Command(BaseCommand):
    help = "Enrich existing crawled jobs with qualification, salary, dates, organization, and content_type"

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true", help="Preview changes without saving")
        parser.add_argument("--force-org", action="store_true", help="Re-compute organization even if already set")

    def handle(self, *args, **options):
        dry_run = options["dry_run"]
        force_org = options["force_org"]
        jobs = Job.objects.all()
        updated = 0
        ct_fixed = 0

        for job in jobs:
            changed = False

            # Fix content_type based on title keywords
            detected_ct = guess_content_type(job.title)
            if job.content_type == "job" and detected_ct != "job":
                job.content_type = detected_ct
                ct_fixed += 1
                changed = True

            # Fill organization if empty (or force-update)
            if not job.organization or force_org:
                org = guess_organization(job.title)
                if org:
                    job.organization = org
                    changed = True

            # Fill qualification if empty
            if not job.qualification:
                qual = guess_qualification(job.title)
                if qual:
                    job.qualification = qual
                    changed = True

            # Fill salary if empty
            if not job.salary:
                sal = guess_salary(job.title)
                if sal:
                    job.salary = sal
                    changed = True

            # last_date is never guessed: a wrong deadline is worse than none.
            # It comes only from the parser (notification text / detail page).

            # Fill age_limit if empty
            if not job.age_limit:
                age = generate_age_limit(job.title)
                if age:
                    job.age_limit = age
                    changed = True

            if changed:
                updated += 1
                if not dry_run:
                    job.save(update_fields=[
                        "content_type", "organization", "qualification",
                        "salary", "last_date", "age_limit",
                    ])

            if updated % 100 == 0 and updated > 0:
                self.stdout.write(f"  Processed {updated} jobs...")

        action = "Would update" if dry_run else "Updated"
        self.stdout.write(self.style.SUCCESS(
            f"{action} {updated} jobs ({ct_fixed} content_type fixes)"
        ))
