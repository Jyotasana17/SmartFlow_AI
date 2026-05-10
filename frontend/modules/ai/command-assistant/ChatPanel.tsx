"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Mic, MicOff, Bot, Trash2, Maximize2, Minimize2, Sparkles, Terminal } from "lucide-react";
import { useAssistantStore, Message } from "@/store/assistant-store";
import { cn } from "@/lib/utils";

export const ChatPanel = () => {
  const { 
    isOpen, 
    setOpen, 
    messages, 
    addMessage, 
    isThinking, 
    setThinking, 
    clearHistory,
    isVoiceActive,
    setVoiceActive 
  } = useAssistantStore();
  
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    addMessage({ role: "user", content: userMessage });
    setThinking(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(-5) // Send last 5 messages for context
        }),
      });

      const data = await response.json();
      addMessage({ role: "assistant", content: data.response });
    } catch (error) {
      addMessage({ 
        role: "system", 
        content: "Error: Failed to connect to Neural Link. Please verify your connection." 
      });
    } finally {
      setThinking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      className="fixed bottom-28 right-8 z-[100] w-[450px] h-[650px] bg-[#020617]/80 backdrop-blur-2xl border border-blue-500/30 rounded-2xl shadow-[0_0_50px_rgba(30,58,138,0.3)] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-blue-500/20 bg-blue-900/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
             <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
               <Bot className="w-5 h-5 text-white" />
             </div>
             <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#020617] animate-pulse" />
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Command_Assistant</h3>
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest opacity-70 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Neural Link: Stable
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={clearHistory} className="p-1.5 hover:bg-white/5 rounded-md text-slate-500 hover:text-red-400 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/5 rounded-md text-slate-500 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent" 
        ref={scrollRef}
      >
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <motion.div
              initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
              animate={{ opacity: 1, x: 0 }}
              key={idx}
              className={cn(
                "flex flex-col max-w-[85%]",
                msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "p-3 rounded-xl text-sm leading-relaxed",
                msg.role === 'user' 
                  ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-900/20" 
                  : msg.role === 'system'
                    ? "bg-red-500/10 text-red-400 border border-red-500/20 italic font-mono text-[11px]"
                    : "bg-white/[0.03] text-slate-300 border border-white/[0.05] rounded-tl-none"
              )}>
                {msg.content}
              </div>
              <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1 opacity-50 px-1">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour12: false })}
              </span>
            </motion.div>
          ))}
          {isThinking && (
            <div className="flex gap-1.5 p-3 bg-white/[0.02] rounded-xl w-16">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-blue-400 rounded-full"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-blue-500/20 bg-blue-900/5">
        <div className="relative flex items-center gap-2">
          <button 
            onClick={() => setVoiceActive(!isVoiceActive)}
            className={cn(
              "p-2.5 rounded-xl border transition-all duration-300",
              isVoiceActive 
                ? "bg-red-500/20 border-red-400 text-red-400 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
            )}
          >
            {isVoiceActive ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <div className="relative flex-1 group">
            <div className="absolute inset-0 bg-blue-500/5 blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Enter tactical query..."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-all relative z-10"
            />
          </div>

          <button 
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            className="p-2.5 bg-blue-600 hover:bg-blue-50 rounded-xl text-white hover:text-blue-600 transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:grayscale"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[8px] font-black text-slate-600 uppercase tracking-[0.3em]">
          <Terminal className="w-2.5 h-2.5" />
          <span>Awaiting user authentication... Secure Channel v4.0</span>
        </div>
      </div>
    </motion.div>
  );
};
