import { AlertsCenter } from "@/modules/alerts/alerts-center";
import { AIInsightsPanel } from "@/modules/ai/ai-insights-panel";

export default function AlertsPage() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_0.6fr]">
      <AlertsCenter />
      <AIInsightsPanel />
    </div>
  );
}
