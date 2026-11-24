from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def routerTest():
    return {"Status": True}
