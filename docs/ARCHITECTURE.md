# SmartFlow AI Integrated Architecture

SmartFlow AI is organized as a deployment-ready monorepo:

- `frontend/`: Next.js 15 dashboard deployed to Vercel.
- `backend/`: FastAPI + Socket.IO orchestration backend.
- `shared/`: Cross-system contracts and future generated schemas.
- `docker/`: Deployment assets and production overrides.
- `scripts/`: Local automation.
- `docs/`: Operational documentation.

## End-to-End Flow

Camera or simulated telemetry enters the backend ingestion pipeline, vehicle detection produces lane counts, traffic analysis scores congestion, the AI decision engine emits optimized timing plans, signal control validates/applies the plan, and Socket.IO broadcasts updates to the dashboard.

## Realtime Events

- `traffic_update`
- `signal_changed`
- `ambulance_detected`
- `congestion_alert`
- `ai_decision_update`

The frontend connects with `NEXT_PUBLIC_SOCKET_URL` and `NEXT_PUBLIC_SOCKET_PATH`.
