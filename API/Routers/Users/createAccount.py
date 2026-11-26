from fastapi import APIRouter, Response
from Schemas.Users.createAccount import createAccountSchema
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser
from Services.groq import groqResponse
from Validation.createAccountValidation import createAccountValidation
import uuid
from argon2 import PasswordHasher

router = APIRouter()
ph = PasswordHasher()


@router.post("/createAccount")
def createAccount(data: createAccountSchema, responseCookie: Response):
    conn = None
    cursor = None

    try:
        conn, cursor = connect_database()
        validation = createAccountValidation(data, cursor)
        if validation.get("Status") == False:
            return validation
        session_token = str(uuid.uuid4())
        hashPassword = ph.hash(data.password)
        cursor.execute(
            """
            INSERT INTO users(
     name, email, password, session_token) values(%s, %s,%s,%s)""",
            (data.name, data.email, hashPassword, session_token),
        )
        conn.commit()
        responseCookie.set_cookie(
            key="user_session_token",
            value=session_token,
            httponly=True,
            max_age=60 * 60 * 24 * 7,
            samesite="none",
            secure=True,
            path="/",
        )
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolUser)
