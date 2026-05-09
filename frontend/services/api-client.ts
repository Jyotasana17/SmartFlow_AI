"use client";

import type { DashboardSnapshot } from "@/types/api";
import type { EmergencyStatus } from "@/types/traffic";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

class SmartFlowApiError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "SmartFlowApiError";
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new SmartFlowApiError(`SmartFlow API request failed: ${path}`, response.status);
  }

  return response.json() as Promise<T>;
}

export const smartFlowApi = {
  dashboard: () => request<DashboardSnapshot>("/api/v1/dashboard"),
  junctions: () => request<Pick<DashboardSnapshot, "junctions" | "routes" | "center">>("/api/v1/junctions"),
  trafficStatus: () => request<Pick<DashboardSnapshot, "junctions" | "alerts">>("/api/v1/traffic-status"),
  analytics: () => request<Record<string, unknown>>("/api/v1/analytics"),
  emergencyStatus: () => request<EmergencyStatus>("/api/v1/emergency-status"),
  signalControl: (payload: unknown) =>
    request("/api/v1/signal-control", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export { API_BASE_URL, SmartFlowApiError };
