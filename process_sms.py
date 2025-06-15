import xml.etree.ElementTree as ET
import sqlite3
import re

# Load and parse XML
tree = ET.parse('data/sms_data.xml')
root = tree.getroot()

# Connect to SQLite
conn = sqlite3.connect('database/momo.db')
cur = conn.cursor()
cur.execute(open('create_tables.sql').read())

# Extract and insert messages
for sms in root.findall('sms'):
    body = sms.find('body').text.strip()

    txid_match = re.search(r'TxId[:\s]*(\d+)', body)
    txid = txid_match.group(1) if txid_match else None

    amount_match = re.search(r'(\d{3,6}) RWF', body)
    amount = int(amount_match.group(1)) if amount_match else 0

    date_match = re.search(r'\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}', body)
    date = date_match.group(0) if date_match else "Unknown"

    category = "incoming" if "received" in body.lower() else \
               "payment" if "payment of" in body.lower() else "other"

    if txid:
        try:
            cur.execute("""
                INSERT INTO transactions (txid, amount, category, date, raw)
                VALUES (?, ?, ?, ?, ?)
            """, (txid, amount, category, date, body))
        except sqlite3.IntegrityError:
            pass  # Skip duplicates

conn.commit()
conn.close()
print("Processing complete.")
