"use client";

import React from "react";

type FiltersHeaderProps = {
  title?: string;
  subtitle?: string;
  filters: ReadonlyArray<string>;
  active: string;
  onChange: (value: string) => void;
};

export default function FiltersHeader({
  title = "Upcoming Nights",
  subtitle = "After Dark · Neon Heart · No Sleep Club",
  filters,
  active,
  onChange,
}: FiltersHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-xl">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1200px_400px_at_50%_-50%,color-mix(in_srgb,var(--primary)_25%,transparent),transparent)]" />
      <div className="relative rounded-xl border border-white/10 bg-black/30 p-4 backdrop-blur">
        <h1 className="text-center text-4xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="mt-2 text-center text-xs uppercase tracking-[0.25em] text-white/60">
          {subtitle}
        </p>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => onChange(f)}
              className={`rounded-full border px-3 py-1 text-sm font-semibold transition ${
                active === f
                  ? "border-[color-mix(in_srgb,var(--primary)_60%,transparent)] bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[var(--primary)]"
                  : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
