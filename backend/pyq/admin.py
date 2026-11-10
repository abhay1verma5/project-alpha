from django.contrib import admin

from .models import ExamQuestion, PYQCrawlLog


@admin.register(ExamQuestion)
class ExamQuestionAdmin(admin.ModelAdmin):
    list_display = ["exam_type", "year", "subject", "difficulty", "source", "is_verified", "created_at"]
    list_filter = ["exam_type", "year", "subject", "difficulty", "source", "is_verified", "language"]
    search_fields = ["question_text", "chapter", "explanation"]
    list_editable = ["is_verified"]
    list_per_page = 50
    readonly_fields = ["question_text_hash", "created_at"]


@admin.register(PYQCrawlLog)
class PYQCrawlLogAdmin(admin.ModelAdmin):
    list_display = ["source", "status", "questions_found", "questions_new", "duration_seconds", "created_at"]
    list_filter = ["status", "source"]
    readonly_fields = ["created_at"]
