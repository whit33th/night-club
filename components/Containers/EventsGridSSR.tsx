"use client";

import ConvexEventsCard from "@/app/[lang]/events/_components/EventsPage/ConvexEventsCard";
import { api } from "@/convex/_generated/api";
import { Dict } from "@/lib/get-dictionary-client";
import { Locale } from "@/lib/i18n-config";
import { generateSlug } from "@/lib/slugUtils";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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

  return (
    <section className="mt-4">
      <h1 className="pb-4 pl-5 text-4xl font-semibold xl:pb-0 2xl:text-5xl">
        {dict.events.title}
      </h1>
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
        {events.map((event, index) => {
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
              imageConfig={{
                width: 350,
                height: 450,
                quality: 90,
                aspectRatio: "4:5",
              }}
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
