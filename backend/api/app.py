from flask import Flask
from .routes import api_bp

app = Flask(__name__)
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True)
# This file is the entry point for the Flask application.