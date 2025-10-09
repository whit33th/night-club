"use client";

import { useLanguage } from "@/components/Providers/LanguageProvider";
import { useLocalizedLink } from "@/components/Providers/useLocalizedLink";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { generateSlug } from "@/lib/slugUtils";
import { Image } from "@imagekit/next";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import NextEventsSkeleton from "./NextEventsSkeleton";

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
  max = 6,
}: NextEventsProps) {
  const { dict } = useLanguage();
  const localizedLink = useLocalizedLink();
  const upcomingEvents = usePreloadedQuery(preloadedUpcomingEvents);

  if (!upcomingEvents) {
    return <NextEventsSkeleton max={max} />;
  }

  const currentDateTime = new Date(`${currentEventDate}T${currentEventTime}`);

  const eventsAfterCurrent = upcomingEvents.filter((e: Doc<"events">) => {
    const eventDateTime = new Date(`${e.date}T${e.startAt}`);
    return eventDateTime > currentDateTime;
  });

  const displayEvents: Doc<"events">[] = eventsAfterCurrent.slice(0, max);

  return (
    <section className="relative w-full overflow-hidden rounded-xl bg-neutral-900/15 p-4 shadow-xl backdrop-blur">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_300px_at_50%_-20%,color-mix(in_srgb,var(--primary)_14%,transparent),transparent)]" />
      <header className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold uppercase text-white/80">
          {dict.events.nextEvents}
        </h3>
        <Link
          href={localizedLink("events")}
          className="group inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 transition hover:bg-white/10"
        >
          {dict.events.viewAll}
          <ArrowRight className="h-3 w-3" />
        </Link>
      </header>

      <ul
        about="Next Events"
        className="flex flex-nowrap items-center gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar-button]:hidden [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5"
        data-lenis-prevent
        data-lenis-prevent-wheel
        data-lenis-prevent-touch
        style={{
          overscrollBehavior: "contain",
          WebkitOverflowScrolling: "touch",
          isolation: "isolate",
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(255, 255, 255, 0.3) transparent",
        }}
        onWheel={(e) => {
          const container = e.currentTarget;
          const atLeft = container.scrollLeft === 0;
          const atRight =
            container.scrollLeft >=
            container.scrollWidth - container.clientWidth;

          if ((e.deltaX < 0 && atLeft) || (e.deltaX > 0 && atRight)) {
            return;
          }

          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          const container = e.currentTarget;
          (
            container.style as React.CSSProperties & {
              webkitOverflowScrolling?: string;
            }
          ).webkitOverflowScrolling = "touch";
        }}
      >
        {displayEvents.map((e: Doc<"events">, index: number) => {
          const eventSlug = generateSlug(e.title, e.date, e._id);

          const isPastEvent = false;

          return (
            <li key={e._id}>
              <Link
                href={localizedLink(`events/${eventSlug}`)}
                className={`group relative block aspect-square h-24 w-24 overflow-hidden rounded-lg border transition hover:opacity-90 sm:h-28 sm:w-28 ${
                  isPastEvent
                    ? "border-white/5 bg-white/5 opacity-60"
                    : "border-white/10 bg-white/5"
                } ${index >= 4 ? "hidden sm:block" : ""}`}
                title={e.title}
              >
                <Image
                  src={e.imageKitPath!}
                  alt={e.title}
                  className={`aspect-square object-cover transition ${isPastEvent ? "grayscale" : ""}`}
                  width={112}
                  height={112}
                  transformation={[
                    {
                      format: "webp",
                      crop: "maintain_ratio",
                      quality: 40,
                    },
                  ]}
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
            </li>
          );
        })}
        {displayEvents.length === 0 ? (
          <div className="text-xs text-white/50">
            {dict.events.noEventsAvailable}
          </div>
        ) : null}
      </ul>
    </section>
  );
}
