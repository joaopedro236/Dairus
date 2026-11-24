import requests


def testAPI():
    try:
        VITE_API_URL = "https://dairus.onrender.com"
        response = requests.get(f"{VITE_API_URL}/", timeout=10)
        response.raise_for_status()
        result = response.json()
        return result
    except Exception as e:
        return {"Status": False, "Error": str(e)}


print(testAPI())
