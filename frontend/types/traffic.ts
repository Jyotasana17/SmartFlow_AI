export type TrafficLevel = "smooth" | "medium" | "heavy" | "emergency";
export type SignalColor = "GREEN" | "YELLOW" | "RED";
export type AlertSeverity = "critical" | "warning" | "info";
export type SimulationScenario =
  | "accident"
  | "peak-hour"
  | "heavy-rain"
  | "festival"
  | "emergency";

export interface Coordinates {
  lng: number;
  lat: number;
}

export interface VehicleCounts {
  cars: number;
  bikes: number;
  trucks: number;
  ambulances: number;
}

export interface SignalState {
  north: SignalColor;
  east: SignalColor;
  west: SignalColor;
  south: SignalColor;
  secondsLeft: number;
}

export interface QueueState {
  north: number;
  east: number;
  west: number;
  south: number;
}

export interface AIDecision {
  confidence: number;
  lane: string;
  greenSeconds: number;
  predictedCongestion: string;
  averageWait: string;
  suggestion: string;
  reasons: string[];
}

export interface Junction {
  id: string;
  name: string;
  district: string;
  coordinates: Coordinates;
  trafficLevel: TrafficLevel;
  density: number;
  vehicles: VehicleCounts;
  queue: QueueState;
  signal: SignalState;
  aiDecision: AIDecision;
}

export interface TrafficRoute {
  id: string;
  name: string;
  level: TrafficLevel;
  coordinates: Coordinates[];
}

export interface Alert {
  id: string;
  title: string;
  detail: string;
  severity: AlertSeverity;
  source: string;
  timestamp: string;
}

export interface KPI {
  label: string;
  value: string;
  delta: string;
  tone: "cyan" | "green" | "amber" | "red" | "violet";
}

export interface PredictionPoint {
  time: string;
  congestion: number;
  optimized: number;
  density: number;
}

export interface EmergencyStatus {
  active: boolean;
  ambulancePosition: number;
  etaWithoutAI: number;
  etaWithAI: number;
  livesSaved: "LOW" | "MEDIUM" | "HIGH";
}
