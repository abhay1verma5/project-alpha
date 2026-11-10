from django.db.models import Count
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
        return queryset.order_by("?")[: _limit(self.request, default=50, maximum=1000)]


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
        return queryset.order_by("?")[: _limit(self.request, default=25, maximum=100)]


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

    def get(self, request):
        qs = ExamQuestion.objects.all()

        # Group by exam_type with counts
        exams = list(
            qs.values("exam_type")
            .annotate(count=Count("id"))
            .order_by("exam_type")
        )

        # For a specific exam, return available years and subjects
        exam_filter = request.query_params.get("exam")
        if exam_filter:
            filtered = qs.filter(exam_type=exam_filter)
            years = sorted(set(filtered.values_list("year", flat=True)), reverse=True)
            subjects = sorted(set(filtered.values_list("subject", flat=True)))
            total = filtered.count()
        else:
            years = sorted(set(qs.values_list("year", flat=True)), reverse=True)
            subjects = sorted(set(qs.values_list("subject", flat=True)))
            total = qs.count()

        return Response({
            "exams": exams,
            "years": years,
            "subjects": subjects,
            "total_questions": total,
        })
