from datetime import datetime
from uuid import uuid4

from sqlalchemy import DateTime, Enum, Float, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from backend.shared.schemas import Role


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    full_name: Mapped[str] = mapped_column(String(255))
    role: Mapped[Role] = mapped_column(Enum(Role), default=Role.operator)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Junction(Base):
    __tablename__ = "junctions"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(255))
    district: Mapped[str] = mapped_column(String(255))
    lat: Mapped[float] = mapped_column(Float)
    lng: Mapped[float] = mapped_column(Float)
    controller_type: Mapped[str] = mapped_column(String(64), default="simulated")


class TrafficSnapshot(Base):
    __tablename__ = "traffic_snapshots"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid4()))
    junction_id: Mapped[str] = mapped_column(String(64), index=True)
    lane: Mapped[str] = mapped_column(String(32))
    vehicle_count: Mapped[int] = mapped_column(Integer)
    queue_length_m: Mapped[float] = mapped_column(Float)
    waiting_time_s: Mapped[float] = mapped_column(Float)
    congestion_score: Mapped[float] = mapped_column(Float)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, index=True)
