from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from backend.auth_service.schemas import LoginRequest, RegisterRequest, TokenResponse
from backend.database.repositories import UserRepository
from backend.shared.security import create_token, decode_token, hash_password, verify_password


class AuthService:
    def __init__(self, session: AsyncSession) -> None:
        self.users = UserRepository(session)

    async def register(self, payload: RegisterRequest) -> TokenResponse:
        existing = await self.users.get_by_email(payload.email)
        if existing:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")
        user = await self.users.create(
            email=payload.email,
            password_hash=hash_password(payload.password),
            full_name=payload.full_name,
            role=payload.role,
        )
        return self._tokens(user.email, user.role)

    async def login(self, payload: LoginRequest) -> TokenResponse:
        user = await self.users.get_by_email(payload.email)
        if not user or not verify_password(payload.password, user.password_hash):
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
        return self._tokens(user.email, user.role)

    def refresh(self, refresh_token: str) -> TokenResponse:
        payload = decode_token(refresh_token)
        if payload.token_type != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token required")
        return self._tokens(payload.sub, payload.role)

    @staticmethod
    def _tokens(subject: str, role):
        return TokenResponse(
            access_token=create_token(subject, role, "access"),
            refresh_token=create_token(subject, role, "refresh"),
        )
