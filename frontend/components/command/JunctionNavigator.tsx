"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Star, History, Compass, ChevronRight, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Junction } from '@/types/traffic';
import { useTrafficStore } from '@/store/traffic-store';

interface JunctionNavigatorProps {
  junctions: Junction[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const JunctionNavigator: React.FC<JunctionNavigatorProps> = ({ 
  junctions, 
  selectedId, 
  onSelect 
}) => {
  const [search, setSearch] = useState("");
  const filteredJunctions = junctions.filter(j => 
    j.name.toLowerCase().includes(search.toLowerCase()) || 
    j.district.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#020617]/40 border border-white/[0.05] rounded-xl overflow-hidden backdrop-blur-md">
      {/* Search Header */}
      <div className="p-4 border-b border-white/[0.05] bg-white/[0.02]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search city nodes..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/40 border border-white/[0.08] rounded-lg py-2 pl-10 pr-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.05]">
        <button className="flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-blue-400 border-b-2 border-blue-500 bg-blue-500/5">
          Nodes
        </button>
        <button className="flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors">
          History
        </button>
        <button className="flex-1 py-3 text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors">
          Map
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredJunctions.map((junction) => (
            <motion.div
              key={junction.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={() => onSelect(junction.id)}
              className={cn(
                "group relative p-4 rounded-lg cursor-pointer border transition-all duration-300",
                selectedId === junction.id 
                  ? "bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
                  : "bg-white/[0.02] border-white/[0.05] hover:border-white/10 hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    junction.trafficLevel === 'smooth' ? "bg-emerald-500" :
                    junction.trafficLevel === 'medium' ? "bg-amber-500" :
                    junction.trafficLevel === 'heavy' ? "bg-red-500" : "bg-blue-500 animate-pulse"
                  )} />
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{junction.district}</span>
                </div>
                <Star className={cn("w-3 h-3 transition-colors", selectedId === junction.id ? "text-amber-400" : "text-slate-700")} />
              </div>
              
              <h4 className="text-sm font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{junction.name}</h4>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Density</span>
                    <span className={cn(
                      "text-xs font-black",
                      junction.density > 80 ? "text-red-400" : junction.density > 50 ? "text-amber-400" : "text-emerald-400"
                    )}>{junction.density}%</span>
                  </div>
                  <div className="w-[1px] h-6 bg-white/5" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-600 uppercase tracking-tighter">Flow</span>
                    <span className="text-xs font-black text-blue-400">NOMINAL</span>
                  </div>
                </div>
                <ChevronRight className={cn("w-4 h-4 transition-transform", selectedId === junction.id ? "text-blue-500 translate-x-1" : "text-slate-700")} />
              </div>

              {selectedId === junction.id && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" 
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Mini AI Summary */}
      <div className="p-4 bg-white/[0.03] border-t border-white/[0.05]">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-3.5 h-3.5 text-blue-500" />
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Network Status</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active Feeds</span>
            <span className="text-[10px] font-black text-white">24/24</span>
          </div>
          <div className="w-full bg-black/40 h-1 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};
