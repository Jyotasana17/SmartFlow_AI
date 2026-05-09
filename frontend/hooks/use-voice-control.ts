"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTrafficStore } from "@/store/traffic-store";

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: { [index: number]: { [index: number]: { transcript: string } } }; resultIndex: number }) => void) | null;
  onend: (() => void) | null;
};

type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

export function useVoiceControl() {
  const router = useRouter();
  const setSelectedJunction = useTrafficStore((state) => state.setSelectedJunction);
  const toggleEmergencyMode = useTrafficStore((state) => state.toggleEmergencyMode);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  const executeCommand = useCallback(
    (raw: string) => {
      const command = raw.toLowerCase();
      if (command.includes("junction 4")) {
        setSelectedJunction("j-04");
        router.push("/monitoring");
      } else if (command.includes("emergency")) {
        toggleEmergencyMode();
        router.push("/emergency");
      } else if (command.includes("forecast") || command.includes("prediction")) {
        router.push("/prediction");
      } else if (command.includes("analytics")) {
        router.push("/analytics");
      }
    },
    [router, setSelectedJunction, toggleEmergencyMode],
  );

  useEffect(() => {
    const SpeechRecognition = (window as SpeechWindow).SpeechRecognition ?? (window as SpeechWindow).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      executeCommand(transcript);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
  }, [executeCommand]);

  const toggleListening = useCallback(() => {
    const recognition = recognitionRef.current;
    if (!recognition) return;
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.start();
      setListening(true);
    }
  }, [listening]);

  return { listening, supported: Boolean(recognitionRef.current), toggleListening };
}
