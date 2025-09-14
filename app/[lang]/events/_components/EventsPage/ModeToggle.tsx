"use client";

import React from "react";

type Mode = "grid" | "list";

type ModeToggleProps = {
  mode: Mode;
  onToggle: () => void;
  dict: Dict;
};

export default function ModeToggle({ mode, onToggle, dict }: ModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="ml-auto rounded-full border border-[color-mix(in_srgb,var(--primary)_30%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] px-3 py-1 text-xs font-semibold text-white/85 hover:bg-[color-mix(in_srgb,var(--primary)_15%,transparent)]"
      aria-label={dict?.events?.toggleView || "Toggle view"}
      title={
        mode === "grid"
          ? dict?.events?.switchToList || "Switch to list"
          : dict?.events?.switchToGrid || "Switch to grid"
      }
    >
      {mode === "grid"
        ? dict?.events?.listView || "List view"
        : dict?.events?.gridView || "Grid view"}
    </button>
  );
}
