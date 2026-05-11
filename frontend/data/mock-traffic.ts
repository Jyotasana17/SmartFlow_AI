import type { Alert, Junction, KPI, PredictionPoint, TrafficRoute } from "@/types/traffic";

export const cityCenter = { lng: 77.5946, lat: 12.9716 };

export const junctions: Junction[] = [
  {
    id: "j-01",
    name: "Junction 1 - MG Road Grid",
    district: "Central Business Zone",
    coordinates: { lng: 77.6101, lat: 12.9758 },
    trafficLevel: "medium",
    density: 62,
    vehicles: { cars: 52, bikes: 23, trucks: 7, ambulances: 1 },
    queue: { north: 72, east: 44, west: 58, south: 31 },
    signal: { north: "GREEN", east: "RED", west: "YELLOW", south: "RED", secondsLeft: 42 },
    aiDecision: {
      confidence: 94,
      lane: "North",
      greenSeconds: 60,
      predictedCongestion: "Congestion predicted in 3 mins",
      averageWait: "118 sec",
      suggestion: "Increase North green duration by 20% and release West in staggered phase.",
      reasons: [
        "52 vehicles detected in the north approach",
        "Wait time exceeded adaptive threshold",
        "Bus lane spillover risk detected near market entry",
      ],
    },
    cameras: [
      { id: "cam-01-n", lane: "north", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-busy-city-at-night-4521-large.mp4" },
      { id: "cam-01-s", lane: "south", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-busy-street-in-the-city-at-night-4519-large.mp4" },
      { id: "cam-01-e", lane: "east", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-busy-city-street-4518-large.mp4" },
      { id: "cam-01-w", lane: "west", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-busy-city-street-4517-large.mp4" },
    ],
  },
  {
    id: "j-02",
    name: "Junction 2 - Market Road",
    district: "Commercial Spine",
    coordinates: { lng: 77.6006, lat: 12.9667 },
    trafficLevel: "heavy",
    density: 88,
    vehicles: { cars: 94, bikes: 61, trucks: 12, ambulances: 0 },
    queue: { north: 88, east: 82, west: 76, south: 65 },
    signal: { north: "RED", east: "GREEN", west: "RED", south: "YELLOW", secondsLeft: 18 },
    aiDecision: {
      confidence: 91,
      lane: "East",
      greenSeconds: 52,
      predictedCongestion: "Peak lock risk in 5 mins",
      averageWait: "164 sec",
      suggestion: "Hold East green, meter West inflow, and divert two blocks south.",
      reasons: [
        "Abnormal Friday-like volume pattern detected",
        "East queue length is crossing junction storage capacity",
        "Downstream camera confirms available receiving capacity",
      ],
    },
    cameras: [
      { id: "cam-02-n", lane: "north", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-busy-city-at-night-4521-large.mp4" },
      { id: "cam-02-s", lane: "south", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-busy-street-in-the-city-at-night-4519-large.mp4" },
      { id: "cam-02-e", lane: "east", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-busy-city-street-4518-large.mp4" },
      { id: "cam-02-w", lane: "west", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-busy-city-street-4517-large.mp4" },
    ],
  },
  {
    id: "j-03",
    name: "Junction 3 - Hospital Gate",
    district: "Medical Corridor",
    coordinates: { lng: 77.5859, lat: 12.9799 },
    trafficLevel: "emergency",
    density: 43,
    vehicles: { cars: 31, bikes: 18, trucks: 3, ambulances: 1 },
    queue: { north: 28, east: 36, west: 22, south: 41 },
    signal: { north: "GREEN", east: "RED", west: "RED", south: "GREEN", secondsLeft: 55 },
    aiDecision: {
      confidence: 97,
      lane: "South",
      greenSeconds: 75,
      predictedCongestion: "No corridor blockage expected",
      averageWait: "46 sec",
      suggestion: "Maintain blue corridor and pre-clear two downstream signals.",
      reasons: [
        "Ambulance transponder verified within corridor",
        "South approach has highest life-critical priority",
        "Adjacent lanes can absorb temporary red extension",
      ],
    },
    cameras: [
      { id: "cam-03-n", lane: "north", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-busy-city-at-night-4521-large.mp4" },
      { id: "cam-03-s", lane: "south", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-busy-street-in-the-city-at-night-4519-large.mp4" },
      { id: "cam-03-e", lane: "east", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-busy-city-street-4518-large.mp4" },
      { id: "cam-03-w", lane: "west", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-busy-city-street-4517-large.mp4" },
    ],
  },
  {
    id: "j-04",
    name: "Junction 4 - Tech Park Loop",
    district: "Innovation District",
    coordinates: { lng: 77.6258, lat: 12.9861 },
    trafficLevel: "smooth",
    density: 34,
    vehicles: { cars: 28, bikes: 35, trucks: 4, ambulances: 0 },
    queue: { north: 18, east: 26, west: 34, south: 21 },
    signal: { north: "YELLOW", east: "GREEN", west: "RED", south: "RED", secondsLeft: 29 },
    aiDecision: {
      confidence: 89,
      lane: "East",
      greenSeconds: 38,
      predictedCongestion: "Stable for next 15 mins",
      averageWait: "39 sec",
      suggestion: "Keep adaptive cycle short to preserve pedestrian crossing windows.",
      reasons: [
        "Balanced approach volume across all lanes",
        "No spillback detected in downstream links",
        "Pedestrian demand is rising near metro exit",
      ],
    },
    cameras: [
      { id: "cam-04-n", lane: "north", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-busy-city-at-night-4521-large.mp4" },
      { id: "cam-04-s", lane: "south", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-busy-street-in-the-city-at-night-4519-large.mp4" },
      { id: "cam-04-e", lane: "east", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-busy-city-street-4518-large.mp4" },
      { id: "cam-04-w", lane: "west", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-busy-city-street-4517-large.mp4" },
    ],
  },
  {
    id: "j-05",
    name: "Junction 5 - Stadium Flyover",
    district: "Event Zone",
    coordinates: { lng: 77.5792, lat: 12.9634 },
    trafficLevel: "medium",
    density: 57,
    vehicles: { cars: 47, bikes: 42, trucks: 9, ambulances: 0 },
    queue: { north: 52, east: 47, west: 38, south: 33 },
    signal: { north: "RED", east: "YELLOW", west: "GREEN", south: "RED", secondsLeft: 34 },
    aiDecision: {
      confidence: 86,
      lane: "West",
      greenSeconds: 44,
      predictedCongestion: "Event dispersal pressure in 15 mins",
      averageWait: "81 sec",
      suggestion: "Extend West for one phase and prepare event routing template.",
      reasons: [
        "Stadium exit demand is rising faster than baseline",
        "West flyover has clear discharge capacity",
        "Ride-share pickup zone is nearing saturation",
      ],
    },
    cameras: [
      { id: "cam-05-n", lane: "north", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-traffic-in-a-busy-city-at-night-4521-large.mp4" },
      { id: "cam-05-s", lane: "south", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-busy-street-in-the-city-at-night-4519-large.mp4" },
      { id: "cam-05-e", lane: "east", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-busy-city-street-4518-large.mp4" },
      { id: "cam-05-w", lane: "west", type: "video", url: "https://assets.mixkit.co/videos/preview/mixkit-cars-driving-on-a-busy-city-street-4517-large.mp4" },
    ],
  },
];

export const trafficRoutes: TrafficRoute[] = [
  {
    id: "r-01",
    name: "Central Pulse",
    level: "medium",
    coordinates: [
      { lng: 77.5792, lat: 12.9634 },
      { lng: 77.5946, lat: 12.9716 },
      { lng: 77.6101, lat: 12.9758 },
      { lng: 77.6258, lat: 12.9861 },
    ],
  },
  {
    id: "r-02",
    name: "Market Load",
    level: "heavy",
    coordinates: [
      { lng: 77.5859, lat: 12.9799 },
      { lng: 77.6006, lat: 12.9667 },
      { lng: 77.6101, lat: 12.9758 },
    ],
  },
  {
    id: "r-03",
    name: "Blue Medical Corridor",
    level: "emergency",
    coordinates: [
      { lng: 77.5792, lat: 12.9634 },
      { lng: 77.5859, lat: 12.9799 },
      { lng: 77.6006, lat: 12.9667 },
      { lng: 77.6101, lat: 12.9758 },
    ],
  },
];

export const alerts: Alert[] = [
  {
    id: "a-01",
    title: "Accident detected",
    detail: "Two-lane obstruction near Market Road northbound.",
    severity: "critical",
    source: "Vision AI",
    timestamp: "Now",
  },
  {
    id: "a-02",
    title: "Ambulance approaching",
    detail: "ETA to Hospital Gate corridor is 4 min 32 sec.",
    severity: "info",
    source: "Emergency Mesh",
    timestamp: "1 min ago",
  },
  {
    id: "a-03",
    title: "Junction overload",
    detail: "Market Road density crossed 85 percent.",
    severity: "warning",
    source: "Predictive Engine",
    timestamp: "2 min ago",
  },
  {
    id: "a-04",
    title: "Camera offline",
    detail: "Tech Park Loop camera 2 switched to radar fallback.",
    severity: "warning",
    source: "Device Monitor",
    timestamp: "4 min ago",
  },
];

export const predictionData: PredictionPoint[] = [
  { time: "Now", congestion: 58, optimized: 42, density: 61 },
  { time: "5m", congestion: 71, optimized: 49, density: 67 },
  { time: "10m", congestion: 83, optimized: 52, density: 74 },
  { time: "15m", congestion: 76, optimized: 47, density: 69 },
  { time: "Peak", congestion: 91, optimized: 61, density: 82 },
];

export const analyticsData = [
  { time: "06", vehicles: 3200, congestion: 24, efficiency: 81, emissions: 71 },
  { time: "09", vehicles: 8200, congestion: 78, efficiency: 68, emissions: 88 },
  { time: "12", vehicles: 6100, congestion: 52, efficiency: 79, emissions: 74 },
  { time: "15", vehicles: 7000, congestion: 61, efficiency: 76, emissions: 79 },
  { time: "18", vehicles: 9600, congestion: 84, efficiency: 72, emissions: 91 },
  { time: "21", vehicles: 4200, congestion: 36, efficiency: 86, emissions: 63 },
];

export const kpis: KPI[] = [
  { label: "Avg Wait Reduction", value: "38%", delta: "+8.2%", tone: "green" },
  { label: "AI Accuracy", value: "94.7%", delta: "+2.1%", tone: "cyan" },
  { label: "Vehicles Processed", value: "128K", delta: "+14K", tone: "violet" },
  { label: "Emergency Response", value: "64%", delta: "+19%", tone: "green" },
];

export const aiInsights = [
  "Market Road experiences abnormal congestion every Friday after 6 PM.",
  "Junction 7 shows recurring overload patterns during rain.",
  "Hospital Gate corridor saves an estimated 9 minutes during blue-wave activation.",
  "Tech Park Loop can reduce idle time by 11% with shorter off-peak cycles.",
];
