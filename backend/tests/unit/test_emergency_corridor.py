from backend.emergency_corridor.route_engine import RouteEngine


def test_route_engine_finds_known_path():
    route = RouteEngine().shortest_path("j-05", "j-04")
    assert route[0] == "j-05"
    assert route[-1] == "j-04"
    assert len(route) >= 2
