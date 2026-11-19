from fastapi import APIRouter
router = APIRouter()
@router.get("/")
def router():
    return{"Status": True}