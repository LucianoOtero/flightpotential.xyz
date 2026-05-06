"use client";

import { AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-card/30 px-4 py-3 sm:px-6">
      <div className="flex items-center justify-center gap-2 text-center">
        <AlertTriangle className="h-3 w-3 shrink-0 text-muted-foreground/70" />
        <p className="text-xs text-muted-foreground/70">
          Forecast guidance only. Final flight decision is always the pilot&apos;s
          responsibility.
        </p>
      </div>
    </footer>
  );
}
