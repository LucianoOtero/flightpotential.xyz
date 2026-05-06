"use client";

import { MetricCard } from "./metric-card";
import {
  Thermometer,
  Cloud,
  Wind,
  TrendingUp,
  CloudSun,
  AlertTriangle,
  Compass,
  Clock,
} from "lucide-react";
import type { AnalyzeResponse } from "@/lib/api";

interface MetricsGridProps {
  data: AnalyzeResponse;
}

export function MetricsGrid({ data }: MetricsGridProps) {
  const metrics = [
    {
      icon: Thermometer,
      label: "Thermal Strength",
      value: data.thermal_strength,
    },
    {
      icon: Cloud,
      label: "Cloud Base",
      value: `${data.cloud_base_m.toLocaleString()} m`,
    },
    {
      icon: Wind,
      label: "Wind",
      value: data.wind_summary,
    },
    {
      icon: TrendingUp,
      label: "Instability",
      value: data.instability_summary,
    },
    {
      icon: CloudSun,
      label: "Cloud Cover",
      value: data.cloud_cover_summary,
    },
    {
      icon: AlertTriangle,
      label: "Risks",
      value: data.risks.length > 0 ? data.risks.join(", ") : "None identified",
    },
    {
      icon: Compass,
      label: "Recommended Direction",
      value: data.recommended_direction,
    },
    {
      icon: Clock,
      label: "Best Time Window",
      value: data.best_time_window,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.label}
          icon={metric.icon}
          label={metric.label}
          value={metric.value}
        />
      ))}
    </div>
  );
}
