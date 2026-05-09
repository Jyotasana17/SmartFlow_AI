from copy import deepcopy


CITY_CENTER = {"lng": 77.5946, "lat": 12.9716}

JUNCTIONS = [
    {
        "id": "j-01",
        "name": "Junction 1 - MG Road Grid",
        "district": "Central Business Zone",
        "coordinates": {"lng": 77.6101, "lat": 12.9758},
        "trafficLevel": "medium",
        "density": 62,
        "vehicles": {"cars": 52, "bikes": 23, "trucks": 7, "ambulances": 1},
        "queue": {"north": 72, "east": 44, "west": 58, "south": 31},
        "signal": {"north": "GREEN", "east": "RED", "west": "YELLOW", "south": "RED", "secondsLeft": 42},
        "aiDecision": {
            "confidence": 94,
            "lane": "North",
            "greenSeconds": 60,
            "predictedCongestion": "Congestion predicted in 3 mins",
            "averageWait": "118 sec",
            "suggestion": "Increase North green duration by 20% and release West in staggered phase.",
            "reasons": [
                "52 vehicles detected in the north approach",
                "Wait time exceeded adaptive threshold",
                "Bus lane spillover risk detected near market entry",
            ],
        },
    },
    {
        "id": "j-02",
        "name": "Junction 2 - Market Road",
        "district": "Commercial Spine",
        "coordinates": {"lng": 77.6006, "lat": 12.9667},
        "trafficLevel": "heavy",
        "density": 88,
        "vehicles": {"cars": 94, "bikes": 61, "trucks": 12, "ambulances": 0},
        "queue": {"north": 88, "east": 82, "west": 76, "south": 65},
        "signal": {"north": "RED", "east": "GREEN", "west": "RED", "south": "YELLOW", "secondsLeft": 18},
        "aiDecision": {
            "confidence": 91,
            "lane": "East",
            "greenSeconds": 52,
            "predictedCongestion": "Peak lock risk in 5 mins",
            "averageWait": "164 sec",
            "suggestion": "Hold East green, meter West inflow, and divert two blocks south.",
            "reasons": [
                "Abnormal Friday-like volume pattern detected",
                "East queue length is crossing junction storage capacity",
                "Downstream camera confirms available receiving capacity",
            ],
        },
    },
    {
        "id": "j-03",
        "name": "Junction 3 - Hospital Gate",
        "district": "Medical Corridor",
        "coordinates": {"lng": 77.5859, "lat": 12.9799},
        "trafficLevel": "emergency",
        "density": 43,
        "vehicles": {"cars": 31, "bikes": 18, "trucks": 3, "ambulances": 1},
        "queue": {"north": 28, "east": 36, "west": 22, "south": 41},
        "signal": {"north": "GREEN", "east": "RED", "west": "RED", "south": "GREEN", "secondsLeft": 55},
        "aiDecision": {
            "confidence": 97,
            "lane": "South",
            "greenSeconds": 75,
            "predictedCongestion": "No corridor blockage expected",
            "averageWait": "46 sec",
            "suggestion": "Maintain blue corridor and pre-clear two downstream signals.",
            "reasons": [
                "Ambulance transponder verified within corridor",
                "South approach has highest life-critical priority",
                "Adjacent lanes can absorb temporary red extension",
            ],
        },
    },
    {
        "id": "j-04",
        "name": "Junction 4 - Tech Park Loop",
        "district": "Innovation District",
        "coordinates": {"lng": 77.6258, "lat": 12.9861},
        "trafficLevel": "smooth",
        "density": 34,
        "vehicles": {"cars": 28, "bikes": 35, "trucks": 4, "ambulances": 0},
        "queue": {"north": 18, "east": 26, "west": 34, "south": 21},
        "signal": {"north": "YELLOW", "east": "GREEN", "west": "RED", "south": "RED", "secondsLeft": 29},
        "aiDecision": {
            "confidence": 89,
            "lane": "East",
            "greenSeconds": 38,
            "predictedCongestion": "Stable for next 15 mins",
            "averageWait": "39 sec",
            "suggestion": "Keep adaptive cycle short to preserve pedestrian crossing windows.",
            "reasons": [
                "Balanced approach volume across all lanes",
                "No spillback detected in downstream links",
                "Pedestrian demand is rising near metro exit",
            ],
        },
    },
]

ROUTES = [
    {
        "id": "r-01",
        "name": "Central Pulse",
        "level": "medium",
        "coordinates": [
            {"lng": 77.5792, "lat": 12.9634},
            {"lng": 77.5946, "lat": 12.9716},
            {"lng": 77.6101, "lat": 12.9758},
            {"lng": 77.6258, "lat": 12.9861},
        ],
    },
    {
        "id": "r-03",
        "name": "Blue Medical Corridor",
        "level": "emergency",
        "coordinates": [
            {"lng": 77.5792, "lat": 12.9634},
            {"lng": 77.5859, "lat": 12.9799},
            {"lng": 77.6006, "lat": 12.9667},
            {"lng": 77.6101, "lat": 12.9758},
        ],
    },
]

ALERTS = [
    {"id": "a-01", "title": "Accident detected", "detail": "Two-lane obstruction near Market Road northbound.", "severity": "critical", "source": "Vision AI", "timestamp": "Now"},
    {"id": "a-02", "title": "Ambulance approaching", "detail": "ETA to Hospital Gate corridor is 4 min 32 sec.", "severity": "info", "source": "Emergency Mesh", "timestamp": "1 min ago"},
    {"id": "a-03", "title": "Junction overload", "detail": "Market Road density crossed 85 percent.", "severity": "warning", "source": "Predictive Engine", "timestamp": "2 min ago"},
]

EMERGENCY_STATUS = {
    "active": True,
    "ambulancePosition": 18,
    "etaWithoutAI": 14,
    "etaWithAI": 5,
    "livesSaved": "HIGH",
}


def dashboard_snapshot() -> dict:
    return {
        "city": "Bengaluru Smart District",
        "aiOnline": True,
        "center": deepcopy(CITY_CENTER),
        "junctions": deepcopy(JUNCTIONS),
        "routes": deepcopy(ROUTES),
        "alerts": deepcopy(ALERTS),
        "emergency": deepcopy(EMERGENCY_STATUS),
    }
