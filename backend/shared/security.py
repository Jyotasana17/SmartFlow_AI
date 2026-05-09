from datetime import datetime, timedelta, timezone
from typing import Iterable

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel

from backend.shared.config import get_settings
from backend.shared.schemas import Role

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


class TokenPayload(BaseModel):
    sub: str
    role: Role
    exp: int
    iss: str
    token_type: str = "access"


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_token(subject: str, role: Role, token_type: str = "access") -> str:
    settings = get_settings()
    now = datetime.now(timezone.utc)
    if token_type == "refresh":
        expires = now + timedelta(days=settings.refresh_token_days)
    else:
        expires = now + timedelta(minutes=settings.access_token_minutes)
    payload = {
        "sub": subject,
        "role": role.value,
        "iss": settings.jwt_issuer,
        "iat": int(now.timestamp()),
        "exp": int(expires.timestamp()),
        "token_type": token_type,
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm="HS256")


def decode_token(token: str) -> TokenPayload:
    settings = get_settings()
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=["HS256"],
            issuer=settings.jwt_issuer,
        )
        return TokenPayload(**payload)
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc


async def get_current_token(token: str = Depends(oauth2_scheme)) -> TokenPayload:
    payload = decode_token(token)
    if payload.token_type != "access":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Access token required")
    return payload


def require_roles(allowed_roles: Iterable[Role]):
    allowed = set(allowed_roles)

    async def dependency(payload: TokenPayload = Depends(get_current_token)) -> TokenPayload:
        if payload.role not in allowed:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient role permissions")
        return payload

    return dependency
