import { DigitalTwinSimulation } from "@/modules/simulation/digital-twin-simulation";
import { CongestionPrediction } from "@/modules/prediction/congestion-prediction";

export default function SimulationPage() {
  return (
    <div className="space-y-4">
      <DigitalTwinSimulation />
      <CongestionPrediction />
    </div>
  );
}
