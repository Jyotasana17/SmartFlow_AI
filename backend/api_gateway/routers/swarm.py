from fastapi import APIRouter, Depends

from backend.shared.schemas import APIEnvelope, Role
from backend.shared.security import require_roles
from backend.swarm_communication.service import SwarmCommunicationService

router = APIRouter()


@router.post("/congestion-alert", response_model=APIEnvelope)
async def congestion_alert(payload: dict, _=Depends(require_roles([Role.admin, Role.operator]))):
    message = await SwarmCommunicationService().publish_congestion_alert(
        source_junction=payload.get("source_junction", "j-01"),
        payload=payload,
    )
    return APIEnvelope(data=message.model_dump(mode="json"))


@router.post("/sync-state/{junction_id}", response_model=APIEnvelope)
async def sync_state(junction_id: str, payload: dict, _=Depends(require_roles([Role.admin, Role.operator]))):
    return APIEnvelope(data=await SwarmCommunicationService().sync_state(junction_id, payload))
