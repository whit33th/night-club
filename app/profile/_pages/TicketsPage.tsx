"use client";

import { useMemo } from "react";
import TicketCard from "@/components/Containers/Cards/TicketCard";
import { mockEvents } from "@/components/data/events";

export default function TicketsPage() {
  const participantCounts = useMemo(() => {
    return mockEvents.reduce<Record<string, number>>((acc, ev, i) => {
      const seed = ev.slug.length * 37 + i * 91;
      const count = 25 + ((seed * 131) % 250);
      acc[ev.slug] = count;
      return acc;
    }, {});
  }, []);

  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 lg:gap-5 xl:gap-6 2xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
      {mockEvents.slice(0, 12).map((ev, idx) => (
        <TicketCard
          key={ev.slug}
          event={ev}
          participantsCount={participantCounts[ev.slug] ?? 0}
          index={idx}
        />
      ))}
    </section>
  );
}
