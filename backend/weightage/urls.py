from django.urls import path

from . import views

urlpatterns = [
    path("topic-weightage/", views.topic_weightage_list_view, name="topic-weightage-list"),
    path(
        "topic-weightage/<slug:slug>/",
        views.topic_weightage_detail_view,
        name="topic-weightage-detail",
    ),
]
