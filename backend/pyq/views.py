import random

from django.core.cache import cache
from django.db.models import Count, Max, Min
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .filters import ExamQuestionFilter
from .models import ExamQuestion
from .serializers import (
    AnswerCheckSerializer,
    ExamQuestionMockSerializer,
    ExamQuestionSerializer,
)


def _limit(request, default, maximum):
    """?limit= clamped to [1, maximum]; default when absent or invalid."""
    try:
        return max(1, min(int(request.query_params.get("limit", default)), maximum))
    except (TypeError, ValueError):
        return default


def _random_sample(queryset, n):
    """Return up to n random rows from queryset without ORDER BY RANDOM().

    ORDER BY RANDOM() makes SQLite read and sort every matching row; over the
    whole bank (600K+ questions) that took minutes on Render. Instead:
    - no filters: probe random ids between MIN(id) and MAX(id) (ids are dense);
    - with filters: read only the matching ids (index scan), sample n of them.
    """
    if not queryset.query.where:
        bounds = queryset.aggregate(lo=Min("id"), hi=Max("id"))
        lo, hi = bounds["lo"], bounds["hi"]
        if lo is None:
            return []
        rows, seen = [], set()
        for _ in range(4):
            want = min(hi - lo + 1, (n - len(rows)) * 3)
            probe = set(random.sample(range(lo, hi + 1), want)) - seen
            seen |= probe
            rows.extend(queryset.filter(id__in=probe)[: n - len(rows)])
            if len(rows) >= n:
                break
        random.shuffle(rows)
        return rows[:n]
    ids = list(queryset.values_list("id", flat=True))
    chosen = random.sample(ids, min(n, len(ids)))
    rows = list(queryset.model.objects.filter(id__in=chosen))
    random.shuffle(rows)
    return rows


class PYQListView(generics.ListAPIView):
    """GET /api/pyq/ — List questions with answers (practice mode)."""

    serializer_class = ExamQuestionSerializer
    filterset_class = ExamQuestionFilter
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        return ExamQuestion.objects.all()

    def filter_queryset(self, queryset):
        # Limit at the database level: a practice set is 10-200 questions, never
        # the whole bank. Random order so repeat visits see different questions.
        queryset = super().filter_queryset(queryset)
        return _random_sample(queryset, _limit(self.request, default=50, maximum=1000))


class PYQMockView(generics.ListAPIView):
    """GET /api/pyq/mock/ — Questions WITHOUT answers (mock test mode)."""

    serializer_class = ExamQuestionMockSerializer
    filterset_class = ExamQuestionFilter
    permission_classes = [AllowAny]
    pagination_class = None

    def get_queryset(self):
        return ExamQuestion.objects.all()

    def filter_queryset(self, queryset):
        queryset = super().filter_queryset(queryset)
        return _random_sample(queryset, _limit(self.request, default=25, maximum=100))


class PYQCheckView(APIView):
    """POST /api/pyq/check/ — Submit answers, get score + explanations."""

    permission_classes = [AllowAny]

    def post(self, request):
        serializer = AnswerCheckSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        answers = serializer.validated_data["answers"]
        question_ids = [int(qid) for qid in answers.keys()]
        questions = ExamQuestion.objects.filter(id__in=question_ids)
        q_map = {q.id: q for q in questions}

        results = []
        correct_count = 0
        total = len(answers)

        for qid_str, selected in answers.items():
            qid = int(qid_str)
            q = q_map.get(qid)
            if not q:
                continue
            is_correct = selected == q.correct_answer
            if is_correct:
                correct_count += 1
            results.append({
                "id": qid,
                "selected": selected,
                "correct_answer": q.correct_answer,
                "is_correct": is_correct,
                "explanation": q.explanation,
                "question_text": q.question_text,
                "options": q.options,
            })

        return Response({
            "score": correct_count,
            "total": total,
            "percentage": round((correct_count / total) * 100, 1) if total else 0,
            "results": results,
        })


class PYQMetaView(APIView):
    """GET /api/pyq/meta/ — Available exam types, years, subjects, counts."""

    permission_classes = [AllowAny]

    # The question bank only changes when a new DB is deployed (which restarts the
    # process), so a per-process cache is safe and turns a 30s+ request into ~0ms.
    CACHE_SECONDS = 60 * 60

    def get(self, request):
        exam_filter = request.query_params.get("exam") or ""
        key = f"pyq-meta:{exam_filter}"
        data = cache.get(key)
        if data is None:
            data = self._build(exam_filter)
            cache.set(key, data, self.CACHE_SECONDS)
        return Response(data)

    @staticmethod
    def _build(exam_filter):
        qs = ExamQuestion.objects.all()

        # Group by exam_type with counts
        exams = list(
            qs.values("exam_type")
            .annotate(count=Count("id"))
            .order_by("exam_type")
        )

        # For a specific exam, return available years and subjects.
        # DISTINCT in SQL instead of pulling every row's year/subject into Python.
        scoped = qs.filter(exam_type=exam_filter) if exam_filter else qs
        years = list(scoped.order_by("-year").values_list("year", flat=True).distinct())
        subjects = list(scoped.order_by("subject").values_list("subject", flat=True).distinct())
        total = (
            next((e["count"] for e in exams if e["exam_type"] == exam_filter), 0)
            if exam_filter
            else sum(e["count"] for e in exams)
        )

        # Real previous-year questions (everything not AI-generated), so the UI can
        # offer "real PYQ only" and say honestly how many exist for this exam.
        real = scoped.exclude(source="ai_generated")
        real_questions = real.count()
        real_years = (
            list(real.order_by("-year").values_list("year", flat=True).distinct())
            if real_questions
            else []
        )

        return {
            "exams": exams,
            "years": years,
            "subjects": subjects,
            "total_questions": total,
            "real_questions": real_questions,
            "real_years": real_years,
        }
