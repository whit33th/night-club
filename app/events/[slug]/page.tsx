"use client";

import { use } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import HeroImage from "../_components/EventPage/HeroImage";
import InfoCard from "../_components/EventPage/InfoCard";
import NextEvents from "../_components/EventPage/NextEvents";
import PaymentCard from "../_components/EventPage/PaymentCard";
import TopBar from "../_components/EventPage/TopBar";

export default function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  // Extract event ID from slug (last part after last hyphen)
  const eventId = slug.split("-").pop() || "";

  // Get event from Convex
  const event = useQuery(api.admin.getEvent, { id: eventId as any });

  if (event === undefined) {
    return (
      <div className="container m-auto px-4 py-10">
        <p className="text-sm text-neutral-400">Loading event...</p>
      </div>
    );
  }

  if (event === null) {
    return (
      <div className="container m-auto px-4 py-10">
        <p className="text-sm text-neutral-400">Event not found.</p>
      </div>
    );
  }

  const eventDateTime = event.startAt
    ? `${event.date}T${event.startAt}:00`
    : event.date;

  // Format artists for display
  const artistsDisplay =
    event.artists?.map((artist: { name: string }) => artist.name).join(", ") ||
    "";

  const subtitle = artistsDisplay || event.title;
  const priceFrom = event.priceFrom ?? 20;
  const currency = event.currency ?? "PLN";

  // Use ImageKit image
  const imageSrc = event.imageKitPath
    ? event.imageKitPath
    : event.imageKitId
      ? `/${event.imageKitId}`
      : "/imgs/posters/1.jpg";

  return (
    <div className="flex h-full flex-col gap-4">
      <TopBar date={eventDateTime} />
      <div className="container m-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-[1fr_auto]">
        <HeroImage
          id={event._id}
          imageKitId={event.imageKitId}
          imageKitPath={event.imageKitPath}
          src={imageSrc}
          alt={event.title}
        />

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
        <NextEvents currentId={event._id} />
      </div>
    </div>
  );
}
