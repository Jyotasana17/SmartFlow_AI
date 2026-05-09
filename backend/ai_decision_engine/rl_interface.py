from typing import Protocol

from backend.shared.schemas import AIDecision, TrafficAnalysisResult


class ReinforcementLearningPolicy(Protocol):
    async def optimize(self, state: TrafficAnalysisResult) -> AIDecision:
        """RL-ready extension point for DQN/PPO/SAC policies."""
        ...


class RLPolicyNotTrained:
    async def optimize(self, state: TrafficAnalysisResult) -> AIDecision:
        raise NotImplementedError("RL policy slot is ready, but no trained model has been registered.")
