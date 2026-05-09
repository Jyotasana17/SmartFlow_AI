from datetime import datetime
from random import Random
from typing import Any

from backend.shared.schemas import BoundingBox, DetectionResult, LaneDetection, LaneName, VehicleCounts
from backend.vehicle_detection.counter import VehicleCounter
from backend.vehicle_detection.model_loader import get_model_loader
from backend.vehicle_detection.tracker import ObjectTracker


class VehicleDetectionService:
    def __init__(self) -> None:
        self.model_loader = get_model_loader()
        self.tracker = ObjectTracker()
        self.counter = VehicleCounter()

    async def detect(self, frame: Any | None, camera_id: str, junction_id: str) -> DetectionResult:
        model = self.model_loader.load()
        boxes = self._mock_boxes(camera_id, junction_id) if model is None else self._run_yolo(model, frame)
        boxes = self.tracker.assign_tracking_ids(boxes)
        boxes = self.tracker.estimate_speed(boxes)
        counts = self.counter.count_by_lane(boxes)
        lanes: dict[LaneName, LaneDetection] = {}
        for lane in LaneName:
            lane_boxes = [box for box in boxes if box.lane == lane]
            lane_counts = counts.get(lane, VehicleCounts())
            occupancy = min(1.0, lane_counts.total / 85)
            lanes[lane] = LaneDetection(counts=lane_counts, occupancy=round(occupancy, 3), boxes=lane_boxes)
        return DetectionResult(camera_id=camera_id, junction_id=junction_id, timestamp=datetime.utcnow(), lanes=lanes)

    def _run_yolo(self, model: Any, frame: Any) -> list[BoundingBox]:
        results = model(frame, verbose=False)
        boxes: list[BoundingBox] = []
        for result in results:
            names = result.names
            for raw in result.boxes:
                class_name = names[int(raw.cls[0])]
                x1, y1, x2, y2 = [float(value) for value in raw.xyxy[0]]
                lane = self._infer_lane((x1 + x2) / 2)
                boxes.append(
                    BoundingBox(
                        x1=x1,
                        y1=y1,
                        x2=x2,
                        y2=y2,
                        confidence=float(raw.conf[0]),
                        class_name=class_name,
                        lane=lane,
                    )
                )
        return boxes

    def _mock_boxes(self, camera_id: str, junction_id: str) -> list[BoundingBox]:
        seed = f"{camera_id}:{junction_id}:{datetime.utcnow().minute}"
        rng = Random(seed)
        classes = ["car", "car", "car", "motorcycle", "truck", "bus", "ambulance"]
        boxes: list[BoundingBox] = []
        for lane in LaneName:
            amount = rng.randint(8, 32)
            for _ in range(amount):
                x1 = rng.uniform(0, 960)
                y1 = rng.uniform(80, 540)
                width = rng.uniform(32, 110)
                height = rng.uniform(24, 82)
                vehicle = rng.choice(classes)
                if vehicle == "ambulance" and rng.random() > 0.08:
                    vehicle = "car"
                boxes.append(
                    BoundingBox(
                        x1=x1,
                        y1=y1,
                        x2=x1 + width,
                        y2=y1 + height,
                        confidence=round(rng.uniform(0.72, 0.98), 3),
                        class_name=vehicle,
                        lane=lane,
                    )
                )
        return boxes

    @staticmethod
    def _infer_lane(center_x: float) -> LaneName:
        if center_x < 320:
            return LaneName.west
        if center_x < 640:
            return LaneName.north
        if center_x < 960:
            return LaneName.east
        return LaneName.south
