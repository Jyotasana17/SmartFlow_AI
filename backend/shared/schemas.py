from datetime import datetime
from enum import StrEnum
from typing import Any

from pydantic import BaseModel, Field


class Role(StrEnum):
    admin = "admin"
    operator = "operator"
    analyst = "analyst"
    emergency = "emergency"


class SignalColor(StrEnum):
    red = "RED"
    yellow = "YELLOW"
    green = "GREEN"


class TrafficSeverity(StrEnum):
    smooth = "smooth"
    medium = "medium"
    heavy = "heavy"
    emergency = "emergency"


class LaneName(StrEnum):
    north = "north"
    east = "east"
    west = "west"
    south = "south"


class VehicleCounts(BaseModel):
    cars: int = 0
    bikes: int = 0
    trucks: int = 0
    buses: int = 0
    ambulances: int = 0

    @property
    def total(self) -> int:
        return self.cars + self.bikes + self.trucks + self.buses + self.ambulances


class BoundingBox(BaseModel):
    x1: float
    y1: float
    x2: float
    y2: float
    confidence: float
    class_name: str
    tracking_id: str | None = None
    speed_kmph: float | None = None
    lane: LaneName = LaneName.north


class LaneDetection(BaseModel):
    counts: VehicleCounts
    occupancy: float = Field(ge=0, le=1)
    boxes: list[BoundingBox] = Field(default_factory=list)


class DetectionResult(BaseModel):
    camera_id: str
    junction_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    lanes: dict[LaneName, LaneDetection]
    model_version: str = "mock-yolov8n"


class LaneMetrics(BaseModel):
    vehicle_count: int
    weighted_count: float
    queue_length_m: float
    waiting_time_s: float
    occupancy: float
    congestion_score: float


class TrafficAnalysisResult(BaseModel):
    junction_id: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    lanes: dict[LaneName, LaneMetrics]
    severity: TrafficSeverity


class SignalTiming(BaseModel):
    color: SignalColor
    duration_s: int = Field(ge=5, le=180)


class AIDecision(BaseModel):
    junction_id: str
    plan: dict[LaneName, SignalTiming]
    confidence: float = Field(ge=0, le=1)
    reason: str
    reasoning_steps: list[str]
    mode: str = "rule_based"
    metadata: dict[str, Any] = Field(default_factory=dict)


class EmergencyCorridorRequest(BaseModel):
    ambulance_id: str
    source_junction: str
    destination_junction: str
    priority: int = Field(default=10, ge=1, le=10)


class EmergencyCorridorStatus(BaseModel):
    corridor_id: str
    corridor_status: str
    route: list[str]
    estimated_time_saved_mins: int
    synchronized_signals: dict[str, SignalTiming]


class RealtimeEvent(BaseModel):
    event: str
    payload: dict[str, Any]
    room: str = "city"
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class APIEnvelope(BaseModel):
    status: str = "ok"
    data: Any
