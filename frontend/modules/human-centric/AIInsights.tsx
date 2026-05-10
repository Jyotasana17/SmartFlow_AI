"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { AIDecision } from '@/types/human-centric';

interface AIInsightsProps {
  decisions: AIDecision[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ decisions }) => {
  return (
    <div className="space-y-4 pr-2 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
      <AnimatePresence mode="popLayout">
        {decisions.map((decision, idx) => (
          <motion.div
            key={decision.timestamp}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] group hover:border-blue-500/30 transition-all shadow-inner"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{decision.timestamp} <span className="opacity-40">UTC</span></span>
              </div>
              <div className="flex items-center gap-1.5 bg-blue-500/10 px-2.5 py-0.5 rounded border border-blue-500/20">
                <CheckCircle2 className="w-3 h-3 text-blue-400" />
                <span className="text-[9px] font-black text-blue-400 uppercase tracking-tighter">{decision.confidence}% ACCURACY</span>
              </div>
            </div>
            
            <h4 className="text-[11px] font-black text-white uppercase tracking-[0.15em] leading-tight mb-2 group-hover:text-blue-400 transition-colors">
              {decision.action}
            </h4>
            
            <div className="bg-black/20 p-3 rounded-lg border border-white/[0.03]">
              <p className="text-[10px] text-slate-400 leading-relaxed font-bold italic opacity-80">
                &quot;{decision.reason}&quot;
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex-1 mr-6">
                 <div className="h-1 w-full bg-white/[0.03] rounded-full overflow-hidden border border-white/[0.02]">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${decision.stressInfluence}%` }}
                      className="h-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]" 
                    />
                 </div>
              </div>
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Weight: {decision.stressInfluence}%</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
