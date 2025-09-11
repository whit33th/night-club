"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex-helpers/react/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type UseEventsFiltersResult = {
  filters: string[];
  activeGenre: string;
  after: string | null;
  posters: Doc<"events">[];
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

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const after = searchParams.get("after");
  const genreParam = (searchParams.get("genre") || "all").toLowerCase();
  const modeParam = (searchParams.get("mode") || "list").toLowerCase();
  const mode: "grid" | "list" = modeParam === "grid" ? "grid" : "list";

  const afterTime = useMemo(() => {
    if (!after) return null as number | null;

    // Parse the date and set to start of day
    const date = new Date(after);
    if (Number.isNaN(date.getTime())) return null;

    // Set to start of the day to include events on that date
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }, [after]);

  const filteredByDate = useMemo(() => {
    if (!eventsData) return [];

    return afterTime
      ? eventsData.filter((p) => {
          const eventDate = new Date(p.date);
          eventDate.setHours(0, 0, 0, 0); // Normalize to start of day for comparison
          return eventDate.getTime() < afterTime;
        })
      : eventsData;
  }, [eventsData, afterTime]);

  const filters: string[] = useMemo(() => {
    // Get unique genres from the date-filtered events only
    const allGenres = new Set<string>();

    filteredByDate.forEach((event) => {
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
  }, [filteredByDate]);

  const activeGenre = filters.includes(genreParam) ? genreParam : "all";

  const posters = useMemo(() => {
    if (!filteredByDate) return [];

    return activeGenre === "all"
      ? filteredByDate
      : filteredByDate.filter((p) => p.musicGenres?.includes(activeGenre));
  }, [filteredByDate, activeGenre]);

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
