from typing import Any

from fastapi import APIRouter, Depends

from backend.ai_decision_engine.service import AIDecisionEngine
from backend.shared.event_bus import get_event_bus
from backend.shared.schemas import APIEnvelope, DetectionResult, RealtimeEvent, Role
from backend.shared.security import require_roles
from backend.signal_controller.service import SignalControlService
from backend.traffic_analysis.service import TrafficAnalysisEngine
from backend.vehicle_detection.service import VehicleDetectionService

router = APIRouter()


@router.post("/detect", response_model=APIEnvelope)
async def detect(payload: dict[str, Any], _=Depends(require_roles([Role.admin, Role.operator]))):
    result = await VehicleDetectionService().detect(
        frame=None,
        camera_id=payload.get("camera_id", "camera-001"),
        junction_id=payload.get("junction_id", "j-01"),
    )
    return APIEnvelope(data=result.model_dump(mode="json"))


@router.post("/analyze", response_model=APIEnvelope)
async def analyze(detection: DetectionResult, _=Depends(require_roles([Role.admin, Role.operator, Role.analyst]))):
    result = TrafficAnalysisEngine().analyze(detection)
    await get_event_bus().publish(
        RealtimeEvent(event="traffic_update", payload=result.model_dump(mode="json"), room=f"junction:{result.junction_id}")
    )
    return APIEnvelope(data=result.model_dump(mode="json"))


@router.post("/optimize", response_model=APIEnvelope)
async def optimize(detection: DetectionResult, _=Depends(require_roles([Role.admin, Role.operator]))):
    analysis = TrafficAnalysisEngine().analyze(detection)
    decision = await AIDecisionEngine().optimize(analysis)
    ack = await SignalControlService().execute_plan(decision)
    return APIEnvelope(data={"analysis": analysis.model_dump(mode="json"), "decision": decision.model_dump(mode="json"), "ack": ack})


@router.post("/run-cycle", response_model=APIEnvelope)
async def run_cycle(payload: dict[str, Any], _=Depends(require_roles([Role.admin, Role.operator]))):
    detection = await VehicleDetectionService().detect(
        frame=None,
        camera_id=payload.get("camera_id", "camera-001"),
        junction_id=payload.get("junction_id", "j-01"),
    )
    analysis = TrafficAnalysisEngine().analyze(detection)
    await get_event_bus().publish(
        RealtimeEvent(event="traffic_update", payload=analysis.model_dump(mode="json"), room=f"junction:{analysis.junction_id}")
    )
    decision = await AIDecisionEngine().optimize(analysis)
    ack = await SignalControlService().execute_plan(decision)
    return APIEnvelope(
        data={
            "detection": detection.model_dump(mode="json"),
            "analysis": analysis.model_dump(mode="json"),
            "decision": decision.model_dump(mode="json"),
            "signal_ack": ack,
        }
    )
