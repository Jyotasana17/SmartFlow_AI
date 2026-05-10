from typing import List, Dict, Any
from langchain.tools import tool

@tool
def get_live_traffic(junction_id: str = None) -> str:
    """Returns the current traffic density and status for a specific junction or the whole city."""
    # In a real integration, this would call the analytics_service or a database
    return f"Live data for {junction_id or 'all junctions'}: Density is 65%, Status: STABLE."

@tool
def get_signal_timings(junction_id: str) -> str:
    """Returns the current signal timings and phases for a specific junction."""
    return f"Junction {junction_id} timings: Phase 1: 45s, Phase 2: 30s, Phase 3: 15s."

@tool
def get_emergency_status() -> str:
    """Checks if any emergency corridors or ambulances are currently active."""
    return "Emergency Status: Active. 1 Ambulance detected near North Junction J4. Priority Corridor engaged."

@tool
def get_congestion_prediction() -> str:
    """Provides AI-driven congestion predictions for the next 15-30 minutes."""
    return "Prediction: Congestion expected to increase by 20% near Market Road in 10 minutes due to peak hour surge."

@tool
def explain_ai_decision(decision_id: str) -> str:
    """Explains why the AI system made a specific signal timing decision."""
    return f"Explanation for {decision_id}: North lane received 60-second green because vehicle density exceeded 85% and queue length was increasing rapidly."

@tool
def activate_emergency_protocol(incident_type: str, location: str) -> str:
    """Activates specialized emergency signal protocols for a specific incident and location."""
    return f"PROTOCOL ACTIVATED: Emergency green wave enabled for {incident_type} at {location}. Rerouting non-emergency traffic."

tools = [
    get_live_traffic,
    get_signal_timings,
    get_emergency_status,
    get_congestion_prediction,
    explain_ai_decision,
    activate_emergency_protocol
]
