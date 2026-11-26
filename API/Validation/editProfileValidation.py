from Services.groq import groqResponse
from Validation.createAccountValidation import validateWithJSON
def editProfileValidation(name, description):
    try:
        
        name = str(name).strip() if name is not None else ""
        description = str(description).strip() if description is not None else ""
        if not validateWithJSON(name or "") or not validateWithJSON(description or ""):
            return {"Status": False, "Error": "Inappropriate content"}
        prompt = f"""Analyze the following name, description and determine whether it contains inappropriate, offensive, vulgar, hateful, or sexually explicit content. Return only "BLOCK" if inappropriate, or "SAFE" if acceptable.
                Name: {name},
                Description: {description}"""
        try:
            result = groqResponse(prompt)
            if not isinstance(result, dict) or "response" not in result:
                raise ValueError("Groq response invalid")
            
            response = str(result["response"]).strip().upper()
            
            if response == "BLOCK":
                return {"Status": False, "Error": "Name or description with inappropriate content"}
            
            if response != "SAFE":
                raise ValueError("Unable to validate name or description")
        except Exception:
            pass
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}