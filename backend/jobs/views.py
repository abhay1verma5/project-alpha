from django.db import models
from django.db.models import Count, Sum
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .filters import JobFilter
from .models import ContentType, Job
from .serializers import JobDetailSerializer, JobListSerializer


# 5-minute cache for list views, 10-minute for stats
CACHE_LIST = 60 * 5
CACHE_DETAIL = 60 * 10
CACHE_STATS = 60 * 10


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class JobListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "title_hi", "organization", "qualification", "description"]
    ordering_fields = ["posted_date", "last_date", "vacancies", "created_at"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        qs = Job.objects.filter(is_active=True)
        # Default to jobs-only when no content_type filter is specified;
        # let the filter handle it when the user explicitly picks a type.
        if not self.request.query_params.get("content_type"):
            qs = qs.filter(content_type=ContentType.JOB)
        return qs


@method_decorator(cache_page(CACHE_DETAIL), name="dispatch")
class JobDetailView(generics.RetrieveAPIView):
    serializer_class = JobDetailSerializer
    lookup_field = "slug"

    def get_queryset(self):
        return Job.objects.filter(is_active=True)


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class ResultListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering_fields = ["posted_date", "last_date", "vacancies"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        return Job.objects.filter(is_active=True, content_type=ContentType.RESULT)


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class AdmitCardListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering_fields = ["posted_date", "last_date", "vacancies"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        return Job.objects.filter(is_active=True, content_type=ContentType.ADMIT_CARD)


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class AnswerKeyListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering_fields = ["posted_date", "last_date", "vacancies"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        return Job.objects.filter(is_active=True, content_type=ContentType.ANSWER_KEY)


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class AdmissionListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering_fields = ["posted_date", "last_date", "vacancies"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        return Job.objects.filter(is_active=True, content_type=ContentType.ADMISSION)


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class SyllabusListView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering_fields = ["posted_date", "last_date", "vacancies"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        return Job.objects.filter(is_active=True, content_type=ContentType.SYLLABUS)


class FeaturedJobsView(generics.ListAPIView):
    serializer_class = JobListSerializer
    pagination_class = None

    def get_queryset(self):
        return Job.objects.filter(
            is_active=True, is_featured=True, content_type=ContentType.JOB
        )[:10]


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class CategoryJobsView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        category = self.kwargs["category"]
        return Job.objects.filter(
            is_active=True, category=category, content_type=ContentType.JOB
        )


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class StateJobsView(generics.ListAPIView):
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        state = self.kwargs["state"]
        return Job.objects.filter(
            is_active=True, state=state, content_type=ContentType.JOB
        )


@api_view(["GET"])
def stats_view(request):
    """Aggregated statistics — single query using conditional aggregation."""
    from django.db.models import Case, Value, When

    jobs_qs = Job.objects.filter(is_active=True)

    # Single aggregation query instead of 6 separate queries
    agg = jobs_qs.aggregate(
        total_jobs=Count("id", filter=models.Q(content_type=ContentType.JOB)),
        total_vacancies=Sum("vacancies", filter=models.Q(content_type=ContentType.JOB)),
        total_results=Count("id", filter=models.Q(content_type=ContentType.RESULT)),
        total_admit_cards=Count("id", filter=models.Q(content_type=ContentType.ADMIT_CARD)),
        total_answer_keys=Count("id", filter=models.Q(content_type=ContentType.ANSWER_KEY)),
    )
    states_covered = (
        jobs_qs.filter(content_type=ContentType.JOB)
        .values("state")
        .distinct()
        .count()
    )
    categories = list(
        jobs_qs.filter(content_type=ContentType.JOB)
        .values("category")
        .annotate(count=Count("id"))
        .order_by("-count")
    )

    return Response(
        {
            "total_jobs": agg["total_jobs"],
            "total_vacancies": agg["total_vacancies"] or 0,
            "total_results": agg["total_results"],
            "total_admit_cards": agg["total_admit_cards"],
            "total_answer_keys": agg["total_answer_keys"],
            "states_covered": states_covered,
            "categories": categories,
        }
    )


@method_decorator(cache_page(CACHE_LIST), name="dispatch")
class NewsListView(generics.ListAPIView):
    """All content types combined as a news feed, ordered by posted_date."""
    serializer_class = JobListSerializer
    filterset_class = JobFilter
    search_fields = ["title", "organization"]
    ordering = ["-posted_date"]

    def get_queryset(self):
        return Job.objects.filter(is_active=True)


@api_view(["GET"])
def sitemap_slugs_view(request):
    """Lightweight endpoint returning all job slugs for sitemap generation."""
    slugs = list(
        Job.objects.filter(is_active=True)
        .values_list("slug", "posted_date", "is_featured", "content_type")
        .order_by("-posted_date")
    )
    return Response(
        [
            {
                "slug": s[0],
                "posted_date": s[1],
                "is_featured": s[2],
                "content_type": s[3],
            }
            for s in slugs
        ]
    )


STAGE_ORDER = ["syllabus", "job", "admit_card", "answer_key", "result", "admission"]


@api_view(["GET"])
def exam_timeline_view(request):
    """Every notice for one exam, grouped by stage: notification → admit card → key → result.

    `q` is matched against title and organization (all words must match).
    """
    from django.db.models import Q

    query = request.query_params.get("q", "").strip()
    if len(query) < 3:
        return Response({"query": query, "stages": []})

    qs = Job.objects.all()
    for word in query.split()[:6]:
        qs = qs.filter(Q(title__icontains=word) | Q(organization__icontains=word))
    rows = JobListSerializer(qs.order_by("-posted_date")[:80], many=True).data

    grouped = {}
    for row in rows:
        grouped.setdefault(row["content_type"], []).append(row)
    stages = [
        {"stage": stage, "items": grouped[stage]}
        for stage in STAGE_ORDER
        if stage in grouped
    ]
    return Response({"query": query, "total": len(rows), "stages": stages})


TELEGRAM_HELP = (
    "SarkariAlert bot commands:\n"
    "/start — subscribe to daily job alerts\n"
    "/cat ssc banking railway — only these categories (blank = all)\n"
    "/state up bihar — only these states (blank = all)\n"
    "/me — show your settings\n"
    "/stop — unsubscribe\n\n"
    "You will get new notices daily and a reminder 3 days and 1 day before each last date."
)

_CATEGORY_ALIASES = {
    "ssc": "ssc", "upsc": "upsc", "railway": "railway", "rrb": "railway", "bank": "banking",
    "banking": "banking", "defence": "defence", "army": "defence", "police": "police",
    "teaching": "teaching", "tet": "teaching", "health": "health", "medical": "medical",
    "engineering": "engineering", "psc": "state_psc", "state_psc": "state_psc",
    "university": "university", "gramin": "gramin", "rural": "gramin",
}
_STATE_ALIASES = {
    "up": "uttar_pradesh", "bihar": "bihar", "mp": "madhya_pradesh", "rajasthan": "rajasthan",
    "delhi": "delhi", "haryana": "haryana", "punjab": "punjab", "wb": "west_bengal",
    "bengal": "west_bengal", "maharashtra": "maharashtra", "gujarat": "gujarat",
    "jharkhand": "jharkhand", "uttarakhand": "uttarakhand", "odisha": "odisha",
    "tamilnadu": "tamil_nadu", "tn": "tamil_nadu", "telangana": "telangana", "ap": "andhra_pradesh",
    "karnataka": "karnataka", "kerala": "kerala", "chhattisgarh": "chhattisgarh", "cg": "chhattisgarh",
    "hp": "himachal_pradesh", "assam": "assam", "goa": "goa", "jk": "jammu_kashmir",
}


@api_view(["POST"])
def telegram_webhook_view(request, secret):
    """Telegram bot updates. Registers TelegramSubscriber rows and their filters.

    Set the webhook once:
      https://api.telegram.org/bot<TOKEN>/setWebhook?url=<API_URL>/telegram/webhook/<SECRET>/
    """
    from django.conf import settings

    from .models import TelegramSubscriber
    from .telegram import send_telegram_message

    if not settings.TELEGRAM_WEBHOOK_SECRET or secret != settings.TELEGRAM_WEBHOOK_SECRET:
        return Response(status=status.HTTP_404_NOT_FOUND)

    message = request.data.get("message") or request.data.get("edited_message") or {}
    chat = message.get("chat") or {}
    chat_id = chat.get("id")
    text = (message.get("text") or "").strip()
    if not chat_id or not text:
        return Response({"ok": True})

    parts = text.split()
    command = parts[0].split("@")[0].lower()
    args = [a.lower().strip(",") for a in parts[1:]]
    username = chat.get("username") or chat.get("first_name") or ""

    sub, _ = TelegramSubscriber.objects.get_or_create(
        chat_id=chat_id, defaults={"username": username}
    )

    if command in ("/start", "/help"):
        sub.is_active = True
        sub.save(update_fields=["is_active"])
        reply = "Subscribed. " + TELEGRAM_HELP
    elif command == "/stop":
        sub.is_active = False
        sub.save(update_fields=["is_active"])
        reply = "Unsubscribed. Send /start any time to resume."
    elif command == "/cat":
        sub.categories = sorted({_CATEGORY_ALIASES[a] for a in args if a in _CATEGORY_ALIASES})
        sub.save(update_fields=["categories"])
        reply = f"Categories: {', '.join(sub.categories) or 'all'}"
    elif command == "/state":
        sub.states = sorted({_STATE_ALIASES[a] for a in args if a in _STATE_ALIASES})
        sub.save(update_fields=["states"])
        reply = f"States: {', '.join(sub.states) or 'all'}"
    elif command == "/me":
        reply = (
            f"Active: {'yes' if sub.is_active else 'no'}\n"
            f"Categories: {', '.join(sub.categories) or 'all'}\n"
            f"States: {', '.join(sub.states) or 'all'}"
        )
    else:
        reply = TELEGRAM_HELP

    send_telegram_message(reply, chat_id=str(chat_id))
    return Response({"ok": True})


@api_view(["GET"])
def health_view(request):
    """Health check endpoint for monitoring."""
    from django.db import connection
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        job_count = Job.objects.filter(is_active=True).count()
        return Response({
            "status": "healthy",
            "database": "connected",
            "active_jobs": job_count,
        })
    except Exception as e:
        return Response(
            {"status": "unhealthy", "error": str(e)},
            status=status.HTTP_503_SERVICE_UNAVAILABLE,
        )


@api_view(["GET"])
def search_view(request):
    query = request.query_params.get("q", "").strip()
    if not query or len(query) < 2:
        return Response({"results": []})

    from django.db.models import Q

    # Remove common stop words, then AND-match remaining words
    STOP_WORDS = {
        "job", "jobs", "naukri", "vacancy", "vacancies", "bharti",
        "recruitment", "sarkari", "government", "govt", "latest",
        "new", "online", "form", "apply", "the", "for", "in", "of",
        "and", "a", "an", "to", "is", "are", "was", "with",
    }
    words = [w for w in query.split() if w.lower() not in STOP_WORDS]
    if not words:
        words = query.split()[:2]  # fallback: use original words

    qs = Job.objects.filter(is_active=True)
    for word in words:
        qs = qs.filter(
            Q(title__icontains=word)
            | Q(title_hi__icontains=word)
            | Q(organization__icontains=word)
            | Q(qualification__icontains=word)
            | Q(description__icontains=word)
        )

    results = qs.order_by("-posted_date")[:20]
    serializer = JobListSerializer(results, many=True)
    return Response({"results": serializer.data})
