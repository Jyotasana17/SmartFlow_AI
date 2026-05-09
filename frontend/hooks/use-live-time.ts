"use client";

import { useEffect, useState } from "react";
import { formatTime } from "@/lib/utils";

export function useLiveTime() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    setTime(formatTime());
    const id = window.setInterval(() => setTime(formatTime()), 1000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}
