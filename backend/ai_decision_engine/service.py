from backend.ai_decision_engine.rule_based import RuleBasedTimingPlanner
from backend.shared.event_bus import EventBus, get_event_bus
from backend.shared.schemas import AIDecision, RealtimeEvent, TrafficAnalysisResult


class AIDecisionEngine:
    def __init__(self, event_bus: EventBus | None = None) -> None:
        self.rule_based = RuleBasedTimingPlanner()
        self.event_bus = event_bus or get_event_bus()

    async def optimize(self, analysis: TrafficAnalysisResult, mode: str = "rule_based") -> AIDecision:
        decision = self.rule_based.plan(analysis)
        decision.mode = mode
        await self.event_bus.publish(
            RealtimeEvent(
                event="ai_decision_update",
                payload=decision.model_dump(mode="json"),
                room=f"junction:{decision.junction_id}",
            )
        )
        return decision
