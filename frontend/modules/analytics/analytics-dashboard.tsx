"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Leaf, Timer, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { analyticsData, kpis } from "@/data/mock-traffic";

export function AnalyticsDashboard() {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} kpi={kpi} />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Hourly Traffic</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData}>
                <CartesianGrid stroke="rgba(19,247,255,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(207,250,254,0.55)" />
                <YAxis stroke="rgba(207,250,254,0.55)" />
                <Tooltip contentStyle={{ background: "rgba(2, 6, 23, 0.92)", border: "1px solid rgba(19,247,255,0.2)" }} />
                <Bar dataKey="vehicles" fill="#13f7ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Signal Efficiency and Congestion</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData}>
                <CartesianGrid stroke="rgba(19,247,255,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(207,250,254,0.55)" />
                <YAxis stroke="rgba(207,250,254,0.55)" />
                <Tooltip contentStyle={{ background: "rgba(2, 6, 23, 0.92)", border: "1px solid rgba(19,247,255,0.2)" }} />
                <Line type="monotone" dataKey="efficiency" stroke="#31ff9c" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="congestion" stroke="#ff3b6b" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Emergency response time", "5.2 min avg", Timer, "Down 64% from baseline"],
          ["Fuel savings", "18.4K liters", Zap, "From reduced idle time"],
          ["Pollution reduction", "27.8 tons CO2", Leaf, "Projected daily impact"],
        ].map(([title, value, Icon, detail]) => (
          <Card key={title as string} className="p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-md border border-cyan-300/25 bg-cyan-300/10 text-cyber-cyan">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/55">{title as string}</p>
                <p className="mt-1 text-2xl font-semibold text-cyan-50">{value as string}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-cyan-100/60">{detail as string}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
