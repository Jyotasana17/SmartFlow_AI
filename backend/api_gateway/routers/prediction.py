from fastapi import APIRouter, Depends

from backend.prediction_service.service import PredictionRequest, TrafficPredictionService
from backend.shared.schemas import APIEnvelope, Role
from backend.shared.security import require_roles

router = APIRouter()


@router.post("/forecast", response_model=APIEnvelope)
async def forecast(payload: PredictionRequest, _=Depends(require_roles([Role.admin, Role.operator, Role.analyst]))):
    return APIEnvelope(data=TrafficPredictionService().forecast(payload).model_dump(mode="json"))
