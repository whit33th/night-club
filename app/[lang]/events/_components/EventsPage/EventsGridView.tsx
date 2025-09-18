"use client";

import { Doc } from "@/convex/_generated/dataModel";
import ConvexEventsGridCard from "./ConvexEventsGridCard";
import { isPastEvent } from "@/lib/date-utils";

export default function EventsGridView({
  items,
}: {
  items: Array<Doc<"events">>;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-stretch gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
      {items.map((event, index) => {
        const isPast = isPastEvent(event.date, event.startAt);
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
