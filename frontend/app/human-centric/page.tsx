"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, LayoutDashboard, UserCircle, Globe, Cpu, ShieldAlert, Zap, Ambulance } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import ported components
import { StressIndex } from '@/modules/human-centric/StressIndex';
import { HumanImpactMetrics } from '@/modules/human-centric/HumanImpactMetrics';
import { AIInsights } from '@/modules/human-centric/AIInsights';
import { EmergencyControl } from '@/modules/human-centric/EmergencyControl';
import { AlertCenter } from '@/modules/human-centric/AlertCenter';
import { TrafficVisualizer } from '@/modules/human-centric/TrafficVisualizer';
import { VoiceControl } from '@/modules/human-centric/VoiceControl';

// Import constants
import { 
  INITIAL_STRESS, 
  INITIAL_HUMAN_IMPACT, 
  INITIAL_ENVIRONMENTAL_IMPACT, 
  INITIAL_AI_DECISIONS, 
  INITIAL_ALERTS, 
  INITIAL_EMERGENCY 
} from '@/data/human-centric-constants';

export default function HumanCentricDashboard() {
  const [stress, setStress] = useState(INITIAL_STRESS);
  const [humanImpact] = useState(INITIAL_HUMAN_IMPACT);
  const [environmentalImpact] = useState(INITIAL_ENVIRONMENTAL_IMPACT);
  const [decisions] = useState(INITIAL_AI_DECISIONS);
  const [alerts] = useState(INITIAL_ALERTS);
  const [emergency] = useState(INITIAL_EMERGENCY);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Simulate real-time updates and clock
  useEffect(() => {
    const stressInterval = setInterval(() => {
      setStress(prev => ({
        ...prev,
        score: Math.max(0, Math.min(100, prev.score + (Math.random() > 0.5 ? 2 : -1.5)))
      }));
    }, 3000);

    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(stressInterval);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden relative selection:text-white -m-6 p-6">
      {/* HUD Scanline Overlay for authentic CRT/HUD feel */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      
      {/* Animated HUD Background Accents */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full pointer-events-none translate-y-1/2" />

      {/* Header Navigation: High Tech Aesthetic */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-[#020617]/60 backdrop-blur-xl border-b border-white/[0.05] z-50 px-6">
        <div className="max-w-[1800px] mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-black text-white text-xs border border-blue-400/50 shadow-inner">SF</div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-[0.25em] uppercase italic bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-2">
                SmartFlow AI 
                <span className="hidden sm:inline-block w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse mx-1 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </h1>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest opacity-60">Grid Monitoring Terminal v4.2.1-stable</span>
            </div>
          </div>

          <div className="flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <div className="flex items-center gap-2 text-emerald-400 group cursor-default">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="group-hover:text-emerald-300 transition-colors">North-West Hub Active</span>
            </div>
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded border border-white/[0.05]">
                <Cpu className="w-3 h-3 text-blue-400" />
                <span className="text-slate-400">Neural Sync: 98.4%</span>
              </div>
              <div className="flex items-center gap-2 bg-white/[0.03] px-3 py-1 rounded border border-white/[0.05]">
                <ShieldAlert className="w-3 h-3 text-amber-500" />
                <span className="text-slate-400">Security Guard: Enabled</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end text-[10px] font-mono leading-none tracking-widest opacity-60">
              <span className="text-white font-bold">{currentTime.toLocaleTimeString([], { hour12: false })}</span>
              <span className="text-slate-500">UTC-OS LOGS</span>
            </div>
            <div className="w-9 h-9 rounded bg-slate-800/30 flex items-center justify-center border border-white/[0.05] hover:border-blue-500/30 transition-all cursor-pointer hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <UserCircle className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Componentized HUD Layout */}
      <main className="pt-20 pb-20 px-6 max-w-[1800px] mx-auto min-h-screen flex flex-col gap-6">
        <div className="grid grid-cols-12 gap-6 flex-1">
          
          {/* Left Column: Intelligence Monitoring & Status Logs */}
          <section className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full">
            <div className="flex-1 min-h-[450px] bg-[#020617]/40 border border-white/[0.05] rounded-xl overflow-hidden flex flex-col backdrop-blur-md shadow-inner">
              <div className="p-4 border-b border-white/[0.05] bg-white/[0.02] flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Event Log</span>
                <span className="text-[9px] text-blue-400 px-2 py-0.5 bg-blue-500/10 rounded">Live Feedback</span>
              </div>
              <AlertCenter alerts={alerts} />
            </div>
            
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 -mr-12 -mt-12 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Grid Sustainability</h2>
                <Globe className="w-3.5 h-3.5 text-emerald-500 opacity-50" />
              </div>
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="bg-black/20 p-4 rounded-lg border border-white/[0.03] group/item hover:border-emerald-500/30 transition-all">
                  <p className="text-[9px] text-slate-500 uppercase font-black mb-1.5 opacity-60">CO₂ Abated</p>
                  <p className="text-3xl font-black text-emerald-400 tracking-tighter leading-none">{environmentalImpact.co2SavedKg}<span className="text-xs ml-1 opacity-50 font-bold">KG</span></p>
                </div>
                <div className="bg-black/20 p-4 rounded-lg border border-white/[0.03] group/item hover:border-emerald-500/30 transition-all">
                  <p className="text-[9px] text-slate-500 uppercase font-black mb-1.5 opacity-60">Energy Saving</p>
                  <p className="text-3xl font-black text-emerald-400 tracking-tighter leading-none">{environmentalImpact.fuelSavedLiters}<span className="text-xs ml-1 opacity-50 font-bold">L</span></p>
                </div>
                <div className="col-span-2 bg-emerald-500/[0.03] p-5 rounded-lg border border-emerald-500/10">
                  <p className="text-[9px] text-emerald-500 uppercase font-black mb-3 tracking-[0.2em]">Idle Time Optimization</p>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-black text-emerald-400 tracking-tighter leading-none">-{environmentalImpact.idleTimeReductionPercent}%</p>
                    <div className="flex gap-1 h-8 items-end pb-1">
                      {[1, 2, 3, 4, 5, 6].map(i => (
                        <motion.div 
                          key={i} 
                          animate={{ height: [`${20 * i}%`, `${30 * i}%`, `${20 * i}%`] }}
                          transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                          className="w-1 bg-emerald-500/30 rounded-full" 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Center Column: Live Tactical Grid Monitor */}
          <section className="col-span-12 lg:col-span-6 flex flex-col gap-6">
            <div className="flex-1 min-h-[580px] bg-slate-900/[0.15] border border-white/[0.05] rounded-2xl relative overflow-hidden flex flex-col shadow-2xl backdrop-blur-sm group">
              {/* Tactical Stats Overlay */}
              <div className="absolute top-8 left-8 z-30 pointer-events-none group-hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center gap-2 mb-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,1)]" />
                   <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.45em]">Stress Biosignature Tap</h2>
                </div>
                <div className="flex items-baseline gap-4">
                  <motion.span 
                    key={stress.score}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-8xl font-black text-white leading-none tracking-tighter filter drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                  >
                    {Math.round(stress.score)}
                  </motion.span>
                  <div className="flex flex-col gap-1">
                    <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Index / 100</div>
                    <div className={cn(
                      "text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 py-1 px-2 rounded-sm border",
                      stress.score > 70 ? "text-red-400 bg-red-400/5 border-red-400/20" : "text-emerald-400 bg-emerald-400/5 border-emerald-400/20"
                    )}>
                      {stress.score > 70 ? 'CRITICAL_TENSION_ALERT' : 'NOMINAL_FLOW_STATE'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Map Visualization */}
              <div className="flex-1 p-6 relative z-10 flex items-center justify-center">
                <TrafficVisualizer />
              </div>

              {/* HUD Perimeter Labels */}
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 rotate-90 text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] opacity-30 select-none">GRID MONITORING SYSTEM ACTIVE</div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 -rotate-90 text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] opacity-30 select-none">OPTIMAL NODE THROUGHPUT</div>

              {/* Bottom Multi-Data HUD Panels */}
              <div className="absolute bottom-8 left-8 right-8 grid grid-cols-1 md:grid-cols-3 gap-6 z-20">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/60 border border-white/[0.08] p-4 rounded-xl backdrop-blur-2xl shadow-2xl group/card"
                >
                  <div className="flex justify-between items-start mb-3">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Projection (T+15)</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-red-500 animate-ping" />
                      <span className="text-[8px] font-bold text-red-500">BUILDING</span>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-slate-100 italic tracking-tight">88.2 <span className="text-[10px] text-slate-500 font-bold not-italic">PSI_VAL</span></p>
                  <div className="w-full bg-white/[0.03] h-1.5 mt-4 rounded-full overflow-hidden border border-white/[0.02]">
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '88%' }}
                      className="bg-gradient-to-r from-red-600 to-red-400 h-full shadow-[0_0_12px_rgba(239,68,68,0.4)]" 
                    />
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/60 border border-white/[0.08] p-4 rounded-xl backdrop-blur-2xl shadow-2xl group/card"
                >
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Wait Differential</p>
                  <p className="text-2xl font-black text-blue-400 italic tracking-tight">+4.2 <span className="text-[10px] text-slate-500 font-bold not-italic">MS_SYNC</span></p>
                  <div className="flex gap-0.5 mt-3">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={cn("flex-1 h-1 rounded-full", i < 8 ? "bg-blue-500/40" : "bg-white/5")} />
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="bg-black/60 border border-white/[0.08] p-4 rounded-xl backdrop-blur-2xl shadow-2xl group/card"
                >
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">AI Cluster Load</p>
                  <p className="text-2xl font-black text-white italic tracking-tight">99.2%</p>
                  <div className="flex items-center gap-2 mt-4 text-[9px] font-black text-emerald-400 uppercase tracking-tight">
                    <Zap className="w-2.5 h-2.5" />
                    Max Optimization High
                  </div>
                </motion.div>
              </div>
            </div>

            {/* AI Decision Summarizer */}
            <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-full bg-blue-500/5 -skew-x-[20deg] translate-x-12 translate-y-0" />
              <div className="flex items-center gap-6 relative z-10">
                <div className="bg-blue-600/10 p-3 rounded-lg border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform">
                   <Activity className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                   <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-1.5 flex items-center justify-between">
                     Neural Sync Output
                     <span className="opacity-50">#CH-7741</span>
                   </h2>
                   <p className="text-sm text-slate-300 leading-relaxed italic font-bold tracking-tight">
                    &quot;{decisions[0]?.reason || 'Deep learning models currently optimizing phase timing relative to real-time stress data.'}&quot;
                   </p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Column: AI Insights & Emergency Dynamics */}
          <section className="col-span-12 lg:col-span-3 flex flex-col gap-6 h-full">
            <StressIndex data={stress} forecast="Building" />
            
            <div className="flex-1 bg-[#020617]/40 border border-white/[0.05] rounded-xl p-5 flex flex-col backdrop-blur-md overflow-hidden min-h-[350px]">
               <div className="flex items-center justify-between mb-5">
                 <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Grid Decision Logs</h2>
                 <LayoutDashboard className="w-3.5 h-3.5 text-slate-600" />
               </div>
               <div className="flex-1 overflow-hidden">
                  <AIInsights decisions={decisions} />
               </div>
            </div>

            {/* Emergency Dynamics HUD Component */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-blue-800 border border-blue-400/40 rounded-2xl p-6 text-white shadow-[0_20px_50px_rgba(29,78,216,0.25)] relative overflow-hidden group"
            >
              {/* Animated Inner Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 group-hover:opacity-10 blur-xl transition-opacity animate-pulse" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-[10px] font-black text-blue-100 uppercase tracking-[0.45em]">Emergency Prioritization</h2>
                  <Zap className="w-3.5 h-3.5 text-blue-200 opacity-50" />
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-white/15 p-4 rounded-xl backdrop-blur-xl border border-white/25 shadow-lg shadow-black/20 group-hover:scale-105 transition-transform">
                    <Ambulance className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-5xl font-black tracking-tighter leading-none mb-1 text-white shadow-sm">-{emergency.etaReductionSeconds}s</p>
                    <p className="text-[9px] font-black opacity-60 uppercase tracking-[0.2em] text-blue-100">ETA Vector Optimized</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/10 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                          <div key={i} className={cn("w-1.5 h-1.5 rounded-full", i === 1 ? "bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" : "bg-white/20")} />
                        ))}
                      </div>
                      <p className="text-[9px] font-black opacity-60 uppercase tracking-[0.25em]">Human Safety Impact</p>
                    </div>
                  </div>
                  <p className="text-lg font-black tracking-tighter text-blue-50 mt-1">
                    Est. <span className="text-white text-2xl px-1">{emergency.livesSavedEstimate}</span> Critical Lives Stabilized
                  </p>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </main>

      {/* Voice Control Fixed HUD Interaction */}
      <VoiceControl />

      {/* Footer System Status Bar */}
      <footer className="fixed bottom-0 left-0 right-0 h-8 bg-[#020617]/80 backdrop-blur-xl border-t border-white/[0.05] z-50 px-6 flex items-center justify-between pointer-events-none">
        <div className="flex gap-8 text-[8px] font-black text-slate-500 uppercase tracking-[0.4em]">
          <span>CPU_CORE: NOMINAL</span>
          <span>MEM_ALLOC: 4.2GB / 32GB</span>
          <span>NET_LATENCY: 12ms</span>
        </div>
        <div className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.3em]">
          ENCRYPTION_PROTOCOL: AES-256-GCM READY
        </div>
      </footer>
    </div>
  );
}
