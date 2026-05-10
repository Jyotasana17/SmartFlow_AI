"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Navigation } from 'lucide-react';

export const TrafficVisualizer: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#020617]/40 rounded-2xl flex items-center justify-center border border-white/[0.05] relative overflow-hidden backdrop-blur-xl shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] group/viz">
      {/* Background HUD Grid with Glow */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Scanning Radar Effect */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/0 via-blue-500/[0.02] to-blue-500/[0.15] rounded-full pointer-events-none origin-center"
      />

      {/* Emergency Corridor Glow */}
      <motion.div 
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="w-[3px] bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,1)] h-full absolute flex items-center justify-center z-10"
      >
        <div className="bg-blue-600 text-[9px] px-4 py-1.5 rounded-sm rotate-90 whitespace-nowrap font-black tracking-[0.4em] text-white uppercase shadow-[0_0_20px_rgba(59,130,246,0.6)] border border-blue-400 group-hover/viz:scale-110 transition-transform">
          Tactical_Priority_Corridor
        </div>
      </motion.div>

      {/* Central Junction Hub: Holographic Feel */}
      <div className="relative z-20">
        <div className="w-80 h-80 rounded-full border border-white/[0.03] flex items-center justify-center relative shadow-[0_0_100px_rgba(59,130,246,0.05)]">
          {/* Animated Rings */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            className="absolute w-full h-full rounded-full border border-dashed border-white/[0.05]" 
          />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="absolute w-[88%] h-[88%] rounded-full border border-white/[0.02] border-t-blue-500/30 border-l-blue-500/30" 
          />
          <div className="absolute w-[95%] h-[95%] rounded-full border border-white/[0.01]" />
          
          <div className="flex flex-col items-center bg-black/40 p-10 rounded-full backdrop-blur-3xl border border-white/[0.05] shadow-2xl scale-110">
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.6em] mb-4 opacity-70">Neural_Hub_01</span>
             <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <motion.div 
                    animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }} 
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,1)]" 
                  />
                  <span className="text-sm font-black text-white uppercase tracking-[0.2em] italic">Flow_Optimized</span>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">
                  <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">98.4% Net_Sync</span>
                </div>
             </div>
          </div>

          {/* HUD Data Points */}
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/80 border border-white/[0.1] rounded backdrop-blur-xl text-[9px] font-mono text-slate-400 whitespace-nowrap shadow-2xl flex items-center gap-3"
          >
            <Navigation className="w-3 h-3 text-blue-500" />
            <span className="font-bold tracking-widest uppercase">COORD_TRK: 40.7N | 74.0W</span>
          </motion.div>
        </div>
      </div>

      {/* Floating HUD Elements */}
      <div className="absolute bottom-10 left-10 text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] opacity-40">System_Status: Optimal</div>
      <div className="absolute bottom-10 right-10 text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] opacity-40">Load_Balancing: Live</div>

      {/* Edge Scanning Lines */}
      <motion.div 
        animate={{ top: ['-20%', '120%'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/10 to-transparent z-0"
      />
    </div>
  );
};
