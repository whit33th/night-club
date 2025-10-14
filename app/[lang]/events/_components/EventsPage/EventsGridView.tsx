"use client";

import { Doc } from "@/convex/_generated/dataModel";
import { motion } from "framer-motion";
import ConvexEventsCard from "./ConvexEventsCard";
import { isPastEvent } from "@/lib/date-utils";

export default function EventsGridView({
  items,
}: {
  items: Array<Doc<"events">>;
}) {
  return (
    <motion.div
      className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] items-stretch gap-4 xl:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {items.map((event, index) => {
        const isPast = isPastEvent(event.date, event.startAt);
        return (
          <ConvexEventsCard
            event={event}
            index={index}
            isPast={isPast}
            key={event._id}
            imageConfig={{
              width: 350,
              height: 450,
              quality: 70,
              aspectRatio: "4:5",
            }}
          />
        );
      })}
    </motion.div>
  );
}
