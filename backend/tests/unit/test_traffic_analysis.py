from backend.shared.schemas import DetectionResult, LaneDetection, LaneName, VehicleCounts
from backend.traffic_analysis.service import TrafficAnalysisEngine


def test_traffic_analysis_scores_heavy_lane():
    detection = DetectionResult(
        camera_id="cam-1",
        junction_id="j-01",
        lanes={
            LaneName.north: LaneDetection(counts=VehicleCounts(cars=80, bikes=30, trucks=8), occupancy=0.9),
            LaneName.east: LaneDetection(counts=VehicleCounts(cars=10), occupancy=0.2),
            LaneName.west: LaneDetection(counts=VehicleCounts(cars=12), occupancy=0.2),
            LaneName.south: LaneDetection(counts=VehicleCounts(cars=6), occupancy=0.1),
        },
    )
    result = TrafficAnalysisEngine().analyze(detection)
    assert result.lanes[LaneName.north].congestion_score > result.lanes[LaneName.east].congestion_score
    assert result.severity == "heavy"
