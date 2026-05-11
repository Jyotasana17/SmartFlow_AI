"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldAlert, Cpu, BarChart3, Radio, Power, RefreshCcw, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Junction } from '@/types/traffic';

interface ControlPanelProps {
  junction: Junction;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ junction }) => {
  return (
    <div className="flex flex-col h-full gap-6">
      {/* AI Decision Unit */}
      <div className="bg-blue-600/10 border border-blue-500/30 rounded-xl p-5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
          <Cpu className="w-8 h-8 text-blue-400" />
        </div>
        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-4 h-4 text-blue-400" />
          <h3 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">AI Strategic Override</h3>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Current Recommendation</p>
            <p className="text-xs text-blue-100 font-bold leading-relaxed bg-blue-500/10 p-3 rounded border border-blue-500/10 italic">
              &quot;{junction.aiDecision.suggestion}&quot;
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 p-3 rounded border border-white/5">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Confidence</p>
              <p className="text-lg font-black text-white">{junction.aiDecision.confidence}%</p>
            </div>
            <div className="bg-black/30 p-3 rounded border border-white/5">
              <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Wait Time</p>
              <p className="text-lg font-black text-emerald-400">-{Math.floor(Math.random() * 30 + 10)}s</p>
            </div>
          </div>
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all">
            Deploy Recommendation
          </button>
        </div>
      </div>

      {/* Manual Signal Control */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 backdrop-blur-md">
        <div className="flex items-center justify-between mb-5">
           <div className="flex items-center gap-2">
             <Radio className="w-4 h-4 text-slate-400" />
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Manual Overrides</h3>
           </div>
           <div className="flex items-center gap-1 text-[8px] font-bold text-amber-500 animate-pulse">
             <AlertCircle className="w-3 h-3" />
             RESTRICTED
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(junction.signal).filter(([k]) => k !== 'secondsLeft').map(([lane, state]) => (
            <div key={lane} className="flex flex-col gap-2">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">{lane} Approach</span>
              <div className="flex gap-1 bg-black/40 p-1.5 rounded border border-white/5">
                 <div className={cn("flex-1 h-2 rounded-sm transition-all", state === 'RED' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]" : "bg-red-500/10")} />
                 <div className={cn("flex-1 h-2 rounded-sm transition-all", state === 'YELLOW' ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]" : "bg-amber-500/10")} />
                 <div className={cn("flex-1 h-2 rounded-sm transition-all", state === 'GREEN' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" : "bg-emerald-500/10")} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <button className="flex-1 py-2 bg-red-600/10 border border-red-500/30 text-red-400 text-[9px] font-black uppercase tracking-widest rounded hover:bg-red-500/20 transition-all flex items-center justify-center gap-2">
            <Power className="w-3 h-3" /> All Red
          </button>
          <button className="flex-1 py-2 bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-black uppercase tracking-widest rounded hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2">
            <RefreshCcw className="w-3 h-3" /> Auto
          </button>
        </div>
      </div>

      {/* Junction Analytics */}
      <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 flex flex-col backdrop-blur-md">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Node Telemetry</h3>
        </div>
        <div className="flex-1 space-y-4">
          <div className="p-3 bg-black/20 rounded border border-white/5">
             <div className="flex justify-between items-center mb-1">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Inflow rate</span>
               <span className="text-[10px] font-black text-white">+12.4%</span>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '65%' }}
                className="h-full bg-blue-500" 
               />
             </div>
          </div>
          <div className="p-3 bg-black/20 rounded border border-white/5">
             <div className="flex justify-between items-center mb-1">
               <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Emission index</span>
               <span className="text-[10px] font-black text-emerald-400">OPTIMAL</span>
             </div>
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '30%' }}
                className="h-full bg-emerald-500" 
               />
             </div>
          </div>
        </div>
      </div>

      {/* Emergency Action */}
      <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-[0.4em] text-xs rounded-xl shadow-[0_10px_30px_rgba(220,38,38,0.2)] transition-all flex items-center justify-center gap-3 group">
        <ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform" />
        Force Emergency Corridor
      </button>
    </div>
  );
};
