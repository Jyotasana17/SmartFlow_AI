import socketio

from backend.shared.event_bus import EventBus, get_event_bus
from backend.shared.logging import get_logger
from backend.shared.schemas import RealtimeEvent

logger = get_logger(__name__)


class SocketManager:
    def __init__(self, event_bus: EventBus | None = None) -> None:
        self.sio = socketio.AsyncServer(async_mode="asgi", cors_allowed_origins="*")
        self.event_bus = event_bus or get_event_bus()
        self._registered = False
        self._register_handlers()

    def _register_handlers(self) -> None:
        @self.sio.event
        async def connect(sid, environ):
            logger.info("socket.connected", sid=sid)
            await self.sio.enter_room(sid, "city")

        @self.sio.event
        async def disconnect(sid):
            logger.info("socket.disconnected", sid=sid)

        @self.sio.event
        async def join(sid, data):
            room = data.get("room", "city")
            await self.sio.enter_room(sid, room)
            await self.sio.emit("joined", {"room": room}, to=sid)

    async def start(self) -> None:
        if self._registered:
            return
        for channel in [
            "traffic_update",
            "signal_changed",
            "ambulance_detected",
            "congestion_alert",
            "ai_decision_update",
            "emergency_corridor_completed",
        ]:
            await self.event_bus.subscribe(channel, self.broadcast)
        self._registered = True

    async def broadcast(self, event: RealtimeEvent) -> None:
        await self.sio.emit(event.event, event.payload, room=event.room)
        if event.room != "city":
            await self.sio.emit(event.event, event.payload, room="city")
