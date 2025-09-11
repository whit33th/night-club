"use client";

import ImageWithPlaceholder from "@/components/UI/ImageKit/ImageWithPlaceholder";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NextEventsSkeleton from "./NextEventsSkeleton";
import { generateSlug } from "@/lib/slugUtils";

type NextEventsProps = {
  currentId: string;
  currentEventDate: string;
  currentEventTime: string;
  preloadedUpcomingEvents: Preloaded<typeof api.admin.listUpcomingEvents>;
  max?: number;
};

export default function NextEvents({
  currentEventDate,
  currentEventTime,
  preloadedUpcomingEvents,
  max = 3,
}: NextEventsProps) {
  const upcomingEvents = usePreloadedQuery(preloadedUpcomingEvents);

  if (!upcomingEvents) {
    return <NextEventsSkeleton max={4} />;
  }

  const currentDateTime = new Date(`${currentEventDate}T${currentEventTime}`);

  // Filter events that are after the current event (by date and time)
  const eventsAfterCurrent = upcomingEvents.filter((e: Doc<"events">) => {
    const eventDateTime = new Date(`${e.date}T${e.startAt}`);
    return eventDateTime > currentDateTime;
  });

  // Take only the next events, limit to max
  const displayEvents: Doc<"events">[] = eventsAfterCurrent.slice(0, max);

  const afterParam = currentDateTime.toISOString().slice(0, 10);

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
        {displayEvents.map((e: Doc<"events">) => {
          // Generate SEO-friendly URL: event-name-date-id
          const eventSlug = generateSlug(e.title, e.date, e._id);

          // Use ImageKit image
          const imageSrc = e.imageKitPath
            ? e.imageKitPath
            : e.imageKitId
              ? `/${e.imageKitId}`
              : "/imgs/posters/1.jpg";

          // Since we're only showing upcoming events, no need to check if past
          const isPastEvent = false;

          return (
            <Link
              key={e._id}
              href={`/events/${eventSlug}`}
              className={`group relative block h-24 w-24 overflow-hidden rounded-lg border transition hover:opacity-90 sm:h-28 sm:w-28 ${
                isPastEvent
                  ? "border-white/5 bg-white/5 opacity-60"
                  : "border-white/10 bg-white/5"
              }`}
              title={e.title}
            >
              <ImageWithPlaceholder
                src={imageSrc}
                alt={e.title}
                fill
                className={`object-cover transition ${isPastEvent ? "grayscale" : ""}`}
                transformation={[
                  {
                    width: 120,
                    height: 120,
                  },
                ]}
                quality={80}
                blurQuality={10}
                blurAmount={50}
                sizes="120px"
              />
              <div
                className={`pointer-events-none absolute inset-0 ${
                  isPastEvent
                    ? "bg-[radial-gradient(120px_80px_at_30%_20%,black/20,transparent)]"
                    : "bg-[radial-gradient(120px_80px_at_30%_20%,white/10,transparent)]"
                }`}
              />
              {isPastEvent && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="rounded bg-black/60 px-1 py-0.5 text-xs font-medium text-white/80">
                    Past
                  </span>
                </div>
              )}
            </Link>
          );
        })}
        {displayEvents.length === 0 ? (
          <div className="text-xs text-white/50">No events available</div>
        ) : null}
      </div>
    </section>
  );
}
