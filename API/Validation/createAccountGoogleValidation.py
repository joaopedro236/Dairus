def createAccountGoogleValidation(google_data,email, name):
    try:
        
        if not email or not name:
                    return {"Status": False, "Error": "Invalid Google data"}
        
        if not google_data.get("email_verified"):
                    return {"Status": False, "Error": "Google email not verified"}
        return {"Status": True}
    except Exception as e:
        return {'Status': False, 'Error': str(e)}