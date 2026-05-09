from uuid import uuid4

from backend.shared.schemas import BoundingBox


class ObjectTracker:
    def assign_tracking_ids(self, boxes: list[BoundingBox]) -> list[BoundingBox]:
        for box in boxes:
            box.tracking_id = box.tracking_id or f"trk_{uuid4().hex[:10]}"
        return boxes

    def estimate_speed(self, boxes: list[BoundingBox], fps: float = 15.0) -> list[BoundingBox]:
        for index, box in enumerate(boxes):
            box.speed_kmph = round(18 + ((box.x2 - box.x1) * fps / 40) + index * 1.7, 1)
        return boxes
