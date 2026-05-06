export type Classification = "NO FLY" | "LIMITED" | "GOOD" | "XC DAY" | "EPIC";

export interface FormData {
  locationName: string;
  latitude: string;
  longitude: string;
  date: Date | undefined;
}

export const classificationColors: Record<Classification, string> = {
  "NO FLY": "bg-red-500/20 text-red-400 border-red-500/30",
  "LIMITED": "bg-orange-500/20 text-orange-400 border-orange-500/30",
  "GOOD": "bg-green-500/20 text-green-400 border-green-500/30",
  "XC DAY": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "EPIC": "bg-amber-500/20 text-amber-400 border-amber-500/30",
};

export const classificationScoreColors: Record<Classification, string> = {
  "NO FLY": "text-red-400",
  "LIMITED": "text-orange-400",
  "GOOD": "text-green-400",
  "XC DAY": "text-blue-400",
  "EPIC": "text-amber-400",
};

export const classificationRingColors: Record<Classification, string> = {
  "NO FLY": "stroke-red-500",
  "LIMITED": "stroke-orange-500",
  "GOOD": "stroke-green-500",
  "XC DAY": "stroke-blue-500",
  "EPIC": "stroke-amber-500",
};

export function getClassificationFromScore(score: number): Classification {
  if (score < 20) return "NO FLY";
  if (score < 40) return "LIMITED";
  if (score < 60) return "GOOD";
  if (score < 80) return "XC DAY";
  return "EPIC";
}
