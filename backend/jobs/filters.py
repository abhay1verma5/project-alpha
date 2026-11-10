import django_filters
from .models import Job


class JobFilter(django_filters.FilterSet):
    category = django_filters.CharFilter(field_name="category")
    state = django_filters.CharFilter(field_name="state")
    content_type = django_filters.CharFilter(field_name="content_type")
    is_featured = django_filters.BooleanFilter(field_name="is_featured")
    last_date_gte = django_filters.DateFilter(field_name="last_date", lookup_expr="gte")
    last_date_lte = django_filters.DateFilter(field_name="last_date", lookup_expr="lte")
    posted_after = django_filters.DateFilter(
        field_name="posted_date", lookup_expr="gte"
    )
    qualification = django_filters.CharFilter(
        field_name="qualification", lookup_expr="icontains"
    )

    class Meta:
        model = Job
        fields = [
            "category",
            "state",
            "content_type",
            "is_featured",
        ]
