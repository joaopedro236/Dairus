from fastapi import Request
from fastapi.responses import JSONResponse
from Database.Conn.users import connect_database, poolUser
from Database.Conn.release_database import release_database

PUBLIC_ROUTES = {
    ("GET", "/checkUser"),
    ("POST", "/createAccount"),
    ("POST", "/createAccount/googleAuth"),
    ("POST", "/login"),
    ("GET", "/"),
}


async def AuthMiddleware(request: Request, call_next):
    if request.method == "OPTIONS":
        return await call_next(request)

    path = request.url.path.rstrip("/") or "/"
    if path in {"/docs", "/redoc", "/openapi.json"}:
        return JSONResponse(status_code=404, content={"detail": "Not Found"})
    if (request.method, path) in PUBLIC_ROUTES:
        return await call_next(request)

    token = request.cookies.get("user_session_token")
    if not token:
        return JSONResponse(
            status_code=401, content={"Status": False, "Message": "Unauthorized"}
        )

    conn = None
    cursor = None

    try:
        conn, cursor = connect_database()
        cursor.execute("SELECT id FROM users WHERE session_token = %s", (str(token),))
        user = cursor.fetchone()
    finally:
        release_database(conn, cursor, poolUser)

    if not token or not user:
        return JSONResponse(
            status_code=401, content={"Status": False, "Message": "Unauthorized"}
        )

    return await call_next(request)
