# Deployment Guide

## Frontend on Vercel

Set the Vercel project root to the repository root. `vercel.json` builds `frontend/`.

Required Vercel variables:

- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_SOCKET_URL`
- `NEXT_PUBLIC_SOCKET_PATH=/socket.io`
- `NEXT_PUBLIC_MAPBOX_TOKEN`

## Backend with Docker

```bash
cp .env.example .env
docker compose up --build
```

API docs are available at `http://localhost:8000/docs`.

## GitHub Push

```bash
git init
git checkout -b main
git add .
git commit -m "Integrate SmartFlow AI frontend and backend"
git remote add origin <YOUR_GITHUB_REPOSITORY_URL>
git push -u origin main
```
