"use client";

import { Badge } from "@/components/ui/badge";
import {
  classificationColors,
  classificationScoreColors,
  classificationRingColors,
  type Classification,
} from "@/lib/types";
import { cn } from "@/lib/utils";

interface ScoreCardProps {
  score: number;
  classification: Classification;
}

export function ScoreCard({ score, classification }: ScoreCardProps) {
  const circumference = 2 * Math.PI * 45;
  const progress = (score / 100) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-6 sm:p-8">
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
        {/* Circular Score */}
        <div className="relative">
          <svg className="h-32 w-32 -rotate-90 sm:h-40 sm:w-40">
            {/* Background circle */}
            <circle
              cx="50%"
              cy="50%"
              r="45"
              strokeWidth="8"
              fill="none"
              className="stroke-secondary"
            />
            {/* Progress circle */}
            <circle
              cx="50%"
              cy="50%"
              r="45"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className={cn(
                "transition-all duration-1000 ease-out",
                classificationRingColors[classification]
              )}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset: dashOffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                "text-4xl font-bold sm:text-5xl",
                classificationScoreColors[classification]
              )}
            >
              {score}
            </span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>
        </div>

        {/* Classification */}
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Badge
            variant="outline"
            className={cn(
              "px-4 py-2 text-lg font-semibold",
              classificationColors[classification]
            )}
          >
            {classification}
          </Badge>
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            {getClassificationDescription(classification)}
          </p>
        </div>
      </div>
    </div>
  );
}

function getClassificationDescription(classification: Classification): string {
  switch (classification) {
    case "NO FLY":
      return "Conditions are not suitable for flight. Stay on the ground.";
    case "LIMITED":
      return "Marginal conditions. Suitable for experienced pilots only.";
    case "GOOD":
      return "Favorable conditions for local flights.";
    case "XC DAY":
      return "Excellent conditions for cross-country flights.";
    case "EPIC":
      return "Outstanding conditions. A rare opportunity for epic flights!";
  }
}
