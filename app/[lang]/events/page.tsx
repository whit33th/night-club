"use client";

import { getDictionaryClient } from "@/lib/get-dictionary-client";
import { Locale } from "@/lib/i18n-config";
import { unstable_Activity as Activity, Suspense, use } from "react";
import EventsGridView from "./_components/EventsPage/EventsGridView";
import EventsListView from "./_components/EventsPage/EventsListView";
import FiltersHeader from "./_components/EventsPage/FiltersHeader";
import ModeToggle from "./_components/EventsPage/ModeToggle";
import { useMixedEventsFilters } from "./_hooks/useMixedEventsFilters";

type Props = { params: Promise<{ lang: Locale }> };

export default function EventsPage({ params }: Props) {
  const { lang } = use(params);
  return (
    <Suspense>
      <EventsPageBody lang={lang} />
    </Suspense>
  );
}

function EventsPageBody({ lang }: { lang: Locale }) {
  const {
    filters,
    activeGenre,
    posters,
    setGenre,
    mode,
    toggleMode,
    isLoading,
  } = useMixedEventsFilters();

  const dict = getDictionaryClient(lang);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="mx-auto w-full max-w-2xl text-center text-white/80">
          <p>{dict?.common?.loading || "Loading events..."}</p>
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
        dict={dict}
      />

      <p className="w-full px-1 py-1 text-center text-[10px] uppercase tracking-[0.4em] text-white/70">
        {dict?.events?.subtitle ||
          "Exclusive parties · Limited capacity · 18+ · Dress code · International DJs · Secure entry"}
      </p>
      <ModeToggle mode={mode} onToggle={toggleMode} dict={dict} />

      {posters.length === 0 ? (
        <div className="mx-auto mt-4 w-full max-w-2xl text-center text-2xl">
          <p>{dict?.events?.noEvents || "No events found."}</p>
        </div>
      ) : (
        <>
          <Activity mode={mode === "grid" ? "visible" : "hidden"}>
            <EventsGridView items={posters} locale={lang} dict={dict} />
          </Activity>
          <Activity mode={mode === "list" ? "visible" : "hidden"}>
            <EventsListView items={posters} locale={lang} />
          </Activity>
        </>
      )}
    </div>
  );
}
