"use client";

import { motion } from "framer-motion";
import { BrainCircuit, GitBranch, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useSelectedJunction } from "@/store/traffic-store";

export function ExplainableAIPanel() {
  const junction = useSelectedJunction();
  const decision = junction.aiDecision;

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <svg className="h-full w-full" viewBox="0 0 400 260" preserveAspectRatio="none">
          {[40, 95, 160, 230, 320].map((x, index) => (
            <g key={x}>
              <circle cx={x} cy={50 + index * 32} r="4" fill="#13f7ff" opacity="0.75" />
              <path d={`M ${x} ${50 + index * 32} C ${x + 40} 20, ${x + 75} 210, ${x + 120} 130`} stroke="#13f7ff" strokeOpacity="0.3" fill="none" />
            </g>
          ))}
        </svg>
      </div>
      <CardHeader className="relative">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle>WHY AI MADE THIS DECISION</CardTitle>
            <p className="mt-2 text-xl font-semibold text-cyan-50">
              {decision.lane} lane received {decision.greenSeconds} sec green
            </p>
          </div>
          <motion.div
            className="grid h-14 w-14 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyber-cyan shadow-glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <BrainCircuit className="h-7 w-7" />
          </motion.div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        <div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-cyan-100/70">AI confidence</span>
            <span className="text-cyber-green">{decision.confidence}%</span>
          </div>
          <Progress value={decision.confidence} indicatorClassName="bg-gradient-to-r from-cyber-cyan to-cyber-green" />
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/50">Predicted congestion</p>
            <p className="mt-2 text-sm text-cyan-50">{decision.predictedCongestion}</p>
          </div>
          <div className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/50">Average wait</p>
            <p className="mt-2 text-sm text-cyan-50">{decision.averageWait}</p>
          </div>
          <div className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-3">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-100/50">Optimization</p>
            <p className="mt-2 text-sm text-cyan-50">{decision.suggestion}</p>
          </div>
        </div>
        <div className="space-y-3">
          {decision.reasons.map((reason, index) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center gap-3 rounded-md border border-cyan-300/15 bg-slate-950/45 p-3"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-cyber-cyan">
                <GitBranch className="h-4 w-4" />
              </span>
              <p className="text-sm text-cyan-50">{reason}</p>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-md border border-emerald-300/20 bg-emerald-400/10 p-3 text-sm text-emerald-100">
          <Sparkles className="h-4 w-4" />
          Adaptive signal plan deployed. Expected wait reduction is 38 percent across the next two cycles.
        </div>
      </CardContent>
    </Card>
  );
}
