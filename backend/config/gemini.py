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

# Round-robin through models; each free-tier model has ~20 req/day separate quota.
# Only models the key's /v1beta/models listing actually returns (checked 2026-10-19).
MODELS = [
    "gemini-3.8-flash",
    "gemini-3.1-flash-lite",
    "gemini-3-flash-preview",
    "gemini-flash-lite-latest",
    "gemini-flash-latest",
]
_model_idx = 0
_exhausted = set()  # models that hit 429 today


def gemini_text(prompt, system=None, max_tokens=4096, retries=2, timeout=120):
    """Return the model's text for `prompt`, or None if every attempt failed.
    Cycles through all models to maximize free-tier throughput."""
    global _model_idx
    api_key = os.environ.get("GEMINI_API_KEY", "")
    if not api_key:
        logger.warning("GEMINI_API_KEY not set")
        return None

    headers = {"Content-Type": "application/json", "x-goog-api-key": api_key}

    for _ in range(len(MODELS)):
        model = MODELS[_model_idx % len(MODELS)]
        _model_idx = (_model_idx + 1) % len(MODELS)

        if model in _exhausted:
            continue

        # Try Interactions API first, fall back to generateContent
        for api_style in ("interactions", "generate"):
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

            for attempt in range(retries):
                try:
                    h = headers if api_style == "interactions" else headers_gc
                    resp = requests.post(url, json=body, headers=h, timeout=timeout)
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
                    _exhausted.add(model)
                    logger.info(f"Gemini quota exhausted for {model}, rotating...")
                    break
                if resp.status_code in (500, 503):
                    time.sleep(3 * (attempt + 1))
                    continue
                if resp.status_code == 404:
                    break  # this API style does not serve the model; try the other style
                logger.warning(f"Gemini HTTP {resp.status_code} ({model}): {resp.text[:200]}")
                break
            if model in _exhausted:
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
    try:
        return payload["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        return ""
