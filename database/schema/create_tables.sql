CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    txid TEXT UNIQUE,
    name TEXT,
    amount INTEGER,
    category TEXT,
    date TEXT
);
