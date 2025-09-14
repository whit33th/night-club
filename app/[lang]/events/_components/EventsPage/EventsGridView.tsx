"use client";

import { Doc } from "@/convex/_generated/dataModel";
import ConvexEventsGridCard from "./ConvexEventsGridCard";

import { Locale } from "@/lib/i18n-config";
import { isPastEvent } from "@/lib/date-utils";
import { Dict } from "@/lib/get-dictionary-client";

export default function EventsGridView({
  items,
  locale,
  dict,
}: {
  items: Array<Doc<"events">>;
  locale: Locale;
  dict: Dict;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
      {items.map((event, index) => {
        const isPast = isPastEvent(event.date, event.startAt);
        return (
          <ConvexEventsGridCard
            event={event}
            index={index}
            isPast={isPast}
            key={event._id}
            locale={locale}
            dict={dict}
          />
        );
      })}
    </div>
  );
}
