"use client";

import { FileText } from "lucide-react";

interface BriefingSectionProps {
  summary: string;
}

export function BriefingSection({ summary }: BriefingSectionProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <FileText className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-medium text-foreground">Pilot Briefing</h2>
      </div>
      <div className="prose prose-sm prose-invert max-w-none">
        <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          {summary}
        </p>
      </div>
    </div>
  );
}
