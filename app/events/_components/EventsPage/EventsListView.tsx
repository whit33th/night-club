"use client";

import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";

type ConvexEvent = {
  _id: string;
  _creationTime: number;
  title: string;
  date: string;
  startAt: string;
  doorsAt?: string;
  imageKitId: string;
  imageKitPath?: string;
  artists?: Array<{
    index?: number;
    name: string;
    imageKitId?: string;
    imageKitPath?: string;
    role?: string;
  }>;
  musicGenres?: string[];
  priceFrom?: number;
  minAge?: number;
  dressCode?: string;
  currency?: string;
  ticketUrl?: string;
  description?: string;
};

type EventsListViewProps = {
  items: Array<ConvexEvent>;
};

export default function EventsListView({ items }: EventsListViewProps) {
  const now = new Date();
  const todayMs = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((p) => {
          const d = new Date(p.date);
          const dd = d.toLocaleString(undefined, { day: "2-digit" });
          const mm = d.toLocaleString(undefined, { month: "2-digit" });
          const eventMs = d.getTime();
          const isPast = eventMs < todayMs;

          // Format artists for display
          const artistsDisplay =
            p.artists?.map((artist) => artist.name).join(", ") || "";

          // Generate SEO-friendly URL: event-name-date-id
          const eventSlug = `${p.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")}-${p.date}-${p._id}`;

          return (
            <ViewTransition name={`event-${p._id}`} key={p._id}>
              <Link
                key={p._id}
                href={`/events/${eventSlug}`}
                className={` ${isPast ? "opacity-35" : "opacity-100 hover:opacity-80"}`}
              >
                <div className="flex justify-between gap-4">
                  <span className="w-24 shrink-0 text-2xl font-extrabold leading-none tracking-tight text-white">
                    {dd}.{mm}
                  </span>
                  <div className="flex-1">
                    <p className="text-lg font-extrabold uppercase leading-tight tracking-tight">
                      {p.title}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/70">
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
