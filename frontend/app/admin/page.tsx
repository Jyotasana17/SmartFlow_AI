import { Database, KeyRound, Network, RadioTower, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const settings = [
    ["Mapbox telemetry", "Live map rendering with holographic fallback", RadioTower],
    ["Signal API gateway", "Protected actuation endpoint policy", Network],
    ["Operator roles", "Admin, traffic engineer, emergency dispatcher", KeyRound],
    ["Data retention", "90 days hot analytics, 24 months cold storage", Database],
    ["Safety approvals", "Human confirmation for destructive overrides", ShieldCheck],
    ["Optimization profile", "Balanced throughput and emergency priority", SlidersHorizontal],
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Panel</CardTitle>
        <p className="text-sm text-cyan-100/60">Enterprise control plane for SmartFlow AI operators.</p>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {settings.map(([title, detail, Icon]) => (
          <div key={title} className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyber-cyan">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-cyan-50">{title}</p>
                <p className="text-sm text-cyan-100/55">{detail}</p>
              </div>
            </div>
            <Button className="mt-4 w-full" variant="outline">
              Configure
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
