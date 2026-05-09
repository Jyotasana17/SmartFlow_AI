from pydantic import BaseModel


class KPIReport(BaseModel):
    avg_wait_reduction_pct: float
    signal_efficiency_pct: float
    vehicles_processed: int
    fuel_saved_liters: float
    pollution_reduction_kg: float
    emergency_response_improvement_pct: float


class AnalyticsService:
    async def city_kpis(self) -> KPIReport:
        return KPIReport(
            avg_wait_reduction_pct=38.0,
            signal_efficiency_pct=86.4,
            vehicles_processed=128_430,
            fuel_saved_liters=18_420.5,
            pollution_reduction_kg=27_800.0,
            emergency_response_improvement_pct=64.0,
        )

    async def trend_report(self) -> dict:
        return {
            "peak_hours": ["08:30-10:00", "17:30-19:30"],
            "recurring_hotspots": ["Market Road", "Stadium Flyover", "Hospital Gate"],
            "signal_efficiency_trend": [79, 81, 83, 86, 88],
            "recommendations": [
                "Increase Market Road northbound split by 20% during rain.",
                "Pre-arm stadium dispersal template one hour before events.",
            ],
        }
