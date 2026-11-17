import os

import requests
from dotenv import load_dotenv
from fastapi import APIRouter, File, UploadFile


load_dotenv()

router = APIRouter()
IMGBB_UPLOAD_URL = "https://api.imgbb.com/1/upload"
MAX_IMAGE_SIZE = 32 * 1024 * 1024


def imgbbUpload(image: bytes, filename: str, content_type: str):
    api_key =  os.environ.get("IMGBB_URL")
    if not api_key:
        return {"Status": False, "Error": "ImgBB API key not configured"}

    if not image:
        return {"Status": False, "Error": "Image is empty"}

    if len(image) > MAX_IMAGE_SIZE:
        return {"Status": False, "Error": "Image exceeds the 32 MB limit"}

    try:
        response = requests.post(
            IMGBB_UPLOAD_URL,
            params={"key": api_key},
            files={"image": (filename, image, content_type)},
            timeout=30,
        )
        response.raise_for_status()
        result = response.json()

        if not result.get("success"):
            error = result.get("error", {}).get("message", "ImgBB upload failed")
            return {"Status": False, "Error": error}

        data = result["data"]
        return {
            "Status": True,
            "Url": data["url"]
        }
    except requests.RequestException as error:
        return {"Status": False, "Error": f"ImgBB request failed: {error}"}
    except (KeyError, ValueError) as error:
        return {"Status": False, "Error": f"Invalid ImgBB response: {error}"}

