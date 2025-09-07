"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type ConvexEvent = {
  _id: string;
  _creationTime: number;
  title: string;
  date: string;
  startAt: string;
  doorsAt?: string;
  imageKitId: string;
  imageKitPath?: string;
  artists?: Array<{
    index?: number;
    name: string;
    imageKitId?: string;
    imageKitPath?: string;
    role?: string;
  }>;
  musicGenres?: string[];
  priceFrom?: number;
  minAge?: number;
  dressCode?: string;
  currency?: string;
  ticketUrl?: string;
  description?: string;
};

type UseEventsFiltersResult = {
  filters: string[];
  activeGenre: string;
  after: string | null;
  posters: Array<ConvexEvent>;
  setGenre: (value: string) => void;
  clearAfter: () => void;
  mode: "grid" | "list";
  toggleMode: () => void;
  isLoading: boolean;
};

export function useEventsFilters(): UseEventsFiltersResult {
  // Get events from Convex
  const eventsData = useQuery(api.admin.listEvents);
  const isLoading = eventsData === undefined;

  const filters: string[] = useMemo(() => {
    if (!eventsData) return ["all"];

    // Get all unique genres from events
    const allGenres = new Set<string>();

    eventsData.forEach((event) => {
      if (event.musicGenres && Array.isArray(event.musicGenres)) {
        event.musicGenres.forEach((genre) => {
          if (genre && typeof genre === "string") {
            allGenres.add(genre.toLowerCase());
          }
        });
      }
    });

    // Convert to array and sort, with "all" at the beginning
    return ["all", ...Array.from(allGenres).sort()];
  }, [eventsData]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const after = searchParams.get("after");
  const genreParam = (searchParams.get("genre") || "all").toLowerCase();
  const activeGenre = filters.includes(genreParam) ? genreParam : "all";
  const modeParam = (searchParams.get("mode") || "list").toLowerCase();
  const mode: "grid" | "list" = modeParam === "grid" ? "grid" : "list";

  const afterTime = useMemo(() => {
    if (!after) return null as number | null;

    const t = new Date(after).getTime();
    return Number.isNaN(t) ? null : t;
  }, [after]);

  const posters = useMemo(() => {
    if (!eventsData) return [];

    const base = afterTime
      ? eventsData.filter((p) => new Date(p.date).getTime() > afterTime)
      : eventsData;

    return activeGenre === "all"
      ? base
      : base.filter((p) => p.musicGenres?.includes(activeGenre));
  }, [eventsData, activeGenre, afterTime]);

  const setGenre = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("genre");
    else params.set("genre", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearAfter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("after");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleMode = () => {
    const params = new URLSearchParams(searchParams.toString());
    const next = mode === "grid" ? "list" : "grid";
    if (next === "list") params.delete("mode");
    else params.set("mode", next);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    filters,
    activeGenre,
    after,
    posters,
    setGenre,
    clearAfter,
    mode,
    toggleMode,
    isLoading,
  };
}
