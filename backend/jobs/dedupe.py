"""Find listings that are the same notification crawled from different aggregators.

Aggregators word the same notification differently ("UPESSC UP TGT Online Form 2026
(17,735 Posts)", "... for 17735 Post", "... – Extended"), so exact-slug dedupe makes one
page per wording. Two titles are the same listing when:

1. their dedupe keys are equal (filler words removed, organisation/exam/year/count kept), or
2. both are vacancies (job/notice), share the first key word, the year and the post count,
   and at least half of their key words.

Words that change meaning (result, admit, card, answer, key, revised, final, phase, mains,
prelims, correction...) are never filler, so a result never merges with its job form.
"""
import re

FILLER = frozenset(
    """online offline form forms apply application applications recruitment notification notice
    vacancy vacancies bharti bharati for of the and in to on at a an out released release new
    latest update updated date dates last extended extension reopen reopened re open corrigendum
    post posts posted various candidates total started start begin begins link available now
    check details advt advertisement no www com""".split()
)
VACANCY_TYPES = frozenset({"job", "notice"})
# Event words: titles must agree on these to match loosely (rule 2).
EVENT_WORDS = frozenset(
    """result admit card answer key revised final correction cutoff merit interview syllabus
    phase tier mains prelims preliminary skill test document verification dv""".split()
)
_YEAR = re.compile(r"20\d\d")
_COUNT = re.compile(r"\d{3,6}")


def _tokens(title):
    t = re.sub(r"(\d),(\d)", r"\1\2", (title or "").lower())
    t = re.sub(r"[^a-z0-9ऀ-ॿ]+", " ", t)
    return [w for w in t.split() if w not in FILLER]


def dedupe_key(title):
    """Normalised key, or None when the title is too generic to match safely."""
    toks = _tokens(title)
    if len(toks) < 3 or not any(_YEAR.fullmatch(w) for w in toks):
        return None
    return " ".join(toks)


def _count(toks):
    return next((w for w in toks if _COUNT.fullmatch(w) and not _YEAR.fullmatch(w)), None)


def same_listing(title_a, type_a, title_b, type_b):
    key_a, key_b = dedupe_key(title_a), dedupe_key(title_b)
    if not key_a or not key_b:
        return False
    if key_a == key_b:
        return True
    if type_a not in VACANCY_TYPES or type_b not in VACANCY_TYPES:
        return False
    ta, tb = key_a.split(), key_b.split()
    if ta[0] != tb[0]:
        return False
    count = _count(ta)
    if not count or count != _count(tb):
        return False
    if {w for w in ta if _YEAR.fullmatch(w)} != {w for w in tb if _YEAR.fullmatch(w)}:
        return False
    sa, sb = set(ta), set(tb)
    if sa & EVENT_WORDS != sb & EVENT_WORDS:
        return False
    return len(sa & sb) / len(sa | sb) >= 0.5


def find_match(title, content_type, candidates):
    """First candidate Job (iterable of objects with .title/.content_type) that is the same listing."""
    for job in candidates:
        if same_listing(title, content_type, job.title, job.content_type):
            return job
    return None


def completeness(job):
    """Higher = better page to keep when merging a group."""
    facts = ("organization", "last_date", "qualification", "salary", "age_limit", "vacancies",
             "description", "fee", "vacancy_details", "notification_pdf", "apply_link")
    clean_slug = not re.search(r"-(start|last-date|out|extended|date-extended)$", job.slug or "")
    return (job.content_type == "job", sum(bool(getattr(job, f, None)) for f in facts), clean_slug, -job.id)
