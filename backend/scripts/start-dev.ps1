$env:PYTHONPATH = (Resolve-Path "..").Path
uvicorn backend.api_gateway.main:socket_app --host 0.0.0.0 --port 8000 --reload
