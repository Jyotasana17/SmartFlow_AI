from typing import Any

from backend.ai_decision_engine.service import AIDecisionEngine
from backend.shared.event_bus import get_event_bus
from backend.shared.schemas import RealtimeEvent
from backend.signal_controller.service import SignalControlService
from backend.traffic_analysis.service import TrafficAnalysisEngine
from backend.vehicle_detection.service import VehicleDetectionService


class FrameProcessingPipeline:
    def __init__(self) -> None:
        self.detector = VehicleDetectionService()
        self.analyzer = TrafficAnalysisEngine()
        self.decision_engine = AIDecisionEngine()
        self.signal_controller = SignalControlService()

    async def process_frame(self, frame: Any | None, camera_id: str, junction_id: str):
        detection = await self.detector.detect(frame, camera_id=camera_id, junction_id=junction_id)
        analysis = self.analyzer.analyze(detection)
        await get_event_bus().publish(
            RealtimeEvent(event="traffic_update", payload=analysis.model_dump(mode="json"), room=f"junction:{junction_id}")
        )
        decision = await self.decision_engine.optimize(analysis)
        ack = await self.signal_controller.execute_plan(decision)
        return detection, analysis, decision, ack
