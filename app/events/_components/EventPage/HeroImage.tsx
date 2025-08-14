"use client";

import Image from "next/image";
import { unstable_ViewTransition as ViewTransition } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/components/hooks/useFavorites";

type HeroImageProps = {
  id: string;
  src: string;
  alt?: string;
};

export default function HeroImage({ id, src, alt }: HeroImageProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
      <ViewTransition name={`event-${id}`}>
        <Image
          src={src}
          alt={alt ?? id}
          fill
          className="object-cover"
          priority
        />
      </ViewTransition>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_180px_at_90%_10%,rgba(0,0,0,0.35),transparent)]" />
      <button
        type="button"
        aria-label={isFavorite(id) ? "Remove from saved" : "Save event"}
        onClick={() => toggleFavorite(id)}
        className={`absolute right-3 top-3 z-10 inline-grid h-10 w-10 place-items-center rounded-lg border transition ${
          isFavorite(id)
            ? "border-red-500/40 bg-red-500/20 text-red-600 hover:bg-red-500/25"
            : "border-white/10 bg-black/30 text-white backdrop-blur-sm hover:bg-black/40"
        }`}
      >
        <Heart
          className="h-4 w-4"
          {...(isFavorite(id) ? { fill: "currentColor" } : {})}
        />
      </button>
    </div>
  );
}
