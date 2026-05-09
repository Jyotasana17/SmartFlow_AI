from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.database.models import TrafficSnapshot, User
from backend.shared.schemas import Role


class UserRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def get_by_email(self, email: str) -> User | None:
        result = await self.session.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def create(self, email: str, password_hash: str, full_name: str, role: Role) -> User:
        user = User(email=email, password_hash=password_hash, full_name=full_name, role=role)
        self.session.add(user)
        await self.session.commit()
        await self.session.refresh(user)
        return user


class TrafficSnapshotRepository:
    def __init__(self, session: AsyncSession) -> None:
        self.session = session

    async def add(self, snapshot: TrafficSnapshot) -> TrafficSnapshot:
        self.session.add(snapshot)
        await self.session.commit()
        await self.session.refresh(snapshot)
        return snapshot
