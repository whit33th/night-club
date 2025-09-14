"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex-helpers/react/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type UseMixedEventsFiltersResult = {
  filters: string[];
  activeGenre: string;
  posters: Doc<"events">[];
  setGenre: (value: string) => void;
  mode: "grid" | "list";
  toggleMode: () => void;
  isLoading: boolean;
};

export function useMixedEventsFilters(): UseMixedEventsFiltersResult {
  const upcomingEvents = useQuery(api.admin.listUpcomingEvents, {});
  const pastEvents = useQuery(api.admin.listPastEvents, { limit: 3 });

  const isLoading = upcomingEvents === undefined || pastEvents === undefined;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const genreParam = (searchParams.get("genre") || "all").toLowerCase();
  const modeParam = (searchParams.get("mode") || "list").toLowerCase();
  const mode: "grid" | "list" = modeParam === "grid" ? "grid" : "list";

  const allEvents = useMemo(() => {
    if (!upcomingEvents || !pastEvents) return [];

    if (mode === "list") {
      return [...pastEvents, ...upcomingEvents];
    } else {
      return [...upcomingEvents, ...pastEvents];
    }
  }, [upcomingEvents, pastEvents, mode]);

  const filters: string[] = useMemo(() => {
    const allGenres = new Set<string>();

    allEvents.forEach((event) => {
      if (event.musicGenres && Array.isArray(event.musicGenres)) {
        event.musicGenres.forEach((genre) => {
          if (genre && typeof genre === "string") {
            allGenres.add(genre.toLowerCase());
          }
        });
      }
    });

    return ["all", ...Array.from(allGenres).sort()];
  }, [allEvents]);

  const activeGenre = filters.includes(genreParam) ? genreParam : "all";

  const posters = useMemo(() => {
    if (!allEvents) return [];

    return activeGenre === "all"
      ? allEvents
      : allEvents.filter((p) => p.musicGenres?.includes(activeGenre));
  }, [allEvents, activeGenre]);

  const setGenre = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") params.delete("genre");
    else params.set("genre", value);
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
    posters,
    setGenre,
    mode,
    toggleMode,
    isLoading,
  };
}
