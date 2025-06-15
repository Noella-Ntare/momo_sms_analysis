from flask import Blueprint, jsonify
import sqlite3

api_bp = Blueprint('api', __name__)

@api_bp.route('/api/transactions')
def get_all():
    conn = sqlite3.connect('database/momo_sms.db')
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM transactions")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

