"""initial schema

Revision ID: 0001_initial
Revises:
Create Date: 2026-05-10
"""
from alembic import op
import sqlalchemy as sa

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    role_enum = sa.Enum("admin", "operator", "analyst", "emergency", name="role")
    role_enum.create(op.get_bind(), checkfirst=True)
    op.create_table(
        "users",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("email", sa.String(length=255), nullable=False, unique=True),
        sa.Column("password_hash", sa.String(length=255), nullable=False),
        sa.Column("full_name", sa.String(length=255), nullable=False),
        sa.Column("role", role_enum, nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_users_email", "users", ["email"])
    op.create_table(
        "junctions",
        sa.Column("id", sa.String(length=64), primary_key=True),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("district", sa.String(length=255), nullable=False),
        sa.Column("lat", sa.Float(), nullable=False),
        sa.Column("lng", sa.Float(), nullable=False),
        sa.Column("controller_type", sa.String(length=64), nullable=False),
    )
    op.create_table(
        "traffic_snapshots",
        sa.Column("id", sa.String(length=36), primary_key=True),
        sa.Column("junction_id", sa.String(length=64), nullable=False),
        sa.Column("lane", sa.String(length=32), nullable=False),
        sa.Column("vehicle_count", sa.Integer(), nullable=False),
        sa.Column("queue_length_m", sa.Float(), nullable=False),
        sa.Column("waiting_time_s", sa.Float(), nullable=False),
        sa.Column("congestion_score", sa.Float(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_traffic_snapshots_junction_id", "traffic_snapshots", ["junction_id"])
    op.create_index("ix_traffic_snapshots_created_at", "traffic_snapshots", ["created_at"])


def downgrade() -> None:
    op.drop_table("traffic_snapshots")
    op.drop_table("junctions")
    op.drop_index("ix_users_email", table_name="users")
    op.drop_table("users")
    sa.Enum(name="role").drop(op.get_bind(), checkfirst=True)
