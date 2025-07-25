from flask import Flask, request, jsonify
import pytesseract
from PIL import Image
import io
import re
from flask_cors import CORS

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = Flask(__name__)
CORS(app)

def extract_expiry(text):
    # Match formats like 12/2026, EXP 12-2026, APR.2025, NOV.2025, etc.
    matches = re.findall(r'\b(?:EXP[\s:]|Expiry Date[:\s])?(\d{2}[\/\-]\d{4}|[A-Z]{3,4}\.?\s?\d{4})\b', text, re.IGNORECASE)
    return matches[-1] if matches else None  # get the LAST match, which is usually expiry


def extract_name(text):
    lines = text.strip().split('\n')
    for line in lines:
        if line.strip() and not line.lower().startswith('exp'):
            return line.strip()
    return "Unknown"

@app.route('/extract', methods=['POST'])
def extract_info():
    
    file = request.files['image']
    print("Received image:", file.filename)
    image = Image.open(io.BytesIO(file.read()))
    text = pytesseract.image_to_string(image)

    response = {
        'name': extract_name(text),
        'expiryDate': extract_expiry(text),
        'rawText': text
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(port=5001)