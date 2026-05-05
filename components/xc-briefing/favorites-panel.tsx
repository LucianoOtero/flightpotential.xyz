"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MapPin, Trash2, Loader2 } from "lucide-react";
import type { Location } from "@/lib/api";

interface FavoritesPanelProps {
  favorites: Location[];
  onSelect: (location: Location) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
  deletingId: string | null;
}

export function FavoritesPanel({
  favorites,
  onSelect,
  onDelete,
  isLoading,
  deletingId,
}: FavoritesPanelProps) {
  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Heart className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-medium text-foreground">Favorite Locations</h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <MapPin className="mb-2 h-8 w-8 text-muted-foreground/50" />
          <p className="text-sm text-muted-foreground">No saved locations</p>
          <p className="text-xs text-muted-foreground/70">
            Save a location to quickly access it later
          </p>
        </div>
      ) : (
        <ScrollArea className="h-[200px] sm:h-[280px]">
          <div className="space-y-2 pr-4">
            {favorites.map((location) => (
              <div
                key={location.id}
                className="group flex items-center gap-2 rounded-lg border border-border/30 bg-secondary/30 p-3 transition-colors hover:border-primary/30 hover:bg-secondary/50"
              >
                <button
                  onClick={() => onSelect(location)}
                  className="flex flex-1 flex-col items-start gap-1 text-left"
                >
                  <span className="text-sm font-medium text-foreground">
                    {location.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                  </span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(location.id)}
                  disabled={deletingId === location.id}
                  className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive"
                >
                  {deletingId === location.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
