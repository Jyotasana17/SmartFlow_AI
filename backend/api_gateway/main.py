from contextlib import asynccontextmanager
from typing import AsyncIterator

import socketio
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_client import Counter, generate_latest
from starlette.responses import Response

from backend.api_gateway.routers import (
    analytics,
    auth,
    dashboard,
    emergency,
    health,
    pipeline,
    prediction,
    signals,
    swarm,
)
from backend.ai_assistant_service.routes import router as assistant_router
from backend.shared.config import get_settings
from backend.shared.logging import configure_logging, get_logger
from backend.websocket_service.socket_manager import SocketManager

settings = get_settings()
configure_logging()
logger = get_logger(__name__)
REQUESTS = Counter("smartflow_http_requests_total", "Total HTTP requests", ["method", "path"])
socket_manager = SocketManager()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    await socket_manager.start()
    logger.info("smartflow.backend.started", env=settings.env)
    yield
    logger.info("smartflow.backend.stopped")


app = FastAPI(
    title="SmartFlow AI Backend",
    version="1.0.0",
    description="Distributed AI-powered urban traffic orchestration backend.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[str(origin) for origin in settings.cors_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def request_metrics(request: Request, call_next):
    REQUESTS.labels(request.method, request.url.path).inc()
    response = await call_next(request)
    response.headers["x-smartflow-trace"] = request.headers.get("x-request-id", "local")
    return response


@app.get("/metrics", tags=["Monitoring"])
async def metrics() -> Response:
    return Response(generate_latest(), media_type="text/plain")


app.include_router(health.router)
app.include_router(dashboard.router, tags=["Dashboard"])
app.include_router(dashboard.router, prefix="/api/v1", tags=["Dashboard"])
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(pipeline.router, prefix="/api/v1/pipeline", tags=["Realtime Pipeline"])
app.include_router(emergency.router, prefix="/api/v1/emergency", tags=["Emergency Corridor"])
app.include_router(signals.router, prefix="/api/v1/signals", tags=["Signal Control"])
app.include_router(prediction.router, prefix="/api/v1/predictions", tags=["Prediction"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(swarm.router, prefix="/api/v1/swarm", tags=["Swarm Communication"])
app.include_router(assistant_router)

socket_app = socketio.ASGIApp(socket_manager.sio, other_asgi_app=app, socketio_path="/socket.io")
