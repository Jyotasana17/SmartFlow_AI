import { SmartCityMap } from "@/modules/dashboard/smart-city-map";
import { JunctionPanel } from "@/modules/monitoring/junction-panel";
import { ExplainableAIPanel } from "@/modules/ai/explainable-ai-panel";

export default function MonitoringPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-4">
        <SmartCityMap />
        <ExplainableAIPanel />
      </div>
      <JunctionPanel />
    </div>
  );
}
