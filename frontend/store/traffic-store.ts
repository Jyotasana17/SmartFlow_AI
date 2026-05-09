"use client";

import { create } from "zustand";
import { alerts, cityCenter, junctions, trafficRoutes } from "@/data/mock-traffic";
import { clamp } from "@/lib/utils";
import { smartFlowApi } from "@/services/api-client";
import type { BackendAIDecision, BackendEmergencyEvent, BackendSignalChanged, BackendTrafficUpdate, DashboardSnapshot } from "@/types/api";
import type { Alert, EmergencyStatus, Junction, SimulationScenario, TrafficRoute } from "@/types/traffic";

interface TrafficState {
  city: string;
  aiOnline: boolean;
  backendConnected: boolean;
  loading: boolean;
  error: string | null;
  emergencyMode: boolean;
  selectedJunctionId: string;
  junctions: Junction[];
  routes: TrafficRoute[];
  alerts: Alert[];
  emergency: EmergencyStatus;
  center: typeof cityCenter;
  hydrateFromBackend: () => Promise<void>;
  applyDashboardSnapshot: (snapshot: DashboardSnapshot) => void;
  applyTrafficUpdate: (payload: BackendTrafficUpdate) => void;
  applySignalChanged: (payload: BackendSignalChanged) => void;
  applyAIDecisionUpdate: (payload: BackendAIDecision) => void;
  applyEmergencyEvent: (payload: BackendEmergencyEvent) => void;
  setSelectedJunction: (id: string) => void;
  toggleEmergencyMode: () => void;
  ingestRealtimeTick: () => void;
  addAlert: (alert: Alert) => void;
  runScenario: (scenario: SimulationScenario) => void;
}

