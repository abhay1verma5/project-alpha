import operator
from functools import reduce

import django_filters
from django.db.models import Case, IntegerField, Q, Value, When

from .models import Job

# Map frontend qualification values → search keywords for title/description
QUALIFICATION_KEYWORDS: dict[str, list[str]] = {
    "8th": ["8th", "8 pass", "eighth"],
    "10th": ["10th", "matric", "10 pass", "sslc", "high school", "दसवीं"],
    "12th": ["12th", "inter", "12 pass", "intermediate", "higher secondary", "10+2", "बारहवीं"],
    "12th_science": ["12th science", "pcm", "pcb", "science stream"],
    "12th_arts": ["12th arts", "arts stream", "humanities"],
    "12th_commerce": ["12th commerce", "commerce stream"],
    "iti": ["iti", "industrial training"],
    "diploma": ["diploma", "polytechnic"],
    "d_pharm": ["d.pharm", "d pharm", "pharmacy diploma"],
    "gnm": ["gnm", "nursing"],
    "anm": ["anm", "auxiliary nurse"],
    "graduation": ["graduate", "graduation", "degree", "bachelor", "स्नातक"],
    "ba": ["b.a", "ba ", "bachelor of arts"],
    "bsc": ["b.sc", "bsc", "bachelor of science"],
    "bcom": ["b.com", "bcom", "bachelor of commerce"],
    "btech": ["b.tech", "b.e", "btech", "engineering degree"],
    "bca": ["bca", "bachelor of computer"],
    "bba": ["bba", "bachelor of business"],
    "bed": ["b.ed", "bed", "bachelor of education"],
    "btc": ["btc", "d.el.ed", "deled"],
    "llb": ["llb", "l.l.b", "law degree"],
    "mbbs": ["mbbs", "m.b.b.s"],
    "bds": ["bds", "b.d.s", "dental"],
    "bams": ["bams", "b.a.m.s", "ayurveda"],
    "bhms": ["bhms", "b.h.m.s", "homeopathy"],
    "bpharm": ["b.pharm", "b pharm", "pharmacy"],
    "bsc_nursing": ["b.sc nursing", "bsc nursing"],
    "pg": ["post graduate", "master", "pg ", "m.a", "m.sc", "m.com"],
    "ma": ["m.a", "ma ", "master of arts"],
    "msc": ["m.sc", "msc", "master of science"],
    "mcom": ["m.com", "mcom"],
    "mtech": ["m.tech", "m.e", "mtech"],
    "mba": ["mba", "m.b.a"],
    "mca": ["mca", "m.c.a"],
    "med": ["m.ed", "med"],
    "llm": ["llm", "l.l.m"],
    "md_ms": ["md", "ms", "m.d", "m.s"],
    "phd": ["phd", "ph.d", "doctorate"],
    "net_set": ["ugc net", "net", "set"],
}


class JobFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category")
    state = django_filters.CharFilter(field_name="state")
    content_type = django_filters.CharFilter(field_name="content_type")
    is_featured = django_filters.BooleanFilter(field_name="is_featured")
    last_date_gte = django_filters.DateFilter(field_name="last_date", lookup_expr="gte")
    last_date_lte = django_filters.DateFilter(field_name="last_date", lookup_expr="lte")
    posted_after = django_filters.DateFilter(
        field_name="posted_date", lookup_expr="gte"
    )
    qualification = django_filters.CharFilter(method="filter_qualification")

    def filter_qualification(self, queryset, name, value):
        """Smart qualification filter: search qualification field, title, and description."""
        if not value:
            return queryset
        keywords = QUALIFICATION_KEYWORDS.get(value.lower(), [value])
        q = Q()
        for kw in keywords:
            q |= Q(qualification__icontains=kw)
            q |= Q(title__icontains=kw)
            q |= Q(description__icontains=kw)
        return queryset.filter(q).distinct()

    class Meta:
        model = Job
        fields = [
            "category",
            "state",
            "content_type",
            "is_featured",
        ]


# Words that carry no meaning for a job search ("jobs for 10th pass in UP" -> "10th pass up")
SEARCH_STOP_WORDS = {
    "job", "jobs", "naukri", "vacancy", "vacancies", "bharti", "recruitment", "sarkari",
    "government", "govt", "latest", "new", "online", "form", "apply", "the", "for", "in", "of",
    "and", "a", "an", "to", "is", "are", "was", "with",
}

