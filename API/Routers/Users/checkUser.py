from fastapi import APIRouter, Request
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser

router = APIRouter()


@router.get("/checkUser")
def checkUser(request: Request):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        session_token = request.cookies.get("user_session_token")
        if not session_token:
            return {"Status": False, "Message": "Don't have an account"}
        cursor.execute(
            "select id from users where session_token = %s", (str(session_token),)
        )
        response = cursor.fetchone()
        if not response:
            return {"Status": False, "Message": "Don't have an account"}
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolUser)
