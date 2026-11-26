from fastapi import APIRouter, Request
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser

router = APIRouter()


@router.get("/getUser")
def getUser(request: Request):
    conn = None
    connPosts = None
    cursor = None
    cursorPosts = None
    try:
        conn, cursor = connect_database()
        session_token = request.cookies.get("user_session_token")
        if not session_token:
            return {"Status": False, "Message": "Don't have an account"}
        cursor.execute(
            """
    SELECT
        u.name,
        u.description,
        u.image_url,
        u.followers_quantity,
        u.following_quantity,
        u.posts_quantity,
        p.title,
        p.description,
        p.image_url
    FROM users u
    LEFT JOIN "Posts" p
        ON u.session_token = p.session_token
    WHERE u.session_token = %s
    """,
            (session_token,),
        )
        response = cursor.fetchall()
        if not response:
            return {"Status": False, "Message": "User not found"}
        posts = [
            {"title": row[6], "description": row[7], "image_url": row[8]}
            for row in response
            if row[6] is not None
        ]
        return {
            "Status": True,
            "name": response[0],
            "description": response[1],
            "image_url": response[2],
            "followersQuantity": response[3],
            "followingQuantity": response[4],
            "postsQuantity": response[5],
            "posts": posts,
        }
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolUser)
