import xml.etree.ElementTree as ET
import os


def parse_xml(filepath):
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"File {filepath} not found.")

    tree = ET.parse(filepath)
    root = tree.getroot()

    messages = []
    for sms in root.findall("sms"):
        body = sms.find("body").text.strip()
        messages.append(body)

    return messages
