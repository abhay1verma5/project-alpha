import hashlib
from django.db import models


class DailyCurrentAffairs(models.Model):
    """One row per date — stores 10-15 current affairs items as JSON."""

    date = models.DateField(unique=True, db_index=True)
    items = models.JSONField(
        help_text='[{"title":"...","detail":"...","category":"national/international/economy/science/sports/awards"}]'
    )
    quiz = models.JSONField(
        default=list,
        blank=True,
        help_text='[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]',
    )
    source = models.CharField(max_length=20, default="ai_generated")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-date"]
        verbose_name_plural = "Daily Current Affairs"

    def __str__(self):
        return f"Current Affairs — {self.date}"
