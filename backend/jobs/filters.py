import django_filters
from django.db.models import Q
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
