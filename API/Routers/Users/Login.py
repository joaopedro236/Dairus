from fastapi import APIRouter, Response
from Schemas.Users.loginSchema import loginSchema
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from Services.recapcha import verify_recaptcha

ph = PasswordHasher()
router = APIRouter()


@router.post("/login")
async def login(data: loginSchema, response: Response):
    conn = None
    cursor = None
    try:
        recaptcha_valid = await verify_recaptcha(
                    data.recaptcha_token,
                    "login"
                )
        
        if not recaptcha_valid:
            return {
                        "Status": False,
                        "Error": "Security check failed."
                    }
        conn, cursor = connect_database()
        cursor.execute(
            "select password, session_token from users where email = %s ", (data.email,)
        )
        result = cursor.fetchone()
        if not result:
            return {"Status": False, "Error": "This account does not exist"}
        try:
            ph.verify(result[0], data.password)
        except VerifyMismatchError:
            return {"Status": False, "Error": "Invalid password"}
        response.set_cookie(
            key="user_session_token",
            value=result[1],
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
