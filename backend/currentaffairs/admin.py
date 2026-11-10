from django.contrib import admin
from .models import DailyCurrentAffairs


@admin.register(DailyCurrentAffairs)
class DailyCurrentAffairsAdmin(admin.ModelAdmin):
    list_display = ["date", "source", "item_count", "quiz_count", "created_at"]
    list_filter = ["source"]
    ordering = ["-date"]

    def item_count(self, obj):
        return len(obj.items) if obj.items else 0

    def quiz_count(self, obj):
        return len(obj.quiz) if obj.quiz else 0
