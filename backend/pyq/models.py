import hashlib
import re

from django.db import models


class ExamType(models.TextChoices):
    # Engineering
    JEE_MAIN = "jee_main", "JEE Main"
    JEE_ADVANCED = "jee_advanced", "JEE Advanced"
    GATE_CSE = "gate_cse", "GATE CSE"
    GATE_ECE = "gate_ece", "GATE ECE"
    GATE_ME = "gate_me", "GATE ME"
    GATE_EE = "gate_ee", "GATE EE"
    GATE_CE = "gate_ce", "GATE CE"
    GATE_CH = "gate_ch", "GATE CH"
    GATE_IN = "gate_in", "GATE IN"
    GATE_BT = "gate_bt", "GATE BT"
    GATE_PI = "gate_pi", "GATE PI"
    GATE_XE = "gate_xe", "GATE XE"
    GATE_AG = "gate_ag", "GATE AG (Agricultural)"
    GATE_AR = "gate_ar", "GATE AR (Architecture)"
    GATE_CY = "gate_cy", "GATE CY (Chemistry)"
    GATE_EY = "gate_ey", "GATE EY (Ecology)"
    GATE_GG = "gate_gg", "GATE GG (Geology)"
    GATE_MA = "gate_ma", "GATE MA (Mathematics)"
    GATE_MN = "gate_mn", "GATE MN (Mining)"
    GATE_MT = "gate_mt", "GATE MT (Metallurgy)"
    GATE_PE = "gate_pe", "GATE PE (Petroleum)"
    GATE_PH = "gate_ph", "GATE PH (Physics)"
    GATE_ST = "gate_st", "GATE ST (Statistics)"
    GATE_TF = "gate_tf", "GATE TF (Textile)"
    GATE_ES = "gate_es", "GATE ES (Environmental)"
    ISRO = "isro", "ISRO"
    BEL = "bel", "BEL PE"
    ESE = "ese", "ESE/IES"
    # Medical
    NEET = "neet", "NEET UG"
    NEET_PG = "neet_pg", "NEET PG"
    AIIMS = "aiims", "AIIMS"
    JIPMER = "jipmer", "JIPMER"
    # SSC
    SSC_CGL = "ssc_cgl", "SSC CGL"
    SSC_CHSL = "ssc_chsl", "SSC CHSL"
    SSC_MTS = "ssc_mts", "SSC MTS"
    SSC_GD = "ssc_gd", "SSC GD"
    SSC_CPO = "ssc_cpo", "SSC CPO"
    SSC_JE = "ssc_je", "SSC JE"
    SSC_STENO = "ssc_steno", "SSC Stenographer"
    # Central
    UPSC_PRELIMS = "upsc_prelims", "UPSC Prelims"
    UPSC_MAINS = "upsc_mains", "UPSC Mains"
    NDA = "nda", "NDA"
    CDS = "cds", "CDS"
    AFCAT = "afcat", "AFCAT"
    CAPF = "capf", "CAPF"
    # Railway
    RRB_NTPC = "rrb_ntpc", "RRB NTPC"
    RRB_GROUP_D = "rrb_group_d", "RRB Group D"
    RRB_JE = "rrb_je", "RRB JE"
    RRB_ALP = "rrb_alp", "RRB ALP"
    RPF = "rpf", "RPF"
    # Banking
    IBPS_PO = "ibps_po", "IBPS PO"
    IBPS_CLERK = "ibps_clerk", "IBPS Clerk"
    IBPS_SO = "ibps_so", "IBPS SO"
    SBI_PO = "sbi_po", "SBI PO"
    SBI_CLERK = "sbi_clerk", "SBI Clerk"
    RBI_GRADE_B = "rbi_grade_b", "RBI Grade B"
    RBI_ASSISTANT = "rbi_assistant", "RBI Assistant"
    NABARD = "nabard", "NABARD"
    SEBI = "sebi", "SEBI"
    LIC_AAO = "lic_aao", "LIC AAO"
    LIC_ADO = "lic_ado", "LIC ADO"
    # Teaching
    CTET = "ctet", "CTET"
    UGC_NET = "ugc_net", "UGC NET"
    KVS = "kvs", "KVS"
    DSSSB = "dsssb", "DSSSB"
    # State PSC
    UPPSC = "uppsc", "UPPSC"
    BPSC = "bpsc", "BPSC"
    MPPSC = "mppsc", "MPPSC"
    RPSC = "rpsc", "RPSC (RAS)"
    APPSC = "appsc", "APPSC"
    TNPSC = "tnpsc", "TNPSC"
    WBPSC = "wbpsc", "WBPSC"
    KPSC = "kpsc", "KPSC"
    HPSC = "hpsc", "HPSC"
    JPSC = "jpsc", "JPSC"
    UKPSC = "ukpsc", "UKPSC"
    CGPSC = "cgpsc", "CGPSC"
    GPSC = "gpsc", "GPSC Gujarat"
    OPSC = "opsc", "OPSC"
    PPSC = "ppsc", "PPSC Punjab"
    # CBSE Board
    CBSE_10 = "cbse_10", "CBSE Class 10"
    CBSE_11 = "cbse_11", "CBSE Class 11"
    CBSE_12 = "cbse_12", "CBSE Class 12"
    # UP Board
    UP_BOARD_12_EN = "up_board_12_en", "UP Board Class 12 (English)"
    UP_BOARD_12_HI = "up_board_12_hi", "UP Board Class 12 (Hindi)"
    UP_BOARD_10_EN = "up_board_10_en", "UP Board Class 10 (English)"
    UP_BOARD_10_HI = "up_board_10_hi", "UP Board Class 10 (Hindi)"
    # Other boards
    ICSE_10 = "icse_10", "ICSE Class 10"
    ISC_12 = "isc_12", "ISC Class 12"
    # Law
    CLAT = "clat", "CLAT"
    AILET = "ailet", "AILET"
    # MBA
    CAT = "cat", "CAT"
    XAT = "xat", "XAT"
    MAT = "mat", "MAT"
    # Nursing & Paramedical
    GNM = "gnm", "GNM Nursing"
    ANM = "anm", "ANM Nursing"
    BPHARM = "bpharm", "B.Pharm"
    DPHARM = "dpharm", "D.Pharm"
    BSCNURSING = "bsc_nursing", "B.Sc Nursing"
    DMLT = "dmlt", "DMLT"
    # State Police
    UP_POLICE = "up_police", "UP Police"
    UP_SI = "up_si", "UP SI"
    BIHAR_POLICE = "bihar_police", "Bihar Police"
    BIHAR_SI = "bihar_si", "Bihar SI"
    MP_POLICE = "mp_police", "MP Police"
    MP_SI = "mp_si", "MP SI"
    RAJ_POLICE = "raj_police", "Rajasthan Police"
    RAJ_SI = "raj_si", "Rajasthan SI"
    HARYANA_POLICE = "haryana_police", "Haryana Police"
    DELHI_POLICE = "delhi_police", "Delhi Police"
    CG_POLICE = "cg_police", "CG Police"
    UK_POLICE = "uk_police", "Uttarakhand Police"
    JHARKHAND_POLICE = "jharkhand_police", "Jharkhand Police"
    # State Teacher
    UPTET = "uptet", "UPTET"
    SUPERTET = "supertet", "Super TET"
    BIHAR_TET = "bihar_tet", "Bihar TET/STET"
    MPTET = "mptet", "MP TET"
    REET = "reet", "REET"
    HTET = "htet", "HTET"
    OTET = "otet", "OTET"
    WB_TET = "wb_tet", "WB TET"
    TNTET = "tntet", "TN TET"
    KARTET = "kartet", "Karnataka TET"
    APTET = "aptet", "AP TET"
    # State Patwari/Lekhpal/Revenue
    UP_LEKHPAL = "up_lekhpal", "UP Lekhpal"
    MP_PATWARI = "mp_patwari", "MP Patwari"
    RAJ_PATWARI = "raj_patwari", "Rajasthan Patwari"
    CG_PATWARI = "cg_patwari", "CG Patwari"
    # State Group C/D
    UP_VDO = "up_vdo", "UP Gram Panchayat Adhikari"
    UP_RO_ARO = "up_ro_aro", "UP RO/ARO"
    BIHAR_CDPO = "bihar_cdpo", "Bihar CDPO"
    MP_VYAPAM = "mp_vyapam", "MP Vyapam"
    RAJ_LDC = "raj_ldc", "Rajasthan LDC"
    JSSC = "jssc", "JSSC Jharkhand"
    OSSSC = "osssc", "OSSSC Odisha"
    WBSSC = "wbssc", "WBSSC"
    HSSC = "hssc", "HSSC Haryana"
    # Agriculture
    ICAR = "icar", "ICAR NET/JRF"
    FCI = "fci", "FCI"
    # Insurance & Others
    NIACL = "niacl", "NIACL"
    UIIC = "uiic", "UIIC"
    EPFO = "epfo", "EPFO"
    # CBSE Class 1-9
    CBSE_1 = "cbse_1", "CBSE Class 1"
    CBSE_2 = "cbse_2", "CBSE Class 2"
    CBSE_3 = "cbse_3", "CBSE Class 3"
    CBSE_4 = "cbse_4", "CBSE Class 4"
    CBSE_5 = "cbse_5", "CBSE Class 5"
    CBSE_6 = "cbse_6", "CBSE Class 6"
    CBSE_7 = "cbse_7", "CBSE Class 7"
    CBSE_8 = "cbse_8", "CBSE Class 8"
    CBSE_9 = "cbse_9", "CBSE Class 9"
    # State Boards
    BIHAR_BOARD_10 = "bihar_board_10", "Bihar Board Class 10"
    BIHAR_BOARD_12 = "bihar_board_12", "Bihar Board Class 12"
    MP_BOARD_10 = "mp_board_10", "MP Board Class 10"
    MP_BOARD_12 = "mp_board_12", "MP Board Class 12"
    RAJ_BOARD_10 = "raj_board_10", "Rajasthan Board Class 10"
    RAJ_BOARD_12 = "raj_board_12", "Rajasthan Board Class 12"
    HARYANA_BOARD_10 = "haryana_board_10", "Haryana Board Class 10"
    HARYANA_BOARD_12 = "haryana_board_12", "Haryana Board Class 12"
    JHARKHAND_BOARD_10 = "jharkhand_board_10", "Jharkhand Board Class 10"
    JHARKHAND_BOARD_12 = "jharkhand_board_12", "Jharkhand Board Class 12"
    CG_BOARD_10 = "cg_board_10", "CG Board Class 10"
    CG_BOARD_12 = "cg_board_12", "CG Board Class 12"
    UK_BOARD_10 = "uk_board_10", "Uttarakhand Board Class 10"
    UK_BOARD_12 = "uk_board_12", "Uttarakhand Board Class 12"
    # Admission / Entrance
    WBJEE = "wbjee", "WBJEE"
    MHT_CET = "mht_cet", "MHT CET"
    KCET = "kcet", "KCET Karnataka"
    AP_EAMCET = "ap_eamcet", "AP EAMCET"
    TS_EAMCET = "ts_eamcet", "TS EAMCET"
    BITSAT = "bitsat", "BITSAT"
    VITEEE = "viteee", "VITEEE"
    COMEDK = "comedk", "COMEDK"
    SRMJEE = "srmjee", "SRMJEE"
    BHU_UET = "bhu_uet", "BHU UET"
    IPU_CET = "ipu_cet", "IPU CET"
    DUET = "duet", "DU Entrance"
    AMU_ENTRANCE = "amu_entrance", "AMU Entrance"
    TISS_NET = "tiss_net", "TISS NET"
    NIFT = "nift", "NIFT Entrance"
    NID = "nid", "NID Entrance"
    UCEED = "uceed", "UCEED"
    CEED = "ceed", "CEED"
    # Others
    GENERAL_GK = "general_gk", "General Knowledge (practice)"
    CUET = "cuet", "CUET"
    OLYMPIAD = "olympiad", "Olympiad"
    NTSE = "ntse", "NTSE"
    KVPY = "kvpy", "KVPY"


