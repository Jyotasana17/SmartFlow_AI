from celery import Celery

from backend.shared.config import get_settings

settings = get_settings()

celery_app = Celery(
    "smartflow_ai",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["backend.notification_service.tasks"],
)
