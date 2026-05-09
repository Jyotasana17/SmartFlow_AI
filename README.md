# SmartFlow AI

SmartFlow AI is an integrated AI smart city traffic orchestration platform.

## Monorepo Layout

- `frontend/`: Next.js 15 dashboard with Mapbox, Zustand, Socket.IO, Recharts, Tailwind, and Framer Motion.
- `backend/`: FastAPI, Socket.IO, Redis, PostgreSQL, MongoDB, AI traffic modules, and Docker support.
- `docs/`: Architecture and deployment guides.
- `shared/`: API contract notes and future generated schemas.
- `scripts/`: Local development and validation scripts.

## Local Development

Frontend:

```bash
npm --prefix frontend install
npm --prefix frontend run dev
```

Backend:

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn backend.api_gateway.main:socket_app --host 0.0.0.0 --port 8000 --reload
```

Full Docker stack:

```bash
cp .env.example .env
docker compose up --build
```

## URLs

- Dashboard: `http://localhost:3000`
- Backend docs: `http://localhost:8000/docs`
- Backend health: `http://localhost:8000/health`
- Socket.IO: `http://localhost:8000/socket.io`

## Vercel

Deploy the repository root to Vercel. `vercel.json` builds the app from `frontend/`.

Set:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SOCKET_URL`
- `NEXT_PUBLIC_SOCKET_PATH`
- `NEXT_PUBLIC_MAPBOX_TOKEN`

## Validation

```bash
npm --prefix frontend run build
python -m compileall backend
```
