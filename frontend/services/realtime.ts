"use client";

import { io, type Socket } from "socket.io-client";
import type { Alert } from "@/types/traffic";
import type { BackendAIDecision, BackendEmergencyEvent, BackendSignalChanged, BackendTrafficUpdate } from "@/types/api";

export interface RealtimeHandlers {
  onTick: () => void;
  onAlert: (alert: Alert) => void;
  onTrafficUpdate: (payload: BackendTrafficUpdate) => void;
  onSignalChanged: (payload: BackendSignalChanged) => void;
  onAmbulanceDetected: (payload: BackendEmergencyEvent) => void;
  onCongestionAlert: (payload: Record<string, unknown>) => void;
  onAIDecisionUpdate: (payload: BackendAIDecision) => void;
}

let socket: Socket | null = null;

export function connectRealtime(handlers: RealtimeHandlers) {
  const url = process.env.NEXT_PUBLIC_SOCKET_URL;
  if (!url) {
    return {
      disconnect: () => undefined,
      connected: false,
    };
  }

  socket = io(url, {
    path: process.env.NEXT_PUBLIC_SOCKET_PATH ?? "/socket.io",
    transports: ["websocket", "polling"],
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 800,
  });

  socket.on("traffic_update", handlers.onTrafficUpdate);
  socket.on("signal_changed", handlers.onSignalChanged);
  socket.on("ambulance_detected", handlers.onAmbulanceDetected);
  socket.on("congestion_alert", handlers.onCongestionAlert);
  socket.on("ai_decision_update", handlers.onAIDecisionUpdate);
  socket.on("notification", handlers.onAlert);
  socket.on("alert:new", handlers.onAlert);

  return {
    disconnect: () => {
      socket?.disconnect();
      socket = null;
    },
    connected: true,
  };
}
