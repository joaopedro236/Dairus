from fastapi import APIRouter, Response
from Schemas.Users.loginSchema import loginSchema
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser
router = APIRouter()
@router.post('/login')
def login(data: loginSchema, response: Response):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        cursor.execute('select session_token from users where email = %s and password = %s', (data.email, data.password))
        result = cursor.fetchall()
        if not result:
            return {'Status': False, 'Error': 'This account does not exist'}
        response.set_cookie(
            key="user_session_token",
            value=result[0],
            httponly=True,
            max_age=60 * 60 * 24 * 7,
            samesite="lax",
            secure=True,
            path="/",
        )
        return {'Status': True}
    except Exception as e:
        return {'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor, poolUser)