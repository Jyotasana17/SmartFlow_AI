import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { TrafficLevel } from "@/types/traffic";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function trafficTone(level: TrafficLevel) {
  return {
    smooth: "text-cyber-green border-cyber-green/40 bg-cyber-green/10",
    medium: "text-cyber-amber border-cyber-amber/40 bg-cyber-amber/10",
    heavy: "text-cyber-red border-cyber-red/40 bg-cyber-red/10",
    emergency: "text-cyber-blue border-cyber-blue/50 bg-cyber-blue/10",
  }[level];
}

export function trafficColor(level: TrafficLevel) {
  return {
    smooth: "#31ff9c",
    medium: "#ffd166",
    heavy: "#ff3b6b",
    emergency: "#287dff",
  }[level];
}

export function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
