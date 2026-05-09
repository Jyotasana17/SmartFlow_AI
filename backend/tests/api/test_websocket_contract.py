from backend.shared.schemas import RealtimeEvent


def test_realtime_event_contract():
    event = RealtimeEvent(event="traffic_update", payload={"junction_id": "j-01"}, room="city")
    assert event.event == "traffic_update"
    assert event.payload["junction_id"] == "j-01"
