import django_filters

from .models import ExamQuestion


class ExamQuestionFilter(django_filters.FilterSet):
    exam = django_filters.CharFilter(field_name="exam_type", lookup_expr="exact")
    year = django_filters.NumberFilter(field_name="year")
    subject = django_filters.CharFilter(field_name="subject", lookup_expr="iexact")
    difficulty = django_filters.CharFilter(field_name="difficulty")
    source = django_filters.CharFilter(field_name="source")
    language = django_filters.CharFilter(field_name="language")
    chapter = django_filters.CharFilter(field_name="chapter", lookup_expr="icontains")

    class Meta:
        model = ExamQuestion
        fields = ["exam", "year", "subject", "difficulty", "source", "language", "chapter"]
