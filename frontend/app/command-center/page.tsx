"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  LayoutDashboard, 
  UserCircle, 
  Globe, 
  Cpu, 
  ShieldAlert, 
  Zap, 
  Search,
  Bell,
  Command,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Command Center Components
import { CCTVGrid } from '@/components/command/CCTVGrid';
import { JunctionNavigator } from '@/components/command/JunctionNavigator';
import { ControlPanel } from '@/components/command/ControlPanel';
import { Timeline } from '@/components/command/Timeline';

// State & Types
import { useTrafficStore, useSelectedJunction } from '@/store/traffic-store';

export default function CommandCenterPage() {
  const { 
    junctions, 
    selectedJunctionId, 
    setSelectedJunction, 
    alerts, 
    emergencyMode,
    toggleEmergencyMode,
    aiOnline
  } = useTrafficStore();
  
  const selectedJunction = useSelectedJunction();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const clockInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-hidden relative selection:text-white">
      {/* HUD Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
      <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -translate-y-1/2 opacity-50" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none translate-y-1/2 opacity-30" />

      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/[0.05] z-50 px-6">
        <div className="h-full flex items-center justify-between">
          {/* Logo & Junction Identity */}
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border border-blue-400/50 shadow-inner">
                <Command className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-sm font-black tracking-[0.3em] uppercase italic bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent flex items-center gap-3">
                LIVE TRAFFIC COMMAND
                <span className={cn(
                  "inline-block w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]",
                  aiOnline ? "bg-blue-500" : "bg-red-500 shadow-red-500"
                )} />
              </h1>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest opacity-60">System Operator Terminal // SECURE_ACCESS_NODE_{selectedJunctionId}</span>
            </div>
          </div>

          {/* Central Status Indicators */}
          <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
            <div className="flex items-center gap-3 bg-white/[0.03] px-4 py-2 rounded-lg border border-white/[0.05] hover:border-blue-500/30 transition-all cursor-default group">
               <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
               <span className="group-hover:text-white transition-colors">CITY_GRID_STABLE</span>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <Cpu className="w-3.5 h-3.5 text-blue-400" />
                 <span className="text-slate-400">NEURAL_LOAD: 42.1%</span>
               </div>
               <div className="flex items-center gap-2">
                 <Activity className="w-3.5 h-3.5 text-amber-500" />
                 <span className="text-slate-400">LATENCY: 14MS</span>
               </div>
            </div>
          </div>

          {/* Right Controls & Time */}
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end text-[11px] font-mono leading-none tracking-widest">
              <span className="text-white font-bold">{currentTime.toLocaleTimeString([], { hour12: false })}</span>
              <span className="text-slate-600 text-[8px] uppercase font-black mt-1">UTC-OS LOGTIME</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-slate-800/30 flex items-center justify-center border border-white/[0.05] hover:border-blue-500/30 transition-all cursor-pointer">
                <Bell className="w-5 h-5 text-slate-400" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-slate-800/30 flex items-center justify-center border border-white/[0.05] hover:border-blue-500/30 transition-all cursor-pointer">
                <UserCircle className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Command Interface */}
      <main className="pt-20 pb-16 px-6 h-screen flex gap-6 overflow-hidden">
        {/* Left Sidebar: Junction Navigation */}
        <aside className="w-80 flex flex-col gap-6 shrink-0 h-full pb-6">
          <JunctionNavigator 
            junctions={junctions} 
            selectedId={selectedJunctionId} 
            onSelect={setSelectedJunction} 
          />
        </aside>

        {/* Center: Live CCTV Grid */}
        <section className="flex-1 flex flex-col gap-6 overflow-hidden h-full pb-6">
          <div className="flex-1 bg-slate-900/[0.1] border border-white/[0.05] rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-2xl backdrop-blur-sm group">
            {/* Tactical Identity Overlay */}
            <div className="absolute top-8 right-8 z-30 pointer-events-none opacity-30 text-right">
              <div className="text-[8px] font-black text-slate-500 uppercase tracking-[0.5em] mb-1">Observation Sector</div>
              <div className="text-3xl font-black text-white italic tracking-tighter">{selectedJunction.id.toUpperCase()}</div>
            </div>

            <CCTVGrid junction={selectedJunction} isEmergency={emergencyMode} />

            {/* Scanning Radar Overlay (Subtle) */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-[0.03] pointer-events-none">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-full h-full rounded-full border border-blue-500 border-dashed"
               />
            </div>
          </div>
        </section>

        {/* Right Sidebar: AI Intelligence & Controls */}
        <aside className="w-96 flex flex-col gap-6 shrink-0 h-full pb-6 overflow-y-auto custom-scrollbar">
          <ControlPanel junction={selectedJunction} />
        </aside>
      </main>

      {/* Bottom Timeline */}
      <Timeline alerts={alerts} />

      {/* System status edge labels */}
      <div className="fixed top-1/2 left-2 -translate-y-1/2 -rotate-90 text-[7px] font-black text-slate-600 uppercase tracking-[0.6em] opacity-40 select-none">GRID_MONITOR_V5.0_ALPHA</div>
      <div className="fixed top-1/2 right-2 -translate-y-1/2 rotate-90 text-[7px] font-black text-slate-600 uppercase tracking-[0.6em] opacity-40 select-none">NEURAL_SYNC_ACTIVE</div>
    </div>
  );
}
