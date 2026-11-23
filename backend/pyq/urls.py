from django.urls import path

from . import views

app_name = "pyq"

urlpatterns = [
    path("pyq/", views.PYQListView.as_view(), name="list"),
    path("pyq/mock/", views.PYQMockView.as_view(), name="mock"),
    path("pyq/check/", views.PYQCheckView.as_view(), name="check"),
    path("pyq/meta/", views.PYQMetaView.as_view(), name="meta"),
    path("pyq/papers/", views.PYQPapersView.as_view(), name="papers"),
    path("pyq/paper/", views.PYQPaperView.as_view(), name="paper"),
    path("pyq/paper-index/", views.PYQPaperIndexView.as_view(), name="paper-index"),
]
