"use client";

import { X } from "lucide-react";
import { unstable_Activity as Activity } from "react";
import { Suspense } from "react";
import EventsGridView from "./_components/EventsPage/EventsGridView";
import EventsListView from "./_components/EventsPage/EventsListView";
import FiltersHeader from "./_components/EventsPage/FiltersHeader";
import ModeToggle from "./_components/EventsPage/ModeToggle";
import { useMixedEventsFilters } from "./_hooks/useMixedEventsFilters";

export default function EventsPage() {
  return (
    <Suspense>
      <EventsPageBody />
    </Suspense>
  );
}

function EventsPageBody() {
  const {
    filters,
    activeGenre,
    after,
    posters,
    setGenre,
    clearAfter,
    mode,
    toggleMode,
    isLoading,
  } = useMixedEventsFilters();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="mx-auto w-full max-w-2xl text-center text-white/80">
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <FiltersHeader
        filters={filters}
        active={activeGenre}
        onChange={setGenre}
        after={after}
      />

      <p className="w-full px-1 py-1 text-center text-[10px] uppercase tracking-[0.4em] text-white/70">
        Exclusive parties · Limited capacity · 18+ · Dress code · International
        DJs · Secure entry
      </p>
      {after ? (
        <div className="flex items-center justify-center gap-2 text-xs text-white/70">
          <span className="text-base md:text-lg">
            Events after: <span className="font-semibold">{after}</span>
          </span>
          <button
            className="ml-2 aspect-square rounded-full px-2 py-0.5 text-xs font-medium text-white/60 transition hover:bg-white/10 hover:text-white"
            onClick={clearAfter}
            type="button"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : null}
      <ModeToggle mode={mode} onToggle={toggleMode} />

      {posters.length === 0 ? (
        <div className="mx-auto mt-4 w-full max-w-2xl text-center text-2xl">
          <p>No events after the selected date.</p>
        </div>
      ) : (
        <>
          <Activity mode={mode === "grid" ? "visible" : "hidden"}>
            <EventsGridView items={posters} />
          </Activity>
          <Activity mode={mode === "list" ? "visible" : "hidden"}>
            <EventsListView items={posters} />
          </Activity>
        </>
      )}
    </div>
  );
}
