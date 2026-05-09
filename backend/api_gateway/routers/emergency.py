from fastapi import APIRouter, Depends, HTTPException

from backend.emergency_corridor.service import EmergencyCoordinator
from backend.shared.schemas import APIEnvelope, EmergencyCorridorRequest, Role
from backend.shared.security import require_roles

router = APIRouter()
coordinator = EmergencyCoordinator()


@router.post("/activate", response_model=APIEnvelope)
async def activate_corridor(payload: EmergencyCorridorRequest, _=Depends(require_roles([Role.admin, Role.emergency, Role.operator]))):
    status = await coordinator.activate(payload)
    return APIEnvelope(data=status.model_dump(mode="json"))


@router.post("/{corridor_id}/complete", response_model=APIEnvelope)
async def complete_corridor(corridor_id: str, _=Depends(require_roles([Role.admin, Role.emergency]))):
    status = await coordinator.deactivate(corridor_id)
    if not status:
        raise HTTPException(status_code=404, detail="Corridor not found")
    return APIEnvelope(data=status.model_dump(mode="json"))
