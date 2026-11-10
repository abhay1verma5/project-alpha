"""Generate daily current affairs + quiz using Gemini AI."""

import json
import os
from datetime import date, timedelta

from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Generate daily current affairs and GK quiz using Gemini AI"

    def add_arguments(self, parser):
        parser.add_argument("--date", help="Date in YYYY-MM-DD format (default: today)")
        parser.add_argument("--days", type=int, default=1, help="Generate for N days back")
        parser.add_argument("--force", action="store_true", help="Overwrite existing")

    def handle(self, *args, **options):
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            self.stderr.write("GEMINI_API_KEY not set")
            return

        from currentaffairs.models import DailyCurrentAffairs

        target_date = date.today()
        if options["date"]:
            target_date = date.fromisoformat(options["date"])

        days = options["days"]
        for i in range(days):
            d = target_date - timedelta(days=i)
            if not options["force"] and DailyCurrentAffairs.objects.filter(date=d).exists():
                self.stdout.write(f"  [SKIP] {d} already exists")
                continue

            self.stdout.write(f"  Generating current affairs for {d}...")
            data = self._generate(api_key, d)
            if data:
                DailyCurrentAffairs.objects.update_or_create(
                    date=d,
                    defaults={
                        "items": data.get("items", []),
                        "quiz": data.get("quiz", []),
                        "source": "ai_generated",
                    },
                )
                self.stdout.write(
                    f"  [OK] {d}: {len(data.get('items', []))} items, {len(data.get('quiz', []))} quiz Qs"
                )
            else:
                self.stderr.write(f"  [FAIL] {d}: no data")

    def _generate(self, api_key: str, target_date: date) -> dict | None:
        try:
            from google import genai

            client = genai.Client(api_key=api_key)
        except ImportError:
            return self._generate_rest(api_key, target_date)

        prompt = self._build_prompt(target_date)
        models = ["gemini-3.8-flash"]
        for model in models:
            try:
                response = client.models.generate_content(
                    model=model,
                    contents=prompt,
                )
                result = self._parse_response(response.text)
                if result:
                    return result
            except Exception as e:
                self.stderr.write(f"    Gemini SDK error ({model}): {e}")
                continue
        # Fallback to REST
        return self._generate_rest(api_key, target_date)

    def _generate_rest(self, api_key: str, target_date: date) -> dict | None:
        import requests
        import time

        prompt = self._build_prompt(target_date)
        models = ["gemini-3.8-flash"]

        for model in models:
            for attempt in range(2):
                try:
                    resp = requests.post(
                        f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}",
                        json={"contents": [{"parts": [{"text": prompt}]}]},
                        timeout=60,
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        text = data["candidates"][0]["content"]["parts"][0]["text"]
                        result = self._parse_response(text)
                        if result:
                            return result
                    elif resp.status_code == 404:
                        break  # Try next model
                    elif resp.status_code == 429:
                        time.sleep(5)
                        continue
                except Exception as e:
                    self.stderr.write(f"    REST error ({model}): {e}")
                    time.sleep(2)
        return None

    def _build_prompt(self, target_date: date) -> str:
        return f"""Generate current affairs for {target_date.strftime('%B %d, %Y')} relevant to Indian competitive exams (UPSC, SSC, Banking, Railway, State PSC).

Return ONLY valid JSON (no markdown):
{{
  "items": [
    {{
      "title": "Short headline (max 15 words)",
      "detail": "2-3 sentence explanation with key facts, names, dates",
      "category": "national|international|economy|science|sports|awards|defence|appointments|schemes"
    }}
  ],
  "quiz": [
    {{
      "question": "MCQ question based on current affairs",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct": 0,
      "explanation": "Brief explanation of correct answer"
    }}
  ]
}}

Generate exactly 15 current affairs items covering all categories.
Generate exactly 10 quiz questions based on those items.
Focus on facts relevant to Indian government exams.
Include government schemes, appointments, summits, awards, sports achievements, science/tech, international relations.
Use simple English suitable for exam preparation."""

    def _parse_response(self, text: str) -> dict | None:
        text = text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1] if "\n" in text else text[3:]
        if text.endswith("```"):
            text = text[:-3]
        text = text.strip()
        if text.startswith("json"):
            text = text[4:].strip()

        try:
            data = json.loads(text)
            if "items" in data and "quiz" in data:
                return data
        except json.JSONDecodeError as e:
            pass
        return None
