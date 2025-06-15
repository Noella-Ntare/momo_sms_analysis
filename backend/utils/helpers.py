import re

def extract_amount(message):
    match = re.search(r"(\d{3,6}) RWF", message)
    return int(match.group(1)) if match else 0

def extract_name(message):
    match = re.search(r"from ([A-Za-z ]+)|to ([A-Za-z ]+)", message)
    return match.group(1) if match else "Unknown"

def extract_txid(message):
    match = re.search(r"TxId:?\s*(\d+)", message)
    return match.group(1) if match else None