import requests
import json

url = 'https://script.google.com/macros/s/AKfycbyAPMoWxmG76gS0Y7aif1bsYQSWwXEUGitDyHJnfdyBF2QwvPP4YyQPb0uER83dliyb/exec'
payload = {
    "name": "Test User",
    "email": "test@example.com",
    "purpose": "Testing",
    "message": "This is a test message to debug the email functionality."
}

headers = {'Content-Type': 'text/plain'}

try:
    response = requests.post(url, data=json.dumps(payload), headers=headers, allow_redirects=True)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
