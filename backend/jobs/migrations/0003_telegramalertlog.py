# Generated manually for TelegramAlertLog model

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("jobs", "0002_job_fee_job_vacancy_details_alter_job_category_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="TelegramAlertLog",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("sent_at", models.DateTimeField(auto_now_add=True)),
                (
                    "job",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="telegram_alert",
                        to="jobs.job",
                    ),
                ),
            ],
            options={
                "ordering": ["-sent_at"],
            },
        ),
    ]
