from fastapi import APIRouter, File, Form, Form, File, UploadFile, UploadFile, Request

from Services.imgbb import imgbbUpload
from Database.Conn.posts import connect_database, poolPost
from Database.Conn.release_database import release_database

router = APIRouter()


@router.post("/createPost")
def create_post(
    request: Request,
    title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None),
):
    conn, cursor = connect_database()
    session_token = request.cookies.get("user_session_token")
    try:
        image_url = None
        if image and image.filename:
            image_data = image.file.read()
            upload_result = imgbbUpload(image_data, "post_image", "image/jpeg")
            if upload_result["Status"]:
                image_url = upload_result["Url"]
            else:
                return {"Status": False, "error": upload_result["Error"]}

        cursor.execute(
            """WITH post AS (
    INSERT INTO "Posts" (
        title,
        description,
        image_url,
        session_token
    )
    VALUES (%s, %s, %s, %s)
    ON CONFLICT (session_token)
    DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        image_url = EXCLUDED.image_url
    RETURNING session_token
)
UPDATE "Users"
SET posts_quantity = COALESCE(posts_quantity, 0) + 1
WHERE session_token = (SELECT session_token FROM post);""",
            (title, description, image_url, session_token),
        )
        conn.commit()
        return {"Status": True}
    except Exception as e:
        conn.rollback()
        return {"Status": False, "error": str(e)}
    finally:
        release_database(conn, cursor, poolPost)
