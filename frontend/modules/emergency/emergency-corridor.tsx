"use client";

import { motion } from "framer-motion";
import { Ambulance, HeartPulse, ShieldCheck, TimerReset, TrafficCone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useTrafficStore } from "@/store/traffic-store";

export function EmergencyCorridor() {
  const emergency = useTrafficStore((state) => state.emergency);
  const toggleEmergencyMode = useTrafficStore((state) => state.toggleEmergencyMode);

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(40,125,255,0.25),transparent_34%)]" />
      <CardHeader className="relative">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Emergency Corridor</CardTitle>
            <p className="mt-2 text-2xl font-semibold text-cyan-50">Blue-wave ambulance priority system</p>
          </div>
          <Button variant={emergency.active ? "destructive" : "default"} onClick={toggleEmergencyMode}>
            <Ambulance className="h-4 w-4" />
            {emergency.active ? "Corridor Active" : "Activate Corridor"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-5">
        <div className="relative h-56 overflow-hidden rounded-lg border border-blue-300/20 bg-slate-950/70">
          <div className="absolute inset-0 bg-city-grid bg-[length:48px_48px] opacity-55" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path
              d="M 6 74 C 28 52, 31 29, 51 47 S 74 60, 94 24"
              fill="none"
              stroke="#287dff"
              strokeDasharray="8 5"
              strokeWidth="2.8"
              className="animate-pulse-route drop-shadow-[0_0_12px_rgba(40,125,255,0.95)]"
            />
          </svg>
          {[16, 35, 55, 76].map((left, index) => (
            <motion.div
              key={left}
              className="absolute top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-md border border-emerald-300/30 bg-emerald-400/10"
              style={{ left: `${left}%` }}
              animate={{ boxShadow: ["0 0 0 rgba(49,255,156,0)", "0 0 24px rgba(49,255,156,0.75)", "0 0 0 rgba(49,255,156,0)"] }}
              transition={{ duration: 1.2, delay: index * 0.35, repeat: Infinity }}
            >
              <TrafficCone className="h-5 w-5 text-cyber-green" />
            </motion.div>
          ))}
          <motion.div
            className="absolute top-[54%] text-cyber-blue"
            style={{ left: `${emergency.ambulancePosition}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 16 }}
          >
            <Ambulance className="h-10 w-10 -translate-x-1/2 drop-shadow-[0_0_18px_rgba(40,125,255,1)]" />
          </motion.div>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-red-300/20 bg-red-500/10 p-4">
            <div className="flex items-center gap-2 text-red-100/75">
              <TimerReset className="h-4 w-4" />
              Without AI
            </div>
            <p className="mt-2 text-3xl font-semibold text-red-100">{emergency.etaWithoutAI} mins</p>
          </div>
          <div className="rounded-md border border-blue-300/25 bg-blue-500/10 p-4 shadow-glow-blue">
            <div className="flex items-center gap-2 text-blue-100/75">
              <ShieldCheck className="h-4 w-4" />
              With SmartFlow AI
            </div>
            <p className="mt-2 text-3xl font-semibold text-cyber-blue">{emergency.etaWithAI} mins</p>
          </div>
          <div className="rounded-md border border-emerald-300/25 bg-emerald-400/10 p-4">
            <div className="flex items-center gap-2 text-emerald-100/75">
              <HeartPulse className="h-4 w-4" />
              Potential Lives Saved
            </div>
            <p className="mt-2 text-3xl font-semibold text-cyber-green">{emergency.livesSaved}</p>
          </div>
        </div>
        <div>
          <div className="mb-2 flex justify-between text-sm text-cyan-100/70">
            <span>Ambulance route progress</span>
            <span>{Math.round(emergency.ambulancePosition)}%</span>
          </div>
          <Progress value={emergency.ambulancePosition} indicatorClassName="bg-cyber-blue" />
        </div>
      </CardContent>
    </Card>
  );
}
