"use client";

import { useEffect } from "react";
import { connectRealtime } from "@/services/realtime";
import { useTrafficStore } from "@/store/traffic-store";

export function useRealtime() {
  const hydrateFromBackend = useTrafficStore((state) => state.hydrateFromBackend);
  const ingestRealtimeTick = useTrafficStore((state) => state.ingestRealtimeTick);
  const addAlert = useTrafficStore((state) => state.addAlert);
  const applyTrafficUpdate = useTrafficStore((state) => state.applyTrafficUpdate);
  const applySignalChanged = useTrafficStore((state) => state.applySignalChanged);
  const applyEmergencyEvent = useTrafficStore((state) => state.applyEmergencyEvent);
  const applyAIDecisionUpdate = useTrafficStore((state) => state.applyAIDecisionUpdate);

  useEffect(() => {
    void hydrateFromBackend();
    const connection = connectRealtime({
      onTick: ingestRealtimeTick,
      onAlert: addAlert,
      onTrafficUpdate: applyTrafficUpdate,
      onSignalChanged: applySignalChanged,
      onAmbulanceDetected: applyEmergencyEvent,
      onCongestionAlert: (payload) =>
        addAlert({
          id: `congestion-${Date.now()}`,
          title: "Congestion propagation alert",
          detail: typeof payload.message_type === "string" ? payload.message_type : "Nearby junction reports traffic pressure.",
          severity: "warning",
          source: "Swarm Mesh",
          timestamp: "Now",
        }),
      onAIDecisionUpdate: applyAIDecisionUpdate,
    });

    const fallback = window.setInterval(ingestRealtimeTick, connection.connected ? 2500 : 1200);

    return () => {
      window.clearInterval(fallback);
      connection.disconnect();
    };
  }, [addAlert, applyAIDecisionUpdate, applyEmergencyEvent, applySignalChanged, applyTrafficUpdate, hydrateFromBackend, ingestRealtimeTick]);
}
