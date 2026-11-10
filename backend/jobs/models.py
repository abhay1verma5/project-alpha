import re
from django.db import models
from django.utils.text import slugify


class Category(models.TextChoices):
    RAILWAY = "railway", "Railway"
    SSC = "ssc", "SSC"
    BANKING = "banking", "Banking"
    DEFENCE = "defence", "Defence"
    UPSC = "upsc", "UPSC"
    STATE_PSC = "state_psc", "State PSC"
    TEACHING = "teaching", "Teaching"
    POLICE = "police", "Police"
    HEALTH = "health", "Health"
    ENGINEERING = "engineering", "Engineering"
    MEDICAL = "medical", "Medical / Nursing"
    UNIVERSITY = "university", "University / College"
    GRAMIN = "gramin", "Gram Panchayat / Rural"
    OTHER = "other", "Other"


class ContentType(models.TextChoices):
    JOB = "job", "Job"
    RESULT = "result", "Result"
    ADMIT_CARD = "admit_card", "Admit Card"
    ANSWER_KEY = "answer_key", "Answer Key"
    ADMISSION = "admission", "Admission / Counseling"
    SYLLABUS = "syllabus", "Syllabus"


INDIAN_STATES = [
    ("andhra_pradesh", "Andhra Pradesh"),
    ("arunachal_pradesh", "Arunachal Pradesh"),
    ("assam", "Assam"),
    ("bihar", "Bihar"),
    ("chhattisgarh", "Chhattisgarh"),
    ("goa", "Goa"),
    ("gujarat", "Gujarat"),
    ("haryana", "Haryana"),
    ("himachal_pradesh", "Himachal Pradesh"),
    ("jharkhand", "Jharkhand"),
    ("karnataka", "Karnataka"),
    ("kerala", "Kerala"),
    ("madhya_pradesh", "Madhya Pradesh"),
    ("maharashtra", "Maharashtra"),
    ("manipur", "Manipur"),
    ("meghalaya", "Meghalaya"),
    ("mizoram", "Mizoram"),
    ("nagaland", "Nagaland"),
    ("odisha", "Odisha"),
    ("punjab", "Punjab"),
    ("rajasthan", "Rajasthan"),
    ("sikkim", "Sikkim"),
    ("tamil_nadu", "Tamil Nadu"),
    ("telangana", "Telangana"),
    ("tripura", "Tripura"),
    ("uttar_pradesh", "Uttar Pradesh"),
    ("uttarakhand", "Uttarakhand"),
    ("west_bengal", "West Bengal"),
    ("delhi", "Delhi"),
    ("jammu_kashmir", "Jammu & Kashmir"),
    ("ladakh", "Ladakh"),
    ("chandigarh", "Chandigarh"),
    ("puducherry", "Puducherry"),
    ("all_india", "All India"),
]


