from backend.shared.event_bus import EventBus, get_event_bus
from backend.shared.schemas import AIDecision, RealtimeEvent, SignalColor, SignalTiming


class SafetyValidator:
    def validate(self, decision: AIDecision) -> None:
        green_lanes = [lane for lane, timing in decision.plan.items() if timing.color == SignalColor.green]
        if not green_lanes:
            raise ValueError("Signal plan must contain at least one green lane")
        if len(green_lanes) > 2:
            raise ValueError("Signal plan has too many simultaneous green movements")
        for timing in decision.plan.values():
            if timing.duration_s < 5:
                raise ValueError("Signal timing below minimum safety duration")


class HardwareAdapter:
    async def apply(self, junction_id: str, plan: dict[str, SignalTiming]) -> dict[str, str]:
        return {"junction_id": junction_id, "hardware": "simulated", "status": "ACK"}


class SignalControlService:
    def __init__(self, event_bus: EventBus | None = None) -> None:
        self.validator = SafetyValidator()
        self.hardware = HardwareAdapter()
        self.event_bus = event_bus or get_event_bus()

    async def execute_plan(self, decision: AIDecision) -> dict[str, str]:
        self.validator.validate(decision)
        ack = await self.hardware.apply(
            decision.junction_id,
            {lane.value: timing for lane, timing in decision.plan.items()},
        )
        await self.event_bus.publish(
            RealtimeEvent(
                event="signal_changed",
                payload={"junction_id": decision.junction_id, "plan": decision.model_dump(mode="json"), "ack": ack},
                room=f"junction:{decision.junction_id}",
            )
        )
        return ack
