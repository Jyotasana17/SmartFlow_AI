$env:NEXT_PUBLIC_API_BASE_URL = "http://127.0.0.1:8000"
$env:NEXT_PUBLIC_SOCKET_URL = "http://127.0.0.1:8000"
$env:NEXT_PUBLIC_SOCKET_PATH = "/socket.io"
$env:SMARTFLOW_EVENT_BUS = "memory"
Start-Process -FilePath python -ArgumentList @("-m", "uvicorn", "backend.api_gateway.main:socket_app", "--host", "127.0.0.1", "--port", "8000", "--reload") -WindowStyle Hidden
npm --prefix frontend run dev -- --hostname 127.0.0.1 --port 3000
