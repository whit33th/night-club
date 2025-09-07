"use client";

import { Image } from "@imagekit/next";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { motion } from "framer-motion";

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

export default function ConvexEventsCard({
  event,
  index,
}: {
  event: ConvexEvent;
  index: number;
}) {
  const locale = "en-US";
  const date = new Date(event.date);
  const month = date.toLocaleString(locale, { month: "short" });
  const day = date.toLocaleString(locale, { day: "2-digit" });

  // Use imageKitPath if available (new format), otherwise fall back to imageKitId (legacy)
  const imageSrc = event.imageKitPath
    ? event.imageKitPath
    : event.imageKitId
      ? `/${event.imageKitId}`
      : "/imgs/posters/1.jpg"; // fallback

  // Format artists for display
  const artistsDisplay =
    event.artists?.map((artist) => artist.name).join(", ") || "Various Artists";

  // Generate SEO-friendly URL: event-name-date-id
  const eventSlug = `${event.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")}-${event.date}-${event._id}`;

  return (
    <Link href={`/events/${eventSlug}`} className="group flex flex-col">
      <motion.div
        className="relative p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          delay: index * 0.06,
          ease: "easeOut",
        }}
      >
        <div className="absolute left-0 top-0 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-xl bg-neutral-900/25 shadow-xl backdrop-blur backdrop-hue-rotate-180">
          <p className="font-bold">{month}</p>
          <p className="text-3xl font-bold">{Number(day)}</p>
        </div>
        <div className="relative aspect-[9/12] h-full overflow-hidden p-4">
          <ViewTransition name={`event-${event._id}`} key={event._id}>
            <Image
              src={imageSrc}
              alt={event.title}
              fill
              className="group-hover:scale-103 absolute inset-0 rounded object-cover object-center transition-all duration-300 ease-in-out group-hover:opacity-80"
              transformation={[
                {
                  width: 500,
                  height: 600,
                  quality: 80,
                },
              ]}
            />
          </ViewTransition>
          <figure className="pointer-events-none absolute inset-0 z-[1] rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.3)_100%)]" />
        </div>

        <div className="absolute bottom-0 left-0 z-10 flex min-h-16 w-full items-center justify-between gap-3 rounded-xl bg-neutral-900/25 px-4 backdrop-blur backdrop-hue-rotate-180">
          <div className="flex w-full items-center justify-between gap-3">
            <div className="flex flex-col">
              <h1 className="font-bold">
                {(index + 1).toString().padStart(2, "0")}. {event.title}
              </h1>
              <p className="text-xs text-neutral-400">{artistsDisplay}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
