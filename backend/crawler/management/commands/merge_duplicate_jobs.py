"""Merge active listings that are the same notification from different aggregators.

Keeps the most complete page in each group, copies facts it lacks from the others
(later last date wins, since a duplicate is often the "Date Extended" post), and
deactivates the rest. Deactivated duplicates redirect to the kept page (see
JobDetailSerializer.get_replacement_slug), so no link breaks.
"""
from django.core.management.base import BaseCommand
from django.db import transaction

from jobs.dedupe import completeness, same_listing
from jobs.models import Job

COPY_FIELDS = ("organization", "qualification", "salary", "age_limit", "vacancies", "description",
               "fee", "vacancy_details", "notification_pdf", "apply_link")


def group_duplicates(jobs):
    groups = []
    for job in jobs:
        for group in groups:
            if same_listing(job.title, job.content_type, group[0].title, group[0].content_type):
                group.append(job)
                break
        else:
            groups.append([job])
    return [g for g in groups if len(g) > 1]


def merge_group(group):
    keep = max(group, key=completeness)
    changed = set()
    for dup in group:
        if dup is keep:
            continue
        for f in COPY_FIELDS:
            if getattr(dup, f) and not getattr(keep, f):
                setattr(keep, f, getattr(dup, f))
                changed.add(f)
        if dup.last_date and (not keep.last_date or dup.last_date > keep.last_date):
            keep.last_date = dup.last_date
            changed.add("last_date")
    with transaction.atomic():
        if changed:
            keep.save(update_fields=sorted(changed) + ["updated_at"])
        Job.objects.filter(id__in=[d.id for d in group if d is not keep]).update(is_active=False)
    return keep


class Command(BaseCommand):
    help = "Merge duplicate active listings (same notification, different aggregator wording)."

    def add_arguments(self, parser):
        parser.add_argument("--dry-run", action="store_true")

    def handle(self, *args, **opts):
        jobs = list(Job.objects.filter(is_active=True).order_by("id"))
        groups = group_duplicates(jobs)
        merged = 0
        for group in groups:
            keep = max(group, key=completeness)
            others = [j.slug for j in group if j is not keep]
            self.stdout.write(f"  keep {keep.slug} <- {', '.join(others)}")
            if not opts["dry_run"]:
                merge_group(group)
            merged += len(others)
        self.stdout.write(self.style.SUCCESS(f"Merged duplicates: {len(groups)} groups, {merged} pages"))
