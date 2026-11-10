from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("srkr-manage-x7k2/", admin.site.urls),
    # Legacy /api/ routes (backwards compatible)
    path("api/", include("jobs.urls")),
    path("api/", include("pyq.urls")),
    path("api/", include("currentaffairs.urls")),
    # Versioned /api/v1/ routes
    path("api/v1/", include("config.api_v1_urls")),
]
