from backend.shared.schemas import AIDecision, LaneName, SignalColor, SignalTiming, TrafficAnalysisResult


class RuleBasedTimingPlanner:
    def plan(self, analysis: TrafficAnalysisResult) -> AIDecision:
        ordered = sorted(analysis.lanes.items(), key=lambda item: item[1].congestion_score, reverse=True)
        plan: dict[LaneName, SignalTiming] = {}
        reasoning_steps: list[str] = []

        for lane, metrics in ordered:
            if metrics.congestion_score > 80:
                duration = 60
                color = SignalColor.green if lane == ordered[0][0] else SignalColor.red
                reasoning_steps.append(f"{lane.value.title()} lane score {metrics.congestion_score} exceeded critical threshold.")
            elif metrics.congestion_score > 50:
                duration = 35
                color = SignalColor.yellow if lane != ordered[0][0] else SignalColor.green
                reasoning_steps.append(f"{lane.value.title()} lane has moderate pressure and receives adaptive timing.")
            else:
                duration = 20
                color = SignalColor.red
                reasoning_steps.append(f"{lane.value.title()} lane remains within safe queue limits.")
            plan[lane] = SignalTiming(color=color, duration_s=duration)

        priority_lane, priority_metrics = ordered[0]
        plan[priority_lane] = SignalTiming(color=SignalColor.green, duration_s=max(plan[priority_lane].duration_s, 45))
        confidence = min(0.98, 0.72 + priority_metrics.congestion_score / 400)
        return AIDecision(
            junction_id=analysis.junction_id,
            plan=plan,
            confidence=round(confidence, 3),
            reason=f"{priority_lane.value.title()} lane prioritized due to congestion score {priority_metrics.congestion_score}.",
            reasoning_steps=reasoning_steps,
            metadata={"rl_ready": True, "policy": "max_pressure_rule_v1"},
        )
