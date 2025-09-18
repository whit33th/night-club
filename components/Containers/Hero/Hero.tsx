"use client";

import { Dict } from "@/lib/get-dictionary-client";

const HERO_TEXTS = [
  { key: "afterDark", className: "items-start justify-start" },
  { key: "neonHeart", className: "items-start justify-end text-right" },
  { key: "midnightRhythm", className: "items-end justify-start" },
  { key: "noSleepClub", className: "items-end justify-end text-right" },
] as const;

type HeroProps = {
  dict: Dict;
};

export default function Hero({ dict }: HeroProps) {
  return (
    <div className="relative grid h-[calc(100dvh-56px-100px)] w-full overflow-hidden !p-0 lg:h-[calc(100dvh-56px-32px)]">
      <video
        src={"/videos/hero/hero.mp4"}
        autoPlay
        muted
        loop
        playsInline
        poster="/videos/hero/hero.webp"
        preload="metadata"
        className="absolute inset-0 -z-50 h-full w-full rounded object-cover object-center"
      />

      <div className="absolute inset-0 -z-40 h-full w-full bg-gradient-to-t from-black to-transparent" />

      <div className="absolute inset-0 col-start-1 row-start-1 grid select-none grid-cols-2 grid-rows-2 gap-3 p-4 text-white">
        {HERO_TEXTS.map(({ key, className }) => (
          <div key={key} className={`flex ${className}`}>
            <p className="max-w-[12ch] text-[10px] uppercase tracking-[0.25em] text-white/85 sm:text-xs">
              {dict.hero.texts[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
