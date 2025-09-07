"use client";

import ConvexEventsCard from "./ConvexEventsCard";

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

type EventsGridViewProps = {
  items: Array<ConvexEvent>;
};

export default function EventsGridView({ items }: EventsGridViewProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
      {items.map((event, index) => (
        <ConvexEventsCard key={event._id} event={event} index={index} />
      ))}
    </div>
  );
}
