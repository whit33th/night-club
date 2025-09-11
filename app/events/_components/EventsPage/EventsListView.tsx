"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { generateSlug } from "@/lib/slugUtils";

type EventsListViewProps = {
  items: Array<Doc<"events">>;
};

export default function EventsListView({ items }: EventsListViewProps) {
  // Get current time in Warsaw timezone
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

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => {
          const d = new Date(p.date);
          const dd = d.toLocaleString(undefined, { day: "2-digit" });
          const mm = d.toLocaleString(undefined, { month: "2-digit" });
          const eventDateTime = new Date(`${p.date}T${p.startAt || "00:00"}`);
          const isPast = eventDateTime < currentWarsawDate;

          // Format artists for display
          const artistsDisplay =
            p.artists?.map((artist) => artist.name).join(", ") || "";

          // Generate SEO-friendly URL: event-name-date-id
          const eventSlug = generateSlug(p.title, p.date, p._id);

          return (
            <ViewTransition name={`event-${p._id}`} key={p._id}>
              <Link
                key={p._id}
                href={`/events/${eventSlug}`}
                className={`relative ${isPast ? "opacity-50" : "opacity-100 hover:opacity-80"}`}
              >
                <div className="flex justify-between gap-4">
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
                </div>
              </Link>
            </ViewTransition>
          );
        })}
      </div>
    </div>
  );
}
