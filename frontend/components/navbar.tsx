"use client";

import { Bell, Crosshair, MapPin, Mic, Power, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLiveTime } from "@/hooks/use-live-time";
import { useVoiceControl } from "@/hooks/use-voice-control";
import { useTrafficStore } from "@/store/traffic-store";
import { cn } from "@/lib/utils";

export function Navbar() {
  const time = useLiveTime();
  const city = useTrafficStore((state) => state.city);
  const aiOnline = useTrafficStore((state) => state.aiOnline);
  const emergencyMode = useTrafficStore((state) => state.emergencyMode);
  const toggleEmergencyMode = useTrafficStore((state) => state.toggleEmergencyMode);
  const alerts = useTrafficStore((state) => state.alerts);
  const { listening, toggleListening } = useVoiceControl();

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-cyan-300/15 bg-slate-950/70 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-3 lg:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md border border-cyan-300/35 bg-cyan-300/10 shadow-glow">
            <Crosshair className="h-5 w-5 text-cyber-cyan" />
          </div>
          <div className="min-w-0">
            <p className="font-[var(--font-orbitron)] text-lg font-bold leading-none text-cyan-50 neon-text">SmartFlow AI</p>
            <p className="hidden text-xs uppercase tracking-[0.2em] text-cyan-100/50 sm:block">Urban Command Center</p>
          </div>
        </div>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Badge className="gap-2">
            <MapPin className="h-3.5 w-3.5" />
            {city}
          </Badge>
          <Badge className={cn("gap-2", aiOnline && "border-emerald-300/35 bg-emerald-400/10 text-emerald-100")}>
            <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(49,255,156,0.9)]" />
            AI Online
          </Badge>
          <Badge className="gap-2">
            <RadioTower className="h-3.5 w-3.5" />
            {time}
          </Badge>
        </div>

        <Button
          aria-label="Toggle voice control"
          size="icon"
          variant={listening ? "green" : "outline"}
          onClick={toggleListening}
          title="Voice control"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button aria-label="Notifications" size="icon" variant="outline" className="relative" title="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] text-white">
            {alerts.length}
          </span>
        </Button>
        <Button
          variant={emergencyMode ? "destructive" : "outline"}
          onClick={toggleEmergencyMode}
          className="hidden sm:inline-flex"
        >
          <Power className="h-4 w-4" />
          Emergency Mode
        </Button>
      </div>
    </header>
  );
}
