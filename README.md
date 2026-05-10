# SmartFlow AI 

<div align="center">

![SmartFlow AI](https://img.shields.io/badge/SmartFlow-AI--Powered%20Traffic%20Management-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-Apache%202.0-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active%20Development-orange?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-66.8%25-blue?style=flat)
![Python](https://img.shields.io/badge/Python-30.8%25-green?style=flat)

**A revolutionary AI-powered traffic management platform that prioritizes human well-being while optimizing urban mobility.**

[Live Demo](#deployment) • [Features](#-features) • [Installation](#-getting-started) • [Architecture](#-architecture) • [Contributing](#-contributing)

Live link : https://6a001422af93ba791ea2d999--smartflowaibugsmashers.netlify.app/
</div>

---

## 📋 Table of Contents

- [Demo Video ]
- [Overview](#overview)
- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Technology Stack](#️-technology-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)
- [🐳 Docker Setup](#-docker-setup)
- [🌐 Deployment](#-deployment)
- [📊 Project Components](#-project-components)
- [🤖 AI/ML Systems](#-aiml-systems)
- [🔌 API Documentation](#-api-documentation)
- [🧪 Testing](#-testing)
- [📝 Contributing](#-contributing)
- [📄 License](#-license)

---

## Overview

**SmartFlow AI** is a cutting-edge, AI-powered traffic management platform designed to revolutionize urban mobility by combining real-time data analysis, machine learning, and human-centric design principles. Unlike traditional traffic management systems that focus solely on vehicle throughput, SmartFlow AI monitors driver stress levels, environmental impact, and emergency vehicle priority to create a safer, more efficient, and more humane city.

### Core Vision

SmartFlow AI operates on the principle that technology should serve humanity. The system intelligently manages traffic signals, reduces congestion, and prioritizes emergency response—all while maintaining driver well-being and environmental sustainability.

### Key Statistics

- **Real-time Monitoring**: 24/7 traffic pattern analysis
- **AI-Driven Optimization**: Deep learning-based signal phase adjustment
- **Emergency Response**: Automated green wave corridors for ambulances and fire trucks
- **Environmental Impact**: Continuous CO₂ and fuel consumption tracking
- **Stress Reduction**: Driver biosignal monitoring and analytics

---

## ✨ Features

### 🎯 Human-Centric Dashboard

The intuitive HUD (Head-Up Display) interface presents critical information with a focus on user experience:

- **Driver Stress Biosignatures**: Real-time monitoring of driver stress levels using biometric data
- **Road Rage Reduction Analytics**: AI-powered metrics to reduce aggressive driving behaviors
- **Citizen Satisfaction Metrics**: Track public perception and satisfaction with traffic flow
- **Wellness Tracking**: Integration with wearable devices for comprehensive driver health monitoring
- **Customizable Views**: Personalized dashboard configurations for different user roles (traffic operators, city planners, citizens)

### 🤖 AI-Driven Traffic Optimization

Sophisticated machine learning algorithms work behind the scenes:

- **Dynamic Signal Control**: Adjusts traffic light phases based on real-time traffic density and flow patterns
- **Predictive Analytics**: Forecasts traffic congestion 15-60 minutes in advance
- **Reinforcement Learning**: Continuously improves signal timing through PPO (Proximal Policy Optimization)
- **Adaptive Algorithms**: Learns from historical patterns and special events
- **Multi-Modal Detection**: Recognizes cars, bikes, trucks, pedestrians, and other road users

### 🚨 Emergency Priority Corridor

Automated "green wave" synchronization for emergency vehicles:

- **Real-Time Routing**: Automatically calculates optimal emergency routes
- **Signal Coordination**: Synchronizes traffic lights to create clear passages
- **ETA Optimization**: Reduces emergency vehicle response times
- **Life-Saving Impact**: Direct correlation with improved emergency response metrics
- **Priority Escalation**: Manages conflicting traffic demands intelligently

### 🌍 Environmental Impact Tracking

Real-time monitoring of ecological metrics:

- **CO₂ Emission Reduction**: Tracks carbon savings from optimized traffic flow
- **Fuel Consumption Metrics**: Calculates fuel savings across the traffic network
- **Idle Time Reduction**: Minimizes wasted time at traffic lights
- **Sustainability Reports**: Generates periodic environmental impact analysis
- **Carbon Offset Integration**: Connects with offset programs for green initiatives

### 🎙️ Voice Interface

Tactical voice command system for system management:

- **Natural Language Processing**: Understands complex voice commands
- **System Overrides**: Manual control capabilities for special situations
- **Status Reports**: Audio briefings on traffic conditions
- **Emergency Commands**: Quick voice-activated priority protocols
- **Multi-Language Support**: Interface available in multiple languages

### 📡 Multimodal Monitoring

Advanced tracking capabilities across urban infrastructure:

- **Vehicle Detection**: Precise identification and tracking of all vehicle types
- **Pedestrian Tracking**: Safety monitoring for vulnerable road users
- **Bike Lane Management**: Dedicated analysis for cycling infrastructure
- **Public Transport Integration**: Coordination with buses, trams, and trains
- **IoT Integration**: Connects with smart city sensors and devices

---

## 🏗️ Architecture

### System Architecture Overview
<img width="1408" height="768" alt="WhatsApp Image 2026-05-10 at 6 29 36 PM" src="https://github.com/user-attachments/assets/5a612cb8-b164-4fd6-b0a5-eb60127a348d" />


### Data Flow Architecture

```
┌─────────────────────────────────────────────────────┐
│          Real-Time Data Collection                  │
│  (Traffic Cameras, Sensors, GPS Devices)           │
└────────────────┬──────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│           Data Processing Layer                     │
│  - Video Frame Processing (YOLOv11)               │
│  - Sensor Data Aggregation                         │
│  - Biometric Signal Processing                     │
└────────────────┬──────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│          AI/ML Decision Engine                      │
│  - Traffic Prediction Models                       │
│  - Signal Optimization (RL/PPO)                    │
│  - Stress Analysis Algorithms                      │
│  - Emergency Routing Engine                        │
└────────────────┬──────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│          Command Execution Layer                    │
│  - Signal Phase Adjustment                         │
│  - Emergency Route Activation                      │
│  - Data Logging to Databases                       │
└────────────────┬──────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│         Frontend Visualization & Reporting          │
│  - Dashboard Display (Real-time HUD)               │
│  - Analytics & Reports                             │
│  - User Notifications                              │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Technology Stack

### Frontend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | Full-stack React framework for production | 15+ |
| **React** | Core UI library | 19+ |
| **TypeScript** | Type-safe JavaScript development | Latest |
| **Tailwind CSS** | Utility-first CSS framework | Latest |
| **Framer Motion** | Smooth animations and interactions | Latest |
| **Lucide React** | Beautiful icon library | Latest |
| **Zustand** | Lightweight state management | Latest |
| **Socket.IO Client** | Real-time bidirectional communication | Latest |

**Frontend Composition:**
- 66.8% of codebase
- Modular component architecture
- Responsive design (mobile, tablet, desktop)
- Real-time data streaming via WebSocket

### Backend

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Python** | Server-side programming language | 3.10+ |
| **FastAPI** | Modern, fast web framework | Latest |
| **Uvicorn** | ASGI web server implementation | Latest |
| **Socket.IO** | Real-time event-based communication | Latest |
| **YOLOv11** | State-of-the-art object detection | v11 |
| **PyTorch/TensorFlow** | Deep learning frameworks | Latest |

**Backend Composition:**
- 30.8% of codebase
- Async/await patterns for concurrency
- Microservices-ready architecture
- RESTful API design with WebSocket support

### Databases & Storage

| Technology | Purpose |
|-----------|---------|
| **PostgreSQL** | Relational data storage (transactions, analytics) |
| **Redis** | In-memory cache for real-time data |
| **MongoDB** | NoSQL document storage (flexible schema) |

### Deployment & DevOps

| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization for consistent environments |
| **Docker Compose** | Multi-container orchestration |
| **Netlify** | Frontend hosting and CDN |
| **Vercel** | Alternative frontend deployment platform |
| **GitHub Actions** | CI/CD pipeline automation |

---
## Team Name
 Bug Smashers

## 📁 Project Structure

```
SmartFlow_AI/
├── frontend/                          # Next.js Application
│   ├── app/
│   │   ├── (dashboard)/              # Dashboard routes
│   │   ├── (human-centric)/          # Human-centric views
│   │   ├── (monitoring)/             # Real-time monitoring
│   │   ├── api/                      # API routes
│   │   ├── layout.tsx                # Root layout
│   │   └── page.tsx                  # Home page
│   │
│   ├── components/
│   │   ├── ui/                       # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Chart.tsx
│   │   │   ├── Gauge.tsx
│   │   │   └── ...
│   │   ├── Dashboard/                # Dashboard-specific components
│   │   ├── Header/                   # Header and navigation
│   │   ├── Sidebar/                  # Sidebar navigation
│   │   └── ...
│   │
│   ├── modules/
│   │   ├── Monitoring/               # Traffic monitoring features
│   │   │   ├── TrafficFlow.tsx
│   │   │   ├── SignalControl.tsx
│   │   │   └── RealTimeAnalytics.tsx
│   │   ├── AI/                       # AI feature module
│   │   │   ├── Predictions.tsx
│   │   │   ├── Optimization.tsx
│   │   │   └── MLInsights.tsx
│   │   ├── HumanCentric/             # Human-centric features
│   │   │   ├── StressMonitoring.tsx
│   │   │   ├── WellnessTracker.tsx
│   │   │   └── CitizenSatisfaction.tsx
│   │   └── ...
│   │
│   ├── store/
│   │   ├── trafficStore.ts           # Zustand traffic state
│   │   ├── uiStore.ts                # UI state management
│   │   ├── authStore.ts              # Authentication state
│   │   └── socketStore.ts            # WebSocket state
│   │
│   ├── hooks/
│   │   ├── useTraffic.ts
│   │   ├── useSocket.ts
│   │   ├── useAuth.ts
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── api.ts                    # API helper functions
│   │   ├── socket.ts                 # Socket.IO setup
│   │   ├── formatters.ts             # Data formatting
│   │   └── validators.ts             # Input validation
│   │
│   ├── styles/
│   │   ├── globals.css               # Global styles
│   │   ├── variables.css             # CSS variables
│   │   └── animations.css            # Animation definitions
│   │
│   ├── public/                        # Static assets
│   │   ├── images/
│   │   ├── icons/
│   │   └── ...
│   │
│   ├── .env.example                  # Environment variables template
│   ├── next.config.js                # Next.js configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   └── package.json                  # Dependencies
│
├── backend/                           # Python FastAPI Application
│   ├── api_gateway/
│   │   ├── main.py                   # Application entry point
│   │   ├── config.py                 # Configuration management
│   │   └── middleware.py             # Custom middleware
│   │
│   ├── models/
│   │   ├── traffic.py                # Traffic data models
│   │   ├── signal.py                 # Signal control models
│   │   ├── user.py                   # User models
│   │   ├── prediction.py             # Prediction models
│   │   └── schemas.py                # Pydantic schemas
│   │
│   ├── services/
│   │   ├── traffic_service.py        # Traffic management logic
│   │   ├── signal_service.py         # Signal control logic
│   │   ├── ai_service.py             # AI/ML integration
│   │   ├── detection_service.py      # YOLOv11 detection
│   │   ├── routing_service.py        # Emergency routing
│   │   └── analytics_service.py      # Data analytics
│   │
│   ├── routes/
│   │   ├── traffic.py                # Traffic endpoints
│   │   ├── signals.py                # Signal endpoints
│   │   ├── predictions.py            # Prediction endpoints
│   │   ├── analytics.py              # Analytics endpoints
│   │   ├── emergency.py              # Emergency endpoints
│   │   └── health.py                 # Health check endpoints
│   │
│   ├── ml/
│   │   ├── detection/
│   │   │   ├── yolov11_detector.py   # YOLOv11 implementation
│   │   │   └── preprocessor.py       # Image preprocessing
│   │   ├── optimization/
│   │   │   ├── rl_agent.py           # RL/PPO agent
│   │   │   ├── signal_optimizer.py   # Signal optimization logic
│   │   │   └── reward_function.py    # RL reward calculations
│   │   ├── prediction/
│   │   │   ├── traffic_predictor.py  # Traffic forecasting
│   │   │   └── stress_analyzer.py    # Driver stress analysis
│   │   └── models/                   # Pre-trained model files
│   │
│   ├── database/
│   │   ├── connection.py             # Database connections
│   │   ├── models.py                 # SQLAlchemy models
│   │   ├── migrations/               # Alembic migrations
│   │   └── seeds.py                  # Database seeds
│   │
│   ├── sockets/
│   │   ├── events.py                 # Socket event handlers
│   │   ├── namespaces.py             # Socket namespaces
│   │   └── authentication.py         # Socket auth
│   │
│   ├── utils/
│   │   ├── helpers.py                # Utility functions
│   │   ├── validators.py             # Input validators
│   │   ├── decorators.py             # Custom decorators
│   │   └── logger.py                 # Logging setup
│   │
│   ├── tests/
│   │   ├── test_api.py
│   │   ├── test_services.py
│   │   ├── test_ml.py
│   │   └── conftest.py               # Test configuration
│   │
│   ├── Dockerfile                    # Docker container definition
│   ├── requirements.txt              # Python dependencies
│   └── .env.example                  # Environment template
│
├── shared/
│   ├── types.ts                      # Shared TypeScript types
│   ├── constants.ts                  # Shared constants
│   ├── interfaces.ts                 # Shared interfaces
│   └── utils.ts                      # Shared utility functions
│
├── scripts/
│   ├── setup.sh                      # Initial setup script
│   ├── seed_data.sh                  # Database seeding
│   ├── migrate.sh                    # Database migrations
│   └── deploy.sh                     # Deployment script
│
├── docs/
│   ├── README.md                     # Documentation index
│   ├── ARCHITECTURE.md               # Architecture deep-dive
│   ├── API.md                        # API documentation
│   ├── ML_MODELS.md                  # ML models documentation
│   ├── DEPLOYMENT.md                 # Deployment guide
│   └── CONTRIBUTING.md               # Contributing guide
│
├── .env.example                      # Environment variables template
├── .gitignore                        # Git ignore rules
├── .vercelignore                     # Vercel ignore rules
├── docker-compose.yml                # Docker compose configuration
├── netlify.toml                      # Netlify configuration
├── vercel.json                       # Vercel configuration
├── package.json                      # Root package.json
├── package-lock.json                 # Dependency lock file
└── README.md                         # Main documentation
```

### Key Directory Functions

- **frontend/**: Next.js web application with dashboard, monitoring, and analytics
- **backend/**: FastAPI server with AI/ML integration and real-time WebSocket support
- **shared/**: Types and utilities shared between frontend and backend
- **scripts/**: Automation scripts for setup, migration, and deployment
- **docs/**: Comprehensive documentation for developers
- **database/**: Schema definitions and migration files

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.17.0 (for frontend development)
  - Check: `node --version`
  - Download: https://nodejs.org/
  
- **npm** >= 9.0.0 (Node Package Manager)
  - Check: `npm --version`
  - Usually installed with Node.js

- **Python** >= 3.10 (for backend development)
  - Check: `python --version`
  - Download: https://www.python.org/

- **Git** (for version control)
  - Check: `git --version`
  - Download: https://git-scm.com/

- **Docker** & **Docker Compose** (optional, for containerized setup)
  - Check: `docker --version` and `docker-compose --version`
  - Download: https://www.docker.com/

### Installation Steps

#### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Jyotasana17/SmartFlow_AI.git

# Navigate into the project directory
cd SmartFlow_AI
```

#### 2. Install Root Dependencies

```bash
# Install root monorepo dependencies
npm install
```

#### 3. Setup Frontend

```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Create .env.local file for frontend
cp .env.example .env.local

# Edit .env.local with your configuration
# NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
# NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
# NEXT_PUBLIC_SOCKET_PATH=/socket.io

cd ..
```

#### 4. Setup Backend

```bash
# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install Python dependencies
pip install -r backend/requirements.txt

# Create .env file for backend
cp .env.example .env

# Edit .env with your database credentials
# DATABASE_URL=postgresql://user:password@localhost:5432/smartflow
# REDIS_URL=redis://localhost:6379
# MONGODB_URL=mongodb://localhost:27017

# Run database migrations
cd backend
alembic upgrade head
cd ..
```

#### 5. Setup Environment Variables

Create `.env` file in the root directory:

```env
# Database Configuration
DATABASE_URL=postgresql://smartflow:smartflow@localhost:5432/smartflow
MONGODB_URL=mongodb://localhost:27017
REDIS_URL=redis://localhost:6379

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_URL=http://localhost:8000
NEXT_PUBLIC_SOCKET_PATH=/socket.io

# Application Settings
SMARTFLOW_EVENT_BUS=redis
DEBUG=True
LOG_LEVEL=INFO

# AI/ML Configuration
YOLO_MODEL_PATH=./backend/ml/models/yolov11n.pt
ENABLE_STRESS_MONITORING=True
ENABLE_EMERGENCY_ROUTING=True

# Optional: Third-party Integrations
SENTRY_DSN=
DATADOG_API_KEY=
```

### Running Locally

#### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Start Frontend:**

```bash
npm run frontend:dev

# Output should show:
# > next dev
# ▲ Next.js 15.0.0
# - Local:        http://localhost:3000
```

**Terminal 2 - Start Backend:**

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # or venv\Scripts\activate on Windows

npm run backend:dev

# Or directly:
python -m uvicorn backend.api_gateway.main:socket_app --host 0.0.0.0 --port 8000 --reload

# Output should show:
# Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**Terminal 3 - Start Databases (if needed):**

```bash
# Using Docker Compose
docker-compose up postgres redis mongo
```

Once running:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

#### Option 2: Run with Docker Compose (One Command)

```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Verification Checklist

After starting the application:

- [ ] Frontend loads at http://localhost:3000
- [ ] Backend API responds at http://localhost:8000/health
- [ ] Swagger API docs available at http://localhost:8000/docs
- [ ] Socket.IO connection established (check browser console)
- [ ] Dashboard displays real-time data
- [ ] No errors in browser/server console

---

## 🐳 Docker Setup

### Building with Docker

```bash
# Build the backend Docker image
docker build -t smartflow-backend -f backend/Dockerfile .

# Build the frontend (if separate)
docker build -t smartflow-frontend -f frontend/Dockerfile .
```

### Docker Compose Configuration

The `docker-compose.yml` includes:

| Service | Port | Purpose |
|---------|------|---------|
| **backend** | 8000 | FastAPI application |
| **frontend** | 3000 | Next.js application |
| **postgres** | 5432 | PostgreSQL database |
| **redis** | 6379 | Redis cache |
| **mongo** | 27017 | MongoDB database |

### Common Docker Commands

```bash
# Start all services
docker-compose up

# Start specific service
docker-compose up backend postgres redis

# Rebuild images
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop all services
docker-compose down

# Remove volumes (careful!)
docker-compose down -v

# View logs
docker-compose logs -f [service_name]

# Execute command in container
docker-compose exec backend python -m alembic upgrade head

# Scale service
docker-compose up --scale backend=3
```

### Environment for Docker

```bash
# .env.docker
SMARTFLOW_EVENT_BUS=redis
DATABASE_URL=postgresql://smartflow:smartflow@postgres:5432/smartflow
REDIS_URL=redis://redis:6379
MONGODB_URL=mongodb://mongo:27017
```

---

## 🌐 Deployment

### Netlify Deployment (Frontend)

1. **Connect Repository**
   - Go to https://netlify.com
   - Click "New site from Git"
   - Select GitHub and choose SmartFlow_AI
   - Authorize Netlify

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `frontend/out`
   - Node version: 18.17.0

3. **Set Environment Variables**
   - NEXT_PUBLIC_API_BASE_URL: Your backend URL
   - NEXT_PUBLIC_SOCKET_URL: Your Socket.IO server URL

4. **Deploy**
   - Push to main branch or click "Deploy site"
   - Netlify automatically builds and deploys

**Current Deployment:**
- Live Demo: https://6a001422af93ba791ea2d999--smartflowaibugsmashers.netlify.app/

### Vercel Deployment (Frontend Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# With environment variables
vercel env add NEXT_PUBLIC_API_BASE_URL
vercel env add NEXT_PUBLIC_SOCKET_URL

# Production deployment
vercel --prod
```

Configuration in `vercel.json`:

```json
{
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/out",
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@api_base_url",
    "NEXT_PUBLIC_SOCKET_URL": "@socket_url"
  }
}
```

### Backend Deployment (Python)

#### Option 1: Heroku

```bash
# Install Heroku CLI
brew tap heroku/brew && brew install heroku

# Login to Heroku
heroku login

# Create app
heroku create smartflow-backend

# Add buildpack
heroku buildpacks:add heroku/python

# Set environment variables
heroku config:set DATABASE_URL=postgresql://...
heroku config:set REDIS_URL=redis://...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Option 2: AWS (Elastic Beanstalk)

```bash
# Install EB CLI
pip install awsebcli

# Initialize
eb init -p python-3.10 smartflow

# Create environment
eb create smartflow-env

# Deploy
eb deploy

# Open app
eb open
```

#### Option 3: Docker Deployment (Any Cloud)

```bash
# Build image
docker build -t smartflow:latest -f backend/Dockerfile .

# Push to registry (e.g., Docker Hub)
docker tag smartflow:latest your-registry/smartflow:latest
docker push your-registry/smartflow:latest

# Deploy with docker-compose in cloud environment
docker-compose -f docker-compose.prod.yml up -d
```

### Production Checklist

- [ ] Environment variables properly set
- [ ] Database backups configured
- [ ] SSL/TLS certificates installed
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Logging and monitoring active
- [ ] CI/CD pipeline configured
- [ ] Secrets not exposed in code
- [ ] API documentation updated
- [ ] Performance optimizations applied

---

## 📊 Project Components

### Frontend Components

#### Core Components

- **Dashboard**: Main control center with real-time traffic data
- **TrafficFlow**: Visualization of traffic patterns and flow
- **SignalControl**: Manual and automatic traffic signal controls
- **StressMonitor**: Real-time driver stress level tracking
- **EmergencyRouter**: Emergency vehicle routing visualization
- **EnvironmentalImpact**: CO₂ and fuel savings tracking
- **VoiceInterface**: Voice command input system

#### UI Components

- **Button, Card, Input**: Basic UI elements
- **Chart, Gauge**: Data visualization components
- **Modal, Toast**: User feedback components
- **Sidebar, Header**: Navigation components
- **DataTable**: Sortable and filterable data display

### Backend Routes

#### API Endpoints

```
# Traffic Management
GET/POST   /api/traffic/status          - Get/set traffic status
GET        /api/traffic/flow            - Traffic flow data
GET        /api/traffic/density         - Traffic density map
POST       /api/traffic/incidents       - Report incidents

# Signal Control
GET        /api/signals/status          - Get all signal status
POST       /api/signals/phase           - Adjust signal phase
GET        /api/signals/{id}            - Get specific signal
PUT        /api/signals/{id}            - Update signal settings

# Predictions
GET        /api/predictions/traffic     - Traffic predictions
GET        /api/predictions/congestion  - Congestion forecasts
GET        /api/predictions/stress      - Stress level predictions

# Analytics
GET        /api/analytics/summary       - Overall analytics
GET        /api/analytics/emissions     - Emission data
GET        /api/analytics/response-time - Emergency response times

# Emergency
POST       /api/emergency/activate      - Activate emergency mode
GET        /api/emergency/corridor      - Get emergency corridor
POST       /api/emergency/report        - Report emergency

# Health
GET        /api/health                  - Service health check
GET        /api/status                  - System status
```

---

## 🤖 AI/ML Systems

### YOLOv11 Object Detection

**Purpose**: Real-time vehicle and road user detection

**Models:**
- `yolov11n.pt` - Nano (fastest, least accurate)
- `yolov11s.pt` - Small (balanced)
- `yolov11m.pt` - Medium (slower, more accurate)
- `yolov11l.pt` - Large (slowest, most accurate)
- `yolov11x.pt` - Extra-large (production-grade)

**Implementation:**

```python
from backend.ml.detection.yolov11_detector import YOLOv11Detector

detector = YOLOv11Detector(model_path='yolov11m.pt')
results = detector.detect(image_frame)

# Results include:
# - bboxes: Bounding boxes
# - classes: Object classes
# - confidences: Confidence scores
# - masks: Segmentation masks (if enabled)
```

**Detected Classes:**
- Car, truck, bus
- Motorcycle, bicycle, person
- Animal, traffic signs

### Reinforcement Learning (PPO)

**Purpose**: Optimize traffic signal timing using trial and error

**Algorithm**: Proximal Policy Optimization (PPO)

**Features:**
- Learns from real traffic patterns
- Minimizes congestion and wait times
- Adapts to special events and emergencies
- Safe exploration of signal configurations

**Implementation:**

```python
from backend.ml.optimization.rl_agent import RLAgent

agent = RLAgent(state_dim=64, action_dim=32)
state = traffic_environment.reset()

for step in range(episode_length):
    action = agent.select_action(state)
    next_state, reward, done = traffic_environment.step(action)
    agent.store_transition(state, action, reward, next_state)
    state = next_state

agent.update()  # PPO update
```

### Traffic Prediction

**Purpose**: Forecast traffic conditions 15-60 minutes ahead

**Model**: LSTM/Transformer-based time series forecasting

**Features:**
- Multi-step prediction
- Confidence intervals
- Anomaly detection
- Seasonal pattern learning

### Driver Stress Analysis

**Purpose**: Monitor and reduce driver stress levels

**Data Sources:**
- Heart rate variability
- Skin conductance
- Eye tracking
- Vehicle telemetry

**Output**: Stress level (0-100), recommendations

---

## 🔌 API Documentation

### WebSocket Events

#### Client → Server

```typescript
// Connect to traffic updates
socket.emit('subscribe:traffic', { intersection_id: 'INT_001' });

// Request prediction
socket.emit('request:prediction', { 
  location: [28.6139, 77.2090],
  horizon: 30 // minutes
});

// Emergency alert
socket.emit('emergency:activate', {
  type: 'ambulance',
  location: [28.6139, 77.2090],
  priority: 'critical'
});

// Voice command
socket.emit('voice:command', { command: 'activate green wave' });
```

#### Server → Client

```typescript
// Traffic update
socket.on('traffic:update', (data) => {
  // { intersection_id, phase, wait_time, vehicle_count }
});

// Stress alert
socket.on('alert:stress', (data) => {
  // { driver_id, stress_level, recommendation }
});

// Environmental update
socket.on('env:update', (data) => {
  // { co2_saved, fuel_saved, idle_time_reduced }
});

// Emergency notification
socket.on('emergency:corridor_active', (data) => {
  // { route, eta, active_signals }
});
```

### REST API Examples

```bash
# Get traffic status
curl http://localhost:8000/api/traffic/status

# Activate emergency mode
curl -X POST http://localhost:8000/api/emergency/activate \
  -H "Content-Type: application/json" \
  -d '{"type": "ambulance", "location": [28.6139, 77.2090]}'

# Get predictions
curl http://localhost:8000/api/predictions/traffic?location=INT_001&horizon=30

# Get analytics
curl http://localhost:8000/api/analytics/summary?timeframe=24h
```

---

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
cd frontend
npm run test
npm run test:coverage

# Backend tests
cd ..
pytest backend/tests/ -v
pytest backend/tests/ --cov=backend --cov-report=html

# E2E tests
npm run test:e2e
```

### Test Structure

```
backend/tests/
├── test_api.py              # API endpoint tests
├── test_services.py         # Service logic tests
├── test_ml.py               # ML model tests
├── test_integration.py      # Integration tests
└── conftest.py              # Test configuration

frontend/__tests__/
├── components/              # Component tests
├── hooks/                   # Hook tests
├── utils/                   # Utility tests
└── integration/             # Integration tests
```

---

## 📝 Contributing

### Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

### How to Contribute

1. **Fork the Repository**
   ```bash
   git clone https://github.com/[your-username]/SmartFlow_AI.git
   cd SmartFlow_AI
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the code style guide
   - Write clear commit messages
   - Add tests for new features

4. **Test Your Changes**
   ```bash
   npm run validate
   pytest backend/tests/
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

6. **Submit a Pull Request**
   - Describe your changes clearly
   - Reference related issues
   - Ensure CI/CD passes

### Development Guidelines

- **Code Style**: Follow PEP 8 (Python) and ESLint (JavaScript)
- **Documentation**: Write clear docstrings and comments
- **Testing**: Maintain >80% code coverage
- **Commits**: Use conventional commit format (feat:, fix:, docs:, etc.)
- **Branches**: Use descriptive branch names

### Reporting Issues

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, browser, versions)

---

## 📄 License

This project is licensed under the **Apache License 2.0**.

```
Copyright 2024 SmartFlow AI Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

---

## 🙏 Acknowledgments

### Technologies & Libraries

- **Next.js** and **React** communities for excellent frameworks
- **FastAPI** for modern Python web development
- **YOLOv11** for state-of-the-art object detection
- **PyTorch** for deep learning capabilities
- **Socket.IO** for real-time communication
- **Tailwind CSS** and **Framer Motion** for beautiful UI

### Contributors

Thanks to all contributors who have helped bring SmartFlow AI to life:

- [Jyotasana17](https://github.com/Jyotasana17) - Project Creator and Lead Developer
- [Your Name Here] - Feel free to contribute!

### Inspiration

This project draws inspiration from:
- Intelligent Transportation Systems (ITS)
- Human-Centered Design principles
- Environmental Sustainability initiatives
- Emergency Services optimization

---

## 📞 Contact & Support

### Communication Channels

- **GitHub Issues**: Report bugs and request features
- **Discussions**: General questions and discussions
- **Email**: [Add your email]
- **Discord/Slack**: [Add community server]

### Getting Help

1. Check existing documentation in `/docs`
2. Search existing issues and discussions
3. Ask in our community channels
4. Open a new issue if needed

---

## 🗺️ Roadmap


- [ ] Mobile app (iOS/Android)
- [ ] Advanced ML models for stress prediction
- [ ] Integration with public transportation
- [ ] Multi-language support


- [ ] Machine learning model improvements
- [ ] Real-time traffic incident detection
- [ ] Advanced analytics dashboard
- [ ] Third-party integrations (Google Maps, etc.)


- [ ] Autonomous vehicle integration
- [ ] Drone-based traffic monitoring
- [ ] AI-powered chatbot support
- [ ] Blockchain for transparent reporting


- [ ] Global traffic network federation
- [ ] Advanced predictive analytics
- [ ] IoT device support expansion
- [ ] Production deployment in major cities

---

## 📚 Additional Resources

### Documentation

- [Architecture Deep Dive](docs/ARCHITECTURE.md)
- [API Reference](docs/API.md)
- [ML Models Documentation](docs/ML_MODELS.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

### External Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [YOLOv11 Guide](https://docs.ultralytics.com/)
- [Socket.IO Documentation](https://socket.io/docs/)
- [Reinforcement Learning Resources](https://spinningup.openai.com/)

### Related Projects

- [YOLOv11](https://github.com/ultralytics/ultralytics)
- [FastAPI](https://github.com/tiangolo/fastapi)
- [Next.js](https://github.com/vercel/next.js)

---

<div align="center">

### Made with ❤️ by the SmartFlow AI Community

**Star us on GitHub if you find this project helpful!**

[⭐ Star on GitHub](https://github.com/Jyotasana17/SmartFlow_AI) • [🐛 Report Bug](https://github.com/Jyotasana17/SmartFlow_AI/issues) • [💡 Request Feature](https://github.com/Jyotasana17/SmartFlow_AI/issues)

</div>

---

**Last Updated**: May 2026 | **Version**: 1.0.0 | **Status**: Active Development
