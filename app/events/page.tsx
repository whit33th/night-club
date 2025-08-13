"use client";

import { mockEvents, ClubEvent } from "@/components/data/events";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import FiltersHeader from "./_components/EventsPage/FiltersHeader";
import ModeToggle from "./_components/EventsPage/ModeToggle";
import EventsListView from "./_components/EventsPage/EventsListView";
import EventsGridView from "./_components/EventsPage/EventsGridView";

const RAW_POSTERS: Array<ClubEvent> = mockEvents;

export default function EventsPage() {
  const [active, setActive] = useState<string>("all");
  const [mode, setMode] = useState<"grid" | "list">("list");
  const filters = ["all", "techno", "house", "mixed"] as const;
  const searchParams = useSearchParams();
  const after = searchParams.get("after");

  const posters = useMemo(() => {
    let list = RAW_POSTERS;
    if (after) {
      const t = new Date(after).getTime();
      if (!Number.isNaN(t)) {
        list = list.filter((p) => new Date(p.date).getTime() > t);
      }
    }
    if (active === "all") return list;
    return list.filter((p) => p.genres?.includes(active));
  }, [active, after]);

  return (
    <div className="flex flex-col gap-4">
      <FiltersHeader
        filters={filters as unknown as string[]}
        active={active}
        onChange={setActive}
      />

      <p className="w-full px-1 py-1 text-center text-[10px] uppercase tracking-[0.4em] text-white/70">
        Exclusive drops · Limited capacity · Doors 22:00 · 18+ · Dress code
      </p>

      <ModeToggle
        mode={mode}
        onToggle={() => setMode((m) => (m === "grid" ? "list" : "grid"))}
      />

      {mode === "grid" ? (
        <EventsGridView items={posters} />
      ) : (
        <EventsListView items={posters} />
      )}
    </div>
  );
}

// End of file
