import { Alert, AIDecision, EmergencyStatus, HumanImpact, StressLevel, EnvironmentalImpact } from '@/types/human-centric';

export const INITIAL_STRESS: StressLevel = {
  score: 42,
  status: 'Calm',
  contributors: {
    waitingTime: 35,
    congestion: 20,
    honking: 15,
    missedCycles: 30,
  }
};

export const INITIAL_HUMAN_IMPACT: HumanImpact = {
  honkingReduced: 28,
  roadRageReduced: 15,
  driverSatisfaction: 85,
  accidentRiskReduced: 12,
};

export const INITIAL_ENVIRONMENTAL_IMPACT: EnvironmentalImpact = {
  co2SavedKg: 1240,
  fuelSavedLiters: 450,
  idleTimeReductionPercent: 22,
};

export const INITIAL_AI_DECISIONS: AIDecision[] = [
  {
    timestamp: '10:45:22',
    action: 'Extended Green Wave at North Junction',
    reason: 'Detected building stress patterns due to 3 missed cycles in the east-bound lane. Adjusted timing by +12s to clear backup.',
    stressInfluence: 85,
    confidence: 98,
  },
  {
    timestamp: '10:42:05',
    action: 'Priority Clearing for South Corridor',
    reason: 'Emergency ambulance detected entering North Junction. Synchronizing signals for a 4-cycle priority wave.',
    stressInfluence: 15,
    confidence: 100,
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: '1',
    type: 'warning',
    message: 'Congestion threshold exceeded at East-West crossing - driver stress rising.',
    timestamp: new Date(),
  },
  {
    id: '2',
    type: 'emergency',
    message: 'Emergency vehicle approaching North Junction - clearing route.',
    timestamp: new Date(),
  }
];

export const INITIAL_EMERGENCY: EmergencyStatus = {
  active: false,
  type: null,
  etaReductionSeconds: 125,
  livesSavedEstimate: 42,
  junction: null,
};
