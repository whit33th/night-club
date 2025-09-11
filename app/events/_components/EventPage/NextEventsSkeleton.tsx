"use client";

interface NextEventsSkeletonProps {
  max?: number;
}

export default function NextEventsSkeleton({
  max = 3,
}: NextEventsSkeletonProps) {
  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-neutral-900/15 p-4 shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_300px_at_50%_-20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)]" />
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-white/80">
          Next Events
        </h3>
        <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
      </header>

      <div className="flex items-center gap-3">
        {Array.from({ length: max }).map((_, index) => (
          <div
            key={index}
            className="relative h-24 w-24 animate-pulse overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:h-28 sm:w-28"
          />
        ))}
      </div>
    </section>
  );
}
