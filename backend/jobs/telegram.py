"""
Telegram Bot API helpers for SarkariAlert notifications.

Uses TELEGRAM_BOT_TOKEN and TELEGRAM_CHANNEL_ID from Django settings.
"""

import logging

import requests
from django.conf import settings

logger = logging.getLogger(__name__)

TELEGRAM_API_URL = "https://api.telegram.org/bot{token}/sendMessage"


def send_telegram_message(text: str, chat_id: str = None) -> dict | None:
    """
    Send a message via the Telegram Bot API.

    Args:
        text: The message text (supports Telegram HTML parse mode).
        chat_id: Target chat/channel ID. Falls back to
                 settings.TELEGRAM_CHANNEL_ID when not provided.

    Returns:
        The Telegram API response dict on success, or None on failure.
    """
    token = settings.TELEGRAM_BOT_TOKEN
    if not token:
        logger.error("TELEGRAM_BOT_TOKEN is not configured; skipping message.")
        return None

    chat_id = chat_id or settings.TELEGRAM_CHANNEL_ID
    if not chat_id:
        logger.error("No chat_id provided and TELEGRAM_CHANNEL_ID is not configured.")
        return None

    url = TELEGRAM_API_URL.format(token=token)
    payload = {
        "chat_id": chat_id,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    try:
        response = requests.post(url, json=payload, timeout=15)
        response.raise_for_status()
        data = response.json()
        if not data.get("ok"):
            logger.error("Telegram API returned ok=false: %s", data)
            return None
        return data
    except requests.RequestException as exc:
        logger.error("Failed to send Telegram message: %s", exc)
        return None


def notify_new_job(job) -> dict | None:
    """
    Format a Job instance into a human-friendly Telegram notification
    and send it to the configured channel.

    Args:
        job: A jobs.models.Job instance.

    Returns:
        The Telegram API response dict on success, or None on failure.
    """
    # Emoji mapping by content type
    type_icons = {
        "job": "\U0001f4cb",          # clipboard
        "result": "\U0001f4ca",        # bar chart
        "admit_card": "\U0001f3ab",    # ticket
        "answer_key": "\U0001f511",    # key
        "admission": "\U0001f393",     # graduation cap
        "syllabus": "\U0001f4d6",      # open book
    }
    icon = type_icons.get(job.content_type, "\U0001f4cb")
    content_label = job.get_content_type_display()

    lines = [
        f"{icon} <b>{_escape_html(job.title)}</b>",
        "",
        f"\U0001f3e2 <b>Org:</b> {_escape_html(job.organization or 'N/A')}",
        f"\U0001f4c1 <b>Type:</b> {content_label}",
    ]

    if job.category:
        lines.append(f"\U0001f3af <b>Category:</b> {job.get_category_display()}")
    if job.state:
        lines.append(f"\U0001f4cd <b>State:</b> {job.get_state_display()}")
    if job.vacancies:
        lines.append(f"\U0001f465 <b>Vacancies:</b> {job.vacancies:,}")
    if job.qualification:
        lines.append(f"\U0001f393 <b>Qualification:</b> {_escape_html(job.qualification)}")
    if job.salary:
        lines.append(f"\U0001f4b0 <b>Salary:</b> {_escape_html(job.salary)}")
    if job.last_date:
        lines.append(f"\U0001f4c5 <b>Last Date:</b> {job.last_date.strftime('%d %b %Y')}")
    if job.age_limit:
        lines.append(f"\U0001f9d1 <b>Age Limit:</b> {_escape_html(job.age_limit)}")

    # Links
    lines.append("")
    if job.apply_link:
        lines.append(f'\U0001f517 <a href="{job.apply_link}">Apply Online</a>')
    if job.notification_pdf:
        lines.append(f'\U0001f4c4 <a href="{job.notification_pdf}">Official Notification</a>')

    lines.append("")
    lines.append("#SarkariAlert #GovtJobs")

    text = "\n".join(lines)
    return send_telegram_message(text)


def _escape_html(text: str) -> str:
    """Escape special HTML characters for Telegram's HTML parse mode."""
    if not text:
        return ""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )
