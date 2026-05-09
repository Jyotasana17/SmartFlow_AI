from datetime import datetime
from pydantic import BaseModel

from backend.shared.event_bus import EventBus, get_event_bus
from backend.shared.schemas import RealtimeEvent


class JunctionMessage(BaseModel):
    source_junction: str
    target_junction: str | None = None
    message_type: str
    payload: dict
    timestamp: datetime = datetime.utcnow()


class SwarmCommunicationService:
    def __init__(self, event_bus: EventBus | None = None) -> None:
        self.event_bus = event_bus or get_event_bus()
        self.state: dict[str, dict] = {}

    async def publish_congestion_alert(self, source_junction: str, payload: dict) -> JunctionMessage:
        message = JunctionMessage(
            source_junction=source_junction,
            message_type="congestion_propagation",
            payload=payload,
        )
        await self.event_bus.publish(
            RealtimeEvent(event="congestion_alert", payload=message.model_dump(mode="json"), room="city")
        )
        return message

    async def sync_state(self, junction_id: str, state: dict) -> dict:
        self.state[junction_id] = {"state": state, "updated_at": datetime.utcnow().isoformat()}
        await self.event_bus.publish(
            RealtimeEvent(event="junction_state_sync", payload={"junction_id": junction_id, "state": state}, room="city")
        )
        return self.state[junction_id]
