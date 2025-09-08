"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ConvexEventsCard from "@/app/events/_components/EventsPage/ConvexEventsCard";

// Generate SEO-friendly slug
const generateSlug = (title: string, date: string, id: string) => {
  const titleSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${titleSlug}-${date}-${id}`;
};

export default function ConvexEventsGridSSR({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.admin.listEvents>;
}) {
  const events = usePreloadedQuery(preloaded);

  // Sort events by date and take first 6
  const sortedEvents = [...events]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 6);

  return (
    <section className="mt-4">
      <div className="hidden items-center justify-end xl:flex">
        <Link
          href="/events"
          className="group inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm uppercase tracking-wide text-white/80 hover:text-white"
        >
          More Events
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
        {sortedEvents.map((event, index) => {
          const eventSlug = generateSlug(event.title, event.date, event._id);
          return (
            <ConvexEventsCard
              key={event._id}
              event={event}
              index={index}
              href={`/events/${eventSlug}`}
            />
          );
        })}
      </div>

      <div className="mt-3 flex justify-center xl:hidden">
        <Link
          href="/events"
          className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur transition-colors"
        >
          More Events
        </Link>
      </div>
    </section>
  );
}
