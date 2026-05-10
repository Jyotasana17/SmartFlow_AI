"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, MessageSquare, X } from "lucide-react";
import { useAssistantStore } from "@/store/assistant-store";
import { cn } from "@/lib/utils";

export const FloatingAssistant = () => {
  const { isOpen, toggleOpen, isThinking } = useAssistantStore();

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 45 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleOpen}
            className={cn(
              "relative w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl overflow-hidden group",
              "bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-400/50"
            )}
          >
            {/* Animated Glow Background */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3] 
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute inset-0 bg-blue-400 blur-xl"
            />
            
            <div className="relative z-10">
              {isThinking ? (
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-white rounded-full"
                    />
                  ))}
                </div>
              ) : (
                <Bot className="w-8 h-8 group-hover:scale-110 transition-transform" />
              )}
            </div>

            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-blue-400/30 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
