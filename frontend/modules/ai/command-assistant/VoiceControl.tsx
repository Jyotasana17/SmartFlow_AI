"use client";

import { useEffect, useCallback } from "react";
import { useAssistantStore } from "@/store/assistant-store";

export const VoiceControl = () => {
  const { isVoiceActive, setVoiceActive, addMessage, setThinking } = useAssistantStore();

  const handleVoiceInput = useCallback(async (transcript: string) => {
    addMessage({ role: "user", content: transcript });
    setThinking(true);
    setVoiceActive(false);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/assistant/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: transcript }),
      });
      const data = await response.json();
      addMessage({ role: "assistant", content: data.response });
    } catch (error) {
      addMessage({ role: "system", content: "Voice Neural Link failure." });
    } finally {
      setThinking(false);
    }
  }, [addMessage, setThinking, setVoiceActive]);

  useEffect(() => {
    if (!isVoiceActive) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      addMessage({ role: "system", content: "Speech recognition not supported in this browser." });
      setVoiceActive(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleVoiceInput(transcript);
    };

    recognition.onerror = () => {
      setVoiceActive(false);
    };

    recognition.onend = () => {
      setVoiceActive(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isVoiceActive, handleVoiceInput, addMessage, setVoiceActive]);

  return null; // Logic only component
};
