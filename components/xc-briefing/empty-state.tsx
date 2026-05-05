"use client";

import { CloudSun } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/50 bg-card/50 px-6 py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CloudSun className="h-8 w-8 text-primary/70" />
      </div>
      <h3 className="mb-2 text-lg font-medium text-foreground">
        Ready to Analyze
      </h3>
      <p className="max-w-sm text-sm text-muted-foreground">
        Enter a flying location and date to analyze XC potential and receive your
        personalized flight briefing.
      </p>
    </div>
  );
}
