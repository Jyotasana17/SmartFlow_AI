"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Shield, Activity, AlertTriangle, Zap, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CameraStream, SignalColor } from '@/types/traffic';

interface CCTVCardProps {
  camera: CameraStream;
  signalState?: SignalColor;
  vehicleCount?: number;
  density?: number;
  isEmergency?: boolean;
}

export const CCTVCard: React.FC<CCTVCardProps> = ({ 
  camera, 
  signalState = "RED", 
  vehicleCount = 0, 
  density = 0,
  isEmergency = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [trackingActive, setTrackingActive] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulated AI Bounding Boxes
  const [boxes, setBoxes] = useState<{ id: number, x: number, y: number, w: number, h: number, type: string }[]>([]);

  useEffect(() => {
    if (!trackingActive) return;

    const interval = setInterval(() => {
      const newBoxes = Array.from({ length: Math.floor(Math.random() * 5) + 3 }).map((_, i) => ({
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        w: 15 + Math.random() * 10,
        h: 10 + Math.random() * 5,
        type: Math.random() > 0.8 ? 'Emergency' : 'Vehicle'
      }));
      setBoxes(newBoxes);
    }, 2000);

    return () => clearInterval(interval);
  }, [trackingActive]);

  return (
    <motion.div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative aspect-video bg-black rounded-lg overflow-hidden border transition-all duration-500 group",
        isHovered ? "border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "border-white/10",
        isEmergency && "border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.3)] ring-1 ring-red-500/50"
      )}
    >
      {/* Live Video Feed */}
      <video
        ref={videoRef}
        src={camera.url}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Scanning Line */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-blue-400/20 z-10 pointer-events-none"
      />

      {/* AI Bounding Boxes */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <AnimatePresence>
          {boxes.map((box) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className={cn(
                "absolute border-2 rounded-sm",
                box.type === 'Emergency' ? "border-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]" : "border-blue-400/60 shadow-[0_0_10px_rgba(59,130,246,0.3)]"
              )}
              style={{
                left: `${box.x}%`,
                top: `${box.y}%`,
                width: `${box.w}%`,
                height: `${box.h}%`,
              }}
            >
              <div className={cn(
                "absolute -top-4 left-0 text-[8px] font-black px-1 uppercase tracking-tighter",
                box.type === 'Emergency' ? "bg-red-500 text-white" : "bg-blue-400/80 text-black"
              )}>
                {box.type === 'Emergency' ? '!! AMBULANCE !!' : `TRK_ID_${Math.floor(box.id * 1000)}`}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* HUD Header */}
      <div className="absolute top-0 left-0 right-0 p-3 bg-gradient-to-b from-black/80 to-transparent z-30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-2 h-2 rounded-full animate-pulse",
            isEmergency ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"
          )} />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] drop-shadow-md">
            LANE_{camera.lane.toUpperCase()} <span className="opacity-40 px-1">|</span> CCTV_{camera.id.split('-').pop()}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/40 border border-white/10 rounded backdrop-blur-md">
            <Eye className="w-3 h-3 text-blue-400" />
            <span className="text-[9px] font-mono text-blue-400 font-bold">LIVE</span>
          </div>
          <Maximize2 className="w-3.5 h-3.5 text-white/50 hover:text-white cursor-pointer transition-colors" />
        </div>
      </div>

      {/* HUD Footer Information */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-30">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className={cn(
                "px-2 py-0.5 rounded-sm text-[9px] font-black uppercase tracking-widest",
                signalState === 'GREEN' ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" :
                signalState === 'RED' ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                "bg-amber-500/20 text-amber-400 border border-amber-500/30"
              )}>
                SIGNAL: {signalState}
              </div>
              <div className="text-[9px] font-black text-white/60 uppercase tracking-widest">
                FLOW: {density}%
              </div>
            </div>
            <div className="text-[18px] font-black text-white leading-none tracking-tight">
              {vehicleCount} <span className="text-[10px] text-slate-400 uppercase font-bold">Detected Objects</span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="flex gap-1">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={cn(
                  "w-1 h-3 rounded-full",
                  i < (density / 25) ? "bg-blue-400" : "bg-white/10"
                )} />
              ))}
            </div>
            <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Vision_Confidence: 98%</span>
          </div>
        </div>
      </div>

      {/* Emergency Overlay Gradient */}
      <AnimatePresence>
        {isEmergency && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-red-500/5 pointer-events-none z-10 animate-pulse border-2 border-red-500/30"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};
