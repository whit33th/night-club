"use client";

import Link from "next/link";
import Image from "next/image";
import { mockEvents } from "@/components/data/events";
import { ArrowRight } from "lucide-react";

type NextEventsProps = {
  currentSlug: string;
  max?: number;
};

export default function NextEvents({ currentSlug, max = 3 }: NextEventsProps) {
  const current = mockEvents.find((e) => e.slug === currentSlug);
  const currentDate = current ? new Date(current.date) : new Date();

  const upcoming = mockEvents
    .filter((e) => new Date(e.date).getTime() > currentDate.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, max);

  const afterParam = currentDate.toISOString().slice(0, 10);

  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-neutral-900/15 p-4 shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_300px_at_50%_-20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)]" />
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase tracking-widest text-white/80">
          Next Events
        </h3>
        <Link
          href={{ pathname: "/events", query: { after: afterParam } }}
          className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      <div className="flex items-center gap-3">
        {upcoming.map((e) => (
          <Link
            key={e.slug}
            href={`/events/${e.slug}`}
            className="group relative block h-24 w-24 overflow-hidden rounded-lg border border-white/10 bg-white/5 transition hover:opacity-90 sm:h-28 sm:w-28"
            title={e.title}
          >
            <Image src={e.img} alt={e.title} fill className="object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120px_80px_at_30%_20%,white/10,transparent)]" />
          </Link>
        ))}
        {upcoming.length === 0 ? (
          <div className="text-xs text-white/50">No upcoming events</div>
        ) : null}
      </div>
    </section>
  );
}
