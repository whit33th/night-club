"use client";

import { mockEvents, ClubEvent } from "@/components/data/events";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type UseEventsFiltersResult = {
  filters: string[];
  activeGenre: string;
  after: string | null;
  posters: Array<ClubEvent>;
  setGenre: (value: string) => void;
  clearAfter: () => void;
  mode: "grid" | "list";
  toggleMode: () => void;
};

export function useEventsFilters(): UseEventsFiltersResult {
  const filters: string[] = ["all", "techno", "house", "mixed"];
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
    const base = afterTime
      ? mockEvents.filter((p) => new Date(p.date).getTime() > afterTime)
      : mockEvents;
    return activeGenre === "all"
      ? base
      : base.filter((p) => p.genres?.includes(activeGenre));
  }, [activeGenre, afterTime]);

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
  };
}
