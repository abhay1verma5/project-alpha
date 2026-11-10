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
                "quiz": ca.quiz,
                "source": ca.source,
            })

        return Response({
            "count": len(data),
            "results": data,
        })


class DailyQuizView(APIView):
    """GET /api/daily-quiz/ — Today's GK quiz (10 questions)."""

    permission_classes = [AllowAny]

    def get(self, request):
        target_date = request.query_params.get("date", date.today().isoformat())
        try:
            ca = DailyCurrentAffairs.objects.get(date=target_date)
            return Response({
                "date": ca.date.isoformat(),
                "quiz": ca.quiz,
                "count": len(ca.quiz),
            })
        except DailyCurrentAffairs.DoesNotExist:
            return Response({
                "date": target_date,
                "quiz": [],
                "count": 0,
            })
