"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ambulance, CloudRain, FerrisWheel, Gauge, ShieldAlert, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTrafficStore } from "@/store/traffic-store";
import type { SimulationScenario } from "@/types/traffic";

const scenarios: { id: SimulationScenario; label: string; Icon: typeof TriangleAlert }[] = [
  { id: "accident", label: "Simulate Accident", Icon: TriangleAlert },
  { id: "peak-hour", label: "Peak Hour", Icon: Gauge },
  { id: "heavy-rain", label: "Heavy Rain", Icon: CloudRain },
  { id: "festival", label: "Festival Traffic", Icon: FerrisWheel },
  { id: "emergency", label: "Emergency Mode", Icon: Ambulance },
];

export function DigitalTwinSimulation() {
  const [scenario, setScenario] = useState<SimulationScenario>("accident");
  const runScenario = useTrafficStore((state) => state.runScenario);

  const launch = (next: SimulationScenario) => {
    setScenario(next);
    runScenario(next);
  };

  return (
    <div className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Digital Twin Simulation</CardTitle>
          <p className="text-sm text-cyan-100/60">Inject smart city events and watch AI adaptive response.</p>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {scenarios.map(({ id, label, Icon }) => (
            <Button key={id} variant={scenario === id ? "default" : "outline"} className="justify-start" onClick={() => launch(id)}>
              <Icon className="h-4 w-4" />
              {label}
            </Button>
          ))}
        </CardContent>
      </Card>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Adaptive Flow Field</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-72 overflow-hidden rounded-lg border border-cyan-300/15 bg-slate-950">
            <div className="absolute inset-0 bg-city-grid bg-[length:42px_42px] opacity-55" />
            {[16, 30, 44, 58, 72].map((top, row) =>
              [12, 28, 44, 60, 76].map((left, col) => (
                <motion.span
                  key={`${top}-${left}`}
                  className="absolute h-1.5 w-10 rounded-full bg-cyan-300/60"
                  style={{ top: `${top}%`, left: `${left}%` }}
                  animate={{ x: [0, 20, 0], opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.8 + row * 0.1, delay: col * 0.12, repeat: Infinity }}
                />
              )),
            )}
            <div className="absolute bottom-4 left-4 right-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-md border border-red-300/20 bg-red-500/10 p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-red-100/70">Before AI optimization</p>
                <p className="mt-2 text-2xl font-semibold text-red-100">86% congestion</p>
                <Progress value={86} indicatorClassName="bg-cyber-red" className="mt-3" />
              </div>
              <div className="rounded-md border border-emerald-300/20 bg-emerald-400/10 p-3">
                <p className="text-xs uppercase tracking-[0.16em] text-emerald-100/70">After AI optimization</p>
                <p className="mt-2 text-2xl font-semibold text-emerald-100">49% congestion</p>
                <Progress value={49} indicatorClassName="bg-cyber-green" className="mt-3" />
              </div>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-md border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
              <ShieldAlert className="h-4 w-4" />
              Scenario: {scenario}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
