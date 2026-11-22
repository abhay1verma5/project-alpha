"""Pull the facts of a recruitment notice out of an aggregator detail page.

SarkariResult, SarkariExam and RojgarResult all lay a notice out the same way:
an "Important Dates" block, an "Application Fee" block, an "Age Limit" block,
a "Total Post" line and a table of links (Apply Online / Download Notification /
Official Website). This module reads those facts — never their prose — so the
site can show them in its own format and link to the official pages.

Every extractor returns None when it is not sure: a missing value is better
than a wrong last date or fee.
"""
import html as html_lib
import re
from datetime import date, datetime
from urllib.parse import urlparse

from bs4 import BeautifulSoup

MONTHS = {m: i for i, m in enumerate(
    ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"], 1)}

DATE_RE = re.compile(
    r"(\d{1,2})\s*[/.\-]\s*(\d{1,2})\s*[/.\-]\s*(20\d{2})"          # 25/11/2026, 25-11-2026
    r"|(\d{1,2})(?:st|nd|rd|th)?[\s\-]+([A-Za-z]{3,9})[\s\-,]+(20\d{2})"  # 27 September 2026, 02-December-2021
)

# Links that are never the official apply/notification page.
JUNK_HOSTS = ("play.google", "apps.apple", "t.me", "telegram", "whatsapp", "youtube", "youtu.be", "instagram",
              "tinyurl", "bit.ly", "goo.gl", "cutt.ly", "shorturl",
              "facebook", "twitter", "x.com", "linkedin", "sarkariresult", "sarkariexam",
              "rojgarresult", "freejobalert")


def _lines(raw_html):
    s = re.sub(r"(?is)<(script|style|noscript|header|footer|nav)\b.*?</\1>", " ", raw_html)
    s = re.sub(r"(?i)<br\s*/?>|</(p|li|tr|div|h\d|td|th|span)>", "\n", s)
    text = html_lib.unescape(re.sub(r"<[^>]+>", " ", s))
    return [re.sub(r"\s+", " ", ln).strip() for ln in text.split("\n") if ln.strip()]


def parse_date(text):
    """First date in text, or None. Handles 25/11/2026, 25-11-2026, 27 September 2026, 02-December-2021."""
    m = DATE_RE.search(text or "")
    if not m:
        return None
    try:
        if m.group(1):
            return date(int(m.group(3)), int(m.group(2)), int(m.group(1)))
        mon = MONTHS.get(m.group(5)[:3].lower())
        if not mon:
            return None
        return date(int(m.group(6)), mon, int(m.group(4)))
    except ValueError:
        return None


_APPLY_LAST = re.compile(
    r"last\s*date\s*(?:for|to|of)?\s*(?:apply(?:ing)?\s*online|online\s*apply|registration|apply|application|submission)"
    r"|(?:apply\s*online|online\s*apply|registration)\s*last\s*date"
    r"|closing\s*date",
    re.I,
)
_NOT_APPLY = re.compile(r"fee|payment|correction|edit|admit|exam\s*date|result|print", re.I)


def last_date(lines):
    """The application last date (not the fee-payment or correction date)."""
    for i, ln in enumerate(lines):
        if _APPLY_LAST.search(ln) and not re.search(r"fee|payment|correction", ln, re.I):
            d = parse_date(ln) or (parse_date(lines[i + 1]) if i + 1 < len(lines) else None)
            if d:
                return d
    # Plain "Last Date : 25/11/2026" (or the date on the next line), skipping fee/correction ones.
    for i, ln in enumerate(lines):
        if re.match(r"^last\s*date\b", ln, re.I) and not _NOT_APPLY.search(ln):
            d = parse_date(ln) or (parse_date(lines[i + 1]) if i + 1 < len(lines) else None)
            if d:
                return d
    return None


_FEE_HEAD = re.compile(r"^application\s*fees?\b", re.I)
_FEE_ROW = re.compile(
    r"^(?P<cat>[A-Za-z /,()&.\-]{2,60}?)\s*[:\-–]\s*(?:rs\.?|₹|inr)?\s*(?P<amt>\d[\d,]*|nil|free|exempted|zero)\s*/?-?",
    re.I,
)
_CAT_WORDS = re.compile(r"general|gen|ur|obc|ews|sc|st|ph|pwd|pwbd|female|women|all\s*candidates|ex[- ]?s", re.I)


def fee(lines):
    """{'General / OBC / EWS': '₹850', 'SC / ST': '₹175'} from the Application Fee block."""
    out = {}
    for i, ln in enumerate(lines):
        if not _FEE_HEAD.search(ln):
            continue
        window = lines[i + 1:i + 12]
        j = 0
        while j < len(window):
            row = window[j]
            # "General / OBC / EWS" on one line, "Rs. 500/-" on the next (RojgarResult)
            if _CAT_WORDS.search(row) and j + 1 < len(window) and re.match(r"^(rs\.?|₹)\s*\d", window[j + 1], re.I):
                row = f"{row} : {window[j + 1]}"
                j += 1
            m = _FEE_ROW.match(row)
            if m and _CAT_WORDS.search(m.group("cat")):
                amt = m.group("amt").replace(",", "")
                out[m.group("cat").strip(" :-–")] = "Free" if not amt.isdigit() or int(amt) == 0 else f"₹{int(amt)}"
            elif out and re.search(r"(age\s*limit|important\s*date|vacancy|eligib|payment\s*mode|pay\s*the)", row, re.I):
                break
            j += 1
        if out:
            return out
    return None


def age_limit(lines):
    """'18–40 years (as on 01/07/2026)' or 'Office Assistant: 18-28 years; Officer Scale-I: 18-30 years'."""
    as_on = None
    for ln in lines:
        m = re.search(r"age\s*limit\s*(?:as\s*on|on)\s*[:\-]?\s*(.+)$", ln, re.I)
        if m and parse_date(m.group(1)):
            as_on = parse_date(m.group(1)).strftime("%d/%m/%Y")
            break
    mn = mx = None
    for ln in lines:
        a = re.search(r"minimum\s*age\s*[:\-–]?\s*(\d{2})\s*years?", ln, re.I)
        b = re.search(r"maximum\s*age\s*[:\-–]?\s*(\d{2})\s*years?", ln, re.I)
        mn = mn or (a and int(a.group(1)))
        mx = mx or (b and int(b.group(1)))
    suffix = f" (as on {as_on})" if as_on else ""
    if mn and mx and 14 <= mn < mx <= 70:
        return f"{mn}–{mx} years{suffix}"
    if mx and 14 <= mx <= 70:
        return f"Maximum {mx} years{suffix}"
    posts = []
    for ln in lines:
        m = re.match(r"^for\s+(.{3,60}?)\s*[:\-–]\s*(\d{2})\s*[-–to ]+\s*(\d{2})\s*years?", ln, re.I)
        if m and 14 <= int(m.group(2)) < int(m.group(3)) <= 70:
            posts.append(f"{m.group(1).strip()}: {m.group(2)}–{m.group(3)} years")
    if posts:
        return ("; ".join(posts[:3]) + suffix)[:200]
    return None


def vacancies(lines):
    for i, ln in enumerate(lines):
        m = re.search(r"total\s*(?:no\.?\s*of\s*)?(?:posts?|vacanc(?:y|ies))?\s*[:\-–]?\s*(\d[\d,]{0,6})\s*(?:posts?|vacanc)", ln, re.I)
        if not m and re.match(r"^total\s*(posts?|vacanc(y|ies))$", ln, re.I) and i + 1 < len(lines):
            m = re.match(r"^(\d[\d,]{0,6})\s*(?:posts?)?$", lines[i + 1], re.I)
        if m:
            n = int(m.group(1).replace(",", ""))
            if 0 < n < 500000:
                return n
    return None


_QUAL = re.compile(
    r"\b(graduat\w*|degree|bachelor|master|post\s*graduat\w*|b\.?\s?tech|diploma|iti|10th|12th|10\+2|matric\w*|"
    r"intermediate|high\s*school|class\s*(?:10|12)|mbbs|b\.?\s?sc|m\.?\s?sc|llb|b\.?\s?ed|phd|post\s*graduation)\b",
    re.I,
)
# A real requirement reads like one ("passed 10th", "degree in any stream", "with 50% marks"),
# unlike post names such as "Trained Graduate Teacher" or headings like "... Recruitment 2026 – Overview".
_QUAL_CONTEXT = re.compile(r"pass|degree|from|with|equivalent|recogni[sz]ed|marks|in any|subject|stream|board|university", re.I)


def qualification(lines):
    for i, ln in enumerate(lines):
        if re.search(r"\b(eligibility|educational\s*qualification)\b", ln, re.I):
            for cand in lines[i + 1:i + 14]:
                if 15 <= len(cand) <= 400 and _QUAL.search(cand) and _QUAL_CONTEXT.search(cand) and not re.search(
                        r"official notification|carefully|before apply|sarkari|click here|download|overview|"
                        r"available on notification|recruitment 20\d\d", cand, re.I):
                    return cand[:300]
    return None


def links(raw_html, own_host):
    """apply_link / notification_pdf / official_website from the link table."""
    soup = BeautifulSoup(raw_html, "lxml")
    found = {}

    def ok(href):
        if not href or not href.startswith("http"):
            return False
        host = urlparse(href).netloc.lower()
        return host and own_host not in host and not any(j in host for j in JUNK_HOSTS)

    def label_for(a):
        row = a.find_parent("tr")
        if row:
            return row.get_text(" ", strip=True).lower()
        prev = a.find_previous(string=True)
        return f"{prev or ''} {a.get_text(' ', strip=True)}".lower()

    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if not ok(href):
            continue
        label = label_for(a)
        if "apply_link" not in found and re.search(r"apply\s*online|registration|online\s*form|apply\s*now", label):
            found["apply_link"] = href
        elif "notification_pdf" not in found and re.search(r"notification|advertisement|advt|official\s*pdf", label):
            found["notification_pdf"] = href
        elif "official_website" not in found and "official website" in label:
            found["official_website"] = href
    # RojgarResult prints the official site as text: "Official Website ‖ https://rrb.indianrailways.gov.in/"
    if "official_website" not in found:
        lines = _lines(raw_html)
        for i, ln in enumerate(lines):
            if ln.lower().startswith("official website") and i + 1 < len(lines) and ok(lines[i + 1].split()[0]):
                found["official_website"] = lines[i + 1].split()[0]
                break
    return found


def extract_job_facts(raw_html, page_url=""):
    """All facts we can be sure of; keys are omitted when unknown."""
    if not raw_html:
        return {}
    own = urlparse(page_url).netloc.lower().replace("www.", "")
    own = own.split(".")[0] if own else "sarkari"
    lines = _lines(raw_html)
    facts = {
        "last_date": last_date(lines),
        "fee": fee(lines),
        "age_limit": age_limit(lines),
        "vacancies": vacancies(lines),
        "qualification": qualification(lines),
    }
    lk = links(raw_html, own)
    facts["apply_link"] = lk.get("apply_link") or lk.get("official_website")
    facts["notification_pdf"] = lk.get("notification_pdf")
    return {k: v for k, v in facts.items() if v}
