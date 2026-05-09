from fastapi import APIRouter

from backend.analytics_service.service import AnalyticsService
from backend.shared.dashboard_data import dashboard_snapshot
from backend.signal_controller.service import SignalControlService
from backend.shared.schemas import AIDecision, APIEnvelope

router = APIRouter()


@router.get("/dashboard")
async def dashboard():
    return dashboard_snapshot()


@router.get("/junctions")
async def junctions():
    return {"junctions": dashboard_snapshot()["junctions"], "routes": dashboard_snapshot()["routes"], "center": dashboard_snapshot()["center"]}


@router.get("/traffic-status")
async def traffic_status():
    snapshot = dashboard_snapshot()
    return {"junctions": snapshot["junctions"], "alerts": snapshot["alerts"]}


@router.get("/emergency-status")
async def emergency_status():
    return dashboard_snapshot()["emergency"]


@router.get("/analytics")
async def analytics():
    return (await AnalyticsService().city_kpis()).model_dump(mode="json")


@router.post("/signal-control")
async def signal_control(decision: AIDecision):
    ack = await SignalControlService().execute_plan(decision)
    return APIEnvelope(data=ack)
