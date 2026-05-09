"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  tabs: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("grid rounded-md border border-cyan-300/20 bg-slate-950/45 p-1", className)} style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "rounded px-3 py-2 text-xs font-medium text-cyan-100/70 transition",
            value === tab && "bg-cyan-300/15 text-cyan-50 shadow-glow",
          )}
          onClick={() => onChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
