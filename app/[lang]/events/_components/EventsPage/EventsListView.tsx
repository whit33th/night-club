"use client";

import { useLocalizedLink } from "@/components/Providers/useLocalizedLink";
import { Doc } from "@/convex/_generated/dataModel";
import { isPastEvent } from "@/lib/date-utils";
import { generateSlug } from "@/lib/slugUtils";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

type EventsListViewProps = {
  items: Array<Doc<"events">>;
};

export default function EventsListView({ items }: EventsListViewProps) {
  const localizedLink = useLocalizedLink();
  return (
    <div className="mx-auto w-full max-w-6xl">
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => {
          const d = new Date(p.date);
          const dd = d.toLocaleString(undefined, { day: "2-digit" });
          const mm = d.toLocaleString(undefined, { month: "2-digit" });
          const isPast = isPastEvent(p.date, p.startAt);

          const artistsDisplay =
            p.artists?.map((artist) => artist.name).join(", ") || "";

          const eventSlug = generateSlug(p.title, p.date, p._id);

          return (
            <ViewTransition name={`event-${p._id}`} key={p._id}>
              <Link
                key={p._id}
                href={localizedLink(`events/${eventSlug}`)}
                className={`relative ${isPast ? "opacity-50" : "opacity-100 hover:opacity-80"}`}
              >
                <article className="flex justify-between gap-4">
                  <span
                    className={`w-24 shrink-0 text-2xl font-extrabold leading-none tracking-tight ${
                      isPast ? "text-white/60" : "text-white"
                    }`}
                  >
                    {dd}.{mm}
                  </span>
                  <div className="flex-1">
                    <p
                      className={`text-lg font-extrabold uppercase leading-tight tracking-tight ${
                        isPast ? "text-white/70" : ""
                      }`}
                    >
                      {p.title}
                    </p>
                    <p
                      className={`text-[10px] uppercase tracking-[0.25em] ${
                        isPast ? "text-white/50" : "text-white/70"
                      }`}
                    >
                      {artistsDisplay}
                    </p>
                  </div>
                </article>
              </Link>
            </ViewTransition>
          );
        })}
      </section>
    </div>
  );
}