class Job(models.Model):
    title = models.CharField(max_length=500)
    title_hi = models.CharField(max_length=500, null=True, blank=True)
    slug = models.SlugField(max_length=600, unique=True)
    organization = models.CharField(max_length=300)
    content_type = models.CharField(
        max_length=20, choices=ContentType.choices, default=ContentType.JOB
    )
    category = models.CharField(
        max_length=20, choices=Category.choices, default=Category.OTHER
    )
    state = models.CharField(max_length=30, choices=INDIAN_STATES, default="all_india")
    vacancies = models.PositiveIntegerField(null=True, blank=True)
    last_date = models.DateField(null=True, blank=True)
    age_limit = models.CharField(max_length=200, null=True, blank=True)
    qualification = models.CharField(max_length=500, null=True, blank=True)
    salary = models.CharField(max_length=300, null=True, blank=True)
    apply_link = models.URLField(max_length=1000, null=True, blank=True)
    notification_pdf = models.URLField(max_length=1000, null=True, blank=True)
    source_url = models.URLField(max_length=1000, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    fee = models.JSONField(null=True, blank=True, help_text='Application fee e.g. {"General": "₹500", "OBC": "₹250", "SC/ST": "Free"}')
    vacancy_details = models.JSONField(null=True, blank=True, help_text='Category-wise vacancy e.g. {"General": 5000, "OBC": 3000, "SC/ST": 2000, "EWS": 1558}')
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    posted_date = models.DateField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Multi-language title translations
    title_ta = models.CharField(max_length=500, null=True, blank=True)
    title_te = models.CharField(max_length=500, null=True, blank=True)
    title_bn = models.CharField(max_length=500, null=True, blank=True)
    title_mr = models.CharField(max_length=500, null=True, blank=True)
    title_gu = models.CharField(max_length=500, null=True, blank=True)
    title_kn = models.CharField(max_length=500, null=True, blank=True)
    title_ml = models.CharField(max_length=500, null=True, blank=True)
    title_pa = models.CharField(max_length=500, null=True, blank=True)
    title_or = models.CharField(max_length=500, null=True, blank=True)

    class Meta:
        ordering = ["-posted_date", "-created_at"]
        indexes = [
            models.Index(fields=["category"]),
            models.Index(fields=["state"]),
            models.Index(fields=["content_type"]),
            models.Index(fields=["last_date"]),
            models.Index(fields=["is_active"]),
            models.Index(fields=["slug"]),
            # Composite indexes for the most common query patterns
            models.Index(fields=["is_active", "-posted_date"]),
            models.Index(fields=["is_active", "content_type", "-posted_date"]),
            models.Index(fields=["is_active", "category", "-posted_date"]),
            models.Index(fields=["is_active", "state", "-posted_date"]),
        ]

    def __str__(self):
        return self.title

    # Hindi translation map for common government job terms
    _HI_MAP = [
        (r'\bRecruitment\b', 'भर्ती'),
        (r'\bVacancy\b', 'रिक्ति'),
        (r'\bVacancies\b', 'रिक्तियाँ'),
        (r'\bResult\b', 'परिणाम'),
        (r'\bAdmit Card\b', 'प्रवेश पत्र'),
        (r'\bAnswer Key\b', 'उत्तर कुंजी'),
        (r'\bAdmission\b', 'प्रवेश'),
        (r'\bSyllabus\b', 'पाठ्यक्रम'),
        (r'\bNotification\b', 'अधिसूचना'),
        (r'\bRegistration\b', 'पंजीकरण'),
        (r'\bApplication\b', 'आवेदन'),
        (r'\bExamination\b', 'परीक्षा'),
        (r'\bExam\b', 'परीक्षा'),
        (r'\bOnline\b', 'ऑनलाइन'),
        (r'\bPreliminary\b', 'प्रारंभिक'),
        (r'\bMain\b', 'मुख्य'),
        (r'\bMains\b', 'मुख्य'),
        (r'\bInterview\b', 'साक्षात्कार'),
        (r'\bGovernment\b', 'सरकारी'),
        (r'\bJobs?\b', 'नौकरी'),
        (r'\bPost\b', 'पद'),
        (r'\bPosts\b', 'पद'),
        (r'\bOfficer\b', 'अधिकारी'),
        (r'\bOfficers\b', 'अधिकारी'),
        (r'\bClerk\b', 'लिपिक'),
        (r'\bConstable\b', 'सिपाही'),
        (r'\bTeacher\b', 'शिक्षक'),
        (r'\bEngineer\b', 'अभियंता'),
        (r'\bDoctor\b', 'चिकित्सक'),
        (r'\bNurse\b', 'नर्स'),
        (r'\bAssistant\b', 'सहायक'),
        (r'\bManager\b', 'प्रबंधक'),
        (r'\bDirector\b', 'निदेशक'),
        (r'\bInspector\b', 'निरीक्षक'),
        (r'\bSub Inspector\b', 'उप निरीक्षक'),
        (r'\bHead Constable\b', 'हेड कांस्टेबल'),
        (r'\bRailway\b', 'रेलवे'),
        (r'\bPolice\b', 'पुलिस'),
        (r'\bArmy\b', 'सेना'),
        (r'\bNavy\b', 'नौसेना'),
        (r'\bAir Force\b', 'वायु सेना'),
        (r'\bDefence\b', 'रक्षा'),
        (r'\bBank\b', 'बैंक'),
        (r'\bBanking\b', 'बैंकिंग'),
        (r'\bCentral\b', 'केंद्रीय'),
        (r'\bState\b', 'राज्य'),
        (r'\bBoard\b', 'बोर्ड'),
        (r'\bCommission\b', 'आयोग'),
        (r'\bMinistry\b', 'मंत्रालय'),
        (r'\bDepartment\b', 'विभाग'),
        (r'\bCourt\b', 'न्यायालय'),
        (r'\bHigh Court\b', 'उच्च न्यायालय'),
        (r'\bSupreme Court\b', 'सर्वोच्च न्यायालय'),
        (r'\bUniversity\b', 'विश्वविद्यालय'),
        (r'\bCollege\b', 'महाविद्यालय'),
        (r'\bSchool\b', 'विद्यालय'),
        (r'\bHospital\b', 'अस्पताल'),
        (r'\bDistrict\b', 'जिला'),
        (r'\bNational\b', 'राष्ट्रीय'),
        (r'\bPublic\b', 'लोक'),
        (r'\bService\b', 'सेवा'),
        (r'\bSelection\b', 'चयन'),
        (r'\bStaff\b', 'कर्मचारी'),
        (r'\bApply\b', 'आवेदन करें'),
        (r'\bDownload\b', 'डाउनलोड'),
        (r'\bFrom\b', 'से'),
        (r'\bSpecial\b', 'विशेष'),
        (r'\bDrive\b', 'अभियान'),
        (r'\bCounseling\b', 'काउंसलिंग'),
        (r'\bWalkin\b', 'वॉक-इन'),
        (r'\bWalk-in\b', 'वॉक-इन'),
        (r'\bContract\b', 'अनुबंध'),
        (r'\bTemporary\b', 'अस्थायी'),
        (r'\bPermanent\b', 'स्थायी'),
        (r'\bGroup\b', 'ग्रुप'),
        (r'\bGrade\b', 'ग्रेड'),
        (r'\bLevel\b', 'लेवल'),
        (r'\bPhase\b', 'चरण'),
        (r'\bTier\b', 'टियर'),
        (r'\bStatus\b', 'स्थिति'),
        (r'\bSchedule\b', 'अनुसूची'),
        (r'\bof\b', 'के'),
        (r'\bfor\b', 'के लिए'),
        (r'\band\b', 'और'),
        (r'\bthe\b', ''),
    ]

    @classmethod
    def _translate_to_hindi(cls, title: str) -> str:
        """Auto-translate job title to Hindi using keyword mapping."""
        result = title
        for pattern, replacement in cls._HI_MAP:
            result = re.sub(pattern, replacement, result, flags=re.IGNORECASE)
        # Clean up extra spaces
        result = re.sub(r'\s+', ' ', result).strip()
        return result

    def save(self, *args, **kwargs):
        if not self.slug:
            base_slug = slugify(self.title)[:550]
            slug = base_slug
            n = 1
            while Job.objects.filter(slug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{n}"
                n += 1
            self.slug = slug
        # Auto-generate Hindi title if not set
        if not self.title_hi or self.title_hi == 'None':
            self.title_hi = self._translate_to_hindi(self.title)
        super().save(*args, **kwargs)

    @property
    def is_expired(self):
        if not self.last_date:
            return False
        from django.utils import timezone

        return self.last_date < timezone.now().date()

    # Aggregators repost official notices; anything from them is "unverified"
    # until an official URL is attached.
    AGGREGATOR_HOSTS = (
        "sarkariresult", "freejobalert", "sarkariexam", "rojgarresult",
        "sarkarinetwork", "sarkariexam",
    )
    OFFICIAL_SUFFIXES = (
        ".gov.in", ".nic.in", ".ac.in", ".edu.in", ".res.in", ".gov", ".edu",
    )
    OFFICIAL_HOSTS = (
        "ibps.in", "sbi.co.in", "rbi.org.in", "licindia.in", "iocl.com", "ongcindia.com",
        "ntpc.co.in", "sail.co.in", "bhel.com", "hal-india.co.in", "bel-india.in",
        "gailonline.com", "coalindia.in", "becil.com", "bsnl.in", "indiapost.gov.in",
        "employmentnews.gov.in", "aiims.edu", "nvs.gov.in", "kvs.gov.in",
    )

    @property
    def source_host(self):
        from urllib.parse import urlparse

        for url in (self.source_url, self.notification_pdf, self.apply_link):
            if url:
                host = urlparse(url).netloc.lower()
                if host:
                    return host[4:] if host.startswith("www.") else host
        return ""

    @property
    def is_official(self):
        """True when the notice was read from the recruiting body's own site."""
        host = self.source_host
        if not host or any(a in host for a in self.AGGREGATOR_HOSTS):
            return False
        return host.endswith(self.OFFICIAL_SUFFIXES) or any(
            host == h or host.endswith("." + h) for h in self.OFFICIAL_HOSTS
        )


class TelegramSubscriber(models.Model):
    chat_id = models.BigIntegerField(unique=True)
    username = models.CharField(max_length=200, null=True, blank=True)
    categories = models.JSONField(default=list, blank=True)
    states = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.chat_id} ({self.username})"


class TelegramAlertLog(models.Model):
    """Tracks which jobs have already had Telegram alerts sent, for idempotency."""

    job = models.OneToOneField(Job, on_delete=models.CASCADE, related_name="telegram_alert")
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-sent_at"]

    def __str__(self):
        return f"Alert for {self.job_id} at {self.sent_at}"


class CrawlLog(models.Model):
    source = models.CharField(max_length=200)
    status = models.CharField(max_length=20)  # success / error
    jobs_found = models.PositiveIntegerField(default=0)
    jobs_new = models.PositiveIntegerField(default=0)
    error_message = models.TextField(null=True, blank=True)
    started_at = models.DateTimeField(auto_now_add=True)
    duration_seconds = models.FloatField(null=True, blank=True)

    class Meta:
        ordering = ["-started_at"]

    def __str__(self):
        return f"{self.source} - {self.status} ({self.started_at})"