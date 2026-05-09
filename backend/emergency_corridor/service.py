from uuid import uuid4

from backend.emergency_corridor.route_engine import RouteEngine
from backend.shared.event_bus import EventBus, get_event_bus
from backend.shared.schemas import EmergencyCorridorRequest, EmergencyCorridorStatus, RealtimeEvent, SignalColor, SignalTiming


class EmergencyCoordinator:
    def __init__(self, event_bus: EventBus | None = None) -> None:
        self.routes = RouteEngine()
        self.event_bus = event_bus or get_event_bus()
        self.active_corridors: dict[str, EmergencyCorridorStatus] = {}

    async def activate(self, request: EmergencyCorridorRequest) -> EmergencyCorridorStatus:
        route = self.routes.shortest_path(request.source_junction, request.destination_junction)
        synchronized = {
            junction_id: SignalTiming(color=SignalColor.green, duration_s=max(45, 75 - index * 5))
            for index, junction_id in enumerate(route)
        }
        status = EmergencyCorridorStatus(
            corridor_id=f"corridor_{uuid4().hex[:10]}",
            corridor_status="ACTIVE",
            route=route,
            estimated_time_saved_mins=max(4, len(route) * 3),
            synchronized_signals=synchronized,
        )
        self.active_corridors[status.corridor_id] = status
        await self.event_bus.publish(
            RealtimeEvent(
                event="ambulance_detected",
                payload={"ambulance_id": request.ambulance_id, **status.model_dump(mode="json")},
                room="emergency",
            )
        )
        return status

    async def deactivate(self, corridor_id: str) -> EmergencyCorridorStatus | None:
        status = self.active_corridors.pop(corridor_id, None)
        if status:
            status.corridor_status = "COMPLETED"
            await self.event_bus.publish(
                RealtimeEvent(event="emergency_corridor_completed", payload=status.model_dump(mode="json"), room="emergency")
            )
        return status
