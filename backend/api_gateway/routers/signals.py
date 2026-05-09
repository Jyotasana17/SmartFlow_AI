from fastapi import APIRouter, Depends

from backend.shared.schemas import AIDecision, APIEnvelope, Role
from backend.shared.security import require_roles
from backend.signal_controller.service import SignalControlService

router = APIRouter()


@router.post("/execute", response_model=APIEnvelope)
async def execute_signal_plan(decision: AIDecision, _=Depends(require_roles([Role.admin, Role.operator]))):
    ack = await SignalControlService().execute_plan(decision)
    return APIEnvelope(data=ack)
