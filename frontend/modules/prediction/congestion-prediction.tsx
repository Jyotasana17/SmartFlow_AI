"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Flame, Gauge, WandSparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { predictionData } from "@/data/mock-traffic";

export function CongestionPrediction() {
  const [window, setWindow] = useState("15 mins");

  return (
    <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Congestion Prediction</CardTitle>
              <p className="mt-2 text-xl font-semibold text-cyan-50">AI forecast curve and optimized response</p>
            </div>
            <Tabs tabs={["5 mins", "15 mins", "Peak hour"]} value={window} onChange={setWindow} className="w-full md:w-96" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={predictionData}>
                <CartesianGrid stroke="rgba(19,247,255,0.12)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(207,250,254,0.55)" />
                <YAxis stroke="rgba(207,250,254,0.55)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(2, 6, 23, 0.92)",
                    border: "1px solid rgba(19,247,255,0.2)",
                    color: "#ecfeff",
                  }}
                />
                <Line type="monotone" dataKey="congestion" stroke="#ff3b6b" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="optimized" stroke="#31ff9c" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Future Heatmap</CardTitle>
          <p className="text-sm text-cyan-100/60">Red zones indicate predicted congestion intensity.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-64 overflow-hidden rounded-md border border-cyan-300/15 bg-slate-950">
            <div className="absolute inset-0 bg-city-grid bg-[length:38px_38px] opacity-50" />
            {[
              "left-[18%] top-[32%] h-28 w-28",
              "left-[52%] top-[46%] h-36 w-36",
              "left-[66%] top-[15%] h-20 w-20",
            ].map((blob) => (
              <div key={blob} className={`absolute ${blob} rounded-full bg-red-500/35 blur-2xl`} />
            ))}
            <div className="absolute inset-x-6 bottom-6 rounded-md border border-red-300/20 bg-red-500/10 p-3 text-sm text-red-100">
              Market Road reaches critical saturation unless eastbound inflow is metered.
            </div>
          </div>
          <div className="rounded-md border border-emerald-300/20 bg-emerald-400/10 p-4">
            <div className="flex items-center gap-2 text-emerald-100">
              <WandSparkles className="h-4 w-4" />
              Recommendation
            </div>
            <p className="mt-2 text-sm text-emerald-50">Increase North lane green duration by 20% and pre-stage West diversion plan.</p>
          </div>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Traffic Density Timeline</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-[1fr_260px]">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={predictionData}>
                <defs>
                  <linearGradient id="density" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#13f7ff" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="#13f7ff" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(19,247,255,0.1)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(207,250,254,0.55)" />
                <YAxis stroke="rgba(207,250,254,0.55)" />
                <Tooltip contentStyle={{ background: "rgba(2, 6, 23, 0.92)", border: "1px solid rgba(19,247,255,0.2)" }} />
                <Area type="monotone" dataKey="density" stroke="#13f7ff" fill="url(#density)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {[
              ["Forecast confidence", "94%", Gauge],
              ["Critical zones", "3", Flame],
              ["Adaptive plans ready", "7", WandSparkles],
            ].map(([label, value, Icon]) => (
              <div key={label as string} className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-4">
                <div className="flex items-center gap-2 text-cyan-100/60">
                  <Icon className="h-4 w-4" />
                  {label as string}
                </div>
                <p className="mt-2 text-2xl font-semibold text-cyan-50">{value as string}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
