"use client";

import { Doc } from "@/convex/_generated/dataModel";
import ConvexEventsGridCard from "./ConvexEventsGridCard";

export default function EventsGridView({
  items,
}: {
  items: Array<Doc<"events">>;
}) {
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
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
      {items.map((event, index) => {
        const eventDateTime = new Date(
          `${event.date}T${event.startAt || "00:00"}`,
        );
        const isPast = eventDateTime < currentWarsawDate;
        return (
          <ConvexEventsGridCard
            event={event}
            index={index}
            isPast={isPast}
            key={event._id}
          />
        );
      })}
    </div>
  );
}
