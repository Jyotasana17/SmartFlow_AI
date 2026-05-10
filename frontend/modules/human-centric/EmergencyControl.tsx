"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Ambulance, Clock, Heart, MapPin, Wind, Fuel, TreeDeciduous } from 'lucide-react';
import { EmergencyStatus, EnvironmentalImpact } from '@/types/human-centric';

interface EmergencyControlProps {
  emergency: EmergencyStatus;
  environmental: EnvironmentalImpact;
}

export const EmergencyControl: React.FC<EmergencyControlProps> = ({ emergency, environmental }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {/* Emergency Corridor */}
      <div id="emergency-panel" className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-rose-500/10 rounded-xl">
            <Ambulance className="w-5 h-5 text-rose-500" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">Emergency Corridor</h3>
        </div>

        <div className="space-y-6">
          {emergency.active ? (
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20"
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Active Way at {emergency.junction}</span>
              </div>
              <p className="text-xs text-rose-700 font-medium">Priority green wave synchronizing across 4 junctions.</p>
            </motion.div>
          ) : (
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 italic text-xs text-zinc-400">
              No active emergency vehicles detected. System in standby monitoring mode.
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ETA Saved</span>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">-{emergency.etaReductionSeconds}s</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-tighter mt-1">Average per emergency</div>
            </div>
            
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Lives Saved</span>
              </div>
              <div className="text-2xl font-black text-zinc-900 dark:text-zinc-100">{emergency.livesSavedEstimate}</div>
              <div className="text-[9px] text-zinc-500 uppercase tracking-tighter mt-1">AI System estimation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Impact */}
      <div id="environmental-panel" className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-xl border border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-xl">
            <Wind className="w-5 h-5 text-emerald-500" />
          </div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-xs">Human Health & Env</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/5 group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-zinc-800 rounded-xl shadow-sm">
                <Wind className="w-4 h-4 text-emerald-500" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">CO₂ Saved</div>
                <div className="text-xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">{environmental.co2SavedKg.toLocaleString()}kg</div>
              </div>
            </div>
            <TreeDeciduous className="w-8 h-8 text-emerald-200 dark:text-emerald-800 group-hover:scale-110 transition-transform" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Fuel className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Fuel Saved</span>
              </div>
              <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">{environmental.fuelSavedLiters}L</div>
            </div>
            
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Idle Idle</span>
              </div>
              <div className="text-xl font-black text-zinc-900 dark:text-zinc-100">-{environmental.idleTimeReductionPercent}%</div>
            </div>
          </div>

          <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-700">
            <p className="text-[10px] text-zinc-500 leading-relaxed text-center">
              Equivalent to planting <strong className="text-emerald-500">124 trees</strong> this month through optimized traffic flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
