"use client";

import React from "react";

type Mode = "grid" | "list";

type ModeToggleProps = {
  mode: Mode;
  onToggle: () => void;
};

export default function ModeToggle({ mode, onToggle }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="ml-auto rounded-full border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-3 py-1 text-xs font-semibold text-white/85 hover:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]"
      aria-label="Toggle view"
      title={mode === "grid" ? "Switch to list" : "Switch to grid"}
    >
      {mode === "grid" ? "List view" : "Grid view"}
    </button>
  );
}
