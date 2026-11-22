"""Single Gemini entry point for management commands.

gemini-2.5-flash is retired for new API keys and the gemini-3.x models are
served through the Interactions API, so every command goes through here instead
of calling generateContent directly.

A Free Tier key allows roughly 20 requests per day, so callers must be frugal:
one quiz a day is fine, bulk generation is not.
"""

import json
import logging
import os
import re
import time

import requests

logger = logging.getLogger(__name__)

INTERACTIONS_URL = "https://generativelanguage.googleapis.com/v1beta/interactions"
GENERATE_URL = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"

# Tried in this order: the first model that answers wins. Each model has its own
# free-tier quota (~20 req/day), so a model that returns 429 is skipped.
# Models the key's /v1beta/models listing serves (checked 2026-11-22).
MODELS = [
    # generateContent on these answers in ~1-2s with the current key (2026-11-22).
    "gemini-flash-lite-latest",
    "gemini-flash-latest",
    "gemini-2.5-flash",
    "gemini-3.5-flash",
    "gemini-3.7-flash",
    "gemini-3.8-flash",
]
# Web requests run under gunicorn's 30s worker timeout: stop trying models after this.
DEFAULT_DEADLINE = 20
_exhausted = {}  # model -> time it hit 429; retried after _EXHAUSTED_TTL seconds
_EXHAUSTED_TTL = 3600


def _is_exhausted(model):
    t = _exhausted.get(model)
    if t is None:
        return False
    if time.time() - t > _EXHAUSTED_TTL:
        _exhausted.pop(model, None)
        return False
    return True


def gemini_text(prompt, system=None, max_tokens=4096, retries=2, timeout=120, deadline=None):
    """Return the model's text for `prompt`, or None if every attempt failed.
    Tries the models in MODELS order, skipping any that are out of quota."""
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        logger.warning("GEMINI_API_KEY not set")
        return None

    headers = {"Content-Type": "application/json", "x-goog-api-key": api_key}
    started = time.time()

    for model in MODELS:
        if _is_exhausted(model):
            continue
        if deadline and time.time() - started > deadline:
            logger.warning("Gemini deadline (%ss) reached", deadline)
            return None

        # generateContent only: the Interactions API hung (no reply in 40s) on
        # 2026-11-22 and would blow gunicorn's 30s timeout.
        for api_style in ("generate",):
            if api_style == "interactions":
                url = INTERACTIONS_URL
                body = {
                    "model": model,
                    "input": prompt,
                    "store": False,
                    "generation_config": {"max_output_tokens": max_tokens, "thinking_level": "minimal"},
                }
                if system:
                    body["system_instruction"] = system
            else:
                url = GENERATE_URL.format(model=model) + f"?key={api_key}"
                headers_gc = {"Content-Type": "application/json"}
                body = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {"temperature": 0.7, "maxOutputTokens": max_tokens},
                }
                if system:
                    body["systemInstruction"] = {"parts": [{"text": system}]}

            for attempt in range(retries):
                req_timeout = timeout
                if deadline:
                    left = deadline - (time.time() - started)
                    if left <= 1:
                        return None
                    # One slow model must not eat the whole budget: cap each try at 8s.
                    req_timeout = min(timeout, left, 8)
                try:
                    h = headers if api_style == "interactions" else headers_gc
                    resp = requests.post(url, json=body, headers=h, timeout=req_timeout)
                except requests.RequestException as e:
                    logger.warning(f"Gemini request failed ({model}): {e}")
                    time.sleep(2)
                    continue

                if resp.status_code == 200:
                    if api_style == "interactions":
                        text = _extract_text(resp.json())
                    else:
                        text = _extract_generate_text(resp.json())
                    if text:
                        return text
                    break
                if resp.status_code == 429:
                    _exhausted[model] = time.time()
                    logger.info(f"Gemini quota exhausted for {model}, rotating...")
                    break
                if resp.status_code in (404, 500, 503):
                    # Seen as transient on 2026-11-22: the same request returned
                    # 404/503 and then 200 seconds later. Retry briefly, then move on.
                    time.sleep(1 + attempt)
                    continue
                logger.warning(f"Gemini HTTP {resp.status_code} ({model}): {resp.text[:200]}")
                break
            if _is_exhausted(model):
                break  # quota gone for this model today; move to the next model

    return None


def gemini_json(prompt, system=None, max_tokens=4096):
    """Like gemini_text but parses a JSON object/array, stripping code fences."""
    text = gemini_text(prompt, system=system, max_tokens=max_tokens)
    if not text:
        return None
    cleaned = re.sub(r"^```\w*\n?", "", text.strip())
    cleaned = re.sub(r"\n?```$", "", cleaned.strip())
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        # Fall back to the first [...] or {...} block in the reply.
        m = re.search(r"(\[.*\]|\{.*\})", cleaned, re.S)
        if not m:
            return None
        try:
            return json.loads(m.group(1))
        except json.JSONDecodeError:
            return None


def _extract_text(payload):
    """Extract text from Interactions API response."""
    parts = []
    for step in payload.get("steps", []):
        if step.get("type") != "model_output":
            continue
        for block in step.get("content", []):
            if block.get("type") == "text" and block.get("text"):
                parts.append(block["text"])
    return "".join(parts)


def _extract_generate_text(payload):
    """Extract text from generateContent API response."""
    # Answers can arrive split across several parts (one reply came back as just
    # "Nam" when only parts[0] was read); join every non-thought text part.
    try:
        parts = payload["candidates"][0]["content"]["parts"]
    except (KeyError, IndexError, TypeError):
        return ""
    return "".join(p.get("text", "") for p in parts if isinstance(p, dict) and not p.get("thought"))
