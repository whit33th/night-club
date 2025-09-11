"use client";

import { useState, useCallback, useMemo } from "react";

export interface FilterOption<T = string> {
  value: T;
  label: string;
  count?: number;
}

export interface FilterState<T = string> {
  selected: T[];
  searchQuery: string;
}

export interface UseFiltersProps<T = string> {
  initialFilters?: Partial<FilterState<T>>;
  options: FilterOption<T>[];
  onFiltersChange?: (filters: FilterState<T>) => void;
}

export function useFilters<T = string>({
  initialFilters = {},
  options,
  onFiltersChange,
}: UseFiltersProps<T>) {
  const [filters, setFilters] = useState<FilterState<T>>({
    selected: initialFilters.selected || [],
    searchQuery: initialFilters.searchQuery || "",
  });

  const updateFilters = useCallback(
    (updates: Partial<FilterState<T>>) => {
      setFilters((prev) => {
        const newFilters = { ...prev, ...updates };
        onFiltersChange?.(newFilters);
        return newFilters;
      });
    },
    [onFiltersChange],
  );

  const toggleFilter = useCallback(
    (value: T) => {
      updateFilters({
        selected: filters.selected.includes(value)
          ? filters.selected.filter((v) => v !== value)
          : [...filters.selected, value],
      });
    },
    [filters.selected, updateFilters],
  );

  const setSearchQuery = useCallback(
    (query: string) => {
      updateFilters({ searchQuery: query });
    },
    [updateFilters],
  );

  const clearFilters = useCallback(() => {
    updateFilters({ selected: [], searchQuery: "" });
  }, [updateFilters]);

  const clearSearchQuery = useCallback(() => {
    updateFilters({ searchQuery: "" });
  }, [updateFilters]);

  const clearSelectedFilters = useCallback(() => {
    updateFilters({ selected: [] });
  }, [updateFilters]);

  // Computed values
  const hasActiveFilters = useMemo(
    () => filters.selected.length > 0 || filters.searchQuery.length > 0,
    [filters.selected.length, filters.searchQuery.length],
  );

  const filteredOptions = useMemo(() => {
    if (!filters.searchQuery) return options;

    const query = filters.searchQuery.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().includes(query),
    );
  }, [options, filters.searchQuery]);

  const selectedOptions = useMemo(() => {
    return options.filter((option) => filters.selected.includes(option.value));
  }, [options, filters.selected]);

  return {
    filters,
    setFilters: updateFilters,
    toggleFilter,
    setSearchQuery,
    clearFilters,
    clearSearchQuery,
    clearSelectedFilters,
    hasActiveFilters,
    filteredOptions,
    selectedOptions,
    activeFiltersCount: filters.selected.length,
  };
}
