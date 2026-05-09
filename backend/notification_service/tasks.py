import asyncio

from backend.notification_service.service import Notification, NotificationService
from backend.utils.celery_app import celery_app


@celery_app.task(name="notification.dispatch")
def dispatch_notification(payload: dict) -> dict:
    notification = Notification(**payload)
    asyncio.run(NotificationService().dispatch(notification))
    return notification.model_dump(mode="json")
