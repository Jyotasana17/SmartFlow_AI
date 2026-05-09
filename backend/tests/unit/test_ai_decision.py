from backend.ai_decision_engine.rule_based import RuleBasedTimingPlanner
from backend.shared.schemas import LaneMetrics, LaneName, TrafficAnalysisResult


def test_rule_based_planner_prioritizes_highest_score():
    analysis = TrafficAnalysisResult(
        junction_id="j-01",
        lanes={
            LaneName.north: LaneMetrics(vehicle_count=90, weighted_count=90, queue_length_m=120, waiting_time_s=180, occupancy=0.9, congestion_score=94),
            LaneName.east: LaneMetrics(vehicle_count=20, weighted_count=20, queue_length_m=30, waiting_time_s=40, occupancy=0.2, congestion_score=35),
            LaneName.west: LaneMetrics(vehicle_count=30, weighted_count=30, queue_length_m=45, waiting_time_s=55, occupancy=0.4, congestion_score=52),
            LaneName.south: LaneMetrics(vehicle_count=12, weighted_count=12, queue_length_m=20, waiting_time_s=30, occupancy=0.1, congestion_score=25),
        },
    )
    decision = RuleBasedTimingPlanner().plan(analysis)
    assert decision.plan[LaneName.north].color == "GREEN"
    assert decision.plan[LaneName.north].duration_s >= 60
    assert decision.confidence > 0.9
