"use client";

import { Button } from "@/components/ui/button";
import { ScoreCard } from "./score-card";
import { MetricsGrid } from "./metrics-grid";
import { BriefingSection } from "./briefing-section";
import { Download, Loader2, Plane } from "lucide-react";
import type { AnalyzeResponse } from "@/lib/api";
import type { Classification } from "@/lib/types";

interface ResultDashboardProps {
  data: AnalyzeResponse;
  onDownloadPdf: () => void;
  isDownloading: boolean;
}

export function ResultDashboard({
  data,
  onDownloadPdf,
  isDownloading,
}: ResultDashboardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Plane className="h-4 w-4 text-primary" />
          <h2 className="text-sm font-medium text-foreground">Analysis Results</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onDownloadPdf}
          disabled={isDownloading}
          className="border-border/50 hover:bg-secondary hover:border-primary/50"
        >
          {isDownloading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Download Briefing
            </>
          )}
        </Button>
      </div>

      <ScoreCard
        score={data.score}
        classification={data.classification as Classification}
      />

      <MetricsGrid data={data} />

      <BriefingSection summary={data.summary} />
    </div>
  );
}
