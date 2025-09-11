"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ConvexEventsCard from "@/app/events/_components/EventsPage/ConvexEventsCard";
import { generateSlug } from "@/lib/slugUtils";

export default function EventsGridSSR({
  preloaded,
}: {
  preloaded: Preloaded<typeof api.admin.listUpcomingEvents>;
}) {
  const events = usePreloadedQuery(preloaded);

  // Events are already filtered and sorted by the query, just take first 6
  const sortedEvents = events.slice(0, 12);

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

          // Check if event is past (though it shouldn't be with upcoming events query)
          const warsawTime = new Date().toLocaleString("en-US", {
            timeZone: "Europe/Warsaw",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          });
          const currentWarsawDate = new Date(warsawTime.replace(",", ""));
          const eventDateTime = new Date(
            `${event.date}T${event.startAt || "00:00"}`,
          );
          const isPast = eventDateTime < currentWarsawDate;

          return (
            <ConvexEventsCard
              key={event._id}
              event={event}
              index={index}
              href={`/events/${eventSlug}`}
              isPast={isPast}
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
