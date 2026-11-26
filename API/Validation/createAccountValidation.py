from Services.groq import groqResponse

import json
import re
import unicodedata
from pathlib import Path


def loadOffensiveWords():
    filePath = Path(__file__).resolve().parent / "offensiveWords.json"

    with open(filePath, "r", encoding="utf-8") as file:
        words = json.load(file)

    return [
        word
        for languageWords in words.values()
        for word in languageWords
    ]


def validateWithJSON(name):
    normalizedName = unicodedata.normalize("NFKD", name.casefold())
    normalizedName = "".join(
        c for c in normalizedName
        if not unicodedata.combining(c)
    )

    for word in loadOffensiveWords():
        normalizedWord = unicodedata.normalize("NFKD", word.casefold())
        normalizedWord = "".join(
            c for c in normalizedWord
            if not unicodedata.combining(c)
        )

        pattern = r"(?<!\w)" + re.escape(normalizedWord).replace(r"\ ", r"\s+") + r"(?!\w)"

        if re.search(pattern, normalizedName):
            return False

    return True
def createAccountValidation(data, cursor):
    try:
        prompt = f"""Analyze the following name and determine whether it contains inappropriate, offensive, vulgar, hateful, or sexually explicit content. Return only "BLOCK" if inappropriate, or "SAFE" if acceptable.
        Name: {data.name}"""
        try:
            result = groqResponse(prompt)

            if not isinstance(result, dict) or "response" not in result:
                raise ValueError("Groq response invalid")

            response = str(result["response"]).strip().upper()

            if response == "BLOCK":
                return {"Status": False, "Error": "Name with inappropriate content"}

            if response != "SAFE":
                raise ValueError("Unable to validate name")

        except Exception:
            if not validateWithJSON(data.name):
                return {"Status": False, "Error": "Name with inappropriate content"}
        cursor.execute("select email from users where email =%s", (data.email,))
        emailExists = cursor.fetchall()
        if emailExists:
            return {"Status": False, "Error": "This email already exists"}
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
