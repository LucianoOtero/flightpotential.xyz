import { XCBriefing } from "@/components/xc-briefing";

export const metadata = {
  title: "XC Flight Briefing - Embed",
  description: "Analyze paragliding XC potential in seconds",
};

export default function EmbedPage() {
  return (
    <div className="min-h-screen bg-background">
      <XCBriefing />
    </div>
  );
}
