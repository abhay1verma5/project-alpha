import random

from django.db.models import Q
from datetime import date, timedelta
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import DailyCurrentAffairs


class CurrentAffairsListView(APIView):
    """GET /api/current-affairs/ — Latest current affairs (last 7 days)."""

    permission_classes = [AllowAny]

    def get(self, request):
        days = min(int(request.query_params.get("days", 7)), 30)
        target_date = request.query_params.get("date")

        if target_date:
            try:
                qs = DailyCurrentAffairs.objects.filter(date=target_date)
            except (ValueError, TypeError):
                qs = DailyCurrentAffairs.objects.none()
        else:
            since = date.today() - timedelta(days=days)
            qs = DailyCurrentAffairs.objects.filter(date__gte=since)

        data = []
        for ca in qs:
            data.append({
                "date": ca.date.isoformat(),
                "items": ca.items,
                # No AI quiz that day -> 10 real past-paper GK questions instead.
                "quiz": ca.quiz or _past_paper_gk_quiz(ca.date.isoformat()),
                "source": ca.source,
            })

        return Response({
            "count": len(data),
            "results": data,
        })


class DailyQuizView(APIView):
    """GET /api/daily-quiz/ — Today's GK quiz (10 questions).

    Uses the AI quiz generated from the day's current affairs when there is one.
    Otherwise (e.g. the Gemini key is missing/invalid, which left every day's
    quiz empty) it serves 10 real general-awareness questions from past papers,
    chosen by date so everyone gets the same quiz that day.
    """

    permission_classes = [AllowAny]

    def get(self, request):
        target_date = request.query_params.get("date", date.today().isoformat())
        ca = DailyCurrentAffairs.objects.filter(date=target_date).first()
        if ca and ca.quiz:
            return Response({"date": target_date, "quiz": ca.quiz, "count": len(ca.quiz), "kind": "current_affairs"})
        quiz = _past_paper_gk_quiz(target_date)
        return Response({"date": target_date, "quiz": quiz, "count": len(quiz), "kind": "past_papers"})


_GK_SUBJECT = (
    Q(subject__icontains="general")
    | Q(subject__icontains="history")
    | Q(subject__icontains="geography")
    | Q(subject__icontains="polity")
    | Q(subject__icontains="econom")
    | Q(subject__icontains="current")
    | Q(subject__icontains="environment")
    | Q(subject__icontains="science")
)


def _past_paper_gk_quiz(day: str, size: int = 10) -> list[dict]:
    """10 real GK questions (UPSC/SSC/RRB general awareness + General GK), seeded by date."""
    from pyq.models import ExamQuestion

    pool = (
        ExamQuestion.objects.exclude(source="ai_generated")
        .filter(
            (Q(exam_type__in=["upsc_prelims", "ssc_cgl", "rrb_group_d", "rrb_ntpc"]) & _GK_SUBJECT)
            | Q(exam_type="general_gk", subject="General Knowledge")
        )
        .exclude(question_text__contains="$")  # LaTeX renders badly in the quiz UI
        .exclude(subject__iregex=r"(intelligence|reasoning|math|quant|aptitude|english)")
    )
    ids = list(pool.order_by("id").values_list("id", flat=True))
    if not ids:
        return []
    rnd = random.Random(f"daily-quiz-{day}")
    chosen = rnd.sample(ids, min(size * 2, len(ids)))
    by_id = {q.id: q for q in ExamQuestion.objects.filter(id__in=chosen)}
    quiz = []
    for qid in chosen:
        q = by_id.get(qid)
        opts = q.options if q else None
        try:
            correct = int(q.correct_answer)
        except (TypeError, ValueError, AttributeError):
            continue
        if not isinstance(opts, list) or len(opts) < 2 or not 0 <= correct < len(opts):
            continue
        if len(q.question_text) > 400 or any("$" in str(o) for o in opts):
            continue
        label = q.get_exam_type_display() if hasattr(q, "get_exam_type_display") else q.exam_type
        quiz.append({
            "question": q.question_text,
            "options": [str(o) for o in opts],
            "correct": correct,
            "explanation": (q.explanation or "") + f" (Source: {label} {q.year} paper)",
        })
        if len(quiz) == size:
            break
    return quiz
