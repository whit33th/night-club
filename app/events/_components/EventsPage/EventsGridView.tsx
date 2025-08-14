"use client";

import EventsCard from "@/components/Containers/Cards/EventsCard";
import { ClubEvent } from "@/components/data/events";

type EventsGridViewProps = {
  items: Array<ClubEvent>;
};

export default function EventsGridView({ items }: EventsGridViewProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
      {items.map((event, index) => (
        <EventsCard key={event.id} event={event} index={index} />
      ))}
    </div>
  );
}
