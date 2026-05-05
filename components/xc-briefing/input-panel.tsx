"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, MapPin, Star, Navigation } from "lucide-react";
import type { FormData } from "@/lib/types";

interface InputPanelProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onAnalyze: () => void;
  onSaveFavorite: () => void;
  isAnalyzing: boolean;
  isSaving: boolean;
}

export function InputPanel({
  formData,
  setFormData,
  onAnalyze,
  onSaveFavorite,
  isAnalyzing,
  isSaving,
}: InputPanelProps) {
  const isValid =
    formData.locationName.trim() &&
    formData.latitude &&
    formData.longitude &&
    formData.date;

  return (
    <div className="rounded-xl border border-border/50 bg-card p-4 sm:p-6">
      <div className="mb-4 flex items-center gap-2">
        <Navigation className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-medium text-foreground">Flight Location</h2>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="locationName" className="text-xs text-muted-foreground">
            Location Name
          </Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="locationName"
              placeholder="e.g., Pedra de São Domingos"
              value={formData.locationName}
              onChange={(e) =>
                setFormData({ ...formData, locationName: e.target.value })
              }
              className="pl-10 bg-secondary/50 border-border/50 focus:border-primary/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="latitude" className="text-xs text-muted-foreground">
              Latitude
            </Label>
            <Input
              id="latitude"
              type="number"
              step="any"
              placeholder="-22.9068"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
              className="bg-secondary/50 border-border/50 focus:border-primary/50 font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="longitude" className="text-xs text-muted-foreground">
              Longitude
            </Label>
            <Input
              id="longitude"
              type="number"
              step="any"
              placeholder="-43.1729"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
              className="bg-secondary/50 border-border/50 focus:border-primary/50 font-mono text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-secondary/50 border-border/50 hover:bg-secondary hover:border-primary/50",
                  !formData.date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? (
                  format(formData.date, "PPP")
                ) : (
                  <span>Select date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => setFormData({ ...formData, date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            onClick={onAnalyze}
            disabled={!isValid || isAnalyzing}
            className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onSaveFavorite}
            disabled={!isValid || isSaving}
            className="border-border/50 hover:bg-secondary hover:border-primary/50"
            title="Save as favorite"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Star className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
