"use client";

import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="glass-panel max-w-xl rounded-lg p-6 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-md border border-red-300/30 bg-red-500/10 text-red-100">
          <TriangleAlert className="h-7 w-7" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold text-cyan-50">SmartFlow console recovered</h1>
        <p className="mt-2 text-sm text-cyan-100/65">{error.message || "A dashboard module failed to render."}</p>
        <Button className="mt-5" onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    </div>
  );
}
