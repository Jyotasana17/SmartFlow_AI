from enum import StrEnum

from pydantic import BaseModel

from backend.shared.event_bus import get_event_bus
from backend.shared.schemas import RealtimeEvent


class NotificationSeverity(StrEnum):
    critical = "critical"
    warning = "warning"
    info = "info"


class Notification(BaseModel):
    title: str
    detail: str
    severity: NotificationSeverity
    channels: list[str] = ["dashboard"]


class NotificationService:
    async def dispatch(self, notification: Notification) -> Notification:
        await get_event_bus().publish(
            RealtimeEvent(event="notification", payload=notification.model_dump(mode="json"), room="city")
        )
        return notification
