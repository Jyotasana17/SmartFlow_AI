import type { Alert, EmergencyStatus, Junction, TrafficRoute } from "@/types/traffic";

export interface DashboardSnapshot {
  city: string;
  aiOnline: boolean;
  center: { lng: number; lat: number };
  junctions: Junction[];
  routes: TrafficRoute[];
  alerts: Alert[];
  emergency: EmergencyStatus;
}

export interface BackendTrafficUpdate {
  junction_id: string;
  severity: "smooth" | "medium" | "heavy" | "emergency";
  lanes: Record<string, {
    vehicle_count: number;
    queue_length_m: number;
    waiting_time_s: number;
    congestion_score: number;
  }>;
}

export interface BackendAIDecision {
  junction_id: string;
  confidence: number;
  reason: string;
  reasoning_steps: string[];
  plan: Record<string, { color: "GREEN" | "YELLOW" | "RED"; duration_s: number }>;
}

export interface BackendSignalChanged {
  junction_id: string;
  plan?: BackendAIDecision;
}

export interface BackendEmergencyEvent {
  junction_id?: string;
  target_id?: string;
  corridor_status?: string;
  estimated_time_saved_mins?: number;
  route?: string[];
  ambulance_id?: string;
}
