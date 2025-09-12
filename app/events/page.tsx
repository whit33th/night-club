"use client";

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
    posters,
    setGenre,
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
      />

      <p className="w-full px-1 py-1 text-center text-[10px] uppercase tracking-[0.4em] text-white/70">
        Exclusive parties · Limited capacity · 18+ · Dress code · International
        DJs · Secure entry
      </p>
      <ModeToggle mode={mode} onToggle={toggleMode} />

      {posters.length === 0 ? (
        <div className="mx-auto mt-4 w-full max-w-2xl text-center text-2xl">
          <p>No events found.</p>
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
