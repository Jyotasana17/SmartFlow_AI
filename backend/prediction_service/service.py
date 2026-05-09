from datetime import datetime
from math import sin

from pydantic import BaseModel


class PredictionRequest(BaseModel):
    junction_id: str
    current_density: float
    hour_of_day: int | None = None
    weather_factor: float = 1.0
    event_factor: float = 1.0


class ForecastPoint(BaseModel):
    window: str
    congestion_score: float
    label: str


class PredictionResponse(BaseModel):
    junction_id: str
    prediction: str
    forecasts: list[ForecastPoint]
    model: str = "hybrid_lstm_xgboost_ready_mock"


class TrafficPredictionService:
    def forecast(self, request: PredictionRequest) -> PredictionResponse:
        hour = request.hour_of_day if request.hour_of_day is not None else datetime.utcnow().hour
        peak_pressure = 18 * max(0, sin((hour - 7) / 12))
        base = request.current_density * request.weather_factor * request.event_factor + peak_pressure
        windows = [("5 mins", 0.9), ("15 mins", 1.08), ("Peak hour", 1.24)]
        forecasts = [
            ForecastPoint(window=window, congestion_score=round(min(100, base * multiplier), 2), label=self._label(base * multiplier))
            for window, multiplier in windows
        ]
        top = max(forecasts, key=lambda point: point.congestion_score)
        return PredictionResponse(
            junction_id=request.junction_id,
            prediction=f"{top.label.title()} congestion expected in {top.window}",
            forecasts=forecasts,
        )

    @staticmethod
    def _label(score: float) -> str:
        if score >= 82:
            return "heavy"
        if score >= 55:
            return "medium"
        return "smooth"
