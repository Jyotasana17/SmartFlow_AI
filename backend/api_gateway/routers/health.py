from fastapi import APIRouter

from backend.shared.config import get_settings

router = APIRouter(tags=["Health"])


@router.get("/health")
async def health_check():
    settings = get_settings()
    return {
        "status": "healthy",
        "service": "smartflow-ai-backend",
        "environment": settings.env,
        "realtime": "socket.io",
    }
