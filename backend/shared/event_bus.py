import asyncio
import json
from collections import defaultdict
from collections.abc import Awaitable, Callable
from typing import Any

from redis.asyncio import Redis

from backend.shared.config import get_settings
from backend.shared.logging import get_logger
from backend.shared.schemas import RealtimeEvent

EventHandler = Callable[[RealtimeEvent], Awaitable[None]]
logger = get_logger(__name__)


class EventBus:
    async def publish(self, event: RealtimeEvent) -> None:
        raise NotImplementedError

    async def subscribe(self, channel: str, handler: EventHandler) -> None:
        raise NotImplementedError


class InMemoryEventBus(EventBus):
    def __init__(self) -> None:
        self.handlers: dict[str, list[EventHandler]] = defaultdict(list)

    async def publish(self, event: RealtimeEvent) -> None:
        handlers = [*self.handlers.get(event.event, []), *self.handlers.get("*", [])]
        if handlers:
            await asyncio.gather(*(handler(event) for handler in handlers))

    async def subscribe(self, channel: str, handler: EventHandler) -> None:
        self.handlers[channel].append(handler)


class RedisEventBus(EventBus):
    def __init__(self, redis: Redis) -> None:
        self.redis = redis

    async def publish(self, event: RealtimeEvent) -> None:
        await self.redis.publish(event.event, event.model_dump_json())

    async def subscribe(self, channel: str, handler: EventHandler) -> None:
        pubsub = self.redis.pubsub()
        await pubsub.subscribe(channel)

        async def consume() -> None:
            async for message in pubsub.listen():
                if message["type"] != "message":
                    continue
                payload: dict[str, Any] = json.loads(message["data"])
                await handler(RealtimeEvent(**payload))

        asyncio.create_task(consume())


_event_bus: EventBus | None = None


def get_event_bus() -> EventBus:
    global _event_bus
    if _event_bus is not None:
        return _event_bus
    settings = get_settings()
    if settings.event_bus == "redis":
        _event_bus = RedisEventBus(Redis.from_url(settings.redis_url, decode_responses=True))
    else:
        _event_bus = InMemoryEventBus()
    return _event_bus
