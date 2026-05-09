from fastapi import APIRouter, Depends

from backend.analytics_service.service import AnalyticsService
from backend.shared.schemas import APIEnvelope, Role
from backend.shared.security import require_roles

router = APIRouter()


@router.get("/kpis", response_model=APIEnvelope)
async def kpis(_=Depends(require_roles([Role.admin, Role.operator, Role.analyst]))):
    return APIEnvelope(data=(await AnalyticsService().city_kpis()).model_dump(mode="json"))


@router.get("/trends", response_model=APIEnvelope)
async def trends(_=Depends(require_roles([Role.admin, Role.operator, Role.analyst]))):
    return APIEnvelope(data=await AnalyticsService().trend_report())
