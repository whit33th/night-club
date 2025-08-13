"use client";

import { useState, useEffect } from "react";

type TopBarProps = {
  date?: string | Date;
};

export default function TopBar({ date = "2024-07-01T13:00:00" }: TopBarProps) {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const eventDate = new Date(date);
    const locale = navigator.language || "en-US";

    setMonth(eventDate.toLocaleString(locale, { month: "short" }));
    setDay(eventDate.toLocaleString(locale, { day: "2-digit" }));
    setTime(
      eventDate.toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [date]);

  return (
    <section className="flex items-stretch justify-between gap-4">
      <div className="flex flex-none flex-col items-center justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="font-bold leading-none">{month}</p>
        <p className="text-2xl font-bold leading-none">{day}</p>
      </div>
      <div className="flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl bg-[var(--primary)] drop-shadow-[0_0_24px_var(--primary)]">
        {/* <marquee
          className="w-full text-lg font-semibold text-black md:text-2xl"
          behavior="scroll"
          direction="left"
          scrollamount="10"
        >
          Exclusive: Free merch for every guest today only! Exclusive: Free
          merch for every guest today only! Exclusive: Free merch for every
          guest today only! Exclusive: Free merch for every guest today only!
          Exclusive: Free merch for every guest today only! Exclusive: Free
          merch for every guest today only! Exclusive: Free merch for every
          guest today only! Exclusive: Free merch for every guest today only!
          Exclusive: Free merch for every guest today only! Exclusive: Free
          merch for every guest today only! Exclusive: Free merch for every
        </marquee> */}
      </div>
      <div className="flex flex-none flex-col justify-center gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
        <div className="text-xl font-bold leading-none">{time}</div>
        <p className="text-xs text-neutral-500">Doors open 13:00</p>
      </div>
    </section>
  );
}
