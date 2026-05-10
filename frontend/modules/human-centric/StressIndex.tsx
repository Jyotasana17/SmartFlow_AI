"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { StressLevel } from '@/types/human-centric';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface StressIndexProps {
  data: StressLevel;
  forecast: string;
}

export const StressIndex: React.FC<StressIndexProps> = ({ data, forecast }) => {
  const getColor = (score: number) => {
    if (score < 30) return '#10b981'; // Green
    if (score < 50) return '#3b82f6'; // Blue
    if (score < 75) return '#f97316'; // Orange
    return '#ef4444'; // Red
  };

  const chartData = [
    { name: 'Stress', value: data.score },
    { name: 'Remaining', value: 100 - data.score },
  ];

  return (
    <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-6 flex flex-col items-center backdrop-blur-md relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      
      <div className="w-full flex items-center justify-between mb-8">
        <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Grid Stress Flux</h2>
        <div className={cn(
          "px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest border",
          forecast === 'Critical' ? "bg-red-500/10 text-red-500 border-red-500/20" :
          forecast === 'Building' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        )}>
          {forecast} T-Trend
        </div>
      </div>

      <div className="relative w-full aspect-square max-w-[190px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              innerRadius="82%"
              outerRadius="100%"
              stroke="none"
              dataKey="value"
              startAngle={225}
              endAngle={-45}
            >
              <Cell fill={getColor(data.score)} />
              <Cell fill="rgba(255,255,255,0.03)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        
        <div className="absolute inset-x-0 bottom-4 text-center">
          <motion.div 
            key={data.score}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-black text-white tracking-tighter leading-none mb-1 shadow-inner"
          >
            {data.score}
          </motion.div>
          <div className="text-[9px] uppercase font-black tracking-[0.4em] text-slate-500">Pts / 100</div>
        </div>

        {/* Dynamic Glow Rings */}
        <div className="absolute inset-0 rounded-full border border-white/[0.03] scale-[1.1]" />
        <div className="absolute inset-0 rounded-full border border-white/[0.01] scale-[1.2]" />

        {data.score > 75 && (
          <motion.div
            animate={{ opacity: [0.1, 0.4, 0.1], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute inset-0 rounded-full border-4 border-red-500/20 blur-md pointer-events-none"
          />
        )}
      </div>

      <div className="w-full mt-8 grid grid-cols-2 gap-3 relative z-10">
        {Object.entries(data.contributors).map(([label, value]) => (
          <div key={label} className="p-3 bg-black/20 rounded border border-white/[0.03] hover:border-white/[0.08] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest opacity-60">
                {label.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-[10px] font-black text-slate-300">{value}%</span>
            </div>
            <div className="h-0.5 w-full bg-white/[0.03] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                className={cn("h-full rounded-full shadow-[0_0_8px_rgba(255,255,255,0.2)]", getColor(data.score).startsWith('#ef') ? "bg-red-500" : "bg-blue-400")}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
