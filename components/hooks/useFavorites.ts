"use client";

import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "favorites_v1";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const list: Array<string> = JSON.parse(raw);
        setFavorites(new Set(list));
      }
    } catch {}
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(Array.from(favorites)),
      );
    } catch {}
  }, [favorites, isHydrated]);

  const isFavorite = useMemo(() => {
    return (slug: string) => favorites.has(slug);
  }, [favorites]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const clearFavorites = () => setFavorites(new Set());

  return { favorites, isFavorite, toggleFavorite, clearFavorites, isHydrated };
}
