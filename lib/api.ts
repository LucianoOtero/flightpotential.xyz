// Configurable API base URL
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-backend-url.com";

export interface AnalyzeRequest {
  latitude: number;
  longitude: number;
  date: string;
  location_name: string;
}

export interface AnalyzeResponse {
  score: number;
  classification: string;
  summary: string;
  thermal_strength: string;
  cloud_base_m: number;
  wind_summary: string;
  instability_summary: string;
  cloud_cover_summary: string;
  risks: string[];
  recommended_direction: string;
  best_time_window: string;
  metrics: Record<string, unknown>;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Analyze endpoint
export async function analyzeLocation(data: AnalyzeRequest): Promise<AnalyzeResponse> {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed: ${response.statusText}`);
  }

  return response.json();
}

// Favorites endpoints
export async function getLocations(): Promise<Location[]> {
  const response = await fetch(`${API_BASE_URL}/locations`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch locations: ${response.statusText}`);
  }

  return response.json();
}

export async function createLocation(data: Omit<Location, "id">): Promise<Location> {
  const response = await fetch(`${API_BASE_URL}/locations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create location: ${response.statusText}`);
  }

  return response.json();
}

export async function updateLocation(id: string, data: Partial<Location>): Promise<Location> {
  const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update location: ${response.statusText}`);
  }

  return response.json();
}

export async function deleteLocation(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/locations/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete location: ${response.statusText}`);
  }
}

// PDF report endpoint
export async function downloadReport(data: AnalyzeRequest): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to generate report: ${response.statusText}`);
  }

  return response.blob();
}
