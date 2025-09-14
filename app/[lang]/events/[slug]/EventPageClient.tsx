"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import HeroImage from "../_components/EventPage/HeroImage";
import InfoCard from "../_components/EventPage/InfoCard";
import NextEvents from "../_components/EventPage/NextEvents";
import PaymentCard from "../_components/EventPage/PaymentCard";
import TopBar from "../_components/EventPage/TopBar";
import { Locale } from "@/lib/i18n-config";
import { Dict } from "@/lib/get-dictionary-client";

interface EventPageClientProps {
  preloadedEvent: Preloaded<typeof api.admin.getEvent>;
  preloadedUpcomingEvents: Preloaded<typeof api.admin.listUpcomingEvents>;

  dict: Dict;
  locale: Locale;
}

export default function EventPageClient({
  preloadedEvent,
  preloadedUpcomingEvents,
  dict,
  locale,
}: EventPageClientProps) {
  const event = usePreloadedQuery(preloadedEvent);

  if (!event) {
    return (
      <div className="container m-auto px-4 py-10">
        <p className="text-sm text-neutral-400">{dict.events.eventNotFound}</p>
      </div>
    );
  }

  const artistsDisplay =
    event.artists?.map((artist: { name: string }) => artist.name).join(", ") ||
    "";

  const subtitle = artistsDisplay || event.title;
  const currency = event.currency ?? "PLN";

  const imageSrc = event.imageKitPath ?? "/imgs/posters/1.jpg";

  return (
    <div className="flex h-full flex-col gap-4">
      <TopBar
        date={event.date}
        startAt={event.startAt}
        doorsAt={event.doorsAt}
        dict={dict}
        locale={locale}
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
          dict={dict}
        />

        <PaymentCard
          basePrice={event.priceFrom}
          currency={currency}
          imageSrc={imageSrc}
          title={
            event.priceFrom === 0
              ? dict.events.freeEntry
              : dict.events.generalAdmission
          }
          ticketUrl={event.ticketUrl}
          dict={dict}
        />
        <NextEvents
          currentId={event._id}
          currentEventDate={event.date}
          currentEventTime={event.startAt}
          preloadedUpcomingEvents={preloadedUpcomingEvents}
          dict={dict}
        />
      </div>
    </div>
  );
}
