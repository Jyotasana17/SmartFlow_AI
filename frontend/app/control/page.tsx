import { BrainCircuit, Cable, Cpu, GitMerge, ShieldCheck } from "lucide-react";
import { ExplainableAIPanel } from "@/modules/ai/explainable-ai-panel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function AIControlPage() {
  const controlLoops = [
    ["Vision detection", 96, Cpu],
    ["Queue estimation", 91, GitMerge],
    ["Signal actuation", 98, Cable],
    ["Safety guardrails", 100, ShieldCheck],
  ] as const;

  return (
    <div className="space-y-4">
      <ExplainableAIPanel />
      <Card>
        <CardHeader>
          <CardTitle>AI Signal Control Fabric</CardTitle>
          <p className="text-sm text-cyan-100/60">Closed-loop decision pipeline from camera inference to signal actuation.</p>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {controlLoops.map(([label, value, Icon]) => (
            <div key={label} className="rounded-md border border-cyan-300/15 bg-slate-950/45 p-4">
              <div className="flex items-center gap-2 text-cyan-100">
                <Icon className="h-4 w-4 text-cyber-cyan" />
                {label}
              </div>
              <p className="mt-3 text-3xl font-semibold text-cyan-50">{value}%</p>
              <Progress value={value} className="mt-3" indicatorClassName="bg-cyber-cyan" />
            </div>
          ))}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Animated Decision Flow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {["Camera AI", "Predictor", "Optimizer", "Signal Controller"].map((step, index) => (
              <div key={step} className="relative rounded-md border border-cyan-300/15 bg-cyan-300/5 p-5 text-center">
                <BrainCircuit className="mx-auto h-7 w-7 text-cyber-cyan" />
                <p className="mt-3 font-semibold text-cyan-50">{step}</p>
                {index < 3 && <div className="absolute right-[-18px] top-1/2 hidden h-px w-9 bg-cyan-300/40 md:block" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
