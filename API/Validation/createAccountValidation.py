from Services.groq import groqResponse


def createAccountValidation(data, cursor):
    try:
        prompt = f"""Analyze the following name and determine whether it contains inappropriate, offensive, vulgar, hateful, or sexually explicit content. Return only "BLOCK" if inappropriate, or "SAFE" if acceptable.
        Name: {data.name}"""
        result = groqResponse(prompt)

        if not isinstance(result, dict) or "response" not in result:
            return {"Status": False, "Error": "Groq response invalid"}

        response = str(result["response"]).strip().upper()

        if "BLOCK" in response:
            return {"Status": False, "Error": "Name with inappropriate content"}

        if response != "SAFE":
            return {"Status": False, "Error": "Unable to validate name"}

        cursor.execute("select email from users where email =%s", (data.email,))
        emailExists = cursor.fetchall()
        if emailExists:
            return {"Status": False, "Error": "This email already exists"}
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
