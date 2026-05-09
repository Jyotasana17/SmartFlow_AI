import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KPI } from "@/types/traffic";

const tones = {
  cyan: "text-cyber-cyan",
  green: "text-cyber-green",
  amber: "text-cyber-amber",
  red: "text-cyber-red",
  violet: "text-cyber-violet",
};

export function MetricCard({ kpi, className }: { kpi: KPI; className?: string }) {
  return (
    <Card className={cn("relative overflow-hidden p-4", className)}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/55">{kpi.label}</p>
          <p className={cn("mt-2 text-2xl font-semibold neon-text", tones[kpi.tone])}>{kpi.value}</p>
        </div>
        <span className="flex items-center gap-1 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-200">
          <ArrowUpRight className="h-3 w-3" />
          {kpi.delta}
        </span>
      </div>
    </Card>
  );
}
