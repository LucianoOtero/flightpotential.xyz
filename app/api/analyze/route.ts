import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://flightpotential-api-eq6gtjzxta-rj.a.run.app";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("[v0] Proxying analyze request to:", `${API_BASE_URL}/analyze`);
    console.log("[v0] Request body:", JSON.stringify(body));

    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    console.log("[v0] Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log("[v0] Error response:", errorText);
      return NextResponse.json(
        { error: `API error: ${response.statusText}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("[v0] Success response received");
    return NextResponse.json(data);
  } catch (error) {
    console.error("[v0] Proxy error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to analyze location" },
      { status: 500 }
    );
  }
}
