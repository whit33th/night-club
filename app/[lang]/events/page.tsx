"use client";

import { getDictionaryClient } from "@/lib/get-dictionary-client";
import { Locale } from "@/lib/i18n-config";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
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
      <div className="mx-auto text-center text-white/80">
        <Loader2 className="mx-auto mb-2 h-6 w-6 animate-spin text-white/50" />
        <p>{dict?.common?.loading || "Loading events..."}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="w-full text-center text-[10px] uppercase tracking-[0.4em] text-white/70">
        {dict?.events?.subtitle}
      </p>
      <FiltersHeader
        filters={filters}
        active={activeGenre}
        onChange={setGenre}
        dict={dict}
      />

      <ModeToggle mode={mode} onToggle={toggleMode} dict={dict} />

      {posters.length === 0 ? (
        <motion.section
          className="mx-auto mt-4 w-full max-w-2xl text-center text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
        >
          <p>{dict?.events?.noEvents || "No events found."}</p>
        </motion.section>
      ) : (
        <>
          <Activity mode={mode === "list" ? "visible" : "hidden"}>
            <EventsListView items={posters} />
          </Activity>
          <Activity mode={mode === "grid" ? "visible" : "hidden"}>
            <EventsGridView items={posters} />
          </Activity>
        </>
      )}
    </motion.div>
  );
}
