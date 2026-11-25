from fastapi import APIRouter, File, Form, Form, File, UploadFile, UploadFile

from Services.imgbb import imgbbUpload
from Database.Conn.posts import connect_database,release_database,pollPost
router =APIRouter()
@router.post("/createPost")
def create_post(title: str = Form(...),
    description: str = Form(...),
    image: UploadFile = File(None)):
    conn, cursor = connect_database()
    try:
        image_url = None
        if image:
            image_data = image.file.read()
            upload_result = imgbbUpload(image_data, "post_image", "image/jpeg")
            if upload_result["Status"]:
                image_url = upload_result["Url"]
            else:
                return {"Status": False, "error": upload_result["Error"]}

        cursor.execute(
            """INSERT INTO "Posts" (title, description, image_url) VALUES (%s, %s, %s)""",
            (title, description, image_url),
        )
        conn.commit()
        return {"Status": True}
    except Exception as e:
        conn.rollback()
        return {"Status": False, "error": str(e)}
    finally:
        release_database(conn, cursor, pollPost)