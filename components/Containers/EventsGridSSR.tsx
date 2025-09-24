"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { generateSlug } from "@/lib/slugUtils";
import ConvexEventsCard from "@/app/[lang]/events/_components/EventsPage/ConvexEventsCard";
import { Locale } from "@/lib/i18n-config";
import { Dict } from "@/lib/get-dictionary-client";

export default function EventsGridSSR({
  preloaded,
  lang,
  dict,
}: {
  preloaded: Preloaded<typeof api.admin.listUpcomingEvents>;
  lang: Locale;
  dict: Dict;
}) {
  const events = usePreloadedQuery(preloaded);

  const sortedEvents = events.slice(0, 12);

  return (
    <section className="mt-4">
      <h1 className="sr-only">Events</h1>
      {events.length > 0 && (
        <div className="hidden items-center justify-end xl:flex">
          <Link
            href={`/${lang}/events`}
            className="group inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm uppercase tracking-wide text-white/80 hover:text-white"
          >
            {dict.events.moreEvents}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      )}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-stretch gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
        {sortedEvents.map((event, index) => {
          const eventSlug = generateSlug(event.title, event.date, event._id);

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
              href={`/${lang}/events/${eventSlug}`}
              isPast={isPast}
            />
          );
        })}
      </div>

      {events.length > 0 && (
        <div className="mt-3 flex justify-center xl:hidden">
          <Link
            href={`/${lang}/events`}
            className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur transition-colors"
          >
            {dict.events.moreEvents}
          </Link>
        </div>
      )}
    </section>
  );
}
