from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/check', methods=['POST'])
def check_account():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    login_url = 'https://www.crunchyroll.com/login'
    payload = {
        'email': email,
        'password': password,
    }

    with requests.Session() as session:
        response = session.post(login_url, data=payload)

        if "Your email or password was incorrect" in response.text:
            return jsonify({'valid': False})
        else:
            return jsonify({'valid': True})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
