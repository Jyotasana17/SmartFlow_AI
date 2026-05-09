import { EmergencyCorridor } from "@/modules/emergency/emergency-corridor";
import { SmartCityMap } from "@/modules/dashboard/smart-city-map";

export default function EmergencyPage() {
  return (
    <div className="space-y-4">
      <EmergencyCorridor />
      <SmartCityMap />
    </div>
  );
}
