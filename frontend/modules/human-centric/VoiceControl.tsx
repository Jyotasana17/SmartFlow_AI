"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export const VoiceControl: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setLastCommand('Emergency Wave Propagated');
        setTimeout(() => setLastCommand(null), 3000);
      }, 2000);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-50">
      <div className="flex flex-col items-end gap-3">
        <AnimatePresence>
          {lastCommand && (
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-5 py-2.5 bg-white text-slate-900 rounded border border-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.3)] font-black flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] italic"
            >
              <Zap className="w-3.5 h-3.5 text-blue-600 fill-blue-600" />
              <span>{lastCommand}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={toggleListening}
          className={cn(
            "group flex items-center gap-4 pl-4 pr-6 py-2.5 rounded-lg shadow-2xl transition-all active:scale-95 border",
            isListening 
              ? "bg-blue-600 border-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.4)]" 
              : "bg-black/60 backdrop-blur-xl border-white/[0.05] hover:border-white/[0.15]"
          )}
        >
          <div className={cn(
            "w-9 h-9 rounded flex items-center justify-center transition-all duration-300",
            isListening ? "bg-white text-blue-600 scale-110" : "bg-white/[0.03] text-blue-400 border border-white/[0.05]"
          )}>
            {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4 opacity-60" />}
          </div>
          
          <div className="text-left">
            <div className={cn(
              "text-[8px] font-black uppercase tracking-[0.3em] mb-0.5",
              isListening ? "text-blue-100" : "text-slate-500"
            )}>
              {isListening ? 'Active_Link' : 'Voice_Interface'}
            </div>
            <div className={cn(
              "text-[10px] font-black uppercase tracking-widest",
              isListening ? "text-white" : "text-slate-300"
            )}>
              {isListening ? 'Awaiting_Vocal' : 'System_Ready'}
            </div>
          </div>
          
          {isListening && (
            <div className="flex gap-0.5 items-end h-4 ml-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: ['15%', '100%', '15%'] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                  className="w-0.5 bg-white/40 rounded-full"
                />
              ))}
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
