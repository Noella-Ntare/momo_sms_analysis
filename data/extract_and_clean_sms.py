import xml.etree.ElementTree as ET
import json
from datetime import datetime

def parse_sms(xml_file):
    tree = ET.parse(xml_file)
    root = tree.getroot()
    transactions = []

    for sms in root.findall('sms'):
        body = sms.attrib.get('body', '')
        date_ms = int(sms.attrib.get('date', '0'))
        date = datetime.fromtimestamp(date_ms / 1000).isoformat()
        
        tx = {
            'id': str(abs(hash(body + str(date_ms))))[:8],
            'date': date,
            'description': body,
            'type': 'other',
            'amount': 0,
            'fee': 0
        }

        body_lower = body.lower()

        # Heuristic classification
        if 'received' in body_lower:
            tx['type'] = 'incoming'
        elif 'paid' in body_lower or 'payment' in body_lower:
            tx['type'] = 'payment'
        elif 'withdrawn' in body_lower:
            tx['type'] = 'withdrawal'
        elif 'airtime' in body_lower:
            tx['type'] = 'airtime'
        elif 'bundle' in body_lower:
            tx['type'] = 'bundle'
        elif 'bank' in body_lower:
            tx['type'] = 'bank_transfer'

        # Extract amount
        import re
        amount_match = re.search(r'(\d{3,})\s*rwf', body_lower)
        if amount_match:
            tx['amount'] = int(amount_match.group(1))
            if 'paid' in body_lower or 'withdrawn' in body_lower:
                tx['amount'] = -tx['amount']

        transactions.append(tx)

    return transactions

if __name__ == "__main__":
    input_file = 'sms_data.xml'
    output_file = 'transactions.json'

    data = parse_sms(input_file)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2)

    print(f"✅ {len(data)} transactions saved to {output_file}")
# This script extracts and cleans SMS data from an XML file, classifies transactions, and saves them to a JSON file.