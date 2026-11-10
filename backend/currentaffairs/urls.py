from django.urls import path
from .views import CurrentAffairsListView, DailyQuizView

urlpatterns = [
    path("current-affairs/", CurrentAffairsListView.as_view()),
    path("daily-quiz/", DailyQuizView.as_view()),
]
