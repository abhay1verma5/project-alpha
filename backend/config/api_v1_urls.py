"""
API v1 URL configuration.

Mirrors all existing /api/ endpoints under the /api/v1/ prefix
for explicit API versioning. The original /api/ routes remain
active for backwards compatibility.
"""

from django.urls import include, path

urlpatterns = [
    path("", include("jobs.urls")),
    path("", include(("pyq.urls", "pyq"), namespace="pyq_v1")),
    path("", include("currentaffairs.urls")),
]
