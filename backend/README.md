# SmartFlow AI Backend

FastAPI-based distributed backend scaffold for autonomous smart traffic orchestration.

## Run Locally

```bash
cd backend
copy .env.example .env
docker compose up --build
```

API docs:

- REST/OpenAPI: `http://localhost:8000/docs`
- Socket.IO path: `http://localhost:8000/socket.io`
- Health: `http://localhost:8000/health`
- Metrics: `http://localhost:8000/metrics`

## MVP Pipeline

`POST /api/v1/pipeline/run-cycle`

1. Frame ingestion
2. YOLO-ready vehicle detection
3. Traffic score calculation
4. Explainable AI timing optimization
5. Safety-validated signal execution
6. Socket.IO dashboard broadcasts

The model loader defaults to mock inference for local development. Set `SMARTFLOW_ENABLE_REAL_MODEL=true` and provide `SMARTFLOW_YOLO_MODEL` to run YOLOv8.
