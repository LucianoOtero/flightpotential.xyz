"use client";

import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
}

export function MetricCard({ icon: Icon, label, value, className }: MetricCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/50 bg-card p-4 transition-colors hover:border-primary/20",
        className
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-1 text-sm font-medium text-foreground leading-relaxed">{value}</p>
        </div>
      </div>
    </div>
  );
}
