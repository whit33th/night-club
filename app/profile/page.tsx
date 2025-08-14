"use client";

import { unstable_Activity as Activity, useState } from "react";
import ProfileHeader from "./_components/ProfileHeader";
import MessagesPage from "./_pages/MessagesPage";
import SettingsPage from "./_pages/SettingsPage";
import EventsPage from "./_pages/TicketsPage";

export type TabKey = "liked" | "messages" | "settings";

export default function ProfilePage() {
  const [tab, setTab] = useState<TabKey>("liked");

  return (
    <div className="relative">
      <ProfileHeader active={tab} onChange={setTab} />

      <section className="container mx-auto grid grid-cols-1 gap-4 lg:gap-5 xl:gap-6">
        <Activity mode={tab === "liked" ? "visible" : "hidden"}>
          <EventsPage />
        </Activity>
        <Activity mode={tab === "messages" ? "visible" : "hidden"}>
          <MessagesPage />
        </Activity>
        <Activity mode={tab === "settings" ? "visible" : "hidden"}>
          <SettingsPage />
        </Activity>
      </section>
    </div>
  );
}
