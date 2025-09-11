"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import HeroImage from "../_components/EventPage/HeroImage";
import InfoCard from "../_components/EventPage/InfoCard";
import NextEvents from "../_components/EventPage/NextEvents";
import PaymentCard from "../_components/EventPage/PaymentCard";
import TopBar from "../_components/EventPage/TopBar";

interface EventPageClientProps {
  preloadedEvent: Preloaded<typeof api.admin.getEvent>;
  preloadedUpcomingEvents: Preloaded<typeof api.admin.listUpcomingEvents>;
}

export default function EventPageClient({
  preloadedEvent,
  preloadedUpcomingEvents,
}: EventPageClientProps) {
  // Use preloaded data
  const event = usePreloadedQuery(preloadedEvent);

  if (!event) {
    return (
      <div className="container m-auto px-4 py-10">
        <p className="text-sm text-neutral-400">Event not found.</p>
      </div>
    );
  }

  // Format artists for display
  const artistsDisplay =
    event.artists?.map((artist: { name: string }) => artist.name).join(", ") ||
    "";

  const subtitle = artistsDisplay || event.title;
  const currency = event.currency ?? "PLN";

  // Use ImageKit image
  const imageSrc = event.imageKitPath ?? "/imgs/posters/1.jpg";

  return (
    <div className="flex h-full flex-col gap-4">
      <TopBar
        date={event.date}
        startAt={event.startAt}
        doorsAt={event.doorsAt}
      />
      <div className="container m-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-[1fr_auto]">
        <HeroImage id={event._id} src={imageSrc} alt={event.title} />

        <InfoCard
          title={event.title}
          subtitle={subtitle}
          artists={event.artists}
          description={event.description}
          dressCode={event.dressCode}
          minAge={event.minAge}
          musicGenres={event.musicGenres}
          priceFrom={event.priceFrom}
          currency={event.currency}
        />

        <PaymentCard
          basePrice={event.priceFrom}
          currency={currency}
          imageSrc={imageSrc}
          title={event.priceFrom === 0 ? "Free Entry" : "General Admission"}
          ticketUrl={event.ticketUrl}
        />
        <NextEvents
          currentId={event._id}
          currentEventDate={event.date}
          currentEventTime={event.startAt}
          preloadedUpcomingEvents={preloadedUpcomingEvents}
        />
      </div>
    </div>
  );
}
