"use client";

import { Wind } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Wind className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
              XC Flight Briefing
            </h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Analyze paragliding XC potential in seconds
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
