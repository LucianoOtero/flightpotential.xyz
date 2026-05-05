"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "./header";
import { InputPanel } from "./input-panel";
import { FavoritesPanel } from "./favorites-panel";
import { ResultDashboard } from "./result-dashboard";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { Footer } from "./footer";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import type { FormData } from "@/lib/types";
import type { AnalyzeResponse, Location } from "@/lib/api";
import {
  analyzeLocation,
  getLocations,
  createLocation,
  deleteLocation,
  downloadReport,
} from "@/lib/api";

const STORAGE_KEY = "xc-briefing-last-analysis";

// Demo favorites for when API is not available
const DEMO_FAVORITES: Location[] = [
  { id: "1", name: "Pedra de São Domingos", latitude: -22.8833, longitude: -46.1667 },
  { id: "2", name: "Córrego do Bom Jesus", latitude: -22.6167, longitude: -45.9 },
  { id: "3", name: "Pico do Gavião", latitude: -22.7667, longitude: -45.5833 },
  { id: "4", name: "Andradas", latitude: -22.0667, longitude: -46.5667 },
];

export function XCBriefing() {
  const [formData, setFormData] = useState<FormData>({
    locationName: "",
    latitude: "",
    longitude: "",
    date: undefined,
  });

  const [favorites, setFavorites] = useState<Location[]>([]);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Load favorites on mount
  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getLocations();
        setFavorites(data);
      } catch {
        // Use demo favorites if API fails
        setFavorites(DEMO_FAVORITES);
      } finally {
        setIsLoadingFavorites(false);
      }
    }
    loadFavorites();
  }, []);

  // Load last analysis from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setResult(parsed.result);
        setFormData({
          ...parsed.formData,
          date: parsed.formData.date ? new Date(parsed.formData.date) : undefined,
        });
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Save analysis to localStorage
  const saveToStorage = useCallback(
    (analysisResult: AnalyzeResponse, data: FormData) => {
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            result: analysisResult,
            formData: {
              ...data,
              date: data.date?.toISOString(),
            },
          })
        );
      } catch {
        // Ignore localStorage errors
      }
    },
    []
  );

  const handleAnalyze = async () => {
    if (!formData.date) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await analyzeLocation({
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        date: format(formData.date, "yyyy-MM-dd"),
        location_name: formData.locationName,
      });

      setResult(response);
      saveToStorage(response, formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
      setResult(null);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSaveFavorite = async () => {
    setIsSaving(true);

    try {
      const newLocation = await createLocation({
        name: formData.locationName,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      });

      setFavorites((prev) => [...prev, newLocation]);
    } catch {
      // If API fails, add locally with a generated ID
      const localLocation: Location = {
        id: Date.now().toString(),
        name: formData.locationName,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      };
      setFavorites((prev) => [...prev, localLocation]);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectFavorite = (location: Location) => {
    setFormData({
      ...formData,
      locationName: location.name,
      latitude: location.latitude.toString(),
      longitude: location.longitude.toString(),
    });
  };

  const handleDeleteFavorite = async (id: string) => {
    setDeletingId(id);

    try {
      await deleteLocation(id);
    } catch {
      // Continue with local deletion even if API fails
    }

    setFavorites((prev) => prev.filter((loc) => loc.id !== id));
    setDeletingId(null);
  };

  const handleDownloadPdf = async () => {
    if (!formData.date) return;

    setIsDownloading(true);

    try {
      const blob = await downloadReport({
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        date: format(formData.date, "yyyy-MM-dd"),
        location_name: formData.locationName,
      });

      // Create download link
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `xc-briefing-${formData.locationName.replace(/\s+/g, "-")}-${format(
        formData.date,
        "yyyy-MM-dd"
      )}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
            {/* Left sidebar */}
            <div className="space-y-4">
              <InputPanel
                formData={formData}
                setFormData={setFormData}
                onAnalyze={handleAnalyze}
                onSaveFavorite={handleSaveFavorite}
                isAnalyzing={isAnalyzing}
                isSaving={isSaving}
              />
              <FavoritesPanel
                favorites={favorites}
                onSelect={handleSelectFavorite}
                onDelete={handleDeleteFavorite}
                isLoading={isLoadingFavorites}
                deletingId={deletingId}
              />
            </div>

            {/* Main content */}
            <div>
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card/50 px-6 py-16">
                  <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
                  <h3 className="text-lg font-medium text-foreground">
                    Analyzing Conditions
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Processing meteorological data...
                  </p>
                </div>
              ) : error ? (
                <ErrorState message={error} onRetry={handleAnalyze} />
              ) : result ? (
                <ResultDashboard
                  data={result}
                  onDownloadPdf={handleDownloadPdf}
                  isDownloading={isDownloading}
                />
              ) : (
                <EmptyState />
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
