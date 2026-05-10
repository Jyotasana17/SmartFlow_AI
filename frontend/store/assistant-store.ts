import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  role: "assistant" | "user" | "system";
  content: string;
  timestamp: string;
}

interface AssistantState {
  isOpen: boolean;
  messages: Message[];
  isThinking: boolean;
  isVoiceActive: boolean;
  toggleOpen: () => void;
  setOpen: (open: boolean) => void;
  addMessage: (message: Omit<Message, "timestamp">) => void;
  setThinking: (thinking: boolean) => void;
  setVoiceActive: (active: boolean) => void;
  clearHistory: () => void;
}

export const useAssistantStore = create<AssistantState>()(
  persist(
    (set) => ({
      isOpen: false,
      messages: [
        {
          role: "assistant",
          content: "System online. SmartFlow Command Assistant ready for deployment. How can I assist you today, Commander?",
          timestamp: new Date().toISOString(),
        },
      ],
      isThinking: false,
      isVoiceActive: false,
      toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
      setOpen: (open) => set({ isOpen: open }),
      addMessage: (msg) =>
        set((state) => ({
          messages: [
            ...state.messages,
            { ...msg, timestamp: new Date().toISOString() },
          ],
        })),
      setThinking: (thinking) => set({ isThinking: thinking }),
      setVoiceActive: (active) => set({ isVoiceActive: active }),
      clearHistory: () =>
        set({
          messages: [
            {
              role: "assistant",
              content: "Memory cleared. System reset. Awaiting instructions.",
              timestamp: new Date().toISOString(),
            },
          ],
        }),
    }),
    {
      name: "smartflow-assistant-storage",
    }
  )
);