class Difficulty(models.TextChoices):
    EASY = "easy", "Easy"
    MEDIUM = "medium", "Medium"
    HARD = "hard", "Hard"


class QuestionSource(models.TextChoices):
    CRAWLED = "crawled", "Crawled"
    AI_GENERATED = "ai_generated", "AI Generated"
    MANUAL = "manual", "Manual"


class ExamQuestion(models.Model):
    exam_type = models.CharField(max_length=50, choices=ExamType.choices, db_index=True)
    year = models.PositiveIntegerField(db_index=True)
    subject = models.CharField(max_length=100, db_index=True)
    chapter = models.CharField(max_length=200, blank=True, default="")
    question_text = models.TextField()
    question_text_hash = models.CharField(max_length=64, unique=True, editable=False)
    options = models.JSONField(help_text='List of option strings, e.g. ["A", "B", "C", "D"]')
    correct_answer = models.PositiveSmallIntegerField(help_text="0-indexed correct option")
    explanation = models.TextField(blank=True, default="")
    difficulty = models.CharField(max_length=10, choices=Difficulty.choices, default=Difficulty.MEDIUM)
    source = models.CharField(max_length=15, choices=QuestionSource.choices, default=QuestionSource.AI_GENERATED)
    source_url = models.URLField(blank=True, default="")
    language = models.CharField(max_length=5, default="en")
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["exam_type", "year", "subject", "id"]
        indexes = [
            models.Index(fields=["exam_type", "year", "subject"]),
            models.Index(fields=["exam_type", "year"]),
            models.Index(fields=["question_text_hash"]),
        ]
        verbose_name = "Exam Question"
        verbose_name_plural = "Exam Questions"

    def __str__(self):
        return f"[{self.exam_type}] {self.year} - {self.subject}: {self.question_text[:60]}"

    @staticmethod
    def normalize_text(text):
        text = text.strip().lower()
        text = re.sub(r"\s+", " ", text)
        return text

    @staticmethod
    def compute_hash(text):
        return hashlib.sha256(ExamQuestion.normalize_text(text).encode("utf-8")).hexdigest()

    def save(self, *args, **kwargs):
        if not self.question_text_hash:
            self.question_text_hash = self.compute_hash(self.question_text)
        super().save(*args, **kwargs)


class PYQCrawlLog(models.Model):
    source = models.CharField(max_length=100)
    status = models.CharField(max_length=20, default="running")
    questions_found = models.PositiveIntegerField(default=0)
    questions_new = models.PositiveIntegerField(default=0)
    duration_seconds = models.FloatField(default=0)
    error_message = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "PYQ Crawl Log"

    def __str__(self):
        return f"{self.source} — {self.status} ({self.created_at:%Y-%m-%d %H:%M})"
