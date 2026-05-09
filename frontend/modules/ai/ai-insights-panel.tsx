"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiInsights } from "@/data/mock-traffic";

export function AIInsightsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={insight}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            className="rounded-md border border-cyan-300/15 bg-cyan-300/5 p-3"
          >
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-cyber-cyan">
              <Sparkles className="h-3.5 w-3.5" />
              Observation {index + 1}
            </div>
            <p className="text-sm text-cyan-50">{insight}</p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
