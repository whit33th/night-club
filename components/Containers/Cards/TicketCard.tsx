"use client";

import type { ClubEvent } from "@/components/data/events";
import { useFavorites } from "@/components/hooks/useFavorites";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
type TicketCardProps = {
  event: ClubEvent;
  index?: number;
  participantsCount?: number;
};

export default function TicketCard({ event, index }: TicketCardProps) {
  const hasTime = Boolean(event.time);
  const displayTime = hasTime ? event.time : "--:--";
  const viewName = `ticket-${event.slug}`;

  const date = new Date(event.date);
  // const day = date.toLocaleDateString(undefined, { day: "2-digit" });
  // const month = date.toLocaleDateString(undefined, { month: "long" });
  const fullDate = date.toLocaleDateString(undefined, {
    weekday: "long",
    day: "2-digit",
    month: "long",
  });

  // const eventDateTime = new Date(
  //   `${event.date}T${event.time ? event.time : "23:59"}`,
  // );
  // const isPast = eventDateTime.getTime() < Date.now();
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Link
      href={`/events/${event.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded bg-neutral-900/30 p-4 backdrop-blur transition-colors hover:opacity-80 lg:p-5 xl:p-6"
    >
      <Image
        src={event.img}
        alt={event.title}
        width={600}
        height={600}
        className="absolute inset-0 -z-10 h-full w-full rounded-2xl object-cover object-center opacity-30 blur invert"
      />
      {/* Top bar: favorite toggle */}
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          aria-label={
            isFavorite(event.slug) ? "Remove from saved" : "Save event"
          }
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(event.slug);
          }}
          className={`inline-grid h-10 w-10 place-items-center rounded-full border transition ${
            isFavorite(event.slug)
              ? "border-red-500/40 bg-red-500/20 text-red-500 hover:bg-red-500/25"
              : "border-white/15 bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Heart
            className="h-5 w-5"
            {...(isFavorite(event.slug) ? { fill: "currentColor" } : {})}
          />
        </button>
      </div>

      <div className="flex items-stretch gap-4 lg:gap-5 xl:gap-6">
        {/* Left text column */}
        <div className="flex flex-1 flex-col justify-between space-y-2">
          <h3 className="line-clamp-3 text-3xl font-extrabold leading-tight lg:text-[26px]">
            {event.title}
          </h3>
          <div className="space-y-2">
            <p className="mt-1 text-xs uppercase tracking-wide text-white/60">
              {fullDate}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-3xl font-black leading-none tracking-tight lg:text-[34px] xl:text-[38px]">
                {displayTime}
              </span>
            </div>
          </div>
        </div>

        {/* Right square image */}
        <div className="relative aspect-square w-24 flex-1 overflow-hidden rounded-lg md:w-32 lg:w-36 xl:w-40 2xl:w-44">
          <ViewTransition name={viewName}>
            <Image
              src={event.img}
              alt={event.title}
              width={600}
              height={600}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              priority={index !== undefined && index < 3}
            />
          </ViewTransition>
          <div className="pointer-events-none absolute inset-0 rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.25)_100%)]" />
        </div>
      </div>
    </Link>
  );
}
