"use client";

import { AlertCircle, Info, Siren } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTrafficStore } from "@/store/traffic-store";
import type { AlertSeverity } from "@/types/traffic";

const severityConfig: Record<AlertSeverity, { className: string; Icon: typeof AlertCircle }> = {
  critical: { className: "border-red-300/30 bg-red-500/10 text-red-100", Icon: Siren },
  warning: { className: "border-yellow-300/30 bg-yellow-400/10 text-yellow-100", Icon: AlertCircle },
  info: { className: "border-blue-300/30 bg-blue-500/10 text-blue-100", Icon: Info },
};

export function AlertsCenter() {
  const alerts = useTrafficStore((state) => state.alerts);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Realtime Alerts Center</CardTitle>
        <p className="text-sm text-cyan-100/60">Auto-refreshing city event feed with severity routing.</p>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const config = severityConfig[alert.severity];
          const Icon = config.Icon;
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex gap-3 rounded-md border border-cyan-300/15 bg-slate-950/45 p-4"
            >
              <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-md border ${config.className}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-cyan-50">{alert.title}</p>
                  <Badge className={config.className}>{alert.severity.toUpperCase()}</Badge>
                </div>
                <p className="mt-1 text-sm text-cyan-100/65">{alert.detail}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-cyan-100/40">
                  {alert.source} - {alert.timestamp}
                </p>
              </div>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
}
