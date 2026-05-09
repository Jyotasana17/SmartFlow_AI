import { AIInsightsPanel } from "@/modules/ai/ai-insights-panel";
import { ExplainableAIPanel } from "@/modules/ai/explainable-ai-panel";
import { SmartCityMap } from "@/modules/dashboard/smart-city-map";
import { TrafficStatsPanel } from "@/modules/dashboard/traffic-stats-panel";
import { EmergencyCorridor } from "@/modules/emergency/emergency-corridor";
import { JunctionPanel } from "@/modules/monitoring/junction-panel";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <TrafficStatsPanel />
      <section className="grid min-h-[640px] gap-4 xl:grid-cols-[1.45fr_0.85fr]">
        <SmartCityMap />
        <div className="space-y-4">
          <JunctionPanel />
        </div>
      </section>
      <section className="grid gap-4 xl:grid-cols-[1fr_0.72fr]">
        <ExplainableAIPanel />
        <AIInsightsPanel />
      </section>
      <EmergencyCorridor />
    </div>
  );
}
