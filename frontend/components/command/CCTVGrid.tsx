"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CCTVCard } from './CCTVCard';
import type { Junction } from '@/types/traffic';
import { LayoutGrid, Maximize, Play, Settings } from 'lucide-react';

interface CCTVGridProps {
  junction: Junction;
  isEmergency?: boolean;
}

export const CCTVGrid: React.FC<CCTVGridProps> = ({ junction, isEmergency = false }) => {
  const cameras = junction.cameras || [];

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Grid Header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-blue-500" />
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Live Feed Cluster: {junction.name}</h3>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">All Feeds Synchronized</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded">
             <Play className="w-3 h-3 text-blue-400 fill-blue-400" />
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Monitoring</span>
          </div>
          <Settings className="w-4 h-4 text-slate-500 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {cameras.length > 0 ? (
          cameras.map((camera) => (
            <CCTVCard 
              key={camera.id} 
              camera={camera} 
              signalState={junction.signal[camera.lane as keyof typeof junction.signal] as any}
              vehicleCount={Math.floor(junction.vehicles.cars / 4 + Math.random() * 5)}
              density={junction.density}
              isEmergency={isEmergency}
            />
          ))
        ) : (
          <div className="col-span-2 h-full flex items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/[0.02]">
            <div className="flex flex-col items-center gap-4 opacity-40">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 border-t-blue-500 animate-spin" />
              <p className="text-xs font-black uppercase tracking-[0.4em]">Initializing Secure Stream Access...</p>
            </div>
          </div>
        )}

        {/* Placeholder for "Add Camera" or "System Diagnostic" */}
        <div className="aspect-video border border-dashed border-white/10 rounded-lg flex items-center justify-center bg-white/[0.01] group hover:bg-white/[0.03] transition-all cursor-pointer">
           <div className="flex flex-col items-center gap-2 opacity-30 group-hover:opacity-60 transition-opacity">
              <Maximize className="w-6 h-6 text-slate-400" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em]">Expand Cluster View</span>
           </div>
        </div>
      </div>
    </div>
  );
};
