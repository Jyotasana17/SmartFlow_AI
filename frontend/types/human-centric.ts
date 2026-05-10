/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface StressLevel {
  score: number; // 0-100
  status: 'Calm' | 'Building' | 'Stressed' | 'Critical';
  contributors: {
    waitingTime: number;
    congestion: number;
    honking: number;
    missedCycles: number;
  };
}

export interface HumanImpact {
  honkingReduced: number;
  roadRageReduced: number;
  driverSatisfaction: number;
  accidentRiskReduced: number;
}

export interface EnvironmentalImpact {
  co2SavedKg: number;
  fuelSavedLiters: number;
  idleTimeReductionPercent: number;
}

export interface AIDecision {
  timestamp: string;
  action: string;
  reason: string;
  stressInfluence: number;
  confidence: number;
}

export interface EmergencyStatus {
  active: boolean;
  type: 'Ambulance' | 'Fire' | 'Police' | null;
  etaReductionSeconds: number;
  livesSavedEstimate: number;
  junction: string | null;
}

export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'critical' | 'emergency';
  message: string;
  timestamp: Date;
}
