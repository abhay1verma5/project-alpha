from django.urls import path

from . import views

app_name = "pyq"

urlpatterns = [
    path("pyq/", views.PYQListView.as_view(), name="list"),
    path("pyq/mock/", views.PYQMockView.as_view(), name="mock"),
    path("pyq/check/", views.PYQCheckView.as_view(), name="check"),
    path("pyq/meta/", views.PYQMetaView.as_view(), name="meta"),
]
