"use client";

import { motion } from "framer-motion";
import { Camera, Car, CircleDot, Timer, Truck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useSelectedJunction } from "@/store/traffic-store";
import { trafficTone } from "@/lib/utils";
import type { SignalColor } from "@/types/traffic";

const signalTone: Record<SignalColor, string> = {
  GREEN: "bg-cyber-green shadow-[0_0_14px_rgba(49,255,156,0.9)]",
  YELLOW: "bg-cyber-amber shadow-[0_0_14px_rgba(255,209,102,0.9)]",
  RED: "bg-cyber-red shadow-[0_0_14px_rgba(255,59,107,0.9)]",
};

function DetectionOverlay() {
  const boxes = [
    "left-[12%] top-[38%] h-10 w-20",
    "left-[46%] top-[30%] h-12 w-24",
    "left-[66%] top-[52%] h-10 w-20",
    "left-[27%] top-[58%] h-8 w-16",
  ];
  return (
    <div className="relative aspect-video overflow-hidden rounded-md border border-cyan-300/15 bg-slate-900">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,rgba(15,23,42,0.2),rgba(19,247,255,0.12)),linear-gradient(90deg,transparent_48%,rgba(19,247,255,0.12)_49%,transparent_51%)]" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-cyan-300/10 to-transparent animate-scan" />
      {boxes.map((box) => (
        <motion.div
          key={box}
          className={`absolute ${box} border border-cyber-green/80 bg-emerald-400/5`}
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <span className="absolute -top-5 left-0 text-[10px] text-emerald-200">vehicle</span>
        </motion.div>
      ))}
      <div className="absolute left-3 top-3 flex items-center gap-2 rounded border border-cyan-300/20 bg-slate-950/70 px-2 py-1 text-xs text-cyan-100">
        <Camera className="h-3.5 w-3.5" />
        CCTV AI Overlay
      </div>
    </div>
  );
}

export function JunctionPanel() {
  const junction = useSelectedJunction();
  const vehicleRows = [
    ["Cars", junction.vehicles.cars, Car],
    ["Bikes", junction.vehicles.bikes, CircleDot],
    ["Trucks", junction.vehicles.trucks, Truck],
    ["Ambulances", junction.vehicles.ambulances, Timer],
  ] as const;
  const signals = [
    ["North", junction.signal.north],
    ["East", junction.signal.east],
    ["West", junction.signal.west],
    ["South", junction.signal.south],
  ] as const;
  const queues = Object.entries(junction.queue);

  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle>Live Junction Monitoring</CardTitle>
            <p className="mt-1 text-lg font-semibold text-cyan-50">{junction.name}</p>
            <p className="text-sm text-cyan-100/55">{junction.district}</p>
          </div>
          <Badge className={trafficTone(junction.trafficLevel)}>{junction.trafficLevel.toUpperCase()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <DetectionOverlay />
        <div className="grid grid-cols-2 gap-3">
          {vehicleRows.map(([label, value, Icon]) => (
            <div key={label} className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyan-100/50">
                <Icon className="h-4 w-4" />
                {label}
              </div>
              <p className="mt-2 text-2xl font-semibold text-cyan-50">{value}</p>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/55">Density</p>
            <span className="text-sm text-cyan-50">{junction.density}%</span>
          </div>
          <Progress value={junction.density} indicatorClassName="bg-gradient-to-r from-cyber-green via-cyber-amber to-cyber-red" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {signals.map(([lane, state]) => (
            <div key={lane} className="flex items-center justify-between rounded-md border border-cyan-300/15 bg-slate-950/40 px-3 py-2">
              <span className="text-sm text-cyan-100">{lane}</span>
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span className={`h-3 w-3 rounded-full ${signalTone[state]}`} />
                {state}
              </span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {queues.map(([lane, value]) => (
            <div key={lane}>
              <div className="mb-1 flex justify-between text-xs uppercase tracking-[0.14em] text-cyan-100/55">
                <span>{lane}</span>
                <span>{value}m queue</span>
              </div>
              <Progress value={value} indicatorClassName="bg-cyber-cyan" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
