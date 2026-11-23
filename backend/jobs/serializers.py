from rest_framework import serializers
from .models import Job


class JobListSerializer(serializers.ModelSerializer):
    days_left = serializers.SerializerMethodField()
    is_expired = serializers.BooleanField(read_only=True)
    is_official = serializers.BooleanField(read_only=True)
    source_host = serializers.CharField(read_only=True)

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "title_hi",
            "slug",
            "organization",
            "content_type",
            "category",
            "state",
            "vacancies",
            "last_date",
            "qualification",
            "salary",
            "is_featured",
            "posted_date",
            "days_left",
            "is_expired",
            "is_official",
            "source_host",
            "age_limit",
            "apply_link",
            "source_url",
            "fee",
        ]

    def get_days_left(self, obj):
        if not obj.last_date:
            return None
        from django.utils import timezone

        delta = obj.last_date - timezone.now().date()
        return max(delta.days, 0)


class JobDetailSerializer(serializers.ModelSerializer):
    days_left = serializers.SerializerMethodField()
    is_expired = serializers.BooleanField(read_only=True)
    is_official = serializers.BooleanField(read_only=True)
    source_host = serializers.CharField(read_only=True)
    replacement_slug = serializers.SerializerMethodField()

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "title_hi",
            "title_ta",
            "title_te",
            "title_bn",
            "title_mr",
            "title_gu",
            "title_kn",
            "title_ml",
            "title_pa",
            "title_or",
            "slug",
            "organization",
            "content_type",
            "category",
            "state",
            "vacancies",
            "last_date",
            "age_limit",
            "qualification",
            "salary",
            "apply_link",
            "notification_pdf",
            "source_url",
            "description",
            "fee",
            "vacancy_details",
            "is_active",
            "is_featured",
            "posted_date",
            "created_at",
            "days_left",
            "is_expired",
            "is_official",
            "source_host",
            "replacement_slug",
        ]

    def get_days_left(self, obj):
        if not obj.last_date:
            return None
        from django.utils import timezone

        delta = obj.last_date - timezone.now().date()
        return max(delta.days, 0)

    def get_replacement_slug(self, obj):
        """For a closed duplicate: the active page of the same notification (the site 301s to it)."""
        if obj.is_active:
            return None
        from .dedupe import dedupe_key, find_match

        if not dedupe_key(obj.title):
            return None
        candidates = (
            Job.objects.filter(is_active=True)
            .exclude(id=obj.id)
            .only("id", "slug", "title", "content_type")
        )
        match = find_match(obj.title, obj.content_type, candidates)
        return match.slug if match else None


class StatsSerializer(serializers.Serializer):
    total_jobs = serializers.IntegerField()
    total_vacancies = serializers.IntegerField()
    total_results = serializers.IntegerField()
    total_admit_cards = serializers.IntegerField()
    total_answer_keys = serializers.IntegerField()
    states_covered = serializers.IntegerField()
    categories = serializers.ListField()
