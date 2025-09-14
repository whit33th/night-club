"use client";

import { Image } from "@imagekit/next";
import Link from "next/link";
import { unstable_ViewTransition as ViewTransition } from "react";
import { motion } from "framer-motion";
import { generateSlug } from "@/lib/slugUtils";
import { Locale } from "@/lib/i18n-config";
import { Doc } from "@/convex/_generated/dataModel";
import { localeMap } from "@/lib/date-utils";
import { Dict } from "@/lib/get-dictionary-client";

export default function ConvexEventsGridCard({
  event,
  index,
  href,
  isPast = false,
  locale,
  dict,
}: {
  event: Doc<"events">;
  index: number;
  href?: string;
  isPast?: boolean;
  locale: Locale;
  dict: Dict;
}) {
  const date = new Date(event.date);

  const monthName = date.toLocaleDateString(localeMap[locale], {
    month: "short",
  });
  const month = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const day = date.toLocaleDateString(localeMap[locale], { day: "numeric" });

  const imageSrc = event.imageKitPath ?? "/imgs/posters/1.jpg";

  const artistsDisplay =
    event.artists?.map((artist) => artist.name).join(", ") ?? "";

  const eventSlug = generateSlug(event.title, event.date, event._id);

  const linkHref = href || `/events/${eventSlug}`;

  return (
    <Link href={linkHref}>
      <ViewTransition name={`event-card-${event._id}`} key={event._id}>
        <motion.div
          className={`group relative flex flex-col p-5`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isPast ? 0.75 : 1, y: 0 }}
          transition={{
            duration: 0.2,
            delay: index * 0.06,
            ease: "easeOut",
          }}
        >
          <motion.div
            className={`absolute left-0 top-0 z-10 flex h-16 w-16 flex-col items-center justify-center rounded-xl shadow-xl backdrop-blur backdrop-hue-rotate-180 ${
              isPast
                ? "bg-neutral-900/40 text-neutral-400"
                : "bg-neutral-900/25"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06 + 0.2,
              ease: "easeOut",
            }}
          >
            <p className="font-bold">{month}</p>
            <p className="text-3xl font-bold">{Number(day)}</p>
          </motion.div>
          <div className="relative aspect-[9/12] h-full overflow-hidden p-4">
            <Image
              src={imageSrc}
              alt={event.title}
              fill
              className={`group-hover:scale-103 absolute inset-0 rounded object-cover object-center transition-all duration-300 ease-in-out group-hover:opacity-80 ${
                isPast ? "grayscale" : ""
              }`}
              transformation={[
                {
                  format: "webp",
                  width: 800,
                  height: 800,
                  quality: 90,
                },
              ]}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <figure
              className={`pointer-events-none absolute inset-0 z-[1] ${
                isPast
                  ? "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.1)_55%,rgba(0,0,0,0.6)_100%)]"
                  : "bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.3)_100%)]"
              }`}
            />
            {isPast && (
              <div className="absolute inset-0 z-[2] flex items-center justify-center">
                <span className="rounded-full bg-black/70 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur">
                  {dict.events.pastEvent}
                </span>
              </div>
            )}
          </div>

          <motion.div
            className={`absolute bottom-0 left-0 z-10 flex min-h-16 w-full items-center justify-between gap-3 rounded-xl px-4 backdrop-blur backdrop-hue-rotate-180 ${
              isPast ? "bg-neutral-900/40" : "bg-neutral-900/25"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.06 + 0.3,
              ease: "easeOut",
            }}
          >
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex flex-col">
                <h1 className={`font-bold ${isPast ? "text-neutral-300" : ""}`}>
                  {(index + 1).toString().padStart(2, "0")}. {event.title}
                </h1>
                <p
                  className={`text-xs ${isPast ? "text-neutral-500" : "text-neutral-400"}`}
                >
                  {artistsDisplay}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </ViewTransition>
    </Link>
  );
}
