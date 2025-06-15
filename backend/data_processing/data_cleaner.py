import re
from datetime import datetime


def normalize_amount(text):
    return int(re.sub(r"[^0-9]", "", text))


def extract_date(text):
    match = re.search(r"(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})", text)
    return match.group(1) if match else None


def clean_message(text):
    cleaned = text.strip()
    date = extract_date(cleaned)
    return cleaned, date