# Multi-word phrases folded into a single word before the query is split
SEARCH_PHRASES: dict[str, str] = {
    "high school": "10th",
    "uttar pradesh": "up",
    "madhya pradesh": "mp",
}

_TENTH_TEXTS = ["10th", "matric", "10 pass", "sslc", "दसवीं"]
_TWELFTH_TEXTS = ["12th", "12 pass", "intermediate", "higher secondary", "10+2", "बारहवीं"]
_GRADUATE_TEXTS = ["graduate", "graduation", "degree", "bachelor", "स्नातक"]
_RAILWAY = {"category": "railway", "texts": ["railway", "rrb"]}
_BANKING = {"category": "banking", "texts": ["bank", "banking"]}
_TEACHING = {"category": "teaching", "texts": ["teacher", "teaching"]}

# Word -> what it means. "state"/"category" match the stored key exactly; "texts" are
# matched case-insensitively against title, title_hi, organization and qualification.
# Words not listed here match their own text, state key and category key.
SEARCH_SYNONYMS: dict[str, dict] = {
    "up": {"state": "uttar_pradesh", "texts": ["uttar pradesh"]},
    "mp": {"state": "madhya_pradesh", "texts": ["madhya pradesh"]},
    "10th": {"texts": _TENTH_TEXTS},
    "matric": {"texts": _TENTH_TEXTS},
    "12th": {"texts": _TWELFTH_TEXTS},
    "inter": {"texts": _TWELFTH_TEXTS},
    "graduate": {"texts": _GRADUATE_TEXTS},
    "graduation": {"texts": _GRADUATE_TEXTS},
    "railway": _RAILWAY,
    "rrb": _RAILWAY,
    "bank": _BANKING,
    "banking": _BANKING,
    "police": {"category": "police", "texts": ["police"]},
    "teacher": _TEACHING,
    "teaching": _TEACHING,
}

# Below this many AND-matched jobs, the search falls back to OR across words
SEARCH_MIN_AND_RESULTS = 5


def tokenize_search_query(query: str) -> list[str]:
    """Lowercase, fold phrases, split into words and drop stop words.

    If every word is a stop word, fall back to the first two raw words.
    """
    text = query.lower()
    for phrase, replacement in SEARCH_PHRASES.items():
        text = text.replace(phrase, replacement)
    raw_words = [w.strip(".,;:!?()[]\"'") for w in text.split()]
    raw_words = [w for w in raw_words if w]
    words = [w for w in raw_words if w not in SEARCH_STOP_WORDS]
    return words or raw_words[:2]


def search_word_q(word: str) -> Q:
    """Q matching one search word across title, title_hi, organization, qualification, state, category."""
    spec = SEARCH_SYNONYMS.get(word)
    texts = spec["texts"] if spec else [word]
    q = Q()
    for text in texts:
        q |= (
            Q(title__icontains=text)
            | Q(title_hi__icontains=text)
            | Q(organization__icontains=text)
            | Q(qualification__icontains=text)
        )
    if spec is None:
        q |= Q(state=word) | Q(category=word)
    if spec and "state" in spec:
        q |= Q(state=spec["state"])
    if spec and "category" in spec:
        q |= Q(category=spec["category"])
    return q


def search_jobs_queryset(base_qs, query: str):
    """Return (queryset, count) for a free-text job search.

    AND across words. If that finds fewer than SEARCH_MIN_AND_RESULTS jobs, fall back to
    OR across words, annotated with matched_words and ordered by it (most matches first).
    """
    words = tokenize_search_query(query)
    if not words:
        return base_qs.none(), 0

    and_qs = base_qs
    for word in words:
        and_qs = and_qs.filter(search_word_q(word))
    and_count = and_qs.count()
    if and_count >= SEARCH_MIN_AND_RESULTS:
        return and_qs.order_by("-posted_date", "-created_at"), and_count

    any_q = Q()
    for word in words:
        any_q |= search_word_q(word)
    word_hits = [
        Case(When(search_word_q(word), then=Value(1)), default=Value(0), output_field=IntegerField())
        for word in words
    ]
    or_qs = (
        base_qs.filter(any_q)
        .annotate(matched_words=reduce(operator.add, word_hits))
        .order_by("-matched_words", "-posted_date", "-created_at")
    )
    return or_qs, or_qs.count()
