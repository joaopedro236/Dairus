import requests
import os
from dotenv import load_dotenv
load_dotenv()
def testAPI():
    try:
        VITE_API_URL = os.environ.get("VITE_API_URL")
        response = requests.get(f"{VITE_API_URL}/", timeout=10)
        response.raise_for_status()
        result = response.json()
        return result
    except Exception as e:
        return {"Status": False, "Error": str(e)}
print(testAPI())