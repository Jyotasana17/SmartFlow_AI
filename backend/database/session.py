from collections.abc import AsyncGenerator

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from redis.asyncio import Redis
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from backend.shared.config import get_settings

settings = get_settings()

engine = create_async_engine(settings.postgres_dsn, pool_pre_ping=True, future=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

redis_client = Redis.from_url(settings.redis_url, decode_responses=True)
mongo_client = AsyncIOMotorClient(settings.mongo_uri)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with AsyncSessionLocal() as session:
        yield session


def get_redis() -> Redis:
    return redis_client


def get_mongo() -> AsyncIOMotorDatabase:
    return mongo_client[settings.mongo_db]
