from fastapi import APIRouter, Response
from google.oauth2 import id_token
from google.auth.transport import requests
from Schemas.Users.createAccountGoogle import createAccountGoogleSchema
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser
import uuid
import os
from argon2 import PasswordHasher
ph = PasswordHasher()

router = APIRouter()
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
@router.post('/createAccount/googleAuth')
def googleLogin(data: createAccountGoogleSchema, responseCookie: Response):
    conn = None
    cursor = None

    try:
        
        credential = data.credential

        if not credential:
            return {"Status": False, "Error": "Token ausente"}

        google_data = id_token.verify_oauth2_token(
            credential,
            requests.Request(),
            GOOGLE_CLIENT_ID
        )

        email = google_data["email"]
        name = google_data["name"]
        if not email or not name:
            return {"Status": False, "Error": "Invalid Google data"}

        if not google_data.get("email_verified"):
            return {"Status": False, "Error": "Google email not verified"}
        picture = google_data.get("picture")
        conn, cursor = connect_database()

        cursor.execute(
            "SELECT id FROM users WHERE email = %s",
            (email,)
        )
        session_token = str(uuid.uuid4())
        user = cursor.fetchone()

        if not user:
            hashPassword = ph.hash(data.password)
            
            cursor.execute(
                """
                INSERT INTO users (name, email, password, session_token, image_url)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                (name, email, hashPassword  , session_token, picture)
            )
            user = cursor.fetchone()
        else:
            
            return {"Status": False, "Error": "User already registered"}

        if not user:
            raise Exception("Error creating user")

        

        conn.commit()
        responseCookie.set_cookie(
            key="user_session_token",
            value=session_token,
            httponly=True,
            max_age=60 * 60 * 24 * 14,
            samesite="none",
            secure=True,
            path="/"
        )

        return {"Status": True}

    except Exception as e:
        if conn:
            conn.rollback()
        return {"Status": False, "Error": str(e)}

    finally:
        release_database(conn, cursor, poolUser)