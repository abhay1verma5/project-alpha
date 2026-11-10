from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="DailyCurrentAffairs",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("date", models.DateField(db_index=True, unique=True)),
                ("items", models.JSONField(help_text='[{"title":"...","detail":"...","category":"national/international/economy/science/sports/awards"}]')),
                ("quiz", models.JSONField(blank=True, default=list, help_text='[{"question":"...","options":["A","B","C","D"],"correct":0,"explanation":"..."}]')),
                ("source", models.CharField(default="ai_generated", max_length=20)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "verbose_name_plural": "Daily Current Affairs",
                "ordering": ["-date"],
            },
        ),
    ]
