"use client";

import { Id } from "@/convex/_generated/dataModel";
import { Image } from "@imagekit/next";
import { unstable_ViewTransition as ViewTransition } from "react";

type HeroImageProps = {
  id: Id<"events">;
  src: string;
  alt?: string;
};

export default function HeroImage({ id, alt, src }: HeroImageProps) {
  return (
    <div className="relative aspect-square h-full w-full overflow-hidden rounded-xl">
      <ViewTransition name={`event-${id}`}>
        <Image
          src={src}
          alt={alt ?? id}
          width={800}
          height={800}
          className="h-full w-full object-cover"
          priority
          transformation={[
            {
              format: "webp",
              width: "800",
              height: "800",
              crop: "maintain_ratio",
              quality: 80,
            },
          ]}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
      </ViewTransition>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(260px_180px_at_90%_10%,rgba(0,0,0,0.35),transparent)]" />
    </div>
  );
}