export const useTrafficStore = create<TrafficState>((set, get) => ({
  city: "Bengaluru Smart District",
  aiOnline: true,
  backendConnected: false,
  loading: false,
  error: null,
  emergencyMode: true,
  selectedJunctionId: junctions[0].id,
  junctions,
  routes: trafficRoutes,
  alerts,
  emergency: {
    active: true,
    ambulancePosition: 18,
    etaWithoutAI: 14,
    etaWithAI: 5,
    livesSaved: "HIGH",
  },
  center: cityCenter,
  hydrateFromBackend: async () => {
    set({ loading: true, error: null });
    try {
      const snapshot = await smartFlowApi.dashboard();
      get().applyDashboardSnapshot(snapshot);
      set({ backendConnected: true, loading: false });
    } catch (error) {
      set({
        backendConnected: false,
        loading: false,
        error: error instanceof Error ? error.message : "Unable to reach SmartFlow backend",
      });
    }
  },
  applyDashboardSnapshot: (snapshot) =>
    set((state) => ({
      city: snapshot.city,
      aiOnline: snapshot.aiOnline,
      center: snapshot.center,
      junctions: snapshot.junctions,
      routes: snapshot.routes,
      alerts: snapshot.alerts,
      emergency: snapshot.emergency,
      emergencyMode: snapshot.emergency.active,
      selectedJunctionId: snapshot.junctions.some((junction) => junction.id === state.selectedJunctionId)
        ? state.selectedJunctionId
        : snapshot.junctions[0]?.id ?? state.selectedJunctionId,
    })),
  applyTrafficUpdate: (payload) =>
    set((state) => {
      const updated = state.junctions.map((junction) => {
        if (junction.id !== payload.junction_id) return junction;
        const laneEntries = Object.entries(payload.lanes);
        const maxScore = laneEntries.reduce((max, [, lane]) => Math.max(max, lane.congestion_score), 0);
        const laneValue = (lane: string, key: "queue_length_m" | "vehicle_count") =>
          Math.round(payload.lanes[lane]?.[key] ?? junction.queue[lane as keyof typeof junction.queue] ?? 0);
        return {
          ...junction,
          trafficLevel: payload.severity,
          density: clamp(Math.round(maxScore), 10, 100),
          vehicles: {
            ...junction.vehicles,
            cars: Math.max(0, laneEntries.reduce((sum, [, lane]) => sum + lane.vehicle_count, 0) - junction.vehicles.bikes),
          },
          queue: {
            north: clamp(laneValue("north", "queue_length_m"), 0, 100),
            east: clamp(laneValue("east", "queue_length_m"), 0, 100),
            west: clamp(laneValue("west", "queue_length_m"), 0, 100),
            south: clamp(laneValue("south", "queue_length_m"), 0, 100),
          },
        } satisfies Junction;
      });
      return { junctions: updated, backendConnected: true };
    }),
  applySignalChanged: (payload) =>
    set((state) => ({
      junctions: state.junctions.map((junction) => {
        if (junction.id !== payload.junction_id || !payload.plan?.plan) return junction;
        const plan = payload.plan.plan;
        return {
          ...junction,
          signal: {
            north: plan.north?.color ?? junction.signal.north,
            east: plan.east?.color ?? junction.signal.east,
            west: plan.west?.color ?? junction.signal.west,
            south: plan.south?.color ?? junction.signal.south,
            secondsLeft: Math.max(...Object.values(plan).map((timing) => timing.duration_s), junction.signal.secondsLeft),
          },
        };
      }),
    })),
  applyAIDecisionUpdate: (payload) =>
    set((state) => ({
      junctions: state.junctions.map((junction) => {
        if (junction.id !== payload.junction_id) return junction;
        const entries = Object.entries(payload.plan);
        const [lane, timing] = entries.find(([, value]) => value.color === "GREEN") ?? entries[0] ?? ["North", { duration_s: 45 }];
        return {
          ...junction,
          aiDecision: {
            confidence: Math.round(payload.confidence * 100),
            lane: lane.toString().toUpperCase(),
            greenSeconds: timing.duration_s,
            predictedCongestion: "Updated by backend AI engine",
            averageWait: junction.aiDecision.averageWait,
            suggestion: payload.reason,
            reasons: payload.reasoning_steps,
          },
        };
      }),
    })),
  applyEmergencyEvent: (payload) =>
    set((state) => ({
      emergencyMode: true,
      emergency: {
        ...state.emergency,
        active: payload.corridor_status === "ACTIVE" || state.emergency.active,
        etaWithAI: payload.estimated_time_saved_mins ? Math.max(3, state.emergency.etaWithoutAI - payload.estimated_time_saved_mins) : state.emergency.etaWithAI,
        ambulancePosition: state.emergency.ambulancePosition >= 95 ? 8 : state.emergency.ambulancePosition + 12,
      },
    })),
  setSelectedJunction: (id) => set({ selectedJunctionId: id }),
  toggleEmergencyMode: () =>
    set((state) => ({
      emergencyMode: !state.emergencyMode,
      emergency: { ...state.emergency, active: !state.emergencyMode },
    })),
  ingestRealtimeTick: () =>
    set((state) => {
      const updated = state.junctions.map((junction, index) => {
        const drift = Math.sin(Date.now() / 1600 + index) * 4;
        const density = clamp(Math.round(junction.density + drift), 18, 96);
        const trafficLevel = density > 78 ? "heavy" : density > 50 ? "medium" : junction.trafficLevel === "emergency" ? "emergency" : "smooth";
        return {
          ...junction,
          density,
          trafficLevel,
          vehicles: {
            ...junction.vehicles,
            cars: clamp(Math.round(junction.vehicles.cars + drift), 12, 120),
            bikes: clamp(Math.round(junction.vehicles.bikes + drift / 2), 8, 90),
          },
          queue: {
            north: clamp(Math.round(junction.queue.north + drift), 8, 96),
            east: clamp(Math.round(junction.queue.east - drift / 2), 8, 96),
            west: clamp(Math.round(junction.queue.west + drift / 3), 8, 96),
            south: clamp(Math.round(junction.queue.south - drift), 8, 96),
          },
          signal: {
            ...junction.signal,
            secondsLeft: junction.signal.secondsLeft > 1 ? junction.signal.secondsLeft - 1 : 60,
          },
        } satisfies Junction;
      });

      return {
        junctions: updated,
        emergency: {
          ...state.emergency,
          ambulancePosition: state.emergency.active
            ? state.emergency.ambulancePosition >= 98
              ? 6
              : state.emergency.ambulancePosition + 2.8
            : state.emergency.ambulancePosition,
        },
      };
    }),
  addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts].slice(0, 8) })),
  runScenario: (scenario) => {
    const scenarioCopy = {
      accident: ["Accident protocol active", "Vision AI rerouted Market Road inbound traffic.", "critical"],
      "peak-hour": ["Peak hour model loaded", "Adaptive cycle compression enabled across central grid.", "warning"],
      "heavy-rain": ["Rain response active", "Reduced speed corridors and wet-road congestion model enabled.", "warning"],
      festival: ["Festival template active", "Stadium and market dispersal plans are being simulated.", "info"],
      emergency: ["Emergency mode active", "Blue corridor green-wave priority is now live.", "info"],
    } as const;
    const [title, detail, severity] = scenarioCopy[scenario];
    get().addAlert({
      id: `scenario-${scenario}-${Date.now()}`,
      title,
      detail,
      severity,
      source: "Digital Twin",
      timestamp: "Now",
    });
    if (scenario === "emergency") {
      set({ emergencyMode: true, emergency: { ...get().emergency, active: true, ambulancePosition: 6 } });
    }
  },
}));

export function useSelectedJunction() {
  return useTrafficStore((state) => state.junctions.find((junction) => junction.id === state.selectedJunctionId) ?? state.junctions[0]);
}
