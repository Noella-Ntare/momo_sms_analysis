import sqlite3

def init_db(schema_path):
    with sqlite3.connect("database/momo_sms.db") as conn:
        with open(schema_path, "r") as schema:
            conn.executescript(schema.read())
