"use client";

import Image from "next/image";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import type { ClubEvent } from "@/components/data/events";
import { motion } from "framer-motion";

export default function EventsCard({
  event,
  index,
}: {
  event: ClubEvent;
  index: number;
}) {
  const locale = "en-US";
  const date = new Date(event.date);
  const month = date.toLocaleString(locale, { month: "short" });
  const day = date.toLocaleString(locale, { day: "2-digit" });
  return (
    <Link href={`/events/${event.id}`} className="group flex flex-col">
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
          <ViewTransition name={`event-${event.id}`} key={event.id}>
            <Image
              src={event.img}
              alt={event.title}
              width={500}
              height={500}
              className="group-hover:scale-103 absolute inset-0 rounded object-cover object-center transition-all duration-300 ease-in-out group-hover:opacity-80"
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
              <p className="text-xs text-neutral-400">
                {event.artists
                  ? Array.isArray(event.artists)
                    ? event.artists.join(", ")
                    : event.artists
                  : "Christopher Nolan, Hans Zimmer"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
