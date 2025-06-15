def categorize_message(message):
    categories = {
        "incoming": ["received", "from"],
        "payment": ["payment of", "has been completed"],
        "airtime": ["Airtime", "airtime"],
        "withdrawal": ["withdrawn", "via agent"],
        "bundle": ["internet bundle", "voice bundle"],
        "deposit": ["bank deposit", "deposited"],
    }
    for label, keywords in categories.items():
        if all(word.lower() in message.lower() for word in keywords):
            return label
    return "unknown"