"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { AlertTicker } from "@/modules/alerts/alert-ticker";
import { useRealtime } from "@/hooks/use-realtime";
import { cn } from "@/lib/utils";
import { FloatingAssistant } from "@/modules/ai/command-assistant/FloatingAssistant";
import { ChatPanel } from "@/modules/ai/command-assistant/ChatPanel";
import { VoiceControl } from "@/modules/ai/command-assistant/VoiceControl";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  useRealtime();

  const isHumanCentric = pathname?.startsWith("/human-centric");

  return (
    <div className="min-h-screen bg-city-grid bg-[length:44px_44px] font-[var(--font-rajdhani)] text-cyan-50">
      <div className="fixed inset-0 -z-10 bg-hud-radial" />
      {!isHumanCentric && (
        <>
          <Navbar />
          <Sidebar />
        </>
      )}
      <main 
        className={cn(
          "min-h-screen transition-all duration-300",
          isHumanCentric ? "p-0" : "px-3 pb-5 pt-20 lg:pl-24"
        )}
      >
        {!isHumanCentric && <AlertTicker />}
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className={cn("mx-auto", !isHumanCentric && "max-w-[1800px]")}
        >
          {children}
        </motion.div>
      </main>
      <VoiceControl />
      <ChatPanel />
      <FloatingAssistant />
    </div>
  );
}
