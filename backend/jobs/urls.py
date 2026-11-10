from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.JobListView.as_view(), name="job-list"),
    path("jobs/<slug:slug>/", views.JobDetailView.as_view(), name="job-detail"),
    path("results/", views.ResultListView.as_view(), name="result-list"),
    path("admit-cards/", views.AdmitCardListView.as_view(), name="admit-card-list"),
    path("answer-keys/", views.AnswerKeyListView.as_view(), name="answer-key-list"),
    path("admissions/", views.AdmissionListView.as_view(), name="admission-list"),
    path("syllabus/", views.SyllabusListView.as_view(), name="syllabus-list"),
    path("featured/", views.FeaturedJobsView.as_view(), name="featured-jobs"),
    path(
        "category/<str:category>/",
        views.CategoryJobsView.as_view(),
        name="category-jobs",
    ),
    path("state/<str:state>/", views.StateJobsView.as_view(), name="state-jobs"),
    path("news/", views.NewsListView.as_view(), name="news-feed"),
    path("stats/", views.stats_view, name="stats"),
    path("search/", views.search_view, name="search"),
    path("sitemap-slugs/", views.sitemap_slugs_view, name="sitemap-slugs"),
    path("health/", views.health_view, name="health"),
    path("exam-timeline/", views.exam_timeline_view, name="exam-timeline"),
    path("telegram/webhook/<str:secret>/", views.telegram_webhook_view, name="telegram-webhook"),
]
