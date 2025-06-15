import sqlite3, json, os

conn = sqlite3.connect("database/momo.db")
cur = conn.cursor()
cur.execute("SELECT txid, amount, category, date, raw FROM transactions")
rows = cur.fetchall()
conn.close()

transactions = [
    {
        "id": txid,
        "amount": amount,
        "type": category,
        "date": date,
        "description": raw
    } for txid, amount, category, date, raw in rows
]

os.makedirs("frontend/data", exist_ok=True)
with open("frontend/data/transactions.json", "w") as f:
    json.dump(transactions, f, indent=4)

print("Exported to frontend/data/transactions.json")
import sqlite3, json, os

conn = sqlite3.connect("database/momo.db")
cur = conn.cursor()
cur.execute("SELECT txid, amount, category, date, raw FROM transactions")
rows = cur.fetchall()
conn.close()

transactions = [
    {
        "id": txid,
        "amount": amount,
        "type": category,
        "date": date,
        "description": raw
    } for txid, amount, category, date, raw in rows
]

os.makedirs("frontend/data", exist_ok=True)
with open("frontend/data/transactions.json", "w") as f:
    json.dump(transactions, f, indent=4)

print("Exported to frontend/data/transactions.json")
