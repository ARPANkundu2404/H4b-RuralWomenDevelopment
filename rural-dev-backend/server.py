from flask import Flask, request, jsonify
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os
import json
import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS

# Email configuration
SMTP_CONFIG = {
    'server': os.getenv('SMTP_SERVER', 'smtp.gmail.com'),
    'port': int(os.getenv('SMTP_PORT', 587)),
    'email': os.getenv('EMAIL_ADDRESS'),
    'password': os.getenv('EMAIL_PASSWORD')
}

# File to store registrations
os.makedirs('data', exist_ok=True)
REGISTRATIONS_FILE = 'data/workshop_registrations.json'

def save_registration(data):
    """Save registration data to file"""
    try:
        registrations = []
        if os.path.exists(REGISTRATIONS_FILE):
            with open(REGISTRATIONS_FILE, 'r') as f:
                try:
                    registrations = json.load(f)
                except json.JSONDecodeError:
                    registrations = []
        
        new_reg = {
            **data,
            'date': datetime.datetime.now().isoformat(),
            'id': str(datetime.datetime.now().timestamp()),
            'status': 'registered'
        }
        registrations.append(new_reg)
        
        with open(REGISTRATIONS_FILE, 'w') as f:
            json.dump(registrations, f, indent=2)
            
        return new_reg
        
    except Exception as e:
        print(f"Error saving registration: {e}")
        raise

@app.route('/api/register', methods=['POST'])
def register_workshop():
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['name', 'email', 'workshop']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400
        
        # Save the registration
        saved_reg = save_registration(data)
        
        # Create email message
        msg = MIMEText(f"""
        New Workshop Registration:
        Name: {data['name']}
        Email: {data['email']}
        Workshop: {data['workshop']}
        
        Thank you for registering!
        """)
        
        msg['Subject'] = f"Workshop Registration: {data['workshop']}"
        msg['From'] = SMTP_CONFIG['email']
        msg['To'] = data['email']
        
        # Send confirmation copy to admin
        admin_msg = MIMEText(f"New registration: {json.dumps(data, indent=2)}")
        admin_msg['Subject'] = f"New Registration: {data['workshop']}"
        admin_msg['From'] = SMTP_CONFIG['email']
        admin_msg['To'] = SMTP_CONFIG['email']
        
        # Connect to SMTP server
        with smtplib.SMTP(SMTP_CONFIG['server'], SMTP_CONFIG['port']) as server:
            server.starttls()
            server.login(SMTP_CONFIG['email'], SMTP_CONFIG['password'])
            server.send_message(msg)
            server.send_message(admin_msg)
            
        return jsonify({
            'success': True,
            'message': 'Registration successful! Check your email.',
            'registration': saved_reg
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/registrations', methods=['GET'])
def get_registrations():
    try:
        if not os.path.exists(REGISTRATIONS_FILE):
            return jsonify([])
            
        with open(REGISTRATIONS_FILE, 'r') as f:
            try:
                registrations = json.load(f)
                if not isinstance(registrations, list):
                    registrations = []
            except json.JSONDecodeError:
                registrations = []
                
        return jsonify(registrations)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)