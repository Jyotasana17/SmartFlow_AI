"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Bell, Info, ShieldAlert, Zap } from 'lucide-react';
import { Alert } from '@/types/human-centric';
import { cn } from '@/lib/utils';

interface AlertCenterProps {
  alerts: Alert[];
}

export const AlertCenter: React.FC<AlertCenterProps> = ({ alerts }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'emergency': return <Zap className="w-4 h-4" />;
      case 'critical': return <ShieldAlert className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getStyle = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-500/10 border-red-500/20 text-red-400';
      case 'critical': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
      case 'warning': return 'bg-blue-500/10 border-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
    }
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
              "p-4 rounded-xl border flex gap-4 transition-all hover:scale-[1.02]",
              getStyle(alert.type)
            )}
          >
            <div className="pt-0.5">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">System Notification</span>
                <span className="text-[8px] font-mono opacity-40">{alert.timestamp.toLocaleTimeString([], { hour12: false })}</span>
              </div>
              <p className="text-[11px] font-bold leading-relaxed tracking-tight">{alert.message}</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      {alerts.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center opacity-20 py-20">
          <Bell className="w-8 h-8 mb-4" />
          <p className="text-[10px] font-black uppercase tracking-widest">No Active Notifications</p>
        </div>
      )}
    </div>
  );
};
