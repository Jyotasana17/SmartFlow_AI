# SmartFlow AI

Production-grade smart traffic command center built with Next.js 15, TypeScript, Tailwind CSS, shadcn-style components, Zustand, Mapbox GL JS, Recharts, Framer Motion, and Socket.IO.

## Run

```bash
npm install
npm run dev
```

Optional realtime mock server:

```bash
npm run mock:socket
```

Set `NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local` for the live Mapbox map. Without a token, SmartFlow AI renders a futuristic city-grid fallback with the same junction, route, and emergency overlays.
