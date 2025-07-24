"""
from ollama import ChatResponse,chat

def intr():
    print("running")
    while True:
        quer = input("me: ")
        if quer.lower() == "exit":
            print("terminated")
            break
        resu = ans(quer)
        print("bot:", resu)
def ans(prompt):
    try:
        resu: ChatResponse = chat(
            model="doctorbuddy",
            messages=[{"role": "user", "content": prompt}],
        )
        return resu["message"]["content"]
    except Exception as e:
        return f"error: {e}"
intr()
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
from ollama import chat, ChatResponse

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests

def get_bot_response(prompt):
    try:
        res: ChatResponse = chat(
            model="doctorbuddy",
            messages=[{"role": "user", "content": prompt}],
        )
        return res['message']['content']
    except Exception as e:
        return f"Error: {e}"

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    data = request.get_json()
    if not data or 'message' not in data:
        return jsonify({'error': 'Message required'}), 400

    user_input = data['message']
    response = get_bot_response(user_input)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=5002)
