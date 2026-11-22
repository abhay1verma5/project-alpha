from django.urls import path

from . import views

urlpatterns = [
    path("career/", views.CareerView.as_view(), name="ai-career"),
    path("tool/", views.ToolView.as_view(), name="ai-tool"),
    path("search/", views.SearchView.as_view(), name="ai-search"),
    path("quiz/options/", views.QuizOptionsView.as_view(), name="ai-quiz-options"),
    path("quiz/", views.QuizView.as_view(), name="ai-quiz"),
    path("eligibility/", views.EligibilityView.as_view(), name="ai-eligibility"),
]
