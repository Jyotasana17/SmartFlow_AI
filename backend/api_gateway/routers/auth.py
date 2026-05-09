from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend.auth_service.schemas import LoginRequest, ProfileResponse, RefreshRequest, RegisterRequest, TokenResponse
from backend.auth_service.service import AuthService
from backend.database.session import get_session
from backend.shared.security import TokenPayload, get_current_token

router = APIRouter()


@router.post("/register", response_model=TokenResponse)
async def register(payload: RegisterRequest, session: AsyncSession = Depends(get_session)):
    return await AuthService(session).register(payload)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, session: AsyncSession = Depends(get_session)):
    return await AuthService(session).login(payload)


@router.get("/profile", response_model=ProfileResponse)
async def profile(token: TokenPayload = Depends(get_current_token)):
    return ProfileResponse(subject=token.sub, role=token.role)


@router.post("/refresh-token", response_model=TokenResponse)
async def refresh(payload: RefreshRequest, session: AsyncSession = Depends(get_session)):
    return AuthService(session).refresh(payload.refresh_token)
