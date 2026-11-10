from django.contrib import admin
from .models import CrawlLog, Job, TelegramSubscriber


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = [
        "title",
        "organization",
        "category",
        "state",
        "vacancies",
        "last_date",
        "content_type",
        "is_active",
        "is_featured",
        "posted_date",
    ]
    list_filter = ["category", "state", "content_type", "is_active", "is_featured"]
    search_fields = ["title", "organization", "description"]
    prepopulated_fields = {"slug": ("title",)}
    list_editable = ["is_active", "is_featured"]
    date_hierarchy = "posted_date"
    list_per_page = 50


@admin.register(TelegramSubscriber)
class TelegramSubscriberAdmin(admin.ModelAdmin):
    list_display = ["chat_id", "username", "is_active", "created_at"]
    list_filter = ["is_active"]


@admin.register(CrawlLog)
class CrawlLogAdmin(admin.ModelAdmin):
    list_display = [
        "source",
        "status",
        "jobs_found",
        "jobs_new",
        "started_at",
        "duration_seconds",
    ]
    list_filter = ["status", "source"]
    readonly_fields = [
        "source",
        "status",
        "jobs_found",
        "jobs_new",
        "error_message",
        "started_at",
        "duration_seconds",
    ]
