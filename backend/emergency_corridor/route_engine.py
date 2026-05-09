import heapq
from collections import defaultdict


class RouteEngine:
    def __init__(self) -> None:
        self.graph: dict[str, list[tuple[str, float]]] = defaultdict(list)
        self._seed_city_graph()

    def shortest_path(self, source: str, destination: str) -> list[str]:
        queue: list[tuple[float, str, list[str]]] = [(0, source, [])]
        visited: set[str] = set()
        while queue:
            cost, node, path = heapq.heappop(queue)
            if node in visited:
                continue
            path = [*path, node]
            if node == destination:
                return path
            visited.add(node)
            for neighbor, weight in self.graph[node]:
                if neighbor not in visited:
                    heapq.heappush(queue, (cost + weight, neighbor, path))
        return [source, destination]

    def _seed_city_graph(self) -> None:
        edges = [
            ("j-01", "j-02", 3),
            ("j-02", "j-03", 2),
            ("j-03", "j-05", 4),
            ("j-01", "j-04", 5),
            ("j-05", "j-02", 5),
            ("j-04", "j-03", 4),
        ]
        for a, b, weight in edges:
            self.graph[a].append((b, weight))
            self.graph[b].append((a, weight))
