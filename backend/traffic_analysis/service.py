from backend.shared.schemas import DetectionResult, LaneMetrics, TrafficAnalysisResult, TrafficSeverity, VehicleCounts

WEIGHTS = {
    "cars": 1.0,
    "bikes": 0.45,
    "trucks": 2.2,
    "buses": 2.5,
    "ambulances": 4.0,
}


class TrafficAnalysisEngine:
    def analyze(self, detection: DetectionResult) -> TrafficAnalysisResult:
        lanes = {}
        highest_score = 0.0
        for lane, data in detection.lanes.items():
            weighted_count = self._weighted_count(data.counts)
            queue_length = min(180.0, weighted_count * 2.8 + data.occupancy * 55)
            waiting_time = min(300.0, queue_length * 1.15 + data.counts.total * 1.8)
            score = min(100.0, weighted_count + queue_length * 0.45 + waiting_time * 0.18)
            highest_score = max(highest_score, score)
            lanes[lane] = LaneMetrics(
                vehicle_count=data.counts.total,
                weighted_count=round(weighted_count, 2),
                queue_length_m=round(queue_length, 2),
                waiting_time_s=round(waiting_time, 2),
                occupancy=data.occupancy,
                congestion_score=round(score, 2),
            )
        return TrafficAnalysisResult(
            junction_id=detection.junction_id,
            lanes=lanes,
            severity=self._severity(highest_score),
        )

    @staticmethod
    def _weighted_count(counts: VehicleCounts) -> float:
        return (
            counts.cars * WEIGHTS["cars"]
            + counts.bikes * WEIGHTS["bikes"]
            + counts.trucks * WEIGHTS["trucks"]
            + counts.buses * WEIGHTS["buses"]
            + counts.ambulances * WEIGHTS["ambulances"]
        )

    @staticmethod
    def _severity(score: float) -> TrafficSeverity:
        if score >= 82:
            return TrafficSeverity.heavy
        if score >= 52:
            return TrafficSeverity.medium
        return TrafficSeverity.smooth
