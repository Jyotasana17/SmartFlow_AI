"use client";

import { AlertTriangle } from "lucide-react";
import { useTrafficStore } from "@/store/traffic-store";

export function AlertTicker() {
  const alerts = useTrafficStore((state) => state.alerts);
  const visibleAlerts = alerts.slice(0, 4);

  return (
    <div className="mb-3 overflow-hidden rounded-md border border-cyan-300/15 bg-slate-950/60 px-3 py-2 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cyber-cyan">
          <AlertTriangle className="h-4 w-4" />
          Live Alert Ticker
        </div>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-[shimmer_18s_linear_infinite] gap-8">
            {[...visibleAlerts, ...visibleAlerts].map((alert, index) => (
              <span key={`${alert.id}-${index}`} className="text-sm text-cyan-100/75">
                {alert.title}: {alert.detail}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
