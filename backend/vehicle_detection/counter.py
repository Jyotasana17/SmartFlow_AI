from collections import defaultdict

from backend.shared.schemas import BoundingBox, LaneName, VehicleCounts

VEHICLE_CLASS_MAP = {
    "car": "cars",
    "motorcycle": "bikes",
    "bike": "bikes",
    "truck": "trucks",
    "bus": "buses",
    "ambulance": "ambulances",
}


class VehicleCounter:
    def count_by_lane(self, boxes: list[BoundingBox]) -> dict[LaneName, VehicleCounts]:
        accumulator: dict[LaneName, dict[str, int]] = defaultdict(lambda: defaultdict(int))
        for box in boxes:
            field = VEHICLE_CLASS_MAP.get(box.class_name.lower())
            if field:
                accumulator[box.lane][field] += 1
        return {
            lane: VehicleCounts(**counts)
            for lane, counts in accumulator.items()
        }
