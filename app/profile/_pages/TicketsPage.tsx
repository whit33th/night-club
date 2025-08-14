"use client";

import TicketCard from "@/components/Containers/Cards/TicketCard";
import { mockEvents } from "@/components/data/events";
import { useFavorites } from "@/components/hooks/useFavorites";

export default function EventsPage() {
  const { favorites, isHydrated } = useFavorites();
  const favoriteList = mockEvents.filter((e) => favorites.has(e.slug));

  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4 lg:gap-5 xl:gap-6 2xl:grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
      {isHydrated && favoriteList.length === 0 ? (
        <div className="col-span-full rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/80">
          <p>
            No saved events yet. Tap the heart on any event to save it here.
          </p>
        </div>
      ) : (
        favoriteList.map((ev, idx) => (
          <TicketCard key={ev.slug} event={ev} index={idx} />
        ))
      )}
    </section>
  );
}
