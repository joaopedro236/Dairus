from fastapi import APIRouter , Request
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser
router = APIRouter()
@router.get('/getUser')
def getUser(request: Request):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        session_token = request.cookies.get("user_session_token")
        if not session_token:
            return {'Status': False, 'Message': "Don't have an account"}
        cursor.execute('select name, description, image_url from users where session_token = %s', (session_token,))
        
        response = cursor.fetchone()
        if not response:
            return {'Status': False, 'Message': 'User not found'}
        return {'Status': True, 'name': response[0], 'description': response[1], 'image_url': response[2]}
    except Exception as e:
        return {'Status': False, 'Error': str(e)}
    finally:
        release_database(conn, cursor,poolUser)