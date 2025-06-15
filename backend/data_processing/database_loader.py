import sqlite3
import logging

def connect_db(path="database/momo_sms.db"):
    return sqlite3.connect(path)

def insert_transaction(cursor, txid, name, amount, category, date):
    try:
        cursor.execute("""
            INSERT INTO transactions (txid, name, amount, category, date)
            VALUES (?, ?, ?, ?, ?)
        """, (txid, name, amount, category, date))
    except sqlite3.IntegrityError:
        logging.warning(f"Duplicate txid ignored: {txid}")