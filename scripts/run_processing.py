from backend.data_processing.xml_parser import parse_xml
from backend.data_processing.data_cleaner import clean_message
from backend.data_processing.categorizer import categorize_message
from backend.data_processing.database_loader import connect_db, insert_transaction
from backend.utils.helpers import extract_amount, extract_name, extract_txid
from backend.utils.logger import setup_logger
import logging
from backend.config import settings

setup_logger()

messages = parse_xml(settings.XML_PATH)

conn = connect_db()
cursor = conn.cursor()

for message in messages:
    try:
        cleaned, date = clean_message(message)
        category = categorize_message(cleaned)
        amount = extract_amount(cleaned)
        name = extract_name(cleaned)
        txid = extract_txid(cleaned)

        if not txid:
            raise ValueError("No TxID found")

        insert_transaction(cursor, txid, name, amount, category, date)
        logging.info(f"Inserted: {txid} - {category} - {amount}")
    except Exception as e:
        with open(settings.IGNORED_FILE, 'a') as f:
            f.write(f"{message}\n")
        logging.error(f"Error processing message: {message[:50]}... - {str(e)}")

conn.commit()
conn.close()
print("Processing complete.")
