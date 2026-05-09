"use client";

import { Activity, Ambulance, Gauge, Timer } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTrafficStore } from "@/store/traffic-store";

export function TrafficStatsPanel() {
  const junctions = useTrafficStore((state) => state.junctions);
  const totalVehicles = junctions.reduce((sum, junction) => sum + junction.vehicles.cars + junction.vehicles.bikes + junction.vehicles.trucks, 0);
  const avgDensity = Math.round(junctions.reduce((sum, junction) => sum + junction.density, 0) / junctions.length);
  const emergencyCount = junctions.reduce((sum, junction) => sum + junction.vehicles.ambulances, 0);

  const stats = [
    ["Vehicles live", totalVehicles.toLocaleString("en-IN"), Activity, "Across monitored junctions"],
    ["Avg density", `${avgDensity}%`, Gauge, "Adaptive cycle input"],
    ["Wait reduction", "38%", Timer, "Compared to fixed timing"],
    ["Ambulances", emergencyCount.toString(), Ambulance, "Tracked in corridor"],
  ] as const;

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, Icon, detail]) => (
        <Card key={label} className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/50">{label}</p>
              <p className="mt-2 text-2xl font-semibold text-cyan-50">{value}</p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyber-cyan">
              <Icon className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-3 text-sm text-cyan-100/55">{detail}</p>
        </Card>
      ))}
    </div>
  );
}
