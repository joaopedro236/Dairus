from fastapi import APIRouter, Form, File, UploadFile, Request
from Database.Conn.release_database import release_database
from Database.Conn.users import connect_database, poolUser
from Services.imgbb import imgbbUpload
from argon2 import PasswordHasher

ph = PasswordHasher()

router = APIRouter()


@router.put("/editProfile")
async def edit_profile(
    request: Request,
    name: str | None = Form(None),
    description: str | None = Form(None),
    email: str | None = Form(None),
    password: str | None = Form(None),
    photo: UploadFile | None = File(None),
):
    conn = None

    try:
        session_token = request.cookies.get("user_session_token")

        if not session_token:
            return {"Status": False, "Error": "Session not found"}

        conn = connect_database(poolUser)
        cursor = conn.cursor()

        cursor.execute(
            "SELECT id FROM users WHERE session_token = %s", (session_token,)
        )

        user = cursor.fetchone()

        if not user:
            return {"Status": False, "Error": "User not found"}

        updates = {
            key: value
            for key, value in {
                "name": name,
                "description": description,
                "email": email,
                "password": ph.hash(password) if password else None,
            }.items()
            if value is not None
        }

        if photo and photo.filename:
            image = await photo.read()

            result = imgbbUpload(image, photo.filename, photo.content_type)

            if not result["Status"]:
                return {"Status": False, "Error": result["Error"]}

            updates["image_url"] = result["Url"]

        if not updates:
            return {"Status": False, "Error": "No changes provided"}

        columns = ", ".join(f'"{column}" = %s' for column in updates)

        values = [*updates.values(), user[0]]

        cursor.execute(f"UPDATE users SET {columns} WHERE id = %s", tuple(values))

        conn.commit()

        return {"Status": True, "Message": "Profile updated successfully"}

    except Exception as error:
        if conn:
            conn.rollback()

        print(f"Edit profile error: {error}")

        return {
            "Status": False,
            "Error": "An internal error occurred while updating the profile",
        }

    finally:
        if conn:
            release_database(conn, cursor, poolUser)
