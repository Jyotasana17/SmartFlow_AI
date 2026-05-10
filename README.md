# SmartFlow AI - Human-Centric Traffic Management

SmartFlow AI is a cutting-edge, AI-powered traffic management platform designed to optimize urban mobility while prioritizing the human experience. Unlike traditional systems, SmartFlow AI monitors real-time driver stress, environmental impact, and emergency vehicle priority to create a safer, more efficient city.

## 🚀 Features

- **Human-Centric Dashboard**: A futuristic HUD interface monitoring driver stress biosignatures, road rage reduction, and citizen satisfaction.
- **AI-Driven Optimization**: Leverages deep learning to adjust signal phases based on live traffic density and stress patterns.
- **Emergency Priority Corridor**: Automated "green wave" synchronization for emergency vehicles, reducing ETA and saving lives.
- **Environmental Impact Tracking**: Real-time monitoring of CO2 abatement and fuel savings.
- **Voice Interface**: Simulated tactical voice commands for system overrides.
- **Multimodal Monitoring**: Advanced tracking of cars, bikes, and trucks across the urban grid.

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Python (FastAPI/Uvicorn), Socket.IO for real-time telemetry.
- **AI/ML**: YOLOv11 for detection, Reinforcement Learning (PPO) for signal control.
- **Deployment**: Netlify (Frontend), Vercel, Docker.

## 📂 Project Structure

```text
├── frontend/             # Next.js Application
│   ├── app/              # Dashboard and Human-Centric routes
│   ├── components/       # Shared UI components
│   ├── modules/          # Feature-specific logic (Monitoring, AI, Human-Centric)
│   └── store/            # State management (Zustand)
├── backend/              # Python API and AI Logic
├── shared/               # Shared types and utilities
└── docker/               # Containerization scripts
```

## 🏁 Getting Started

### Prerequisites

- Node.js >= 18.17.0
- Python >= 3.10

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/smartflow-ai.git
   cd smartflow-ai
   ```

2. Install dependencies:
   ```bash
   # Root (Monorepo)
   npm install
   
   # Frontend
   cd frontend
   npm install
   ```

### Running Locally

1. Start the Frontend:
   ```bash
   npm run frontend:dev
   ```

2. Start the Backend:
   ```bash
   npm run backend:dev
   ```

The dashboard will be available at `http://localhost:3000`.

## 🌐 Deployment

### Netlify

This project is optimized for Netlify deployment.
- **Build Command**: `npm run build`
- **Publish Directory**: `frontend/out`

### Vercel

The project includes a `vercel.json` for Vercel deployments.

## 📄 License

This project is licensed under the Apache-2.0 License.
