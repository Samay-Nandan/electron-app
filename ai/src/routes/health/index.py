from fastapi import APIRouter

router = APIRouter()


@router.get("/status")
def get_status():
    return {"service": "ai-engine", "status": "ready"}
