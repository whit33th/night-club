"use client";

import Link from "next/link";
import { ClubEvent } from "@/components/data/events";
import { unstable_ViewTransition as ViewTransition } from "react";

type EventsListViewProps = {
  items: Array<ClubEvent>;
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
          return (
            <ViewTransition name={`event-${p.id}`} key={p.id}>
              <Link
                key={p.id}
                href={`/events/${p.id}`}
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
                      {(p.venue || (p.artists && p.artists.join(", ")) || "") +
                        (p.city ? ` · ${p.city}` : "")}
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
