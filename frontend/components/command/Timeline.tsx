"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Bell, AlertTriangle, Info, CheckCircle2, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Alert } from '@/types/traffic';

interface TimelineProps {
  alerts: Alert[];
}

export const Timeline: React.FC<TimelineProps> = ({ alerts }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-[#020617]/90 backdrop-blur-2xl border-t border-white/[0.05] z-[60] transition-all duration-500",
      expanded ? "h-64" : "h-12"
    )}>
      {/* Header / Scrubber */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="h-12 px-6 flex items-center justify-between cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-blue-500" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Live Event Timeline</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
             {alerts.slice(0, 3).map((alert, i) => (
               <div key={alert.id} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                 <div className={cn(
                   "w-1.5 h-1.5 rounded-full",
                   alert.severity === 'critical' ? "bg-red-500" : alert.severity === 'warning' ? "bg-amber-500" : "bg-blue-500"
                 )} />
                 <span className="text-[9px] font-bold text-slate-300 truncate max-w-[150px] uppercase tracking-wider">{alert.title}</span>
                 <span className="text-[8px] text-slate-600 font-mono">{alert.timestamp}</span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{alerts.length} Events Total</span>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            className="p-1"
          >
            <ChevronUp className="w-4 h-4 text-slate-400" />
          </motion.div>
        </div>
      </div>

      {/* Expanded List */}
      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="h-[calc(100%-48px)] p-6 overflow-y-auto custom-scrollbar"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={cn(
                    "p-4 rounded-lg border flex gap-4 transition-all hover:bg-white/[0.03]",
                    alert.severity === 'critical' ? "bg-red-500/5 border-red-500/20" :
                    alert.severity === 'warning' ? "bg-amber-500/5 border-amber-500/20" :
                    "bg-blue-500/5 border-blue-500/20"
                  )}
                >
                  <div className="mt-1">
                    {alert.severity === 'critical' ? <AlertTriangle className="w-4 h-4 text-red-500" /> :
                     alert.severity === 'warning' ? <Info className="w-4 h-4 text-amber-500" /> :
                     <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-[11px] font-black text-white uppercase tracking-wider">{alert.title}</h4>
                      <span className="text-[8px] font-mono text-slate-500 whitespace-nowrap">{alert.timestamp}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">{alert.detail}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.2em]">Source: {alert.source}</span>
                      <button className="text-[8px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors">Details</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* History Scrubber Visual */}
      {!expanded && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.03]">
          <motion.div 
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 w-32 h-full bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" 
          />
        </div>
      )}
    </div>
  );
};
