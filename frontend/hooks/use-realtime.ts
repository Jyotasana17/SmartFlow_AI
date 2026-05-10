"use client";

import { useEffect } from "react";
import { connectRealtime } from "@/services/realtime";
import { useTrafficStore } from "@/store/traffic-store";
import { useAssistantStore } from "@/store/assistant-store";

export function useRealtime() {
  const hydrateFromBackend = useTrafficStore((state) => state.hydrateFromBackend);
  const ingestRealtimeTick = useTrafficStore((state) => state.ingestRealtimeTick);
  const addAlert = useTrafficStore((state) => state.addAlert);
  const applyTrafficUpdate = useTrafficStore((state) => state.applyTrafficUpdate);
  const applySignalChanged = useTrafficStore((state) => state.applySignalChanged);
  const applyEmergencyEvent = useTrafficStore((state) => state.applyEmergencyEvent);
  const applyAIDecisionUpdate = useTrafficStore((state) => state.applyAIDecisionUpdate);
  const addAssistantMessage = useAssistantStore((state) => state.addMessage);

  useEffect(() => {
    void hydrateFromBackend();
    const connection = connectRealtime({
      onTick: ingestRealtimeTick,
      onAlert: addAlert,
      onTrafficUpdate: applyTrafficUpdate,
      onSignalChanged: applySignalChanged,
      onAmbulanceDetected: (payload) => {
        applyEmergencyEvent(payload);
        addAssistantMessage({
          role: "assistant",
          content: `🚨 AMBULANCE DETECTED: Emergency corridor J${payload.junction_id} → J${payload.target_id || '?'} is now ACTIVE. I am optimizing the green wave.`
        });
      },
      onCongestionAlert: (payload) => {
        addAlert({
          id: `congestion-${Date.now()}`,
          title: "Congestion propagation alert",
          detail: typeof payload.message_type === "string" ? payload.message_type : "Nearby junction reports traffic pressure.",
          severity: "warning",
          source: "Swarm Mesh",
          timestamp: "Now",
        });
        addAssistantMessage({
          role: "assistant",
          content: `⚠️ CONGESTION ALERT: Neural sync detects building pressure at ${payload.junction_id || 'nearby junctions'}. Tactical optimization suggested.`
        });
      },
      onAIDecisionUpdate: applyAIDecisionUpdate,
    });

    const fallback = window.setInterval(ingestRealtimeTick, connection.connected ? 2500 : 1200);

    return () => {
      window.clearInterval(fallback);
      connection.disconnect();
    };
  }, [addAlert, applyAIDecisionUpdate, applyEmergencyEvent, applySignalChanged, applyTrafficUpdate, hydrateFromBackend, ingestRealtimeTick]);
}
