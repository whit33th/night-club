"use client";

import { use } from "react";
import HeroImage from "../_components/EventPage/HeroImage";
import InfoCard from "../_components/EventPage/InfoCard";
import NextEvents from "../_components/EventPage/NextEvents";
import PaymentCard from "../_components/EventPage/PaymentCard";
import TopBar from "../_components/EventPage/TopBar";
import { mockEvents, ClubEvent } from "@/components/data/events";

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const event: ClubEvent | undefined = mockEvents.find((e) => e.slug === id);

  if (!event) {
    return (
      <div className="container m-auto px-4 py-10">
        <p className="text-sm text-neutral-400">Event not found.</p>
      </div>
    );
  }

  const eventDateTime = event.time
    ? `${event.date}T${event.time}:00`
    : event.date;
  const subtitle =
    event.subtitle ??
    [event.venue, event.city, event.genres?.join("/")]
      .filter(Boolean)
      .join(" • ");
  const price = event.entry === "free" ? 0 : (event.price ?? 20);
  const currency = event.currency ?? "PLN";

  return (
    <div className="flex h-full flex-col gap-4">
      <TopBar date={eventDateTime} />
      <div className="container m-auto grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-[1fr_auto]">
        <HeroImage id={event.slug} src={event.img} alt={event.title} />

        <InfoCard title={event.title} subtitle={subtitle} />

        <PaymentCard
          basePrice={price}
          currency={currency}
          imageSrc={event.img}
          title={event.entry === "free" ? "Free Entry" : "General Admission"}
        />
        <NextEvents currentSlug={id} />
      </div>
    </div>
  );
}
