"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { HumanImpact } from '@/types/human-centric';
import { cn } from '@/lib/utils';

interface HumanImpactMetricsProps {
  data: HumanImpact;
}

export const HumanImpactMetrics: React.FC<HumanImpactMetricsProps> = ({ data }) => {
  const metrics = [
    { label: 'Honking Reduction', value: `-${data.honkingReduced}%`, color: 'text-emerald-400', progress: data.honkingReduced },
    { label: 'Rage Diminishment', value: `-${data.roadRageReduced}%`, color: 'text-emerald-400', progress: data.roadRageReduced },
    { label: 'Citizen Satisfaction', value: `${data.driverSatisfaction}%`, color: 'text-blue-400', progress: data.driverSatisfaction },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Social Impact Vector</h2>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-blue-500" />
          <div className="w-1 h-1 rounded-full bg-slate-800" />
          <div className="w-1 h-1 rounded-full bg-slate-800" />
        </div>
      </div>

      <div className="space-y-6">
        {metrics.map((m) => (
          <div key={m.label} className="group cursor-default">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-400 transition-colors">{m.label}</span>
              <span className={cn(m.color, "text-sm font-black tracking-tighter")}>{m.value}</span>
            </div>
            <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.02]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.progress}%` }}
                className={cn("h-full rounded-full transition-all duration-1000", m.color.replace('text', 'bg'))}
              />
            </div>
          </div>
        ))}

        <div className="pt-6 border-t border-white/[0.05]">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-3 h-3 text-slate-600" />
            <p className="text-[9px] text-slate-500 uppercase font-black tracking-[0.3em]">Stress Contribution Factor</p>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Latency Interaction', val: '48%', color: 'text-red-500' },
              { label: 'Grid Saturation', val: '32%', color: 'text-amber-500' },
              { label: 'Vibration/Noise Leak', val: '12%', color: 'text-slate-500' },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center group/item">
                <span className="text-[10px] font-bold text-slate-400 group-hover/item:text-slate-300 transition-colors uppercase tracking-tight">{item.label}</span>
                <div className="flex items-center gap-3">
                  <div className="h-0.5 w-12 bg-white/[0.02] rounded-full hidden sm:block">
                     <div className={cn("h-full rounded-full opacity-50", item.color.replace('text', 'bg'))} style={{ width: item.val }} />
                  </div>
                  <span className={cn(item.color, "text-[10px] font-black")}>{item.val}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
